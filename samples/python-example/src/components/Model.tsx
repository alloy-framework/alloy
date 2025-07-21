import { For, refkey } from "@alloy-js/core";
import * as py from "@alloy-js/python";
import { RestApiModel } from "../schema.js";
import { ModelProperty } from "./index.js";

interface ModelProps {
  model: RestApiModel;
}

export function Model(props: ModelProps) {
  console.log(`Rendering model: ${props.model}`);
  return (
    <py.ClassDeclaration name={props.model.name} refkey={refkey(props.model)}>
        <For each={props.model.properties} hardline enderPunctuation>
            {(prop) => <ModelProperty property={prop} />}
        </For>
    </py.ClassDeclaration>
  );
}