import { Children, childrenArray, For, memo } from "@alloy-js/core";

export interface UnionTypeExpressionProps {
  children: Children[];
  optional?: boolean;
}

export function UnionTypeExpression(props: UnionTypeExpressionProps) {
  const resolvedChildren = memo(() => {
    const children = childrenArray(() => props.children, {
      preserveFragments: true,
    });

    if (props.optional) {
      children.push("None");
    }
    return children;
  });

  return (
    <group>
      <ifBreak>(</ifBreak>
      <indent>
        <sbr />
        <For
          each={resolvedChildren}
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
