# @alloy-js/markdown

## Inline code

`InlineCode` renders children as literal code-span text, choosing backtick
delimiters longer than any run in the rendered content and adding padding when
required to preserve leading/trailing backticks and spaces.

```tsx
import { Heading, InlineCode } from "@alloy-js/markdown";

<Heading level={2}>
  Using <InlineCode>{"a`b"}</InlineCode>
</Heading>;
// ## Using ``a`b``
```

Children can include Alloy components, reactive values, and formatting elements.
Their rendered text becomes the code span's content, not Markdown markup.
`InlineCode` itself can be composed inside headings, link-label fragments, and
table cells:

```tsx
<>
  [<InlineCode>{"a`b"}</InlineCode>](https://example.com)
</>
```

Each CRLF, CR, or LF in the rendered content becomes one space, matching
CommonMark code-span normalization. Other whitespace is preserved, including
all-space content. Empty content renders as `<code></code>` because Markdown has
no empty code-span syntax; this requires a renderer that permits inline HTML.

Pipes and backslashes are left literal: escaping them here would change the
visible text outside a table. A GFM table renderer must escape pipes in the
complete rendered cell, including those inside code spans.
