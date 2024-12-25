import { memo } from "@alloy-js/core";
import { ArrayExpression } from "./ArrayExpression.js";
import { ObjectExpression } from "./ObjectExpression.js";

export interface ValueExpressionProps {
  jsValue?: unknown;
}

export function ValueExpression(props: ValueExpressionProps) {
  return memo(() => {
    const jsValue = props.jsValue;

    if (typeof jsValue === "undefined") {
      return "undefined";
    } else if (typeof jsValue === "number" || typeof jsValue === "boolean") {
      return String(jsValue);
    } else if (typeof jsValue === "bigint") {
      return `${jsValue}n`;
    } else if (typeof jsValue === "string") {
      return JSON.stringify(jsValue);
    } else if (typeof jsValue === "object") {
      if (jsValue === null) {
        return "null";
      } else if (Array.isArray(jsValue)) {
        return <ArrayExpression jsValue={jsValue as unknown[]} />;
      } else {
        return <ObjectExpression jsValue={jsValue as Record<string, unknown>} />;
      }
    } else if (typeof jsValue === "function") {
      // functions are inserted as-is.
      return jsValue;
    }
  });
}
