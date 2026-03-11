# T040 — Missing Newlines Between Sibling Items

| Field | Value |
|-------|-------|
| **ID** | T040 |
| **Epic** | [E007](../epics/E007-bug-fixes.md) |
| **Type** | bug |
| **Status** | done |
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

- [x] Each enum variant starts on its own line
- [x] Each struct field starts on its own line
- [x] Doc comments are separated from the following `#[derive(...)]` or declaration by a newline
- [x] `#[derive(...)]` is on its own line above the declaration
- [x] Custom `#[attribute]` is on its own line
- [x] Existing tests updated to reflect correct formatting

---

## Evidence

Discovered in `samples/rust-example/` generated output. The `EnumDeclaration` and `StructDeclaration` components in `packages/rust/src/components/` do not add `<hbr />` joiners between their children.

---

## Implementation Summary

- Added explicit `<hbr />` sibling separators in enum and struct declaration rendering so each variant/field emits on its own line.
- Fixed spacing boundaries between doc comments, derives/attributes, and declarations so annotation and declaration blocks no longer concatenate.
- Updated formatting expectations in related tests to lock in newline behavior.

## Validation

- `pnpm --filter @alloy-js/rust build` ✅
- `pnpm --filter @alloy-js/rust test` ✅
