# Developer Memory

## takeSymbols() returns plain Set for no-cb case (IMPLEMENTED in take-symbols-plain-set)
`takeSymbols()` in `packages/core/src/symbols/symbol-flow.ts` now returns a plain
`new Set<OutputSymbol>()` when no callback is provided (shallowReactive only when cb provided).
All callers that previously relied on reactive Set notifications (StructEmbed/interface embed
in Go, InterfaceMember in TypeScript, moveTakenMembersTo in core) were converted to
`takeSymbols(cb)` form. `symbol-slot.tsx` sets `context.takenSymbols = shallowReactive(new Set())`
directly without calling takeSymbols(). Discard-only callers (AccessExpression, ObjectExpression)
now benefit from plain Set with zero reactive overhead.

## Post-flush callback mechanism (added in binder-resolve-diagnostic-effect slice)
`registerPostFlushCallback(fn)` in `packages/core/src/scheduler.ts` queues a one-shot
callback that runs after the scheduler drains (both `flushJobs` and `flushJobsAsync`).
Useful for checks that should happen after all reactive effects have settled.

## captureEmitter() in diagnostics.ts — internal only
`captureEmitter()` (packages/core/src/diagnostics.ts) is an INTERNAL helper (not exported
from index.ts). It captures the current DiagnosticsCollector from the reactive context and
returns a pre-bound emitter closure. Only binder.ts should use it.

## resolve() diagnostic is deferred to post-flush
The `resolve()` function in binder.ts no longer creates a persistent reactive effect
for the unresolved-refkey diagnostic. Instead it uses a post-flush callback (fast path:
0-cost when resolved) + a root()-scoped fallback effect for the rare unresolved case.
The fallback effect is only created when `emitUnresolvedDiagnostic` is non-null (i.e.
a DiagnosticsCollector is present in context).

## flushJobs() drains postFlushCallbacks on throw path
When `flushJobs()` throws (async jobs in sync render), it now calls `postFlushCallbacks.splice(0)`
before throwing to prevent stale callbacks from bleeding into the next flush.

## flushJobsAsync() runs postFlushCallbacks in finally
`runPostFlushCallbacks()` is inside the finally block in `flushJobsAsync()` so callbacks
are always consumed even if a job throws mid-flush.

## emitSymbol() emitRef effect — cache symbol.value (emit-symbol-dedup-reads)
In `packages/core/src/symbols/symbol-flow.ts`, the `emitRef` effect body caches
`const val = symbol.value` at the top and uses `val` for the guard, add, and return.
The `onCleanup` closure also uses the captured `val` (not `symbol.value`) so it
correctly deletes the value that was added even if the Ref transitions between two
non-undefined symbols. This reduces raw .value property accesses from 3 to 1 in the
synchronous effect body. Note: Vue deduplicates deps within a single effect run, so
the subscription count per emitRef instance was already 1 — only the raw access count
is reduced.

## _isNode cache in devtools-server.ts (IMPLEMENTED in devtools-check-cache)
`isNodeEnvironment()` in `packages/core/src/devtools/devtools-server.ts` has been
removed and replaced with a module-level cached constant `_isNode` (IIFE with try/catch).
`isDevtoolsEnabled()` now uses `_isNode` as the fast-path guard. `process.env.ALLOY_DEBUG`
is intentionally NOT cached because tests set it at runtime in beforeEach. `getCwd()`
was updated to use `_isNode` directly.

## debug-hook-gate: isDebugEnabled() guards in reactivity.ts (IMPLEMENTED)
All `debug.effect.registerRef()` calls in `ref()`, `shallowRef()`, `computed()`, `toRef()`,
and `toRefs()` are now gated with `if (isDebugEnabled())`. The `debug.effect.register()` call
in `effect()` is now a conditional expression returning -1 when debug is off (the existing
`effectId !== -1` guard handles all downstream usage). This eliminates `refId()` WeakMap
lookups and `resolveOwnerEffectContextId()` context-chain walks on every reactive primitive
creation when debug is disabled.

## scheduler-set-to-deque: REJECTED — has()+add() double-lookup worse than SetIterator
Replacing `Set.values().next().value` with parallel array+index (has()-guard before add(),
lazy delete() in takeJob) caused a +13.6% CPU regression. The has() adds a second hash
lookup per enqueue; that overhead exceeds any iterator savings. SetIterator objects from
`takeJob` are small/short-lived and likely GC-cheap. The 19.7% GC in the profile is NOT
materially caused by them. Do not retry this approach without a microbenchmark to confirm
the iterator cost is real.
