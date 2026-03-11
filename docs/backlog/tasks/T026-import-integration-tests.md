# T026: Import Integration Tests

| Field            | Value                                                                       |
| ---------------- | --------------------------------------------------------------------------- |
| **ID**           | T026                                                                        |
| **Epic**         | [E005 — Module System & Imports](../epics/E005-module-system-imports.md)    |
| **Type**         | test                                                                        |
| **Status**       | pending                                                                     |
| **Priority**     | high                                                                        |
| **Owner**        | AI coding agent                                                             |
| **AI Executable**| yes                                                                         |
| **Human Review** | yes                                                                         |
| **Dependencies** | T022, T023, T025                                                            |
| **Blocks**       | —                                                                           |

---

## Description

Create comprehensive integration tests for the import and reference resolution system. These tests exercise the full pipeline: symbol creation → cross-module reference → resolution → use statement generation → rendering.

## Goal

Validate that the import system works end-to-end across all reference scenarios, catching integration issues that unit tests on individual components might miss.

## Scope

- Create `test/imports.test.tsx` with integration tests covering:
  1. Same-module reference: symbol and reference in the same file → no `use` generated.
  2. Same-crate, different module: symbol in `models/mod.rs`, reference in `routes/mod.rs` → `use crate::models::Symbol;`.
  3. Multiple imports from same path: two symbols from same module → `use crate::models::{SymbolA, SymbolB};`.
  4. Import sorting: mix of `std::`, external, and `crate::` imports → correct group order with blank lines.
  5. Prelude types: reference to `Option`, `Result`, `Vec` → no `use` statement.
- Create `test/reference.test.tsx` with reference resolution tests:
  1. Resolve refkey to same-module symbol.
  2. Resolve refkey to different-module symbol (same crate).
  3. Resolve refkey to external crate symbol.
  4. Prelude type bypass.
- **Negative test:** Reference to a private symbol from another module should produce a diagnostic error or warning (similar to Go's uppercase export check).

## Out of Scope

- Performance testing.
- Concurrent resolution.
- Error recovery for unresolvable references.

## Context Files

- `packages/rust/src/symbols/reference.tsx` — reference resolution (from T022).
- `packages/rust/src/components/use-statement.tsx` — use statement rendering (from T023).
- `packages/rust/src/components/source-file.tsx` — file rendering with imports.
- `packages/rust/src/components/crate-directory.tsx` — crate setup (from T009).
- `packages/go/test/` — reference for test patterns in existing Alloy packages.

## Implementation Guidance

1. **File**: `packages/rust/test/imports.test.tsx` and `packages/rust/test/reference.test.tsx`.
2. **Test structure**: Each test should set up a minimal crate with source files, declare symbols, reference them, and assert on the rendered output.
3. **Same-module test**:
   ```tsx
   // Define struct and function in same file
   // Reference struct from function return type
   // Assert: no use statement in output
   ```
4. **Cross-module test**:
   ```tsx
   // Define struct in models/mod.rs
   // Reference struct from routes/mod.rs
   // Assert: use crate::models::StructName; appears in routes/mod.rs output
   ```
5. **Grouped imports test**:
   ```tsx
   // Reference two symbols from same module
   // Assert: use crate::models::{SymbolA, SymbolB};
   ```
6. **Sorting test**:
   ```tsx
   // Reference symbols from std, external crate, and crate modules
   // Assert: std first, then external, then crate, with blank lines
   ```
7. **Prelude test**:
   ```tsx
   // Reference Option, Result, Vec
   // Assert: no use statements generated
   ```
8. **Use `toStringOutput()` or equivalent** from test utilities to capture rendered output.

## Acceptance Criteria

- [ ] Same-module reference generates no `use` statement.
- [ ] Cross-module reference generates correct `use crate::...` statement.
- [ ] Multiple imports from same path are grouped with braces.
- [ ] Import sorting follows `std` → external → `crate` convention.
- [ ] Prelude types do not generate `use` statements.
- [ ] Reference resolution returns correct symbol for all scenarios.

## Definition of Done

- `test/imports.test.tsx` exists and all tests pass.
- `test/reference.test.tsx` exists and all tests pass.
- Tests cover all five import scenarios and four reference scenarios.

## Validation

```bash
cd packages/rust
npx vitest run test/imports.test.tsx
npx vitest run test/reference.test.tsx
```
