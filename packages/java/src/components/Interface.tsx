import { Children, code, Scope } from "@alloy-js/core";
import { Declaration, DeclarationProps } from "./Declaration.js";
import { useJavaNamePolicy } from "../name-policy.js";
import {
  AccessModifier,
  collectAccessModifier,
  collectModifiers,
  ObjectModifiers,
} from "../object-modifiers.js";
import { Name } from "./Name.js";
import { collectArguments } from "../arguments.js";

export interface InterfaceProps extends DeclarationProps, ObjectModifiers {
  accessModifier?: AccessModifier;
  extends?: Children;
}

export function Interface(props: InterfaceProps) {
  const name = useJavaNamePolicy().getName(props.name, "interface");
  const collectedInterfaces = collectArguments(props.extends);
  const implementsExpression = props.extends
    ? code` extends ${collectedInterfaces}`
    : "";
  const modifiers = collectModifiers(props);
  return <Declaration {...props} name={name}>
      {collectAccessModifier(props.accessModifier)}{modifiers}interface <Name />{implementsExpression} {"{"}
        <Scope name={name} kind='interface'>
          {props.children}
        </Scope>
      {"}"}
    </Declaration>;
}
