import System from "../../../index.js";

import { createLibrary } from "#createLibrary";


const Sources = createLibrary("System.Threading.Tasks.Sources", {
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
