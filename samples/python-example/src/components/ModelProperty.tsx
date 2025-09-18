import { Children, code } from "@alloy-js/core";
import * as py from "@alloy-js/python";
import { useApi } from "../context/api.js";
import { RestApiModelProperty } from "../schema.js";
import { castOpenAPITypeToPython, resolveRestAPIReference } from "../utils.js";
import { Model } from "./index.js";

interface ModelPropertyProps {
  property: RestApiModelProperty;
}

export function ModelProperty(props: ModelPropertyProps) {
  let memberType;
  const apiType = props.property.type;

  if (typeof apiType === "object") {
    if ("ref" in apiType) {
      const apiContext = useApi();
      memberType = resolveRestAPIReference(apiType, apiContext);
    } else {
      memberType = <Model model={apiType} />;
    }
  } else {
    memberType = castOpenAPITypeToPython(apiType);
  }

  let finalMemberType: Children = memberType;
  if (props.property.array) {
    finalMemberType = code`list[${memberType}]`;
  }
  if (props.property.optional) {
    finalMemberType = `${memberType} | None`;
  }

  return (
    <py.VariableDeclaration
      name={props.property.name}
      type={finalMemberType}
      omitNone
      instanceVariable
      doc={props.property.doc}
    />
  );
}
