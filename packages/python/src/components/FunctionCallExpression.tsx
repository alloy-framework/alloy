import { Children, For, Indent, Wrap } from "@alloy-js/core";

export interface FunctionCallExpressionProps {
  target: Children;
  args?: Children[];
}

/**
 * A Python function call expression.
 *
 * @example
 * ```tsx
 * <FunctionCallExpression target="foo" args={["arg1", "arg2"]} />
 * ```
 * This will generate:
 * ```python
 * foo(arg1, arg2)
 * ```
 */
export function FunctionCallExpression(props: FunctionCallExpressionProps) {
  return (
    <group>
      {props.target}(
      <Wrap
        when={!!props.args && props.args.length > 1}
        with={Indent}
        props={{ softline: true, trailingBreak: true }}
      >
        <For each={props.args ?? []} comma line>
          {(arg) => arg}
        </For>
      </Wrap>
      )
    </group>
  );
}
