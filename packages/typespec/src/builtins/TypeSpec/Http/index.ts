import type { LibrarySymbolReference } from "@alloy-js/core";

import { createLibrary } from "../../../index.js";
import type { LibraryDataTypes } from "./data-types.js";
import dataTypes from "./data-types.js";
import type { LibraryDecorators } from "./decorators.js";
import decorators from "./decorators.js";

type HttpLibrary = LibrarySymbolReference &
  LibraryDecorators &
  LibraryDataTypes;

const Http: HttpLibrary = createLibrary(
  "TypeSpec.Http",
  {
    ...decorators,
    ...dataTypes,
  },
  { packageImport: "@typespec/http" },
);

export default Http;
