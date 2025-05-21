import { For, refkey } from "@alloy-js/core";
import * as py from "@alloy-js/python";
import { RestApiModel } from "../schema.js";
import { ModelProperty } from "./ModelProperty.jsx";

interface ModelProps {
  model: RestApiModel;
}

export function Model(props: ModelProps) {
  return (
    <py.Class name={props.model.name} refkey={refkey(props.model)}>
        <For each={props.model.properties} hardline enderPunctuation>
            {(prop) => <ModelProperty property={prop} />}
        </For>
    </py.Class>
  );
}