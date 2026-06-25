import { Block, Children } from "@alloy-js/core";

export interface ModelExpressionProps {
  children?: Children;
}

export function ModelExpression(props: ModelExpressionProps) {
  return <Block>{props.children}</Block>;
}
