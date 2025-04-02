import { Name, Show } from "@alloy-js/core";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import { JSDoc } from "./JSDoc.jsx";

export interface TypeDeclarationProps extends BaseDeclarationProps {}

export function TypeDeclaration(props: TypeDeclarationProps) {
  return (
    <>
      <Show when={Boolean(props.doc)}>
        <JSDoc children={props.doc} />
        <hbr />
      </Show>
      <Declaration {...props} nameKind="type">
        type <Name /> = {props.children};
      </Declaration>
    </>
  );
}
