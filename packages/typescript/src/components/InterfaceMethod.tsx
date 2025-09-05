import {
  childrenArray,
  findKeyedChild,
  MemberName,
  Namekey,
  Prose,
  Refkey,
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
import { MemberDeclaration } from "./MemberDeclaration.jsx";

/** Props for {@link (InterfaceMethod:namespace)} component */
export interface InterfaceMethodProps extends CallSignatureProps {
  /** Interface member name */
  readonly name: string | Namekey;
  /** If the method is async. It will change the returnType from `T` to `Promise<T>` */
  readonly async?: boolean;
  /** Documentation for this method. */
  readonly doc?: Children;
  /** Jsx content */
  readonly children?: Children;
  /** Ref key for the member declaration */
  readonly refkey?: Refkey | Refkey[];
}

/**
 * An interface method declaration.
 *
 * @example
 * ```ts
 * (foo: string, bar: number) => void
 * ```
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
      <MemberDeclaration
        static
        {...props}
        refkey={props.refkey}
        nameKind="interface-member"
      >
        <MemberName />
        <LexicalScope>
          <CallSignature {...callSignatureProps} returnType={returnType} />
        </LexicalScope>
      </MemberDeclaration>
    </>
  );
}

InterfaceMethod.TypeParameters = TypeParameters;
InterfaceMethod.Parameters = FunctionTypeParameters;
