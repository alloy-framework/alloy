import System from "../index.js";

import { createLibrary } from "#createLibrary";
export { default as CodeAnalysis } from "./CodeAnalysis/index.js";

const Diagnostics = createLibrary("System.Diagnostics", {
  ConditionalAttribute: {
    kind: "class",
    members: {
      ConditionalAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ConditionString: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  Debug: {
    kind: "class",
    members: {
      Assert: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Fail: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Indent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Print: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Unindent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteIf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteLine: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteLineIf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AutoFlush: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      IndentLevel: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      IndentSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  DebuggableAttribute: {
    kind: "class",
    members: {
      DebuggingModes: {
        kind: "enum",
        members: {
          None: {
            kind: "field",
            type: () => {
              return Diagnostics.DebuggableAttribute.DebuggingModes;
            },
          },
          Default: {
            kind: "field",
            type: () => {
              return Diagnostics.DebuggableAttribute.DebuggingModes;
            },
          },
          IgnoreSymbolStoreSequencePoints: {
            kind: "field",
            type: () => {
              return Diagnostics.DebuggableAttribute.DebuggingModes;
            },
          },
          EnableEditAndContinue: {
            kind: "field",
            type: () => {
              return Diagnostics.DebuggableAttribute.DebuggingModes;
            },
          },
          DisableOptimizations: {
            kind: "field",
            type: () => {
              return Diagnostics.DebuggableAttribute.DebuggingModes;
            },
          },
        },
      },
    },
  },
  Debugger: {
    kind: "class",
    members: {
      DefaultCategory: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isStatic: true,
        isReadOnly: true,
      },
      Break: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BreakForUserUnhandledException: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsLogging: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Launch: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotifyOfCrossThreadDependency: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsAttached: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  DebuggerBrowsableAttribute: {
    kind: "class",
    members: {
      DebuggerBrowsableAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      State: {
        kind: "property",
        type: () => {
          return Diagnostics.DebuggerBrowsableState;
        },
      },
    },
    isSealed: true,
  },
  DebuggerBrowsableState: {
    kind: "enum",
    members: {
      Never: {
        kind: "field",
        type: () => {
          return Diagnostics.DebuggerBrowsableState;
        },
      },
      Collapsed: {
        kind: "field",
        type: () => {
          return Diagnostics.DebuggerBrowsableState;
        },
      },
      RootHidden: {
        kind: "field",
        type: () => {
          return Diagnostics.DebuggerBrowsableState;
        },
      },
    },
  },
  DebuggerDisableUserUnhandledExceptionsAttribute: {
    kind: "class",
    members: {
      DebuggerDisableUserUnhandledExceptionsAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DebuggerDisplayAttribute: {
    kind: "class",
    members: {
      DebuggerDisplayAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Target: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      TargetTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  DebuggerHiddenAttribute: {
    kind: "class",
    members: {
      DebuggerHiddenAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DebuggerNonUserCodeAttribute: {
    kind: "class",
    members: {
      DebuggerNonUserCodeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DebuggerStepThroughAttribute: {
    kind: "class",
    members: {
      DebuggerStepThroughAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DebuggerStepperBoundaryAttribute: {
    kind: "class",
    members: {
      DebuggerStepperBoundaryAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DebuggerTypeProxyAttribute: {
    kind: "class",
    members: {
      DebuggerTypeProxyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ProxyTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Target: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      TargetTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  DebuggerVisualizerAttribute: {
    kind: "class",
    members: {
      DebuggerVisualizerAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Description: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Target: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      TargetTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      VisualizerObjectSourceTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      VisualizerTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  StackTraceHiddenAttribute: {
    kind: "class",
    members: {
      StackTraceHiddenAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  Stopwatch: {
    kind: "class",
    members: {
      Frequency: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsHighResolution: {
        kind: "field",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Stopwatch: {
        kind: "method",
        methodKind: "constructor",
      },
      GetElapsedTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTimestamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Restart: {
        kind: "method",
        methodKind: "ordinary",
      },
      Start: {
        kind: "method",
        methodKind: "ordinary",
      },
      StartNew: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Stop: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Elapsed: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      ElapsedMilliseconds: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      ElapsedTicks: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      IsRunning: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  UnreachableException: {
    kind: "class",
    members: {
      UnreachableException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
});
export default Diagnostics
