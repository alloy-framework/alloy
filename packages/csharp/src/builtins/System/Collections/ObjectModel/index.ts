import Generic from "../Generic/index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ObjectModelLibrary = LibrarySymbolReference & {
  Collection: LibrarySymbolReference & {
    Collection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    ClearItems: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    InsertItem: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    RemoveItem: LibrarySymbolReference;
    SetItem: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Items: LibrarySymbolReference
  };
  ReadOnlyCollection: LibrarySymbolReference & {
    ReadOnlyCollection: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Empty: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Items: LibrarySymbolReference
  };
  ReadOnlyDictionary: LibrarySymbolReference & {
    KeyCollection: LibrarySymbolReference & {
      Contains: LibrarySymbolReference;
      CopyTo: LibrarySymbolReference;
      GetEnumerator: LibrarySymbolReference;
      Count: LibrarySymbolReference
    };
    ValueCollection: LibrarySymbolReference & {
      CopyTo: LibrarySymbolReference;
      GetEnumerator: LibrarySymbolReference;
      Count: LibrarySymbolReference
    }
  }
};
const ObjectModel: ObjectModelLibrary = createLibrary("System.Collections.ObjectModel", {
  Collection: {
    kind: "class",
    members: {
      Collection: {
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
      ClearItems: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
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
      InsertItem: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveItem: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetItem: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Item: {
        kind: "property",
        type: undefined,
      },
      Items: {
        kind: "property",
        type: () => {
          return Generic.IList;
        },
      },
    },
  },
  ReadOnlyCollection: {
    kind: "class",
    members: {
      ReadOnlyCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
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
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Empty: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
        isStatic: true,
      },
      Item: {
        kind: "property",
        type: undefined,
      },
      Items: {
        kind: "property",
        type: () => {
          return Generic.IList;
        },
      },
    },
  },
  ReadOnlyDictionary: {
    kind: "class",
    members: {
      KeyCollection: {
        kind: "class",
        members: {
          Contains: {
            kind: "method",
            methodKind: "ordinary",
          },
          CopyTo: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetEnumerator: {
            kind: "method",
            methodKind: "ordinary",
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
      ValueCollection: {
        kind: "class",
        members: {
          CopyTo: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetEnumerator: {
            kind: "method",
            methodKind: "ordinary",
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
    },
  },
});
export default ObjectModel
