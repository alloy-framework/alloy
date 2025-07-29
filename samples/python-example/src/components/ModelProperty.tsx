import { Children, code, refkey } from "@alloy-js/core";
import * as py from "@alloy-js/python";
import { useApi } from "../context/api.js";
import { RestApiModelProperty } from "../schema.js";
import { castOpenAPITypeToPython } from "../utils.js";
import { Model } from "./index.js";

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
    memberType = castOpenAPITypeToPython(apiType);
  }
  if (props.property.array) {
    memberType = code`list[${memberType}]`;
  }
  if (props.property.optional) {
    memberType = code`${memberType} | None`;
  }

  return (
    <py.VariableDeclaration
      name={props.property.name}
      type={memberType}
      omitNone
      instanceVariable
      doc={props.property.doc}
    />
  );
}
