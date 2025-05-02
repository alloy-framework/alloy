import {
  AssignmentContext,
  Block,
  Children,
  computed,
  createAssignmentContext,
  For,
  getAssignmentSymbol,
  Match,
  MemberScope,
  OutputSymbolFlags,
  Refkey,
  Switch,
  Wrap,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { createTSSymbol } from "../symbols/index.js";
import { PropertyName } from "./PropertyName.jsx";
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

  return (
    <Switch>
      <Match
        when={jsValueProperties.value.length === 0 && !("children" in props)}
      >
        {"{}"}
      </Match>
      <Match else>
        <group>
          <Wrap
            when={!!assignmentSymbol}
            with={MemberScope}
            props={{ owner: assignmentSymbol! }}
          >
            <Block>
              <For each={jsValueProperties} comma softline enderPunctuation>
                {([name, value]) => (
                  <ObjectProperty name={name} jsValue={value} />
                )}
              </For>
              {props.children && (
                <>
                  {jsValueProperties.value.length > 0 && (
                    <>
                      ,<sbr />
                    </>
                  )}
                  {props.children}
                </>
              )}
            </Block>
          </Wrap>
        </group>
      </Match>
    </Switch>
  );
}

export interface ObjectPropertyProps {
  name?: string;
  nameExpression?: Children;
  value?: Children;
  jsValue?: unknown;
  children?: Children;
  refkey?: Refkey | Refkey[];
}

export function ObjectProperty(props: ObjectPropertyProps) {
  let name;
  if (props.name) {
    const namer = useTSNamePolicy();
    name = (
      <PropertyName name={namer.getName(props.name, "object-member-data")} />
    );
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
  } else if (Object.hasOwn(props, "jsValue")) {
    // need the hasOwnProperty check because the value might be falsy.
    value = <ValueExpression jsValue={props.jsValue} />;
  } else if (props.children) {
    value = props.children;
  }

  const assignmentContext: AssignmentContext | undefined =
    sym ? createAssignmentContext(sym) : undefined;
  return (
    <>
      {name}:{" "}
      <AssignmentContext.Provider value={assignmentContext}>
        {value}
      </AssignmentContext.Provider>
    </>
  );
}

export interface ObjectSpreadPropertyProps {
  value?: Children;
  jsValue?: unknown;
  children?: Children;
}

export function ObjectSpreadProperty(props: ObjectSpreadPropertyProps) {
  let value;
  if (props.value) {
    value = props.value;
  } else if (Object.hasOwn(props, "jsValue")) {
    // need the hasOwnProperty check because the value might be falsy.
    value = <ValueExpression jsValue={props.jsValue} />;
  } else if (props.children) {
    value = props.children;
  }

  return <>...{value}</>;
}
