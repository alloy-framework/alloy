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
  KeyedCollection: LibrarySymbolReference & {
    KeyedCollection: LibrarySymbolReference;
    ChangeItemKey: LibrarySymbolReference;
    ClearItems: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    GetKeyForItem: LibrarySymbolReference;
    InsertItem: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveItem: LibrarySymbolReference;
    SetItem: LibrarySymbolReference;
    TryGetValue: LibrarySymbolReference;
    Comparer: LibrarySymbolReference;
    Dictionary: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  ObservableCollection: LibrarySymbolReference & {
    ObservableCollection: LibrarySymbolReference;
    BlockReentrancy: LibrarySymbolReference;
    CheckReentrancy: LibrarySymbolReference;
    ClearItems: LibrarySymbolReference;
    InsertItem: LibrarySymbolReference;
    Move: LibrarySymbolReference;
    MoveItem: LibrarySymbolReference;
    OnCollectionChanged: LibrarySymbolReference;
    OnPropertyChanged: LibrarySymbolReference;
    RemoveItem: LibrarySymbolReference;
    SetItem: LibrarySymbolReference
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
  };
  ReadOnlyObservableCollection: LibrarySymbolReference & {
    ReadOnlyObservableCollection: LibrarySymbolReference;
    OnCollectionChanged: LibrarySymbolReference;
    OnPropertyChanged: LibrarySymbolReference;
    Empty: LibrarySymbolReference
  };
  ReadOnlySet: LibrarySymbolReference & {
    ReadOnlySet: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    IsProperSubsetOf: LibrarySymbolReference;
    IsProperSupersetOf: LibrarySymbolReference;
    IsSubsetOf: LibrarySymbolReference;
    IsSupersetOf: LibrarySymbolReference;
    Overlaps: LibrarySymbolReference;
    SetEquals: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Empty: LibrarySymbolReference;
    Set: LibrarySymbolReference
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
  KeyedCollection: {
    kind: "class",
    members: {
      KeyedCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      ChangeItemKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      ClearItems: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetKeyForItem: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      InsertItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryGetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Comparer: {
        kind: "property",
        type: () => {
          return Generic.IEqualityComparer;
        },
      },
      Dictionary: {
        kind: "property",
        type: () => {
          return Generic.IDictionary;
        },
      },
      Item: {
        kind: "property",
        type: undefined,
      },
    },
    isAbstract: true,
  },
  ObservableCollection: {
    kind: "class",
    members: {
      ObservableCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      BlockReentrancy: {
        kind: "method",
        methodKind: "ordinary",
      },
      CheckReentrancy: {
        kind: "method",
        methodKind: "ordinary",
      },
      ClearItems: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InsertItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Move: {
        kind: "method",
        methodKind: "ordinary",
      },
      MoveItem: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnCollectionChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnPropertyChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
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
  ReadOnlyObservableCollection: {
    kind: "class",
    members: {
      ReadOnlyObservableCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      OnCollectionChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnPropertyChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Empty: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyObservableCollection;
        },
        isStatic: true,
      },
    },
  },
  ReadOnlySet: {
    kind: "class",
    members: {
      ReadOnlySet: {
        kind: "method",
        methodKind: "constructor",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsProperSubsetOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsProperSupersetOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsSubsetOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsSupersetOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Overlaps: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetEquals: {
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
          return ObjectModel.ReadOnlySet;
        },
        isStatic: true,
      },
      Set: {
        kind: "property",
        type: () => {
          return Generic.ISet;
        },
      },
    },
  },
});
export default ObjectModel
