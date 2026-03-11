# T040 — Missing Newlines Between Sibling Items

| Field | Value |
|-------|-------|
| **ID** | T040 |
| **Epic** | [E006](../epics/E006-external-deps-build-polish.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P0 — critical |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T011 (StructDeclaration), T012 (EnumDeclaration) |
| **Blocks** | — |

---

## Description

Enum variants, struct fields, and other sibling items within container components are rendered on the same line with no line breaks between them. Doc comments concatenate directly onto the previous item's closing text.

Examples from generated output:
```
NotFound,/// The store has reached its maximum capacity.
StorageFull,
```
```
pub value: V,pub created_at: std::time::Instant,
```

Additionally, doc comments and attributes/derives run together:
```
/// Error types for the key-value store.#[derive(Debug, Clone)]
pub enum StoreError {
```

---

## Goal

Proper line breaks between all sibling items within enum declarations, struct declarations, and between doc comments and their associated declarations.

---

## Scope Included

- `packages/rust/src/components/enum-declaration.tsx` — add `<hbr />` between enum variants and between doc comment and `#[derive(...)]`/declaration
- `packages/rust/src/components/struct-declaration.tsx` — add `<hbr />` between struct fields
- Ensure doc comments, attributes, derives, and declarations each start on their own line

---

## Scope Excluded

- Changes to core rendering engine
- Other component types (these are the primary affected ones)

---

## Acceptance Criteria

- [ ] Each enum variant starts on its own line
- [ ] Each struct field starts on its own line
- [ ] Doc comments are separated from the following `#[derive(...)]` or declaration by a newline
- [ ] `#[derive(...)]` is on its own line above the declaration
- [ ] Custom `#[attribute]` is on its own line
- [ ] Existing tests updated to reflect correct formatting

---

## Evidence

Discovered in `samples/rust-example/` generated output. The `EnumDeclaration` and `StructDeclaration` components in `packages/rust/src/components/` do not add `<hbr />` joiners between their children.
