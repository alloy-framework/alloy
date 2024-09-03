import { Children, code, Scope } from "@alloy-js/core";
import { collectArguments } from "../arguments.js";
import { useJavaNamePolicy } from "../name-policy.js";
import { collectModifiers, ObjectModifiers } from "../object-modifiers.js";
import { Name } from "./Name.js";
import { collectGenerics, GenericTypes } from "../generics.js";
import { Declaration, DeclarationProps } from "./Declaration.js";

export interface ClassProps
  extends DeclarationProps,
    ObjectModifiers,
    GenericTypes {
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
  const generics = props.generics ? collectGenerics(props.generics) : "";
  const modifiers = collectModifiers(props);
  return <Declaration {...props} name={name}>
      {modifiers}class <Name />{generics}{extendExpression}{implementsExpression} {"{"}
        <Scope name={name} kind='class'>
          {props.children}
        </Scope>
      {"}"}
    </Declaration>;
}
