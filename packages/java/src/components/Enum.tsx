import { Declaration, DeclarationProps } from "./Declaration.js";
import { Children, code, Scope } from "@alloy-js/core";
import { useJavaNamePolicy } from "../name-policy.js";
import { AccessModifier, collectAccessModifier, collectModifiers, ObjectModifiers } from "../object-modifiers.js";
import { Name } from "./Name.js";
import { collectArguments } from "../arguments.js";

export interface EnumProps extends DeclarationProps, ObjectModifiers {
  accessModifier?: AccessModifier;
  implements?: Children;
}

export function Enum(props: EnumProps) {
  const name = useJavaNamePolicy().getName(props.name, "enum");
  const collectedInterfaces = collectArguments(props.implements);
  const implementsExpression = props.implements ? code` implements ${collectedInterfaces}` : "";
  const modifiers = collectModifiers(props);
  return (
    <Declaration {...props} name={name}>
      {collectAccessModifier(props.accessModifier)}{modifiers}enum <Name />{implementsExpression} {"{"}
        <Scope name={name} kind="enum">
          {props.children}
        </Scope>
      {"}"}
    </Declaration>
  );
}

export interface EnumMemberProps extends ObjectModifiers {
  name: string;
  arguments?: Children;
}

export function EnumMember(props: EnumMemberProps) {
  const collectedArgs = collectArguments(props.arguments);
  const args = props.arguments ? code`(${collectedArgs})` : "";
  const name = useJavaNamePolicy().getName(props.name, "enum-member");

  return code`${name}${args}`;
}