import {
  Children,
  getContextForRenderNode,
  printTree,
  RenderedTextTree,
  renderTree,
} from "@alloy-js/core";
import "vitest";
import { expect } from "vitest";
import { flushJobs, flushJobsAsync } from "../src/scheduler.js";
import { dedent } from "./render.js";

interface ToRenderToOptions {
  printWidth?: number;
  tabWidth?: number;
  useTabs?: boolean;
}

expect.extend({
  toRenderTo(
    received: Children,
    expectedRaw: string | Record<string, string>,
    renderOptions?: ToRenderToOptions,
  ) {
    const tree = renderTree(received);
    flushJobs();
    const actual = getFilesFromTree(tree, renderOptions);

    return validateRender(actual, expectedRaw, this.isNot);
  },
  async toRenderToAsync(
    received: Children,
    expectedRaw: string | Record<string, string>,
    renderOptions?: ToRenderToOptions,
  ) {
    const tree = renderTree(received);
    await flushJobsAsync();
    const actual = getFilesFromTree(tree, renderOptions);
    return validateRender(actual, expectedRaw, this.isNot);
  },
});

function isAsymmetricMatcher(value: any): value is {
  asymmetricMatch: (other: any) => boolean;
} {
  return value.$$typeof === Symbol.for("jest.asymmetricMatcher");
}

function validateRender(
  actual: string | Record<string, string>,
  expectedRaw: string | Record<string, string>,
  isNot: boolean,
) {
  const message = () => `Render is${isNot ? " not" : ""} incorrect`;

  if (typeof expectedRaw === "string") {
    const expected = dedent(expectedRaw);
    let actualStr;
    if (typeof actual === "string") {
      actualStr = actual;
    } else if (Object.keys(actual).length === 1) {
      // If we have a single file, we can use its content directly.
      actualStr = Object.values(actual)[0];
    } else {
      return {
        pass: false,
        message,
        actual,
        expected,
      };
    }
    return {
      pass: actualStr === expected,
      message,
      actual: actualStr,
      expected,
    };
  } else if (typeof actual === "object" && typeof expectedRaw === "object") {
    const expected = expectedRaw;
    const dedentExpected: Record<string, string> = {};
    for (const [key, value] of Object.entries(expected)) {
      if (isAsymmetricMatcher(value)) {
        dedentExpected[key] = value;
      } else {
        dedentExpected[key] = dedent(value);
      }
    }
    const pass =
      Object.keys(actual).length === Object.keys(expected).length &&
      Object.entries(actual).every(([key, value]) => {
        return isAsymmetricMatcher(dedentExpected[key]) ?
            dedentExpected[key].asymmetricMatch(value)
          : dedentExpected[key] === value;
      });
    return {
      pass,
      message,
      actual,
      expected: dedentExpected,
    };
  } else {
    return {
      pass: false,
      message,
      actual,
      expected: expectedRaw,
    };
  }
}

function getFilesFromTree(tree: RenderedTextTree, options?: ToRenderToOptions) {
  const files: Record<string, string> = {};

  collectSourceFiles(tree);
  // If we found no source files, we return the tree as a string.
  if (Object.keys(files).length === 0) {
    return printTree(tree, options);
  } else {
    return files;
  }

  function collectSourceFiles(root: RenderedTextTree) {
    if (!Array.isArray(root)) {
      return;
    }
    const context = getContextForRenderNode(root);
    if (context?.meta?.sourceFile) {
      files[context.meta.sourceFile.path] = printTree(root, {
        printWidth:
          options?.printWidth ?? context.meta?.printOptions?.printWidth,
        tabWidth: options?.tabWidth ?? context.meta?.printOptions?.tabWidth,
        useTabs: options?.useTabs ?? context.meta?.printOptions?.useTabs,
      });
    } else {
      visitChildren();
    }

    function visitChildren() {
      for (const child of root) {
        collectSourceFiles(child as RenderedTextTree);
      }
    }
  }
}
