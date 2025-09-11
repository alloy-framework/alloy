import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type RuntimeBinderLibrary = LibrarySymbolReference & {
  RuntimeBinderException: LibrarySymbolReference & {
    RuntimeBinderException: LibrarySymbolReference
  };
  RuntimeBinderInternalCompilerException: LibrarySymbolReference & {
    RuntimeBinderInternalCompilerException: LibrarySymbolReference
  }
};
const RuntimeBinder: RuntimeBinderLibrary = createLibrary("Microsoft.CSharp.RuntimeBinder", {
  RuntimeBinderException: {
    kind: "class",
    members: {
      RuntimeBinderException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  RuntimeBinderInternalCompilerException: {
    kind: "class",
    members: {
      RuntimeBinderInternalCompilerException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
});
export default RuntimeBinder
