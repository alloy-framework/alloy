import {
  Children,
  For,
  Indent,
  List,
  MemberDeclaration,
  MemberScope,
  onCleanup,
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

  /**
   * The refkeys for the JSON array. When provided, this array can be referenced
   * elsewhere via any of these refkeys.
   **/
  refkeys?: Refkey[];
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
    memberSymbol.refkeys = [
      ...(props.refkey ? [props.refkey] : []),
      ...(props.refkeys ?? []),
    ];
  }

  if (!("jsValue" in props)) {
    return (
      <MemberScope owner={memberSymbol}>
        <group>
          [
          <Indent break="soft" trailingBreak>
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
    <MemberScope owner={memberSymbol}>
      <group>
        [
        <Indent break="soft" trailingBreak>
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

  onCleanup(() => {
    sym.binder.deleteSymbol(sym);
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
