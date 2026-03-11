# T047 — MatchExpression + MatchArm Components

| Field | Value |
|-------|-------|
| **ID** | T047 |
| **Epic** | [E008](../epics/E008-expression-components.md) |
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

`match` is one of Rust's most distinctive and heavily-used constructs. The sample has 2 match expressions written as raw code, but any non-trivial Rust code generator will produce many more. Currently:

```tsx
{code`
  match self {
      Self::NotFound => write!(f, "key not found"),
      Self::StorageFull => write!(f, "storage is full"),
      Self::SerializationError(msg) => write!(f, "serialization error: {}", msg),
  }
`}
```

---

## Goal

Provide `MatchExpression` and `MatchArm` components for Rust pattern matching.

---

## Proposed API

```tsx
<MatchExpression expression="self">
  <MatchArm pattern="Self::NotFound">
    {code`write!(f, "key not found")`}
  </MatchArm>
  <MatchArm pattern="Self::StorageFull">
    {code`write!(f, "storage is full")`}
  </MatchArm>
  <MatchArm pattern="Self::SerializationError(msg)">
    {code`write!(f, "serialization error: {}", msg)`}
  </MatchArm>
</MatchExpression>

// With guard clause:
<MatchArm pattern="Some(entry)" guard="entry.is_expired()">
  {code`Err(StoreError::NotFound)`}
</MatchArm>

// Multi-line arm body:
<MatchArm pattern="Some(entry)">
  <IfExpression condition="entry.is_expired()">
    {code`return Err(StoreError::NotFound);`}
  </IfExpression>
  {code`Ok(&entry.value)`}
</MatchArm>

// Wildcard:
<MatchArm pattern="_">
  {code`unreachable!()`}
</MatchArm>
```

### Props

```typescript
interface MatchExpressionProps {
  expression: Children;  // The value being matched
  children: Children;    // MatchArm children
}

interface MatchArmProps {
  pattern: Children;     // The pattern (e.g., "Some(x)", "None", "_")
  guard?: Children;      // Optional guard clause ("if condition")
  children: Children;    // Arm body expression or block
}
```

---

## Scope Included

- `packages/rust/src/components/match-expression.tsx` — MatchExpression and MatchArm
- Single-expression arms render as `pattern => expression,`
- Multi-statement arms render with block `pattern => { ... }`
- Optional `guard` prop renders `if guard` after pattern
- Proper indentation and comma separation
- STC wrappers
- Unit tests

---

## Scope Excluded

- Pattern destructuring components (patterns remain as raw strings/Children)
- Exhaustiveness checking

---

## Precedent

TypeScript package has `SwitchStatement` + `CaseClause` (at `packages/typescript/src/components/SwitchStatement.tsx`). The `CaseClause` supports expression matching, default cases, break statements, and optional block wrapping — similar concerns to match arms.

---

## Acceptance Criteria

- [ ] `<MatchExpression expression={...}>` renders `match expr { ... }`
- [ ] `<MatchArm pattern="X">expr</MatchArm>` renders `X => expr,`
- [ ] Multi-statement arm bodies render with block syntax `X => { ... }`
- [ ] `guard` prop renders `if guard` after pattern
- [ ] Arms properly separated and indented
- [ ] STC wrappers exported

---

## Evidence

2 match expressions in `samples/rust-example/` — `error-module.tsx` (Display impl with 4 arms) and `store-module.tsx` (get method with nested match). Match is ubiquitous in idiomatic Rust code.
