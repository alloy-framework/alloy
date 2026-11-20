# Markdown

`@alloy-js/markdown` emits Markdown using Alloy components. Wrap each document in
the package's `SourceFile`, inside a core `Output`.

## Heading references

Give a `Heading` a `refkey` to make it a link target. A refkey used as content
becomes a Markdown link; use `Link` directly to override the link text.
References can appear before their targets, including in other files.

```tsx
import { Output, refkey } from "@alloy-js/core";
import { Heading, Link, SourceFile } from "@alloy-js/markdown";

const api = refkey();

<Output>
  <SourceFile path="index.md">
    <Link refkey={api} title="API reference" />
  </SourceFile>
  <SourceFile path="reference/api.md">
    <Heading refkey={api} id="api">
      Public API
    </Heading>
    {api}
  </SourceFile>
</Output>;
```

The first file contains `[API reference](reference/api.md#api)`. The second
contains:

```md
<a id="api"></a>

# Public API

[Public API](#api)
```

Same-file references use fragments only. Cross-file references use paths
relative to the referencing file's directory. File extensions are preserved;
path segments and fragments are URL-encoded. Missing refkeys produce Alloy's
standard unresolved-symbol placeholder and warning.

## Anchors and collisions

Without `id`, a heading's anchor is the GitHub-style slug of its string
children: the trimmed text is lowercased, punctuation is removed, and spaces
become hyphens. For example, `Model Foo.Bar` becomes `model-foobar`. Strings
are treated as plain text. If they contain Markdown or HTML syntax, the
rendered heading text can differ from the slug input, so use `id`.

Headings with JSX children, such as `InlineCode` or nested components, have no
automatic anchor because Alloy does not inspect rendered JSX. To reference
one, give it an `id`, and give links to it a `title`. Otherwise rendering
throws an error. Such a heading still consumes a renderer-generated slug that
Alloy cannot determine. Subsequent referenced headings in the file therefore
also require explicit IDs, even when their children are strings.

Repeated slugs receive `-1`, `-2`, and so on, skipping IDs already generated
by the slugger. Every `Heading` with string children counts, including
headings without refkeys and those emitted by `Section`. Each file has an
independent slug sequence. Headings are numbered in the order they are
rendered, so a heading inserted later before existing headings (for example
by `Show`) is numbered after them. If a referenced heading's slug is empty, an
explicit `section` anchor is emitted instead, suffixed if necessary to avoid
other IDs in the file.

Use `id` for a stable URL independent of display text. It is emitted as an
HTML anchor before the heading, rather than renderer-specific `{#id}` syntax.
IDs must be nonempty and cannot contain whitespace, quotes, `<`, `>`, or `&`.
Duplicate IDs, including collisions with automatic heading anchors, throw an
error rather than silently renaming an explicit ID. An explicit-ID heading
still consumes its automatic slug, since Markdown renderers also generate an
anchor for its heading text.

Anchors and default link text update with reactive string children, such as
`<Heading refkey={key}>{name.value}</Heading>`. Supply an explicit `id` when
a URL must remain stable even if display text or surrounding headings change.
Explicit IDs also follow reactive `id` props and are validated on each change.
Links follow reactive `refkey` props, including unresolved-reference diagnostics.

The default link label is the heading text, escaped for Markdown. Inside a
`TableCell`, pipes in that default label are also escaped. Explicit `title`
strings are emitted unchanged and require caller-owned escaping. Direct `Link`
calls with `href` and `title` retain their existing behavior.

Automatic anchors assume GitHub-style heading IDs. For other renderers, use
explicit IDs. Headings with JSX children, raw Markdown headings and raw HTML
anchors do not participate in collision tracking.
