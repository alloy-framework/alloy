import { isNamekey } from "@alloy-js/core";
import type { Children, Namekey } from "@alloy-js/core";

export interface ParameterDescriptor {
  readonly name: string | Namekey;
  readonly type?: Children;
  readonly mutable?: boolean;
  readonly refType?: "&" | "&mut";
}

export function isParameterDescriptor(
  value: unknown,
): value is ParameterDescriptor {
  if (typeof value !== "object" || value === null || !Object.hasOwn(value, "name")) {
    return false;
  }

  const name = (value as Record<PropertyKey, unknown>).name;
  return typeof name === "string" || isNamekey(name);
}
