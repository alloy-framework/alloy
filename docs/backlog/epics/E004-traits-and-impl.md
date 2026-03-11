# E004: Traits and Impl Blocks

## Summary
Implement trait declarations and impl blocks — the Rust-specific constructs that have no direct analog in existing Alloy language packages.

## Why This Epic Exists
Traits and impl blocks are central to Rust's type system. Without them, generated code cannot define behavior for types. Impl blocks are architecturally novel for Alloy since methods are declared separately from types.

## Goals
- Implement `TraitDeclaration` with method signatures, default implementations, and supertraits.
- Implement `ImplBlock` for both inherent and trait implementations.
- Support `self` receiver auto-injection in methods inside impl blocks.
- Methods in impl blocks are added to the target type's member space.

## In Scope
- `TraitDeclaration` component and `RustTraitScope`.
- `ImplBlock` component and `RustImplScope`.
- `FunctionDeclaration` `receiver` prop for `&self`, `&mut self`, `self`.
- Member symbol creation for impl methods.

## Out of Scope
- Associated types (render inline for now).
- Default trait implementations via `impl Default for Type`.
- Trait objects (`dyn Trait`).

## Dependencies
- E002 (RustImplScope, RustTraitScope already defined).
- E003 (FunctionDeclaration, TypeParameters, WhereClause).

## What It Enables
- Complete type system for Rust code generation.
- E005 (external crate traits can be referenced in derives/impls).

## Risks / Notes
- Impl blocks can add members to a type defined elsewhere. The member scope must correctly append to the type's existing member space without conflicts.
- Multiple impl blocks for the same type must coexist.
- Self receiver handling needs clear design — recommend `receiver` prop with default `"&self"` inside impl blocks.

## Task List
- [T019: TraitDeclaration](../tasks/T019-trait-declaration.md)
- [T020: ImplBlock](../tasks/T020-impl-block.md)
- [T021: Self receiver in FunctionDeclaration](../tasks/T021-self-receiver.md)

## Sequencing Notes
T019 and T020 can be done in parallel. T021 depends on T020 (needs ImplBlock context).

## Completion Criteria
- `trait.test.tsx` and `impl.test.tsx` pass.
- Trait with methods and default impls renders correctly.
- Inherent impl and trait impl render correctly.
- Methods inside impl blocks auto-get `&self` receiver.
