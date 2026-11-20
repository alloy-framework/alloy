import {
  getDiagnosticsForTree,
  Output,
  refkey,
  renderTree,
  SourceDirectory,
} from "@alloy-js/core";
import { expect, it } from "vitest";

import { Heading, Link, Section, SourceFile } from "../src/index.js";
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

it("derives slugs from visible inline Markdown and renders children only once", () => {
  const key = refkey();
  let calls = 0;
  function InlineName() {
    calls++;
    return "`Foo.bar<T>`";
  }
  const template = mdTest([
    <Heading refkey={key}>
      Use <InlineName />
      {" &amp; **[API](https://example.com)**"}
    </Heading>,
    key,
  ]);
  expect(template).toRenderTo(`
    # Use \`Foo.bar<T>\` &amp; **[API](https://example.com)**

    [Use Foo.bar\\<T\\> \\& API](#use-foobart--api)
  `);
  expect(calls).toBe(1);
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
