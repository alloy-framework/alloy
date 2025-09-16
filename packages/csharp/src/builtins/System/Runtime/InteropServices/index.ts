import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as ComTypes } from "./ComTypes/index.js";
export { default as JavaScript } from "./JavaScript/index.js";
export { default as Marshalling } from "./Marshalling/index.js";
export { default as ObjectiveC } from "./ObjectiveC/index.js";
export { default as Swift } from "./Swift/index.js";

type InteropServicesLibrary = LibrarySymbolReference & {
  AllowReversePInvokeCallsAttribute: LibrarySymbolReference & {
    AllowReversePInvokeCallsAttribute: LibrarySymbolReference
  };
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
  ArrayWithOffset: LibrarySymbolReference & {
    ArrayWithOffset: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetArray: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetOffset: LibrarySymbolReference
  };
  AutomationProxyAttribute: LibrarySymbolReference & {
    AutomationProxyAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  BestFitMappingAttribute: LibrarySymbolReference & {
    ThrowOnUnmappableChar: LibrarySymbolReference;
    BestFitMappingAttribute: LibrarySymbolReference;
    BestFitMapping: LibrarySymbolReference
  };
  CLong: LibrarySymbolReference & {
    CLong: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  COMException: LibrarySymbolReference & {
    COMException: LibrarySymbolReference;
    ToString: LibrarySymbolReference
  };
  CULong: LibrarySymbolReference & {
    CULong: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  CallingConvention: LibrarySymbolReference & {
    Winapi: LibrarySymbolReference;
    Cdecl: LibrarySymbolReference;
    StdCall: LibrarySymbolReference;
    ThisCall: LibrarySymbolReference;
    FastCall: LibrarySymbolReference
  };
  CharSet: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Ansi: LibrarySymbolReference;
    Unicode: LibrarySymbolReference;
    Auto: LibrarySymbolReference
  };
  ClassInterfaceAttribute: LibrarySymbolReference & {
    ClassInterfaceAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  ClassInterfaceType: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    AutoDispatch: LibrarySymbolReference;
    AutoDual: LibrarySymbolReference
  };
  CoClassAttribute: LibrarySymbolReference & {
    CoClassAttribute: LibrarySymbolReference;
    CoClass: LibrarySymbolReference
  };
  CollectionsMarshal: LibrarySymbolReference & {

  };
  ComAliasNameAttribute: LibrarySymbolReference & {
    ComAliasNameAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  ComCompatibleVersionAttribute: LibrarySymbolReference & {
    ComCompatibleVersionAttribute: LibrarySymbolReference;
    BuildNumber: LibrarySymbolReference;
    MajorVersion: LibrarySymbolReference;
    MinorVersion: LibrarySymbolReference;
    RevisionNumber: LibrarySymbolReference
  };
  ComConversionLossAttribute: LibrarySymbolReference & {
    ComConversionLossAttribute: LibrarySymbolReference
  };
  ComDefaultInterfaceAttribute: LibrarySymbolReference & {
    ComDefaultInterfaceAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  ComImportAttribute: LibrarySymbolReference & {
    ComImportAttribute: LibrarySymbolReference
  };
  ComInterfaceType: LibrarySymbolReference & {
    InterfaceIsDual: LibrarySymbolReference;
    InterfaceIsIUnknown: LibrarySymbolReference;
    InterfaceIsIDispatch: LibrarySymbolReference;
    InterfaceIsIInspectable: LibrarySymbolReference
  };
  ComMemberType: LibrarySymbolReference & {
    Method: LibrarySymbolReference;
    PropGet: LibrarySymbolReference;
    PropSet: LibrarySymbolReference
  };
  ComRegisterFunctionAttribute: LibrarySymbolReference & {
    ComRegisterFunctionAttribute: LibrarySymbolReference
  };
  ComUnregisterFunctionAttribute: LibrarySymbolReference & {
    ComUnregisterFunctionAttribute: LibrarySymbolReference
  };
  ComVisibleAttribute: LibrarySymbolReference & {
    ComVisibleAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  ComWrappers: LibrarySymbolReference & {
    ComInterfaceDispatch: LibrarySymbolReference & {
      Vtable: LibrarySymbolReference
    };
    ComInterfaceEntry: LibrarySymbolReference & {
      IID: LibrarySymbolReference;
      Vtable: LibrarySymbolReference
    }
  };
  CreateComInterfaceFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    CallerDefinedIUnknown: LibrarySymbolReference;
    TrackerSupport: LibrarySymbolReference
  };
  CreateObjectFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    TrackerObject: LibrarySymbolReference;
    UniqueInstance: LibrarySymbolReference;
    Aggregation: LibrarySymbolReference;
    Unwrap: LibrarySymbolReference
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
  DefaultCharSetAttribute: LibrarySymbolReference & {
    DefaultCharSetAttribute: LibrarySymbolReference;
    CharSet: LibrarySymbolReference
  };
  DefaultDllImportSearchPathsAttribute: LibrarySymbolReference & {
    DefaultDllImportSearchPathsAttribute: LibrarySymbolReference;
    Paths: LibrarySymbolReference
  };
  DefaultParameterValueAttribute: LibrarySymbolReference & {
    DefaultParameterValueAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  DispIdAttribute: LibrarySymbolReference & {
    DispIdAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  DllImportAttribute: LibrarySymbolReference & {
    BestFitMapping: LibrarySymbolReference;
    CallingConvention: LibrarySymbolReference;
    CharSet: LibrarySymbolReference;
    EntryPoint: LibrarySymbolReference;
    ExactSpelling: LibrarySymbolReference;
    PreserveSig: LibrarySymbolReference;
    SetLastError: LibrarySymbolReference;
    ThrowOnUnmappableChar: LibrarySymbolReference;
    DllImportAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  DllImportResolver: LibrarySymbolReference & {
    DllImportResolver: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  DllImportSearchPath: LibrarySymbolReference & {
    LegacyBehavior: LibrarySymbolReference;
    AssemblyDirectory: LibrarySymbolReference;
    UseDllDirectoryForDependencies: LibrarySymbolReference;
    ApplicationDirectory: LibrarySymbolReference;
    UserDirectories: LibrarySymbolReference;
    System32: LibrarySymbolReference;
    SafeDirectories: LibrarySymbolReference
  };
  DynamicInterfaceCastableImplementationAttribute: LibrarySymbolReference & {
    DynamicInterfaceCastableImplementationAttribute: LibrarySymbolReference
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
  GuidAttribute: LibrarySymbolReference & {
    GuidAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  HandleCollector: LibrarySymbolReference & {
    HandleCollector: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    InitialThreshold: LibrarySymbolReference;
    MaximumThreshold: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  HandleRef: LibrarySymbolReference & {
    HandleRef: LibrarySymbolReference;
    ToIntPtr: LibrarySymbolReference;
    Handle: LibrarySymbolReference;
    Wrapper: LibrarySymbolReference
  };
  ICustomFactory: LibrarySymbolReference & {
    CreateInstance: LibrarySymbolReference
  };
  ICustomMarshaler: LibrarySymbolReference & {
    CleanUpManagedData: LibrarySymbolReference;
    CleanUpNativeData: LibrarySymbolReference;
    GetNativeDataSize: LibrarySymbolReference;
    MarshalManagedToNative: LibrarySymbolReference;
    MarshalNativeToManaged: LibrarySymbolReference
  };
  IDynamicInterfaceCastable: LibrarySymbolReference & {
    IsInterfaceImplemented: LibrarySymbolReference;
    GetInterfaceImplementation: LibrarySymbolReference
  };
  ImmutableCollectionsMarshal: LibrarySymbolReference & {

  };
  ImportedFromTypeLibAttribute: LibrarySymbolReference & {
    ImportedFromTypeLibAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  InAttribute: LibrarySymbolReference & {
    InAttribute: LibrarySymbolReference
  };
  InterfaceTypeAttribute: LibrarySymbolReference & {
    InterfaceTypeAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  InvalidComObjectException: LibrarySymbolReference & {
    InvalidComObjectException: LibrarySymbolReference
  };
  InvalidOleVariantTypeException: LibrarySymbolReference & {
    InvalidOleVariantTypeException: LibrarySymbolReference
  };
  JsonMarshal: LibrarySymbolReference & {
    GetRawUtf8Value: LibrarySymbolReference
  };
  LCIDConversionAttribute: LibrarySymbolReference & {
    LCIDConversionAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  LayoutKind: LibrarySymbolReference & {
    Sequential: LibrarySymbolReference;
    Explicit: LibrarySymbolReference;
    Auto: LibrarySymbolReference
  };
  LibraryImportAttribute: LibrarySymbolReference & {
    LibraryImportAttribute: LibrarySymbolReference;
    LibraryName: LibrarySymbolReference;
    EntryPoint: LibrarySymbolReference;
    SetLastError: LibrarySymbolReference;
    StringMarshalling: LibrarySymbolReference;
    StringMarshallingCustomType: LibrarySymbolReference
  };
  ManagedToNativeComInteropStubAttribute: LibrarySymbolReference & {
    ManagedToNativeComInteropStubAttribute: LibrarySymbolReference;
    ClassType: LibrarySymbolReference;
    MethodName: LibrarySymbolReference
  };
  Marshal: LibrarySymbolReference & {
    SystemDefaultCharSize: LibrarySymbolReference;
    SystemMaxDBCSCharSize: LibrarySymbolReference;
    AddRef: LibrarySymbolReference;
    AllocCoTaskMem: LibrarySymbolReference;
    AllocHGlobal: LibrarySymbolReference;
    AreComObjectsAvailableForCleanup: LibrarySymbolReference;
    BindToMoniker: LibrarySymbolReference;
    ChangeWrapperHandleStrength: LibrarySymbolReference;
    CleanupUnusedObjectsInCurrentContext: LibrarySymbolReference;
    Copy: LibrarySymbolReference;
    FinalReleaseComObject: LibrarySymbolReference;
    FreeBSTR: LibrarySymbolReference;
    FreeCoTaskMem: LibrarySymbolReference;
    FreeHGlobal: LibrarySymbolReference;
    GenerateGuidForType: LibrarySymbolReference;
    GenerateProgIdForType: LibrarySymbolReference;
    GetComObjectData: LibrarySymbolReference;
    GetEndComSlot: LibrarySymbolReference;
    GetExceptionForHR: LibrarySymbolReference;
    GetExceptionPointers: LibrarySymbolReference;
    GetHINSTANCE: LibrarySymbolReference;
    GetHRForException: LibrarySymbolReference;
    GetHRForLastWin32Error: LibrarySymbolReference;
    GetIDispatchForObject: LibrarySymbolReference;
    GetIUnknownForObject: LibrarySymbolReference;
    GetLastPInvokeError: LibrarySymbolReference;
    GetLastSystemError: LibrarySymbolReference;
    GetLastWin32Error: LibrarySymbolReference;
    GetLastPInvokeErrorMessage: LibrarySymbolReference;
    GetPInvokeErrorMessage: LibrarySymbolReference;
    GetObjectForIUnknown: LibrarySymbolReference;
    GetStartComSlot: LibrarySymbolReference;
    GetTypedObjectForIUnknown: LibrarySymbolReference;
    GetTypeFromCLSID: LibrarySymbolReference;
    GetTypeInfoName: LibrarySymbolReference;
    GetUniqueObjectForIUnknown: LibrarySymbolReference;
    InitHandle: LibrarySymbolReference;
    IsComObject: LibrarySymbolReference;
    IsTypeVisibleFromCom: LibrarySymbolReference;
    Prelink: LibrarySymbolReference;
    PrelinkAll: LibrarySymbolReference;
    PtrToStringAnsi: LibrarySymbolReference;
    PtrToStringAuto: LibrarySymbolReference;
    PtrToStringBSTR: LibrarySymbolReference;
    PtrToStringUni: LibrarySymbolReference;
    PtrToStringUTF8: LibrarySymbolReference;
    QueryInterface: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    ReadInt16: LibrarySymbolReference;
    ReadInt32: LibrarySymbolReference;
    ReadInt64: LibrarySymbolReference;
    ReadIntPtr: LibrarySymbolReference;
    ReAllocCoTaskMem: LibrarySymbolReference;
    ReAllocHGlobal: LibrarySymbolReference;
    Release: LibrarySymbolReference;
    ReleaseComObject: LibrarySymbolReference;
    SecureStringToBSTR: LibrarySymbolReference;
    SecureStringToCoTaskMemAnsi: LibrarySymbolReference;
    SecureStringToCoTaskMemUnicode: LibrarySymbolReference;
    SecureStringToGlobalAllocAnsi: LibrarySymbolReference;
    SecureStringToGlobalAllocUnicode: LibrarySymbolReference;
    SetComObjectData: LibrarySymbolReference;
    SetLastPInvokeError: LibrarySymbolReference;
    SetLastSystemError: LibrarySymbolReference;
    StringToBSTR: LibrarySymbolReference;
    StringToCoTaskMemAnsi: LibrarySymbolReference;
    StringToCoTaskMemAuto: LibrarySymbolReference;
    StringToCoTaskMemUni: LibrarySymbolReference;
    StringToCoTaskMemUTF8: LibrarySymbolReference;
    StringToHGlobalAnsi: LibrarySymbolReference;
    StringToHGlobalAuto: LibrarySymbolReference;
    StringToHGlobalUni: LibrarySymbolReference;
    ThrowExceptionForHR: LibrarySymbolReference;
    WriteByte: LibrarySymbolReference;
    WriteInt16: LibrarySymbolReference;
    WriteInt32: LibrarySymbolReference;
    WriteInt64: LibrarySymbolReference;
    WriteIntPtr: LibrarySymbolReference;
    ZeroFreeBSTR: LibrarySymbolReference;
    ZeroFreeCoTaskMemAnsi: LibrarySymbolReference;
    ZeroFreeCoTaskMemUnicode: LibrarySymbolReference;
    ZeroFreeCoTaskMemUTF8: LibrarySymbolReference;
    ZeroFreeGlobalAllocAnsi: LibrarySymbolReference;
    ZeroFreeGlobalAllocUnicode: LibrarySymbolReference
  };
  MarshalAsAttribute: LibrarySymbolReference & {
    ArraySubType: LibrarySymbolReference;
    IidParameterIndex: LibrarySymbolReference;
    MarshalCookie: LibrarySymbolReference;
    MarshalType: LibrarySymbolReference;
    MarshalTypeRef: LibrarySymbolReference;
    SafeArraySubType: LibrarySymbolReference;
    SafeArrayUserDefinedSubType: LibrarySymbolReference;
    SizeConst: LibrarySymbolReference;
    SizeParamIndex: LibrarySymbolReference;
    MarshalAsAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  MarshalDirectiveException: LibrarySymbolReference & {
    MarshalDirectiveException: LibrarySymbolReference
  };
  MemoryMarshal: LibrarySymbolReference & {
    CreateReadOnlySpanFromNullTerminated: LibrarySymbolReference;
    GetArrayDataReference: LibrarySymbolReference;
    TryGetString: LibrarySymbolReference
  };
  NFloat: LibrarySymbolReference & {
    NFloat: LibrarySymbolReference;
    Abs: LibrarySymbolReference;
    Acos: LibrarySymbolReference;
    Acosh: LibrarySymbolReference;
    AcosPi: LibrarySymbolReference;
    Asin: LibrarySymbolReference;
    Asinh: LibrarySymbolReference;
    AsinPi: LibrarySymbolReference;
    Atan: LibrarySymbolReference;
    Atan2: LibrarySymbolReference;
    Atan2Pi: LibrarySymbolReference;
    Atanh: LibrarySymbolReference;
    AtanPi: LibrarySymbolReference;
    BitDecrement: LibrarySymbolReference;
    BitIncrement: LibrarySymbolReference;
    Cbrt: LibrarySymbolReference;
    Ceiling: LibrarySymbolReference;
    Clamp: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    CopySign: LibrarySymbolReference;
    Cos: LibrarySymbolReference;
    Cosh: LibrarySymbolReference;
    CosPi: LibrarySymbolReference;
    DegreesToRadians: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    Exp: LibrarySymbolReference;
    Exp10: LibrarySymbolReference;
    Exp10M1: LibrarySymbolReference;
    Exp2: LibrarySymbolReference;
    Exp2M1: LibrarySymbolReference;
    ExpM1: LibrarySymbolReference;
    Floor: LibrarySymbolReference;
    FusedMultiplyAdd: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Hypot: LibrarySymbolReference;
    Ieee754Remainder: LibrarySymbolReference;
    ILogB: LibrarySymbolReference;
    IsEvenInteger: LibrarySymbolReference;
    IsFinite: LibrarySymbolReference;
    IsInfinity: LibrarySymbolReference;
    IsInteger: LibrarySymbolReference;
    IsNaN: LibrarySymbolReference;
    IsNegative: LibrarySymbolReference;
    IsNegativeInfinity: LibrarySymbolReference;
    IsNormal: LibrarySymbolReference;
    IsOddInteger: LibrarySymbolReference;
    IsPositive: LibrarySymbolReference;
    IsPositiveInfinity: LibrarySymbolReference;
    IsPow2: LibrarySymbolReference;
    IsRealNumber: LibrarySymbolReference;
    IsSubnormal: LibrarySymbolReference;
    Lerp: LibrarySymbolReference;
    Log: LibrarySymbolReference;
    Log10: LibrarySymbolReference;
    Log10P1: LibrarySymbolReference;
    Log2: LibrarySymbolReference;
    Log2P1: LibrarySymbolReference;
    LogP1: LibrarySymbolReference;
    Max: LibrarySymbolReference;
    MaxMagnitude: LibrarySymbolReference;
    MaxMagnitudeNumber: LibrarySymbolReference;
    MaxNumber: LibrarySymbolReference;
    Min: LibrarySymbolReference;
    MinMagnitude: LibrarySymbolReference;
    MinMagnitudeNumber: LibrarySymbolReference;
    MinNumber: LibrarySymbolReference;
    MultiplyAddEstimate: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    Pow: LibrarySymbolReference;
    RadiansToDegrees: LibrarySymbolReference;
    ReciprocalEstimate: LibrarySymbolReference;
    ReciprocalSqrtEstimate: LibrarySymbolReference;
    RootN: LibrarySymbolReference;
    Round: LibrarySymbolReference;
    ScaleB: LibrarySymbolReference;
    Sign: LibrarySymbolReference;
    Sin: LibrarySymbolReference;
    SinCos: LibrarySymbolReference;
    SinCosPi: LibrarySymbolReference;
    Sinh: LibrarySymbolReference;
    SinPi: LibrarySymbolReference;
    Sqrt: LibrarySymbolReference;
    Tan: LibrarySymbolReference;
    Tanh: LibrarySymbolReference;
    TanPi: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Truncate: LibrarySymbolReference;
    TryFormat: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    E: LibrarySymbolReference;
    Epsilon: LibrarySymbolReference;
    MaxValue: LibrarySymbolReference;
    MinValue: LibrarySymbolReference;
    NaN: LibrarySymbolReference;
    NegativeInfinity: LibrarySymbolReference;
    NegativeZero: LibrarySymbolReference;
    Pi: LibrarySymbolReference;
    PositiveInfinity: LibrarySymbolReference;
    Size: LibrarySymbolReference;
    Tau: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  NativeLibrary: LibrarySymbolReference & {
    Free: LibrarySymbolReference;
    GetMainProgramHandle: LibrarySymbolReference;
    GetExport: LibrarySymbolReference;
    Load: LibrarySymbolReference;
    SetDllImportResolver: LibrarySymbolReference;
    TryGetExport: LibrarySymbolReference;
    TryLoad: LibrarySymbolReference
  };
  NativeMemory: LibrarySymbolReference & {
    AlignedAlloc: LibrarySymbolReference;
    AlignedFree: LibrarySymbolReference;
    AlignedRealloc: LibrarySymbolReference;
    Alloc: LibrarySymbolReference;
    AllocZeroed: LibrarySymbolReference;
    Free: LibrarySymbolReference;
    Realloc: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Copy: LibrarySymbolReference;
    Fill: LibrarySymbolReference
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
  OptionalAttribute: LibrarySymbolReference & {
    OptionalAttribute: LibrarySymbolReference
  };
  OutAttribute: LibrarySymbolReference & {
    OutAttribute: LibrarySymbolReference
  };
  PosixSignal: LibrarySymbolReference & {
    SIGTSTP: LibrarySymbolReference;
    SIGTTOU: LibrarySymbolReference;
    SIGTTIN: LibrarySymbolReference;
    SIGWINCH: LibrarySymbolReference;
    SIGCONT: LibrarySymbolReference;
    SIGCHLD: LibrarySymbolReference;
    SIGTERM: LibrarySymbolReference;
    SIGQUIT: LibrarySymbolReference;
    SIGINT: LibrarySymbolReference;
    SIGHUP: LibrarySymbolReference
  };
  PosixSignalContext: LibrarySymbolReference & {
    PosixSignalContext: LibrarySymbolReference;
    Cancel: LibrarySymbolReference;
    Signal: LibrarySymbolReference
  };
  PosixSignalRegistration: LibrarySymbolReference & {
    Create: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference
  };
  PreserveSigAttribute: LibrarySymbolReference & {
    PreserveSigAttribute: LibrarySymbolReference
  };
  PrimaryInteropAssemblyAttribute: LibrarySymbolReference & {
    PrimaryInteropAssemblyAttribute: LibrarySymbolReference;
    MajorVersion: LibrarySymbolReference;
    MinorVersion: LibrarySymbolReference
  };
  ProgIdAttribute: LibrarySymbolReference & {
    ProgIdAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  RuntimeEnvironment: LibrarySymbolReference & {
    FromGlobalAccessCache: LibrarySymbolReference;
    GetRuntimeDirectory: LibrarySymbolReference;
    GetRuntimeInterfaceAsIntPtr: LibrarySymbolReference;
    GetRuntimeInterfaceAsObject: LibrarySymbolReference;
    GetSystemVersion: LibrarySymbolReference;
    SystemConfigurationFile: LibrarySymbolReference
  };
  RuntimeInformation: LibrarySymbolReference & {
    IsOSPlatform: LibrarySymbolReference;
    FrameworkDescription: LibrarySymbolReference;
    OSArchitecture: LibrarySymbolReference;
    OSDescription: LibrarySymbolReference;
    ProcessArchitecture: LibrarySymbolReference;
    RuntimeIdentifier: LibrarySymbolReference
  };
  SEHException: LibrarySymbolReference & {
    SEHException: LibrarySymbolReference;
    CanResume: LibrarySymbolReference
  };
  SafeArrayRankMismatchException: LibrarySymbolReference & {
    SafeArrayRankMismatchException: LibrarySymbolReference
  };
  SafeArrayTypeMismatchException: LibrarySymbolReference & {
    SafeArrayTypeMismatchException: LibrarySymbolReference
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
  SequenceMarshal: LibrarySymbolReference & {

  };
  StandardOleMarshalObject: LibrarySymbolReference & {
    StandardOleMarshalObject: LibrarySymbolReference
  };
  StringMarshalling: LibrarySymbolReference & {
    Custom: LibrarySymbolReference;
    Utf8: LibrarySymbolReference;
    Utf16: LibrarySymbolReference
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
  TypeIdentifierAttribute: LibrarySymbolReference & {
    TypeIdentifierAttribute: LibrarySymbolReference;
    Identifier: LibrarySymbolReference;
    Scope: LibrarySymbolReference
  };
  TypeLibFuncAttribute: LibrarySymbolReference & {
    TypeLibFuncAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  TypeLibFuncFlags: LibrarySymbolReference & {
    FRestricted: LibrarySymbolReference;
    FSource: LibrarySymbolReference;
    FBindable: LibrarySymbolReference;
    FRequestEdit: LibrarySymbolReference;
    FDisplayBind: LibrarySymbolReference;
    FDefaultBind: LibrarySymbolReference;
    FHidden: LibrarySymbolReference;
    FUsesGetLastError: LibrarySymbolReference;
    FDefaultCollelem: LibrarySymbolReference;
    FUiDefault: LibrarySymbolReference;
    FNonBrowsable: LibrarySymbolReference;
    FReplaceable: LibrarySymbolReference;
    FImmediateBind: LibrarySymbolReference
  };
  TypeLibImportClassAttribute: LibrarySymbolReference & {
    TypeLibImportClassAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  TypeLibTypeAttribute: LibrarySymbolReference & {
    TypeLibTypeAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  TypeLibTypeFlags: LibrarySymbolReference & {
    FAppObject: LibrarySymbolReference;
    FCanCreate: LibrarySymbolReference;
    FLicensed: LibrarySymbolReference;
    FPreDeclId: LibrarySymbolReference;
    FHidden: LibrarySymbolReference;
    FControl: LibrarySymbolReference;
    FDual: LibrarySymbolReference;
    FNonExtensible: LibrarySymbolReference;
    FOleAutomation: LibrarySymbolReference;
    FRestricted: LibrarySymbolReference;
    FAggregatable: LibrarySymbolReference;
    FReplaceable: LibrarySymbolReference;
    FDispatchable: LibrarySymbolReference;
    FReverseBind: LibrarySymbolReference
  };
  TypeLibVarAttribute: LibrarySymbolReference & {
    TypeLibVarAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  TypeLibVarFlags: LibrarySymbolReference & {
    FReadOnly: LibrarySymbolReference;
    FSource: LibrarySymbolReference;
    FBindable: LibrarySymbolReference;
    FRequestEdit: LibrarySymbolReference;
    FDisplayBind: LibrarySymbolReference;
    FDefaultBind: LibrarySymbolReference;
    FHidden: LibrarySymbolReference;
    FRestricted: LibrarySymbolReference;
    FDefaultCollelem: LibrarySymbolReference;
    FUiDefault: LibrarySymbolReference;
    FNonBrowsable: LibrarySymbolReference;
    FReplaceable: LibrarySymbolReference;
    FImmediateBind: LibrarySymbolReference
  };
  TypeLibVersionAttribute: LibrarySymbolReference & {
    TypeLibVersionAttribute: LibrarySymbolReference;
    MajorVersion: LibrarySymbolReference;
    MinorVersion: LibrarySymbolReference
  };
  UnmanagedCallConvAttribute: LibrarySymbolReference & {
    CallConvs: LibrarySymbolReference;
    UnmanagedCallConvAttribute: LibrarySymbolReference
  };
  UnmanagedCallersOnlyAttribute: LibrarySymbolReference & {
    CallConvs: LibrarySymbolReference;
    EntryPoint: LibrarySymbolReference;
    UnmanagedCallersOnlyAttribute: LibrarySymbolReference
  };
  UnmanagedFunctionPointerAttribute: LibrarySymbolReference & {
    BestFitMapping: LibrarySymbolReference;
    CharSet: LibrarySymbolReference;
    SetLastError: LibrarySymbolReference;
    ThrowOnUnmappableChar: LibrarySymbolReference;
    UnmanagedFunctionPointerAttribute: LibrarySymbolReference;
    CallingConvention: LibrarySymbolReference
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
  };
  WasmImportLinkageAttribute: LibrarySymbolReference & {
    WasmImportLinkageAttribute: LibrarySymbolReference
  }
};
const InteropServices: InteropServicesLibrary = createLibrary("System.Runtime.InteropServices", {
  AllowReversePInvokeCallsAttribute: {
    kind: "class",
    members: {
      AllowReversePInvokeCallsAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
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
  ArrayWithOffset: {
    kind: "struct",
    members: {
      ArrayWithOffset: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetOffset: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  AutomationProxyAttribute: {
    kind: "class",
    members: {
      AutomationProxyAttribute: {
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
  BestFitMappingAttribute: {
    kind: "class",
    members: {
      ThrowOnUnmappableChar: {
        kind: "field",
        type: () => {
          return System.Boolean;
        },
      },
      BestFitMappingAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      BestFitMapping: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  CLong: {
    kind: "struct",
    members: {
      CLong: {
        kind: "method",
        methodKind: "constructor",
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
      Value: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
    },
  },
  COMException: {
    kind: "class",
    members: {
      COMException: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  CULong: {
    kind: "struct",
    members: {
      CULong: {
        kind: "method",
        methodKind: "constructor",
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
      Value: {
        kind: "property",
        type: () => {
          return System.UIntPtr;
        },
      },
    },
  },
  CallingConvention: {
    kind: "enum",
    members: {
      Winapi: {
        kind: "field",
        type: () => {
          return InteropServices.CallingConvention;
        },
      },
      Cdecl: {
        kind: "field",
        type: () => {
          return InteropServices.CallingConvention;
        },
      },
      StdCall: {
        kind: "field",
        type: () => {
          return InteropServices.CallingConvention;
        },
      },
      ThisCall: {
        kind: "field",
        type: () => {
          return InteropServices.CallingConvention;
        },
      },
      FastCall: {
        kind: "field",
        type: () => {
          return InteropServices.CallingConvention;
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
  ClassInterfaceAttribute: {
    kind: "class",
    members: {
      ClassInterfaceAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return InteropServices.ClassInterfaceType;
        },
      },
    },
    isSealed: true,
  },
  ClassInterfaceType: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return InteropServices.ClassInterfaceType;
        },
      },
      AutoDispatch: {
        kind: "field",
        type: () => {
          return InteropServices.ClassInterfaceType;
        },
      },
      AutoDual: {
        kind: "field",
        type: () => {
          return InteropServices.ClassInterfaceType;
        },
      },
    },
  },
  CoClassAttribute: {
    kind: "class",
    members: {
      CoClassAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      CoClass: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  CollectionsMarshal: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  ComAliasNameAttribute: {
    kind: "class",
    members: {
      ComAliasNameAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  ComCompatibleVersionAttribute: {
    kind: "class",
    members: {
      ComCompatibleVersionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      BuildNumber: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MajorVersion: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MinorVersion: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      RevisionNumber: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  ComConversionLossAttribute: {
    kind: "class",
    members: {
      ComConversionLossAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ComDefaultInterfaceAttribute: {
    kind: "class",
    members: {
      ComDefaultInterfaceAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  ComImportAttribute: {
    kind: "class",
    members: {
      ComImportAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ComInterfaceType: {
    kind: "enum",
    members: {
      InterfaceIsDual: {
        kind: "field",
        type: () => {
          return InteropServices.ComInterfaceType;
        },
      },
      InterfaceIsIUnknown: {
        kind: "field",
        type: () => {
          return InteropServices.ComInterfaceType;
        },
      },
      InterfaceIsIDispatch: {
        kind: "field",
        type: () => {
          return InteropServices.ComInterfaceType;
        },
      },
      InterfaceIsIInspectable: {
        kind: "field",
        type: () => {
          return InteropServices.ComInterfaceType;
        },
      },
    },
  },
  ComMemberType: {
    kind: "enum",
    members: {
      Method: {
        kind: "field",
        type: () => {
          return InteropServices.ComMemberType;
        },
      },
      PropGet: {
        kind: "field",
        type: () => {
          return InteropServices.ComMemberType;
        },
      },
      PropSet: {
        kind: "field",
        type: () => {
          return InteropServices.ComMemberType;
        },
      },
    },
  },
  ComRegisterFunctionAttribute: {
    kind: "class",
    members: {
      ComRegisterFunctionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ComUnregisterFunctionAttribute: {
    kind: "class",
    members: {
      ComUnregisterFunctionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
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
  ComWrappers: {
    kind: "class",
    members: {
      ComInterfaceDispatch: {
        kind: "struct",
        members: {
          Vtable: {
            kind: "field",
            type: () => {
              return System.IntPtr;
            },
          },
        },
      },
      ComInterfaceEntry: {
        kind: "struct",
        members: {
          IID: {
            kind: "field",
            type: () => {
              return System.Guid;
            },
          },
          Vtable: {
            kind: "field",
            type: () => {
              return System.IntPtr;
            },
          },
        },
      },
    },
  },
  CreateComInterfaceFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return InteropServices.CreateComInterfaceFlags;
        },
      },
      CallerDefinedIUnknown: {
        kind: "field",
        type: () => {
          return InteropServices.CreateComInterfaceFlags;
        },
      },
      TrackerSupport: {
        kind: "field",
        type: () => {
          return InteropServices.CreateComInterfaceFlags;
        },
      },
    },
  },
  CreateObjectFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return InteropServices.CreateObjectFlags;
        },
      },
      TrackerObject: {
        kind: "field",
        type: () => {
          return InteropServices.CreateObjectFlags;
        },
      },
      UniqueInstance: {
        kind: "field",
        type: () => {
          return InteropServices.CreateObjectFlags;
        },
      },
      Aggregation: {
        kind: "field",
        type: () => {
          return InteropServices.CreateObjectFlags;
        },
      },
      Unwrap: {
        kind: "field",
        type: () => {
          return InteropServices.CreateObjectFlags;
        },
      },
    },
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
  DefaultCharSetAttribute: {
    kind: "class",
    members: {
      DefaultCharSetAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      CharSet: {
        kind: "property",
        type: () => {
          return InteropServices.CharSet;
        },
      },
    },
    isSealed: true,
  },
  DefaultDllImportSearchPathsAttribute: {
    kind: "class",
    members: {
      DefaultDllImportSearchPathsAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Paths: {
        kind: "property",
        type: () => {
          return InteropServices.DllImportSearchPath;
        },
      },
    },
    isSealed: true,
  },
  DefaultParameterValueAttribute: {
    kind: "class",
    members: {
      DefaultParameterValueAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  DispIdAttribute: {
    kind: "class",
    members: {
      DispIdAttribute: {
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
  DllImportAttribute: {
    kind: "class",
    members: {
      BestFitMapping: {
        kind: "field",
        type: () => {
          return System.Boolean;
        },
      },
      CallingConvention: {
        kind: "field",
        type: () => {
          return InteropServices.CallingConvention;
        },
      },
      CharSet: {
        kind: "field",
        type: () => {
          return InteropServices.CharSet;
        },
      },
      EntryPoint: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ExactSpelling: {
        kind: "field",
        type: () => {
          return System.Boolean;
        },
      },
      PreserveSig: {
        kind: "field",
        type: () => {
          return System.Boolean;
        },
      },
      SetLastError: {
        kind: "field",
        type: () => {
          return System.Boolean;
        },
      },
      ThrowOnUnmappableChar: {
        kind: "field",
        type: () => {
          return System.Boolean;
        },
      },
      DllImportAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  DllImportResolver: {
    kind: "generic",
    members: {
      DllImportResolver: {
        kind: "method",
        methodKind: "constructor",
      },
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BeginInvoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EndInvoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  DllImportSearchPath: {
    kind: "enum",
    members: {
      LegacyBehavior: {
        kind: "field",
        type: () => {
          return InteropServices.DllImportSearchPath;
        },
      },
      AssemblyDirectory: {
        kind: "field",
        type: () => {
          return InteropServices.DllImportSearchPath;
        },
      },
      UseDllDirectoryForDependencies: {
        kind: "field",
        type: () => {
          return InteropServices.DllImportSearchPath;
        },
      },
      ApplicationDirectory: {
        kind: "field",
        type: () => {
          return InteropServices.DllImportSearchPath;
        },
      },
      UserDirectories: {
        kind: "field",
        type: () => {
          return InteropServices.DllImportSearchPath;
        },
      },
      System32: {
        kind: "field",
        type: () => {
          return InteropServices.DllImportSearchPath;
        },
      },
      SafeDirectories: {
        kind: "field",
        type: () => {
          return InteropServices.DllImportSearchPath;
        },
      },
    },
  },
  DynamicInterfaceCastableImplementationAttribute: {
    kind: "class",
    members: {
      DynamicInterfaceCastableImplementationAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
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
  GuidAttribute: {
    kind: "class",
    members: {
      GuidAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  HandleCollector: {
    kind: "class",
    members: {
      HandleCollector: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      InitialThreshold: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaximumThreshold: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  HandleRef: {
    kind: "struct",
    members: {
      HandleRef: {
        kind: "method",
        methodKind: "constructor",
      },
      ToIntPtr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Handle: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      Wrapper: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  ICustomFactory: {
    kind: "interface",
    members: {
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ICustomMarshaler: {
    kind: "interface",
    members: {
      CleanUpManagedData: {
        kind: "method",
        methodKind: "ordinary",
      },
      CleanUpNativeData: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNativeDataSize: {
        kind: "method",
        methodKind: "ordinary",
      },
      MarshalManagedToNative: {
        kind: "method",
        methodKind: "ordinary",
      },
      MarshalNativeToManaged: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IDynamicInterfaceCastable: {
    kind: "interface",
    members: {
      IsInterfaceImplemented: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInterfaceImplementation: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ImmutableCollectionsMarshal: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  ImportedFromTypeLibAttribute: {
    kind: "class",
    members: {
      ImportedFromTypeLibAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
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
  InterfaceTypeAttribute: {
    kind: "class",
    members: {
      InterfaceTypeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return InteropServices.ComInterfaceType;
        },
      },
    },
    isSealed: true,
  },
  InvalidComObjectException: {
    kind: "class",
    members: {
      InvalidComObjectException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  InvalidOleVariantTypeException: {
    kind: "class",
    members: {
      InvalidOleVariantTypeException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  JsonMarshal: {
    kind: "class",
    members: {
      GetRawUtf8Value: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  LCIDConversionAttribute: {
    kind: "class",
    members: {
      LCIDConversionAttribute: {
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
  LibraryImportAttribute: {
    kind: "class",
    members: {
      LibraryImportAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      LibraryName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      EntryPoint: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SetLastError: {
        kind: "property",
        type: () => {
          return System.Boolean;
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
    isSealed: true,
  },
  ManagedToNativeComInteropStubAttribute: {
    kind: "class",
    members: {
      ManagedToNativeComInteropStubAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ClassType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      MethodName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  Marshal: {
    kind: "class",
    members: {
      SystemDefaultCharSize: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SystemMaxDBCSCharSize: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      AddRef: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AllocCoTaskMem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AllocHGlobal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AreComObjectsAvailableForCleanup: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BindToMoniker: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ChangeWrapperHandleStrength: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CleanupUnusedObjectsInCurrentContext: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Copy: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FinalReleaseComObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FreeBSTR: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FreeCoTaskMem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FreeHGlobal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GenerateGuidForType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GenerateProgIdForType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetComObjectData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetEndComSlot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetExceptionForHR: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetExceptionPointers: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHINSTANCE: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHRForException: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHRForLastWin32Error: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetIDispatchForObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetIUnknownForObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLastPInvokeError: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLastSystemError: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLastWin32Error: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLastPInvokeErrorMessage: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetPInvokeErrorMessage: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetObjectForIUnknown: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetStartComSlot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypedObjectForIUnknown: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypeFromCLSID: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypeInfoName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetUniqueObjectForIUnknown: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      InitHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsComObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsTypeVisibleFromCom: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Prelink: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PrelinkAll: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PtrToStringAnsi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PtrToStringAuto: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PtrToStringBSTR: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PtrToStringUni: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PtrToStringUTF8: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      QueryInterface: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadByte: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadInt16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadInt32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadInt64: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadIntPtr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReAllocCoTaskMem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReAllocHGlobal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Release: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReleaseComObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SecureStringToBSTR: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SecureStringToCoTaskMemAnsi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SecureStringToCoTaskMemUnicode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SecureStringToGlobalAllocAnsi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SecureStringToGlobalAllocUnicode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetComObjectData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetLastPInvokeError: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetLastSystemError: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StringToBSTR: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StringToCoTaskMemAnsi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StringToCoTaskMemAuto: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StringToCoTaskMemUni: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StringToCoTaskMemUTF8: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StringToHGlobalAnsi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StringToHGlobalAuto: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StringToHGlobalUni: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ThrowExceptionForHR: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteByte: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteInt16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteInt32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteInt64: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteIntPtr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ZeroFreeBSTR: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ZeroFreeCoTaskMemAnsi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ZeroFreeCoTaskMemUnicode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ZeroFreeCoTaskMemUTF8: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ZeroFreeGlobalAllocAnsi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ZeroFreeGlobalAllocUnicode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  MarshalAsAttribute: {
    kind: "class",
    members: {
      ArraySubType: {
        kind: "field",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
      IidParameterIndex: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      MarshalCookie: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      MarshalType: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      MarshalTypeRef: {
        kind: "field",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      SafeArraySubType: {
        kind: "field",
        type: undefined,
      },
      SafeArrayUserDefinedSubType: {
        kind: "field",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      SizeConst: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      SizeParamIndex: {
        kind: "field",
        type: () => {
          return System.Int16;
        },
      },
      MarshalAsAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return InteropServices.UnmanagedType;
        },
      },
    },
    isSealed: true,
  },
  MarshalDirectiveException: {
    kind: "class",
    members: {
      MarshalDirectiveException: {
        kind: "method",
        methodKind: "constructor",
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
  NFloat: {
    kind: "struct",
    members: {
      NFloat: {
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
      Acosh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AcosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Asin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Asinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AsinPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan2Pi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atanh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AtanPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitDecrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitIncrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cbrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ceiling: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
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
      CosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DegreesToRadians: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Exp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp10: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Hypot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ieee754Remainder: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ILogB: {
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
      IsPow2: {
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
      Log10: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      MinNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      Pow: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RadiansToDegrees: {
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
      RootN: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ScaleB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
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
      SinCosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sqrt: {
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
      TanPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Truncate: {
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
      E: {
        kind: "property",
        type: () => {
          return InteropServices.NFloat;
        },
        isStatic: true,
      },
      Epsilon: {
        kind: "property",
        type: () => {
          return InteropServices.NFloat;
        },
        isStatic: true,
      },
      MaxValue: {
        kind: "property",
        type: () => {
          return InteropServices.NFloat;
        },
        isStatic: true,
      },
      MinValue: {
        kind: "property",
        type: () => {
          return InteropServices.NFloat;
        },
        isStatic: true,
      },
      NaN: {
        kind: "property",
        type: () => {
          return InteropServices.NFloat;
        },
        isStatic: true,
      },
      NegativeInfinity: {
        kind: "property",
        type: () => {
          return InteropServices.NFloat;
        },
        isStatic: true,
      },
      NegativeZero: {
        kind: "property",
        type: () => {
          return InteropServices.NFloat;
        },
        isStatic: true,
      },
      Pi: {
        kind: "property",
        type: () => {
          return InteropServices.NFloat;
        },
        isStatic: true,
      },
      PositiveInfinity: {
        kind: "property",
        type: () => {
          return InteropServices.NFloat;
        },
        isStatic: true,
      },
      Size: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      Tau: {
        kind: "property",
        type: () => {
          return InteropServices.NFloat;
        },
        isStatic: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
    },
  },
  NativeLibrary: {
    kind: "class",
    members: {
      Free: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetMainProgramHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetExport: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Load: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetDllImportResolver: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryGetExport: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryLoad: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  NativeMemory: {
    kind: "class",
    members: {
      AlignedAlloc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AlignedFree: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AlignedRealloc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Alloc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AllocZeroed: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Free: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Realloc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Copy: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Fill: {
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
  OptionalAttribute: {
    kind: "class",
    members: {
      OptionalAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
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
  PosixSignal: {
    kind: "enum",
    members: {
      SIGTSTP: {
        kind: "field",
        type: () => {
          return InteropServices.PosixSignal;
        },
      },
      SIGTTOU: {
        kind: "field",
        type: () => {
          return InteropServices.PosixSignal;
        },
      },
      SIGTTIN: {
        kind: "field",
        type: () => {
          return InteropServices.PosixSignal;
        },
      },
      SIGWINCH: {
        kind: "field",
        type: () => {
          return InteropServices.PosixSignal;
        },
      },
      SIGCONT: {
        kind: "field",
        type: () => {
          return InteropServices.PosixSignal;
        },
      },
      SIGCHLD: {
        kind: "field",
        type: () => {
          return InteropServices.PosixSignal;
        },
      },
      SIGTERM: {
        kind: "field",
        type: () => {
          return InteropServices.PosixSignal;
        },
      },
      SIGQUIT: {
        kind: "field",
        type: () => {
          return InteropServices.PosixSignal;
        },
      },
      SIGINT: {
        kind: "field",
        type: () => {
          return InteropServices.PosixSignal;
        },
      },
      SIGHUP: {
        kind: "field",
        type: () => {
          return InteropServices.PosixSignal;
        },
      },
    },
  },
  PosixSignalContext: {
    kind: "class",
    members: {
      PosixSignalContext: {
        kind: "method",
        methodKind: "constructor",
      },
      Cancel: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Signal: {
        kind: "property",
        type: () => {
          return InteropServices.PosixSignal;
        },
      },
    },
    isSealed: true,
  },
  PosixSignalRegistration: {
    kind: "class",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dispose: {
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
  PreserveSigAttribute: {
    kind: "class",
    members: {
      PreserveSigAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  PrimaryInteropAssemblyAttribute: {
    kind: "class",
    members: {
      PrimaryInteropAssemblyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      MajorVersion: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MinorVersion: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  ProgIdAttribute: {
    kind: "class",
    members: {
      ProgIdAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  RuntimeEnvironment: {
    kind: "class",
    members: {
      FromGlobalAccessCache: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRuntimeDirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRuntimeInterfaceAsIntPtr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRuntimeInterfaceAsObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetSystemVersion: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SystemConfigurationFile: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
    },
    isStatic: true,
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
  SEHException: {
    kind: "class",
    members: {
      SEHException: {
        kind: "method",
        methodKind: "constructor",
      },
      CanResume: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  SafeArrayRankMismatchException: {
    kind: "class",
    members: {
      SafeArrayRankMismatchException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  SafeArrayTypeMismatchException: {
    kind: "class",
    members: {
      SafeArrayTypeMismatchException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
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
  SequenceMarshal: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  StandardOleMarshalObject: {
    kind: "class",
    members: {
      StandardOleMarshalObject: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  StringMarshalling: {
    kind: "enum",
    members: {
      Custom: {
        kind: "field",
        type: () => {
          return InteropServices.StringMarshalling;
        },
      },
      Utf8: {
        kind: "field",
        type: () => {
          return InteropServices.StringMarshalling;
        },
      },
      Utf16: {
        kind: "field",
        type: () => {
          return InteropServices.StringMarshalling;
        },
      },
    },
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
  TypeIdentifierAttribute: {
    kind: "class",
    members: {
      TypeIdentifierAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Identifier: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Scope: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  TypeLibFuncAttribute: {
    kind: "class",
    members: {
      TypeLibFuncAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return InteropServices.TypeLibFuncFlags;
        },
      },
    },
    isSealed: true,
  },
  TypeLibFuncFlags: {
    kind: "enum",
    members: {
      FRestricted: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibFuncFlags;
        },
      },
      FSource: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibFuncFlags;
        },
      },
      FBindable: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibFuncFlags;
        },
      },
      FRequestEdit: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibFuncFlags;
        },
      },
      FDisplayBind: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibFuncFlags;
        },
      },
      FDefaultBind: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibFuncFlags;
        },
      },
      FHidden: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibFuncFlags;
        },
      },
      FUsesGetLastError: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibFuncFlags;
        },
      },
      FDefaultCollelem: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibFuncFlags;
        },
      },
      FUiDefault: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibFuncFlags;
        },
      },
      FNonBrowsable: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibFuncFlags;
        },
      },
      FReplaceable: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibFuncFlags;
        },
      },
      FImmediateBind: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibFuncFlags;
        },
      },
    },
  },
  TypeLibImportClassAttribute: {
    kind: "class",
    members: {
      TypeLibImportClassAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  TypeLibTypeAttribute: {
    kind: "class",
    members: {
      TypeLibTypeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
    },
    isSealed: true,
  },
  TypeLibTypeFlags: {
    kind: "enum",
    members: {
      FAppObject: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
      FCanCreate: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
      FLicensed: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
      FPreDeclId: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
      FHidden: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
      FControl: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
      FDual: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
      FNonExtensible: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
      FOleAutomation: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
      FRestricted: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
      FAggregatable: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
      FReplaceable: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
      FDispatchable: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
      FReverseBind: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibTypeFlags;
        },
      },
    },
  },
  TypeLibVarAttribute: {
    kind: "class",
    members: {
      TypeLibVarAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return InteropServices.TypeLibVarFlags;
        },
      },
    },
    isSealed: true,
  },
  TypeLibVarFlags: {
    kind: "enum",
    members: {
      FReadOnly: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibVarFlags;
        },
      },
      FSource: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibVarFlags;
        },
      },
      FBindable: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibVarFlags;
        },
      },
      FRequestEdit: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibVarFlags;
        },
      },
      FDisplayBind: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibVarFlags;
        },
      },
      FDefaultBind: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibVarFlags;
        },
      },
      FHidden: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibVarFlags;
        },
      },
      FRestricted: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibVarFlags;
        },
      },
      FDefaultCollelem: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibVarFlags;
        },
      },
      FUiDefault: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibVarFlags;
        },
      },
      FNonBrowsable: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibVarFlags;
        },
      },
      FReplaceable: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibVarFlags;
        },
      },
      FImmediateBind: {
        kind: "field",
        type: () => {
          return InteropServices.TypeLibVarFlags;
        },
      },
    },
  },
  TypeLibVersionAttribute: {
    kind: "class",
    members: {
      TypeLibVersionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      MajorVersion: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MinorVersion: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  UnmanagedCallConvAttribute: {
    kind: "class",
    members: {
      CallConvs: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      UnmanagedCallConvAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  UnmanagedCallersOnlyAttribute: {
    kind: "class",
    members: {
      CallConvs: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      EntryPoint: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      UnmanagedCallersOnlyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  UnmanagedFunctionPointerAttribute: {
    kind: "class",
    members: {
      BestFitMapping: {
        kind: "field",
        type: () => {
          return System.Boolean;
        },
      },
      CharSet: {
        kind: "field",
        type: () => {
          return InteropServices.CharSet;
        },
      },
      SetLastError: {
        kind: "field",
        type: () => {
          return System.Boolean;
        },
      },
      ThrowOnUnmappableChar: {
        kind: "field",
        type: () => {
          return System.Boolean;
        },
      },
      UnmanagedFunctionPointerAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      CallingConvention: {
        kind: "property",
        type: () => {
          return InteropServices.CallingConvention;
        },
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
  WasmImportLinkageAttribute: {
    kind: "class",
    members: {
      WasmImportLinkageAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
});
export default InteropServices
