import type { LibrarySymbolReference } from "@alloy-js/core";

import { createLibrary } from "../../../index.js";
import type { LibraryDataTypes } from "./data-types.js";
import dataTypes from "./data-types.js";
import type { LibraryDecorators } from "./decorators.js";
import decorators from "./decorators.js";

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
