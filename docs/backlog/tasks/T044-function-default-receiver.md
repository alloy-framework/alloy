# T044 — FunctionDeclaration Default Receiver in Impl Blocks

| Field | Value |
|-------|-------|
| **ID** | T044 |
| **Epic** | [E007](../epics/E007-bug-fixes.md) |
| **Type** | improvement |
| **Status** | done |
| **Priority** | P2 — should-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T013 (FunctionDeclaration), T021 (Self Receiver) |
| **Blocks** | — |
| **Resolution** | No code changes required. Behavior is already correctly implemented: `FunctionDeclaration` defaults to `"&self"` for methods in `ImplBlock`/`TraitDeclaration`, with `receiver="none"` opt-out for associated functions. Existing tests validate the pattern. |

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

- [x] Design decision documented (default `"&self"` for methods is correct; `receiver="none"` for associated functions)
- [x] All existing tests already validate the pattern (no code changes needed)
- [x] Associated functions like `new()` have clear pattern (`receiver="none"` explicit opt-out)

---

## Evidence

Discovered in `samples/rust-example/` where `Store::new()` and `Config::new()` required explicit `receiver="none"`. The default at `packages/rust/src/components/function-declaration.tsx:36`.
