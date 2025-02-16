import { Children, computed, Indent, mapJoin, memo } from "@alloy-js/core";
import { ValueExpression } from "./ValueExpression.js";

export interface ArrayExpressionProps {
  children?: Children;
  jsValue?: unknown[];
}

export function ArrayExpression(props: ArrayExpressionProps) {
  const elements = computed(() => {
    const jsValue = props.jsValue;
    let elements: any[] = [];

    if (jsValue) {
      elements = [
        mapJoin(
          () => jsValue,
          (value) => {
            return <ValueExpression jsValue={value} />;
          },
          { joiner: ",\n" },
        ),
      ];
    }

    if (props.children) {
      if (jsValue && jsValue.length > 0) {
        elements.push(",");
      }
      elements.push("\n", props.children);
    }

    return elements;
  });

  return memo(() => {
    if (elements.value.length === 0) {
      return "[]";
    } else {
      return ["[\n", <Indent>{elements.value}</Indent>, "\n]"];
    }
  });
}
