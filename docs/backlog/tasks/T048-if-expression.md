# T048 — IfExpression + ElseIfClause + ElseClause Components

| Field | Value |
|-------|-------|
| **ID** | T048 |
| **Epic** | [E006](../epics/E006-external-deps-build-polish.md) |
| **Type** | feature |
| **Status** | open |
| **Priority** | P1 — must-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | Yes |
| **Dependencies** | T009 (SourceFile / CrateDirectory) |
| **Blocks** | T053 (Update rust-example sample) |

---

## Description

Rust `if` is an expression (can return values). The sample has 2 if-block patterns and 1 `if let` pattern written as raw code. Both TypeScript and C# packages already provide IfStatement components.

---

## Goal

Provide `IfExpression`, `ElseIfClause`, and `ElseClause` components for Rust if-expressions, including `if let` support.

---

## Proposed API

```tsx
// Simple if:
<IfExpression condition="self.data.len() >= self.max_capacity">
  {code`return Err(StoreError::StorageFull);`}
</IfExpression>

// if / else if / else:
<IfExpression condition="entry.status == EntryStatus::Expired">
  {code`Err(StoreError::NotFound)`}
  <ElseIfClause condition="entry.is_stale()">
    {code`Err(StoreError::NotFound)`}
  </ElseIfClause>
  <ElseClause>
    {code`Ok(&entry.value)`}
  </ElseClause>
</IfExpression>

// if let (condition is just a string containing `let`):
<IfExpression condition="let Some(ttl) = entry.ttl">
  <IfExpression condition="entry.created_at.elapsed() > ttl">
    {code`return Err(StoreError::NotFound);`}
  </IfExpression>
</IfExpression>
```

### Props

```typescript
interface IfExpressionProps {
  condition: Children;   // Condition or "let pattern = expr"
  children: Children;    // Body + optional ElseIfClause/ElseClause
}

interface ElseIfClauseProps {
  condition: Children;
  children: Children;
}

interface ElseClauseProps {
  children: Children;
}
```

---

## Scope Included

- `packages/rust/src/components/if-expression.tsx` — IfExpression, ElseIfClause, ElseClause
- Renders `if condition { body }` with proper braces and indentation
- Supports `if let` through the condition prop (no special handling needed)
- Chained else-if / else clauses
- STC wrappers
- Unit tests

---

## Scope Excluded

- `while let` / `loop` / `for` components (separate tasks)
- Ternary-style inline if (Rust doesn't have ternary; if-else is the expression form)

---

## Precedent

- TypeScript: `IfStatement` + `ElseIfClause` + `ElseClause` at `packages/typescript/src/components/IfStatement.tsx`
- C#: `IfStatement` + `ElseIf` + `Else` at `packages/csharp/src/components/if/`

Both use the same pattern: condition prop + children body + sibling clause components.

---

## Acceptance Criteria

- [ ] `<IfExpression condition={...}>body</IfExpression>` renders `if condition { body }`
- [ ] `<ElseIfClause>` renders ` else if condition { body }`
- [ ] `<ElseClause>` renders ` else { body }`
- [ ] `if let` patterns work via condition prop
- [ ] Proper indentation of body
- [ ] STC wrappers exported

---

## Evidence

2 if-blocks and 1 if-let in `samples/rust-example/` — `store-module.tsx` insert method (capacity check) and get method (expiration check with nested if-let).
