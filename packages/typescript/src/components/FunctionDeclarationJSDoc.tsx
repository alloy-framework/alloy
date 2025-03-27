import { Children, For, Show } from "@alloy-js/core";
import { JSDoc } from "./JSDoc.jsx";
import { JSDocParagraph } from "./JSDocParagraph.jsx";
import { JSDocParam } from "./JSDocParam.jsx";
import { ParameterDescriptor } from "./ParameterDescriptor.js";

export interface FunctionDeclarationJSDocProps {
  doc?: string;
  parameters?: ParameterDescriptor[] | Record<string, Children>;
  children?: Children;
}

export function FunctionDeclarationJSDoc(props: FunctionDeclarationJSDocProps) {
  const canHaveParamDoc = Boolean(
    props.parameters &&
      Array.isArray(props.parameters) &&
      props.parameters.length > 0,
  );
  const parameterDescriptors =
    Array.isArray(props.parameters) ? props.parameters : [];
  return (
    <Show when={Boolean(props.doc)}>
      <JSDoc>
        <JSDocParagraph>{props.doc}</JSDocParagraph>
        {canHaveParamDoc ?
          <For each={parameterDescriptors}>
            {(param) => (
              <JSDocParam
                name={param.name}
                type={param.type}
                optional={param.optional}
                hyphen
              >
                {param.doc}
              </JSDocParam>
            )}
          </For>
        : null}
      </JSDoc>
      <hbr />
    </Show>
  );
}
