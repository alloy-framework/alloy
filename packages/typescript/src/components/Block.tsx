import { Children, childrenArray, computed, Indent } from "@alloy-js/core";

export interface BlockProps {
  children?: Children;
}

export function Block(props: BlockProps) {
  const childCount = computed(() => childrenArray(() => props.children).length);
  return (
    <group>
      {"{"}
      <Indent break={childCount.value > 0 ? "hard" : "soft"}>
        {props.children}
      </Indent>
      {childCount.value > 0 ?
        <hbr />
      : <sbr />}
      {"}"}
    </group>
  );
}
