import { Children, mapJoin, Refkey } from "@alloy-js/core";
import { Reference } from "./Reference.js";

export interface FunctionCallExpressionProps {
  refkey: Refkey;
  args?: Children[];
}
export function FunctionCallExpression(props: FunctionCallExpressionProps) {
  const args = props.args && props.args.length ?
    mapJoin(props.args, (arg) => arg, { joiner: ", " })
  : null;
  return <>
        <Reference refkey={props.refkey} />({args})
    </>;
}
