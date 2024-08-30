import { Children, renderTree } from "@alloy-js/core";
import { expect } from "vitest";
import { dedent, printTree } from "./render.js";

expect.extend({
  toRenderTo(received: Children, expectedRaw: string) {
    const { isNot } = this;
    const tree = renderTree(received);
    const actual = printTree(tree);
    const expected = dedent(expectedRaw);
    return {
      pass: actual === expected,
      message: () => {
        return `Render is${isNot ? " not" : ""} incorrect`;
      },
      actual,
      expected,
    };
  },
});
