import { Children, memo } from "@alloy-js/core/jsx-runtime";
import { JoinOptions, mapJoin } from "../utils.js";

export function For<T extends any[], U extends Children>(props: {
  each: T;
  fallback?: Children;
  joiner?: string;
  children: (item: T[number], index: number) => U;
}) {
  const cb = props.children;
  const options: JoinOptions = {};
  if (Object.hasOwn(props, "joiner")) {
    options.joiner = props.joiner;
  }
  return memo(() => {
    return (mapJoin as any)(() => props.each, cb, options);
  });
}
