# T003: RustOutputSymbol Base Class

| Field | Value |
|-------|-------|
| **ID** | T003 |
| **Epic** | [E002: Symbol System](../epics/E002-symbol-system.md) |
| **Type** | foundation |
| **Status** | done |
| **Priority** | P0 — critical path |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T001 |
| **Blocks** | T004, T005, T006 |

## Description
Implement the base `RustOutputSymbol` class extending core's `OutputSymbol` with Rust-specific properties.

## Goal
Provide the base symbol class that all Rust symbols will inherit from.

## Scope Included
- Create `packages/rust/src/symbols/rust-output-symbol.ts`.
- `RustOutputSymbol` extends `OutputSymbol` from `@alloy-js/core`.
- Properties:
  - `visibility: RustVisibility` — `"pub" | "pub(crate)" | "pub(super)" | undefined` (undefined = private). Reactive.
  - `symbolKind: RustSymbolKind` — string literal union of Rust symbol kinds. Reactive.
  - `isAsync: boolean` — default false. Reactive.
  - `isUnsafe: boolean` — default false. Reactive.
  - `isConst: boolean` — default false. Reactive.
- `static readonly memberSpaces = ["members"]`.
- `copy()` method following the pattern in `BasicSymbol`.
- Getter accessors for member spaces: `get members()`.
- `RustOutputSymbolOptions` interface extending `OutputSymbolOptions`.
- Export `RustVisibility` type and `RustSymbolKind` type.

## Out of Scope
- Subclasses (T004).
- Scope classes (T005).
- Factory functions (T006).

## Context Files to Read First
- `packages/core/src/symbols/output-symbol.ts` — base class.
- `packages/core/src/symbols/basic-symbol.ts` — reference implementation.
- `packages/go/src/symbols/go.ts` — Go's symbol class.
- `packages/csharp/src/symbols/csharp.ts` — C#'s symbol class (closest model with accessibility).

## Implementation Guidance
1. Study `GoSymbol` and `CSharpSymbol` for patterns.
2. Use Vue reactivity (`track`/`trigger` from `@vue/reactivity`) for reactive properties, following the exact pattern in `OutputSymbol`.
3. The `copy()` method should call `createSymbol(RustOutputSymbol, ...)` and then `this.initializeCopy(copy)`.
4. Create `symbols/index.ts` barrel exporting the class and types.

## Acceptance Criteria
- [x] `RustOutputSymbol` can be instantiated with `createSymbol()`.
- [x] All properties are reactive (tracked/triggered).
- [x] `copy()` produces a copy with same properties.
- [x] Types (`RustVisibility`, `RustSymbolKind`) are exported.

## Definition of Done
Base symbol class exists, compiles, and is exported from `symbols/index.ts`.

## Validation Approach
Build succeeds: `pnpm --filter @alloy-js/rust build`.

Implementation evidence:
- `packages/rust/src/symbols/rust-output-symbol.ts` defines `RustOutputSymbol`, exported `RustVisibility`/`RustSymbolKind`, `memberSpaces`, and `copy()`.
- `packages/rust/src/symbols/index.ts` exports the symbol module surface.

Test evidence:
- `packages/rust/test/rust-output-symbol.test.ts` covers instantiation, reactive property updates, `copy()`, and member-space behavior.
