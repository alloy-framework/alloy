# E001: Package Foundation

## Summary

Bootstrap the `@alloy-js/rust` package within the Alloy monorepo with build configuration, test infrastructure, and barrel exports.

## Why This Epic Exists

Every language package requires a package scaffold before any code can be written. This is the prerequisite for all subsequent work.

## Goals

- Create `packages/rust/` with `package.json`, `tsconfig.json`, `vitest.config.ts`.
- Configure dependency on `@alloy-js/core`.
- Create `src/index.ts` barrel export.
- Create `test/utils.tsx` with `toSourceText()` helper.
- Create `test/vitest.setup.ts` importing `@alloy-js/core/testing`.
- Verify build and test commands work.

## In Scope

- Package scaffold files.
- Test infrastructure.
- Barrel export structure (empty initially).

## Out of Scope

- Any Rust language components or symbols.
- Actual language functionality.

## Dependencies

- None (first epic).

## What It Enables

- All subsequent epics (E002–E006).

## Risks / Notes

- Must follow the exact same package.json/tsconfig patterns as existing language packages (e.g., `packages/typescript/`, `packages/go/`).
- The `pnpm-workspace.yaml` must include the new package.

## Task List

- [T001: Package scaffold](../tasks/T001-package-scaffold.md)
- [T002: Test infrastructure](../tasks/T002-test-infrastructure.md)

## Sequencing Notes

Must be completed first. All other epics depend on this.

## Completion Criteria

- `pnpm build` succeeds for the `@alloy-js/rust` package.
- `pnpm test` runs (even with no tests yet) without errors.
- `import * as rust from "@alloy-js/rust"` compiles without errors.
