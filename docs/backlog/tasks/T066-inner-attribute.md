# T066 — InnerAttribute Component

| Field | Value |
|-------|-------|
| **ID** | T066 |
| **Epic** | [E009](../epics/E009-language-feature-gaps.md) |
| **Type** | feature |
| **Status** | open |
| **Priority** | P3 — nice-to-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T015 (Attribute) |
| **Blocks** | — |

---

## Description

Rust has inner attributes (`#![...]`) that apply to the enclosing item (module, crate, function body). The existing `Attribute` component only renders outer attributes (`#[...]`).

```rust
#![allow(dead_code)]
#![feature(async_closure)]
#![cfg_attr(test, deny(warnings))]
```

---

## Proposed API

```tsx
<InnerAttribute name="allow" args="dead_code" />
// Renders: #![allow(dead_code)]

<InnerAttribute name="feature" args="async_closure" />
// Renders: #![feature(async_closure)]
```

### Props

```typescript
interface InnerAttributeProps {
  name: string;
  args?: Children;
}
```

---

## Scope Included

- `packages/rust/src/components/inner-attribute.tsx`
- Or extend existing `Attribute` component with `inner` boolean prop
- STC wrapper
- Unit tests

---

## Acceptance Criteria

- [ ] Renders `#![name(args)]`
- [ ] Works without args: `#![name]`
- [ ] STC wrapper exported
