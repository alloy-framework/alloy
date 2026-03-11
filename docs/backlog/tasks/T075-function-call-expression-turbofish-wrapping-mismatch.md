# T075 — FunctionCallExpression turbofish wrapping mismatch: two-type-argument case

## Summary

- **ID**: T075
- **Status**: open
- **Priority**: P1
- **Type**: bug
- **Epic**: E008
- **Dependencies**: T050

## Problem Statement

Pre-flight validation fails before task work starts:

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

Current failure:

- Test file: `packages/rust/test/function-call-expression.test.tsx`
- Test: `FunctionCallExpression > renders turbofish type arguments with call arguments`
- Mismatch:
  - Expected: `f::<String, u32>(`
  - Received: `f::<String,\n  u32>(`

## Scope

- Diagnose the turbofish type-argument wrapping behavior for the two-type-argument case.
- Fix rendering in `packages/rust/src/components/function-call-expression.tsx` so this case stays on one line.
- Keep existing call-argument wrapping behavior stable.
- Validate with:
  - `pnpm --filter @alloy-js/rust build`
  - `pnpm --filter @alloy-js/rust test`

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T069-function-call-expression-turbofish-regression.md`
- `docs/backlog/tasks/T072-preflight-turbofish-call-args-mismatch.md`
- `docs/backlog/tasks/T073-preflight-turbofish-formatting-mismatch.md`
- `docs/backlog/tasks/T074-preflight-turbofish-comma-wrap-regression.md`

## Acceptance Criteria

- Turbofish type arguments render as `f::<String, u32>(` for the failing case.
- The failing test in `function-call-expression.test.tsx` passes.
- `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes.
