import { createContext, ComponentContext, useContext } from "@alloy-js/core";
import { RestApi, RestApiModel, RestApiModelReference } from "../schema.js";

// context interface
interface ApiContext {
  schema: RestApi;
  resolveReference: (ref: RestApiModelReference) => RestApiModel | undefined;
}

// context variable
export const ApiContext: ComponentContext<ApiContext> =
  createContext<ApiContext>();

// context accessor
export function useApi(): ApiContext {
  return useContext(ApiContext)!;
}

export function createApiContext(schema: RestApi): ApiContext {
  return {
    schema,
    resolveReference(node) {
      let model = undefined;
      // Using this implementation to be able to print the model name
      for (const v of schema.models) {
        if (v.name === node.ref) {
          model = v;
          break;
        }
      }
      //const model = schema.models.find((v) => v.name === node.ref);

      if (!model) {
        throw new Error(`Unresolved reference ${node.ref}`);
      }

      return model;
    },
  };
}