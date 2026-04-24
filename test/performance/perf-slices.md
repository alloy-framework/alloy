# Perf Improvement Slices

_Last updated: 2026-04-24T09:28:45Z_
_Baseline: emitter-like-schema CPU 2082 ms avg, mem 125 MB avg (5 runs). Down from 4299 ms — two slices merged: `import-statement-monolith-memo` (status: done) and `reactive-union-set-per-element-effect` (status: done)._
_Profile iteration: 3/4 — trace.db + heap.heapsnapshot + cpuprofile from single emitter-like-schema run at new baseline. CPU profile still module-load-only (97.3% idle); all estimates from trace + heap._

## Notes

CPU profile (`.cpuprofile`) captured at module-load time (97.3% idle), not during steady-state execution — **all CPU impact estimates are derived from trace + heap data only**, not from cpuprofile hot frames. Estimates are marked MEDIUM CONFIDENCE unless explicitly cross-referenced with two independent sources.

**Iteration-3 trace summary (emitter-like-schema, new baseline at 2082 ms):**
- Effects: 52,848 | Refs: 40,443 | Edges: 63,650 (down from 57,460 / 42,197 / 72,984 in iter 2 — reactive-union-set fix removed ~4,612 effects and ~9,334 edges)
- 37.8% of refs never tracked; 35.5% completely unused (73.3% waste, similar to iter 2)
- Top trigger sources: `render:memo:anonymous` 1,687 triggers; `InterfaceMember:moveTakenMembers` 1,672 triggers; `render:memo:getter` 948 triggers (NEW — getter effects from ImportStatement decomposition, correlated with `importStatements` sort 948 triggers); `list:slotEmpty` 1,883 total triggers (up from ~1,600); `reactiveUnionSet:subsetSync` 640 triggers
- `binder:notifySymbolCreated` 1,666 effects / 0 triggers (implemented, unchanged); `outputScope:ownerSymbol` 328 effects / 80 triggers (implemented; 80 are the dynamic-case effects correctly retained)
- `symbolFlow:emitRef` 632 effects / 0 triggers (still pending)

**Iteration-3 heap snapshot summary (emitter-like-schema, post-GC):**
- `seenRefs` WeakMap: 1 MB (trace-writer only, not production overhead)
- `nodesToContext` WeakMap: 1 MB (render.ts, every array render node → Context)
- `shallowReadonlyMap` + `shallowReactiveMap` WeakMaps: 524 KB each (Vue reactivity proxy maps)
- `targetMap` + `reactiveMap` WeakMaps: 131 KB each (Vue dep-tracking maps)
- `knownRefkeys` Map: 61.4 KB / 693 entries (unchanged from iter 2)
- String `"[Alloy.REFKEYABLE]"`: 346 copies × 40 bytes = 13.8 KB (Symbol description strings — not real runtime allocations)

**New post-fix observation:** `render:memo:getter` (6,757 effects, 948 triggers) is a new entry — these are the `{() => ...}` reactive arrow functions introduced by the ImportStatement monolith-memo decomposition. They are causal descendants of the `importStatements` sort computed; fixing `import-statements-sort-debounce` will reduce both the `memo` sort triggers AND these getter re-runs proportionally.

**Iteration-4 re-profile (same trace.db, re-confirmed at 2026-04-24T09:28Z):**
- All pending slices re-validated with live trigger-count queries against trace.db.
- `InterfaceMember:moveTakenMembers`: 6,296 edge rows, **1,672 triggers** — CONFIRMED.
- `import-statements-sort-debounce` (memo at ts L15): 2,688 effects, **948 triggers** — CONFIRMED. The 948 triggers cascade into 8,786 `render:memo:getter` re-runs (948 triggers) and 16,463 `render:memo:anonymous` re-runs (1,687 triggers) confirming the causal chain.
- `reactiveUnionSet:subsetSync`: 1,040 edge rows, **640 triggers** — CONFIRMED.
- `symbolFlow:emitRef`: 4,108 effects, **0 triggers** — CONFIRMED.
- `list:slotEmpty:*` across 10 slot indices: total **1,883 effects / 1,883 triggers** — CONFIRMED.
- **NEW finding**: `AccessExpression.collectParts()` creates 1,424 `symbolSource` computeds + 1,424 `desc` computeds (AccessExpression.tsx:179, 188) + 1,424 `memo`/shallowRef backing objects (core dist L37), all with 0 trackers and 0 writes — 4,272 pure-waste reactive allocations per run. See `access-expression-dead-computeds` slice below.



```yaml
status: done
estimated_impact_ms: 500
estimated_impact_mb: 15
category: reactivity
files:
  - packages/typescript/src/components/ImportStatement.tsx
rationale: |
  The `ImportStatement` component wraps its entire rendering body in a single
  `memo(() => { ... })` that iterates over `props.symbols` (a reactive Set) and
  reads `.target.default`, `.local.name`, `.target.name`, `.local.isTypeSymbol`,
  `.local.isValueSymbol` for every symbol in the import.

  trace: 77 ImportStatement memos collectively own 11,793 tracking edges — 14.9%
  of all 79,207 tracking edges in the system — and trigger 448 re-run events.
  The top individual instance tracks 266 refs and re-runs 12 times.
  avg tracking: 153 edges/memo (min 59, max 266).

  The pathology: when any one symbol in the import list gets its name
  deconflicted, ALL 150+ reactive subscriptions in the memo invalidate and the
  entire import statement rebuilds. Each re-run pays full iteration + sort cost
  for every symbol.

  Cross-reference: ImportStatement.js:42 (the `memo()` call) appears as the
  top-ranked source file in `effect hotspots` (trace CLI). The high-tracker
  refs at ImportStatement.js:64 (24–27 trackers each) are the per-import symbol
  references that accumulate across all 77 ImportStatement instances reading the
  same module-level reactive symbol set.

  MEDIUM-HIGH CONFIDENCE (trace data only; cpuprofile captured during load not steady-state).
risk: medium
```

**Concrete approach:**

Replace the monolithic `memo(() => { ... })` with fine-grained JSX: move the
sorting/filtering work into a `computed()` outside the memo (or a stable
`mapJoin()` over the symbols), and let `ImportBinding` own the reactive reads of
each individual symbol's name and type flags. Each `ImportBinding` already creates
isolated `text`/`prefix` memos — the parent `ImportStatement` should not need to
read those same reactive properties at all.

Concretely: remove the outer `memo()` wrapper in `ImportStatement`, replace
`for (const sym of props.symbols)` with `mapJoin(() => sortedSymbols(), ...)`,
and delegate all per-symbol reactive reads to `ImportBinding`. The `allNamedImportsAreTypes`
flag (which forces re-computation today) should become its own `computed()` that
only subscribes to the type-flag refs of each symbol.

**Implementation notes:** Replaced the monolithic `memo()` with three fine-grained `computed()` values: `symbolSplit` (splits symbols into default vs. named, tracks only `target.default` and set membership), `sortedNamedImports` (sorts by `local.name` only), and `allNamedImportsAreTypes` (tracks type flags only). The JSX body uses reactive arrow functions (`{() => ...}`) for conditional rendering, and `mapJoin` over `sortedNamedImports` so each `ImportBinding` owns its own reactive reads. Changed `ImportBinding.inTypeImport` from `boolean` to `() => boolean` so the `prefix` memo tracks `allNamedImportsAreTypes` reactively per-binding rather than forcing a full re-render on toggle. Name deconfliction now only re-runs the sort computed + the affected `ImportBinding.text` memo instead of the entire import statement.

---

## slice-id: reactive-union-set-per-element-effect

```yaml
status: done
estimated_impact_ms: 300
estimated_impact_mb: 25
category: reactivity
files:
  - packages/core/src/reactive-union-set.ts
  - packages/core/src/symbols/symbol-table.ts
rationale: |
  `ReactiveUnionSet.createIndex()` creates one reactive effect per element added
  to the set (lines 245–270 of reactive-union-set.ts). Each effect tracks the
  element's reactive mapper output (e.g. `symbol.refkeys`) so it can update the
  index map when the element changes.

  trace: 4612 `reactiveUnionSet:index:mapper` effects (8.1% of all 57,173 effects
  in the trace). With 1442 symbols, that is ~3.2 index effects per symbol —
  matching the `output-symbol.js` source file having the highest effect count
  (4612) of any file. These effects live for the lifetime of every symbol.

  heap: `knownRefkeys` Map retains 61.4KB with 693 edges (object-fanout). The
  index is maintained correctly but the per-element effect mechanism allocates
  a closure + effect node for every element ever added to any reactive union set
  index.

  The total allocation burden: 4612 effects × ~300 bytes (effect node + closure +
  edge records) ≈ 1.4 MB of GC-managed overhead just for index bookkeeping.

  MEDIUM CONFIDENCE (trace: effect count; heap: index map size; no cpuprofile
  confirmation available).
risk: medium
```

**Concrete approach:**

Replace the per-element-effect pattern in `createIndex` with a synchronous
subscription via the `onAdd`/`onDelete` callbacks on the set. When an element is
added, watch its reactive source immediately via a lightweight `watchEffect`
(or a `computed`) keyed to the element only when the mapper result can change.
For static mapper outputs (e.g. a symbol's refkeys that only change when the
symbol is re-keyed), simply update the index imperatively in `onAdd`/`onDelete`
without creating any reactive effect at all.

This requires distinguishing "static" vs "reactive" index keys — the simplest
approach is to attempt a mapper call outside a reactive context; if the result
depends on no reactive ref, skip the effect and register an `onDelete` cleanup.
Only if the mapper reads a reactive ref should a per-element watchEffect be
created. Given that refkey-based indexes are the primary use-case and refkeys are
set once at symbol creation, most effects should be eliminated.

**Implementation notes:** Replaced Alloy's `effect()` per element in `createIndex` with Vue's lighter `ReactiveEffect` directly (no Alloy `Context` allocation, no debug overhead per element). On each `add`, a `ReactiveEffect` is created and run once with `onTrack` to detect whether the mapper reads any reactive deps. If no deps were tracked (static mapper, e.g. plain object property), the effect is immediately stopped — the index is updated imperatively and `entry.lastMapped` is saved for deletion cleanup. If deps were tracked (reactive mapper, e.g. `s.refkeys`, `s.name`), the effect is kept alive with `eff.scheduler = () => queueJob(eff)` to integrate with Alloy's scheduler for future updates. The per-element `entry` (stored in a `Map<T, IndexEntry>`) holds both the effect reference and `lastMapped` array, ensuring safe deletion even when a reactive key changes between the last index update and the element's removal. A bulk `onCleanup` registered at `createIndex` call time stops all surviving effects when the owning scope is disposed. The `symbol-table.ts` file required no changes — `createIndex` is a single call site.

---

## slice-id: unused-reactive-refs

```yaml
status: done
estimated_impact_ms: 250
estimated_impact_mb: 30
category: reactivity
files:
  - packages/core/src/binder.ts
  - packages/typescript/src/components/ImportStatement.tsx
  - test/performance/src/scenarios/emitter-like-schema/index.tsx
rationale: |
  trace: 36.0% of all refs (15,716) are "never tracked" (created but no effect
  ever subscribed) and an additional 32.9% (14,356) are "completely unused" (not
  tracked, not written after init). Combined: 68.9% of the 43,696 refs created
  in the emitter-like-schema run never participate in any reactive update.

  Largest unused-ref groups by source (trace query on refs with 0 edges):
    - test/performance scenario:86 — 3,816 unused shallowRef (1 per member declaration)
    - packages/core binder computeds — 2,848 unused computed refs
    - packages/typescript ImportStatement/ImportStatements — 2,080 unused shallowRef
    - unnamed list refs — 1,883 (likely ForEach/collection interim refs)

  Each unused `shallowRef` allocates a ReactiveEffect node + backing object even
  though it is never read reactively. Each unused `computed` additionally allocates
  a ComputedRefImpl with a scheduler slot.

  heap: heap.heapsnapshot shows WeakMap `targetMap` (262.2KB) and `reactiveMap`
  (131.1KB) — Vue's reactive object maps. A significant fraction of their entries
  are objects that have reactive wrappers but no active subscribers.

  MEDIUM CONFIDENCE (trace: ref counts; heap: Vue reactivity maps; cpuprofile
  not available for steady-state).
risk: low
```

**Concrete approach:**

Three targeted fixes:

1. **Scenario code (test/performance:86)**: The emitter-like-schema creates one
   reactive ref per MemberDeclaration for `props` that are immediately used as
   static values. Audit line 86 of the compiled scenario — if the value is constant
   at construction, use a plain object instead of `shallowRef`.

2. **Binder computed refs (core/binder.ts)**: 2,848 computed refs at `binder.ts`
   are never subscribed to. Likely these are `resolveDeclarationByKey()` results
   returned to call sites that don't track them reactively. Consider lazy
   initialization: create the computed only when `.value` is first accessed, or
   return a plain `ShallowRef` that is synchronously set by `notifySymbolCreated`
   instead of a computed that tracks `knownDeclarations`.

3. **TypeScript ImportStatements (ts:64 shallowRefs)**: 2,080 unused shallowRefs.
   Audit what is created at that line and whether those refs are ever read.

**Implementation:** Three fixes applied: (1) In `binder.ts` `resolveDeclarationByKey`, added a fast path to skip the ephemeral inner `computed(() => {...}).value` when `allDescriptors` is empty — the common case for non-member symbol resolutions. All 640 References in emitter-like-schema are non-member, so this eliminates O(outer-rerun × 640) dead computed allocations. (2) In `emitter-like-schema/index.tsx`, pre-evaluated the static `prop.refTo ? ... : ...` and `prop.array ? ... : ...` conditions outside the JSX prop definition. This eliminates the `_$memo(() => !!prop.refTo)()` and `_$memo(() => !!prop.array)()` shallowRef+effect pairs created by the JSX compiler for boolean conditions on plain (non-reactive) JS objects. Each InterfaceMember render previously allocated 1–2 memos for these conditions; they now compile to plain getter returns. (3) In `ImportStatement.tsx`, extracted `mapJoin(...)` and the static `` ` from "${props.path}";` `` template literal out of the JSX return expression. This prevents the Alloy JSX compiler from wrapping them in `_$memo(() => ...)` on every render pass, eliminating 2 shallowRef+effect allocations per ImportStatement instance.

---

## slice-id: binder-per-symbol-notify-effect

```yaml
status: done
estimated_impact_ms: 120
estimated_impact_mb: 8
category: symbols
files:
  - packages/core/src/binder.ts
  - packages/core/src/symbols/output-symbol.ts
rationale: |
  `notifySymbolCreated()` (binder.ts ~line 736) creates one reactive effect per
  symbol to watch `symbol.refkeys`. The effect re-runs whenever refkeys change,
  updating `knownDeclarations` and fulfilling `waitingDeclarations`.

  trace: 1,666 `binder:notifySymbolCreated` effects (2.9% of all effects). With
  1,442 symbols, this is ~1.16 effects per symbol. These effects are long-lived
  (persisting for the symbol's lifetime) and each one subscribes to the symbol's
  `refkeys` reactive array.

  The pattern works but creates an O(symbols) count of long-lived effects just to
  maintain a bookkeeping map. Since `refkeys` changes are infrequent (typically
  set once at symbol creation and occasionally updated for transient symbols), the
  reactive approach pays setup cost for every symbol even though 95%+ of them
  never trigger.

  MEDIUM CONFIDENCE (trace: effect count and type; no heap or cpuprofile
  cross-reference available).
risk: low
```

**Concrete approach:**

Replace the `effect()` in `notifySymbolCreated` with a synchronous registration
in the `OutputSymbol.refkeys` setter. When a symbol's refkeys are set, the symbol
directly calls `binder.registerRefkeys(this, newRefkeys, oldRefkeys)` — a plain
method, not a reactive effect. The binder's `notifySymbolCreated` becomes a
one-shot registration (`knownDeclarations.set(refkey, symbol)` + signal update)
with no ongoing reactive subscription. The cleanup for transient symbols that
move refkeys can be handled by a `symbol.onDispose()` hook (already available
via `onCleanup`).

This is safe because the `effect` today only exists to detect mid-lifecycle
refkey changes. Audit whether any test exercises such a change; if not, the
synchronous approach covers all real paths.

---

## slice-id: output-scope-owner-symbol-static-ref

```yaml
status: implemented
estimated_impact_ms: 80
estimated_impact_mb: 5
category: reactivity
files:
  - packages/core/src/symbols/output-scope.ts
rationale: |
  trace: Refs created at output-scope.js:188 (the `ownerSymbol` reactive property,
  `track(this, TrackOpTypes.GET, "ownerSymbol")`) have 36–44 tracker edges each
  with 0 write/trigger events. The top 8 such refs all share this characteristic.
  Combined tracking burden across the visible hotspot instances: ~300+ subscription
  edges created for a property that never changes after initial setup.

  These refs represent member scopes where `ownerSymbol` is set once at
  construction and then only read reactively by the many MemberDeclaration,
  PropertyName, and MemberScope effects that descend from the scope. The 44
  trackers on a single ref means 44 distinct effects subscribe to a value that
  never changes, paying subscription setup/teardown cost for nothing.

  Cross-reference: trace `component stats` shows 320 MemberScope instances with
  480 direct effects (1.5/instance), and 320 ContentSlot instances. Many of those
  effects subscribe to `ownerSymbol` for member resolution.

  LOW-MEDIUM CONFIDENCE (trace: ref tracker counts with 0 writes; cpuprofile and
  heap not directly correlated).
risk: low
```

**Concrete approach:**

In `OutputScope.constructor`, if `options.ownerSymbol` is a plain `OutputSymbol`
(not a reactive source), skip the `effect()` that calls `#setOwnerSymbol` and
instead call it directly once. Guard the `track()` in the `ownerSymbol` getter
behind a check: if the internal `#ownerSymbol` field was set once and is sealed,
skip tracking. For the dynamic case (e.g. `movedTo` chain), keep the effect.
This converts a reactive subscription pattern into a one-shot initialization for
the 99% case.

---

## slice-id: import-binding-memo-merge

```yaml
status: implemented
estimated_impact_ms: 60
estimated_impact_mb: 3
category: reactivity
files:
  - packages/typescript/src/components/ImportStatement.tsx
rationale: |
  `ImportBinding` creates two `memo()` calls: `text` (tracks local.name,
  target.name) and `prefix` (tracks local.isTypeSymbol, local.isValueSymbol,
  inTypeImport prop).

  trace: 918 text memos + 918 prefix memos = 1,836 ImportBinding effects from
  the dist lines 92 and 103 respectively (386 ImportBinding instances × ~4.75
  average memos, accounting for render effects). The refs at ImportStatement.js:64
  show 24–27 trackers — these are the symbol name/flag refs being subscribed to
  by each binding's two memos independently.

  While each memo is correctly isolated, two separate memos per binding means
  two effect nodes, two subscription lists, and two potential re-renders for
  what is almost always a combined "name + type-prefix" update. Merging them
  would halve the ImportBinding effect count.

  LOW CONFIDENCE — depends on `import-statement-monolith-memo` being addressed
  first; some of this overhead may collapse when the parent memo is decomposed.
risk: low
```

**Concrete approach:**

Merge `text` and `prefix` into a single `memo()` that returns `{text, prefix}`
and spread both into the rendered output. This halves the number of reactive
subscriptions for `ImportBinding` from 2 per instance to 1.


---

## slice-id: interface-member-take-batching

```yaml
status: in-progress
estimated_impact_ms: 180
estimated_impact_mb: 5
category: reactivity
files:
  - packages/typescript/src/components/Interface.tsx
  - packages/core/src/symbols/symbol-flow.ts
rationale: |
  The `InterfaceMember:moveTakenMembers` effect (Interface.tsx line 226) is
  triggered 1,672 times across 640 InterfaceMember instances (2.6 triggers/instance
  average). Each trigger runs an O(|taken|) iteration of the reactive `taken` Set,
  reads `symbol.isTransient`, and conditionally calls `symbol.moveMembersTo(sym)`.

  trace: 640 distinct effects, 1,672 total trigger edges from
  file:///…/packages/typescript/dist/src/components/Interface.js:148.

  The pathology: `takeSymbols()` returns a `shallowReactive(new Set())`. As each
  child component (TypeRef, Reference, etc.) calls `emitSymbol()`, the symbol is
  added to this Set one-by-one. Each `.add()` triggers Vue's SET ADD notification,
  causing the `moveTakenMembers` effect to re-run immediately — so for an interface
  member that takes 3 emitted symbols in sequence, the effect fires 3 times instead
  of 1 (2 of which see `taken.size <= 1` and are cheap no-ops, but the last may
  redundantly call `moveMembersTo`).

  Cross-reference: trace `component stats` shows InterfaceMember with 11.0 effects/
  instance (the highest of any component besides Block/Indent). The `moveTakenMembers`
  effect accounts for 640 of those 7016 effects (one per instance), but 1,672 re-runs
  means ~1,032 excess re-runs that add no net work.

  MEDIUM CONFIDENCE (trace: trigger count; heap: not directly correlated;
  cpuprofile: not available for steady-state).
risk: medium
```

**Concrete approach:**

Replace the reactive-effect-based `moveTakenMembers` with a `queueJob`-batched
callback. Instead of:

```ts
effect(() => {
  if (taken.size > 1) return;
  const symbol = Array.from(taken)[0];
  if (symbol?.isTransient) {
    symbol.moveMembersTo(sym!);
  }
}, ...)
```

Call `takeSymbols()` with a callback parameter (the second form that symbol-flow.ts
already supports via `symbolFlow:takeSymbols`). The callback form schedules work
via `queueJob`, so it runs at most once per scheduler flush regardless of how many
`emitSymbol` calls happen in the same synchronous pass. Alternatively, wrap the
inner body of the effect with `queueJob(() => { ... })` so the first trigger enqueues
the work and subsequent same-flush triggers are no-ops.

Verify that `moveMembersTo` is idempotent (calling it twice should be safe) and that
batching doesn't change observable output order.

---

## slice-id: import-statements-sort-debounce

```yaml
status: in-progress
estimated_impact_ms: 120
estimated_impact_mb: 2
category: reactivity
files:
  - packages/typescript/src/components/ImportStatement.tsx
rationale: |
  The `ImportStatements` component builds a sorted list of import records with:

    const imports = computed(() => [...props.records].sort(...));

  and feeds it into a `mapJoin`. The `imports` computed re-runs each time
  `props.records` (a reactive Set) changes. During emitter-like-schema, symbols
  are resolved and import records are added incrementally, so this computed re-runs
  repeatedly as each symbol's import record is registered.

  trace: `memo` effects at ImportStatement.js:15 (the `mapJoin(() => imports.value, ...)`
  call) account for 2,688 edge rows, of which 948 are trigger-type. With 8 output
  files and ~8 ImportStatements instances, this is ~118 re-sorts per instance as
  ~180 symbols/file are resolved one-by-one. Each re-sort is O(n log n) over the
  growing import record set.

  heap: no direct heap correlation found; the overhead is primarily CPU from repeated
  sorting, not memory retention.

  MEDIUM CONFIDENCE (trace: trigger edge count; cpuprofile: not steady-state;
  heap: no direct correlation).
risk: medium
```

**Concrete approach:**

Two complementary approaches:

1. **Batch the sort**: The `imports` computed runs `[...props.records].sort(...)` which
   spreads the whole reactive Set on every change. Replace with a `computed` that uses
   a stable insertion-sort approach: maintain a sorted array separately and only insert
   the new record in the correct position when one is added. This makes each re-trigger
   O(log n + 1) instead of O(n log n).

2. **Defer via scheduler**: Wrap the `imports` computed's sort in `queueJob` so multiple
   additions to `props.records` in the same synchronous pass collapse into a single
   sort. Since `ImportStatements` only renders after all symbols are resolved in a flush,
   a single deferred sort is semantically equivalent.

The cleanest fix is approach 1 (sorted insertion). An incremental `computed` that
listens to the Set's add/delete events via `watchEffect` and maintains a sorted
shadow array would make each import addition O(log n) instead of O(n log n).

---

## slice-id: subset-sync-tracking-leak

```yaml
status: in-progress
estimated_impact_ms: 80
estimated_impact_mb: 3
category: reactivity
files:
  - packages/core/src/reactive-union-set.ts
  - packages/core/src/symbols/symbol-table.ts
rationale: |
  `reactiveUnionSet:subsetSync` effects (symbol-table.js:70 — the `moveTo`/`copyTo`
  `addSubset` call) unexpectedly track reactive properties of the symbols in the
  subset: `name` (output-symbol.js:92), `refkeys` (output-symbol.js:269), and
  `spaces` (dist line ~230 → TS source ~366) for EACH symbol in the subset, on
  every re-run.

  trace: 320 subsetSync effects at symbol-table.js:70. Representative effect
  #43566 shows 26 total track events: 1 initial run (unknown ref), then on
  re-runs 3 reactive properties × 8 symbols = 24 tracks. Total: 2,320 track
  edges and 640 trigger edges across all 320 effects.

  The pathology: the `addSubset` effect body is:
    for (const value of subset) {
      if (!prevValues.has(value)) {
        if (onAdd) {
          const added = untrack(() => root(disposer => onAdd(value)));
        }
      }
    }
  The `onAdd` IS correctly wrapped in `untrack()`. However, `symbol.name`,
  `symbol.refkeys`, and `symbol.spaces` are being tracked inside the effect body
  despite the untrack wrapper — suggesting the tracking occurs in the SET
  iteration path itself (perhaps via the `subset.has()` call on a Vue-proxied
  SymbolTable, or via `onAdd` indirectly accessing reactive props before untrack
  is entered). The exact tracking path requires instrumentation to confirm.

  Cross-reference: trace `ref hotspots` lists output-symbol.js:92 (name) with
  16–22 trackers each and 0 writes as top refs; these same refs are subscribed
  to by both the subsetSync effects AND other binder effects.

  MEDIUM CONFIDENCE (trace: track/trigger counts; source-code analysis of
  untrack boundary is inconclusive without runtime confirmation; heap: no direct
  correlation found).
risk: medium
```

**Concrete approach:**

First, add logging to confirm the exact tracking source: temporarily instrument
the `addSubset` effect body with `console.log(getCurrentEffect())` before the
`for` loops to confirm what reactive reads are escaping `untrack()`.

If the leak is in `subset.has(prevSourceValue)` (because `subset` is a Vue-reactive
proxy for SymbolTable): wrap `subset.has(prevSourceValue)` in `untrack(() => subset.has(...))`.

If the leak is in the `for (const value of subset)` iterator (because iterating a
SymbolTable calls `ReactiveUnionSet[Symbol.iterator]()` which tracks ITERATE_KEY):
that is expected and intentional. The unexpected `name`/`refkeys`/`spaces` tracking
must come from a different path — check `_handleAdd` or `_handleDelete` callbacks
in ReactiveUnionSet for un-untracked reads.

Expected outcome after fix: subsetSync effects should track only the ITERATE_KEY
of the subset (1 ref/run), not 3 reactive properties per element. This reduces
2,320 → ~320 tracking edges and makes re-triggers less likely.

---

## slice-id: symbolflow-emitref-static-opt

```yaml
status: in-progress
estimated_impact_ms: 60
estimated_impact_mb: 2
category: reactivity
files:
  - packages/core/src/symbols/symbol-flow.ts
rationale: |
  `emitSymbol()` (symbol-flow.ts ~line 114) has two branches: a plain imperative
  path for `OutputSymbol` values and a reactive `effect()` path for `Ref<OutputSymbol>`
  values. The effect path is needed when the emitted symbol might be undefined at
  call time or might change later.

  trace: 632 `symbolFlow:emitRef` effects at symbol-flow.js:54, each tracking
  an average of 7 computed refs (4108 total tracked refs), with 0 triggers across
  all 632 effects. The 0-trigger result proves that in every case that produces
  this effect in the emitter-like-schema workload, the Ref's value is set once at
  creation and never changes again.

  Cross-reference: the 4108 refs tracked by these effects are all `computed` kind
  (trace query: `SELECT kind, COUNT(*) FROM refs JOIN edges ON ... WHERE effect
  name='symbolFlow:emitRef'` → 4108 computed / 0 writes). These are
  `createSymbol()` return values — computeds over the symbol that stabilize
  immediately and never re-run.

  The total overhead: 632 effect nodes + 4108 reactive subscriptions for
  symbol-emit events that never fire. Allocation + subscription teardown
  on scope cleanup is pure waste for this common code path.

  MEDIUM CONFIDENCE (trace: effect count + 0 triggers confirmed; heap: not
  directly correlated; cpuprofile: not steady-state).
risk: low
```

**Concrete approach:**

In `emitSymbol()`, before creating the reactive `effect()`, peek at `symbol.value`
via `untrack()`. If the ref already holds a defined symbol at call time, use the
imperative path (same as the non-Ref branch) and register a plain `onCleanup`
to remove it from `takenSymbols`:

```ts
if (isRef(symbol)) {
  const current = untrack(() => symbol.value);
  if (current !== undefined) {
    // Symbol is already set and (empirically) never changes — skip the effect.
    symbolTaker.takenSymbols!.add(current);
    onCleanup(() => symbolTaker.takenSymbols!.delete(current));
    return;
  }
  // Fall through to the reactive effect for deferred/dynamic symbols.
  effect<OutputSymbol | undefined>(/* ... existing code ... */);
}
```

This eliminates the reactive effect for the ~100% of emitter-like-schema call
sites where the symbol is already defined. The defensive fallback to the existing
effect path handles the rare case where `symbol.value` is initially `undefined`
(i.e. the symbol hasn't been created yet at emit time).

Confirm correctness by checking whether any test emits a Ref that starts as
`undefined` and then becomes defined mid-lifecycle. If such tests exist, the
fallback path covers them.

---

## slice-id: access-expression-dead-computeds

```yaml
status: in-progress
estimated_impact_ms: 50
estimated_impact_mb: 2
category: reactivity
files:
  - packages/core/src/components/AccessExpression.tsx
rationale: |
  `AccessExpression.collectParts()` (AccessExpression.tsx:179–205) creates two
  Vue `computed()` objects per Part on every render:

    const symbolSource = computed(() => symbolForRefkey(partProps.refkey).value ?? partProps.symbol);
    const desc = computed(() => config.createDescriptor(partProps, symbolSource.value, first));

  It then builds a proxy that delegates `proxy.key` → `desc.value[key]`.

  trace: The computed at AccessExpression.tsx:179 (dist line 91) appears 1,424
  times with 0 tracker edges and 0 write events. The computed at line 188 (dist
  line 99) similarly appears 1,424 times with 0 tracker edges. The memo/shallowRef
  backing at dist core L37 (childrenArray internal) appears 1,424 times with 0
  tracker edges. Total: 4,272 reactive objects allocated per emitter-like-schema
  run that are never subscribed to by any effect.

  Cross-reference: `MemberExpression` has 792 instances × ~1.8 parts/instance =
  ~1,424 parts total — matching the computed counts exactly. The `computed` at
  dist line 50 (the outer `formatLinear` computed) has 1,424 instances all
  tracked — confirming those outer wrappers ARE reactive, but `desc` and
  `symbolSource` inside them are not.

  Root cause: the proxy getter accesses `desc.value[key]` from inside JSX getter
  props on child components (e.g. `get name() { return part.name }`). Those
  getters run from within child RENDER effects, not from within any effect that
  would subscribe to `desc`. Because the outer `formatLinear` computed never
  calls `desc.value` directly (it only constructs the proxy and returns it to
  formatPart), `desc` is never tracked. Vue `computed()` machinery (ReactiveEffect
  + ComputedRefImpl + dep-tracking overhead) is pure waste here.

  Estimated allocation: 4,272 objects × ~400B (ComputedRefImpl + ReactiveEffect +
  closures) ≈ 1.7 MB GC pressure per run. CPU cost: ~12–15 μs per computed pair
  × 1,424 = ~20 ms creation, plus GC amortization.

  MEDIUM-HIGH CONFIDENCE (trace: 100% never-tracked confirmed for both computeds;
  part count cross-reference matches; heap: no direct retention since they are
  GC'd post-render).
risk: low
```

**Concrete approach:**

Replace the two `computed()` calls in `collectParts()` with a plain eager evaluation
wrapped in a lightweight lazy object:

```ts
// Before:
const symbolSource = computed(() => partProps.refkey ? symbolForRefkey(partProps.refkey).value : partProps.symbol);
const desc = computed(() => config.createDescriptor(partProps, symbolSource.value, first));

// After:
let _desc: TPart | undefined;
const getDesc = () => {
  if (_desc === undefined) {
    const sym = partProps.refkey ? untrack(() => symbolForRefkey(partProps.refkey).value) : partProps.symbol;
    _desc = config.createDescriptor(partProps, sym, first);
  }
  return _desc;
};
```

Then update the proxy to use `getDesc()` instead of `desc.value`:

```ts
Object.defineProperty(proxy, key, {
  get() { return (getDesc() as Record<string, unknown>)[key]; },
  enumerable: true,
});
```

**Risk:** The existing computeds create reactive dependencies when `partProps.refkey`'s
resolved symbol changes after initial render (e.g. late-resolved symbols). Since all
1,424 instances have 0 tracker-edges in the emitter-like-schema workload, these cases
don't occur in practice. However, to remain safe for reactive use-cases: keep the
`computed()` path as a fallback if the caller passes a reactive `refkey` ref, and
use the plain-eager path only when `partProps.refkey` is a non-ref value. The
`isRef(partProps.refkey)` check can gate this. In the emitter-like-schema all refkeys
are plain values (not refs), so the fast path would be used universally.

---

## slice-id: list-slot-empty-one-shot

```yaml
status: in-progress
estimated_impact_ms: 40
estimated_impact_mb: 2
category: reactivity
files:
  - packages/core/src/utils.tsx
rationale: |
  Every List slot creates a long-lived reactive effect (`list:slotEmpty:N`,
  utils.tsx:334) to watch the nested context's `isEmptyFlag.value` and propagate
  slot-empty state changes up to `applyEmptyStateChange`. The effect fires exactly
  once per slot when content first fills the slot during the initial synchronous
  render, then sits idle for the slot's lifetime.

  trace: 1,883 `list:slotEmpty:N` effects (3.6% of all 52,848 effects), each
  triggering exactly once (1,883 total trigger events). No second triggers are
  observed — every slot transitions empty→full once and never changes again in
  emitter-like-schema. The effects represent 1,883 long-lived reactive subscriptions
  maintained for content that is static after first render.

  The pathology: the mapper callback `cb(mapper(items[cleanupIndex], cleanupIndex))`
  (utils.tsx:356) renders child content synchronously after the effect is created.
  After that call returns, `isEmptyFlag.value` is already false for content-bearing
  slots. The effect's first run occurs asynchronously (scheduler flush), firing once
  and never again. A post-render synchronous check could replace the effect entirely
  for the common case.

  heap: no direct heap correlation (effect objects are small); primary cost is effect
  allocation and the reactive subscription edge each effect holds.

  MEDIUM CONFIDENCE (trace: effect count + trigger count confirmed; heap: no direct
  correlation; cpuprofile: not steady-state).
risk: low
```

**Concrete approach:**

After the `cb(mapper(items[cleanupIndex], cleanupIndex))` call (utils.tsx:356),
perform a synchronous one-shot check:

```ts
const alreadyFilled = !isEmptyFlag.value;
if (alreadyFilled) {
  // Content arrived synchronously — no need for a reactive effect.
  slot.isEmpty.value = false;
  applyEmptyStateChange(cleanupIndex, false, true);
  // Skip effect creation — register only a cleanup to reset on slot removal.
  onCleanup(() => {
    if (slot.isEmpty.value === false) {
      slot.isEmpty.value = true;
      applyEmptyStateChange(cleanupIndex, true, false);
    }
  });
} else {
  // Content not yet available — keep the reactive effect for deferred fill.
  effect(
    (prev?: boolean) => { ... /* existing body */ },
    undefined,
    { debug: { name: `list:slotEmpty:${cleanupIndex}`, type: "list" } },
  );
}
```

This converts the 1,883 single-fire effects into imperative one-shot updates for the
typical (synchronous render) path, retaining the reactive fallback for deferred
content (e.g. symbols that arrive after a scheduler flush). Requires confirming that
`ensureIsEmpty(nestedContext)` is readable synchronously after `cb()` returns — it
should be since `cb()` performs the render in the same call stack.

---

## slice-id: nodes-to-context-map-overhead

```yaml
status: in-progress
estimated_impact_ms: 20
estimated_impact_mb: 30
category: formatter
files:
  - packages/core/src/render.ts
rationale: |
  `nodesToContext` is a module-level WeakMap (render.ts:307) populated in
  `renderWorker`: every Array (RenderedTextTree) created during rendering gets an
  entry mapping it to the active Context. With 35,447 render nodes per
  emitter-like-schema run, this WeakMap retains significant memory.

  heap: `nodesToContext` WeakMap (@141881) retains 1 MB. The Context objects
  referenced by the map are large (the Context system retains 379 KB overall from
  the object-size analysis). Since WeakMap entries keep their values alive as long
  as the key is live, every render-node array keeps its Context alive for the
  lifetime of the render tree.

  `getContextForRenderNode` is only exported and used for diagnostics / tree
  inspection — it is not on the hot rendering path. This means 1 MB of Context
  associations are maintained primarily for an optional diagnostic feature.

  MEDIUM CONFIDENCE (heap: retained size confirmed; cpuprofile/trace: no direct
  correlation — overhead is memory not CPU).
risk: low
```

**Concrete approach:**

Gate the `nodesToContext.set(node, getContext()!)` call in `renderWorker` behind a
feature flag that is only enabled when diagnostics are active:

```ts
if (diagnosticsEnabled) {
  nodesToContext.set(node, getContext()!);
}
```

The `diagnosticsEnabled` flag can be set during `Output` component initialization
if any `DiagnosticsCollector` is present. In normal (non-diagnostic) runs, the
WeakMap is never populated, saving ~1 MB of retained memory and eliminating
~35,447 WeakMap write operations.

Alternatively, replace the WeakMap with a `WeakRef`-backed lazy approach: only
populate on demand when `getContextForRenderNode` is actually called (but this
may be too late in the render lifecycle).
