# Changelog - @alloy-js/python

## 0.5.0

No changes, version bump only.

## 0.4.0

### Bug Fixes

- [#379](https://github.com/alloy-framework/alloy/pull/379) Widen `pythonNameConflictResolver` parameter type from `PythonOutputSymbol[]` to `OutputSymbol[]` to match the `NameConflictResolver` interface.
- [#396](https://github.com/alloy-framework/alloy/pull/396) Fix TypeScript import handling:
  
  - Long `import { ... } from "..."` statements now break across multiple lines when they exceed `printWidth`, using the layout engine.
  - Import statements generated via `ref()` into a TypeScript `<SourceFile>` are now reference-counted and torn down (symbol deleted, statement removed) when the last live reference is disposed — e.g. when a `<Show>` that referenced an external refkey toggles off. Previously the import would linger and subsequent re-renders could drift conflicting local names to `foo_3`, `foo_4`, etc.
  - `createValueSymbol` / `createTypeSymbol` / `createTypeAndValueSymbol` now automatically delete their symbol when the component that created it unmounts. This fixes a long-standing leak where symbols declared via `<VarDeclaration>`, `<FunctionDeclaration>`, etc. survived `<Show>` unmounts.
  
  Improve name-conflict resolution:
  
  - `OutputSymbol` now exposes a `deconflictedName` slot separate from the user-assigned name. Name-conflict resolvers write the collision rename into this slot (the public `.name` getter returns `deconflictedName ?? userAssignedName ?? originalName`), and clear it once a collision is resolved so survivors revert to their plain name. This replaces a fragile regex-based "is this an auto-generated alias?" check that hard-coded the default resolver's `foo_N` rename scheme. Custom resolvers with any rename scheme (including Python's `foo_N_module` form) now revert correctly when one of the conflicting symbols is removed.
  - `tsNameConflictResolver` and `pythonNameConflictResolver` have been migrated to write through `deconflictedName`.
  - `SymbolTable` now groups conflicts by each symbol's _canonical_ name — the result of applying the symbol's name policy to its `originalName`. This means two symbols whose original names normalize to the same policy-applied name (e.g. `foo_bar` and `fooBar` under camelCase) are correctly detected as conflicting.

### Features

- [#362](https://github.com/alloy-framework/alloy/pull/362) Add `createAccessExpression` factory for building language-specific member/access expression components with shared call chain formatting, symbol resolution, and reactive optimization.
- [#356](https://github.com/alloy-framework/alloy/pull/356) Include debugging information for symbols.
- [#368](https://github.com/alloy-framework/alloy/pull/368) Ship dev sources in package for debugging. Use node's --condition="development" flag to use this build.
- [#367](https://github.com/alloy-framework/alloy/pull/367) Add type-only imports support in Python code generation.


## 0.3.0

### Bug Fixes

- [#334](https://github.com/alloy-framework/alloy/pull/334) Pass refkey to DataclassDeclaration

### Features

- [#328](https://github.com/alloy-framework/alloy/pull/328) `pass` is now emitted when function and class bodies have no content (rather than just no children). For example, show can now be used inside a class body.
- [#325](https://github.com/alloy-framework/alloy/pull/325) Add Dataclass component
- [#342](https://github.com/alloy-framework/alloy/pull/342) Add support for extra imports
- [#340](https://github.com/alloy-framework/alloy/pull/340) Add / and * parameter handling
- [#338](https://github.com/alloy-framework/alloy/pull/338) Change Enum item docstring pattern


## 0.2.0

### Bug Fixes

- [#317](https://github.com/alloy-framework/alloy/pull/317) Add an extra line after the ClassDoc
- [#316](https://github.com/alloy-framework/alloy/pull/316) Add support for floats that end in .0
- [#282](https://github.com/alloy-framework/alloy/pull/282) `<Unresolved symbol>` include the refkey information for easier debugging

### Features

- [#302](https://github.com/alloy-framework/alloy/pull/302) Create SingleTypeExpression, refactor FunctionDeclaration, split Enum implementations and split docs components into separate components
- [#284](https://github.com/alloy-framework/alloy/pull/284) Declaration components' `name` prop and symbol constructors' `name` parameter now allow namekeys. Namekeys are a special kind of refkey which
  takes a name and name options. For example, `namekey("myVariable", { disableNamePolicy: true})` when passed to a declaration component would create a symbol named "myVariable", use the namekey as a refkey, and disable the name policy for that symbol.


## 0.1.0

### Features

- [#257](https://github.com/alloy-framework/alloy/pull/257) 
- [#271](https://github.com/alloy-framework/alloy/pull/271) Add Python components to documentation
- [#267](https://github.com/alloy-framework/alloy/pull/267) Add UnionTypeExpression to allow for optional variable types to be described

### Breaking Changes

- [#206](https://github.com/alloy-framework/alloy/pull/206) Update core's representation of symbols and scopes. These changes should not impact usage of language components in code generators, but there are some significant changes for language library implementations. See https://github.com/alloy-framework/alloy/pull/206 for more details.


This package is currently in development. No releases yet.