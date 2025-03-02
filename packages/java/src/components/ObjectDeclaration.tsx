import { Children, code } from "@alloy-js/core";
import { DeclarationProps } from "./Declaration.js";
import { ModifierProps } from "./Modifiers.jsx";
import { Variable } from "./Variable.js";

export interface ObjectDeclarationProps
  extends DeclarationProps,
    ModifierProps {
  type: Children;
  arguments?: Children;
}

/**
 * Shorthand to instantiate a new object.
 * Declares it with 'new' and passes arguments to the constructor of the object, if any
 */
export function ObjectDeclaration(props: ObjectDeclarationProps) {
  const args = props.arguments ? "fixme" : "";
  const value = code`new ${props.type}(${args})`;
  return <Variable {...props} value={value} />;
}
