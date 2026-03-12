# T093 — Pre-flight FunctionCallExpression turbofish type-args wrapping in function-call test

| Field | Value |
| --- | --- |
| ID | T093 |
| Epic | E008 — Expressions & Language Gaps |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T092 |

## Summary

Pre-flight validation identified a failing test in `FunctionCallExpression` turbofish type argument formatting. Running `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` produced a passing build with one test failure.

Failing test:
- `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`

The test expects turbofish type arguments to remain on one line, but the actual output wraps unexpectedly between `String,` and `u32`.

## Reproduction

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

## Failure Details

- Build: passed
- Tests: failed
- Test file: `test/function-call-expression.test.tsx`
- Issue: Turbofish type arguments wrap unexpectedly in function-call rendering.
- Failing test: `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`

Expected:
```txt
f::<String, u32>(
  raw,
  10
)
```

Actual:
```txt
f::<String,
u32>(
  raw,
  10
)
```

## Acceptance Criteria

- [ ] Task documents this pre-flight failure with exact test name, command, and formatting issue.
- [ ] `FunctionCallExpression` renders turbofish type arguments on a single line for this failing case.
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes after the fix.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T092-preflight-function-call-expression-turbofish-wrapping.md`
- `docs/backlog/index.md`
