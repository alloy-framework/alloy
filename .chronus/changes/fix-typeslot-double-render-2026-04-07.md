---
changeKind: fix
packages:
  - "@alloy-js/core"
  - "@alloy-js/typescript"
---

Fix SymbolSlot in FunctionBase being rendered twice when a parameter has both type and default, which caused the type symbol to be overwritten and member resolution to fail. Also add an error diagnostic when a SymbolSlot is rendered more than once.
