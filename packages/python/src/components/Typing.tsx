import { Children, code, For } from "@alloy-js/core";

export interface UnionTypeExpressionProps {
  children: Children[];
  optional?: boolean;
}

export function UnionTypeExpression(props: UnionTypeExpressionProps) {
  var elements = props.children;
  if (props.optional) {
    elements = [...elements, code`None`];
  }

  return (
    <For each={elements ?? []} joiner={code` | `} line>
      {(child) => child}
    </For>
  );
}
