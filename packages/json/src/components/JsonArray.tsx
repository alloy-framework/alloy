import {
  Children,
  mapJoin,
  MemberDeclaration,
  MemberScope,
  OutputSymbolFlags,
  Refkey,
  useMemberDeclaration,
  useMemberScope,
} from "@alloy-js/core";
import { createJsonOutputSymbol } from "../symbols/json-symbol.js";
import { JsonValue } from "./JsonValue.jsx";

export interface JsonArrayPropsBase {
  /** The refkey for the JSON array. When provided, this value can be referenced
   * elsewhere via this refkey.
   **/
  refkey?: Refkey;
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
  const memberSymbol = useMemberDeclaration();
  if (!memberSymbol) {
    throw new Error("Missing assignment symbol.");
  }
  const binder = memberSymbol.binder;
  binder.addStaticMembersToSymbol(memberSymbol);
  if (props.refkey) {
    memberSymbol.refkey = props.refkey;
  }

  if (!("jsValue" in props)) {
    return <MemberScope owner={memberSymbol}>
      [
        {props.children}
      ]
    </MemberScope>;
  }

  const jsValue = props.jsValue ?? [];

  if (jsValue.length === 0) {
    return "[]";
  }

  const elements = mapJoin(
    jsValue,
    (value) => {
      return <JsonArrayElement><JsonValue jsValue={value} /></JsonArrayElement>;
    },
    { joiner: ",\n" },
  );

  let contents;
  if (jsValue.length === 1) {
    contents = <>[{elements}]</>;
  } else {
    contents = <>
      [
        {elements}
      ]
    </>;
  }

  return <MemberScope owner={memberSymbol}>
    {contents}
  </MemberScope>;
}

export interface JsonArrayElementProps {
  children: Children;
}

/**
 * Create a JSON Array element. This component should be used inside of a
 * {@link JsonArray} component.
 *
 * @remarks
 *
 * It does not add any syntax, but is required in
 * order to establish the correct scope for the array element, allowing
 * references to array elements to work properly.
 *
 * @see {@link @alloy-js/core#(MemberDeclarationContext:variable)}
 */
export function JsonArrayElement(props: JsonArrayElementProps) {
  const memberScope = useMemberScope();
  if (!memberScope) {
    throw new Error("Missing member scope.");
  }

  if (!memberScope.staticMembers) {
    throw new Error("Missing static members scope.");
  }

  const name = String(memberScope.staticMembers.symbols.size);

  const sym = createJsonOutputSymbol({
    name,
    flags: OutputSymbolFlags.StaticMember,
  });

  return <MemberDeclaration symbol={sym}>
    {props.children}
  </MemberDeclaration>;
}
