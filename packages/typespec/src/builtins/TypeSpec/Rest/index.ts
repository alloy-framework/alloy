import type { LibrarySymbolReference } from "@alloy-js/core";

import { createLibrary } from "../../../index.js";
import type { LibraryDataTypes } from "./data-types.js";
import dataTypes from "./data-types.js";
import type { LibraryDecorators } from "./decorators.js";
import decorators from "./decorators.js";

type RestLibrary = LibrarySymbolReference &
  LibraryDecorators &
  LibraryDataTypes;

const Rest: RestLibrary = createLibrary(
  "TypeSpec.Rest",
  {
    ...decorators,
    ...dataTypes,
  },
  { packageImport: "@typespec/rest" },
);

export default Rest;
