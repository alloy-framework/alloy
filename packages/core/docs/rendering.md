# Rendering

Alloy renders a component tree into output files. The pipeline has three layers.

## Pipeline

```
Component Tree  →  Rendered Text Tree  →  Output Files
   (JSX)           (strings + hooks)       (formatted text)
```

1. [**`render(children, options?)`**](api/functions/render.md) — entry point. Returns an [`OutputDirectory`](api/types/OutputDirectory.md).
2. [**`renderTree(children)`**](api/functions/renderTree.md) — evaluates components into a [`RenderedTextTree`](api/types/RenderedTextTree.md). Components run inside reactive effects and re-execute when dependencies change.
3. **`sourceFilesForTree(tree)`** — walks the rendered tree, calling [`printTree()`](api/functions/printTree.md) per file to produce a formatted string for each source file.

`renderTree()`, `printTree()`, and `sourceFilesForTree()` are available individually for advanced use cases.

## Key Components

- [**`<Output>`**](api/components/Output.md) — root. Sets up binder, format options, name policy, base path.
- [**`<SourceDirectory>`**](api/components/SourceDirectory.md) — directory in the output tree.
- [**`<SourceFile>`**](api/components/SourceFile.md) — file with `path`, `filetype`, optional print options.

```tsx
render(
  <Output>
    <SourceDirectory path="src">
      <SourceFile path="index.ts" filetype="typescript">
        console.log("hello");
      </SourceFile>
    </SourceDirectory>
  </Output>,
);
```

## File Operations

- [**`<AppendFile>`**](api/components/AppendFile.md) — append to an existing output file.
- [**`<CopyFile>`**](api/components/CopyFile.md) — copy from the host filesystem into output.
- [**`<UpdateFile>`**](api/components/UpdateFile.md) — read and transform an existing output file.
- [**`<TemplateFile>`**](api/components/TemplateFile.md) — read a host file, transform, write to output.
