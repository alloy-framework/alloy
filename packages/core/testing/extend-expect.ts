import { Children, Diagnostic } from "@alloy-js/core";
import "vitest";
import { expect } from "vitest";
import { ElementNode } from "../src/render/node.js";
import { flushJobs, flushJobsAsync } from "../src/scheduler.js";
import {
  getDiagnosticsForTree,
  getFilesFromTree,
  renderTree,
} from "../src/test-render.js";
import { dedent } from "./render.js";

// Cache rendered trees so the same Children reference reuses its tree across
// multiple toRenderTo assertions (enables reactive test patterns without
// explicit renderTree calls).
const renderedTrees = new WeakMap<object, ElementNode>();

function getOrRenderTree(received: Children): ElementNode {
  if (received instanceof ElementNode) {
    return received;
  }
  // If received is an object (array/JSX node), check cache
  if (typeof received === "object" && received !== null) {
    const cached = renderedTrees.get(received as object);
    if (cached) {
      return cached;
    }
    const tree = renderTree(received);
    renderedTrees.set(received as object, tree);
    return tree;
  }
  return renderTree(received);
}

/**
 * Print options passed to `toRenderTo` / `toRenderToAsync`. These override
 * the per-`SourceFile` print settings for the duration of the assertion,
 * which is useful when forcing line-breaking with a narrow `printWidth` in
 * tests without needing extremely long inputs.
 *
 * @example
 * ```ts
 * expect(<MyList items={["a", "b", "c"]} />).toRenderTo(
 *   `
 *   a,
 *   b,
 *   c
 *   `,
 *   { printWidth: 10 }
 * );
 * ```
 */
export interface ToRenderToOptions {
  /** Maximum line width before the formatter wraps output. */
  printWidth?: number;
  /** Number of spaces per indentation level. */
  tabWidth?: number;
  /** Use tab characters instead of spaces. */
  useTabs?: boolean;
}

interface ExpectedDiagnostic {
  message: string | RegExp;
  severity?: Diagnostic["severity"];
}

expect.extend({
  toRenderTo(
    received: Children,
    expectedRaw: string | Record<string, string>,
    renderOptions?: ToRenderToOptions,
  ) {
    const tree = getOrRenderTree(received);
    flushJobs();
    const actual = getFilesFromTree(tree, renderOptions);

    return validateRender(actual, expectedRaw, this.isNot);
  },
  async toRenderToAsync(
    received: Children,
    expectedRaw: string | Record<string, string>,
    renderOptions?: ToRenderToOptions,
  ) {
    const tree = renderTree(received, { noFlush: true });
    await flushJobsAsync();
    const actual = getFilesFromTree(tree, renderOptions);
    return validateRender(actual, expectedRaw, this.isNot);
  },
  toHaveDiagnostics(
    received: Children,
    expectedDiagnostics: ExpectedDiagnostic[],
  ) {
    const tree = renderTree(received);
    flushJobs();
    const diagnostics = getDiagnosticsForTree(tree);
    return validateDiagnostics(diagnostics, expectedDiagnostics, this.isNot);
  },
  async toHaveDiagnosticsAsync(
    received: Children,
    expectedDiagnostics: ExpectedDiagnostic[],
  ) {
    const tree = renderTree(received, { noFlush: true });
    await flushJobsAsync();
    const diagnostics = getDiagnosticsForTree(tree);
    return validateDiagnostics(diagnostics, expectedDiagnostics, this.isNot);
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

function validateDiagnostics(
  actual: Diagnostic[],
  expected: ExpectedDiagnostic[],
  isNot: boolean,
) {
  const message = () => `Diagnostics are${isNot ? " not" : ""} incorrect`;

  if (actual.length !== expected.length) {
    return {
      pass: false,
      message: () =>
        `Expected ${expected.length} diagnostic(s), but got ${actual.length}`,
      actual: actual.map((d) => ({ message: d.message, severity: d.severity })),
      expected,
    };
  }

  for (let i = 0; i < expected.length; i++) {
    const actualDiag = actual[i];
    const expectedDiag = expected[i];

    const messageMatches =
      expectedDiag.message instanceof RegExp ?
        expectedDiag.message.test(actualDiag.message)
      : actualDiag.message === expectedDiag.message;

    if (!messageMatches) {
      return {
        pass: false,
        message: () =>
          `Diagnostic ${i} message mismatch: expected "${expectedDiag.message}", got "${actualDiag.message}"`,
        actual: actual.map((d) => ({
          message: d.message,
          severity: d.severity,
        })),
        expected,
      };
    }

    if (
      expectedDiag.severity !== undefined &&
      actualDiag.severity !== expectedDiag.severity
    ) {
      return {
        pass: false,
        message: () =>
          `Diagnostic ${i} severity mismatch: expected "${expectedDiag.severity}", got "${actualDiag.severity}"`,
        actual: actual.map((d) => ({
          message: d.message,
          severity: d.severity,
        })),
        expected,
      };
    }
  }

  return {
    pass: true,
    message,
    actual: actual.map((d) => ({ message: d.message, severity: d.severity })),
    expected,
  };
}
