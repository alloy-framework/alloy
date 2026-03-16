# T002: Test Infrastructure

| Field                     | Value                                                           |
| ------------------------- | --------------------------------------------------------------- |
| **ID**                    | T002                                                            |
| **Epic**                  | [E001: Package Foundation](../epics/E001-package-foundation.md) |
| **Type**                  | foundation                                                      |
| **Status**                | done                                                            |
| **Priority**              | P0 — critical path                                              |
| **Owner Role**            | AI coding agent                                                 |
| **AI Executable**         | Yes                                                             |
| **Human Review Required** | No                                                              |
| **Dependencies**          | T001                                                            |
| **Blocks**                | All test tasks                                                  |

## Description

Create test utilities and setup for the Rust language package.

## Goal

Provide a `toSourceText()` helper and vitest setup so that all subsequent component tests can use them.

## Scope Included

- Create `packages/rust/test/vitest.setup.ts` importing `@alloy-js/core/testing`.
- Create `packages/rust/test/utils.tsx` with:
  - `toSourceText(children, options?)` — wraps children in `Output` + `SourceFile` and renders to string.
  - `toSourceTextMultiple(children)` — multi-file variant returning output directory.
  - `findFile(output, path)` — extracts a file from output.
  - `assertFileContents(output, expected)` — batch file validation.

## Out of Scope

- Actual test files (created in later tasks).

## Context Files to Read First

- `packages/go/test/utils.tsx` — reference implementation for Go.
- `packages/typescript/test/utils.tsx` — reference for TypeScript.
- `packages/core/testing/index.ts` — available test utilities.
- `packages/core/testing/extend-expect.ts` — custom vitest matchers.

## Implementation Guidance

1. Create `test/vitest.setup.ts`:
   ```typescript
   import "@alloy-js/core/testing";
   ```
2. Create `test/utils.tsx` following the Go package pattern. The `toSourceText` function should wrap children in minimal Rust context (Output + a basic SourceFile). Initially, since `SourceFile` and `CrateDirectory` don't exist yet, use core components directly with placeholder values. This file will be updated in T009 when Rust-specific components are available.
3. Update `vitest.config.ts` to reference the setup file.

## Acceptance Criteria

- `test/vitest.setup.ts` exists and imports core testing.
- `test/utils.tsx` exports `toSourceText`, `toSourceTextMultiple`, `findFile`, `assertFileContents`.
- Running `pnpm test` in the package succeeds (no tests yet, but setup loads).

## Definition of Done

Test infrastructure is in place. Subsequent tasks can write tests using `toSourceText()`.

## Validation Approach

```bash
cd packages/rust && pnpm test -- --run
```
