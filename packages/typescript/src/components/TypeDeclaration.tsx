import { Name } from "@alloy-js/core";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";

export interface TypeDeclarationProps extends BaseDeclarationProps {}

export function TypeDeclaration(props: TypeDeclarationProps) {
  return (
    <Declaration {...props} nameKind="type">
      type <Name /> = {props.children};
    </Declaration>
  );
}
