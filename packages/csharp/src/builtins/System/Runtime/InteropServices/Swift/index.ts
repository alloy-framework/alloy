import System from "../../../index.js";

import { createLibrary } from "#createLibrary";


const Swift = createLibrary("System.Runtime.InteropServices.Swift", {
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
