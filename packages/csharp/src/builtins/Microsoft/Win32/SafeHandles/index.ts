import System from "../../../System/index.js";

import { createLibrary } from "#createLibrary";


const SafeHandles = createLibrary("Microsoft.Win32.SafeHandles", {
  CriticalHandleMinusOneIsInvalid: {
    kind: "class",
    members: {
      CriticalHandleMinusOneIsInvalid: {
        kind: "method",
        methodKind: "constructor",
      },
      IsInvalid: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  CriticalHandleZeroOrMinusOneIsInvalid: {
    kind: "class",
    members: {
      CriticalHandleZeroOrMinusOneIsInvalid: {
        kind: "method",
        methodKind: "constructor",
      },
      IsInvalid: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  SafeFileHandle: {
    kind: "class",
    members: {
      SafeFileHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      ReleaseHandle: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsInvalid: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsAsync: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  SafeHandleMinusOneIsInvalid: {
    kind: "class",
    members: {
      SafeHandleMinusOneIsInvalid: {
        kind: "method",
        methodKind: "constructor",
      },
      IsInvalid: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  SafeHandleZeroOrMinusOneIsInvalid: {
    kind: "class",
    members: {
      SafeHandleZeroOrMinusOneIsInvalid: {
        kind: "method",
        methodKind: "constructor",
      },
      IsInvalid: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  SafeWaitHandle: {
    kind: "class",
    members: {
      SafeWaitHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      ReleaseHandle: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
});
export default SafeHandles
