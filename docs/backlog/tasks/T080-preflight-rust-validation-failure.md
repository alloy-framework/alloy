# T080 — Preflight Rust validation failure in turbofish type args formatting

| Field | Value |
|-------|-------|
| **ID** | T080 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P1 — must-have |
| **Package** | `@alloy-js/rust` |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | — |
| **Blocks** | T051, T053, T061 |

---

## Description

Preflight for `@alloy-js/rust` is failing before feature work due to a formatting regression in turbofish type arguments for `FunctionCallExpression` with call arguments.

Failing command used to validate:

```bash
pnpm --filter @alloy-js/rust exec vitest run test/function-call-expression.test.tsx
```

## Exact Failing Test

- File: `test/function-call-expression.test.tsx`
- Test: `FunctionCallExpression > renders turbofish type arguments with call arguments`
- Error: `Render is incorrect`

## Observed vs Expected Output

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

- [ ] `FunctionCallExpression` renders turbofish + call-arguments as `f::<String, u32>(` for the two-type-argument case in `test/function-call-expression.test.tsx`.
- [ ] `pnpm --filter @alloy-js/rust exec vitest run test/function-call-expression.test.tsx` passes.
- [ ] `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test` passes.
- [ ] Existing long-line wrapping behavior for function-call arguments and unrelated turbofish scenarios remains unchanged.

---

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T079-pre-flight-turbofish-call-args-line-break-mismatch.md`
