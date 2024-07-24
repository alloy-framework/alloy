import { Children, code } from "@alloy-js/core";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { useTSNamePolicy } from "../name-policy.js";

export interface InterfaceDeclarationProps extends DeclarationProps  {
  extends?: Children;
}

export function InterfaceDeclaration(props: InterfaceDeclarationProps) {
  const namer = useTSNamePolicy();
  const name = namer.getName(props.name, "interface");

  const extendsPart = props.extends ?
    <> extends {props.extends}</> :
    "";

  return <Declaration {...props} name={name}>
    interface {name}{extendsPart} <InterfaceExpression>
      {props.children}
    </InterfaceExpression>
  </Declaration>
}

export interface InterfaceExpressionProps {
  children?: Children;
}

export function InterfaceExpression(props: InterfaceExpressionProps) {
  return code`
    {
      ${props.children}
    }
  `;
}
export interface InterfaceMemberProps {
  name?: string;
  indexer?: Children;
  type?: Children;
  children?: Children;
}

export function InterfaceMember(props: InterfaceMemberProps) {
  const namer = useTSNamePolicy();
  const type = props.type ?? props.children;
  if (props.indexer) {
    return <>[{props.indexer}]: {type}</>
  } else {
    return <>{namer.getName(props.name!, "interface-member")}: {type}</>
  }
}