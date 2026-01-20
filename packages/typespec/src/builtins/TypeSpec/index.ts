import { LibrarySymbolReference } from "@alloy-js/core";
import { createLibrary } from "../../index.js";
import dataTypes, { LibraryDataTypes } from "./data-types.js";
import decorators, { LibraryDecorators } from "./decorators.js";

type TypeSpecLibrary = LibrarySymbolReference &
  LibraryDecorators &
  LibraryDataTypes;

const TypeSpec: TypeSpecLibrary = createLibrary("TypeSpec", {
  ...decorators,
  ...dataTypes,
});

export default TypeSpec;
