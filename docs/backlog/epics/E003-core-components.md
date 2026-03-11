# E003: Core Declaration Components

## Summary
Implement the fundamental Rust declaration components: struct, enum, function, type alias, const, plus formatting components (attributes, doc comments, type parameters, values).

## Why This Epic Exists
Declaration components are the primary user-facing API. Users compose these to generate Rust source code. This epic delivers the first renderable output.

## Goals
- Implement structural components: `SourceFile`, `CrateDirectory`, `Declaration`, `Reference`.
- Implement declaration components: `StructDeclaration`, `Field`, `EnumDeclaration`, `EnumVariant`, `FunctionDeclaration`, `TypeAlias`, `ConstDeclaration`.
- Implement formatting components: `Attribute`, `DeriveAttribute`, `DocComment`, `ModuleDocComment`, `Parameters`, `TypeParameters`, `WhereClause`, `Value`.
- All components render correct single-file Rust syntax.
- Tests for each component.

## In Scope
- All listed components with props interfaces.
- Single-file rendering (no cross-module imports yet).
- Visibility modifiers (`pub`, `pub(crate)`).
- Derive attributes.
- Doc comments.
- Type parameters with bounds.

## Out of Scope
- Cross-module references and imports (E004).
- Trait declarations and impl blocks (separate in E003b).
- External crate descriptors (E005).
- Cargo.toml generation (E005).

## Dependencies
- E001 (package scaffold).
- E002 (symbol system — symbols, scopes, factories, name policy).

## What It Enables
- E003b (traits/impl use FunctionDeclaration).
- E004 (module system uses SourceFile, Reference).
- E005 (build file uses CrateDirectory).
- Users can generate single-file Rust code.

## Risks / Notes
- `SourceFile` is complex — it wraps core's SourceFile, creates RustModuleScope, and will eventually render `use` statements. For this phase, stub the import rendering (empty).
- `CrateDirectory` creates the crate scope. Cargo.toml is deferred to E005.
- `Reference` initially just renders symbol names without import tracking.

## Task List
- [T009: SourceFile and CrateDirectory](../tasks/T009-source-file-crate-directory.md)
- [T010: Declaration and Reference basics](../tasks/T010-declaration-reference.md)
- [T011: StructDeclaration and Field](../tasks/T011-struct-declaration.md)
- [T012: EnumDeclaration and EnumVariant](../tasks/T012-enum-declaration.md)
- [T013: FunctionDeclaration and Parameters](../tasks/T013-function-declaration.md)
- [T014: TypeAlias and ConstDeclaration](../tasks/T014-type-alias-const.md)
- [T015: Attribute and DeriveAttribute](../tasks/T015-attributes.md)
- [T016: DocComment and ModuleDocComment](../tasks/T016-doc-comments.md)
- [T017: TypeParameters and WhereClause](../tasks/T017-type-parameters.md)
- [T018: Value component](../tasks/T018-value-component.md)

## Sequencing Notes
T009 → T010 must come first (SourceFile/Declaration are prerequisites). Then T011–T018 can be done in any order (they are independent components).

## Completion Criteria
- `struct.test.tsx`, `enum.test.tsx`, `function.test.tsx`, `attributes.test.tsx` pass.
- Single-file Rust output is syntactically correct.
- `pub`, derives, doc comments, type parameters render correctly.
