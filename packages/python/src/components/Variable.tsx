import { Children, code } from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js"; // assuming you have this

export interface VariableProps {
  name: string;
  value?: Children;
  type?: Children; // Optional, only for type annotation
}

export function Variable(props: VariableProps) {
  const name = usePythonNamePolicy().getName(props.name, "variable");

  // Handle optional type annotation
  const typeAnnotation = props.type ? code`: ${props.type}` : "";

  // Always emit assignment; if value is undefined, can emit = None or leave blank per style
  return code`${name}${typeAnnotation}${props.value ? code` = ${props.value}` : " = None"}`;
}
