# T105 — Preflight FunctionCallExpression turbofish type-args line-wrap failure

| Field | Value |
| --- | --- |
| ID | T105 |
| Epic | E008 — Expression and Statement Components |
| Priority | P0 (preflight blocker) |
| Status | pending |
| Type | bug |
| Package | `@alloy-js/rust` |
| Dependencies | T050, T104 |

## Summary

Pre-flight validation failed before implementation work started. Running `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` produced one failing `FunctionCallExpression` test where turbofish type arguments unexpectedly wrap after the comma.

The regression renders `f::<String,` and `u32>(` on separate lines, while the expected output for this case is `f::<String, u32>(` on one line.

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

- [ ] Task captures this pre-flight failure exactly, including command, failing test name, and turbofish line-wrap behavior.
- [ ] `FunctionCallExpression` renders turbofish type arguments with call arguments as `f::<String, u32>(raw, 10);` for this case.
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes after the fix.

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T104-preflight-function-call-expression-turbofish-type-args-line-break.md`
- `docs/backlog/index.md`
