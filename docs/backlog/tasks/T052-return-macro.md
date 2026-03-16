# T052 — ReturnExpression + MacroCall Components

| Field                     | Value                                          |
| ------------------------- | ---------------------------------------------- |
| **ID**                    | T052                                           |
| **Epic**                  | [E008](../epics/E008-expression-components.md) |
| **Type**                  | feature                                        |
| **Status**                | done                                           |
| **Priority**              | P3 — nice-to-have                              |
| **Owner Role**            | AI coding agent                                |
| **AI Executable**         | Yes                                            |
| **Human Review Required** | No                                             |
| **Dependencies**          | T009 (SourceFile / CrateDirectory)             |
| **Blocks**                | T053 (Update rust-example sample)              |

---

## Description

Two small but useful expression components: early returns and macro invocations. These appear multiple times in the sample and are common in all Rust code.

---

## Goal

Provide `ReturnExpression` and `MacroCall` components.

---

## Proposed API

### ReturnExpression

```tsx
<ReturnExpression>{code`Err(StoreError::NotFound)`}</ReturnExpression>
// Renders: return Err(StoreError::NotFound)

<ReturnExpression />
// Renders: return
```

```typescript
interface ReturnExpressionProps {
  children?: Children; // Return value (omit for bare return)
}
```

### MacroCall

```tsx
<MacroCall name="format" args={[`"store::{}"`, `self.data.len()`]} />
// Renders: format!("store::{}", self.data.len())

<MacroCall name="vec" args={["1", "2", "3"]} />
// Renders: vec![1, 2, 3]

<MacroCall name="println" args={[`"Hello, {}!"`, `name`]} />
// Renders: println!("Hello, {}!", name)
```

```typescript
interface MacroCallProps {
  name: string; // Macro name (without !)
  args?: Children[]; // Arguments
  bracket?: "paren" | "bracket" | "brace"; // Delimiter style (default: paren)
}
```

---

## Scope Included

- `packages/rust/src/components/return-expression.tsx`
- `packages/rust/src/components/macro-call.tsx`
- Macro delimiter styles: `()` (default), `[]` (for `vec!`), `{}` (for `macro_rules!` invocations)
- STC wrappers for both
- Unit tests

---

## Scope Excluded

- `macro_rules!` definition component (separate task)
- Proc macro support

---

## Acceptance Criteria

- [x] `<ReturnExpression>value</ReturnExpression>` renders `return value`
- [x] `<ReturnExpression />` renders `return`
- [x] `<MacroCall name="format" args={[...]}>` renders `format!(...)`
- [x] `bracket="bracket"` renders `vec![...]`
- [x] STC wrappers exported

---

## Evidence

2 return expressions and 1 format macro in `samples/rust-example/store-module.tsx`. Macros like `format!`, `println!`, `vec!`, `write!`, `todo!`, `unimplemented!` are fundamental to Rust.
