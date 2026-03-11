# T079 — Pre-flight turbofish call-args line-break mismatch in `FunctionCallExpression`

| Field | Value |
|-------|-------|
| **ID** | T079 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P1 — must-have |
| **Package** | `@alloy-js/rust` |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T050 |
| **Blocks** | — |

---

## Description

Pre-flight validation failed before task execution. The Rust package test suite reports a snapshot mismatch where turbofish type arguments in `FunctionCallExpression` render with an unwanted line break after the comma for a two-type, call-argument case.

Reproduction command:

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

Observed failure:

- Failing test: `test/function-call-expression.test.tsx`.
- Case: `renders turbofish type arguments with call arguments`.
- Actual render inserts a newline after `String,` in `f::<String, u32>(...)`.

Expected vs actual output:

```diff
-f::<String, u32>(
+f::<String,
+u32>(
```

---

## Acceptance Criteria

- [ ] `FunctionCallExpression` renders two turbofish type arguments on one line when call arguments are present and wrapping is not required.
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes.
- [ ] Existing turbofish wrapping behavior for genuinely long argument lists remains covered by tests and unchanged.

---

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T076-pre-flight-turbofish-line-wrapping-failure-in-functioncallexpression.md`
- `docs/backlog/tasks/T077-pre-flight-turbofish-regression-persistence-in-functioncallexpression.md`
- `docs/backlog/tasks/T078-pre-flight-turbofish-call-formatting-failure-in-functioncallexpression.md`
