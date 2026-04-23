/**
 * Vitest matcher type augmentations for alloy testing.
 *
 * Consumers load these types via `"types": ["@alloy-js/core/testing/matchers"]`
 * in their tsconfig.json. This file is resolved directly from the source tree
 * (not from dist/), so it **must remain self-contained** — do NOT add imports
 * that resolve to .ts source files (e.g. `./extend-expect.js`). Doing so pulls
 * the entire src/ tree into the consumer's compilation, creating a dual-module
 * identity conflict between src/ types and dist/ types that produces TS errors.
 *
 * If matcher signatures change, update the inlined types here to match.
 */
import "vitest";

interface ToRenderToOptions {
  /** Maximum line width before the formatter wraps output. */
  printWidth?: number;
  /** Number of spaces per indentation level. */
  tabWidth?: number;
  /** Use tab characters instead of spaces. */
  useTabs?: boolean;
}

interface ExpectedDiagnostic {
  message: string | RegExp;
  severity?: "info" | "warning" | "error";
}

interface CustomMatchers<R = unknown> {
  toRenderTo: (
    str: string | Record<string, string>,
    options?: ToRenderToOptions,
  ) => R;
  toRenderToAsync: (
    str: string | Record<string, string>,
    options?: ToRenderToOptions,
  ) => Promise<R>;
  toHaveDiagnostics: (expectedDiagnostics: ExpectedDiagnostic[]) => R;
  toHaveDiagnosticsAsync: (
    expectedDiagnostics: ExpectedDiagnostic[],
  ) => Promise<R>;
}

declare module "vitest" {
  interface Matchers<T = any> extends CustomMatchers<T> {}
}
