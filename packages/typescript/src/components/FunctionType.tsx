import {
  childrenArray,
  findKeyedChild,
  Prose,
  Show,
  type Children,
} from "@alloy-js/core";
import { getCallSignatureProps } from "../utils.js";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
import {
  FunctionParameters,
  FunctionTypeParameters,
  getReturnType,
  TypeParameters,
} from "./FunctionBase.jsx";
import { JSDoc } from "./JSDoc.jsx";
import { JSDocParams } from "./JSDocParam.jsx";
import { LexicalScope } from "./LexicalScope.jsx";
import { ensureTypeRefContext } from "./TypeRefContext.jsx";

/**
 * Options for {@link FunctionType} component.
 */
export interface FunctionTypeProps extends CallSignatureProps {
  /** If the method is async */
  readonly async?: boolean;
  /** Documentation for this method. */
  readonly doc?: Children;
  /** Jsx content */
  readonly children?: Children;
}

const FunctionTypeComponent = ensureTypeRefContext(
  (props: FunctionTypeProps) => {
    const children = childrenArray(() => props.children);
    const typeParametersChildren =
      findKeyedChild(children, TypeParameters.tag) ?? undefined;
    const parametersChildren =
      findKeyedChild(children, FunctionParameters.tag) ?? undefined;
    const returnType = getReturnType(props.returnType ?? "void", {
      async: props.async,
    });

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
        <LexicalScope>
          <CallSignature {...callSignatureProps} returnType={null} />
          {" => "}
          {returnType}
        </LexicalScope>
      </>
    );
  },
);

/**
 * A TypeScript function declaration.
 *
 * @example
 * ```ts
 * (foo: string, bar: number) => void
 * ```
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
 *    {@link FunctionType.Parameters} or
 *    {@link FunctionType.TypeParameters} components.
 */
export const FunctionType = Object.assign(FunctionTypeComponent, {
  TypeParameters,
  Parameters: FunctionTypeParameters,
});
