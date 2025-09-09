import System from "../../../System/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type SafeHandlesLibrary = LibrarySymbolReference & {
  CriticalHandleMinusOneIsInvalid: LibrarySymbolReference & {
    CriticalHandleMinusOneIsInvalid: LibrarySymbolReference;
    IsInvalid: LibrarySymbolReference
  };
  CriticalHandleZeroOrMinusOneIsInvalid: LibrarySymbolReference & {
    CriticalHandleZeroOrMinusOneIsInvalid: LibrarySymbolReference;
    IsInvalid: LibrarySymbolReference
  };
  SafeFileHandle: LibrarySymbolReference & {
    SafeFileHandle: LibrarySymbolReference;
    ReleaseHandle: LibrarySymbolReference;
    IsInvalid: LibrarySymbolReference;
    IsAsync: LibrarySymbolReference
  };
  SafeHandleMinusOneIsInvalid: LibrarySymbolReference & {
    SafeHandleMinusOneIsInvalid: LibrarySymbolReference;
    IsInvalid: LibrarySymbolReference
  };
  SafeHandleZeroOrMinusOneIsInvalid: LibrarySymbolReference & {
    SafeHandleZeroOrMinusOneIsInvalid: LibrarySymbolReference;
    IsInvalid: LibrarySymbolReference
  };
  SafeWaitHandle: LibrarySymbolReference & {
    SafeWaitHandle: LibrarySymbolReference;
    ReleaseHandle: LibrarySymbolReference
  }
};
const SafeHandles: SafeHandlesLibrary = createLibrary("Microsoft.Win32.SafeHandles", {
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
