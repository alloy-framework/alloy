import type { Children, Namekey, Refkey } from "@alloy-js/core";

/**
 * Information for a Python function parameter.
 */
export interface ParameterDescriptor {
  /**
   * The name of the parameter.
   */
  readonly name: string | Namekey;

  /**
   * The type of the parameter.
   */
  readonly type?: Children;

  /**
   * The refkey for this parameter.
   */
  readonly refkey?: Refkey | Refkey[];

  /**
   * Documentation for the parameter.
   */
  readonly doc?: Children;

  /**
   * The default value of the parameter.
   */
  readonly default?: Children;
}

export function isParameterDescriptor(
  param: unknown,
): param is ParameterDescriptor {
  return typeof param === "object" && param !== null && "name" in param;
}
