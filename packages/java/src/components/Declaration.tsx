import {
  Children,
  Declaration as CoreDeclaration,
  Namekey,
  Refkey,
} from "@alloy-js/core";
import { JavaElements, useJavaNamePolicy } from "../name-policy.js";
import { JavaOutputSymbol } from "../symbols/java-output-symbol.js";
import { useLexicalScope } from "../utils.js";

export interface CommonDeclarationProps {
  // Name of declaration, should be fully qualified name, e.g me.example.code.Main
  name: string | Namekey;
  refkey?: Refkey;
  children?: Children;
}

export interface DeclarationProps extends CommonDeclarationProps {
  /**
   * The name policy kind to apply to the declaration.
   */
  nameKind?: JavaElements;
}

/**
 * Declare a symbol in the program. Declaring classes, interfaces, enums, etc. Should also pass in
 * access modifier so we can manage access
 */
export function Declaration(props: DeclarationProps) {
  const scope = useLexicalScope();
  if (!scope) {
    throw new Error("A lexical scope is required for declaration");
  }

  const sym = new JavaOutputSymbol(props.name, scope.symbols, {
    refkeys: props.refkey,
    namePolicy: useJavaNamePolicy().for(props.nameKind),
  });
  return <CoreDeclaration symbol={sym}>{props.children}</CoreDeclaration>;
}
