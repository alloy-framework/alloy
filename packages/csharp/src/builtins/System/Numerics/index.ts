import System from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type NumericsLibrary = LibrarySymbolReference & {
  BitOperations: LibrarySymbolReference & {
    Crc32C: LibrarySymbolReference;
    IsPow2: LibrarySymbolReference;
    LeadingZeroCount: LibrarySymbolReference;
    Log2: LibrarySymbolReference;
    PopCount: LibrarySymbolReference;
    RotateLeft: LibrarySymbolReference;
    RotateRight: LibrarySymbolReference;
    RoundUpToPowerOf2: LibrarySymbolReference;
    TrailingZeroCount: LibrarySymbolReference
  };
  IAdditionOperators: LibrarySymbolReference & {

  };
  IAdditiveIdentity: LibrarySymbolReference & {
    AdditiveIdentity: LibrarySymbolReference
  };
  IBinaryFloatingPointIeee754: LibrarySymbolReference & {

  };
  IBinaryInteger: LibrarySymbolReference & {
    DivRem: LibrarySymbolReference;
    GetByteCount: LibrarySymbolReference;
    GetShortestBitLength: LibrarySymbolReference;
    LeadingZeroCount: LibrarySymbolReference;
    PopCount: LibrarySymbolReference;
    ReadBigEndian: LibrarySymbolReference;
    ReadLittleEndian: LibrarySymbolReference;
    RotateLeft: LibrarySymbolReference;
    RotateRight: LibrarySymbolReference;
    TrailingZeroCount: LibrarySymbolReference;
    TryReadBigEndian: LibrarySymbolReference;
    TryReadLittleEndian: LibrarySymbolReference;
    TryWriteBigEndian: LibrarySymbolReference;
    TryWriteLittleEndian: LibrarySymbolReference;
    WriteBigEndian: LibrarySymbolReference;
    WriteLittleEndian: LibrarySymbolReference
  };
  IBinaryNumber: LibrarySymbolReference & {
    IsPow2: LibrarySymbolReference;
    Log2: LibrarySymbolReference;
    AllBitsSet: LibrarySymbolReference
  };
  IBitwiseOperators: LibrarySymbolReference & {

  };
  IComparisonOperators: LibrarySymbolReference & {

  };
  IDecrementOperators: LibrarySymbolReference & {

  };
  IDivisionOperators: LibrarySymbolReference & {

  };
  IEqualityOperators: LibrarySymbolReference & {

  };
  IExponentialFunctions: LibrarySymbolReference & {
    Exp: LibrarySymbolReference;
    Exp10: LibrarySymbolReference;
    Exp10M1: LibrarySymbolReference;
    Exp2: LibrarySymbolReference;
    Exp2M1: LibrarySymbolReference;
    ExpM1: LibrarySymbolReference
  };
  IFloatingPoint: LibrarySymbolReference & {
    Ceiling: LibrarySymbolReference;
    Floor: LibrarySymbolReference;
    GetExponentByteCount: LibrarySymbolReference;
    GetExponentShortestBitLength: LibrarySymbolReference;
    GetSignificandBitLength: LibrarySymbolReference;
    GetSignificandByteCount: LibrarySymbolReference;
    Round: LibrarySymbolReference;
    Truncate: LibrarySymbolReference;
    TryWriteExponentBigEndian: LibrarySymbolReference;
    TryWriteExponentLittleEndian: LibrarySymbolReference;
    TryWriteSignificandBigEndian: LibrarySymbolReference;
    TryWriteSignificandLittleEndian: LibrarySymbolReference;
    WriteExponentBigEndian: LibrarySymbolReference;
    WriteExponentLittleEndian: LibrarySymbolReference;
    WriteSignificandBigEndian: LibrarySymbolReference;
    WriteSignificandLittleEndian: LibrarySymbolReference
  };
  IFloatingPointConstants: LibrarySymbolReference & {
    E: LibrarySymbolReference;
    Pi: LibrarySymbolReference;
    Tau: LibrarySymbolReference
  };
  IFloatingPointIeee754: LibrarySymbolReference & {
    Atan2: LibrarySymbolReference;
    Atan2Pi: LibrarySymbolReference;
    BitDecrement: LibrarySymbolReference;
    BitIncrement: LibrarySymbolReference;
    FusedMultiplyAdd: LibrarySymbolReference;
    Ieee754Remainder: LibrarySymbolReference;
    ILogB: LibrarySymbolReference;
    Lerp: LibrarySymbolReference;
    ReciprocalEstimate: LibrarySymbolReference;
    ReciprocalSqrtEstimate: LibrarySymbolReference;
    ScaleB: LibrarySymbolReference;
    Epsilon: LibrarySymbolReference;
    NaN: LibrarySymbolReference;
    NegativeInfinity: LibrarySymbolReference;
    NegativeZero: LibrarySymbolReference;
    PositiveInfinity: LibrarySymbolReference
  };
  IHyperbolicFunctions: LibrarySymbolReference & {
    Acosh: LibrarySymbolReference;
    Asinh: LibrarySymbolReference;
    Atanh: LibrarySymbolReference;
    Cosh: LibrarySymbolReference;
    Sinh: LibrarySymbolReference;
    Tanh: LibrarySymbolReference
  };
  IIncrementOperators: LibrarySymbolReference & {

  };
  ILogarithmicFunctions: LibrarySymbolReference & {
    Log: LibrarySymbolReference;
    Log10: LibrarySymbolReference;
    Log10P1: LibrarySymbolReference;
    Log2: LibrarySymbolReference;
    Log2P1: LibrarySymbolReference;
    LogP1: LibrarySymbolReference
  };
  IMinMaxValue: LibrarySymbolReference & {
    MaxValue: LibrarySymbolReference;
    MinValue: LibrarySymbolReference
  };
  IModulusOperators: LibrarySymbolReference & {

  };
  IMultiplicativeIdentity: LibrarySymbolReference & {
    MultiplicativeIdentity: LibrarySymbolReference
  };
  IMultiplyOperators: LibrarySymbolReference & {

  };
  INumber: LibrarySymbolReference & {
    Clamp: LibrarySymbolReference;
    CopySign: LibrarySymbolReference;
    Max: LibrarySymbolReference;
    MaxNumber: LibrarySymbolReference;
    Min: LibrarySymbolReference;
    MinNumber: LibrarySymbolReference;
    Sign: LibrarySymbolReference
  };
  INumberBase: LibrarySymbolReference & {
    Abs: LibrarySymbolReference;
    IsCanonical: LibrarySymbolReference;
    IsComplexNumber: LibrarySymbolReference;
    IsEvenInteger: LibrarySymbolReference;
    IsFinite: LibrarySymbolReference;
    IsImaginaryNumber: LibrarySymbolReference;
    IsInfinity: LibrarySymbolReference;
    IsInteger: LibrarySymbolReference;
    IsNaN: LibrarySymbolReference;
    IsNegative: LibrarySymbolReference;
    IsNegativeInfinity: LibrarySymbolReference;
    IsNormal: LibrarySymbolReference;
    IsOddInteger: LibrarySymbolReference;
    IsPositive: LibrarySymbolReference;
    IsPositiveInfinity: LibrarySymbolReference;
    IsRealNumber: LibrarySymbolReference;
    IsSubnormal: LibrarySymbolReference;
    IsZero: LibrarySymbolReference;
    MaxMagnitude: LibrarySymbolReference;
    MaxMagnitudeNumber: LibrarySymbolReference;
    MinMagnitude: LibrarySymbolReference;
    MinMagnitudeNumber: LibrarySymbolReference;
    MultiplyAddEstimate: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    One: LibrarySymbolReference;
    Radix: LibrarySymbolReference;
    Zero: LibrarySymbolReference
  };
  IPowerFunctions: LibrarySymbolReference & {
    Pow: LibrarySymbolReference
  };
  IRootFunctions: LibrarySymbolReference & {
    Cbrt: LibrarySymbolReference;
    Hypot: LibrarySymbolReference;
    RootN: LibrarySymbolReference;
    Sqrt: LibrarySymbolReference
  };
  IShiftOperators: LibrarySymbolReference & {

  };
  ISignedNumber: LibrarySymbolReference & {
    NegativeOne: LibrarySymbolReference
  };
  ISubtractionOperators: LibrarySymbolReference & {

  };
  ITrigonometricFunctions: LibrarySymbolReference & {
    Acos: LibrarySymbolReference;
    AcosPi: LibrarySymbolReference;
    Asin: LibrarySymbolReference;
    AsinPi: LibrarySymbolReference;
    Atan: LibrarySymbolReference;
    AtanPi: LibrarySymbolReference;
    Cos: LibrarySymbolReference;
    CosPi: LibrarySymbolReference;
    DegreesToRadians: LibrarySymbolReference;
    RadiansToDegrees: LibrarySymbolReference;
    Sin: LibrarySymbolReference;
    SinCos: LibrarySymbolReference;
    SinCosPi: LibrarySymbolReference;
    SinPi: LibrarySymbolReference;
    Tan: LibrarySymbolReference;
    TanPi: LibrarySymbolReference
  };
  IUnaryNegationOperators: LibrarySymbolReference & {

  };
  IUnaryPlusOperators: LibrarySymbolReference & {

  };
  IUnsignedNumber: LibrarySymbolReference & {

  };
  TotalOrderIeee754Comparer: LibrarySymbolReference & {
    Compare: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference
  }
};
const Numerics: NumericsLibrary = createLibrary("System.Numerics", {
  BitOperations: {
    kind: "class",
    members: {
      Crc32C: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LeadingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateRight: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RoundUpToPowerOf2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  IAdditionOperators: {
    kind: "interface",
    members: {},
  },
  IAdditiveIdentity: {
    kind: "interface",
    members: {
      AdditiveIdentity: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  IBinaryFloatingPointIeee754: {
    kind: "interface",
    members: {},
  },
  IBinaryInteger: {
    kind: "interface",
    members: {
      DivRem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetByteCount: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetShortestBitLength: {
        kind: "method",
        methodKind: "ordinary",
      },
      LeadingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      ReadBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateRight: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      TryReadBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      TryReadLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      TryWriteBigEndian: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryWriteLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteBigEndian: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IBinaryNumber: {
    kind: "interface",
    members: {
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      AllBitsSet: {
        kind: "property",
        type: undefined,
        isStatic: true,
      },
    },
  },
  IBitwiseOperators: {
    kind: "interface",
    members: {},
  },
  IComparisonOperators: {
    kind: "interface",
    members: {},
  },
  IDecrementOperators: {
    kind: "interface",
    members: {},
  },
  IDivisionOperators: {
    kind: "interface",
    members: {},
  },
  IEqualityOperators: {
    kind: "interface",
    members: {},
  },
  IExponentialFunctions: {
    kind: "interface",
    members: {
      Exp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Exp10: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Exp10M1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Exp2M1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ExpM1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  IFloatingPoint: {
    kind: "interface",
    members: {
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
      GetExponentByteCount: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetExponentShortestBitLength: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSignificandBitLength: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSignificandByteCount: {
        kind: "method",
        methodKind: "ordinary",
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteExponentBigEndian: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryWriteExponentLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryWriteSignificandBigEndian: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryWriteSignificandLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteExponentBigEndian: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteExponentLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteSignificandBigEndian: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteSignificandLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IFloatingPointConstants: {
    kind: "interface",
    members: {
      E: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
      Pi: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
      Tau: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  IFloatingPointIeee754: {
    kind: "interface",
    members: {
      Atan2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Atan2Pi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      BitDecrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      BitIncrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      FusedMultiplyAdd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Ieee754Remainder: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      ILogB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Lerp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReciprocalEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReciprocalSqrtEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ScaleB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Epsilon: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
      NaN: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
      NegativeInfinity: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
      NegativeZero: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
      PositiveInfinity: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  IHyperbolicFunctions: {
    kind: "interface",
    members: {
      Acosh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Asinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Atanh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Cosh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Sinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Tanh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  IIncrementOperators: {
    kind: "interface",
    members: {},
  },
  ILogarithmicFunctions: {
    kind: "interface",
    members: {
      Log: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Log10: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Log10P1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Log2P1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LogP1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  IMinMaxValue: {
    kind: "interface",
    members: {
      MaxValue: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
      MinValue: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  IModulusOperators: {
    kind: "interface",
    members: {},
  },
  IMultiplicativeIdentity: {
    kind: "interface",
    members: {
      MultiplicativeIdentity: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  IMultiplyOperators: {
    kind: "interface",
    members: {},
  },
  INumber: {
    kind: "interface",
    members: {
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  INumberBase: {
    kind: "interface",
    members: {
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsCanonical: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsComplexNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsFinite: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsImaginaryNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsNaN: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsNegative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsNegativeInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsNormal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsPositive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsPositiveInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsRealNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsSubnormal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      IsZero: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      MaxMagnitudeNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      MinMagnitudeNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      MultiplyAddEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      One: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
      Radix: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isAbstract: true,
      },
      Zero: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  IPowerFunctions: {
    kind: "interface",
    members: {
      Pow: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  IRootFunctions: {
    kind: "interface",
    members: {
      Cbrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Hypot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      RootN: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Sqrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  IShiftOperators: {
    kind: "interface",
    members: {},
  },
  ISignedNumber: {
    kind: "interface",
    members: {
      NegativeOne: {
        kind: "property",
        type: undefined,
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  ISubtractionOperators: {
    kind: "interface",
    members: {},
  },
  ITrigonometricFunctions: {
    kind: "interface",
    members: {
      Acos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      AcosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Asin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      AsinPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Atan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      AtanPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Cos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      CosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      DegreesToRadians: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RadiansToDegrees: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      SinCos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      SinCosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      SinPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      Tan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      TanPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  IUnaryNegationOperators: {
    kind: "interface",
    members: {},
  },
  IUnaryPlusOperators: {
    kind: "interface",
    members: {},
  },
  IUnsignedNumber: {
    kind: "interface",
    members: {},
  },
  TotalOrderIeee754Comparer: {
    kind: "struct",
    members: {
      Compare: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
});
export default Numerics
