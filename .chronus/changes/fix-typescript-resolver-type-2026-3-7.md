---
# Change versionKind to one of: breaking, feature, fix, internal
changeKind: fix
packages:
  - "@alloy-js/typescript"
---

Widen `tsNameConflictResolver` parameter type from `TSOutputSymbol[]` to `OutputSymbol[]` to match the `NameConflictResolver` interface.
