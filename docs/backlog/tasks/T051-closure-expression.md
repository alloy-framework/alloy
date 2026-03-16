# T051 — ClosureExpression Component

| Field                     | Value                                          |
| ------------------------- | ---------------------------------------------- |
| **ID**                    | T051                                           |
| **Epic**                  | [E008](../epics/E008-expression-components.md) |
| **Type**                  | feature                                        |
| **Status**                | done                                           |
| **Priority**              | P2 — should-have                               |
| **Owner Role**            | AI coding agent                                |
| **AI Executable**         | Yes                                            |
| **Human Review Required** | No                                             |
| **Dependencies**          | T009 (SourceFile / CrateDirectory)             |
| **Blocks**                | T053 (Update rust-example sample)              |

---

## Description

Rust closures are used extensively with iterators (`.map()`, `.filter()`, `.retain()`, etc.). The sample has 1 closure in raw code, but any iterator-heavy code generator will produce many more.

---

## Goal

Provide a `ClosureExpression` component for Rust closure expressions.

---

## Proposed API

```tsx
// Simple closure:
<ClosureExpression parameters={[{ name: "_" }, { name: "entry" }]}>
  {code`entry.is_valid()`}
</ClosureExpression>
// Renders: |_, entry| entry.is_valid()

// Multi-line closure:
<ClosureExpression parameters={[{ name: "_" }, { name: "entry" }]}>
  <IfExpression condition="let Some(ttl) = entry.ttl">
    {code`entry.created_at.elapsed() <= ttl`}
    <ElseClause>{code`true`}</ElseClause>
  </IfExpression>
</ClosureExpression>
// Renders: |_, entry| { if let Some(ttl) = entry.ttl { ... } else { true } }

// Move closure with return type:
<ClosureExpression parameters={[{ name: "x", type: "i32" }]} move returnType="bool">
  {code`x > 0`}
</ClosureExpression>
// Renders: move |x: i32| -> bool { x > 0 }
```

### Props

```typescript
interface ClosureParam {
  name: string;
  type?: Children;
}

interface ClosureExpressionProps {
  parameters: ClosureParam[];
  move?: boolean; // move keyword for ownership capture
  returnType?: Children; // Optional return type annotation
  children: Children; // Closure body
}
```

---

## Scope Included

- `packages/rust/src/components/closure-expression.tsx`
- Parameter list with optional type annotations
- `move` keyword support
- Optional return type
- Single-expression vs block body rendering
- STC wrapper
- Unit tests

---

## Scope Excluded

- Async closures (`async move || {}`)
- Fn trait bounds (covered by TypeParameters)

---

## Acceptance Criteria

- [x] `<ClosureExpression parameters={[...]}>body</ClosureExpression>` renders `|params| body`
- [x] Multi-statement body auto-wraps in braces
- [x] `move` prop renders `move |params| body`
- [x] `returnType` prop renders `|params| -> Type { body }`
- [x] Parameter types render `|x: Type|`
- [x] STC wrapper exported

---

## Evidence

1 closure in `samples/rust-example/store-module.tsx` — `.retain(|_, entry| { ... })` in evict_expired method. Closures are ubiquitous in idiomatic Rust iterator chains.

Implemented in:

- `packages/rust/src/components/closure-expression.tsx`
- `packages/rust/src/components/index.ts`
- `packages/rust/src/components/stc/index.ts`
- `packages/rust/test/closure-expression.test.tsx`
