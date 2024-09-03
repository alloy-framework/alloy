import { Child, Children, code } from "@alloy-js/core";
import { useJavaNamePolicy } from "../name-policy.js";
import { collectModifiers, ObjectModifiers } from "../object-modifiers.js";

export interface VariableProps extends ObjectModifiers {
  type: Child;
  name: string;
  value?: Children;
}

export function Variable(props: VariableProps) {
  const name = useJavaNamePolicy().getName(props.name, "variable");
  const modifiers = collectModifiers(props);

  return code`${modifiers}${props.type} ${name}${props.value ? code` = ${props.value}` : ""};`;
}
