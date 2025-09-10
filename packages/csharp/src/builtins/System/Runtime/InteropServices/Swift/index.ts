import System from "../../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type SwiftLibrary = LibrarySymbolReference & {
  SwiftError: LibrarySymbolReference & {
    SwiftError: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SwiftIndirectResult: LibrarySymbolReference & {
    SwiftIndirectResult: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SwiftSelf: LibrarySymbolReference & {
    SwiftSelf: LibrarySymbolReference;
    Value: LibrarySymbolReference
  }
};
const Swift: SwiftLibrary = createLibrary("System.Runtime.InteropServices.Swift", {
  SwiftError: {
    kind: "struct",
    members: {
      SwiftError: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Void;
        },
      },
    },
  },
  SwiftIndirectResult: {
    kind: "struct",
    members: {
      SwiftIndirectResult: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Void;
        },
      },
    },
  },
  SwiftSelf: {
    kind: "struct",
    members: {
      SwiftSelf: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: undefined,
      },
    },
  },
});
export default Swift
