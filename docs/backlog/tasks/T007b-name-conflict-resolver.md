# T007b: Name Conflict Resolver

| Field | Value |
|-------|-------|
| **ID** | T007b |
| **Epic** | [E002: Symbol System](../epics/E002-symbol-system.md) |
| **Type** | feature |
| **Status** | pending |
| **Priority** | P1 |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T003 |
| **Blocks** | T022 |

## Description
Implement a custom name conflict resolver for Rust that prioritizes local declarations over imported symbols.

## Goal
When name conflicts occur, `use`-imported symbols should be renamed (with `_2`, `_3` suffixes) before local declarations.

## Scope Included
Create `packages/rust/src/name-conflict-resolver.ts`:
- `rustNameConflictResolver(name: string, symbols: RustOutputSymbol[])`.
- Separates symbols into local declarations vs imported symbols (imported = those created by `addUse`).
- Keeps local declarations unchanged.
- Renames imported symbols with `_2`, `_3` suffixes.
- Export from `src/index.ts`.

## Out of Scope
- Integration with binder (done when CrateDirectory passes it to `createOutputBinder()`).

## Context Files to Read First
- `packages/typescript/src/name-conflict-resolver.ts` — TypeScript's resolver (closest pattern).
- `packages/core/src/symbols/symbol-table.ts` — how conflict resolution is invoked.

## Acceptance Criteria
- `rustNameConflictResolver` compiles and is exported.
- Local declarations are never renamed.
- Imported symbols are renamed with numeric suffixes on conflict.

## Definition of Done
Name conflict resolver exists, compiles, and is exported.
