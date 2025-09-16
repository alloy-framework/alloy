import System from "../../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type NodesLibrary = LibrarySymbolReference & {
  JsonArray: LibrarySymbolReference & {
    JsonArray: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    Count: LibrarySymbolReference
  };
  JsonNode: LibrarySymbolReference & {
    AsArray: LibrarySymbolReference;
    AsObject: LibrarySymbolReference;
    AsValue: LibrarySymbolReference;
    DeepClone: LibrarySymbolReference;
    DeepEquals: LibrarySymbolReference;
    GetElementIndex: LibrarySymbolReference;
    GetPath: LibrarySymbolReference;
    GetPropertyName: LibrarySymbolReference;
    GetValueKind: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ParseAsync: LibrarySymbolReference;
    ToJsonString: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Options: LibrarySymbolReference;
    Parent: LibrarySymbolReference;
    Root: LibrarySymbolReference
  };
  JsonNodeOptions: LibrarySymbolReference & {
    PropertyNameCaseInsensitive: LibrarySymbolReference
  };
  JsonObject: LibrarySymbolReference & {
    JsonObject: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    ContainsKey: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    GetAt: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    SetAt: LibrarySymbolReference;
    TryGetPropertyValue: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    Count: LibrarySymbolReference
  };
  JsonValue: LibrarySymbolReference & {
    Create: LibrarySymbolReference
  }
};
const Nodes: NodesLibrary = createLibrary("System.Text.Json.Nodes", {
  JsonArray: {
    kind: "class",
    members: {
      JsonArray: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  JsonNode: {
    kind: "class",
    members: {
      AsArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      AsObject: {
        kind: "method",
        methodKind: "ordinary",
      },
      AsValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      DeepClone: {
        kind: "method",
        methodKind: "ordinary",
      },
      DeepEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetElementIndex: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPath: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPropertyName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetValueKind: {
        kind: "method",
        methodKind: "ordinary",
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ParseAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToJsonString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return Nodes.JsonNode;
        },
      },
      Options: {
        kind: "property",
        type: () => {
          return Nodes.JsonNodeOptions;
        },
        isNullable: true,
      },
      Parent: {
        kind: "property",
        type: () => {
          return Nodes.JsonNode;
        },
        isNullable: true,
      },
      Root: {
        kind: "property",
        type: () => {
          return Nodes.JsonNode;
        },
      },
    },
    isAbstract: true,
  },
  JsonNodeOptions: {
    kind: "struct",
    members: {
      PropertyNameCaseInsensitive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
    },
  },
  JsonObject: {
    kind: "class",
    members: {
      JsonObject: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      ContainsKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetPropertyValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  JsonValue: {
    kind: "class",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isAbstract: true,
  },
});
export default Nodes
