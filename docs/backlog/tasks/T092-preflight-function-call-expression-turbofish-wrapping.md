# T092 — Pre-flight FunctionCallExpression turbofish type args formatting wraps unexpectedly

| Field | Value |
| --- | --- |
| ID | T092 |
| Epic | E008 — Expressions & Language Gaps |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T091 |

## Summary

Pre-flight validation identified a test failure in `FunctionCallExpression` turbofish type argument formatting. Running `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` returns a passing build with one test failure in `function-call-expression.test.tsx`. The turbofish type arguments render with unexpected line breaks instead of remaining on a single line.

## Reproduction

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

## Failure Details

- Build: passed
- Tests: failed
- Test file: `test/function-call-expression.test.tsx`
- Issue: FunctionCallExpression turbofish type args formatting wraps unexpectedly in function-call-expression test.
- Failing test: `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`

## Acceptance Criteria

- [ ] Task documents this pre-flight failure with exact test name, command, and formatting issue.
- [ ] `FunctionCallExpression` renders turbofish type arguments on a single line for the failing test case.
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes after fix.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T091-preflight-rust-turbofish-function-call-test-failure.md`
- `docs/backlog/index.md`
