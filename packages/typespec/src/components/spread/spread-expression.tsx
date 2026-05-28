import { Children } from "@alloy-js/core";

export interface SpreadExpressionProps {
  /** The type or model to spread. */
  type: Children;
}

/**
 * A TypeSpec spread expression (`...Type`), used inside model or enum
 * declarations to copy members from another type.
 *
 * @example
 * ```tsx
 * <ModelDeclaration name="Dog">
 *   <SpreadExpression type={<Reference refkey={animalKey} />} />
 * </ModelDeclaration>
 * ```
 * This will produce:
 * ```typespec
 * model Dog {
 *   ...Animal
 * }
 * ```
 */
export function SpreadExpression(props: SpreadExpressionProps) {
  return <>...{props.type}</>;
}
