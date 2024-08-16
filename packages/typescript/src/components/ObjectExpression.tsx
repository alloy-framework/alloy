import {
  Children,
  code,
  computed,
  effect,
  Indent,
  mapJoin,
  memo,
  Refkey,
  refkey,
  Scope,
  useBinder,
  useContext,
} from "@alloy-js/core";
import { ValueExpression } from "./ValueExpression.js";
import {
  createTSMemberScope,
  createTSSymbol,
  TSSymbolFlags,
  useTSScope,
} from "../symbols/index.js";
import { AssignmentContext } from "./VarDeclaration.jsx";

export interface ObjectExpressionProps {
  children?: Children;
  jsValue?:
    | [string, unknown][]
    | Map<string, unknown>
    | Record<string, unknown>;
}

export function ObjectExpression(props: ObjectExpressionProps) {
  const assignmentContext = useContext(AssignmentContext);
  if (assignmentContext) {
    assignmentContext.target.memberScope = createTSMemberScope(
      useBinder(),
      useTSScope(),
      assignmentContext.target,
    );
  }

  const elements = computed(() => {
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
    let elements = mapJoin(
      properties,
      ([name, value]) => {
        return <ObjectProperty name={name} jsValue={value} />;
      },
      { joiner: ",\n" },
    );

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
      if (assignmentContext) {
        return <>
          {"{"}
            <Scope value={assignmentContext.target.memberScope}>
              {elements.value}
            </Scope>
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
      flags: TSSymbolFlags.MemberSymbol,
    });
  }

  let value;
  if (props.value) {
    value = props.value;
  } else if (props.hasOwnProperty("jsValue")) {
    // need the hasOwnProperty check because the value might be falsy.
    value = <ValueExpression jsValue={props.jsValue} />;
  } else if (props.children) {
    value = props.children;
  }

  let assignmentContext: AssignmentContext | undefined = sym
    ? {
        target: sym,
      }
    : undefined;
  return <>
    {sym ? sym.name : name}: <AssignmentContext.Provider value={assignmentContext}>
      {value}
    </AssignmentContext.Provider>
  </>;
}
