import {
  Children,
  Declaration,
  DeclarationProps,
  Name,
  Refkey,
} from "@alloy-js/core";
import { createVariableSymbol } from "../../symbols/factories.js";

/** Props for {@link VarDeclaration} component */
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
  const sym = createVariableSymbol(props.name, {
    refkeys: props.refkey,
  });
  return (
    <Declaration symbol={sym}>
      {props.type ?? "var"} <Name /> = {props.children};
    </Declaration>
  );
}
