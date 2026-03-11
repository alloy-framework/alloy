# T068 — FunctionCallExpression Turbofish + Wrap Formatting Stabilization

| Field | Value |
|-------|-------|
| **ID** | T068 |
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

Pre-flight validation currently fails on `pnpm --filter @alloy-js/rust test` due to unstable line wrapping for turbofish type arguments combined with call arguments in `FunctionCallExpression`.

The failing snapshot in `test/function-call-expression.test.tsx` expects:

`f::<String, u32>(...)`

but current output inserts a newline inside the turbofish list:

`f::<String,\nu32>(...)`

This task isolates the formatting bug so pre-flight and normal validation can pass reliably.

---

## Context Files

- `docs/backlog/tasks/T050-function-call-expression.md`
- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/language-packages/rust/02-existing-language-patterns.md`
- `docs/language-packages/rust/03-rust-design-notes.md`

---

## Goal

Ensure `FunctionCallExpression` renders stable, idiomatic Rust formatting for turbofish type arguments and wrapped call arguments without introducing regressions.

---

## Scope Included

- Fix turbofish type argument rendering in `FunctionCallExpression`
- Preserve existing argument wrapping behavior
- Add/adjust tests for turbofish + multi-arg wrapping combinations
- Validate with:
  - `pnpm --filter @alloy-js/rust build`
  - `pnpm --filter @alloy-js/rust test`

## Scope Excluded

- New expression APIs unrelated to `FunctionCallExpression`
- Method chaining (`MethodChainExpression`, T061)

---

## Acceptance Criteria

- [ ] `FunctionCallExpression` keeps turbofish type args on a stable comma-separated line when expected
- [ ] Multi-argument calls still wrap with correct indentation
- [ ] Combined turbofish + wrapped args snapshots are deterministic
- [ ] `pnpm --filter @alloy-js/rust build` passes
- [ ] `pnpm --filter @alloy-js/rust test` passes

---

## Evidence

- Current failing test: `test/function-call-expression.test.tsx`
- Failure mode observed during required pre-flight command:
  - `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`
