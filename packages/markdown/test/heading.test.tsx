import {
  getDiagnosticsForTree,
  Output,
  printTree,
  ref,
  refkey,
  renderTree,
  SourceDirectory,
  Show,
} from "@alloy-js/core";
import { expect, it } from "vitest";

import { TableContext } from "../src/context/table.js";
import {
  Heading,
  InlineCode,
  Link,
  Section,
  SourceFile,
} from "../src/index.js";
import { mdTest } from "./utils.jsx";

it("resolves forward and backward references in the same file", () => {
  const key = refkey();
  const template = mdTest([
    <Link refkey={key} />,
    <Heading refkey={key}>Hello world!</Heading>,
    key,
    <Link refkey={key} title="Back to top" />,
  ]);
  expect(template).toRenderTo(`
    [Hello world!](#hello-world)

    # Hello world!

    [Hello world!](#hello-world)

    [Back to top](#hello-world)
  `);
  expect(getDiagnosticsForTree(renderTree(template))).toEqual([]);
});

it("resolves relative links across directories and encodes paths and fragments", () => {
  const first = refkey();
  const second = refkey();
  const template = (
    <Output>
      <SourceDirectory path="guide">
        <SourceFile path="intro.md">
          <Heading refkey={first}>Introduction</Heading>
          {second}
        </SourceFile>
      </SourceDirectory>
      <SourceDirectory path="reference">
        <SourceFile path="API types).md">
          <Heading refkey={second}>Café</Heading>
          {first}
        </SourceFile>
      </SourceDirectory>
    </Output>
  );
  expect(template).toRenderTo({
    "guide/intro.md":
      "# Introduction\n\n[Café](../reference/API%20types%29.md#caf%C3%A9)",
    "reference/API types).md":
      "# Café\n\n[Introduction](../guide/intro.md#introduction)",
  });
  expect(getDiagnosticsForTree(renderTree(template))).toEqual([]);
});

it("counts unreferenced and nested section headings when deconflicting slugs", () => {
  const second = refkey();
  const third = refkey();
  expect(
    mdTest([
      <Section heading="Hello">Body</Section>,
      <Heading refkey={second}>Hello</Heading>,
      <Heading>Hello-1</Heading>,
      <Heading refkey={third}>Hello</Heading>,
      second,
      third,
    ]),
  ).toRenderTo(`
    # Hello

    Body

    # Hello

    # Hello-1

    # Hello

    [Hello](#hello-1)

    [Hello](#hello-2)
  `);
});

it("uses explicit IDs independently of heading text", () => {
  const key = refkey();
  expect(
    mdTest([
      <Link refkey={key} />,
      <Heading refkey={key} id="stable-api">
        New display name
      </Heading>,
    ]),
  ).toRenderTo(`
    [New display name](#stable-api)

    <a id="stable-api"></a>

    # New display name
  `);
});

it("keeps heading ID allocation local to each file", () => {
  const key = refkey();
  expect(
    <Output>
      <SourceFile path="one.md">
        <Heading>Same</Heading>
        {key}
      </SourceFile>
      <SourceFile path="two.md">
        <Heading refkey={key}>Same</Heading>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "one.md": "# Same\n\n[Same](two.md#same)",
    "two.md": "# Same",
  });
});

it("reports unresolved refkeys using core diagnostics", () => {
  const key = refkey("missing-heading");
  const tree = renderTree(mdTest([<Link refkey={key} />]));
  expect(tree).toRenderTo("<Unresolved Symbol: refkey[smissing-heading]>");
  expect(getDiagnosticsForTree(tree)).toMatchObject([
    {
      severity: "warning",
      message: "Unresolved refkey: refkey[smissing-heading]",
    },
  ]);
});

it.each(["", 'bad"id'])("rejects an invalid explicit heading ID %j", (id) => {
  expect(() => renderTree(mdTest([<Heading id={id}>Title</Heading>]))).toThrow(
    "Invalid Markdown heading ID",
  );
});

it("provides an explicit anchor when the automatic slug would be empty", () => {
  const key = refkey();
  expect(mdTest([<Heading refkey={key}>!!!</Heading>, key])).toRenderTo(`
    <a id="section"></a>

    # !!!

    [!!!](#section)
  `);
});

it("rejects colliding explicit and automatic IDs", () => {
  expect(() =>
    renderTree(
      mdTest([<Heading id="second">First</Heading>, <Heading>Second</Heading>]),
    ),
  ).toThrow("Duplicate Markdown heading ID");
});

it("preserves direct href links", () => {
  expect(
    mdTest([<Link href="https://example.com" title="Example" />]),
  ).toRenderTo("[Example](https://example.com)");
});

it("trims heading text and escapes the default link label", () => {
  const name = "";
  const key = refkey();
  const path = refkey();
  expect(
    mdTest([
      <Heading refkey={key}>Model {name}</Heading>,
      <Heading refkey={path}>Use ~/config_file</Heading>,
      key,
      path,
    ]),
  ).toRenderTo(`
    # Model

    # Use ~/config_file

    [Model](#model)

    [Use \\~/config\\_file](#use-config_file)
  `);
});

it("requires an explicit ID to reference a heading with JSX children", () => {
  const key = refkey();
  expect(() =>
    renderTree(
      mdTest([
        <Heading refkey={key}>
          Use <InlineCode>Foo</InlineCode>
        </Heading>,
      ]),
    ),
  ).toThrow("requires an explicit id");
});

it("renders JSX heading children once and links to their explicit ID", () => {
  const key = refkey();
  let calls = 0;
  function Name() {
    calls++;
    return <InlineCode>Foo</InlineCode>;
  }
  expect(
    mdTest([
      <Heading refkey={key} id="foo">
        Use <Name />
      </Heading>,
      <Link refkey={key} title="Foo" />,
    ]),
  ).toRenderTo(`
    <a id="foo"></a>

    # Use \`Foo\`

    [Foo](#foo)
  `);
  expect(calls).toBe(1);
  expect(() =>
    renderTree(
      mdTest([
        <Heading refkey={key} id="foo">
          <InlineCode>Foo</InlineCode>
        </Heading>,
        key,
      ]),
    ),
  ).toThrow("requires a title");
});

it("updates a reactive heading and its reference label and slug", () => {
  const name = ref("Alpha");
  const key = refkey();
  const tree = renderTree(
    mdTest([<Heading refkey={key}>{name.value}</Heading>, key]),
  );
  expect(printTree(tree)).toBe("# Alpha\n\n[Alpha](#alpha)");
  name.value = "Beta";
  expect(printTree(tree)).toBe("# Beta\n\n[Beta](#beta)");
});

it("reclaims duplicate suffixes when an earlier heading is removed", () => {
  const show = ref(true);
  const key = refkey();
  const tree = renderTree(
    mdTest([
      <Show when={show.value}>
        <Heading>Hello</Heading>
      </Show>,
      <Heading refkey={key}>Hello</Heading>,
      key,
    ]),
  );
  expect(printTree(tree)).toBe("# Hello\n\n# Hello\n\n[Hello](#hello-1)");
  show.value = false;
  expect(printTree(tree)).toBe("# Hello\n\n[Hello](#hello)");
});

it("forgets removed headings when the only heading remounts", () => {
  const show = ref(true);
  const key = refkey();
  const tree = renderTree(
    mdTest([
      <Show when={show.value}>
        <Heading refkey={key}>Hello</Heading>
        <hbr />
        <hbr />
        {key}
      </Show>,
    ]),
  );
  expect(printTree(tree)).toBe("# Hello\n\n[Hello](#hello)");
  show.value = false;
  expect(printTree(tree)).toBe("");
  show.value = true;
  expect(printTree(tree)).toBe("# Hello\n\n[Hello](#hello)");
});

it("allocates punctuation fallback IDs after automatic IDs", () => {
  const empty = refkey();
  const key = refkey();
  expect(
    mdTest([
      <Heading refkey={empty}>!!!</Heading>,
      <Heading refkey={key}>Section</Heading>,
      empty,
      key,
    ]),
  ).toRenderTo(`
    <a id="section-1"></a>

    # !!!

    # Section

    [!!!](#section-1)

    [Section](#section)
  `);
});

it("escapes default label pipes only in a table cell context", () => {
  const key = refkey();
  expect(
    mdTest([
      <Heading refkey={key}>A | B</Heading>,
      <TableContext.Provider value={true}>
        <Link refkey={key} />
      </TableContext.Provider>,
      <Link refkey={key} />,
    ]),
  ).toRenderTo(`
    # A | B

    [A \\| B](#a--b)

    [A | B](#a--b)
  `);
});
