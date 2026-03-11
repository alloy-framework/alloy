# T049 — LetBinding Component

| Field | Value |
|-------|-------|
| **ID** | T049 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | feature |
| **Status** | open |
| **Priority** | P2 — should-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T009 (SourceFile / CrateDirectory) |
| **Blocks** | T053 (Update rust-example sample) |

---

## Description

Variable bindings (`let` / `let mut`) are fundamental to Rust function bodies. The sample embeds them in raw code blocks. A dedicated component enables composability with other expression components.

---

## Goal

Provide a `LetBinding` component for Rust variable declarations.

---

## Proposed API

```tsx
// Simple binding:
<LetBinding name="before">
  {code`self.data.len()`}
</LetBinding>
// Renders: let before = self.data.len();

// Mutable binding with type:
<LetBinding name="entry" mutable type="Entry<V>">
  <StructExpression type="Entry">...</StructExpression>
</LetBinding>
// Renders: let mut entry: Entry<V> = Entry { ... };

// Destructuring (pattern as name):
<LetBinding name="(key, value)">
  {code`pair`}
</LetBinding>
// Renders: let (key, value) = pair;
```

### Props

```typescript
interface LetBindingProps {
  name: string;          // Variable name or destructuring pattern
  mutable?: boolean;     // let mut
  type?: Children;       // Optional type annotation
  children?: Children;   // Initializer expression
}
```

---

## Scope Included

- `packages/rust/src/components/let-binding.tsx`
- `let` / `let mut` with optional type annotation and initializer
- Trailing semicolon
- STC wrapper
- Unit tests

---

## Scope Excluded

- Symbol registration in scope (future enhancement)
- `const` bindings in function bodies (use `ConstDeclaration`)

---

## Acceptance Criteria

- [ ] `<LetBinding name="x">value</LetBinding>` renders `let x = value;`
- [ ] `mutable` prop renders `let mut x = value;`
- [ ] `type` prop renders `let x: Type = value;`
- [ ] Without children renders `let x;` (uninitialized)
- [ ] STC wrapper exported

---

## Evidence

2 let-binding instances in `samples/rust-example/store-module.tsx` — `let entry = Entry { ... };` and `let before = self.data.len();`.
