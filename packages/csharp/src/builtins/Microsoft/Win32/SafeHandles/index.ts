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
  SafeAccessTokenHandle: LibrarySymbolReference & {
    SafeAccessTokenHandle: LibrarySymbolReference;
    ReleaseHandle: LibrarySymbolReference;
    InvalidHandle: LibrarySymbolReference;
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
  SafeMemoryMappedFileHandle: LibrarySymbolReference & {
    SafeMemoryMappedFileHandle: LibrarySymbolReference;
    ReleaseHandle: LibrarySymbolReference;
    IsInvalid: LibrarySymbolReference
  };
  SafeMemoryMappedViewHandle: LibrarySymbolReference & {
    SafeMemoryMappedViewHandle: LibrarySymbolReference;
    ReleaseHandle: LibrarySymbolReference
  };
  SafeNCryptHandle: LibrarySymbolReference & {
    SafeNCryptHandle: LibrarySymbolReference;
    ReleaseHandle: LibrarySymbolReference;
    ReleaseNativeHandle: LibrarySymbolReference
  };
  SafeNCryptKeyHandle: LibrarySymbolReference & {
    SafeNCryptKeyHandle: LibrarySymbolReference;
    ReleaseNativeHandle: LibrarySymbolReference
  };
  SafeNCryptProviderHandle: LibrarySymbolReference & {
    SafeNCryptProviderHandle: LibrarySymbolReference;
    ReleaseNativeHandle: LibrarySymbolReference
  };
  SafeNCryptSecretHandle: LibrarySymbolReference & {
    SafeNCryptSecretHandle: LibrarySymbolReference;
    ReleaseNativeHandle: LibrarySymbolReference
  };
  SafePipeHandle: LibrarySymbolReference & {
    SafePipeHandle: LibrarySymbolReference;
    ReleaseHandle: LibrarySymbolReference;
    IsInvalid: LibrarySymbolReference
  };
  SafeProcessHandle: LibrarySymbolReference & {
    SafeProcessHandle: LibrarySymbolReference;
    ReleaseHandle: LibrarySymbolReference
  };
  SafeRegistryHandle: LibrarySymbolReference & {
    SafeRegistryHandle: LibrarySymbolReference;
    ReleaseHandle: LibrarySymbolReference
  };
  SafeWaitHandle: LibrarySymbolReference & {
    SafeWaitHandle: LibrarySymbolReference;
    ReleaseHandle: LibrarySymbolReference
  };
  SafeX509ChainHandle: LibrarySymbolReference & {
    SafeX509ChainHandle: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
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
  SafeAccessTokenHandle: {
    kind: "class",
    members: {
      SafeAccessTokenHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      ReleaseHandle: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InvalidHandle: {
        kind: "property",
        type: () => {
          return SafeHandles.SafeAccessTokenHandle;
        },
        isStatic: true,
      },
      IsInvalid: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
    },
    isSealed: true,
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
  SafeMemoryMappedFileHandle: {
    kind: "class",
    members: {
      SafeMemoryMappedFileHandle: {
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
    },
    isSealed: true,
  },
  SafeMemoryMappedViewHandle: {
    kind: "class",
    members: {
      SafeMemoryMappedViewHandle: {
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
  SafeNCryptHandle: {
    kind: "class",
    members: {
      SafeNCryptHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      ReleaseHandle: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReleaseNativeHandle: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  SafeNCryptKeyHandle: {
    kind: "class",
    members: {
      SafeNCryptKeyHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      ReleaseNativeHandle: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  SafeNCryptProviderHandle: {
    kind: "class",
    members: {
      SafeNCryptProviderHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      ReleaseNativeHandle: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  SafeNCryptSecretHandle: {
    kind: "class",
    members: {
      SafeNCryptSecretHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      ReleaseNativeHandle: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  SafePipeHandle: {
    kind: "class",
    members: {
      SafePipeHandle: {
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
    },
    isSealed: true,
  },
  SafeProcessHandle: {
    kind: "class",
    members: {
      SafeProcessHandle: {
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
  SafeRegistryHandle: {
    kind: "class",
    members: {
      SafeRegistryHandle: {
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
  SafeX509ChainHandle: {
    kind: "class",
    members: {
      SafeX509ChainHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
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
