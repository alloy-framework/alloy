import { Children, refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { useApi } from "../context/api.js";
import { RestApiModelProperty } from "../schema.js";
import { Model } from "./Model.jsx";

interface ModelProps {
  property: RestApiModelProperty;
}

export function ModelProperty(props: ModelProps) {
  let memberType: Children;

  const apiType = props.property.type;

  if (typeof apiType === "object") {
    if ("ref" in apiType) {
      const model = useApi().resolveReference(apiType);
      memberType = refkey(model);
    } else {
      memberType = <Model model={apiType} />;
    }
  } else {
    memberType = apiType;
  }

  return <ts.InterfaceMember name={props.property.name} type={memberType} />;
}
