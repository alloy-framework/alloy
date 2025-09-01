import * as core from "@alloy-js/core";

// properties for creating a declaration
export interface DeclarationProps {
  name: string;
  refkey?: core.Refkey | core.Refkey[];
  children?: core.Children;
}

// declares a symbol in the program (class, enum, interface etc)
export function Declaration(props: DeclarationProps) {
  throw new Error("Not supported");

  //return <core.Declaration symbol={sym}>{props.children}</core.Declaration>;
}
