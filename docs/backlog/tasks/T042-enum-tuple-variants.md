# T042 — Enum Tuple Variant Support

| Field | Value |
|-------|-------|
| **ID** | T042 |
| **Epic** | [E007](../epics/E007-bug-fixes.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P1 — must-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T012 (EnumDeclaration) |
| **Blocks** | — |

---

## Description

`EnumVariant` with children renders struct-variant syntax `{ Type }` instead of tuple-variant syntax `(Type)`:

```rust
// Current output:
SerializationError {
  String
}

// Expected output:
SerializationError(String)
```

The `EnumVariantProps` interface has both `fields?: Children[]` and `children?: Children`, but the API doesn't clearly distinguish between tuple variants (parenthesized) and struct variants (braced). The `children` prop always uses brace syntax.

---

## Goal

`EnumVariant` correctly renders both tuple variants `Name(Type1, Type2)` and struct variants `Name { field: Type }`.

---

## Scope Included

- Modify `packages/rust/src/components/enum-declaration.tsx` EnumVariant component to:
  - Render tuple syntax `(...)` when `fields` prop is provided (or add a `tuple` boolean prop)
  - Render struct syntax `{ ... }` when `children` prop is provided
  - Or: add a clear API distinction (e.g., `kind: "tuple" | "struct"` prop)
- Update tests for both variant kinds
- Update documentation/examples

---

## Scope Excluded

- Unit variants (already work correctly)

---

## Acceptance Criteria

- [ ] Tuple variants render as `VariantName(Type1, Type2)`
- [ ] Struct variants render as `VariantName { field_name: Type }`
- [ ] Unit variants continue to render as `VariantName`
- [ ] Clear API to distinguish tuple vs struct variants

---

## Evidence

Discovered in `samples/rust-example/` generated `error/mod.rs`. The `EnumVariant` component at `packages/rust/src/components/enum-declaration.tsx:110-116` always renders brace syntax for children.
