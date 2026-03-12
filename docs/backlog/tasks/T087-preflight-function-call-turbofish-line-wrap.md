# T087 — Pre-flight FunctionCallExpression turbofish line-wrap failure

## Title

Pre-flight FunctionCallExpression turbofish line-wrap failure

## Status

pending

## Priority

P0

## Dependencies

none

## Description

Track the pre-flight failure blocking work start in `@alloy-js/rust` where `FunctionCallExpression` wraps turbofish type arguments onto a new line for the two-type-argument case in `test/function-call-expression.test.tsx`.

## Acceptance Criteria

- [ ] Backlog task captures this exact pre-flight failure and links relevant source/test files.
- [ ] The tracked failure explicitly requires `f::<String, u32>(raw, 10)` rendering without a newline between turbofish type arguments.
- [ ] Follow-up implementation work validates with `pnpm --filter @alloy-js/rust test` passing for `FunctionCallExpression > renders turbofish type arguments with call arguments`.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/index.md`

## Notes

- Failing command: `pnpm --filter @alloy-js/rust test`
- Failing test: `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`
- Assertion diff:

```diff
- f::<String, u32>(raw, 10)
+ f::<String,
+   u32>(raw, 10)
```
