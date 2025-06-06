import {
  Children,
  Declaration as CoreDeclaration,
  Refkey,
} from "@alloy-js/core";
import { PythonOutputSymbol } from "../symbols/index.js";

export interface DeclarationProps {
  name: string;
  refkeys?: Refkey;
  children?: Children;
}

/**
 * Declare a symbol in the program. Declaring classes, interfaces, enums, etc.
 */
export function Declaration(props: DeclarationProps) {
  const sym = new PythonOutputSymbol(props.name, {
    refkeys: props.refkeys,
    children: props.children,
  });
  return <CoreDeclaration symbol={sym}>{props.children}</CoreDeclaration>;
}
