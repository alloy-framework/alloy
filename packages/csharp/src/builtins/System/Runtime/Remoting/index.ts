import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type RemotingLibrary = LibrarySymbolReference & {
  ObjectHandle: LibrarySymbolReference & {
    ObjectHandle: LibrarySymbolReference;
    Unwrap: LibrarySymbolReference
  }
};
const Remoting: RemotingLibrary = createLibrary("System.Runtime.Remoting", {
  ObjectHandle: {
    kind: "class",
    members: {
      ObjectHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      Unwrap: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
});
export default Remoting
