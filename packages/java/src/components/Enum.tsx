import { Children, code, Scope } from "@alloy-js/core";
import { useJavaNamePolicy } from "../name-policy.js";
import { ArgumentList } from "./ArgumentList.jsx";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { ModifierProps, Modifiers } from "./Modifiers.jsx";
import { Name } from "./Name.js";

export interface EnumProps extends DeclarationProps, ModifierProps {
  implements?: Children[];
}

export function Enum(props: EnumProps) {
  const name = useJavaNamePolicy().getName(props.name, "enum");
  const collectedInterfaces = <ArgumentList args={props.implements} />;
  const implementsExpression =
    props.implements ? code` implements ${collectedInterfaces}` : "";
  const modifiers = <Modifiers {...props} />;

  return (
    <Declaration {...props} name={name}>
      {modifiers}enum <Name />
      {implementsExpression} {"{"}
      <Scope kind="enum">{props.children}</Scope>
      {"}"}
    </Declaration>
  );
}

export interface EnumMemberProps extends ModifierProps {
  name: string;
  arguments?: Children[];
}

export function EnumMember(props: EnumMemberProps) {
  const collectedArgs = <ArgumentList args={props.arguments} />;
  const args = props.arguments ? code`(${collectedArgs})` : "";
  const name = useJavaNamePolicy().getName(props.name, "enum-member");

  return code`${name}${args}`;
}
