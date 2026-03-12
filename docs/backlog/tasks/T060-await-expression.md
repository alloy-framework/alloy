# T060 — AwaitExpression Component

| Field | Value |
|-------|-------|
| **ID** | T060 |
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

Rust uses postfix `.await` syntax for async operations. `FunctionDeclaration` supports the `async` prop, but there's no component for `.await` expressions in function bodies.

```rust
let response = client.get(url).await?;
let data = response.json().await?;
```

---

## Proposed API

```tsx
<AwaitExpression>{code`client.get(url)`}</AwaitExpression>
// Renders: client.get(url).await

// With ? operator:
<AwaitExpression try>{code`client.get(url)`}</AwaitExpression>
// Renders: client.get(url).await?
```

### Props

```typescript
interface AwaitExpressionProps {
  try?: boolean;         // Append ? operator
  children: Children;    // The future expression
}
```

---

## Scope Included

- `packages/rust/src/components/await-expression.tsx`
- Postfix `.await` rendering
- Optional `?` operator combination
- STC wrapper
- Unit tests

---

## Acceptance Criteria

- [x] `<AwaitExpression>expr</AwaitExpression>` renders `expr.await`
- [x] `try` prop renders `expr.await?`
- [x] STC wrapper exported
