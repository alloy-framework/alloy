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

Without `id`, headings use GitHub-style automatic anchors: visible inline text
is lowercased, punctuation is removed, and spaces become hyphens. Inline
Markdown formatting, code delimiters, link destinations, and HTML tags do not
become part of the slug. For example, ``Use `Foo.bar`!`` becomes `use-foobar`.
HTML entities in prose are decoded, but entities inside inline code remain
literal.

Repeated slugs receive `-1`, `-2`, and so on, skipping IDs already generated
by the slugger. Every `Heading` counts, including headings without refkeys and
those emitted by `Section`. Each file has an independent slug sequence.
An empty automatic slug uses an explicit `section` anchor instead.

Use `id` for a stable URL independent of display text. It is emitted as an
HTML anchor before the heading, rather than renderer-specific `{#id}` syntax.
IDs must be nonempty and cannot contain whitespace, quotes, `<`, `>`, or `&`.
Duplicate IDs, including collisions with automatic heading anchors, throw an
error rather than silently renaming an explicit ID. An explicit-ID heading
still consumes its automatic slug, since Markdown renderers also generate an
anchor for its heading text.

Heading IDs and default link text are captured when the heading first renders.
Supply an explicit `id` when display text may change, and `Link`'s `title` when
a different label is needed. The default label is plain visible text, escaped
for Markdown. Direct `Link` calls with `href` and `title` retain their existing
behavior.

Automatic anchors assume GitHub-style heading IDs. For other renderers, use
explicit IDs. Only headings emitted through `Heading` (including `Section`
headings) participate in collision tracking; raw Markdown headings and raw
HTML anchors are not tracked.
