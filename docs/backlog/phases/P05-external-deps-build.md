# P05: External Dependencies and Build File

## Goal

Support external crate references and Cargo.toml generation.

## Why This Phase Exists

Real-world Rust code uses external crates (serde, tokio, etc.). Without this, generated code can't reference third-party libraries.

## Included Epics

- [E006: External Dependencies, Build File, and Polish](../epics/E006-external-deps-build-polish.md) (T028–T031)

## Included Tasks

| ID   | Title                              | Type    |
| ---- | ---------------------------------- | ------- |
| T028 | createCrate() factory              | feature |
| T029 | std builtin descriptors            | feature |
| T030 | CargoTomlFile component            | feature |
| T031 | External crate dependency tracking | feature |

## Exit Criteria

- `cargo-toml.test.tsx` passes.
- External crate references generate `use` + Cargo.toml dependency.
- std builtin types available.

## Risks

- SymbolCreator protocol is complex. Study existing implementations carefully.
