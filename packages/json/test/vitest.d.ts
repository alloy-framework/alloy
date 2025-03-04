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
