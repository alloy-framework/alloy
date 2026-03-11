# T071 — Pre-flight turbofish snapshot mismatch failure tracking

| Field | Value |
|-------|-------|
| **ID** | T071 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P1 — must-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T050 (pre-flight blocker) |
| **Blocks** | T051, T053, T061 |

---

## Description

Pre-flight validation failed while running:

`pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`

`build` passed, but tests failed in `packages/rust/test/function-call-expression.test.tsx` due to a turbofish snapshot mismatch. The expected output keeps type arguments on one line (`f::<String, u32>(`), while actual output wraps after the comma (`f::<String,\n u32>(`).

This task tracks the required pre-flight blocker fix before baseline-dependent expression work can proceed.

---

## Context Files

- `docs/backlog/tasks/T050-function-call-expression.md`
- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T068-function-call-turbofish-wrap.md`
- `docs/backlog/tasks/T069-function-call-expression-turbofish-regression.md`
- `docs/backlog/tasks/T070-preflight-validation-turbofish-failure.md`

---

## Goal

Fix the turbofish wrapping mismatch in `FunctionCallExpression` so the required pre-flight command returns green and baseline validation is restored.

---

## Scope Included

- Correct turbofish rendering so `::<String, u32>` does not wrap at the comma in this scenario
- Preserve existing multi-argument call wrapping behavior
- Update/add snapshots covering turbofish + wrapped argument combinations
- Re-run pre-flight validation:
  - `pnpm --filter @alloy-js/rust build`
  - `pnpm --filter @alloy-js/rust test`

## Scope Excluded

- New expression APIs unrelated to `FunctionCallExpression`
- Non-rust package changes

---

## Acceptance Criteria

- [ ] Snapshot in `packages/rust/test/function-call-expression.test.tsx` matches expected one-line turbofish form `f::<String, u32>(`
- [ ] No regression in existing wrapped call argument formatting
- [ ] `pnpm --filter @alloy-js/rust build` passes
- [ ] `pnpm --filter @alloy-js/rust test` passes
- [ ] Combined pre-flight command passes: `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`

---

## Evidence

- Pre-flight command failure context:
  - `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`
- Failing test:
  - `packages/rust/test/function-call-expression.test.tsx`
- Snapshot mismatch:
  - Expected: `f::<String, u32>(`
  - Received: `f::<String,` then `u32>(`
