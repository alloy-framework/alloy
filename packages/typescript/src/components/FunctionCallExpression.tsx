import { Children, For, Indent, Wrap } from "@alloy-js/core";

export interface FunctionCallExpressionProps {
  target: Children;
  args?: Children[];
}

export function FunctionCallExpression(props: FunctionCallExpressionProps) {
  return (
    <group>
      {props.target}(
      <Wrap
        when={!!props.args && props.args.length > 1}
        with={Indent}
        props={{ break: "soft", trailingBreak: true }}
      >
        <For each={props.args ?? []} comma line>
          {(arg) => arg}
        </For>
      </Wrap>
      )
    </group>
  );
}
