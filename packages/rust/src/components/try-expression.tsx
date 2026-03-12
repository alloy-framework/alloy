import { Children } from "@alloy-js/core";

export interface TryExpressionProps {
  children: Children;
}

export function TryExpression(props: TryExpressionProps) {
  return (
    <>
      {props.children}
      {"?"}
    </>
  );
}
