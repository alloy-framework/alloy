import { LibrarySymbolReference } from "@alloy-js/core";
import { createLibrary, Descriptor, LibraryFrom } from "../../../index.js";

// These decorators are contributed to the TypeSpec.OpenAPI namespace by the
// @typespec/openapi3 package (not @typespec/openapi). Both packages share the
// same namespace — the per-symbol packageImport ensures the correct import is
// emitted depending on which entry point the consumer uses.
const decorators = {
  oneOf: { kind: "decorator" },
  useRef: { kind: "decorator" },
} satisfies Record<string, Descriptor>;

type LibraryDecorators = LibraryFrom<typeof decorators>;
type OpenAPI3Library = LibrarySymbolReference & LibraryDecorators;

const OpenAPI3: OpenAPI3Library = createLibrary(
  "TypeSpec.OpenAPI",
  decorators,
  { packageImport: "@typespec/openapi3" },
);

export default OpenAPI3;
