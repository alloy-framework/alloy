# Planning Review: @alloy-js/rust

**Reviewer role:** Skeptical senior architect  
**Documents reviewed:** 01-core-understanding.md, 02-existing-language-patterns.md, 03-rust-design-notes.md, 04-rust-prd.md, docs/backlog/\*  
**Verified against:** Actual repository code in packages/go, packages/csharp, packages/typescript, packages/python, packages/core

---

# 1. Overall Assessment

The planning set is **thorough, well-structured, and largely accurate**. The 4-document pipeline (core understanding → patterns → design → PRD) builds knowledge incrementally, and the backlog is detailed enough for autonomous AI agent execution. However, cross-referencing the docs against the actual repository reveals **several factual inaccuracies, missing infrastructure tasks, and architectural assumptions that need correction** before implementation begins.

The most significant issues are: (1) the scopes directory structure is wrong in the proposed layout, (2) several build/infrastructure tasks are missing from the backlog, (3) the "triple declaration space" design for Rust modules may be over-engineered, and (4) the SymbolCreator protocol claim is incorrect.

---

# 2. Strengths

1. **Grounded in repository evidence.** The core understanding doc (01) correctly identifies the rendering pipeline, symbol system, and context model. File paths are accurate.

2. **Cross-language comparison is excellent.** The patterns doc (02) accurately catalogs the common anatomy and divergences. The concept matrix is detailed and useful.

3. **Rust language semantics are precise.** The design doc (03) correctly describes Rust's module system, visibility rules, `use` semantics, impl blocks, and naming conventions. No significant Rust-language errors found.

4. **Backlog is execution-ready.** 35 tasks with dependencies, acceptance criteria, context files, and validation commands. The agent execution rules are well-thought-out.

5. **MVP scope is well-bounded.** The deferred features list (lifetimes, closures, macros, etc.) is appropriate. The golden scenarios are realistic.

6. **Impl blocks are correctly identified as novel.** The plan acknowledges this has no precedent in Alloy and needs careful design.

7. **Phase ordering respects dependencies.** The critical path (T001→T003→T005→T006→T010→T022) is correct.

---

# 3. Gaps

## 3.1 Missing Infrastructure Tasks

**G1: `api-extractor.json` is not in the backlog.**  
Every existing language package (Go, TS, Java, Python, C#) has an `api-extractor.json` that extends `../../api-extractor.base.json`. The Go build script is `"build": "alloy build --with-dev && pnpm run generate-docs"`. The backlog's T001 (package scaffold) does not mention this.  
_Evidence:_ `packages/go/api-extractor.json`, `packages/go/package.json` scripts.

**G2: The `alloy build` tool is not mentioned.**  
Go uses `alloy build --with-dev` (not `tsc`). The CLI is at `packages/cli/`. The build script and `--with-dev` flag produce both `dist/` and `dist/dev/` directories. T001 says "Copy package.json from Go" but doesn't explicitly call out the build tool.  
_Evidence:_ `packages/go/package.json` scripts section.

**G3: The `#imports` hash pattern is missing.**  
Go's `package.json` includes `"imports": { "#test/*": "./test/*", "#components/*": { ... } }` for path aliases. This is used alongside `tsconfig.json` paths. The Rust package will need the same.  
_Evidence:_ `packages/go/package.json` imports field.

**G4: No task for `tsdoc.json`.**  
Some packages have `tsdoc.json`. While not all do, the api-extractor integration may require it.

**G5: The `prepack` script is missing from T001.**  
Go has `"prepack": "node ../../scripts/strip-dev-exports.js"` which strips `"source"` conditions on publish. This is needed for correctness.  
_Evidence:_ `packages/go/package.json`.

## 3.2 Missing Design Details

**G6: Prelude type list is undefined.**  
The design says "maintain a PRELUDE*TYPES set" for skipping imports, but neither the design doc nor any task defines the exact list. Rust's prelude includes: `Option`, `Some`, `None`, `Result`, `Ok`, `Err`, `Vec`, `String`, `ToString`, `Box`, `Clone`, `Copy`, `Default`, `Drop`, `Eq`, `PartialEq`, `Ord`, `PartialOrd`, `Iterator`, `IntoIterator`, `From`, `Into`, `AsRef`, `AsMut`, `Send`, `Sync`, `Sized`, `Unpin`, `bool`, `char`, `i8`–`i128`, `u8`–`u128`, `f32`, `f64`, `str`, `usize`, `isize`. This is a non-trivial list.  
\_Impact:* T022 (reference resolution) and T029 (std builtins) need this, but it's not specified.

**G7: No name conflict resolver task.**  
The backlog says "use default from core" for name conflicts. But TypeScript has a custom `tsNameConflictResolver` that prioritizes non-import symbols. Rust will likely need similar logic — imported symbols (via `use`) should be renamed before local declarations. No task exists for this.  
_Evidence:_ `packages/typescript/src/name-conflict-resolver.ts`.

**G8: `SourceFile` mod-declaration rendering is underspecified.**  
The design says "SourceFile auto-generates mod declarations in parent modules" but the mechanics are unclear. In Rust, `mod foo;` goes in the _parent_ file, not the child. So `lib.rs` declares `mod models;`, not `models/mod.rs`. But `ModuleDirectory` creates the child scope. How does the child registration propagate to the parent SourceFile for rendering? This needs clearer design.

---

# 4. Ambiguities

**A1: "Triple declaration space" (`["types", "values", "macros"]`) is not justified.**  
The design proposes `declarationSpaces = ["types", "values", "macros"]` for module scopes. Go uses `["values", "types"]` which is the closest analog. However, _no existing package puts macros in a declaration space_. Rust macro names rarely conflict with type/value names in code generation contexts. This adds complexity without clear benefit for MVP.  
_Recommendation:_ Use `["types", "values"]` like Go for MVP. Add `"macros"` later if needed.

**A2: `RustImplScope` ownership semantics are unclear.**  
The design says "methods declared inside are added to the target type's `members` space." But how does `RustImplScope` get the target type? By refkey? The scope is created with `ownerSymbol`, but the target type may not be in the same file. If the `ImplBlock` references a struct via refkey, that struct's symbol must be resolved before the scope is created. This temporal dependency is not addressed.

**A3: `receiver` prop default behavior is undecided.**  
Open question 1 asks: "Should methods in impl blocks auto-get `&self`?" The recommendation is "yes" but the answer is listed as "must resolve before T021" — while T021 is the task that _implements_ it. This is circular. The decision should be made in the design doc, not left to the implementing agent.

**A4: `CrateDirectory` vs `ModuleDirectory` vs `SourceFile` — who renders `mod` declarations?**  
T025 says "Update `SourceFile` to auto-generate `mod` declarations." But T009 says `CrateDirectory` creates the crate scope. The `mod` declarations need to go in the _root source file_ (`lib.rs`). Does `CrateDirectory` create `lib.rs` implicitly, or does the user create it? If the user creates `<SourceFile path="lib.rs">`, how does it know to render mod declarations?

**A5: Struct variant fields in `EnumVariant` — confusing prop names.**  
`EnumVariantProps` has `fields?: Children[]` for tuple variant and `children?: Children` for struct variant. The distinction between "fields" and "children" is confusing — both represent variant data. This could cause agent implementation errors.

---

# 5. Architectural Risks

**R1: Scopes in `symbols/` instead of `scopes/`.**  
The proposed layout puts all scope classes in `src/symbols/`. But the actual Go package puts scopes in `src/scopes/` (a separate directory), and C# does the same. The symbols directory has 7 files in Go, scopes has 10 files. Mixing them would create an oversized directory. The design doc (03) proposes `symbols/` for everything; this is inconsistent with Go and C#.  
_Evidence:_ `packages/go/src/scopes/` (10 files), `packages/csharp/src/scopes/` (9 files).  
_Recommendation:_ Use a separate `src/scopes/` directory.

**R2: `SymbolCreator` protocol claim is incorrect.**  
The design doc (03, section 3.10) and patterns doc (02, section 5.8) say external dependency descriptors use the "SymbolCreator protocol." In reality, neither Go's `create-module.ts` nor C#'s `create-library.ts` use a formal `SymbolCreator` interface. They use `REFKEYABLE` + `TO_SYMBOL` symbols from core and call `createSymbol()` directly with a `WeakMap<Binder, Symbol>` for per-binder caching. Task T028 should reference the actual pattern, not the claimed "SymbolCreator protocol."  
_Evidence:_ `packages/go/src/create-module.ts`, `packages/csharp/src/create-library.ts`.

**R3: `Reference` component is passed to `CoreSourceFile`, not set as a context.**  
The design doc (03, section 3.3) says language packages "provide a Reference component set on `SourceFile`'s `reference` prop." This is correct — it's a _prop_, not a context. But the backlog tasks (T009, T010) don't clearly describe how the Rust `Reference` component is connected to `CoreSourceFile`. The Go pattern is: `<CoreSourceFile reference={Reference}>`.  
_Implication:_ T009 must explicitly pass the `Reference` component as a prop to core's SourceFile.

**R4: Factory functions assume scope availability.**  
T006 (factory functions) says "Get the current scope via `useRustScope()`." But this only works inside a reactive component context. Factory functions called outside a component tree will fail silently. Go's factories have the same pattern, but this is a footgun. The implementation must validate scope availability and emit diagnostics if called in the wrong context.

---

# 6. Scope Risks

**S1: MVP may be slightly too large.**  
The MVP includes `TraitDeclaration`, `ImplBlock`, and `self` receiver — these are the most architecturally novel features with no Alloy precedent. If these prove harder than expected, they could delay the entire MVP. Consider making Phase 3 (traits/impl) optional for a "Phase 0 MVP" that ships struct+enum+function without traits.

**S2: `CargoTomlFile` TOML rendering is underestimated.**  
TOML has specific formatting rules (inline tables vs standard tables, array of tables). `Cargo.toml` with features (`serde = { version = "1.0", features = ["derive"] }`) requires inline table syntax. The task description says "string-based rendering" — this is viable but fragile. Consider a small TOML serialization helper.

**S3: `use` tree grouping (`use path::{A, B}`) is complex for MVP.**  
The design recommends tree syntax. This requires grouping logic: collect all imports, group by common prefix, render `use` trees. Flat `use path::A; use path::B;` would be simpler and still correct (rustfmt will group them). Consider flat for MVP, tree for post-MVP.

---

# 7. Testing Risks

**T1: No `cargo check` validation.**  
The plan acknowledges this but doesn't mitigate it. Golden scenario tests compare strings, but subtle syntax errors (missing semicolons, wrong brace placement) won't be caught. Consider adding a single integration test that runs `cargo check` on the golden scenario output (if Rust toolchain is available in CI).

**T2: Cross-module tests depend on 4+ tasks completing correctly.**  
T026 (import integration tests) depends on T022, T023, T025 — if any of those is buggy, T026 tests will fail for non-obvious reasons. The test strategy should include intermediate unit tests for `RustModuleScope.addUse()` independently of the Reference component.

**T3: No negative tests.**  
The test plan covers correct behavior but not error cases. What happens when:

- A refkey references a non-existent symbol?
- A private symbol is referenced from another module?
- A `use` would be circular?  
  At minimum, the visibility error case should be tested (like Go's uppercase export check).

**T4: `test/utils.tsx` bootstrapping problem.**  
T002 creates test utilities, but `SourceFile` and `CrateDirectory` don't exist yet (created in T009). The initial `toSourceText()` must use core components as stubs — but T002 says "update in T009." This creates a fragile intermediate state where tests in T003–T008 may need different utils than T009+ tests.

---

# 8. Backlog Risks

**B1: T011 (StructDeclaration) has too many dependencies.**  
T011 lists dependencies on T006, T010, T015, T016, T017 — that's 5 deps. T015 (Attribute) and T016 (DocComment) are needed because StructDeclaration uses `derives` and `doc` props. But this means T011 can't start until attributes _and_ doc comments are done. Consider: T011 should implement the core struct rendering first, with derives/doc as optional props that do nothing if the attribute/doc components aren't loaded yet. Then T015/T016 tests verify integration.

**B2: T005 (scope hierarchy) is too large.**  
T005 creates 6 scope classes + scope hooks in one task. This is the biggest single task and the most architecturally critical. It should be split:

- T005a: `RustCrateScope` + `RustModuleScope` (with import/mod tracking) — the complex ones.
- T005b: `RustFunctionScope` + `RustLexicalScope` — simple.
- T005c: `RustImplScope` + `RustTraitScope` — member scopes.
- T005d: Scope hooks.

**B3: T022 (reference resolution) is the riskiest task and has no sub-breakdown.**  
This single task must: implement `ref()`, resolve refkeys, build use paths, determine same-module vs same-crate vs external, handle prelude, call `addUse()`. This is the most complex task in the entire backlog. It should be split into at least 2 tasks: (a) same-crate resolution and (b) external-crate resolution.

**B4: Missing task: `vitest.setup.ts` content.**  
Go's `vitest.setup.ts` is minimal (just imports `@alloy-js/core/testing`). But the Go `vitest.config.ts` references it via `setupFiles: ["./test/vitest.setup.ts"]`. T001 creates vitest.config.ts but T002 creates vitest.setup.ts. If T001's vitest.config.ts references a file that doesn't exist yet, the build may fail between T001 and T002.

**B5: T032 (STC wrappers) underestimates scope.**  
Go wraps 24 components. The Rust package will have ~15-20 components. Each STC wrapper must be typed correctly. This is tedious but straightforward. The task should note the expected component count.

**B6: Missing task: barrel index files.**  
T033 says "verify barrel exports" but there's no task to _create_ `src/components/index.ts` or `src/symbols/index.ts` as barrel files. These are incrementally built as components are added, but no task explicitly owns creating the initial barrel structure.

---

# 9. Recommended Corrections

## Must Fix (before implementation starts)

1. **Add `api-extractor.json` and build script alignment to T001.** Include `api-extractor.json`, `alloy build --with-dev`, `prepack` script, and `#imports` hash pattern. Reference Go's `package.json` exactly.

2. **Move scopes to `src/scopes/`** matching Go and C# patterns. Update the proposed layout in the design doc and all backlog task file paths.

3. **Fix the SymbolCreator protocol claim.** Update T028 (createCrate) context files and implementation guidance to reference the actual `REFKEYABLE` + `TO_SYMBOL` + `WeakMap<Binder>` pattern used by Go and C#, not a non-existent "SymbolCreator protocol."

4. **Simplify declaration spaces to `["types", "values"]`** for MVP module scopes. Remove `"macros"` space — it adds complexity without demonstrated need.

5. **Split T005** into at least 2 tasks: (a) module/crate scopes with tracking, (b) function/lexical/impl/trait scopes with hooks.

6. **Add a name conflict resolver task** (new T-number) — don't rely on core's default. At minimum, Rust `use` imports should be renamed before local declarations on conflict.

7. **Resolve the `receiver` prop decision in the design doc** — don't leave it as an open question for the implementation agent. Recommendation: default `&self` inside impl blocks, `none` for standalone functions, overridable via prop.

8. **Define the prelude type list** in either the design doc or T029 (std builtins). This is a concrete, enumerable list — not something to leave undefined.

## Should Fix (improve quality)

9. **Reduce T011 dependencies.** Make `derives` and `doc` props render `null` if Attribute/DocComment components aren't available yet. T011 should only depend on T006 and T010.

10. **Split T022 (reference resolution)** into same-crate and external-crate sub-tasks.

11. **Add T001 → T002 ordering note:** T001's `vitest.config.ts` should either not reference `setupFiles` initially (add in T002), or T001 and T002 should be a single task.

12. **Consider flat `use` statements for MVP** (`use path::A;` per item). Tree grouping (`use path::{A, B};`) can be a polish task. This reduces complexity in T023.

13. **Add at least one negative test** for private symbol visibility errors to T026 or T035.

## Nice to Have

14. Add an optional integration test that runs `cargo check` on golden scenario output.

15. Add intermediate unit tests for `RustModuleScope.addUse()` independent of the Reference component.

16. Consider whether `tsconfig.base.json` references need updating (currently only 6 projects are listed — Go/Python/C# are not there, suggesting it's optional).

---

# 10. Verdict

## **Ready with minor revisions**

The planning set is comprehensive, well-reasoned, and largely correct. The identified issues are **fixable without rethinking the architecture**. The 9 "must fix" items are concrete and can be addressed in a focused revision pass before implementation begins.

**Key strengths:** Accurate Rust semantics, correct dependency ordering, thorough backlog with agent-ready task specs.  
**Key weaknesses:** Missing infrastructure details (api-extractor, build scripts), incorrect directory layout (scopes in symbols/), a few oversized tasks that should be split, and some decisions left unresolved that will confuse implementing agents.

After the corrections in section 9 are applied, this plan is **ready for implementation**.
