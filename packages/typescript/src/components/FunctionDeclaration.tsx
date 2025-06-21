import {
  childrenArray,
  findKeyedChild,
  findUnkeyedChildren,
  Name,
  Prose,
  Show,
  type Children,
} from "@alloy-js/core";
import { getCallSignatureProps } from "../utils.js";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import {
  FunctionBody,
  FunctionParameters,
  getReturnType,
  TypeParameters,
} from "./FunctionBase.jsx";
import { JSDoc } from "./JSDoc.jsx";
import { JSDocParams } from "./JSDocParam.jsx";
import { LexicalScope } from "./LexicalScope.jsx";

export interface FunctionDeclarationProps
  extends BaseDeclarationProps,
    CallSignatureProps {
  async?: boolean;
  children?: Children;
}

/**
 * A TypeScript function declaration.
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
 *    {@link (FunctionDeclaration:namespace).Parameters} or
 *    {@link (FunctionDeclaration:namespace).TypeParameters} components.
 */
export function FunctionDeclaration(props: FunctionDeclarationProps) {
  const children = childrenArray(() => props.children);
  const typeParametersChildren =
    findKeyedChild(children, TypeParameters.tag) ?? undefined;
  const parametersChildren =
    findKeyedChild(children, FunctionParameters.tag) ?? undefined;
  const bodyChildren = findKeyedChild(children, FunctionBody.tag) ?? undefined;
  const filteredChildren = findUnkeyedChildren(children);
  const returnType = getReturnType(props.returnType, { async: props.async });

  const sBody = bodyChildren ?? (
    <FunctionDeclaration.Body>{filteredChildren}</FunctionDeclaration.Body>
  );

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
        {asyncKwd}function <Name />
        <LexicalScope name={props.name}>
          <CallSignature {...callSignatureProps} returnType={returnType} />{" "}
          {sBody}
        </LexicalScope>
      </Declaration>
    </>
  );
}

FunctionDeclaration.TypeParameters = TypeParameters;
FunctionDeclaration.Parameters = FunctionParameters;
FunctionDeclaration.Body = FunctionBody;
