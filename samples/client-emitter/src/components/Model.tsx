import { For, refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { RestApiModel } from "../schema.js";
import { ModelProperty } from "./ModelProperty.jsx";
interface ModelProps {
  model: RestApiModel;
}
export function Model(props: ModelProps) {
  return (
    <ts.InterfaceDeclaration
      export
      name={props.model.name}
      refkey={refkey(props.model)}
    >
      <For each={props.model.properties} comma hardline enderPunctuation>
        {(prop) => <ModelProperty property={prop} />}
      </For>
    </ts.InterfaceDeclaration>
  );
}
