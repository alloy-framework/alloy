# T001: Package Scaffold

| Field                     | Value                                                           |
| ------------------------- | --------------------------------------------------------------- |
| **ID**                    | T001                                                            |
| **Epic**                  | [E001: Package Foundation](../epics/E001-package-foundation.md) |
| **Type**                  | foundation                                                      |
| **Status**                | done                                                            |
| **Priority**              | P0 — critical path                                              |
| **Owner Role**            | AI coding agent                                                 |
| **AI Executable**         | Yes                                                             |
| **Human Review Required** | Yes (initial package setup)                                     |
| **Dependencies**          | None                                                            |
| **Blocks**                | T002, all subsequent tasks                                      |

## Description

Create the `@alloy-js/rust` package directory structure with build configuration files.

## Goal

Establish the package scaffold so that subsequent tasks can add source files and tests.

## Scope Included

- Create `packages/rust/` directory.
- Create `packages/rust/package.json` with:
  - `name: "@alloy-js/rust"`
  - `version: "0.1.0"`
  - Dependencies on `@alloy-js/core`
  - Scripts: `build`, `test`, `clean`
  - Exports configuration matching other language packages
- Create `packages/rust/tsconfig.json` extending `../../tsconfig.base.json`.
- Create `packages/rust/vitest.config.ts` matching other language packages.
- Create `packages/rust/src/index.ts` as empty barrel export file.
- Ensure the package is included in `pnpm-workspace.yaml` (if not already via glob).
- Create `packages/rust/api-extractor.json` extending `../../api-extractor.base.json`.
- Ensure build script uses `alloy build --with-dev && pnpm run generate-docs`.
- Include `prepack` script: `"prepack": "node ../../scripts/strip-dev-exports.js"`.
- Include `#imports` hash pattern in package.json matching Go's pattern.
- Include `generate-docs` script: `"generate-docs": "api-extractor run"`.

## Out of Scope

- Test utilities (T002).
- Any source code beyond the empty barrel export.

## Context Files to Read First

- `packages/go/package.json` — reference for package.json structure.
- `packages/go/tsconfig.json` — reference for tsconfig.
- `packages/go/vitest.config.ts` — reference for vitest config.
- `packages/go/src/index.ts` — reference for barrel export pattern.
- `pnpm-workspace.yaml` — verify package discovery.
- `tsconfig.base.json` — base config being extended.
- `packages/go/api-extractor.json` — reference for api-extractor config.
- `api-extractor.base.json` — base api-extractor config.

## Implementation Guidance

1. Copy `packages/go/package.json` as starting point. Change name to `@alloy-js/rust`, update description.
2. Copy `packages/go/tsconfig.json`. Adjust references if needed.
3. Copy `packages/go/vitest.config.ts`.
4. Create `src/index.ts` with a comment: `// @alloy-js/rust barrel export`.
5. Verify `pnpm-workspace.yaml` includes `packages/*` (it likely already does).
6. Run `pnpm install` to link the new package.

## Acceptance Criteria

- `packages/rust/package.json` exists with correct name and dependencies.
- `packages/rust/tsconfig.json` exists and extends base config.
- `packages/rust/vitest.config.ts` exists.
- `packages/rust/src/index.ts` exists.
- `pnpm install` succeeds.
- `pnpm --filter @alloy-js/rust build` succeeds (empty build).

## Definition of Done

Package scaffold exists and builds without errors.

## Validation Approach

```bash
cd packages/rust && pnpm build && pnpm test
```

## Risks / Notes

- Check that the exports field in package.json matches the pattern used by other packages (especially the `"source"`, `"development"`, and `"import"` conditions).
