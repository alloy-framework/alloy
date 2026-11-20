# @alloy-js/markdown

## Inline code

`InlineCode` renders direct string children as literal code-span text, choosing
backtick delimiters longer than any run in the string and adding padding when
required to preserve leading/trailing backticks and spaces.

```tsx
import { Heading, InlineCode } from "@alloy-js/markdown";

<Heading level={2}>
  Using <InlineCode>{"a`b"}</InlineCode>
</Heading>;
// ## Using ``a`b``
```

`InlineCode` can be composed inside headings, link-label fragments, and table
cells:

```tsx
<>
  [<InlineCode>{"a`b"}</InlineCode>](https://example.com)
</>
```

Each CRLF, CR, or LF in a direct string becomes one space, matching
CommonMark code-span normalization. Other whitespace is preserved, including
all-space content. Empty strings and omitted content render as `<code></code>`
because Markdown has no empty code-span syntax; this requires a renderer that
permits inline HTML.

JSX components, arrays, refs, accessors, and other non-string children are wrapped
in single backticks unchanged. They are not evaluated to select delimiters,
normalize line breaks, or add padding. Callers are responsible for producing
valid single-backtick code-span content in these cases. For automatic escaping,
pass the final text as a direct string child (including a reactive string
expression such as `<InlineCode>{name.value}</InlineCode>`), not a component
that returns it.

Inside a Markdown table cell (including header cells), pipes in direct string
children are escaped as `\|` so they cannot split the cell. Outside the table
context, pipes remain literal. Existing backslashes are preserved in both cases.
As with other escaping, opaque JSX content is not inspected: callers must escape
any pipes produced by those children themselves.
