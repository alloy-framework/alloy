# T018: Value Component

| Field       | Value                              |
| ----------- | ---------------------------------- |
| **Task ID** | T018                               |
| **Epic**    | E003 — Core Declaration Components |
| **Deps**    | T001 (Package scaffold)            |
| **Blocks**  | —                                  |
| **Status**  | Done                               |

## Description

Create a `Value` component that converts JavaScript/TypeScript values into Rust literal syntax. This is used when generating const values, default parameters, or inline expressions.

## Goal

Enable automatic conversion of JS values to Rust literal representations for use in code generation.

## Scope

- `src/components/value.tsx` — `Value` component.
- Tests in `test/value.test.tsx`.

### Props

```ts
interface ValueProps {
  value: unknown;
}
```

### Conversion Table

| JS Type          | Rust Output      | Example                 |
| ---------------- | ---------------- | ----------------------- |
| `string`         | `"str"`          | `"hello"` → `"hello"`   |
| `number` (int)   | `42`             | `42` → `42`             |
| `number` (float) | `42.0`           | `42.5` → `42.5`         |
| `boolean`        | `true` / `false` | `true` → `true`         |
| `null`           | `None`           | `null` → `None`         |
| `undefined`      | `None`           | `undefined` → `None`    |
| `Array`          | `vec![a, b, c]`  | `[1, 2]` → `vec![1, 2]` |

## Out of Scope

- Object/Map → Rust HashMap literal (complex; users do this manually).
- Tuple literals.
- Raw string literals (`r#"..."#`).
- Byte strings (`b"..."`).
- Character literals (`'c'`).
- Nested struct initialization.

## Context Files

| File                                           | Why                                 |
| ---------------------------------------------- | ----------------------------------- |
| `packages/java/src/components/Value.tsx`       | Java value conversion pattern       |
| `packages/python/src/components/Atom.tsx`      | Python literal conversion pattern   |
| `packages/typescript/src/components/Value.tsx` | TypeScript value conversion pattern |

## Implementation Guidance

### Value

1. Accept `props.value` of type `unknown`.
2. Switch on the runtime type:

```tsx
function Value(props: ValueProps) {
  const v = props.value;

  if (v === null || v === undefined) {
    return <>None</>;
  }

  if (typeof v === "boolean") {
    return <>{v ? "true" : "false"}</>;
  }

  if (typeof v === "number") {
    // Distinguish integer from float
    if (Number.isInteger(v)) {
      return <>{String(v)}</>;
    }
    return <>{String(v)}</>;
  }

  if (typeof v === "string") {
    return <>"{v}"</>;
  }

  if (Array.isArray(v)) {
    // Recursively render each element as a Value
    // Render: vec![elem1, elem2, elem3]
    return <>vec![{/* comma-separated Value elements */}]</>;
  }

  // Fallback: toString
  return <>{String(v)}</>;
}
```

3. For arrays, recursively render each element using `<Value value={element} />`.
4. String escaping: escape `\`, `"`, `\n`, `\t` in string values.

### Integer vs Float Detection

- Use `Number.isInteger(v)` to distinguish.
- Integer `42` → `42`.
- Float `42.0` in JS is `42` (integer) — this is a known edge case. Consider providing a float hint or rendering `42.0` when the number has no fractional part but the user wants a float. For now, rely on `Number.isInteger`.

### Alloy Conventions

- Access props as `props.value` — do NOT destructure.
- Use `<>...</>` for fragments.
- File names: kebab-case. Components: PascalCase.

## Acceptance Criteria

- [x] String renders: `"hello"`.
- [x] Integer renders: `42`.
- [x] Float renders: `3.14`.
- [x] Boolean true renders: `true`.
- [x] Boolean false renders: `false`.
- [x] Null renders: `None`.
- [x] Undefined renders: `None`.
- [x] Array renders: `vec![1, 2, 3]`.
- [x] Nested array renders: `vec![vec![1, 2], vec![3, 4]]`.
- [x] Empty array renders: `vec![]`.
- [x] String with special characters is properly escaped.

## Definition of Done

- All acceptance criteria met.
- `pnpm build` succeeds for `@alloy-js/rust`.
- `test/value.test.tsx` passes with all listed test cases.
- No regressions in existing tests.

## Validation

```bash
cd packages/rust
pnpm build && pnpm test
```
