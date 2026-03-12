# T088 — Pre-flight FunctionCallExpression turbofish one-line formatting blocker

| Field | Value |
| --- | --- |
| ID | T088 |
| Epic | E008 — Expressions & Language Gaps |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T087 |

## Summary

Pre-flight validation failed before task work started. Running `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` produced a passing build and failing test for turbofish call rendering in `FunctionCallExpression`.

Failing test:

- `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`

Expected output keeps turbofish type arguments on one line (`f::<String, u32>(...)`), but actual output introduces a line break after `String`.

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
- `docs/backlog/tasks/T087-preflight-function-call-turbofish-line-wrap.md`
- `docs/backlog/index.md`
