---
changeKind: fix
packages:
  - "@alloy-js/core"
---

Reduce per-render overhead when devtools/debug are disabled. `isDevtoolsEnabled()` now caches the `ALLOY_DEBUG` env-var read at module load (use `refreshDebugState()` from tests that mutate the env var dynamically), and `effect()`, `ref()`, `shallowRef()`, `computed()`, `toRef()`, and `toRefs()` now gate their debug-hook bookkeeping behind `isDebugEnabled()` so the argument objects and source-location captures aren't built when debug is off.
