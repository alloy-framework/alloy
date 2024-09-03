import { Children, code, Scope } from "@alloy-js/core";
import { useJavaNamePolicy } from "../name-policy.js";
import { collectModifiers, ObjectModifiers } from "../object-modifiers.js";
import { Name } from "./Name.js";
import { collectArguments } from "../arguments.js";
import { collectGenerics, GenericTypes } from "../generics.js";
import { Declaration, DeclarationProps } from "./Declaration.js";

export interface InterfaceProps
  extends DeclarationProps,
    ObjectModifiers,
    GenericTypes {
  extends?: Children;
}

export function Interface(props: InterfaceProps) {
  const name = useJavaNamePolicy().getName(props.name, "interface");
  const collectedInterfaces = collectArguments(props.extends);
  const implementsExpression = props.extends ?
    code` extends ${collectedInterfaces}`
  : "";
  const modifiers = collectModifiers(props);
  const generics = props.generics ? collectGenerics(props.generics) : "";
  return <Declaration {...props} name={name}>
      {modifiers}interface <Name />{generics}{implementsExpression} {"{"}
        <Scope name={name} kind='interface'>
          {props.children}
        </Scope>
      {"}"}
    </Declaration>;
}
