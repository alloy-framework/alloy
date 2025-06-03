import {
  childrenArray,
  findKeyedChild,
  findUnkeyedChildren,
  Scope,
  type Children,
} from "@alloy-js/core";
import { getCallSignatureProps } from "../utils.js";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
import { Declaration } from "./Declaration.jsx";
import {
  FunctionBody,
  FunctionParameters,
  getReturnType,
  TypeParameters,
} from "./FunctionBase.jsx";

export interface FunctionExpressionProps extends CallSignatureProps {
  async?: boolean;
  children?: Children;
}

/**
 * A TypeScript function expression.
 *
 * @example
 * ```tsx
 * <FunctionExpression async parameters={[{ name: "a", type: "number" }, { name: "b", type: "number" }]}>
 *   return a + b;
 * <FunctionExpression>
 * ```
 * renders to
 * ```ts
 * async function (a, b) { return a + b; }
 * ```
 * @remarks
 *
 * Providing parameters and type parameters can be accomplished in one of three
 * ways:
 *
 * 1. As an array of {@link ParameterDescriptor}s or
 *    {@link TypeParameterDescriptor}s.
 * 2. As raw content via the `parametersChildren` or `typeParametersChildren`
 *    props.
 * 3. As a child of this component via the
 *    {@link (FunctionExpression:namespace).Parameters} or
 *    {@link (FunctionExpression:namespace).TypeParameters} components.
 */
export function FunctionExpression(props: FunctionExpressionProps) {
  const children = childrenArray(() => props.children);
  const typeParametersChildren =
    findKeyedChild(children, TypeParameters.tag) ?? undefined;
  const parametersChildren =
    findKeyedChild(children, FunctionParameters.tag) ?? undefined;
  const bodyChildren = findKeyedChild(children, FunctionBody.tag) ?? undefined;
  const filteredChildren = findUnkeyedChildren(children);
  const returnType = getReturnType(props.returnType, { async: props.async });

  const sBody = bodyChildren ?? (
    <FunctionExpression.Body>{filteredChildren}</FunctionExpression.Body>
  );

  const asyncKwd = props.async ? "async " : "";

  const callSignatureProps = getCallSignatureProps(props, {
    parametersChildren,
    typeParametersChildren,
  });

  return (
    <>
      <Declaration {...props} nameKind="function">
        {asyncKwd}
        {"function "}
        <Scope kind="function">
          <CallSignature {...callSignatureProps} returnType={returnType} />{" "}
          {sBody}
        </Scope>
      </Declaration>
    </>
  );
}

FunctionExpression.TypeParameters = TypeParameters;
FunctionExpression.Parameters = FunctionParameters;
FunctionExpression.Body = FunctionBody;
