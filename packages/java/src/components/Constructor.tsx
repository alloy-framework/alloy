import { code, Refkey } from "@alloy-js/core";
import { AccessModifier } from "../access-modifier.js";
import { Child, Children } from "@alloy-js/core/jsx-runtime";
import { Parameters } from "./Parameters.js";

export interface ConstructorProps {
  accessModifier: AccessModifier;
  name: string;
  parameters?: Record<string, Child>; // Map of parameter name to type
  children?: Children;
}

export function Constructor(props: ConstructorProps) {
  const params = <Parameters parameters={props.parameters}></Parameters>;
  return code`
        ${props.accessModifier}${props.name}(${params}) {
          ${props.children}
        }
    `;
}