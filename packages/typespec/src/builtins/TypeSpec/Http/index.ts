import { LibrarySymbolReference } from "@alloy-js/core";
import { createLibrary } from "../../../index.js";
import dataTypes, { LibraryDataTypes } from "./data-types.js";
import decorators, { LibraryDecorators } from "./decorators.js";

type HttpLibrary = LibrarySymbolReference & LibraryDecorators & LibraryDataTypes;

const Http: HttpLibrary = createLibrary(
  "TypeSpec.Http",
  {
    ...decorators,
    ...dataTypes,
  },
  { packageImport: "@typespec/http" },
);

export default Http;
