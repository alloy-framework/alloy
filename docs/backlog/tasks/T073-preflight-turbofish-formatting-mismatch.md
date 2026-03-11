# T073 — Pre-flight turbofish formatting mismatch blocker

| Field | Value |
|-------|-------|
| **ID** | T073 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | bug |
| **Status** | pending |
| **Priority** | P1 — must-have |
| **Package** | `@alloy-js/rust` |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T050, T069, T072 |
| **Blocks** | T051, T053, T061 |

---

## Description

Pre-flight validation for `@alloy-js/rust` is currently blocked by a turbofish formatting mismatch in `FunctionCallExpression`.

Reproduction command:

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

Current failure from pre-flight run:

- Failing test: `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`
- Error: `Render is incorrect`

Expected vs received output:

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

- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` reproduces the issue before fix and passes after the formatting fix is merged
- [ ] `FunctionCallExpression` renders turbofish + call arguments to match expected snapshot line for this case: `f::<String, u32>(`
- [ ] Existing call-argument wrapping behavior remains stable for non-turbofish and long-argument cases
- [ ] `pnpm --filter @alloy-js/rust build` passes
- [ ] `pnpm --filter @alloy-js/rust test` passes
