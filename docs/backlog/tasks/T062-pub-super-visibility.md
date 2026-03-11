# T062 — pub(super) Visibility + Visibility Prop Refactor

| Field | Value |
|-------|-------|
| **ID** | T062 |
| **Epic** | [E009](../epics/E009-language-feature-gaps.md) |
| **Type** | feature |
| **Status** | open |
| **Priority** | P2 — should-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T011 (StructDeclaration), T012 (EnumDeclaration), T013 (FunctionDeclaration) |
| **Blocks** | — |

---

## Description

Currently all declaration components support `pub` and `pub(crate)` as separate boolean props, but `pub(super)` is missing. The `RustVisibility` type includes `"pub(super)"` but no component prop exposes it.

Consider refactoring from separate boolean props to a single `visibility` prop:

```typescript
// Current (boolean props):
<StructDeclaration name="Foo" pub />
<StructDeclaration name="Bar" pub_crate />

// Proposed (single prop):
<StructDeclaration name="Foo" visibility="pub" />
<StructDeclaration name="Bar" visibility="pub(crate)" />
<StructDeclaration name="Baz" visibility="pub(super)" />
```

---

## Scope Included

- Add `pub(super)` support to all declaration components
- Either add `pub_super` boolean prop (minimal change) or refactor to unified `visibility` prop (breaking change)
- Update Field, FunctionDeclaration, StructDeclaration, EnumDeclaration, ConstDeclaration, TypeAlias, etc.
- Unit tests

---

## Acceptance Criteria

- [ ] `pub(super)` visibility works on all declarations
- [ ] Existing `pub` and `pub(crate)` behavior preserved
- [ ] RustVisibility type fully utilized
