# T015: Attribute and DeriveAttribute

| Field       | Value                              |
| ----------- | ---------------------------------- |
| **Task ID** | T015                               |
| **Epic**    | E003 — Core Declaration Components |
| **Deps**    | T010 (Declaration/Reference)       |
| **Blocks**  | —                                  |
| **Status**  | Done                               |

## Description

Create `Attribute` and `DeriveAttribute` components for rendering Rust attributes. Attributes are metadata annotations that appear on the line BEFORE the item they annotate (e.g., `#[derive(Debug)]`, `#[serde(rename_all = "camelCase")]`).

## Goal

Enable users to annotate Rust declarations with arbitrary attributes and derive macros.

## Scope

- `src/components/attribute.tsx` — `Attribute` and `DeriveAttribute` components.
- `test/attributes.test.tsx` — tests.

### Props

```ts
interface AttributeProps {
  name: string | Refkey;
  args?: Children;
}

interface DeriveAttributeProps {
  traits: (string | Refkey)[];
}
```

## Out of Scope

- Inner attributes (`#![...]`) — may be added later.
- Proc macro attributes.
- Attribute validation (users can pass any attribute name).

## Context Files

| File                                          | Why                                    |
| --------------------------------------------- | -------------------------------------- |
| `packages/csharp/src/components/attributes/`  | C# attribute pattern (similar concept) |
| `packages/java/src/components/Annotation.tsx` | Java annotation pattern                |

## Implementation Guidance

### Attribute

1. Render `#[name]` when no `args` provided.
2. Render `#[name(args)]` when `args` provided.
3. If `name` is a `Refkey`, resolve it to a symbol name (for custom derive traits).
4. Attributes render on their own line, BEFORE the declaration.

```tsx
function Attribute(props: AttributeProps) {
  // Resolve name if Refkey
  const name = /* resolve props.name */;
  if (props.args) {
    return <>#[{name}({props.args})]</>;
  }
  return <>#[{name}]</>;
}
```

### DeriveAttribute

1. Sugar for `#[derive(Trait1, Trait2, ...)]`.
2. Resolve each trait — if string, use as-is; if Refkey, resolve to name.
3. Join with `, `.

```tsx
function DeriveAttribute(props: DeriveAttributeProps) {
  // Resolve each trait in props.traits
  const resolved = /* map and resolve */;
  return <Attribute name="derive" args={resolved.join(", ")} />;
}
```

### Usage Pattern

Attributes are typically passed via the `attributes` or `derives` props on declaration components:

```tsx
<StructDeclaration name="Foo" derives={["Debug", "Clone"]}>
  ...
</StructDeclaration>
// Renders:
// #[derive(Debug, Clone)]
// struct Foo {
//   ...
// }
```

### Alloy Conventions

- Access props as `props.name`, `props.traits` — do NOT destructure.
- Use `<>...</>` for fragments.
- File names: kebab-case. Components: PascalCase.

## Acceptance Criteria

- [x] `Attribute` renders `#[test]` for simple attribute.
- [x] `Attribute` renders `#[cfg(test)]` with args.
- [x] `DeriveAttribute` renders `#[derive(Debug)]` for single trait.
- [x] `DeriveAttribute` renders `#[derive(Debug, Clone, Serialize)]` for multiple traits.
- [x] Attributes render on the line before the annotated item.
- [x] Refkey-based trait names resolve correctly.

## Definition of Done

- All acceptance criteria met.
- `pnpm build` succeeds for `@alloy-js/rust`.
- `test/attributes.test.tsx` passes.
- No regressions in existing tests.

## Validation

```bash
cd packages/rust
pnpm build && pnpm vitest run attributes
```
