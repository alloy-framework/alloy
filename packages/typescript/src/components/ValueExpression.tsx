import { memo } from "@alloy-js/core"
import { ObjectExpression } from "./ObjectExpression.js";
import { ArrayExpression } from "./ArrayExpression.js";

export interface ValueExpressionProps {
  jsValue?: unknown
}

export function ValueExpression(props: ValueExpressionProps) {


  return memo(() => {
    const jsValue = props.jsValue;

    if (typeof jsValue === "undefined") {
      return "undefined";
    } else if (typeof jsValue === "number" || typeof jsValue === "boolean") {
      return String(jsValue);
    } else if (typeof jsValue === "string") {
      return `"${jsValue}"`;
    } else if (typeof jsValue === "object") {
      if (jsValue === null) {
        return "null";
      } else if (Array.isArray(jsValue)) {
        return <ArrayExpression jsValue={jsValue as unknown[]} />
      } else {
        return <ObjectExpression jsValue={jsValue as Record<string, unknown>} />
      }
    }
  })
}