# T005b: Scope Hierarchy Part 2: Function, Lexical, and Member Scopes

| Field | Value |
|-------|-------|
| **ID** | T005b |
| **Epic** | [E002: Symbol System](../epics/E002-symbol-system.md) |
| **Type** | foundation |
| **Status** | pending |
| **Priority** | P0 — critical path |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T005 |
| **Blocks** | T006, T013, T019, T020 |

## Description
Implement the remaining scope classes: function, lexical, impl, and trait scopes.

## Goal
Complete the scope hierarchy with all non-module scopes.

## Scope Included
Create these files in `packages/rust/src/scopes/`:

1. **`rust-function-scope.ts`** — `RustFunctionScope`:
   - `declarationSpaces = ["parameters", "type-parameters", "local-variables"]`.
   - Getters: `parameters`, `typeParameters`, `localVariables`.

2. **`rust-lexical-scope.ts`** — `RustLexicalScope`:
   - `declarationSpaces = ["local-variables"]`.
   - Getter: `localVariables`.

3. **`rust-impl-scope.ts`** — `RustImplScope`:
   - Member scope (has `ownerSymbol`).
   - `declarationSpaces = []` (delegates to ownerSymbol.members).

4. **`rust-trait-scope.ts`** — `RustTraitScope`:
   - Member scope (has `ownerSymbol`).
   - `declarationSpaces = []` (delegates to ownerSymbol.members).

Update `scopes/index.ts` to export all new scopes and update the `RustScope` type alias.

## Out of Scope
- Module/crate scopes (done in T005).
- Factory functions (T006).

## Context Files to Read First
- `packages/go/src/scopes/function.ts` — Go's function scope.
- `packages/go/src/scopes/named-type.ts` — Go's member scope pattern.
- `packages/core/src/symbols/output-scope.ts` — base class.
- `packages/rust/src/scopes/index.ts` — from T005.

## Acceptance Criteria
- All 4 scope classes compile and can be instantiated.
- Declaration spaces match specification.
- Member scopes correctly delegate to ownerSymbol.
- Updated barrel exports.

## Definition of Done
All scopes exist, compile, and are exported from `scopes/index.ts`.
