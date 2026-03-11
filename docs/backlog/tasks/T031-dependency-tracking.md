# T031: Dependency Tracking

| Field            | Value                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------- |
| **ID**           | T031                                                                                    |
| **Epic**         | [E006 — External Deps, Build & Polish](../epics/E006-external-deps-build-polish.md)    |
| **Type**         | feature                                                                                 |
| **Status**       | pending                                                                                 |
| **Priority**     | high                                                                                    |
| **Owner**        | AI coding agent                                                                         |
| **AI Executable**| yes                                                                                     |
| **Human Review** | yes                                                                                     |
| **Dependencies** | T005, T022, T028                                                                        |
| **Blocks**       | —                                                                                       |

---

## Description

Wire up the full dependency tracking pipeline: when reference resolution detects an external crate symbol, the crate dependency is automatically registered in `RustCrateScope.dependencies`, which is then consumed by `CargoTomlFile` to render the `[dependencies]` section.

## Goal

Ensure that referencing any symbol from an external crate automatically adds that crate to `Cargo.toml` dependencies without manual intervention.

## Scope

- Update `RustCrateScope` to expose a `dependencies` map: `Map<string, CrateDependency>`.
- Add `addDependency(name: string, dependency: CrateDependency)` method to `RustCrateScope`.
- Update reference resolution (T022) to call `crateScope.addDependency()` when resolving an external crate symbol.
- Ensure `createCrate()` descriptors (T028) provide crate name and version for dependency registration.
- `CargoTomlFile` (T030) reads `crateScope.dependencies`.
- Create `test/dependency-tracking.test.tsx`.

## Out of Scope

- Feature flag tracking per-reference.
- Dev dependencies.
- Build dependencies.
- Dependency version conflict resolution.

## Context Files

- `packages/rust/src/symbols/rust-crate-scope.ts` — crate scope to update (from T005).
- `packages/rust/src/symbols/reference.tsx` — reference resolution to update (from T022).
- `packages/rust/src/create-crate.ts` — crate factory with version info (from T028).
- `packages/rust/src/components/cargo-toml-file.tsx` — consumes dependencies (from T030).

## Implementation Guidance

1. **RustCrateScope update**: Add a `dependencies` property (e.g., `Map<string, CrateDependency>`) and an `addDependency()` method. If the same crate is added multiple times, keep the first registration (or merge features).
2. **Reference resolution update**: In the external-crate branch of `ref()`, after generating the use path, also call:
   ```ts
   crateScope.addDependency(externalCrate.name, {
     version: externalCrate.version,
   });
   ```
3. **createCrate integration**: Ensure the crate descriptor's `name` and `version` are accessible during resolution so the dependency can be registered with the correct version.
4. **End-to-end test**: Create a test that:
   - Defines an external crate via `createCrate({ name: "serde", version: "1.0", ... })`.
   - References `serde::Serialize` from a source file.
   - Asserts that the rendered `Cargo.toml` includes `serde = "1.0"` in `[dependencies]`.
5. **Deduplication**: If the same crate is referenced from multiple files, only one dependency entry should appear.

## Acceptance Criteria

- [ ] `RustCrateScope.dependencies` tracks registered dependencies.
- [ ] `addDependency()` correctly adds a crate dependency.
- [ ] Reference to external crate symbol auto-registers dependency.
- [ ] Duplicate references to same crate produce single dependency entry.
- [ ] `CargoTomlFile` renders auto-tracked dependencies.
- [ ] End-to-end: reference `serde::Serialize` → `Cargo.toml` includes `serde = "1.0"`.

## Definition of Done

- `RustCrateScope` has `dependencies` and `addDependency()`.
- Reference resolution calls `addDependency()` for external crates.
- `test/dependency-tracking.test.tsx` passes with all acceptance criteria covered.

## Validation

```bash
cd packages/rust
npx vitest run test/dependency-tracking.test.tsx
```
