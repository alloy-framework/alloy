import {
  Block,
  Children,
  computed,
  emitSymbol,
  For,
  Match,
  moveTakenMembersTo,
  Refkey,
  Switch,
  takeSymbols,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import {
  createStaticMemberSymbol,
  createTransientValueSymbol,
} from "../symbols/index.js";
import { MemberScope } from "./MemberScope.jsx";
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
  const symbol = createTransientValueSymbol();

  emitSymbol(symbol);
  moveTakenMembersTo(symbol);

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
          <MemberScope ownerSymbol={symbol}>
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
                      <sbr />
                    </>
                  )}
                  {props.children}
                </>
              )}
            </Block>
          </MemberScope>
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
  let symbolName = props.name;
  if (props.name) {
    const namer = useTSNamePolicy();
    symbolName = namer.getName(props.name, "object-member-data");
    name = <PropertyName name={symbolName} />;
  } else if (props.nameExpression) {
    name = <>[{props.nameExpression}]</>;
  } else {
    throw new Error("ObjectProperty either a name or a nameExpression.");
  }

  let sym = undefined;
  if (props.refkey && props.name) {
    sym = createStaticMemberSymbol(symbolName!, {
      refkeys: props.refkey,
    });

    moveTakenMembersTo(sym);
    emitSymbol(sym);
  } else {
    // noop
    takeSymbols();
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

  return (
    <>
      {name}: {value}
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
