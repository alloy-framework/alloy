---
changeKind: fix
packages:
  - "@alloy-js/core"
---

Recognize callable values in `isRefkeyable` and `isLibrarySymbolReference`. Both predicates required `typeof value === "object"`, so a function carrying the `REFKEYABLE` or `TO_SYMBOL` symbol was rejected even though `Object.hasOwn` works on it. A descriptor can now be both a component and a reference to the symbol it names, which is the shape a generic type from an external library wants — previously `<List>string</List>` worked while a bare `{List}` fell through to the generic function branch and was invoked as a render thunk instead of resolving to the symbol.
