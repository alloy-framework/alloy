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
