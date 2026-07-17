import { LibrarySymbolReference } from "@alloy-js/core";

import { createLibrary } from "../../../index.js";
import dataTypes, { LibraryDataTypes } from "./data-types.js";
import decorators, { LibraryDecorators } from "./decorators.js";

type SSELibrary = LibrarySymbolReference & LibraryDecorators & LibraryDataTypes;

const SSE: SSELibrary = createLibrary(
  "TypeSpec.SSE",
  {
    ...decorators,
    ...dataTypes,
  },
  { packageImport: "@typespec/sse" },
);

export default SSE;
