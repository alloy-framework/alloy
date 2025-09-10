import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type UnicodeLibrary = LibrarySymbolReference & {
  Utf8: LibrarySymbolReference & {
    FromUtf16: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    ToUtf16: LibrarySymbolReference;
    TryWrite: LibrarySymbolReference
  }
};
const Unicode: UnicodeLibrary = createLibrary("System.Text.Unicode", {
  Utf8: {
    kind: "class",
    members: {
      FromUtf16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUtf16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWrite: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Unicode
