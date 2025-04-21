import { Children, Refkey } from "@alloy-js/core";

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
   * Whether the parameter is can be null or undefined.
   * when optional is true, this will be set to true by default,
   * but explicitly setting this to false will override that.
   */
  readonly nullish?: boolean;

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

/**
 * Information for a TypeScript type function parameter.
 */
export interface FunctionTypeParameterDescriptor
  extends ParameterDescriptorBase {}

/**
 * Information for a TypeScript generic type parameter.
 */
export interface TypeParameterDescriptor {
  /**
   * The name of the type parameter.
   */
  readonly name: string;

  /**
   * The extends constraint for the type parameter.
   */
  readonly extends?: Children;

  /**
   * The default type of the type parameter.
   */
  readonly default?: Children;

  /**
   * A refkey or array of refkeys for this type parameter.
   */
  readonly refkey?: Refkey | Refkey[];

  /**
   * Arbitrary metadata for the type parameter symbol.
   */
  readonly metadata?: Record<string, unknown>;
}
