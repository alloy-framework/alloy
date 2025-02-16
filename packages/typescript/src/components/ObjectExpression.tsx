import {
  AssignmentContext,
  Children,
  computed,
  createAssignmentContext,
  getAssignmentSymbol,
  mapJoin,
  MemberScope,
  memo,
  OutputSymbolFlags,
  Refkey,
} from "@alloy-js/core";
import { createTSSymbol } from "../symbols/index.js";
import { ValueExpression } from "./ValueExpression.js";

export interface ObjectExpressionProps {
  children?: Children;
  jsValue?:
    | [string, unknown][]
    | Map<string, unknown>
    | Record<string, unknown>;
}

export function ObjectExpression(props: ObjectExpressionProps) {
  const assignmentSymbol = getAssignmentSymbol();

  if (assignmentSymbol) {
    assignmentSymbol.binder.addStaticMembersToSymbol(assignmentSymbol);
  }

  const jsValueProperties = computed(() => {
    const jsValue = props.jsValue;
    let properties: [string, unknown][];
    if (Array.isArray(jsValue)) {
      properties = jsValue;
    } else if (jsValue instanceof Map) {
      properties = [...jsValue.entries()];
    } else if (jsValue !== undefined) {
      properties = Object.entries(jsValue);
    } else {
      properties = [];
    }
    return properties;
  });

  const elements = computed(() => {
    const elements: Children[] = [];

    if (jsValueProperties.value.length > 0) {
      elements.push(
        mapJoin(
          () => jsValueProperties.value,
          ([name, value]) => {
            return <ObjectProperty name={name} jsValue={value} />;
          },
          { joiner: ",\n" },
        ),
      );
    }

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
      if (assignmentSymbol) {
        return <>
          {"{"}
            <MemberScope owner={assignmentSymbol}>
              {elements.value}
            </MemberScope>
          {"}"}
        </>;
      } else {
        return <>
          {"{"}
            {elements.value}
          {"}"}
        </>;
      }
    }
  });
}

export interface ObjectPropertyProps {
  name?: string;
  nameExpression?: Children;
  value?: Children;
  jsValue?: unknown;
  children?: Children;
  refkey?: Refkey;
}

export function ObjectProperty(props: ObjectPropertyProps) {
  let name;
  if (props.name) {
    name = props.name;
  } else if (props.nameExpression) {
    name = <>[{props.nameExpression}]</>;
  } else {
    throw new Error("ObjectProperty either a name or a nameExpression.");
  }

  let sym = undefined;
  if (props.refkey && props.name) {
    sym = createTSSymbol({
      name: props.name,
      refkey: props.refkey,
      flags: OutputSymbolFlags.StaticMember,
    });
  }

  let value;
  if (props.value) {
    value = props.value;
  } else if (Object.prototype.hasOwnProperty.call(props, "jsValue")) {
    // need the hasOwnProperty check because the value might be falsy.
    value = <ValueExpression jsValue={props.jsValue} />;
  } else if (props.children) {
    value = props.children;
  }

  const assignmentContext: AssignmentContext | undefined = sym ?
    createAssignmentContext(sym)
  : undefined;
  return <>
    {sym ? sym.name : name}: <AssignmentContext.Provider value={assignmentContext}>
      {value}
    </AssignmentContext.Provider>
  </>;
}
