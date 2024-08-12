import { Child, Children, code } from "@alloy-js/core";
import { AccessModifier, collectAccessModifier, collectModifiers, ObjectModifiers } from "../object-modifiers.js";
import { useJavaNamePolicy } from "../name-policy.js";

export interface VariableProps extends ObjectModifiers {
  accessModifier?: AccessModifier;
  type: Child;
  name: string;
  value?: Children;
}

export function Variable(props: VariableProps) {
  const name = useJavaNamePolicy().getName(props.name, "variable");
  const modifiers = collectModifiers(props);

  return code`${collectAccessModifier(props.accessModifier)}${modifiers}${props.type} ${name}${props.value ? code` = ${props.value}` : ""};`;
}