export interface RestApi {
  name: string;
  operations: RestApiOperation[];
  models: RestApiModel[];
}

export interface RestApiOperation {
  name: string;
  endpoint: string;
  verb: "get" | "post" | "put" | "delete";
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
  array?: boolean;
  optional?: boolean;
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
      name: "get_pet",
      verb: "get",
      endpoint: "/pets/:id",
      responseBody: {
        ref: "Pet",
      },
    },
    {
      name: "update_pet",
      verb: "put",
      endpoint: "/pets/:id",
      requestBody: {
        ref: "Pet",
      },
      responseBody: {
        ref: "Pet",
      },
    },
    {
      name: "delete_pet",
      verb: "delete",
      endpoint: "/pets/:id/delete",
      responseBody: {
        type: "boolean",
      },
    },
    {
      name: "add_toy_to_pet",
      verb: "post",
      endpoint: "/pets/:id/toys",
      requestBody: {
        ref: "Toy",
      },
      responseBody: {
        ref: "Pet",
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
  ],
  models: [
    {
      name: "Pet",
      properties: [
        { name: "id", type: "string" },
        { name: "name", type: "string" },
        { name: "age", type: "number" },
        { name: "favoriteToys", type: { ref: "Toy" }, array: true },
        { name: "breed", type: "string", optional: true },
      ],
    },
    {
      name: "Toy",
      properties: [
        { name: "id", type: "string" },
        { name: "name", type: "string" }
      ],
    },
  ],
};