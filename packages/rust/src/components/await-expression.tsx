import { Children } from "@alloy-js/core";

export interface AwaitExpressionProps {
  try?: boolean;
  children: Children;
}

export function AwaitExpression(props: AwaitExpressionProps) {
  return (
    <>
      {props.children}
      {".await"}
      {props.try ? "?" : ""}
    </>
  );
}
