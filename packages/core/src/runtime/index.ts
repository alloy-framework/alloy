/**
 * runtime — narrow surface used by JSX-compiled output and tests
 * exercising the AlloyNode renderer directly.
 */

export { mergeProps } from "../props-combinators.js";
export { effect, memo } from "../reactivity.js";
export { render, renderAsync } from "../render-output.js";
export { createComponent } from "./component.js";
export { createIntrinsic } from "./create-intrinsic.js";
export { Fragment } from "./fragment.js";
export { insert } from "./insert.js";
