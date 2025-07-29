export interface RestApi {
  name: string;
  operations: RestApiOperation[];
  models: RestApiModel[];
  doc?: string;
}

export interface RestApiOperation {
  name: string;
  endpoint: string;
  verb: "get" | "post" | "put" | "delete";
  requestBody?: RestApiModelReference | RestApiNonModelReference;
  responseBody?: RestApiModelReference | RestApiNonModelReference;
  doc?: string;
  responseDoc?: string;
}

export interface RestApiNonModelReference {
  type: "string" | "number" | "boolean" | "dict";
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
  doc?: string;
}

export const api: RestApi = {
  name: "Petstore",
  doc: "A simple API for managing a pet store.",
  operations: [
    {
      name: "create_pet",
      verb: "post",
      endpoint: "/pets",
      requestBody: {
        type: "dict",
      },
      responseBody: {
        ref: "Pet",
      },
      doc: "Create a new pet in the store.",
      responseDoc: "The created pet.",
    },
    {
      name: "list_pets",
      verb: "get",
      endpoint: "/pets",
      responseBody: {
        ref: "Pet",
        array: true,
      },
      doc: "List all pets in the store.",
      responseDoc: "A list of pets.",
    },
    {
      name: "get_pet",
      verb: "get",
      endpoint: "/pets/:id",
      responseBody: {
        ref: "Pet",
      },
      doc: "Get a pet by its ID.",
      responseDoc: "The pet with the specified ID.",
    },
    {
      name: "update_pet",
      verb: "put",
      endpoint: "/pets/:id",
      requestBody: {
        type: "dict",
      },
      responseBody: {
        ref: "Pet",
      },
      doc: "Update an existing pet.",
      responseDoc: "The updated pet.",
    },
    {
      name: "delete_pet",
      verb: "delete",
      endpoint: "/pets/:id/delete",
      responseBody: {
        type: "boolean",
      },
      doc: "Delete a pet by its ID.",
      responseDoc: "True if the pet was deleted, False otherwise.",
    },
    {
      name: "add_toy_to_pet",
      verb: "post",
      endpoint: "/pets/:id/toys",
      requestBody: {
        type: "dict",
      },
      responseBody: {
        ref: "Pet",
      },
      doc: "Add a toy to a pet.",
      responseDoc: "The pet with the added toy.",
    },
    {
      name: "get_amt_pets",
      verb: "get",
      endpoint: "/pets_amt",
      responseBody: {
        type: "number",
      },
      doc: "Get the total number of pets in the store.",
      responseDoc: "The total number of pets.",
    },
  ],
  models: [
    {
      name: "Pet",
      properties: [
        { name: "id", type: "string" },
        { name: "name", type: "string" },
        { name: "age", type: "number" },
        { name: "favoriteToys", type: { ref: "Toy" }, array: true, doc: "List of favorite toys" },
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