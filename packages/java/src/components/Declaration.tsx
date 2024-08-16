import { Children, Declaration as CoreDeclaration, Refkey } from "@alloy-js/core";
import { createJavaSymbol } from "../symbols.js";

export interface DeclarationProps {
  // Name of declaration, should be fully qualified name, e.g me.example.code.Main
  name: string;
  refkey?: Refkey;
  children?: Children;
}

/**
 * Declare a symbol in the program. Declaring classes, interfaces, enums, etc. Should also pass in
 * access modifier so we can manage access
 */
export function Declaration(props: DeclarationProps) {
  const sym = createJavaSymbol(props);
  return <CoreDeclaration symbol={sym}>
    {props.children}
  </CoreDeclaration>;
}