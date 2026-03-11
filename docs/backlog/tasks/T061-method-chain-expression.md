# T061 — MethodChainExpression Component

| Field | Value |
|-------|-------|
| **ID** | T061 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | feature |
| **Status** | open |
| **Priority** | P2 — should-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T050 (FunctionCallExpression) |
| **Blocks** | — |

---

## Description

Method chaining is ubiquitous in idiomatic Rust, especially with iterators and builders:

```rust
let result: Vec<_> = items
    .iter()
    .filter(|x| x.is_valid())
    .map(|x| x.value())
    .collect();

self.data
    .remove(key)
    .map(|entry| entry.value)
    .ok_or(StoreError::NotFound)
```

This needs a component that composes well with `FunctionCallExpression` and `ClosureExpression`.

---

## Proposed API

```tsx
<MethodChainExpression receiver="items">
  <MethodChainExpression.Call name="iter" />
  <MethodChainExpression.Call name="filter" args={[
    <ClosureExpression parameters={[{ name: "x" }]}>
      {code`x.is_valid()`}
    </ClosureExpression>
  ]} />
  <MethodChainExpression.Call name="map" args={[
    <ClosureExpression parameters={[{ name: "x" }]}>
      {code`x.value()`}
    </ClosureExpression>
  ]} />
  <MethodChainExpression.Call name="collect" typeArgs={["Vec<_>"]} />
</MethodChainExpression>
```

### Props

```typescript
interface MethodChainExpressionProps {
  receiver: Children;    // Starting expression
  children: Children;    // Chain calls
}

interface MethodChainCallProps {
  name: string;          // Method name
  args?: Children[];     // Arguments
  typeArgs?: Children[]; // Turbofish type arguments
  await?: boolean;       // .await before this call
  try?: boolean;         // ? after this call
}
```

---

## Scope Included

- `packages/rust/src/components/method-chain-expression.tsx`
- Chained `.method()` calls with proper line-wrapping
- Turbofish syntax on individual calls
- `.await` and `?` on individual chain steps
- STC wrapper
- Unit tests

---

## Precedent

C# package has `AccessExpression` with `AccessExpression.Part` sub-components for chained member access, element access, and invocations. TypeScript has `MemberExpression` with a parts-based API.

---

## Acceptance Criteria

- [ ] Chain renders with `.method()` calls
- [ ] Long chains wrap with proper indentation
- [ ] Turbofish works on individual calls
- [ ] `.await` and `?` work on individual steps
- [ ] STC wrapper exported
