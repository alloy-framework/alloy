import System from "../../index.js";
import Reflection from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type EmitLibrary = LibrarySymbolReference & {
  AssemblyBuilder: LibrarySymbolReference & {
    AssemblyBuilder: LibrarySymbolReference;
    DefineDynamicAssembly: LibrarySymbolReference;
    DefineDynamicModule: LibrarySymbolReference;
    DefineDynamicModuleCore: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetCustomAttributesData: LibrarySymbolReference;
    GetDynamicModule: LibrarySymbolReference;
    GetDynamicModuleCore: LibrarySymbolReference;
    GetExportedTypes: LibrarySymbolReference;
    GetFile: LibrarySymbolReference;
    GetFiles: LibrarySymbolReference;
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
    IsDefined: LibrarySymbolReference;
    SetCustomAttribute: LibrarySymbolReference;
    SetCustomAttributeCore: LibrarySymbolReference;
    CodeBase: LibrarySymbolReference;
    EntryPoint: LibrarySymbolReference;
    FullName: LibrarySymbolReference;
    HostContext: LibrarySymbolReference;
    IsCollectible: LibrarySymbolReference;
    IsDynamic: LibrarySymbolReference;
    Location: LibrarySymbolReference;
    ManifestModule: LibrarySymbolReference;
    ReflectionOnly: LibrarySymbolReference
  };
  AssemblyBuilderAccess: LibrarySymbolReference & {
    Run: LibrarySymbolReference;
    RunAndCollect: LibrarySymbolReference
  };
  ConstructorBuilder: LibrarySymbolReference & {
    ConstructorBuilder: LibrarySymbolReference;
    DefineParameter: LibrarySymbolReference;
    DefineParameterCore: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetILGenerator: LibrarySymbolReference;
    GetILGeneratorCore: LibrarySymbolReference;
    GetMethodImplementationFlags: LibrarySymbolReference;
    GetParameters: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    IsDefined: LibrarySymbolReference;
    SetCustomAttribute: LibrarySymbolReference;
    SetCustomAttributeCore: LibrarySymbolReference;
    SetImplementationFlags: LibrarySymbolReference;
    SetImplementationFlagsCore: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    CallingConvention: LibrarySymbolReference;
    DeclaringType: LibrarySymbolReference;
    InitLocals: LibrarySymbolReference;
    InitLocalsCore: LibrarySymbolReference;
    MetadataToken: LibrarySymbolReference;
    MethodHandle: LibrarySymbolReference;
    Module: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ReflectedType: LibrarySymbolReference
  };
  CustomAttributeBuilder: LibrarySymbolReference & {
    CustomAttributeBuilder: LibrarySymbolReference
  };
  DynamicILInfo: LibrarySymbolReference & {
    GetTokenFor: LibrarySymbolReference;
    SetCode: LibrarySymbolReference;
    SetExceptions: LibrarySymbolReference;
    SetLocalSignature: LibrarySymbolReference;
    DynamicMethod: LibrarySymbolReference
  };
  DynamicMethod: LibrarySymbolReference & {
    DynamicMethod: LibrarySymbolReference;
    CreateDelegate: LibrarySymbolReference;
    DefineParameter: LibrarySymbolReference;
    GetBaseDefinition: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetDynamicILInfo: LibrarySymbolReference;
    GetILGenerator: LibrarySymbolReference;
    GetMethodImplementationFlags: LibrarySymbolReference;
    GetParameters: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    IsDefined: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    CallingConvention: LibrarySymbolReference;
    DeclaringType: LibrarySymbolReference;
    InitLocals: LibrarySymbolReference;
    IsSecurityCritical: LibrarySymbolReference;
    IsSecuritySafeCritical: LibrarySymbolReference;
    IsSecurityTransparent: LibrarySymbolReference;
    MethodHandle: LibrarySymbolReference;
    Module: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ReflectedType: LibrarySymbolReference;
    ReturnParameter: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference;
    ReturnTypeCustomAttributes: LibrarySymbolReference
  };
  EnumBuilder: LibrarySymbolReference & {
    EnumBuilder: LibrarySymbolReference;
    CreateType: LibrarySymbolReference;
    CreateTypeInfo: LibrarySymbolReference;
    CreateTypeInfoCore: LibrarySymbolReference;
    DefineLiteral: LibrarySymbolReference;
    DefineLiteralCore: LibrarySymbolReference;
    GetAttributeFlagsImpl: LibrarySymbolReference;
    GetConstructorImpl: LibrarySymbolReference;
    GetConstructors: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetElementType: LibrarySymbolReference;
    GetEnumUnderlyingType: LibrarySymbolReference;
    GetEvent: LibrarySymbolReference;
    GetEvents: LibrarySymbolReference;
    GetField: LibrarySymbolReference;
    GetFields: LibrarySymbolReference;
    GetInterface: LibrarySymbolReference;
    GetInterfaceMap: LibrarySymbolReference;
    GetInterfaces: LibrarySymbolReference;
    GetMember: LibrarySymbolReference;
    GetMembers: LibrarySymbolReference;
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
    MakeArrayType: LibrarySymbolReference;
    MakeByRefType: LibrarySymbolReference;
    MakePointerType: LibrarySymbolReference;
    SetCustomAttribute: LibrarySymbolReference;
    SetCustomAttributeCore: LibrarySymbolReference;
    Assembly: LibrarySymbolReference;
    AssemblyQualifiedName: LibrarySymbolReference;
    BaseType: LibrarySymbolReference;
    DeclaringType: LibrarySymbolReference;
    FullName: LibrarySymbolReference;
    GUID: LibrarySymbolReference;
    IsByRefLike: LibrarySymbolReference;
    IsConstructedGenericType: LibrarySymbolReference;
    IsSZArray: LibrarySymbolReference;
    IsTypeDefinition: LibrarySymbolReference;
    Module: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    ReflectedType: LibrarySymbolReference;
    TypeHandle: LibrarySymbolReference;
    UnderlyingField: LibrarySymbolReference;
    UnderlyingFieldCore: LibrarySymbolReference;
    UnderlyingSystemType: LibrarySymbolReference
  };
  EventBuilder: LibrarySymbolReference & {
    EventBuilder: LibrarySymbolReference;
    AddOtherMethod: LibrarySymbolReference;
    AddOtherMethodCore: LibrarySymbolReference;
    SetAddOnMethod: LibrarySymbolReference;
    SetAddOnMethodCore: LibrarySymbolReference;
    SetCustomAttribute: LibrarySymbolReference;
    SetCustomAttributeCore: LibrarySymbolReference;
    SetRaiseMethod: LibrarySymbolReference;
    SetRaiseMethodCore: LibrarySymbolReference;
    SetRemoveOnMethod: LibrarySymbolReference;
    SetRemoveOnMethodCore: LibrarySymbolReference
  };
  FieldBuilder: LibrarySymbolReference & {
    FieldBuilder: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetValue: LibrarySymbolReference;
    IsDefined: LibrarySymbolReference;
    SetConstant: LibrarySymbolReference;
    SetConstantCore: LibrarySymbolReference;
    SetCustomAttribute: LibrarySymbolReference;
    SetCustomAttributeCore: LibrarySymbolReference;
    SetOffset: LibrarySymbolReference;
    SetOffsetCore: LibrarySymbolReference;
    SetValue: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    DeclaringType: LibrarySymbolReference;
    FieldHandle: LibrarySymbolReference;
    FieldType: LibrarySymbolReference;
    MetadataToken: LibrarySymbolReference;
    Module: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ReflectedType: LibrarySymbolReference
  };
  FlowControl: LibrarySymbolReference & {
    Branch: LibrarySymbolReference;
    Break: LibrarySymbolReference;
    Call: LibrarySymbolReference;
    Meta: LibrarySymbolReference;
    Next: LibrarySymbolReference;
    Phi: LibrarySymbolReference;
    Return: LibrarySymbolReference;
    Throw: LibrarySymbolReference
  };
  GenericTypeParameterBuilder: LibrarySymbolReference & {
    GenericTypeParameterBuilder: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetAttributeFlagsImpl: LibrarySymbolReference;
    GetConstructorImpl: LibrarySymbolReference;
    GetConstructors: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetElementType: LibrarySymbolReference;
    GetEvent: LibrarySymbolReference;
    GetEvents: LibrarySymbolReference;
    GetField: LibrarySymbolReference;
    GetFields: LibrarySymbolReference;
    GetGenericArguments: LibrarySymbolReference;
    GetGenericTypeDefinition: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetInterface: LibrarySymbolReference;
    GetInterfaceMap: LibrarySymbolReference;
    GetInterfaces: LibrarySymbolReference;
    GetMember: LibrarySymbolReference;
    GetMembers: LibrarySymbolReference;
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
    IsSubclassOf: LibrarySymbolReference;
    IsValueTypeImpl: LibrarySymbolReference;
    MakeArrayType: LibrarySymbolReference;
    MakeByRefType: LibrarySymbolReference;
    MakeGenericType: LibrarySymbolReference;
    MakePointerType: LibrarySymbolReference;
    SetBaseTypeConstraint: LibrarySymbolReference;
    SetBaseTypeConstraintCore: LibrarySymbolReference;
    SetCustomAttribute: LibrarySymbolReference;
    SetCustomAttributeCore: LibrarySymbolReference;
    SetGenericParameterAttributes: LibrarySymbolReference;
    SetGenericParameterAttributesCore: LibrarySymbolReference;
    SetInterfaceConstraints: LibrarySymbolReference;
    SetInterfaceConstraintsCore: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Assembly: LibrarySymbolReference;
    AssemblyQualifiedName: LibrarySymbolReference;
    BaseType: LibrarySymbolReference;
    ContainsGenericParameters: LibrarySymbolReference;
    DeclaringMethod: LibrarySymbolReference;
    DeclaringType: LibrarySymbolReference;
    FullName: LibrarySymbolReference;
    GenericParameterAttributes: LibrarySymbolReference;
    GenericParameterPosition: LibrarySymbolReference;
    GUID: LibrarySymbolReference;
    IsByRefLike: LibrarySymbolReference;
    IsConstructedGenericType: LibrarySymbolReference;
    IsGenericParameter: LibrarySymbolReference;
    IsGenericType: LibrarySymbolReference;
    IsGenericTypeDefinition: LibrarySymbolReference;
    IsSZArray: LibrarySymbolReference;
    IsTypeDefinition: LibrarySymbolReference;
    MetadataToken: LibrarySymbolReference;
    Module: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    ReflectedType: LibrarySymbolReference;
    TypeHandle: LibrarySymbolReference;
    UnderlyingSystemType: LibrarySymbolReference
  };
  ILGenerator: LibrarySymbolReference & {
    ILGenerator: LibrarySymbolReference;
    BeginCatchBlock: LibrarySymbolReference;
    BeginExceptFilterBlock: LibrarySymbolReference;
    BeginExceptionBlock: LibrarySymbolReference;
    BeginFaultBlock: LibrarySymbolReference;
    BeginFinallyBlock: LibrarySymbolReference;
    BeginScope: LibrarySymbolReference;
    CreateLabel: LibrarySymbolReference;
    DeclareLocal: LibrarySymbolReference;
    DefineLabel: LibrarySymbolReference;
    Emit: LibrarySymbolReference;
    EmitCall: LibrarySymbolReference;
    EmitCalli: LibrarySymbolReference;
    EmitWriteLine: LibrarySymbolReference;
    EndExceptionBlock: LibrarySymbolReference;
    EndScope: LibrarySymbolReference;
    MarkLabel: LibrarySymbolReference;
    MarkSequencePoint: LibrarySymbolReference;
    MarkSequencePointCore: LibrarySymbolReference;
    ThrowException: LibrarySymbolReference;
    UsingNamespace: LibrarySymbolReference;
    ILOffset: LibrarySymbolReference
  };
  Label: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Id: LibrarySymbolReference
  };
  LocalBuilder: LibrarySymbolReference & {
    LocalBuilder: LibrarySymbolReference;
    SetLocalSymInfo: LibrarySymbolReference;
    SetLocalSymInfoCore: LibrarySymbolReference;
    IsPinned: LibrarySymbolReference;
    LocalIndex: LibrarySymbolReference;
    LocalType: LibrarySymbolReference
  };
  MethodBuilder: LibrarySymbolReference & {
    MethodBuilder: LibrarySymbolReference;
    DefineGenericParameters: LibrarySymbolReference;
    DefineGenericParametersCore: LibrarySymbolReference;
    DefineParameter: LibrarySymbolReference;
    DefineParameterCore: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetBaseDefinition: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetGenericArguments: LibrarySymbolReference;
    GetGenericMethodDefinition: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetILGenerator: LibrarySymbolReference;
    GetILGeneratorCore: LibrarySymbolReference;
    GetMethodImplementationFlags: LibrarySymbolReference;
    GetParameters: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    IsDefined: LibrarySymbolReference;
    MakeGenericMethod: LibrarySymbolReference;
    SetCustomAttribute: LibrarySymbolReference;
    SetCustomAttributeCore: LibrarySymbolReference;
    SetImplementationFlags: LibrarySymbolReference;
    SetImplementationFlagsCore: LibrarySymbolReference;
    SetParameters: LibrarySymbolReference;
    SetReturnType: LibrarySymbolReference;
    SetSignature: LibrarySymbolReference;
    SetSignatureCore: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    CallingConvention: LibrarySymbolReference;
    ContainsGenericParameters: LibrarySymbolReference;
    DeclaringType: LibrarySymbolReference;
    InitLocals: LibrarySymbolReference;
    InitLocalsCore: LibrarySymbolReference;
    IsGenericMethod: LibrarySymbolReference;
    IsGenericMethodDefinition: LibrarySymbolReference;
    IsSecurityCritical: LibrarySymbolReference;
    IsSecuritySafeCritical: LibrarySymbolReference;
    IsSecurityTransparent: LibrarySymbolReference;
    MetadataToken: LibrarySymbolReference;
    MethodHandle: LibrarySymbolReference;
    Module: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ReflectedType: LibrarySymbolReference;
    ReturnParameter: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference;
    ReturnTypeCustomAttributes: LibrarySymbolReference
  };
  ModuleBuilder: LibrarySymbolReference & {
    ModuleBuilder: LibrarySymbolReference;
    CreateGlobalFunctions: LibrarySymbolReference;
    CreateGlobalFunctionsCore: LibrarySymbolReference;
    DefineDocument: LibrarySymbolReference;
    DefineDocumentCore: LibrarySymbolReference;
    DefineEnum: LibrarySymbolReference;
    DefineEnumCore: LibrarySymbolReference;
    DefineGlobalMethod: LibrarySymbolReference;
    DefineGlobalMethodCore: LibrarySymbolReference;
    DefineInitializedData: LibrarySymbolReference;
    DefineInitializedDataCore: LibrarySymbolReference;
    DefinePInvokeMethod: LibrarySymbolReference;
    DefinePInvokeMethodCore: LibrarySymbolReference;
    DefineType: LibrarySymbolReference;
    DefineTypeCore: LibrarySymbolReference;
    DefineUninitializedData: LibrarySymbolReference;
    DefineUninitializedDataCore: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetArrayMethod: LibrarySymbolReference;
    GetArrayMethodCore: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetCustomAttributesData: LibrarySymbolReference;
    GetField: LibrarySymbolReference;
    GetFields: LibrarySymbolReference;
    GetFieldMetadataToken: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetMethodImpl: LibrarySymbolReference;
    GetMethodMetadataToken: LibrarySymbolReference;
    GetMethods: LibrarySymbolReference;
    GetPEKind: LibrarySymbolReference;
    GetType: LibrarySymbolReference;
    GetTypes: LibrarySymbolReference;
    GetTypeMetadataToken: LibrarySymbolReference;
    GetSignatureMetadataToken: LibrarySymbolReference;
    GetStringMetadataToken: LibrarySymbolReference;
    IsDefined: LibrarySymbolReference;
    IsResource: LibrarySymbolReference;
    ResolveField: LibrarySymbolReference;
    ResolveMember: LibrarySymbolReference;
    ResolveMethod: LibrarySymbolReference;
    ResolveSignature: LibrarySymbolReference;
    ResolveString: LibrarySymbolReference;
    ResolveType: LibrarySymbolReference;
    SetCustomAttribute: LibrarySymbolReference;
    SetCustomAttributeCore: LibrarySymbolReference;
    Assembly: LibrarySymbolReference;
    FullyQualifiedName: LibrarySymbolReference;
    MDStreamVersion: LibrarySymbolReference;
    MetadataToken: LibrarySymbolReference;
    ModuleVersionId: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ScopeName: LibrarySymbolReference
  };
  OpCode: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    EvaluationStackDelta: LibrarySymbolReference;
    FlowControl: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    OpCodeType: LibrarySymbolReference;
    OperandType: LibrarySymbolReference;
    Size: LibrarySymbolReference;
    StackBehaviourPop: LibrarySymbolReference;
    StackBehaviourPush: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  OpCodeType: LibrarySymbolReference & {
    Annotation: LibrarySymbolReference;
    Macro: LibrarySymbolReference;
    Nternal: LibrarySymbolReference;
    Objmodel: LibrarySymbolReference;
    Prefix: LibrarySymbolReference;
    Primitive: LibrarySymbolReference
  };
  OpCodes: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    And: LibrarySymbolReference;
    Arglist: LibrarySymbolReference;
    Beq: LibrarySymbolReference;
    Bge: LibrarySymbolReference;
    Bgt: LibrarySymbolReference;
    Ble: LibrarySymbolReference;
    Blt: LibrarySymbolReference;
    Box: LibrarySymbolReference;
    Br: LibrarySymbolReference;
    Break: LibrarySymbolReference;
    Brfalse: LibrarySymbolReference;
    Brtrue: LibrarySymbolReference;
    Call: LibrarySymbolReference;
    Calli: LibrarySymbolReference;
    Callvirt: LibrarySymbolReference;
    Castclass: LibrarySymbolReference;
    Ceq: LibrarySymbolReference;
    Cgt: LibrarySymbolReference;
    Ckfinite: LibrarySymbolReference;
    Clt: LibrarySymbolReference;
    Constrained: LibrarySymbolReference;
    Cpblk: LibrarySymbolReference;
    Cpobj: LibrarySymbolReference;
    Div: LibrarySymbolReference;
    Dup: LibrarySymbolReference;
    Endfilter: LibrarySymbolReference;
    Endfinally: LibrarySymbolReference;
    Initblk: LibrarySymbolReference;
    Initobj: LibrarySymbolReference;
    Isinst: LibrarySymbolReference;
    Jmp: LibrarySymbolReference;
    Ldarg: LibrarySymbolReference;
    Ldarga: LibrarySymbolReference;
    Ldelem: LibrarySymbolReference;
    Ldelema: LibrarySymbolReference;
    Ldfld: LibrarySymbolReference;
    Ldflda: LibrarySymbolReference;
    Ldftn: LibrarySymbolReference;
    Ldlen: LibrarySymbolReference;
    Ldloc: LibrarySymbolReference;
    Ldloca: LibrarySymbolReference;
    Ldnull: LibrarySymbolReference;
    Ldobj: LibrarySymbolReference;
    Ldsfld: LibrarySymbolReference;
    Ldsflda: LibrarySymbolReference;
    Ldstr: LibrarySymbolReference;
    Ldtoken: LibrarySymbolReference;
    Ldvirtftn: LibrarySymbolReference;
    Leave: LibrarySymbolReference;
    Localloc: LibrarySymbolReference;
    Mkrefany: LibrarySymbolReference;
    Mul: LibrarySymbolReference;
    Neg: LibrarySymbolReference;
    Newarr: LibrarySymbolReference;
    Newobj: LibrarySymbolReference;
    Nop: LibrarySymbolReference;
    Not: LibrarySymbolReference;
    Or: LibrarySymbolReference;
    Pop: LibrarySymbolReference;
    Prefix1: LibrarySymbolReference;
    Prefix2: LibrarySymbolReference;
    Prefix3: LibrarySymbolReference;
    Prefix4: LibrarySymbolReference;
    Prefix5: LibrarySymbolReference;
    Prefix6: LibrarySymbolReference;
    Prefix7: LibrarySymbolReference;
    Prefixref: LibrarySymbolReference;
    Readonly: LibrarySymbolReference;
    Refanytype: LibrarySymbolReference;
    Refanyval: LibrarySymbolReference;
    Rem: LibrarySymbolReference;
    Ret: LibrarySymbolReference;
    Rethrow: LibrarySymbolReference;
    Shl: LibrarySymbolReference;
    Shr: LibrarySymbolReference;
    Sizeof: LibrarySymbolReference;
    Starg: LibrarySymbolReference;
    Stelem: LibrarySymbolReference;
    Stfld: LibrarySymbolReference;
    Stloc: LibrarySymbolReference;
    Stobj: LibrarySymbolReference;
    Stsfld: LibrarySymbolReference;
    Sub: LibrarySymbolReference;
    Switch: LibrarySymbolReference;
    Tailcall: LibrarySymbolReference;
    Throw: LibrarySymbolReference;
    Unaligned: LibrarySymbolReference;
    Unbox: LibrarySymbolReference;
    Volatile: LibrarySymbolReference;
    Xor: LibrarySymbolReference;
    TakesSingleByteArgument: LibrarySymbolReference
  };
  OperandType: LibrarySymbolReference & {
    InlineBrTarget: LibrarySymbolReference;
    InlineField: LibrarySymbolReference;
    InlineI: LibrarySymbolReference;
    InlineI8: LibrarySymbolReference;
    InlineMethod: LibrarySymbolReference;
    InlineNone: LibrarySymbolReference;
    InlinePhi: LibrarySymbolReference;
    InlineR: LibrarySymbolReference;
    InlineSig: LibrarySymbolReference;
    InlineString: LibrarySymbolReference;
    InlineSwitch: LibrarySymbolReference;
    InlineTok: LibrarySymbolReference;
    InlineType: LibrarySymbolReference;
    InlineVar: LibrarySymbolReference;
    ShortInlineBrTarget: LibrarySymbolReference;
    ShortInlineI: LibrarySymbolReference;
    ShortInlineR: LibrarySymbolReference;
    ShortInlineVar: LibrarySymbolReference
  };
  PackingSize: LibrarySymbolReference & {
    Unspecified: LibrarySymbolReference;
    Size1: LibrarySymbolReference;
    Size2: LibrarySymbolReference;
    Size4: LibrarySymbolReference;
    Size8: LibrarySymbolReference;
    Size16: LibrarySymbolReference;
    Size32: LibrarySymbolReference;
    Size64: LibrarySymbolReference;
    Size128: LibrarySymbolReference
  };
  ParameterBuilder: LibrarySymbolReference & {
    ParameterBuilder: LibrarySymbolReference;
    SetConstant: LibrarySymbolReference;
    SetCustomAttribute: LibrarySymbolReference;
    SetCustomAttributeCore: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    IsIn: LibrarySymbolReference;
    IsOptional: LibrarySymbolReference;
    IsOut: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Position: LibrarySymbolReference
  };
  PersistedAssemblyBuilder: LibrarySymbolReference & {
    PersistedAssemblyBuilder: LibrarySymbolReference;
    DefineDynamicModuleCore: LibrarySymbolReference;
    GenerateMetadata: LibrarySymbolReference;
    GetDynamicModuleCore: LibrarySymbolReference;
    GetName: LibrarySymbolReference;
    Save: LibrarySymbolReference;
    SetCustomAttributeCore: LibrarySymbolReference;
    FullName: LibrarySymbolReference;
    ManifestModule: LibrarySymbolReference
  };
  PropertyBuilder: LibrarySymbolReference & {
    PropertyBuilder: LibrarySymbolReference;
    AddOtherMethod: LibrarySymbolReference;
    AddOtherMethodCore: LibrarySymbolReference;
    GetAccessors: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetGetMethod: LibrarySymbolReference;
    GetIndexParameters: LibrarySymbolReference;
    GetSetMethod: LibrarySymbolReference;
    GetValue: LibrarySymbolReference;
    IsDefined: LibrarySymbolReference;
    SetConstant: LibrarySymbolReference;
    SetConstantCore: LibrarySymbolReference;
    SetCustomAttribute: LibrarySymbolReference;
    SetCustomAttributeCore: LibrarySymbolReference;
    SetGetMethod: LibrarySymbolReference;
    SetGetMethodCore: LibrarySymbolReference;
    SetSetMethod: LibrarySymbolReference;
    SetSetMethodCore: LibrarySymbolReference;
    SetValue: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    DeclaringType: LibrarySymbolReference;
    Module: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    PropertyType: LibrarySymbolReference;
    ReflectedType: LibrarySymbolReference
  };
  SignatureHelper: LibrarySymbolReference & {
    AddArgument: LibrarySymbolReference;
    AddArguments: LibrarySymbolReference;
    AddSentinel: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetFieldSigHelper: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetLocalVarSigHelper: LibrarySymbolReference;
    GetMethodSigHelper: LibrarySymbolReference;
    GetPropertySigHelper: LibrarySymbolReference;
    GetSignature: LibrarySymbolReference;
    ToString: LibrarySymbolReference
  };
  StackBehaviour: LibrarySymbolReference & {
    Pop0: LibrarySymbolReference;
    Pop1: LibrarySymbolReference;
    Popi: LibrarySymbolReference;
    Popref: LibrarySymbolReference;
    Push0: LibrarySymbolReference;
    Push1: LibrarySymbolReference;
    Pushi: LibrarySymbolReference;
    Pushi8: LibrarySymbolReference;
    Pushr4: LibrarySymbolReference;
    Pushr8: LibrarySymbolReference;
    Pushref: LibrarySymbolReference;
    Varpop: LibrarySymbolReference;
    Varpush: LibrarySymbolReference
  };
  TypeBuilder: LibrarySymbolReference & {
    UnspecifiedTypeSize: LibrarySymbolReference;
    TypeBuilder: LibrarySymbolReference;
    AddInterfaceImplementation: LibrarySymbolReference;
    AddInterfaceImplementationCore: LibrarySymbolReference;
    CreateType: LibrarySymbolReference;
    CreateTypeInfo: LibrarySymbolReference;
    CreateTypeInfoCore: LibrarySymbolReference;
    DefineConstructor: LibrarySymbolReference;
    DefineConstructorCore: LibrarySymbolReference;
    DefineDefaultConstructor: LibrarySymbolReference;
    DefineDefaultConstructorCore: LibrarySymbolReference;
    DefineEvent: LibrarySymbolReference;
    DefineEventCore: LibrarySymbolReference;
    DefineField: LibrarySymbolReference;
    DefineFieldCore: LibrarySymbolReference;
    DefineGenericParameters: LibrarySymbolReference;
    DefineGenericParametersCore: LibrarySymbolReference;
    DefineInitializedData: LibrarySymbolReference;
    DefineInitializedDataCore: LibrarySymbolReference;
    DefineMethod: LibrarySymbolReference;
    DefineMethodCore: LibrarySymbolReference;
    DefineMethodOverride: LibrarySymbolReference;
    DefineMethodOverrideCore: LibrarySymbolReference;
    DefineNestedType: LibrarySymbolReference;
    DefineNestedTypeCore: LibrarySymbolReference;
    DefinePInvokeMethod: LibrarySymbolReference;
    DefinePInvokeMethodCore: LibrarySymbolReference;
    DefineProperty: LibrarySymbolReference;
    DefinePropertyCore: LibrarySymbolReference;
    DefineTypeInitializer: LibrarySymbolReference;
    DefineTypeInitializerCore: LibrarySymbolReference;
    DefineUninitializedData: LibrarySymbolReference;
    DefineUninitializedDataCore: LibrarySymbolReference;
    GetAttributeFlagsImpl: LibrarySymbolReference;
    GetConstructor: LibrarySymbolReference;
    GetConstructorImpl: LibrarySymbolReference;
    GetConstructors: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetElementType: LibrarySymbolReference;
    GetEvent: LibrarySymbolReference;
    GetEvents: LibrarySymbolReference;
    GetField: LibrarySymbolReference;
    GetFields: LibrarySymbolReference;
    GetGenericArguments: LibrarySymbolReference;
    GetGenericTypeDefinition: LibrarySymbolReference;
    GetInterface: LibrarySymbolReference;
    GetInterfaceMap: LibrarySymbolReference;
    GetInterfaces: LibrarySymbolReference;
    GetMember: LibrarySymbolReference;
    GetMembers: LibrarySymbolReference;
    GetMethod: LibrarySymbolReference;
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
    IsCreated: LibrarySymbolReference;
    IsCreatedCore: LibrarySymbolReference;
    IsDefined: LibrarySymbolReference;
    IsPointerImpl: LibrarySymbolReference;
    IsPrimitiveImpl: LibrarySymbolReference;
    IsSubclassOf: LibrarySymbolReference;
    MakeArrayType: LibrarySymbolReference;
    MakeByRefType: LibrarySymbolReference;
    MakeGenericType: LibrarySymbolReference;
    MakePointerType: LibrarySymbolReference;
    SetCustomAttribute: LibrarySymbolReference;
    SetCustomAttributeCore: LibrarySymbolReference;
    SetParent: LibrarySymbolReference;
    SetParentCore: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Assembly: LibrarySymbolReference;
    AssemblyQualifiedName: LibrarySymbolReference;
    BaseType: LibrarySymbolReference;
    DeclaringMethod: LibrarySymbolReference;
    DeclaringType: LibrarySymbolReference;
    FullName: LibrarySymbolReference;
    GenericParameterAttributes: LibrarySymbolReference;
    GenericParameterPosition: LibrarySymbolReference;
    GUID: LibrarySymbolReference;
    IsByRefLike: LibrarySymbolReference;
    IsConstructedGenericType: LibrarySymbolReference;
    IsGenericParameter: LibrarySymbolReference;
    IsGenericType: LibrarySymbolReference;
    IsGenericTypeDefinition: LibrarySymbolReference;
    IsSecurityCritical: LibrarySymbolReference;
    IsSecuritySafeCritical: LibrarySymbolReference;
    IsSecurityTransparent: LibrarySymbolReference;
    IsSZArray: LibrarySymbolReference;
    IsTypeDefinition: LibrarySymbolReference;
    MetadataToken: LibrarySymbolReference;
    Module: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    PackingSize: LibrarySymbolReference;
    PackingSizeCore: LibrarySymbolReference;
    ReflectedType: LibrarySymbolReference;
    Size: LibrarySymbolReference;
    SizeCore: LibrarySymbolReference;
    TypeHandle: LibrarySymbolReference;
    UnderlyingSystemType: LibrarySymbolReference
  }
};
const Emit: EmitLibrary = createLibrary("System.Reflection.Emit", {
  AssemblyBuilder: {
    kind: "class",
    members: {
      AssemblyBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      DefineDynamicAssembly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DefineDynamicModule: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineDynamicModuleCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCustomAttributesData: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDynamicModule: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDynamicModuleCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetExportedTypes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetFile: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetFiles: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLoadedModules: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetManifestResourceInfo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetManifestResourceNames: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetManifestResourceStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetModule: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetModules: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetReferencedAssemblies: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetSatelliteAssembly: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCustomAttributeCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CodeBase: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      EntryPoint: {
        kind: "property",
        type: () => {
          return Reflection.MethodInfo;
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
      HostContext: {
        kind: "property",
        type: () => {
          return System.Int64;
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
      IsDynamic: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      Location: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      ManifestModule: {
        kind: "property",
        type: () => {
          return Reflection.Module;
        },
        isOverride: true,
      },
      ReflectionOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  AssemblyBuilderAccess: {
    kind: "enum",
    members: {
      Run: {
        kind: "field",
        type: () => {
          return Emit.AssemblyBuilderAccess;
        },
      },
      RunAndCollect: {
        kind: "field",
        type: () => {
          return Emit.AssemblyBuilderAccess;
        },
      },
    },
  },
  ConstructorBuilder: {
    kind: "class",
    members: {
      ConstructorBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      DefineParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineParameterCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetILGenerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetILGeneratorCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetMethodImplementationFlags: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCustomAttributeCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetImplementationFlags: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetImplementationFlagsCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.MethodAttributes;
        },
        isOverride: true,
      },
      CallingConvention: {
        kind: "property",
        type: () => {
          return Reflection.CallingConventions;
        },
        isOverride: true,
      },
      DeclaringType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isOverride: true,
      },
      InitLocals: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      InitLocalsCore: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      MetadataToken: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      MethodHandle: {
        kind: "property",
        type: () => {
          return System.RuntimeMethodHandle;
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
      ReflectedType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  CustomAttributeBuilder: {
    kind: "class",
    members: {
      CustomAttributeBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  DynamicILInfo: {
    kind: "class",
    members: {
      GetTokenFor: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetExceptions: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetLocalSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      DynamicMethod: {
        kind: "property",
        type: () => {
          return Emit.DynamicMethod;
        },
      },
    },
    isSealed: true,
  },
  DynamicMethod: {
    kind: "class",
    members: {
      DynamicMethod: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateDelegate: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      DefineParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetBaseDefinition: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDynamicILInfo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetILGenerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMethodImplementationFlags: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.MethodAttributes;
        },
        isOverride: true,
      },
      CallingConvention: {
        kind: "property",
        type: () => {
          return Reflection.CallingConventions;
        },
        isOverride: true,
      },
      DeclaringType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isOverride: true,
      },
      InitLocals: {
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
        isOverride: true,
      },
      IsSecuritySafeCritical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsSecurityTransparent: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      MethodHandle: {
        kind: "property",
        type: () => {
          return System.RuntimeMethodHandle;
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
      ReflectedType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isOverride: true,
      },
      ReturnParameter: {
        kind: "property",
        type: () => {
          return Reflection.ParameterInfo;
        },
        isOverride: true,
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
      ReturnTypeCustomAttributes: {
        kind: "property",
        type: () => {
          return Reflection.ICustomAttributeProvider;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  EnumBuilder: {
    kind: "class",
    members: {
      EnumBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateType: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateTypeInfo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateTypeInfoCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineLiteral: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineLiteralCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
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
      GetEnumUnderlyingType: {
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
      MakeArrayType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MakeByRefType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MakePointerType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCustomAttributeCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
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
      DeclaringType: {
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
      IsConstructedGenericType: {
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
      ReflectedType: {
        kind: "property",
        type: () => {
          return System.Type;
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
      UnderlyingField: {
        kind: "property",
        type: () => {
          return Emit.FieldBuilder;
        },
      },
      UnderlyingFieldCore: {
        kind: "property",
        type: () => {
          return Emit.FieldBuilder;
        },
        isAbstract: true,
      },
      UnderlyingSystemType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  EventBuilder: {
    kind: "class",
    members: {
      EventBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddOtherMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddOtherMethodCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetAddOnMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAddOnMethodCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCustomAttributeCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetRaiseMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetRaiseMethodCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetRemoveOnMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetRemoveOnMethodCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  FieldBuilder: {
    kind: "class",
    members: {
      FieldBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetConstant: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetConstantCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCustomAttributeCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetOffset: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetOffsetCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetValue: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.FieldAttributes;
        },
        isOverride: true,
      },
      DeclaringType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isOverride: true,
      },
      FieldHandle: {
        kind: "property",
        type: () => {
          return System.RuntimeFieldHandle;
        },
        isOverride: true,
      },
      FieldType: {
        kind: "property",
        type: () => {
          return System.Type;
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
      ReflectedType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  FlowControl: {
    kind: "enum",
    members: {
      Branch: {
        kind: "field",
        type: () => {
          return Emit.FlowControl;
        },
      },
      Break: {
        kind: "field",
        type: () => {
          return Emit.FlowControl;
        },
      },
      Call: {
        kind: "field",
        type: () => {
          return Emit.FlowControl;
        },
      },
      Meta: {
        kind: "field",
        type: () => {
          return Emit.FlowControl;
        },
      },
      Next: {
        kind: "field",
        type: () => {
          return Emit.FlowControl;
        },
      },
      Phi: {
        kind: "field",
        type: () => {
          return Emit.FlowControl;
        },
      },
      Return: {
        kind: "field",
        type: () => {
          return Emit.FlowControl;
        },
      },
      Throw: {
        kind: "field",
        type: () => {
          return Emit.FlowControl;
        },
      },
    },
  },
  GenericTypeParameterBuilder: {
    kind: "class",
    members: {
      GenericTypeParameterBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
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
      GetGenericArguments: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetGenericTypeDefinition: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetHashCode: {
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
      IsSubclassOf: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValueTypeImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MakeArrayType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MakeByRefType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MakeGenericType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MakePointerType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetBaseTypeConstraint: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetBaseTypeConstraintCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCustomAttributeCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetGenericParameterAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetGenericParameterAttributesCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetInterfaceConstraints: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetInterfaceConstraintsCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
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
      ContainsGenericParameters: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      DeclaringMethod: {
        kind: "property",
        type: () => {
          return Reflection.MethodBase;
        },
        isNullable: true,
        isOverride: true,
      },
      DeclaringType: {
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
      GenericParameterAttributes: {
        kind: "property",
        type: () => {
          return Reflection.GenericParameterAttributes;
        },
        isOverride: true,
      },
      GenericParameterPosition: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
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
      IsConstructedGenericType: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsGenericParameter: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsGenericType: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsGenericTypeDefinition: {
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
      ReflectedType: {
        kind: "property",
        type: () => {
          return System.Type;
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
    isAbstract: true,
  },
  ILGenerator: {
    kind: "class",
    members: {
      ILGenerator: {
        kind: "method",
        methodKind: "constructor",
      },
      BeginCatchBlock: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      BeginExceptFilterBlock: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      BeginExceptionBlock: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      BeginFaultBlock: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      BeginFinallyBlock: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      BeginScope: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CreateLabel: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DeclareLocal: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DefineLabel: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Emit: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      EmitCall: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      EmitCalli: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      EmitWriteLine: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EndExceptionBlock: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      EndScope: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MarkLabel: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MarkSequencePoint: {
        kind: "method",
        methodKind: "ordinary",
      },
      MarkSequencePointCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ThrowException: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      UsingNamespace: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ILOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  Label: {
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
      Id: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  LocalBuilder: {
    kind: "class",
    members: {
      LocalBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      SetLocalSymInfo: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetLocalSymInfoCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsPinned: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      LocalIndex: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      LocalType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  MethodBuilder: {
    kind: "class",
    members: {
      MethodBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      DefineGenericParameters: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineGenericParametersCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineParameterCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetBaseDefinition: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetGenericArguments: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetGenericMethodDefinition: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetILGenerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetILGeneratorCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetMethodImplementationFlags: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MakeGenericMethod: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCustomAttributeCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetImplementationFlags: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetImplementationFlagsCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetParameters: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetReturnType: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetSignatureCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.MethodAttributes;
        },
        isOverride: true,
      },
      CallingConvention: {
        kind: "property",
        type: () => {
          return Reflection.CallingConventions;
        },
        isOverride: true,
      },
      ContainsGenericParameters: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      DeclaringType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isOverride: true,
      },
      InitLocals: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      InitLocalsCore: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      IsGenericMethod: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsGenericMethodDefinition: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsSecurityCritical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsSecuritySafeCritical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsSecurityTransparent: {
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
      MethodHandle: {
        kind: "property",
        type: () => {
          return System.RuntimeMethodHandle;
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
      ReflectedType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isOverride: true,
      },
      ReturnParameter: {
        kind: "property",
        type: () => {
          return Reflection.ParameterInfo;
        },
        isOverride: true,
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
      ReturnTypeCustomAttributes: {
        kind: "property",
        type: () => {
          return Reflection.ICustomAttributeProvider;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  ModuleBuilder: {
    kind: "class",
    members: {
      ModuleBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateGlobalFunctions: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateGlobalFunctionsCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineDocument: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineDocumentCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DefineEnum: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineEnumCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineGlobalMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineGlobalMethodCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineInitializedData: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineInitializedDataCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefinePInvokeMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefinePInvokeMethodCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineType: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineTypeCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineUninitializedData: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineUninitializedDataCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetArrayMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetArrayMethodCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCustomAttributesData: {
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
      GetFieldMetadataToken: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMethodImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMethodMetadataToken: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetMethods: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetPEKind: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetTypes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetTypeMetadataToken: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetSignatureMetadataToken: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetStringMetadataToken: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsResource: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ResolveField: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ResolveMember: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ResolveMethod: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ResolveSignature: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ResolveString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ResolveType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCustomAttributeCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Assembly: {
        kind: "property",
        type: () => {
          return Reflection.Assembly;
        },
        isOverride: true,
      },
      FullyQualifiedName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      MDStreamVersion: {
        kind: "property",
        type: () => {
          return System.Int32;
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
      ModuleVersionId: {
        kind: "property",
        type: () => {
          return System.Guid;
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
      ScopeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  OpCode: {
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
      EvaluationStackDelta: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      FlowControl: {
        kind: "property",
        type: () => {
          return Emit.FlowControl;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      OpCodeType: {
        kind: "property",
        type: () => {
          return Emit.OpCodeType;
        },
      },
      OperandType: {
        kind: "property",
        type: () => {
          return Emit.OperandType;
        },
      },
      Size: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      StackBehaviourPop: {
        kind: "property",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
      StackBehaviourPush: {
        kind: "property",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Int16;
        },
      },
    },
  },
  OpCodeType: {
    kind: "enum",
    members: {
      Annotation: {
        kind: "field",
        type: () => {
          return Emit.OpCodeType;
        },
      },
      Macro: {
        kind: "field",
        type: () => {
          return Emit.OpCodeType;
        },
      },
      Nternal: {
        kind: "field",
        type: () => {
          return Emit.OpCodeType;
        },
      },
      Objmodel: {
        kind: "field",
        type: () => {
          return Emit.OpCodeType;
        },
      },
      Prefix: {
        kind: "field",
        type: () => {
          return Emit.OpCodeType;
        },
      },
      Primitive: {
        kind: "field",
        type: () => {
          return Emit.OpCodeType;
        },
      },
    },
  },
  OpCodes: {
    kind: "class",
    members: {
      Add: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      And: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Arglist: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Beq: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Bge: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Bgt: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ble: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Blt: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Box: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Br: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Break: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Brfalse: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Brtrue: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Call: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Calli: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Callvirt: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Castclass: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ceq: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Cgt: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ckfinite: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Clt: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Constrained: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Cpblk: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Cpobj: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Div: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Dup: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Endfilter: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Endfinally: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Initblk: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Initobj: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Isinst: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Jmp: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldarg: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldarga: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldelem: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldelema: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldfld: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldflda: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldftn: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldlen: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldloc: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldloca: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldnull: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldobj: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldsfld: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldsflda: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldstr: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldtoken: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ldvirtftn: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Leave: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Localloc: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Mkrefany: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Mul: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Neg: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Newarr: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Newobj: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Nop: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Not: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Or: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Pop: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Prefix1: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Prefix2: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Prefix3: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Prefix4: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Prefix5: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Prefix6: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Prefix7: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Prefixref: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Readonly: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Refanytype: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Refanyval: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Rem: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ret: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Rethrow: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Shl: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Shr: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Sizeof: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Starg: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Stelem: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Stfld: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Stloc: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Stobj: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Stsfld: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Sub: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Switch: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Tailcall: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Throw: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Unaligned: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Unbox: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Volatile: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Xor: {
        kind: "field",
        type: () => {
          return Emit.OpCode;
        },
        isStatic: true,
        isReadOnly: true,
      },
      TakesSingleByteArgument: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  OperandType: {
    kind: "enum",
    members: {
      InlineBrTarget: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      InlineField: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      InlineI: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      InlineI8: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      InlineMethod: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      InlineNone: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      InlinePhi: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      InlineR: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      InlineSig: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      InlineString: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      InlineSwitch: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      InlineTok: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      InlineType: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      InlineVar: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      ShortInlineBrTarget: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      ShortInlineI: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      ShortInlineR: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
      ShortInlineVar: {
        kind: "field",
        type: () => {
          return Emit.OperandType;
        },
      },
    },
  },
  PackingSize: {
    kind: "enum",
    members: {
      Unspecified: {
        kind: "field",
        type: () => {
          return Emit.PackingSize;
        },
      },
      Size1: {
        kind: "field",
        type: () => {
          return Emit.PackingSize;
        },
      },
      Size2: {
        kind: "field",
        type: () => {
          return Emit.PackingSize;
        },
      },
      Size4: {
        kind: "field",
        type: () => {
          return Emit.PackingSize;
        },
      },
      Size8: {
        kind: "field",
        type: () => {
          return Emit.PackingSize;
        },
      },
      Size16: {
        kind: "field",
        type: () => {
          return Emit.PackingSize;
        },
      },
      Size32: {
        kind: "field",
        type: () => {
          return Emit.PackingSize;
        },
      },
      Size64: {
        kind: "field",
        type: () => {
          return Emit.PackingSize;
        },
      },
      Size128: {
        kind: "field",
        type: () => {
          return Emit.PackingSize;
        },
      },
    },
  },
  ParameterBuilder: {
    kind: "class",
    members: {
      ParameterBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      SetConstant: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCustomAttributeCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsIn: {
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
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      Position: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  PersistedAssemblyBuilder: {
    kind: "class",
    members: {
      PersistedAssemblyBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      DefineDynamicModuleCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GenerateMetadata: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDynamicModuleCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Save: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCustomAttributeCore: {
        kind: "method",
        methodKind: "ordinary",
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
      ManifestModule: {
        kind: "property",
        type: () => {
          return Reflection.Module;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  PropertyBuilder: {
    kind: "class",
    members: {
      PropertyBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddOtherMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddOtherMethodCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetAccessors: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetGetMethod: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetIndexParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetSetMethod: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetConstant: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetConstantCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCustomAttributeCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetGetMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetGetMethodCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetSetMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetSetMethodCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetValue: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.PropertyAttributes;
        },
        isOverride: true,
      },
      CanRead: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      CanWrite: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      DeclaringType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
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
      PropertyType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
      ReflectedType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  SignatureHelper: {
    kind: "class",
    members: {
      AddArgument: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddArguments: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddSentinel: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetFieldSigHelper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLocalVarSigHelper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetMethodSigHelper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetPropertySigHelper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  StackBehaviour: {
    kind: "enum",
    members: {
      Pop0: {
        kind: "field",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
      Pop1: {
        kind: "field",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
      Popi: {
        kind: "field",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
      Popref: {
        kind: "field",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
      Push0: {
        kind: "field",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
      Push1: {
        kind: "field",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
      Pushi: {
        kind: "field",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
      Pushi8: {
        kind: "field",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
      Pushr4: {
        kind: "field",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
      Pushr8: {
        kind: "field",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
      Pushref: {
        kind: "field",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
      Varpop: {
        kind: "field",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
      Varpush: {
        kind: "field",
        type: () => {
          return Emit.StackBehaviour;
        },
      },
    },
  },
  TypeBuilder: {
    kind: "class",
    members: {
      UnspecifiedTypeSize: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      TypeBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddInterfaceImplementation: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddInterfaceImplementationCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CreateType: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateTypeInfo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateTypeInfoCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineConstructor: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineConstructorCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineDefaultConstructor: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineDefaultConstructorCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineEvent: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineEventCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineField: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineFieldCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineGenericParameters: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineGenericParametersCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineInitializedData: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineInitializedDataCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineMethodCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineMethodOverride: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineMethodOverrideCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineNestedType: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineNestedTypeCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefinePInvokeMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefinePInvokeMethodCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefinePropertyCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineTypeInitializer: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineTypeInitializerCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DefineUninitializedData: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineUninitializedDataCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetAttributeFlagsImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetConstructor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      GetGenericArguments: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetGenericTypeDefinition: {
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
      GetMethod: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      IsCreated: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsCreatedCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
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
      IsSubclassOf: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MakeArrayType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MakeByRefType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MakeGenericType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MakePointerType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCustomAttributeCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetParent: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetParentCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
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
      DeclaringMethod: {
        kind: "property",
        type: () => {
          return Reflection.MethodBase;
        },
        isNullable: true,
        isOverride: true,
      },
      DeclaringType: {
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
      GenericParameterAttributes: {
        kind: "property",
        type: () => {
          return Reflection.GenericParameterAttributes;
        },
        isOverride: true,
      },
      GenericParameterPosition: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
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
      IsConstructedGenericType: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsGenericParameter: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsGenericType: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsGenericTypeDefinition: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsSecurityCritical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsSecuritySafeCritical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsSecurityTransparent: {
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
      PackingSize: {
        kind: "property",
        type: () => {
          return Emit.PackingSize;
        },
      },
      PackingSizeCore: {
        kind: "property",
        type: () => {
          return Emit.PackingSize;
        },
        isAbstract: true,
      },
      ReflectedType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isOverride: true,
      },
      Size: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SizeCore: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
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
    isAbstract: true,
  },
});
export default Emit
