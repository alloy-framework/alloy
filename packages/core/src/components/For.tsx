import { Children } from "@alloy-js/core/jsx-runtime";

export function For<T extends readonly any[], U extends Children>(props: {
  each: T | undefined | null | false;
  fallback?: Children;
  joiner?: string;
  children: (item: T[number], index: number) => U;
}) {
  return props.children(1, 2);
}
