import { Children, For, childrenArray, computed } from "@alloy-js/core";

export interface UnionTypeExpressionProps {
  children: Children;
}

export function UnionTypeExpression(props: UnionTypeExpressionProps) {
  const items = computed(() => childrenArray(() => props.children));
  return (
    <group>
      <ifBreak>(</ifBreak>
      <indent>
        <sbr />
        <For
          each={items.value}
          joiner={
            <>
              <br />|{" "}
            </>
          }
        >
          {(child) => child}
        </For>
      </indent>
      <sbr />
      <ifBreak>)</ifBreak>
    </group>
  );
}
