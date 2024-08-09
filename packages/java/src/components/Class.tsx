import { Child, Children, code, Scope } from "@alloy-js/core";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { useJavaNamePolicy } from "../name-policy.js";
import { collectModifiers, ObjectModifiers } from "../object-modifiers.js";
import { AccessModifier } from "../access-modifier.js";
import { Name } from "./Name.js";

export interface ClassProps extends DeclarationProps, ObjectModifiers {
  accessModifier: AccessModifier;
  extends?: Child;
  implements?: Children;
}

export function Class(props: ClassProps) {
  const name = useJavaNamePolicy().getName(props.name, "class");
  const extendExpression = props.extends ? ` extends ${props.extends}` : "";
  const collectedInterfaces = Array.isArray(props.implements) ? props.implements.join(", ") : props.implements;
  const implementsExpression = props.implements ? ` implements ${collectedInterfaces}` : "";
  const modifiers = collectModifiers(props);
  return (
    <Declaration {...props} name={name}>
      {props.accessModifier}{modifiers} class <Name />{extendExpression}{implementsExpression} {"{"}
        <Scope name={name} kind='class'>
          {props.children}
        </Scope>
      {"}"}
    </Declaration>
  );
}