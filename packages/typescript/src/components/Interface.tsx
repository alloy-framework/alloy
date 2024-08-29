import { Children, code } from "@alloy-js/core";
import { useTSNamePolicy } from "../name-policy.js";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { Name } from "./Name.js";

export interface InterfaceDeclarationProps
  extends Omit<DeclarationProps, "nameKind"> {
  extends?: Children;
}

export function InterfaceDeclaration(props: InterfaceDeclarationProps) {
  const extendsPart = props.extends ? <> extends {props.extends}</> : "";

  return <Declaration {...props} nameKind="interface">
    interface <Name />{extendsPart} <InterfaceExpression>
      {props.children}
    </InterfaceExpression>
  </Declaration>;
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
  optional?: boolean;
  readonly?: boolean;
}

export function InterfaceMember(props: InterfaceMemberProps) {
  const namer = useTSNamePolicy();
  const type = props.type ?? props.children;
  const optionality = props.optional ? "?" : "";
  const readonly = props.readonly ? "readonly " : "";
  if (props.indexer) {
    return <>[{props.indexer}]: {type}</>;
  } else {
    return <>{readonly}{namer.getName(props.name!, "interface-member")}{optionality}: {type}</>;
  }
}
