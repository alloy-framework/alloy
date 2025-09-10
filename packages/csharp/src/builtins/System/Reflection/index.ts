import Generic from "../Collections/Generic/index.js";
import Assemblies from "../Configuration/Assemblies/index.js";
import Globalization from "../Globalization/index.js";
import System from "../index.js";
import Security from "../Security/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ReflectionLibrary = LibrarySymbolReference & {
  AmbiguousMatchException: LibrarySymbolReference & {
    AmbiguousMatchException: LibrarySymbolReference
  };
  Assembly: LibrarySymbolReference & {
    Assembly: LibrarySymbolReference;
    CreateInstance: LibrarySymbolReference;
    CreateQualifiedName: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetAssembly: LibrarySymbolReference;
    GetCallingAssembly: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetCustomAttributesData: LibrarySymbolReference;
    GetEntryAssembly: LibrarySymbolReference;
    GetExecutingAssembly: LibrarySymbolReference;
    GetExportedTypes: LibrarySymbolReference;
    GetFile: LibrarySymbolReference;
    GetFiles: LibrarySymbolReference;
    GetForwardedTypes: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetLoadedModules: LibrarySymbolReference;
    GetManifestResourceInfo: LibrarySymbolReference;
    GetManifestResourceNames: LibrarySymbolReference;
    GetManifestResourceStream: LibrarySymbolReference;
    GetModule: LibrarySymbolReference;
    GetModules: LibrarySymbolReference;
    GetName: LibrarySymbolReference;
    GetReferencedAssemblies: LibrarySymbolReference;
    GetSatelliteAssembly: LibrarySymbolReference;
    GetType: LibrarySymbolReference;
    GetTypes: LibrarySymbolReference;
    IsDefined: LibrarySymbolReference;
    Load: LibrarySymbolReference;
    LoadFile: LibrarySymbolReference;
    LoadFrom: LibrarySymbolReference;
    LoadModule: LibrarySymbolReference;
    LoadWithPartialName: LibrarySymbolReference;
    ReflectionOnlyLoad: LibrarySymbolReference;
    ReflectionOnlyLoadFrom: LibrarySymbolReference;
    SetEntryAssembly: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    UnsafeLoadFrom: LibrarySymbolReference;
    CodeBase: LibrarySymbolReference;
    CustomAttributes: LibrarySymbolReference;
    DefinedTypes: LibrarySymbolReference;
    EntryPoint: LibrarySymbolReference;
    EscapedCodeBase: LibrarySymbolReference;
    ExportedTypes: LibrarySymbolReference;
    FullName: LibrarySymbolReference;
    GlobalAssemblyCache: LibrarySymbolReference;
    HostContext: LibrarySymbolReference;
    ImageRuntimeVersion: LibrarySymbolReference;
    IsCollectible: LibrarySymbolReference;
    IsDynamic: LibrarySymbolReference;
    IsFullyTrusted: LibrarySymbolReference;
    Location: LibrarySymbolReference;
    ManifestModule: LibrarySymbolReference;
    Modules: LibrarySymbolReference;
    ReflectionOnly: LibrarySymbolReference;
    SecurityRuleSet: LibrarySymbolReference
  };
  AssemblyAlgorithmIdAttribute: LibrarySymbolReference & {
    AssemblyAlgorithmIdAttribute: LibrarySymbolReference;
    AlgorithmId: LibrarySymbolReference
  };
  AssemblyCompanyAttribute: LibrarySymbolReference & {
    AssemblyCompanyAttribute: LibrarySymbolReference;
    Company: LibrarySymbolReference
  };
  AssemblyConfigurationAttribute: LibrarySymbolReference & {
    AssemblyConfigurationAttribute: LibrarySymbolReference;
    Configuration: LibrarySymbolReference
  };
  AssemblyContentType: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    WindowsRuntime: LibrarySymbolReference
  };
  AssemblyCopyrightAttribute: LibrarySymbolReference & {
    AssemblyCopyrightAttribute: LibrarySymbolReference;
    Copyright: LibrarySymbolReference
  };
  AssemblyCultureAttribute: LibrarySymbolReference & {
    AssemblyCultureAttribute: LibrarySymbolReference;
    Culture: LibrarySymbolReference
  };
  AssemblyDefaultAliasAttribute: LibrarySymbolReference & {
    AssemblyDefaultAliasAttribute: LibrarySymbolReference;
    DefaultAlias: LibrarySymbolReference
  };
  AssemblyDelaySignAttribute: LibrarySymbolReference & {
    AssemblyDelaySignAttribute: LibrarySymbolReference;
    DelaySign: LibrarySymbolReference
  };
  AssemblyDescriptionAttribute: LibrarySymbolReference & {
    AssemblyDescriptionAttribute: LibrarySymbolReference;
    Description: LibrarySymbolReference
  };
  AssemblyFileVersionAttribute: LibrarySymbolReference & {
    AssemblyFileVersionAttribute: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  AssemblyFlagsAttribute: LibrarySymbolReference & {
    AssemblyFlagsAttribute: LibrarySymbolReference;
    AssemblyFlags: LibrarySymbolReference;
    Flags: LibrarySymbolReference
  };
  AssemblyInformationalVersionAttribute: LibrarySymbolReference & {
    AssemblyInformationalVersionAttribute: LibrarySymbolReference;
    InformationalVersion: LibrarySymbolReference
  };
  AssemblyKeyFileAttribute: LibrarySymbolReference & {
    AssemblyKeyFileAttribute: LibrarySymbolReference;
    KeyFile: LibrarySymbolReference
  };
  AssemblyKeyNameAttribute: LibrarySymbolReference & {
    AssemblyKeyNameAttribute: LibrarySymbolReference;
    KeyName: LibrarySymbolReference
  };
  AssemblyMetadataAttribute: LibrarySymbolReference & {
    AssemblyMetadataAttribute: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  AssemblyName: LibrarySymbolReference & {
    AssemblyName: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    GetAssemblyName: LibrarySymbolReference;
    GetPublicKey: LibrarySymbolReference;
    GetPublicKeyToken: LibrarySymbolReference;
    OnDeserialization: LibrarySymbolReference;
    ReferenceMatchesDefinition: LibrarySymbolReference;
    SetPublicKey: LibrarySymbolReference;
    SetPublicKeyToken: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    CodeBase: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    CultureInfo: LibrarySymbolReference;
    CultureName: LibrarySymbolReference;
    EscapedCodeBase: LibrarySymbolReference;
    Flags: LibrarySymbolReference;
    FullName: LibrarySymbolReference;
    HashAlgorithm: LibrarySymbolReference;
    KeyPair: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ProcessorArchitecture: LibrarySymbolReference;
    Version: LibrarySymbolReference;
    VersionCompatibility: LibrarySymbolReference
  };
  AssemblyNameFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    PublicKey: LibrarySymbolReference;
    Retargetable: LibrarySymbolReference;
    EnableJITcompileOptimizer: LibrarySymbolReference;
    EnableJITcompileTracking: LibrarySymbolReference
  };
  AssemblyNameProxy: LibrarySymbolReference & {
    AssemblyNameProxy: LibrarySymbolReference;
    GetAssemblyName: LibrarySymbolReference
  };
  AssemblyProductAttribute: LibrarySymbolReference & {
    AssemblyProductAttribute: LibrarySymbolReference;
    Product: LibrarySymbolReference
  };
  AssemblySignatureKeyAttribute: LibrarySymbolReference & {
    AssemblySignatureKeyAttribute: LibrarySymbolReference;
    Countersignature: LibrarySymbolReference;
    PublicKey: LibrarySymbolReference
  };
  AssemblyTitleAttribute: LibrarySymbolReference & {
    AssemblyTitleAttribute: LibrarySymbolReference;
    Title: LibrarySymbolReference
  };
  AssemblyTrademarkAttribute: LibrarySymbolReference & {
    AssemblyTrademarkAttribute: LibrarySymbolReference;
    Trademark: LibrarySymbolReference
  };
  AssemblyVersionAttribute: LibrarySymbolReference & {
    AssemblyVersionAttribute: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  Binder: LibrarySymbolReference & {
    Binder: LibrarySymbolReference;
    BindToField: LibrarySymbolReference;
    BindToMethod: LibrarySymbolReference;
    ChangeType: LibrarySymbolReference;
    ReorderArgumentArray: LibrarySymbolReference;
    SelectMethod: LibrarySymbolReference;
    SelectProperty: LibrarySymbolReference
  };
  BindingFlags: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    IgnoreCase: LibrarySymbolReference;
    DeclaredOnly: LibrarySymbolReference;
    Instance: LibrarySymbolReference;
    Static: LibrarySymbolReference;
    Public: LibrarySymbolReference;
    NonPublic: LibrarySymbolReference;
    FlattenHierarchy: LibrarySymbolReference;
    InvokeMethod: LibrarySymbolReference;
    CreateInstance: LibrarySymbolReference;
    GetField: LibrarySymbolReference;
    SetField: LibrarySymbolReference;
    GetProperty: LibrarySymbolReference;
    SetProperty: LibrarySymbolReference;
    PutDispProperty: LibrarySymbolReference;
    PutRefDispProperty: LibrarySymbolReference;
    ExactBinding: LibrarySymbolReference;
    SuppressChangeType: LibrarySymbolReference;
    OptionalParamBinding: LibrarySymbolReference;
    IgnoreReturn: LibrarySymbolReference;
    DoNotWrapExceptions: LibrarySymbolReference
  };
  CallingConventions: LibrarySymbolReference & {
    Standard: LibrarySymbolReference;
    VarArgs: LibrarySymbolReference;
    Any: LibrarySymbolReference;
    HasThis: LibrarySymbolReference;
    ExplicitThis: LibrarySymbolReference
  };
  ConstructorInfo: LibrarySymbolReference & {
    ConstructorName: LibrarySymbolReference;
    TypeConstructorName: LibrarySymbolReference;
    ConstructorInfo: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    MemberType: LibrarySymbolReference
  };
  ConstructorInvoker: LibrarySymbolReference & {
    Create: LibrarySymbolReference;
    Invoke: LibrarySymbolReference
  };
  CustomAttributeData: LibrarySymbolReference & {
    CustomAttributeData: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    AttributeType: LibrarySymbolReference;
    Constructor: LibrarySymbolReference;
    ConstructorArguments: LibrarySymbolReference;
    NamedArguments: LibrarySymbolReference
  };
  CustomAttributeExtensions: LibrarySymbolReference & {
    GetCustomAttribute: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    IsDefined: LibrarySymbolReference
  };
  CustomAttributeFormatException: LibrarySymbolReference & {
    CustomAttributeFormatException: LibrarySymbolReference
  };
  CustomAttributeNamedArgument: LibrarySymbolReference & {
    CustomAttributeNamedArgument: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    IsField: LibrarySymbolReference;
    MemberInfo: LibrarySymbolReference;
    MemberName: LibrarySymbolReference;
    TypedValue: LibrarySymbolReference
  };
  CustomAttributeTypedArgument: LibrarySymbolReference & {
    CustomAttributeTypedArgument: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ArgumentType: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  DefaultMemberAttribute: LibrarySymbolReference & {
    DefaultMemberAttribute: LibrarySymbolReference;
    MemberName: LibrarySymbolReference
  };
  EventAttributes: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    SpecialName: LibrarySymbolReference;
    ReservedMask: LibrarySymbolReference;
    RTSpecialName: LibrarySymbolReference
  };
  EventInfo: LibrarySymbolReference & {
    EventInfo: LibrarySymbolReference;
    AddEventHandler: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetAddMethod: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetOtherMethods: LibrarySymbolReference;
    GetRaiseMethod: LibrarySymbolReference;
    GetRemoveMethod: LibrarySymbolReference;
    RemoveEventHandler: LibrarySymbolReference;
    AddMethod: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    EventHandlerType: LibrarySymbolReference;
    IsMulticast: LibrarySymbolReference;
    IsSpecialName: LibrarySymbolReference;
    MemberType: LibrarySymbolReference;
    RaiseMethod: LibrarySymbolReference;
    RemoveMethod: LibrarySymbolReference
  };
  ExceptionHandlingClause: LibrarySymbolReference & {
    ExceptionHandlingClause: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    CatchType: LibrarySymbolReference;
    FilterOffset: LibrarySymbolReference;
    Flags: LibrarySymbolReference;
    HandlerLength: LibrarySymbolReference;
    HandlerOffset: LibrarySymbolReference;
    TryLength: LibrarySymbolReference;
    TryOffset: LibrarySymbolReference
  };
  ExceptionHandlingClauseOptions: LibrarySymbolReference & {
    Clause: LibrarySymbolReference;
    Filter: LibrarySymbolReference;
    Finally: LibrarySymbolReference;
    Fault: LibrarySymbolReference
  };
  FieldAttributes: LibrarySymbolReference & {
    PrivateScope: LibrarySymbolReference;
    Private: LibrarySymbolReference;
    FamANDAssem: LibrarySymbolReference;
    Assembly: LibrarySymbolReference;
    Family: LibrarySymbolReference;
    FamORAssem: LibrarySymbolReference;
    Public: LibrarySymbolReference;
    FieldAccessMask: LibrarySymbolReference;
    Static: LibrarySymbolReference;
    InitOnly: LibrarySymbolReference;
    Literal: LibrarySymbolReference;
    NotSerialized: LibrarySymbolReference;
    HasFieldRVA: LibrarySymbolReference;
    SpecialName: LibrarySymbolReference;
    RTSpecialName: LibrarySymbolReference;
    HasFieldMarshal: LibrarySymbolReference;
    PinvokeImpl: LibrarySymbolReference;
    HasDefault: LibrarySymbolReference;
    ReservedMask: LibrarySymbolReference
  };
  FieldInfo: LibrarySymbolReference & {
    FieldInfo: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetFieldFromHandle: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetModifiedFieldType: LibrarySymbolReference;
    GetOptionalCustomModifiers: LibrarySymbolReference;
    GetRawConstantValue: LibrarySymbolReference;
    GetRequiredCustomModifiers: LibrarySymbolReference;
    GetValue: LibrarySymbolReference;
    GetValueDirect: LibrarySymbolReference;
    SetValue: LibrarySymbolReference;
    SetValueDirect: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    FieldHandle: LibrarySymbolReference;
    FieldType: LibrarySymbolReference;
    IsAssembly: LibrarySymbolReference;
    IsFamily: LibrarySymbolReference;
    IsFamilyAndAssembly: LibrarySymbolReference;
    IsFamilyOrAssembly: LibrarySymbolReference;
    IsInitOnly: LibrarySymbolReference;
    IsLiteral: LibrarySymbolReference;
    IsNotSerialized: LibrarySymbolReference;
    IsPinvokeImpl: LibrarySymbolReference;
    IsPrivate: LibrarySymbolReference;
    IsPublic: LibrarySymbolReference;
    IsSecurityCritical: LibrarySymbolReference;
    IsSecuritySafeCritical: LibrarySymbolReference;
    IsSecurityTransparent: LibrarySymbolReference;
    IsSpecialName: LibrarySymbolReference;
    IsStatic: LibrarySymbolReference;
    MemberType: LibrarySymbolReference
  };
  GenericParameterAttributes: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Covariant: LibrarySymbolReference;
    Contravariant: LibrarySymbolReference;
    VarianceMask: LibrarySymbolReference;
    ReferenceTypeConstraint: LibrarySymbolReference;
    NotNullableValueTypeConstraint: LibrarySymbolReference;
    DefaultConstructorConstraint: LibrarySymbolReference;
    SpecialConstraintMask: LibrarySymbolReference;
    AllowByRefLike: LibrarySymbolReference
  };
  ICustomAttributeProvider: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    IsDefined: LibrarySymbolReference
  };
  IReflect: LibrarySymbolReference & {
    GetField: LibrarySymbolReference;
    GetFields: LibrarySymbolReference;
    GetMember: LibrarySymbolReference;
    GetMembers: LibrarySymbolReference;
    GetMethod: LibrarySymbolReference;
    GetMethods: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetProperty: LibrarySymbolReference;
    InvokeMember: LibrarySymbolReference;
    UnderlyingSystemType: LibrarySymbolReference
  };
  IReflectableType: LibrarySymbolReference & {
    GetTypeInfo: LibrarySymbolReference
  };
  ImageFileMachine: LibrarySymbolReference & {
    I386: LibrarySymbolReference;
    ARM: LibrarySymbolReference;
    IA64: LibrarySymbolReference;
    AMD64: LibrarySymbolReference
  };
  InterfaceMapping: LibrarySymbolReference & {
    InterfaceMethods: LibrarySymbolReference;
    InterfaceType: LibrarySymbolReference;
    TargetMethods: LibrarySymbolReference;
    TargetType: LibrarySymbolReference
  };
  InvalidFilterCriteriaException: LibrarySymbolReference & {
    InvalidFilterCriteriaException: LibrarySymbolReference
  };
  LocalVariableInfo: LibrarySymbolReference & {
    LocalVariableInfo: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    IsPinned: LibrarySymbolReference;
    LocalIndex: LibrarySymbolReference;
    LocalType: LibrarySymbolReference
  };
  ManifestResourceInfo: LibrarySymbolReference & {
    ManifestResourceInfo: LibrarySymbolReference;
    FileName: LibrarySymbolReference;
    ReferencedAssembly: LibrarySymbolReference;
    ResourceLocation: LibrarySymbolReference
  };
  MemberFilter: LibrarySymbolReference & {
    MemberFilter: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  MemberInfo: LibrarySymbolReference & {
    MemberInfo: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetCustomAttributesData: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    HasSameMetadataDefinitionAs: LibrarySymbolReference;
    IsDefined: LibrarySymbolReference;
    CustomAttributes: LibrarySymbolReference;
    DeclaringType: LibrarySymbolReference;
    IsCollectible: LibrarySymbolReference;
    MemberType: LibrarySymbolReference;
    MetadataToken: LibrarySymbolReference;
    Module: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ReflectedType: LibrarySymbolReference
  };
  MemberTypes: LibrarySymbolReference & {
    Constructor: LibrarySymbolReference;
    Event: LibrarySymbolReference;
    Field: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    Property: LibrarySymbolReference;
    TypeInfo: LibrarySymbolReference;
    Custom: LibrarySymbolReference;
    NestedType: LibrarySymbolReference;
    All: LibrarySymbolReference
  };
  MethodAttributes: LibrarySymbolReference & {
    PrivateScope: LibrarySymbolReference;
    ReuseSlot: LibrarySymbolReference;
    Private: LibrarySymbolReference;
    FamANDAssem: LibrarySymbolReference;
    Assembly: LibrarySymbolReference;
    Family: LibrarySymbolReference;
    FamORAssem: LibrarySymbolReference;
    Public: LibrarySymbolReference;
    MemberAccessMask: LibrarySymbolReference;
    UnmanagedExport: LibrarySymbolReference;
    Static: LibrarySymbolReference;
    Final: LibrarySymbolReference;
    Virtual: LibrarySymbolReference;
    HideBySig: LibrarySymbolReference;
    NewSlot: LibrarySymbolReference;
    VtableLayoutMask: LibrarySymbolReference;
    CheckAccessOnOverride: LibrarySymbolReference;
    Abstract: LibrarySymbolReference;
    SpecialName: LibrarySymbolReference;
    RTSpecialName: LibrarySymbolReference;
    PinvokeImpl: LibrarySymbolReference;
    HasSecurity: LibrarySymbolReference;
    RequireSecObject: LibrarySymbolReference;
    ReservedMask: LibrarySymbolReference
  };
  MethodBase: LibrarySymbolReference & {
    MethodBase: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetCurrentMethod: LibrarySymbolReference;
    GetGenericArguments: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetMethodBody: LibrarySymbolReference;
    GetMethodFromHandle: LibrarySymbolReference;
    GetMethodImplementationFlags: LibrarySymbolReference;
    GetParameters: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    CallingConvention: LibrarySymbolReference;
    ContainsGenericParameters: LibrarySymbolReference;
    IsAbstract: LibrarySymbolReference;
    IsAssembly: LibrarySymbolReference;
    IsConstructedGenericMethod: LibrarySymbolReference;
    IsConstructor: LibrarySymbolReference;
    IsFamily: LibrarySymbolReference;
    IsFamilyAndAssembly: LibrarySymbolReference;
    IsFamilyOrAssembly: LibrarySymbolReference;
    IsFinal: LibrarySymbolReference;
    IsGenericMethod: LibrarySymbolReference;
    IsGenericMethodDefinition: LibrarySymbolReference;
    IsHideBySig: LibrarySymbolReference;
    IsPrivate: LibrarySymbolReference;
    IsPublic: LibrarySymbolReference;
    IsSecurityCritical: LibrarySymbolReference;
    IsSecuritySafeCritical: LibrarySymbolReference;
    IsSecurityTransparent: LibrarySymbolReference;
    IsSpecialName: LibrarySymbolReference;
    IsStatic: LibrarySymbolReference;
    IsVirtual: LibrarySymbolReference;
    MethodHandle: LibrarySymbolReference;
    MethodImplementationFlags: LibrarySymbolReference
  };
  MethodBody: LibrarySymbolReference & {
    MethodBody: LibrarySymbolReference;
    GetILAsByteArray: LibrarySymbolReference;
    ExceptionHandlingClauses: LibrarySymbolReference;
    InitLocals: LibrarySymbolReference;
    LocalSignatureMetadataToken: LibrarySymbolReference;
    LocalVariables: LibrarySymbolReference;
    MaxStackSize: LibrarySymbolReference
  };
  MethodImplAttributes: LibrarySymbolReference & {
    IL: LibrarySymbolReference;
    Managed: LibrarySymbolReference;
    Native: LibrarySymbolReference;
    OPTIL: LibrarySymbolReference;
    CodeTypeMask: LibrarySymbolReference;
    Runtime: LibrarySymbolReference;
    ManagedMask: LibrarySymbolReference;
    Unmanaged: LibrarySymbolReference;
    NoInlining: LibrarySymbolReference;
    ForwardRef: LibrarySymbolReference;
    Synchronized: LibrarySymbolReference;
    NoOptimization: LibrarySymbolReference;
    PreserveSig: LibrarySymbolReference;
    AggressiveInlining: LibrarySymbolReference;
    AggressiveOptimization: LibrarySymbolReference;
    InternalCall: LibrarySymbolReference;
    MaxMethodImplVal: LibrarySymbolReference
  };
  MethodInfo: LibrarySymbolReference & {
    MethodInfo: LibrarySymbolReference;
    CreateDelegate: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetBaseDefinition: LibrarySymbolReference;
    GetGenericArguments: LibrarySymbolReference;
    GetGenericMethodDefinition: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    MakeGenericMethod: LibrarySymbolReference;
    MemberType: LibrarySymbolReference;
    ReturnParameter: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference;
    ReturnTypeCustomAttributes: LibrarySymbolReference
  };
  MethodInvoker: LibrarySymbolReference & {
    Create: LibrarySymbolReference;
    Invoke: LibrarySymbolReference
  };
  Missing: LibrarySymbolReference & {
    Value: LibrarySymbolReference
  };
  Module: LibrarySymbolReference & {
    FilterTypeName: LibrarySymbolReference;
    FilterTypeNameIgnoreCase: LibrarySymbolReference;
    Module: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    FindTypes: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetCustomAttributesData: LibrarySymbolReference;
    GetField: LibrarySymbolReference;
    GetFields: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetMethod: LibrarySymbolReference;
    GetMethodImpl: LibrarySymbolReference;
    GetMethods: LibrarySymbolReference;
    GetPEKind: LibrarySymbolReference;
    GetType: LibrarySymbolReference;
    GetTypes: LibrarySymbolReference;
    IsDefined: LibrarySymbolReference;
    IsResource: LibrarySymbolReference;
    ResolveField: LibrarySymbolReference;
    ResolveMember: LibrarySymbolReference;
    ResolveMethod: LibrarySymbolReference;
    ResolveSignature: LibrarySymbolReference;
    ResolveString: LibrarySymbolReference;
    ResolveType: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Assembly: LibrarySymbolReference;
    CustomAttributes: LibrarySymbolReference;
    FullyQualifiedName: LibrarySymbolReference;
    MDStreamVersion: LibrarySymbolReference;
    MetadataToken: LibrarySymbolReference;
    ModuleHandle: LibrarySymbolReference;
    ModuleVersionId: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ScopeName: LibrarySymbolReference
  };
  ModuleResolveEventHandler: LibrarySymbolReference & {
    ModuleResolveEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  NullabilityInfo: LibrarySymbolReference & {
    ElementType: LibrarySymbolReference;
    GenericTypeArguments: LibrarySymbolReference;
    ReadState: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    WriteState: LibrarySymbolReference
  };
  NullabilityInfoContext: LibrarySymbolReference & {
    NullabilityInfoContext: LibrarySymbolReference;
    Create: LibrarySymbolReference
  };
  NullabilityState: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    NotNull: LibrarySymbolReference;
    Nullable: LibrarySymbolReference
  };
  ObfuscateAssemblyAttribute: LibrarySymbolReference & {
    ObfuscateAssemblyAttribute: LibrarySymbolReference;
    AssemblyIsPrivate: LibrarySymbolReference;
    StripAfterObfuscation: LibrarySymbolReference
  };
  ObfuscationAttribute: LibrarySymbolReference & {
    ObfuscationAttribute: LibrarySymbolReference;
    ApplyToMembers: LibrarySymbolReference;
    Exclude: LibrarySymbolReference;
    Feature: LibrarySymbolReference;
    StripAfterObfuscation: LibrarySymbolReference
  };
  ParameterAttributes: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    In: LibrarySymbolReference;
    Out: LibrarySymbolReference;
    Lcid: LibrarySymbolReference;
    Retval: LibrarySymbolReference;
    Optional: LibrarySymbolReference;
    HasDefault: LibrarySymbolReference;
    HasFieldMarshal: LibrarySymbolReference;
    Reserved3: LibrarySymbolReference;
    Reserved4: LibrarySymbolReference;
    ReservedMask: LibrarySymbolReference
  };
  ParameterInfo: LibrarySymbolReference & {
    AttrsImpl: LibrarySymbolReference;
    ClassImpl: LibrarySymbolReference;
    DefaultValueImpl: LibrarySymbolReference;
    MemberImpl: LibrarySymbolReference;
    NameImpl: LibrarySymbolReference;
    PositionImpl: LibrarySymbolReference;
    ParameterInfo: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetCustomAttributesData: LibrarySymbolReference;
    GetModifiedParameterType: LibrarySymbolReference;
    GetOptionalCustomModifiers: LibrarySymbolReference;
    GetRequiredCustomModifiers: LibrarySymbolReference;
    IsDefined: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    CustomAttributes: LibrarySymbolReference;
    DefaultValue: LibrarySymbolReference;
    HasDefaultValue: LibrarySymbolReference;
    IsIn: LibrarySymbolReference;
    IsLcid: LibrarySymbolReference;
    IsOptional: LibrarySymbolReference;
    IsOut: LibrarySymbolReference;
    IsRetval: LibrarySymbolReference;
    Member: LibrarySymbolReference;
    MetadataToken: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ParameterType: LibrarySymbolReference;
    Position: LibrarySymbolReference;
    RawDefaultValue: LibrarySymbolReference
  };
  ParameterModifier: LibrarySymbolReference & {
    ParameterModifier: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  Pointer: LibrarySymbolReference & {
    Box: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Unbox: LibrarySymbolReference
  };
  PortableExecutableKinds: LibrarySymbolReference & {
    NotAPortableExecutableImage: LibrarySymbolReference;
    ILOnly: LibrarySymbolReference;
    Required32Bit: LibrarySymbolReference;
    PE32Plus: LibrarySymbolReference;
    Unmanaged32Bit: LibrarySymbolReference;
    Preferred32Bit: LibrarySymbolReference
  };
  ProcessorArchitecture: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    MSIL: LibrarySymbolReference;
    X86: LibrarySymbolReference;
    IA64: LibrarySymbolReference;
    Amd64: LibrarySymbolReference;
    Arm: LibrarySymbolReference
  };
  PropertyAttributes: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    SpecialName: LibrarySymbolReference;
    RTSpecialName: LibrarySymbolReference;
    HasDefault: LibrarySymbolReference;
    Reserved2: LibrarySymbolReference;
    Reserved3: LibrarySymbolReference;
    Reserved4: LibrarySymbolReference;
    ReservedMask: LibrarySymbolReference
  };
  PropertyInfo: LibrarySymbolReference & {
    PropertyInfo: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetAccessors: LibrarySymbolReference;
    GetConstantValue: LibrarySymbolReference;
    GetGetMethod: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetIndexParameters: LibrarySymbolReference;
    GetModifiedPropertyType: LibrarySymbolReference;
    GetOptionalCustomModifiers: LibrarySymbolReference;
    GetRawConstantValue: LibrarySymbolReference;
    GetRequiredCustomModifiers: LibrarySymbolReference;
    GetSetMethod: LibrarySymbolReference;
    GetValue: LibrarySymbolReference;
    SetValue: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    GetMethod: LibrarySymbolReference;
    IsSpecialName: LibrarySymbolReference;
    MemberType: LibrarySymbolReference;
    PropertyType: LibrarySymbolReference;
    SetMethod: LibrarySymbolReference
  };
  ReflectionContext: LibrarySymbolReference & {
    ReflectionContext: LibrarySymbolReference;
    GetTypeForObject: LibrarySymbolReference;
    MapAssembly: LibrarySymbolReference;
    MapType: LibrarySymbolReference
  };
  ReflectionTypeLoadException: LibrarySymbolReference & {
    ReflectionTypeLoadException: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    LoaderExceptions: LibrarySymbolReference;
    Message: LibrarySymbolReference;
    Types: LibrarySymbolReference
  };
  ResourceAttributes: LibrarySymbolReference & {
    Public: LibrarySymbolReference;
    Private: LibrarySymbolReference
  };
  ResourceLocation: LibrarySymbolReference & {
    Embedded: LibrarySymbolReference;
    ContainedInAnotherAssembly: LibrarySymbolReference;
    ContainedInManifestFile: LibrarySymbolReference
  };
  RuntimeReflectionExtensions: LibrarySymbolReference & {
    GetMethodInfo: LibrarySymbolReference;
    GetRuntimeBaseDefinition: LibrarySymbolReference;
    GetRuntimeEvent: LibrarySymbolReference;
    GetRuntimeEvents: LibrarySymbolReference;
    GetRuntimeField: LibrarySymbolReference;
    GetRuntimeFields: LibrarySymbolReference;
    GetRuntimeInterfaceMap: LibrarySymbolReference;
    GetRuntimeMethod: LibrarySymbolReference;
    GetRuntimeMethods: LibrarySymbolReference;
    GetRuntimeProperties: LibrarySymbolReference;
    GetRuntimeProperty: LibrarySymbolReference
  };
  StrongNameKeyPair: LibrarySymbolReference & {
    StrongNameKeyPair: LibrarySymbolReference;
    PublicKey: LibrarySymbolReference
  };
  TargetException: LibrarySymbolReference & {
    TargetException: LibrarySymbolReference
  };
  TargetInvocationException: LibrarySymbolReference & {
    TargetInvocationException: LibrarySymbolReference
  };
  TargetParameterCountException: LibrarySymbolReference & {
    TargetParameterCountException: LibrarySymbolReference
  };
  TypeAttributes: LibrarySymbolReference & {
    AnsiClass: LibrarySymbolReference;
    AutoLayout: LibrarySymbolReference;
    Class: LibrarySymbolReference;
    NotPublic: LibrarySymbolReference;
    Public: LibrarySymbolReference;
    NestedPublic: LibrarySymbolReference;
    NestedPrivate: LibrarySymbolReference;
    NestedFamily: LibrarySymbolReference;
    NestedAssembly: LibrarySymbolReference;
    NestedFamANDAssem: LibrarySymbolReference;
    NestedFamORAssem: LibrarySymbolReference;
    VisibilityMask: LibrarySymbolReference;
    SequentialLayout: LibrarySymbolReference;
    ExplicitLayout: LibrarySymbolReference;
    LayoutMask: LibrarySymbolReference;
    ClassSemanticsMask: LibrarySymbolReference;
    Interface: LibrarySymbolReference;
    Abstract: LibrarySymbolReference;
    Sealed: LibrarySymbolReference;
    SpecialName: LibrarySymbolReference;
    RTSpecialName: LibrarySymbolReference;
    Import: LibrarySymbolReference;
    Serializable: LibrarySymbolReference;
    WindowsRuntime: LibrarySymbolReference;
    UnicodeClass: LibrarySymbolReference;
    AutoClass: LibrarySymbolReference;
    CustomFormatClass: LibrarySymbolReference;
    StringFormatMask: LibrarySymbolReference;
    HasSecurity: LibrarySymbolReference;
    ReservedMask: LibrarySymbolReference;
    BeforeFieldInit: LibrarySymbolReference;
    CustomFormatMask: LibrarySymbolReference
  };
  TypeDelegator: LibrarySymbolReference & {
    typeImpl: LibrarySymbolReference;
    TypeDelegator: LibrarySymbolReference;
    GetAttributeFlagsImpl: LibrarySymbolReference;
    GetConstructorImpl: LibrarySymbolReference;
    GetConstructors: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetElementType: LibrarySymbolReference;
    GetEvent: LibrarySymbolReference;
    GetEvents: LibrarySymbolReference;
    GetField: LibrarySymbolReference;
    GetFields: LibrarySymbolReference;
    GetFunctionPointerCallingConventions: LibrarySymbolReference;
    GetFunctionPointerParameterTypes: LibrarySymbolReference;
    GetFunctionPointerReturnType: LibrarySymbolReference;
    GetInterface: LibrarySymbolReference;
    GetInterfaceMap: LibrarySymbolReference;
    GetInterfaces: LibrarySymbolReference;
    GetMember: LibrarySymbolReference;
    GetMembers: LibrarySymbolReference;
    GetMemberWithSameMetadataDefinitionAs: LibrarySymbolReference;
    GetMethodImpl: LibrarySymbolReference;
    GetMethods: LibrarySymbolReference;
    GetNestedType: LibrarySymbolReference;
    GetNestedTypes: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetPropertyImpl: LibrarySymbolReference;
    HasElementTypeImpl: LibrarySymbolReference;
    InvokeMember: LibrarySymbolReference;
    IsArrayImpl: LibrarySymbolReference;
    IsAssignableFrom: LibrarySymbolReference;
    IsByRefImpl: LibrarySymbolReference;
    IsCOMObjectImpl: LibrarySymbolReference;
    IsDefined: LibrarySymbolReference;
    IsPointerImpl: LibrarySymbolReference;
    IsPrimitiveImpl: LibrarySymbolReference;
    IsValueTypeImpl: LibrarySymbolReference;
    Assembly: LibrarySymbolReference;
    AssemblyQualifiedName: LibrarySymbolReference;
    BaseType: LibrarySymbolReference;
    FullName: LibrarySymbolReference;
    GUID: LibrarySymbolReference;
    IsByRefLike: LibrarySymbolReference;
    IsCollectible: LibrarySymbolReference;
    IsConstructedGenericType: LibrarySymbolReference;
    IsFunctionPointer: LibrarySymbolReference;
    IsGenericMethodParameter: LibrarySymbolReference;
    IsGenericTypeParameter: LibrarySymbolReference;
    IsSZArray: LibrarySymbolReference;
    IsTypeDefinition: LibrarySymbolReference;
    IsUnmanagedFunctionPointer: LibrarySymbolReference;
    IsVariableBoundArray: LibrarySymbolReference;
    MetadataToken: LibrarySymbolReference;
    Module: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    TypeHandle: LibrarySymbolReference;
    UnderlyingSystemType: LibrarySymbolReference
  };
  TypeFilter: LibrarySymbolReference & {
    TypeFilter: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  TypeInfo: LibrarySymbolReference & {
    TypeInfo: LibrarySymbolReference;
    AsType: LibrarySymbolReference;
    GetDeclaredEvent: LibrarySymbolReference;
    GetDeclaredField: LibrarySymbolReference;
    GetDeclaredMethod: LibrarySymbolReference;
    GetDeclaredMethods: LibrarySymbolReference;
    GetDeclaredNestedType: LibrarySymbolReference;
    GetDeclaredProperty: LibrarySymbolReference;
    IsAssignableFrom: LibrarySymbolReference;
    DeclaredConstructors: LibrarySymbolReference;
    DeclaredEvents: LibrarySymbolReference;
    DeclaredFields: LibrarySymbolReference;
    DeclaredMembers: LibrarySymbolReference;
    DeclaredMethods: LibrarySymbolReference;
    DeclaredNestedTypes: LibrarySymbolReference;
    DeclaredProperties: LibrarySymbolReference;
    GenericTypeParameters: LibrarySymbolReference;
    ImplementedInterfaces: LibrarySymbolReference
  }
};
const Reflection: ReflectionLibrary = createLibrary("System.Reflection", {
  AmbiguousMatchException: {
    kind: "class",
    members: {
      AmbiguousMatchException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  Assembly: {
    kind: "class",
    members: {
      Assembly: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateQualifiedName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetAssembly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCallingAssembly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetCustomAttributesData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEntryAssembly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetExecutingAssembly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetExportedTypes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetFile: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetFiles: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetForwardedTypes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLoadedModules: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetManifestResourceInfo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetManifestResourceNames: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetManifestResourceStream: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetModule: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetModules: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetReferencedAssemblies: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSatelliteAssembly: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetTypes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Load: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadFile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadFrom: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadModule: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadWithPartialName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReflectionOnlyLoad: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReflectionOnlyLoadFrom: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetEntryAssembly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      UnsafeLoadFrom: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CodeBase: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      CustomAttributes: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      DefinedTypes: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      EntryPoint: {
        kind: "property",
        type: () => {
          return Reflection.MethodInfo;
        },
        isNullable: true,
        isVirtual: true,
      },
      EscapedCodeBase: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      ExportedTypes: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      FullName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      GlobalAssemblyCache: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      HostContext: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isVirtual: true,
      },
      ImageRuntimeVersion: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      IsCollectible: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsDynamic: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsFullyTrusted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Location: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      ManifestModule: {
        kind: "property",
        type: () => {
          return Reflection.Module;
        },
        isVirtual: true,
      },
      Modules: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      ReflectionOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      SecurityRuleSet: {
        kind: "property",
        type: () => {
          return Security.SecurityRuleSet;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  AssemblyAlgorithmIdAttribute: {
    kind: "class",
    members: {
      AssemblyAlgorithmIdAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AlgorithmId: {
        kind: "property",
        type: () => {
          return System.UInt32;
        },
      },
    },
    isSealed: true,
  },
  AssemblyCompanyAttribute: {
    kind: "class",
    members: {
      AssemblyCompanyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Company: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AssemblyConfigurationAttribute: {
    kind: "class",
    members: {
      AssemblyConfigurationAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Configuration: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AssemblyContentType: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Reflection.AssemblyContentType;
        },
      },
      WindowsRuntime: {
        kind: "field",
        type: () => {
          return Reflection.AssemblyContentType;
        },
      },
    },
  },
  AssemblyCopyrightAttribute: {
    kind: "class",
    members: {
      AssemblyCopyrightAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Copyright: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AssemblyCultureAttribute: {
    kind: "class",
    members: {
      AssemblyCultureAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Culture: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AssemblyDefaultAliasAttribute: {
    kind: "class",
    members: {
      AssemblyDefaultAliasAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      DefaultAlias: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AssemblyDelaySignAttribute: {
    kind: "class",
    members: {
      AssemblyDelaySignAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      DelaySign: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  AssemblyDescriptionAttribute: {
    kind: "class",
    members: {
      AssemblyDescriptionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Description: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AssemblyFileVersionAttribute: {
    kind: "class",
    members: {
      AssemblyFileVersionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Version: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AssemblyFlagsAttribute: {
    kind: "class",
    members: {
      AssemblyFlagsAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AssemblyFlags: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Flags: {
        kind: "property",
        type: () => {
          return System.UInt32;
        },
      },
    },
    isSealed: true,
  },
  AssemblyInformationalVersionAttribute: {
    kind: "class",
    members: {
      AssemblyInformationalVersionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      InformationalVersion: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AssemblyKeyFileAttribute: {
    kind: "class",
    members: {
      AssemblyKeyFileAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      KeyFile: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AssemblyKeyNameAttribute: {
    kind: "class",
    members: {
      AssemblyKeyNameAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      KeyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AssemblyMetadataAttribute: {
    kind: "class",
    members: {
      AssemblyMetadataAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Key: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  AssemblyName: {
    kind: "class",
    members: {
      AssemblyName: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAssemblyName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetPublicKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPublicKeyToken: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnDeserialization: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReferenceMatchesDefinition: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetPublicKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetPublicKeyToken: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CodeBase: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ContentType: {
        kind: "property",
        type: () => {
          return Reflection.AssemblyContentType;
        },
      },
      CultureInfo: {
        kind: "property",
        type: () => {
          return Globalization.CultureInfo;
        },
      },
      CultureName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      EscapedCodeBase: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Flags: {
        kind: "property",
        type: () => {
          return Reflection.AssemblyNameFlags;
        },
      },
      FullName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      HashAlgorithm: {
        kind: "property",
        type: () => {
          return Assemblies.AssemblyHashAlgorithm;
        },
      },
      KeyPair: {
        kind: "property",
        type: () => {
          return Reflection.StrongNameKeyPair;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ProcessorArchitecture: {
        kind: "property",
        type: () => {
          return Reflection.ProcessorArchitecture;
        },
      },
      Version: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
      VersionCompatibility: {
        kind: "property",
        type: () => {
          return Assemblies.AssemblyVersionCompatibility;
        },
      },
    },
    isSealed: true,
  },
  AssemblyNameFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Reflection.AssemblyNameFlags;
        },
      },
      PublicKey: {
        kind: "field",
        type: () => {
          return Reflection.AssemblyNameFlags;
        },
      },
      Retargetable: {
        kind: "field",
        type: () => {
          return Reflection.AssemblyNameFlags;
        },
      },
      EnableJITcompileOptimizer: {
        kind: "field",
        type: () => {
          return Reflection.AssemblyNameFlags;
        },
      },
      EnableJITcompileTracking: {
        kind: "field",
        type: () => {
          return Reflection.AssemblyNameFlags;
        },
      },
    },
  },
  AssemblyNameProxy: {
    kind: "class",
    members: {
      AssemblyNameProxy: {
        kind: "method",
        methodKind: "constructor",
      },
      GetAssemblyName: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  AssemblyProductAttribute: {
    kind: "class",
    members: {
      AssemblyProductAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Product: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AssemblySignatureKeyAttribute: {
    kind: "class",
    members: {
      AssemblySignatureKeyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Countersignature: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      PublicKey: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AssemblyTitleAttribute: {
    kind: "class",
    members: {
      AssemblyTitleAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Title: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AssemblyTrademarkAttribute: {
    kind: "class",
    members: {
      AssemblyTrademarkAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Trademark: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AssemblyVersionAttribute: {
    kind: "class",
    members: {
      AssemblyVersionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Version: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  Binder: {
    kind: "class",
    members: {
      Binder: {
        kind: "method",
        methodKind: "constructor",
      },
      BindToField: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      BindToMethod: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ChangeType: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ReorderArgumentArray: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SelectMethod: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SelectProperty: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  BindingFlags: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      IgnoreCase: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      DeclaredOnly: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      Instance: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      Static: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      Public: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      NonPublic: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      FlattenHierarchy: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      InvokeMethod: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      CreateInstance: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      GetField: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      SetField: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      GetProperty: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      SetProperty: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      PutDispProperty: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      PutRefDispProperty: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      ExactBinding: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      SuppressChangeType: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      OptionalParamBinding: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      IgnoreReturn: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
      DoNotWrapExceptions: {
        kind: "field",
        type: () => {
          return Reflection.BindingFlags;
        },
      },
    },
  },
  CallingConventions: {
    kind: "enum",
    members: {
      Standard: {
        kind: "field",
        type: () => {
          return Reflection.CallingConventions;
        },
      },
      VarArgs: {
        kind: "field",
        type: () => {
          return Reflection.CallingConventions;
        },
      },
      Any: {
        kind: "field",
        type: () => {
          return Reflection.CallingConventions;
        },
      },
      HasThis: {
        kind: "field",
        type: () => {
          return Reflection.CallingConventions;
        },
      },
      ExplicitThis: {
        kind: "field",
        type: () => {
          return Reflection.CallingConventions;
        },
      },
    },
  },
  ConstructorInfo: {
    kind: "class",
    members: {
      ConstructorName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      TypeConstructorName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ConstructorInfo: {
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
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
      },
      MemberType: {
        kind: "property",
        type: () => {
          return Reflection.MemberTypes;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  ConstructorInvoker: {
    kind: "class",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  CustomAttributeData: {
    kind: "class",
    members: {
      CustomAttributeData: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      AttributeType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isVirtual: true,
      },
      Constructor: {
        kind: "property",
        type: () => {
          return Reflection.ConstructorInfo;
        },
        isVirtual: true,
      },
      ConstructorArguments: {
        kind: "property",
        type: () => {
          return Generic.IList;
        },
        isVirtual: true,
      },
      NamedArguments: {
        kind: "property",
        type: () => {
          return Generic.IList;
        },
        isVirtual: true,
      },
    },
  },
  CustomAttributeExtensions: {
    kind: "class",
    members: {
      GetCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  CustomAttributeFormatException: {
    kind: "class",
    members: {
      CustomAttributeFormatException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CustomAttributeNamedArgument: {
    kind: "struct",
    members: {
      CustomAttributeNamedArgument: {
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
      IsField: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MemberInfo: {
        kind: "property",
        type: () => {
          return Reflection.MemberInfo;
        },
      },
      MemberName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      TypedValue: {
        kind: "property",
        type: () => {
          return Reflection.CustomAttributeTypedArgument;
        },
      },
    },
  },
  CustomAttributeTypedArgument: {
    kind: "struct",
    members: {
      CustomAttributeTypedArgument: {
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
      ArgumentType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  DefaultMemberAttribute: {
    kind: "class",
    members: {
      DefaultMemberAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      MemberName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  EventAttributes: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Reflection.EventAttributes;
        },
      },
      SpecialName: {
        kind: "field",
        type: () => {
          return Reflection.EventAttributes;
        },
      },
      ReservedMask: {
        kind: "field",
        type: () => {
          return Reflection.EventAttributes;
        },
      },
      RTSpecialName: {
        kind: "field",
        type: () => {
          return Reflection.EventAttributes;
        },
      },
    },
  },
  EventInfo: {
    kind: "class",
    members: {
      EventInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      AddEventHandler: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetAddMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetOtherMethods: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetRaiseMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetRemoveMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveEventHandler: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddMethod: {
        kind: "property",
        type: () => {
          return Reflection.MethodInfo;
        },
        isNullable: true,
        isVirtual: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.EventAttributes;
        },
        isAbstract: true,
      },
      EventHandlerType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isVirtual: true,
      },
      IsMulticast: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsSpecialName: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MemberType: {
        kind: "property",
        type: () => {
          return Reflection.MemberTypes;
        },
        isOverride: true,
      },
      RaiseMethod: {
        kind: "property",
        type: () => {
          return Reflection.MethodInfo;
        },
        isNullable: true,
        isVirtual: true,
      },
      RemoveMethod: {
        kind: "property",
        type: () => {
          return Reflection.MethodInfo;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  ExceptionHandlingClause: {
    kind: "class",
    members: {
      ExceptionHandlingClause: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CatchType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isVirtual: true,
      },
      FilterOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      Flags: {
        kind: "property",
        type: () => {
          return Reflection.ExceptionHandlingClauseOptions;
        },
        isVirtual: true,
      },
      HandlerLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      HandlerOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      TryLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      TryOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
    },
  },
  ExceptionHandlingClauseOptions: {
    kind: "enum",
    members: {
      Clause: {
        kind: "field",
        type: () => {
          return Reflection.ExceptionHandlingClauseOptions;
        },
      },
      Filter: {
        kind: "field",
        type: () => {
          return Reflection.ExceptionHandlingClauseOptions;
        },
      },
      Finally: {
        kind: "field",
        type: () => {
          return Reflection.ExceptionHandlingClauseOptions;
        },
      },
      Fault: {
        kind: "field",
        type: () => {
          return Reflection.ExceptionHandlingClauseOptions;
        },
      },
    },
  },
  FieldAttributes: {
    kind: "enum",
    members: {
      PrivateScope: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      Private: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      FamANDAssem: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      Assembly: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      Family: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      FamORAssem: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      Public: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      FieldAccessMask: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      Static: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      InitOnly: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      Literal: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      NotSerialized: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      HasFieldRVA: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      SpecialName: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      RTSpecialName: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      HasFieldMarshal: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      PinvokeImpl: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      HasDefault: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      ReservedMask: {
        kind: "field",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
    },
  },
  FieldInfo: {
    kind: "class",
    members: {
      FieldInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetFieldFromHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetModifiedFieldType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetOptionalCustomModifiers: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetRawConstantValue: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetRequiredCustomModifiers: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetValueDirect: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetValueDirect: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.FieldAttributes;
        },
        isAbstract: true,
      },
      FieldHandle: {
        kind: "property",
        type: () => {
          return System.RuntimeFieldHandle;
        },
        isAbstract: true,
      },
      FieldType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isAbstract: true,
      },
      IsAssembly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsFamily: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsFamilyAndAssembly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsFamilyOrAssembly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsInitOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsLiteral: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNotSerialized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsPinvokeImpl: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsPrivate: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsPublic: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSecurityCritical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsSecuritySafeCritical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsSecurityTransparent: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsSpecialName: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsStatic: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MemberType: {
        kind: "property",
        type: () => {
          return Reflection.MemberTypes;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  GenericParameterAttributes: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Reflection.GenericParameterAttributes;
        },
      },
      Covariant: {
        kind: "field",
        type: () => {
          return Reflection.GenericParameterAttributes;
        },
      },
      Contravariant: {
        kind: "field",
        type: () => {
          return Reflection.GenericParameterAttributes;
        },
      },
      VarianceMask: {
        kind: "field",
        type: () => {
          return Reflection.GenericParameterAttributes;
        },
      },
      ReferenceTypeConstraint: {
        kind: "field",
        type: () => {
          return Reflection.GenericParameterAttributes;
        },
      },
      NotNullableValueTypeConstraint: {
        kind: "field",
        type: () => {
          return Reflection.GenericParameterAttributes;
        },
      },
      DefaultConstructorConstraint: {
        kind: "field",
        type: () => {
          return Reflection.GenericParameterAttributes;
        },
      },
      SpecialConstraintMask: {
        kind: "field",
        type: () => {
          return Reflection.GenericParameterAttributes;
        },
      },
      AllowByRefLike: {
        kind: "field",
        type: () => {
          return Reflection.GenericParameterAttributes;
        },
      },
    },
  },
  ICustomAttributeProvider: {
    kind: "interface",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IReflect: {
    kind: "interface",
    members: {
      GetField: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetFields: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMember: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMembers: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMethods: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      InvokeMember: {
        kind: "method",
        methodKind: "ordinary",
      },
      UnderlyingSystemType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
  },
  IReflectableType: {
    kind: "interface",
    members: {
      GetTypeInfo: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ImageFileMachine: {
    kind: "enum",
    members: {
      I386: {
        kind: "field",
        type: () => {
          return Reflection.ImageFileMachine;
        },
      },
      ARM: {
        kind: "field",
        type: () => {
          return Reflection.ImageFileMachine;
        },
      },
      IA64: {
        kind: "field",
        type: () => {
          return Reflection.ImageFileMachine;
        },
      },
      AMD64: {
        kind: "field",
        type: () => {
          return Reflection.ImageFileMachine;
        },
      },
    },
  },
  InterfaceMapping: {
    kind: "struct",
    members: {
      InterfaceMethods: {
        kind: "field",
        type: () => {
          return System.Array;
        },
      },
      InterfaceType: {
        kind: "field",
        type: () => {
          return System.Type;
        },
      },
      TargetMethods: {
        kind: "field",
        type: () => {
          return System.Array;
        },
      },
      TargetType: {
        kind: "field",
        type: () => {
          return System.Type;
        },
      },
    },
  },
  InvalidFilterCriteriaException: {
    kind: "class",
    members: {
      InvalidFilterCriteriaException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  LocalVariableInfo: {
    kind: "class",
    members: {
      LocalVariableInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsPinned: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      LocalIndex: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      LocalType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isVirtual: true,
      },
    },
  },
  ManifestResourceInfo: {
    kind: "class",
    members: {
      ManifestResourceInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      FileName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      ReferencedAssembly: {
        kind: "property",
        type: () => {
          return Reflection.Assembly;
        },
        isNullable: true,
        isVirtual: true,
      },
      ResourceLocation: {
        kind: "property",
        type: () => {
          return Reflection.ResourceLocation;
        },
        isVirtual: true,
      },
    },
  },
  MemberFilter: {
    kind: "generic",
    members: {
      MemberFilter: {
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
  MemberInfo: {
    kind: "class",
    members: {
      MemberInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetCustomAttributesData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HasSameMetadataDefinitionAs: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CustomAttributes: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      DeclaringType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isAbstract: true,
      },
      IsCollectible: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      MemberType: {
        kind: "property",
        type: () => {
          return Reflection.MemberTypes;
        },
        isAbstract: true,
      },
      MetadataToken: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      Module: {
        kind: "property",
        type: () => {
          return Reflection.Module;
        },
        isVirtual: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      ReflectedType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  MemberTypes: {
    kind: "enum",
    members: {
      Constructor: {
        kind: "field",
        type: () => {
          return Reflection.MemberTypes;
        },
      },
      Event: {
        kind: "field",
        type: () => {
          return Reflection.MemberTypes;
        },
      },
      Field: {
        kind: "field",
        type: () => {
          return Reflection.MemberTypes;
        },
      },
      Method: {
        kind: "field",
        type: () => {
          return Reflection.MemberTypes;
        },
      },
      Property: {
        kind: "field",
        type: () => {
          return Reflection.MemberTypes;
        },
      },
      TypeInfo: {
        kind: "field",
        type: () => {
          return Reflection.MemberTypes;
        },
      },
      Custom: {
        kind: "field",
        type: () => {
          return Reflection.MemberTypes;
        },
      },
      NestedType: {
        kind: "field",
        type: () => {
          return Reflection.MemberTypes;
        },
      },
      All: {
        kind: "field",
        type: () => {
          return Reflection.MemberTypes;
        },
      },
    },
  },
  MethodAttributes: {
    kind: "enum",
    members: {
      PrivateScope: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      ReuseSlot: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      Private: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      FamANDAssem: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      Assembly: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      Family: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      FamORAssem: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      Public: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      MemberAccessMask: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      UnmanagedExport: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      Static: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      Final: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      Virtual: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      HideBySig: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      NewSlot: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      VtableLayoutMask: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      CheckAccessOnOverride: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      Abstract: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      SpecialName: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      RTSpecialName: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      PinvokeImpl: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      HasSecurity: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      RequireSecObject: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      ReservedMask: {
        kind: "field",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
    },
  },
  MethodBase: {
    kind: "class",
    members: {
      MethodBase: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCurrentMethod: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetGenericArguments: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMethodBody: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetMethodFromHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetMethodImplementationFlags: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetParameters: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.MethodAttributes;
        },
        isAbstract: true,
      },
      CallingConvention: {
        kind: "property",
        type: () => {
          return Reflection.CallingConventions;
        },
        isVirtual: true,
      },
      ContainsGenericParameters: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsAbstract: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsAssembly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsConstructedGenericMethod: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsConstructor: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsFamily: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsFamilyAndAssembly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsFamilyOrAssembly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsFinal: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsGenericMethod: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsGenericMethodDefinition: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsHideBySig: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsPrivate: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsPublic: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSecurityCritical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsSecuritySafeCritical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsSecurityTransparent: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsSpecialName: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsStatic: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsVirtual: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MethodHandle: {
        kind: "property",
        type: () => {
          return System.RuntimeMethodHandle;
        },
        isAbstract: true,
      },
      MethodImplementationFlags: {
        kind: "property",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  MethodBody: {
    kind: "class",
    members: {
      MethodBody: {
        kind: "method",
        methodKind: "constructor",
      },
      GetILAsByteArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ExceptionHandlingClauses: {
        kind: "property",
        type: () => {
          return Generic.IList;
        },
        isVirtual: true,
      },
      InitLocals: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      LocalSignatureMetadataToken: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      LocalVariables: {
        kind: "property",
        type: () => {
          return Generic.IList;
        },
        isVirtual: true,
      },
      MaxStackSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
    },
  },
  MethodImplAttributes: {
    kind: "enum",
    members: {
      IL: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      Managed: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      Native: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      OPTIL: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      CodeTypeMask: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      Runtime: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      ManagedMask: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      Unmanaged: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      NoInlining: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      ForwardRef: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      Synchronized: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      NoOptimization: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      PreserveSig: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      AggressiveInlining: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      AggressiveOptimization: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      InternalCall: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      MaxMethodImplVal: {
        kind: "field",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
    },
  },
  MethodInfo: {
    kind: "class",
    members: {
      MethodInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateDelegate: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetBaseDefinition: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetGenericArguments: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetGenericMethodDefinition: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MakeGenericMethod: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MemberType: {
        kind: "property",
        type: () => {
          return Reflection.MemberTypes;
        },
        isOverride: true,
      },
      ReturnParameter: {
        kind: "property",
        type: () => {
          return Reflection.ParameterInfo;
        },
        isVirtual: true,
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isVirtual: true,
      },
      ReturnTypeCustomAttributes: {
        kind: "property",
        type: () => {
          return Reflection.ICustomAttributeProvider;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  MethodInvoker: {
    kind: "class",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  Missing: {
    kind: "class",
    members: {
      Value: {
        kind: "field",
        type: () => {
          return Reflection.Missing;
        },
        isStatic: true,
        isReadOnly: true,
      },
    },
    isSealed: true,
  },
  Module: {
    kind: "class",
    members: {
      FilterTypeName: {
        kind: "field",
        type: () => {
          return Reflection.TypeFilter;
        },
        isStatic: true,
        isReadOnly: true,
      },
      FilterTypeNameIgnoreCase: {
        kind: "field",
        type: () => {
          return Reflection.TypeFilter;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Module: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FindTypes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetCustomAttributesData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetField: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetFields: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMethodImpl: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetMethods: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPEKind: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetTypes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsResource: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ResolveField: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResolveMember: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResolveMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResolveSignature: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ResolveString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ResolveType: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Assembly: {
        kind: "property",
        type: () => {
          return Reflection.Assembly;
        },
        isVirtual: true,
      },
      CustomAttributes: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      FullyQualifiedName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      MDStreamVersion: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      MetadataToken: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      ModuleHandle: {
        kind: "property",
        type: () => {
          return System.ModuleHandle;
        },
      },
      ModuleVersionId: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
        isVirtual: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      ScopeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  ModuleResolveEventHandler: {
    kind: "generic",
    members: {
      ModuleResolveEventHandler: {
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
  NullabilityInfo: {
    kind: "class",
    members: {
      ElementType: {
        kind: "property",
        type: () => {
          return Reflection.NullabilityInfo;
        },
        isNullable: true,
      },
      GenericTypeArguments: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      ReadState: {
        kind: "property",
        type: () => {
          return Reflection.NullabilityState;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      WriteState: {
        kind: "property",
        type: () => {
          return Reflection.NullabilityState;
        },
      },
    },
    isSealed: true,
  },
  NullabilityInfoContext: {
    kind: "class",
    members: {
      NullabilityInfoContext: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  NullabilityState: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return Reflection.NullabilityState;
        },
      },
      NotNull: {
        kind: "field",
        type: () => {
          return Reflection.NullabilityState;
        },
      },
      Nullable: {
        kind: "field",
        type: () => {
          return Reflection.NullabilityState;
        },
      },
    },
  },
  ObfuscateAssemblyAttribute: {
    kind: "class",
    members: {
      ObfuscateAssemblyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AssemblyIsPrivate: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      StripAfterObfuscation: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  ObfuscationAttribute: {
    kind: "class",
    members: {
      ObfuscationAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ApplyToMembers: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Exclude: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Feature: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      StripAfterObfuscation: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  ParameterAttributes: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Reflection.ParameterAttributes;
        },
      },
      In: {
        kind: "field",
        type: () => {
          return Reflection.ParameterAttributes;
        },
      },
      Out: {
        kind: "field",
        type: () => {
          return Reflection.ParameterAttributes;
        },
      },
      Lcid: {
        kind: "field",
        type: () => {
          return Reflection.ParameterAttributes;
        },
      },
      Retval: {
        kind: "field",
        type: () => {
          return Reflection.ParameterAttributes;
        },
      },
      Optional: {
        kind: "field",
        type: () => {
          return Reflection.ParameterAttributes;
        },
      },
      HasDefault: {
        kind: "field",
        type: () => {
          return Reflection.ParameterAttributes;
        },
      },
      HasFieldMarshal: {
        kind: "field",
        type: () => {
          return Reflection.ParameterAttributes;
        },
      },
      Reserved3: {
        kind: "field",
        type: () => {
          return Reflection.ParameterAttributes;
        },
      },
      Reserved4: {
        kind: "field",
        type: () => {
          return Reflection.ParameterAttributes;
        },
      },
      ReservedMask: {
        kind: "field",
        type: () => {
          return Reflection.ParameterAttributes;
        },
      },
    },
  },
  ParameterInfo: {
    kind: "class",
    members: {
      AttrsImpl: {
        kind: "field",
        type: () => {
          return Reflection.ParameterAttributes;
        },
      },
      ClassImpl: {
        kind: "field",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      DefaultValueImpl: {
        kind: "field",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      MemberImpl: {
        kind: "field",
        type: () => {
          return Reflection.MemberInfo;
        },
      },
      NameImpl: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      PositionImpl: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      ParameterInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetCustomAttributesData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetModifiedParameterType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetOptionalCustomModifiers: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetRequiredCustomModifiers: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.ParameterAttributes;
        },
        isVirtual: true,
      },
      CustomAttributes: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      DefaultValue: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
        isVirtual: true,
      },
      HasDefaultValue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsIn: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsLcid: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsOptional: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsOut: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsRetval: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Member: {
        kind: "property",
        type: () => {
          return Reflection.MemberInfo;
        },
        isVirtual: true,
      },
      MetadataToken: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      ParameterType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isVirtual: true,
      },
      Position: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      RawDefaultValue: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
  },
  ParameterModifier: {
    kind: "struct",
    members: {
      ParameterModifier: {
        kind: "method",
        methodKind: "constructor",
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  Pointer: {
    kind: "class",
    members: {
      Box: {
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
      Unbox: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  PortableExecutableKinds: {
    kind: "enum",
    members: {
      NotAPortableExecutableImage: {
        kind: "field",
        type: () => {
          return Reflection.PortableExecutableKinds;
        },
      },
      ILOnly: {
        kind: "field",
        type: () => {
          return Reflection.PortableExecutableKinds;
        },
      },
      Required32Bit: {
        kind: "field",
        type: () => {
          return Reflection.PortableExecutableKinds;
        },
      },
      PE32Plus: {
        kind: "field",
        type: () => {
          return Reflection.PortableExecutableKinds;
        },
      },
      Unmanaged32Bit: {
        kind: "field",
        type: () => {
          return Reflection.PortableExecutableKinds;
        },
      },
      Preferred32Bit: {
        kind: "field",
        type: () => {
          return Reflection.PortableExecutableKinds;
        },
      },
    },
  },
  ProcessorArchitecture: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Reflection.ProcessorArchitecture;
        },
      },
      MSIL: {
        kind: "field",
        type: () => {
          return Reflection.ProcessorArchitecture;
        },
      },
      X86: {
        kind: "field",
        type: () => {
          return Reflection.ProcessorArchitecture;
        },
      },
      IA64: {
        kind: "field",
        type: () => {
          return Reflection.ProcessorArchitecture;
        },
      },
      Amd64: {
        kind: "field",
        type: () => {
          return Reflection.ProcessorArchitecture;
        },
      },
      Arm: {
        kind: "field",
        type: () => {
          return Reflection.ProcessorArchitecture;
        },
      },
    },
  },
  PropertyAttributes: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Reflection.PropertyAttributes;
        },
      },
      SpecialName: {
        kind: "field",
        type: () => {
          return Reflection.PropertyAttributes;
        },
      },
      RTSpecialName: {
        kind: "field",
        type: () => {
          return Reflection.PropertyAttributes;
        },
      },
      HasDefault: {
        kind: "field",
        type: () => {
          return Reflection.PropertyAttributes;
        },
      },
      Reserved2: {
        kind: "field",
        type: () => {
          return Reflection.PropertyAttributes;
        },
      },
      Reserved3: {
        kind: "field",
        type: () => {
          return Reflection.PropertyAttributes;
        },
      },
      Reserved4: {
        kind: "field",
        type: () => {
          return Reflection.PropertyAttributes;
        },
      },
      ReservedMask: {
        kind: "field",
        type: () => {
          return Reflection.PropertyAttributes;
        },
      },
    },
  },
  PropertyInfo: {
    kind: "class",
    members: {
      PropertyInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetAccessors: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetConstantValue: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetGetMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetIndexParameters: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetModifiedPropertyType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetOptionalCustomModifiers: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetRawConstantValue: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetRequiredCustomModifiers: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSetMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.PropertyAttributes;
        },
        isAbstract: true,
      },
      CanRead: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      CanWrite: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      GetMethod: {
        kind: "property",
        type: () => {
          return Reflection.MethodInfo;
        },
        isNullable: true,
        isVirtual: true,
      },
      IsSpecialName: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MemberType: {
        kind: "property",
        type: () => {
          return Reflection.MemberTypes;
        },
        isOverride: true,
      },
      PropertyType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isAbstract: true,
      },
      SetMethod: {
        kind: "property",
        type: () => {
          return Reflection.MethodInfo;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  ReflectionContext: {
    kind: "class",
    members: {
      ReflectionContext: {
        kind: "method",
        methodKind: "constructor",
      },
      GetTypeForObject: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MapAssembly: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MapType: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  ReflectionTypeLoadException: {
    kind: "class",
    members: {
      ReflectionTypeLoadException: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      LoaderExceptions: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      Types: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
    isSealed: true,
  },
  ResourceAttributes: {
    kind: "enum",
    members: {
      Public: {
        kind: "field",
        type: () => {
          return Reflection.ResourceAttributes;
        },
      },
      Private: {
        kind: "field",
        type: () => {
          return Reflection.ResourceAttributes;
        },
      },
    },
  },
  ResourceLocation: {
    kind: "enum",
    members: {
      Embedded: {
        kind: "field",
        type: () => {
          return Reflection.ResourceLocation;
        },
      },
      ContainedInAnotherAssembly: {
        kind: "field",
        type: () => {
          return Reflection.ResourceLocation;
        },
      },
      ContainedInManifestFile: {
        kind: "field",
        type: () => {
          return Reflection.ResourceLocation;
        },
      },
    },
  },
  RuntimeReflectionExtensions: {
    kind: "class",
    members: {
      GetMethodInfo: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRuntimeBaseDefinition: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRuntimeEvent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRuntimeEvents: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRuntimeField: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRuntimeFields: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRuntimeInterfaceMap: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRuntimeMethod: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRuntimeMethods: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRuntimeProperties: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRuntimeProperty: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  StrongNameKeyPair: {
    kind: "class",
    members: {
      StrongNameKeyPair: {
        kind: "method",
        methodKind: "constructor",
      },
      PublicKey: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  TargetException: {
    kind: "class",
    members: {
      TargetException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  TargetInvocationException: {
    kind: "class",
    members: {
      TargetInvocationException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  TargetParameterCountException: {
    kind: "class",
    members: {
      TargetParameterCountException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  TypeAttributes: {
    kind: "enum",
    members: {
      AnsiClass: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      AutoLayout: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      Class: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      NotPublic: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      Public: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      NestedPublic: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      NestedPrivate: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      NestedFamily: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      NestedAssembly: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      NestedFamANDAssem: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      NestedFamORAssem: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      VisibilityMask: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      SequentialLayout: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      ExplicitLayout: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      LayoutMask: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      ClassSemanticsMask: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      Interface: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      Abstract: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      Sealed: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      SpecialName: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      RTSpecialName: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      Import: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      Serializable: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      WindowsRuntime: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      UnicodeClass: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      AutoClass: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      CustomFormatClass: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      StringFormatMask: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      HasSecurity: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      ReservedMask: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      BeforeFieldInit: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      CustomFormatMask: {
        kind: "field",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
    },
  },
  TypeDelegator: {
    kind: "class",
    members: {
      typeImpl: {
        kind: "field",
        type: () => {
          return System.Type;
        },
      },
      TypeDelegator: {
        kind: "method",
        methodKind: "constructor",
      },
      GetAttributeFlagsImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetConstructorImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetConstructors: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetElementType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEvent: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEvents: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetField: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetFields: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetFunctionPointerCallingConventions: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetFunctionPointerParameterTypes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetFunctionPointerReturnType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetInterface: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetInterfaceMap: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetInterfaces: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMember: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMembers: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMemberWithSameMetadataDefinitionAs: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMethodImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMethods: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetNestedType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetNestedTypes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetPropertyImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HasElementTypeImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InvokeMember: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsArrayImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsAssignableFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsByRefImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsCOMObjectImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsPointerImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsPrimitiveImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValueTypeImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Assembly: {
        kind: "property",
        type: () => {
          return Reflection.Assembly;
        },
        isOverride: true,
      },
      AssemblyQualifiedName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      BaseType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isOverride: true,
      },
      FullName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      GUID: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
        isOverride: true,
      },
      IsByRefLike: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsCollectible: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsConstructedGenericType: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsFunctionPointer: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsGenericMethodParameter: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsGenericTypeParameter: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsSZArray: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsTypeDefinition: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsUnmanagedFunctionPointer: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsVariableBoundArray: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      MetadataToken: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Module: {
        kind: "property",
        type: () => {
          return Reflection.Module;
        },
        isOverride: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      TypeHandle: {
        kind: "property",
        type: () => {
          return System.RuntimeTypeHandle;
        },
        isOverride: true,
      },
      UnderlyingSystemType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
    },
  },
  TypeFilter: {
    kind: "generic",
    members: {
      TypeFilter: {
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
  TypeInfo: {
    kind: "class",
    members: {
      TypeInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      AsType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetDeclaredEvent: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetDeclaredField: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetDeclaredMethod: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetDeclaredMethods: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetDeclaredNestedType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetDeclaredProperty: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsAssignableFrom: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DeclaredConstructors: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      DeclaredEvents: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      DeclaredFields: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      DeclaredMembers: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      DeclaredMethods: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      DeclaredNestedTypes: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      DeclaredProperties: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      GenericTypeParameters: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
      ImplementedInterfaces: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
});
export default Reflection
