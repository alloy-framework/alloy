import { Refkey, Children } from "@alloy-js/core";

/**
 * Information for a TypeScript function parameter.
 */
export interface ParameterDescriptor {
  /**
   * The name of the parameter.
   */
  name: string;

  /**
   * The type of the parameter.
   */
  type?: Children;

  /**
   * The refkey for this parameter.
   */
  refkey?: Refkey;

  /**
   * The refkeys for this parameter.
   */
  refkeys?: Refkey[];

  /**
   * Whether the parameter is optional.
   */
  optional?: boolean;

  /**
   * Arbitrary metadata for the parameter symbol.
   */
  metadata?: Record<string, unknown>;

  /**
   * Documentation for the parameter. 
   */
  doc?: string;
}