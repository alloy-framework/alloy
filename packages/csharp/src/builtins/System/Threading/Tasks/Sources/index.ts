import System from "../../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type SourcesLibrary = LibrarySymbolReference & {
  IValueTaskSource: LibrarySymbolReference & {
    GetResult: LibrarySymbolReference;
    GetStatus: LibrarySymbolReference;
    OnCompleted: LibrarySymbolReference
  };
  ManualResetValueTaskSourceCore: LibrarySymbolReference & {
    GetResult: LibrarySymbolReference;
    GetStatus: LibrarySymbolReference;
    OnCompleted: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    SetException: LibrarySymbolReference;
    SetResult: LibrarySymbolReference;
    RunContinuationsAsynchronously: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  ValueTaskSourceOnCompletedFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    UseSchedulingContext: LibrarySymbolReference;
    FlowExecutionContext: LibrarySymbolReference
  };
  ValueTaskSourceStatus: LibrarySymbolReference & {
    Pending: LibrarySymbolReference;
    Succeeded: LibrarySymbolReference;
    Faulted: LibrarySymbolReference;
    Canceled: LibrarySymbolReference
  }
};
const Sources: SourcesLibrary = createLibrary("System.Threading.Tasks.Sources", {
  IValueTaskSource: {
    kind: "interface",
    members: {
      GetResult: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetStatus: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnCompleted: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ManualResetValueTaskSourceCore: {
    kind: "struct",
    members: {
      GetResult: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetStatus: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnCompleted: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetException: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetResult: {
        kind: "method",
        methodKind: "ordinary",
      },
      RunContinuationsAsynchronously: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      Version: {
        kind: "property",
        type: () => {
          return System.Int16;
        },
      },
    },
  },
  ValueTaskSourceOnCompletedFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Sources.ValueTaskSourceOnCompletedFlags;
        },
      },
      UseSchedulingContext: {
        kind: "field",
        type: () => {
          return Sources.ValueTaskSourceOnCompletedFlags;
        },
      },
      FlowExecutionContext: {
        kind: "field",
        type: () => {
          return Sources.ValueTaskSourceOnCompletedFlags;
        },
      },
    },
  },
  ValueTaskSourceStatus: {
    kind: "enum",
    members: {
      Pending: {
        kind: "field",
        type: () => {
          return Sources.ValueTaskSourceStatus;
        },
      },
      Succeeded: {
        kind: "field",
        type: () => {
          return Sources.ValueTaskSourceStatus;
        },
      },
      Faulted: {
        kind: "field",
        type: () => {
          return Sources.ValueTaskSourceStatus;
        },
      },
      Canceled: {
        kind: "field",
        type: () => {
          return Sources.ValueTaskSourceStatus;
        },
      },
    },
  },
});
export default Sources
