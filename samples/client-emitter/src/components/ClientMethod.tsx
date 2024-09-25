import { Children, code, refkey } from "@alloy-js/core";
import * as ts from "@alloy-js/typescript";
import { useApi } from "../context/api.js";
import { RestApiOperation } from "../schema.js";

export interface ClientMethodProps {
  operation: RestApiOperation;
}

export function ClientMethod(props: ClientMethodProps) {
  const apiContext = useApi();
  const op = props.operation;

  // get the parameters based on the spec's endpoint and requestBody
  const parameters: Record<string, ts.ParameterDescriptor> = {};

  const endpointParam = op.endpoint.match(/:(\w+)$/)?.[1];
  if (endpointParam) {
    parameters[endpointParam] = {
      type: "string",
      refkey: refkey(op, endpointParam),
    };
  }

  if (op.requestBody) {
    parameters["body"] = {
      type: refkey(apiContext.resolveReference(op.requestBody)),
      refkey: refkey(op, "requestBody"),
    };
  }

  // get the return type based on the spec's responseBody.
  let returnType: Children;
  if (op.responseBody === undefined) {
    returnType = "Promise<void>";
  } else {
    const responseModel = apiContext.resolveReference(op.responseBody);

    const reference: Children = [refkey(responseModel)];
    if (op.responseBody.array) {
      reference.push("[]");
    }

    returnType = code`Promise<${reference}>`;
  }

  // get the url endpoint, constructed from possible path parameters
  let endpoint: Children;
  if (endpointParam) {
    endpoint =
      <>
        "{op.endpoint.slice(0, -endpointParam.length - 1)}" + {refkey(op, endpointParam)}
      </>;
  } else {
    endpoint = <>"{op.endpoint}"</>;
  }

  // get the fetch options
  const options = op.verb ===
    "post" && <>, 
      <ts.ObjectExpression>
        <ts.ObjectProperty name="method" jsValue={"POST"} />,
        <ts.ObjectProperty name="body">JSON.stringify({refkey(op, "requestBody")})</ts.ObjectProperty>
      </ts.ObjectExpression>
    </>;

  // assemble the method
  return <ts.ClassMethod async name={op.name} parameters={parameters} returnType={returnType}>
    const response = await fetch({endpoint}{options});
    
    if (!response.ok) <ts.Block>
      throw new Error("Request failed: " + response.status);
    </ts.Block>

    return response.json() as {returnType};
  </ts.ClassMethod>;
}
