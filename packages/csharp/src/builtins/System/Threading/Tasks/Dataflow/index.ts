import System from "../../../index.js";
import Threading from "../../index.js";
import Tasks from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type DataflowLibrary = LibrarySymbolReference & {
  ActionBlock: LibrarySymbolReference & {
    ActionBlock: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    Post: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Completion: LibrarySymbolReference;
    InputCount: LibrarySymbolReference
  };
  BatchBlock: LibrarySymbolReference & {
    BatchBlock: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    LinkTo: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TriggerBatch: LibrarySymbolReference;
    TryReceive: LibrarySymbolReference;
    TryReceiveAll: LibrarySymbolReference;
    BatchSize: LibrarySymbolReference;
    Completion: LibrarySymbolReference;
    OutputCount: LibrarySymbolReference
  };
  BatchedJoinBlock: LibrarySymbolReference & {
    BatchedJoinBlock: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    LinkTo: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryReceive: LibrarySymbolReference;
    TryReceiveAll: LibrarySymbolReference;
    BatchSize: LibrarySymbolReference;
    Completion: LibrarySymbolReference;
    OutputCount: LibrarySymbolReference;
    Target1: LibrarySymbolReference;
    Target2: LibrarySymbolReference
  };
  BroadcastBlock: LibrarySymbolReference & {
    BroadcastBlock: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    LinkTo: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryReceive: LibrarySymbolReference;
    Completion: LibrarySymbolReference
  };
  BufferBlock: LibrarySymbolReference & {
    BufferBlock: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    LinkTo: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryReceive: LibrarySymbolReference;
    TryReceiveAll: LibrarySymbolReference;
    Completion: LibrarySymbolReference;
    Count: LibrarySymbolReference
  };
  DataflowBlock: LibrarySymbolReference & {

  };
  DataflowBlockOptions: LibrarySymbolReference & {
    Unbounded: LibrarySymbolReference;
    DataflowBlockOptions: LibrarySymbolReference;
    BoundedCapacity: LibrarySymbolReference;
    CancellationToken: LibrarySymbolReference;
    EnsureOrdered: LibrarySymbolReference;
    MaxMessagesPerTask: LibrarySymbolReference;
    NameFormat: LibrarySymbolReference;
    TaskScheduler: LibrarySymbolReference
  };
  DataflowLinkOptions: LibrarySymbolReference & {
    DataflowLinkOptions: LibrarySymbolReference;
    Append: LibrarySymbolReference;
    MaxMessages: LibrarySymbolReference;
    PropagateCompletion: LibrarySymbolReference
  };
  DataflowMessageHeader: LibrarySymbolReference & {
    DataflowMessageHeader: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Id: LibrarySymbolReference;
    IsValid: LibrarySymbolReference
  };
  DataflowMessageStatus: LibrarySymbolReference & {
    Accepted: LibrarySymbolReference;
    Declined: LibrarySymbolReference;
    Postponed: LibrarySymbolReference;
    NotAvailable: LibrarySymbolReference;
    DecliningPermanently: LibrarySymbolReference
  };
  ExecutionDataflowBlockOptions: LibrarySymbolReference & {
    ExecutionDataflowBlockOptions: LibrarySymbolReference;
    MaxDegreeOfParallelism: LibrarySymbolReference;
    SingleProducerConstrained: LibrarySymbolReference
  };
  GroupingDataflowBlockOptions: LibrarySymbolReference & {
    GroupingDataflowBlockOptions: LibrarySymbolReference;
    Greedy: LibrarySymbolReference;
    MaxNumberOfGroups: LibrarySymbolReference
  };
  IDataflowBlock: LibrarySymbolReference & {
    Complete: LibrarySymbolReference;
    Fault: LibrarySymbolReference;
    Completion: LibrarySymbolReference
  };
  IPropagatorBlock: LibrarySymbolReference & {

  };
  IReceivableSourceBlock: LibrarySymbolReference & {
    TryReceive: LibrarySymbolReference;
    TryReceiveAll: LibrarySymbolReference
  };
  ISourceBlock: LibrarySymbolReference & {
    ConsumeMessage: LibrarySymbolReference;
    LinkTo: LibrarySymbolReference;
    ReleaseReservation: LibrarySymbolReference;
    ReserveMessage: LibrarySymbolReference
  };
  ITargetBlock: LibrarySymbolReference & {
    OfferMessage: LibrarySymbolReference
  };
  JoinBlock: LibrarySymbolReference & {
    JoinBlock: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    LinkTo: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryReceive: LibrarySymbolReference;
    TryReceiveAll: LibrarySymbolReference;
    Completion: LibrarySymbolReference;
    OutputCount: LibrarySymbolReference;
    Target1: LibrarySymbolReference;
    Target2: LibrarySymbolReference
  };
  TransformBlock: LibrarySymbolReference & {
    TransformBlock: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    LinkTo: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryReceive: LibrarySymbolReference;
    TryReceiveAll: LibrarySymbolReference;
    Completion: LibrarySymbolReference;
    InputCount: LibrarySymbolReference;
    OutputCount: LibrarySymbolReference
  };
  TransformManyBlock: LibrarySymbolReference & {
    TransformManyBlock: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    LinkTo: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryReceive: LibrarySymbolReference;
    TryReceiveAll: LibrarySymbolReference;
    Completion: LibrarySymbolReference;
    InputCount: LibrarySymbolReference;
    OutputCount: LibrarySymbolReference
  };
  WriteOnceBlock: LibrarySymbolReference & {
    WriteOnceBlock: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    LinkTo: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryReceive: LibrarySymbolReference;
    Completion: LibrarySymbolReference
  }
};
const Dataflow: DataflowLibrary = createLibrary("System.Threading.Tasks.Dataflow", {
  ActionBlock: {
    kind: "class",
    members: {
      ActionBlock: {
        kind: "method",
        methodKind: "constructor",
      },
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
      Post: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Completion: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
      },
      InputCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  BatchBlock: {
    kind: "class",
    members: {
      BatchBlock: {
        kind: "method",
        methodKind: "constructor",
      },
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
      LinkTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TriggerBatch: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReceive: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReceiveAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      BatchSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Completion: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
      },
      OutputCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  BatchedJoinBlock: {
    kind: "class",
    members: {
      BatchedJoinBlock: {
        kind: "method",
        methodKind: "constructor",
      },
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
      LinkTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryReceive: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReceiveAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      BatchSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Completion: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
      },
      OutputCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Target1: {
        kind: "property",
        type: () => {
          return Dataflow.ITargetBlock;
        },
      },
      Target2: {
        kind: "property",
        type: () => {
          return Dataflow.ITargetBlock;
        },
      },
    },
    isSealed: true,
  },
  BroadcastBlock: {
    kind: "class",
    members: {
      BroadcastBlock: {
        kind: "method",
        methodKind: "constructor",
      },
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
      LinkTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryReceive: {
        kind: "method",
        methodKind: "ordinary",
      },
      Completion: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
      },
    },
    isSealed: true,
  },
  BufferBlock: {
    kind: "class",
    members: {
      BufferBlock: {
        kind: "method",
        methodKind: "constructor",
      },
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
      LinkTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryReceive: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReceiveAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      Completion: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
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
  DataflowBlock: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  DataflowBlockOptions: {
    kind: "class",
    members: {
      Unbounded: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      DataflowBlockOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      BoundedCapacity: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      CancellationToken: {
        kind: "property",
        type: () => {
          return Threading.CancellationToken;
        },
      },
      EnsureOrdered: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MaxMessagesPerTask: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      NameFormat: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      TaskScheduler: {
        kind: "property",
        type: () => {
          return Tasks.TaskScheduler;
        },
      },
    },
  },
  DataflowLinkOptions: {
    kind: "class",
    members: {
      DataflowLinkOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      Append: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MaxMessages: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PropagateCompletion: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  DataflowMessageHeader: {
    kind: "struct",
    members: {
      DataflowMessageHeader: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Id: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      IsValid: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  DataflowMessageStatus: {
    kind: "enum",
    members: {
      Accepted: {
        kind: "field",
        type: () => {
          return Dataflow.DataflowMessageStatus;
        },
      },
      Declined: {
        kind: "field",
        type: () => {
          return Dataflow.DataflowMessageStatus;
        },
      },
      Postponed: {
        kind: "field",
        type: () => {
          return Dataflow.DataflowMessageStatus;
        },
      },
      NotAvailable: {
        kind: "field",
        type: () => {
          return Dataflow.DataflowMessageStatus;
        },
      },
      DecliningPermanently: {
        kind: "field",
        type: () => {
          return Dataflow.DataflowMessageStatus;
        },
      },
    },
  },
  ExecutionDataflowBlockOptions: {
    kind: "class",
    members: {
      ExecutionDataflowBlockOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      MaxDegreeOfParallelism: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SingleProducerConstrained: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  GroupingDataflowBlockOptions: {
    kind: "class",
    members: {
      GroupingDataflowBlockOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      Greedy: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MaxNumberOfGroups: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  IDataflowBlock: {
    kind: "interface",
    members: {
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
      Fault: {
        kind: "method",
        methodKind: "ordinary",
      },
      Completion: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
      },
    },
  },
  IPropagatorBlock: {
    kind: "interface",
    members: {},
  },
  IReceivableSourceBlock: {
    kind: "interface",
    members: {
      TryReceive: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReceiveAll: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISourceBlock: {
    kind: "interface",
    members: {
      ConsumeMessage: {
        kind: "method",
        methodKind: "ordinary",
      },
      LinkTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReleaseReservation: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReserveMessage: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ITargetBlock: {
    kind: "interface",
    members: {
      OfferMessage: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  JoinBlock: {
    kind: "class",
    members: {
      JoinBlock: {
        kind: "method",
        methodKind: "constructor",
      },
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
      LinkTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryReceive: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReceiveAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      Completion: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
      },
      OutputCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Target1: {
        kind: "property",
        type: () => {
          return Dataflow.ITargetBlock;
        },
      },
      Target2: {
        kind: "property",
        type: () => {
          return Dataflow.ITargetBlock;
        },
      },
    },
    isSealed: true,
  },
  TransformBlock: {
    kind: "class",
    members: {
      TransformBlock: {
        kind: "method",
        methodKind: "constructor",
      },
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
      LinkTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryReceive: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReceiveAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      Completion: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
      },
      InputCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      OutputCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  TransformManyBlock: {
    kind: "class",
    members: {
      TransformManyBlock: {
        kind: "method",
        methodKind: "constructor",
      },
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
      LinkTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryReceive: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReceiveAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      Completion: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
      },
      InputCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      OutputCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  WriteOnceBlock: {
    kind: "class",
    members: {
      WriteOnceBlock: {
        kind: "method",
        methodKind: "constructor",
      },
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
      LinkTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryReceive: {
        kind: "method",
        methodKind: "ordinary",
      },
      Completion: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
      },
    },
    isSealed: true,
  },
});
export default Dataflow
