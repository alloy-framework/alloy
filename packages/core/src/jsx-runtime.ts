/**
 * JSX runtime.
 *
 * Imported by code compiled with `@alloy-js/babel-preset` (which sets the
 * babel plugin's `moduleName` to `@alloy-js/core/jsx-runtime`). The
 * auto-imported runtime helpers (`createComponent`, `createIntrinsic`,
 * `memo`, `mergeProps`) resolve here, plus the `Children` type for
 * manual imports.
 */

import type {
  Children,
  Component,
  ComponentDefinition,
  IntrinsicElements as CoreIntrinsicElements,
} from "@alloy-js/core";
import { createComponent } from "./runtime/component.js";
export type { Children } from "@alloy-js/core";
export { mergeProps } from "./props-combinators.js";
export { memo } from "./reactivity.js";
export { createComponent } from "./runtime/component.js";
export { createIntrinsic } from "./runtime/create-intrinsic.js";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace JSX {
  export type IntrinsicElements = CoreIntrinsicElements;
  export type ElementType = string | ComponentDefinition<any>;
  export type Element = Children;
  export interface ElementChildrenAttribute {
    children: {};
  }
  export interface ElementAttributesProperty {
    props: {};
  }
}

export function jsx(type: Component<any>, props: Record<string, unknown>) {
  return createComponent(type, props);
}

export const jsxs = jsx;
