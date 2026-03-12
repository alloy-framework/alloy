# T065 — UnsafeBlock Component

| Field | Value |
|-------|-------|
| **ID** | T065 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | feature |
| **Status** | done |
| **Priority** | P3 — nice-to-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T009 (SourceFile / CrateDirectory) |
| **Blocks** | — |

---

## Description

`unsafe fn` is supported via `FunctionDeclaration`'s `unsafe` prop, but `unsafe` blocks (inline unsafe code regions) have no component.

```rust
let ptr = &value as *const i32;
let val = unsafe { *ptr };

unsafe {
    libc::free(ptr);
}
```

---

## Proposed API

```tsx
<UnsafeBlock>
  {code`*ptr`}
</UnsafeBlock>
// Renders: unsafe { *ptr }
```

### Props

```typescript
interface UnsafeBlockProps {
  children: Children;
}
```

---

## Scope Included

- `packages/rust/src/components/unsafe-block.tsx`
- STC wrapper
- Unit tests

---

## Acceptance Criteria

- [x] `<UnsafeBlock>body</UnsafeBlock>` renders `unsafe { body }`
- [x] Multi-line bodies properly indented
- [x] STC wrapper exported
