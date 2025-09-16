import System from "../../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ArmLibrary = LibrarySymbolReference & {
  AdvSimd: LibrarySymbolReference & {
    Arm64: LibrarySymbolReference & {
      Abs: LibrarySymbolReference;
      AbsoluteCompareGreaterThan: LibrarySymbolReference;
      AbsoluteCompareGreaterThanOrEqual: LibrarySymbolReference;
      AbsoluteCompareGreaterThanOrEqualScalar: LibrarySymbolReference;
      AbsoluteCompareGreaterThanScalar: LibrarySymbolReference;
      AbsoluteCompareLessThan: LibrarySymbolReference;
      AbsoluteCompareLessThanOrEqual: LibrarySymbolReference;
      AbsoluteCompareLessThanOrEqualScalar: LibrarySymbolReference;
      AbsoluteCompareLessThanScalar: LibrarySymbolReference;
      AbsoluteDifference: LibrarySymbolReference;
      AbsoluteDifferenceScalar: LibrarySymbolReference;
      AbsSaturate: LibrarySymbolReference;
      AbsSaturateScalar: LibrarySymbolReference;
      AbsScalar: LibrarySymbolReference;
      Add: LibrarySymbolReference;
      AddAcross: LibrarySymbolReference;
      AddAcrossWidening: LibrarySymbolReference;
      AddPairwise: LibrarySymbolReference;
      AddPairwiseScalar: LibrarySymbolReference;
      AddSaturate: LibrarySymbolReference;
      AddSaturateScalar: LibrarySymbolReference;
      Ceiling: LibrarySymbolReference;
      CompareEqual: LibrarySymbolReference;
      CompareEqualScalar: LibrarySymbolReference;
      CompareGreaterThan: LibrarySymbolReference;
      CompareGreaterThanOrEqual: LibrarySymbolReference;
      CompareGreaterThanOrEqualScalar: LibrarySymbolReference;
      CompareGreaterThanScalar: LibrarySymbolReference;
      CompareLessThan: LibrarySymbolReference;
      CompareLessThanOrEqual: LibrarySymbolReference;
      CompareLessThanOrEqualScalar: LibrarySymbolReference;
      CompareLessThanScalar: LibrarySymbolReference;
      CompareTest: LibrarySymbolReference;
      CompareTestScalar: LibrarySymbolReference;
      ConvertToDouble: LibrarySymbolReference;
      ConvertToDoubleScalar: LibrarySymbolReference;
      ConvertToDoubleUpper: LibrarySymbolReference;
      ConvertToInt64RoundAwayFromZero: LibrarySymbolReference;
      ConvertToInt64RoundAwayFromZeroScalar: LibrarySymbolReference;
      ConvertToInt64RoundToEven: LibrarySymbolReference;
      ConvertToInt64RoundToEvenScalar: LibrarySymbolReference;
      ConvertToInt64RoundToNegativeInfinity: LibrarySymbolReference;
      ConvertToInt64RoundToNegativeInfinityScalar: LibrarySymbolReference;
      ConvertToInt64RoundToPositiveInfinity: LibrarySymbolReference;
      ConvertToInt64RoundToPositiveInfinityScalar: LibrarySymbolReference;
      ConvertToInt64RoundToZero: LibrarySymbolReference;
      ConvertToInt64RoundToZeroScalar: LibrarySymbolReference;
      ConvertToSingleLower: LibrarySymbolReference;
      ConvertToSingleRoundToOddLower: LibrarySymbolReference;
      ConvertToSingleRoundToOddUpper: LibrarySymbolReference;
      ConvertToSingleUpper: LibrarySymbolReference;
      ConvertToUInt64RoundAwayFromZero: LibrarySymbolReference;
      ConvertToUInt64RoundAwayFromZeroScalar: LibrarySymbolReference;
      ConvertToUInt64RoundToEven: LibrarySymbolReference;
      ConvertToUInt64RoundToEvenScalar: LibrarySymbolReference;
      ConvertToUInt64RoundToNegativeInfinity: LibrarySymbolReference;
      ConvertToUInt64RoundToNegativeInfinityScalar: LibrarySymbolReference;
      ConvertToUInt64RoundToPositiveInfinity: LibrarySymbolReference;
      ConvertToUInt64RoundToPositiveInfinityScalar: LibrarySymbolReference;
      ConvertToUInt64RoundToZero: LibrarySymbolReference;
      ConvertToUInt64RoundToZeroScalar: LibrarySymbolReference;
      Divide: LibrarySymbolReference;
      DuplicateSelectedScalarToVector128: LibrarySymbolReference;
      DuplicateToVector128: LibrarySymbolReference;
      ExtractNarrowingSaturateScalar: LibrarySymbolReference;
      ExtractNarrowingSaturateUnsignedScalar: LibrarySymbolReference;
      Floor: LibrarySymbolReference;
      FusedMultiplyAdd: LibrarySymbolReference;
      FusedMultiplyAddByScalar: LibrarySymbolReference;
      FusedMultiplyAddBySelectedScalar: LibrarySymbolReference;
      FusedMultiplyAddScalarBySelectedScalar: LibrarySymbolReference;
      FusedMultiplySubtract: LibrarySymbolReference;
      FusedMultiplySubtractByScalar: LibrarySymbolReference;
      FusedMultiplySubtractBySelectedScalar: LibrarySymbolReference;
      FusedMultiplySubtractScalarBySelectedScalar: LibrarySymbolReference;
      InsertSelectedScalar: LibrarySymbolReference;
      LoadAndInsertScalar: LibrarySymbolReference;
      LoadAndReplicateToVector128: LibrarySymbolReference;
      LoadAndReplicateToVector128x2: LibrarySymbolReference;
      LoadAndReplicateToVector128x3: LibrarySymbolReference;
      LoadAndReplicateToVector128x4: LibrarySymbolReference;
      LoadPairScalarVector64: LibrarySymbolReference;
      LoadPairScalarVector64NonTemporal: LibrarySymbolReference;
      LoadPairVector128: LibrarySymbolReference;
      LoadPairVector128NonTemporal: LibrarySymbolReference;
      LoadPairVector64: LibrarySymbolReference;
      LoadPairVector64NonTemporal: LibrarySymbolReference;
      Load2xVector128AndUnzip: LibrarySymbolReference;
      Load3xVector128AndUnzip: LibrarySymbolReference;
      Load4xVector128AndUnzip: LibrarySymbolReference;
      Load2xVector128: LibrarySymbolReference;
      Load3xVector128: LibrarySymbolReference;
      Load4xVector128: LibrarySymbolReference;
      Max: LibrarySymbolReference;
      MaxAcross: LibrarySymbolReference;
      MaxNumber: LibrarySymbolReference;
      MaxNumberAcross: LibrarySymbolReference;
      MaxNumberPairwise: LibrarySymbolReference;
      MaxNumberPairwiseScalar: LibrarySymbolReference;
      MaxPairwise: LibrarySymbolReference;
      MaxPairwiseScalar: LibrarySymbolReference;
      MaxScalar: LibrarySymbolReference;
      Min: LibrarySymbolReference;
      MinAcross: LibrarySymbolReference;
      MinNumber: LibrarySymbolReference;
      MinNumberAcross: LibrarySymbolReference;
      MinNumberPairwise: LibrarySymbolReference;
      MinNumberPairwiseScalar: LibrarySymbolReference;
      MinPairwise: LibrarySymbolReference;
      MinPairwiseScalar: LibrarySymbolReference;
      MinScalar: LibrarySymbolReference;
      Multiply: LibrarySymbolReference;
      MultiplyByScalar: LibrarySymbolReference;
      MultiplyBySelectedScalar: LibrarySymbolReference;
      MultiplyDoublingSaturateHighScalar: LibrarySymbolReference;
      MultiplyDoublingScalarBySelectedScalarSaturateHigh: LibrarySymbolReference;
      MultiplyDoublingWideningAndAddSaturateScalar: LibrarySymbolReference;
      MultiplyDoublingWideningAndSubtractSaturateScalar: LibrarySymbolReference;
      MultiplyDoublingWideningSaturateScalar: LibrarySymbolReference;
      MultiplyDoublingWideningSaturateScalarBySelectedScalar: LibrarySymbolReference;
      MultiplyDoublingWideningScalarBySelectedScalarAndAddSaturate: LibrarySymbolReference;
      MultiplyDoublingWideningScalarBySelectedScalarAndSubtractSaturate: LibrarySymbolReference;
      MultiplyExtended: LibrarySymbolReference;
      MultiplyExtendedByScalar: LibrarySymbolReference;
      MultiplyExtendedBySelectedScalar: LibrarySymbolReference;
      MultiplyExtendedScalar: LibrarySymbolReference;
      MultiplyExtendedScalarBySelectedScalar: LibrarySymbolReference;
      MultiplyRoundedDoublingSaturateHighScalar: LibrarySymbolReference;
      MultiplyRoundedDoublingScalarBySelectedScalarSaturateHigh: LibrarySymbolReference;
      MultiplyScalarBySelectedScalar: LibrarySymbolReference;
      Negate: LibrarySymbolReference;
      NegateSaturate: LibrarySymbolReference;
      NegateSaturateScalar: LibrarySymbolReference;
      NegateScalar: LibrarySymbolReference;
      ReciprocalEstimate: LibrarySymbolReference;
      ReciprocalEstimateScalar: LibrarySymbolReference;
      ReciprocalExponentScalar: LibrarySymbolReference;
      ReciprocalSquareRootEstimate: LibrarySymbolReference;
      ReciprocalSquareRootEstimateScalar: LibrarySymbolReference;
      ReciprocalSquareRootStep: LibrarySymbolReference;
      ReciprocalSquareRootStepScalar: LibrarySymbolReference;
      ReciprocalStep: LibrarySymbolReference;
      ReciprocalStepScalar: LibrarySymbolReference;
      ReverseElementBits: LibrarySymbolReference;
      RoundAwayFromZero: LibrarySymbolReference;
      RoundToNearest: LibrarySymbolReference;
      RoundToNegativeInfinity: LibrarySymbolReference;
      RoundToPositiveInfinity: LibrarySymbolReference;
      RoundToZero: LibrarySymbolReference;
      ShiftArithmeticRoundedSaturateScalar: LibrarySymbolReference;
      ShiftArithmeticSaturateScalar: LibrarySymbolReference;
      ShiftLeftLogicalSaturateScalar: LibrarySymbolReference;
      ShiftLeftLogicalSaturateUnsignedScalar: LibrarySymbolReference;
      ShiftLogicalRoundedSaturateScalar: LibrarySymbolReference;
      ShiftLogicalSaturateScalar: LibrarySymbolReference;
      ShiftRightArithmeticNarrowingSaturateScalar: LibrarySymbolReference;
      ShiftRightArithmeticNarrowingSaturateUnsignedScalar: LibrarySymbolReference;
      ShiftRightArithmeticRoundedNarrowingSaturateScalar: LibrarySymbolReference;
      ShiftRightArithmeticRoundedNarrowingSaturateUnsignedScalar: LibrarySymbolReference;
      ShiftRightLogicalNarrowingSaturateScalar: LibrarySymbolReference;
      ShiftRightLogicalRoundedNarrowingSaturateScalar: LibrarySymbolReference;
      Sqrt: LibrarySymbolReference;
      StorePair: LibrarySymbolReference;
      StorePairNonTemporal: LibrarySymbolReference;
      StorePairScalar: LibrarySymbolReference;
      StorePairScalarNonTemporal: LibrarySymbolReference;
      StoreSelectedScalar: LibrarySymbolReference;
      StoreVectorAndZip: LibrarySymbolReference;
      Store: LibrarySymbolReference;
      Subtract: LibrarySymbolReference;
      SubtractSaturateScalar: LibrarySymbolReference;
      TransposeEven: LibrarySymbolReference;
      TransposeOdd: LibrarySymbolReference;
      UnzipEven: LibrarySymbolReference;
      UnzipOdd: LibrarySymbolReference;
      VectorTableLookup: LibrarySymbolReference;
      VectorTableLookupExtension: LibrarySymbolReference;
      ZipHigh: LibrarySymbolReference;
      ZipLow: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  Aes: LibrarySymbolReference & {
    Arm64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  ArmBase: LibrarySymbolReference & {
    Arm64: LibrarySymbolReference & {
      LeadingSignCount: LibrarySymbolReference;
      LeadingZeroCount: LibrarySymbolReference;
      MultiplyHigh: LibrarySymbolReference;
      ReverseElementBits: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  Crc32: LibrarySymbolReference & {
    Arm64: LibrarySymbolReference & {
      ComputeCrc32: LibrarySymbolReference;
      ComputeCrc32C: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  Dp: LibrarySymbolReference & {
    Arm64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  Rdm: LibrarySymbolReference & {
    Arm64: LibrarySymbolReference & {
      MultiplyRoundedDoublingAndAddSaturateHighScalar: LibrarySymbolReference;
      MultiplyRoundedDoublingAndSubtractSaturateHighScalar: LibrarySymbolReference;
      MultiplyRoundedDoublingScalarBySelectedScalarAndAddSaturateHigh: LibrarySymbolReference;
      MultiplyRoundedDoublingScalarBySelectedScalarAndSubtractSaturateHigh: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  Sha1: LibrarySymbolReference & {
    Arm64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  Sha256: LibrarySymbolReference & {
    Arm64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  Sve: LibrarySymbolReference & {
    Arm64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  SveMaskPattern: LibrarySymbolReference & {
    LargestPowerOf2: LibrarySymbolReference;
    VectorCount1: LibrarySymbolReference;
    VectorCount2: LibrarySymbolReference;
    VectorCount3: LibrarySymbolReference;
    VectorCount4: LibrarySymbolReference;
    VectorCount5: LibrarySymbolReference;
    VectorCount6: LibrarySymbolReference;
    VectorCount7: LibrarySymbolReference;
    VectorCount8: LibrarySymbolReference;
    VectorCount16: LibrarySymbolReference;
    VectorCount32: LibrarySymbolReference;
    VectorCount64: LibrarySymbolReference;
    VectorCount128: LibrarySymbolReference;
    VectorCount256: LibrarySymbolReference;
    LargestMultipleOf4: LibrarySymbolReference;
    LargestMultipleOf3: LibrarySymbolReference;
    All: LibrarySymbolReference
  };
  SvePrefetchType: LibrarySymbolReference & {
    LoadL1Temporal: LibrarySymbolReference;
    LoadL1NonTemporal: LibrarySymbolReference;
    LoadL2Temporal: LibrarySymbolReference;
    LoadL2NonTemporal: LibrarySymbolReference;
    LoadL3Temporal: LibrarySymbolReference;
    LoadL3NonTemporal: LibrarySymbolReference;
    StoreL1Temporal: LibrarySymbolReference;
    StoreL1NonTemporal: LibrarySymbolReference;
    StoreL2Temporal: LibrarySymbolReference;
    StoreL2NonTemporal: LibrarySymbolReference;
    StoreL3Temporal: LibrarySymbolReference;
    StoreL3NonTemporal: LibrarySymbolReference
  }
};
const Arm: ArmLibrary = createLibrary("System.Runtime.Intrinsics.Arm", {
  AdvSimd: {
    kind: "class",
    members: {
      Arm64: {
        kind: "class",
        members: {
          Abs: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AbsoluteCompareGreaterThan: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AbsoluteCompareGreaterThanOrEqual: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AbsoluteCompareGreaterThanOrEqualScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AbsoluteCompareGreaterThanScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AbsoluteCompareLessThan: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AbsoluteCompareLessThanOrEqual: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AbsoluteCompareLessThanOrEqualScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AbsoluteCompareLessThanScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AbsoluteDifference: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AbsoluteDifferenceScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AbsSaturate: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AbsSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AbsScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Add: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AddAcross: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AddAcrossWidening: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AddPairwise: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AddPairwiseScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AddSaturate: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AddSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Ceiling: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          CompareEqual: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          CompareEqualScalar: {
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
          CompareGreaterThanOrEqualScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          CompareGreaterThanScalar: {
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
          CompareLessThanOrEqualScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          CompareLessThanScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          CompareTest: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          CompareTestScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToDouble: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToDoubleScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToDoubleUpper: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64RoundAwayFromZero: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64RoundAwayFromZeroScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64RoundToEven: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64RoundToEvenScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64RoundToNegativeInfinity: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64RoundToNegativeInfinityScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64RoundToPositiveInfinity: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64RoundToPositiveInfinityScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64RoundToZero: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64RoundToZeroScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToSingleLower: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToSingleRoundToOddLower: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToSingleRoundToOddUpper: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToSingleUpper: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64RoundAwayFromZero: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64RoundAwayFromZeroScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64RoundToEven: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64RoundToEvenScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64RoundToNegativeInfinity: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64RoundToNegativeInfinityScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64RoundToPositiveInfinity: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64RoundToPositiveInfinityScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64RoundToZero: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64RoundToZeroScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Divide: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          DuplicateSelectedScalarToVector128: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          DuplicateToVector128: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ExtractNarrowingSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ExtractNarrowingSaturateUnsignedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Floor: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          FusedMultiplyAdd: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          FusedMultiplyAddByScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          FusedMultiplyAddBySelectedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          FusedMultiplyAddScalarBySelectedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          FusedMultiplySubtract: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          FusedMultiplySubtractByScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          FusedMultiplySubtractBySelectedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          FusedMultiplySubtractScalarBySelectedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          InsertSelectedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          LoadAndInsertScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          LoadAndReplicateToVector128: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          LoadAndReplicateToVector128x2: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          LoadAndReplicateToVector128x3: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          LoadAndReplicateToVector128x4: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          LoadPairScalarVector64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          LoadPairScalarVector64NonTemporal: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          LoadPairVector128: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          LoadPairVector128NonTemporal: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          LoadPairVector64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          LoadPairVector64NonTemporal: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Load2xVector128AndUnzip: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Load3xVector128AndUnzip: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Load4xVector128AndUnzip: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Load2xVector128: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Load3xVector128: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Load4xVector128: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Max: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MaxAcross: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MaxNumber: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MaxNumberAcross: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MaxNumberPairwise: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MaxNumberPairwiseScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MaxPairwise: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MaxPairwiseScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MaxScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Min: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MinAcross: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MinNumber: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MinNumberAcross: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MinNumberPairwise: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MinNumberPairwiseScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MinPairwise: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MinPairwiseScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MinScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Multiply: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyByScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyBySelectedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyDoublingSaturateHighScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyDoublingScalarBySelectedScalarSaturateHigh: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyDoublingWideningAndAddSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyDoublingWideningAndSubtractSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyDoublingWideningSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyDoublingWideningSaturateScalarBySelectedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyDoublingWideningScalarBySelectedScalarAndAddSaturate: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyDoublingWideningScalarBySelectedScalarAndSubtractSaturate: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyExtended: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyExtendedByScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyExtendedBySelectedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyExtendedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyExtendedScalarBySelectedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyRoundedDoublingSaturateHighScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyRoundedDoublingScalarBySelectedScalarSaturateHigh: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyScalarBySelectedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Negate: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          NegateSaturate: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          NegateSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          NegateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ReciprocalEstimate: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ReciprocalEstimateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ReciprocalExponentScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ReciprocalSquareRootEstimate: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ReciprocalSquareRootEstimateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ReciprocalSquareRootStep: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ReciprocalSquareRootStepScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ReciprocalStep: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ReciprocalStepScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ReverseElementBits: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          RoundAwayFromZero: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          RoundToNearest: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          RoundToNegativeInfinity: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          RoundToPositiveInfinity: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          RoundToZero: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftArithmeticRoundedSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftArithmeticSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftLeftLogicalSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftLeftLogicalSaturateUnsignedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftLogicalRoundedSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftLogicalSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftRightArithmeticNarrowingSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftRightArithmeticNarrowingSaturateUnsignedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftRightArithmeticRoundedNarrowingSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftRightArithmeticRoundedNarrowingSaturateUnsignedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftRightLogicalNarrowingSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftRightLogicalRoundedNarrowingSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Sqrt: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          StorePair: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          StorePairNonTemporal: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          StorePairScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          StorePairScalarNonTemporal: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          StoreSelectedScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          StoreVectorAndZip: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Store: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Subtract: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          SubtractSaturateScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          TransposeEven: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          TransposeOdd: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          UnzipEven: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          UnzipOdd: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          VectorTableLookup: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          VectorTableLookupExtension: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ZipHigh: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ZipLow: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
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
    },
  },
  Aes: {
    kind: "class",
    members: {
      Arm64: {
        kind: "class",
        members: {
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
    },
  },
  ArmBase: {
    kind: "class",
    members: {
      Arm64: {
        kind: "class",
        members: {
          LeadingSignCount: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          LeadingZeroCount: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyHigh: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ReverseElementBits: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
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
    },
  },
  Crc32: {
    kind: "class",
    members: {
      Arm64: {
        kind: "class",
        members: {
          ComputeCrc32: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ComputeCrc32C: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
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
    },
  },
  Dp: {
    kind: "class",
    members: {
      Arm64: {
        kind: "class",
        members: {
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
    },
  },
  Rdm: {
    kind: "class",
    members: {
      Arm64: {
        kind: "class",
        members: {
          MultiplyRoundedDoublingAndAddSaturateHighScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyRoundedDoublingAndSubtractSaturateHighScalar: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyRoundedDoublingScalarBySelectedScalarAndAddSaturateHigh: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyRoundedDoublingScalarBySelectedScalarAndSubtractSaturateHigh: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
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
    },
  },
  Sha1: {
    kind: "class",
    members: {
      Arm64: {
        kind: "class",
        members: {
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
    },
  },
  Sha256: {
    kind: "class",
    members: {
      Arm64: {
        kind: "class",
        members: {
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
    },
  },
  Sve: {
    kind: "class",
    members: {
      Arm64: {
        kind: "class",
        members: {
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
    },
  },
  SveMaskPattern: {
    kind: "enum",
    members: {
      LargestPowerOf2: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      VectorCount1: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      VectorCount2: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      VectorCount3: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      VectorCount4: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      VectorCount5: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      VectorCount6: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      VectorCount7: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      VectorCount8: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      VectorCount16: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      VectorCount32: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      VectorCount64: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      VectorCount128: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      VectorCount256: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      LargestMultipleOf4: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      LargestMultipleOf3: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
      All: {
        kind: "field",
        type: () => {
          return Arm.SveMaskPattern;
        },
      },
    },
  },
  SvePrefetchType: {
    kind: "enum",
    members: {
      LoadL1Temporal: {
        kind: "field",
        type: () => {
          return Arm.SvePrefetchType;
        },
      },
      LoadL1NonTemporal: {
        kind: "field",
        type: () => {
          return Arm.SvePrefetchType;
        },
      },
      LoadL2Temporal: {
        kind: "field",
        type: () => {
          return Arm.SvePrefetchType;
        },
      },
      LoadL2NonTemporal: {
        kind: "field",
        type: () => {
          return Arm.SvePrefetchType;
        },
      },
      LoadL3Temporal: {
        kind: "field",
        type: () => {
          return Arm.SvePrefetchType;
        },
      },
      LoadL3NonTemporal: {
        kind: "field",
        type: () => {
          return Arm.SvePrefetchType;
        },
      },
      StoreL1Temporal: {
        kind: "field",
        type: () => {
          return Arm.SvePrefetchType;
        },
      },
      StoreL1NonTemporal: {
        kind: "field",
        type: () => {
          return Arm.SvePrefetchType;
        },
      },
      StoreL2Temporal: {
        kind: "field",
        type: () => {
          return Arm.SvePrefetchType;
        },
      },
      StoreL2NonTemporal: {
        kind: "field",
        type: () => {
          return Arm.SvePrefetchType;
        },
      },
      StoreL3Temporal: {
        kind: "field",
        type: () => {
          return Arm.SvePrefetchType;
        },
      },
      StoreL3NonTemporal: {
        kind: "field",
        type: () => {
          return Arm.SvePrefetchType;
        },
      },
    },
  },
});
export default Arm
