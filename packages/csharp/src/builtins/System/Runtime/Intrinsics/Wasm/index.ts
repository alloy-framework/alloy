import System from "../../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type WasmLibrary = LibrarySymbolReference & {
  PackedSimd: LibrarySymbolReference & {
    Splat: LibrarySymbolReference;
    ExtractScalar: LibrarySymbolReference;
    ReplaceScalar: LibrarySymbolReference;
    Swizzle: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    Dot: LibrarySymbolReference;
    Negate: LibrarySymbolReference;
    MultiplyWideningLower: LibrarySymbolReference;
    MultiplyWideningUpper: LibrarySymbolReference;
    AddPairwiseWidening: LibrarySymbolReference;
    AddSaturate: LibrarySymbolReference;
    SubtractSaturate: LibrarySymbolReference;
    MultiplyRoundedSaturateQ15: LibrarySymbolReference;
    Min: LibrarySymbolReference;
    Max: LibrarySymbolReference;
    AverageRounded: LibrarySymbolReference;
    Abs: LibrarySymbolReference;
    ShiftLeft: LibrarySymbolReference;
    ShiftRightArithmetic: LibrarySymbolReference;
    ShiftRightLogical: LibrarySymbolReference;
    And: LibrarySymbolReference;
    Or: LibrarySymbolReference;
    Xor: LibrarySymbolReference;
    Not: LibrarySymbolReference;
    AndNot: LibrarySymbolReference;
    BitwiseSelect: LibrarySymbolReference;
    PopCount: LibrarySymbolReference;
    AnyTrue: LibrarySymbolReference;
    AllTrue: LibrarySymbolReference;
    Bitmask: LibrarySymbolReference;
    CompareEqual: LibrarySymbolReference;
    CompareNotEqual: LibrarySymbolReference;
    CompareLessThan: LibrarySymbolReference;
    CompareLessThanOrEqual: LibrarySymbolReference;
    CompareGreaterThan: LibrarySymbolReference;
    CompareGreaterThanOrEqual: LibrarySymbolReference;
    LoadVector128: LibrarySymbolReference;
    LoadScalarVector128: LibrarySymbolReference;
    LoadScalarAndSplatVector128: LibrarySymbolReference;
    LoadScalarAndInsert: LibrarySymbolReference;
    LoadWideningVector128: LibrarySymbolReference;
    Store: LibrarySymbolReference;
    StoreSelectedScalar: LibrarySymbolReference;
    PseudoMin: LibrarySymbolReference;
    PseudoMax: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Sqrt: LibrarySymbolReference;
    Ceiling: LibrarySymbolReference;
    Floor: LibrarySymbolReference;
    Truncate: LibrarySymbolReference;
    RoundToNearest: LibrarySymbolReference;
    ConvertToSingle: LibrarySymbolReference;
    ConvertToDoubleLower: LibrarySymbolReference;
    ConvertToInt32Saturate: LibrarySymbolReference;
    ConvertToUInt32Saturate: LibrarySymbolReference;
    ConvertNarrowingSaturateSigned: LibrarySymbolReference;
    ConvertNarrowingSaturateUnsigned: LibrarySymbolReference;
    SignExtendWideningLower: LibrarySymbolReference;
    SignExtendWideningUpper: LibrarySymbolReference;
    ZeroExtendWideningLower: LibrarySymbolReference;
    ZeroExtendWideningUpper: LibrarySymbolReference;
    PackedSimd: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference
  }
};
const Wasm: WasmLibrary = createLibrary("System.Runtime.Intrinsics.Wasm", {
  PackedSimd: {
    kind: "class",
    members: {
      Splat: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ExtractScalar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReplaceScalar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Swizzle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Negate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MultiplyWideningLower: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MultiplyWideningUpper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AddPairwiseWidening: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AddSaturate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SubtractSaturate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MultiplyRoundedSaturateQ15: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AverageRounded: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ShiftLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ShiftRightArithmetic: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ShiftRightLogical: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      And: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Or: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Xor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Not: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AndNot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitwiseSelect: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AnyTrue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AllTrue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Bitmask: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareNotEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareLessThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareLessThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareGreaterThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareGreaterThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadVector128: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadScalarVector128: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadScalarAndSplatVector128: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadScalarAndInsert: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadWideningVector128: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Store: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StoreSelectedScalar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PseudoMin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PseudoMax: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sqrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ceiling: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Floor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RoundToNearest: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ConvertToSingle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ConvertToDoubleLower: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ConvertToInt32Saturate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ConvertToUInt32Saturate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ConvertNarrowingSaturateSigned: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ConvertNarrowingSaturateUnsigned: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SignExtendWideningLower: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SignExtendWideningUpper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ZeroExtendWideningLower: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ZeroExtendWideningUpper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PackedSimd: {
        kind: "method",
        methodKind: "constructor",
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
});
export default Wasm
