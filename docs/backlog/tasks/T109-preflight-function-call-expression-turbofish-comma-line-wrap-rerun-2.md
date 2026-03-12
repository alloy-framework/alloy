# T109 — Preflight FunctionCallExpression turbofish comma line-wrap regression (rerun 2)

| Field | Value |
| --- | --- |
| ID | T109 |
| Epic | E008 — Expression and Statement Components |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T108 |

## Summary

Pre-flight validation failed before task implementation work. Running `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` produced one failing `FunctionCallExpression` test.

The turbofish type arguments render with an unexpected line break after the comma, producing `f::<String,` followed by `u32>(` instead of one-line `f::<String, u32>(`.

## Reproduction

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

## Failure Details

- Build: passed
- Tests: failed (1)
- Failing test:
  - `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`
- Diff excerpt:

```diff
- f::<String, u32>(
+ f::<String,
+ u32>(
    raw,
    10
  )
```

## Acceptance Criteria

- [ ] Task captures this pre-flight failure exactly, including command, failing test name, and turbofish comma line-wrap mismatch.
- [ ] `FunctionCallExpression` renders turbofish type arguments in one line when expected (`f::<String, u32>(`) for this test case.
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes after the fix.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T108-preflight-function-call-expression-turbofish-formatting-mismatch.md`
- `docs/backlog/index.md`
