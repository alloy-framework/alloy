import {
  Children,
  emitSymbol,
  For,
  Indent,
  List,
  MemberDeclaration,
  MemberScope,
  moveTakenMembersTo,
  onCleanup,
  Refkey,
  useMemberScope,
} from "@alloy-js/core";
import { JsonOutputSymbol } from "../symbols/json-symbol.js";
import { JsonValue } from "./json-value.jsx";

export interface JsonArrayPropsBase {
  /**
   * The refkey or array of refkeys for the JSON array. When provided, this
   * value can be referenced elsewhere via this refkey.
   **/
  refkey?: Refkey | Refkey[];
}

/**
 * Create a JSON Array by serializing the given JavaScript array to JSON.
 */
export interface JsonArrayPropsWithJsValue extends JsonArrayPropsBase {
  /**
   * The value to serialize to a JSON array.
   */
  jsValue: unknown[];
}

/**
 * Create a JSON Array by providing the children. To create an array element,
 * see {@link JsonArrayElement}.
 */
export interface JsonArrayPropsWithChildren extends JsonArrayPropsBase {
  /**
   * The contents of the JSON Array. Likely to contain {@link JsonArrayElement}
   * components.
   */
  children?: Children;
}

export type JsonArrayProps =
  | JsonArrayPropsWithJsValue
  | JsonArrayPropsWithChildren;

/**
 * Create a JSON Array. You can provide children, or else pass a JS value that
 * will be serialized to JSON.
 *
 * @see {@link @alloy-js/core#(MemberScopeContext:variable)}
 */
export function JsonArray(props: JsonArrayProps) {
  const arraySym = new JsonOutputSymbol("array symbol", undefined, {
    transient: true,
    refkeys: props.refkey ? [props.refkey].flat() : undefined,
  });
  emitSymbol(arraySym);

  if (!("jsValue" in props)) {
    return (
      <MemberScope ownerSymbol={arraySym} name="array scope">
        <group>
          [
          <Indent softline trailingBreak>
            <List comma line>
              {props.children}
            </List>
          </Indent>
          ]
        </group>
      </MemberScope>
    );
  }

  const jsValue = props.jsValue ?? [];

  return (
    <MemberScope ownerSymbol={arraySym}>
      <group>
        [
        <Indent softline trailingBreak>
          <For each={jsValue} comma line>
            {(value) => <JsonArrayElement jsValue={value} />}
          </For>
        </Indent>
        ]
      </group>
    </MemberScope>
  );
}

/**
 * Create a JSON Array element by providing a JS value that will be serialized
 * to JSON.
 */
export interface JsonArrayElementPropsWithJsValue {
  jsValue: unknown;
}

/**
 * Create a JSON Array element by providing children.
 */
export interface JsonArrayElementPropsWithChildren {
  children: Children;
}

export type JsonArrayElementProps =
  | JsonArrayElementPropsWithJsValue
  | JsonArrayElementPropsWithChildren;

/**
 * Create a JSON Array element. This component should be used inside of a
 * {@link JsonArray} component. Can either be provided `children`, or a JS
 * value which will be serialized to JSON.
 *
 * @see {@link @alloy-js/core#(MemberDeclarationContext:variable)}
 */
export function JsonArrayElement(props: JsonArrayElementProps) {
  const memberScope = useMemberScope();
  const ownerSymbol = memberScope.ownerSymbol as JsonOutputSymbol;
  const name = String(ownerSymbol.staticMembers.size);
  const sym = new JsonOutputSymbol(name, ownerSymbol.staticMembers);
  moveTakenMembersTo(sym);
  onCleanup(() => {
    sym.delete();
  });

  function wrap(children: Children) {
    return <MemberDeclaration symbol={sym}>{children}</MemberDeclaration>;
  }
  if (!("jsValue" in props)) {
    return wrap(() => props.children);
  } else {
    return wrap(<JsonValue jsValue={props.jsValue} />);
  }
}
