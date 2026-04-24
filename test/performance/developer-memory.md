# Developer Memory

## Patterns learned

- `{() => expr}` in Alloy JSX is a reactive effect — safe to use for conditional rendering without wrapping in `memo()`.
- `mapJoin` caches slots by position; items at the same index as before keep their reactive subtree. Sort-order changes cause re-mapping from the first changed position.
- `ImportBinding` is an internal component in `ImportStatement.tsx` — can be freely refactored.
- Changing a prop from `boolean` to `() => boolean` lets the receiving memo call the getter reactively, avoiding stale-prop issues when a parent computed changes.
- `computed()` in Alloy uses Vue's `vueComputed` under the hood — subscribers re-run when the computed is dirty (dep changed), not only when the value differs.
- Vue 3.5's `ReactiveEffect` type does not expose `flags` or `deps` as public TypeScript properties. Use `onTrack` callback to detect if a mapper reads reactive deps (hasDeps pattern). Scheduler integration is done via `eff.scheduler = () => queueJob(eff)`.
- Alloy's `effect()` vs Vue's `ReactiveEffect`: Alloy creates a `Context` object per effect (globalContext management, onCleanup registration). Vue's raw `ReactiveEffect` avoids this overhead and is safe for pure bookkeeping effects (e.g., index maintenance) that don't use Alloy context helpers like `onCleanup`.
- `OutputSymbol.refkeys` and `OutputSymbol.name` use manual `track()` calls in their getters — they ARE reactive and will register deps in any active ReactiveEffect. The static fast-path in createIndex only applies to plain (non-reactive) objects.

- `createIndex` lifetime contract: per-element effects are stopped when the element is deleted from the ReactiveUnionSet OR when the owning reactive context is disposed via onCleanup. Callers that never call delete() on elements must ensure the context is disposed to avoid effect leaks.
