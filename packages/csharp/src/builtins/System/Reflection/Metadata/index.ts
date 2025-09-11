import Immutable from "../../Collections/Immutable/index.js";
import System from "../../index.js";
import Reflection from "../index.js";
import Text from "../../Text/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Ecma335 } from "./Ecma335/index.js";

type MetadataLibrary = LibrarySymbolReference & {
  ArrayShape: LibrarySymbolReference & {
    ArrayShape: LibrarySymbolReference;
    LowerBounds: LibrarySymbolReference;
    Rank: LibrarySymbolReference;
    Sizes: LibrarySymbolReference
  };
  AssemblyDefinition: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    GetDeclarativeSecurityAttributes: LibrarySymbolReference;
    GetAssemblyName: LibrarySymbolReference;
    Culture: LibrarySymbolReference;
    Flags: LibrarySymbolReference;
    HashAlgorithm: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    PublicKey: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  AssemblyDefinitionHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  AssemblyExtensions: LibrarySymbolReference & {
    TryGetRawMetadata: LibrarySymbolReference
  };
  AssemblyFile: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    ContainsMetadata: LibrarySymbolReference;
    HashValue: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  AssemblyFileHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  AssemblyFileHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  AssemblyNameInfo: LibrarySymbolReference & {
    AssemblyNameInfo: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToAssemblyName: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    CultureName: LibrarySymbolReference;
    Flags: LibrarySymbolReference;
    FullName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    PublicKeyOrToken: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  AssemblyReference: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    GetAssemblyName: LibrarySymbolReference;
    Culture: LibrarySymbolReference;
    Flags: LibrarySymbolReference;
    HashValue: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    PublicKeyOrToken: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  AssemblyReferenceHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  AssemblyReferenceHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  Blob: LibrarySymbolReference & {
    GetBytes: LibrarySymbolReference;
    IsDefault: LibrarySymbolReference;
    Length: LibrarySymbolReference
  };
  BlobBuilder: LibrarySymbolReference & {
    Blobs: LibrarySymbolReference & {
      GetEnumerator: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Reset: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  BlobContentId: LibrarySymbolReference & {
    BlobContentId: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    FromHash: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetTimeBasedProvider: LibrarySymbolReference;
    Guid: LibrarySymbolReference;
    IsDefault: LibrarySymbolReference;
    Stamp: LibrarySymbolReference
  };
  BlobHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  BlobReader: LibrarySymbolReference & {
    BlobReader: LibrarySymbolReference;
    Align: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    ReadBlobHandle: LibrarySymbolReference;
    ReadBoolean: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    ReadBytes: LibrarySymbolReference;
    ReadChar: LibrarySymbolReference;
    ReadCompressedInteger: LibrarySymbolReference;
    ReadCompressedSignedInteger: LibrarySymbolReference;
    ReadConstant: LibrarySymbolReference;
    ReadDateTime: LibrarySymbolReference;
    ReadDecimal: LibrarySymbolReference;
    ReadDouble: LibrarySymbolReference;
    ReadGuid: LibrarySymbolReference;
    ReadInt16: LibrarySymbolReference;
    ReadInt32: LibrarySymbolReference;
    ReadInt64: LibrarySymbolReference;
    ReadSByte: LibrarySymbolReference;
    ReadSerializationTypeCode: LibrarySymbolReference;
    ReadSerializedString: LibrarySymbolReference;
    ReadSignatureHeader: LibrarySymbolReference;
    ReadSignatureTypeCode: LibrarySymbolReference;
    ReadSingle: LibrarySymbolReference;
    ReadTypeHandle: LibrarySymbolReference;
    ReadUInt16: LibrarySymbolReference;
    ReadUInt32: LibrarySymbolReference;
    ReadUInt64: LibrarySymbolReference;
    ReadUTF16: LibrarySymbolReference;
    ReadUTF8: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    TryReadCompressedInteger: LibrarySymbolReference;
    TryReadCompressedSignedInteger: LibrarySymbolReference;
    CurrentPointer: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Offset: LibrarySymbolReference;
    RemainingBytes: LibrarySymbolReference;
    StartPointer: LibrarySymbolReference
  };
  BlobWriter: LibrarySymbolReference & {
    BlobWriter: LibrarySymbolReference;
    Align: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    ContentEquals: LibrarySymbolReference;
    PadTo: LibrarySymbolReference;
    ToArray: LibrarySymbolReference;
    ToImmutableArray: LibrarySymbolReference;
    WriteBoolean: LibrarySymbolReference;
    WriteByte: LibrarySymbolReference;
    WriteBytes: LibrarySymbolReference;
    WriteCompressedInteger: LibrarySymbolReference;
    WriteCompressedSignedInteger: LibrarySymbolReference;
    WriteConstant: LibrarySymbolReference;
    WriteDateTime: LibrarySymbolReference;
    WriteDecimal: LibrarySymbolReference;
    WriteDouble: LibrarySymbolReference;
    WriteGuid: LibrarySymbolReference;
    WriteInt16: LibrarySymbolReference;
    WriteInt16BE: LibrarySymbolReference;
    WriteInt32: LibrarySymbolReference;
    WriteInt32BE: LibrarySymbolReference;
    WriteInt64: LibrarySymbolReference;
    WriteReference: LibrarySymbolReference;
    WriteSByte: LibrarySymbolReference;
    WriteSerializedString: LibrarySymbolReference;
    WriteSingle: LibrarySymbolReference;
    WriteUInt16: LibrarySymbolReference;
    WriteUInt16BE: LibrarySymbolReference;
    WriteUInt32: LibrarySymbolReference;
    WriteUInt32BE: LibrarySymbolReference;
    WriteUInt64: LibrarySymbolReference;
    WriteUserString: LibrarySymbolReference;
    WriteUTF16: LibrarySymbolReference;
    WriteUTF8: LibrarySymbolReference;
    Blob: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Offset: LibrarySymbolReference;
    RemainingBytes: LibrarySymbolReference
  };
  Constant: LibrarySymbolReference & {
    Parent: LibrarySymbolReference;
    TypeCode: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  ConstantHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  ConstantTypeCode: LibrarySymbolReference & {
    Invalid: LibrarySymbolReference;
    Boolean: LibrarySymbolReference;
    Char: LibrarySymbolReference;
    SByte: LibrarySymbolReference;
    Byte: LibrarySymbolReference;
    Int16: LibrarySymbolReference;
    UInt16: LibrarySymbolReference;
    Int32: LibrarySymbolReference;
    UInt32: LibrarySymbolReference;
    Int64: LibrarySymbolReference;
    UInt64: LibrarySymbolReference;
    Single: LibrarySymbolReference;
    Double: LibrarySymbolReference;
    String: LibrarySymbolReference;
    NullReference: LibrarySymbolReference
  };
  CustomAttribute: LibrarySymbolReference & {
    Constructor: LibrarySymbolReference;
    Parent: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  CustomAttributeHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  CustomAttributeHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  CustomAttributeNamedArgument: LibrarySymbolReference & {
    CustomAttributeNamedArgument: LibrarySymbolReference;
    Kind: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  CustomAttributeNamedArgumentKind: LibrarySymbolReference & {
    Field: LibrarySymbolReference;
    Property: LibrarySymbolReference
  };
  CustomAttributeTypedArgument: LibrarySymbolReference & {
    CustomAttributeTypedArgument: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  CustomAttributeValue: LibrarySymbolReference & {
    CustomAttributeValue: LibrarySymbolReference;
    FixedArguments: LibrarySymbolReference;
    NamedArguments: LibrarySymbolReference
  };
  CustomDebugInformation: LibrarySymbolReference & {
    Kind: LibrarySymbolReference;
    Parent: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  CustomDebugInformationHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  CustomDebugInformationHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  DebugMetadataHeader: LibrarySymbolReference & {
    EntryPoint: LibrarySymbolReference;
    Id: LibrarySymbolReference;
    IdStartOffset: LibrarySymbolReference
  };
  DeclarativeSecurityAttribute: LibrarySymbolReference & {
    Action: LibrarySymbolReference;
    Parent: LibrarySymbolReference;
    PermissionSet: LibrarySymbolReference
  };
  DeclarativeSecurityAttributeHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  DeclarativeSecurityAttributeHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  Document: LibrarySymbolReference & {
    Hash: LibrarySymbolReference;
    HashAlgorithm: LibrarySymbolReference;
    Language: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  DocumentHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  DocumentHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  DocumentNameBlobHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  EntityHandle: LibrarySymbolReference & {
    AssemblyDefinition: LibrarySymbolReference;
    ModuleDefinition: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference;
    Kind: LibrarySymbolReference
  };
  EventAccessors: LibrarySymbolReference & {
    Adder: LibrarySymbolReference;
    Others: LibrarySymbolReference;
    Raiser: LibrarySymbolReference;
    Remover: LibrarySymbolReference
  };
  EventDefinition: LibrarySymbolReference & {
    GetAccessors: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  EventDefinitionHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  EventDefinitionHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ExceptionRegion: LibrarySymbolReference & {
    CatchType: LibrarySymbolReference;
    FilterOffset: LibrarySymbolReference;
    HandlerLength: LibrarySymbolReference;
    HandlerOffset: LibrarySymbolReference;
    Kind: LibrarySymbolReference;
    TryLength: LibrarySymbolReference;
    TryOffset: LibrarySymbolReference
  };
  ExceptionRegionKind: LibrarySymbolReference & {
    Catch: LibrarySymbolReference;
    Filter: LibrarySymbolReference;
    Finally: LibrarySymbolReference;
    Fault: LibrarySymbolReference
  };
  ExportedType: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    Implementation: LibrarySymbolReference;
    IsForwarder: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    NamespaceDefinition: LibrarySymbolReference
  };
  ExportedTypeHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  ExportedTypeHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  FieldDefinition: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    GetDeclaringType: LibrarySymbolReference;
    GetDefaultValue: LibrarySymbolReference;
    GetMarshallingDescriptor: LibrarySymbolReference;
    GetOffset: LibrarySymbolReference;
    GetRelativeVirtualAddress: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Signature: LibrarySymbolReference
  };
  FieldDefinitionHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  FieldDefinitionHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  GenericParameter: LibrarySymbolReference & {
    GetConstraints: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    Index: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Parent: LibrarySymbolReference
  };
  GenericParameterConstraint: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    Parameter: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  GenericParameterConstraintHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  GenericParameterConstraintHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  GenericParameterHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  GenericParameterHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  GuidHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  Handle: LibrarySymbolReference & {
    AssemblyDefinition: LibrarySymbolReference;
    ModuleDefinition: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference;
    Kind: LibrarySymbolReference
  };
  HandleComparer: LibrarySymbolReference & {
    Compare: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Default: LibrarySymbolReference
  };
  HandleKind: LibrarySymbolReference & {
    ModuleDefinition: LibrarySymbolReference;
    TypeReference: LibrarySymbolReference;
    TypeDefinition: LibrarySymbolReference;
    FieldDefinition: LibrarySymbolReference;
    MethodDefinition: LibrarySymbolReference;
    Parameter: LibrarySymbolReference;
    InterfaceImplementation: LibrarySymbolReference;
    MemberReference: LibrarySymbolReference;
    Constant: LibrarySymbolReference;
    CustomAttribute: LibrarySymbolReference;
    DeclarativeSecurityAttribute: LibrarySymbolReference;
    StandaloneSignature: LibrarySymbolReference;
    EventDefinition: LibrarySymbolReference;
    PropertyDefinition: LibrarySymbolReference;
    MethodImplementation: LibrarySymbolReference;
    ModuleReference: LibrarySymbolReference;
    TypeSpecification: LibrarySymbolReference;
    AssemblyDefinition: LibrarySymbolReference;
    AssemblyReference: LibrarySymbolReference;
    AssemblyFile: LibrarySymbolReference;
    ExportedType: LibrarySymbolReference;
    ManifestResource: LibrarySymbolReference;
    GenericParameter: LibrarySymbolReference;
    MethodSpecification: LibrarySymbolReference;
    GenericParameterConstraint: LibrarySymbolReference;
    Document: LibrarySymbolReference;
    MethodDebugInformation: LibrarySymbolReference;
    LocalScope: LibrarySymbolReference;
    LocalVariable: LibrarySymbolReference;
    LocalConstant: LibrarySymbolReference;
    ImportScope: LibrarySymbolReference;
    CustomDebugInformation: LibrarySymbolReference;
    UserString: LibrarySymbolReference;
    Blob: LibrarySymbolReference;
    Guid: LibrarySymbolReference;
    String: LibrarySymbolReference;
    NamespaceDefinition: LibrarySymbolReference
  };
  IConstructedTypeProvider: LibrarySymbolReference & {
    GetArrayType: LibrarySymbolReference;
    GetByReferenceType: LibrarySymbolReference;
    GetGenericInstantiation: LibrarySymbolReference;
    GetPointerType: LibrarySymbolReference
  };
  ICustomAttributeTypeProvider: LibrarySymbolReference & {
    GetSystemType: LibrarySymbolReference;
    GetTypeFromSerializedName: LibrarySymbolReference;
    GetUnderlyingEnumType: LibrarySymbolReference;
    IsSystemType: LibrarySymbolReference
  };
  ILOpCode: LibrarySymbolReference & {
    Nop: LibrarySymbolReference;
    Break: LibrarySymbolReference;
    Ldnull: LibrarySymbolReference;
    Dup: LibrarySymbolReference;
    Pop: LibrarySymbolReference;
    Jmp: LibrarySymbolReference;
    Call: LibrarySymbolReference;
    Calli: LibrarySymbolReference;
    Ret: LibrarySymbolReference;
    Br: LibrarySymbolReference;
    Brfalse: LibrarySymbolReference;
    Brtrue: LibrarySymbolReference;
    Beq: LibrarySymbolReference;
    Bge: LibrarySymbolReference;
    Bgt: LibrarySymbolReference;
    Ble: LibrarySymbolReference;
    Blt: LibrarySymbolReference;
    Switch: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Sub: LibrarySymbolReference;
    Mul: LibrarySymbolReference;
    Div: LibrarySymbolReference;
    Rem: LibrarySymbolReference;
    And: LibrarySymbolReference;
    Or: LibrarySymbolReference;
    Xor: LibrarySymbolReference;
    Shl: LibrarySymbolReference;
    Shr: LibrarySymbolReference;
    Neg: LibrarySymbolReference;
    Not: LibrarySymbolReference;
    Callvirt: LibrarySymbolReference;
    Cpobj: LibrarySymbolReference;
    Ldobj: LibrarySymbolReference;
    Ldstr: LibrarySymbolReference;
    Newobj: LibrarySymbolReference;
    Castclass: LibrarySymbolReference;
    Isinst: LibrarySymbolReference;
    Unbox: LibrarySymbolReference;
    Throw: LibrarySymbolReference;
    Ldfld: LibrarySymbolReference;
    Ldflda: LibrarySymbolReference;
    Stfld: LibrarySymbolReference;
    Ldsfld: LibrarySymbolReference;
    Ldsflda: LibrarySymbolReference;
    Stsfld: LibrarySymbolReference;
    Stobj: LibrarySymbolReference;
    Box: LibrarySymbolReference;
    Newarr: LibrarySymbolReference;
    Ldlen: LibrarySymbolReference;
    Ldelema: LibrarySymbolReference;
    Ldelem: LibrarySymbolReference;
    Stelem: LibrarySymbolReference;
    Refanyval: LibrarySymbolReference;
    Ckfinite: LibrarySymbolReference;
    Mkrefany: LibrarySymbolReference;
    Ldtoken: LibrarySymbolReference;
    Endfinally: LibrarySymbolReference;
    Leave: LibrarySymbolReference;
    Arglist: LibrarySymbolReference;
    Ceq: LibrarySymbolReference;
    Cgt: LibrarySymbolReference;
    Clt: LibrarySymbolReference;
    Ldftn: LibrarySymbolReference;
    Ldvirtftn: LibrarySymbolReference;
    Ldarg: LibrarySymbolReference;
    Ldarga: LibrarySymbolReference;
    Starg: LibrarySymbolReference;
    Ldloc: LibrarySymbolReference;
    Ldloca: LibrarySymbolReference;
    Stloc: LibrarySymbolReference;
    Localloc: LibrarySymbolReference;
    Endfilter: LibrarySymbolReference;
    Unaligned: LibrarySymbolReference;
    Volatile: LibrarySymbolReference;
    Tail: LibrarySymbolReference;
    Initobj: LibrarySymbolReference;
    Constrained: LibrarySymbolReference;
    Cpblk: LibrarySymbolReference;
    Initblk: LibrarySymbolReference;
    Rethrow: LibrarySymbolReference;
    Sizeof: LibrarySymbolReference;
    Refanytype: LibrarySymbolReference;
    Readonly: LibrarySymbolReference
  };
  ILOpCodeExtensions: LibrarySymbolReference & {
    GetBranchOperandSize: LibrarySymbolReference;
    GetLongBranch: LibrarySymbolReference;
    GetShortBranch: LibrarySymbolReference;
    IsBranch: LibrarySymbolReference
  };
  ISZArrayTypeProvider: LibrarySymbolReference & {
    GetSZArrayType: LibrarySymbolReference
  };
  ISignatureTypeProvider: LibrarySymbolReference & {
    GetFunctionPointerType: LibrarySymbolReference;
    GetGenericMethodParameter: LibrarySymbolReference;
    GetGenericTypeParameter: LibrarySymbolReference;
    GetModifiedType: LibrarySymbolReference;
    GetPinnedType: LibrarySymbolReference;
    GetTypeFromSpecification: LibrarySymbolReference
  };
  ISimpleTypeProvider: LibrarySymbolReference & {
    GetPrimitiveType: LibrarySymbolReference;
    GetTypeFromDefinition: LibrarySymbolReference;
    GetTypeFromReference: LibrarySymbolReference
  };
  ImageFormatLimitationException: LibrarySymbolReference & {
    ImageFormatLimitationException: LibrarySymbolReference
  };
  ImportDefinition: LibrarySymbolReference & {
    Alias: LibrarySymbolReference;
    Kind: LibrarySymbolReference;
    TargetAssembly: LibrarySymbolReference;
    TargetNamespace: LibrarySymbolReference;
    TargetType: LibrarySymbolReference
  };
  ImportDefinitionCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Reset: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ImportDefinitionKind: LibrarySymbolReference & {
    ImportNamespace: LibrarySymbolReference;
    ImportAssemblyNamespace: LibrarySymbolReference;
    ImportType: LibrarySymbolReference;
    ImportXmlNamespace: LibrarySymbolReference;
    ImportAssemblyReferenceAlias: LibrarySymbolReference;
    AliasAssemblyReference: LibrarySymbolReference;
    AliasNamespace: LibrarySymbolReference;
    AliasAssemblyNamespace: LibrarySymbolReference;
    AliasType: LibrarySymbolReference
  };
  ImportScope: LibrarySymbolReference & {
    GetImports: LibrarySymbolReference;
    ImportsBlob: LibrarySymbolReference;
    Parent: LibrarySymbolReference
  };
  ImportScopeCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ImportScopeHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  InterfaceImplementation: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    Interface: LibrarySymbolReference
  };
  InterfaceImplementationHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  InterfaceImplementationHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  LocalConstant: LibrarySymbolReference & {
    Name: LibrarySymbolReference;
    Signature: LibrarySymbolReference
  };
  LocalConstantHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  LocalConstantHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  LocalScope: LibrarySymbolReference & {
    GetChildren: LibrarySymbolReference;
    GetLocalConstants: LibrarySymbolReference;
    GetLocalVariables: LibrarySymbolReference;
    EndOffset: LibrarySymbolReference;
    ImportScope: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    StartOffset: LibrarySymbolReference
  };
  LocalScopeHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  LocalScopeHandleCollection: LibrarySymbolReference & {
    ChildrenEnumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    };
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  LocalVariable: LibrarySymbolReference & {
    Attributes: LibrarySymbolReference;
    Index: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  LocalVariableAttributes: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    DebuggerHidden: LibrarySymbolReference
  };
  LocalVariableHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  LocalVariableHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ManifestResource: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    Implementation: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Offset: LibrarySymbolReference
  };
  ManifestResourceHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  ManifestResourceHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  MemberReference: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    GetKind: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Parent: LibrarySymbolReference;
    Signature: LibrarySymbolReference
  };
  MemberReferenceHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  MemberReferenceHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  MemberReferenceKind: LibrarySymbolReference & {
    Method: LibrarySymbolReference;
    Field: LibrarySymbolReference
  };
  MetadataKind: LibrarySymbolReference & {
    Ecma335: LibrarySymbolReference;
    WindowsMetadata: LibrarySymbolReference;
    ManagedWindowsMetadata: LibrarySymbolReference
  };
  MetadataReader: LibrarySymbolReference & {
    MetadataReader: LibrarySymbolReference;
    GetAssemblyDefinition: LibrarySymbolReference;
    GetAssemblyFile: LibrarySymbolReference;
    GetAssemblyName: LibrarySymbolReference;
    GetAssemblyReference: LibrarySymbolReference;
    GetBlobBytes: LibrarySymbolReference;
    GetBlobContent: LibrarySymbolReference;
    GetBlobReader: LibrarySymbolReference;
    GetConstant: LibrarySymbolReference;
    GetCustomAttribute: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetCustomDebugInformation: LibrarySymbolReference;
    GetDeclarativeSecurityAttribute: LibrarySymbolReference;
    GetDocument: LibrarySymbolReference;
    GetEventDefinition: LibrarySymbolReference;
    GetExportedType: LibrarySymbolReference;
    GetFieldDefinition: LibrarySymbolReference;
    GetGenericParameter: LibrarySymbolReference;
    GetGenericParameterConstraint: LibrarySymbolReference;
    GetGuid: LibrarySymbolReference;
    GetImportScope: LibrarySymbolReference;
    GetInterfaceImplementation: LibrarySymbolReference;
    GetLocalConstant: LibrarySymbolReference;
    GetLocalScope: LibrarySymbolReference;
    GetLocalScopes: LibrarySymbolReference;
    GetLocalVariable: LibrarySymbolReference;
    GetManifestResource: LibrarySymbolReference;
    GetMemberReference: LibrarySymbolReference;
    GetMethodDebugInformation: LibrarySymbolReference;
    GetMethodDefinition: LibrarySymbolReference;
    GetMethodImplementation: LibrarySymbolReference;
    GetMethodSpecification: LibrarySymbolReference;
    GetModuleDefinition: LibrarySymbolReference;
    GetModuleReference: LibrarySymbolReference;
    GetNamespaceDefinition: LibrarySymbolReference;
    GetNamespaceDefinitionRoot: LibrarySymbolReference;
    GetParameter: LibrarySymbolReference;
    GetPropertyDefinition: LibrarySymbolReference;
    GetStandaloneSignature: LibrarySymbolReference;
    GetString: LibrarySymbolReference;
    GetTypeDefinition: LibrarySymbolReference;
    GetTypeReference: LibrarySymbolReference;
    GetTypeSpecification: LibrarySymbolReference;
    GetUserString: LibrarySymbolReference;
    AssemblyFiles: LibrarySymbolReference;
    AssemblyReferences: LibrarySymbolReference;
    CustomAttributes: LibrarySymbolReference;
    CustomDebugInformation: LibrarySymbolReference;
    DebugMetadataHeader: LibrarySymbolReference;
    DeclarativeSecurityAttributes: LibrarySymbolReference;
    Documents: LibrarySymbolReference;
    EventDefinitions: LibrarySymbolReference;
    ExportedTypes: LibrarySymbolReference;
    FieldDefinitions: LibrarySymbolReference;
    ImportScopes: LibrarySymbolReference;
    IsAssembly: LibrarySymbolReference;
    LocalConstants: LibrarySymbolReference;
    LocalScopes: LibrarySymbolReference;
    LocalVariables: LibrarySymbolReference;
    ManifestResources: LibrarySymbolReference;
    MemberReferences: LibrarySymbolReference;
    MetadataKind: LibrarySymbolReference;
    MetadataLength: LibrarySymbolReference;
    MetadataPointer: LibrarySymbolReference;
    MetadataVersion: LibrarySymbolReference;
    MethodDebugInformation: LibrarySymbolReference;
    MethodDefinitions: LibrarySymbolReference;
    Options: LibrarySymbolReference;
    PropertyDefinitions: LibrarySymbolReference;
    StringComparer: LibrarySymbolReference;
    TypeDefinitions: LibrarySymbolReference;
    TypeReferences: LibrarySymbolReference;
    UTF8Decoder: LibrarySymbolReference
  };
  MetadataReaderOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    ApplyWindowsRuntimeProjections: LibrarySymbolReference;
    Default: LibrarySymbolReference
  };
  MetadataReaderProvider: LibrarySymbolReference & {
    Dispose: LibrarySymbolReference;
    FromMetadataImage: LibrarySymbolReference;
    FromMetadataStream: LibrarySymbolReference;
    FromPortablePdbImage: LibrarySymbolReference;
    FromPortablePdbStream: LibrarySymbolReference;
    GetMetadataReader: LibrarySymbolReference
  };
  MetadataStreamOptions: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    LeaveOpen: LibrarySymbolReference;
    PrefetchMetadata: LibrarySymbolReference
  };
  MetadataStringComparer: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    StartsWith: LibrarySymbolReference
  };
  MetadataStringDecoder: LibrarySymbolReference & {
    MetadataStringDecoder: LibrarySymbolReference;
    GetString: LibrarySymbolReference;
    DefaultUTF8: LibrarySymbolReference;
    Encoding: LibrarySymbolReference
  };
  MetadataUpdateHandlerAttribute: LibrarySymbolReference & {
    MetadataUpdateHandlerAttribute: LibrarySymbolReference;
    HandlerType: LibrarySymbolReference
  };
  MetadataUpdater: LibrarySymbolReference & {
    ApplyUpdate: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference
  };
  MethodBodyBlock: LibrarySymbolReference & {
    Create: LibrarySymbolReference;
    GetILBytes: LibrarySymbolReference;
    GetILContent: LibrarySymbolReference;
    GetILReader: LibrarySymbolReference;
    ExceptionRegions: LibrarySymbolReference;
    LocalSignature: LibrarySymbolReference;
    LocalVariablesInitialized: LibrarySymbolReference;
    MaxStack: LibrarySymbolReference;
    Size: LibrarySymbolReference
  };
  MethodDebugInformation: LibrarySymbolReference & {
    GetSequencePoints: LibrarySymbolReference;
    GetStateMachineKickoffMethod: LibrarySymbolReference;
    Document: LibrarySymbolReference;
    LocalSignature: LibrarySymbolReference;
    SequencePointsBlob: LibrarySymbolReference
  };
  MethodDebugInformationHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToDefinitionHandle: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  MethodDebugInformationHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  MethodDefinition: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    GetDeclarativeSecurityAttributes: LibrarySymbolReference;
    GetDeclaringType: LibrarySymbolReference;
    GetGenericParameters: LibrarySymbolReference;
    GetImport: LibrarySymbolReference;
    GetParameters: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    ImplAttributes: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    RelativeVirtualAddress: LibrarySymbolReference;
    Signature: LibrarySymbolReference
  };
  MethodDefinitionHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToDebugInformationHandle: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  MethodDefinitionHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  MethodImplementation: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    MethodBody: LibrarySymbolReference;
    MethodDeclaration: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  MethodImplementationHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  MethodImplementationHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  MethodImport: LibrarySymbolReference & {
    Attributes: LibrarySymbolReference;
    Module: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  MethodSignature: LibrarySymbolReference & {
    MethodSignature: LibrarySymbolReference;
    GenericParameterCount: LibrarySymbolReference;
    Header: LibrarySymbolReference;
    ParameterTypes: LibrarySymbolReference;
    RequiredParameterCount: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  };
  MethodSpecification: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    Signature: LibrarySymbolReference
  };
  MethodSpecificationHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  ModuleDefinition: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    BaseGenerationId: LibrarySymbolReference;
    Generation: LibrarySymbolReference;
    GenerationId: LibrarySymbolReference;
    Mvid: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  ModuleDefinitionHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  ModuleReference: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  ModuleReferenceHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  NamespaceDefinition: LibrarySymbolReference & {
    ExportedTypes: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NamespaceDefinitions: LibrarySymbolReference;
    Parent: LibrarySymbolReference;
    TypeDefinitions: LibrarySymbolReference
  };
  NamespaceDefinitionHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  Parameter: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    GetDefaultValue: LibrarySymbolReference;
    GetMarshallingDescriptor: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    SequenceNumber: LibrarySymbolReference
  };
  ParameterHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  ParameterHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  PrimitiveSerializationTypeCode: LibrarySymbolReference & {
    Boolean: LibrarySymbolReference;
    Char: LibrarySymbolReference;
    SByte: LibrarySymbolReference;
    Byte: LibrarySymbolReference;
    Int16: LibrarySymbolReference;
    UInt16: LibrarySymbolReference;
    Int32: LibrarySymbolReference;
    UInt32: LibrarySymbolReference;
    Int64: LibrarySymbolReference;
    UInt64: LibrarySymbolReference;
    Single: LibrarySymbolReference;
    Double: LibrarySymbolReference;
    String: LibrarySymbolReference
  };
  PrimitiveTypeCode: LibrarySymbolReference & {
    Void: LibrarySymbolReference;
    Boolean: LibrarySymbolReference;
    Char: LibrarySymbolReference;
    SByte: LibrarySymbolReference;
    Byte: LibrarySymbolReference;
    Int16: LibrarySymbolReference;
    UInt16: LibrarySymbolReference;
    Int32: LibrarySymbolReference;
    UInt32: LibrarySymbolReference;
    Int64: LibrarySymbolReference;
    UInt64: LibrarySymbolReference;
    Single: LibrarySymbolReference;
    Double: LibrarySymbolReference;
    String: LibrarySymbolReference;
    TypedReference: LibrarySymbolReference;
    IntPtr: LibrarySymbolReference;
    UIntPtr: LibrarySymbolReference;
    Object: LibrarySymbolReference
  };
  PropertyAccessors: LibrarySymbolReference & {
    Getter: LibrarySymbolReference;
    Others: LibrarySymbolReference;
    Setter: LibrarySymbolReference
  };
  PropertyDefinition: LibrarySymbolReference & {
    GetAccessors: LibrarySymbolReference;
    GetCustomAttributes: LibrarySymbolReference;
    GetDefaultValue: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Signature: LibrarySymbolReference
  };
  PropertyDefinitionHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  PropertyDefinitionHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ReservedBlob: LibrarySymbolReference & {
    CreateWriter: LibrarySymbolReference;
    Content: LibrarySymbolReference;
    Handle: LibrarySymbolReference
  };
  SequencePoint: LibrarySymbolReference & {
    HiddenLine: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Document: LibrarySymbolReference;
    EndColumn: LibrarySymbolReference;
    EndLine: LibrarySymbolReference;
    IsHidden: LibrarySymbolReference;
    Offset: LibrarySymbolReference;
    StartColumn: LibrarySymbolReference;
    StartLine: LibrarySymbolReference
  };
  SequencePointCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Reset: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  SerializationTypeCode: LibrarySymbolReference & {
    Invalid: LibrarySymbolReference;
    Boolean: LibrarySymbolReference;
    Char: LibrarySymbolReference;
    SByte: LibrarySymbolReference;
    Byte: LibrarySymbolReference;
    Int16: LibrarySymbolReference;
    UInt16: LibrarySymbolReference;
    Int32: LibrarySymbolReference;
    UInt32: LibrarySymbolReference;
    Int64: LibrarySymbolReference;
    UInt64: LibrarySymbolReference;
    Single: LibrarySymbolReference;
    Double: LibrarySymbolReference;
    String: LibrarySymbolReference;
    SZArray: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    TaggedObject: LibrarySymbolReference;
    Enum: LibrarySymbolReference
  };
  SignatureAttributes: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Generic: LibrarySymbolReference;
    Instance: LibrarySymbolReference;
    ExplicitThis: LibrarySymbolReference
  };
  SignatureCallingConvention: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    CDecl: LibrarySymbolReference;
    StdCall: LibrarySymbolReference;
    ThisCall: LibrarySymbolReference;
    FastCall: LibrarySymbolReference;
    VarArgs: LibrarySymbolReference;
    Unmanaged: LibrarySymbolReference
  };
  SignatureHeader: LibrarySymbolReference & {
    CallingConventionOrKindMask: LibrarySymbolReference;
    SignatureHeader: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    CallingConvention: LibrarySymbolReference;
    HasExplicitThis: LibrarySymbolReference;
    IsGeneric: LibrarySymbolReference;
    IsInstance: LibrarySymbolReference;
    Kind: LibrarySymbolReference;
    RawValue: LibrarySymbolReference
  };
  SignatureKind: LibrarySymbolReference & {
    Method: LibrarySymbolReference;
    Field: LibrarySymbolReference;
    LocalVariables: LibrarySymbolReference;
    Property: LibrarySymbolReference;
    MethodSpecification: LibrarySymbolReference
  };
  SignatureTypeCode: LibrarySymbolReference & {
    Invalid: LibrarySymbolReference;
    Void: LibrarySymbolReference;
    Boolean: LibrarySymbolReference;
    Char: LibrarySymbolReference;
    SByte: LibrarySymbolReference;
    Byte: LibrarySymbolReference;
    Int16: LibrarySymbolReference;
    UInt16: LibrarySymbolReference;
    Int32: LibrarySymbolReference;
    UInt32: LibrarySymbolReference;
    Int64: LibrarySymbolReference;
    UInt64: LibrarySymbolReference;
    Single: LibrarySymbolReference;
    Double: LibrarySymbolReference;
    String: LibrarySymbolReference;
    Pointer: LibrarySymbolReference;
    ByReference: LibrarySymbolReference;
    GenericTypeParameter: LibrarySymbolReference;
    Array: LibrarySymbolReference;
    GenericTypeInstance: LibrarySymbolReference;
    TypedReference: LibrarySymbolReference;
    IntPtr: LibrarySymbolReference;
    UIntPtr: LibrarySymbolReference;
    FunctionPointer: LibrarySymbolReference;
    Object: LibrarySymbolReference;
    SZArray: LibrarySymbolReference;
    GenericMethodParameter: LibrarySymbolReference;
    RequiredModifier: LibrarySymbolReference;
    OptionalModifier: LibrarySymbolReference;
    TypeHandle: LibrarySymbolReference;
    Sentinel: LibrarySymbolReference;
    Pinned: LibrarySymbolReference
  };
  SignatureTypeKind: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    ValueType: LibrarySymbolReference;
    Class: LibrarySymbolReference
  };
  StandaloneSignature: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    GetKind: LibrarySymbolReference;
    Signature: LibrarySymbolReference
  };
  StandaloneSignatureHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  StandaloneSignatureKind: LibrarySymbolReference & {
    Method: LibrarySymbolReference;
    LocalVariables: LibrarySymbolReference
  };
  StringHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  TypeDefinition: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    GetDeclarativeSecurityAttributes: LibrarySymbolReference;
    GetDeclaringType: LibrarySymbolReference;
    GetEvents: LibrarySymbolReference;
    GetFields: LibrarySymbolReference;
    GetGenericParameters: LibrarySymbolReference;
    GetInterfaceImplementations: LibrarySymbolReference;
    GetLayout: LibrarySymbolReference;
    GetMethodImplementations: LibrarySymbolReference;
    GetMethods: LibrarySymbolReference;
    GetNestedTypes: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    BaseType: LibrarySymbolReference;
    IsNested: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    NamespaceDefinition: LibrarySymbolReference
  };
  TypeDefinitionHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  TypeDefinitionHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  TypeLayout: LibrarySymbolReference & {
    TypeLayout: LibrarySymbolReference;
    IsDefault: LibrarySymbolReference;
    PackingSize: LibrarySymbolReference;
    Size: LibrarySymbolReference
  };
  TypeName: LibrarySymbolReference & {
    GetArrayRank: LibrarySymbolReference;
    GetElementType: LibrarySymbolReference;
    GetGenericArguments: LibrarySymbolReference;
    GetGenericTypeDefinition: LibrarySymbolReference;
    GetNodeCount: LibrarySymbolReference;
    MakeArrayTypeName: LibrarySymbolReference;
    MakeByRefTypeName: LibrarySymbolReference;
    MakeGenericTypeName: LibrarySymbolReference;
    MakePointerTypeName: LibrarySymbolReference;
    MakeSZArrayTypeName: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    WithAssemblyName: LibrarySymbolReference;
    AssemblyName: LibrarySymbolReference;
    AssemblyQualifiedName: LibrarySymbolReference;
    DeclaringType: LibrarySymbolReference;
    FullName: LibrarySymbolReference;
    IsArray: LibrarySymbolReference;
    IsByRef: LibrarySymbolReference;
    IsConstructedGenericType: LibrarySymbolReference;
    IsNested: LibrarySymbolReference;
    IsPointer: LibrarySymbolReference;
    IsSimple: LibrarySymbolReference;
    IsSZArray: LibrarySymbolReference;
    IsVariableBoundArrayType: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  TypeNameParseOptions: LibrarySymbolReference & {
    TypeNameParseOptions: LibrarySymbolReference;
    MaxNodes: LibrarySymbolReference
  };
  TypeReference: LibrarySymbolReference & {
    Name: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    ResolutionScope: LibrarySymbolReference
  };
  TypeReferenceHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  TypeReferenceHandleCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  TypeSpecification: LibrarySymbolReference & {
    GetCustomAttributes: LibrarySymbolReference;
    Signature: LibrarySymbolReference
  };
  TypeSpecificationHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  UserStringHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  }
};
const Metadata: MetadataLibrary = createLibrary("System.Reflection.Metadata", {
  ArrayShape: {
    kind: "struct",
    members: {
      ArrayShape: {
        kind: "method",
        methodKind: "constructor",
      },
      LowerBounds: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
      Rank: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Sizes: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
    },
  },
  AssemblyDefinition: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDeclarativeSecurityAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAssemblyName: {
        kind: "method",
        methodKind: "ordinary",
      },
      Culture: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      Flags: {
        kind: "property",
        type: () => {
          return Reflection.AssemblyFlags;
        },
      },
      HashAlgorithm: {
        kind: "property",
        type: () => {
          return Reflection.AssemblyHashAlgorithm;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      PublicKey: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
      Version: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
    },
  },
  AssemblyDefinitionHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  AssemblyExtensions: {
    kind: "class",
    members: {
      TryGetRawMetadata: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  AssemblyFile: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      ContainsMetadata: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      HashValue: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
    },
  },
  AssemblyFileHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  AssemblyFileHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.AssemblyFileHandle;
            },
          },
        },
      },
    },
  },
  AssemblyNameInfo: {
    kind: "class",
    members: {
      AssemblyNameInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToAssemblyName: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CultureName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
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
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      PublicKeyOrToken: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
      Version: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
    },
    isSealed: true,
  },
  AssemblyReference: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAssemblyName: {
        kind: "method",
        methodKind: "ordinary",
      },
      Culture: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      Flags: {
        kind: "property",
        type: () => {
          return Reflection.AssemblyFlags;
        },
      },
      HashValue: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      PublicKeyOrToken: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
      Version: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
    },
  },
  AssemblyReferenceHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  AssemblyReferenceHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.AssemblyReferenceHandle;
            },
          },
        },
      },
    },
  },
  Blob: {
    kind: "struct",
    members: {
      GetBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsDefault: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  BlobBuilder: {
    kind: "class",
    members: {
      Blobs: {
        kind: "struct",
        members: {
          GetEnumerator: {
            kind: "method",
            methodKind: "ordinary",
          },
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Reset: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.Blob;
            },
          },
        },
      },
    },
  },
  BlobContentId: {
    kind: "struct",
    members: {
      BlobContentId: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FromHash: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetTimeBasedProvider: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Guid: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      IsDefault: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Stamp: {
        kind: "property",
        type: () => {
          return System.UInt32;
        },
      },
    },
  },
  BlobHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  BlobReader: {
    kind: "struct",
    members: {
      BlobReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Align: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadBlobHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadChar: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadCompressedInteger: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadCompressedSignedInteger: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadConstant: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadDateTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadGuid: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadSByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadSerializationTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadSerializedString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadSignatureHeader: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadSignatureTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadTypeHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadUInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadUInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadUInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadUTF16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadUTF8: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadCompressedInteger: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadCompressedSignedInteger: {
        kind: "method",
        methodKind: "ordinary",
      },
      CurrentPointer: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Offset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      RemainingBytes: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      StartPointer: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
    },
  },
  BlobWriter: {
    kind: "struct",
    members: {
      BlobWriter: {
        kind: "method",
        methodKind: "constructor",
      },
      Align: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      ContentEquals: {
        kind: "method",
        methodKind: "ordinary",
      },
      PadTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToImmutableArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteCompressedInteger: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteCompressedSignedInteger: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteConstant: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteDateTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteGuid: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteInt16BE: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteInt32BE: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteSByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteSerializedString: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteUInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteUInt16BE: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteUInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteUInt32BE: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteUInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteUserString: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteUTF16: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteUTF8: {
        kind: "method",
        methodKind: "ordinary",
      },
      Blob: {
        kind: "property",
        type: () => {
          return Metadata.Blob;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Offset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      RemainingBytes: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  Constant: {
    kind: "struct",
    members: {
      Parent: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
      TypeCode: {
        kind: "property",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
    },
  },
  ConstantHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ConstantTypeCode: {
    kind: "enum",
    members: {
      Invalid: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      Boolean: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      Char: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      SByte: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      Byte: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      Int16: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      UInt16: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      Int32: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      UInt32: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      Int64: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      UInt64: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      Single: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      Double: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
      NullReference: {
        kind: "field",
        type: () => {
          return Metadata.ConstantTypeCode;
        },
      },
    },
  },
  CustomAttribute: {
    kind: "struct",
    members: {
      Constructor: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
      Parent: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
    },
  },
  CustomAttributeHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  CustomAttributeHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.CustomAttributeHandle;
            },
          },
        },
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
      Kind: {
        kind: "property",
        type: () => {
          return Metadata.CustomAttributeNamedArgumentKind;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Type: {
        kind: "property",
        type: undefined,
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
  CustomAttributeNamedArgumentKind: {
    kind: "enum",
    members: {
      Field: {
        kind: "field",
        type: () => {
          return Metadata.CustomAttributeNamedArgumentKind;
        },
      },
      Property: {
        kind: "field",
        type: () => {
          return Metadata.CustomAttributeNamedArgumentKind;
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
      Type: {
        kind: "property",
        type: undefined,
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
  CustomAttributeValue: {
    kind: "struct",
    members: {
      CustomAttributeValue: {
        kind: "method",
        methodKind: "constructor",
      },
      FixedArguments: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
      NamedArguments: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
    },
  },
  CustomDebugInformation: {
    kind: "struct",
    members: {
      Kind: {
        kind: "property",
        type: () => {
          return Metadata.GuidHandle;
        },
      },
      Parent: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
    },
  },
  CustomDebugInformationHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  CustomDebugInformationHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.CustomDebugInformationHandle;
            },
          },
        },
      },
    },
  },
  DebugMetadataHeader: {
    kind: "class",
    members: {
      EntryPoint: {
        kind: "property",
        type: () => {
          return Metadata.MethodDefinitionHandle;
        },
      },
      Id: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
      IdStartOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  DeclarativeSecurityAttribute: {
    kind: "struct",
    members: {
      Action: {
        kind: "property",
        type: () => {
          return Reflection.DeclarativeSecurityAction;
        },
      },
      Parent: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
      PermissionSet: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
    },
  },
  DeclarativeSecurityAttributeHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  DeclarativeSecurityAttributeHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.DeclarativeSecurityAttributeHandle;
            },
          },
        },
      },
    },
  },
  Document: {
    kind: "struct",
    members: {
      Hash: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
      HashAlgorithm: {
        kind: "property",
        type: () => {
          return Metadata.GuidHandle;
        },
      },
      Language: {
        kind: "property",
        type: () => {
          return Metadata.GuidHandle;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.DocumentNameBlobHandle;
        },
      },
    },
  },
  DocumentHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  DocumentHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.DocumentHandle;
            },
          },
        },
      },
    },
  },
  DocumentNameBlobHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  EntityHandle: {
    kind: "struct",
    members: {
      AssemblyDefinition: {
        kind: "field",
        type: () => {
          return Metadata.AssemblyDefinitionHandle;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ModuleDefinition: {
        kind: "field",
        type: () => {
          return Metadata.ModuleDefinitionHandle;
        },
        isStatic: true,
        isReadOnly: true,
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Kind: {
        kind: "property",
        type: () => {
          return Metadata.HandleKind;
        },
      },
    },
  },
  EventAccessors: {
    kind: "struct",
    members: {
      Adder: {
        kind: "property",
        type: () => {
          return Metadata.MethodDefinitionHandle;
        },
      },
      Others: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
      Raiser: {
        kind: "property",
        type: () => {
          return Metadata.MethodDefinitionHandle;
        },
      },
      Remover: {
        kind: "property",
        type: () => {
          return Metadata.MethodDefinitionHandle;
        },
      },
    },
  },
  EventDefinition: {
    kind: "struct",
    members: {
      GetAccessors: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.EventAttributes;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
    },
  },
  EventDefinitionHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  EventDefinitionHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.EventDefinitionHandle;
            },
          },
        },
      },
    },
  },
  ExceptionRegion: {
    kind: "struct",
    members: {
      CatchType: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
      FilterOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      HandlerLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      HandlerOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Kind: {
        kind: "property",
        type: () => {
          return Metadata.ExceptionRegionKind;
        },
      },
      TryLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      TryOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  ExceptionRegionKind: {
    kind: "enum",
    members: {
      Catch: {
        kind: "field",
        type: () => {
          return Metadata.ExceptionRegionKind;
        },
      },
      Filter: {
        kind: "field",
        type: () => {
          return Metadata.ExceptionRegionKind;
        },
      },
      Finally: {
        kind: "field",
        type: () => {
          return Metadata.ExceptionRegionKind;
        },
      },
      Fault: {
        kind: "field",
        type: () => {
          return Metadata.ExceptionRegionKind;
        },
      },
    },
  },
  ExportedType: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      Implementation: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
      IsForwarder: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      NamespaceDefinition: {
        kind: "property",
        type: () => {
          return Metadata.NamespaceDefinitionHandle;
        },
      },
    },
  },
  ExportedTypeHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ExportedTypeHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.ExportedTypeHandle;
            },
          },
        },
      },
    },
  },
  FieldDefinition: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDeclaringType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDefaultValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMarshallingDescriptor: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOffset: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetRelativeVirtualAddress: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.FieldAttributes;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      Signature: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
    },
  },
  FieldDefinitionHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  FieldDefinitionHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.FieldDefinitionHandle;
            },
          },
        },
      },
    },
  },
  GenericParameter: {
    kind: "struct",
    members: {
      GetConstraints: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.GenericParameterAttributes;
        },
      },
      Index: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      Parent: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
    },
  },
  GenericParameterConstraint: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      Parameter: {
        kind: "property",
        type: () => {
          return Metadata.GenericParameterHandle;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
    },
  },
  GenericParameterConstraintHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  GenericParameterConstraintHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.GenericParameterConstraintHandle;
            },
          },
        },
      },
    },
  },
  GenericParameterHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  GenericParameterHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.GenericParameterHandle;
            },
          },
        },
      },
    },
  },
  GuidHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  Handle: {
    kind: "struct",
    members: {
      AssemblyDefinition: {
        kind: "field",
        type: () => {
          return Metadata.AssemblyDefinitionHandle;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ModuleDefinition: {
        kind: "field",
        type: () => {
          return Metadata.ModuleDefinitionHandle;
        },
        isStatic: true,
        isReadOnly: true,
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Kind: {
        kind: "property",
        type: () => {
          return Metadata.HandleKind;
        },
      },
    },
  },
  HandleComparer: {
    kind: "class",
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
      },
      Default: {
        kind: "property",
        type: () => {
          return Metadata.HandleComparer;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  HandleKind: {
    kind: "enum",
    members: {
      ModuleDefinition: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      TypeReference: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      TypeDefinition: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      FieldDefinition: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      MethodDefinition: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      Parameter: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      InterfaceImplementation: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      MemberReference: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      Constant: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      CustomAttribute: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      DeclarativeSecurityAttribute: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      StandaloneSignature: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      EventDefinition: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      PropertyDefinition: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      MethodImplementation: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      ModuleReference: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      TypeSpecification: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      AssemblyDefinition: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      AssemblyReference: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      AssemblyFile: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      ExportedType: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      ManifestResource: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      GenericParameter: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      MethodSpecification: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      GenericParameterConstraint: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      Document: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      MethodDebugInformation: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      LocalScope: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      LocalVariable: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      LocalConstant: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      ImportScope: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      CustomDebugInformation: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      UserString: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      Blob: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      Guid: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
      NamespaceDefinition: {
        kind: "field",
        type: () => {
          return Metadata.HandleKind;
        },
      },
    },
  },
  IConstructedTypeProvider: {
    kind: "interface",
    members: {
      GetArrayType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetByReferenceType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetGenericInstantiation: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPointerType: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ICustomAttributeTypeProvider: {
    kind: "interface",
    members: {
      GetSystemType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetTypeFromSerializedName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUnderlyingEnumType: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsSystemType: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ILOpCode: {
    kind: "enum",
    members: {
      Nop: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Break: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldnull: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Dup: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Pop: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Jmp: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Call: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Calli: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ret: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Br: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Brfalse: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Brtrue: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Beq: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Bge: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Bgt: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ble: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Blt: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Switch: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Add: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Sub: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Mul: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Div: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Rem: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      And: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Or: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Xor: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Shl: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Shr: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Neg: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Not: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Callvirt: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Cpobj: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldobj: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldstr: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Newobj: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Castclass: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Isinst: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Unbox: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Throw: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldfld: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldflda: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Stfld: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldsfld: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldsflda: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Stsfld: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Stobj: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Box: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Newarr: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldlen: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldelema: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldelem: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Stelem: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Refanyval: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ckfinite: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Mkrefany: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldtoken: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Endfinally: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Leave: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Arglist: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ceq: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Cgt: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Clt: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldftn: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldvirtftn: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldarg: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldarga: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Starg: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldloc: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Ldloca: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Stloc: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Localloc: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Endfilter: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Unaligned: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Volatile: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Tail: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Initobj: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Constrained: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Cpblk: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Initblk: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Rethrow: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Sizeof: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Refanytype: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
      Readonly: {
        kind: "field",
        type: () => {
          return Metadata.ILOpCode;
        },
      },
    },
  },
  ILOpCodeExtensions: {
    kind: "class",
    members: {
      GetBranchOperandSize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLongBranch: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetShortBranch: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsBranch: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  ISZArrayTypeProvider: {
    kind: "interface",
    members: {
      GetSZArrayType: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISignatureTypeProvider: {
    kind: "interface",
    members: {
      GetFunctionPointerType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetGenericMethodParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetGenericTypeParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetModifiedType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPinnedType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetTypeFromSpecification: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISimpleTypeProvider: {
    kind: "interface",
    members: {
      GetPrimitiveType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetTypeFromDefinition: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetTypeFromReference: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ImageFormatLimitationException: {
    kind: "class",
    members: {
      ImageFormatLimitationException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  ImportDefinition: {
    kind: "struct",
    members: {
      Alias: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
      Kind: {
        kind: "property",
        type: () => {
          return Metadata.ImportDefinitionKind;
        },
      },
      TargetAssembly: {
        kind: "property",
        type: () => {
          return Metadata.AssemblyReferenceHandle;
        },
      },
      TargetNamespace: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
      TargetType: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
    },
  },
  ImportDefinitionCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Reset: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.ImportDefinition;
            },
          },
        },
      },
    },
  },
  ImportDefinitionKind: {
    kind: "enum",
    members: {
      ImportNamespace: {
        kind: "field",
        type: () => {
          return Metadata.ImportDefinitionKind;
        },
      },
      ImportAssemblyNamespace: {
        kind: "field",
        type: () => {
          return Metadata.ImportDefinitionKind;
        },
      },
      ImportType: {
        kind: "field",
        type: () => {
          return Metadata.ImportDefinitionKind;
        },
      },
      ImportXmlNamespace: {
        kind: "field",
        type: () => {
          return Metadata.ImportDefinitionKind;
        },
      },
      ImportAssemblyReferenceAlias: {
        kind: "field",
        type: () => {
          return Metadata.ImportDefinitionKind;
        },
      },
      AliasAssemblyReference: {
        kind: "field",
        type: () => {
          return Metadata.ImportDefinitionKind;
        },
      },
      AliasNamespace: {
        kind: "field",
        type: () => {
          return Metadata.ImportDefinitionKind;
        },
      },
      AliasAssemblyNamespace: {
        kind: "field",
        type: () => {
          return Metadata.ImportDefinitionKind;
        },
      },
      AliasType: {
        kind: "field",
        type: () => {
          return Metadata.ImportDefinitionKind;
        },
      },
    },
  },
  ImportScope: {
    kind: "struct",
    members: {
      GetImports: {
        kind: "method",
        methodKind: "ordinary",
      },
      ImportsBlob: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
      Parent: {
        kind: "property",
        type: () => {
          return Metadata.ImportScopeHandle;
        },
      },
    },
  },
  ImportScopeCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.ImportScopeHandle;
            },
          },
        },
      },
    },
  },
  ImportScopeHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  InterfaceImplementation: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      Interface: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
    },
  },
  InterfaceImplementationHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  InterfaceImplementationHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.InterfaceImplementationHandle;
            },
          },
        },
      },
    },
  },
  LocalConstant: {
    kind: "struct",
    members: {
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      Signature: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
    },
  },
  LocalConstantHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  LocalConstantHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.LocalConstantHandle;
            },
          },
        },
      },
    },
  },
  LocalScope: {
    kind: "struct",
    members: {
      GetChildren: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetLocalConstants: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetLocalVariables: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ImportScope: {
        kind: "property",
        type: () => {
          return Metadata.ImportScopeHandle;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Method: {
        kind: "property",
        type: () => {
          return Metadata.MethodDefinitionHandle;
        },
      },
      StartOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  LocalScopeHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  LocalScopeHandleCollection: {
    kind: "class",
    members: {
      ChildrenEnumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.LocalScopeHandle;
            },
          },
        },
      },
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.LocalScopeHandle;
            },
          },
        },
      },
    },
  },
  LocalVariable: {
    kind: "struct",
    members: {
      Attributes: {
        kind: "property",
        type: () => {
          return Metadata.LocalVariableAttributes;
        },
      },
      Index: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
    },
  },
  LocalVariableAttributes: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Metadata.LocalVariableAttributes;
        },
      },
      DebuggerHidden: {
        kind: "field",
        type: () => {
          return Metadata.LocalVariableAttributes;
        },
      },
    },
  },
  LocalVariableHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  LocalVariableHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.LocalVariableHandle;
            },
          },
        },
      },
    },
  },
  ManifestResource: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.ManifestResourceAttributes;
        },
      },
      Implementation: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      Offset: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  ManifestResourceHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ManifestResourceHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.ManifestResourceHandle;
            },
          },
        },
      },
    },
  },
  MemberReference: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetKind: {
        kind: "method",
        methodKind: "ordinary",
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      Parent: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
      Signature: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
    },
  },
  MemberReferenceHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  MemberReferenceHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.MemberReferenceHandle;
            },
          },
        },
      },
    },
  },
  MemberReferenceKind: {
    kind: "enum",
    members: {
      Method: {
        kind: "field",
        type: () => {
          return Metadata.MemberReferenceKind;
        },
      },
      Field: {
        kind: "field",
        type: () => {
          return Metadata.MemberReferenceKind;
        },
      },
    },
  },
  MetadataKind: {
    kind: "enum",
    members: {
      Ecma335: {
        kind: "field",
        type: () => {
          return Metadata.MetadataKind;
        },
      },
      WindowsMetadata: {
        kind: "field",
        type: () => {
          return Metadata.MetadataKind;
        },
      },
      ManagedWindowsMetadata: {
        kind: "field",
        type: () => {
          return Metadata.MetadataKind;
        },
      },
    },
  },
  MetadataReader: {
    kind: "class",
    members: {
      MetadataReader: {
        kind: "method",
        methodKind: "constructor",
      },
      GetAssemblyDefinition: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAssemblyFile: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAssemblyName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetAssemblyReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetBlobBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetBlobContent: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetBlobReader: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetConstant: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCustomDebugInformation: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDeclarativeSecurityAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDocument: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEventDefinition: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetExportedType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetFieldDefinition: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetGenericParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetGenericParameterConstraint: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetGuid: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetImportScope: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInterfaceImplementation: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetLocalConstant: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetLocalScope: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetLocalScopes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetLocalVariable: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetManifestResource: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMemberReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMethodDebugInformation: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMethodDefinition: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMethodImplementation: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMethodSpecification: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetModuleDefinition: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetModuleReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNamespaceDefinition: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNamespaceDefinitionRoot: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPropertyDefinition: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetStandaloneSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetString: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetTypeDefinition: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetTypeReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetTypeSpecification: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUserString: {
        kind: "method",
        methodKind: "ordinary",
      },
      AssemblyFiles: {
        kind: "property",
        type: () => {
          return Metadata.AssemblyFileHandleCollection;
        },
      },
      AssemblyReferences: {
        kind: "property",
        type: () => {
          return Metadata.AssemblyReferenceHandleCollection;
        },
      },
      CustomAttributes: {
        kind: "property",
        type: () => {
          return Metadata.CustomAttributeHandleCollection;
        },
      },
      CustomDebugInformation: {
        kind: "property",
        type: () => {
          return Metadata.CustomDebugInformationHandleCollection;
        },
      },
      DebugMetadataHeader: {
        kind: "property",
        type: () => {
          return Metadata.DebugMetadataHeader;
        },
      },
      DeclarativeSecurityAttributes: {
        kind: "property",
        type: () => {
          return Metadata.DeclarativeSecurityAttributeHandleCollection;
        },
      },
      Documents: {
        kind: "property",
        type: () => {
          return Metadata.DocumentHandleCollection;
        },
      },
      EventDefinitions: {
        kind: "property",
        type: () => {
          return Metadata.EventDefinitionHandleCollection;
        },
      },
      ExportedTypes: {
        kind: "property",
        type: () => {
          return Metadata.ExportedTypeHandleCollection;
        },
      },
      FieldDefinitions: {
        kind: "property",
        type: () => {
          return Metadata.FieldDefinitionHandleCollection;
        },
      },
      ImportScopes: {
        kind: "property",
        type: () => {
          return Metadata.ImportScopeCollection;
        },
      },
      IsAssembly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LocalConstants: {
        kind: "property",
        type: () => {
          return Metadata.LocalConstantHandleCollection;
        },
      },
      LocalScopes: {
        kind: "property",
        type: () => {
          return Metadata.LocalScopeHandleCollection;
        },
      },
      LocalVariables: {
        kind: "property",
        type: () => {
          return Metadata.LocalVariableHandleCollection;
        },
      },
      ManifestResources: {
        kind: "property",
        type: () => {
          return Metadata.ManifestResourceHandleCollection;
        },
      },
      MemberReferences: {
        kind: "property",
        type: () => {
          return Metadata.MemberReferenceHandleCollection;
        },
      },
      MetadataKind: {
        kind: "property",
        type: () => {
          return Metadata.MetadataKind;
        },
      },
      MetadataLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MetadataPointer: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      MetadataVersion: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MethodDebugInformation: {
        kind: "property",
        type: () => {
          return Metadata.MethodDebugInformationHandleCollection;
        },
      },
      MethodDefinitions: {
        kind: "property",
        type: () => {
          return Metadata.MethodDefinitionHandleCollection;
        },
      },
      Options: {
        kind: "property",
        type: () => {
          return Metadata.MetadataReaderOptions;
        },
      },
      PropertyDefinitions: {
        kind: "property",
        type: () => {
          return Metadata.PropertyDefinitionHandleCollection;
        },
      },
      StringComparer: {
        kind: "property",
        type: () => {
          return Metadata.MetadataStringComparer;
        },
      },
      TypeDefinitions: {
        kind: "property",
        type: () => {
          return Metadata.TypeDefinitionHandleCollection;
        },
      },
      TypeReferences: {
        kind: "property",
        type: () => {
          return Metadata.TypeReferenceHandleCollection;
        },
      },
      UTF8Decoder: {
        kind: "property",
        type: () => {
          return Metadata.MetadataStringDecoder;
        },
      },
    },
    isSealed: true,
  },
  MetadataReaderOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Metadata.MetadataReaderOptions;
        },
      },
      ApplyWindowsRuntimeProjections: {
        kind: "field",
        type: () => {
          return Metadata.MetadataReaderOptions;
        },
      },
      Default: {
        kind: "field",
        type: () => {
          return Metadata.MetadataReaderOptions;
        },
      },
    },
  },
  MetadataReaderProvider: {
    kind: "class",
    members: {
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromMetadataImage: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromMetadataStream: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromPortablePdbImage: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromPortablePdbStream: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetMetadataReader: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  MetadataStreamOptions: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Metadata.MetadataStreamOptions;
        },
      },
      LeaveOpen: {
        kind: "field",
        type: () => {
          return Metadata.MetadataStreamOptions;
        },
      },
      PrefetchMetadata: {
        kind: "field",
        type: () => {
          return Metadata.MetadataStreamOptions;
        },
      },
    },
  },
  MetadataStringComparer: {
    kind: "struct",
    members: {
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      StartsWith: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  MetadataStringDecoder: {
    kind: "class",
    members: {
      MetadataStringDecoder: {
        kind: "method",
        methodKind: "constructor",
      },
      GetString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DefaultUTF8: {
        kind: "property",
        type: () => {
          return Metadata.MetadataStringDecoder;
        },
        isStatic: true,
      },
      Encoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
      },
    },
  },
  MetadataUpdateHandlerAttribute: {
    kind: "class",
    members: {
      MetadataUpdateHandlerAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      HandlerType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  MetadataUpdater: {
    kind: "class",
    members: {
      ApplyUpdate: {
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
    isStatic: true,
  },
  MethodBodyBlock: {
    kind: "class",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetILBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetILContent: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetILReader: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExceptionRegions: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
      LocalSignature: {
        kind: "property",
        type: () => {
          return Metadata.StandaloneSignatureHandle;
        },
      },
      LocalVariablesInitialized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MaxStack: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Size: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  MethodDebugInformation: {
    kind: "struct",
    members: {
      GetSequencePoints: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetStateMachineKickoffMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      Document: {
        kind: "property",
        type: () => {
          return Metadata.DocumentHandle;
        },
      },
      LocalSignature: {
        kind: "property",
        type: () => {
          return Metadata.StandaloneSignatureHandle;
        },
      },
      SequencePointsBlob: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
    },
  },
  MethodDebugInformationHandle: {
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
      ToDefinitionHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  MethodDebugInformationHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.MethodDebugInformationHandle;
            },
          },
        },
      },
    },
  },
  MethodDefinition: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDeclarativeSecurityAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDeclaringType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetGenericParameters: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetImport: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetParameters: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.MethodAttributes;
        },
      },
      ImplAttributes: {
        kind: "property",
        type: () => {
          return Reflection.MethodImplAttributes;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      RelativeVirtualAddress: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Signature: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
    },
  },
  MethodDefinitionHandle: {
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
      ToDebugInformationHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  MethodDefinitionHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.MethodDefinitionHandle;
            },
          },
        },
      },
    },
  },
  MethodImplementation: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      MethodBody: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
      MethodDeclaration: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return Metadata.TypeDefinitionHandle;
        },
      },
    },
  },
  MethodImplementationHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  MethodImplementationHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.MethodImplementationHandle;
            },
          },
        },
      },
    },
  },
  MethodImport: {
    kind: "struct",
    members: {
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.MethodImportAttributes;
        },
      },
      Module: {
        kind: "property",
        type: () => {
          return Metadata.ModuleReferenceHandle;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
    },
  },
  MethodSignature: {
    kind: "struct",
    members: {
      MethodSignature: {
        kind: "method",
        methodKind: "constructor",
      },
      GenericParameterCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Header: {
        kind: "property",
        type: () => {
          return Metadata.SignatureHeader;
        },
      },
      ParameterTypes: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
      RequiredParameterCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ReturnType: {
        kind: "property",
        type: undefined,
      },
    },
  },
  MethodSpecification: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      Method: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
      Signature: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
    },
  },
  MethodSpecificationHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ModuleDefinition: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      BaseGenerationId: {
        kind: "property",
        type: () => {
          return Metadata.GuidHandle;
        },
      },
      Generation: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      GenerationId: {
        kind: "property",
        type: () => {
          return Metadata.GuidHandle;
        },
      },
      Mvid: {
        kind: "property",
        type: () => {
          return Metadata.GuidHandle;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
    },
  },
  ModuleDefinitionHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ModuleReference: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
    },
  },
  ModuleReferenceHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  NamespaceDefinition: {
    kind: "struct",
    members: {
      ExportedTypes: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      NamespaceDefinitions: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
      Parent: {
        kind: "property",
        type: () => {
          return Metadata.NamespaceDefinitionHandle;
        },
      },
      TypeDefinitions: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
    },
  },
  NamespaceDefinitionHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  Parameter: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDefaultValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMarshallingDescriptor: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.ParameterAttributes;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      SequenceNumber: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  ParameterHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ParameterHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.ParameterHandle;
            },
          },
        },
      },
    },
  },
  PrimitiveSerializationTypeCode: {
    kind: "enum",
    members: {
      Boolean: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveSerializationTypeCode;
        },
      },
      Char: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveSerializationTypeCode;
        },
      },
      SByte: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveSerializationTypeCode;
        },
      },
      Byte: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveSerializationTypeCode;
        },
      },
      Int16: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveSerializationTypeCode;
        },
      },
      UInt16: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveSerializationTypeCode;
        },
      },
      Int32: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveSerializationTypeCode;
        },
      },
      UInt32: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveSerializationTypeCode;
        },
      },
      Int64: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveSerializationTypeCode;
        },
      },
      UInt64: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveSerializationTypeCode;
        },
      },
      Single: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveSerializationTypeCode;
        },
      },
      Double: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveSerializationTypeCode;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveSerializationTypeCode;
        },
      },
    },
  },
  PrimitiveTypeCode: {
    kind: "enum",
    members: {
      Void: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      Boolean: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      Char: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      SByte: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      Byte: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      Int16: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      UInt16: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      Int32: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      UInt32: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      Int64: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      UInt64: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      Single: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      Double: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      TypedReference: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      IntPtr: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      UIntPtr: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
      Object: {
        kind: "field",
        type: () => {
          return Metadata.PrimitiveTypeCode;
        },
      },
    },
  },
  PropertyAccessors: {
    kind: "struct",
    members: {
      Getter: {
        kind: "property",
        type: () => {
          return Metadata.MethodDefinitionHandle;
        },
      },
      Others: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
      Setter: {
        kind: "property",
        type: () => {
          return Metadata.MethodDefinitionHandle;
        },
      },
    },
  },
  PropertyDefinition: {
    kind: "struct",
    members: {
      GetAccessors: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDefaultValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.PropertyAttributes;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      Signature: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
    },
  },
  PropertyDefinitionHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  PropertyDefinitionHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.PropertyDefinitionHandle;
            },
          },
        },
      },
    },
  },
  ReservedBlob: {
    kind: "struct",
    members: {
      CreateWriter: {
        kind: "method",
        methodKind: "ordinary",
      },
      Content: {
        kind: "property",
        type: () => {
          return Metadata.Blob;
        },
      },
      Handle: {
        kind: "property",
        type: undefined,
      },
    },
  },
  SequencePoint: {
    kind: "struct",
    members: {
      HiddenLine: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
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
      Document: {
        kind: "property",
        type: () => {
          return Metadata.DocumentHandle;
        },
      },
      EndColumn: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      EndLine: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsHidden: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Offset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      StartColumn: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      StartLine: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  SequencePointCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Reset: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.SequencePoint;
            },
          },
        },
      },
    },
  },
  SerializationTypeCode: {
    kind: "enum",
    members: {
      Invalid: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      Boolean: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      Char: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      SByte: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      Byte: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      Int16: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      UInt16: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      Int32: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      UInt32: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      Int64: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      UInt64: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      Single: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      Double: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      SZArray: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      Type: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      TaggedObject: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
      Enum: {
        kind: "field",
        type: () => {
          return Metadata.SerializationTypeCode;
        },
      },
    },
  },
  SignatureAttributes: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Metadata.SignatureAttributes;
        },
      },
      Generic: {
        kind: "field",
        type: () => {
          return Metadata.SignatureAttributes;
        },
      },
      Instance: {
        kind: "field",
        type: () => {
          return Metadata.SignatureAttributes;
        },
      },
      ExplicitThis: {
        kind: "field",
        type: () => {
          return Metadata.SignatureAttributes;
        },
      },
    },
  },
  SignatureCallingConvention: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Metadata.SignatureCallingConvention;
        },
      },
      CDecl: {
        kind: "field",
        type: () => {
          return Metadata.SignatureCallingConvention;
        },
      },
      StdCall: {
        kind: "field",
        type: () => {
          return Metadata.SignatureCallingConvention;
        },
      },
      ThisCall: {
        kind: "field",
        type: () => {
          return Metadata.SignatureCallingConvention;
        },
      },
      FastCall: {
        kind: "field",
        type: () => {
          return Metadata.SignatureCallingConvention;
        },
      },
      VarArgs: {
        kind: "field",
        type: () => {
          return Metadata.SignatureCallingConvention;
        },
      },
      Unmanaged: {
        kind: "field",
        type: () => {
          return Metadata.SignatureCallingConvention;
        },
      },
    },
  },
  SignatureHeader: {
    kind: "struct",
    members: {
      CallingConventionOrKindMask: {
        kind: "field",
        type: () => {
          return System.Byte;
        },
      },
      SignatureHeader: {
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
      Attributes: {
        kind: "property",
        type: () => {
          return Metadata.SignatureAttributes;
        },
      },
      CallingConvention: {
        kind: "property",
        type: () => {
          return Metadata.SignatureCallingConvention;
        },
      },
      HasExplicitThis: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsGeneric: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsInstance: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Kind: {
        kind: "property",
        type: () => {
          return Metadata.SignatureKind;
        },
      },
      RawValue: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
    },
  },
  SignatureKind: {
    kind: "enum",
    members: {
      Method: {
        kind: "field",
        type: () => {
          return Metadata.SignatureKind;
        },
      },
      Field: {
        kind: "field",
        type: () => {
          return Metadata.SignatureKind;
        },
      },
      LocalVariables: {
        kind: "field",
        type: () => {
          return Metadata.SignatureKind;
        },
      },
      Property: {
        kind: "field",
        type: () => {
          return Metadata.SignatureKind;
        },
      },
      MethodSpecification: {
        kind: "field",
        type: () => {
          return Metadata.SignatureKind;
        },
      },
    },
  },
  SignatureTypeCode: {
    kind: "enum",
    members: {
      Invalid: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      Void: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      Boolean: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      Char: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      SByte: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      Byte: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      Int16: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      UInt16: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      Int32: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      UInt32: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      Int64: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      UInt64: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      Single: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      Double: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      Pointer: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      ByReference: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      GenericTypeParameter: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      Array: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      GenericTypeInstance: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      TypedReference: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      IntPtr: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      UIntPtr: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      FunctionPointer: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      Object: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      SZArray: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      GenericMethodParameter: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      RequiredModifier: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      OptionalModifier: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      TypeHandle: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      Sentinel: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
      Pinned: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeCode;
        },
      },
    },
  },
  SignatureTypeKind: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeKind;
        },
      },
      ValueType: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeKind;
        },
      },
      Class: {
        kind: "field",
        type: () => {
          return Metadata.SignatureTypeKind;
        },
      },
    },
  },
  StandaloneSignature: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetKind: {
        kind: "method",
        methodKind: "ordinary",
      },
      Signature: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
    },
  },
  StandaloneSignatureHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  StandaloneSignatureKind: {
    kind: "enum",
    members: {
      Method: {
        kind: "field",
        type: () => {
          return Metadata.StandaloneSignatureKind;
        },
      },
      LocalVariables: {
        kind: "field",
        type: () => {
          return Metadata.StandaloneSignatureKind;
        },
      },
    },
  },
  StringHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  TypeDefinition: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDeclarativeSecurityAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDeclaringType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEvents: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetFields: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetGenericParameters: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInterfaceImplementations: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetLayout: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMethodImplementations: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMethods: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNestedTypes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      BaseType: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
      IsNested: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      NamespaceDefinition: {
        kind: "property",
        type: () => {
          return Metadata.NamespaceDefinitionHandle;
        },
      },
    },
  },
  TypeDefinitionHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  TypeDefinitionHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.TypeDefinitionHandle;
            },
          },
        },
      },
    },
  },
  TypeLayout: {
    kind: "struct",
    members: {
      TypeLayout: {
        kind: "method",
        methodKind: "constructor",
      },
      IsDefault: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PackingSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Size: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  TypeName: {
    kind: "class",
    members: {
      GetArrayRank: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetElementType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetGenericArguments: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetGenericTypeDefinition: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNodeCount: {
        kind: "method",
        methodKind: "ordinary",
      },
      MakeArrayTypeName: {
        kind: "method",
        methodKind: "ordinary",
      },
      MakeByRefTypeName: {
        kind: "method",
        methodKind: "ordinary",
      },
      MakeGenericTypeName: {
        kind: "method",
        methodKind: "ordinary",
      },
      MakePointerTypeName: {
        kind: "method",
        methodKind: "ordinary",
      },
      MakeSZArrayTypeName: {
        kind: "method",
        methodKind: "ordinary",
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
      WithAssemblyName: {
        kind: "method",
        methodKind: "ordinary",
      },
      AssemblyName: {
        kind: "property",
        type: () => {
          return Metadata.AssemblyNameInfo;
        },
      },
      AssemblyQualifiedName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DeclaringType: {
        kind: "property",
        type: () => {
          return Metadata.TypeName;
        },
      },
      FullName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      IsArray: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsByRef: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsConstructedGenericType: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNested: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsPointer: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSimple: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSZArray: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsVariableBoundArrayType: {
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
      },
    },
    isSealed: true,
  },
  TypeNameParseOptions: {
    kind: "class",
    members: {
      TypeNameParseOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      MaxNodes: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  TypeReference: {
    kind: "struct",
    members: {
      Name: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return Metadata.StringHandle;
        },
      },
      ResolutionScope: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
    },
  },
  TypeReferenceHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  TypeReferenceHandleCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Metadata.TypeReferenceHandle;
            },
          },
        },
      },
    },
  },
  TypeSpecification: {
    kind: "struct",
    members: {
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      Signature: {
        kind: "property",
        type: () => {
          return Metadata.BlobHandle;
        },
      },
    },
  },
  TypeSpecificationHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  UserStringHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
});
export default Metadata
