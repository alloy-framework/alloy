# T017: TypeParameters and WhereClause

| Field       | Value                                    |
| ----------- | ---------------------------------------- |
| **Task ID** | T017                                     |
| **Epic**    | E003 — Core Declaration Components       |
| **Deps**    | T001 (Package scaffold)                  |
| **Blocks**  | —                                        |
| **Status**  | done                                     |

## Description

Create `TypeParameters` and `WhereClause` components for rendering Rust generic type parameter lists and where clauses. These are used by struct, enum, function, type alias, trait, and impl block components.

## Goal

Enable declaration components to render generic type parameters with trait bounds and where clauses.

## Scope

- `src/components/type-parameters.tsx` — `TypeParameters` and `WhereClause` components.
- Tests in `test/type-parameters.test.tsx`.

### Props and Types

```ts
interface TypeParameterProp {
  name: string;
  constraint?: Children; // trait bounds, e.g., "Display + Clone"
}

interface TypeParametersProps {
  params: TypeParameterProp[];
}

interface WhereClauseProps {
  children?: Children; // free-form where clause content
}
```

## Out of Scope

- Lifetime parameters (`'a`).
- Const generics (`const N: usize`).
- Default type parameters (`T = String`).
- Associated types in bounds.

## Context Files

| File                                                           | Why                                     |
| -------------------------------------------------------------- | --------------------------------------- |
| `packages/typescript/src/components/TypeParameterDeclaration.tsx`| TypeScript generic parameter pattern    |
| `packages/csharp/src/components/GenericParameters.tsx`          | C# generic parameter pattern             |
| `packages/go/src/components/TypeParameters.tsx`                 | Go type parameter pattern                |

## Implementation Guidance

### TypeParameters

1. Accept array of `TypeParameterProp`.
2. If empty array or undefined, render nothing.
3. Render `<` + comma-separated params + `>`.
4. Each param: `name` if no constraint, `name: constraint` if constraint present.

```tsx
function TypeParameters(props: TypeParametersProps) {
  if (!props.params || props.params.length === 0) return <></>;
  // Render: <T, U: Display, V: Clone + Debug>
}
```

Examples:
- `[{name: "T"}]` → `<T>`
- `[{name: "T", constraint: "Display"}]` → `<T: Display>`
- `[{name: "T"}, {name: "U", constraint: "Display + Clone"}]` → `<T, U: Display + Clone>`

### WhereClause

1. Accept free-form children content.
2. If no children, render nothing.
3. Render `where ` followed by children on the next line (or same line for short clauses).

```tsx
function WhereClause(props: WhereClauseProps) {
  if (!props.children) return <></>;
  // Render: where {children}
  // e.g.: where T: Display + Clone, U: Debug
}
```

### Usage Pattern

Used by declaration components:

```tsx
<StructDeclaration name="Foo" typeParameters={[{name: "T", constraint: "Display"}]}
  whereClause={<>T: Clone</>}>
  ...
</StructDeclaration>
// Renders:
// struct Foo<T: Display> where T: Clone {
//   ...
// }
```

### Alloy Conventions

- Access props as `props.params`, `props.children` — do NOT destructure.
- Use `<>...</>` for fragments.
- File names: kebab-case. Components: PascalCase.

## Acceptance Criteria

- [x] Single type parameter renders: `<T>`.
- [x] Multiple type parameters render: `<T, U>`.
- [x] Type parameter with constraint renders: `<T: Display>`.
- [x] Multiple params with mixed bounds render: `<T, U: Display + Clone>`.
- [x] Empty/undefined params render nothing (no `<>`).
- [x] Where clause renders: `where T: Display + Clone`.
- [x] Where clause with multiple constraints renders correctly.
- [x] Empty/undefined where clause renders nothing.

## Definition of Done

- All acceptance criteria met.
- `pnpm build` succeeds for `@alloy-js/rust`.
- `test/type-parameters.test.tsx` passes.
- No regressions in existing tests.

## Validation

```bash
cd packages/rust
pnpm build && pnpm vitest run type-parameters
```

## Implementation Notes

- TSX parser gotcha: when test literals include `<...>` (for example `impl<T> Thing`), wrap the text in a JS expression (`{"impl<T> Thing"}`) to avoid JSX parse errors.
