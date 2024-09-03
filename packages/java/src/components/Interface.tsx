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

export interface InterfaceProps extends DeclarationProps, ObjectModifiers {
  accessModifier?: AccessModifier;
  extends?: Children;
}

export function Interface(props: InterfaceProps) {
  const name = useJavaNamePolicy().getName(props.name, "interface");
  const collectedInterfaces = collectArguments(props.extends);
  const implementsExpression = props.extends ?
    code` extends ${collectedInterfaces}`
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
