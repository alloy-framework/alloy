---
# Change versionKind to one of: breaking, feature, fix, internal
changeKind: fix
packages:
  - "@alloy-js/python"
---

Widen `pythonNameConflictResolver` parameter type from `PythonOutputSymbol[]` to `OutputSymbol[]` to match the `NameConflictResolver` interface.
