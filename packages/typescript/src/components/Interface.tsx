import {
  Block,
  Children,
  MemberDeclaration,
  Name,
  OutputSymbolFlags,
  Refkey,
} from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";

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
    <Declaration {...props} nameKind="interface" flags={flags}>
      interface <Name />
      {extendsPart} <InterfaceExpression>{props.children}</InterfaceExpression>
    </Declaration>
  );
}

export interface InterfaceExpressionProps {
  children?: Children;
}

export function InterfaceExpression(props: InterfaceExpressionProps) {
  return <Block>{props.children}</Block>;
}

export interface InterfaceMemberProps {
  name?: string;
  indexer?: Children;
  type?: Children;
  children?: Children;
  optional?: boolean;
  readonly?: boolean;
  refkey?: Refkey;
}

/**
 * Create a TypeScript interface declaration.
 */
export function InterfaceMember(props: InterfaceMemberProps) {
  const namer = useTSNamePolicy();
  const name = namer.getName(props.name ?? "", "interface-member");

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
    const memberContent = (
      <>
        {readonly}
        {name}
        {optionality}: {type}
      </>
    );
    return props.refkey ?
        <MemberDeclaration static name={name} refkey={props.refkey}>
          {memberContent}
        </MemberDeclaration>
      : memberContent;
  }
}
