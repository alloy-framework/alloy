import { Children, code, Scope } from "@alloy-js/core";
import { collectArguments } from "../arguments.js";
import { useJavaNamePolicy } from "../name-policy.js";
import {
  AccessModifier,
  collectAccessModifier,
  collectModifiers,
  ObjectModifiers,
} from "../object-modifiers.js";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { Name } from "./Name.js";

export interface ClassProps extends DeclarationProps, ObjectModifiers {
  accessModifier?: AccessModifier;
  extends?: Children;
  implements?: Children;
}

export function Class(props: ClassProps) {
  const name = useJavaNamePolicy().getName(props.name, "class");
  const extendExpression = props.extends ? code` extends ${props.extends}` : "";
  const collectedInterfaces = collectArguments(props.implements);
  const implementsExpression = props.implements ?
    code` implements ${collectedInterfaces}`
  : "";
  const modifiers = collectModifiers(props);
  return <Declaration {...props} name={name}>
      {collectAccessModifier(props.accessModifier)}{modifiers}class <Name />{extendExpression}{implementsExpression} {"{"}
        <Scope name={name} kind='class'>
          {props.children}
        </Scope>
      {"}"}
    </Declaration>;
}
