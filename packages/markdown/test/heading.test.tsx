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

it("resolves forward heading content references before allocating link targets", () => {
  const first = refkey();
  const second = refkey();
  const name = ref("Target");
  const template = mdTest([
    first,
    <Heading refkey={first}>See {second}</Heading>,
    <Heading refkey={second}>{name.value}</Heading>,
  ]);
  expect(template).toRenderTo(`
    [See Target](#see-target)

    # See [Target](#target)

    # Target
  `);
  const tree = renderTree(template);
  expect(getDiagnosticsForTree(tree)).toEqual([]);
  name.value = "Changed";
  expect(printTree(tree)).toBe(
    "[See Changed](#see-changed)\n\n# See [Changed](#changed)\n\n# Changed",
  );
});

it("resolves cross-file heading content references", () => {
  const first = refkey();
  const second = refkey();
  expect(
    <Output>
      <SourceFile path="one.md">
        {first}
        <Heading refkey={first}>See {second}</Heading>
      </SourceFile>
      <SourceFile path="two.md">
        <Heading refkey={second}>Target</Heading>
      </SourceFile>
    </Output>,
  ).toRenderTo({
    "one.md": "[See Target](#see-target)\n\n# See [Target](two.md#target)",
    "two.md": "# Target",
  });
});

it("does not publish an anchor derived from unresolved heading content", () => {
  const key = refkey("dependent-heading");
  const missing = refkey("missing-label");
  const tree = renderTree(
    mdTest([key, <Heading refkey={key}>See {missing}</Heading>]),
  );
  expect(printTree(tree)).toBe(
    "<Unresolved Symbol: refkey[sdependent-heading]>\n\n" +
      "# See <Unresolved Symbol: refkey[smissing-label]>",
  );
  expect(getDiagnosticsForTree(tree)).toMatchObject([
    {
      severity: "warning",
      message: "Unresolved refkey: refkey[smissing-label]",
    },
  ]);
});

it("reallocates duplicate slugs in document order after insertion and remount", () => {
  const show = ref(false);
  const first = refkey();
  const second = refkey();
  const tree = renderTree(
    mdTest([
      <Show when={show.value}>
        <Heading refkey={first}>Hello</Heading>
      </Show>,
      <Heading refkey={second}>Hello</Heading>,
      second,
    ]),
  );
  expect(printTree(tree)).toBe("# Hello\n\n[Hello](#hello)");
  show.value = true;
  expect(printTree(tree)).toBe("# Hello\n\n# Hello\n\n[Hello](#hello-1)");
  show.value = false;
  expect(printTree(tree)).toBe("# Hello\n\n[Hello](#hello)");
  show.value = true;
  expect(printTree(tree)).toBe("# Hello\n\n# Hello\n\n[Hello](#hello-1)");
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

it("allocates punctuation fallback IDs in the same slug namespace", () => {
  const key = refkey();
  expect(
    mdTest([
      <Heading>!!!</Heading>,
      <Heading refkey={key}>Section</Heading>,
      key,
    ]),
  ).toRenderTo(`
    <a id="section-1"></a>

    # !!!

    # Section

    [Section](#section)
  `);
});

it("diagnoses cyclic heading display references across files", () => {
  const first = refkey();
  const second = refkey();
  const tree = renderTree(
    <Output>
      <SourceFile path="one.md">
        <Heading refkey={first}>{second}</Heading>
      </SourceFile>
      <SourceFile path="two.md">
        <Heading refkey={second}>{first}</Heading>
      </SourceFile>
    </Output>,
  );
  expect(getDiagnosticsForTree(tree)).toMatchObject([
    {
      severity: "error",
      message: "Cyclic Markdown heading reference in display text.",
    },
    {
      severity: "error",
      message: "Cyclic Markdown heading reference in display text.",
    },
  ]);
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
