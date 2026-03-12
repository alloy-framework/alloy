# T094 — Pre-flight FunctionCallExpression turbofish one-line formatting regression (recheck)

| Field | Value |
| --- | --- |
| ID | T094 |
| Epic | E008 — Expressions & Language Gaps |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T093 |

## Summary

This task captures a regression discovered during pre-flight validation before any new task work started. Running `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` produced a passing build with one failing test in `FunctionCallExpression` turbofish formatting.

Failing test:
- `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`

Expected snippet:
```txt
f::<String, u32>(
```

Actual snippet:
```txt
f::<String,
 u32>(
```

## Scope

### In Scope
- Track this specific pre-flight turbofish one-line formatting regression with exact failure details.
- Restore one-line turbofish type argument formatting for the two-type-argument function-call case.
- Keep existing call-argument wrapping behavior unchanged.
- Ensure the pre-flight validation command passes after follow-up implementation.

### Out of Scope
- Unrelated `FunctionCallExpression` enhancements.
- Formatting changes outside turbofish type argument rendering.

## Implementation Guidance

- Inspect `FunctionCallExpression` rendering where turbofish type arguments are joined and line breaks are introduced.
- Verify formatting decisions for `::<String, u32>(` remain stable when call arguments wrap across multiple lines.
- Update or extend test coverage in `test/function-call-expression.test.tsx` only as needed to lock expected one-line turbofish behavior.
- Preserve existing formatting expectations covered by prior turbofish regression tasks.

## Acceptance Criteria

- [ ] Task records this pre-flight failure, including command, failing test name, and expected vs actual snippet.
- [ ] `FunctionCallExpression` renders `f::<String, u32>(` without a newline between `String,` and `u32` for the failing scenario.
- [ ] Existing turbofish and call-argument formatting behavior remains stable for covered cases.
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes.

## Validation Command

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T093-preflight-function-call-expression-turbofish-type-args-wrapping-test.md`
- `docs/backlog/index.md`
