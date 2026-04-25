# Perf Improvement Slices

_Last updated: 2026-04-24T23:30:00Z_
_Baseline: emitter-like-schema CPU 3896 ms avg (±361 ms), mem 296 MB avg; render-long-file CPU 150 ms, mem 12 MB; render-many-files CPU 2287 ms, mem 233 MB; ts-huge-object CPU 5929 ms, mem 605 MB_

---

## Profile snapshot

_CPU profile: `CPU.20260424.162446.7226.0.001.cpuprofile` — PID 7226, actual scenario worker process. Total: 2120 samples. Scale: 1 sample ≈ 1.84 ms (3896 ms / 2120)._

**Top 20 self-time (aggregated by function × file):**

| self_hits | % total | function | source |
|-----------|---------|----------|--------|
| 298 | 14.1% | (garbage collector) | — |
| **185** | **8.7%** | **isDevtoolsEnabled** | **devtools/devtools-server.js** |
| 97 | 4.6% | renderWorker | render.js |
| 66 | 3.1% | appendChild | render.js |
| 64 | 3.0% | createReactiveObject | @vue/reactivity |
| **53** | **2.5%** | **resolveOwnerEffectContextId** | **reactivity.js:L23** |
| **52** | **2.5%** | **takeJob** | **scheduler.js:L231** |
| 45 | 2.1% | (program) | — |
| **42** | **2.0%** | **refId** | **reactivity.js:L385** |
| **38** | **1.8%** | **isNodeEnvironment** | **devtools/devtools-server.js:L130** |
| 35 | 1.7% | track | @vue/reactivity |
| 32 | 1.5% | memo | reactivity.js:L105 |
| 30 | 1.4% | printTreeWorker | render.js:L858 |
| 28 | 1.3% | (anon — effect body) | reactivity.js:L254 |
| 27 | 1.3% | compileSourceTextModule | node:esm/utils |
| 23 | 1.1% | effect | reactivity.js:L129 |
| **22** | **1.0%** | **mergeProps** | **props-combinators.js** |
| 19 | 0.9% | creator | runtime/component.js |
| 18 | 0.8% | effect.debug.name (renderWorker) | render.js:L633 |
| **18** | **0.8%** | **splitProps** | **props-combinators.js** |

Bold = actionable (has a slice below). GC (14.1%), `createReactiveObject` (3.0%), `track` (1.7%), `printTreeWorker` (1.4%), `creator` (0.9%), `compileSourceTextModule` (1.3%) are intrinsic/non-actionable.

**Top alloy-relevant files by self-time:**

| % total | file |
|---------|------|
| 10.5% | devtools/devtools-server.js |
| 11.6% | render.js |
| 11.0% | reactivity.js |
| 3.1% | reactive-union-set.js |
| 2.9% | scheduler.js |
| 2.3% | props-combinators.js |

**Heap snapshot (memlab object-size + shape, key alloy findings):**
```
Array:                  114 MB (189,393 instances) — disposables arrays dominate; includes all function closures
Context objects:        ~102 MB (103,788 instances across 3 sizes) — intrinsic to Alloy per-effect context model
nodesToContext WeakMap:   2 MB  (RenderedTextTree → Context map)
seenRefs WeakMap:         2 MB  (90,473 entries — unconditional refId() WeakMap from debug.effect.registerRef)
shallowReactiveMap WeakMap: 1 MB  (shallowReactive() proxy registry)
shallowReadonlyMap WeakMap: 1 MB  (ReactiveUnionSet shallowReadonly() proxies)
ReactiveEffect:         14.9 MB (104,886 instances)
Object {dispose, recordDirectory, recordFile}:  12.8 MB (27,681 instances × 464 B) — noop debug session per component
Dep (Vue dep tracking): 9.8 MB  (86,496 instances)
OutputMemberSpace:      21.2 MB (13,296 instances)
```

---

---

## slice-id: devtools-check-cache

```yaml
status: rejected
estimated_impact_ms: 370
estimated_impact_mb: 2
category: other
files:
  - packages/core/src/devtools/devtools-server.ts
risk: low
```

`isDevtoolsEnabled()` calls `isNodeEnvironment()` on every invocation. `isNodeEnvironment()` performs three property accesses and a typeof check:

```ts
function isNodeEnvironment() {
  return (
    typeof process !== "undefined" &&
    typeof process.versions === "object" &&
    Boolean(process.versions?.node)
  );
}
export function isDevtoolsEnabled() {
  if (!isNodeEnvironment()) return false;
  return devtoolsExplicitlyEnabled || Boolean(process.env.ALLOY_DEBUG);
}
```

Both values are stable for the lifetime of the process: the Node.js environment is established at startup and `process.env.ALLOY_DEBUG` is conventionally set before launch. Yet `isDevtoolsEnabled()` is called on every hot path in the render loop — from `appendTextNode`, `appendPrintHook`, `appendCustomContext`, every `effect()` creation (via `isDebugEnabled()`), every `ref()` creation, and the `renderWorker` main loop — producing 223 samples (10.5% of all CPU) in a single emitter-like-schema run.

**Evidence:**
- cpuprofile: `isDevtoolsEnabled` = 185 self-hits (8.7% of 2120 total; ≈ 341 ms at 1.84 ms/sample). `isNodeEnvironment` = 38 self-hits (1.8%; ≈ 70 ms). Combined: **10.5%, ≈ 410 ms**.
- heap: `seenRefs` WeakMap retains 2 MB (populated by `refId()` which is called unconditionally on every `ref()` because the `isDebugEnabled()` guard — which calls `isDevtoolsEnabled()` — comes inside `debug.effect.registerRef`, not at the call site). Eliminating the WeakMap cost is the domain of `debug-hook-gate`; this slice only caches the flag.

**Concrete approach:**

In `devtools-server.ts`, cache the stable values at module load:

```ts
// Cache once at module startup — both are stable for process lifetime.
const _isNode: boolean = (() => {
  try {
    return (
      typeof process !== "undefined" &&
      typeof process.versions === "object" &&
      Boolean(process.versions?.node)
    );
  } catch {
    return false;
  }
})();

const _envDebugEnabled: boolean = _isNode && Boolean(process.env.ALLOY_DEBUG);

export function isDevtoolsEnabled(): boolean {
  return _envDebugEnabled || devtoolsExplicitlyEnabled;
}
```

Remove `isNodeEnvironment()` entirely (it is not exported; the only caller is `isDevtoolsEnabled()`). The `getCwd()` helper that also calls `isNodeEnvironment()` can inline the cached constant.

This reduces `isDevtoolsEnabled()` to a single boolean OR of two module-level variables — essentially free at call sites.

---


_ralph note (rejected): developer modified benchmark scenario/harness files_

## slice-id: debug-hook-gate

```yaml
status: rejected
estimated_impact_ms: 175
estimated_impact_mb: 2
category: reactivity
files:
  - packages/core/src/reactivity.ts
risk: low
```

Every call to `ref()`, `shallowRef()`, `computed()`, `toRef()`, and `toRefs()` in `reactivity.ts` unconditionally evaluates `refId(result)` as an argument to `debug.effect.registerRef()`, even when debug is disabled. JavaScript evaluates function arguments before calling the function, so `refId()` — which does a WeakMap lookup and conditional write — runs on every ref creation. Similarly, every `effect()` call always calls `resolveOwnerEffectContextId(context)` — a context-chain walk — as an argument to `debug.effect.register()`, even when debug is disabled.

**Evidence (updated with real cpuprofile):**
- cpuprofile: `resolveOwnerEffectContextId` = 53 self-hits (2.5%; ≈ 97 ms). `refId` = 42 self-hits (2.0%; ≈ 77 ms). Effect body at `reactivity.js:L254` = 28 self-hits (1.3%). Combined reactive debug overhead: **≈ 175 ms**.
- heap: `seenRefs` WeakMap retains 2 MB across 90,473 entries — populated exclusively by `refId()` calls on every ref creation (reactivity.ts lines 461–544).
- source: `reactivity.ts` lines 461–468 (`ref`), 493–502 (`shallowRef`), 505–513 (`computed`), 516–531 (`toRef`), 534–545 (`toRefs`); lines 258–264 (`effect()`).

**Note:** This slice is independent of `devtools-check-cache` but ideally follows it. After `devtools-check-cache`, `isDebugEnabled()` becomes O(1) (a boolean OR), so the gate added here becomes nearly free when debug is off.

**Concrete approach:**

In each of `ref()`, `shallowRef()`, `computed()`, `toRef()`, and `toRefs()`, wrap the `debug.effect.registerRef(...)` call:

```ts
// Before (always runs refId()):
debug.effect.registerRef({
  id: refId(result),
  kind: "ref",
  createdAt: captureSourceLocation(),
  createdByEffectId: globalContext?.meta?.effectId,
});

// After:
if (isDebugEnabled()) {
  debug.effect.registerRef({
    id: refId(result),
    kind: "ref",
    createdAt: captureSourceLocation(),
    createdByEffectId: globalContext?.meta?.effectId,
  });
}
```

In `effect()`, gate the `debug.effect.register()` call:

```ts
const effectId = isDebugEnabled() ? debug.effect.register({
  name: debugInfo?.name ?? fn.name,
  type: debugInfo?.type,
  createdAt: captureSourceLocation(),
  contextId: context.id,
  ownerContextId: resolveOwnerEffectContextId(context),
}) : -1;
```

The existing `if (effectId !== -1) { ... }` block that gates `onTrack`/`onTrigger` assignment already handles the effect side correctly.

---


_ralph note (rejected): developer modified benchmark scenario/harness files_

## slice-id: scheduler-array-queue

```yaml
status: rejected
estimated_impact_ms: 70
estimated_impact_mb: 0
category: scheduler
files:
  - packages/core/src/scheduler.ts
risk: medium
```

`takeJob()` uses `Set.values().next().value` to dequeue the first item from `immediateQueue` and `queue`. Every call to `Set.values()` allocates a new iterator object in V8. With up to 122,319 effects per run being scheduled and dequeued (one `takeJob` call per effect flush), this produces constant iterator churn. At 52 self-hits (2.5% ≈ 96 ms) it is the third-highest non-intrinsic alloy hotspot in the profile.

```ts
// Current — allocates iterator on every dequeue:
function takeJob() {
  if (immediateQueue.size > 0) {
    const job = immediateQueue.values().next().value!;
    immediateQueue.delete(job);
    return job;
  }
  if (queue.size > 0) {
    const job = queue.values().next().value!;
    queue.delete(job);
    return job;
  }
  return null;
}
```

The `Set` is retained for its **deduplication** semantics (adding the same job twice only runs it once). The dequeue-efficiency fix does not need to change that.

**Evidence:**
- cpuprofile: `takeJob` = 52 self-hits (2.5%; ≈ 96 ms). This is the entire scheduler dequeue loop — the function body is trivial, so the overhead is the iterator allocation plus `Set.delete`.

**Concrete approach:**

Replace the `Set.values().next().value` call with a `for...of` break pattern, which V8 can optimize to a stack-allocated iterator for built-in Set:

```ts
function firstOf<T>(set: Set<T>): T | undefined {
  for (const item of set) return item;
  return undefined;
}

function takeJob(): QueueJob | null {
  if (immediateQueue.size > 0) {
    const job = firstOf(immediateQueue)!;
    immediateQueue.delete(job);
    return job;
  }
  if (queue.size > 0) {
    const job = firstOf(queue)!;
    queue.delete(job);
    return job;
  }
  return null;
}
```

Risk is medium because deduplication semantics and ordering (effects triggered multiple times before flush run once in insertion order) must be preserved; verify with existing scheduler tests.

---


_ralph note (rejected): no measurable improvement_

## slice-id: mergeprops-plain-fast-path

```yaml
status: done
estimated_impact_ms: 50
estimated_impact_mb: 0
category: jsx
files:
  - packages/core/src/props-combinators.ts
risk: medium
```

`mergeProps()` and `splitProps()` are called on every JSX element render that spreads or splits props. The current `mergeProps` unconditionally calls `Object.getOwnPropertyDescriptors(source)` — allocating a new descriptor object per property — and wraps every key in an `Object.defineProperty` getter, even for plain non-reactive objects. `splitProps` similarly calls `getOwnPropertyDescriptors`.

For plain-object (non-reactive) callers, the lazy getter is unnecessary: the values are already resolved at call time and won't change.

**Evidence:**
- cpuprofile: `mergeProps` = 22 self-hits (1.0%; ≈ 40 ms). `splitProps` = 18 self-hits (0.8%; ≈ 33 ms). Combined: **1.8%, ≈ 74 ms**.
- source: `packages/core/src/props-combinators.ts` lines 16–40 (`mergeProps`), 51–95 (`splitProps`).

**Concrete approach:**

In `mergeProps`, add a plain-object fast path when all sources are non-function (non-reactive):

```ts
export function mergeProps(...sources: any): any {
  // Fast path: all plain objects — eager assign, no lazy getters needed.
  if (sources.every((s: any) => s == null || (typeof s === "object" && !isReactive(s)))) {
    return Object.assign({}, ...sources.filter(Boolean));
  }
  // ... existing descriptor/getter path for reactive sources ...
}
```

Risk is medium because `mergeProps` is part of the public API surface and the lazy-getter semantics are documented. A behavior change (eager vs lazy) is only safe when no source is reactive or a getter. Add a check and fall back to the existing path if any source is reactive.

---

## slice-id: begin-component-noop-session

```yaml
status: in-progress
estimated_impact_ms: 8
estimated_impact_mb: 13
category: other
files:
  - packages/core/src/debug/render.ts
risk: low
```

`beginComponent()` in `debug/render.ts` returns early with `!isDebugEnabled()`, but creates a **fresh object literal** for every component even in that no-op path:

```ts
if (!isDebugEnabled()) {
  return {
    recordDirectory() {},
    recordFile() {},
    dispose() {},
  };
}
```

With 27,681 components rendered per emitter-like-schema run, this allocates 27,681 identical objects × 464 bytes each ≈ **12.8 MB** of short-lived garbage that immediately becomes collectable. These objects appear as `Object { dispose, recordDirectory, recordFile }` in the heap shape report.

**Evidence:**
- heap: `Object { dispose, recordDirectory, recordFile }` retains 12.8 MB across 27,681 instances (≈ 464 B each). `[<function scope>] --debugSession-->: 27,680` edges confirm one per component render. When debug is disabled all instances are identical no-ops.
- cpuprofile: `effect.debug.name` at `render.js:L633` = 18 self-hits (0.8%); the debug session allocation is in the per-component setup path.
- source: `packages/core/src/debug/render.ts` lines 539–545.

**Concrete approach:**

Use a module-level singleton for the no-op session:

```ts
const noopSession: ComponentDebugSession = {
  recordDirectory() {},
  recordFile() {},
  dispose() {},
};

export function beginComponent(options: BeginComponentOptions): ComponentDebugSession {
  if (!isDebugEnabled()) {
    return noopSession;
  }
  // ... existing debug path ...
}
```

Low risk: the session is consumed within the same render effect scope and never mutated; returning the same object is safe.

---

## slice-id: access-expression-no-refkey-computed

```yaml
status: in-progress
estimated_impact_ms: 7
estimated_impact_mb: 0
category: reactivity
files:
  - packages/core/src/components/AccessExpression.tsx
risk: low
```

In `createAccessExpression`, the `collectParts()` function creates a `symbolSource = computed(...)` for every `Part` child. When `partProps.refkey` is `undefined` and `partProps.symbol` is a directly-supplied `OutputSymbol`, the computed reads a non-reactive value and creates no reactive dependencies. It is evaluated once, read once by the `desc` computed, and then never invalidated.

**Evidence (updated):**
- cpuprofile: `collectParts` = 4 self-hits (0.2%; ≈ 7 ms). Reduced from prior estimate; downgraded accordingly.
- trace (corroborative): 2,616 `render:MemberExpression` effects all have zero-track (100%), consistent with static symbol resolution.
- source: `packages/core/src/components/AccessExpression.tsx` lines 179–186.

**Concrete approach:**

In `collectParts()`, detect the static-symbol case and skip the `computed` wrapper:

```ts
let resolvedSymbol: OutputSymbol | undefined;
let symbolSource: Ref<OutputSymbol | undefined> | undefined;

if (partProps.refkey) {
  symbolSource = computed(() => symbolForRefkey(partProps.refkey!).value);
} else {
  resolvedSymbol = partProps.symbol;
}

const desc = computed(() =>
  config.createDescriptor(
    partProps,
    symbolSource ? symbolSource.value : resolvedSymbol,
    first,
  ),
);
```

---

## slice-id: for-static-direct-call

```yaml
status: in-progress
estimated_impact_ms: 0
estimated_impact_mb: 0
category: reactivity
files:
  - packages/core/src/components/For.tsx
risk: low
```

`For` always wraps `mapJoin` in a `memo()`, creating 1 `shallowRef` + 1 `effect` per `For` instance to make the list reactive to changes in `each`. When `each` is a plain static array (not a `Ref` or a function), the memo effect runs once, creates zero reactive deps, and never re-runs.

**Note on rejected slice:** The previously rejected `mapjoin-static-joiner-elision` targeted infrastructure *inside* `mapJoin`. This slice targets only the outer `memo()` wrapper in `For.tsx` and does NOT modify `mapJoin` internals.

**Evidence (updated — LOW CONFIDENCE):**
- cpuprofile: `For.tsx` is not visible anywhere in the top-30 self-hit frames of the new profile. No cpuprofile self-time evidence. Estimated impact revised to 0 ms pending a profile run that shows `For` overhead.
- trace (corroborative only): 2,149 `render:For` effects, 100% zero-track — suggests static arrays throughout. But trace-only evidence is insufficient per Evidence priority rules.

**Concrete approach:**

In `For`, detect the static-array case and bypass the memo:

```ts
const each = props.each;
if (!isRef(each) && typeof each !== "function") {
  return (mapJoin as any)(() => each, cb, options);
}
return memo(
  () => (mapJoin as any)(
    typeof each === "function" ? each : () => (each as Ref<any>).value,
    cb, options,
  ),
  undefined,
  "For",
);
```

---

## Notes

**GC at 14.1% (298 samples):** GC pressure is the single largest overhead category in the profile. It is a consequence of the allocation patterns addressed by `begin-component-noop-session` (12.8 MB per run), `debug-hook-gate` (90,473 seenRefs WeakMap entries), and `scheduler-array-queue` (iterator churn). Expect GC percentage to decrease as these slices land.

**`renderWorker` (4.6%) and `appendChild` (3.1%):** The render loop itself is the core path; most overhead here is intrinsic. The `debug.render.appendTextNode` → `recordTextNode` → `isDebugEnabled()` chain that fires on every text node is already addressed by `devtools-check-cache` (making `isDebugEnabled()` O(1)).

**`createReactiveObject` (3.0%) and `track` (1.7%) from Vue:** Intrinsic to Vue's reactive system. Not actionable without replacing the reactivity engine.

**`memo` at 1.5% (32 hits):** Creating memos allocates both a `shallowRef` and an `effect`. With ~52,845 memos per run this is intrinsic to the Alloy render model. Not actionable without changing rendering semantics.

**`reactive-union-set.js` at 3.1% total:** Hot via `createIndex`, `add`, and `_handleAdd`. These are intrinsic to symbol declaration tracking. Not actionable without a significant redesign.

**Context objects at ~102 MB (103,788 instances):** Each `effect()` and `root()` call creates a `Context` object. With 122,319 effects per run, this is expected. Reducing per-Context size would require profiling allocations more carefully; not addressed in this iteration.

**`OutputMemberSpace` at 21.2 MB (13,296 instances):** Appears for the first time in this heap snapshot. Likely tied to the 2,628 symbols × ~5 member spaces each. Not yet corroborated by cpuprofile self-time; filed as a note to investigate in a future iteration.

**shallowReactiveMap / shallowReadonlyMap WeakMaps (1 MB each):** Expected cost of the corrected `takeSymbols(cb)` implementation. Not actionable.

**All 90,473 refs have 0 write edges:** In this benchmark, no ref is ever invalidated after creation. All reactive overhead is setup cost only; optimizations targeting write throughput have zero leverage here.
