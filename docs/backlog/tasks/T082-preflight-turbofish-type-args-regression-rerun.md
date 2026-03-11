# T082 — Pre-flight turbofish type-args regression persisted on validation rerun

| Field | Value |
|-------|-------|
| **ID** | T082 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P1 — must-have |
| **Package** | `@alloy-js/rust` |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T050, T081 |
| **Blocks** | T051, T053, T061 |

---

## Description

Mandatory pre-flight validation failed before starting feature work in this loop.

Reproduction command:

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

Observed failure:

- Build passed.
- Test failed: `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`.
- Error: `Render is incorrect`.

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

- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` reproduces the failure before fix and passes after fix.
- [ ] `FunctionCallExpression` renders `f::<String, u32>(` for the failing turbofish call case.
- [ ] Existing function-call wrapping behavior for non-turbofish and long argument lists remains stable.
- [ ] `pnpm --filter @alloy-js/rust build` passes.
- [ ] `pnpm --filter @alloy-js/rust test` passes.

---

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T081-preflight-turbofish-type-args-comma-line-break.md`
