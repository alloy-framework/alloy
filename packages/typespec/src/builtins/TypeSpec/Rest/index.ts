import { LibrarySymbolReference } from "@alloy-js/core";
import { createLibrary } from "../../../index.js";
import dataTypes, { LibraryDataTypes } from "./data-types.js";
import decorators, { LibraryDecorators } from "./decorators.js";

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
