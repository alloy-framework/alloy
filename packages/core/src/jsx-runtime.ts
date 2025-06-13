// Much of the implementations in this file are inspired by vuerx-js
// See: https://github.com/ryansolid/vuerx-jsx.
import type {
  Children,
  Component,
  ComponentDefinition,
  IntrinsicElements as CoreIntrinsicElements,
} from "@alloy-js/core";
import { createComponent } from "@alloy-js/core";
export {
  createComponent,
  createIntrinsic,
  memo,
  mergeProps,
  type Children,
} from "@alloy-js/core";

/**
 * This namespace is predominantly for interop with React tooling in VSCode
 * and controls the type of JSX elements, components, and the like.
 */
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
