import {
  Block,
  Children,
  MemberScope,
  Name,
  OutputSymbolFlags,
  Refkey,
  Show,
  useMemberDeclaration,
  useMemberScope,
  Wrap,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import { JSDoc } from "./JSDoc.jsx";

import { TypeScriptContext } from "../context/ts-context.js";
import { MemberDeclaration } from "./MemberDeclaration.jsx";
import { PropertyName } from "./PropertyName.jsx";

export interface InterfaceDeclarationProps extends BaseDeclarationProps {
  extends?: Children;
}

/**
 * Create a TypeScript interface declaration.
 *
 * @remarks
 *
 * This component will declare a symbol for this interface. The `export` and
 * `default` boolean props determine whether and how this symbol is exported
 * from the package.
 */
export function InterfaceDeclaration(props: InterfaceDeclarationProps) {
  const extendsPart = props.extends ? <> extends {props.extends}</> : "";
  const flags = OutputSymbolFlags.StaticMemberContainer;

  return (
    <TypeScriptContext.Provider value={{ type: true }}>
      <Show when={Boolean(props.doc)}>
        <JSDoc children={props.doc} />
        <hbr />
      </Show>
      <Declaration {...props} nameKind="interface" flags={flags} kind="type">
        interface <Name />
        {extendsPart}{" "}
        <InterfaceExpression>{props.children}</InterfaceExpression>
      </Declaration>
    </TypeScriptContext.Provider>
  );
}

export interface InterfaceExpressionProps {
  children?: Children;
}

export function InterfaceExpression(props: InterfaceExpressionProps) {
  const parentMemberSym = useMemberDeclaration();

  if (parentMemberSym) {
    parentMemberSym.binder.addStaticMembersToSymbol(parentMemberSym);
  }
  return (
    <TypeScriptContext.Provider value={{ type: true }}>
      <group>
        <Wrap
          when={!!parentMemberSym}
          with={MemberScope}
          props={{ owner: parentMemberSym! }}
        >
          <Block>{props.children}</Block>
        </Wrap>
      </group>
    </TypeScriptContext.Provider>
  );
}

export interface InterfaceMemberProps {
  name?: string;
  indexer?: Children;
  type?: Children;
  children?: Children;
  optional?: boolean;
  readonly?: boolean;
  doc?: Children;
  refkey?: Refkey | Refkey[];
}

/**
 * Create a TypeScript interface member.
 *
 * An interface member can either provide a `name` prop to create a named
 * property, or an `indexer` prop to define an indexer for the interface.
 *
 * The type of the member can be provided either as the `type` prop or as the
 * children of the component.
 */
export function InterfaceMember(props: InterfaceMemberProps) {
  const type = props.type ?? props.children;
  const optionality = props.optional ? "?" : "";
  const readonly = props.readonly ? "readonly " : "";

  if (props.indexer) {
    return (
      <>
        [{props.indexer}]: {type}
      </>
    );
  } else {
    const namer = useTSNamePolicy();
    const name = namer.getName(props.name!, "interface-member");
    const memberScope = useMemberScope();

    if (memberScope) {
      return (
        <MemberDeclaration
          static
          exactName={name}
          kind="type"
          nameKind="interface-member"
          flags={OutputSymbolFlags.StaticMember}
          refkey={props.refkey}
        >
          <Show when={Boolean(props.doc)}>
            <JSDoc children={props.doc} />
            <hbr />
          </Show>
          {readonly}
          <PropertyName />
          {optionality}: {type}
        </MemberDeclaration>
      );
    } else {
      return (
        <>
          <Show when={Boolean(props.doc)}>
            <JSDoc children={props.doc} />
            <hbr />
          </Show>
          {readonly}
          <PropertyName name={name} />
          {optionality}: {type}
        </>
      );
    }
  }
}
