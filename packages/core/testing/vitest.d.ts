import "vitest";
import type { ToRenderToOptions } from "./extend-expect.js";

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
