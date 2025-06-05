import { Children, code } from "@alloy-js/core";
import { ArgumentList } from "./ArgumentList.jsx";
import { DeclarationProps } from "./Declaration.js";
import { ModifierProps } from "./Modifiers.jsx";
import { VariableDeclaration } from "./VariableDeclaration.js";

export interface ObjectDeclarationProps
  extends DeclarationProps,
    ModifierProps {
  type: Children;
  args?: Children[];
}

/**
 * Shorthand to instantiate a new object.
 * Declares it with 'new' and passes arguments to the constructor of the object, if any
 */
export function ObjectDeclaration(props: ObjectDeclarationProps) {
  const args = <ArgumentList args={props.args} />;
  const value = code` ${props.type}${args}`;
  return <VariableDeclaration {...props} value={value} />;
}
