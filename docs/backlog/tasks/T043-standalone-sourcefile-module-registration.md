# T043 — Standalone SourceFile Module Registration

| Field | Value |
|-------|-------|
| **ID** | T043 |
| **Epic** | [E007](../epics/E007-bug-fixes.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P1 — must-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T009 (SourceFile / CrateDirectory), T025 (ModDeclarations) |
| **Blocks** | — |

---

## Description

A `<SourceFile path="config.rs" />` placed directly inside `<CrateDirectory>` does not auto-register as a child module. In Rust, a file `config.rs` next to `lib.rs` should generate `mod config;` in `lib.rs`. Currently, only `<ModuleDirectory>` calls `addChildModule()` on the parent scope.

This means standalone source files (not inside a ModuleDirectory) are invisible to the module system and their `mod` declarations are missing from the crate root.

---

## Goal

Non-root `SourceFile` components (paths that aren't `lib.rs`, `main.rs`, or `mod.rs`) automatically register as child modules in their parent scope.

---

## Scope Included

- Modify `packages/rust/src/components/source-file.tsx` to call `scopeParent.addChildModule()` for non-root files
- Extract module name from filename (e.g., `config.rs` → `config`)
- Optionally support a `pub` prop on SourceFile for visibility control
- Add tests for standalone file module registration

---

## Scope Excluded

- Changes to ModuleDirectory behavior
- Nested path handling (e.g., `foo/bar.rs` — use ModuleDirectory for nested paths)

---

## Acceptance Criteria

- [ ] `<SourceFile path="config.rs" />` inside `<CrateDirectory>` generates `mod config;` in lib.rs
- [ ] `<SourceFile path="config.rs" pub />` generates `pub mod config;`
- [ ] Root files (`lib.rs`, `main.rs`, `mod.rs`) are NOT registered as child modules
- [ ] Module registration works alongside ModuleDirectory children
- [ ] Existing tests continue to pass

---

## Evidence

Discovered in `samples/rust-example/` where `config.rs` is a standalone SourceFile. The generated `lib.rs` has `pub mod error; pub mod store; pub mod traits;` (from ModuleDirectories) but no `mod config;`.
