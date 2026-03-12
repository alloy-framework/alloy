# T072 — CrateDirectory Cargo.toml Missing [lib] Path

| Field | Value |
|-------|-------|
| **ID** | T072 |
| **Epic** | [E007](../epics/E007-bug-fixes.md) |
| **Type** | bug |
| **Status** | done |
| **Priority** | P1 — must-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T030 (CargoTomlFile), T038 (CrateDirectory crateType) |
| **Blocks** | — |

---

## Description

When `CrateDirectory` generates a `Cargo.toml`, it does not include a `[lib]` section with `path = "lib.rs"`. Cargo defaults to `src/lib.rs`, but `CrateDirectory` places `lib.rs` at the crate root (alongside `Cargo.toml`), so Cargo cannot find the crate entry point without an explicit path.

---

## Scope Included

- Add `[lib]` section to generated `Cargo.toml` with `path = "lib.rs"` when crate type is `lib`
- Add `[[bin]]` section with `path = "main.rs"` when crate type is `bin`
- Respect the `crateType` prop from T038

---

## Scope Excluded

- Support for multiple binary targets
- Custom lib/bin names (use defaults based on package name)
- Workspace-level Cargo.toml

---

## Acceptance Criteria

- [x] `Cargo.toml` includes `[lib]\npath = "lib.rs"` for library crates
- [x] `Cargo.toml` includes `[[bin]]\nname = "..."\npath = "main.rs"` for binary crates
- [x] `cargo check` can locate the crate root without manual edits
- [x] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes

---

## Evidence

Discovered during rust-example review on 2026-03-12. Generated crate fails `cargo check` because Cargo looks for `src/lib.rs` but the file is at `./lib.rs`.

## Completion Note

2026-03-12: Completed. `CargoTomlFile` now emits `[lib]` and `[[bin]]` target sections (including explicit `path` entries), and tests were added to verify generated `Cargo.toml` output for both crate types.
