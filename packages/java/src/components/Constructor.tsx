import { Block } from "@alloy-js/core";
import { Children } from "@alloy-js/core/jsx-runtime";
import { ModifierProps, Modifiers } from "./Modifiers.jsx";
import { Name } from "./Name.js";
import { Parameters } from "./Parameters.js";

export interface ConstructorProps extends ModifierProps {
  name?: string;
  parameters?: Record<string, Children>; // Map of parameter name to type
  children?: Children;
}

/**
 * Declare a constructor, usually for a class or enum
 * If no name is provided, will try take name from class or enum declaration
 */
export function Constructor(props: ConstructorProps) {
  return (
    <>
      <Modifiers {...props} />
      {props.name ?? <Name />}(
      <Parameters parameters={props.parameters} />){" "}
      <Block>{props.children}</Block>
    </>
  );
}
