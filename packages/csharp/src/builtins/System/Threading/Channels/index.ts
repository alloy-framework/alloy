import Generic from "../../Collections/Generic/index.js";
import System from "../../index.js";
import Tasks from "../Tasks/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ChannelsLibrary = LibrarySymbolReference & {
  BoundedChannelFullMode: LibrarySymbolReference & {
    Wait: LibrarySymbolReference;
    DropNewest: LibrarySymbolReference;
    DropOldest: LibrarySymbolReference;
    DropWrite: LibrarySymbolReference
  };
  BoundedChannelOptions: LibrarySymbolReference & {
    BoundedChannelOptions: LibrarySymbolReference;
    Capacity: LibrarySymbolReference;
    FullMode: LibrarySymbolReference
  };
  Channel: LibrarySymbolReference & {
    Channel: LibrarySymbolReference
  };
  ChannelClosedException: LibrarySymbolReference & {
    ChannelClosedException: LibrarySymbolReference
  };
  ChannelOptions: LibrarySymbolReference & {
    ChannelOptions: LibrarySymbolReference;
    AllowSynchronousContinuations: LibrarySymbolReference;
    SingleReader: LibrarySymbolReference;
    SingleWriter: LibrarySymbolReference
  };
  ChannelReader: LibrarySymbolReference & {
    ChannelReader: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadAllAsync: LibrarySymbolReference;
    TryPeek: LibrarySymbolReference;
    TryRead: LibrarySymbolReference;
    WaitToReadAsync: LibrarySymbolReference;
    CanCount: LibrarySymbolReference;
    CanPeek: LibrarySymbolReference;
    Completion: LibrarySymbolReference;
    Count: LibrarySymbolReference
  };
  ChannelWriter: LibrarySymbolReference & {
    ChannelWriter: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    TryComplete: LibrarySymbolReference;
    TryWrite: LibrarySymbolReference;
    WaitToWriteAsync: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference
  };
  UnboundedChannelOptions: LibrarySymbolReference & {
    UnboundedChannelOptions: LibrarySymbolReference
  };
  UnboundedPrioritizedChannelOptions: LibrarySymbolReference & {
    UnboundedPrioritizedChannelOptions: LibrarySymbolReference;
    Comparer: LibrarySymbolReference
  }
};
const Channels: ChannelsLibrary = createLibrary("System.Threading.Channels", {
  BoundedChannelFullMode: {
    kind: "enum",
    members: {
      Wait: {
        kind: "field",
        type: () => {
          return Channels.BoundedChannelFullMode;
        },
      },
      DropNewest: {
        kind: "field",
        type: () => {
          return Channels.BoundedChannelFullMode;
        },
      },
      DropOldest: {
        kind: "field",
        type: () => {
          return Channels.BoundedChannelFullMode;
        },
      },
      DropWrite: {
        kind: "field",
        type: () => {
          return Channels.BoundedChannelFullMode;
        },
      },
    },
  },
  BoundedChannelOptions: {
    kind: "class",
    members: {
      BoundedChannelOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      Capacity: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      FullMode: {
        kind: "property",
        type: () => {
          return Channels.BoundedChannelFullMode;
        },
      },
    },
    isSealed: true,
  },
  Channel: {
    kind: "class",
    members: {
      Channel: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isAbstract: true,
  },
  ChannelClosedException: {
    kind: "class",
    members: {
      ChannelClosedException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  ChannelOptions: {
    kind: "class",
    members: {
      ChannelOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      AllowSynchronousContinuations: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SingleReader: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SingleWriter: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isAbstract: true,
  },
  ChannelReader: {
    kind: "class",
    members: {
      ChannelReader: {
        kind: "method",
        methodKind: "constructor",
      },
      ReadAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadAllAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryPeek: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryRead: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WaitToReadAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CanCount: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      CanPeek: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Completion: {
        kind: "property",
        type: () => {
          return Tasks.Task;
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
    },
    isAbstract: true,
  },
  ChannelWriter: {
    kind: "class",
    members: {
      ChannelWriter: {
        kind: "method",
        methodKind: "constructor",
      },
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryComplete: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryWrite: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WaitToWriteAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  UnboundedChannelOptions: {
    kind: "class",
    members: {
      UnboundedChannelOptions: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  UnboundedPrioritizedChannelOptions: {
    kind: "class",
    members: {
      UnboundedPrioritizedChannelOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      Comparer: {
        kind: "property",
        type: () => {
          return Generic.IComparer;
        },
      },
    },
    isSealed: true,
  },
});
export default Channels
