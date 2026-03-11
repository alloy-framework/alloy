# E006: External Dependencies, Build File, and Polish

## Summary
Implement external crate descriptors, `Cargo.toml` generation, `std` builtins, STC wrappers, and final integration tests.

## Why This Epic Exists
External crate support and build file generation are essential for real-world use. Polish ensures the package is production-ready and consistent with other Alloy language packages.

## Goals
- Implement `createCrate()` factory for external crate descriptors.
- Implement `std` builtin crate descriptor.
- Implement `CargoTomlFile` component.
- Implement dependency tracking on `RustCrateScope`.
- Implement STC wrappers for all key components.
- Verify all barrel exports are complete.
- Pass all golden scenario tests.

## In Scope
- `createCrate()` factory with descriptor pattern.
- `std` builtins (Option, Result, Vec, String, HashMap, fmt::Display, etc.).
- `CargoTomlFile` with [package] and [dependencies] sections.
- Dependency auto-tracking when external crate symbols are referenced.
- STC wrappers in `src/components/stc/index.ts`.
- Golden scenario tests matching PRD section 7.
- Edge case tests (empty structs, empty enums, etc.).

## Out of Scope
- Cargo workspace support.
- Feature flags in Cargo.toml.
- Dev dependencies section.

## Dependencies
- E001–E005 (all prior epics).

## What It Enables
- Complete MVP delivery.
- Real-world usage for code generation targeting Rust.

## Risks / Notes
- `createCrate()` must follow the SymbolCreator protocol used by existing packages. Study `packages/go/src/create-module.ts` and `packages/csharp/src/create-library.ts`.
- TOML formatting is string-based (no TOML library needed for simple cases).
- Prelude handling: std prelude types should not generate `use` statements.

## Task List
- [T028: createCrate() factory](../tasks/T028-create-crate.md)
- [T029: std builtin descriptors](../tasks/T029-std-builtins.md)
- [T030: CargoTomlFile component](../tasks/T030-cargo-toml.md)
- [T031: External crate dependency tracking](../tasks/T031-dependency-tracking.md)
- [T032: STC wrappers](../tasks/T032-stc-wrappers.md)
- [T033: Barrel exports verification](../tasks/T033-barrel-exports.md)
- [T034: Golden scenario tests](../tasks/T034-golden-scenarios.md)
- [T035: Edge case tests](../tasks/T035-edge-cases.md)

## Sequencing Notes
T028 → T029 → T031 (dependency chain). T030 depends on T031. T032–T035 can be done in parallel after T028–T031.

## Completion Criteria
- `cargo-toml.test.tsx` passes.
- External crate references generate `use` + `Cargo.toml` dependency.
- All golden scenarios from PRD section 7 pass.
- STC wrappers exist for all key components.
- All barrel exports verified complete.
- Full test suite green.
