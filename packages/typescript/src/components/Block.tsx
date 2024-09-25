import { Children } from "@alloy-js/core";

export interface BlockProps {
  children?: Children;
}
export function Block(props: BlockProps) {
  return <>
    {"{"}
      {props.children}
    {"}"}
  </>;
}
