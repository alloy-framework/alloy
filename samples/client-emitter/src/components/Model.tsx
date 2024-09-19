import { mapJoin, refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { RestApiModel } from "../schema.js";
import { ModelProperty } from "./ModelProperty.jsx";
interface ModelProps {
  model: RestApiModel;
}
export function Model(props: ModelProps) {
  const members = mapJoin(props.model.properties, (
    prop,
  ) => <ModelProperty property={prop} />);
  return <ts.InterfaceDeclaration export name={props.model.name} refkey={refkey(props.model)}>
    {members}
  </ts.InterfaceDeclaration>;
}
