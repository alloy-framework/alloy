# Formatting

Alloy uses intrinsic formatting elements such as `<group>`, `<indent>`, and line breaks to describe layout in the AlloyNode tree. The direct printer walks that tree and applies Prettier-compatible layout semantics without exposing a separate document IR.

Format options ([`printWidth`, `tabWidth`, `useTabs`](api/types/CommonFormatOptions.md)) are set on [`<Output>`](api/components/Output.md) and overridable per [`<SourceFile>`](api/components/SourceFile.md).

## Intrinsic Formatting Elements

### Line Breaks

| Element   | Alias             | Behavior                                                                                         |
| --------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| `<hbr />` | `<hardline />`    | Always breaks. Forces all parent groups to break.                                                |
| `<sbr />` | `<softline />`    | Breaks if group is broken, otherwise nothing.                                                    |
| `<br />`  | `<line />`        | Breaks if group is broken, otherwise a space.                                                    |
| `<lbr />` | `<literalline />` | Always breaks, resets indentation, preserves trailing whitespace. Forces parent groups to break. |

### Groups

`<group>` tries to fit children on one line. If it exceeds `printWidth`, all line breaks in the group break. Groups nest — outermost breaks first.

```tsx
<group>
  {"foo,"}
  <br />
  {"bar,"}
  <br />
  {"baz"}
</group>
// Fits: "foo, bar, baz"
// Doesn't fit: each on its own line
```

A group breaks if it contains `<hbr />`, `<lbr />`, `<breakParent />`, or has `shouldBreak`.

- **`id`** — names the group for `<ifBreak>` / `<indentIfBreak>`.
- **`<breakParent />`** — forces all parent groups to break.

### Indentation

- **`<indent>`** — increases indent level. Takes effect at the next line break within.
- **`<dedent>`** — decreases indent level (each `<align>` counts as one level).
- **`<dedentToRoot />`** — resets to the level marked by `<markAsRoot>`.
- **`<markAsRoot>`** — marks current indentation as root for `<dedentToRoot>` and `<lbr />`.
- **`<align width={n}>`** — increases indentation by a fixed number of spaces. Trailing alignments remain spaces when `useTabs` is enabled.

### Conditional Formatting

- **`<ifBreak>`** — if `groupId` is omitted, responds to the nearest enclosing group; if specified, targets a named group. `flatContents` for the non-broken case.
- **`<indentIfBreak groupId="id">`** — indents if the group is broken. `negate` reverses. `groupId` required.

### Fill

`<fill>` wraps like text — breaks before items that exceed `printWidth`, not all-or-nothing. Children must alternate content and line breaks.

### Line Suffixes

- **`<lineSuffix>`** — buffers content, flushes at end of line. For trailing comments.
- **`<lineSuffixBoundary />`** — flushes the `<lineSuffix>` buffer explicitly.

## The [`code`](api/functions/code.md) Template Tag

Preserves line structure and auto-detects indentation:

```ts
const result = code`
  function foo() {
    return ${expr};
  }
`;
```

- Line breaks → `<hbr />`. Indentation increases → `<indent>`. Expressions interpolated as [`Children`](api/types/Children.md). Leading/trailing blank lines trimmed.

## The [`text`](api/functions/text.md) Template Tag

Collapses whitespace like JSX — newlines become spaces, leading/trailing whitespace trimmed.

## Layout Components

- [**`<Indent>`**](api/components/Indent.md) — wraps `<indent>` with a line break before content (default: hardline) and optional `trailingBreak`. Configure with `line`, `softline`, `hardline`, or `nobreak`.
- [**`<Block>`**](api/components/Block.md) — indented block with opener/closer (default `{}`). Omits block if empty. Supports inline mode.
- [**`<List>`**](api/components/List.md) — children with joiners. Supports `comma`, `semicolon`, `hardline`, `softline`, `space`, custom `joiner`/`ender`.
- [**`<StatementList>`**](api/components/StatementList.md) — statements with line breaks between them.
- [**`<Prose>`**](api/components/Prose.md) — fill-mode line breaking for text.

## Content Slots

[`createContentSlot()`](api/functions/createContentSlot.md) creates a reactive slot tracking whether it has content. Enables components like [`<Block>`](api/components/Block.md) and [`<List>`](api/components/List.md) to handle semantically empty children — lists skip separators, blocks collapse.

```tsx
const MySlot = createContentSlot();
<MySlot>{/* children */}</MySlot>

MySlot.isEmpty;       // boolean getter
MySlot.hasContent;    // boolean getter
<MySlot.WhenEmpty>fallback</MySlot.WhenEmpty>
<MySlot.WhenHasContent>has stuff</MySlot.WhenHasContent>
```
