import {
  Block,
  Children,
  MemberDeclaration,
  Name,
  Prose,
  Refkey,
  Show,
  splitProps,
} from "@alloy-js/core";

import { useTSNamePolicy } from "../name-policy.js";
import {
  createMemberSymbol,
  createTypeAndValueSymbol,
} from "../symbols/index.js";
import { TSSymbolFlags } from "../symbols/ts-output-symbol.js";
import { getCallSignatureProps } from "../utils.js";
import { CallSignature, CallSignatureProps } from "./CallSignature.jsx";
import { BaseDeclarationProps, Declaration } from "./Declaration.jsx";
import { JSDoc } from "./JSDoc.jsx";
import { JSDocParams } from "./JSDocParam.jsx";
import { LexicalScope } from "./LexicalScope.jsx";
import { MemberScope } from "./MemberScope.jsx";
import { PropertyName } from "./PropertyName.jsx";
import { TypeRefContext } from "./TypeRefContext.jsx";

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
  const name = namePolicy.getName(props.name!, "class");

  const extendsPart = props.extends && <> extends {props.extends}</>;
  const sym = createTypeAndValueSymbol(name, {
    refkeys: props.refkey,
    export: props.export,
    default: props.default,
    metadata: props.metadata,
    hasInstanceMembers: true,
  });

  return (
    <>
      <Show when={Boolean(props.doc)}>
        <JSDoc children={props.doc} />
        <hbr />
      </Show>
      <Declaration symbol={sym} export={props.export} default={props.default}>
        <MemberScope ownerSymbol={sym}>
          class <Name />
          {extendsPart} <Block>{props.children}</Block>
        </MemberScope>
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
  nullish?: boolean;
}

export function ClassMember(props: ClassMemberProps) {
  const namer = useTSNamePolicy();
  const name = namer.getName(props.name, "class-member-data");

  let tsFlags = TSSymbolFlags.None;
  if (props.nullish) {
    tsFlags |= TSSymbolFlags.Nullish;
  }

  const sym = createMemberSymbol(name, props, {
    refkeys: props.refkey,
    tsFlags,
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
  optional?: boolean;
  children?: Children;
}

export function ClassField(props: ClassFieldProps) {
  const optionality = props.optional ? "?" : "";
  const typeSection = props.type && (
    <>
      {optionality}: <TypeRefContext>{props.type}</TypeRefContext>
    </>
  );
  const initializerSection = props.children && <> = {props.children}</>;
  const nullish = props.nullish ?? props.optional;

  return (
    <ClassMember {...props} nullish={nullish}>
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
        <LexicalScope name={props.name}>
          <CallSignature {...callProps} /> <Block>{props.children}</Block>
        </LexicalScope>
      </ClassMember>
    </>
  );
}
