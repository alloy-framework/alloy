# T005: Scope Hierarchy Part 1: Module and Crate Scopes

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
| **Blocks** | T005b, T006, T009, T022 |

## Description
Implement the module/crate scopes (RustCrateScope and RustModuleScope) — the scopes with import tracking and module declaration tracking. These are the most architecturally critical scopes.

## Goal
Define the complete scope hierarchy with correct declaration spaces, member spaces, and tracking capabilities.

## Scope Included
Create these files in `packages/rust/src/scopes/`:

1. **`rust-crate-scope.ts`** — `RustCrateScope`:
   - `declarationSpaces = ["types", "values"]`.
   - `childModules: Map<string, { name: string, visibility: RustVisibility }>`.
   - `dependencies: Map<string, CrateDependency>`.
   - `addChildModule(name, visibility)` and `addDependency(name, dep)` methods.
   - Getters: `types`, `values`.

2. **`rust-module-scope.ts`** — `RustModuleScope`:
   - `declarationSpaces = ["types", "values"]`.
   - Import tracking: `imports: Map<string, Set<RustOutputSymbol>>` (path → symbols).
   - `addUse(path, symbol)` method.
   - `childModules: Map<string, { name: string, visibility: RustVisibility }>`.
   - `addChildModule(name, visibility)` method.
   - Getters: `types`, `values`.

3. **`index.ts`** — Scope barrel with `RustScope` type alias and hooks: `useRustScope()`, `useRustModuleScope()`, `useRustCrateScope()`.

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
- Both scope classes compile and can be instantiated.
- Declaration spaces match specification.
- `RustModuleScope.addUse()` correctly records imports.
- `RustCrateScope.addChildModule()` and `addDependency()` work.
- Hook functions return correctly typed scopes.
- Barrel exports.

## Definition of Done
All scopes exist, compile, and are exported from `scopes/index.ts`.

## Validation Approach
Build succeeds. Unit test for scope instantiation (can be added to a general symbols test).
