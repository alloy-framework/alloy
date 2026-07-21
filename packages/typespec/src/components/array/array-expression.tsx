import { Children } from "@alloy-js/core";

export interface ArrayExpressionProps {
  /** The element type of the array. */
  type: Children;
}

/**
 * A TypeSpec array type expression using bracket syntax.
 *
 * @example
 * ```tsx
 * <ArrayExpression type="string" />
 * ```
 * This will produce:
 * ```typespec
 * string[]
 * ```
 */
export function ArrayExpression(props: ArrayExpressionProps) {
  return <>{props.type}[]</>;
}
