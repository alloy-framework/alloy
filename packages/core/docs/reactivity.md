# Reactivity

Alloy uses Vue's signal primitives from `@vue/reactivity`, wrapped with an owner/context system, a custom scheduler, and cleanup lifecycle.

## Primitives

- [**`ref(value)`**](api/functions/ref.md) — reactive container. Access/set via `.value`. Deep conversion.
- [**`shallowRef(value)`**](api/functions/shallowRef.md) — no deep conversion. **Prefer in most cases.**
- [**`computed(fn)`**](api/functions/computed.md) — derived reactive value (lazy, cached).
- **`reactive(obj)`** — deeply reactive proxy.
- [**`shallowReactive(obj)`**](api/functions/shallowReactive.md) — no deep conversion. **Prefer over `reactive()`.**

## [`effect(fn, current?, options?)`](api/functions/effect.md)

Re-runs `fn` when tracked dependencies change. Runs through Alloy's scheduler, creates a new [`Context`](api/types/Context.md) in the owner chain, supports cleanup via [`onCleanup()`](api/functions/onCleanup.md).

## [`memo(fn, equal?, name?)`](api/functions/memo.md)

Returns a getter caching the result of `fn`. Re-evaluates when dependencies change. If `equal` is true, skips downstream updates when the value is unchanged.

```ts
const fullName = memo(() => `${first.value} ${last.value}`);
fullName(); // cached
```

## [`root(fn)`](api/functions/root.md)

Creates an isolated reactive scope. Reactive reads inside `fn` are not tracked by any outer effect. The callback receives a dispose function. Returns the callback's return value.

## [`untrack(fn)`](api/functions/untrack.md)

Executes `fn` without tracking reactive dependencies. Useful for reading reactive values without subscribing, or performing side effects (e.g., registering imports) without creating unwanted dependencies.

## [`onCleanup(fn)`](api/functions/onCleanup.md)

Registers a cleanup function on the current context. Runs when the containing effect re-executes (before the next run) or when the containing root/component is disposed.

Common uses:

- Deleting symbols when a declaration is removed: `onCleanup(() => symbol.delete())`
- Removing items from reactive collections
- Dismissing diagnostics

## Owner Chain

Every [`effect()`](api/functions/effect.md) and [`root()`](api/functions/root.md) creates a [`Context`](api/types/Context.md) linked to its parent via `.owner`, forming a tree mirroring the component hierarchy. [`useContext()`](api/functions/useContext.md) traverses this chain.

## Scheduler

Synchronous dual-queue scheduler:

- **Immediate queue** — drained first.
- **Deferred queue** — drained after.

`flushJobs()` runs synchronously during [`render()`](api/functions/render.md). `flushJobsAsync()` awaits pending promises — primarily useful in tests.

## Reactivity in JSX

The JSX transform wraps reactive expressions in effects. When a dependency changes, only that expression re-evaluates — the component function does not re-run.

```tsx
function Counter(props: { count: Ref<number> }) {
  // Runs once. {props.count.value} is tracked in its own effect.
  return <>Count: {props.count.value}</>;
}
```

> **Warning:** Props may be reactive getters. `<Comp foo={myRef.value} />` compiles to a getter tracking `myRef`. Never use `/*@once*/` unless you're certain the value is non-reactive.
