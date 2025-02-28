import { Children, For, Indent } from "@alloy-js/core";

export interface FunctionCallExpressionProps {
  target: Children;
  args?: Children[];
}

export function FunctionCallExpression(props: FunctionCallExpressionProps) {
  return (
    <group>
      {props.target}(
      <Indent break="soft" trailingBreak>
        <For each={props.args ?? []} comma line>
          {(arg) => arg}
        </For>
      </Indent>
      )
    </group>
  );
}
