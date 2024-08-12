import { DeclarationProps } from "./Declaration.js";
import { Children, code } from "@alloy-js/core";
import { collectArguments } from "../arguments.js";
import { Variable } from "./Variable.js";
import { AccessModifier, ObjectModifiers } from "../object-modifiers.js";

interface ObjectDeclarationProps extends DeclarationProps, ObjectModifiers {
  accessModifier?: AccessModifier;
  type: Children;
  arguments?: Children;
}

/**
 * Shorthand to instantiate a new object.
 * Declares it with 'new' and passes arguments to the constructor of the object, if any
 */
export function ObjectDeclaration(props: ObjectDeclarationProps) {
  const args = props.arguments ? collectArguments(props.arguments) : "";
  const value = code`new ${props.type}(${args})`;
  return <Variable {...props} value={value} />;
}