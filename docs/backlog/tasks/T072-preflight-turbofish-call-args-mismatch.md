# T072 — Pre-flight turbofish call-args snapshot mismatch tracking

| Field | Value |
|-------|-------|
| **ID** | T072 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P1 — must-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T050 |
| **Blocks** | T051, T053, T061 |

---

## Description

Pre-flight validation for `@alloy-js/rust` failed on tests while build remained green.

- Build: passed
- Test: failed at `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`

Observed mismatch:

- Expected: `f::<String, u32>(`
- Received: `f::<String,\n          u32>(`

This task tracks the blocker so baseline formatting is restored before dependent expression work proceeds.

---

## Reproduction

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

---

## Acceptance Criteria

- [ ] `test/function-call-expression.test.tsx` expectation for turbofish type arguments with call arguments matches one-line output: `f::<String, u32>(`
- [ ] No regression in wrapped call argument formatting behavior in `FunctionCallExpression`
- [ ] `pnpm --filter @alloy-js/rust build` passes
- [ ] `pnpm --filter @alloy-js/rust test` passes
- [ ] Combined pre-flight command passes: `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`
