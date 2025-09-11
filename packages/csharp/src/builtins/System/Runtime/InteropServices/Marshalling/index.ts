import System from "../../../index.js";
import InteropServices from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type MarshallingLibrary = LibrarySymbolReference & {
  AnsiStringMarshaller: LibrarySymbolReference & {
    ManagedToUnmanagedIn: LibrarySymbolReference & {
      FromManaged: LibrarySymbolReference;
      ToUnmanaged: LibrarySymbolReference;
      Free: LibrarySymbolReference;
      BufferSize: LibrarySymbolReference
    }
  };
  ArrayMarshaller: LibrarySymbolReference & {
    ManagedToUnmanagedIn: LibrarySymbolReference & {
      FromManaged: LibrarySymbolReference;
      GetManagedValuesSource: LibrarySymbolReference;
      GetUnmanagedValuesDestination: LibrarySymbolReference;
      GetPinnableReference: LibrarySymbolReference;
      ToUnmanaged: LibrarySymbolReference;
      Free: LibrarySymbolReference;
      BufferSize: LibrarySymbolReference
    }
  };
  BStrStringMarshaller: LibrarySymbolReference & {
    ManagedToUnmanagedIn: LibrarySymbolReference & {
      FromManaged: LibrarySymbolReference;
      ToUnmanaged: LibrarySymbolReference;
      Free: LibrarySymbolReference;
      BufferSize: LibrarySymbolReference
    }
  };
  ComExposedClassAttribute: LibrarySymbolReference & {
    ComExposedClassAttribute: LibrarySymbolReference;
    GetComInterfaceEntries: LibrarySymbolReference
  };
  ComInterfaceMarshaller: LibrarySymbolReference & {
    ConvertToUnmanaged: LibrarySymbolReference;
    ConvertToManaged: LibrarySymbolReference;
    Free: LibrarySymbolReference
  };
  ComInterfaceOptions: LibrarySymbolReference & {
    ManagedObjectWrapper: LibrarySymbolReference;
    ComObjectWrapper: LibrarySymbolReference
  };
  ComObject: LibrarySymbolReference & {
    FinalRelease: LibrarySymbolReference;
    Finalize: LibrarySymbolReference
  };
  ComVariant: LibrarySymbolReference & {
    Dispose: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    VarType: LibrarySymbolReference
  };
  ComVariantMarshaller: LibrarySymbolReference & {
    RefPropagate: LibrarySymbolReference & {
      FromUnmanaged: LibrarySymbolReference;
      FromManaged: LibrarySymbolReference;
      ToUnmanaged: LibrarySymbolReference;
      ToManaged: LibrarySymbolReference;
      Free: LibrarySymbolReference
    }
  };
  ContiguousCollectionMarshallerAttribute: LibrarySymbolReference & {
    ContiguousCollectionMarshallerAttribute: LibrarySymbolReference
  };
  CustomMarshallerAttribute: LibrarySymbolReference & {
    GenericPlaceholder: LibrarySymbolReference & {

    }
  };
  ExceptionAsDefaultMarshaller: LibrarySymbolReference & {
    ConvertToUnmanaged: LibrarySymbolReference
  };
  ExceptionAsHResultMarshaller: LibrarySymbolReference & {
    ConvertToUnmanaged: LibrarySymbolReference
  };
  ExceptionAsNaNMarshaller: LibrarySymbolReference & {
    ConvertToUnmanaged: LibrarySymbolReference
  };
  ExceptionAsVoidMarshaller: LibrarySymbolReference & {
    ConvertToUnmanaged: LibrarySymbolReference
  };
  GeneratedComClassAttribute: LibrarySymbolReference & {
    GeneratedComClassAttribute: LibrarySymbolReference
  };
  GeneratedComInterfaceAttribute: LibrarySymbolReference & {
    GeneratedComInterfaceAttribute: LibrarySymbolReference;
    Options: LibrarySymbolReference;
    StringMarshalling: LibrarySymbolReference;
    StringMarshallingCustomType: LibrarySymbolReference
  };
  IComExposedClass: LibrarySymbolReference & {
    GetComInterfaceEntries: LibrarySymbolReference
  };
  IComExposedDetails: LibrarySymbolReference & {
    GetComInterfaceEntries: LibrarySymbolReference
  };
  IIUnknownCacheStrategy: LibrarySymbolReference & {
    TableInfo: LibrarySymbolReference & {
      ManagedType: LibrarySymbolReference;
      Table: LibrarySymbolReference;
      ThisPtr: LibrarySymbolReference
    }
  };
  IIUnknownDerivedDetails: LibrarySymbolReference & {
    Iid: LibrarySymbolReference;
    Implementation: LibrarySymbolReference;
    ManagedVirtualMethodTable: LibrarySymbolReference
  };
  IIUnknownInterfaceDetailsStrategy: LibrarySymbolReference & {
    GetComExposedTypeDetails: LibrarySymbolReference;
    GetIUnknownDerivedDetails: LibrarySymbolReference
  };
  IIUnknownInterfaceType: LibrarySymbolReference & {
    Iid: LibrarySymbolReference;
    ManagedVirtualMethodTable: LibrarySymbolReference
  };
  IIUnknownStrategy: LibrarySymbolReference & {
    CreateInstancePointer: LibrarySymbolReference;
    QueryInterface: LibrarySymbolReference;
    Release: LibrarySymbolReference
  };
  IUnknownDerivedAttribute: LibrarySymbolReference & {
    IUnknownDerivedAttribute: LibrarySymbolReference;
    Iid: LibrarySymbolReference;
    Implementation: LibrarySymbolReference;
    ManagedVirtualMethodTable: LibrarySymbolReference
  };
  IUnmanagedVirtualMethodTableProvider: LibrarySymbolReference & {
    GetVirtualMethodTableInfoForKey: LibrarySymbolReference
  };
  MarshalMode: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    ManagedToUnmanagedIn: LibrarySymbolReference;
    ManagedToUnmanagedRef: LibrarySymbolReference;
    ManagedToUnmanagedOut: LibrarySymbolReference;
    UnmanagedToManagedIn: LibrarySymbolReference;
    UnmanagedToManagedRef: LibrarySymbolReference;
    UnmanagedToManagedOut: LibrarySymbolReference;
    ElementIn: LibrarySymbolReference;
    ElementRef: LibrarySymbolReference;
    ElementOut: LibrarySymbolReference
  };
  MarshalUsingAttribute: LibrarySymbolReference & {
    ReturnsCountValue: LibrarySymbolReference;
    MarshalUsingAttribute: LibrarySymbolReference;
    NativeType: LibrarySymbolReference;
    CountElementName: LibrarySymbolReference;
    ConstantElementCount: LibrarySymbolReference;
    ElementIndirectionDepth: LibrarySymbolReference
  };
  NativeMarshallingAttribute: LibrarySymbolReference & {
    NativeMarshallingAttribute: LibrarySymbolReference;
    NativeType: LibrarySymbolReference
  };
  PointerArrayMarshaller: LibrarySymbolReference & {
    ManagedToUnmanagedIn: LibrarySymbolReference & {
      FromManaged: LibrarySymbolReference;
      GetManagedValuesSource: LibrarySymbolReference;
      GetUnmanagedValuesDestination: LibrarySymbolReference;
      GetPinnableReference: LibrarySymbolReference;
      ToUnmanaged: LibrarySymbolReference;
      Free: LibrarySymbolReference;
      BufferSize: LibrarySymbolReference
    }
  };
  ReadOnlySpanMarshaller: LibrarySymbolReference & {
    ManagedToUnmanagedIn: LibrarySymbolReference & {
      Free: LibrarySymbolReference;
      FromManaged: LibrarySymbolReference;
      GetManagedValuesSource: LibrarySymbolReference;
      GetPinnableReference: LibrarySymbolReference;
      GetUnmanagedValuesDestination: LibrarySymbolReference;
      ToUnmanaged: LibrarySymbolReference;
      BufferSize: LibrarySymbolReference
    };
    ManagedToUnmanagedOut: LibrarySymbolReference & {
      FromUnmanaged: LibrarySymbolReference;
      ToManaged: LibrarySymbolReference;
      GetUnmanagedValuesSource: LibrarySymbolReference;
      GetManagedValuesDestination: LibrarySymbolReference;
      Free: LibrarySymbolReference
    };
    UnmanagedToManagedOut: LibrarySymbolReference & {
      AllocateContainerForUnmanagedElements: LibrarySymbolReference;
      GetManagedValuesSource: LibrarySymbolReference;
      GetUnmanagedValuesDestination: LibrarySymbolReference
    }
  };
  SafeHandleMarshaller: LibrarySymbolReference & {
    ManagedToUnmanagedIn: LibrarySymbolReference & {
      Free: LibrarySymbolReference;
      FromManaged: LibrarySymbolReference;
      ToUnmanaged: LibrarySymbolReference
    };
    ManagedToUnmanagedOut: LibrarySymbolReference & {
      ManagedToUnmanagedOut: LibrarySymbolReference;
      Free: LibrarySymbolReference;
      FromUnmanaged: LibrarySymbolReference;
      ToManaged: LibrarySymbolReference
    };
    ManagedToUnmanagedRef: LibrarySymbolReference & {
      ManagedToUnmanagedRef: LibrarySymbolReference;
      Free: LibrarySymbolReference;
      FromManaged: LibrarySymbolReference;
      FromUnmanaged: LibrarySymbolReference;
      OnInvoked: LibrarySymbolReference;
      ToManagedFinally: LibrarySymbolReference;
      ToUnmanaged: LibrarySymbolReference
    }
  };
  SpanMarshaller: LibrarySymbolReference & {
    ManagedToUnmanagedIn: LibrarySymbolReference & {
      Free: LibrarySymbolReference;
      FromManaged: LibrarySymbolReference;
      GetManagedValuesSource: LibrarySymbolReference;
      GetPinnableReference: LibrarySymbolReference;
      GetUnmanagedValuesDestination: LibrarySymbolReference;
      ToUnmanaged: LibrarySymbolReference;
      BufferSize: LibrarySymbolReference
    }
  };
  StrategyBasedComWrappers: LibrarySymbolReference & {
    StrategyBasedComWrappers: LibrarySymbolReference;
    ComputeVtables: LibrarySymbolReference;
    CreateCacheStrategy: LibrarySymbolReference;
    CreateDefaultCacheStrategy: LibrarySymbolReference;
    CreateObject: LibrarySymbolReference;
    GetOrCreateInterfaceDetailsStrategy: LibrarySymbolReference;
    GetOrCreateIUnknownStrategy: LibrarySymbolReference;
    ReleaseObjects: LibrarySymbolReference;
    DefaultIUnknownInterfaceDetailsStrategy: LibrarySymbolReference;
    DefaultIUnknownStrategy: LibrarySymbolReference
  };
  UniqueComInterfaceMarshaller: LibrarySymbolReference & {
    ConvertToUnmanaged: LibrarySymbolReference;
    ConvertToManaged: LibrarySymbolReference;
    Free: LibrarySymbolReference
  };
  Utf16StringMarshaller: LibrarySymbolReference & {
    ConvertToUnmanaged: LibrarySymbolReference;
    ConvertToManaged: LibrarySymbolReference;
    Free: LibrarySymbolReference;
    GetPinnableReference: LibrarySymbolReference
  };
  Utf8StringMarshaller: LibrarySymbolReference & {
    ManagedToUnmanagedIn: LibrarySymbolReference & {
      FromManaged: LibrarySymbolReference;
      ToUnmanaged: LibrarySymbolReference;
      Free: LibrarySymbolReference;
      BufferSize: LibrarySymbolReference
    }
  };
  VirtualMethodTableInfo: LibrarySymbolReference & {
    VirtualMethodTableInfo: LibrarySymbolReference;
    Deconstruct: LibrarySymbolReference;
    ThisPointer: LibrarySymbolReference;
    VirtualMethodTable: LibrarySymbolReference
  }
};
const Marshalling: MarshallingLibrary = createLibrary("System.Runtime.InteropServices.Marshalling", {
  AnsiStringMarshaller: {
    kind: "class",
    members: {
      ManagedToUnmanagedIn: {
        kind: "struct",
        members: {
          FromManaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToUnmanaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          Free: {
            kind: "method",
            methodKind: "ordinary",
          },
          BufferSize: {
            kind: "property",
            type: () => {
              return System.Int32;
            },
            isStatic: true,
          },
        },
      },
    },
  },
  ArrayMarshaller: {
    kind: "class",
    members: {
      ManagedToUnmanagedIn: {
        kind: "struct",
        members: {
          FromManaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetManagedValuesSource: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetUnmanagedValuesDestination: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetPinnableReference: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToUnmanaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          Free: {
            kind: "method",
            methodKind: "ordinary",
          },
          BufferSize: {
            kind: "property",
            type: () => {
              return System.Int32;
            },
            isStatic: true,
          },
        },
      },
    },
  },
  BStrStringMarshaller: {
    kind: "class",
    members: {
      ManagedToUnmanagedIn: {
        kind: "struct",
        members: {
          FromManaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToUnmanaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          Free: {
            kind: "method",
            methodKind: "ordinary",
          },
          BufferSize: {
            kind: "property",
            type: () => {
              return System.Int32;
            },
            isStatic: true,
          },
        },
      },
    },
  },
  ComExposedClassAttribute: {
    kind: "class",
    members: {
      ComExposedClassAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      GetComInterfaceEntries: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  ComInterfaceMarshaller: {
    kind: "class",
    members: {
      ConvertToUnmanaged: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ConvertToManaged: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Free: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  ComInterfaceOptions: {
    kind: "enum",
    members: {
      ManagedObjectWrapper: {
        kind: "field",
        type: () => {
          return Marshalling.ComInterfaceOptions;
        },
      },
      ComObjectWrapper: {
        kind: "field",
        type: () => {
          return Marshalling.ComInterfaceOptions;
        },
      },
    },
  },
  ComObject: {
    kind: "class",
    members: {
      FinalRelease: {
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
  ComVariant: {
    kind: "struct",
    members: {
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Null: {
        kind: "property",
        type: () => {
          return Marshalling.ComVariant;
        },
        isStatic: true,
      },
      VarType: {
        kind: "property",
        type: undefined,
        isReadOnly: true,
      },
    },
  },
  ComVariantMarshaller: {
    kind: "class",
    members: {
      RefPropagate: {
        kind: "struct",
        members: {
          FromUnmanaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          FromManaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToUnmanaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToManaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          Free: {
            kind: "method",
            methodKind: "ordinary",
          },
        },
      },
    },
  },
  ContiguousCollectionMarshallerAttribute: {
    kind: "class",
    members: {
      ContiguousCollectionMarshallerAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  CustomMarshallerAttribute: {
    kind: "class",
    members: {
      GenericPlaceholder: {
        kind: "struct",
        members: {},
      },
    },
  },
  ExceptionAsDefaultMarshaller: {
    kind: "class",
    members: {
      ConvertToUnmanaged: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  ExceptionAsHResultMarshaller: {
    kind: "class",
    members: {
      ConvertToUnmanaged: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  ExceptionAsNaNMarshaller: {
    kind: "class",
    members: {
      ConvertToUnmanaged: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  ExceptionAsVoidMarshaller: {
    kind: "class",
    members: {
      ConvertToUnmanaged: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  GeneratedComClassAttribute: {
    kind: "class",
    members: {
      GeneratedComClassAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  GeneratedComInterfaceAttribute: {
    kind: "class",
    members: {
      GeneratedComInterfaceAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Options: {
        kind: "property",
        type: () => {
          return Marshalling.ComInterfaceOptions;
        },
      },
      StringMarshalling: {
        kind: "property",
        type: () => {
          return InteropServices.StringMarshalling;
        },
      },
      StringMarshallingCustomType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
    },
  },
  IComExposedClass: {
    kind: "interface",
    members: {
      GetComInterfaceEntries: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  IComExposedDetails: {
    kind: "interface",
    members: {
      GetComInterfaceEntries: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IIUnknownCacheStrategy: {
    kind: "class",
    members: {
      TableInfo: {
        kind: "struct",
        members: {
          ManagedType: {
            kind: "property",
            type: () => {
              return System.RuntimeTypeHandle;
            },
          },
          Table: {
            kind: "property",
            type: () => {
              return System.Void;
            },
          },
          ThisPtr: {
            kind: "property",
            type: () => {
              return System.Void;
            },
          },
        },
      },
    },
  },
  IIUnknownDerivedDetails: {
    kind: "interface",
    members: {
      Iid: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      Implementation: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      ManagedVirtualMethodTable: {
        kind: "property",
        type: () => {
          return System.Void;
        },
      },
    },
  },
  IIUnknownInterfaceDetailsStrategy: {
    kind: "interface",
    members: {
      GetComExposedTypeDetails: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetIUnknownDerivedDetails: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IIUnknownInterfaceType: {
    kind: "interface",
    members: {
      Iid: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isAbstract: true,
      },
      ManagedVirtualMethodTable: {
        kind: "property",
        type: () => {
          return System.Void;
        },
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  IIUnknownStrategy: {
    kind: "interface",
    members: {
      CreateInstancePointer: {
        kind: "method",
        methodKind: "ordinary",
      },
      QueryInterface: {
        kind: "method",
        methodKind: "ordinary",
      },
      Release: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IUnknownDerivedAttribute: {
    kind: "class",
    members: {
      IUnknownDerivedAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Iid: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      Implementation: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      ManagedVirtualMethodTable: {
        kind: "property",
        type: () => {
          return System.Void;
        },
      },
    },
  },
  IUnmanagedVirtualMethodTableProvider: {
    kind: "interface",
    members: {
      GetVirtualMethodTableInfoForKey: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  MarshalMode: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Marshalling.MarshalMode;
        },
      },
      ManagedToUnmanagedIn: {
        kind: "field",
        type: () => {
          return Marshalling.MarshalMode;
        },
      },
      ManagedToUnmanagedRef: {
        kind: "field",
        type: () => {
          return Marshalling.MarshalMode;
        },
      },
      ManagedToUnmanagedOut: {
        kind: "field",
        type: () => {
          return Marshalling.MarshalMode;
        },
      },
      UnmanagedToManagedIn: {
        kind: "field",
        type: () => {
          return Marshalling.MarshalMode;
        },
      },
      UnmanagedToManagedRef: {
        kind: "field",
        type: () => {
          return Marshalling.MarshalMode;
        },
      },
      UnmanagedToManagedOut: {
        kind: "field",
        type: () => {
          return Marshalling.MarshalMode;
        },
      },
      ElementIn: {
        kind: "field",
        type: () => {
          return Marshalling.MarshalMode;
        },
      },
      ElementRef: {
        kind: "field",
        type: () => {
          return Marshalling.MarshalMode;
        },
      },
      ElementOut: {
        kind: "field",
        type: () => {
          return Marshalling.MarshalMode;
        },
      },
    },
  },
  MarshalUsingAttribute: {
    kind: "class",
    members: {
      ReturnsCountValue: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      MarshalUsingAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      NativeType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      CountElementName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ConstantElementCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ElementIndirectionDepth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  NativeMarshallingAttribute: {
    kind: "class",
    members: {
      NativeMarshallingAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      NativeType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  PointerArrayMarshaller: {
    kind: "class",
    members: {
      ManagedToUnmanagedIn: {
        kind: "struct",
        members: {
          FromManaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetManagedValuesSource: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetUnmanagedValuesDestination: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetPinnableReference: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToUnmanaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          Free: {
            kind: "method",
            methodKind: "ordinary",
          },
          BufferSize: {
            kind: "property",
            type: () => {
              return System.Int32;
            },
            isStatic: true,
          },
        },
      },
    },
  },
  ReadOnlySpanMarshaller: {
    kind: "class",
    members: {
      ManagedToUnmanagedIn: {
        kind: "struct",
        members: {
          Free: {
            kind: "method",
            methodKind: "ordinary",
          },
          FromManaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetManagedValuesSource: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetPinnableReference: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetUnmanagedValuesDestination: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToUnmanaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          BufferSize: {
            kind: "property",
            type: () => {
              return System.Int32;
            },
            isStatic: true,
          },
        },
      },
      ManagedToUnmanagedOut: {
        kind: "struct",
        members: {
          FromUnmanaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToManaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetUnmanagedValuesSource: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetManagedValuesDestination: {
            kind: "method",
            methodKind: "ordinary",
          },
          Free: {
            kind: "method",
            methodKind: "ordinary",
          },
        },
      },
      UnmanagedToManagedOut: {
        kind: "class",
        members: {
          AllocateContainerForUnmanagedElements: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          GetManagedValuesSource: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          GetUnmanagedValuesDestination: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
        },
        isStatic: true,
      },
    },
  },
  SafeHandleMarshaller: {
    kind: "class",
    members: {
      ManagedToUnmanagedIn: {
        kind: "struct",
        members: {
          Free: {
            kind: "method",
            methodKind: "ordinary",
          },
          FromManaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToUnmanaged: {
            kind: "method",
            methodKind: "ordinary",
          },
        },
      },
      ManagedToUnmanagedOut: {
        kind: "struct",
        members: {
          ManagedToUnmanagedOut: {
            kind: "method",
            methodKind: "constructor",
          },
          Free: {
            kind: "method",
            methodKind: "ordinary",
          },
          FromUnmanaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToManaged: {
            kind: "method",
            methodKind: "ordinary",
          },
        },
      },
      ManagedToUnmanagedRef: {
        kind: "struct",
        members: {
          ManagedToUnmanagedRef: {
            kind: "method",
            methodKind: "constructor",
          },
          Free: {
            kind: "method",
            methodKind: "ordinary",
          },
          FromManaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          FromUnmanaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          OnInvoked: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToManagedFinally: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToUnmanaged: {
            kind: "method",
            methodKind: "ordinary",
          },
        },
      },
    },
  },
  SpanMarshaller: {
    kind: "class",
    members: {
      ManagedToUnmanagedIn: {
        kind: "struct",
        members: {
          Free: {
            kind: "method",
            methodKind: "ordinary",
          },
          FromManaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetManagedValuesSource: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetPinnableReference: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetUnmanagedValuesDestination: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToUnmanaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          BufferSize: {
            kind: "property",
            type: () => {
              return System.Int32;
            },
            isStatic: true,
          },
        },
      },
    },
  },
  StrategyBasedComWrappers: {
    kind: "class",
    members: {
      StrategyBasedComWrappers: {
        kind: "method",
        methodKind: "constructor",
      },
      ComputeVtables: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      CreateCacheStrategy: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateDefaultCacheStrategy: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateObject: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      GetOrCreateInterfaceDetailsStrategy: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetOrCreateIUnknownStrategy: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReleaseObjects: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      DefaultIUnknownInterfaceDetailsStrategy: {
        kind: "property",
        type: () => {
          return Marshalling.IIUnknownInterfaceDetailsStrategy;
        },
        isStatic: true,
      },
      DefaultIUnknownStrategy: {
        kind: "property",
        type: () => {
          return Marshalling.IIUnknownStrategy;
        },
        isStatic: true,
      },
    },
  },
  UniqueComInterfaceMarshaller: {
    kind: "class",
    members: {
      ConvertToUnmanaged: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ConvertToManaged: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Free: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  Utf16StringMarshaller: {
    kind: "class",
    members: {
      ConvertToUnmanaged: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ConvertToManaged: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Free: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetPinnableReference: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isReadOnly: true,
      },
    },
    isStatic: true,
  },
  Utf8StringMarshaller: {
    kind: "class",
    members: {
      ManagedToUnmanagedIn: {
        kind: "struct",
        members: {
          FromManaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          ToUnmanaged: {
            kind: "method",
            methodKind: "ordinary",
          },
          Free: {
            kind: "method",
            methodKind: "ordinary",
          },
          BufferSize: {
            kind: "property",
            type: () => {
              return System.Int32;
            },
            isStatic: true,
          },
        },
      },
    },
  },
  VirtualMethodTableInfo: {
    kind: "struct",
    members: {
      VirtualMethodTableInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      Deconstruct: {
        kind: "method",
        methodKind: "ordinary",
      },
      ThisPointer: {
        kind: "property",
        type: () => {
          return System.Void;
        },
      },
      VirtualMethodTable: {
        kind: "property",
        type: () => {
          return System.Void;
        },
      },
    },
  },
});
export default Marshalling
