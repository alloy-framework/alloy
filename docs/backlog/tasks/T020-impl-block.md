# T020: ImplBlock Component

| Field            | Value                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| **ID**           | T020                                                                  |
| **Epic**         | [E004 — Traits and Impl Blocks](../epics/E004-traits-and-impl.md)    |
| **Type**         | feature                                                               |
| **Status**       | done                                                                  |
| **Priority**     | high                                                                  |
| **Owner**        | AI coding agent                                                       |
| **AI Executable**| yes                                                                   |
| **Human Review** | yes                                                                   |
| **Dependencies** | T006, T010, T013, T017, T019                                         |
| **Blocks**       | T021                                                                  |

---

## Description

Implement the `ImplBlock` component for the `@alloy-js/rust` package. Impl blocks in Rust attach methods and associated items to a type (inherent impl) or implement a trait for a type (trait impl). This construct has no direct analog in existing Alloy language packages — it is architecturally novel because methods are declared separately from the type definition.

## Goal

Enable generation of both inherent and trait impl blocks, with methods correctly added to the target type's member space.

## Scope

- Create `src/components/impl-block.tsx`.
- Define `ImplBlockProps` interface:
  - `type: Refkey | Children` — the target type being implemented.
  - `trait?: Refkey | Children` — optional trait being implemented for the type.
  - `typeParameters?: Children` — generic type parameters.
  - `whereClause?: Children` — where clause content.
  - `children?: Children` — impl body (methods, associated items).
- Create a `RustImplScope` with the target type as owner.
- Methods declared inside the impl block are added to the target type's "members" space.
- Create `test/impl.test.tsx`.

## Out of Scope

- Associated types as first-class props (render inline).
- Negative impls (`impl !Send for Type`).
- `unsafe impl`.
- Multiple impl blocks merging member spaces (each impl block independently adds to the type).

## Context Files

- `packages/rust/src/symbols/rust-impl-scope.ts` — the scope type to use (from T006).
- `packages/rust/src/components/function-declaration.tsx` — method rendering (from T013).
- `packages/rust/src/components/type-parameters.tsx` — generic parameters (from T017).
- `packages/rust/src/symbols/named-type-symbol.ts` — symbol for target type resolution (from T010).
- `packages/rust/src/components/trait-declaration.tsx` — trait that may be implemented (from T019).

## Implementation Guidance

1. **File**: `packages/rust/src/components/impl-block.tsx`.
2. **Props**: Do NOT destructure — use `props.type`, `props.trait`, etc.
3. **Scope**: Create a `RustImplScope`. The scope should track the target type so that methods declared as children can be added to the type's member space.
4. **Type resolution**: `props.type` can be a `Refkey` (resolve to type name) or `Children` (render inline).
5. **Inherent impl rendering**:
   ```
   impl<TypeParams> TypeName [where WhereClause] {
       fn method(&self) { ... }
   }
   ```
6. **Trait impl rendering**:
   ```
   impl<TypeParams> TraitName for TypeName [where WhereClause] {
       fn method(&self) { ... }
   }
   ```
7. **Member registration**: When a `FunctionDeclaration` is rendered inside an `ImplBlock`, it should be registered in the target type's member namespace. This allows other code to reference `Type::method`.
8. **Use `code` template tag** for raw string rendering.
9. **No direct analog** in existing packages — design from Rust semantics and Alloy patterns.

## Acceptance Criteria

- [x] `ImplBlock` renders an inherent impl with methods.
- [x] `ImplBlock` renders a trait impl with methods.
- [x] `ImplBlock` renders with type parameters.
- [x] `ImplBlock` renders with a where clause.
- [x] Methods inside impl block are added to target type's member space.
- [x] `props.type` works with both `Refkey` and inline `Children`.
- [x] `props.trait` works with both `Refkey` and inline `Children`.

## Definition of Done

- `src/components/impl-block.tsx` exists and exports `ImplBlock`.
- `ImplBlockProps` interface is exported.
- `test/impl.test.tsx` passes with all acceptance criteria covered.
- Component is re-exported from `src/components/index.ts`.

## Validation

```bash
cd packages/rust
npx vitest run test/impl.test.tsx
```
