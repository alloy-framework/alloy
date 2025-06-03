import * as core from "@alloy-js/core";
import { CSharpOutputSymbol } from "../symbols/csharp-output-symbol.js";

// properties for creating a declaration
export interface DeclarationProps {
  name: string;
  refkey?: core.Refkey;
  children?: core.Children;
}

// declares a symbol in the program (class, enum, interface etc)
export function Declaration(props: DeclarationProps) {
  const sym = new CSharpOutputSymbol(props.name, {
    refkeys: props.refkey,
  });

  return <core.Declaration symbol={sym}>{props.children}</core.Declaration>;
}
