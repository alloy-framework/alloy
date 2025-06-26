import { Children, DeclarationProps, Name, Refkey } from "@alloy-js/core";
import { useCSharpNamePolicy } from "../../name-policy.js";
import { Declaration } from "../Declaration.jsx";

export interface VarDeclarationProps
  extends Omit<DeclarationProps, "nameKind"> {
  /** Variable name */
  name: string;
  /** Type of the variable declaration. If not specified, defaults to "var" */
  type?: Children;
  /** Variable refkey */
  refkey?: Refkey;
  /** Variable value */
  children?: Children;
}

/**
 * Render a variable declaration
 *
 * @example with var
 * ```tsx
 * <VarDeclaration name="myVar">42</VarDeclaration>
 * ```
 * This will render:
 * ```csharp
 * var myVar = 42;
 * ```
 *
 * @example with type
 * ```tsx
 * <VarDeclaration name="myVar" type="int">42</VarDeclaration>
 * ```
 * This will render:
 * ```csharp
 * int myVar = 42;
 * ```
 */
export function VarDeclaration(props: VarDeclarationProps) {
  const name = useCSharpNamePolicy().getName(props.name, "variable");

  return (
    <Declaration name={name} refkey={props.refkey}>
      {props.type ?? "var"} <Name /> = {props.children};
    </Declaration>
  );
}
