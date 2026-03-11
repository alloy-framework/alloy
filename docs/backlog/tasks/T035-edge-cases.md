# T035: Edge Case Tests

| Field            | Value                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------- |
| **ID**           | T035                                                                                    |
| **Epic**         | [E006 — External Deps, Build & Polish](../epics/E006-external-deps-build-polish.md)    |
| **Type**         | test                                                                                    |
| **Status**       | pending                                                                                 |
| **Priority**     | medium                                                                                  |
| **Owner**        | AI coding agent                                                                         |
| **AI Executable**| yes                                                                                     |
| **Human Review** | yes                                                                                     |
| **Dependencies** | T011, T012, T013, T014, T015, T016, T017, T018, T019, T020, T021, T022, T023, T024, T025 |
| **Blocks**       | —                                                                                       |

---

## Description

Create tests for edge cases and boundary conditions across all Rust package components. These tests ensure robustness and catch regressions for unusual but valid inputs.

## Goal

Validate that all components handle edge cases gracefully — empty content, single elements, reserved words, deduplication, and overlapping constructs.

## Scope

- Create `test/edge-cases.test.tsx` with tests for:

### Empty constructs
1. **Empty struct**: `struct Empty {}` — struct with no fields.
2. **Empty enum**: `enum Never {}` — enum with no variants.
3. **Function with no params and no return type**: `fn noop() {}`.

### Minimal constructs
4. **Struct with single field**: `struct Wrapper { value: i32 }`.
5. **Enum with single unit variant**: `enum Unit { Only }`.

### Reserved words
6. **Reserved word as identifier**: Using `type` as a field name should render as `r#type`.
7. **Other reserved words**: `self`, `super`, `crate`, `fn`, `struct`, `enum`, `trait`, `impl` — ensure the name policy escapes them with `r#` prefix.

### Import deduplication
8. **Duplicate references**: Referencing the same symbol from multiple locations in the same file should produce only one `use` statement.
9. **Multiple references, same path**: Referencing two symbols from the same module should produce a grouped import, not two separate ones.

### Multiple impl blocks
10. **Multiple impl blocks for same type**: Two separate `ImplBlock` components targeting the same type should both render correctly without conflict.

## Out of Scope

- Fuzzing / random input testing.
- Performance stress testing.
- Invalid input error messages (not testing error handling, just valid edge cases).

## Context Files

- `packages/rust/src/components/` — all component source files.
- `packages/rust/src/name-policy.ts` — reserved word handling (from T003).
- `packages/rust/src/symbols/reference.tsx` — import deduplication (from T022).
- `packages/rust/src/components/use-statement.tsx` — import grouping (from T023).

## Implementation Guidance

1. **File**: `packages/rust/test/edge-cases.test.tsx`.
2. **Test structure**: Group tests by category using `describe()` blocks:
   ```tsx
   describe("edge cases", () => {
     describe("empty constructs", () => {
       it("renders empty struct", () => { ... });
       it("renders empty enum", () => { ... });
       it("renders function with no params or return", () => { ... });
     });
     describe("minimal constructs", () => { ... });
     describe("reserved words", () => { ... });
     describe("import deduplication", () => { ... });
     describe("multiple impl blocks", () => { ... });
   });
   ```
3. **Empty struct test**:
   ```tsx
   <StructDeclaration name="Empty" />
   // Expected: struct Empty {}
   ```
4. **Reserved word test**:
   ```tsx
   <StructDeclaration name="Config">
     <Field name="type" type="String" />
   </StructDeclaration>
   // Expected field name: r#type
   ```
5. **Import deduplication test**:
   ```tsx
   // Reference same symbol twice in one file
   // Assert only one use statement appears
   ```
6. **Multiple impl blocks test**:
   ```tsx
   <ImplBlock type={pointRef}>
     <FunctionDeclaration name="new" receiver="none" ... />
   </ImplBlock>
   <ImplBlock type={pointRef}>
     <FunctionDeclaration name="distance" ... />
   </ImplBlock>
   // Both impl blocks render correctly
   ```
7. **Assert exact output** for each test case.

## Acceptance Criteria

- [ ] Empty struct renders `struct Empty {}`.
- [ ] Empty enum renders `enum Never {}`.
- [ ] Function with no params/return renders `fn noop() {}`.
- [ ] Single-field struct renders correctly.
- [ ] Reserved word `type` renders as `r#type`.
- [ ] Duplicate references produce single `use` statement.
- [ ] Same-path imports are grouped.
- [ ] Multiple impl blocks for same type render without conflict.

## Definition of Done

- `test/edge-cases.test.tsx` exists with all ten test cases.
- All tests pass.

## Validation

```bash
cd packages/rust
npx vitest run test/edge-cases.test.tsx
```
