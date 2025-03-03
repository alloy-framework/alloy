import { Children, code } from "@alloy-js/core";
import { useJavaNamePolicy } from "../name-policy.js";
import { ModifierProps, Modifiers } from "./Modifiers.jsx";

export interface VariableProps extends ModifierProps {
  type: Children;
  name: string;
  value?: Children;
}

export function Variable(props: VariableProps) {
  const name = useJavaNamePolicy().getName(props.name, "variable");
  const modifiers = <Modifiers {...props} />;

  return code`${modifiers}${props.type} ${name}${props.value ? code` = ${props.value}` : ""}`;
}
