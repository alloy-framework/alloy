import { Children, Refkey, useMemberDeclaration } from "@alloy-js/core";
import { JsonArray } from "./json-array.jsx";
import { JsonObject } from "./json-object.jsx";

export interface JsonValueProps {
  /**
   * The refkey or array of refkeys for the JSON value. When provided, this
   * value can be referenced elsewhere via this refkey.
   **/
  refkey?: Refkey | Refkey[];

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
export function JsonValue(props: JsonValueProps): Children {
  const refkeys = [props.refkey ?? []].flat();
  if (props.jsValue === null) {
    setMemberRefkey(refkeys);
    return "null";
  }

  if (typeof props.jsValue === "number" || typeof props.jsValue === "boolean") {
    setMemberRefkey(refkeys);
    return String(props.jsValue);
  }

  if (typeof props.jsValue === "string") {
    setMemberRefkey(refkeys);
    return `"${props.jsValue}"`;
  }

  if (Array.isArray(props.jsValue)) {
    return <JsonArray jsValue={props.jsValue} />;
  }

  if (typeof props.jsValue === "object") {
    return <JsonObject jsValue={props.jsValue as Record<string, unknown>} />;
  }

  if (typeof props.jsValue === "function") {
    // functions are inserted as-is.
    return props.jsValue as () => Children;
  }

  throw new Error("Cannot emit js value with type of " + typeof props.jsValue);
}

function setMemberRefkey(keys: Refkey[]) {
  if (keys.length === 0) return;
  const member = useMemberDeclaration();
  if (!member) {
    throw new Error("Missing member declaration.");
  }

  member.refkeys = keys;
}
