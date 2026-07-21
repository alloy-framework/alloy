import type { LibrarySymbolReference } from "@alloy-js/core";

import { createLibrary } from "../../../../index.js";
import type { LibraryDataTypes } from "./data-types.js";
import dataTypes from "./data-types.js";

type HttpStreamsLibrary = LibrarySymbolReference & LibraryDataTypes;

const HttpStreams: HttpStreamsLibrary = createLibrary(
  "TypeSpec.Http.Streams",
  dataTypes,
  { packageImport: "@typespec/http" },
);

export default HttpStreams;
