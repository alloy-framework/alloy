import { LibrarySymbolReference } from "@alloy-js/core";
import { createLibrary } from "../../../index.js";
import dataTypes, { LibraryDataTypes } from "./data-types.js";
import decorators, { LibraryDecorators } from "./decorators.js";

type OpenAPILibrary = LibrarySymbolReference &
  LibraryDecorators &
  LibraryDataTypes;

const OpenAPI: OpenAPILibrary = createLibrary(
  "TypeSpec.OpenAPI",
  {
    ...decorators,
    ...dataTypes,
  },
  { packageImport: "@typespec/openapi" },
);

export default OpenAPI;
