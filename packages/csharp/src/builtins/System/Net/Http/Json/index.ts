import System from "../../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type JsonLibrary = LibrarySymbolReference & {
  HttpClientJsonExtensions: LibrarySymbolReference & {
    DeleteFromJsonAsync: LibrarySymbolReference;
    GetFromJsonAsync: LibrarySymbolReference
  };
  HttpContentJsonExtensions: LibrarySymbolReference & {
    ReadFromJsonAsync: LibrarySymbolReference
  };
  JsonContent: LibrarySymbolReference & {
    Create: LibrarySymbolReference;
    SerializeToStreamAsync: LibrarySymbolReference;
    TryComputeLength: LibrarySymbolReference;
    SerializeToStream: LibrarySymbolReference;
    ObjectType: LibrarySymbolReference;
    Value: LibrarySymbolReference
  }
};
const Json: JsonLibrary = createLibrary("System.Net.Http.Json", {
  HttpClientJsonExtensions: {
    kind: "class",
    members: {
      DeleteFromJsonAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFromJsonAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  HttpContentJsonExtensions: {
    kind: "class",
    members: {
      ReadFromJsonAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  JsonContent: {
    kind: "class",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SerializeToStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryComputeLength: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SerializeToStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ObjectType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
});
export default Json
