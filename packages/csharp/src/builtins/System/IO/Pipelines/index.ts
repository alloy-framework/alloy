import Buffers from "../../Buffers/index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type PipelinesLibrary = LibrarySymbolReference & {
  FlushResult: LibrarySymbolReference & {
    FlushResult: LibrarySymbolReference;
    IsCanceled: LibrarySymbolReference;
    IsCompleted: LibrarySymbolReference
  };
  IDuplexPipe: LibrarySymbolReference & {
    Input: LibrarySymbolReference;
    Output: LibrarySymbolReference
  };
  Pipe: LibrarySymbolReference & {
    Pipe: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Reader: LibrarySymbolReference;
    Writer: LibrarySymbolReference
  };
  PipeOptions: LibrarySymbolReference & {
    PipeOptions: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    MinimumSegmentSize: LibrarySymbolReference;
    PauseWriterThreshold: LibrarySymbolReference;
    Pool: LibrarySymbolReference;
    ReaderScheduler: LibrarySymbolReference;
    ResumeWriterThreshold: LibrarySymbolReference;
    UseSynchronizationContext: LibrarySymbolReference;
    WriterScheduler: LibrarySymbolReference
  };
  PipeReader: LibrarySymbolReference & {
    PipeReader: LibrarySymbolReference;
    AdvanceTo: LibrarySymbolReference;
    AsStream: LibrarySymbolReference;
    CancelPendingRead: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    CompleteAsync: LibrarySymbolReference;
    CopyToAsync: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    OnWriterCompleted: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadAtLeastAsync: LibrarySymbolReference;
    ReadAtLeastAsyncCore: LibrarySymbolReference;
    TryRead: LibrarySymbolReference
  };
  PipeScheduler: LibrarySymbolReference & {
    PipeScheduler: LibrarySymbolReference;
    Schedule: LibrarySymbolReference;
    Inline: LibrarySymbolReference;
    ThreadPool: LibrarySymbolReference
  };
  PipeWriter: LibrarySymbolReference & {
    PipeWriter: LibrarySymbolReference;
    Advance: LibrarySymbolReference;
    AsStream: LibrarySymbolReference;
    CancelPendingFlush: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    CompleteAsync: LibrarySymbolReference;
    CopyFromAsync: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    GetMemory: LibrarySymbolReference;
    GetSpan: LibrarySymbolReference;
    OnReaderCompleted: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    CanGetUnflushedBytes: LibrarySymbolReference;
    UnflushedBytes: LibrarySymbolReference
  };
  ReadResult: LibrarySymbolReference & {
    ReadResult: LibrarySymbolReference;
    Buffer: LibrarySymbolReference;
    IsCanceled: LibrarySymbolReference;
    IsCompleted: LibrarySymbolReference
  };
  StreamPipeExtensions: LibrarySymbolReference & {
    CopyToAsync: LibrarySymbolReference
  };
  StreamPipeReaderOptions: LibrarySymbolReference & {
    StreamPipeReaderOptions: LibrarySymbolReference;
    BufferSize: LibrarySymbolReference;
    LeaveOpen: LibrarySymbolReference;
    MinimumReadSize: LibrarySymbolReference;
    Pool: LibrarySymbolReference;
    UseZeroByteReads: LibrarySymbolReference
  };
  StreamPipeWriterOptions: LibrarySymbolReference & {
    StreamPipeWriterOptions: LibrarySymbolReference;
    LeaveOpen: LibrarySymbolReference;
    MinimumBufferSize: LibrarySymbolReference;
    Pool: LibrarySymbolReference
  }
};
const Pipelines: PipelinesLibrary = createLibrary("System.IO.Pipelines", {
  FlushResult: {
    kind: "struct",
    members: {
      FlushResult: {
        kind: "method",
        methodKind: "constructor",
      },
      IsCanceled: {
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
  IDuplexPipe: {
    kind: "interface",
    members: {
      Input: {
        kind: "property",
        type: () => {
          return Pipelines.PipeReader;
        },
      },
      Output: {
        kind: "property",
        type: () => {
          return Pipelines.PipeWriter;
        },
      },
    },
  },
  Pipe: {
    kind: "class",
    members: {
      Pipe: {
        kind: "method",
        methodKind: "constructor",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reader: {
        kind: "property",
        type: () => {
          return Pipelines.PipeReader;
        },
      },
      Writer: {
        kind: "property",
        type: () => {
          return Pipelines.PipeWriter;
        },
      },
    },
    isSealed: true,
  },
  PipeOptions: {
    kind: "class",
    members: {
      PipeOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      Default: {
        kind: "property",
        type: () => {
          return Pipelines.PipeOptions;
        },
        isStatic: true,
      },
      MinimumSegmentSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PauseWriterThreshold: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      Pool: {
        kind: "property",
        type: () => {
          return Buffers.MemoryPool;
        },
      },
      ReaderScheduler: {
        kind: "property",
        type: () => {
          return Pipelines.PipeScheduler;
        },
      },
      ResumeWriterThreshold: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      UseSynchronizationContext: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      WriterScheduler: {
        kind: "property",
        type: () => {
          return Pipelines.PipeScheduler;
        },
      },
    },
  },
  PipeReader: {
    kind: "class",
    members: {
      PipeReader: {
        kind: "method",
        methodKind: "constructor",
      },
      AdvanceTo: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      AsStream: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CancelPendingRead: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Complete: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CompleteAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CopyToAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OnWriterCompleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ReadAtLeastAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadAtLeastAsyncCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryRead: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  PipeScheduler: {
    kind: "class",
    members: {
      PipeScheduler: {
        kind: "method",
        methodKind: "constructor",
      },
      Schedule: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Inline: {
        kind: "property",
        type: () => {
          return Pipelines.PipeScheduler;
        },
        isStatic: true,
      },
      ThreadPool: {
        kind: "property",
        type: () => {
          return Pipelines.PipeScheduler;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  PipeWriter: {
    kind: "class",
    members: {
      PipeWriter: {
        kind: "method",
        methodKind: "constructor",
      },
      Advance: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      AsStream: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CancelPendingFlush: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Complete: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CompleteAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CopyFromAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FlushAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetMemory: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetSpan: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      OnReaderCompleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CanGetUnflushedBytes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      UnflushedBytes: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  ReadResult: {
    kind: "struct",
    members: {
      ReadResult: {
        kind: "method",
        methodKind: "constructor",
      },
      Buffer: {
        kind: "property",
        type: () => {
          return Buffers.ReadOnlySequence;
        },
      },
      IsCanceled: {
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
  StreamPipeExtensions: {
    kind: "class",
    members: {
      CopyToAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  StreamPipeReaderOptions: {
    kind: "class",
    members: {
      StreamPipeReaderOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      BufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      LeaveOpen: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MinimumReadSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Pool: {
        kind: "property",
        type: () => {
          return Buffers.MemoryPool;
        },
      },
      UseZeroByteReads: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  StreamPipeWriterOptions: {
    kind: "class",
    members: {
      StreamPipeWriterOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      LeaveOpen: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MinimumBufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Pool: {
        kind: "property",
        type: () => {
          return Buffers.MemoryPool;
        },
      },
    },
  },
});
export default Pipelines
