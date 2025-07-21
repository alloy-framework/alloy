import { createContext, useContext } from "@alloy-js/core";
import { RestApi, RestApiModel, RestApiModelReference } from "../schema.js";

// context interface
export interface ApiContext {
  schema: RestApi;
  resolveReference: (ref: RestApiModelReference) => RestApiModel | undefined;
}

// context variable
export const ApiContext = createContext<ApiContext>();

// context accessor
export function useApi(): ApiContext {
  return useContext(ApiContext)!;
}

export function createApiContext(schema: RestApi): ApiContext {
  return {
    schema,
    resolveReference(node) {
      const model = schema.models.find((v) => v.name === node.ref);

      if (!model) {
        throw new Error(`Unresolved reference ${node.ref}`);
      }

      return model;
    },
  };
}