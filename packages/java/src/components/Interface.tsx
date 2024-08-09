import { Children, Scope } from "@alloy-js/core";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { useJavaNamePolicy } from "../name-policy.js";
import { collectModifiers, ObjectModifiers } from "../object-modifiers.js";
import { AccessModifier } from "../access-modifier.js";
import { Name } from "./Name.js";

export interface InterfaceProps extends DeclarationProps, ObjectModifiers {
  accessModifier?: AccessModifier;
  extends?: Children;
}

export function Interface(props: InterfaceProps) {
  const name = useJavaNamePolicy().getName(props.name, "interface");
  const collectedInterfaces = Array.isArray(props.extends) ? props.extends.join(", ") : props.extends;
  const implementsExpression = props.extends ? ` extends ${collectedInterfaces}` : "";
  const modifiers = collectModifiers(props);
  return (
    <Declaration {...props} name={name}>
        {props.accessModifier}{modifiers} class <Name />{implementsExpression} {"{"}
        <Scope name={name} kind='interface'>
            {props.children}
        </Scope>
        {"}"}
    </Declaration>
  );
}