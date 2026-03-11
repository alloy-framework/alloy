# T078 — Pre-flight turbofish call-formatting failure in `FunctionCallExpression`

| Field | Value |
|-------|-------|
| **ID** | T078 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P1 — must-have |
| **Package** | `@alloy-js/rust` |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T050, T077 |
| **Blocks** | T051, T053, T061 |

---

## Summary

Baseline pre-flight validation is red before feature work due to a turbofish call formatting regression in `FunctionCallExpression` snapshots.

## Failing Command

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

- Build passed.
- Tests failed.

## Failing Test

- File: `test/function-call-expression.test.tsx`
- Test: `FunctionCallExpression > renders turbofish type arguments with call arguments`

## Observed vs Expected Output

```diff
- f::<String, u32>(
+ f::<String,
+ u32>(
    raw,
    10
  )
```

---

## Acceptance Criteria

- [ ] Running `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` reproduces before fix and passes after fix
- [ ] `FunctionCallExpression` renders `f::<String, u32>(` for the turbofish + call-arguments case
- [ ] Snapshot expectations in `test/function-call-expression.test.tsx` pass without changing intended formatting semantics
- [ ] Existing wrapping behavior for other multiline function-call scenarios remains unchanged

---

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T077-preflight-turbofish-regression-persistence.md`
