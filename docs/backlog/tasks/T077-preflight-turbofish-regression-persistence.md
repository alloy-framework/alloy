# T077 — Pre-flight turbofish regression persistence in `FunctionCallExpression`

| Field | Value |
|-------|-------|
| **ID** | T077 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | bug |
| **Status** | pending |
| **Priority** | P1 — must-have |
| **Package** | `@alloy-js/rust` |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T050, T076 |
| **Blocks** | T051, T053, T061, T073 |

---

## Description

Mandatory pre-flight validation failed before task execution in this loop.

Reproduction command:

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

Observed failure:

- Build passed
- Test failed: `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`
- Error: `Render is incorrect`

Expected vs actual output:

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
- [ ] `FunctionCallExpression` renders `f::<String, u32>(` for the failing turbofish case
- [ ] Existing wrapping behavior for non-turbofish and long argument lists remains stable
- [ ] `pnpm --filter @alloy-js/rust build` passes
- [ ] `pnpm --filter @alloy-js/rust test` passes

---

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T076-preflight-turbofish-line-wrapping-failure.md`
- `docs/backlog/tasks/T073-preflight-turbofish-formatting-mismatch.md`
