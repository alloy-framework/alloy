import { Children, refkey } from "@alloy-js/core";
import * as py from "@alloy-js/python";
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
      const ref = refkey(model?.name);
      memberType = <py.Reference refkey={ref} />
    } else {
      memberType = <Model model={apiType} />;
    }
  } else {
    memberType = castOpenAPITypeToPython(apiType);
  }

  return <py.Variable name={props.property.name} type={memberType} omitNone />;
}

export function castOpenAPITypeToPython(type: Children) {
  switch (type) {
    case "string":
      return "str";
    case "number":
      return "int";
    default:
      return type;
  }
}