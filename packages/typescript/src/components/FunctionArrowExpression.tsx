import {
  childrenArray,
  findKeyedChild,
  findUnkeyedChildren,
  Scope,
} from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { getCallSignatureProps } from "../utils.js";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
import { Declaration } from "./Declaration.jsx";
import {
  FunctionBody,
  functionBodyTag,
  FunctionParameters,
  functionParametersTag,
  FunctionTypeParameters,
  functionTypeParametersTag,
  getReturnType,
} from "./FunctionBase.jsx";

export interface FunctionArrowExpressionProps extends CallSignatureProps {
  async?: boolean;
  children?: Children;
}

/**
 * A TypeScript arrow function expression.
 *
 * @example
 * ```tsx
 * <FunctionExpression async parameters={[{ name: "a", type: "number" }, { name: "b", type: "number" }]}>
 *   return a + b;
 * <FunctionExpression>
 * ```
 * renders to
 * ```ts
 * async (a, b) => { return a + b; }
 * ```
 *
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
 *    {@link (FunctionArrowExpression:namespace).Parameters} or
 *    {@link (FunctionArrowExpression:namespace).TypeParameters} components.
 */
export function FunctionArrowExpression(props: FunctionArrowExpressionProps) {
  const children = childrenArray(() => props.children);
  const typeParametersChildren =
    findKeyedChild(children, functionTypeParametersTag) ?? undefined;
  const parametersChildren =
    findKeyedChild(children, functionParametersTag) ?? undefined;
  const bodyChildren = findKeyedChild(children, functionBodyTag) ?? undefined;
  const filteredChildren = findUnkeyedChildren(children);
  const returnType = getReturnType(props.returnType, { async: props.async });

  const sBody = bodyChildren ?? (
    <FunctionArrowExpression.Body>
      {filteredChildren}
    </FunctionArrowExpression.Body>
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
        <Scope kind="function">
          <CallSignature {...callSignatureProps} returnType={returnType} />
          {" => "}
          {sBody}
        </Scope>
      </Declaration>
    </>
  );
}

FunctionArrowExpression.TypeParameters = FunctionTypeParameters;
FunctionArrowExpression.Parameters = FunctionParameters;
FunctionArrowExpression.Body = FunctionBody;
