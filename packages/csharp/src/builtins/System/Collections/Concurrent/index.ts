import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ConcurrentLibrary = LibrarySymbolReference & {
  BlockingCollection: LibrarySymbolReference & {
    BlockingCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AddToAny: LibrarySymbolReference;
    CompleteAdding: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetConsumingEnumerable: LibrarySymbolReference;
    Take: LibrarySymbolReference;
    TakeFromAny: LibrarySymbolReference;
    ToArray: LibrarySymbolReference;
    TryAdd: LibrarySymbolReference;
    TryAddToAny: LibrarySymbolReference;
    TryTake: LibrarySymbolReference;
    TryTakeFromAny: LibrarySymbolReference;
    BoundedCapacity: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsAddingCompleted: LibrarySymbolReference;
    IsCompleted: LibrarySymbolReference
  };
  ConcurrentBag: LibrarySymbolReference & {
    ConcurrentBag: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    ToArray: LibrarySymbolReference;
    TryPeek: LibrarySymbolReference;
    TryTake: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference
  };
  ConcurrentDictionary: LibrarySymbolReference & {
    AlternateLookup: LibrarySymbolReference & {
      ContainsKey: LibrarySymbolReference;
      TryAdd: LibrarySymbolReference;
      TryGetValue: LibrarySymbolReference;
      TryRemove: LibrarySymbolReference;
      Dictionary: LibrarySymbolReference;
      Item: LibrarySymbolReference
    }
  };
  ConcurrentQueue: LibrarySymbolReference & {
    ConcurrentQueue: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Enqueue: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    ToArray: LibrarySymbolReference;
    TryDequeue: LibrarySymbolReference;
    TryPeek: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference
  };
  ConcurrentStack: LibrarySymbolReference & {
    ConcurrentStack: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Push: LibrarySymbolReference;
    PushRange: LibrarySymbolReference;
    ToArray: LibrarySymbolReference;
    TryPeek: LibrarySymbolReference;
    TryPop: LibrarySymbolReference;
    TryPopRange: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference
  };
  EnumerablePartitionerOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    NoBuffering: LibrarySymbolReference
  };
  IProducerConsumerCollection: LibrarySymbolReference & {
    CopyTo: LibrarySymbolReference;
    ToArray: LibrarySymbolReference;
    TryAdd: LibrarySymbolReference;
    TryTake: LibrarySymbolReference
  };
  OrderablePartitioner: LibrarySymbolReference & {
    OrderablePartitioner: LibrarySymbolReference;
    GetDynamicPartitions: LibrarySymbolReference;
    GetOrderableDynamicPartitions: LibrarySymbolReference;
    GetOrderablePartitions: LibrarySymbolReference;
    GetPartitions: LibrarySymbolReference;
    KeysNormalized: LibrarySymbolReference;
    KeysOrderedAcrossPartitions: LibrarySymbolReference;
    KeysOrderedInEachPartition: LibrarySymbolReference
  };
  Partitioner: LibrarySymbolReference & {
    Partitioner: LibrarySymbolReference;
    GetDynamicPartitions: LibrarySymbolReference;
    GetPartitions: LibrarySymbolReference;
    SupportsDynamicPartitions: LibrarySymbolReference
  }
};
const Concurrent: ConcurrentLibrary = createLibrary("System.Collections.Concurrent", {
  BlockingCollection: {
    kind: "class",
    members: {
      BlockingCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddToAny: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompleteAdding: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetConsumingEnumerable: {
        kind: "method",
        methodKind: "ordinary",
      },
      Take: {
        kind: "method",
        methodKind: "ordinary",
      },
      TakeFromAny: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryAdd: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryAddToAny: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryTake: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryTakeFromAny: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BoundedCapacity: {
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
      IsAddingCompleted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsCompleted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ConcurrentBag: {
    kind: "class",
    members: {
      ConcurrentBag: {
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
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryPeek: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryTake: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ConcurrentDictionary: {
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
          TryRemove: {
            kind: "method",
            methodKind: "ordinary",
          },
          Dictionary: {
            kind: "property",
            type: () => {
              return Concurrent.ConcurrentDictionary;
            },
          },
          Item: {
            kind: "property",
            type: undefined,
          },
        },
      },
    },
  },
  ConcurrentQueue: {
    kind: "class",
    members: {
      ConcurrentQueue: {
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
      Enqueue: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryDequeue: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryPeek: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ConcurrentStack: {
    kind: "class",
    members: {
      ConcurrentStack: {
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
      Push: {
        kind: "method",
        methodKind: "ordinary",
      },
      PushRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryPeek: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryPop: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryPopRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  EnumerablePartitionerOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Concurrent.EnumerablePartitionerOptions;
        },
      },
      NoBuffering: {
        kind: "field",
        type: () => {
          return Concurrent.EnumerablePartitionerOptions;
        },
      },
    },
  },
  IProducerConsumerCollection: {
    kind: "interface",
    members: {
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryAdd: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryTake: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  OrderablePartitioner: {
    kind: "class",
    members: {
      OrderablePartitioner: {
        kind: "method",
        methodKind: "constructor",
      },
      GetDynamicPartitions: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetOrderableDynamicPartitions: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetOrderablePartitions: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetPartitions: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      KeysNormalized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      KeysOrderedAcrossPartitions: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      KeysOrderedInEachPartition: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isAbstract: true,
  },
  Partitioner: {
    kind: "class",
    members: {
      Partitioner: {
        kind: "method",
        methodKind: "constructor",
      },
      GetDynamicPartitions: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetPartitions: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SupportsDynamicPartitions: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
});
export default Concurrent
