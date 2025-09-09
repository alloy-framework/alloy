import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type CryptographyLibrary = LibrarySymbolReference & {
  CryptographicException: LibrarySymbolReference & {
    CryptographicException: LibrarySymbolReference
  }
};
const Cryptography: CryptographyLibrary = createLibrary("System.Security.Cryptography", {
  CryptographicException: {
    kind: "class",
    members: {
      CryptographicException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
});
export default Cryptography
