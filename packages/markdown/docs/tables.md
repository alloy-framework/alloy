# Markdown tables

`Table`, `TableRow`, and `TableCell` generate GitHub-flavored Markdown tables.
Define the columns once, then compose rows and cells with ordinary Alloy JSX:

```tsx
import { For } from "@alloy-js/core";
import { Table, TableCell, TableRow } from "@alloy-js/markdown";

<Table columns={[{ header: "Type" }, { header: "Description", align: "left" }]}>
  <For each={properties}>
    {(property) => (
      <TableRow>
        <TableCell text={property.type} />
        <TableCell>{property.description}</TableCell>
      </TableRow>
    )}
  </For>
</Table>;
```

Provide at least one column and exactly one cell per column in each row. Empty
cells are supported. Column alignment can be `"left"`, `"center"`, or `"right"`;
omit it for the renderer's default alignment.

## Text and inline Markdown

Use `text` for literal values, including text containing Markdown punctuation:

```tsx
<TableCell text={"A | B <T> & `literal backticks`"} />
```

Use children for authored inline Markdown, including JSX components that render
inline Markdown. Links, emphasis, strikethrough, code spans, and reactive content
are supported:

```tsx
<TableCell>
  **Accepted:** `A | B` and [more information](https://example.com)
</TableCell>
```

Cells serialize inline Markdown to inline HTML with entity-encoded punctuation.
This keeps literal pipes from creating columns and preserves angle brackets,
ampersands, embedded backticks, and backslashes inside code. Code spans use inline
`<code>` rather than backtick delimiters in the generated Markdown. Raw HTML
children are displayed literally rather than interpreted as HTML. Use Markdown
links instead of HTML anchors.

Column headings use the same inline-Markdown rules as cell children.

## Multiline and block content

Physical newlines in text become `<br>` inside a cell; blank lines become repeated
breaks. Newlines inside code spans follow Markdown's code-span rules and become
spaces. Formatting-induced line breaks in JSX children also become `<br>`, so
use unwrapped inline content when wrapping is not desired.

GFM tables cannot contain block-level Markdown. Paragraphs, lists, headings,
fenced code blocks, nested tables, and other block constructs are not supported
as cell structure. Their rendered text is processed as inline Markdown, with
newlines converted to breaks; they do not retain block semantics. Render complex
block content outside the table and link to it from a cell instead.

The generated Markdown requires a renderer that supports GFM tables and inline
HTML. Disabling or stripping inline HTML will lose formatting and line breaks.
