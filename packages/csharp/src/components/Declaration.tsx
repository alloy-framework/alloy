import * as core from "@alloy-js/core";
import { createCSharpSymbol } from "../symbols/csharp-output-symbol.js";

// properties for creating a declaration
export interface DeclarationProps {
  name: string;
  refkey?: core.Refkey;
  children?: core.Children;
}

// declares a symbol in the program (class, enum, interface etc)
export function Declaration(props: DeclarationProps) {
  const sym = createCSharpSymbol(props);
  return <core.Declaration symbol={sym}>
    {props.children}
  </core.Declaration>;
}
