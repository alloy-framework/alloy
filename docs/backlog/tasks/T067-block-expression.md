# T067 — BlockExpression Component

| Field | Value |
|-------|-------|
| **ID** | T067 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | feature |
| **Status** | open |
| **Priority** | P3 — nice-to-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T009 (SourceFile / CrateDirectory) |
| **Blocks** | — |

---

## Description

In Rust, blocks are expressions that return the value of their last expression. This is used for complex initializations, scoped bindings, and anywhere an expression needs intermediate computation.

```rust
let x = {
    let a = compute();
    let b = transform(a);
    a + b
};
```

---

## Proposed API

```tsx
<LetBinding name="x">
  <BlockExpression>
    <LetBinding name="a">{code`compute()`}</LetBinding>
    <LetBinding name="b">{code`transform(a)`}</LetBinding>
    {code`a + b`}
  </BlockExpression>
</LetBinding>
```

### Props

```typescript
interface BlockExpressionProps {
  children: Children;
}
```

---

## Scope Included

- `packages/rust/src/components/block-expression.tsx`
- Renders `{ body }` with proper indentation
- Last expression returned (no semicolon on final line)
- STC wrapper
- Unit tests

---

## Acceptance Criteria

- [ ] `<BlockExpression>body</BlockExpression>` renders `{ body }`
- [ ] Properly indented
- [ ] Composable with LetBinding and other components
- [ ] STC wrapper exported
