import ComponentModel from "../ComponentModel/index.js";
import System from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type TimersLibrary = LibrarySymbolReference & {
  ElapsedEventArgs: LibrarySymbolReference & {
    ElapsedEventArgs: LibrarySymbolReference;
    SignalTime: LibrarySymbolReference
  };
  ElapsedEventHandler: LibrarySymbolReference & {
    ElapsedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  Timer: LibrarySymbolReference & {
    Timer: LibrarySymbolReference;
    BeginInit: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EndInit: LibrarySymbolReference;
    Start: LibrarySymbolReference;
    Stop: LibrarySymbolReference;
    AutoReset: LibrarySymbolReference;
    Enabled: LibrarySymbolReference;
    Interval: LibrarySymbolReference;
    Site: LibrarySymbolReference;
    SynchronizingObject: LibrarySymbolReference
  };
  TimersDescriptionAttribute: LibrarySymbolReference & {
    TimersDescriptionAttribute: LibrarySymbolReference;
    Description: LibrarySymbolReference
  }
};
const Timers: TimersLibrary = createLibrary("System.Timers", {
  ElapsedEventArgs: {
    kind: "class",
    members: {
      ElapsedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      SignalTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
    },
    isSealed: true,
  },
  ElapsedEventHandler: {
    kind: "generic",
    members: {
      ElapsedEventHandler: {
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
  Timer: {
    kind: "class",
    members: {
      Timer: {
        kind: "method",
        methodKind: "constructor",
      },
      BeginInit: {
        kind: "method",
        methodKind: "ordinary",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EndInit: {
        kind: "method",
        methodKind: "ordinary",
      },
      Start: {
        kind: "method",
        methodKind: "ordinary",
      },
      Stop: {
        kind: "method",
        methodKind: "ordinary",
      },
      AutoReset: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Enabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Interval: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
      Site: {
        kind: "property",
        type: () => {
          return ComponentModel.ISite;
        },
        isOverride: true,
      },
      SynchronizingObject: {
        kind: "property",
        type: () => {
          return ComponentModel.ISynchronizeInvoke;
        },
        isNullable: true,
      },
    },
  },
  TimersDescriptionAttribute: {
    kind: "class",
    members: {
      TimersDescriptionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Description: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
  },
});
export default Timers
