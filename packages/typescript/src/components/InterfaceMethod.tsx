import {
  childrenArray,
  findKeyedChild,
  Name,
  Prose,
  Scope,
  Show,
} from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { getCallSignatureProps } from "../utils.js";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
import { Declaration } from "./Declaration.jsx";
import {
  FunctionParameters,
  FunctionTypeParameters,
  getReturnType,
  TypeFunctionParameters,
} from "./FunctionBase.jsx";
import { JSDoc } from "./JSDoc.jsx";
import { JSDocParams } from "./JSDocParam.jsx";

export interface InterfaceMethodProps extends CallSignatureProps {
  /** Interface member name */
  readonly name: string;
  /** If the method is async */
  readonly async?: boolean;
  /** Documentation for this method. */
  readonly doc?: Children;
  readonly children?: Children;
}

/**
 * A TypeScript function declaration.
 *
 * @remarks
 *
 * Providing parameters and type parameters can be accomplished in one of three
 * ways:
 *
 * 1. As an array of {@link TypeParameterDescriptor}s or
 *    {@link TypeParameterDescriptor}s.
 * 2. As raw content via the `parametersChildren` or `typeParametersChildren`
 *    props.
 * 3. As a child of this component via the
 *    {@link (InterfaceMethod:namespace).Parameters} or
 *    {@link (InterfaceMethod:namespace).TypeParameters} components.
 */
export function InterfaceMethod(props: InterfaceMethodProps) {
  const children = childrenArray(() => props.children);
  const typeParametersChildren =
    findKeyedChild(children, FunctionTypeParameters.tag) ?? undefined;
  const parametersChildren =
    findKeyedChild(children, FunctionParameters.tag) ?? undefined;
  const returnType = getReturnType(props.returnType ?? "void", {
    async: props.async,
  });

  const asyncKwd = props.async ? "async " : "";

  const callSignatureProps = getCallSignatureProps(props, {
    parametersChildren,
    typeParametersChildren,
  });

  return (
    <>
      <Show when={Boolean(props.doc)}>
        <JSDoc>
          {props.doc && <Prose children={props.doc} />}
          {Array.isArray(props.parameters) && (
            <JSDocParams parameters={props.parameters} />
          )}
        </JSDoc>
        <hbr />
      </Show>
      <Declaration {...props} nameKind="function">
        {asyncKwd}
        <Name />
        <Scope name={props.name} kind="function">
          <CallSignature {...callSignatureProps} returnType={returnType} />
        </Scope>
      </Declaration>
    </>
  );
}

InterfaceMethod.TypeParameters = FunctionTypeParameters;
InterfaceMethod.Parameters = TypeFunctionParameters;
