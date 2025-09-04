import { Children } from "@alloy-js/core";

export interface PointerProps {
  children: Children;
}

/**
 * A Go pointer type that wraps the given type.
 */
export function Pointer(props: PointerProps) {
  return <>*{props.children}</>;
}
