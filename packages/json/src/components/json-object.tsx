import {
  Children,
  computed,
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

export interface JsonObjectPropsBase {
  /**
   * The refkey or array of refkeys for the JSON object. When provided, this
   * value can be referenced elsewhere via this refkey.
   **/
  refkey?: Refkey | Refkey[];

  style?: { concise?: boolean };
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
  const objectSym = new JsonOutputSymbol("object symbol", undefined, {
    transient: true,
    refkeys: props.refkey ? [props.refkey].flat() : undefined,
  });
  emitSymbol(objectSym);

  if (!("jsValue" in props)) {
    return (
      <MemberScope ownerSymbol={objectSym} name="object scope">
        <group>
          {"{"}
          <Indent
            softline={!!props.style?.concise}
            hardline={!props.style?.concise}
            trailingBreak
          >
            <List comma softline>
              {props.children}
            </List>
          </Indent>
          {"}"}
        </group>
      </MemberScope>
    );
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

  return (
    <MemberScope ownerSymbol={objectSym}>
      <group>
        {"{"}
        <Indent
          softline={!!props.style?.concise}
          hardline={!props.style?.concise}
          trailingBreak
        >
          <For each={entries} comma softline>
            {([name, value]) => (
              <JsonObjectProperty name={name} jsValue={value} />
            )}
          </For>
        </Indent>
        {"}"}
      </group>
    </MemberScope>
  );
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
  const memberScope = useMemberScope();
  const ownerSymbol = memberScope.ownerSymbol as JsonOutputSymbol;
  const sym = new JsonOutputSymbol(props.name, ownerSymbol.staticMembers);
  moveTakenMembersTo(sym);
  onCleanup(() => {
    sym.delete();
  });

  const wrap = (children: Children) => {
    return (
      <MemberDeclaration symbol={sym}>
        "{props.name}": {children}
      </MemberDeclaration>
    );
  };

  if (!("jsValue" in props)) {
    return wrap(props.children);
  }

  return wrap(<JsonValue jsValue={props.jsValue} />);
}
