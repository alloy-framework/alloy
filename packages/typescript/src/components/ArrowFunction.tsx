import {
  childrenArray,
  findKeyedChild,
  findUnkeyedChildren,
  type Children,
} from "@alloy-js/core";
import { getCallSignatureProps } from "../utils.js";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
import {
  FunctionBody,
  FunctionParameters,
  getReturnType,
  TypeParameters,
} from "./FunctionBase.jsx";
import { LexicalScope } from "./LexicalScope.jsx";

export interface ArrowFunctionProps extends CallSignatureProps {
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
 *    {@link (ArrowFunction:namespace).Parameters} or
 *    {@link (ArrowFunction:namespace).TypeParameters} components.
 */
export function ArrowFunction(props: ArrowFunctionProps) {
  const children = childrenArray(() => props.children);
  const typeParametersChildren =
    findKeyedChild(children, TypeParameters.tag) ?? undefined;
  const parametersChildren =
    findKeyedChild(children, FunctionParameters.tag) ?? undefined;
  const bodyChildren = findKeyedChild(children, FunctionBody.tag) ?? undefined;
  const filteredChildren = findUnkeyedChildren(children);
  const returnType = getReturnType(props.returnType, { async: props.async });

  const sBody = bodyChildren ?? (
    <ArrowFunction.Body>{filteredChildren}</ArrowFunction.Body>
  );

  const asyncKwd = props.async ? "async " : "";

  const callSignatureProps = getCallSignatureProps(props, {
    parametersChildren,
    typeParametersChildren,
  });

  return (
    <>
      {asyncKwd}
      <LexicalScope>
        <CallSignature {...callSignatureProps} returnType={returnType} />
        {" => "}
        {sBody}
      </LexicalScope>
    </>
  );
}

ArrowFunction.TypeParameters = TypeParameters;
ArrowFunction.Parameters = FunctionParameters;
ArrowFunction.Body = FunctionBody;
