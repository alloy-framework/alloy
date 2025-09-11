import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Arm } from "./Arm/index.js";
export { default as Wasm } from "./Wasm/index.js";
export { default as X86 } from "./X86/index.js";

type IntrinsicsLibrary = LibrarySymbolReference & {
  Vector128: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    AllBitsSet: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Indices: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference;
    One: LibrarySymbolReference;
    Zero: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  Vector256: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    AllBitsSet: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Indices: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference;
    One: LibrarySymbolReference;
    Zero: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  Vector512: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    AllBitsSet: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Indices: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference;
    One: LibrarySymbolReference;
    Zero: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  Vector64: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    AllBitsSet: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Indices: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference;
    One: LibrarySymbolReference;
    Zero: LibrarySymbolReference;
    Item: LibrarySymbolReference
  }
};
const Intrinsics: IntrinsicsLibrary = createLibrary("System.Runtime.Intrinsics", {
  Vector128: {
    kind: "struct",
    members: {
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
      AllBitsSet: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector128;
        },
        isStatic: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      Indices: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector128;
        },
        isStatic: true,
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      One: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector128;
        },
        isStatic: true,
      },
      Zero: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector128;
        },
        isStatic: true,
      },
      Item: {
        kind: "property",
        type: undefined,
      },
    },
  },
  Vector256: {
    kind: "struct",
    members: {
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
      AllBitsSet: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector256;
        },
        isStatic: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      Indices: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector256;
        },
        isStatic: true,
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      One: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector256;
        },
        isStatic: true,
      },
      Zero: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector256;
        },
        isStatic: true,
      },
      Item: {
        kind: "property",
        type: undefined,
      },
    },
  },
  Vector512: {
    kind: "struct",
    members: {
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
      AllBitsSet: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector512;
        },
        isStatic: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      Indices: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector512;
        },
        isStatic: true,
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      One: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector512;
        },
        isStatic: true,
      },
      Zero: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector512;
        },
        isStatic: true,
      },
      Item: {
        kind: "property",
        type: undefined,
      },
    },
  },
  Vector64: {
    kind: "struct",
    members: {
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
      AllBitsSet: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector64;
        },
        isStatic: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      Indices: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector64;
        },
        isStatic: true,
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      One: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector64;
        },
        isStatic: true,
      },
      Zero: {
        kind: "property",
        type: () => {
          return Intrinsics.Vector64;
        },
        isStatic: true,
      },
      Item: {
        kind: "property",
        type: undefined,
      },
    },
  },
});
export default Intrinsics
