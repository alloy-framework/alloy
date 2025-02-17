import {
  Children,
  computed,
  For,
  MemberDeclaration,
  MemberScope,
  onCleanup,
  OutputSymbolFlags,
  Refkey,
  useMemberDeclaration,
} from "@alloy-js/core";
import { createJsonOutputSymbol } from "../symbols/json-symbol.js";
import { JsonValue } from "./JsonValue.jsx";

export interface JsonObjectPropsBase {
  /** The refkey for the JSON array. When provided, this value can be referenced
   * elsewhere via this refkey.
   **/
  refkey?: Refkey;
}

/**
 * Create a JSON object by providing children that define the object's contents.
 * The children should use the {@link JsonObjectProperty} component to define
 * individual object properties.
 */
export interface JsonObjectPropsWithChildren extends JsonObjectPropsBase {
  /**
   * The contents of the JSON object. Likely to contain
   * {@link JsonObjectProperty} components.
   */
  children: Children;
}

/**
 * Create a JSON object by providing a JS value that will be serialized to JSON.
 */
export interface JsonObjectPropsWithJsValue extends JsonObjectPropsBase {
  /**
   * The JS value to serialize to JSON. This can be an array of key-value pairs,
   * a map, or a vanilla JS object.
   */
  jsValue: [string, unknown][] | Map<string, unknown> | Record<string, unknown>;
}

export type JsonObjectProps =
  | JsonObjectPropsWithChildren
  | JsonObjectPropsWithJsValue;

/**
 * Create a JSON Object. An object can be created by providing a JS object
 * value which will be serialized to JSON. Else, you can provide children that
 * comprise the object's JSON representation.
 *
 * @see {@link @alloy-js/core#MemberScopeContext}
 */
export function JsonObject(props: JsonObjectProps) {
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
      {"{"}
        {props.children}
      {"}"}
    </MemberScope>;
  }

  const entries = computed(() => {
    const jsValue = props.jsValue;
    if (Array.isArray(jsValue)) {
      return jsValue;
    } else if (jsValue instanceof Map) {
      return [...jsValue.entries()];
    } else if (jsValue !== undefined) {
      return globalThis.Object.entries(jsValue);
    } else {
      return [];
    }
  });

  return <MemberScope owner={memberSymbol}>
    {"{"}
      <For each={entries} joiner={",\n"}>
        {([name, value], index) => <JsonObjectProperty name={name} jsValue={value} />}
      </For>
    {"}"}
  </MemberScope>;
}

/**
 * Create a JSON object property with a name and children. The children become
 * the value of the property.
 */
export interface ObjectPropertyPropsWithChildren {
  name: string;
  children: Children;
}

/**
 * Create a JSON object property with a name and a JS value. The JS value is
 * serialized to JSON for the property
 */
export interface ObjectPropertyPropsWithJsValue {
  name: string;
  jsValue: unknown;
}

export type ObjectPropertyProps =
  | ObjectPropertyPropsWithChildren
  | ObjectPropertyPropsWithJsValue;

/**
 * Create a JSON object property. A property can be created by providing a JS
 * property value or children that defines the value.
 *
 * @see {@link @alloy-js/core#(MemberDeclarationContext:variable)}
 */
export function JsonObjectProperty(props: ObjectPropertyProps) {
  const sym = createJsonOutputSymbol({
    name: props.name,
    flags: OutputSymbolFlags.StaticMember,
  });

  onCleanup(() => {
    sym.binder.deleteSymbol(sym);
  });

  const wrap = (children: Children) => {
    return <MemberDeclaration symbol={sym}>
      "{props.name}": {children}
    </MemberDeclaration>;
  };

  if (!("jsValue" in props)) {
    return wrap(props.children);
  }

  return wrap(<JsonValue jsValue={props.jsValue} />);
}
