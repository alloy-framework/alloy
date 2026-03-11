# T070 — Function-call turbofish wrapping pre-flight validation fix

| Field | Value |
|-------|-------|
| **ID** | T070 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P1 — must-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T050 |
| **Blocks** | T068, T069, T053, T061 |

---

## Description

Pre-flight validation failed before this loop could start implementation work. The command `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` failed in `function-call-expression.test.tsx` for turbofish rendering with call arguments.

The failure shows turbofish type arguments wrapping across lines unexpectedly (`f::<String,` then `u32>(`), while the expected output keeps type arguments on one line (`f::<String, u32>(`). This regression blocks expression work that depends on stable `FunctionCallExpression` formatting.

---

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T068-function-call-turbofish-wrap.md`
- `docs/backlog/tasks/T069-function-call-expression-turbofish-regression.md`

---

## Goal

Fix `FunctionCallExpression` turbofish wrapping behavior so pre-flight validation passes and downstream expression tasks can proceed.

---

## Scope Included

- Diagnose the turbofish wrapping failure in `FunctionCallExpression`
- Implement a formatting fix that preserves expected call-site rendering
- Add or adjust tests to lock expected behavior
- Validate with `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`

## Scope Excluded

- New expression components unrelated to function calls
- Module/scope architecture changes
- Changes outside `@alloy-js/rust`

---

## Acceptance Criteria

- [ ] `pnpm --filter @alloy-js/rust build` passes
- [ ] `pnpm --filter @alloy-js/rust test` passes
- [ ] Turbofish type arguments remain stable and deterministic when combined with call arguments
- [ ] Pre-flight validation command passes: `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`

---

## Evidence

- Pre-flight command result: `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`
- Failing test: `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments`
- Observed mismatch:
  - Expected: `f::<String, u32>(`
  - Received: `f::<String,` then `u32>(`
