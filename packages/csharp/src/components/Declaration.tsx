import * as core from "@alloy-js/core";
import * as symbols from "../symbols/index.js";

// properties for creating a declaration
export interface DeclarationProps {
  name: string;
  refkey?: core.Refkey;
  children?: core.Children;
}

// declares a symbol in the program (class, enum, interface etc)
export function Declaration(props: DeclarationProps) {
  const sym = symbols.createCSharpSymbol(props);
  return <core.Declaration symbol={sym}>
    {props.children}
  </core.Declaration>;
}
