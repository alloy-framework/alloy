import { expect } from "vitest";
import { d, dedent, renderToString } from "./render.utils.js";
import { Children } from "../src/jsx-runtime.js";

expect.extend({
  toRenderTo(received: Children, expectedRaw: string) {
    const { isNot } = this;
    const actual = renderToString(received);
    const expected = dedent(expectedRaw);
    return {
      pass: actual === expected,
      message: () => `Render is${isNot ? " not" : ""} incorrect`,
      actual,
      expected,
    };
  },
});
