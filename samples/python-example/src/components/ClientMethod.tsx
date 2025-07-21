import { Children, code, refkey } from "@alloy-js/core";
import * as py from "@alloy-js/python";
import { useApi } from "../context/api.js";
import { RestApiOperation } from "../schema.js";
import { castOpenAPITypeToPython, resolveRestAPIReference } from "../utils.js";

export interface ClientMethodProps {
  operation: RestApiOperation;
}

export function ClientMethod(props: ClientMethodProps) {
  const apiContext = useApi();
  const op = props.operation;

  // get the parameters based on the spec's endpoint and requestBody
  const parameters = [];

  const endpointParam = op.endpoint.match(/:(\w+)$/)?.[1];
  if (endpointParam) {
    parameters.push({
      name: endpointParam,
      type: castOpenAPITypeToPython("string"),
      refkey: refkey(op, endpointParam),
    });
  }

  let requestReturnType: Children;
  if (op.requestBody) {
    requestReturnType = resolveRestAPIReference(op.requestBody, apiContext);
    parameters.push({
      name: "body",
      type: requestReturnType,
      refkey: refkey(op, "requestBody"),
    });
  }

  // get the return type based on the spec's responseBody.
  let responseReturnType: Children = resolveRestAPIReference(op.responseBody, apiContext);

  // get the url endpoint, constructed from possible path parameters
  let endpoint: Children;
  if (endpointParam) {
    endpoint = (
      <>
        "{op.endpoint.slice(0, -endpointParam.length - 1)}" +{" "}
        {endpointParam}
      </>
    );
  } else {
    endpoint = <>"{op.endpoint}"</>;
  }

  let jsonBody = op.verb == "post" ? ", json=body" : "";
  let returnCode = code`response.json()`
  if (op.responseBody?.array) {
    const responseType = resolveRestAPIReference(op.responseBody, apiContext, false);
    returnCode = code`[${responseType}(**data) for data in response.json()]`
  }

  return (
    <py.FunctionDeclaration
      name={op.name}
      parameters={parameters}
      returnType={responseReturnType}
      instanceFunction={true}
    >
      {code`
        response = requests.${op.verb}(${endpoint}${jsonBody})
        return ${returnCode}
      `}
    </py.FunctionDeclaration>
  );
}