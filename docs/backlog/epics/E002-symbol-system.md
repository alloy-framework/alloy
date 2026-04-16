# E002: Symbol System

## Summary

Implement the Rust symbol classes, scope hierarchy, factory functions, and name policy that form the foundation of the language package's type system.

## Why This Epic Exists

Alloy's code generation model is built on symbols and scopes. Every declaration, reference, and import depends on the symbol system. This must be in place before any components can be built.

## Goals

- Implement `RustOutputSymbol` extending core's `OutputSymbol`.
- Implement `NamedTypeSymbol` and `FunctionSymbol` subclasses.
- Implement all 6 scope classes: `RustCrateScope`, `RustModuleScope`, `RustFunctionScope`, `RustLexicalScope`, `RustImplScope`, `RustTraitScope`.
- Implement symbol factory functions.
- Implement `createRustNamePolicy()` with all Rust element types and reserved words.
- Implement scope utility hooks (`useRustScope()`, etc.).
- Implement `ParameterDescriptor` interface.

## In Scope

- Symbol classes with Rust-specific properties (visibility, symbolKind, isAsync, isUnsafe, isConst).
- Scope classes with correct declaration spaces.
- Factory functions for creating symbols in scopes.
- Name policy with `snake_case`, `PascalCase`, `SCREAMING_SNAKE_CASE`, and `r#` reserved word handling.
- `ParameterDescriptor` interface.

## Out of Scope

- Reference resolution logic (E004).
- External crate descriptors (E005).
- Any JSX components.

## Dependencies

- E001 (package scaffold must exist).

## What It Enables

- E003 (core components need symbols and scopes).
- E004 (module system needs scope import tracking).
- E005 (external deps need symbol creation).

## Risks / Notes

- The scope hierarchy design (declaration spaces, member spaces) is critical and hard to change later. Study Go (`packages/go/src/symbols/`) and C# (`packages/csharp/src/symbols/`, `packages/csharp/src/scopes/`) patterns closely.
- `RustModuleScope` needs `use` import tracking from the start, even though the UseStatement component comes in E004.
- `RustCrateScope` needs child module and dependency tracking from the start.

## Task List

- [T003: RustOutputSymbol base class](../tasks/T003-rust-output-symbol.md)
- [T004: NamedTypeSymbol and FunctionSymbol](../tasks/T004-symbol-subclasses.md)
- [T005: Scope hierarchy Part 1 (crate/module)](../tasks/T005-scope-hierarchy.md)
- [T005b: Scope hierarchy Part 2 (function/lexical/member)](../tasks/T005b-scope-hierarchy-part2.md)
- [T006: Symbol factory functions](../tasks/T006-symbol-factories.md)
- [T007: Name policy](../tasks/T007-name-policy.md)
- [T007b: Name conflict resolver](../tasks/T007b-name-conflict-resolver.md)
- [T008: Parameter descriptor and scope hooks](../tasks/T008-parameter-descriptor.md)

## Sequencing Notes

T003 → T004 → T005 → T005b → T006 (sequential dependency chain). T007, T007b, and T008 can be done in parallel with T005/T006.

## Completion Criteria

- All symbol classes instantiate correctly with expected properties.
- All scope classes have correct declaration spaces.
- Factory functions create symbols in the right spaces.
- Name policy transforms names correctly for all Rust element types.
- Reserved words are handled with `r#` prefix.
- `name-policy.test.tsx` passes.
