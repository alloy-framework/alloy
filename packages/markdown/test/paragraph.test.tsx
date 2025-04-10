import { Prose } from "@alloy-js/core";
import "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { Section } from "../src/components/Section.jsx";
import { mdTest } from "./utils.jsx";

it("renders a section", () => {
  const template = mdTest(
    <Section heading="hello">
      <Prose>
        This is some text content that should be wrapped and such. We can put
        *italic* and **bold** text here, and it should be rendered correctly. We
        can also put in some code: `const x = 1;` and it should be rendered
        correctly. We can also put in some links:
        [Alloy](https://alloy-framework.github.io/alloy). It's pretty nice.
      </Prose>
      <Prose>
        Subsequent paragraphs should have a blank line between them.
      </Prose>
    </Section>,
  );

  expect(template).toRenderTo(
    `
      # hello

      This is some text content that should be
      wrapped and such. We can put *italic*
      and **bold** text here, and it should be
      rendered correctly. We can also put in
      some code: \`const x = 1;\` and it should
      be rendered correctly. We can also put
      in some links:
      [Alloy](https://alloy-framework.github.io/alloy).
      It's pretty nice.

      Subsequent paragraphs should have a
      blank line between them.
  `,
    { printWidth: 40 },
  );
});
