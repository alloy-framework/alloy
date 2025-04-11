import {
  childrenArray,
  findKeyedChild,
  Prose,
  Scope,
  Show,
} from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { CallSignatureProps } from "./CallSignature.jsx";
import { Declaration } from "./Declaration.jsx";
import {
  FunctionParameters,
  FunctionTypeParameters,
  getReturnType,
  TypeFunctionParameters,
} from "./FunctionBase.jsx";
import { FunctionDeclaration } from "./FunctionDeclaration.jsx";
import { JSDoc } from "./JSDoc.jsx";
import { JSDocParams } from "./JSDocParam.jsx";

/** Define a TypeScript type function
 *
 * @example `(foo: string, bar: number) => void`
 */
export interface TypeFunctionProps extends CallSignatureProps {
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
 *    {@link (TypeFunction:namespace).Parameters} or
 *    {@link (TypeFunction:namespace).TypeParameters} components.
 */
export function TypeFunction(props: TypeFunctionProps) {
  const children = childrenArray(() => props.children);
  const typeParametersChildren =
    findKeyedChild(children, FunctionTypeParameters.tag) ?? undefined;
  const parametersChildren =
    findKeyedChild(children, FunctionParameters.tag) ?? undefined;
  const returnType = getReturnType(props.returnType ?? "void", {
    async: props.async,
  });

  const asyncKwd = props.async ? "async " : "";
  const sTypeParameters =
    typeParametersChildren ?
      <>
        {"<"}
        {typeParametersChildren}
        {">"}
      </>
    : <FunctionDeclaration.TypeParameters parameters={props.typeParameters} />;
  const sParams = props.parametersChildren ?? (
    <FunctionDeclaration.Parameters parameters={props.parameters} />
  );

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
        <Scope kind="function">
          {sTypeParameters}({sParams}){" => "}
          {returnType}
        </Scope>
      </Declaration>
    </>
  );
}

TypeFunction.TypeParameters = FunctionTypeParameters;
TypeFunction.Parameters = TypeFunctionParameters;
