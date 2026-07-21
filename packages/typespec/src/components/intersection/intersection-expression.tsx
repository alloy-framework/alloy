import { Children, List } from "@alloy-js/core";

export interface IntersectionExpressionProps {
  /** The types to intersect. */
  types: Children[];
}

/**
 * A TypeSpec intersection expression.
 *
 * @example
 * ```tsx
 * <IntersectionExpression types={["Animal", "Pet"]} />
 * ```
 * This will produce:
 * ```typespec
 * Animal & Pet
 * ```
 */
export function IntersectionExpression(props: IntersectionExpressionProps) {
  return <List joiner=" & ">{props.types}</List>;
}
