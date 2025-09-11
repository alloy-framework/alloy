import Collections from "../index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type SpecializedLibrary = LibrarySymbolReference & {
  BitVector32: LibrarySymbolReference & {
    Section: LibrarySymbolReference & {
      Equals: LibrarySymbolReference;
      GetHashCode: LibrarySymbolReference;
      ToString: LibrarySymbolReference;
      Mask: LibrarySymbolReference;
      Offset: LibrarySymbolReference
    }
  };
  CollectionsUtil: LibrarySymbolReference & {
    CollectionsUtil: LibrarySymbolReference;
    CreateCaseInsensitiveHashtable: LibrarySymbolReference;
    CreateCaseInsensitiveSortedList: LibrarySymbolReference
  };
  HybridDictionary: LibrarySymbolReference & {
    HybridDictionary: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsFixedSize: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Keys: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  INotifyCollectionChanged: LibrarySymbolReference & {

  };
  IOrderedDictionary: LibrarySymbolReference & {
    GetEnumerator: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  ListDictionary: LibrarySymbolReference & {
    ListDictionary: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsFixedSize: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Keys: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  NameObjectCollectionBase: LibrarySymbolReference & {
    KeysCollection: LibrarySymbolReference & {
      Get: LibrarySymbolReference;
      GetEnumerator: LibrarySymbolReference;
      Count: LibrarySymbolReference;
      Item: LibrarySymbolReference
    }
  };
  NameValueCollection: LibrarySymbolReference & {
    NameValueCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Get: LibrarySymbolReference;
    GetKey: LibrarySymbolReference;
    GetValues: LibrarySymbolReference;
    HasKeys: LibrarySymbolReference;
    InvalidateCachedArrays: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Set: LibrarySymbolReference;
    AllKeys: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  NotifyCollectionChangedAction: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Replace: LibrarySymbolReference;
    Move: LibrarySymbolReference;
    Reset: LibrarySymbolReference
  };
  NotifyCollectionChangedEventArgs: LibrarySymbolReference & {
    NotifyCollectionChangedEventArgs: LibrarySymbolReference;
    Action: LibrarySymbolReference;
    NewItems: LibrarySymbolReference;
    NewStartingIndex: LibrarySymbolReference;
    OldItems: LibrarySymbolReference;
    OldStartingIndex: LibrarySymbolReference
  };
  NotifyCollectionChangedEventHandler: LibrarySymbolReference & {
    NotifyCollectionChangedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  OrderedDictionary: LibrarySymbolReference & {
    OrderedDictionary: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AsReadOnly: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    OnDeserialization: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Keys: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  StringCollection: LibrarySymbolReference & {
    StringCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  StringDictionary: LibrarySymbolReference & {
    StringDictionary: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    ContainsKey: LibrarySymbolReference;
    ContainsValue: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Keys: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  StringEnumerator: LibrarySymbolReference & {
    MoveNext: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Current: LibrarySymbolReference
  }
};
const Specialized: SpecializedLibrary = createLibrary("System.Collections.Specialized", {
  BitVector32: {
    kind: "class",
    members: {
      Section: {
        kind: "struct",
        members: {
          Equals: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetHashCode: {
            kind: "method",
            methodKind: "ordinary",
            isOverride: true,
          },
          ToString: {
            kind: "method",
            methodKind: "ordinary",
            isOverride: true,
          },
          Mask: {
            kind: "property",
            type: () => {
              return System.Int16;
            },
          },
          Offset: {
            kind: "property",
            type: () => {
              return System.Int16;
            },
          },
        },
      },
    },
  },
  CollectionsUtil: {
    kind: "class",
    members: {
      CollectionsUtil: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateCaseInsensitiveHashtable: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateCaseInsensitiveSortedList: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  HybridDictionary: {
    kind: "class",
    members: {
      HybridDictionary: {
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
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsFixedSize: {
        kind: "property",
        type: () => {
          return System.Boolean;
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
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      Keys: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      Values: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
      },
    },
  },
  INotifyCollectionChanged: {
    kind: "interface",
    members: {},
  },
  IOrderedDictionary: {
    kind: "interface",
    members: {
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
  },
  ListDictionary: {
    kind: "class",
    members: {
      ListDictionary: {
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
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsFixedSize: {
        kind: "property",
        type: () => {
          return System.Boolean;
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
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      Keys: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      Values: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
      },
    },
  },
  NameObjectCollectionBase: {
    kind: "class",
    members: {
      KeysCollection: {
        kind: "class",
        members: {
          Get: {
            kind: "method",
            methodKind: "ordinary",
            isVirtual: true,
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
          Item: {
            kind: "property",
            type: () => {
              return System.String;
            },
          },
        },
      },
    },
  },
  NameValueCollection: {
    kind: "class",
    members: {
      NameValueCollection: {
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
        isVirtual: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Get: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetValues: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      HasKeys: {
        kind: "method",
        methodKind: "ordinary",
      },
      InvalidateCachedArrays: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Set: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AllKeys: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  NotifyCollectionChangedAction: {
    kind: "enum",
    members: {
      Add: {
        kind: "field",
        type: () => {
          return Specialized.NotifyCollectionChangedAction;
        },
      },
      Remove: {
        kind: "field",
        type: () => {
          return Specialized.NotifyCollectionChangedAction;
        },
      },
      Replace: {
        kind: "field",
        type: () => {
          return Specialized.NotifyCollectionChangedAction;
        },
      },
      Move: {
        kind: "field",
        type: () => {
          return Specialized.NotifyCollectionChangedAction;
        },
      },
      Reset: {
        kind: "field",
        type: () => {
          return Specialized.NotifyCollectionChangedAction;
        },
      },
    },
  },
  NotifyCollectionChangedEventArgs: {
    kind: "class",
    members: {
      NotifyCollectionChangedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Action: {
        kind: "property",
        type: () => {
          return Specialized.NotifyCollectionChangedAction;
        },
      },
      NewItems: {
        kind: "property",
        type: () => {
          return Collections.IList;
        },
        isNullable: true,
      },
      NewStartingIndex: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      OldItems: {
        kind: "property",
        type: () => {
          return Collections.IList;
        },
        isNullable: true,
      },
      OldStartingIndex: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  NotifyCollectionChangedEventHandler: {
    kind: "generic",
    members: {
      NotifyCollectionChangedEventHandler: {
        kind: "method",
        methodKind: "constructor",
      },
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BeginInvoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EndInvoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  OrderedDictionary: {
    kind: "class",
    members: {
      OrderedDictionary: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AsReadOnly: {
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
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnDeserialization: {
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
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      Keys: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
      },
      Values: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
      },
    },
  },
  StringCollection: {
    kind: "class",
    members: {
      StringCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddRange: {
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
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
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
      Item: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
  },
  StringDictionary: {
    kind: "class",
    members: {
      StringDictionary: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ContainsKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ContainsValue: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsSynchronized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      Keys: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
        isVirtual: true,
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isVirtual: true,
      },
      Values: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
        isVirtual: true,
      },
    },
  },
  StringEnumerator: {
    kind: "class",
    members: {
      MoveNext: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Current: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
});
export default Specialized
