import "vitest";

interface ToRenderToRenderOptions {
  printWidth?: number;
  tabWidth?: number;
  useTabs?: boolean;
}

interface CustomMatchers<R = unknown> {
  toRenderTo: (
    str: string | Record<string, string>,
    options?: ToRenderToRenderOptions,
  ) => R;
  toRenderToAsync: (
    str: string | Record<string, string>,
    options?: ToRenderToRenderOptions,
  ) => Promise<R>;
}

declare module "vitest" {
  interface Matchers<T = any> extends CustomMatchers<T> {}
}
