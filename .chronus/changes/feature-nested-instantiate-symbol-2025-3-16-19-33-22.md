---
changeKind: feature
packages:
  - "@alloy-js/core"
---

instantiateSymbolInto now mirrors both instance and static members (including nested static hierarchies), and no longer errors on static-only sources.