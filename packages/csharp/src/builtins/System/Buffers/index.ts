import System from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Binary } from "./Binary/index.js";
export { default as Text } from "./Text/index.js";

type BuffersLibrary = LibrarySymbolReference & {
  ArrayBufferWriter: LibrarySymbolReference & {
    ArrayBufferWriter: LibrarySymbolReference;
    Advance: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    ResetWrittenCount: LibrarySymbolReference;
    GetMemory: LibrarySymbolReference;
    GetSpan: LibrarySymbolReference;
    Capacity: LibrarySymbolReference;
    FreeCapacity: LibrarySymbolReference;
    WrittenCount: LibrarySymbolReference;
    WrittenMemory: LibrarySymbolReference;
    WrittenSpan: LibrarySymbolReference
  };
  ArrayPool: LibrarySymbolReference & {
    ArrayPool: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Rent: LibrarySymbolReference;
    Return: LibrarySymbolReference;
    Shared: LibrarySymbolReference
  };
  BuffersExtensions: LibrarySymbolReference & {

  };
  IBufferWriter: LibrarySymbolReference & {
    Advance: LibrarySymbolReference;
    GetMemory: LibrarySymbolReference;
    GetSpan: LibrarySymbolReference
  };
  IMemoryOwner: LibrarySymbolReference & {
    Memory: LibrarySymbolReference
  };
  IPinnable: LibrarySymbolReference & {
    Pin: LibrarySymbolReference;
    Unpin: LibrarySymbolReference
  };
  MemoryHandle: LibrarySymbolReference & {
    MemoryHandle: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Pointer: LibrarySymbolReference
  };
  MemoryManager: LibrarySymbolReference & {
    MemoryManager: LibrarySymbolReference;
    CreateMemory: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetSpan: LibrarySymbolReference;
    Pin: LibrarySymbolReference;
    TryGetArray: LibrarySymbolReference;
    Unpin: LibrarySymbolReference;
    Memory: LibrarySymbolReference
  };
  MemoryPool: LibrarySymbolReference & {
    MemoryPool: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Rent: LibrarySymbolReference;
    MaxBufferSize: LibrarySymbolReference;
    Shared: LibrarySymbolReference
  };
  OperationStatus: LibrarySymbolReference & {
    Done: LibrarySymbolReference;
    DestinationTooSmall: LibrarySymbolReference;
    NeedMoreData: LibrarySymbolReference;
    InvalidData: LibrarySymbolReference
  };
  ReadOnlySequence: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      Enumerator: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ReadOnlySequenceSegment: LibrarySymbolReference & {
    ReadOnlySequenceSegment: LibrarySymbolReference;
    Memory: LibrarySymbolReference;
    Next: LibrarySymbolReference;
    RunningIndex: LibrarySymbolReference
  };
  ReadOnlySpanAction: LibrarySymbolReference & {
    ReadOnlySpanAction: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  SearchValues: LibrarySymbolReference & {
    Contains: LibrarySymbolReference
  };
  SequenceReader: LibrarySymbolReference & {
    SequenceReader: LibrarySymbolReference;
    Advance: LibrarySymbolReference;
    AdvancePast: LibrarySymbolReference;
    AdvancePastAny: LibrarySymbolReference;
    AdvanceToEnd: LibrarySymbolReference;
    IsNext: LibrarySymbolReference;
    Rewind: LibrarySymbolReference;
    TryAdvanceTo: LibrarySymbolReference;
    TryAdvanceToAny: LibrarySymbolReference;
    TryCopyTo: LibrarySymbolReference;
    TryPeek: LibrarySymbolReference;
    TryRead: LibrarySymbolReference;
    TryReadTo: LibrarySymbolReference;
    TryReadToAny: LibrarySymbolReference;
    TryReadExact: LibrarySymbolReference;
    Consumed: LibrarySymbolReference;
    CurrentSpan: LibrarySymbolReference;
    CurrentSpanIndex: LibrarySymbolReference;
    End: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Position: LibrarySymbolReference;
    Remaining: LibrarySymbolReference;
    Sequence: LibrarySymbolReference;
    UnreadSequence: LibrarySymbolReference;
    UnreadSpan: LibrarySymbolReference
  };
  SequenceReaderExtensions: LibrarySymbolReference & {
    TryReadBigEndian: LibrarySymbolReference;
    TryReadLittleEndian: LibrarySymbolReference
  };
  SpanAction: LibrarySymbolReference & {
    SpanAction: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  StandardFormat: LibrarySymbolReference & {
    MaxPrecision: LibrarySymbolReference;
    NoPrecision: LibrarySymbolReference;
    StandardFormat: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    HasPrecision: LibrarySymbolReference;
    IsDefault: LibrarySymbolReference;
    Precision: LibrarySymbolReference;
    Symbol: LibrarySymbolReference
  }
};
const Buffers: BuffersLibrary = createLibrary("System.Buffers", {
  ArrayBufferWriter: {
    kind: "class",
    members: {
      ArrayBufferWriter: {
        kind: "method",
        methodKind: "constructor",
      },
      Advance: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResetWrittenCount: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMemory: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSpan: {
        kind: "method",
        methodKind: "ordinary",
      },
      Capacity: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      FreeCapacity: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      WrittenCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      WrittenMemory: {
        kind: "property",
        type: () => {
          return System.ReadOnlyMemory;
        },
      },
      WrittenSpan: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
      },
    },
    isSealed: true,
  },
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
  BuffersExtensions: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  IBufferWriter: {
    kind: "interface",
    members: {
      Advance: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMemory: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSpan: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
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
  MemoryPool: {
    kind: "class",
    members: {
      MemoryPool: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Rent: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MaxBufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      Shared: {
        kind: "property",
        type: () => {
          return Buffers.MemoryPool;
        },
        isStatic: true,
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
  ReadOnlySequence: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          Enumerator: {
            kind: "method",
            methodKind: "constructor",
          },
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return System.ReadOnlyMemory;
            },
          },
        },
      },
    },
  },
  ReadOnlySequenceSegment: {
    kind: "class",
    members: {
      ReadOnlySequenceSegment: {
        kind: "method",
        methodKind: "constructor",
      },
      Memory: {
        kind: "property",
        type: () => {
          return System.ReadOnlyMemory;
        },
      },
      Next: {
        kind: "property",
        type: () => {
          return Buffers.ReadOnlySequenceSegment;
        },
        isNullable: true,
      },
      RunningIndex: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
    isAbstract: true,
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
  SequenceReader: {
    kind: "struct",
    members: {
      SequenceReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Advance: {
        kind: "method",
        methodKind: "ordinary",
      },
      AdvancePast: {
        kind: "method",
        methodKind: "ordinary",
      },
      AdvancePastAny: {
        kind: "method",
        methodKind: "ordinary",
      },
      AdvanceToEnd: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsNext: {
        kind: "method",
        methodKind: "ordinary",
      },
      Rewind: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryAdvanceTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryAdvanceToAny: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryCopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      TryPeek: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      TryRead: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadToAny: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadExact: {
        kind: "method",
        methodKind: "ordinary",
      },
      Consumed: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isReadOnly: true,
      },
      CurrentSpan: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
        isReadOnly: true,
      },
      CurrentSpanIndex: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
      End: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isReadOnly: true,
      },
      Position: {
        kind: "property",
        type: () => {
          return System.SequencePosition;
        },
        isReadOnly: true,
      },
      Remaining: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isReadOnly: true,
      },
      Sequence: {
        kind: "property",
        type: () => {
          return Buffers.ReadOnlySequence;
        },
        isReadOnly: true,
      },
      UnreadSequence: {
        kind: "property",
        type: () => {
          return Buffers.ReadOnlySequence;
        },
        isReadOnly: true,
      },
      UnreadSpan: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
        isReadOnly: true,
      },
    },
  },
  SequenceReaderExtensions: {
    kind: "class",
    members: {
      TryReadBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
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
  StandardFormat: {
    kind: "struct",
    members: {
      MaxPrecision: {
        kind: "field",
        type: () => {
          return System.Byte;
        },
      },
      NoPrecision: {
        kind: "field",
        type: () => {
          return System.Byte;
        },
      },
      StandardFormat: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HasPrecision: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsDefault: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Precision: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      Symbol: {
        kind: "property",
        type: () => {
          return System.Char;
        },
      },
    },
  },
});
export default Buffers
