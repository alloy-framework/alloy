import { AccessModifier } from "../access-modifier.js";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { Child, Children, code, Indent, Scope } from "@alloy-js/core";
import { useJavaNamePolicy } from "../name-policy.js";
import { collectModifiers, ObjectModifiers } from "../object-modifiers.js";
import { Name } from "./Name.js";

export interface EnumProps extends DeclarationProps, ObjectModifiers {
  accessModifier?: AccessModifier;
  implements?: Children;
}

export function Enum(props: EnumProps) {
  const name = useJavaNamePolicy().getName(props.name, "enum");
  const collectedInterfaces = Array.isArray(props.implements) ? props.implements.join(", ") : props.implements;
  const implementsExpression = props.implements ? ` implements ${collectedInterfaces}` : "";
  const modifiers = collectModifiers(props);
  return (
    <Declaration {...props} name={name}>
      {props.accessModifier}{modifiers}enum <Name />{implementsExpression} {"{"}
        <Scope name={name} kind="enum">
          {props.children}
        </Scope>
      {"}"}
    </Declaration>
  );
}

export interface EnumMemberProps extends ObjectModifiers {
  name: string;
  arguments?: Child[];
}

export function EnumMember(props: EnumMemberProps) {
  const args = props.arguments ? `(${props.arguments.join(", ")})` : "";
  const name = useJavaNamePolicy().getName(props.name, "enum-member");

  return code`${name}${args}`
}