import Generic from "../Generic/index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ImmutableLibrary = LibrarySymbolReference & {
  IImmutableDictionary: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveRange: LibrarySymbolReference;
    SetItem: LibrarySymbolReference;
    SetItems: LibrarySymbolReference;
    TryGetKey: LibrarySymbolReference
  };
  IImmutableList: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    InsertRange: LibrarySymbolReference;
    LastIndexOf: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAll: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    RemoveRange: LibrarySymbolReference;
    Replace: LibrarySymbolReference;
    SetItem: LibrarySymbolReference
  };
  IImmutableQueue: LibrarySymbolReference & {
    Clear: LibrarySymbolReference;
    Dequeue: LibrarySymbolReference;
    Enqueue: LibrarySymbolReference;
    Peek: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference
  };
  IImmutableSet: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    Except: LibrarySymbolReference;
    Intersect: LibrarySymbolReference;
    IsProperSubsetOf: LibrarySymbolReference;
    IsProperSupersetOf: LibrarySymbolReference;
    IsSubsetOf: LibrarySymbolReference;
    IsSupersetOf: LibrarySymbolReference;
    Overlaps: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    SetEquals: LibrarySymbolReference;
    SymmetricExcept: LibrarySymbolReference;
    TryGetValue: LibrarySymbolReference;
    Union: LibrarySymbolReference
  };
  IImmutableStack: LibrarySymbolReference & {
    Clear: LibrarySymbolReference;
    Peek: LibrarySymbolReference;
    Pop: LibrarySymbolReference;
    Push: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference
  };
  ImmutableArray: LibrarySymbolReference & {
    Builder: LibrarySymbolReference & {
      Add: LibrarySymbolReference;
      AddRange: LibrarySymbolReference;
      Clear: LibrarySymbolReference;
      Contains: LibrarySymbolReference;
      CopyTo: LibrarySymbolReference;
      DrainToImmutable: LibrarySymbolReference;
      GetEnumerator: LibrarySymbolReference;
      IndexOf: LibrarySymbolReference;
      Insert: LibrarySymbolReference;
      InsertRange: LibrarySymbolReference;
      ItemRef: LibrarySymbolReference;
      LastIndexOf: LibrarySymbolReference;
      MoveToImmutable: LibrarySymbolReference;
      Remove: LibrarySymbolReference;
      RemoveAll: LibrarySymbolReference;
      RemoveAt: LibrarySymbolReference;
      RemoveRange: LibrarySymbolReference;
      Replace: LibrarySymbolReference;
      Reverse: LibrarySymbolReference;
      Sort: LibrarySymbolReference;
      ToArray: LibrarySymbolReference;
      ToImmutable: LibrarySymbolReference;
      Capacity: LibrarySymbolReference;
      Count: LibrarySymbolReference;
      Item: LibrarySymbolReference
    };
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ImmutableDictionary: LibrarySymbolReference & {
    Builder: LibrarySymbolReference & {
      Add: LibrarySymbolReference;
      AddRange: LibrarySymbolReference;
      Clear: LibrarySymbolReference;
      Contains: LibrarySymbolReference;
      ContainsKey: LibrarySymbolReference;
      ContainsValue: LibrarySymbolReference;
      GetEnumerator: LibrarySymbolReference;
      GetValueOrDefault: LibrarySymbolReference;
      Remove: LibrarySymbolReference;
      RemoveRange: LibrarySymbolReference;
      ToImmutable: LibrarySymbolReference;
      TryGetKey: LibrarySymbolReference;
      TryGetValue: LibrarySymbolReference;
      Count: LibrarySymbolReference;
      Item: LibrarySymbolReference;
      KeyComparer: LibrarySymbolReference;
      Keys: LibrarySymbolReference;
      ValueComparer: LibrarySymbolReference;
      Values: LibrarySymbolReference
    };
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Reset: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ImmutableHashSet: LibrarySymbolReference & {
    Builder: LibrarySymbolReference & {
      Add: LibrarySymbolReference;
      Clear: LibrarySymbolReference;
      Contains: LibrarySymbolReference;
      ExceptWith: LibrarySymbolReference;
      GetEnumerator: LibrarySymbolReference;
      IntersectWith: LibrarySymbolReference;
      IsProperSubsetOf: LibrarySymbolReference;
      IsProperSupersetOf: LibrarySymbolReference;
      IsSubsetOf: LibrarySymbolReference;
      IsSupersetOf: LibrarySymbolReference;
      Overlaps: LibrarySymbolReference;
      Remove: LibrarySymbolReference;
      SetEquals: LibrarySymbolReference;
      SymmetricExceptWith: LibrarySymbolReference;
      TryGetValue: LibrarySymbolReference;
      ToImmutable: LibrarySymbolReference;
      UnionWith: LibrarySymbolReference;
      Count: LibrarySymbolReference;
      KeyComparer: LibrarySymbolReference
    };
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Reset: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ImmutableInterlocked: LibrarySymbolReference & {

  };
  ImmutableList: LibrarySymbolReference & {
    Builder: LibrarySymbolReference & {
      Add: LibrarySymbolReference;
      AddRange: LibrarySymbolReference;
      BinarySearch: LibrarySymbolReference;
      Clear: LibrarySymbolReference;
      Contains: LibrarySymbolReference;
      CopyTo: LibrarySymbolReference;
      Exists: LibrarySymbolReference;
      Find: LibrarySymbolReference;
      FindAll: LibrarySymbolReference;
      FindIndex: LibrarySymbolReference;
      FindLast: LibrarySymbolReference;
      FindLastIndex: LibrarySymbolReference;
      ForEach: LibrarySymbolReference;
      GetEnumerator: LibrarySymbolReference;
      GetRange: LibrarySymbolReference;
      IndexOf: LibrarySymbolReference;
      Insert: LibrarySymbolReference;
      InsertRange: LibrarySymbolReference;
      ItemRef: LibrarySymbolReference;
      LastIndexOf: LibrarySymbolReference;
      Remove: LibrarySymbolReference;
      RemoveAll: LibrarySymbolReference;
      RemoveAt: LibrarySymbolReference;
      RemoveRange: LibrarySymbolReference;
      Replace: LibrarySymbolReference;
      Reverse: LibrarySymbolReference;
      Sort: LibrarySymbolReference;
      ToImmutable: LibrarySymbolReference;
      TrueForAll: LibrarySymbolReference;
      Count: LibrarySymbolReference;
      Item: LibrarySymbolReference
    };
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Reset: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ImmutableQueue: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ImmutableSortedDictionary: LibrarySymbolReference & {
    Builder: LibrarySymbolReference & {
      Add: LibrarySymbolReference;
      AddRange: LibrarySymbolReference;
      Clear: LibrarySymbolReference;
      Contains: LibrarySymbolReference;
      ContainsKey: LibrarySymbolReference;
      ContainsValue: LibrarySymbolReference;
      GetEnumerator: LibrarySymbolReference;
      GetValueOrDefault: LibrarySymbolReference;
      Remove: LibrarySymbolReference;
      RemoveRange: LibrarySymbolReference;
      ToImmutable: LibrarySymbolReference;
      TryGetKey: LibrarySymbolReference;
      TryGetValue: LibrarySymbolReference;
      ValueRef: LibrarySymbolReference;
      Count: LibrarySymbolReference;
      Item: LibrarySymbolReference;
      KeyComparer: LibrarySymbolReference;
      Keys: LibrarySymbolReference;
      ValueComparer: LibrarySymbolReference;
      Values: LibrarySymbolReference
    };
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Reset: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ImmutableSortedSet: LibrarySymbolReference & {
    Builder: LibrarySymbolReference & {
      Add: LibrarySymbolReference;
      Clear: LibrarySymbolReference;
      Contains: LibrarySymbolReference;
      ExceptWith: LibrarySymbolReference;
      GetEnumerator: LibrarySymbolReference;
      IntersectWith: LibrarySymbolReference;
      IndexOf: LibrarySymbolReference;
      IsProperSubsetOf: LibrarySymbolReference;
      IsProperSupersetOf: LibrarySymbolReference;
      IsSubsetOf: LibrarySymbolReference;
      IsSupersetOf: LibrarySymbolReference;
      ItemRef: LibrarySymbolReference;
      Overlaps: LibrarySymbolReference;
      Remove: LibrarySymbolReference;
      Reverse: LibrarySymbolReference;
      SetEquals: LibrarySymbolReference;
      SymmetricExceptWith: LibrarySymbolReference;
      TryGetValue: LibrarySymbolReference;
      ToImmutable: LibrarySymbolReference;
      UnionWith: LibrarySymbolReference;
      Count: LibrarySymbolReference;
      Item: LibrarySymbolReference;
      KeyComparer: LibrarySymbolReference;
      Max: LibrarySymbolReference;
      Min: LibrarySymbolReference
    };
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Reset: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ImmutableStack: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  }
};
const Immutable: ImmutableLibrary = createLibrary("System.Collections.Immutable", {
  IImmutableDictionary: {
    kind: "interface",
    members: {
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
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetItem: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetItems: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetKey: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IImmutableList: {
    kind: "interface",
    members: {
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
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      InsertRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      LastIndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      Replace: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetItem: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IImmutableQueue: {
    kind: "interface",
    members: {
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dequeue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Enqueue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Peek: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  IImmutableSet: {
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
      Except: {
        kind: "method",
        methodKind: "ordinary",
      },
      Intersect: {
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
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetEquals: {
        kind: "method",
        methodKind: "ordinary",
      },
      SymmetricExcept: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Union: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IImmutableStack: {
    kind: "interface",
    members: {
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      Peek: {
        kind: "method",
        methodKind: "ordinary",
      },
      Pop: {
        kind: "method",
        methodKind: "ordinary",
      },
      Push: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ImmutableArray: {
    kind: "class",
    members: {
      Builder: {
        kind: "class",
        members: {
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
          DrainToImmutable: {
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
          InsertRange: {
            kind: "method",
            methodKind: "ordinary",
          },
          ItemRef: {
            kind: "method",
            methodKind: "ordinary",
            isReadOnly: true,
          },
          LastIndexOf: {
            kind: "method",
            methodKind: "ordinary",
          },
          MoveToImmutable: {
            kind: "method",
            methodKind: "ordinary",
          },
          Remove: {
            kind: "method",
            methodKind: "ordinary",
          },
          RemoveAll: {
            kind: "method",
            methodKind: "ordinary",
          },
          RemoveAt: {
            kind: "method",
            methodKind: "ordinary",
          },
          RemoveRange: {
            kind: "method",
            methodKind: "ordinary",
          },
          Replace: {
            kind: "method",
            methodKind: "ordinary",
          },
          Reverse: {
            kind: "method",
            methodKind: "ordinary",
          },
          Sort: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToArray: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToImmutable: {
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
          Item: {
            kind: "property",
            type: undefined,
          },
        },
        isSealed: true,
      },
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: undefined,
          },
        },
      },
    },
  },
  ImmutableDictionary: {
    kind: "class",
    members: {
      Builder: {
        kind: "class",
        members: {
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
          ContainsKey: {
            kind: "method",
            methodKind: "ordinary",
          },
          ContainsValue: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetEnumerator: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetValueOrDefault: {
            kind: "method",
            methodKind: "ordinary",
          },
          Remove: {
            kind: "method",
            methodKind: "ordinary",
          },
          RemoveRange: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToImmutable: {
            kind: "method",
            methodKind: "ordinary",
          },
          TryGetKey: {
            kind: "method",
            methodKind: "ordinary",
          },
          TryGetValue: {
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
            type: undefined,
          },
          KeyComparer: {
            kind: "property",
            type: () => {
              return Generic.IEqualityComparer;
            },
          },
          Keys: {
            kind: "property",
            type: () => {
              return Generic.IEnumerable;
            },
          },
          ValueComparer: {
            kind: "property",
            type: () => {
              return Generic.IEqualityComparer;
            },
          },
          Values: {
            kind: "property",
            type: () => {
              return Generic.IEnumerable;
            },
          },
        },
        isSealed: true,
      },
      Enumerator: {
        kind: "struct",
        members: {
          Dispose: {
            kind: "method",
            methodKind: "ordinary",
          },
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
              return Generic.KeyValuePair;
            },
          },
        },
      },
    },
  },
  ImmutableHashSet: {
    kind: "class",
    members: {
      Builder: {
        kind: "class",
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
          ExceptWith: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetEnumerator: {
            kind: "method",
            methodKind: "ordinary",
          },
          IntersectWith: {
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
          Remove: {
            kind: "method",
            methodKind: "ordinary",
          },
          SetEquals: {
            kind: "method",
            methodKind: "ordinary",
          },
          SymmetricExceptWith: {
            kind: "method",
            methodKind: "ordinary",
          },
          TryGetValue: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToImmutable: {
            kind: "method",
            methodKind: "ordinary",
          },
          UnionWith: {
            kind: "method",
            methodKind: "ordinary",
          },
          Count: {
            kind: "property",
            type: () => {
              return System.Int32;
            },
          },
          KeyComparer: {
            kind: "property",
            type: () => {
              return Generic.IEqualityComparer;
            },
          },
        },
        isSealed: true,
      },
      Enumerator: {
        kind: "struct",
        members: {
          Dispose: {
            kind: "method",
            methodKind: "ordinary",
          },
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
            type: undefined,
          },
        },
      },
    },
  },
  ImmutableInterlocked: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  ImmutableList: {
    kind: "class",
    members: {
      Builder: {
        kind: "class",
        members: {
          Add: {
            kind: "method",
            methodKind: "ordinary",
          },
          AddRange: {
            kind: "method",
            methodKind: "ordinary",
          },
          BinarySearch: {
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
          Exists: {
            kind: "method",
            methodKind: "ordinary",
          },
          Find: {
            kind: "method",
            methodKind: "ordinary",
          },
          FindAll: {
            kind: "method",
            methodKind: "ordinary",
          },
          FindIndex: {
            kind: "method",
            methodKind: "ordinary",
          },
          FindLast: {
            kind: "method",
            methodKind: "ordinary",
          },
          FindLastIndex: {
            kind: "method",
            methodKind: "ordinary",
          },
          ForEach: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetEnumerator: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetRange: {
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
          InsertRange: {
            kind: "method",
            methodKind: "ordinary",
          },
          ItemRef: {
            kind: "method",
            methodKind: "ordinary",
            isReadOnly: true,
          },
          LastIndexOf: {
            kind: "method",
            methodKind: "ordinary",
          },
          Remove: {
            kind: "method",
            methodKind: "ordinary",
          },
          RemoveAll: {
            kind: "method",
            methodKind: "ordinary",
          },
          RemoveAt: {
            kind: "method",
            methodKind: "ordinary",
          },
          RemoveRange: {
            kind: "method",
            methodKind: "ordinary",
          },
          Replace: {
            kind: "method",
            methodKind: "ordinary",
          },
          Reverse: {
            kind: "method",
            methodKind: "ordinary",
          },
          Sort: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToImmutable: {
            kind: "method",
            methodKind: "ordinary",
          },
          TrueForAll: {
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
            type: undefined,
          },
        },
        isSealed: true,
      },
      Enumerator: {
        kind: "struct",
        members: {
          Dispose: {
            kind: "method",
            methodKind: "ordinary",
          },
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
            type: undefined,
          },
        },
      },
    },
  },
  ImmutableQueue: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: undefined,
          },
        },
      },
    },
  },
  ImmutableSortedDictionary: {
    kind: "class",
    members: {
      Builder: {
        kind: "class",
        members: {
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
          ContainsKey: {
            kind: "method",
            methodKind: "ordinary",
          },
          ContainsValue: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetEnumerator: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetValueOrDefault: {
            kind: "method",
            methodKind: "ordinary",
          },
          Remove: {
            kind: "method",
            methodKind: "ordinary",
          },
          RemoveRange: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToImmutable: {
            kind: "method",
            methodKind: "ordinary",
          },
          TryGetKey: {
            kind: "method",
            methodKind: "ordinary",
          },
          TryGetValue: {
            kind: "method",
            methodKind: "ordinary",
          },
          ValueRef: {
            kind: "method",
            methodKind: "ordinary",
            isReadOnly: true,
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
          KeyComparer: {
            kind: "property",
            type: () => {
              return Generic.IComparer;
            },
          },
          Keys: {
            kind: "property",
            type: () => {
              return Generic.IEnumerable;
            },
          },
          ValueComparer: {
            kind: "property",
            type: () => {
              return Generic.IEqualityComparer;
            },
          },
          Values: {
            kind: "property",
            type: () => {
              return Generic.IEnumerable;
            },
          },
        },
        isSealed: true,
      },
      Enumerator: {
        kind: "struct",
        members: {
          Dispose: {
            kind: "method",
            methodKind: "ordinary",
          },
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
              return Generic.KeyValuePair;
            },
          },
        },
      },
    },
  },
  ImmutableSortedSet: {
    kind: "class",
    members: {
      Builder: {
        kind: "class",
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
          ExceptWith: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetEnumerator: {
            kind: "method",
            methodKind: "ordinary",
          },
          IntersectWith: {
            kind: "method",
            methodKind: "ordinary",
          },
          IndexOf: {
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
          ItemRef: {
            kind: "method",
            methodKind: "ordinary",
            isReadOnly: true,
          },
          Overlaps: {
            kind: "method",
            methodKind: "ordinary",
          },
          Remove: {
            kind: "method",
            methodKind: "ordinary",
          },
          Reverse: {
            kind: "method",
            methodKind: "ordinary",
          },
          SetEquals: {
            kind: "method",
            methodKind: "ordinary",
          },
          SymmetricExceptWith: {
            kind: "method",
            methodKind: "ordinary",
          },
          TryGetValue: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToImmutable: {
            kind: "method",
            methodKind: "ordinary",
          },
          UnionWith: {
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
            type: undefined,
          },
          KeyComparer: {
            kind: "property",
            type: () => {
              return Generic.IComparer;
            },
          },
          Max: {
            kind: "property",
            type: undefined,
            isNullable: true,
          },
          Min: {
            kind: "property",
            type: undefined,
            isNullable: true,
          },
        },
        isSealed: true,
      },
      Enumerator: {
        kind: "struct",
        members: {
          Dispose: {
            kind: "method",
            methodKind: "ordinary",
          },
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
            type: undefined,
          },
        },
      },
    },
  },
  ImmutableStack: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: undefined,
          },
        },
      },
    },
  },
});
export default Immutable
