import { Children } from "@alloy-js/core";

export interface ReturnExpressionProps {
  children?: Children;
}

export function ReturnExpression(props: ReturnExpressionProps) {
  return (
    <>
      {"return"}
      {typeof props.children !== "undefined" ? (
        <>
          {" "}
          {props.children}
        </>
      ) : null}
    </>
  );
}
