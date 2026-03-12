# T108 — Preflight FunctionCallExpression turbofish formatting mismatch in test output

| Field | Value |
| --- | --- |
| ID | T108 |
| Epic | E008 — Expressions & Language Gaps |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T107 |

## Summary

Pre-flight validation failed before task work started. Running
`pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`
produced one failing test in `FunctionCallExpression` turbofish formatting.

The regression renders turbofish type arguments with unexpected line breaks in
`test/function-call-expression.test.tsx`.

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
- f::<String, u32>(raw, 10);
+ f::<String,
+ u32>(raw, 10);
```

## Acceptance Criteria

- [ ] Task captures this pre-flight failure exactly, including command, failing
      test name, and output mismatch.
- [ ] `FunctionCallExpression` turbofish type arguments render without
      unexpected line breaks.
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`
      passes after the fix.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T107-preflight-function-call-expression-turbofish-comma-wrap-failure.md`
- `docs/backlog/index.md`
