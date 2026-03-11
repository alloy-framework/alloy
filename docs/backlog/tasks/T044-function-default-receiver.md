# T044 — FunctionDeclaration Default Receiver in Impl Blocks

| Field | Value |
|-------|-------|
| **ID** | T044 |
| **Epic** | [E006](../epics/E006-external-deps-build-polish.md) |
| **Type** | improvement |
| **Status** | open |
| **Priority** | P2 — should-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T013 (FunctionDeclaration), T021 (Self Receiver) |
| **Blocks** | — |

---

## Description

When `FunctionDeclaration` is inside an `ImplBlock` or `TraitDeclaration` and the `receiver` prop is not specified, it defaults to `"&self"` (line 36 in `function-declaration.tsx`):

```typescript
const effectiveReceiver = isMethod ? (props.receiver ?? "&self") : "none";
```

This makes it impossible to write associated functions (like constructors) without explicitly passing `receiver="none"`:

```tsx
// Must do this for every constructor:
<FunctionDeclaration name="new" receiver="none" returnType="Self">
```

While Rust methods commonly use `&self`, associated functions (constructors, factory methods) are equally common and the implicit `&self` is surprising.

---

## Goal

Evaluate and improve the default receiver behavior for functions in impl blocks.

---

## Scope Included

- Review whether defaulting to `"&self"` is the right design choice
- Option A: Change default to `"none"` (explicit receivers always required)
- Option B: Keep current default but document it clearly
- Option C: Use heuristics (e.g., functions named `new` default to `"none"`)
- Update tests and documentation for whichever option is chosen

---

## Scope Excluded

- Free functions (already default to no receiver)

---

## Acceptance Criteria

- [ ] Design decision documented
- [ ] If default changes, all existing tests updated
- [ ] Associated functions like `new()` have a clear, ergonomic pattern

---

## Evidence

Discovered in `samples/rust-example/` where `Store::new()` and `Config::new()` required explicit `receiver="none"`. The default at `packages/rust/src/components/function-declaration.tsx:36`.
