import { Children } from "@alloy-js/core";

export interface BreakExpressionProps {
  label?: string;
  children?: Children;
}

export function BreakExpression(props: BreakExpressionProps) {
  return (
    <>
      {"break"}
      {props.label ?
        <> {props.label}</>
      : null}
      {typeof props.children !== "undefined" ?
        <> {props.children}</>
      : null}
    </>
  );
}
