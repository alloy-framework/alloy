# Developer Memory

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
