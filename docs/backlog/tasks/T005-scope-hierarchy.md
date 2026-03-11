# T005: Scope Hierarchy

| Field | Value |
|-------|-------|
| **ID** | T005 |
| **Epic** | [E002: Symbol System](../epics/E002-symbol-system.md) |
| **Type** | foundation |
| **Status** | pending |
| **Priority** | P0 — critical path |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes (architecture review) |
| **Dependencies** | T003, T004 |
| **Blocks** | T006, T009, T022 |

## Description
Implement all 6 Rust scope classes.

## Goal
Define the complete scope hierarchy with correct declaration spaces, member spaces, and tracking capabilities.

## Scope Included
Create these files in `packages/rust/src/symbols/`:

1. **`rust-crate-scope.ts`** — `RustCrateScope`:
   - `declarationSpaces = ["types", "values", "macros"]`.
   - `childModules: Map<string, { name: string, visibility: RustVisibility }>` — tracks child modules for `mod` generation.
   - `dependencies: Map<string, CrateDependency>` — tracks external crate deps for Cargo.toml.
   - `addChildModule(name, visibility)` method.
   - `addDependency(name, dep)` method.
   - Getters: `types`, `values`, `macros`.

2. **`rust-module-scope.ts`** — `RustModuleScope`:
   - `declarationSpaces = ["types", "values", "macros"]`.
   - Import tracking: `imports: Map<string, Set<RustOutputSymbol>>` (path → symbols).
   - `addUse(path, symbol)` method.
   - `childModules: Map<string, { name: string, visibility: RustVisibility }>`.
   - `addChildModule(name, visibility)` method.
   - Getters: `types`, `values`, `macros`.

3. **`rust-function-scope.ts`** — `RustFunctionScope`:
   - `declarationSpaces = ["parameters", "type-parameters", "local-variables"]`.
   - Getters: `parameters`, `typeParameters`, `localVariables`.

4. **`rust-lexical-scope.ts`** — `RustLexicalScope`:
   - `declarationSpaces = ["local-variables"]`.
   - Getter: `localVariables`.

5. **`rust-impl-scope.ts`** — `RustImplScope`:
   - Member scope (has `ownerSymbol`).
   - `declarationSpaces = []` (delegates to ownerSymbol.members).

6. **`rust-trait-scope.ts`** — `RustTraitScope`:
   - Member scope (has `ownerSymbol`).
   - `declarationSpaces = []` (delegates to ownerSymbol.members).

Also create **`scopes.ts`** with:
- `RustScope` type alias = union of all scope types.
- `useRustScope()` hook — `useContext(ScopeContext)` with type narrowing.
- `useRustModuleScope()` — gets nearest module scope.
- `useRustCrateScope()` — gets nearest crate scope.

## Out of Scope
- Factory functions (T006).
- Reference resolution logic (T022).

## Context Files to Read First
- `packages/core/src/symbols/output-scope.ts` — base class.
- `packages/go/src/scopes/` — Go scope hierarchy (closest analog).
- `packages/csharp/src/scopes/` — C# scope hierarchy.
- `packages/core/src/context/scope.ts` — ScopeContext.

## Implementation Guidance
1. All scopes extend `OutputScope` from core.
2. Member scopes (impl, trait) pass `ownerSymbol` to the OutputScope constructor via `OutputScopeOptions`.
3. Use `shallowReactive` for Maps that need reactive tracking.
4. The `addUse()` method on `RustModuleScope` groups imports by path string.
5. Study `GoSourceFileScope` in `packages/go/src/scopes/go-source-file-scope.ts` for import tracking pattern.

## Acceptance Criteria
- All 6 scope classes compile and can be instantiated via `createScope()`.
- Declaration spaces match the specification.
- `RustModuleScope.addUse()` correctly records imports.
- `RustCrateScope.addChildModule()` and `addDependency()` work.
- Hook functions return correctly typed scopes.

## Definition of Done
All scope classes exist, compile, are exported, and hooks work.

## Validation Approach
Build succeeds. Unit test for scope instantiation (can be added to a general symbols test).
