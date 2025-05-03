import "@alloy-js/core/testing";
import { d } from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import { Frontmatter } from "../src/components/Frontmatter.jsx";
import { mdTest } from "./utils.jsx";

it("renders with js value", () => {
  const template = mdTest(
    <Frontmatter jsValue={{ title: "My Title", tags: ["tag1", "tag2"] }} />,
  );

  expect(template).toRenderTo(d`
    ---
    title: My Title
    tags:
      - tag1
      - tag2
    ---
  `);
});

it("renders with children", () => {
  const template = mdTest(
    <Frontmatter>
      <>{`title: My Title`}</>
      <>{`tags:`}</>
      <>{`  - tag1`}</>
      <>{`  - tag2`}</>
    </Frontmatter>,
  );

  expect(template).toRenderTo(d`
    ---
    title: My Title
    tags:
      - tag1
      - tag2
    ---
  `);
});
