# E005: Module System and Imports

## Summary

Implement Rust's module system with automatic `use` statement generation, `mod` declarations, and multi-module crate support.

## Why This Epic Exists

Rust requires explicit `mod` declarations and `use` imports. Without this, generated code cannot span multiple files. This is the most architecturally complex part of the language package.

## Goals

- Implement `RustModuleScope.addUse()` for import tracking.
- Implement `Reference` component with full resolution and import triggering.
- Implement `UseStatement` / `UseStatements` with path grouping (`use path::{A, B};`).
- Implement `ModuleDirectory` for submodule directories.
- Implement auto-generation of `mod` declarations in parent modules.
- Import sorting: `std::` → external → `crate::`.
- Prelude type handling (no `use` for `Option`, `Result`, `Vec`, `String`, etc.).

## In Scope

- `use crate::path::Symbol;` for same-crate cross-module references.
- `use <crate>::Symbol;` for external crate references.
- `use path::{A, B};` tree grouping.
- `mod name;` auto-generation.
- `ModuleDirectory` component.
- Import sorting and grouping with blank lines.

## Out of Scope

- `pub use` re-exports.
- `use path::*` glob imports.
- `self::` and `super::` path shortcuts (use `crate::` paths).

## Dependencies

- E002 (RustModuleScope, RustCrateScope with tracking methods).
- E003 (SourceFile, Reference, CrateDirectory).

## What It Enables

- Multi-module crate generation.
- E006 (external crate references trigger use + dependency tracking).

## Risks / Notes

- This is the hardest part. Study Go's implementation (`packages/go/src/symbols/reference.ts`, `packages/go/src/components/ImportStatement.tsx`) closely.
- `use` path construction from `ResolutionResult` requires walking `pathDown` to build `crate::module::submodule::Symbol`.
- Prelude types must be skipped — maintain a prelude list.
- `mod` declarations must respect visibility (`pub mod` vs `mod`).

## Task List

- [T022: Reference resolution with use tracking](../tasks/T022-reference-resolution.md)
- [T023: UseStatement and UseStatements components](../tasks/T023-use-statements.md)
- [T024: ModuleDirectory component](../tasks/T024-module-directory.md)
- [T025: Auto mod declaration generation](../tasks/T025-mod-declarations.md)
- [T026: Cross-module import integration tests](../tasks/T026-import-integration-tests.md)
- [T027: Module structure integration tests](../tasks/T027-module-structure-tests.md)

## Sequencing Notes

T022 → T023 → T024 → T025 → T026 → T027 (mostly sequential — each builds on the previous).

## Completion Criteria

- `imports.test.tsx`, `reference.test.tsx`, `module-structure.test.tsx` pass.
- Cross-module references auto-generate correct `use` statements.
- `mod` declarations auto-generated in crate root and parent modules.
- Import sorting follows Rust convention.
