# T074 — Cargo.toml Renders Empty [dependencies] Section

| Field | Value |
|-------|-------|
| **ID** | T074 |
| **Epic** | [E007](../epics/E007-bug-fixes.md) |
| **Type** | bug |
| **Status** | pending |
| **Priority** | P3 — cosmetic |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T030 (CargoTomlFile), T031 (Dependency tracking) |
| **Blocks** | — |

---

## Description

When a crate has no external dependencies, `CargoTomlFile` still renders an empty `[dependencies]` section in the generated `Cargo.toml`. While this is technically valid TOML and does not cause compilation errors, it is not idiomatic — Rust projects typically omit the section entirely when there are no dependencies.

---

## Scope Included

- Suppress `[dependencies]` section when there are no external crate dependencies
- Keep rendering it (with entries) when dependencies exist

---

## Scope Excluded

- `[dev-dependencies]` or `[build-dependencies]` sections
- Workspace dependency inheritance

---

## Acceptance Criteria

- [ ] No `[dependencies]` header appears in Cargo.toml when dependency list is empty
- [ ] `[dependencies]` with entries renders correctly when dependencies exist
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes

---

## Evidence

Discovered during rust-example review on 2026-03-12. Generated Cargo.toml includes `[dependencies]` with no entries.
