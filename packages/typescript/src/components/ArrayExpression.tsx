import { Children, For, Indent } from "@alloy-js/core";
import { ValueExpression } from "./ValueExpression.js";

export interface ArrayExpressionProps {
  children?: Children;
  jsValue?: unknown[];
}

export function ArrayExpression(props: ArrayExpressionProps) {
  return (
    <group>
      [
      <Indent break="soft">
        <For each={props.jsValue ?? []} comma line>
          {(value) => <ValueExpression jsValue={value} />}
        </For>
        {props.children && (
          <>
            ,<br />
            {props.children}
          </>
        )}
      </Indent>
      <sbr />]
    </group>
  );
}
