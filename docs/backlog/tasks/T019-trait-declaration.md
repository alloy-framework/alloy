# T019: TraitDeclaration Component

| Field            | Value                                                                 |
| ---------------- | --------------------------------------------------------------------- |
| **ID**           | T019                                                                  |
| **Epic**         | [E004 — Traits and Impl Blocks](../epics/E004-traits-and-impl.md)    |
| **Type**         | feature                                                               |
| **Status**       | pending                                                               |
| **Priority**     | high                                                                  |
| **Owner**        | AI coding agent                                                       |
| **AI Executable**| yes                                                                   |
| **Human Review** | yes                                                                   |
| **Dependencies** | T006, T010, T013, T017                                                |
| **Blocks**       | T020                                                                  |

---

## Description

Implement the `TraitDeclaration` component for the `@alloy-js/rust` package. Traits are Rust's primary abstraction mechanism for defining shared behavior. This component must create a `NamedTypeSymbol` with `typeKind: "trait"`, establish a `RustTraitScope`, and render the full trait syntax including visibility, name, type parameters, supertraits, where clauses, and body.

## Goal

Enable generation of Rust trait declarations with method signatures, default implementations, supertraits, and generic type parameters.

## Scope

- Create `src/components/trait-declaration.tsx`.
- Define `TraitDeclarationProps` interface:
  - `name: string` — trait name.
  - `refkey?: Refkey` — optional refkey for cross-referencing.
  - `pub?: boolean` — visibility modifier.
  - `typeParameters?: Children` — generic type parameters.
  - `supertraits?: Children[]` — list of supertrait bounds (rendered as `Trait1 + Trait2`).
  - `whereClause?: Children` — where clause content.
  - `doc?: Children` — doc comment content.
  - `children?: Children` — trait body (method signatures and default implementations).
- Create a `NamedTypeSymbol` with `typeKind: "trait"` in the enclosing scope.
- Create a `RustTraitScope` as the trait body scope.
- Methods inside the trait are method signatures (no body) or default implementations (with body).
- Create `test/trait.test.tsx`.

## Out of Scope

- Associated types (render inline as raw content for now).
- Trait objects (`dyn Trait`).
- Auto traits.
- Negative impls.

## Context Files

The implementation agent should read these files first:

- `packages/csharp/src/components/interface/InterfaceDeclaration.tsx` — closest analog in existing Alloy packages.
- `packages/rust/src/symbols/rust-trait-scope.ts` — the scope type to use (from T006).
- `packages/rust/src/components/function-declaration.tsx` — method rendering (from T013).
- `packages/rust/src/components/type-parameters.tsx` — generic parameters (from T017).
- `packages/rust/src/symbols/named-type-symbol.ts` — symbol creation (from T010).

## Implementation Guidance

1. **File**: `packages/rust/src/components/trait-declaration.tsx`.
2. **Props interface**: Define `TraitDeclarationProps` with all props listed above. Do NOT destructure props in the component definition — use `props.name`, `props.pub`, etc.
3. **Symbol creation**: Use the binder to create a `NamedTypeSymbol` with `typeKind: "trait"` in the enclosing scope.
4. **Scope**: Create a `RustTraitScope` as the body scope. Methods declared as children are registered in this scope.
5. **Rendering pattern**:
   ```
   /// doc comment
   [pub ]trait Name<TypeParams>[: Super1 + Super2][ where WhereClause] {
       method_signature_1;
       method_signature_2;
       fn default_method(&self) {
           // body
       }
   }
   ```
6. **Supertraits**: Join `props.supertraits` with ` + ` separator. Prefix with `: ` if non-empty.
7. **Use `code` template tag** for raw string fragments.
8. **Reference the C# `InterfaceDeclaration`** for the overall component structure, symbol creation, and scope management patterns.

## Acceptance Criteria

- [ ] `TraitDeclaration` renders a basic trait with no methods.
- [ ] `TraitDeclaration` renders a trait with method signatures (no body).
- [ ] `TraitDeclaration` renders a trait with supertraits (`: Display + Debug`).
- [ ] `TraitDeclaration` renders a trait with default method implementations.
- [ ] `TraitDeclaration` renders a trait with type parameters and where clause.
- [ ] `TraitDeclaration` with `pub` renders `pub trait`.
- [ ] Doc comments render correctly above the trait.
- [ ] A `NamedTypeSymbol` with `typeKind: "trait"` is created and resolvable via refkey.

## Definition of Done

- `src/components/trait-declaration.tsx` exists and exports `TraitDeclaration`.
- `TraitDeclarationProps` interface is exported.
- `test/trait.test.tsx` passes with all acceptance criteria covered.
- Component is re-exported from `src/components/index.ts`.

## Validation

```bash
cd packages/rust
npx vitest run test/trait.test.tsx
```
