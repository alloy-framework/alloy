# T054 — Lifetime Parameter Support

| Field | Value |
|-------|-------|
| **ID** | T054 |
| **Epic** | [E009](../epics/E009-language-feature-gaps.md) |
| **Type** | feature |
| **Status** | done |
| **Priority** | P1 — must-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T017 (TypeParameters) |
| **Blocks** | — |

---

## Description

Lifetimes are a core Rust feature with no current support in the package. The `TypeParameters` component and `TypeParameterProp` interface only handle type parameters (`<T, U>`), not lifetime parameters (`<'a, 'b>`). Lifetime annotations are needed on functions, structs, enums, traits, and impl blocks.

```rust
fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() > b.len() { a } else { b }
}

struct Ref<'a, T> {
    data: &'a T,
}
```

---

## Goal

Extend `TypeParameters` and `TypeParameterProp` to support lifetime parameters alongside type parameters.

---

## Proposed API

```tsx
<FunctionDeclaration
  name="longest"
  typeParameters={[
    { lifetime: "'a" },
  ]}
  parameters={[
    { name: "a", type: "&'a str" },
    { name: "b", type: "&'a str" },
  ]}
  returnType="&'a str"
>
  ...
</FunctionDeclaration>

// Lifetime + type parameters:
<StructDeclaration
  name="Ref"
  typeParameters={[
    { lifetime: "'a" },
    { name: "T" },
  ]}
>
  <Field name="data" type="&'a T" />
</StructDeclaration>

// Lifetime bounds:
<FunctionDeclaration
  name="example"
  typeParameters={[
    { lifetime: "'a" },
    { lifetime: "'b", constraint: "'a" },
    { name: "T", constraint: "'a + Clone" },
  ]}
/>
```

### Props Extension

```typescript
interface TypeParameterProp {
  name?: string;           // Type parameter name (existing)
  lifetime?: string;       // Lifetime name (e.g., "'a") — new
  constraint?: string;     // Bounds (existing, works for both)
}
```

---

## Scope Included

- Extend `TypeParameterProp` to accept `lifetime` as alternative to `name`
- Lifetimes render before type parameters (`<'a, 'b, T, U>`)
- Lifetime bounds (`'b: 'a`)
- Lifetime constraints on type parameters (`T: 'a + Clone`)
- Works on functions, structs, enums, traits, and impl blocks
- Unit tests

---

## Acceptance Criteria

- [x] `{ lifetime: "'a" }` renders `'a` in type parameter list
- [x] Lifetimes appear before type parameters in output
- [x] Lifetime bounds render correctly (`'b: 'a`)
- [x] Type parameters with lifetime bounds render (`T: 'a + Clone`)
- [x] Existing type parameter tests continue to pass

## Implementation Notes

- Extended `TypeParameterProp` with optional `lifetime` support while preserving existing `name`-based parameters.
- Updated `TypeParameters` rendering to order lifetimes before type parameters regardless of input order.
- Added direct unit coverage in `packages/rust/test/type-parameters.test.tsx` and integration coverage in `packages/rust/test/lifetime-parameters.test.tsx` for function/struct/enum/trait/impl use-cases.
