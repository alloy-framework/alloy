import { Children, For, Indent, Wrap } from "@alloy-js/core";

export interface FunctionCallExpressionProps {
  target: Children;
  args?: Children[];
  typeArgs?: Children[];
}

export function FunctionCallExpression(props: FunctionCallExpressionProps) {
  return (
    <group>
      {props.target}
      {props.typeArgs && props.typeArgs.length > 0 ? (
        <>
          {"::<"}
          <For each={props.typeArgs} comma>
            {(typeArg) => typeArg}
          </For>
          {">"}
        </>
      ) : null}
      {"("}
      <Wrap
        when={!!props.args && props.args.length > 1}
        with={Indent}
        props={{ softline: true, trailingBreak: true }}
      >
        <For each={props.args ?? []} comma line>
          {(arg) => arg}
        </For>
      </Wrap>
      {")"}
    </group>
  );
}
