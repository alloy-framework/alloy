import { code, Refkey } from "@alloy-js/core";
import { AccessModifier } from "../access-modifier.js";
import { Child, Children } from "@alloy-js/core/jsx-runtime";
import { Parameters } from "./Parameters.js";
import { Name } from "./Name.js";

export interface ConstructorProps {
  accessModifier?: AccessModifier;
  name?: string;
  parameters?: Record<string, Children>; // Map of parameter name to type
  children?: Children;
}

/**
 * Declare a constructor, usually for a class or enum
 * If no name is provided, will try take name from class or enum declaration
 */
export function Constructor(props: ConstructorProps) {
  const params = <Parameters parameters={props.parameters}></Parameters>;
  return code`
        ${props.accessModifier}${props.name ?? <Name />}(${params}) {
          ${props.children}
        }
    `;
}