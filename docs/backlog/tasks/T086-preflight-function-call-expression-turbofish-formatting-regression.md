# T086 — Pre-flight FunctionCallExpression turbofish formatting regression

| Field | Value |
| --- | --- |
| ID | T086 |
| Epic | E008 — Expressions & Language Gaps |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050 |

## Summary

Pre-flight validation failed before task work started. In `test/function-call-expression.test.tsx`, turbofish type arguments render with an unwanted newline between `String` and `u32` (`f::<String,\n  u32>(...)`) instead of the expected single-line form `f::<String, u32>(...)`.

## Reproduction

```bash
pnpm --filter @alloy-js/rust test
```

## Acceptance Criteria

- [ ] `FunctionCallExpression` turbofish type arguments render as `f::<String, u32>(...)` for the failing two-type-argument case.
- [ ] No newline is introduced between `String` and `u32` in turbofish formatting for this scenario.
- [ ] `pnpm --filter @alloy-js/rust build` passes.
- [ ] `pnpm --filter @alloy-js/rust test` passes.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T085-preflight-function-call-expression-turbofish-single-line-regression.md`
- `docs/backlog/index.md`
