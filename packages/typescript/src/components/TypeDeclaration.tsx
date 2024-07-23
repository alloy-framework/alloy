import { Children } from "@alloy-js/core";
import { Declaration, DeclarationProps } from "./Declaration.js";

export interface TypeDeclarationProps extends DeclarationProps {}

export function TypeDeclaration(props: TypeDeclarationProps) {
  return <Declaration {...props}>
    type {props.name} = {props.children};
  </Declaration>
}