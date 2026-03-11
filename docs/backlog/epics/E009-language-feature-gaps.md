# E009: Language Feature Gaps

## Summary
Add declaration and type system components for Rust features not covered in the original MVP — lifetimes, tuple structs, statics, visibility modifiers, associated types, and inner attributes.

## Why This Epic Exists
A comprehensive audit of Rust language features against the existing component inventory revealed gaps in the type system and declaration components. These are not expression-level features (covered by E008) but structural language features needed for complete Rust code generation.

## Goals
- Add lifetime parameter support to generics.
- Support tuple struct and unit struct syntax.
- Add static item declarations.
- Complete visibility modifier support (`pub(super)`).
- Add associated type support in traits and impl blocks.
- Add inner attribute support (`#![...]`).

## In Scope
- T054: Lifetime parameter support
- T058: Tuple struct declaration
- T059: StaticDeclaration
- T062: pub(super) visibility
- T063: AssociatedType in traits
- T066: InnerAttribute (#![...])

## Out of Scope
- `impl Trait` / `dyn Trait` syntax (can use raw strings).
- Destructuring patterns (requires pattern DSL infrastructure).
- `macro_rules!` definitions (too complex for code gen).
- Cargo workspace support.

## Dependencies
- E001–E006 (existing implementation).

## What It Enables
- Code generators can target lifetime-annotated APIs (common in Rust libraries).
- Newtype patterns via tuple structs.
- Complete visibility control.
- Traits with associated types (Iterator, Deref, etc.).

## Risks / Notes
- T054 (lifetimes) requires extending the TypeParameterProp interface — must be backward compatible.
- T058 (tuple structs) may extend StructDeclaration or create a new component — design decision needed.
- T062 (pub(super)) could be a simple prop addition or a visibility refactor.

## Task List
- [T054: Lifetime parameter support](../tasks/T054-lifetime-parameters.md) — P1
- [T058: Tuple struct declaration](../tasks/T058-tuple-struct.md) — P1
- [T059: StaticDeclaration](../tasks/T059-static-declaration.md) — P2
- [T062: pub(super) visibility](../tasks/T062-pub-super-visibility.md) — P2
- [T063: AssociatedType in traits](../tasks/T063-associated-type.md) — P2
- [T066: InnerAttribute](../tasks/T066-inner-attribute.md) — P3

## Sequencing Notes
T054 and T058 are P1 and independent — can be parallelized. T059, T062, T063 are P2 and independent. T066 is P3.

## Completion Criteria
- Lifetime parameters render correctly in all generic positions.
- Tuple structs and unit structs render with correct syntax.
- All Rust visibility modifiers supported.
- Associated types work in both trait declarations and impl blocks.
- Inner attributes render `#![...]` syntax.
