import { Children, printTree, renderTree } from "@alloy-js/core";
import { expect } from "vitest";
import { dedent } from "./render.js";

interface ToRenderToOptions {
  printWidth?: number;
  tabWidth?: number;
  useTabs?: boolean;
}

expect.extend({
  toRenderTo(
    received: Children,
    expectedRaw: string,
    renderOptions?: ToRenderToOptions,
  ) {
    const { isNot } = this;
    const tree = renderTree(received);
    const actual = printTree(tree, renderOptions);
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

import "vitest";

interface ToRenderToRenderOptions {
  printWidth?: number;
  tabWidth?: number;
  useTabs?: boolean;
}
interface CustomMatchers<R = unknown> {
  toRenderTo: (str: string, options?: ToRenderToRenderOptions) => R;
}

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
