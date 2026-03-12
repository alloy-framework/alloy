# T106 — Preflight FunctionCallExpression turbofish type-args line-wrap regression rerun

| Field | Value |
| --- | --- |
| ID | T106 |
| Epic | E008 — Expression and Statement Components |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T105 |

## Summary

Pre-flight validation failed again before any implementation work started. Running `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` produced one failing `FunctionCallExpression` test where turbofish type arguments wrap across lines.

The failing case expects inline turbofish type arguments as `f::<String, u32>(`, but output wraps to `f::<String,` followed by `u32>(` on the next line.

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

- [ ] Task captures this pre-flight failure with the exact repro command and failing test case.
- [ ] `FunctionCallExpression` renders turbofish type arguments with call arguments inline as `f::<String, u32>(raw, 10);`.
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes after the fix.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T105-preflight-function-call-expression-turbofish-type-args-line-wrap.md`
- `docs/backlog/index.md`
