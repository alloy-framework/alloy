import System from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Generic } from "./Generic/index.js";
export { default as ObjectModel } from "./ObjectModel/index.js";

type CollectionsLibrary = LibrarySymbolReference & {
  ArrayList: LibrarySymbolReference & {
    ArrayList: LibrarySymbolReference;
    Adapter: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    BinarySearch: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    FixedSize: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetRange: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    InsertRange: LibrarySymbolReference;
    LastIndexOf: LibrarySymbolReference;
    ReadOnly: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    RemoveRange: LibrarySymbolReference;
    Repeat: LibrarySymbolReference;
    Reverse: LibrarySymbolReference;
    SetRange: LibrarySymbolReference;
    Sort: LibrarySymbolReference;
    Synchronized: LibrarySymbolReference;
    ToArray: LibrarySymbolReference;
    TrimToSize: LibrarySymbolReference;
    Capacity: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsFixedSize: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  Comparer: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    DefaultInvariant: LibrarySymbolReference;
    Comparer: LibrarySymbolReference;
    Compare: LibrarySymbolReference
  };
  DictionaryEntry: LibrarySymbolReference & {
    DictionaryEntry: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  Hashtable: LibrarySymbolReference & {
    Hashtable: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    ContainsKey: LibrarySymbolReference;
    ContainsValue: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetHash: LibrarySymbolReference;
    KeyEquals: LibrarySymbolReference;
    OnDeserialization: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Synchronized: LibrarySymbolReference;
    comparer: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    EqualityComparer: LibrarySymbolReference;
    hcp: LibrarySymbolReference;
    IsFixedSize: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Keys: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  ICollection: LibrarySymbolReference & {
    CopyTo: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  IComparer: LibrarySymbolReference & {
    Compare: LibrarySymbolReference
  };
  IDictionary: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    IsFixedSize: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Keys: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  IDictionaryEnumerator: LibrarySymbolReference & {
    Entry: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  IEnumerable: LibrarySymbolReference & {
    GetEnumerator: LibrarySymbolReference
  };
  IEnumerator: LibrarySymbolReference & {
    MoveNext: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Current: LibrarySymbolReference
  };
  IEqualityComparer: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference
  };
  IHashCodeProvider: LibrarySymbolReference & {
    GetHashCode: LibrarySymbolReference
  };
  IList: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    IsFixedSize: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  IStructuralComparable: LibrarySymbolReference & {
    CompareTo: LibrarySymbolReference
  };
  IStructuralEquatable: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference
  }
};
const Collections: CollectionsLibrary = createLibrary("System.Collections", {
  ArrayList: {
    kind: "class",
    members: {
      ArrayList: {
        kind: "method",
        methodKind: "constructor",
      },
      Adapter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddRange: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BinarySearch: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      FixedSize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetRange: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      InsertRange: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      LastIndexOf: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadOnly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveRange: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Repeat: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Reverse: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetRange: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Sort: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Synchronized: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TrimToSize: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Capacity: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsFixedSize: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
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
          return System.Object;
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
    },
  },
  Comparer: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Collections.Comparer;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DefaultInvariant: {
        kind: "field",
        type: () => {
          return Collections.Comparer;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Comparer: {
        kind: "method",
        methodKind: "constructor",
      },
      Compare: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  DictionaryEntry: {
    kind: "struct",
    members: {
      DictionaryEntry: {
        kind: "method",
        methodKind: "constructor",
      },
      Key: {
        kind: "property",
        type: () => {
          return System.Object;
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
  },
  Hashtable: {
    kind: "class",
    members: {
      Hashtable: {
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
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Contains: {
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
      GetHash: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      KeyEquals: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnDeserialization: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Synchronized: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      comparer: {
        kind: "property",
        type: () => {
          return Collections.IComparer;
        },
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      EqualityComparer: {
        kind: "property",
        type: () => {
          return Collections.IEqualityComparer;
        },
      },
      hcp: {
        kind: "property",
        type: () => {
          return Collections.IHashCodeProvider;
        },
      },
      IsFixedSize: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
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
          return System.Object;
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
  ICollection: {
    kind: "interface",
    members: {
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsSynchronized: {
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
  },
  IComparer: {
    kind: "interface",
    members: {
      Compare: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IDictionary: {
    kind: "interface",
    members: {
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
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
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
  IDictionaryEnumerator: {
    kind: "interface",
    members: {
      Entry: {
        kind: "property",
        type: () => {
          return Collections.DictionaryEntry;
        },
      },
      Key: {
        kind: "property",
        type: () => {
          return System.Object;
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
  },
  IEnumerable: {
    kind: "interface",
    members: {
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IEnumerator: {
    kind: "interface",
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
          return System.Object;
        },
      },
    },
  },
  IEqualityComparer: {
    kind: "interface",
    members: {
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IHashCodeProvider: {
    kind: "interface",
    members: {
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IList: {
    kind: "interface",
    members: {
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
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
  },
  IStructuralComparable: {
    kind: "interface",
    members: {
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IStructuralEquatable: {
    kind: "interface",
    members: {
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
});
export default Collections
