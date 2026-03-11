# E007: Bug Fixes and Rendering Corrections

## Summary
Fix bugs and rendering issues discovered during integration testing with `samples/rust-example/`. These are defects in existing components that produce incorrect Rust output.

## Why This Epic Exists
The initial MVP implementation (E001–E006) produced working components, but integration testing revealed rendering defects that produce invalid Rust code. These must be fixed before adding new features.

## Goals
- Fix Reference component to work in all scope positions (fields, parameters, return types).
- Fix missing newlines between sibling items (enum variants, struct fields, doc comments).
- Fix trait abstract method rendering (`;` instead of `{}`).
- Fix enum tuple variant syntax (`(Type)` instead of `{ Type }`).
- Auto-register standalone source files as modules.
- Improve FunctionDeclaration default receiver ergonomics.
- Fix ModDeclarations reactivity for JSX ordering independence.

## In Scope
- T039: Reference scope traversal
- T040: Missing newlines between sibling items
- T041: Trait abstract method signatures
- T042: Enum tuple variant support
- T043: Standalone SourceFile module registration
- T044: FunctionDeclaration default receiver
- T045: ModDeclarations render order dependency

## Out of Scope
- New components or features (those are in E008/E009).
- Changes to the core Alloy rendering engine.

## Dependencies
- E001–E006 (existing implementation must be complete).

## What It Enables
- Correct Rust output from all existing components.
- Unblocks expression components (E008) and language feature gaps (E009).
- Unblocks the sample project update (T053).

## Risks / Notes
- T039 (Reference scope traversal) is the highest-impact fix — it enables type-safe references everywhere.
- T040 (newlines) affects all generated output — likely requires changes to multiple components.
- Some fixes may require test updates for changed output formatting.

## Task List
- [T039: Reference scope traversal](../tasks/T039-reference-scope-traversal.md) — P0
- [T040: Missing newlines between sibling items](../tasks/T040-missing-newlines-between-items.md) — P0
- [T041: Trait abstract method signatures](../tasks/T041-trait-abstract-methods.md) — P1
- [T042: Enum tuple variant support](../tasks/T042-enum-tuple-variants.md) — P1
- [T043: Standalone SourceFile module registration](../tasks/T043-standalone-sourcefile-module-registration.md) — P1
- [T044: FunctionDeclaration default receiver](../tasks/T044-function-default-receiver.md) — P2
- [T045: ModDeclarations render order dependency](../tasks/T045-mod-declarations-render-order.md) — P2

## Sequencing Notes
T039 and T040 are P0 and can be worked in parallel. T041–T043 are P1 and independent. T044–T045 are P2 improvements.

## Completion Criteria
- All 7 bug fix tasks completed and tested.
- Generated Rust output has correct formatting (newlines, indentation).
- Reference component works in all scope positions.
- Trait methods render correct abstract signatures.
- Enum tuple variants use correct syntax.
- `samples/rust-example/` can be updated to use Reference in all type positions.
