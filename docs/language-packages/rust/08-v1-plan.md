# @alloy-js/rust — v1 Plan

**Date:** 2026-03-11  
**Status:** Draft  
**Scope:** MVP → v1 gap closure

---

## 1. Current State

The Rust package has completed 34 of 35 MVP backlog tasks (T001–T035). All core components, symbol system, scope hierarchy, name policy, reference resolution, import generation, Cargo.toml generation, and test infrastructure are implemented and passing.

**One task remains blocked:**

| Task                | Status  | Reason                                                                     |
| ------------------- | ------- | -------------------------------------------------------------------------- |
| T029 (std builtins) | blocked | TS2742 / API Extractor export typing portability failures after 3 attempts |

---

## 2. Gap Analysis

### 2.1 Blocked: std Builtins (T029)

The `std` crate descriptor (`src/builtins/std.ts`) failed to build due to TypeScript/API Extractor portability errors on the exported `std` typing. The `createCrate()` infrastructure works (T028 done, tested with `serde`), but the specific type shape of `std` triggers TS2742.

**Root cause hypothesis:** The `std` descriptor is large (many modules, many symbols) and the inferred return type of `createCrate()` with deeply nested generics exceeds API Extractor's portability check threshold. Go solved this with explicit exported type aliases for the export surface.

**Fix approach:** Use explicit type annotations on the exported `std` constant rather than relying on type inference, per the custom instruction: _"Prefer explicit exported type aliases/interfaces for the export surface."_

### 2.2 Design Gap: `std` Should Not Appear in Cargo.toml

**This is a new finding not covered by any existing task.**

`std` is implicit in Rust — it must never appear in `Cargo.toml` `[dependencies]`. But the current `createCrate()` → `ref()` → `addDependency()` pipeline unconditionally adds every external crate to `RustCrateScope.dependencies`, which gets rendered in Cargo.toml.

Go solves this with a `builtin: boolean` flag in `createModule()` that propagates to `PackageSymbol`. Rust needs equivalent handling.

**Evidence:**

- `packages/rust/src/symbols/reference.ts` line 101: `sourceCrate.addDependency(targetCrate.name, ...)` — called for ALL external crates
- `packages/go/src/create-module.ts` line 102: `builtin: boolean = false` parameter
- `packages/rust/src/scopes/rust-crate-scope.ts`: no builtin/implicit concept exists

**Impact:** Without this fix, referencing `std::collections::HashMap` via builtins would add `std = "*"` to Cargo.toml.

### 2.3 Incomplete STC Wrappers

T032 (STC wrappers) is marked done but only wraps 12 of ~24 components. Go wraps all 28 of its components. Missing wrappers: CrateDirectory, SourceFile, ModuleDirectory, CargoTomlFile, ModuleDocComment, Declaration, Reference, UseStatement, UseStatements, Parameters, TypeParameters, Value, ModDeclarations.

**Note:** Not all of these may need wrappers — structural/container components may not benefit from STC. But Go wraps SourceFile, ModuleDirectory, and Reference, so at minimum those should be covered.

### 2.4 CrateDirectory `crateType` Prop

The PRD (Open Question 5, resolved) specifies `crateType?: "lib" | "bin"` support. Currently, CrateDirectory has no such prop. However, users can already create `<SourceFile path="main.rs">` and it works correctly — `isModuleRootPath()` in `source-file.tsx` recognizes `main.rs`.

The prop would add:

- Semantic clarity (explicit lib vs bin intent)
- Potential future Cargo.toml `[lib]`/`[[bin]]` section generation

T030 (Cargo.toml) explicitly deferred `[lib]`/`[[bin]]` as out-of-scope. This is low priority.

### 2.5 Positive Deviation: Use-Tree Grouping Already Works

The PRD revision (07-revision-summary.md) changed use statements to "flat for MVP." The implementation already supports brace grouping (`use path::{A, B};`), tested in `imports.test.tsx`. This is ahead of PRD — no work needed.

### 2.6 No Additional Gaps Found

The following are confirmed complete and tested:

- Prelude type import suppression: 60-type `PRELUDE_TYPES` set in `reference.ts`, tested in `imports.test.tsx`
- External crate e2e pipeline: tested in `create-crate.test.tsx` and `golden-scenarios.test.tsx`
- Name conflict resolver: implemented and tested
- api-extractor.json, build scripts, prepack: all configured
- All 32 test files passing

---

## 3. v1 Task Plan

### New Tasks

| ID   | Title                                    | Type    | Priority | Dependencies | Blocks |
| ---- | ---------------------------------------- | ------- | -------- | ------------ | ------ |
| T036 | Builtin crate support in createCrate/ref | feature | P0       | T028         | T029   |
| T037 | Complete STC wrappers                    | feature | P2       | T032         | —      |
| T038 | CrateDirectory crateType prop            | feature | P3       | T009         | —      |

### Existing Task Update

| ID   | Title        | Change                                                              |
| ---- | ------------ | ------------------------------------------------------------------- |
| T029 | std builtins | Unblock: depends on T036; fix TS2742 with explicit type annotations |

### Critical Path

```
T036 (builtin flag) → T029 (std builtins, unblocked) → barrel export update → final validation
T037 (STC wrappers) — parallel, independent
T038 (crateType) — parallel, independent
```

---

## 4. Task Details

### T036: Builtin Crate Support in createCrate / ref

**Problem:** `createCrate()` has no way to mark a crate as builtin/implicit. Referencing symbols from such a crate should generate `use` statements but NOT add the crate to `Cargo.toml` dependencies.

**Scope:**

1. Add `builtin?: boolean` option to `CrateDescriptor` interface in `create-crate.ts`
2. Store the `builtin` flag on the `CrateFactoryState` so it can be queried
3. Expose a `isBuiltin(crate: ExternalCrate): boolean` or similar helper
4. In `reference.ts` `ref()` function: skip `sourceCrate.addDependency()` call when the target crate is marked builtin
5. Add test: create a builtin crate, reference its symbol, verify `use` is generated but NO Cargo.toml dependency appears

**Files to modify:**

- `packages/rust/src/create-crate.ts` — add `builtin` to descriptor, store on state, expose check
- `packages/rust/src/symbols/reference.ts` — conditional `addDependency()` call
- `packages/rust/test/create-crate.test.tsx` — add builtin crate test

**Acceptance criteria:**

- `createCrate({ name: "std", builtin: true, ... })` works
- Referencing a symbol from a builtin crate generates `use std::collections::HashMap;`
- Builtin crate does NOT appear in `RustCrateScope.dependencies`
- Existing non-builtin crate behavior is unchanged
- Build passes: `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`

### T029: std Builtins (Unblocked)

**Change from original:** Now depends on T036 (builtin flag). Use `createCrate({ name: "std", builtin: true, ... })`.

**Additional fix for TS2742:** Use explicit exported type alias for the `std` export surface rather than relying on inferred types from `createCrate()`. Pattern:

```typescript
// Explicit type to avoid TS2742/API Extractor portability issues
export type StdCrate = CrateRef<typeof stdDescriptor> &
  SymbolCreator &
  ExternalCrate;
export const std: StdCrate = createCrate(stdDescriptor);
```

**Acceptance criteria (same as original T029 plus):**

- `std` does NOT appear in Cargo.toml dependencies
- Prelude types (Option, Vec, String, etc.) referenced via `std[""].Option` generate no `use` statement
- Non-prelude types (HashMap, Display, etc.) referenced via `std.collections.HashMap` generate correct `use std::collections::HashMap;`

### T037: Complete STC Wrappers

**Problem:** Only 12 of ~24 components have STC wrappers. Go wraps all 28 components.

**Scope:** Add STC wrappers for components that benefit from programmatic construction. At minimum:

- `ModuleDocComment` (parallels DocComment which is already wrapped)
- `SourceFile`, `ModuleDirectory`, `CrateDirectory` (Go wraps equivalents)
- `Reference` (Go wraps this)
- `Parameters`, `TypeParameters`, `Value` (leaf components useful in STC)

Skip internal/rendering-only components: `UseStatement`, `UseStatements`, `ModDeclarations`, `Declaration` (these are auto-rendered, not user-constructed).

**Files to modify:**

- `packages/rust/src/components/stc/index.ts`
- `packages/rust/test/stc.test.tsx`

**Acceptance criteria:**

- All user-facing components have STC wrappers
- STC test file updated and passing
- Build passes

### T038: CrateDirectory crateType Prop

**Problem:** No explicit lib/bin crate type distinction.

**Scope:**

1. Add `crateType?: "lib" | "bin"` to `CrateDirectoryProps` (default `"lib"`)
2. Add `crateType` to `CrateContextValue`
3. Optionally add Cargo.toml `[lib]`/`[[bin]]` section rendering (stretch)

**Files to modify:**

- `packages/rust/src/components/crate-directory.tsx`
- `packages/rust/src/context/crate-context.tsx`
- `packages/rust/test/source-file-crate-directory.test.tsx`

**Acceptance criteria:**

- `<CrateDirectory name="myapp" crateType="bin">` sets context correctly
- Users can create `<SourceFile path="main.rs">` inside a bin crate (already works)
- Context exposes `crateType` for downstream components
- Build passes

---

## 5. Estimated Effort

| Task                       | Complexity                                             | Risk                                    |
| -------------------------- | ------------------------------------------------------ | --------------------------------------- |
| T036 (builtin flag)        | Low — ~4 touch points, well-understood pattern from Go | Low                                     |
| T029 (std builtins, retry) | Medium — large descriptor, TS2742 mitigation needed    | Medium (TS2742 was previously blocking) |
| T037 (STC wrappers)        | Low — mechanical, follow existing pattern              | Very low                                |
| T038 (crateType prop)      | Low — additive prop, no breaking changes               | Very low                                |

---

## 6. Definition of Done (v1)

All of the following must be true:

1. T036 implemented and tested (builtin crate support)
2. T029 unblocked and completed (std builtins)
3. T037 completed (STC wrappers)
4. T038 completed or explicitly deferred (crateType)
5. `pnpm --filter @alloy-js/rust build` passes (includes API Extractor)
6. `pnpm --filter @alloy-js/rust test` passes (all 32+ test files)
7. Barrel exports include builtins: `import { std } from "@alloy-js/rust"` works
