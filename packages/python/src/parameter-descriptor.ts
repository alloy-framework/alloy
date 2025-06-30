import type { Children, Refkey } from "@alloy-js/core";

/**
 * Common properties for ParameterDescriptor and FunctionTypeParameterDescriptor.
 */
export interface ParameterDescriptorBase {
  /**
   * The name of the parameter.
   */
  readonly name: string;

  /**
   * The type of the parameter.
   */
  readonly type?: Children;

  /**
   * The refkey for this parameter.
   */
  readonly refkey?: Refkey | Refkey[];

  /**
   * Whether the parameter is optional.
   */
  readonly optional?: boolean;

  /**
   * Arbitrary metadata for the parameter symbol.
   */
  readonly metadata?: Record<string, unknown>;

  /**
   * Documentation for the parameter.
   */
  readonly doc?: Children;
}

/**
 * Information for a TypeScript function parameter.
 */
export interface ParameterDescriptor extends ParameterDescriptorBase {
  /**
   * The default value of the parameter.
   */
  readonly default?: Children;
}
