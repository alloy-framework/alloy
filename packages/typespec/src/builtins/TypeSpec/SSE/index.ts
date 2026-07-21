import type { LibrarySymbolReference } from "@alloy-js/core";

import { createLibrary } from "../../../index.js";
import type { LibraryDataTypes } from "./data-types.js";
import dataTypes from "./data-types.js";
import type { LibraryDecorators } from "./decorators.js";
import decorators from "./decorators.js";

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
