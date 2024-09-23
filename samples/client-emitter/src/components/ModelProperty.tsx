import { Children, refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { useApi } from "../context/api.js";
import { RestApiModelProperty } from "../schema.js";
import { Model } from "./Model.jsx";

interface ModelPropertyProps {
  property: RestApiModelProperty;
}

export function ModelProperty(props: ModelPropertyProps) {
  let memberType: Children;

  const apiType = props.property.type;

  if (typeof apiType === "object") {
    if ("ref" in apiType) {
      const apiContext = useApi();
      const model = apiContext.resolveReference(apiType);
      memberType = refkey(model);
    } else {
      memberType = <Model model={apiType} />;
    }
  } else {
    memberType = apiType;
  }

  return <ts.InterfaceMember name={props.property.name} type={memberType} />;
}
