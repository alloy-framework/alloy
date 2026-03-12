# T069 — ImplBlock Generic Parameter Forwarding

| Field | Value |
|-------|-------|
| **ID** | T069 |
| **Epic** | [E007](../epics/E007-bug-fixes.md) |
| **Type** | bug |
| **Status** | pending |
| **Priority** | P0 — critical |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T020 (ImplBlock), T017 (TypeParameters) |
| **Blocks** | — |

---

## Description

When a struct or enum has generic type parameters, the `ImplBlock` component does not forward those generic parameters to the `impl` line. For example, a `Store<K, V>` struct produces `impl Store` instead of the correct `impl<K, V> Store<K, V>`.

This causes compilation failure because Rust requires generic parameters to be declared on the `impl` block and applied to the target type.

---

## Scope Included

- Fix `ImplBlock` to forward generic type parameters from the target type
- Render `impl<K, V> Store<K, V>` when the target struct/enum has generics
- Handle trait impls: `impl<K, V> Display for Store<K, V>`
- Ensure where clauses are also forwarded correctly

---

## Scope Excluded

- Generic parameters introduced only on the impl block (not from the target type)
- Lifetime parameters on impl blocks (tracked separately if needed)

---

## Acceptance Criteria

- [ ] `impl<K, V> Store<K, V> { ... }` renders correctly when `Store` has generic params `<K, V>`
- [ ] `impl<K, V> Display for Store<K, V> { ... }` renders correctly for trait impls
- [ ] Where clauses from the target type are included on the impl block
- [ ] Existing ImplBlock tests continue to pass
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes

---

## Evidence

Discovered during rust-example review on 2026-03-12. The sample `Store<K, V>` struct's impl block renders without generic parameters, causing `cargo check` to fail.
