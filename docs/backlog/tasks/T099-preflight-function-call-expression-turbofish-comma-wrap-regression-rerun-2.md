# T099 — Preflight rerun: FunctionCallExpression turbofish comma-wrap regression persists

| Field | Value |
| --- | --- |
| ID | T099 |
| Epic | E008 — Expressions & Language Gaps |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T098 |

## Summary

Preflight validation failed before task execution. Running `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` reproduced the same `FunctionCallExpression` turbofish formatting regression seen in prior reruns.

Failing test:

- `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`

Expected output keeps turbofish type arguments on one line (`f::<String, u32>(`), but actual output inserts a line break after the comma.

## Reproduction

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
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
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes after the fix.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T098-preflight-function-call-expression-turbofish-comma-line-wrap-rerun.md`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/index.md`
