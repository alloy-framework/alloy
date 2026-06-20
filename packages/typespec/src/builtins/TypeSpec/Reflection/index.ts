import { LibrarySymbolReference } from "@alloy-js/core";
import { createLibrary } from "../../../index.js";
import dataTypes, { LibraryDataTypes } from "./data-types.js";

type ReflectionLibrary = LibrarySymbolReference & LibraryDataTypes;

const Reflection: ReflectionLibrary = createLibrary(
  "TypeSpec.Reflection",
  dataTypes,
);

export default Reflection;
