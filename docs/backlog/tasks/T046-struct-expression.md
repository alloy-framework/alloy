# T046 — StructExpression + FieldInit Components

| Field | Value |
|-------|-------|
| **ID** | T046 |
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

The most common raw `code` template pattern in the Rust sample (8 of 24 instances) is struct/Self literal expressions with field initialization and optional struct update syntax:

```rust
Self {
    max_capacity: capacity,
    ..self
}
```

Currently this must be written as raw code:
```tsx
{code`
  Self {
      max_capacity: capacity,
      ..self
  }
`}
```

A dedicated component would make this composable and type-safe.

---

## Goal

Provide `StructExpression` and `FieldInit` components for constructing struct literal expressions in Rust.

---

## Proposed API

```tsx
<StructExpression type="Self" spread="self">
  <FieldInit name="max_capacity">{code`capacity`}</FieldInit>
</StructExpression>
// Renders: Self { max_capacity: capacity, ..self }

// Without spread:
<StructExpression type="Entry">
  <FieldInit name="value">{code`value`}</FieldInit>
  <FieldInit name="created_at">{code`Instant::now()`}</FieldInit>
  <FieldInit name="status">{code`EntryStatus::Active`}</FieldInit>
</StructExpression>
// Renders: Entry { value, created_at: Instant::now(), status: EntryStatus::Active }

// Shorthand (field name matches variable):
<StructExpression type="Self">
  <FieldInit name="max_capacity" />
  <FieldInit name="default_ttl">{code`None`}</FieldInit>
</StructExpression>
// Renders: Self { max_capacity, default_ttl: None }
```

### Props

```typescript
interface StructExpressionProps {
  type: Children;        // Struct name or Self
  spread?: Children;     // Optional ..spread source (e.g., "self")
  children?: Children;   // FieldInit children
}

interface FieldInitProps {
  name: string;          // Field name
  children?: Children;   // Value expression (omit for shorthand)
}
```

---

## Scope Included

- `packages/rust/src/components/struct-expression.tsx` — StructExpression and FieldInit components
- Field initializers separated by commas with line breaks
- Struct update syntax (`..spread`) rendered after fields
- Shorthand field initialization (name only, no value)
- STC wrappers for both components
- Unit tests

---

## Scope Excluded

- Tuple struct construction (e.g., `Point(1, 2)`) — separate task if needed
- Symbol integration / Reference resolution inside expressions (depends on T039)

---

## Precedent

TypeScript package has `ObjectExpression` + `ObjectProperty` (at `packages/typescript/src/components/ObjectExpression.tsx`) which serves the same purpose for JS object literals with property shorthand, spread, and computed keys.

---

## Acceptance Criteria

- [ ] `<StructExpression type="Self">` renders `Self { ... }`
- [ ] `<FieldInit name="x">{value}</FieldInit>` renders `x: value`
- [ ] `<FieldInit name="x" />` renders shorthand `x`
- [ ] `spread` prop renders `..source` after all fields
- [ ] Fields separated by commas with proper formatting
- [ ] STC wrappers exported

---

## Evidence

8 of 24 raw code instances in `samples/rust-example/` are struct/Self literal expressions. Found in `store-module.tsx` (5 instances) and `config-file.tsx` (6 instances including the `new()` constructor and all builder methods).
