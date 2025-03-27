import { Name } from "@alloy-js/core";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import { DeclarationJSDoc } from "./DeclarationJSDoc.jsx";

export interface TypeDeclarationProps extends BaseDeclarationProps {}

export function TypeDeclaration(props: TypeDeclarationProps) {
  return (
    <>
      <DeclarationJSDoc doc={props.doc} />
      <Declaration {...props} nameKind="type">
        type <Name /> = {props.children};
      </Declaration>
    </>
  );
}
