import { Name, Show } from "@alloy-js/core";
import { BaseDeclarationProps, Declaration } from "./Declaration.js";
import { JSDoc } from "./JSDoc.jsx";
import { ensureTypeRefContext } from "./TypeRefContext.jsx";

export interface TypeDeclarationProps extends BaseDeclarationProps {}

export const TypeDeclaration = ensureTypeRefContext(
  (props: TypeDeclarationProps) => {
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
  },
);
