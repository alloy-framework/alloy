# Developer Memory

## Patterns learned

- `{() => expr}` in Alloy JSX is a reactive effect — safe to use for conditional rendering without wrapping in `memo()`.
- `mapJoin` caches slots by position; items at the same index as before keep their reactive subtree. Sort-order changes cause re-mapping from the first changed position.
- `ImportBinding` is an internal component in `ImportStatement.tsx` — can be freely refactored.
- Changing a prop from `boolean` to `() => boolean` lets the receiving memo call the getter reactively, avoiding stale-prop issues when a parent computed changes.
- `computed()` in Alloy uses Vue's `vueComputed` under the hood — subscribers re-run when the computed is dirty (dep changed), not only when the value differs.
