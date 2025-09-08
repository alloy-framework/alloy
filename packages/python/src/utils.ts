import { defaultProps, splitProps } from "@alloy-js/core";
import {
  CallSignatureProps,
  SingleTypeExpression,
  TypeExpressionProps,
  UnionTypeExpression,
  UnionTypeExpressionProps,
} from "./components/index.js";

/**
 * Extract only the call signature props from a props object which extends
 * `CallSignatureProps`. You can provide default values for the props.
 */
export function getCallSignatureProps(
  props: CallSignatureProps,
  defaults?: Partial<CallSignatureProps>,
) {
  const [callSignatureProps] = splitProps(props, [
    "parameters",
    "typeParameters",
    "args",
    "kwargs",
    "instanceFunction",
    "classFunction",
    "returnType",
  ]);

  if (!defaults) {
    return callSignatureProps;
  }

  return defaultProps(callSignatureProps, defaults);
}

export function isUnionTypeProps(
  typeProps: TypeExpressionProps,
): typeProps is UnionTypeExpressionProps {
  if (Array.isArray(typeProps.children)) {
    // Check if this is a true union type by seeing if first element has children property
    // It could also be a single type expression with a code template array, but we don't want to treat that as a union type.
    const firstChild = typeProps.children[0];
    return Boolean(
      firstChild &&
        typeof firstChild === "object" &&
        firstChild !== null &&
        "children" in firstChild,
    );
  }
  return false;
}

export function resolveTypeExpression(typeProps: TypeExpressionProps) {
  return isUnionTypeProps(typeProps) ?
      UnionTypeExpression(typeProps)
    : SingleTypeExpression(typeProps);
}
