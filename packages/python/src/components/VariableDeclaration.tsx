import { Children, code, useBinder } from "@alloy-js/core";
import { usePythonNamePolicy } from "../name-policy.js"; // assuming you have this

export interface VariableDeclarationProps {
  name: string;
  value?: Children;
  type?: Children; // Optional, only for type annotation
  omitNone?: boolean; // Optional, to omit None assignment
  callStatementVar?: boolean; // Optional, to indicate if this is a call statement variable
}

export function VariableDeclaration(props: VariableDeclarationProps) {
  const name = usePythonNamePolicy().getName(props.name, "variable");

  // Handle optional type annotation
  const typeAnnotation = props.type && !props.callStatementVar ? code`: ${props.type}` : "";

  // If omitNone is true and value is undefined, omit assignment entirely
  if (props.omitNone && props.value === undefined) {
    return code`${name}${typeAnnotation}`;
  }

  // Determine assignment based on whether this is an instance variable
  // Omit it if instanceVar is true and name is empty
  const assignment = props.callStatementVar ? name ? "=" : "" : " = ";
  // Always emit assignment; if value is undefined, can emit = None or leave blank per style
  return code`${name}${typeAnnotation}${props.value !== undefined ? code`${assignment}${props.value}` : " = None"}`;
}
