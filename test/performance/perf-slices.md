# Perf Improvement Slices

_Last updated: 2026-04-24T21:00:00Z_
_Baseline: emitter-like-schema CPU 4301 ms avg, mem 288 MB_
_Also measured: ts-huge-object CPU 6148 ms, mem 598 MB; render-many-files CPU 2399 ms, mem 230 MB_

## Notes

CPU profile was captured during module initialization (98.7% idle), yielding no useful function-level
execution samples. All empirical evidence comes from the trace DB and heap snapshot.

The central theme across all slices is **reactive overhead for single-pass renders**:
- 97,560 track edges (subscriptions) built but triggered 0 times (0 write_edges in trace DB).
- 74,084/123,747 effects (59.9%) track zero refs — pure construction overhead.
- 59,498/90,473 refs (65.8%) are never tracked or completely unused.

Every subscription edge represents memory allocation (WeakMap entries in Vue's targetMap +
sub-arrays on effects), linked-list threading, and traversal cost at render time — yet none
ever fires in the benchmark. Reducing the subscription budget is the primary lever.

---

## slice-id: mapjoin-static-joiner-elision

```yaml
status: rejected
estimated_impact_ms: 350
estimated_impact_mb: 40
category: reactivity
files:
  - packages/core/src/utils.tsx
  - packages/core/src/components/For.tsx
rationale: |
  trace: For creates 8.2 refs/instance × 2149 instances = 17,671 refs. List creates 3456
  joiner refs with 3456 track edges. Combined: ~21,000+ reactive Ref objects from mapJoin
  joiner slots, making For the most expensive component by ref allocation (component stats:
  For = 17671 refs total, compared to 5664 for List which delegates here).
  trace: 0 write_edges total — none of these refs ever updates.
  heap: Vue's reactiveMap/targetMap WeakMaps hold 6.8 MB; each Ref<> adds a WeakMap
  entry + sub-array overhead.

  mapJoin (utils.tsx) creates a `Ref<Children | undefined>` per slot boundary via
  `createJoinerRef()` (utils.tsx:140). These refs are reactive to support dynamic lists
  where items appear/disappear, but for static (non-reactive) source arrays this
  infrastructure is never exercised.

  Opportunity: detect at mapJoin call time whether the source is static (a plain array
  literal or an already-resolved non-reactive value). When static, skip joiner ref creation
  and write plain static joiner values into `mapped[]` directly. The isEmpty tracking and
  firstNonEmptyIndex / lastNonEmptyIndex refs (utils.tsx:133–134) can also be elided.
  The `For` component wraps mapJoin in an outer memo already; if `props.each` is not a
  Ref or reactive getter, the inner mapJoin never needs the reactive slot infrastructure.
risk: medium
```

When `each` is a plain array/Map/Set (not a `Ref<>` or getter function), For's mapJoin
executes exactly once and the result is immutable. A `isStaticSource()` predicate before
the slot-metadata setup path enables a fast path: build `mapped[]` as a plain array of
`[item, joiner, item, ...]` tuples with no Ref allocations. Fall back to current path when
source is reactive.

---

## slice-id: binder-resolve-diagnostic-effect

```yaml
status: done
estimated_impact_ms: 250
estimated_impact_mb: 15
category: symbols
files:
  - packages/core/src/binder.ts
rationale: |
  trace: binder.js:523 creates 1428 reactive refs (type: reactive-property via shallowRef)
  with 8800 total track edges (avg 6.16 trackers/ref). These are the `resolveDeclarationByKey`
  computed refs, each then tracked by the `effect()` in the `resolve()` public API function.
  trace: 1428 "binder" type effects — exactly one per `resolve()` call — create the
  diagnostic subscription (binder.js dist ~line 522). Each effect tracks `result.value`
  to detect unresolved refkeys and emit a warning.
  trace: 0 write_edges — `result.value` never changes in the benchmark, so the
  diagnostic effect fires once at setup, checks, finds the refkey resolved, and then sits
  idle forever holding 1428 WeakMap entries and 1428 linked-list subscriptions.

  Each `resolve()` call in binder.ts constructs:
    1. `result = binder.resolveDeclarationByKey(scope, refkey)` — a computed (≈2 WeakMap
       entries, allocation, initial run).
    2. A diagnostic `effect(() => { if (result.value === undefined) emitDiagnostic(...) })`
       — another effect object + WeakMap subscription on `result`.
  Since refkeys resolve synchronously in this scenario, the diagnostic effect's callback
  executes once, sees a resolved value, and the slot stays live until component cleanup.

  Opportunity: replace the per-resolve reactive diagnostic effect with a post-render check.
  After the render flush, iterate `waitingDeclarations` for any entries that are still
  `undefined` and emit diagnostics then. This converts 1428 live effects into a single
  scan at render-complete time, eliminating 1428 effects + their WeakMap subscriptions.
  Edge case: incremental re-renders where a refkey temporarily goes undefined — handle by
  registering a one-time post-flush callback from within the computed instead of a
  persistent effect.
risk: medium
```

The diagnostic effect's only purpose is to emit a warning when `result.value === undefined`.
For fully-resolved renders this is pure overhead. A post-flush scan (`scheduler.onIdle` or
`watchEffect` deferred) can replace all 1428 per-resolve effects with a single O(n) walk
at the end of each flush.

---

## slice-id: take-symbols-plain-set

```yaml
status: pending
estimated_impact_ms: 180
estimated_impact_mb: 10
category: symbols
files:
  - packages/core/src/symbols/symbol-flow.ts
rationale: |
  trace: symbol-flow.js:10 creates 1332 refs with 6588 track edges (avg 4.95 trackers/ref).
  The ref here is the `shallowReactive(new Set<OutputSymbol>())` returned by `takeSymbols()`.
  Making the Set shallowReactive adds it to Vue's reactive proxy maps (reactiveMap WeakMap +
  targetMap WeakMap), creates a proxy object, and causes every consumer that reads `.size`
  or iterates to subscribe reactively.
  trace: 0 write_edges — the reactive Set is populated once during symbol emission and
  never mutated again.
  heap: Vue shallowReactiveMap WeakMap retains 1 MB; shallowReadonlyMap retains 1 MB.
  Each shallowReactive() call contributes entries to both.

  `takeSymbols()` (symbol-flow.ts:24) always creates a shallowReactive Set, even when
  the caller (e.g. InterfaceMember) only calls `takeSymbols()` with no callback and then
  reads the returned Set inside an effect once. The reactive proxy is needed only when
  the returned Set is watched reactively across time. For the no-callback case the caller
  already puts the read inside an `effect()` manually — making the Set itself reactive
  is redundant.

  Opportunity: when `cb` is undefined (majority of call sites), return a plain
  `new Set<OutputSymbol>()` instead of `shallowReactive(new Set())`. The `emitSymbol`
  path only needs to call `set.add(symbol)` — it does not need to trigger Vue watchers.
  Internal callers that run effects on the returned set (e.g. InterfaceMember's
  moveTakenMembers effect) will still see correct results because they run after
  symbol emission completes within the same synchronous render pass.
risk: low
```

`shallowReactive` is needed only when the Set is observed by a Vue computed/watchEffect
across re-renders. For one-shot symbol collection within a single component instantiation,
a plain Set suffices. No public API change is needed — the return type `Set<OutputSymbol>`
stays identical.

---

## slice-id: reference-subscription-consolidation

```yaml
status: pending
estimated_impact_ms: 160
estimated_impact_mb: 12
category: symbols
files:
  - packages/typescript/src/symbols/reference.tsx
  - packages/typescript/src/components/Reference.tsx
rationale: |
  trace: Reference.js:13 (resolveResult memo) — 1188 refs, 7604 track edges (avg 6.4/ref).
  trace: reference.js:14 (ref() memo result) — 1428 refs, 3092 track edges (avg 2.17/ref).
  trace: Reference.js:15 (symbolRef = computed(() => reference()[1])) — 1428 refs,
  3092 track edges (avg 2.17/ref).
  Combined: 4044 refs and 13,788 subscriptions from a single 1428-instance Reference component.

  In Reference.tsx, each instance creates:
    1. `reference = ref(refkey)` → calls `resolve()` → creates resolveResult computed (7604 subs).
    2. `symbolRef = computed(() => reference()[1])` which unwraps the tuple (3092 subs).
    3. The render return `() => reference()[0]` adds more subscriptions via the render effect.
  The `ref()` function in reference.tsx already wraps resolveResult in a `memo()` that
  builds the [text, symbol] tuple. `symbolRef` then extracts `[1]` from that same memo —
  causing the resolveResult computed to be tracked twice per instance.

  Opportunity: expose `resolveResult` directly from `ref()` (or return a structured object
  with named `.text` and `.symbol` accessors) so Reference.tsx can derive `symbolRef`
  without an additional computed layer. This merges two subscription chains into one,
  roughly halving the subscription count on the inner resolveResult computed.
risk: low
```

The `ref()` function returns `() => [text, symbol]`. Reference.tsx currently calls it once
for text and wraps it in another `computed()` for the symbol. If `ref()` instead returns
`{ text: () => Children, symbolRef: ShallowRef<TSOutputSymbol | undefined> }` both
consumers share the single underlying resolveResult computed, eliminating the redundant
layer. Public API (`ref()` return type) changes are internal to the typescript package.

---

## slice-id: output-symbol-name-track-reduce

```yaml
status: pending
estimated_impact_ms: 130
estimated_impact_mb: 8
category: symbols
files:
  - packages/core/src/symbols/output-symbol.ts
rationale: |
  trace: output-symbol.js:92 — 2508 refs, 3952 track edges (avg 1.58/ref).
  trace: output-symbol.js:230 — 888 refs, 1680 track edges (avg 1.89/ref).
  These correspond to OutputSymbol's `name` getter (track + get deconflictedName/userName)
  and `spaces` getter (track + get spaces array), both using Vue's raw track() API.
  Combined: 3396 tracked property refs with 5632 total subscriptions.
  trace: 0 write_edges — symbol names and spaces never change in the benchmark after
  initial construction. All subscribers pay continuous tracking overhead for immutable data.
  heap: Output-symbol shapes are among the most numerous objects; shrinking per-instance
  reactive footprint compounds across 2628 symbols (trace: symbols count = 2628).

  OutputSymbol uses Vue's low-level `track(this, TrackOpTypes.GET, "name")` and
  `trigger(this, TriggerOpTypes.SET, "name", ...)` directly. This bypasses Vue's
  dependency-deduplication optimizations that `computed()` would apply. Every `.name` read
  inside any reactive computation adds a fresh subscription even if the same computation
  already subscribed — there is no memoization between reads.

  Opportunity: wrap the three most-tracked properties (name, deconflictedName, spaces)
  in a single `shallowReactive({ name, deconflictedName, spaces })` sub-object and proxy
  reads/writes through it. Vue's shallowReactive tracks object keys as a unit; a computed
  that reads multiple properties of the same reactive object adds only one subscription
  per key per effect rather than per-read. Alternatively, expose a single `computed`
  for the `name` value so downstream consumers do not repeatedly subscribe.
risk: medium
```

The current manual track/trigger is the lowest-level Vue API and loses deduplication.
Switching to a `shallowReactive` sub-record for the mutable name properties enables Vue's
built-in deduplication and eliminates duplicate subscriptions from the same effect.

---

## slice-id: importsatement-sort-key-cache

```yaml
status: pending
estimated_impact_ms: 100
estimated_impact_mb: 5
category: symbols
files:
  - packages/typescript/src/components/ImportStatement.tsx
rationale: |
  trace: ImportStatement.js:63 — 187 refs, 2175 track edges (avg 11.63/ref) — the
  highest per-ref fanout in the entire subscription budget.
  This corresponds to `sortedNamedImports = computed(() => [...symbolSplit.value.named].sort(
    (a, b) => a.local.name.localeCompare(b.local.name)))` (ImportStatement.tsx).
  The `.localeCompare` sort reads `a.local.name` and `b.local.name` inside the computed.
  Each `.name` access on OutputSymbol calls `track(this, TrackOpTypes.GET, "name")`
  (output-symbol.ts), subscribing the `sortedNamedImports` computed to every symbol's
  `name` ref. With ~11 named imports per ImportStatement × 2 comparisons each, the
  computed subscribes to ~11 symbol-name refs.
  trace: 0 write_edges — no name changes occur in the benchmark.
  Combined with the 187 ImportStatement instances: 2175 idle subscriptions on symbol names.

  Opportunity: pre-extract sort keys outside the computed using `untrack()` to avoid
  reactive subscriptions, or derive the sort order from a stable `namekey` (the string
  passed at symbol creation time, which is inherently immutable). If the sort is based on
  immutable keys, `sortedNamedImports` need not be a computed at all — compute it once
  with `untrack()` and cache the result.
risk: low
```

`symbolSplit.value.named` is already a reactive dependency; the sort order based on
`.local.name` is determined at symbol-creation time and never changes. Wrapping the sort
callback reads in `untrack()` removes 11 reactive subscriptions per ImportStatement
instance while keeping the overall sort reactive to the named-import list itself.

---

## slice-id: for-outer-memo-elision

```yaml
status: pending
estimated_impact_ms: 90
estimated_impact_mb: 6
category: reactivity
files:
  - packages/core/src/components/For.tsx
  - packages/core/src/utils.tsx
rationale: |
  trace: For.js:35 — 2149 refs (memo:For effect), 2149 track edges (avg 1/ref).
  trace: For.js:33 — 1969 unnamed memos from mapJoin's inner memo wrappers.
  For's implementation (For.tsx) wraps mapJoin in `memo(() => mapJoin(...), undefined, "For")`.
  This outer memo (2149 instances) re-runs whenever `props.each` or its reactive deps change.
  For static `each` (plain array), the memo subscribes to nothing but still pays the
  allocation cost: a computed object, initial run, subscription link in Vue's dep graph.
  component stats: For creates 2.9 effects/instance (highest for common list components),
  8.2 refs/instance.

  Opportunity: if `props.each` is a plain array (not a Ref<> or function), skip the outer
  `memo()` wrapper and call `mapJoin()` directly during component construction. The inner
  mapJoin already handles reactive updates when needed. This eliminates 2149 computed
  objects and their associated Vue WeakMap entries.
  Dependency: the static-source detection from slice `mapjoin-static-joiner-elision`
  can be reused here.
risk: low
```

For already branches on `typeof maybeRef === "function"` and `isRef(maybeRef)`. Extending
this guard to bypass the outer memo when `each` is a plain iterable eliminates 2149
reactive wrapper objects with no behavior change for the common static-array case.

---

## slice-id: output-scope-owner-symbol-fanout

```yaml
status: pending
estimated_impact_ms: 60
estimated_impact_mb: 4
category: symbols
files:
  - packages/core/src/symbols/output-scope.ts
rationale: |
  trace: output-scope.js:188 — 12 OutputScope instances, each ownerSymbol reactive-property
  ref tracked by 74 effects (avg 74 trackers/ref) = 888 subscriptions on just 12 refs.
  This is the highest single-ref tracker count in the benchmark.
  The ownerSymbol getter (output-scope.ts ~line 188) calls Vue's `track(this, ..., "ownerSymbol")`.
  74 effects per scope × 12 scopes = 888 subscriptions; the `ownerSymbol` is set once in
  the constructor and never mutated (0 write_edges).

  The high fanout arises because every child component that resolves a refkey through a
  MemberScope reads `scope.ownerSymbol` reactively — the binder traverses the scope chain
  and each MemberScope.ownerSymbol read creates a new subscription. With ~78 InterfaceMember
  instances per scope (1200 members / 12 scopes ≈ 100), each accessing ownerSymbol through
  resolution, the fanout grows proportionally.

  Opportunity: cache the result of `scope.ownerSymbol` in a per-scope `computed()` so
  that all consumers of a single scope's ownerSymbol share one subscription point rather
  than each adding their own. Alternatively, mark ownerSymbol as `readonly` at the type
  level after construction and use `markRaw()` to prevent Vue tracking entirely (valid
  since it never changes post-construction in any supported usage).
risk: low
```

Since ownerSymbol is set in the constructor and then only read, it qualifies as structurally
immutable. Calling `markRaw()` on the scope object (or removing the `track()` call from the
`ownerSymbol` getter and using a plain property read) would convert 888 subscriptions to 0
with no behavior change for this scenario. For the reactive case (ownerSymbol that can change
post-construction), a targeted `shallowRef` on only the mutable case is cleaner.

---

## slice-id: vue-weakmap-per-reactive-object

```yaml
status: pending
estimated_impact_ms: 200
estimated_impact_mb: 30
category: reactivity
files:
  - packages/core/src/reactivity.ts
  - packages/core/src/symbols/output-symbol.ts
  - packages/core/src/symbols/output-scope.ts
rationale: |
  heap: Vue reactivity WeakMaps retain 6.8 MB total:
    @74989 WeakMap (seenRefs): 2 MB
    @82829 WeakMap (nodesToContext): 2 MB
    @75013 WeakMap (shallowReactiveMap): 1 MB
    @75039 WeakMap (shallowReadonlyMap): 1 MB
    @81555 WeakMap (reactiveMap): 262 KB
    @81573 WeakMap (targetMap): 262 KB
  Each call to `reactive()`, `shallowReactive()`, `computed()`, `ref()`, or `effect()`
  adds at least one entry to targetMap or reactiveMap. With 123,747 effects + 90,473 refs
  created, WeakMap churn is substantial.
  trace: 65.8% of refs are never tracked (60% of effects track nothing). These represent
  allocations that are pure overhead — WeakMap entries that carry no reactive payoff.

  Opportunity: audit `output-symbol.ts` and `output-scope.ts` for reactive object
  patterns that can be replaced with `markRaw()` + explicit dirty flags. Properties
  that are known to be set-once (e.g., `binder`, `scope` on OutputSymbol; `parent` on
  OutputScope) should be plain fields. This reduces the number of objects registered in
  targetMap and the corresponding sub-arrays in the dependency graph.

  This is a lower-confidence estimate since we lack function-level CPU data, but the
  6.8 MB WeakMap footprint at 288 MB total (2.4%) and the known per-ref allocation cost
  in V8's WeakMap implementation (~80 bytes per entry) make it a credible target.
risk: medium
```

LOW CONFIDENCE (heap data only, no CPU hits). Identify the 10–20 most-allocated reactive
objects using `memlab trace --node-id` on the largest WeakMap entries, then determine which
fields on those objects are set-once and can be `markRaw()`-ed or converted to plain fields.

---
