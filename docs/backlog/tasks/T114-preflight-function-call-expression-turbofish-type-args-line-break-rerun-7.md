# T114 — Preflight FunctionCallExpression turbofish type-args line-break regression (rerun 7)

| Field | Value |
| --- | --- |
| ID | T114 |
| Epic | E008 — Expression and Statement Components |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T113 |

## Summary

Pre-flight validation failed before implementation work started. Running `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passed build but failed one `FunctionCallExpression` test.

The turbofish type arguments render with an unexpected newline after the comma, so output starts with `f::<String,` then `u32>(` instead of expected one-line `f::<String, u32>(`.

## Reproduction

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

## Failure Details

- Build: passed
- Tests: failed (1)
- Failing test:
  - `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`
- Mismatch:
  - expected starts with `f::<String, u32>(`
  - received starts with:

```text
f::<String,
  u32>(
```

## Acceptance Criteria

- [ ] Backlog captures this pre-flight failure exactly, including command, failing test name, and expected vs received turbofish prefix.
- [ ] `FunctionCallExpression` renders turbofish type arguments on one line for this case (`f::<String, u32>(`).
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes after the fix.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T113-preflight-function-call-expression-turbofish-type-args-line-break-rerun-6.md`
- `docs/backlog/index.md`
