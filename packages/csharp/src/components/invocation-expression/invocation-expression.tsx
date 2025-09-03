import { Children, For, Indent, Show, Wrap } from "@alloy-js/core";

export interface InvocationExpressionProps {
  target: Children;
  /**
   * Arguments to pass to the invocation.
   */
  args?: Children[];
  /**
   * Generic type arguments for the invocation.
   */
  typeArgs?: Children[];
}

/**
 * A call to a function or method.
 *
 * @example
 *
 * ```jsx
 * <InvocationExpression target="Foo" typeArgs={["T"]} args={["x"]} />
 * ```
 *
 * Renders to:
 *
 * ```csharp
 * Foo<T>("x");
 * ```
 */
export function InvocationExpression(props: InvocationExpressionProps) {
  return (
    <group>
      {props.target}
      <Show when={!!props.typeArgs && props.typeArgs.length > 0}>
        {"<"}
        <Wrap
          when={props.typeArgs!.length > 1}
          with={Indent}
          props={{ softline: true, trailingBreak: true }}
        >
          <For each={props.typeArgs ?? []} comma line>
            {(typeArg) => typeArg}
          </For>
        </Wrap>
        {">"}
      </Show>
      (
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
