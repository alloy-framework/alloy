import {
  Block,
  Children,
  MemberDeclaration,
  MemberName,
  Name,
  OutputSymbolFlags,
  Refkey,
  Scope,
  Show,
  splitProps,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { ParameterDescriptor } from "../parameter-descriptor.js";
import { createTSSymbol, TSOutputSymbol } from "../symbols/ts-output-symbol.js";
import { getCallSignatureProps } from "../utils.js";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
import { BaseDeclarationProps, Declaration } from "./Declaration.jsx";
import { FunctionDeclaration } from "./FunctionDeclaration.jsx";
import { JSDoc } from "./JSDoc.jsx";
import { JSDocParameters } from "./JSDocParam.jsx";
import { Prose } from "./Prose.jsx";

export interface ClassDeclarationProps extends BaseDeclarationProps {
  extends?: Children;
}

/**
 * Create a TypeScript class declaration.
 *
 * @remarks
 *
 * @example
 *
 * ```tsx
 * const myPetRefkey = refkey();
 * const Animal = refkey();
 * const staticMember = refkey();
 * const instanceMember = refkey();
 *
 * <ClassDeclaration name="Animal" refkey={Animal}>
 *   <ClassMember public static name="something" type="string" refkey={staticMember}>
 *     "hello"
 *   </ClassMember>
 *   <ClassMember public name="kind" type="string" />
 *   <ClassMember public name="name" type="string" refkey={instanceMember} />
 *   <ClassConstructor parameters="name: string">
 *     this.name = name;
 *   </ClassConstructor>
 * </ClassDeclaration>
 *
 * <VarDeclaration const name="myPet" refkey={myPetRefkey}>
 *   new {Animal}();
 * </VarDeclaration>
 *
 * {staticMember}; // Animal.something
 * <MemberReference path={[myPetRefkey, instanceMember]} /> // myPet.name
 * {member(myPetRefkey, instanceMember)} // other option?
 * ```
 */
export function ClassDeclaration(props: ClassDeclarationProps) {
  const extendsPart = props.extends && <> extends {props.extends}</>;
  const flags = OutputSymbolFlags.MemberContainer;

  return (
    <>
      <Show when={Boolean(props.doc)}>
        <JSDoc children={props.doc} />
        <hbr />
      </Show>
      <Declaration {...props} flags={flags} nameKind="class">
        class <Name />
        {extendsPart} <Block>{props.children}</Block>
      </Declaration>
    </>
  );
}

export interface ClassMemberProps {
  name: string;
  refkey?: Refkey;
  public?: boolean;
  private?: boolean;
  protected?: boolean;
  jsPrivate?: boolean;
  static?: boolean;
  children?: Children;
  doc?: Children;
}

export function ClassMember(props: ClassMemberProps) {
  let sym: TSOutputSymbol | undefined;
  const namer = useTSNamePolicy();
  let name = namer.getName(props.name, "class-member-data");

  if (props.refkey) {
    let flags = OutputSymbolFlags.None;
    if (props.static) {
      flags |= OutputSymbolFlags.StaticMember;
    } else {
      flags |= OutputSymbolFlags.InstanceMember;
    }

    sym = createTSSymbol({
      name: props.jsPrivate ? `#${name}` : name,
      refkey: props.refkey,
      flags,
    });
  } else if (props.jsPrivate) {
    // we won't be using the symbol name, so munge the name
    name = `#${name}`;
  }

  return (
    <>
      <Show when={Boolean(props.doc)}>
        <JSDoc children={props.doc} />
        <hbr />
      </Show>
      <MemberDeclaration symbol={sym} name={name} refkey={props.refkey}>
        {props.public && "public "}
        {props.private && "private "}
        {props.protected && "protected "}
        {props.static && "static "}
        {props.children}
      </MemberDeclaration>
    </>
  );
}

export interface ClassFieldProps extends ClassMemberProps {
  type?: Children;
  children?: Children;
}

export function ClassField(props: ClassFieldProps) {
  const typeSection = props.type && <>: {props.type}</>;
  const initializerSection = props.children && <> = {props.children}</>;

  return (
    <ClassMember {...props}>
      <MemberName />
      {typeSection}
      {initializerSection}
    </ClassMember>
  );
}

export interface ClassMethodProps extends ClassMemberProps, CallSignatureProps {
  async?: boolean;
  children?: Children;
}

export function ClassMethod(props: ClassMethodProps) {
  const callProps = getCallSignatureProps(props);
  const returnType = props.returnType && <>: {props.returnType}</>;
  const [_, rest] = splitProps(props, ["doc"]);


  return (
    <>
      <Show when={Boolean(props.doc)}>
        <JSDoc>
          {props.doc && <Prose children={props.doc} />}
          {Array.isArray(rest.parameters) && (
            <JSDocParameters parameters={rest.parameters} />
          )}
        </JSDoc>
        <hbr />
      </Show>
      <ClassMember {...rest}>
      {props.async && "async "}
      <MemberName />
      <Scope name={props.name} kind="function">
        <CallSignature {...callProps} /> <Block>{props.children}</Block>
      </Scope>
    </ClassMember>
    </>
  );
}
