import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Marshalling } from "./Marshalling/index.js";
export { default as Swift } from "./Swift/index.js";

type InteropServicesLibrary = LibrarySymbolReference & {
  Architecture: LibrarySymbolReference & {
    X86: LibrarySymbolReference;
    X64: LibrarySymbolReference;
    Arm: LibrarySymbolReference;
    Arm64: LibrarySymbolReference;
    Wasm: LibrarySymbolReference;
    S390x: LibrarySymbolReference;
    LoongArch64: LibrarySymbolReference;
    Armv6: LibrarySymbolReference;
    Ppc64le: LibrarySymbolReference;
    RiscV64: LibrarySymbolReference
  };
  CharSet: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Ansi: LibrarySymbolReference;
    Unicode: LibrarySymbolReference;
    Auto: LibrarySymbolReference
  };
  ComVisibleAttribute: LibrarySymbolReference & {
    ComVisibleAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  CriticalHandle: LibrarySymbolReference & {
    handle: LibrarySymbolReference;
    CriticalHandle: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    ReleaseHandle: LibrarySymbolReference;
    SetHandle: LibrarySymbolReference;
    SetHandleAsInvalid: LibrarySymbolReference;
    IsClosed: LibrarySymbolReference;
    IsInvalid: LibrarySymbolReference
  };
  ExternalException: LibrarySymbolReference & {
    ExternalException: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ErrorCode: LibrarySymbolReference
  };
  FieldOffsetAttribute: LibrarySymbolReference & {
    FieldOffsetAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  GCHandle: LibrarySymbolReference & {
    AddrOfPinnedObject: LibrarySymbolReference;
    Alloc: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    Free: LibrarySymbolReference;
    FromIntPtr: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToIntPtr: LibrarySymbolReference;
    IsAllocated: LibrarySymbolReference;
    Target: LibrarySymbolReference
  };
  GCHandleType: LibrarySymbolReference & {
    Weak: LibrarySymbolReference;
    WeakTrackResurrection: LibrarySymbolReference;
    Normal: LibrarySymbolReference;
    Pinned: LibrarySymbolReference
  };
  InAttribute: LibrarySymbolReference & {
    InAttribute: LibrarySymbolReference
  };
  LayoutKind: LibrarySymbolReference & {
    Sequential: LibrarySymbolReference;
    Explicit: LibrarySymbolReference;
    Auto: LibrarySymbolReference
  };
  MemoryMarshal: LibrarySymbolReference & {
    CreateReadOnlySpanFromNullTerminated: LibrarySymbolReference;
    GetArrayDataReference: LibrarySymbolReference;
    TryGetString: LibrarySymbolReference
  };
  OSPlatform: LibrarySymbolReference & {
    Create: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    FreeBSD: LibrarySymbolReference;
    Linux: LibrarySymbolReference;
    OSX: LibrarySymbolReference;
    Windows: LibrarySymbolReference
  };
  OutAttribute: LibrarySymbolReference & {
    OutAttribute: LibrarySymbolReference
  };
  RuntimeInformation: LibrarySymbolReference & {
    IsOSPlatform: LibrarySymbolReference;
    FrameworkDescription: LibrarySymbolReference;
    OSArchitecture: LibrarySymbolReference;
    OSDescription: LibrarySymbolReference;
    ProcessArchitecture: LibrarySymbolReference;
    RuntimeIdentifier: LibrarySymbolReference
  };
  SafeBuffer: LibrarySymbolReference & {
    SafeBuffer: LibrarySymbolReference;
    AcquirePointer: LibrarySymbolReference;
    Initialize: LibrarySymbolReference;
    ReleasePointer: LibrarySymbolReference;
    ByteLength: LibrarySymbolReference
  };
  SafeHandle: LibrarySymbolReference & {
    handle: LibrarySymbolReference;
    SafeHandle: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    DangerousAddRef: LibrarySymbolReference;
    DangerousGetHandle: LibrarySymbolReference;
    DangerousRelease: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    ReleaseHandle: LibrarySymbolReference;
    SetHandle: LibrarySymbolReference;
    SetHandleAsInvalid: LibrarySymbolReference;
    IsClosed: LibrarySymbolReference;
    IsInvalid: LibrarySymbolReference
  };
  StructLayoutAttribute: LibrarySymbolReference & {
    CharSet: LibrarySymbolReference;
    Pack: LibrarySymbolReference;
    Size: LibrarySymbolReference;
    StructLayoutAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SuppressGCTransitionAttribute: LibrarySymbolReference & {
    SuppressGCTransitionAttribute: LibrarySymbolReference
  };
  UnmanagedType: LibrarySymbolReference & {
    Bool: LibrarySymbolReference;
    I1: LibrarySymbolReference;
    U1: LibrarySymbolReference;
    I2: LibrarySymbolReference;
    U2: LibrarySymbolReference;
    I4: LibrarySymbolReference;
    U4: LibrarySymbolReference;
    I8: LibrarySymbolReference;
    U8: LibrarySymbolReference;
    R4: LibrarySymbolReference;
    R8: LibrarySymbolReference;
    BStr: LibrarySymbolReference;
    LPStr: LibrarySymbolReference;
    LPWStr: LibrarySymbolReference;
    LPTStr: LibrarySymbolReference;
    ByValTStr: LibrarySymbolReference;
    IUnknown: LibrarySymbolReference;
    Interface: LibrarySymbolReference;
    ByValArray: LibrarySymbolReference;
    SysInt: LibrarySymbolReference;
    SysUInt: LibrarySymbolReference;
    FunctionPtr: LibrarySymbolReference;
    LPArray: LibrarySymbolReference;
    LPStruct: LibrarySymbolReference;
    CustomMarshaler: LibrarySymbolReference;
    Error: LibrarySymbolReference;
    IInspectable: LibrarySymbolReference;
    HString: LibrarySymbolReference;
    LPUTF8Str: LibrarySymbolReference
  }
};
const InteropServices: InteropServicesLibrary = createLibrary("System.Runtime.InteropServices", {
  Architecture: {
    kind: "enum",
    members: {
      X86: {
        kind: "field",
        type: () => {
          return InteropServices.Architecture;
        },
      },
      X64: {
        kind: "field",
        type: () => {
          return InteropServices.Architecture;
        },
      },
      Arm: {
        kind: "field",
        type: () => {
          return InteropServices.Architecture;
        },
      },
      Arm64: {
        kind: "field",
        type: () => {
          return InteropServices.Architecture;
        },
      },
      Wasm: {
        kind: "field",
        type: () => {
          return InteropServices.Architecture;
        },
      },
      S390x: {
        kind: "field",
        type: () => {
          return InteropServices.Architecture;
        },
      },
      LoongArch64: {
        kind: "field",
        type: () => {
          return InteropServices.Architecture;
        },
      },
      Armv6: {
        kind: "field",
        type: () => {
          return InteropServices.Architecture;
        },
      },
      Ppc64le: {
        kind: "field",
        type: () => {
          return InteropServices.Architecture;
        },
      },
      RiscV64: {
        kind: "field",
        type: () => {
          return InteropServices.Architecture;
        },
      },
    },
  },
  CharSet: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return InteropServices.CharSet;
        },
      },
      Ansi: {
        kind: "field",
        type: () => {
          return InteropServices.CharSet;
        },
      },
      Unicode: {
        kind: "field",
        type: () => {
          return InteropServices.CharSet;
        },
      },
      Auto: {
        kind: "field",
        type: () => {
          return InteropServices.CharSet;
        },
      },
    },
  },
  ComVisibleAttribute: {
    kind: "class",
    members: {
      ComVisibleAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  CriticalHandle: {
    kind: "class",
    members: {
      handle: {
        kind: "field",
        type: () => {
          return System.IntPtr;
        },
      },
      CriticalHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReleaseHandle: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetHandleAsInvalid: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsClosed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsInvalid: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  ExternalException: {
    kind: "class",
    members: {
      ExternalException: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ErrorCode: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
    },
  },
  FieldOffsetAttribute: {
    kind: "class",
    members: {
      FieldOffsetAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  GCHandle: {
    kind: "struct",
    members: {
      AddrOfPinnedObject: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Alloc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Free: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromIntPtr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      ToIntPtr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
    },
  },
  GCHandleType: {
    kind: "enum",
    members: {
      Weak: {
        kind: "field",
        type: () => {
          return InteropServices.GCHandleType;
        },
      },
      WeakTrackResurrection: {
        kind: "field",
        type: () => {
          return InteropServices.GCHandleType;
        },
      },
      Normal: {
        kind: "field",
        type: () => {
          return InteropServices.GCHandleType;
        },
      },
      Pinned: {
        kind: "field",
        type: () => {
          return InteropServices.GCHandleType;
        },
      },
    },
  },
  InAttribute: {
    kind: "class",
    members: {
      InAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  LayoutKind: {
    kind: "enum",
    members: {
      Sequential: {
        kind: "field",
        type: () => {
          return InteropServices.LayoutKind;
        },
      },
      Explicit: {
        kind: "field",
        type: () => {
          return InteropServices.LayoutKind;
        },
      },
      Auto: {
        kind: "field",
        type: () => {
          return InteropServices.LayoutKind;
        },
      },
    },
  },
  MemoryMarshal: {
    kind: "class",
    members: {
      CreateReadOnlySpanFromNullTerminated: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetArrayDataReference: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryGetString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  OSPlatform: {
    kind: "struct",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FreeBSD: {
        kind: "property",
        type: () => {
          return InteropServices.OSPlatform;
        },
        isStatic: true,
      },
      Linux: {
        kind: "property",
        type: () => {
          return InteropServices.OSPlatform;
        },
        isStatic: true,
      },
      OSX: {
        kind: "property",
        type: () => {
          return InteropServices.OSPlatform;
        },
        isStatic: true,
      },
      Windows: {
        kind: "property",
        type: () => {
          return InteropServices.OSPlatform;
        },
        isStatic: true,
      },
    },
  },
  OutAttribute: {
    kind: "class",
    members: {
      OutAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  RuntimeInformation: {
    kind: "class",
    members: {
      IsOSPlatform: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FrameworkDescription: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
      OSArchitecture: {
        kind: "property",
        type: () => {
          return InteropServices.Architecture;
        },
        isStatic: true,
      },
      OSDescription: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
      ProcessArchitecture: {
        kind: "property",
        type: () => {
          return InteropServices.Architecture;
        },
        isStatic: true,
      },
      RuntimeIdentifier: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  SafeBuffer: {
    kind: "class",
    members: {
      SafeBuffer: {
        kind: "method",
        methodKind: "constructor",
      },
      AcquirePointer: {
        kind: "method",
        methodKind: "ordinary",
      },
      Initialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReleasePointer: {
        kind: "method",
        methodKind: "ordinary",
      },
      ByteLength: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
      },
    },
    isAbstract: true,
  },
  SafeHandle: {
    kind: "class",
    members: {
      handle: {
        kind: "field",
        type: () => {
          return System.IntPtr;
        },
      },
      SafeHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      DangerousAddRef: {
        kind: "method",
        methodKind: "ordinary",
      },
      DangerousGetHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      DangerousRelease: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReleaseHandle: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetHandleAsInvalid: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsClosed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsInvalid: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  StructLayoutAttribute: {
    kind: "class",
    members: {
      CharSet: {
        kind: "field",
        type: () => {
          return InteropServices.CharSet;
        },
      },
      Pack: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      Size: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      StructLayoutAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return InteropServices.LayoutKind;
        },
      },
    },
    isSealed: true,
  },
  SuppressGCTransitionAttribute: {
    kind: "class",
    members: {
      SuppressGCTransitionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  UnmanagedType: {
    kind: "enum",
    members: {
      Bool: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      I1: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      U1: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      I2: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      U2: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      I4: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      U4: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      I8: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      U8: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      R4: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      R8: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      BStr: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      LPStr: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      LPWStr: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      LPTStr: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      ByValTStr: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      IUnknown: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      Interface: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      ByValArray: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      SysInt: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      SysUInt: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      FunctionPtr: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      LPArray: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      LPStruct: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      CustomMarshaler: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      Error: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      IInspectable: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      HString: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      LPUTF8Str: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
    },
  },
});
export default InteropServices
