import { code } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { AccessModifier, collectAccessModifier } from "../object-modifiers.js";
import { Name } from "./Name.js";
import { Parameters } from "./Parameters.js";

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
        ${collectAccessModifier(props.accessModifier)}${props.name ?? <Name />}(${params}) {
          ${props.children}
        }
    `;
}
