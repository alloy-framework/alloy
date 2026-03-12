# T063 — AssociatedType in Traits

| Field | Value |
|-------|-------|
| **ID** | T063 |
| **Epic** | [E009](../epics/E009-language-feature-gaps.md) |
| **Type** | feature |
| **Status** | done |
| **Priority** | P2 — should-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T019 (TraitDeclaration) |
| **Blocks** | — |

---

## Description

Rust traits can declare associated types, which are commonly used in the standard library (`Iterator::Item`, `Deref::Target`, etc.):

```rust
trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}

impl Iterator for Counter {
    type Item = u32;
    fn next(&mut self) -> Option<Self::Item> { ... }
}
```

No component exists for `type Item;` inside a trait or `type Item = u32;` inside an impl block.

---

## Proposed API

```tsx
// In trait:
<TraitDeclaration name="Iterator" pub>
  <AssociatedType name="Item" />
  <FunctionDeclaration name="next" receiver="&mut self" returnType="Option<Self::Item>" />
</TraitDeclaration>

// In impl:
<ImplBlock type={iteratorKey} trait={counterKey}>
  <AssociatedType name="Item">u32</AssociatedType>
  ...
</ImplBlock>

// With bounds:
<AssociatedType name="Error" constraint="std::error::Error + Send" />
```

### Props

```typescript
interface AssociatedTypeProps {
  name: string;
  constraint?: Children;   // Bounds (in trait declaration)
  children?: Children;     // Concrete type (in impl block)
}
```

---

## Scope Included

- `packages/rust/src/components/associated-type.tsx`
- Abstract form `type Name;` (in traits)
- Abstract with bounds `type Name: Bound;` (in traits)
- Concrete form `type Name = Type;` (in impl blocks)
- STC wrapper
- Unit tests

---

## Acceptance Criteria

- [x] `<AssociatedType name="Item" />` in trait renders `type Item;`
- [x] `<AssociatedType name="Item" constraint="Clone" />` renders `type Item: Clone;`
- [x] `<AssociatedType name="Item">u32</AssociatedType>` in impl renders `type Item = u32;`
- [x] STC wrapper exported

## Completion Note

- Completed on 2026-03-12.
- Implemented in key files: `packages/rust/src/components/associated-type.tsx`, `packages/rust/src/components/index.ts`, `packages/rust/src/components/stc/index.ts`, and `packages/rust/test/associated-types.test.tsx`.
