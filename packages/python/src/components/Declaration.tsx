import {
  Children,
  Declaration as CoreDeclaration,
  Refkey,
} from "@alloy-js/core";
import { createPythonSymbol } from "../symbols/index.js";

export interface DeclarationProps {
  name: string;
  refkeys?: Refkey;
  children?: Children;
}

/**
 * Declare a symbol in the program. Declaring classes, interfaces, enums, etc.
 */
export function Declaration(props: DeclarationProps) {
  const sym = createPythonSymbol(props);
  return <CoreDeclaration symbol={sym}>{props.children}</CoreDeclaration>;
}
