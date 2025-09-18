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
