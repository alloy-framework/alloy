---
changeKind: fix
packages:
  - "@alloy-js/core"
  - "@alloy-js/typescript"
  - "@alloy-js/python"
---

Fix TypeScript import handling:

- Long `import { ... } from "..."` statements now break across multiple lines when they exceed `printWidth`, using the layout engine.
- Import statements generated via `ref()` into a TypeScript `<SourceFile>` are now reference-counted and torn down (symbol deleted, statement removed) when the last live reference is disposed — e.g. when a `<Show>` that referenced an external refkey toggles off. Previously the import would linger and subsequent re-renders could drift conflicting local names to `foo_3`, `foo_4`, etc.
- `createValueSymbol` / `createTypeSymbol` / `createTypeAndValueSymbol` now automatically delete their symbol when the component that created it unmounts. This fixes a long-standing leak where symbols declared via `<VarDeclaration>`, `<FunctionDeclaration>`, etc. survived `<Show>` unmounts.

Improve name-conflict resolution:

- `OutputSymbol` now exposes a `deconflictedName` slot separate from the user-assigned name. Name-conflict resolvers write the collision rename into this slot (the public `.name` getter returns `deconflictedName ?? userAssignedName ?? originalName`), and clear it once a collision is resolved so survivors revert to their plain name. This replaces a fragile regex-based "is this an auto-generated alias?" check that hard-coded the default resolver's `foo_N` rename scheme. Custom resolvers with any rename scheme (including Python's `foo_N_module` form) now revert correctly when one of the conflicting symbols is removed.
- `tsNameConflictResolver` and `pythonNameConflictResolver` have been migrated to write through `deconflictedName`.
