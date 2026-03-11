# T034: Golden Scenario Tests

| Field            | Value                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------- |
| **ID**           | T034                                                                                    |
| **Epic**         | [E006 — External Deps, Build & Polish](../epics/E006-external-deps-build-polish.md)    |
| **Type**         | test                                                                                    |
| **Status**       | done                                                                                    |
| **Priority**     | high                                                                                    |
| **Owner**        | AI coding agent                                                                         |
| **AI Executable**| yes                                                                                     |
| **Human Review** | yes                                                                                     |
| **Dependencies** | T026, T027, T030, T031                                                                  |
| **Blocks**       | —                                                                                       |

---

## Description

Create golden scenario tests that validate complete, realistic Rust code generation end-to-end. These scenarios match the examples from PRD section 7 and serve as the ultimate integration tests for the `@alloy-js/rust` package.

## Goal

Prove that the package can generate correct, complete Rust projects including file structure, `Cargo.toml`, module declarations, imports, types, functions, traits, and impl blocks.

## Scope

- Create `test/golden-scenarios.test.tsx` with the following scenarios:

### Scenario 7.1: Struct with Impl
- `Point` struct with `x: f64`, `y: f64` fields.
- Inherent impl with `new(x: f64, y: f64) -> Self` and `distance(&self, other: &Point) -> f64`.
- Validates: struct + impl + method rendering.

### Scenario 7.2: Multi-Module Crate with Imports
- Crate with `models` and `services` modules.
- `User` struct in `models` with `name: String`, `age: u32`.
- `greet(user: &User) -> String` function in `services`.
- Validates: module structure + cross-module import + `Cargo.toml`.

### Scenario 7.3: Trait and Impl
- `Greetable` trait with `fn greet(&self) -> String`.
- `User` struct.
- `impl Greetable for User` with implementation.
- Validates: trait declaration + trait impl rendering.

### Scenario 7.4: Enum with All Variant Kinds
- `Shape` enum with:
  - `Circle { radius: f64 }` (struct variant).
  - `Rectangle { width: f64, height: f64 }` (struct variant).
  - `Point(f64, f64)` (tuple variant).
  - `Nothing` (unit variant).
- Validates: all enum variant types.

### Scenario 7.5: Cargo.toml with Dependencies
- Crate that references `serde::Serialize`.
- Validates: `Cargo.toml` includes `serde` in `[dependencies]`.

## Out of Scope

- Negative tests (invalid input).
- Performance benchmarks.
- Compilation of generated Rust code (validated by inspection).

## Context Files

- `docs/prd/` — PRD section 7 for scenario specifications.
- `packages/go/test/` — reference for golden test patterns in existing Alloy packages.
- All component source files in `packages/rust/src/components/`.

## Implementation Guidance

1. **File**: `packages/rust/test/golden-scenarios.test.tsx`.
2. **Test pattern**: Each test should:
   - Construct a complete component tree using JSX.
   - Render to string output.
   - Assert exact match against expected output.
3. **Scenario 7.1 structure**:
   ```tsx
   <CrateDirectory name="geometry">
     <SourceFile path="lib.rs">
       <StructDeclaration name="Point" pub>
         <Field name="x" type="f64" pub />
         <Field name="y" type="f64" pub />
       </StructDeclaration>
       <ImplBlock type={pointRef}>
         <FunctionDeclaration name="new" receiver="none" ...>
           ...
         </FunctionDeclaration>
         <FunctionDeclaration name="distance" ...>
           ...
         </FunctionDeclaration>
       </ImplBlock>
     </SourceFile>
   </CrateDirectory>
   ```
4. **Exact output assertion**: Use snapshot testing or string comparison to validate the exact rendered output matches expected Rust code.
5. **Each scenario is a separate `it()` or `test()` block** for clear failure reporting.
6. **Use refkeys** to wire up cross-references between components.

## Acceptance Criteria

- [ ] Scenario 7.1 (struct with impl) produces correct output.
- [ ] Scenario 7.2 (multi-module crate) produces correct file tree and contents.
- [ ] Scenario 7.3 (trait and impl) produces correct output.
- [ ] Scenario 7.4 (enum with all variant kinds) produces correct output.
- [ ] Scenario 7.5 (Cargo.toml with dependencies) produces correct manifest.
- [ ] All five scenarios pass.

## Definition of Done

- `test/golden-scenarios.test.tsx` exists with all five scenarios.
- All tests pass.
- Output matches expected Rust code exactly.

## Validation

```bash
cd packages/rust
npx vitest run test/golden-scenarios.test.tsx
```
