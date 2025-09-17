import { Children, code, Prose, refkey } from "@alloy-js/core";
import * as py from "@alloy-js/python";
import { useApi } from "../context/api.js";
import { RestApiOperation } from "../schema.js";
import {
  castOpenAPITypeToPython,
  resolveRestAPIReference,
  resolveRestAPIReferenceToString,
} from "../utils.js";

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
    } as py.ParameterDescriptor);
  }

  let requestReturnType: Children;
  if (op.requestBody) {
    requestReturnType = resolveRestAPIReference(op.requestBody, apiContext);
    parameters.push({
      name: "body",
      type: requestReturnType,
      refkey: refkey(op, "requestBody"),
    } as py.ParameterDescriptor);
  }

  // get the return type based on the spec's responseBody.
  let responseReturnType = resolveRestAPIReference(
    op.responseBody,
    apiContext,
  ) as py.TypeExpressionProps;
  let responseReturnTypeString: string = `${resolveRestAPIReferenceToString(op.responseBody, apiContext)}: ${op.responseDoc}`;

  // get the url endpoint, constructed from possible path parameters
  let endpoint: Children;
  if (endpointParam) {
    endpoint = (
      <>
        "{op.endpoint.slice(0, -endpointParam.length - 1)}" + {endpointParam}
      </>
    );
  } else {
    endpoint = <>"{op.endpoint}"</>;
  }

  let jsonBody = op.verb == "post" ? ", json=body" : "";
  let returnCode = code`response.json()`;
  if (op.responseBody?.array) {
    const responseType = resolveRestAPIReference(
      op.responseBody,
      apiContext,
      false,
    );
    returnCode = code`[${responseType}(**data) for data in response.json()]`;
  }

  let requestsCallArgs = [
    <py.VariableDeclaration name="" initializer={endpoint} callStatementVar />,
  ];
  if (op.verb === "post" || op.verb === "put") {
    requestsCallArgs.push(
      <py.VariableDeclaration
        name="json"
        initializer={refkey(op, "requestBody")}
        callStatementVar
      />,
    );
  }

  {
    jsonBody;
  }
  let requestsCall = (
    <py.FunctionCallExpression
      target={py.requestsModule["."][op.verb]}
      args={requestsCallArgs}
    />
  );

  const functionDoc = (
    <py.FunctionDoc
      description={[<Prose>{op.doc}</Prose>]}
      parameters={parameters}
      returns={responseReturnTypeString}
      style="google"
    />
  );

  return (
    <py.MethodDeclaration
      name={op.name}
      parameters={parameters}
      returnType={responseReturnType}
      doc={functionDoc}
      refkey={refkey(op.name)}
    >
      <py.StatementList>
        <py.VariableDeclaration name="response" initializer={requestsCall} />
        {code`
          return ${returnCode}
        `}
      </py.StatementList>
    </py.MethodDeclaration>
  );
}
