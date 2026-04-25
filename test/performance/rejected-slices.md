# Rejected / Reverted Perf Slices

This file is the persistent record of slices that have been **rejected** by review
or **accepted-then-reverted** because they broke correctness, broke tests, or had
no measurable impact. The perf-analyzer agent MUST consult this file before
proposing slices and MUST NOT re-propose anything listed here unless it has *new*
evidence that materially invalidates the rejection reason — and in that case must
explicitly cite the rejection entry below and explain what changed.

This file is preserved across `perf-slices.md` resets. Add to it; never delete
entries. Format: `## slice-id: <id>` with a YAML block + prose explanation.

---

## slice-id: take-symbols-plain-set

```yaml
status: rejected
reverted_at: 2026-04-24
files_targeted:
  - packages/core/src/symbols/symbol-flow.ts
```

`takeSymbols()` was changed to return a plain `new Set<OutputSymbol>()` when no
`cb` predicate was supplied, on the theory that no caller actually subscribed
reactively to the returned Set. **This is wrong.** Multiple callers iterate the
returned Set inside long-lived reactive effects and rely on Vue tracking
mutations of the Set to re-run those effects when symbols are added/removed
later:

- `createSymbolSlot` in symbol-flow.ts wraps an effect around the iteration.
- `moveTakenMembersTo` (symbol-flow.ts) installs an effect that reads `taken`
  to graft transient symbol members onto a base symbol.
- TypeScript `InterfaceMember` reads `taken.size` inside an effect for
  transient-symbol body merging.
- Go struct/interface member rendering follows the same pattern.

The current benchmark has 0 write_edges on these Sets so tests passed, but the
optimization widens a pre-existing correctness gap for reactive-transient
symbol swaps. **Do not re-propose** as a no-cb-vs-cb branch. A safer reformulation
would be a separate helper (`takeSymbolsSink()` or similar) used only by
discard-only callers like `AccessExpression` / `ObjectExpression` that throw
the result away — but that's a refactor of callers, not a branch on `cb`.

## slice-id: mapjoin-static-joiner-elision

```yaml
status: rejected
files_targeted:
  - packages/core/src/utils.tsx
```

Skip `createJoinerRef()` + `firstNonEmptyIndex` / `lastNonEmptyIndex` refs +
`list:slotEmpty` effects when the source is statically known (not a `Ref` or
function). Rejected during review — the static-vs-reactive branch added a
significant amount of duplicated bookkeeping for a code path that is already
fairly cheap, and the impact estimate was not corroborated by cpuprofile
self-time.

## slice-id: scheduler-array-queue

```yaml
status: rejected
reverted_at: 2026-04-24
files_targeted:
  - packages/core/src/scheduler.ts
```

Replaced `set.values().next().value` with a `for...of` loop that `break`s after
the first item, on the theory that V8 could stack-allocate the iterator. Measured
**+23.1% CPU regression** on emitter-like-schema. `for...of` desugars to a
`Symbol.iterator` method lookup, a fresh iterator object, a `.next()` + `.done`
check per pass, and a `try/finally` for the `return()` hook — more overhead
than the plain `.values().next()` it replaced. `takeJob()` is called 120k+
times per run, so the extra per-iteration work dominates. A genuine scheduler
win needs structural change (circular array + dedup Set, or a FIFO free-list),
not iterator micro-tuning on the same data structure.

## slice-id: mergeprops-plain-fast-path

```yaml
status: reverted
reverted_at: 2026-04-24
files_targeted:
  - packages/core/src/props-combinators.ts
```

Added a fast-path in `mergeProps` that returned a plain (non-reactive) merged
object when **every** source was non-reactive, guarded by
`sources.every(s => isReactive(s))`. Memory dropped ~7% (real) but CPU
**regressed 10% (+391ms)**. The `isReactive` per-source guard runs on every
`mergeProps` call, and in the emitter-like-schema benchmark the reactive-source
path is the common case — so the guard is pure overhead that is never recouped
by the fast path. The auto-verdict OR criterion (cpu ≤ -5% OR mem ≤ -5%)
accepted this based on the memory win alone; reverted on manual review. Any
re-proposal must use a pre-tagged flag set at object construction time (no
per-call `isReactive` scan) and must not regress CPU.
