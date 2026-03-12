# T070 — ImplBlock Trait Name Missing Use Import

| Field | Value |
|-------|-------|
| **ID** | T070 |
| **Epic** | [E007](../epics/E007-bug-fixes.md) |
| **Type** | bug |
| **Status** | pending |
| **Priority** | P0 — critical |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T020 (ImplBlock), T022 (Reference resolution) |
| **Blocks** | — |

---

## Description

When an `ImplBlock` references a trait (e.g., `impl Display for MyType`), the trait name is rendered in the `impl` line but no corresponding `use` statement is generated. For external traits like `std::fmt::Display`, this means the generated code compiles only if the user manually adds `use std::fmt::Display;`.

The trait reference in the impl block header should trigger the same import resolution as `Reference` does for type annotations.

---

## Scope Included

- Ensure that the trait name in `ImplBlock` triggers `use` statement generation via the reference/import system
- Handle both local and external (cross-crate) trait references
- Handle both `impl Trait for Type` and blanket impl patterns

---

## Scope Excluded

- Auto-importing method signatures from the trait (trait method body generation)
- Supertraits import resolution (separate concern)

---

## Acceptance Criteria

- [ ] `impl Display for MyType` generates `use std::fmt::Display;` when `Display` is from `std::fmt`
- [ ] Local trait impls (same crate) generate appropriate `use crate::...` paths
- [ ] No duplicate `use` statements when the trait is already imported for other reasons
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes

---

## Evidence

Discovered during rust-example review on 2026-03-12. The `impl Display for StoreError` block renders the trait name but no `use std::fmt::Display;` is generated.
