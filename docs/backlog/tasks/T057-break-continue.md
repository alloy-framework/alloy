# T057 — BreakExpression + ContinueExpression Components

| Field                     | Value                                                         |
| ------------------------- | ------------------------------------------------------------- |
| **ID**                    | T057                                                          |
| **Epic**                  | [E008](../epics/E008-expression-components.md)                |
| **Type**                  | feature                                                       |
| **Status**                | done                                                          |
| **Priority**              | P2 — should-have                                              |
| **Owner Role**            | AI coding agent                                               |
| **AI Executable**         | Yes                                                           |
| **Human Review Required** | No                                                            |
| **Dependencies**          | T055 (ForExpression), T056 (WhileExpression + LoopExpression) |
| **Blocks**                | —                                                             |

---

## Description

`break` and `continue` are loop control expressions. In Rust, `break` can carry a value (to return from `loop`), and both support loop labels for nested loop control.

```rust
break;
break 'outer;
break value;
break 'outer value;
continue;
continue 'outer;
```

---

## Proposed API

```tsx
<BreakExpression />                          // break;
<BreakExpression label="'outer" />           // break 'outer;
<BreakExpression>{code`result`}</BreakExpression>  // break result;
<BreakExpression label="'outer">{code`result`}</BreakExpression> // break 'outer result;

<ContinueExpression />                       // continue;
<ContinueExpression label="'outer" />        // continue 'outer;
```

### Props

```typescript
interface BreakExpressionProps {
  label?: string; // Optional loop label
  children?: Children; // Optional break value
}

interface ContinueExpressionProps {
  label?: string; // Optional loop label
}
```

---

## Scope Included

- `packages/rust/src/components/break-expression.tsx`
- `packages/rust/src/components/continue-expression.tsx`
- STC wrappers
- Unit tests

---

## Acceptance Criteria

- [x] `<BreakExpression />` renders `break`
- [x] `<BreakExpression label="'outer">value</BreakExpression>` renders `break 'outer value`
- [x] `<ContinueExpression />` renders `continue`
- [x] `<ContinueExpression label="'outer" />` renders `continue 'outer`
- [x] STC wrappers exported
