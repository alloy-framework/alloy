# T027: Module Structure Tests

| Field            | Value                                                                       |
| ---------------- | --------------------------------------------------------------------------- |
| **ID**           | T027                                                                        |
| **Epic**         | [E005 — Module System & Imports](../epics/E005-module-system-imports.md)    |
| **Type**         | test                                                                        |
| **Status**       | done                                                                        |
| **Priority**     | medium                                                                      |
| **Owner**        | AI coding agent                                                             |
| **AI Executable**| yes                                                                         |
| **Human Review** | yes                                                                         |
| **Dependencies** | T024, T025, T026                                                            |
| **Blocks**       | —                                                                           |

---

## Description

Create comprehensive tests for the Rust module structure system, validating that crates with multiple files, nested directories, auto-generated `mod` declarations, and cross-module references work correctly end-to-end.

## Goal

Validate that the full module system (crate → module directory → source file → mod declarations → use statements → cross-module references) works as an integrated whole.

## Scope

- Create `test/module-structure.test.tsx` with tests covering:
  1. Crate with multiple source files at root level.
  2. Nested module directories (e.g., `src/models/user/`).
  3. Auto `mod` declarations in `lib.rs` for top-level modules.
  4. Auto `mod` declarations in submodule `mod.rs` for nested modules.
  5. Cross-module references with automatic `use` generation.
  6. Full golden scenario matching PRD section 7.2: multi-module crate with `User` struct in `models` and `greet` function in `services` that references `User`.

## Out of Scope

- Workspace-level multi-crate scenarios.
- Binary crate with `main.rs`.
- Build script (`build.rs`).

## Context Files

- `packages/rust/src/components/crate-directory.tsx` — crate setup (from T009).
- `packages/rust/src/components/source-file.tsx` — file component (from T009).
- `packages/rust/src/components/module-directory.tsx` — directory module (from T024).
- `packages/rust/src/components/use-statement.tsx` — import rendering (from T023).
- `packages/rust/src/symbols/reference.tsx` — reference resolution (from T022).
- `docs/prd/` — PRD section 7.2 for the golden scenario spec.

## Implementation Guidance

1. **File**: `packages/rust/test/module-structure.test.tsx`.
2. **Multi-file crate test**:
   ```tsx
   // CrateDirectory with lib.rs + two SourceFiles (models.rs, routes.rs)
   // Assert: lib.rs contains mod models; mod routes;
   ```
3. **Nested directories test**:
   ```tsx
   // CrateDirectory > ModuleDirectory("models") > ModuleDirectory("user")
   // Assert: lib.rs has mod models;
   // Assert: models/mod.rs has mod user;
   // Assert: models/user/mod.rs exists
   ```
4. **Cross-module reference test**:
   ```tsx
   // Define User struct in models module with a refkey
   // Reference User from services module
   // Assert: services/mod.rs contains use crate::models::User;
   ```
5. **PRD 7.2 golden scenario**:
   ```tsx
   // Full multi-module crate:
   //   src/lib.rs (mod models; mod services;)
   //   src/models.rs (pub struct User { name: String, age: u32 })
   //   src/services.rs (use crate::models::User; pub fn greet(user: &User) -> String { ... })
   // Assert exact file outputs match expected
   ```
6. **Use `toStringOutput()` or equivalent** to capture and assert rendered file contents.
7. **Assert file tree structure** — validate that the correct files and directories are generated.

## Acceptance Criteria

- [x] Crate with multiple source files generates correct file tree.
- [x] Nested module directories create correct directory structure.
- [x] `lib.rs` contains auto-generated `mod` declarations for top-level modules.
- [x] `mod.rs` in subdirectories contains `mod` declarations for nested modules.
- [x] Cross-module references generate correct `use` statements.
- [x] PRD 7.2 golden scenario produces exact expected output.

## Definition of Done

- `test/module-structure.test.tsx` exists and all tests pass.
- Tests cover all six scenarios listed in scope.

## Validation

```bash
cd packages/rust
npx vitest run test/module-structure.test.tsx
```
