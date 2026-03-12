# T096 — Preflight FunctionCallExpression turbofish line wrapping regression in wrapped type arguments

| Field | Value |
|-------|-------|
| **ID** | T096 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
| **Type** | bug |
| **Status** | open |
| **Priority** | P0 — preflight blocker |
| **Package** | `@alloy-js/rust` |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T050, T095 |
| **Blocks** | T051, T053, T061 |

---

## Description

Preflight validation failed on:

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```

`build` passed, but one test in `FunctionCallExpression` failed due to turbofish type-argument line wrapping.

Failing test:
- File: `packages/rust/test/function-call-expression.test.tsx`
- Test: `FunctionCallExpression > renders turbofish type arguments with call arguments`

---

## Exact Failure Details

Expected output starts call with one-line turbofish:

```rust
f::<String, u32>(
```

Actual output wraps inside turbofish:

```rust
f::<String,
u32>(
```

---

## Scope Included

- Diagnose turbofish type-argument wrapping behavior in `FunctionCallExpression`.
- Ensure deterministic formatting behavior for type-argument lists.
- Fix rendering so this preflight failure no longer reproduces.
- Preserve existing call-argument wrapping behavior.

## Scope Excluded

- Unrelated expression component changes.
- Changes outside `@alloy-js/rust`.
- New component feature work not required for this regression.

---

## Acceptance Criteria

- [ ] `pnpm --filter @alloy-js/rust build` passes.
- [ ] `pnpm --filter @alloy-js/rust test` passes.
- [ ] `FunctionCallExpression > renders turbofish type arguments with call arguments` passes.
- [ ] One-line turbofish rendering remains stable for short type-argument lists.
- [ ] No regressions introduced to existing function-call formatting tests.

---

## Implementation Guidance

- Review `packages/rust/src/components/function-call-expression.tsx` logic for turbofish rendering and wrapping.
- Compare behavior against existing snapshots in `packages/rust/test/function-call-expression.test.tsx`.
- Keep formatting strategy internally consistent (single-line vs multi-line) and deterministic.

---

## Context Files

- `packages/rust/src/components/function-call-expression.tsx`
- `packages/rust/test/function-call-expression.test.tsx`
- `docs/backlog/tasks/T050-function-call-expression.md`
- `docs/backlog/tasks/T095-preflight-function-call-expression-turbofish-wrapped-type-args.md`

---

## Validation Command

```bash
pnpm --filter @alloy-js/rust build && pnpm --filter @alloy-js/rust test
```
