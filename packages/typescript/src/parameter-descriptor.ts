import { Children, Refkey } from "@alloy-js/core";

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
   * The default value of the parameter.
   */
  default?: Children;

  /**
   * The refkey for this parameter.
   */
  refkey?: Refkey | Refkey[];

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
  doc?: Children;
}

/**
 * Information for a TypeScript generic type parameter.
 */
export interface TypeParameterDescriptor {
  /**
   * The name of the type parameter.
   */
  name: string;

  /**
   * The extends constraint for the type parameter.
   */
  extends?: Children;

  /**
   * The default type of the type parameter.
   */
  default?: Children;

  /**
   * A refkey or array of refkeys for this type parameter.
   */
  refkey?: Refkey | Refkey[];

  /**
   * Arbitrary metadata for the type parameter symbol.
   */
  metadata?: Record<string, unknown>;
}
