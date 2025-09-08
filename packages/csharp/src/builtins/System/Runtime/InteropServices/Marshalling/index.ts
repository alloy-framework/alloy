import System from "../../../index.js";

import { createLibrary } from "#createLibrary";


const Marshalling = createLibrary("System.Runtime.InteropServices.Marshalling", {
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
});
export default Marshalling
