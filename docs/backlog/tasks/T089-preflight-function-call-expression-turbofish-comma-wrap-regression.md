# T089 — Pre-flight FunctionCallExpression turbofish comma-wrap regression

| Field | Value |
| --- | --- |
| ID | T089 |
| Epic | E008 — Expressions & Language Gaps |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T088 |

## Summary

Pre-flight validation failed before task work started. Running `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` returned a passing build and one failing test in `FunctionCallExpression` turbofish rendering.

Failing test:

- `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`

Expected output keeps turbofish type arguments on one line (`f::<String, u32>(...)`), but actual output wraps after `String` and moves `u32` to the next line.

## Reproduction

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

## Failure Details

- Build: passed
- Tests: failed
- Expected: `f::<String, u32>(...)`
- Actual: `f::<String,` followed by a newline before `u32>(...)`

## Acceptance Criteria

- [ ] Task captures this pre-flight failure exactly, including command, failing test name, and expected vs actual turbofish formatting.
- [ ] `FunctionCallExpression` renders `f::<String, u32>(raw, 10)` without a line break between `String` and `u32` for the failing case.
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes after the follow-up fix.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T088-preflight-function-call-expression-turbofish-one-line-blocker.md`
- `docs/backlog/index.md`
