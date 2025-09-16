import System from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type NumericsLibrary = LibrarySymbolReference & {
  BigInteger: LibrarySymbolReference & {
    BigInteger: LibrarySymbolReference;
    Abs: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clamp: LibrarySymbolReference;
    Compare: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    CopySign: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    DivRem: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetBitLength: LibrarySymbolReference;
    GetByteCount: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GreatestCommonDivisor: LibrarySymbolReference;
    IsEvenInteger: LibrarySymbolReference;
    IsNegative: LibrarySymbolReference;
    IsOddInteger: LibrarySymbolReference;
    IsPositive: LibrarySymbolReference;
    IsPow2: LibrarySymbolReference;
    LeadingZeroCount: LibrarySymbolReference;
    Log: LibrarySymbolReference;
    Log10: LibrarySymbolReference;
    Log2: LibrarySymbolReference;
    Max: LibrarySymbolReference;
    MaxMagnitude: LibrarySymbolReference;
    Min: LibrarySymbolReference;
    MinMagnitude: LibrarySymbolReference;
    ModPow: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    Negate: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    PopCount: LibrarySymbolReference;
    Pow: LibrarySymbolReference;
    Remainder: LibrarySymbolReference;
    RotateLeft: LibrarySymbolReference;
    RotateRight: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToByteArray: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TrailingZeroCount: LibrarySymbolReference;
    TryFormat: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    TryWriteBytes: LibrarySymbolReference;
    IsEven: LibrarySymbolReference;
    IsOne: LibrarySymbolReference;
    IsPowerOfTwo: LibrarySymbolReference;
    IsZero: LibrarySymbolReference;
    MinusOne: LibrarySymbolReference;
    One: LibrarySymbolReference;
    Sign: LibrarySymbolReference;
    Zero: LibrarySymbolReference
  };
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
  Complex: LibrarySymbolReference & {
    ImaginaryOne: LibrarySymbolReference;
    Infinity: LibrarySymbolReference;
    NaN: LibrarySymbolReference;
    One: LibrarySymbolReference;
    Zero: LibrarySymbolReference;
    Complex: LibrarySymbolReference;
    Abs: LibrarySymbolReference;
    Acos: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Asin: LibrarySymbolReference;
    Atan: LibrarySymbolReference;
    Conjugate: LibrarySymbolReference;
    Cos: LibrarySymbolReference;
    Cosh: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    Exp: LibrarySymbolReference;
    FromPolarCoordinates: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
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
    Log: LibrarySymbolReference;
    Log10: LibrarySymbolReference;
    MaxMagnitude: LibrarySymbolReference;
    MinMagnitude: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    Negate: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    Pow: LibrarySymbolReference;
    Reciprocal: LibrarySymbolReference;
    Sin: LibrarySymbolReference;
    Sinh: LibrarySymbolReference;
    Sqrt: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    Tan: LibrarySymbolReference;
    Tanh: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryFormat: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Imaginary: LibrarySymbolReference;
    Magnitude: LibrarySymbolReference;
    Phase: LibrarySymbolReference;
    Real: LibrarySymbolReference
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
  Matrix3x2: LibrarySymbolReference & {
    M11: LibrarySymbolReference;
    M12: LibrarySymbolReference;
    M21: LibrarySymbolReference;
    M22: LibrarySymbolReference;
    M31: LibrarySymbolReference;
    M32: LibrarySymbolReference;
    Matrix3x2: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    CreateRotation: LibrarySymbolReference;
    CreateScale: LibrarySymbolReference;
    CreateSkew: LibrarySymbolReference;
    CreateTranslation: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetDeterminant: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Invert: LibrarySymbolReference;
    Lerp: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    Negate: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Identity: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    IsIdentity: LibrarySymbolReference;
    Translation: LibrarySymbolReference
  };
  Matrix4x4: LibrarySymbolReference & {
    M11: LibrarySymbolReference;
    M12: LibrarySymbolReference;
    M13: LibrarySymbolReference;
    M14: LibrarySymbolReference;
    M21: LibrarySymbolReference;
    M22: LibrarySymbolReference;
    M23: LibrarySymbolReference;
    M24: LibrarySymbolReference;
    M31: LibrarySymbolReference;
    M32: LibrarySymbolReference;
    M33: LibrarySymbolReference;
    M34: LibrarySymbolReference;
    M41: LibrarySymbolReference;
    M42: LibrarySymbolReference;
    M43: LibrarySymbolReference;
    M44: LibrarySymbolReference;
    Matrix4x4: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    CreateBillboard: LibrarySymbolReference;
    CreateConstrainedBillboard: LibrarySymbolReference;
    CreateFromAxisAngle: LibrarySymbolReference;
    CreateFromQuaternion: LibrarySymbolReference;
    CreateFromYawPitchRoll: LibrarySymbolReference;
    CreateLookAt: LibrarySymbolReference;
    CreateLookAtLeftHanded: LibrarySymbolReference;
    CreateLookTo: LibrarySymbolReference;
    CreateLookToLeftHanded: LibrarySymbolReference;
    CreateOrthographic: LibrarySymbolReference;
    CreateOrthographicLeftHanded: LibrarySymbolReference;
    CreateOrthographicOffCenter: LibrarySymbolReference;
    CreateOrthographicOffCenterLeftHanded: LibrarySymbolReference;
    CreatePerspective: LibrarySymbolReference;
    CreatePerspectiveLeftHanded: LibrarySymbolReference;
    CreatePerspectiveFieldOfView: LibrarySymbolReference;
    CreatePerspectiveFieldOfViewLeftHanded: LibrarySymbolReference;
    CreatePerspectiveOffCenter: LibrarySymbolReference;
    CreatePerspectiveOffCenterLeftHanded: LibrarySymbolReference;
    CreateReflection: LibrarySymbolReference;
    CreateRotationX: LibrarySymbolReference;
    CreateRotationY: LibrarySymbolReference;
    CreateRotationZ: LibrarySymbolReference;
    CreateScale: LibrarySymbolReference;
    CreateShadow: LibrarySymbolReference;
    CreateTranslation: LibrarySymbolReference;
    CreateViewport: LibrarySymbolReference;
    CreateViewportLeftHanded: LibrarySymbolReference;
    CreateWorld: LibrarySymbolReference;
    Decompose: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetDeterminant: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Invert: LibrarySymbolReference;
    Lerp: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    Negate: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Transform: LibrarySymbolReference;
    Transpose: LibrarySymbolReference;
    Identity: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    IsIdentity: LibrarySymbolReference;
    Translation: LibrarySymbolReference
  };
  Plane: LibrarySymbolReference & {
    Normal: LibrarySymbolReference;
    D: LibrarySymbolReference;
    Plane: LibrarySymbolReference;
    CreateFromVertices: LibrarySymbolReference;
    Dot: LibrarySymbolReference;
    DotCoordinate: LibrarySymbolReference;
    DotNormal: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Normalize: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Transform: LibrarySymbolReference
  };
  Quaternion: LibrarySymbolReference & {
    X: LibrarySymbolReference;
    Y: LibrarySymbolReference;
    Z: LibrarySymbolReference;
    W: LibrarySymbolReference;
    Quaternion: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Concatenate: LibrarySymbolReference;
    Conjugate: LibrarySymbolReference;
    CreateFromAxisAngle: LibrarySymbolReference;
    CreateFromRotationMatrix: LibrarySymbolReference;
    CreateFromYawPitchRoll: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Dot: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Inverse: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    LengthSquared: LibrarySymbolReference;
    Lerp: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    Negate: LibrarySymbolReference;
    Normalize: LibrarySymbolReference;
    Slerp: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Zero: LibrarySymbolReference;
    Identity: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    IsIdentity: LibrarySymbolReference
  };
  TotalOrderIeee754Comparer: LibrarySymbolReference & {
    Compare: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference
  };
  Vector: LibrarySymbolReference & {
    Vector: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryCopyTo: LibrarySymbolReference;
    AllBitsSet: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Indices: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    One: LibrarySymbolReference;
    Zero: LibrarySymbolReference
  };
  Vector2: LibrarySymbolReference & {
    X: LibrarySymbolReference;
    Y: LibrarySymbolReference;
    Vector2: LibrarySymbolReference;
    Abs: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clamp: LibrarySymbolReference;
    ClampNative: LibrarySymbolReference;
    CopySign: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Cos: LibrarySymbolReference;
    TryCopyTo: LibrarySymbolReference;
    DegreesToRadians: LibrarySymbolReference;
    Distance: LibrarySymbolReference;
    DistanceSquared: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Dot: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    Exp: LibrarySymbolReference;
    FusedMultiplyAdd: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Hypot: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    LengthSquared: LibrarySymbolReference;
    Lerp: LibrarySymbolReference;
    Log: LibrarySymbolReference;
    Log2: LibrarySymbolReference;
    Max: LibrarySymbolReference;
    MaxMagnitude: LibrarySymbolReference;
    MaxMagnitudeNumber: LibrarySymbolReference;
    MaxNative: LibrarySymbolReference;
    MaxNumber: LibrarySymbolReference;
    Min: LibrarySymbolReference;
    MinMagnitude: LibrarySymbolReference;
    MinMagnitudeNumber: LibrarySymbolReference;
    MinNative: LibrarySymbolReference;
    MinNumber: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    MultiplyAddEstimate: LibrarySymbolReference;
    Negate: LibrarySymbolReference;
    Normalize: LibrarySymbolReference;
    RadiansToDegrees: LibrarySymbolReference;
    Round: LibrarySymbolReference;
    Reflect: LibrarySymbolReference;
    Sin: LibrarySymbolReference;
    SinCos: LibrarySymbolReference;
    SquareRoot: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Transform: LibrarySymbolReference;
    TransformNormal: LibrarySymbolReference;
    Truncate: LibrarySymbolReference;
    E: LibrarySymbolReference;
    Epsilon: LibrarySymbolReference;
    NaN: LibrarySymbolReference;
    NegativeInfinity: LibrarySymbolReference;
    NegativeZero: LibrarySymbolReference;
    One: LibrarySymbolReference;
    Pi: LibrarySymbolReference;
    PositiveInfinity: LibrarySymbolReference;
    Tau: LibrarySymbolReference;
    UnitX: LibrarySymbolReference;
    UnitY: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Zero: LibrarySymbolReference
  };
  Vector3: LibrarySymbolReference & {
    X: LibrarySymbolReference;
    Y: LibrarySymbolReference;
    Z: LibrarySymbolReference;
    Vector3: LibrarySymbolReference;
    Abs: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clamp: LibrarySymbolReference;
    ClampNative: LibrarySymbolReference;
    CopySign: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Cos: LibrarySymbolReference;
    TryCopyTo: LibrarySymbolReference;
    Cross: LibrarySymbolReference;
    DegreesToRadians: LibrarySymbolReference;
    Distance: LibrarySymbolReference;
    DistanceSquared: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Dot: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    Exp: LibrarySymbolReference;
    FusedMultiplyAdd: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    LengthSquared: LibrarySymbolReference;
    Hypot: LibrarySymbolReference;
    Lerp: LibrarySymbolReference;
    Log: LibrarySymbolReference;
    Log2: LibrarySymbolReference;
    Max: LibrarySymbolReference;
    MaxMagnitude: LibrarySymbolReference;
    MaxMagnitudeNumber: LibrarySymbolReference;
    MaxNative: LibrarySymbolReference;
    MaxNumber: LibrarySymbolReference;
    Min: LibrarySymbolReference;
    MinMagnitude: LibrarySymbolReference;
    MinMagnitudeNumber: LibrarySymbolReference;
    MinNative: LibrarySymbolReference;
    MinNumber: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    MultiplyAddEstimate: LibrarySymbolReference;
    Negate: LibrarySymbolReference;
    Normalize: LibrarySymbolReference;
    RadiansToDegrees: LibrarySymbolReference;
    Reflect: LibrarySymbolReference;
    Round: LibrarySymbolReference;
    Sin: LibrarySymbolReference;
    SinCos: LibrarySymbolReference;
    SquareRoot: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Transform: LibrarySymbolReference;
    TransformNormal: LibrarySymbolReference;
    Truncate: LibrarySymbolReference;
    E: LibrarySymbolReference;
    Epsilon: LibrarySymbolReference;
    NaN: LibrarySymbolReference;
    NegativeInfinity: LibrarySymbolReference;
    NegativeZero: LibrarySymbolReference;
    One: LibrarySymbolReference;
    Pi: LibrarySymbolReference;
    PositiveInfinity: LibrarySymbolReference;
    Tau: LibrarySymbolReference;
    UnitX: LibrarySymbolReference;
    UnitY: LibrarySymbolReference;
    UnitZ: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Zero: LibrarySymbolReference
  };
  Vector4: LibrarySymbolReference & {
    X: LibrarySymbolReference;
    Y: LibrarySymbolReference;
    Z: LibrarySymbolReference;
    W: LibrarySymbolReference;
    Vector4: LibrarySymbolReference;
    Abs: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clamp: LibrarySymbolReference;
    ClampNative: LibrarySymbolReference;
    CopySign: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Cos: LibrarySymbolReference;
    TryCopyTo: LibrarySymbolReference;
    DegreesToRadians: LibrarySymbolReference;
    Distance: LibrarySymbolReference;
    DistanceSquared: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Dot: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    Exp: LibrarySymbolReference;
    FusedMultiplyAdd: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    LengthSquared: LibrarySymbolReference;
    Hypot: LibrarySymbolReference;
    Lerp: LibrarySymbolReference;
    Log: LibrarySymbolReference;
    Log2: LibrarySymbolReference;
    Max: LibrarySymbolReference;
    MaxMagnitude: LibrarySymbolReference;
    MaxMagnitudeNumber: LibrarySymbolReference;
    MaxNative: LibrarySymbolReference;
    MaxNumber: LibrarySymbolReference;
    Min: LibrarySymbolReference;
    MinMagnitude: LibrarySymbolReference;
    MinMagnitudeNumber: LibrarySymbolReference;
    MinNative: LibrarySymbolReference;
    MinNumber: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    MultiplyAddEstimate: LibrarySymbolReference;
    Negate: LibrarySymbolReference;
    Normalize: LibrarySymbolReference;
    RadiansToDegrees: LibrarySymbolReference;
    Round: LibrarySymbolReference;
    Sin: LibrarySymbolReference;
    SinCos: LibrarySymbolReference;
    SquareRoot: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Transform: LibrarySymbolReference;
    Truncate: LibrarySymbolReference;
    E: LibrarySymbolReference;
    Epsilon: LibrarySymbolReference;
    NaN: LibrarySymbolReference;
    NegativeInfinity: LibrarySymbolReference;
    NegativeZero: LibrarySymbolReference;
    One: LibrarySymbolReference;
    Pi: LibrarySymbolReference;
    PositiveInfinity: LibrarySymbolReference;
    Tau: LibrarySymbolReference;
    UnitW: LibrarySymbolReference;
    UnitX: LibrarySymbolReference;
    UnitY: LibrarySymbolReference;
    UnitZ: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Zero: LibrarySymbolReference
  }
};
const Numerics: NumericsLibrary = createLibrary("System.Numerics", {
  BigInteger: {
    kind: "struct",
    members: {
      BigInteger: {
        kind: "method",
        methodKind: "constructor",
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Compare: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DivRem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetBitLength: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetByteCount: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GreatestCommonDivisor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositive: {
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
      Log: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log10: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ModPow: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Negate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Pow: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Remainder: {
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
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToByteArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEven: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsOne: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsPowerOfTwo: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsZero: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MinusOne: {
        kind: "property",
        type: () => {
          return Numerics.BigInteger;
        },
        isStatic: true,
      },
      One: {
        kind: "property",
        type: () => {
          return Numerics.BigInteger;
        },
        isStatic: true,
      },
      Sign: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Zero: {
        kind: "property",
        type: () => {
          return Numerics.BigInteger;
        },
        isStatic: true,
      },
    },
  },
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
  Complex: {
    kind: "struct",
    members: {
      ImaginaryOne: {
        kind: "field",
        type: () => {
          return Numerics.Complex;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Infinity: {
        kind: "field",
        type: () => {
          return Numerics.Complex;
        },
        isStatic: true,
        isReadOnly: true,
      },
      NaN: {
        kind: "field",
        type: () => {
          return Numerics.Complex;
        },
        isStatic: true,
        isReadOnly: true,
      },
      One: {
        kind: "field",
        type: () => {
          return Numerics.Complex;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Zero: {
        kind: "field",
        type: () => {
          return Numerics.Complex;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Complex: {
        kind: "method",
        methodKind: "constructor",
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Acos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Asin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Conjugate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cosh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      Exp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromPolarCoordinates: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsComplexNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsFinite: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsImaginaryNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNaN: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegativeInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNormal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositiveInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsRealNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSubnormal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log10: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Negate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Pow: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Reciprocal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sqrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Tan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Tanh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Imaginary: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
      Magnitude: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
      Phase: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
      Real: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
    },
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
  Matrix3x2: {
    kind: "struct",
    members: {
      M11: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M12: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M21: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M22: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M31: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M32: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Matrix3x2: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateRotation: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateScale: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateSkew: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateTranslation: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      GetDeterminant: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Invert: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Lerp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Negate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Identity: {
        kind: "property",
        type: () => {
          return Numerics.Matrix3x2;
        },
        isStatic: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      IsIdentity: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      Translation: {
        kind: "property",
        type: () => {
          return Numerics.Vector2;
        },
        isReadOnly: true,
      },
    },
  },
  Matrix4x4: {
    kind: "struct",
    members: {
      M11: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M12: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M13: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M14: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M21: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M22: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M23: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M24: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M31: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M32: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M33: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M34: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M41: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M42: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M43: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      M44: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Matrix4x4: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateBillboard: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateConstrainedBillboard: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromAxisAngle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromQuaternion: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromYawPitchRoll: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateLookAt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateLookAtLeftHanded: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateLookTo: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateLookToLeftHanded: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateOrthographic: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateOrthographicLeftHanded: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateOrthographicOffCenter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateOrthographicOffCenterLeftHanded: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreatePerspective: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreatePerspectiveLeftHanded: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreatePerspectiveFieldOfView: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreatePerspectiveFieldOfViewLeftHanded: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreatePerspectiveOffCenter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreatePerspectiveOffCenterLeftHanded: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateReflection: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateRotationX: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateRotationY: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateRotationZ: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateScale: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateShadow: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateTranslation: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateViewport: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateViewportLeftHanded: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateWorld: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Decompose: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      GetDeterminant: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Invert: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Lerp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Negate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Transform: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Transpose: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Identity: {
        kind: "property",
        type: () => {
          return Numerics.Matrix4x4;
        },
        isStatic: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      IsIdentity: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      Translation: {
        kind: "property",
        type: () => {
          return Numerics.Vector3;
        },
        isReadOnly: true,
      },
    },
  },
  Plane: {
    kind: "struct",
    members: {
      Normal: {
        kind: "field",
        type: () => {
          return Numerics.Vector3;
        },
      },
      D: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Plane: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateFromVertices: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DotCoordinate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DotNormal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Normalize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Transform: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  Quaternion: {
    kind: "struct",
    members: {
      X: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Y: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Z: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      W: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Quaternion: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Concatenate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Conjugate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromAxisAngle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromRotationMatrix: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromYawPitchRoll: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Inverse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Length: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      LengthSquared: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Lerp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Negate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Normalize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Slerp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Zero: {
        kind: "property",
        type: () => {
          return Numerics.Quaternion;
        },
        isStatic: true,
      },
      Identity: {
        kind: "property",
        type: () => {
          return Numerics.Quaternion;
        },
        isStatic: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      IsIdentity: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
    },
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
  Vector: {
    kind: "struct",
    members: {
      Vector: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyTo: {
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
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryCopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      AllBitsSet: {
        kind: "property",
        type: () => {
          return Numerics.Vector;
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
          return Numerics.Vector;
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
      Item: {
        kind: "property",
        type: undefined,
      },
      One: {
        kind: "property",
        type: () => {
          return Numerics.Vector;
        },
        isStatic: true,
      },
      Zero: {
        kind: "property",
        type: () => {
          return Numerics.Vector;
        },
        isStatic: true,
      },
    },
  },
  Vector2: {
    kind: "struct",
    members: {
      X: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Y: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Vector2: {
        kind: "method",
        methodKind: "constructor",
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ClampNative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Cos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryCopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      DegreesToRadians: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Distance: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DistanceSquared: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Exp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FusedMultiplyAdd: {
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
      Hypot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Length: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      LengthSquared: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Lerp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitudeNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxNative: {
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
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitudeNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinNative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MultiplyAddEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Negate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Normalize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RadiansToDegrees: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Reflect: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinCos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SquareRoot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Transform: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TransformNormal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      E: {
        kind: "property",
        type: () => {
          return Numerics.Vector2;
        },
        isStatic: true,
      },
      Epsilon: {
        kind: "property",
        type: () => {
          return Numerics.Vector2;
        },
        isStatic: true,
      },
      NaN: {
        kind: "property",
        type: () => {
          return Numerics.Vector2;
        },
        isStatic: true,
      },
      NegativeInfinity: {
        kind: "property",
        type: () => {
          return Numerics.Vector2;
        },
        isStatic: true,
      },
      NegativeZero: {
        kind: "property",
        type: () => {
          return Numerics.Vector2;
        },
        isStatic: true,
      },
      One: {
        kind: "property",
        type: () => {
          return Numerics.Vector2;
        },
        isStatic: true,
      },
      Pi: {
        kind: "property",
        type: () => {
          return Numerics.Vector2;
        },
        isStatic: true,
      },
      PositiveInfinity: {
        kind: "property",
        type: () => {
          return Numerics.Vector2;
        },
        isStatic: true,
      },
      Tau: {
        kind: "property",
        type: () => {
          return Numerics.Vector2;
        },
        isStatic: true,
      },
      UnitX: {
        kind: "property",
        type: () => {
          return Numerics.Vector2;
        },
        isStatic: true,
      },
      UnitY: {
        kind: "property",
        type: () => {
          return Numerics.Vector2;
        },
        isStatic: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      Zero: {
        kind: "property",
        type: () => {
          return Numerics.Vector2;
        },
        isStatic: true,
      },
    },
  },
  Vector3: {
    kind: "struct",
    members: {
      X: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Y: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Z: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Vector3: {
        kind: "method",
        methodKind: "constructor",
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ClampNative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Cos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryCopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Cross: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DegreesToRadians: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Distance: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DistanceSquared: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Exp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FusedMultiplyAdd: {
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
      Length: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      LengthSquared: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Hypot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Lerp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitudeNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxNative: {
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
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitudeNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinNative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MultiplyAddEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Negate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Normalize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RadiansToDegrees: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Reflect: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinCos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SquareRoot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Transform: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TransformNormal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      E: {
        kind: "property",
        type: () => {
          return Numerics.Vector3;
        },
        isStatic: true,
      },
      Epsilon: {
        kind: "property",
        type: () => {
          return Numerics.Vector3;
        },
        isStatic: true,
      },
      NaN: {
        kind: "property",
        type: () => {
          return Numerics.Vector3;
        },
        isStatic: true,
      },
      NegativeInfinity: {
        kind: "property",
        type: () => {
          return Numerics.Vector3;
        },
        isStatic: true,
      },
      NegativeZero: {
        kind: "property",
        type: () => {
          return Numerics.Vector3;
        },
        isStatic: true,
      },
      One: {
        kind: "property",
        type: () => {
          return Numerics.Vector3;
        },
        isStatic: true,
      },
      Pi: {
        kind: "property",
        type: () => {
          return Numerics.Vector3;
        },
        isStatic: true,
      },
      PositiveInfinity: {
        kind: "property",
        type: () => {
          return Numerics.Vector3;
        },
        isStatic: true,
      },
      Tau: {
        kind: "property",
        type: () => {
          return Numerics.Vector3;
        },
        isStatic: true,
      },
      UnitX: {
        kind: "property",
        type: () => {
          return Numerics.Vector3;
        },
        isStatic: true,
      },
      UnitY: {
        kind: "property",
        type: () => {
          return Numerics.Vector3;
        },
        isStatic: true,
      },
      UnitZ: {
        kind: "property",
        type: () => {
          return Numerics.Vector3;
        },
        isStatic: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      Zero: {
        kind: "property",
        type: () => {
          return Numerics.Vector3;
        },
        isStatic: true,
      },
    },
  },
  Vector4: {
    kind: "struct",
    members: {
      X: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Y: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Z: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      W: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Vector4: {
        kind: "method",
        methodKind: "constructor",
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ClampNative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Cos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryCopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      DegreesToRadians: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Distance: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DistanceSquared: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Exp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FusedMultiplyAdd: {
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
      Length: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      LengthSquared: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Hypot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Lerp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitudeNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxNative: {
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
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitudeNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinNative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MultiplyAddEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Negate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Normalize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RadiansToDegrees: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinCos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SquareRoot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Transform: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      E: {
        kind: "property",
        type: () => {
          return Numerics.Vector4;
        },
        isStatic: true,
      },
      Epsilon: {
        kind: "property",
        type: () => {
          return Numerics.Vector4;
        },
        isStatic: true,
      },
      NaN: {
        kind: "property",
        type: () => {
          return Numerics.Vector4;
        },
        isStatic: true,
      },
      NegativeInfinity: {
        kind: "property",
        type: () => {
          return Numerics.Vector4;
        },
        isStatic: true,
      },
      NegativeZero: {
        kind: "property",
        type: () => {
          return Numerics.Vector4;
        },
        isStatic: true,
      },
      One: {
        kind: "property",
        type: () => {
          return Numerics.Vector4;
        },
        isStatic: true,
      },
      Pi: {
        kind: "property",
        type: () => {
          return Numerics.Vector4;
        },
        isStatic: true,
      },
      PositiveInfinity: {
        kind: "property",
        type: () => {
          return Numerics.Vector4;
        },
        isStatic: true,
      },
      Tau: {
        kind: "property",
        type: () => {
          return Numerics.Vector4;
        },
        isStatic: true,
      },
      UnitW: {
        kind: "property",
        type: () => {
          return Numerics.Vector4;
        },
        isStatic: true,
      },
      UnitX: {
        kind: "property",
        type: () => {
          return Numerics.Vector4;
        },
        isStatic: true,
      },
      UnitY: {
        kind: "property",
        type: () => {
          return Numerics.Vector4;
        },
        isStatic: true,
      },
      UnitZ: {
        kind: "property",
        type: () => {
          return Numerics.Vector4;
        },
        isStatic: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      Zero: {
        kind: "property",
        type: () => {
          return Numerics.Vector4;
        },
        isStatic: true,
      },
    },
  },
});
export default Numerics
