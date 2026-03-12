# T084 — Pre-flight FunctionCallExpression turbofish type-args wrapping alignment

| Field | Value |
| --- | --- |
| ID | T084 |
| Epic | E008 — Expressions & Language Gaps |
| Priority | P1 |
| Status | open |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T083 |

## Summary

Pre-flight validation fails before new work starts due to a persistent `FunctionCallExpression` formatting mismatch in turbofish type arguments. The failing test still observes wrapped type arguments where a stable single-line or expected wrap alignment should be produced. This task tracks resolution of the pre-flight blocker so `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` can pass reliably.

## Scope

- Confirm the failing scenario in `test/function-call-expression.test.tsx`.
- Fix turbofish type-argument wrapping behavior in `function-call-expression` rendering.
- Preserve prior regression fixes from T074–T083.
- Re-run Rust package build and tests to validate stability.

## Acceptance Criteria

- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes.
- [ ] `test/function-call-expression.test.tsx` passes for turbofish type-argument rendering.
- [ ] No regressions in existing `FunctionCallExpression` formatting snapshots.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T083-preflight-turbofish-fce-test-failure.md`
