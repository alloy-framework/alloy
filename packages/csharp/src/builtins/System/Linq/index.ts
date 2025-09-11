import Generic from "../Collections/Generic/index.js";
import System from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Expressions } from "./Expressions/index.js";

type LinqLibrary = LibrarySymbolReference & {
  Enumerable: LibrarySymbolReference & {
    Average: LibrarySymbolReference;
    Max: LibrarySymbolReference;
    Min: LibrarySymbolReference;
    Range: LibrarySymbolReference;
    Sum: LibrarySymbolReference
  };
  EnumerableExecutor: LibrarySymbolReference & {
    EnumerableExecutor: LibrarySymbolReference
  };
  EnumerableQuery: LibrarySymbolReference & {
    EnumerableQuery: LibrarySymbolReference;
    ToString: LibrarySymbolReference
  };
  IGrouping: LibrarySymbolReference & {
    Key: LibrarySymbolReference
  };
  ILookup: LibrarySymbolReference & {
    Contains: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  IOrderedEnumerable: LibrarySymbolReference & {

  };
  IOrderedQueryable: LibrarySymbolReference & {

  };
  IQueryProvider: LibrarySymbolReference & {
    CreateQuery: LibrarySymbolReference;
    Execute: LibrarySymbolReference
  };
  IQueryable: LibrarySymbolReference & {

  };
  ImmutableArrayExtensions: LibrarySymbolReference & {

  };
  Lookup: LibrarySymbolReference & {
    Contains: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  OrderedParallelQuery: LibrarySymbolReference & {
    GetEnumerator: LibrarySymbolReference
  };
  ParallelEnumerable: LibrarySymbolReference & {
    AsOrdered: LibrarySymbolReference;
    AsParallel: LibrarySymbolReference;
    Average: LibrarySymbolReference;
    Max: LibrarySymbolReference;
    Min: LibrarySymbolReference;
    Range: LibrarySymbolReference;
    Sum: LibrarySymbolReference
  };
  ParallelExecutionMode: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    ForceParallelism: LibrarySymbolReference
  };
  ParallelMergeOptions: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    NotBuffered: LibrarySymbolReference;
    AutoBuffered: LibrarySymbolReference;
    FullyBuffered: LibrarySymbolReference
  };
  ParallelQuery: LibrarySymbolReference & {
    GetEnumerator: LibrarySymbolReference
  };
  Queryable: LibrarySymbolReference & {
    AsQueryable: LibrarySymbolReference;
    Average: LibrarySymbolReference;
    Sum: LibrarySymbolReference
  }
};
const Linq: LinqLibrary = createLibrary("System.Linq", {
  Enumerable: {
    kind: "class",
    members: {
      Average: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Range: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sum: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  EnumerableExecutor: {
    kind: "class",
    members: {
      EnumerableExecutor: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  EnumerableQuery: {
    kind: "class",
    members: {
      EnumerableQuery: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  IGrouping: {
    kind: "interface",
    members: {
      Key: {
        kind: "property",
        type: undefined,
      },
    },
  },
  ILookup: {
    kind: "interface",
    members: {
      Contains: {
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
          return Generic.IEnumerable;
        },
      },
    },
  },
  IOrderedEnumerable: {
    kind: "interface",
    members: {},
  },
  IOrderedQueryable: {
    kind: "interface",
    members: {},
  },
  IQueryProvider: {
    kind: "interface",
    members: {
      CreateQuery: {
        kind: "method",
        methodKind: "ordinary",
      },
      Execute: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IQueryable: {
    kind: "interface",
    members: {},
  },
  ImmutableArrayExtensions: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  Lookup: {
    kind: "class",
    members: {
      Contains: {
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
      Item: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
      },
    },
  },
  OrderedParallelQuery: {
    kind: "class",
    members: {
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  ParallelEnumerable: {
    kind: "class",
    members: {
      AsOrdered: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AsParallel: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Average: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Range: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sum: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  ParallelExecutionMode: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Linq.ParallelExecutionMode;
        },
      },
      ForceParallelism: {
        kind: "field",
        type: () => {
          return Linq.ParallelExecutionMode;
        },
      },
    },
  },
  ParallelMergeOptions: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Linq.ParallelMergeOptions;
        },
      },
      NotBuffered: {
        kind: "field",
        type: () => {
          return Linq.ParallelMergeOptions;
        },
      },
      AutoBuffered: {
        kind: "field",
        type: () => {
          return Linq.ParallelMergeOptions;
        },
      },
      FullyBuffered: {
        kind: "field",
        type: () => {
          return Linq.ParallelMergeOptions;
        },
      },
    },
  },
  ParallelQuery: {
    kind: "class",
    members: {
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  Queryable: {
    kind: "class",
    members: {
      AsQueryable: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Average: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sum: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Linq
