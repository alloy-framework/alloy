# T004: NamedTypeSymbol and FunctionSymbol

| Field                     | Value                                                 |
| ------------------------- | ----------------------------------------------------- |
| **ID**                    | T004                                                  |
| **Epic**                  | [E002: Symbol System](../epics/E002-symbol-system.md) |
| **Type**                  | foundation                                            |
| **Status**                | done                                                  |
| **Priority**              | P0 — critical path                                    |
| **Owner Role**            | AI coding agent                                       |
| **AI Executable**         | Yes                                                   |
| **Human Review Required** | No                                                    |
| **Dependencies**          | T003                                                  |
| **Blocks**                | T006, T011, T012, T013                                |

## Description

Implement the `NamedTypeSymbol` (struct, enum, trait) and `FunctionSymbol` subclasses.

## Goal

Provide specialized symbol classes for Rust's type declarations and functions.

## Scope Included

- Create `packages/rust/src/symbols/named-type-symbol.ts`:
  - Extends `RustOutputSymbol`.
  - `typeKind: "struct" | "enum" | "trait" | "type-alias"`. Reactive.
  - `static readonly memberSpaces = ["members", "type-parameters"]`.
  - Getters: `members`, `typeParameters`.
  - `copy()` method.

- Create `packages/rust/src/symbols/function-symbol.ts`:
  - Extends `RustOutputSymbol`.
  - `receiverType?: Children` — for method receiver (`&self`, etc.).
  - `static readonly memberSpaces = ["members"]` (inherited).
  - `copy()` method.

- Export both from `symbols/index.ts`.

## Out of Scope

- Scope classes (T005).
- Factory functions that create these (T006).

## Context Files to Read First

- `packages/go/src/symbols/named-type.ts` — Go's NamedTypeSymbol.
- `packages/go/src/symbols/function.ts` — Go's FunctionSymbol.
- `packages/csharp/src/symbols/named-type.ts` — C#'s NamedTypeSymbol.

## Implementation Guidance

1. Follow Go's pattern: `NamedTypeSymbol` has `typeKind` property and member spaces.
2. `FunctionSymbol` tracks the receiver type for methods.
3. Both implement `copy()` following the `createSymbol()` + `initializeCopy()` pattern.

## Acceptance Criteria

- `NamedTypeSymbol` instantiable with `typeKind`.
- `FunctionSymbol` instantiable with optional `receiverType`.
- Both exported from `symbols/index.ts`.
- Build succeeds.

## Definition of Done

Symbol subclasses exist, compile, and are exported.

## Completion Notes

- Added `NamedTypeSymbol` and `FunctionSymbol` in `packages/rust/src/symbols/`.
- Exported both from `packages/rust/src/symbols/index.ts`.
- Added tests for creation, reactive updates, member spaces, and copy behavior in `packages/rust/test/symbol-subclasses.test.ts`.
