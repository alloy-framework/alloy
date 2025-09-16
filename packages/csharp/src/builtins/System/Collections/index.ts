import System from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Concurrent } from "./Concurrent/index.js";
export { default as Frozen } from "./Frozen/index.js";
export { default as Generic } from "./Generic/index.js";
export { default as Immutable } from "./Immutable/index.js";
export { default as ObjectModel } from "./ObjectModel/index.js";
export { default as Specialized } from "./Specialized/index.js";

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
  BitArray: LibrarySymbolReference & {
    BitArray: LibrarySymbolReference;
    And: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Get: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    HasAllSet: LibrarySymbolReference;
    HasAnySet: LibrarySymbolReference;
    LeftShift: LibrarySymbolReference;
    Not: LibrarySymbolReference;
    Or: LibrarySymbolReference;
    RightShift: LibrarySymbolReference;
    Set: LibrarySymbolReference;
    SetAll: LibrarySymbolReference;
    Xor: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  CaseInsensitiveComparer: LibrarySymbolReference & {
    CaseInsensitiveComparer: LibrarySymbolReference;
    Compare: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    DefaultInvariant: LibrarySymbolReference
  };
  CaseInsensitiveHashCodeProvider: LibrarySymbolReference & {
    CaseInsensitiveHashCodeProvider: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    DefaultInvariant: LibrarySymbolReference
  };
  CollectionBase: LibrarySymbolReference & {
    CollectionBase: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    OnClear: LibrarySymbolReference;
    OnClearComplete: LibrarySymbolReference;
    OnInsert: LibrarySymbolReference;
    OnInsertComplete: LibrarySymbolReference;
    OnRemove: LibrarySymbolReference;
    OnRemoveComplete: LibrarySymbolReference;
    OnSet: LibrarySymbolReference;
    OnSetComplete: LibrarySymbolReference;
    OnValidate: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Capacity: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    InnerList: LibrarySymbolReference;
    List: LibrarySymbolReference
  };
  Comparer: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    DefaultInvariant: LibrarySymbolReference;
    Comparer: LibrarySymbolReference;
    Compare: LibrarySymbolReference
  };
  DictionaryBase: LibrarySymbolReference & {
    DictionaryBase: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    OnClear: LibrarySymbolReference;
    OnClearComplete: LibrarySymbolReference;
    OnGet: LibrarySymbolReference;
    OnInsert: LibrarySymbolReference;
    OnInsertComplete: LibrarySymbolReference;
    OnRemove: LibrarySymbolReference;
    OnRemoveComplete: LibrarySymbolReference;
    OnSet: LibrarySymbolReference;
    OnSetComplete: LibrarySymbolReference;
    OnValidate: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Dictionary: LibrarySymbolReference;
    InnerHashtable: LibrarySymbolReference
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
  };
  Queue: LibrarySymbolReference & {
    Queue: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Dequeue: LibrarySymbolReference;
    Enqueue: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Peek: LibrarySymbolReference;
    Synchronized: LibrarySymbolReference;
    ToArray: LibrarySymbolReference;
    TrimToSize: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  ReadOnlyCollectionBase: LibrarySymbolReference & {
    ReadOnlyCollectionBase: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    InnerList: LibrarySymbolReference
  };
  SortedList: LibrarySymbolReference & {
    SortedList: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    ContainsKey: LibrarySymbolReference;
    ContainsValue: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetByIndex: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetKey: LibrarySymbolReference;
    GetKeyList: LibrarySymbolReference;
    GetValueList: LibrarySymbolReference;
    IndexOfKey: LibrarySymbolReference;
    IndexOfValue: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    SetByIndex: LibrarySymbolReference;
    Synchronized: LibrarySymbolReference;
    TrimToSize: LibrarySymbolReference;
    Capacity: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsFixedSize: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Keys: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  Stack: LibrarySymbolReference & {
    Stack: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Peek: LibrarySymbolReference;
    Pop: LibrarySymbolReference;
    Push: LibrarySymbolReference;
    Synchronized: LibrarySymbolReference;
    ToArray: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  StructuralComparisons: LibrarySymbolReference & {
    StructuralComparer: LibrarySymbolReference;
    StructuralEqualityComparer: LibrarySymbolReference
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
  BitArray: {
    kind: "class",
    members: {
      BitArray: {
        kind: "method",
        methodKind: "constructor",
      },
      And: {
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
      Get: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      HasAllSet: {
        kind: "method",
        methodKind: "ordinary",
      },
      HasAnySet: {
        kind: "method",
        methodKind: "ordinary",
      },
      LeftShift: {
        kind: "method",
        methodKind: "ordinary",
      },
      Not: {
        kind: "method",
        methodKind: "ordinary",
      },
      Or: {
        kind: "method",
        methodKind: "ordinary",
      },
      RightShift: {
        kind: "method",
        methodKind: "ordinary",
      },
      Set: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      Xor: {
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
          return System.Boolean;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
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
  CaseInsensitiveComparer: {
    kind: "class",
    members: {
      CaseInsensitiveComparer: {
        kind: "method",
        methodKind: "constructor",
      },
      Compare: {
        kind: "method",
        methodKind: "ordinary",
      },
      Default: {
        kind: "property",
        type: () => {
          return Collections.CaseInsensitiveComparer;
        },
        isStatic: true,
      },
      DefaultInvariant: {
        kind: "property",
        type: () => {
          return Collections.CaseInsensitiveComparer;
        },
        isStatic: true,
      },
    },
  },
  CaseInsensitiveHashCodeProvider: {
    kind: "class",
    members: {
      CaseInsensitiveHashCodeProvider: {
        kind: "method",
        methodKind: "constructor",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      Default: {
        kind: "property",
        type: () => {
          return Collections.CaseInsensitiveHashCodeProvider;
        },
        isStatic: true,
      },
      DefaultInvariant: {
        kind: "property",
        type: () => {
          return Collections.CaseInsensitiveHashCodeProvider;
        },
        isStatic: true,
      },
    },
  },
  CollectionBase: {
    kind: "class",
    members: {
      CollectionBase: {
        kind: "method",
        methodKind: "constructor",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnClear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnClearComplete: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnInsert: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnInsertComplete: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRemove: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRemoveComplete: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnSet: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnSetComplete: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnValidate: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Capacity: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      InnerList: {
        kind: "property",
        type: () => {
          return Collections.ArrayList;
        },
      },
      List: {
        kind: "property",
        type: () => {
          return Collections.IList;
        },
      },
    },
    isAbstract: true,
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
  DictionaryBase: {
    kind: "class",
    members: {
      DictionaryBase: {
        kind: "method",
        methodKind: "constructor",
      },
      Clear: {
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
      OnClear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnClearComplete: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnGet: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnInsert: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnInsertComplete: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRemove: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRemoveComplete: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnSet: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnSetComplete: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnValidate: {
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
      Dictionary: {
        kind: "property",
        type: () => {
          return Collections.IDictionary;
        },
      },
      InnerHashtable: {
        kind: "property",
        type: () => {
          return Collections.Hashtable;
        },
      },
    },
    isAbstract: true,
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
  Queue: {
    kind: "class",
    members: {
      Queue: {
        kind: "method",
        methodKind: "constructor",
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
      Dequeue: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Enqueue: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Peek: {
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
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isVirtual: true,
      },
    },
  },
  ReadOnlyCollectionBase: {
    kind: "class",
    members: {
      ReadOnlyCollectionBase: {
        kind: "method",
        methodKind: "constructor",
      },
      GetEnumerator: {
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
      InnerList: {
        kind: "property",
        type: () => {
          return Collections.ArrayList;
        },
      },
    },
    isAbstract: true,
  },
  SortedList: {
    kind: "class",
    members: {
      SortedList: {
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
      GetByIndex: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetKeyList: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetValueList: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IndexOfKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IndexOfValue: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
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
      SetByIndex: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Synchronized: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
  Stack: {
    kind: "class",
    members: {
      Stack: {
        kind: "method",
        methodKind: "constructor",
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
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Peek: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Pop: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Push: {
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
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isVirtual: true,
      },
    },
  },
  StructuralComparisons: {
    kind: "class",
    members: {
      StructuralComparer: {
        kind: "property",
        type: () => {
          return Collections.IComparer;
        },
        isStatic: true,
      },
      StructuralEqualityComparer: {
        kind: "property",
        type: () => {
          return Collections.IEqualityComparer;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Collections
