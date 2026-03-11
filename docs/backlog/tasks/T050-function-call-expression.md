# T050 — FunctionCallExpression Component

| Field | Value |
|-------|-------|
| **ID** | T050 |
| **Epic** | [E006](../epics/E006-external-deps-build-polish.md) |
| **Type** | feature |
| **Status** | open |
| **Priority** | P2 — should-have |
| **Owner Role** | AI coding agent |
| **AI Executable** | Yes |
| **Human Review Required** | No |
| **Dependencies** | T009 (SourceFile / CrateDirectory) |
| **Blocks** | T053 (Update rust-example sample) |

---

## Description

Function and method invocations appear 4 times in the sample as raw code. A component makes them composable, especially when combined with `Reference` (T039) for auto-imported function targets.

---

## Goal

Provide a `FunctionCallExpression` component for function and method invocations.

---

## Proposed API

```tsx
// No-arg call:
<FunctionCallExpression target="self.data.len" />
// Renders: self.data.len()

// With arguments:
<FunctionCallExpression target="self.data.insert" args={["key", "entry"]} />
// Renders: self.data.insert(key, entry)

// With complex args:
<FunctionCallExpression target="HashMap::new" />
// Renders: HashMap::new()

// Turbofish:
<FunctionCallExpression target="collect" typeArgs={["Vec<_>"]} />
// Renders: collect::<Vec<_>>()
```

### Props

```typescript
interface FunctionCallExpressionProps {
  target: Children;          // Function/method path
  args?: Children[];         // Arguments
  typeArgs?: Children[];     // Optional turbofish type arguments
}
```

---

## Scope Included

- `packages/rust/src/components/function-call-expression.tsx`
- Arguments separated by commas with proper wrapping
- Optional turbofish syntax (`::<Type>`)
- STC wrapper
- Unit tests

---

## Scope Excluded

- Method chaining (see MemberExpression/AccessExpression — future task)
- Async `.await` calls

---

## Precedent

TypeScript: `FunctionCallExpression` at `packages/typescript/src/components/FunctionCallExpression.tsx` — takes `target` and `args` with auto-wrapping for long argument lists.

---

## Acceptance Criteria

- [ ] No-arg calls render `target()`
- [ ] Args render `target(arg1, arg2)`
- [ ] Turbofish renders `target::<Type>(args)`
- [ ] Long arg lists wrap with proper indentation
- [ ] STC wrapper exported

---

## Evidence

4 method call instances in `samples/rust-example/store-module.tsx` — `self.data.len()`, `self.data.is_empty()`, `self.data.insert(key, entry)`, `self.data.remove(key)`.
