import { LibrarySymbolReference } from "@alloy-js/core";
import { createLibrary } from "../../../../index.js";
import dataTypes, { LibraryDataTypes } from "./data-types.js";

type RestResourceLibrary = LibrarySymbolReference & LibraryDataTypes;

const RestResource: RestResourceLibrary = createLibrary(
  "TypeSpec.Rest.Resource",
  dataTypes,
  { packageImport: "@typespec/rest" },
);

export default RestResource;
