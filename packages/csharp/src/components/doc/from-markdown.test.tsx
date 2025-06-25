import { d } from "@alloy-js/core/testing";
import { describe, expect, it } from "vitest";
import { DocFromMarkdown } from "./from-markdown.jsx";

it("convert code block to <code>", () => {
  expect(
    <DocFromMarkdown
      markdown={d`
        Some markdown with code
        \`\`\`csharp
        var foo = "bar";
        \`\`\`
    `}
    />,
  ).toRenderTo(`
    Some markdown with code
    <code>
    var foo = "bar";
    </code>
  `);
});

it("convert inline code block to <c>", () => {
  expect(
    <DocFromMarkdown
      markdown={d`
        Some markdown with \`inline\` code
    `}
    />,
  ).toRenderTo(`
    Some markdown with <c>inline</c> code
  `);
});

it("convert link to <see>", () => {
  expect(
    <DocFromMarkdown
      markdown={d`
        Some markdown with [link](https://example.com)
    `}
    />,
  ).toRenderTo(`
    Some markdown with <see href="https://example.com">link</see>
  `);
});

it("convert bullet list to <list>", () => {
  expect(
    <DocFromMarkdown
      markdown={d`
        - Item 1
        - Item 2
        - Item 3
    `}
    />,
  ).toRenderTo(`
    <list type="bullet">
      <item><description>Item 1</description></item>
      <item><description>Item 2</description></item>
      <item><description>Item 3</description></item>
    </list>
  `);
});

it("convert numbered list to <list>", () => {
  expect(
    <DocFromMarkdown
      markdown={d`
        1. Item 1
        2. Item 2
        3. Item 3
    `}
    />,
  ).toRenderTo(`
    <list type="number">
      <item><description>Item 1</description></item>
      <item><description>Item 2</description></item>
      <item><description>Item 3</description></item>
    </list>
  `);
});

describe("strip unsupported elements", () => {
  it("bold", () => {
    expect(
      <DocFromMarkdown
        markdown={d`
        Some markdown with **bold** text
    `}
      />,
    ).toRenderTo(`Some markdown with bold text`);
  });

  it("italic", () => {
    expect(
      <DocFromMarkdown
        markdown={d`
        Some markdown with *italic* text
    `}
      />,
    ).toRenderTo(`Some markdown with italic text`);
  });
});
