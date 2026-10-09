import type { Children } from "@alloy-js/core";
import { List } from "@alloy-js/core";

export interface UnionExpressionProps {
  types: Children[];
}

export function UnionExpression(props: UnionExpressionProps) {
  return <List joiner=" | ">{props.types}</List>;
}
