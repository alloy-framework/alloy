# T059 — StaticDeclaration Component

| Field | Value |
|-------|-------|
| **ID** | T059 |
| **Epic** | [E009](../epics/E009-language-feature-gaps.md) |
| **Type** | feature |
| **Status** | done |
| **Priority** | P2 — should-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T014 (TypeAlias + ConstDeclaration) |
| **Blocks** | — |

---

## Description

Rust has `static` items in addition to `const` items. Statics have a fixed memory address and can be mutable (`static mut`), while consts are inlined. The package has `ConstDeclaration` but no `StaticDeclaration`.

```rust
static COUNTER: AtomicUsize = AtomicUsize::new(0);
static mut BUFFER: Vec<u8> = Vec::new();
```

---

## Proposed API

```tsx
<StaticDeclaration name="COUNTER" pub type="AtomicUsize">
  {code`AtomicUsize::new(0)`}
</StaticDeclaration>

<StaticDeclaration name="BUFFER" mutable type="Vec<u8>">
  {code`Vec::new()`}
</StaticDeclaration>
```

### Props

```typescript
interface StaticDeclarationProps {
  name: string;
  refkey?: Refkey;
  pub?: boolean;
  pub_crate?: boolean;
  mutable?: boolean;     // static mut
  type: Children;
  children?: Children;   // Initializer
}
```

---

## Scope Included

- `packages/rust/src/components/static-declaration.tsx`
- `static` and `static mut` items
- Visibility, type annotation, initializer
- STC wrapper
- Unit tests

---

## Acceptance Criteria

- [x] `<StaticDeclaration name="X" type="T">value</StaticDeclaration>` renders `static X: T = value;`
- [x] `mutable` prop renders `static mut X: T = value;`
- [x] Visibility props work
- [x] STC wrapper exported
