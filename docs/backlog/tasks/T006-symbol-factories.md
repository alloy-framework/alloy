# T006: Symbol Factory Functions

| Field | Value |
|-------|-------|
| **ID** | T006 |
| **Epic** | [E002: Symbol System](../epics/E002-symbol-system.md) |
| **Type** | foundation |
| **Status** | pending |
| **Priority** | P0 — critical path |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T003, T004, T005 |
| **Blocks** | T011, T012, T013, T014, T019, T020 |

## Description
Implement factory functions for creating Rust symbols in the appropriate scopes.

## Goal
Provide the symbol creation API that declaration components will use.

## Scope Included
Create `packages/rust/src/symbols/factories.ts` with:

- `createStructSymbol(name, options?)` — creates `NamedTypeSymbol` with `typeKind: "struct"` in `types` space.
- `createEnumSymbol(name, options?)` — creates `NamedTypeSymbol` with `typeKind: "enum"` in `types` space.
- `createTraitSymbol(name, options?)` — creates `NamedTypeSymbol` with `typeKind: "trait"` in `types` space.
- `createFunctionSymbol(name, options?)` — creates `FunctionSymbol` in `values` space.
- `createMethodSymbol(name, options?)` — creates `FunctionSymbol` in owner's `members` space (for impl/trait contexts).
- `createTypeAliasSymbol(name, options?)` — creates `NamedTypeSymbol` with `typeKind: "type-alias"` in `types` space.
- `createConstSymbol(name, options?)` — creates `RustOutputSymbol` with `symbolKind: "const"` in `values` space.
- `createFieldSymbol(name, options?)` — creates `RustOutputSymbol` with `symbolKind: "field"` in owner's `members` space.
- `createVariantSymbol(name, options?)` — creates `RustOutputSymbol` with `symbolKind: "variant"` in owner's `members` space.
- `createParameterSymbol(name, options?)` — creates `RustOutputSymbol` with `symbolKind: "parameter"` in function scope's `parameters` space.
- `createTypeParameterSymbol(name, options?)` — creates `RustOutputSymbol` with `symbolKind: "type-parameter"`.

Each factory should:
1. Get the current scope via `useRustScope()` or a typed variant.
2. Get the current binder via `useBinder()`.
3. Call `createSymbol(Constructor, name, space, options)`.
4. Return the created symbol.

Export all from `symbols/index.ts`.

## Out of Scope
- Components that use these factories.
- Reference resolution.

## Context Files to Read First
- `packages/go/src/symbols/factories.ts` — Go's factories.
- `packages/csharp/src/symbols/factories.ts` — C#'s factories.
- `packages/core/src/binder.ts` — `createSymbol()` API.

## Acceptance Criteria
- All factory functions compile and are exported.
- Each creates the correct symbol type in the correct space.
- Factory functions validate scope type where appropriate.

## Definition of Done
All factory functions exist, compile, and are exported.
