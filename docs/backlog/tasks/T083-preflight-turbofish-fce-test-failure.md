# T083 — Pre-flight turbofish FunctionCallExpression test validation failure

| Field | Value |
|-------|-------|
| **ID** | T083 |
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

## Description

Pre-flight validation for `@alloy-js/rust` failed in `FunctionCallExpression` test rendering.

Reproduction command:

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

Current failure:

- Failing test: `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`
- Error: `Render is incorrect`

Expected vs received output:

```diff
- f::<String, u32>(
+ f::<String,
+ u32>(
```

---

## Acceptance Criteria

- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` reproduces the issue before fix and passes after fix is merged
- [ ] `FunctionCallExpression` renders turbofish + call arguments correctly without unwanted line breaks
- [ ] Existing call-argument wrapping behavior remains stable
- [ ] `pnpm --filter @alloy-js/rust build` passes
- [ ] `pnpm --filter @alloy-js/rust test` passes

---

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T073-preflight-turbofish-formatting-mismatch.md`
- `docs/backlog/tasks/T077-preflight-turbofish-regression-persistence.md`
