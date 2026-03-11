# T024: Module Directory

| Field            | Value                                                                       |
| ---------------- | --------------------------------------------------------------------------- |
| **ID**           | T024                                                                        |
| **Epic**         | [E005 — Module System & Imports](../epics/E005-module-system-imports.md)    |
| **Type**         | feature                                                                     |
| **Status**       | pending                                                                     |
| **Priority**     | medium                                                                      |
| **Owner**        | AI coding agent                                                             |
| **AI Executable**| yes                                                                         |
| **Human Review** | yes                                                                         |
| **Dependencies** | T009, T005                                                                  |
| **Blocks**       | T025                                                                        |

---

## Description

Implement the `ModuleDirectory` component for representing Rust modules that correspond to a filesystem directory (e.g., `src/models/` with a `mod.rs` inside). This maps to Rust's module-as-directory convention where a module named `models` is either `models.rs` or `models/mod.rs`.

## Goal

Enable generation of multi-file module structures with correct directory layout and `mod.rs` generation.

## Scope

- Create `src/components/module-directory.tsx`.
- Define `ModuleDirectoryProps`:
  - `path: string` — directory path relative to parent (e.g., `"models"`).
  - `pub?: boolean` — whether the module is publicly visible.
  - `children?: Children` — contents (source files, nested module directories).
- Create a `SourceDirectory` from `@alloy-js/core` wrapping a `RustModuleScope`.
- Register as a child module in the parent module scope (for `mod` declaration generation).
- Generate a `mod.rs` inside the directory if the directory contains child modules or source files.
- Create `test/module-directory.test.tsx`.

## Out of Scope

- Inline modules (`mod name { ... }` within a file).
- Module-level attributes (`#![...]`).
- Path attribute (`#[path = "..."]`) for non-standard module locations.

## Context Files

- `packages/go/src/components/SourceDirectory.tsx` — closest analog in existing Alloy packages.
- `packages/rust/src/components/source-file.tsx` — source file component (from T009).
- `packages/rust/src/symbols/rust-module-scope.ts` — module scope (from T005).
- `packages/core/src/components/SourceDirectory.tsx` — base directory component.

## Implementation Guidance

1. **File**: `packages/rust/src/components/module-directory.tsx`.
2. **Props**: Do NOT destructure — use `props.path`, `props.pub`, `props.children`.
3. **Directory creation**: Use `SourceDirectory` from `@alloy-js/core` to create the filesystem directory.
4. **Module scope**: Create a `RustModuleScope` for the directory, linked to the parent module scope.
5. **Parent registration**: Register this module in the parent scope's child modules list so that `mod name;` declarations can be auto-generated (see T025).
6. **mod.rs generation**: If the directory has children, generate a `mod.rs` file inside the directory. This file will contain `mod` declarations for any child modules and `use` statements.
7. **Reference**: Study `packages/go/src/components/SourceDirectory.tsx` for the pattern of wrapping `SourceDirectory` with language-specific scope.

## Acceptance Criteria

- [ ] `ModuleDirectory` creates a filesystem directory.
- [ ] `ModuleDirectory` creates a `RustModuleScope` for the directory.
- [ ] `ModuleDirectory` registers as a child module in the parent scope.
- [ ] A `mod.rs` is generated inside the directory.
- [ ] Nested `ModuleDirectory` components create nested directories.
- [ ] `pub` prop controls module visibility registration.

## Definition of Done

- `src/components/module-directory.tsx` exists and exports `ModuleDirectory`.
- `ModuleDirectoryProps` interface is exported.
- `test/module-directory.test.tsx` passes with all acceptance criteria covered.
- Component is re-exported from `src/components/index.ts`.

## Validation

```bash
cd packages/rust
npx vitest run test/module-directory.test.tsx
```
