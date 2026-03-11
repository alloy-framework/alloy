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
├── epics/                      ← Epic-level documents (9 epics)
├── tasks/                      ← Executable task documents (69 tasks)
├── phases/                     ← Implementation phase documents (8 phases)
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
| 6 | External deps, build file, polish | E006 | T028–T038 | P05–P06 |
| 7 | Bug fixes and rendering corrections | E007 | T039–T045 | P07 |
| 8 | Expression and statement components | E008 | T046–T067 (expression) | P08 |
| 9 | Language feature gaps | E009 | T054–T066 (declaration) | P08 |

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
| [E006](epics/E006-external-deps-build-polish.md) | External Deps, Build, Polish | T028–T038 | E001–E005 | P05–P06 |
| [E007](epics/E007-bug-fixes.md) | Bug Fixes and Rendering Corrections | T039–T045 | E001–E006 | P07 |
| [E008](epics/E008-expression-components.md) | Expression and Statement Components | T046–T067 (expression) | E007 | P08 |
| [E009](epics/E009-language-feature-gaps.md) | Language Feature Gaps | T054–T066 (declaration) | E001–E006 | P08 |

---

## Recommended Delivery Phases

| Phase | Title | Epics | Tasks | Goal |
|---|---|---|---|---|
| [P01](phases/P01-foundation.md) | Foundation | E001, E002 | T001–T008 | Package scaffold, symbols, scopes, name policy |
| [P02](phases/P02-core-components.md) | Core Components | E003 | T009–T018 | Single-file Rust declaration rendering |
| [P03](phases/P03-traits-impl.md) | Traits & Impl | E004 | T019–T021 | Traits and impl blocks |
| [P04](phases/P04-module-system.md) | Module System | E005 | T022–T027 | Multi-module crates with `use` and `mod` |
| [P05](phases/P05-external-deps-build.md) | External Deps & Build | E006 (partial) | T028–T031 | External crates and Cargo.toml |
| [P06](phases/P06-polish.md) | Polish | E006 (partial) | T032–T038 | STC wrappers, exports, golden tests |
| P07 | Bug Fixes | E007 | T039–T045 | Fix rendering bugs discovered in integration testing |
| P08 | Expressions & Language Gaps | E008, E009 | T046–T067 | Expression components, control flow, language feature gaps |

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
| [T007b](tasks/T007b-name-conflict-resolver.md) | Name conflict resolver (local declarations win; rename imports) | E002 | feature | P1 | T003 | done |
| [T008](tasks/T008-parameter-descriptor.md) | Parameter descriptor + hooks | E002 | foundation | P1 | T001 | done |
| [T009](tasks/T009-source-file-crate-directory.md) | SourceFile + CrateDirectory | E003 | feature | P0 | T005, T007 | done |
| [T010](tasks/T010-declaration-reference.md) | Declaration + Reference basics | E003 | feature | P0 | T006, T009 | done |
| [T011](tasks/T011-struct-declaration.md) | StructDeclaration + Field | E003 | feature | P0 | T006, T010 | done |
| [T012](tasks/T012-enum-declaration.md) | EnumDeclaration + EnumVariant | E003 | feature | P0 | T006, T010, T015–T017 | done |
| [T013](tasks/T013-function-declaration.md) | FunctionDeclaration + Parameters | E003 | feature | P0 | T006, T008, T010, T017 | done |
| [T014](tasks/T014-type-alias-const.md) | TypeAlias + ConstDeclaration | E003 | feature | P1 | T006, T010 | done |
| [T015](tasks/T015-attributes.md) | Attribute + DeriveAttribute | E003 | feature | P0 | T010 | done |
| [T016](tasks/T016-doc-comments.md) | DocComment + ModuleDocComment | E003 | feature | P1 | T001 | done |
| [T017](tasks/T017-type-parameters.md) | TypeParameters + WhereClause | E003 | feature | P0 | T001 | done |
| [T018](tasks/T018-value-component.md) | Value component | E003 | feature | P2 | T001 | done |
| [T019](tasks/T019-trait-declaration.md) | TraitDeclaration | E004 | feature | P0 | T006, T010, T013, T017 | done |
| [T020](tasks/T020-impl-block.md) | ImplBlock | E004 | feature | P0 | T006, T010, T013, T017, T019 | done |
| [T021](tasks/T021-self-receiver.md) | Self receiver in FunctionDeclaration | E004 | feature | P0 | T013, T020 | done |
| [T022](tasks/T022-reference-resolution.md) | Reference resolution + use tracking | E005 | feature | P0 | T005, T010 | done |
| [T023](tasks/T023-use-statements.md) | UseStatement + UseStatements | E005 | feature | P0 | T022 | done |
| [T024](tasks/T024-module-directory.md) | ModuleDirectory | E005 | feature | P0 | T009, T005 | done |
| [T025](tasks/T025-mod-declarations.md) | Auto mod declarations | E005 | feature | P0 | T009, T024 | done |
| [T026](tasks/T026-import-integration-tests.md) | Import integration tests | E005 | test | P0 | T022, T023, T025 | done |
| [T027](tasks/T027-module-structure-tests.md) | Module structure tests | E005 | test | P0 | T024–T026 | done |
| [T028](tasks/T028-create-crate.md) | createCrate() factory | E006 | feature | P0 | T003, T005, T006 | done |
| [T029](tasks/T029-std-builtins.md) | std builtin descriptors | E006 | feature | P1 | T028 | blocked |
| [T030](tasks/T030-cargo-toml.md) | CargoTomlFile component | E006 | feature | P0 | T009, T031 | done |
| [T031](tasks/T031-dependency-tracking.md) | External crate dependency tracking | E006 | feature | P0 | T005, T022, T028 | done |
| [T032](tasks/T032-stc-wrappers.md) | STC wrappers | E006 | feature | P2 | T011–T021 | done |
| [T033](tasks/T033-barrel-exports.md) | Barrel exports verification | E006 | infra | P1 | T032 | done |
| [T034](tasks/T034-golden-scenarios.md) | Golden scenario tests | E006 | test | P0 | T026–T027, T030–T031 | done |
| [T035](tasks/T035-edge-cases.md) | Edge case tests | E006 | test | P1 | T011–T025 | done |
| [T036](tasks/T036-builtin-crate-support.md) | Builtin crate support in createCrate/ref | E006 | feature | P0 | T028 | done |
| [T037](tasks/T037-complete-stc-wrappers.md) | Complete STC wrappers | E006 | feature | P2 | T032 | done |
| [T038](tasks/T038-crate-type-prop.md) | CrateDirectory crateType prop | E006 | feature | P3 | T009 | done |
| [T039](tasks/T039-reference-scope-traversal.md) | Reference component scope traversal | E007 | bug | P0 | T010, T022 | done |
| [T040](tasks/T040-missing-newlines-between-items.md) | Missing newlines between sibling items | E007 | bug | P0 | T011, T012 | done |
| [T041](tasks/T041-trait-abstract-methods.md) | Trait methods should render as abstract signatures | E007 | bug | P1 | T013, T019 | done |
| [T042](tasks/T042-enum-tuple-variants.md) | Enum tuple variant support | E007 | bug | P1 | T012 | done |
| [T043](tasks/T043-standalone-sourcefile-module-registration.md) | Standalone SourceFile module registration | E007 | bug | P1 | T009, T025 | open |
| [T044](tasks/T044-function-default-receiver.md) | FunctionDeclaration default receiver in impl blocks | E007 | improvement | P2 | T013, T021 | open |
| [T045](tasks/T045-mod-declarations-render-order.md) | ModDeclarations render order dependency | E007 | improvement | P2 | T025, T009 | open |
| [T046](tasks/T046-struct-expression.md) | StructExpression + FieldInit | E008 | feature | P1 | T009 | open |
| [T047](tasks/T047-match-expression.md) | MatchExpression + MatchArm | E008 | feature | P1 | T009 | open |
| [T048](tasks/T048-if-expression.md) | IfExpression + ElseIfClause + ElseClause | E008 | feature | P1 | T009 | open |
| [T049](tasks/T049-let-binding.md) | LetBinding | E008 | feature | P2 | T009 | open |
| [T050](tasks/T050-function-call-expression.md) | FunctionCallExpression | E008 | feature | P2 | T009 | open |
| [T051](tasks/T051-closure-expression.md) | ClosureExpression | E008 | feature | P2 | T009 | open |
| [T052](tasks/T052-return-macro.md) | ReturnExpression + MacroCall | E008 | feature | P3 | T009 | open |
| [T053](tasks/T053-update-rust-example.md) | Update rust-example with expression components | E008 | test | P2 | T039–T052 | open |
| [T054](tasks/T054-lifetime-parameters.md) | Lifetime parameter support | E009 | feature | P1 | T017 | open |
| [T055](tasks/T055-for-expression.md) | ForExpression | E008 | feature | P1 | T009 | open |
| [T056](tasks/T056-while-loop-expression.md) | WhileExpression + LoopExpression | E008 | feature | P2 | T009 | open |
| [T057](tasks/T057-break-continue.md) | BreakExpression + ContinueExpression | E008 | feature | P2 | T055, T056 | open |
| [T058](tasks/T058-tuple-struct.md) | Tuple struct declaration | E009 | feature | P1 | T011 | open |
| [T059](tasks/T059-static-declaration.md) | StaticDeclaration | E009 | feature | P2 | T014 | open |
| [T060](tasks/T060-await-expression.md) | AwaitExpression | E008 | feature | P2 | T009 | open |
| [T061](tasks/T061-method-chain-expression.md) | MethodChainExpression | E008 | feature | P2 | T050 | open |
| [T062](tasks/T062-pub-super-visibility.md) | pub(super) visibility | E009 | feature | P2 | T011 | open |
| [T063](tasks/T063-associated-type.md) | AssociatedType in traits | E009 | feature | P2 | T019 | open |
| [T064](tasks/T064-try-expression.md) | TryExpression (? operator) | E008 | feature | P2 | T009 | open |
| [T065](tasks/T065-unsafe-block.md) | UnsafeBlock | E008 | feature | P3 | T009 | open |
| [T066](tasks/T066-inner-attribute.md) | InnerAttribute (#![...]) | E009 | feature | P3 | T015 | open |
| [T067](tasks/T067-block-expression.md) | BlockExpression | E008 | feature | P3 | T009 | open |

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

| ID | Title | Reason |
|---|---|---|
| T029 | std builtin descriptors | Repeated build validation failures on exported `std` typing portability (TS2742/API Extractor). |

---

## Open Bug Fixes (Post-MVP)

These bugs were discovered during integration testing with `samples/rust-example/`:

| ID | Title | Priority | Impact |
|---|---|---|---|
| **T040** | Missing newlines between items | P0 | All generated enum/struct output lacks line breaks |
| **T041** | Trait abstract method signatures | P1 | Trait methods render `{}` instead of `;` |
| **T042** | Enum tuple variant support | P1 | Tuple variants render as struct variants |
| **T043** | Standalone SourceFile module registration | P1 | Single-file modules missing from mod declarations |
| **T044** | FunctionDeclaration default receiver | P2 | Constructors need verbose `receiver="none"` |
| **T045** | ModDeclarations render order | P2 | lib.rs must be last child in JSX tree |

---

## Open Feature Requests — Expression & Statement Components

These components were identified by analyzing raw `code` template usage in `samples/rust-example/`. TypeScript and C# packages already provide equivalent components.

### Tier 1 — High Impact (eliminates ~12/24 raw code instances)

| ID | Title | Priority | Covers |
|---|---|---|---|
| **T046** | StructExpression + FieldInit | P1 | Self/struct literals (8 instances) |
| **T047** | MatchExpression + MatchArm | P1 | Pattern matching (2 instances, core Rust) |
| **T048** | IfExpression + ElseIfClause + ElseClause | P1 | If-expressions, if-let (2 instances) |

### Tier 2 — Medium Impact

| ID | Title | Priority | Covers |
|---|---|---|---|
| **T049** | LetBinding | P2 | Variable declarations (2 instances) |
| **T050** | FunctionCallExpression | P2 | Method/function calls (4 instances) |
| **T051** | ClosureExpression | P2 | Closure expressions (1 instance) |

### Tier 3 — Nice to Have

| ID | Title | Priority | Covers |
|---|---|---|---|
| **T052** | ReturnExpression + MacroCall | P3 | Returns, macros (3 instances) |

### Integration

| ID | Title | Priority | Deps |
|---|---|---|---|
| **T053** | Update rust-example sample | P2 | All bug fixes (T039–T045) + all expression components (T046–T052) |

---

## Open Feature Requests — Language Feature Gaps

Discovered by auditing the full Rust language against existing components.

### Declaration & Type System

| ID | Title | Priority | Rust Feature |
|---|---|---|---|
| **T054** | Lifetime parameter support | P1 | `'a` lifetimes in generics — core Rust feature |
| **T058** | Tuple struct declaration | P1 | `struct Point(i32, i32)` — common pattern |
| **T059** | StaticDeclaration | P2 | `static` / `static mut` items |
| **T062** | pub(super) visibility | P2 | Complete visibility modifier support |
| **T063** | AssociatedType in traits | P2 | `type Item;` / `type Item = T;` |

### Control Flow

| ID | Title | Priority | Rust Feature |
|---|---|---|---|
| **T055** | ForExpression | P1 | `for x in iter { }` — most common loop |
| **T056** | WhileExpression + LoopExpression | P2 | `while` / `loop` |
| **T057** | BreakExpression + ContinueExpression | P2 | `break` / `continue` with labels/values |

### Expression Components

| ID | Title | Priority | Rust Feature |
|---|---|---|---|
| **T060** | AwaitExpression | P2 | `.await` postfix syntax |
| **T061** | MethodChainExpression | P2 | `.iter().filter().map().collect()` |
| **T064** | TryExpression (? operator) | P2 | Error propagation with `?` |
| **T065** | UnsafeBlock | P3 | `unsafe { }` blocks |
| **T066** | InnerAttribute | P3 | `#![...]` crate/module attributes |
| **T067** | BlockExpression | P3 | Expression blocks `{ let x = ...; x }`  |

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
- [E007: Bug Fixes and Rendering Corrections](epics/E007-bug-fixes.md)
- [E008: Expression and Statement Components](epics/E008-expression-components.md)
- [E009: Language Feature Gaps](epics/E009-language-feature-gaps.md)

### Phases
- [P01: Foundation](phases/P01-foundation.md)
- [P02: Core Components](phases/P02-core-components.md)
- [P03: Traits & Impl](phases/P03-traits-impl.md)
- [P04: Module System](phases/P04-module-system.md)
- [P05: External Deps & Build](phases/P05-external-deps-build.md)
- [P06: Polish](phases/P06-polish.md)
- P07: Bug Fixes (T039–T045)
- P08: Expressions & Language Gaps (T046–T067)

### Agent Guidance
- [AI Agent Execution Rules](agents/execution-rules.md)

### Source Documents
- [01: Core Understanding](../language-packages/rust/01-core-understanding.md)
- [02: Existing Language Patterns](../language-packages/rust/02-existing-language-patterns.md)
- [03: Rust Design Notes](../language-packages/rust/03-rust-design-notes.md)
- [04: Rust PRD](../language-packages/rust/04-rust-prd.md)
