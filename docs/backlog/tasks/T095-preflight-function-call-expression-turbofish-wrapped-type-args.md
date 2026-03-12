# T095 — Preflight FunctionCallExpression turbofish type-args wrapping in multi-line call

| Field | Value |
|-------|-------|
| **ID** | T095 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P0 — preflight blocker |
| **Package** | `@alloy-js/rust` |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T050 |
| **Blocks** | T051, T053, T061 |

---

## Description

Preflight validation failed on `pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test`. Build passed, but one test in `FunctionCallExpression` failed with turbofish type arguments wrapping across lines unexpectedly.

Failing test:
- File: `test/function-call-expression.test.tsx`
- Test: `FunctionCallExpression > renders turbofish type arguments with call arguments`
- Error: `Render is incorrect`

---

## Exact Failure Details

**Expected output:**
```rust
f::<String, u32>(
  raw,
  10
)
```

**Actual output:**
```rust
f::<String,
u32>(
  raw,
  10
)
```

The turbofish type arguments `<String, u32>` are being wrapped across two lines instead of staying on one line with the function call opening parenthesis.

---

## Scope Included

- Diagnose the wrapping logic in `FunctionCallExpression` when turbofish type arguments are combined with multi-line call arguments
- Preserve one-line turbofish formatting (`<String, u32>`) while keeping call argument wrapping behavior
- Fix `packages/rust/src/components/function-call-expression.tsx` to ensure deterministic formatting
- Ensure test `test/function-call-expression.test.tsx > FunctionCallExpression > renders turbofish type arguments with call arguments` passes

## Scope Excluded

- Unrelated `FunctionCallExpression` enhancements
- Changes outside `@alloy-js/rust`
- New expression components

---

## Acceptance Criteria

- [ ] `pnpm --filter @alloy-js/rust build` passes
- [ ] `pnpm --filter @alloy-js/rust test` passes
- [ ] Test `FunctionCallExpression > renders turbofish type arguments with call arguments` passes
- [ ] Turbofish type arguments render on one line: `f::<String, u32>(` without line break between type arguments
- [ ] Call arguments maintain existing multi-line wrapping behavior

---

## Implementation Guidance

- Review `FunctionCallExpression` rendering logic where turbofish type arguments are formatted
- Check line-break introduction logic in type-argument joining code
- Ensure wrapping thresholds don't apply to type-argument sequences when call arguments are present
- Lock the expected behavior with passing test

---

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`

---

## Validation Command

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

Specific test validation:
```bash
pnpm --filter @alloy-js/rust exec vitest run test/function-call-expression.test.tsx
```
