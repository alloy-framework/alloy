import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import type { LibrarySymbolReference } from "@alloy-js/core";

type MarkupLibrary = LibrarySymbolReference & {
  ValueSerializerAttribute: LibrarySymbolReference & {
    ValueSerializerAttribute: LibrarySymbolReference;
    ValueSerializerType: LibrarySymbolReference;
    ValueSerializerTypeName: LibrarySymbolReference
  }
};
const Markup: MarkupLibrary = createLibrary("System.Windows.Markup", {
  ValueSerializerAttribute: {
    kind: "class",
    members: {
      ValueSerializerAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ValueSerializerType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      ValueSerializerTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
});
export default Markup
