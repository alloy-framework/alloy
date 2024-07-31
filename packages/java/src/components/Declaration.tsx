import { Children, refkey, Refkey, useBinder, useScope, Declaration as CoreDeclaration } from "@alloy-js/core";
import { JavaOutputScope, JavaOutputSymbol } from "../symbols.js";
import { usePackage } from "./PackageDirectory.js";
import { AccessModifier } from "../access-modifier.js";

export interface DeclarationProps {
  // Name of declaration, should be fully qualified name, e.g me.example.code.Main
  name: string;
  accessModifier?: AccessModifier;
  refkey?: Refkey;
  children?: Children;
}

/**
 * Declare a symbol in the program. Declaring classes, interfaces, enums, etc. Should also pass in
 * access modifier so we can manage access
 *
 * TODO: Handle declaration of symbols inside objects, etc class variables, methods etc.
 * TODO: I'm thinlking declaring member refkeys like 'me.example.code.Main#main;
 */
export function Declaration(props: DeclarationProps) {
  const sym = createJavaSymbol(props);
  return <CoreDeclaration symbol={sym}>
    {props.children}
  </CoreDeclaration>
}

export function createJavaSymbol(props: DeclarationProps) {
  const binder = useBinder();
  const scope = useScope() as JavaOutputScope;

  const parentPackage = usePackage();

  const sym = binder.createSymbol<JavaOutputSymbol>(
    props.name,
    scope,
    props.refkey ?? refkey(props.name),
    {
      package: parentPackage !== null ? parentPackage?.qualifiedName : ""
    }
  );

  return sym;
}