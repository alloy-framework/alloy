import {
  Children,
  Declaration as CoreDeclaration,
  Refkey,
} from "@alloy-js/core";
import { PythonElements } from "../name-policy.js";
import { createPythonSymbol } from "../symbol-creation.js";
import { PythonOutputSymbol } from "../symbols/index.js";

export interface BaseDeclarationProps {
  /**
   * The base name of this declaration. May change depending on naming policy
   * and any conflicts.
   */
  name: string;

  /**
   * The refkey or array of refkeys for this declaration.
   */
  refkey?: Refkey | Refkey[];

  children?: Children;

  /**
   * Documentation for this declaration
   */
  doc?: Children;
}

export interface DeclarationProps extends Omit<BaseDeclarationProps, "name"> {
  /**
   * The name of this declaration.
   */
  name?: string;

  /**
   * The name policy kind to apply to the declaration.
   */
  nameKind?: PythonElements;

  /**
   * The symbol to use for this declaration.
   */
  symbol?: PythonOutputSymbol;
}

/**
 * A Python declaration, which can be a class, function, variable, etc.
 *
 * @remarks
 * This component is used to create a declaration with a symbol that can be
 * referenced in the code. It can also be used to create a member scope for
 * member containers.
 *
 */
export function Declaration(props: DeclarationProps) {
  let sym: PythonOutputSymbol;

  if (props.symbol) {
    sym = props.symbol;
  } else {
    sym = createPythonSymbol(
      props.name!,
      {
        refkeys: props.refkey,
      },
      props.nameKind!,
    );
  }

  return <CoreDeclaration symbol={sym}>{props.children}</CoreDeclaration>;
}
