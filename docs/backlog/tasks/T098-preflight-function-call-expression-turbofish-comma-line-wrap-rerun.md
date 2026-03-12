# T098 — Preflight rerun: FunctionCallExpression turbofish comma line-wrap regression

| Field | Value |
| --- | --- |
| ID | T098 |
| Epic | E008 — Expressions & Language Gaps |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T097 |

## Summary

Preflight validation failed before task execution. Running `pnpm --filter @alloy-js/rust test` reported a `FunctionCallExpression` turbofish formatting regression in `test/function-call-expression.test.tsx`.

Failing test:

- `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`

Expected output keeps turbofish type arguments on one line (`f::<String, u32>(`), but actual output inserts a line break after the comma.

## Reproduction

```bash
pnpm --filter @alloy-js/rust test
```

## Failure Details

- Expected:
  ```rust
  f::<String, u32>(
  ```
- Actual:
  ```rust
  f::<String,
    u32>(
  ```

## Acceptance Criteria

- [ ] Backlog task captures this preflight failure exactly, including failing test path and assertion mismatch.
- [ ] `FunctionCallExpression` renders `f::<String, u32>(` without inserting a newline between turbofish type arguments for this scenario.
- [ ] `pnpm --filter @alloy-js/rust test` passes after the fix.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T097-preflight-function-call-expression-turbofish-wrap-regression-rerun.md`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/index.md`
