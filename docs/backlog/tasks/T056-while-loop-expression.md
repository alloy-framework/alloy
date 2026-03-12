# T056 — WhileExpression + LoopExpression Components

| Field | Value |
|-------|-------|
| **ID** | T056 |
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

`while` and `loop` are fundamental control flow constructs in Rust. `loop` is the only way to create unconditional infinite loops and is commonly used with `break` to return values.

```rust
while condition {
    do_work();
}

while let Some(item) = iter.next() {
    process(item);
}

loop {
    if done { break result; }
}
```

---

## Proposed API

```tsx
// while:
<WhileExpression condition="!stack.is_empty()">
  {code`process(stack.pop());`}
</WhileExpression>

// while let:
<WhileExpression condition="let Some(item) = iter.next()">
  {code`process(item);`}
</WhileExpression>

// loop:
<LoopExpression>
  {code`if done { break result; }`}
</LoopExpression>

// With label:
<LoopExpression label="'retry">
  ...
</LoopExpression>
```

### Props

```typescript
interface WhileExpressionProps {
  condition: Children;   // Condition or "let pattern = expr"
  label?: string;        // Optional loop label
  children: Children;
}

interface LoopExpressionProps {
  label?: string;        // Optional loop label
  children: Children;
}
```

---

## Scope Included

- `packages/rust/src/components/while-expression.tsx` — WhileExpression
- `packages/rust/src/components/loop-expression.tsx` — LoopExpression
- Optional loop labels on both
- `while let` via condition prop (same pattern as IfExpression)
- STC wrappers
- Unit tests

---

## Acceptance Criteria

- [x] `<WhileExpression condition={...}>` renders `while condition { body }`
- [x] `while let` works via condition prop
- [x] `<LoopExpression>` renders `loop { body }`
- [x] Label prop renders `'label: while/loop { body }`
- [x] STC wrappers exported
