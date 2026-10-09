import type { LibrarySymbolReference } from "@alloy-js/core";

import { createLibrary } from "../../index.js";
import type { LibraryDataTypes } from "./data-types.js";
import dataTypes from "./data-types.js";
import type { LibraryDecorators } from "./decorators.js";
import decorators from "./decorators.js";

type TypeSpecLibrary = LibrarySymbolReference &
  LibraryDecorators &
  LibraryDataTypes;

const TypeSpec: TypeSpecLibrary = createLibrary(
  "TypeSpec",
  {
    ...decorators,
    ...dataTypes,
  },
  { implicitlyUsed: true },
);

export default TypeSpec;
