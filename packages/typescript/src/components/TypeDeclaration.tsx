import { Declaration, DeclarationProps } from "./Declaration.js";
import { Name } from "./Name.js";

export interface TypeDeclarationProps extends Omit<DeclarationProps, "kind"> {}

export function TypeDeclaration(props: TypeDeclarationProps) {
  return <Declaration {...props} nameKind="type">
    type <Name /> = {props.children};
  </Declaration>;
}
