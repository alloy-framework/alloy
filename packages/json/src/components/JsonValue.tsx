import { Refkey, useMemberDeclaration } from "@alloy-js/core";
import { JsonArray } from "./JsonArray.jsx";
import { JsonObject } from "./JsonObject.jsx";

export interface JsonValueProps {
  /**
   * The refkey for the JSON value. When provided, this value can be referenced
   * elsewhere via this refkey.
   **/
  refkey?: Refkey;

  /**
   * The JS value to serialize to JSON. When provided, thi
   */
  jsValue: unknown;
}

/**
 * Create a JSON value from a JS value. When the provided JS value is an object,
 * the {@link JsonObject} component will be used. When the provided JS value is
 * an array, the {@link JsonArray} component will be used. Otherwise, the JS
 * value will be serialized to a string, number, boolean, or null as
 * appropriate.
 */
export function JsonValue(props: JsonValueProps) {
  if (props.jsValue === null) {
    setMemberRefkey(props.refkey);
    return "null";
  }

  if (typeof props.jsValue === "number" || typeof props.jsValue === "boolean") {
    setMemberRefkey(props.refkey);
    return String(props.jsValue);
  }

  if (typeof props.jsValue === "string") {
    setMemberRefkey(props.refkey);
    return `"${props.jsValue}"`;
  }

  if (Array.isArray(props.jsValue)) {
    return <JsonArray jsValue={props.jsValue} />;
  }

  if (typeof props.jsValue === "object") {
    return <JsonObject jsValue={props.jsValue as any} />;
  }

  throw new Error("Cannot emit js value with type of " + typeof props.jsValue);
}

function setMemberRefkey(key?: Refkey) {
  if (!key) return;
  const member = useMemberDeclaration();
  if (!member) {
    throw new Error("Missing member declaration.");
  }
  member.refkey = key;
}
