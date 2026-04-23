---
changeKind: fix
packages:
  - "@alloy-js/core"
  - "@alloy-js/typescript"
---

Fix TypeScript import handling:

- Long `import { ... } from "..."` statements now break across multiple lines when they exceed `printWidth`, using the layout engine.
- Import statements generated via `ref()` into a TypeScript `<SourceFile>` are now reference-counted and torn down (symbol deleted, statement removed) when the last live reference is disposed — e.g. when a `<Show>` that referenced an external refkey toggles off. Previously the import would linger and subsequent re-renders could drift conflicting local names to `foo_3`, `foo_4`, etc.
- `createValueSymbol` / `createTypeSymbol` / `createTypeAndValueSymbol` now automatically delete their symbol when the component that created it unmounts. This fixes a long-standing leak where symbols declared via `<VarDeclaration>`, `<FunctionDeclaration>`, etc. survived `<Show>` unmounts.
- The default name-conflict handler and `tsNameConflictResolver` now reconcile aliases when a conflicting symbol is deleted, reverting previously-aliased survivors back to their plain name.
