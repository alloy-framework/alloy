# @alloy-js/rust — Project Backlog

## Purpose

This backlog defines all work needed to implement `@alloy-js/rust`, a new Alloy language package for generating Rust source code. It is derived from the planning documents in [`docs/language-packages/rust/`](../language-packages/rust/).

## How to Use This Backlog

1. **Humans:** Read this index for a complete overview. Drill into epic and task docs for details.
2. **AI agents:** Read [`agents/execution-rules.md`](agents/execution-rules.md) first, then pick the next ready task from the task table below.
3. **Phases** show the recommended execution order. Complete one phase before starting the next.

## Backlog File Organization

```
docs/backlog/
├── index.md                    ← You are here
├── epics/                      ← Epic-level documents (6 epics)
├── tasks/                      ← Executable task documents (35 tasks)
├── phases/                     ← Implementation phase documents (6 phases)
└── agents/                     ← AI agent execution guidance
```

---

## Executive Summary

### Major Workstreams

| # | Workstream | Epic | Tasks | Phase |
|---|---|---|---|---|
| 1 | Package scaffold & test infra | E001 | T001–T002 | P01 |
| 2 | Symbol system (symbols, scopes, factories, name policy) | E002 | T003–T008 | P01 |
| 3 | Core declaration components | E003 | T009–T018 | P02 |
| 4 | Traits and impl blocks | E004 | T019–T021 | P03 |
| 5 | Module system and imports | E005 | T022–T027 | P04 |
| 6 | External deps, build file, polish | E006 | T028–T035 | P05–P06 |

### Recommended Implementation Order

**P01 → P02 → P03 → P04 → P05 → P06** (strictly sequential phases; tasks within a phase may parallelize).

### Key Risks

1. **Scope hierarchy design** (T005) is hard to change later — requires human architecture review.
2. **Reference resolution** (T022) is the most complex task — use path construction from `ResolutionResult` is error-prone.
3. **Impl blocks** (T020) are architecturally novel for Alloy — no existing package has an analog.
4. **`mod` auto-generation** (T025) must handle visibility and nesting correctly.
5. **`r#` reserved word handling** (T007) is unique to Rust — other packages use `_` suffix.

### Assumptions / Gaps / Open Questions

1. **Prelude handling:** Should `Option`, `Result`, `Vec`, `String` skip `use` generation? *Recommendation: Yes.* Must resolve before T022.
2. **Self receiver default:** Should methods in impl blocks auto-get `&self`? *Recommendation: Yes, with `receiver="none"` opt-out.* Must resolve before T021.
3. **`mod` visibility:** Should `mod` declarations default to `pub mod` or `mod`? *Recommendation: Explicit prop.* Must resolve before T025.
4. **Crate type:** Support both `lib.rs` and `main.rs`? *Recommendation: Yes, via `crateType` prop.* Must resolve before T009.
5. **`use` tree syntax:** Group `use path::{A, B};` or flatten? *Recommendation: Group (more idiomatic).* Must resolve before T023.

---

## Epic Overview

| Epic | Title | Tasks | Dependencies | Phase |
|---|---|---|---|---|
| [E001](epics/E001-package-foundation.md) | Package Foundation | T001–T002 | None | P01 |
| [E002](epics/E002-symbol-system.md) | Symbol System | T003–T008 | E001 | P01 |
| [E003](epics/E003-core-components.md) | Core Declaration Components | T009–T018 | E001, E002 | P02 |
| [E004](epics/E004-traits-and-impl.md) | Traits and Impl Blocks | T019–T021 | E002, E003 | P03 |
| [E005](epics/E005-module-system-imports.md) | Module System and Imports | T022–T027 | E002, E003 | P04 |
| [E006](epics/E006-external-deps-build-polish.md) | External Deps, Build, Polish | T028–T035 | E001–E005 | P05–P06 |

---

## Recommended Delivery Phases

| Phase | Title | Epics | Tasks | Goal |
|---|---|---|---|---|
| [P01](phases/P01-foundation.md) | Foundation | E001, E002 | T001–T008 | Package scaffold, symbols, scopes, name policy |
| [P02](phases/P02-core-components.md) | Core Components | E003 | T009–T018 | Single-file Rust declaration rendering |
| [P03](phases/P03-traits-impl.md) | Traits & Impl | E004 | T019–T021 | Traits and impl blocks |
| [P04](phases/P04-module-system.md) | Module System | E005 | T022–T027 | Multi-module crates with `use` and `mod` |
| [P05](phases/P05-external-deps-build.md) | External Deps & Build | E006 (partial) | T028–T031 | External crates and Cargo.toml |
| [P06](phases/P06-polish.md) | Polish | E006 (partial) | T032–T035 | STC wrappers, exports, golden tests |

---

## Task Summary Table

| ID | Title | Epic | Type | Priority | Deps | Status |
|---|---|---|---|---|---|---|
| [T001](tasks/T001-package-scaffold.md) | Package scaffold | E001 | foundation | P0 | — | done |
| [T002](tasks/T002-test-infrastructure.md) | Test infrastructure | E001 | foundation | P0 | T001 | done |
| [T003](tasks/T003-rust-output-symbol.md) | RustOutputSymbol base class | E002 | foundation | P0 | T001 | done |
| [T004](tasks/T004-symbol-subclasses.md) | NamedTypeSymbol + FunctionSymbol | E002 | foundation | P0 | T003 | done |
| [T005](tasks/T005-scope-hierarchy.md) | Scope hierarchy part 1 (module/crate) | E002 | foundation | P0 | T003, T004 | done |
| [T005b](tasks/T005b-scope-hierarchy-part2.md) | Scope hierarchy part 2 (function/lexical/member) | E002 | foundation | P0 | T005 | done |
| [T006](tasks/T006-symbol-factories.md) | Symbol factory functions | E002 | foundation | P0 | T003–T005 | done |
| [T007](tasks/T007-name-policy.md) | Name policy | E002 | feature | P0 | T001 | done |
| [T007b](tasks/T007b-name-conflict-resolver.md) | Name conflict resolver | E002 | feature | P1 | T003 | pending |
| [T008](tasks/T008-parameter-descriptor.md) | Parameter descriptor + hooks | E002 | foundation | P1 | T001 | done |
| [T009](tasks/T009-source-file-crate-directory.md) | SourceFile + CrateDirectory | E003 | feature | P0 | T005, T007 | done |
| [T010](tasks/T010-declaration-reference.md) | Declaration + Reference basics | E003 | feature | P0 | T006, T009 | done |
| [T011](tasks/T011-struct-declaration.md) | StructDeclaration + Field | E003 | feature | P0 | T006, T010 | pending |
| [T012](tasks/T012-enum-declaration.md) | EnumDeclaration + EnumVariant | E003 | feature | P0 | T006, T010, T015–T017 | pending |
| [T013](tasks/T013-function-declaration.md) | FunctionDeclaration + Parameters | E003 | feature | P0 | T006, T008, T010, T017 | pending |
| [T014](tasks/T014-type-alias-const.md) | TypeAlias + ConstDeclaration | E003 | feature | P1 | T006, T010 | pending |
| [T015](tasks/T015-attributes.md) | Attribute + DeriveAttribute | E003 | feature | P0 | T010 | pending |
| [T016](tasks/T016-doc-comments.md) | DocComment + ModuleDocComment | E003 | feature | P1 | T001 | pending |
| [T017](tasks/T017-type-parameters.md) | TypeParameters + WhereClause | E003 | feature | P0 | T001 | done |
| [T018](tasks/T018-value-component.md) | Value component | E003 | feature | P2 | T001 | pending |
| [T019](tasks/T019-trait-declaration.md) | TraitDeclaration | E004 | feature | P0 | T006, T010, T013, T017 | pending |
| [T020](tasks/T020-impl-block.md) | ImplBlock | E004 | feature | P0 | T006, T010, T013, T017, T019 | pending |
| [T021](tasks/T021-self-receiver.md) | Self receiver in FunctionDeclaration | E004 | feature | P0 | T013, T020 | pending |
| [T022](tasks/T022-reference-resolution.md) | Reference resolution + use tracking | E005 | feature | P0 | T005, T010 | pending |
| [T023](tasks/T023-use-statements.md) | UseStatement + UseStatements | E005 | feature | P0 | T022 | pending |
| [T024](tasks/T024-module-directory.md) | ModuleDirectory | E005 | feature | P0 | T009, T005 | pending |
| [T025](tasks/T025-mod-declarations.md) | Auto mod declarations | E005 | feature | P0 | T009, T024 | pending |
| [T026](tasks/T026-import-integration-tests.md) | Import integration tests | E005 | test | P0 | T022, T023, T025 | pending |
| [T027](tasks/T027-module-structure-tests.md) | Module structure tests | E005 | test | P0 | T024–T026 | pending |
| [T028](tasks/T028-create-crate.md) | createCrate() factory | E006 | feature | P0 | T003, T005, T006 | pending |
| [T029](tasks/T029-std-builtins.md) | std builtin descriptors | E006 | feature | P1 | T028 | pending |
| [T030](tasks/T030-cargo-toml.md) | CargoTomlFile component | E006 | feature | P0 | T009, T031 | pending |
| [T031](tasks/T031-dependency-tracking.md) | External crate dependency tracking | E006 | feature | P0 | T005, T022, T028 | pending |
| [T032](tasks/T032-stc-wrappers.md) | STC wrappers | E006 | feature | P2 | T011–T021 | pending |
| [T033](tasks/T033-barrel-exports.md) | Barrel exports verification | E006 | infra | P1 | T032 | pending |
| [T034](tasks/T034-golden-scenarios.md) | Golden scenario tests | E006 | test | P0 | T026–T027, T030–T031 | pending |
| [T035](tasks/T035-edge-cases.md) | Edge case tests | E006 | test | P1 | T011–T025 | pending |

---

## Dependency Highlights

### Critical Path
```
T001 → T003 → T004 → T005 → T005b → T006 → T010 → T011 (struct rendering)
                                   ↘ T009 ↗
                                   
T010 → T022 → T023 → T025 → T026 → T027 (module system)
       ↘ T024 ↗

T022 + T028 → T031 → T030 → T034 (external deps + golden tests)
```

### Parallel Opportunities

**After T001 completes** (parallel-safe):
- T003 (RustOutputSymbol)
- T007 (name policy)
- T008 (parameter descriptor)
- T016 (doc comments)
- T017 (type parameters)
- T018 (value component)

**After T010 completes** (parallel-safe):
- T011 (struct), T012 (enum), T013 (function), T014 (type alias/const), T015 (attributes)

**After E003 + E004 complete** (parallel-safe):
- T032 (STC), T035 (edge cases)

---

## Ready-Now Tasks

These tasks have **no dependencies** and can start immediately:

| ID | Title | Phase |
|---|---|---|
| **T001** | Package scaffold | P01 |

These pending tasks depend **only on T001** and are ready once T001 is complete:

| ID | Title | Phase |
|---|---|---|
| T008 | Parameter descriptor | P01 |
| T016 | DocComment | P02 |
| T018 | Value component | P02 |

---

## Blocked Tasks

No tasks are currently blocked.

---

## High-Priority Tasks

These P0 tasks are on the critical path and should be prioritized:

| ID | Title | Why Critical |
|---|---|---|
| T001 | Package scaffold | Blocks everything |
| T003 | RustOutputSymbol | Blocks all symbol/scope work |
| T005 | Scope hierarchy | Architecture decision — hard to change later |
| T009 | SourceFile + CrateDirectory | Blocks all component work |
| T010 | Declaration + Reference | Blocks all declaration components |
| T022 | Reference resolution | Blocks all import/module work |
| T034 | Golden scenario tests | Validates complete MVP |

---

## Links to All Documents

### Epics
- [E001: Package Foundation](epics/E001-package-foundation.md)
- [E002: Symbol System](epics/E002-symbol-system.md)
- [E003: Core Declaration Components](epics/E003-core-components.md)
- [E004: Traits and Impl Blocks](epics/E004-traits-and-impl.md)
- [E005: Module System and Imports](epics/E005-module-system-imports.md)
- [E006: External Deps, Build File, and Polish](epics/E006-external-deps-build-polish.md)

### Phases
- [P01: Foundation](phases/P01-foundation.md)
- [P02: Core Components](phases/P02-core-components.md)
- [P03: Traits & Impl](phases/P03-traits-impl.md)
- [P04: Module System](phases/P04-module-system.md)
- [P05: External Deps & Build](phases/P05-external-deps-build.md)
- [P06: Polish](phases/P06-polish.md)

### Agent Guidance
- [AI Agent Execution Rules](agents/execution-rules.md)

### Source Documents
- [01: Core Understanding](../language-packages/rust/01-core-understanding.md)
- [02: Existing Language Patterns](../language-packages/rust/02-existing-language-patterns.md)
- [03: Rust Design Notes](../language-packages/rust/03-rust-design-notes.md)
- [04: Rust PRD](../language-packages/rust/04-rust-prd.md)
