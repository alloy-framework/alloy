import { Children, code, refkey } from "@alloy-js/core";
import { RestApiModelReference, RestApiNonModelReference } from "./schema.js";
import { ApiContext } from "./context/api.js";
import * as py from "@alloy-js/python";


export function resolveRestAPIReference(reference: RestApiModelReference | RestApiNonModelReference | undefined, apiContext: ApiContext, handleArray = true): Children {  
  let returnType: Children;
  if (reference === undefined) {
   returnType = null;
  } else {
   if ("ref" in reference && reference.ref) {
    const responseModel = apiContext.resolveReference(reference);
    const ref = refkey(responseModel);
    returnType = <py.Reference refkey={ref} />;
   }
   else if ("type" in reference && reference.type) {
    returnType = code`${castOpenAPITypeToPython(reference.type)}`;
   }
   if (reference.array && handleArray) {
    returnType = code`list[${returnType}]`;
   }
  }
  return returnType;
}

export function resolveRestAPIReferenceToString(reference: RestApiModelReference | RestApiNonModelReference | undefined, apiContext: ApiContext, handleArray = true): string {
  if (reference === undefined) {
    return "";
  }
  if ("ref" in reference && reference.ref) {
    const responseModel = apiContext.resolveReference(reference);
    // Use 'name' property for the model name, fallback to reference.ref
    let label = responseModel?.name ?? String(reference.ref);
    if (reference.array && handleArray) {
      return `list[${label}]`;
    }
    return label;
  } else if ("type" in reference && reference.type) {
    let typeStr = castOpenAPITypeToPython(reference.type);
    if (reference.array && handleArray) {
      return `list[${typeStr}]`;
    }
    return typeStr;
  }
  return "";
}


export function castOpenAPITypeToPython(type: Children): string {
  switch (type) {
    case "string":
      return "str";
    case "number":
      return "int";
    case "boolean":
      return "bool";
    case "dict":
      return "dict";
    default:
      return typeof type === "string" ? type : "";
  }
}