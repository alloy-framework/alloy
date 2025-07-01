import {
  Children,
  getContextForRenderNode,
  printTree,
  RenderedTextTree,
  renderTree,
} from "@alloy-js/core";
import { join } from "pathe";
import "vitest";
import { expect } from "vitest";
import { dedent } from "./render.js";
import "./vitest.d.ts";

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
    const message = () => `Render is${isNot ? " not" : ""} incorrect`;

    const { isNot } = this;
    const actual = renderAsFiles(received, renderOptions);
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
        dedentExpected[key] = dedent(value);
      }
      const pass =
        Object.keys(actual).length === Object.keys(expected).length &&
        Object.entries(actual).every(([key, value]) => {
          return dedentExpected[key] === value;
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
  },
});

function renderAsFiles(
  received: Children,
  options?: ToRenderToOptions,
): Record<string, string> | string {
  const files: Record<string, string> = {};
  const tree = renderTree(received);

  // when passing Output, the first render tree child is the Output component.
  const rootRenderOptions =
    Array.isArray(tree) ?
      (getContextForRenderNode(tree[0] as RenderedTextTree)?.meta
        ?.printOptions ?? {})
    : {};

  collectSourceFiles("", tree);
  function collectSourceFiles(
    currentDirectory: string,
    root: RenderedTextTree,
  ) {
    if (!Array.isArray(root)) {
      return;
    }
    const context = getContextForRenderNode(root);

    if (!context) {
      return recurse(currentDirectory);
    }

    if (context.meta?.directory) {
      recurse(join(currentDirectory, context.meta.directory.path));
    } else if (context.meta?.sourceFile) {
      const filepath = join(currentDirectory, context.meta.sourceFile.path);
      files[filepath] = printTree(root, {
        printWidth:
          options?.printWidth ??
          context.meta?.printOptions?.printWidth ??
          rootRenderOptions.printWidth,
        tabWidth:
          options?.tabWidth ??
          context.meta?.printOptions?.tabWidth ??
          rootRenderOptions.tabWidth,
        useTabs:
          options?.useTabs ??
          context.meta?.printOptions?.useTabs ??
          rootRenderOptions.useTabs,
      });
    } else {
      recurse(currentDirectory);
    }

    function recurse(cwd: string) {
      for (const child of root) {
        collectSourceFiles(cwd, child as RenderedTextTree);
      }
    }
  }

  // If we found no source files, we return the tree as a string.
  if (Object.keys(files).length === 0) {
    return printTree(tree, options);
  } else {
    return files;
  }
}
