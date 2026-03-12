# T071 — Prelude Type Shadowing Causes Missing Imports

| Field | Value |
|-------|-------|
| **ID** | T071 |
| **Epic** | [E007](../epics/E007-bug-fixes.md) |
| **Type** | bug |
| **Status** | done |
| **Priority** | P1 — must-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T022 (Reference resolution) |
| **Blocks** | — |

---

## Description

When a crate defines a custom type alias that shadows a Rust prelude type (e.g., `type Result<T> = std::result::Result<T, StoreError>`), the reference resolution system incorrectly skips generating a `use` import for the custom alias. It treats the name as a prelude type and assumes it's already in scope.

This causes compilation failure when other modules reference `crate::error::Result` — the import is suppressed because `Result` is a prelude name, but the custom definition is needed.

---

## Scope Included

- Detect when a local type shadows a prelude name
- Generate `use crate::...::ShadowedType;` even when the name matches a prelude type
- Ensure that actual prelude types (not shadowed) still skip import generation

---

## Scope Excluded

- Renaming or aliasing strategies (e.g., `use crate::error::Result as ErrorResult`)
- Prelude trait method shadowing

---

## Acceptance Criteria

- [ ] `use crate::error::Result;` is generated when referencing a custom `Result` type alias
- [ ] Standard prelude types (`Option`, `Vec`, `String`, etc.) still skip import when not shadowed
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes

---

## Evidence

Discovered during rust-example review on 2026-03-12. The `traits-module.tsx` had to use raw `crate::error::Result` paths as a workaround because the import system suppressed the `use` for shadowed `Result`.

Fixed on 2026-03-12: The `ref()` function in `reference.ts` now checks whether a prelude-named symbol is declared in the same crate. If so, it treats it as a user-defined shadow and generates the `use` import normally. Only truly external/unresolved prelude types skip import generation.
