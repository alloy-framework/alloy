# Perf Improvement Slices

_Last updated: 2026-04-24T07:37:00Z_
_Baseline: emitter-like-schema CPU 6174 ms avg, mem 125 MB avg (5 runs)_
_Profile iteration: 1 — trace.db + heap.heapsnapshot from single emitter-like-schema run_

## Notes

CPU profile (`.cpuprofile`) captured at module-load time (97.5% idle, only 9909 samples),
not during steady-state execution — **all CPU impact estimates are derived from trace + heap
data only**, not from cpuprofile hot frames. Estimates are marked MEDIUM CONFIDENCE unless
explicitly cross-referenced with two independent sources.

---

## slice-id: import-statement-monolith-memo

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
status: implemented
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

---

## slice-id: unused-reactive-refs

```yaml
status: implemented
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

---

## slice-id: binder-per-symbol-notify-effect

```yaml
status: implemented
estimated_impact_ms: 120
estimated_impact_mb: 8
category: symbols
files:
  - packages/core/src/binder.ts
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

