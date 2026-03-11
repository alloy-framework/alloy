# T069 — FunctionCallExpression Turbofish Line-Wrap Regression

| Field | Value |
|-------|-------|
| **ID** | T069 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P2 — should-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T050 (FunctionCallExpression) |
| **Blocks** | T051, T053, T061 |

---

## Description

Pre-flight validation fails on `pnpm --filter @alloy-js/rust test` because turbofish type arguments in `FunctionCallExpression` are line-wrapping at the comma when paired with wrapped call arguments.

Expected:

`f::<String, u32>(...)`

Actual:

`f::<String,\n u32>(...)`

This task tracks the regression discovered during pre-flight so the formatter behavior can be corrected before additional expression tasks proceed.

---

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T068-function-call-turbofish-wrap.md`
- `docs/language-packages/rust/02-existing-language-patterns.md`
- `docs/language-packages/rust/03-rust-design-notes.md`

---

## Goal

Restore stable, idiomatic turbofish formatting in `FunctionCallExpression` so type arguments remain on one line unless true width constraints require wrapping.

---

## Scope Included

- Diagnose the turbofish wrapping logic regression in `FunctionCallExpression`
- Preserve existing call-argument wrapping behavior
- Add or adjust tests for turbofish + wrapped argument combinations
- Validate with:
  - `pnpm --filter @alloy-js/rust build`
  - `pnpm --filter @alloy-js/rust test`

## Scope Excluded

- New expression components unrelated to function calls
- Method chaining behavior covered by T061

---

## Acceptance Criteria

- [ ] Turbofish type arguments render as `::<T, U>` on one line in normal cases
- [ ] Call argument wrapping remains deterministic and unchanged for existing scenarios
- [ ] Combined turbofish + wrapped call formatting snapshots are stable
- [ ] `pnpm --filter @alloy-js/rust build` passes
- [ ] `pnpm --filter @alloy-js/rust test` passes

---

## Evidence

- Pre-flight command:
  - `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`
- Failing test:
  - `packages/rust/test/function-call-expression.test.tsx`
