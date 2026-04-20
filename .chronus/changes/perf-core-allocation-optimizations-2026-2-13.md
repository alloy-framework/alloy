---
changeKind: fix
packages:
  - "@alloy-js/core"
---

Reduce allocation overhead: lazy Context fields (disposables, context, elementCache, isEmpty), `_lastEmpty` boolean for cheap empty-state propagation, `ensureIsEmpty()` gating, scheduler `isJobActive` check to skip stopped effects, `ReactiveUnionSet` per-item root-scope disposers, and hoisted `defaultScheduler` closure.
