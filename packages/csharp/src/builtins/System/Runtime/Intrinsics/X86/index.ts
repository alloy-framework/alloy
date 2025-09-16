import System from "../../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type X86Library = LibrarySymbolReference & {
  Aes: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  Avx: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  Avx10v1: LibrarySymbolReference & {
    V512: LibrarySymbolReference & {
      X64: LibrarySymbolReference & {
        IsSupported: LibrarySymbolReference
      }
    };
    X64: LibrarySymbolReference & {
      ConvertScalarToVector128Double: LibrarySymbolReference;
      ConvertScalarToVector128Single: LibrarySymbolReference;
      ConvertToInt64: LibrarySymbolReference;
      ConvertToUInt64: LibrarySymbolReference;
      ConvertToUInt64WithTruncation: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  Avx2: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  Avx512BW: LibrarySymbolReference & {
    VL: LibrarySymbolReference & {
      CompareGreaterThan: LibrarySymbolReference;
      CompareGreaterThanOrEqual: LibrarySymbolReference;
      CompareLessThan: LibrarySymbolReference;
      CompareLessThanOrEqual: LibrarySymbolReference;
      CompareNotEqual: LibrarySymbolReference;
      ConvertToVector128Byte: LibrarySymbolReference;
      ConvertToVector128ByteWithSaturation: LibrarySymbolReference;
      ConvertToVector128SByte: LibrarySymbolReference;
      ConvertToVector128SByteWithSaturation: LibrarySymbolReference;
      PermuteVar8x16: LibrarySymbolReference;
      PermuteVar8x16x2: LibrarySymbolReference;
      PermuteVar16x16: LibrarySymbolReference;
      PermuteVar16x16x2: LibrarySymbolReference;
      ShiftLeftLogicalVariable: LibrarySymbolReference;
      ShiftRightArithmeticVariable: LibrarySymbolReference;
      ShiftRightLogicalVariable: LibrarySymbolReference;
      SumAbsoluteDifferencesInBlock32: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    };
    X64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  Avx512CD: LibrarySymbolReference & {
    VL: LibrarySymbolReference & {
      DetectConflicts: LibrarySymbolReference;
      LeadingZeroCount: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    };
    X64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  Avx512DQ: LibrarySymbolReference & {
    VL: LibrarySymbolReference & {
      BroadcastPairScalarToVector128: LibrarySymbolReference;
      BroadcastPairScalarToVector256: LibrarySymbolReference;
      ConvertToVector128Double: LibrarySymbolReference;
      ConvertToVector128Int64: LibrarySymbolReference;
      ConvertToVector128Int64WithTruncation: LibrarySymbolReference;
      ConvertToVector128Single: LibrarySymbolReference;
      ConvertToVector128UInt64: LibrarySymbolReference;
      ConvertToVector128UInt64WithTruncation: LibrarySymbolReference;
      ConvertToVector256Double: LibrarySymbolReference;
      ConvertToVector256Int64: LibrarySymbolReference;
      ConvertToVector256Int64WithTruncation: LibrarySymbolReference;
      ConvertToVector256UInt64: LibrarySymbolReference;
      ConvertToVector256UInt64WithTruncation: LibrarySymbolReference;
      MultiplyLow: LibrarySymbolReference;
      Range: LibrarySymbolReference;
      Reduce: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    };
    X64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  Avx512F: LibrarySymbolReference & {
    VL: LibrarySymbolReference & {
      Abs: LibrarySymbolReference;
      AlignRight32: LibrarySymbolReference;
      AlignRight64: LibrarySymbolReference;
      CompareGreaterThan: LibrarySymbolReference;
      CompareGreaterThanOrEqual: LibrarySymbolReference;
      CompareLessThan: LibrarySymbolReference;
      CompareLessThanOrEqual: LibrarySymbolReference;
      CompareNotEqual: LibrarySymbolReference;
      ConvertToVector128Byte: LibrarySymbolReference;
      ConvertToVector128ByteWithSaturation: LibrarySymbolReference;
      ConvertToVector128Double: LibrarySymbolReference;
      ConvertToVector128Int16: LibrarySymbolReference;
      ConvertToVector128Int16WithSaturation: LibrarySymbolReference;
      ConvertToVector128Int32: LibrarySymbolReference;
      ConvertToVector128Int32WithSaturation: LibrarySymbolReference;
      ConvertToVector128SByte: LibrarySymbolReference;
      ConvertToVector128SByteWithSaturation: LibrarySymbolReference;
      ConvertToVector128Single: LibrarySymbolReference;
      ConvertToVector128UInt16: LibrarySymbolReference;
      ConvertToVector128UInt16WithSaturation: LibrarySymbolReference;
      ConvertToVector128UInt32: LibrarySymbolReference;
      ConvertToVector128UInt32WithSaturation: LibrarySymbolReference;
      ConvertToVector128UInt32WithTruncation: LibrarySymbolReference;
      ConvertToVector256Double: LibrarySymbolReference;
      ConvertToVector256Single: LibrarySymbolReference;
      ConvertToVector256UInt32: LibrarySymbolReference;
      ConvertToVector256UInt32WithTruncation: LibrarySymbolReference;
      Fixup: LibrarySymbolReference;
      GetExponent: LibrarySymbolReference;
      GetMantissa: LibrarySymbolReference;
      Max: LibrarySymbolReference;
      Min: LibrarySymbolReference;
      PermuteVar2x64x2: LibrarySymbolReference;
      PermuteVar4x32x2: LibrarySymbolReference;
      PermuteVar4x64: LibrarySymbolReference;
      PermuteVar4x64x2: LibrarySymbolReference;
      PermuteVar8x32x2: LibrarySymbolReference;
      Reciprocal14: LibrarySymbolReference;
      ReciprocalSqrt14: LibrarySymbolReference;
      RotateLeft: LibrarySymbolReference;
      RotateLeftVariable: LibrarySymbolReference;
      RotateRight: LibrarySymbolReference;
      RotateRightVariable: LibrarySymbolReference;
      RoundScale: LibrarySymbolReference;
      Scale: LibrarySymbolReference;
      ShiftRightArithmetic: LibrarySymbolReference;
      ShiftRightArithmeticVariable: LibrarySymbolReference;
      Shuffle2x128: LibrarySymbolReference;
      TernaryLogic: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    };
    X64: LibrarySymbolReference & {
      ConvertScalarToVector128Double: LibrarySymbolReference;
      ConvertScalarToVector128Single: LibrarySymbolReference;
      ConvertToInt64: LibrarySymbolReference;
      ConvertToUInt64: LibrarySymbolReference;
      ConvertToUInt64WithTruncation: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  Avx512Vbmi: LibrarySymbolReference & {
    VL: LibrarySymbolReference & {
      MultiShift: LibrarySymbolReference;
      PermuteVar16x8: LibrarySymbolReference;
      PermuteVar16x8x2: LibrarySymbolReference;
      PermuteVar32x8: LibrarySymbolReference;
      PermuteVar32x8x2: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    };
    X64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  AvxVnni: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  Bmi1: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      AndNot: LibrarySymbolReference;
      BitFieldExtract: LibrarySymbolReference;
      ExtractLowestSetBit: LibrarySymbolReference;
      GetMaskUpToLowestSetBit: LibrarySymbolReference;
      ResetLowestSetBit: LibrarySymbolReference;
      TrailingZeroCount: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  Bmi2: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      MultiplyNoFlags: LibrarySymbolReference;
      ParallelBitDeposit: LibrarySymbolReference;
      ParallelBitExtract: LibrarySymbolReference;
      ZeroHighBits: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  FloatComparisonMode: LibrarySymbolReference & {
    OrderedEqualNonSignaling: LibrarySymbolReference;
    OrderedLessThanSignaling: LibrarySymbolReference;
    OrderedLessThanOrEqualSignaling: LibrarySymbolReference;
    UnorderedNonSignaling: LibrarySymbolReference;
    UnorderedNotEqualNonSignaling: LibrarySymbolReference;
    UnorderedNotLessThanSignaling: LibrarySymbolReference;
    UnorderedNotLessThanOrEqualSignaling: LibrarySymbolReference;
    OrderedNonSignaling: LibrarySymbolReference;
    UnorderedEqualNonSignaling: LibrarySymbolReference;
    UnorderedNotGreaterThanOrEqualSignaling: LibrarySymbolReference;
    UnorderedNotGreaterThanSignaling: LibrarySymbolReference;
    OrderedFalseNonSignaling: LibrarySymbolReference;
    OrderedNotEqualNonSignaling: LibrarySymbolReference;
    OrderedGreaterThanOrEqualSignaling: LibrarySymbolReference;
    OrderedGreaterThanSignaling: LibrarySymbolReference;
    UnorderedTrueNonSignaling: LibrarySymbolReference;
    OrderedEqualSignaling: LibrarySymbolReference;
    OrderedLessThanNonSignaling: LibrarySymbolReference;
    OrderedLessThanOrEqualNonSignaling: LibrarySymbolReference;
    UnorderedSignaling: LibrarySymbolReference;
    UnorderedNotEqualSignaling: LibrarySymbolReference;
    UnorderedNotLessThanNonSignaling: LibrarySymbolReference;
    UnorderedNotLessThanOrEqualNonSignaling: LibrarySymbolReference;
    OrderedSignaling: LibrarySymbolReference;
    UnorderedEqualSignaling: LibrarySymbolReference;
    UnorderedNotGreaterThanOrEqualNonSignaling: LibrarySymbolReference;
    UnorderedNotGreaterThanNonSignaling: LibrarySymbolReference;
    OrderedFalseSignaling: LibrarySymbolReference;
    OrderedNotEqualSignaling: LibrarySymbolReference;
    OrderedGreaterThanOrEqualNonSignaling: LibrarySymbolReference;
    OrderedGreaterThanNonSignaling: LibrarySymbolReference;
    UnorderedTrueSignaling: LibrarySymbolReference
  };
  FloatRoundingMode: LibrarySymbolReference & {
    ToEven: LibrarySymbolReference;
    ToNegativeInfinity: LibrarySymbolReference;
    ToPositiveInfinity: LibrarySymbolReference;
    ToZero: LibrarySymbolReference
  };
  Fma: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  Lzcnt: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      LeadingZeroCount: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  Pclmulqdq: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  Popcnt: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      PopCount: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  Sse: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      ConvertScalarToVector128Single: LibrarySymbolReference;
      ConvertToInt64: LibrarySymbolReference;
      ConvertToInt64WithTruncation: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  Sse2: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      ConvertScalarToVector128Double: LibrarySymbolReference;
      ConvertScalarToVector128Int64: LibrarySymbolReference;
      ConvertScalarToVector128UInt64: LibrarySymbolReference;
      ConvertToInt64: LibrarySymbolReference;
      ConvertToInt64WithTruncation: LibrarySymbolReference;
      ConvertToUInt64: LibrarySymbolReference;
      StoreNonTemporal: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  Sse3: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  Sse41: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      Extract: LibrarySymbolReference;
      Insert: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  Sse42: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      Crc32: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  Ssse3: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  };
  X86Base: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      DivRem: LibrarySymbolReference;
      IsSupported: LibrarySymbolReference
    }
  };
  X86Serialize: LibrarySymbolReference & {
    X64: LibrarySymbolReference & {
      IsSupported: LibrarySymbolReference
    }
  }
};
const X86: X86Library = createLibrary("System.Runtime.Intrinsics.X86", {
  Aes: {
    kind: "class",
    members: {
      X64: {
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
  Avx: {
    kind: "class",
    members: {
      X64: {
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
  Avx10v1: {
    kind: "class",
    members: {
      V512: {
        kind: "class",
        members: {
          X64: {
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
      X64: {
        kind: "class",
        members: {
          ConvertScalarToVector128Double: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertScalarToVector128Single: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64WithTruncation: {
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
  Avx2: {
    kind: "class",
    members: {
      X64: {
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
  Avx512BW: {
    kind: "class",
    members: {
      VL: {
        kind: "class",
        members: {
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
          CompareNotEqual: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128Byte: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128ByteWithSaturation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128SByte: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128SByteWithSaturation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          PermuteVar8x16: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          PermuteVar8x16x2: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          PermuteVar16x16: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          PermuteVar16x16x2: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftLeftLogicalVariable: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftRightArithmeticVariable: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftRightLogicalVariable: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          SumAbsoluteDifferencesInBlock32: {
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
      X64: {
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
  Avx512CD: {
    kind: "class",
    members: {
      VL: {
        kind: "class",
        members: {
          DetectConflicts: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          LeadingZeroCount: {
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
      X64: {
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
  Avx512DQ: {
    kind: "class",
    members: {
      VL: {
        kind: "class",
        members: {
          BroadcastPairScalarToVector128: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          BroadcastPairScalarToVector256: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128Double: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128Int64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128Int64WithTruncation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128Single: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128UInt64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128UInt64WithTruncation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector256Double: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector256Int64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector256Int64WithTruncation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector256UInt64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector256UInt64WithTruncation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          MultiplyLow: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Range: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Reduce: {
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
      X64: {
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
  Avx512F: {
    kind: "class",
    members: {
      VL: {
        kind: "class",
        members: {
          Abs: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AlignRight32: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          AlignRight64: {
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
          CompareNotEqual: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128Byte: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128ByteWithSaturation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128Double: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128Int16: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128Int16WithSaturation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128Int32: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128Int32WithSaturation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128SByte: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128SByteWithSaturation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128Single: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128UInt16: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128UInt16WithSaturation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128UInt32: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128UInt32WithSaturation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector128UInt32WithTruncation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector256Double: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector256Single: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector256UInt32: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToVector256UInt32WithTruncation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Fixup: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          GetExponent: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          GetMantissa: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Max: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Min: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          PermuteVar2x64x2: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          PermuteVar4x32x2: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          PermuteVar4x64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          PermuteVar4x64x2: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          PermuteVar8x32x2: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Reciprocal14: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ReciprocalSqrt14: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          RotateLeft: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          RotateLeftVariable: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          RotateRight: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          RotateRightVariable: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          RoundScale: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Scale: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftRightArithmetic: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ShiftRightArithmeticVariable: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Shuffle2x128: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          TernaryLogic: {
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
      X64: {
        kind: "class",
        members: {
          ConvertScalarToVector128Double: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertScalarToVector128Single: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64WithTruncation: {
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
  Avx512Vbmi: {
    kind: "class",
    members: {
      VL: {
        kind: "class",
        members: {
          MultiShift: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          PermuteVar16x8: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          PermuteVar16x8x2: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          PermuteVar32x8: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          PermuteVar32x8x2: {
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
      X64: {
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
  AvxVnni: {
    kind: "class",
    members: {
      X64: {
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
  Bmi1: {
    kind: "class",
    members: {
      X64: {
        kind: "class",
        members: {
          AndNot: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          BitFieldExtract: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ExtractLowestSetBit: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          GetMaskUpToLowestSetBit: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ResetLowestSetBit: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          TrailingZeroCount: {
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
  Bmi2: {
    kind: "class",
    members: {
      X64: {
        kind: "class",
        members: {
          MultiplyNoFlags: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ParallelBitDeposit: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ParallelBitExtract: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ZeroHighBits: {
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
  FloatComparisonMode: {
    kind: "enum",
    members: {
      OrderedEqualNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedLessThanSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedLessThanOrEqualSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedNotEqualNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedNotLessThanSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedNotLessThanOrEqualSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedEqualNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedNotGreaterThanOrEqualSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedNotGreaterThanSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedFalseNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedNotEqualNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedGreaterThanOrEqualSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedGreaterThanSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedTrueNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedEqualSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedLessThanNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedLessThanOrEqualNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedNotEqualSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedNotLessThanNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedNotLessThanOrEqualNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedEqualSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedNotGreaterThanOrEqualNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedNotGreaterThanNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedFalseSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedNotEqualSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedGreaterThanOrEqualNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      OrderedGreaterThanNonSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
      UnorderedTrueSignaling: {
        kind: "field",
        type: () => {
          return X86.FloatComparisonMode;
        },
      },
    },
  },
  FloatRoundingMode: {
    kind: "enum",
    members: {
      ToEven: {
        kind: "field",
        type: () => {
          return X86.FloatRoundingMode;
        },
      },
      ToNegativeInfinity: {
        kind: "field",
        type: () => {
          return X86.FloatRoundingMode;
        },
      },
      ToPositiveInfinity: {
        kind: "field",
        type: () => {
          return X86.FloatRoundingMode;
        },
      },
      ToZero: {
        kind: "field",
        type: () => {
          return X86.FloatRoundingMode;
        },
      },
    },
  },
  Fma: {
    kind: "class",
    members: {
      X64: {
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
  Lzcnt: {
    kind: "class",
    members: {
      X64: {
        kind: "class",
        members: {
          LeadingZeroCount: {
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
  Pclmulqdq: {
    kind: "class",
    members: {
      X64: {
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
  Popcnt: {
    kind: "class",
    members: {
      X64: {
        kind: "class",
        members: {
          PopCount: {
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
  Sse: {
    kind: "class",
    members: {
      X64: {
        kind: "class",
        members: {
          ConvertScalarToVector128Single: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64WithTruncation: {
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
  Sse2: {
    kind: "class",
    members: {
      X64: {
        kind: "class",
        members: {
          ConvertScalarToVector128Double: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertScalarToVector128Int64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertScalarToVector128UInt64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToInt64WithTruncation: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          ConvertToUInt64: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          StoreNonTemporal: {
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
  Sse3: {
    kind: "class",
    members: {
      X64: {
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
  Sse41: {
    kind: "class",
    members: {
      X64: {
        kind: "class",
        members: {
          Extract: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          Insert: {
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
  Sse42: {
    kind: "class",
    members: {
      X64: {
        kind: "class",
        members: {
          Crc32: {
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
  Ssse3: {
    kind: "class",
    members: {
      X64: {
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
  X86Base: {
    kind: "class",
    members: {
      X64: {
        kind: "class",
        members: {
          DivRem: {
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
  X86Serialize: {
    kind: "class",
    members: {
      X64: {
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
});
export default X86
