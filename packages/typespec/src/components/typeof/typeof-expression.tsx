import { Children } from "@alloy-js/core";

export interface TypeOfExpressionProps {
  /** The value reference to extract the type from. */
  value: Children;
}

/**
 * A TypeSpec `typeof` expression that extracts the type of a value.
 *
 * @example
 * ```tsx
 * <TypeOfExpression value="someConst" />
 * ```
 * This will produce:
 * ```typespec
 * typeof someConst
 * ```
 */
export function TypeOfExpression(props: TypeOfExpressionProps) {
  return <>typeof {props.value}</>;
}
