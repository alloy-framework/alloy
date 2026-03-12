# T102 — Preflight FunctionCallExpression turbofish formatting test mismatch

| Field | Value |
| --- | --- |
| ID | T102 |
| Epic | E008 — Expressions & Language Gaps |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T101 |

## Summary

Pre-flight validation failed for `@alloy-js/rust` during the mandated gate before task work.
The failure reproduces in `FunctionCallExpression` turbofish formatting where generic type
arguments are line-broken unexpectedly.

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

- [ ] Task captures the pre-flight failure command, failing test name, and output mismatch.
- [ ] `FunctionCallExpression` turbofish type arguments render without incorrect line breaks.
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T101-preflight-rust-build-test-failure-function-call-expression-turbofish-line-break.md`
- `docs/backlog/index.md`
