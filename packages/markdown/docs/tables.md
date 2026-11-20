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
        <TableCell>{property.type}</TableCell>
        <TableCell>{property.description}</TableCell>
      </TableRow>
    )}
  </For>
</Table>;
```

Provide at least one column and exactly one cell per column in each row. Empty
cells are supported. Row widths are not validated. Column alignment can be
`"left"`, `"center"`, or `"right"`; omit it for the renderer's default alignment.
When using `For` to compose cells within a row, set `joiner=""`.

## Direct strings and JSX

Direct string children are escaped as literal text. Pipes do not create extra
columns, angle brackets and ampersands remain visible, and Markdown punctuation
such as backticks or emphasis markers is displayed as written:

```tsx
<TableCell>{"A | B <T> & `literal backticks`"}</TableCell>
```

Strings within arrays or fragments receive the same escaping. JSX components
are passed through unchanged: the table does not render them separately,
inspect their output, or escape the Markdown they produce.

For inline formatting, use a JSX component that emits the desired Markdown.
**The caller owns escaping within that component**, including table pipes
inside code spans. For example:

```tsx
import { code } from "@alloy-js/core";

function AcceptedTypes() {
  return code`**Accepted:** \`A \\| B\``;
}

<TableCell>
  <AcceptedTypes />
</TableCell>;
```

This deliberately pre-escapes the pipe for the GFM table parser. It is not a
general-purpose inline-code serializer. Unescaped pipes emitted by JSX can
create extra columns. Column headings follow the same string/JSX rules.

All JSX output, including output from `Link`, is passed through unchanged.
Pre-escape pipes in link titles and other component output before using them
in a table cell or heading.

## Multiline and block content

Physical newlines in direct strings become `<br>` inside a cell; blank lines
become repeated breaks. This requires a renderer that supports inline HTML.

JSX output is not normalized. Physical line breaks emitted by a component can
end the table row, including formatting-induced breaks from components such as
`Prose`. Callers must keep JSX content on one physical line and emit any desired
inline breaks themselves.

GFM tables cannot contain block-level Markdown. Paragraphs, lists, headings,
fenced code blocks, and nested tables are not supported cell structure. Render
complex block content outside the table and link to it from a cell instead.
