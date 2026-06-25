import { LibrarySymbolReference } from "@alloy-js/core";
import { createLibrary } from "../../../index.js";
import decorators, { LibraryDecorators } from "./decorators.js";

type VersioningLibrary = LibrarySymbolReference & LibraryDecorators;

const Versioning: VersioningLibrary = createLibrary(
  "TypeSpec.Versioning",
  decorators,
  { packageImport: "@typespec/versioning" },
);

export default Versioning;
