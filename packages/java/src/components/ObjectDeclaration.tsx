import type { Children } from "@alloy-js/core";
import { code } from "@alloy-js/core";

import { ArgumentList } from "./ArgumentList.jsx";
import type { CommonDeclarationProps } from "./Declaration.js";
import type { ModifierProps } from "./Modifiers.jsx";
import { Variable } from "./Variable.js";

export interface ObjectDeclarationProps
  extends CommonDeclarationProps, ModifierProps {
  type: Children;
  args?: Children[];
}

/**
 * Shorthand to instantiate a new object.
 * Declares it with 'new' and passes arguments to the constructor of the object, if any
 */
export function ObjectDeclaration(props: ObjectDeclarationProps) {
  const args = <ArgumentList args={props.args} />;
  const value = code`new ${props.type}${args}`;
  return <Variable {...props} value={value} />;
}
