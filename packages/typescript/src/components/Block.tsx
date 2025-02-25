import { Children, Indent } from "@alloy-js/core";

export interface BlockProps {
  children?: Children;
}
export function Block(props: BlockProps) {
  return (
    <group>
      {"{"}
      <Indent break="soft">{props.children}</Indent>
      {"}"}
    </group>
  );
}
