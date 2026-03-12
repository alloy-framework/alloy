# T101 — Preflight failure: FunctionCallExpression turbofish line break regression

| Field | Value |
| --- | --- |
| ID | T101 |
| Epic | E008 — Expressions & Language Gaps |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T100 |

## Summary

Pre-flight validation failed before task work started. Running `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` returned a passing build and one failing test in `FunctionCallExpression` turbofish rendering.

Failing test:
- `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`

Expected output keeps turbofish type arguments on one line in this case, but actual output wraps between type arguments.

## Reproduction

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

## Failure Details

- Build: passed
- Tests: failed (1 failed, 274 passed)
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

- [ ] Task captures this pre-flight failure exactly, including command, failing test name, and turbofish wrapping behavior.
- [ ] `FunctionCallExpression` renders turbofish type arguments with correct wrapping behavior for this case.
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes after the fix.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T100-preflight-function-call-expression-turbofish-wrapping-in-fce-tests.md`
- `docs/backlog/index.md`
