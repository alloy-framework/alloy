import System from "../index.js";

import { createLibrary } from "#createLibrary";
export { default as Text } from "./Text/index.js";

const Buffers = createLibrary("System.Buffers", {
  ArrayPool: {
    kind: "class",
    members: {
      ArrayPool: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Rent: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Return: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Shared: {
        kind: "property",
        type: () => {
          return Buffers.ArrayPool;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  IMemoryOwner: {
    kind: "interface",
    members: {
      Memory: {
        kind: "property",
        type: () => {
          return System.Memory;
        },
      },
    },
  },
  IPinnable: {
    kind: "interface",
    members: {
      Pin: {
        kind: "method",
        methodKind: "ordinary",
      },
      Unpin: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  MemoryHandle: {
    kind: "struct",
    members: {
      MemoryHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Pointer: {
        kind: "property",
        type: () => {
          return System.Void;
        },
      },
    },
  },
  MemoryManager: {
    kind: "class",
    members: {
      MemoryManager: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateMemory: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetSpan: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Pin: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      TryGetArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Unpin: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Memory: {
        kind: "property",
        type: () => {
          return System.Memory;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  OperationStatus: {
    kind: "enum",
    members: {
      Done: {
        kind: "field",
        type: () => {
          return Buffers.OperationStatus;
        },
      },
      DestinationTooSmall: {
        kind: "field",
        type: () => {
          return Buffers.OperationStatus;
        },
      },
      NeedMoreData: {
        kind: "field",
        type: () => {
          return Buffers.OperationStatus;
        },
      },
      InvalidData: {
        kind: "field",
        type: () => {
          return Buffers.OperationStatus;
        },
      },
    },
  },
  ReadOnlySpanAction: {
    kind: "generic",
    members: {
      ReadOnlySpanAction: {
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
  SearchValues: {
    kind: "class",
    members: {
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  SpanAction: {
    kind: "generic",
    members: {
      SpanAction: {
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
});
export default Buffers
