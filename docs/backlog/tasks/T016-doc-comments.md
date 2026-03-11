# T016: DocComment and ModuleDocComment

| Field       | Value                                    |
| ----------- | ---------------------------------------- |
| **Task ID** | T016                                     |
| **Epic**    | E003 — Core Declaration Components       |
| **Deps**    | T001 (Package scaffold)                  |
| **Blocks**  | —                                        |
| **Status**  | Pending                                  |

## Description

Create `DocComment` and `ModuleDocComment` components for rendering Rust documentation comments. `DocComment` renders outer doc comments (`/// ...`) used on items. `ModuleDocComment` renders inner doc comments (`//! ...`) used at the top of modules/crates.

## Goal

Enable Rust declarations to include doc comments, and modules/crates to include module-level documentation.

## Scope

- `src/components/doc-comment.tsx` — `DocComment` and `ModuleDocComment` components.
- Tests in `test/doc-comment.test.tsx`.

### Props

```ts
interface DocCommentProps {
  children?: Children; // string content
}

interface ModuleDocCommentProps {
  children?: Children; // string content
}
```

## Out of Scope

- Markdown rendering within doc comments.
- Doc comment links (`[`Type`]`).
- `#[doc = "..."]` attribute form.
- Doc tests.

## Context Files

| File                                                    | Why                                    |
| ------------------------------------------------------- | -------------------------------------- |
| `packages/java/src/components/JavadocComment.tsx`        | Java doc comment pattern                |
| `packages/csharp/src/components/XmlDocComment.tsx`       | C# doc comment pattern                  |

## Implementation Guidance

### DocComment

1. Accept string children.
2. Split by newline.
3. Prefix each line with `/// `.
4. Render all lines, each on its own line.
5. Empty/undefined children → render nothing.

```tsx
function DocComment(props: DocCommentProps) {
  if (!props.children) return <></>;
  // Split children text into lines
  // Render each line as: /// {line}
  // Each line on its own output line
}
```

### ModuleDocComment

1. Same as `DocComment` but uses `//! ` prefix instead of `/// `.
2. Typically placed at the top of a `SourceFile`.

```tsx
function ModuleDocComment(props: ModuleDocCommentProps) {
  if (!props.children) return <></>;
  // Split children text into lines
  // Render each line as: //! {line}
}
```

### Usage Pattern

Declaration components accept a `doc` string prop and render `DocComment` internally:

```tsx
// Inside StructDeclaration:
{props.doc && <DocComment>{props.doc}</DocComment>}
```

### Alloy Conventions

- Access props as `props.children` — do NOT destructure.
- Use `<>...</>` for fragments.
- File names: kebab-case. Components: PascalCase.

## Acceptance Criteria

- [ ] `DocComment` renders single line: `/// Hello`.
- [ ] `DocComment` renders multi-line: `/// Line 1\n/// Line 2`.
- [ ] `DocComment` renders nothing for empty/undefined children.
- [ ] `ModuleDocComment` renders: `//! Module docs`.
- [ ] `ModuleDocComment` renders multi-line: `//! Line 1\n//! Line 2`.
- [ ] `ModuleDocComment` renders nothing for empty/undefined children.

## Definition of Done

- All acceptance criteria met.
- `pnpm build` succeeds for `@alloy-js/rust`.
- `test/doc-comment.test.tsx` passes.
- No regressions in existing tests.

## Validation

```bash
cd packages/rust
pnpm build && pnpm vitest run doc-comment
```
