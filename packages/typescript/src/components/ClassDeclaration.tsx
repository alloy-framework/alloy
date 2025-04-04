import {
  Block,
  Children,
  MemberDeclaration,
  Name,
  OutputSymbolFlags,
  Refkey,
  Scope,
  Show,
  splitProps,
  useMemberScope,
} from "@alloy-js/core";
import { usePrivateScope } from "../context/private-scope.js";
import { useTSNamePolicy } from "../name-policy.js";
import { TSOutputScope } from "../symbols/scopes.js";
import { createTSSymbol, TSSymbolFlags } from "../symbols/ts-output-symbol.js";
import { getCallSignatureProps } from "../utils.js";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
import { BaseDeclarationProps, Declaration } from "./Declaration.jsx";
import { JSDoc } from "./JSDoc.jsx";
import { JSDocParams } from "./JSDocParam.jsx";
import { PropertyName } from "./PropertyName.jsx";
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
  const namePolicy = useTSNamePolicy();
  const extendsPart = props.extends && <> extends {props.extends}</>;

  const sym = createTSSymbol({
    name: namePolicy.getName(props.name!, "class"),
    refkey: props.refkey,
    export: props.export,
    default: props.default,
    flags:
      (props.flags ?? OutputSymbolFlags.None) |
      (OutputSymbolFlags.MemberContainer |
        OutputSymbolFlags.StaticMemberContainer),
    tsFlags: TSSymbolFlags.PrivateMemberContainer,
    metadata: props.metadata,
  });

  return (
    <>
      <Show when={Boolean(props.doc)}>
        <JSDoc children={props.doc} />
        <hbr />
      </Show>
      <Declaration symbol={sym} export={props.export} default={props.default}>
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
  const namer = useTSNamePolicy();
  const name = namer.getName(props.name, "class-member-data");

  let flags = OutputSymbolFlags.None;

  if (props.static) {
    flags |= OutputSymbolFlags.StaticMember;
  } else {
    flags |= OutputSymbolFlags.InstanceMember;
  }

  let scope: TSOutputScope;
  if (props.jsPrivate) {
    const memberScope = usePrivateScope()!;
    scope =
      props.static ? memberScope.staticMembers : memberScope.instanceMembers;
  } else {
    const memberScope = useMemberScope();
    scope = (
      props.static ?
        memberScope.staticMembers!
      : memberScope.instanceMembers!) as TSOutputScope;
  }

  const sym = createTSSymbol({
    name,
    scope,
    refkey: props.refkey,
    flags,
    tsFlags: props.jsPrivate ? TSSymbolFlags.PrivateMember : TSSymbolFlags.None,
  });

  return (
    <>
      <Show when={Boolean(props.doc)}>
        <JSDoc children={props.doc} />
        <hbr />
      </Show>
      <MemberDeclaration symbol={sym}>
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
      <PropertyName />
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
  const [_, rest] = splitProps(props, ["doc"]);

  return (
    <>
      <Show when={Boolean(props.doc)}>
        <JSDoc>
          {props.doc && <Prose children={props.doc} />}
          {Array.isArray(rest.parameters) && (
            <JSDocParams parameters={rest.parameters} />
          )}
        </JSDoc>
        <hbr />
      </Show>
      <ClassMember {...rest}>
        {props.async && "async "}
        <PropertyName />
        <Scope name={props.name} kind="function">
          <CallSignature {...callProps} /> <Block>{props.children}</Block>
        </Scope>
      </ClassMember>
    </>
  );
}
