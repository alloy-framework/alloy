import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type GenericLibrary = LibrarySymbolReference & {
  CollectionExtensions: LibrarySymbolReference & {

  };
  Comparer: LibrarySymbolReference & {
    Comparer: LibrarySymbolReference;
    Compare: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Default: LibrarySymbolReference
  };
  Dictionary: LibrarySymbolReference & {
    AlternateLookup: LibrarySymbolReference & {
      ContainsKey: LibrarySymbolReference;
      TryAdd: LibrarySymbolReference;
      TryGetValue: LibrarySymbolReference;
      Remove: LibrarySymbolReference;
      Dictionary: LibrarySymbolReference;
      Item: LibrarySymbolReference
    };
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    };
    KeyCollection: LibrarySymbolReference & {
      Enumerator: LibrarySymbolReference & {
        Dispose: LibrarySymbolReference;
        MoveNext: LibrarySymbolReference;
        Current: LibrarySymbolReference
      }
    };
    ValueCollection: LibrarySymbolReference & {
      Enumerator: LibrarySymbolReference & {
        Dispose: LibrarySymbolReference;
        MoveNext: LibrarySymbolReference;
        Current: LibrarySymbolReference
      }
    }
  };
  EqualityComparer: LibrarySymbolReference & {
    EqualityComparer: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Default: LibrarySymbolReference
  };
  HashSet: LibrarySymbolReference & {
    AlternateLookup: LibrarySymbolReference & {
      Add: LibrarySymbolReference;
      Contains: LibrarySymbolReference;
      Remove: LibrarySymbolReference;
      TryGetValue: LibrarySymbolReference;
      Set: LibrarySymbolReference
    };
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  IAlternateEqualityComparer: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Create: LibrarySymbolReference
  };
  IAsyncEnumerable: LibrarySymbolReference & {
    GetAsyncEnumerator: LibrarySymbolReference
  };
  IAsyncEnumerator: LibrarySymbolReference & {
    MoveNextAsync: LibrarySymbolReference;
    Current: LibrarySymbolReference
  };
  ICollection: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference
  };
  IComparer: LibrarySymbolReference & {
    Compare: LibrarySymbolReference
  };
  IDictionary: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    ContainsKey: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    TryGetValue: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Keys: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  IEnumerable: LibrarySymbolReference & {
    GetEnumerator: LibrarySymbolReference
  };
  IEnumerator: LibrarySymbolReference & {
    Current: LibrarySymbolReference
  };
  IEqualityComparer: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference
  };
  IList: LibrarySymbolReference & {
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  IReadOnlyCollection: LibrarySymbolReference & {
    Count: LibrarySymbolReference
  };
  IReadOnlyDictionary: LibrarySymbolReference & {
    ContainsKey: LibrarySymbolReference;
    TryGetValue: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Keys: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  IReadOnlyList: LibrarySymbolReference & {
    Item: LibrarySymbolReference
  };
  IReadOnlySet: LibrarySymbolReference & {
    Contains: LibrarySymbolReference;
    IsProperSubsetOf: LibrarySymbolReference;
    IsProperSupersetOf: LibrarySymbolReference;
    IsSubsetOf: LibrarySymbolReference;
    IsSupersetOf: LibrarySymbolReference;
    Overlaps: LibrarySymbolReference;
    SetEquals: LibrarySymbolReference
  };
  ISet: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    ExceptWith: LibrarySymbolReference;
    IntersectWith: LibrarySymbolReference;
    IsProperSubsetOf: LibrarySymbolReference;
    IsProperSupersetOf: LibrarySymbolReference;
    IsSubsetOf: LibrarySymbolReference;
    IsSupersetOf: LibrarySymbolReference;
    Overlaps: LibrarySymbolReference;
    SetEquals: LibrarySymbolReference;
    SymmetricExceptWith: LibrarySymbolReference;
    UnionWith: LibrarySymbolReference
  };
  KeyNotFoundException: LibrarySymbolReference & {
    KeyNotFoundException: LibrarySymbolReference
  };
  KeyValuePair: LibrarySymbolReference & {
    KeyValuePair: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  LinkedList: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  LinkedListNode: LibrarySymbolReference & {
    LinkedListNode: LibrarySymbolReference;
    List: LibrarySymbolReference;
    Next: LibrarySymbolReference;
    Previous: LibrarySymbolReference;
    Value: LibrarySymbolReference;
    ValueRef: LibrarySymbolReference
  };
  List: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  OrderedDictionary: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    };
    KeyCollection: LibrarySymbolReference & {
      Enumerator: LibrarySymbolReference & {
        MoveNext: LibrarySymbolReference;
        Current: LibrarySymbolReference
      }
    };
    ValueCollection: LibrarySymbolReference & {
      Enumerator: LibrarySymbolReference & {
        MoveNext: LibrarySymbolReference;
        Current: LibrarySymbolReference
      }
    }
  };
  PriorityQueue: LibrarySymbolReference & {
    UnorderedItemsCollection: LibrarySymbolReference & {
      Enumerator: LibrarySymbolReference & {
        Dispose: LibrarySymbolReference;
        MoveNext: LibrarySymbolReference;
        Current: LibrarySymbolReference
      }
    }
  };
  Queue: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ReferenceEqualityComparer: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Instance: LibrarySymbolReference
  };
  SortedDictionary: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    };
    KeyCollection: LibrarySymbolReference & {
      Enumerator: LibrarySymbolReference & {
        Dispose: LibrarySymbolReference;
        MoveNext: LibrarySymbolReference;
        Current: LibrarySymbolReference
      }
    };
    ValueCollection: LibrarySymbolReference & {
      Enumerator: LibrarySymbolReference & {
        Dispose: LibrarySymbolReference;
        MoveNext: LibrarySymbolReference;
        Current: LibrarySymbolReference
      }
    }
  };
  SortedList: LibrarySymbolReference & {
    SortedList: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    ContainsKey: LibrarySymbolReference;
    ContainsValue: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetKeyAtIndex: LibrarySymbolReference;
    GetValueAtIndex: LibrarySymbolReference;
    IndexOfKey: LibrarySymbolReference;
    IndexOfValue: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    SetValueAtIndex: LibrarySymbolReference;
    TrimExcess: LibrarySymbolReference;
    TryGetValue: LibrarySymbolReference;
    Capacity: LibrarySymbolReference;
    Comparer: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Keys: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  SortedSet: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  Stack: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  }
};
const Generic: GenericLibrary = createLibrary("System.Collections.Generic", {
  CollectionExtensions: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  Comparer: {
    kind: "class",
    members: {
      Comparer: {
        kind: "method",
        methodKind: "constructor",
      },
      Compare: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Default: {
        kind: "property",
        type: () => {
          return Generic.Comparer;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  Dictionary: {
    kind: "class",
    members: {
      AlternateLookup: {
        kind: "struct",
        members: {
          ContainsKey: {
            kind: "method",
            methodKind: "ordinary",
          },
          TryAdd: {
            kind: "method",
            methodKind: "ordinary",
          },
          TryGetValue: {
            kind: "method",
            methodKind: "ordinary",
          },
          Remove: {
            kind: "method",
            methodKind: "ordinary",
          },
          Dictionary: {
            kind: "property",
            type: () => {
              return Generic.Dictionary;
            },
          },
          Item: {
            kind: "property",
            type: undefined,
          },
        },
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
          Current: {
            kind: "property",
            type: () => {
              return Generic.KeyValuePair;
            },
          },
        },
      },
      KeyCollection: {
        kind: "class",
        members: {
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
              Current: {
                kind: "property",
                type: undefined,
              },
            },
          },
        },
      },
      ValueCollection: {
        kind: "class",
        members: {
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
              Current: {
                kind: "property",
                type: undefined,
              },
            },
          },
        },
      },
    },
  },
  EqualityComparer: {
    kind: "class",
    members: {
      EqualityComparer: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Default: {
        kind: "property",
        type: () => {
          return Generic.EqualityComparer;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  HashSet: {
    kind: "class",
    members: {
      AlternateLookup: {
        kind: "struct",
        members: {
          Add: {
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
          TryGetValue: {
            kind: "method",
            methodKind: "ordinary",
          },
          Set: {
            kind: "property",
            type: () => {
              return Generic.HashSet;
            },
          },
        },
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
          Current: {
            kind: "property",
            type: undefined,
          },
        },
      },
    },
  },
  IAlternateEqualityComparer: {
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
      Create: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IAsyncEnumerable: {
    kind: "interface",
    members: {
      GetAsyncEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IAsyncEnumerator: {
    kind: "interface",
    members: {
      MoveNextAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Current: {
        kind: "property",
        type: undefined,
      },
    },
  },
  ICollection: {
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
      CopyTo: {
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
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
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
      ContainsKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: undefined,
      },
      Keys: {
        kind: "property",
        type: () => {
          return Generic.ICollection;
        },
      },
      Values: {
        kind: "property",
        type: () => {
          return Generic.ICollection;
        },
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
      Current: {
        kind: "property",
        type: undefined,
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
  IList: {
    kind: "interface",
    members: {
      IndexOf: {
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
        type: undefined,
      },
    },
  },
  IReadOnlyCollection: {
    kind: "interface",
    members: {
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  IReadOnlyDictionary: {
    kind: "interface",
    members: {
      ContainsKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: undefined,
      },
      Keys: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
      },
      Values: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
      },
    },
  },
  IReadOnlyList: {
    kind: "interface",
    members: {
      Item: {
        kind: "property",
        type: undefined,
      },
    },
  },
  IReadOnlySet: {
    kind: "interface",
    members: {
      Contains: {
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
    },
  },
  ISet: {
    kind: "interface",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExceptWith: {
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
      SetEquals: {
        kind: "method",
        methodKind: "ordinary",
      },
      SymmetricExceptWith: {
        kind: "method",
        methodKind: "ordinary",
      },
      UnionWith: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  KeyNotFoundException: {
    kind: "class",
    members: {
      KeyNotFoundException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  KeyValuePair: {
    kind: "struct",
    members: {
      KeyValuePair: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Key: {
        kind: "property",
        type: undefined,
      },
      Value: {
        kind: "property",
        type: undefined,
      },
    },
  },
  LinkedList: {
    kind: "class",
    members: {
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
          Current: {
            kind: "property",
            type: undefined,
          },
        },
      },
    },
  },
  LinkedListNode: {
    kind: "class",
    members: {
      LinkedListNode: {
        kind: "method",
        methodKind: "constructor",
      },
      List: {
        kind: "property",
        type: () => {
          return Generic.LinkedList;
        },
      },
      Next: {
        kind: "property",
        type: () => {
          return Generic.LinkedListNode;
        },
        isNullable: true,
      },
      Previous: {
        kind: "property",
        type: () => {
          return Generic.LinkedListNode;
        },
        isNullable: true,
      },
      Value: {
        kind: "property",
        type: undefined,
      },
      ValueRef: {
        kind: "property",
        type: undefined,
      },
    },
    isSealed: true,
  },
  List: {
    kind: "class",
    members: {
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
          Current: {
            kind: "property",
            type: undefined,
          },
        },
      },
    },
  },
  OrderedDictionary: {
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
            type: () => {
              return Generic.KeyValuePair;
            },
            isReadOnly: true,
          },
        },
      },
      KeyCollection: {
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
                isReadOnly: true,
              },
            },
          },
        },
      },
      ValueCollection: {
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
                isReadOnly: true,
              },
            },
          },
        },
      },
    },
  },
  PriorityQueue: {
    kind: "class",
    members: {
      UnorderedItemsCollection: {
        kind: "class",
        members: {
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
              Current: {
                kind: "property",
                type: () => {
                  return System.ValueTuple;
                },
              },
            },
          },
        },
      },
    },
  },
  Queue: {
    kind: "class",
    members: {
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
          Current: {
            kind: "property",
            type: undefined,
          },
        },
      },
    },
  },
  ReferenceEqualityComparer: {
    kind: "class",
    members: {
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      Instance: {
        kind: "property",
        type: () => {
          return Generic.ReferenceEqualityComparer;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  SortedDictionary: {
    kind: "class",
    members: {
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
          Current: {
            kind: "property",
            type: () => {
              return Generic.KeyValuePair;
            },
          },
        },
      },
      KeyCollection: {
        kind: "class",
        members: {
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
              Current: {
                kind: "property",
                type: undefined,
              },
            },
          },
        },
      },
      ValueCollection: {
        kind: "class",
        members: {
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
              Current: {
                kind: "property",
                type: undefined,
              },
            },
          },
        },
      },
    },
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
      },
      Clear: {
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
      GetKeyAtIndex: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetValueAtIndex: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOfKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOfValue: {
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
      SetValueAtIndex: {
        kind: "method",
        methodKind: "ordinary",
      },
      TrimExcess: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Capacity: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Comparer: {
        kind: "property",
        type: () => {
          return Generic.IComparer;
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
      Keys: {
        kind: "property",
        type: () => {
          return Generic.IList;
        },
      },
      Values: {
        kind: "property",
        type: () => {
          return Generic.IList;
        },
      },
    },
  },
  SortedSet: {
    kind: "class",
    members: {
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
          Current: {
            kind: "property",
            type: undefined,
          },
        },
      },
    },
  },
  Stack: {
    kind: "class",
    members: {
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
          Current: {
            kind: "property",
            type: undefined,
          },
        },
      },
    },
  },
});
export default Generic
