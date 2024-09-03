import {
  Children,
  code,
  memo,
  Scope,
  useBinder,
  useScope,
} from "@alloy-js/core";
import { collectArguments } from "../arguments.js";
import { useJavaNamePolicy } from "../name-policy.js";
import { collectModifiers, ObjectModifiers } from "../object-modifiers.js";
import { createJavaEnumScope, JavaEnumScope } from "../symbols/index.js";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { Name } from "./Name.js";

export interface EnumProps extends DeclarationProps, ObjectModifiers {
  implements?: Children;
}

export function Enum(props: EnumProps) {
  const name = useJavaNamePolicy().getName(props.name, "enum");
  const collectedInterfaces = collectArguments(props.implements);
  const implementsExpression = props.implements ?
    code` implements ${collectedInterfaces}`
  : "";
  const modifiers = collectModifiers(props);

  const scope = createJavaEnumScope(useBinder(), useScope(), name);

  return <Declaration {...props} name={name}>
      {modifiers}enum <Name />{implementsExpression} {"{"}
        <Scope value={scope}>
          {props.children}
        </Scope>
      {"}"}
    </Declaration>;
}

export interface EnumMemberProps extends ObjectModifiers {
  name: string;
  arguments?: Children;
}

export function EnumMember(props: EnumMemberProps) {
  const enumScope = useScope() as JavaEnumScope;

  const collectedArgs = collectArguments(props.arguments);
  const args = props.arguments ? code`(${collectedArgs})` : "";
  const name = useJavaNamePolicy().getName(props.name, "enum-member");

  // Handle position in enum scope to determine delimiter
  enumScope.members.push(name);
  const delimiter = memo(() => enumScope.getDelimiter(name));

  return code`${name}${args}${delimiter}`;
}
