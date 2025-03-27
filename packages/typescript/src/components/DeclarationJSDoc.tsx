import { Show } from "@alloy-js/core";
import { JSDoc } from "./JSDoc.jsx";
import { JSDocParagraph } from "./JSDocParagraph.jsx";

export interface DeclarationJSDocProps {
  doc?: string;
}

export function DeclarationJSDoc(props: DeclarationJSDocProps) {
  return (
    <Show when={Boolean(props.doc)}>
      <JSDoc>
        <JSDocParagraph>{props.doc}</JSDocParagraph>
      </JSDoc>
      <hbr />
    </Show>
  );
}
