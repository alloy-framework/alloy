export interface RestApi {
  name: string;
  operations: RestApiOperation[];
  models: RestApiModel[];
}

export interface RestApiOperation {
  name: string;
  endpoint: string;
  verb: "get" | "post";
  requestBody?: RestApiModelReference;
  responseBody?: RestApiModelReference | RestApiNonModelReference;
}

export interface RestApiNonModelReference {
  type: "string" | "number" | "boolean";
  array?: boolean;
}

export interface RestApiModelReference {
  ref: string;
  array?: boolean;
}

export interface RestApiModel {
  name: string;
  properties: RestApiModelProperty[];
}

export interface RestApiModelProperty {
  name: string;
  type: RestApiModel | RestApiModelReference | "string" | "number" | "boolean";
}

export const api: RestApi = {
  name: "Petstore",
  operations: [
    {
      name: "create_pet",
      verb: "post",
      endpoint: "/pets",
      requestBody: {
        ref: "Pet",
      },
      responseBody: {
        ref: "Pet",
      },
    },
    {
      name: "list_pets",
      verb: "get",
      endpoint: "/pets",
      responseBody: {
        ref: "Pet",
        array: true,
      },
    },
    {
      name: "get_amt_pets",
      verb: "get",
      endpoint: "/pets_amt",
      responseBody: {
        type: "number",
      },
    },
    {
      name: "get_pet",
      verb: "get",
      endpoint: "/pets/:id",
      responseBody: {
        ref: "Pet",
      },
    },
  ],
  models: [
    {
      name: "Pet",
      properties: [
        { name: "name", type: "string" },
        { name: "age", type: "number" },
        { name: "favoriteToy", type: { ref: "Toy" } },
      ],
    },
    {
      name: "Toy",
      properties: [{ name: "name", type: "string" }],
    },
  ],
};