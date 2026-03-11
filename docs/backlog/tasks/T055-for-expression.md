# T055 — ForExpression Component

| Field | Value |
|-------|-------|
| **ID** | T055 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | feature |
| **Status** | done |
| **Priority** | P1 — must-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T009 (SourceFile / CrateDirectory) |
| **Blocks** | — |

---

## Description

`for` loops are the most common iteration pattern in Rust. No component exists for them.

```rust
for item in collection {
    process(item);
}

for (i, val) in list.iter().enumerate() {
    println!("{}: {}", i, val);
}
```

---

## Proposed API

```tsx
<ForExpression pattern="item" iterator="collection">
  {code`process(item);`}
</ForExpression>

<ForExpression pattern="(i, val)" iterator="list.iter().enumerate()">
  ...
</ForExpression>

// With label:
<ForExpression label="'outer" pattern="x" iterator="0..10">
  ...
</ForExpression>
```

### Props

```typescript
interface ForExpressionProps {
  pattern: Children;     // Loop variable or destructuring pattern
  iterator: Children;    // The iterable expression
  label?: string;        // Optional loop label ('outer)
  children: Children;    // Loop body
}
```

---

## Scope Included

- `packages/rust/src/components/for-expression.tsx`
- Renders `for pattern in iterator { body }`
- Optional loop label
- STC wrapper
- Unit tests

---

## Acceptance Criteria

- [x] `<ForExpression pattern="x" iterator="items">body</ForExpression>` renders `for x in items { body }`
- [x] `label` prop renders `'label: for x in items { body }`
- [x] STC wrapper exported
