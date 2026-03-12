# T064 — QuestionMarkOperator Component

| Field | Value |
|-------|-------|
| **ID** | T064 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | feature |
| **Status** | done |
| **Priority** | P2 — should-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T009 (SourceFile / CrateDirectory) |
| **Blocks** | — |

---

## Description

The `?` operator is Rust's primary error propagation mechanism, used on `Result` and `Option` values. It's one of the most distinctive and commonly-used Rust syntax features.

```rust
let text = std::fs::read_to_string("file.txt")?;
let value = map.get("key").ok_or(Error::NotFound)?;
let parsed: i32 = input.parse()?;
```

---

## Proposed API

```tsx
<TryExpression>{code`std::fs::read_to_string("file.txt")`}</TryExpression>
// Renders: std::fs::read_to_string("file.txt")?

// Composable with FunctionCallExpression:
<TryExpression>
  <FunctionCallExpression target="std::fs::read_to_string" args={[`"file.txt"`]} />
</TryExpression>
```

### Props

```typescript
interface TryExpressionProps {
  children: Children;    // The expression to apply ? to
}
```

---

## Scope Included

- `packages/rust/src/components/try-expression.tsx`
- Postfix `?` rendering
- STC wrapper
- Unit tests

---

## Acceptance Criteria

- [x] `<TryExpression>expr</TryExpression>` renders `expr?`
- [x] Composes with other expression components
- [x] STC wrapper exported
