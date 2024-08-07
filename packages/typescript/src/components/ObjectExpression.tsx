import { Children, code, computed, effect, Indent, mapJoin, memo } from "@alloy-js/core";
import { ValueExpression } from "./ValueExpression.js";

export interface ObjectExpressionProps {
  children?: Children;
  jsValue?: [string, unknown][] | Map<string, unknown> | Record<string, unknown>
}

export function ObjectExpression(props: ObjectExpressionProps) {
  const elements = computed(() => {
    const jsValue = props.jsValue;
    let properties: [string, unknown][];
    if (Array.isArray(jsValue)) {
      properties = jsValue;
    } else if (jsValue instanceof Map) {
      properties = [... jsValue.entries()];
    } else if (jsValue !== undefined) {
      properties = Object.entries(jsValue)
    } else {
      properties = [];
    }
    let elements = mapJoin(properties, ([name, value]) => {
      return <ObjectProperty name={name} jsValue={value} />;
    }, { joiner: ",\n"});
    
    if (props.children) {
      if (elements.length > 0) {
        elements.push(",");
      }
      elements.push(props.children);
    }

    return elements;
  });


  return memo(() => {
    if (elements.value.length === 0) {
      return "{}";
    } else {
      return ["{\n", <Indent>{elements.value}</Indent>, "\n}"];
    }
  });
}

interface ObjectPropertyProps {
  name?: string;
  nameExpression?: Children;
  value?: Children;
  jsValue?: unknown;
  children?: Children;
}

export function ObjectProperty(props: ObjectPropertyProps) {
  let name;
  if (props.name) {
    name = props.name;
  } else if(props.nameExpression) {
    name = <>[{props.nameExpression}]</>
  } else {
    throw new Error("ObjectProperty either a name or a nameExpression.");
  }

  let value;
  if (props.value) {
    value = props.value;
  } else if (props.hasOwnProperty("jsValue")) {
    // need the hasOwnProperty check because the value might be falsy.
    value = <ValueExpression jsValue={props.jsValue} />
  } else if (props.children) {
    value = props.children;
  }
  return <>{name}: {value}</>
}