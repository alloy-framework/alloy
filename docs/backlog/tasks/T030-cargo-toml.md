# T030: Cargo.toml File Generation

| Field             | Value                                                                               |
| ----------------- | ----------------------------------------------------------------------------------- |
| **ID**            | T030                                                                                |
| **Epic**          | [E006 — External Deps, Build & Polish](../epics/E006-external-deps-build-polish.md) |
| **Type**          | feature                                                                             |
| **Status**        | done                                                                                |
| **Priority**      | high                                                                                |
| **Owner**         | AI coding agent                                                                     |
| **AI Executable** | yes                                                                                 |
| **Human Review**  | yes                                                                                 |
| **Dependencies**  | T009, T031                                                                          |
| **Blocks**        | T034                                                                                |

---

## Description

Implement `CargoTomlFile` component that generates a valid `Cargo.toml` manifest file for a Rust crate. The component renders the `[package]` section and `[dependencies]` section, combining explicitly provided dependencies with those automatically tracked by the reference resolution system.

## Goal

Enable automatic `Cargo.toml` generation with correct package metadata and dependency declarations, including dependencies discovered through cross-crate references.

## Scope

- Create `src/components/cargo-toml-file.tsx`.
- Define `CargoTomlFileProps`:
  - `name: string` — package name.
  - `version?: string` — package version (default `"0.1.0"`).
  - `edition?: string` — Rust edition (default `"2021"`).
  - `dependencies?: Record<string, CrateDependency>` — explicitly declared dependencies.
- `CrateDependency` type: `string` (version only) or `{ version: string, features?: string[] }`.
- Render `[package]` section with name, version, edition.
- Render `[dependencies]` section by merging:
  - Explicit dependencies from `props.dependencies`.
  - Auto-tracked dependencies from `RustCrateScope.dependencies`.
- Sort dependencies alphabetically.
- Update `CrateDirectory` to include `CargoTomlFile` in its output.
- Create `test/cargo-toml.test.tsx`.

## Out of Scope

- `[dev-dependencies]`.
- `[build-dependencies]`.
- `[features]` section.
- `[workspace]` configuration.
- `[profile]` sections.
- `[lib]` / `[[bin]]` target configuration.

## Context Files

- `packages/rust/src/components/crate-directory.tsx` — crate directory to update (from T009).
- `packages/rust/src/symbols/rust-crate-scope.ts` — crate scope with dependency tracking (from T005).

## Implementation Guidance

1. **File**: `packages/rust/src/components/cargo-toml-file.tsx`.
2. **Props**: Do NOT destructure — use `props.name`, `props.version`, etc.
3. **TOML rendering**: Use `code` template tag to render TOML format. Do NOT use a TOML library — the output is simple enough to template directly:

   ```toml
   [package]
   name = "my-crate"
   version = "0.1.0"
   edition = "2021"

   [dependencies]
   serde = "1.0"
   tokio = { version = "1.0", features = ["full"] }
   ```

4. **Dependency merging**: Combine `props.dependencies` (explicit) with `crateScope.dependencies` (auto-tracked). If a dependency appears in both, the explicit one takes precedence.
5. **Dependency rendering**:
   - Simple version: `name = "version"`
   - With features: `name = { version = "version", features = ["feat1", "feat2"] }`
6. **Sort dependencies** alphabetically by crate name.
7. **CrateDirectory update**: Modify `CrateDirectory` to render `<CargoTomlFile>` as part of its output, passing through relevant props.
8. **File output**: Use `SourceFile` with `filetype="toml"` or render as a raw file at `Cargo.toml` path.

## Acceptance Criteria

- [x] `CargoTomlFile` renders correct `[package]` section.
- [x] `CargoTomlFile` renders `[dependencies]` with explicit dependencies.
- [x] `CargoTomlFile` merges auto-tracked dependencies from `RustCrateScope`.
- [x] Simple version dependency renders as `name = "version"`.
- [x] Dependency with features renders as `name = { version = "version", features = [...] }`.
- [x] Dependencies are sorted alphabetically.
- [x] Default version is `"0.1.0"` and default edition is `"2021"`.
- [x] `CrateDirectory` includes `CargoTomlFile` in output.

## Definition of Done

- `src/components/cargo-toml-file.tsx` exists and exports `CargoTomlFile`.
- `CargoTomlFileProps` and `CrateDependency` types are exported.
- `test/cargo-toml.test.tsx` passes with all acceptance criteria covered.
- `CrateDirectory` updated to render `CargoTomlFile`.
- Component is re-exported from `src/components/index.ts`.

## Validation

```bash
cd packages/rust
npx vitest run test/cargo-toml.test.tsx
```
