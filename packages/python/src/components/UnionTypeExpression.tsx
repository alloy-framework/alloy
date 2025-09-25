import { Children, For, childrenArray } from "@alloy-js/core";

export interface UnionTypeExpressionProps {
  children: Children;
}

export function UnionTypeExpression(props: UnionTypeExpressionProps) {
  const items = childrenArray(() => props.children);
  return (
    <group>
      <ifBreak>(</ifBreak>
      <indent>
        <sbr />
        <For
          each={items}
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
