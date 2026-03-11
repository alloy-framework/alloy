# T074 — Pre-flight turbofish comma-wrap regression from loop pre-check

| Field | Value |
|-------|-------|
| **ID** | T074 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P1 — must-have |
| **Package** | `@alloy-js/rust` |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T050 |
| **Blocks** | T051, T053, T061 |

---

## Description

The mandatory pre-flight check failed before task work started in this loop.

Reproduction command:

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

Observed failure:

- Build passed
- Test failed: `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`
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

This task tracks the pre-flight blocker encountered in the current loop, as required by execution policy.

---

## Acceptance Criteria

- [ ] Running `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` reproduces the issue before fix and passes after fix
- [ ] `FunctionCallExpression` renders turbofish type arguments with call arguments on one line for this case: `f::<String, u32>(`
- [ ] Existing wrapping behavior remains stable for non-turbofish calls and long argument lists
- [ ] `pnpm --filter @alloy-js/rust build` passes
- [ ] `pnpm --filter @alloy-js/rust test` passes
