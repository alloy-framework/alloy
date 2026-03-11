# T025: Mod Declarations

| Field            | Value                                                                       |
| ---------------- | --------------------------------------------------------------------------- |
| **ID**           | T025                                                                        |
| **Epic**         | [E005 — Module System & Imports](../epics/E005-module-system-imports.md)    |
| **Type**         | feature                                                                     |
| **Status**       | pending                                                                     |
| **Priority**     | medium                                                                      |
| **Owner**        | AI coding agent                                                             |
| **AI Executable**| yes                                                                         |
| **Human Review** | yes                                                                         |
| **Dependencies** | T009, T024                                                                  |
| **Blocks**       | T027                                                                        |

---

## Description

Update `SourceFile` to auto-generate `mod name;` declarations for registered child modules. In Rust, a module must be declared in its parent module's file (e.g., `lib.rs` declares `mod models;`). This task automates that declaration based on the child modules registered in the `RustModuleScope`.

## Goal

Eliminate manual `mod` declaration management — child modules are automatically declared in their parent module's file.

## Scope

- Update `SourceFile` (or create a `ModDeclarations` component) to render `mod` declarations.
- Read child modules from `RustModuleScope.childModules`.
- Render `pub mod name;` or `mod name;` based on module visibility.
- Sort `mod` declarations alphabetically.
- Only render `mod` declarations in module root files: crate root (`lib.rs` / `main.rs`) or module roots (`mod.rs`).
- Position `mod` declarations before `use` statements and main content.
- Update `test/source-file.test.tsx` or create `test/mod-declarations.test.tsx`.

## Out of Scope

- Inline module bodies (`mod name { ... }`).
- Conditional compilation on modules (`#[cfg(...)] mod name;`).
- `#[path = "..."]` attributes.

## Context Files

- `packages/rust/src/components/source-file.tsx` — file to update (from T009).
- `packages/rust/src/symbols/rust-module-scope.ts` — scope with child module tracking (from T005).
- `packages/rust/src/components/module-directory.tsx` — registers child modules (from T024).

## Implementation Guidance

1. **File**: Update `packages/rust/src/components/source-file.tsx` or create `packages/rust/src/components/mod-declarations.tsx`.
2. **Reading child modules**: Access `RustModuleScope.childModules` — a list of `{ name: string, pub: boolean }` entries registered by `ModuleDirectory` and `SourceFile` children.
3. **Rendering**:
   ```
   mod auth;
   pub mod models;
   pub mod routes;
   ```
4. **Sorting**: Alphabetical by module name.
5. **Positioning**: `mod` declarations appear first in the file, before `use` statements and main content. The order in a Rust file is: `mod` declarations → `use` statements → items.
6. **Module root detection**: Only render `mod` declarations if the current file is a module root. Detect by checking if the file is `lib.rs`, `main.rs`, or `mod.rs`.
7. **Use `code` template tag** for raw string fragments.

## Acceptance Criteria

- [ ] Crate root (`lib.rs`) renders `mod` declarations for child modules.
- [ ] Module root (`mod.rs`) renders `mod` declarations for nested child modules.
- [ ] `pub mod name;` renders for public modules.
- [ ] `mod name;` renders for private modules.
- [ ] `mod` declarations are sorted alphabetically.
- [ ] `mod` declarations appear before `use` statements.
- [ ] Non-root files do not render `mod` declarations.
- [ ] A crate with 3 modules generates correct `mod` declarations.

## Definition of Done

- `SourceFile` (or `ModDeclarations`) correctly renders `mod` declarations.
- Tests pass with all acceptance criteria covered.
- Changes are re-exported if new components are created.

## Validation

```bash
cd packages/rust
npx vitest run test/mod-declarations.test.tsx
npx vitest run test/source-file.test.tsx
```
