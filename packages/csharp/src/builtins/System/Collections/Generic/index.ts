import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type GenericLibrary = LibrarySymbolReference & {
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
  }
};
const Generic: GenericLibrary = createLibrary("System.Collections.Generic", {
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
});
export default Generic
