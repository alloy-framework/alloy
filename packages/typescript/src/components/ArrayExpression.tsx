import { Children, childrenArray, For, Indent, Show } from "@alloy-js/core";
import { ValueExpression } from "./ValueExpression.js";

export interface ArrayExpressionProps {
  children?: Children;
  jsValue?: unknown[];
}

export function ArrayExpression(props: ArrayExpressionProps) {
  const hasVisibleChildren =
    childrenArray(() => props.children).filter((c) => Boolean(c)).length > 0;

  return (
    <group>
      [
      <Indent softline>
        <For each={props.jsValue ?? []} comma line>
          {(value) => <ValueExpression jsValue={value} />}
        </For>
        <Show when={hasVisibleChildren}>
          {props.jsValue && props.jsValue.length > 0 && (
            <>
              ,<br />
            </>
          )}
          {props.children}
        </Show>
      </Indent>
      <sbr />]
    </group>
  );
}
