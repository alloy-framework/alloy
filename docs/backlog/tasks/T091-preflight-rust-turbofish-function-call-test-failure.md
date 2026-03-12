# T091 — Pre-flight rust turbofish function-call formatting test failure

| Field | Value |
| --- | --- |
| ID | T091 |
| Epic | E008 — Expressions & Language Gaps |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T090 |

## Summary

Pre-flight validation identified a failing test in `FunctionCallExpression` turbofish formatting. Running `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` returned a passing build with one test failure.

Failing test:
- `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`

The test expects turbofish type arguments to remain on a single line (`f::<String, u32>(...)`), but the actual output introduces unwanted line breaks in the type argument list.

## Reproduction

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

## Failure Details

- Build: passed
- Tests: failed
- Test file: `test/function-call-expression.test.tsx`
- Issue: Turbofish type arguments render with unexpected line breaks instead of staying on one line

## Acceptance Criteria

- [ ] Task documents this pre-flight failure with exact test name, command, and formatting issue.
- [ ] `FunctionCallExpression` renders turbofish type arguments on a single line for the failing test case.
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes after fix.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T090-preflight-function-call-expression-turbofish-type-args-wrap-rerun.md`
- `docs/backlog/index.md`
