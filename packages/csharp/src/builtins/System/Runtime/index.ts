import System from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as CompilerServices } from "./CompilerServices/index.js";
export { default as ConstrainedExecution } from "./ConstrainedExecution/index.js";
export { default as ExceptionServices } from "./ExceptionServices/index.js";
export { default as InteropServices } from "./InteropServices/index.js";
export { default as Intrinsics } from "./Intrinsics/index.js";
export { default as Loader } from "./Loader/index.js";
export { default as Remoting } from "./Remoting/index.js";
export { default as Serialization } from "./Serialization/index.js";
export { default as Versioning } from "./Versioning/index.js";

type RuntimeLibrary = LibrarySymbolReference & {
  AmbiguousImplementationException: LibrarySymbolReference & {
    AmbiguousImplementationException: LibrarySymbolReference
  };
  AssemblyTargetedPatchBandAttribute: LibrarySymbolReference & {
    AssemblyTargetedPatchBandAttribute: LibrarySymbolReference;
    TargetedPatchBand: LibrarySymbolReference
  };
  ControlledExecution: LibrarySymbolReference & {
    Run: LibrarySymbolReference
  };
  DependentHandle: LibrarySymbolReference & {
    DependentHandle: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Dependent: LibrarySymbolReference;
    IsAllocated: LibrarySymbolReference;
    Target: LibrarySymbolReference;
    TargetAndDependent: LibrarySymbolReference
  };
  GCLargeObjectHeapCompactionMode: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    CompactOnce: LibrarySymbolReference
  };
  GCLatencyMode: LibrarySymbolReference & {
    Batch: LibrarySymbolReference;
    Interactive: LibrarySymbolReference;
    LowLatency: LibrarySymbolReference;
    SustainedLowLatency: LibrarySymbolReference;
    NoGCRegion: LibrarySymbolReference
  };
  GCSettings: LibrarySymbolReference & {
    IsServerGC: LibrarySymbolReference;
    LargeObjectHeapCompactionMode: LibrarySymbolReference;
    LatencyMode: LibrarySymbolReference
  };
  JitInfo: LibrarySymbolReference & {
    GetCompilationTime: LibrarySymbolReference;
    GetCompiledILBytes: LibrarySymbolReference;
    GetCompiledMethodCount: LibrarySymbolReference
  };
  MemoryFailPoint: LibrarySymbolReference & {
    MemoryFailPoint: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference
  };
  ProfileOptimization: LibrarySymbolReference & {
    SetProfileRoot: LibrarySymbolReference;
    StartProfile: LibrarySymbolReference
  };
  TargetedPatchingOptOutAttribute: LibrarySymbolReference & {
    TargetedPatchingOptOutAttribute: LibrarySymbolReference;
    Reason: LibrarySymbolReference
  }
};
const Runtime: RuntimeLibrary = createLibrary("System.Runtime", {
  AmbiguousImplementationException: {
    kind: "class",
    members: {
      AmbiguousImplementationException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  AssemblyTargetedPatchBandAttribute: {
    kind: "class",
    members: {
      AssemblyTargetedPatchBandAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      TargetedPatchBand: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  ControlledExecution: {
    kind: "class",
    members: {
      Run: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  DependentHandle: {
    kind: "struct",
    members: {
      DependentHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dependent: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
        isReadOnly: true,
      },
      IsAllocated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      Target: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
        isReadOnly: true,
      },
      TargetAndDependent: {
        kind: "property",
        type: () => {
          return System.ValueTuple;
        },
        isReadOnly: true,
      },
    },
  },
  GCLargeObjectHeapCompactionMode: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Runtime.GCLargeObjectHeapCompactionMode;
        },
      },
      CompactOnce: {
        kind: "field",
        type: () => {
          return Runtime.GCLargeObjectHeapCompactionMode;
        },
      },
    },
  },
  GCLatencyMode: {
    kind: "enum",
    members: {
      Batch: {
        kind: "field",
        type: () => {
          return Runtime.GCLatencyMode;
        },
      },
      Interactive: {
        kind: "field",
        type: () => {
          return Runtime.GCLatencyMode;
        },
      },
      LowLatency: {
        kind: "field",
        type: () => {
          return Runtime.GCLatencyMode;
        },
      },
      SustainedLowLatency: {
        kind: "field",
        type: () => {
          return Runtime.GCLatencyMode;
        },
      },
      NoGCRegion: {
        kind: "field",
        type: () => {
          return Runtime.GCLatencyMode;
        },
      },
    },
  },
  GCSettings: {
    kind: "class",
    members: {
      IsServerGC: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      LargeObjectHeapCompactionMode: {
        kind: "property",
        type: () => {
          return Runtime.GCLargeObjectHeapCompactionMode;
        },
        isStatic: true,
      },
      LatencyMode: {
        kind: "property",
        type: () => {
          return Runtime.GCLatencyMode;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  JitInfo: {
    kind: "class",
    members: {
      GetCompilationTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCompiledILBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCompiledMethodCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  MemoryFailPoint: {
    kind: "class",
    members: {
      MemoryFailPoint: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  ProfileOptimization: {
    kind: "class",
    members: {
      SetProfileRoot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StartProfile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  TargetedPatchingOptOutAttribute: {
    kind: "class",
    members: {
      TargetedPatchingOptOutAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Reason: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
});
export default Runtime
