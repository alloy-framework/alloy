import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type PolicyLibrary = LibrarySymbolReference & {
  Evidence: LibrarySymbolReference & {
    Evidence: LibrarySymbolReference;
    AddAssembly: LibrarySymbolReference;
    AddHost: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetAssemblyEnumerator: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetHostEnumerator: LibrarySymbolReference;
    Merge: LibrarySymbolReference;
    RemoveType: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Locked: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  EvidenceBase: LibrarySymbolReference & {
    EvidenceBase: LibrarySymbolReference;
    Clone: LibrarySymbolReference
  }
};
const Policy: PolicyLibrary = createLibrary("System.Security.Policy", {
  Evidence: {
    kind: "class",
    members: {
      Evidence: {
        kind: "method",
        methodKind: "constructor",
      },
      AddAssembly: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddHost: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAssemblyEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHostEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Merge: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveType: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSynchronized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Locked: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
    isSealed: true,
  },
  EvidenceBase: {
    kind: "class",
    members: {
      EvidenceBase: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
});
export default Policy
