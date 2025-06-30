import {
  childrenArray,
  findKeyedChild,
  findUnkeyedChildren,
  memo,
  Name,
  OutputSymbolFlags,
  Scope,
  useContext,
  type Children,
} from "@alloy-js/core";
import { getCallSignatureProps } from "../utils.js";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import { FunctionBody, FunctionParameters } from "./FunctionBase.jsx";
import { SourceFileContext } from "./SourceFile.js";
import { usePythonNamePolicy } from "../name-policy.js";
import { PythonOutputSymbol } from "../symbols/index.js";

export interface FunctionDeclarationProps
  extends BaseDeclarationProps,
    CallSignatureProps {
  async?: boolean;
  instanceFunction?: boolean; // true if this is an instance method
  classFunction?: boolean; // true if this is a class method
  forceName?: boolean; // if true, the name will not be transformed by the name policy
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
 * 1. As an array of {@link ParameterDescriptor}s.
 * 2. As raw content via the `parametersChildren`.
 * 3. As a child of this component via the
 *    {@link (FunctionDeclaration:namespace).Parameters} components.
 */
export function FunctionDeclaration(props: FunctionDeclarationProps) {
  const children = childrenArray(() => props.children);
  const parametersChildren =
    findKeyedChild(children, FunctionParameters.tag) ?? undefined;
  const bodyChildren = findKeyedChild(children, FunctionBody.tag) ?? undefined;
  const filteredChildren = findUnkeyedChildren(children);
  const returnType = props.returnType;

  const sBody = bodyChildren ?? (
    <FunctionDeclaration.Body>
      {children.length > 0 ? filteredChildren : "pass"}
    </FunctionDeclaration.Body>
  );

  const asyncKwd = props.async ? "async " : "";

  let sym: PythonOutputSymbol | undefined = undefined;
  if (props.forceName) {
    const sfContext = useContext(SourceFileContext);
    const module = sfContext?.module;
    const name = props.name;
    // Due to forceName, we have to create the symbol here so the name policy isn't applied
    // at the Declaration class
    sym = new PythonOutputSymbol(name, {
      refkeys: props.refkey,
      flags:
        (props.flags ?? OutputSymbolFlags.None) |
        OutputSymbolFlags.MemberContainer,
      metadata: props.metadata,
      module: module,
    });
  }

  const callSignatureProps = getCallSignatureProps(props, {
    parametersChildren,
  });

  return (
    <>
      <Declaration {...props} nameKind="function" symbol={sym}>
        {asyncKwd}def <Name />
        <Scope name={props.name} kind="function">
          <CallSignature {...callSignatureProps} returnType={returnType} />
          {":"}
          {sBody}
        </Scope>
      </Declaration>
    </>
  );
}

FunctionDeclaration.Parameters = FunctionParameters;
FunctionDeclaration.Body = FunctionBody;


export function InitFunctionDeclaration(
  props: Omit<
    FunctionDeclarationProps,
    "name" | "instanceFunction" | "classFunction"
  >,
) {
  return (
    <FunctionDeclaration
      {...props}
      name="__init__"
      instanceFunction={true}
      classFunction={false}
      forceName={true}
    />
  );
}