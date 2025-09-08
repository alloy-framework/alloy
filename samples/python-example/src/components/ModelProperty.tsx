import { code } from "@alloy-js/core";
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

  let finalMemberType = {
    children: memberType,
  } as py.SingleTypeExpressionProps;
  if (props.property.array) {
    finalMemberType = {
      children: code`list[${memberType}]`,
    } as py.SingleTypeExpressionProps;
  }
  if (props.property.optional) {
    finalMemberType = {
      children: `${memberType} | None`,
    } as py.SingleTypeExpressionProps;
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
