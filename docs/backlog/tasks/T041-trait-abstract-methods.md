# T041 — Trait Methods Should Render as Abstract Signatures

| Field | Value |
|-------|-------|
| **ID** | T041 |
| **Epic** | [E007](../epics/E007-bug-fixes.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P1 — must-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T013 (FunctionDeclaration), T019 (TraitDeclaration) |
| **Blocks** | — |

---

## Description

When `<FunctionDeclaration />` is used with no children (self-closing) inside a `<TraitDeclaration>`, it renders an empty body `{}` instead of a semicolon `;`:

```rust
// Current output:
fn to_bytes(&self) -> Result<Vec<u8>> {}

// Expected output:
fn to_bytes(&self) -> Result<Vec<u8>>;
```

In Rust, trait method signatures without default implementations must end with `;`, not `{}`. An empty body `{}` is syntactically valid but semantically different — it provides a default implementation that does nothing and returns `()`.

---

## Goal

`FunctionDeclaration` with no children inside a `TraitDeclaration` renders as `fn name(...) -> Type;` (semicolon-terminated abstract signature).

---

## Scope Included

- Modify `packages/rust/src/components/function-declaration.tsx` (around line 109) to detect when:
  1. `children` is undefined/null
  2. The parent scope is `RustTraitScope`
- In that case, render `;` instead of `" {}"`

---

## Scope Excluded

- Impl block methods (empty body `{}` is valid there)
- Functions with explicit empty children (empty string/fragment)

---

## Acceptance Criteria

- [ ] Self-closing `<FunctionDeclaration />` inside `<TraitDeclaration>` renders `fn name();`
- [ ] `<FunctionDeclaration>body</FunctionDeclaration>` inside `<TraitDeclaration>` renders `fn name() { body }` (default impl)
- [ ] Functions outside traits with no children continue to render `fn name() {}`
- [ ] Existing trait tests updated

---

## Evidence

Discovered in `samples/rust-example/` generated `traits/mod.rs`. The `FunctionDeclaration` component at `packages/rust/src/components/function-declaration.tsx:109` always renders `" {}"` for empty children regardless of scope context.
