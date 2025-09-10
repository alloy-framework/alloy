import Immutable from "../../../Collections/Immutable/index.js";
import System from "../../../index.js";
import Metadata from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type Ecma335Library = LibrarySymbolReference & {
  ArrayShapeEncoder: LibrarySymbolReference & {
    ArrayShapeEncoder: LibrarySymbolReference;
    Shape: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  BlobEncoder: LibrarySymbolReference & {
    BlobEncoder: LibrarySymbolReference;
    CustomAttributeSignature: LibrarySymbolReference;
    Field: LibrarySymbolReference;
    FieldSignature: LibrarySymbolReference;
    LocalVariableSignature: LibrarySymbolReference;
    MethodSignature: LibrarySymbolReference;
    MethodSpecificationSignature: LibrarySymbolReference;
    PermissionSetArguments: LibrarySymbolReference;
    PermissionSetBlob: LibrarySymbolReference;
    PropertySignature: LibrarySymbolReference;
    TypeSpecificationSignature: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  CodedIndex: LibrarySymbolReference & {
    CustomAttributeType: LibrarySymbolReference;
    HasConstant: LibrarySymbolReference;
    HasCustomAttribute: LibrarySymbolReference;
    HasCustomDebugInformation: LibrarySymbolReference;
    HasDeclSecurity: LibrarySymbolReference;
    HasFieldMarshal: LibrarySymbolReference;
    HasSemantics: LibrarySymbolReference;
    Implementation: LibrarySymbolReference;
    MemberForwarded: LibrarySymbolReference;
    MemberRefParent: LibrarySymbolReference;
    MethodDefOrRef: LibrarySymbolReference;
    ResolutionScope: LibrarySymbolReference;
    TypeDefOrRef: LibrarySymbolReference;
    TypeDefOrRefOrSpec: LibrarySymbolReference;
    TypeOrMethodDef: LibrarySymbolReference
  };
  ControlFlowBuilder: LibrarySymbolReference & {
    ControlFlowBuilder: LibrarySymbolReference;
    AddCatchRegion: LibrarySymbolReference;
    AddFaultRegion: LibrarySymbolReference;
    AddFilterRegion: LibrarySymbolReference;
    AddFinallyRegion: LibrarySymbolReference;
    Clear: LibrarySymbolReference
  };
  CustomAttributeArrayTypeEncoder: LibrarySymbolReference & {
    CustomAttributeArrayTypeEncoder: LibrarySymbolReference;
    ElementType: LibrarySymbolReference;
    ObjectArray: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  CustomAttributeElementTypeEncoder: LibrarySymbolReference & {
    CustomAttributeElementTypeEncoder: LibrarySymbolReference;
    Boolean: LibrarySymbolReference;
    Byte: LibrarySymbolReference;
    Char: LibrarySymbolReference;
    Double: LibrarySymbolReference;
    Enum: LibrarySymbolReference;
    Int16: LibrarySymbolReference;
    Int32: LibrarySymbolReference;
    Int64: LibrarySymbolReference;
    PrimitiveType: LibrarySymbolReference;
    SByte: LibrarySymbolReference;
    Single: LibrarySymbolReference;
    String: LibrarySymbolReference;
    SystemType: LibrarySymbolReference;
    UInt16: LibrarySymbolReference;
    UInt32: LibrarySymbolReference;
    UInt64: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  CustomAttributeNamedArgumentsEncoder: LibrarySymbolReference & {
    CustomAttributeNamedArgumentsEncoder: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  CustomModifiersEncoder: LibrarySymbolReference & {
    CustomModifiersEncoder: LibrarySymbolReference;
    AddModifier: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  EditAndContinueLogEntry: LibrarySymbolReference & {
    EditAndContinueLogEntry: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Handle: LibrarySymbolReference;
    Operation: LibrarySymbolReference
  };
  EditAndContinueOperation: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    AddMethod: LibrarySymbolReference;
    AddField: LibrarySymbolReference;
    AddParameter: LibrarySymbolReference;
    AddProperty: LibrarySymbolReference;
    AddEvent: LibrarySymbolReference
  };
  ExceptionRegionEncoder: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    AddCatch: LibrarySymbolReference;
    AddFault: LibrarySymbolReference;
    AddFilter: LibrarySymbolReference;
    AddFinally: LibrarySymbolReference;
    IsSmallExceptionRegion: LibrarySymbolReference;
    IsSmallRegionCount: LibrarySymbolReference;
    Builder: LibrarySymbolReference;
    HasSmallFormat: LibrarySymbolReference
  };
  ExportedTypeExtensions: LibrarySymbolReference & {
    GetTypeDefinitionId: LibrarySymbolReference
  };
  FieldTypeEncoder: LibrarySymbolReference & {
    FieldTypeEncoder: LibrarySymbolReference;
    CustomModifiers: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    TypedReference: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  FixedArgumentsEncoder: LibrarySymbolReference & {
    FixedArgumentsEncoder: LibrarySymbolReference;
    AddArgument: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  FunctionPointerAttributes: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    HasThis: LibrarySymbolReference;
    HasExplicitThis: LibrarySymbolReference
  };
  GenericTypeArgumentsEncoder: LibrarySymbolReference & {
    GenericTypeArgumentsEncoder: LibrarySymbolReference;
    AddArgument: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  HeapIndex: LibrarySymbolReference & {
    UserString: LibrarySymbolReference;
    String: LibrarySymbolReference;
    Blob: LibrarySymbolReference;
    Guid: LibrarySymbolReference
  };
  InstructionEncoder: LibrarySymbolReference & {
    InstructionEncoder: LibrarySymbolReference;
    Branch: LibrarySymbolReference;
    Call: LibrarySymbolReference;
    CallIndirect: LibrarySymbolReference;
    DefineLabel: LibrarySymbolReference;
    LoadArgument: LibrarySymbolReference;
    LoadArgumentAddress: LibrarySymbolReference;
    LoadConstantI4: LibrarySymbolReference;
    LoadConstantI8: LibrarySymbolReference;
    LoadConstantR4: LibrarySymbolReference;
    LoadConstantR8: LibrarySymbolReference;
    LoadLocal: LibrarySymbolReference;
    LoadLocalAddress: LibrarySymbolReference;
    LoadString: LibrarySymbolReference;
    MarkLabel: LibrarySymbolReference;
    OpCode: LibrarySymbolReference;
    StoreArgument: LibrarySymbolReference;
    StoreLocal: LibrarySymbolReference;
    Switch: LibrarySymbolReference;
    Token: LibrarySymbolReference;
    CodeBuilder: LibrarySymbolReference;
    ControlFlowBuilder: LibrarySymbolReference;
    Offset: LibrarySymbolReference
  };
  LabelHandle: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Id: LibrarySymbolReference;
    IsNil: LibrarySymbolReference
  };
  LiteralEncoder: LibrarySymbolReference & {
    LiteralEncoder: LibrarySymbolReference;
    Scalar: LibrarySymbolReference;
    TaggedScalar: LibrarySymbolReference;
    TaggedVector: LibrarySymbolReference;
    Vector: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  LiteralsEncoder: LibrarySymbolReference & {
    LiteralsEncoder: LibrarySymbolReference;
    AddLiteral: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  LocalVariableTypeEncoder: LibrarySymbolReference & {
    LocalVariableTypeEncoder: LibrarySymbolReference;
    CustomModifiers: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    TypedReference: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  LocalVariablesEncoder: LibrarySymbolReference & {
    LocalVariablesEncoder: LibrarySymbolReference;
    AddVariable: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  MetadataAggregator: LibrarySymbolReference & {
    MetadataAggregator: LibrarySymbolReference;
    GetGenerationHandle: LibrarySymbolReference
  };
  MetadataBuilder: LibrarySymbolReference & {
    MetadataBuilder: LibrarySymbolReference;
    AddAssembly: LibrarySymbolReference;
    AddAssemblyFile: LibrarySymbolReference;
    AddAssemblyReference: LibrarySymbolReference;
    AddConstant: LibrarySymbolReference;
    AddCustomAttribute: LibrarySymbolReference;
    AddCustomDebugInformation: LibrarySymbolReference;
    AddDeclarativeSecurityAttribute: LibrarySymbolReference;
    AddDocument: LibrarySymbolReference;
    AddEncLogEntry: LibrarySymbolReference;
    AddEncMapEntry: LibrarySymbolReference;
    AddEvent: LibrarySymbolReference;
    AddEventMap: LibrarySymbolReference;
    AddExportedType: LibrarySymbolReference;
    AddFieldDefinition: LibrarySymbolReference;
    AddFieldLayout: LibrarySymbolReference;
    AddFieldRelativeVirtualAddress: LibrarySymbolReference;
    AddGenericParameter: LibrarySymbolReference;
    AddGenericParameterConstraint: LibrarySymbolReference;
    AddImportScope: LibrarySymbolReference;
    AddInterfaceImplementation: LibrarySymbolReference;
    AddLocalConstant: LibrarySymbolReference;
    AddLocalScope: LibrarySymbolReference;
    AddLocalVariable: LibrarySymbolReference;
    AddManifestResource: LibrarySymbolReference;
    AddMarshallingDescriptor: LibrarySymbolReference;
    AddMemberReference: LibrarySymbolReference;
    AddMethodDebugInformation: LibrarySymbolReference;
    AddMethodDefinition: LibrarySymbolReference;
    AddMethodImplementation: LibrarySymbolReference;
    AddMethodImport: LibrarySymbolReference;
    AddMethodSemantics: LibrarySymbolReference;
    AddMethodSpecification: LibrarySymbolReference;
    AddModule: LibrarySymbolReference;
    AddModuleReference: LibrarySymbolReference;
    AddNestedType: LibrarySymbolReference;
    AddParameter: LibrarySymbolReference;
    AddProperty: LibrarySymbolReference;
    AddPropertyMap: LibrarySymbolReference;
    AddStandaloneSignature: LibrarySymbolReference;
    AddStateMachineMethod: LibrarySymbolReference;
    AddTypeDefinition: LibrarySymbolReference;
    AddTypeLayout: LibrarySymbolReference;
    AddTypeReference: LibrarySymbolReference;
    AddTypeSpecification: LibrarySymbolReference;
    GetOrAddBlob: LibrarySymbolReference;
    GetOrAddBlobUTF16: LibrarySymbolReference;
    GetOrAddBlobUTF8: LibrarySymbolReference;
    GetOrAddConstantBlob: LibrarySymbolReference;
    GetOrAddDocumentName: LibrarySymbolReference;
    GetOrAddGuid: LibrarySymbolReference;
    GetOrAddString: LibrarySymbolReference;
    GetOrAddUserString: LibrarySymbolReference;
    GetRowCount: LibrarySymbolReference;
    GetRowCounts: LibrarySymbolReference;
    ReserveGuid: LibrarySymbolReference;
    ReserveUserString: LibrarySymbolReference;
    SetCapacity: LibrarySymbolReference
  };
  MetadataReaderExtensions: LibrarySymbolReference & {
    GetEditAndContinueLogEntries: LibrarySymbolReference;
    GetEditAndContinueMapEntries: LibrarySymbolReference;
    GetHeapMetadataOffset: LibrarySymbolReference;
    GetHeapSize: LibrarySymbolReference;
    GetNextHandle: LibrarySymbolReference;
    GetTableMetadataOffset: LibrarySymbolReference;
    GetTableRowCount: LibrarySymbolReference;
    GetTableRowSize: LibrarySymbolReference;
    GetTypesWithEvents: LibrarySymbolReference;
    GetTypesWithProperties: LibrarySymbolReference;
    ResolveSignatureTypeKind: LibrarySymbolReference
  };
  MetadataRootBuilder: LibrarySymbolReference & {
    MetadataRootBuilder: LibrarySymbolReference;
    Serialize: LibrarySymbolReference;
    MetadataVersion: LibrarySymbolReference;
    Sizes: LibrarySymbolReference;
    SuppressValidation: LibrarySymbolReference
  };
  MetadataSizes: LibrarySymbolReference & {
    GetAlignedHeapSize: LibrarySymbolReference;
    ExternalRowCounts: LibrarySymbolReference;
    HeapSizes: LibrarySymbolReference;
    RowCounts: LibrarySymbolReference
  };
  MetadataTokens: LibrarySymbolReference & {
    HeapCount: LibrarySymbolReference;
    TableCount: LibrarySymbolReference;
    AssemblyFileHandle: LibrarySymbolReference;
    AssemblyReferenceHandle: LibrarySymbolReference;
    BlobHandle: LibrarySymbolReference;
    ConstantHandle: LibrarySymbolReference;
    CustomAttributeHandle: LibrarySymbolReference;
    CustomDebugInformationHandle: LibrarySymbolReference;
    DeclarativeSecurityAttributeHandle: LibrarySymbolReference;
    DocumentHandle: LibrarySymbolReference;
    DocumentNameBlobHandle: LibrarySymbolReference;
    EntityHandle: LibrarySymbolReference;
    EventDefinitionHandle: LibrarySymbolReference;
    ExportedTypeHandle: LibrarySymbolReference;
    FieldDefinitionHandle: LibrarySymbolReference;
    GenericParameterConstraintHandle: LibrarySymbolReference;
    GenericParameterHandle: LibrarySymbolReference;
    GetHeapOffset: LibrarySymbolReference;
    GetRowNumber: LibrarySymbolReference;
    GetToken: LibrarySymbolReference;
    GuidHandle: LibrarySymbolReference;
    Handle: LibrarySymbolReference;
    ImportScopeHandle: LibrarySymbolReference;
    InterfaceImplementationHandle: LibrarySymbolReference;
    LocalConstantHandle: LibrarySymbolReference;
    LocalScopeHandle: LibrarySymbolReference;
    LocalVariableHandle: LibrarySymbolReference;
    ManifestResourceHandle: LibrarySymbolReference;
    MemberReferenceHandle: LibrarySymbolReference;
    MethodDebugInformationHandle: LibrarySymbolReference;
    MethodDefinitionHandle: LibrarySymbolReference;
    MethodImplementationHandle: LibrarySymbolReference;
    MethodSpecificationHandle: LibrarySymbolReference;
    ModuleReferenceHandle: LibrarySymbolReference;
    ParameterHandle: LibrarySymbolReference;
    PropertyDefinitionHandle: LibrarySymbolReference;
    StandaloneSignatureHandle: LibrarySymbolReference;
    StringHandle: LibrarySymbolReference;
    TryGetHeapIndex: LibrarySymbolReference;
    TryGetTableIndex: LibrarySymbolReference;
    TypeDefinitionHandle: LibrarySymbolReference;
    TypeReferenceHandle: LibrarySymbolReference;
    TypeSpecificationHandle: LibrarySymbolReference;
    UserStringHandle: LibrarySymbolReference
  };
  MethodBodyAttributes: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    InitLocals: LibrarySymbolReference
  };
  MethodBodyStreamEncoder: LibrarySymbolReference & {
    MethodBody: LibrarySymbolReference & {
      ExceptionRegions: LibrarySymbolReference;
      Instructions: LibrarySymbolReference;
      Offset: LibrarySymbolReference
    }
  };
  MethodSignatureEncoder: LibrarySymbolReference & {
    MethodSignatureEncoder: LibrarySymbolReference;
    Parameters: LibrarySymbolReference;
    Builder: LibrarySymbolReference;
    HasVarArgs: LibrarySymbolReference
  };
  NameEncoder: LibrarySymbolReference & {
    NameEncoder: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  NamedArgumentTypeEncoder: LibrarySymbolReference & {
    NamedArgumentTypeEncoder: LibrarySymbolReference;
    Object: LibrarySymbolReference;
    ScalarType: LibrarySymbolReference;
    SZArray: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  NamedArgumentsEncoder: LibrarySymbolReference & {
    NamedArgumentsEncoder: LibrarySymbolReference;
    AddArgument: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  ParameterTypeEncoder: LibrarySymbolReference & {
    ParameterTypeEncoder: LibrarySymbolReference;
    CustomModifiers: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    TypedReference: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  ParametersEncoder: LibrarySymbolReference & {
    ParametersEncoder: LibrarySymbolReference;
    AddParameter: LibrarySymbolReference;
    StartVarArgs: LibrarySymbolReference;
    Builder: LibrarySymbolReference;
    HasVarArgs: LibrarySymbolReference
  };
  PermissionSetEncoder: LibrarySymbolReference & {
    PermissionSetEncoder: LibrarySymbolReference;
    AddPermission: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  PortablePdbBuilder: LibrarySymbolReference & {
    PortablePdbBuilder: LibrarySymbolReference;
    Serialize: LibrarySymbolReference;
    FormatVersion: LibrarySymbolReference;
    IdProvider: LibrarySymbolReference;
    MetadataVersion: LibrarySymbolReference
  };
  ReturnTypeEncoder: LibrarySymbolReference & {
    ReturnTypeEncoder: LibrarySymbolReference;
    CustomModifiers: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    TypedReference: LibrarySymbolReference;
    Void: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  ScalarEncoder: LibrarySymbolReference & {
    ScalarEncoder: LibrarySymbolReference;
    Constant: LibrarySymbolReference;
    NullArray: LibrarySymbolReference;
    SystemType: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  SignatureDecoder: LibrarySymbolReference & {
    SignatureDecoder: LibrarySymbolReference;
    DecodeFieldSignature: LibrarySymbolReference;
    DecodeLocalSignature: LibrarySymbolReference;
    DecodeMethodSignature: LibrarySymbolReference;
    DecodeMethodSpecificationSignature: LibrarySymbolReference;
    DecodeType: LibrarySymbolReference
  };
  SignatureTypeEncoder: LibrarySymbolReference & {
    SignatureTypeEncoder: LibrarySymbolReference;
    Array: LibrarySymbolReference;
    Boolean: LibrarySymbolReference;
    Byte: LibrarySymbolReference;
    Char: LibrarySymbolReference;
    CustomModifiers: LibrarySymbolReference;
    Double: LibrarySymbolReference;
    FunctionPointer: LibrarySymbolReference;
    GenericInstantiation: LibrarySymbolReference;
    GenericMethodTypeParameter: LibrarySymbolReference;
    GenericTypeParameter: LibrarySymbolReference;
    Int16: LibrarySymbolReference;
    Int32: LibrarySymbolReference;
    Int64: LibrarySymbolReference;
    IntPtr: LibrarySymbolReference;
    Object: LibrarySymbolReference;
    Pointer: LibrarySymbolReference;
    PrimitiveType: LibrarySymbolReference;
    SByte: LibrarySymbolReference;
    Single: LibrarySymbolReference;
    String: LibrarySymbolReference;
    SZArray: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    TypedReference: LibrarySymbolReference;
    UInt16: LibrarySymbolReference;
    UInt32: LibrarySymbolReference;
    UInt64: LibrarySymbolReference;
    UIntPtr: LibrarySymbolReference;
    VoidPointer: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  };
  SwitchInstructionEncoder: LibrarySymbolReference & {
    Branch: LibrarySymbolReference
  };
  TableIndex: LibrarySymbolReference & {
    Module: LibrarySymbolReference;
    TypeRef: LibrarySymbolReference;
    TypeDef: LibrarySymbolReference;
    FieldPtr: LibrarySymbolReference;
    Field: LibrarySymbolReference;
    MethodPtr: LibrarySymbolReference;
    MethodDef: LibrarySymbolReference;
    ParamPtr: LibrarySymbolReference;
    Param: LibrarySymbolReference;
    InterfaceImpl: LibrarySymbolReference;
    MemberRef: LibrarySymbolReference;
    Constant: LibrarySymbolReference;
    CustomAttribute: LibrarySymbolReference;
    FieldMarshal: LibrarySymbolReference;
    DeclSecurity: LibrarySymbolReference;
    ClassLayout: LibrarySymbolReference;
    FieldLayout: LibrarySymbolReference;
    StandAloneSig: LibrarySymbolReference;
    EventMap: LibrarySymbolReference;
    EventPtr: LibrarySymbolReference;
    Event: LibrarySymbolReference;
    PropertyMap: LibrarySymbolReference;
    PropertyPtr: LibrarySymbolReference;
    Property: LibrarySymbolReference;
    MethodSemantics: LibrarySymbolReference;
    MethodImpl: LibrarySymbolReference;
    ModuleRef: LibrarySymbolReference;
    TypeSpec: LibrarySymbolReference;
    ImplMap: LibrarySymbolReference;
    FieldRva: LibrarySymbolReference;
    EncLog: LibrarySymbolReference;
    EncMap: LibrarySymbolReference;
    Assembly: LibrarySymbolReference;
    AssemblyProcessor: LibrarySymbolReference;
    AssemblyOS: LibrarySymbolReference;
    AssemblyRef: LibrarySymbolReference;
    AssemblyRefProcessor: LibrarySymbolReference;
    AssemblyRefOS: LibrarySymbolReference;
    File: LibrarySymbolReference;
    ExportedType: LibrarySymbolReference;
    ManifestResource: LibrarySymbolReference;
    NestedClass: LibrarySymbolReference;
    GenericParam: LibrarySymbolReference;
    MethodSpec: LibrarySymbolReference;
    GenericParamConstraint: LibrarySymbolReference;
    Document: LibrarySymbolReference;
    MethodDebugInformation: LibrarySymbolReference;
    LocalScope: LibrarySymbolReference;
    LocalVariable: LibrarySymbolReference;
    LocalConstant: LibrarySymbolReference;
    ImportScope: LibrarySymbolReference;
    StateMachineMethod: LibrarySymbolReference;
    CustomDebugInformation: LibrarySymbolReference
  };
  VectorEncoder: LibrarySymbolReference & {
    VectorEncoder: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Builder: LibrarySymbolReference
  }
};
const Ecma335: Ecma335Library = createLibrary("System.Reflection.Metadata.Ecma335", {
  ArrayShapeEncoder: {
    kind: "struct",
    members: {
      ArrayShapeEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Shape: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  BlobEncoder: {
    kind: "struct",
    members: {
      BlobEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      CustomAttributeSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      Field: {
        kind: "method",
        methodKind: "ordinary",
      },
      FieldSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      LocalVariableSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      MethodSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      MethodSpecificationSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      PermissionSetArguments: {
        kind: "method",
        methodKind: "ordinary",
      },
      PermissionSetBlob: {
        kind: "method",
        methodKind: "ordinary",
      },
      PropertySignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      TypeSpecificationSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  CodedIndex: {
    kind: "class",
    members: {
      CustomAttributeType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HasConstant: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HasCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HasCustomDebugInformation: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HasDeclSecurity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HasFieldMarshal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HasSemantics: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Implementation: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MemberForwarded: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MemberRefParent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MethodDefOrRef: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ResolutionScope: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TypeDefOrRef: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TypeDefOrRefOrSpec: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TypeOrMethodDef: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  ControlFlowBuilder: {
    kind: "class",
    members: {
      ControlFlowBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddCatchRegion: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddFaultRegion: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddFilterRegion: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddFinallyRegion: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  CustomAttributeArrayTypeEncoder: {
    kind: "struct",
    members: {
      CustomAttributeArrayTypeEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      ElementType: {
        kind: "method",
        methodKind: "ordinary",
      },
      ObjectArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  CustomAttributeElementTypeEncoder: {
    kind: "struct",
    members: {
      CustomAttributeElementTypeEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Boolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      Byte: {
        kind: "method",
        methodKind: "ordinary",
      },
      Char: {
        kind: "method",
        methodKind: "ordinary",
      },
      Double: {
        kind: "method",
        methodKind: "ordinary",
      },
      Enum: {
        kind: "method",
        methodKind: "ordinary",
      },
      Int16: {
        kind: "method",
        methodKind: "ordinary",
      },
      Int32: {
        kind: "method",
        methodKind: "ordinary",
      },
      Int64: {
        kind: "method",
        methodKind: "ordinary",
      },
      PrimitiveType: {
        kind: "method",
        methodKind: "ordinary",
      },
      SByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      Single: {
        kind: "method",
        methodKind: "ordinary",
      },
      String: {
        kind: "method",
        methodKind: "ordinary",
      },
      SystemType: {
        kind: "method",
        methodKind: "ordinary",
      },
      UInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      UInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      UInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  CustomAttributeNamedArgumentsEncoder: {
    kind: "struct",
    members: {
      CustomAttributeNamedArgumentsEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Count: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  CustomModifiersEncoder: {
    kind: "struct",
    members: {
      CustomModifiersEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddModifier: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  EditAndContinueLogEntry: {
    kind: "struct",
    members: {
      EditAndContinueLogEntry: {
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
      Handle: {
        kind: "property",
        type: () => {
          return Metadata.EntityHandle;
        },
      },
      Operation: {
        kind: "property",
        type: () => {
          return Ecma335.EditAndContinueOperation;
        },
      },
    },
  },
  EditAndContinueOperation: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Ecma335.EditAndContinueOperation;
        },
      },
      AddMethod: {
        kind: "field",
        type: () => {
          return Ecma335.EditAndContinueOperation;
        },
      },
      AddField: {
        kind: "field",
        type: () => {
          return Ecma335.EditAndContinueOperation;
        },
      },
      AddParameter: {
        kind: "field",
        type: () => {
          return Ecma335.EditAndContinueOperation;
        },
      },
      AddProperty: {
        kind: "field",
        type: () => {
          return Ecma335.EditAndContinueOperation;
        },
      },
      AddEvent: {
        kind: "field",
        type: () => {
          return Ecma335.EditAndContinueOperation;
        },
      },
    },
  },
  ExceptionRegionEncoder: {
    kind: "struct",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddCatch: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddFault: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddFilter: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddFinally: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsSmallExceptionRegion: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSmallRegionCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
      HasSmallFormat: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ExportedTypeExtensions: {
    kind: "class",
    members: {
      GetTypeDefinitionId: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  FieldTypeEncoder: {
    kind: "struct",
    members: {
      FieldTypeEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      CustomModifiers: {
        kind: "method",
        methodKind: "ordinary",
      },
      Type: {
        kind: "method",
        methodKind: "ordinary",
      },
      TypedReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  FixedArgumentsEncoder: {
    kind: "struct",
    members: {
      FixedArgumentsEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddArgument: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  FunctionPointerAttributes: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Ecma335.FunctionPointerAttributes;
        },
      },
      HasThis: {
        kind: "field",
        type: () => {
          return Ecma335.FunctionPointerAttributes;
        },
      },
      HasExplicitThis: {
        kind: "field",
        type: () => {
          return Ecma335.FunctionPointerAttributes;
        },
      },
    },
  },
  GenericTypeArgumentsEncoder: {
    kind: "struct",
    members: {
      GenericTypeArgumentsEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddArgument: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  HeapIndex: {
    kind: "enum",
    members: {
      UserString: {
        kind: "field",
        type: () => {
          return Ecma335.HeapIndex;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return Ecma335.HeapIndex;
        },
      },
      Blob: {
        kind: "field",
        type: () => {
          return Ecma335.HeapIndex;
        },
      },
      Guid: {
        kind: "field",
        type: () => {
          return Ecma335.HeapIndex;
        },
      },
    },
  },
  InstructionEncoder: {
    kind: "struct",
    members: {
      InstructionEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Branch: {
        kind: "method",
        methodKind: "ordinary",
      },
      Call: {
        kind: "method",
        methodKind: "ordinary",
      },
      CallIndirect: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineLabel: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadArgument: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadArgumentAddress: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadConstantI4: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadConstantI8: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadConstantR4: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadConstantR8: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadLocal: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadLocalAddress: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadString: {
        kind: "method",
        methodKind: "ordinary",
      },
      MarkLabel: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      StoreArgument: {
        kind: "method",
        methodKind: "ordinary",
      },
      StoreLocal: {
        kind: "method",
        methodKind: "ordinary",
      },
      Switch: {
        kind: "method",
        methodKind: "ordinary",
      },
      Token: {
        kind: "method",
        methodKind: "ordinary",
      },
      CodeBuilder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
      ControlFlowBuilder: {
        kind: "property",
        type: () => {
          return Ecma335.ControlFlowBuilder;
        },
      },
      Offset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  LabelHandle: {
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
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  LiteralEncoder: {
    kind: "struct",
    members: {
      LiteralEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Scalar: {
        kind: "method",
        methodKind: "ordinary",
      },
      TaggedScalar: {
        kind: "method",
        methodKind: "ordinary",
      },
      TaggedVector: {
        kind: "method",
        methodKind: "ordinary",
      },
      Vector: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  LiteralsEncoder: {
    kind: "struct",
    members: {
      LiteralsEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddLiteral: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  LocalVariableTypeEncoder: {
    kind: "struct",
    members: {
      LocalVariableTypeEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      CustomModifiers: {
        kind: "method",
        methodKind: "ordinary",
      },
      Type: {
        kind: "method",
        methodKind: "ordinary",
      },
      TypedReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  LocalVariablesEncoder: {
    kind: "struct",
    members: {
      LocalVariablesEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddVariable: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  MetadataAggregator: {
    kind: "class",
    members: {
      MetadataAggregator: {
        kind: "method",
        methodKind: "constructor",
      },
      GetGenerationHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  MetadataBuilder: {
    kind: "class",
    members: {
      MetadataBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddAssembly: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddAssemblyFile: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddAssemblyReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddConstant: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddCustomDebugInformation: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddDeclarativeSecurityAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddDocument: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddEncLogEntry: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddEncMapEntry: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddEvent: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddEventMap: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddExportedType: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddFieldDefinition: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddFieldLayout: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddFieldRelativeVirtualAddress: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddGenericParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddGenericParameterConstraint: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddImportScope: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddInterfaceImplementation: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddLocalConstant: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddLocalScope: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddLocalVariable: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddManifestResource: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMarshallingDescriptor: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMemberReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMethodDebugInformation: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMethodDefinition: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMethodImplementation: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMethodImport: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMethodSemantics: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMethodSpecification: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddModule: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddModuleReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddNestedType: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddPropertyMap: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddStandaloneSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddStateMachineMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddTypeDefinition: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddTypeLayout: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddTypeReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddTypeSpecification: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOrAddBlob: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOrAddBlobUTF16: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOrAddBlobUTF8: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOrAddConstantBlob: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOrAddDocumentName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOrAddGuid: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOrAddString: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOrAddUserString: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetRowCount: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetRowCounts: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReserveGuid: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReserveUserString: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCapacity: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  MetadataReaderExtensions: {
    kind: "class",
    members: {
      GetEditAndContinueLogEntries: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetEditAndContinueMapEntries: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHeapMetadataOffset: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHeapSize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetNextHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTableMetadataOffset: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTableRowCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTableRowSize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypesWithEvents: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypesWithProperties: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ResolveSignatureTypeKind: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  MetadataRootBuilder: {
    kind: "class",
    members: {
      MetadataRootBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      Serialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      MetadataVersion: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Sizes: {
        kind: "property",
        type: () => {
          return Ecma335.MetadataSizes;
        },
      },
      SuppressValidation: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  MetadataSizes: {
    kind: "class",
    members: {
      GetAlignedHeapSize: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExternalRowCounts: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
      HeapSizes: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
      RowCounts: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
    },
    isSealed: true,
  },
  MetadataTokens: {
    kind: "class",
    members: {
      HeapCount: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      TableCount: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      AssemblyFileHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AssemblyReferenceHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BlobHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ConstantHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CustomAttributeHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CustomDebugInformationHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DeclarativeSecurityAttributeHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DocumentHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DocumentNameBlobHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EntityHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EventDefinitionHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ExportedTypeHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FieldDefinitionHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GenericParameterConstraintHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GenericParameterHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHeapOffset: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRowNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetToken: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GuidHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Handle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ImportScopeHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      InterfaceImplementationHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LocalConstantHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LocalScopeHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LocalVariableHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ManifestResourceHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MemberReferenceHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MethodDebugInformationHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MethodDefinitionHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MethodImplementationHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MethodSpecificationHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ModuleReferenceHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ParameterHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PropertyDefinitionHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StandaloneSignatureHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StringHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryGetHeapIndex: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryGetTableIndex: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TypeDefinitionHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TypeReferenceHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TypeSpecificationHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UserStringHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  MethodBodyAttributes: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Ecma335.MethodBodyAttributes;
        },
      },
      InitLocals: {
        kind: "field",
        type: () => {
          return Ecma335.MethodBodyAttributes;
        },
      },
    },
  },
  MethodBodyStreamEncoder: {
    kind: "class",
    members: {
      MethodBody: {
        kind: "struct",
        members: {
          ExceptionRegions: {
            kind: "property",
            type: () => {
              return Ecma335.ExceptionRegionEncoder;
            },
          },
          Instructions: {
            kind: "property",
            type: () => {
              return Metadata.Blob;
            },
          },
          Offset: {
            kind: "property",
            type: () => {
              return System.Int32;
            },
          },
        },
      },
    },
  },
  MethodSignatureEncoder: {
    kind: "struct",
    members: {
      MethodSignatureEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Parameters: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
      HasVarArgs: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  NameEncoder: {
    kind: "struct",
    members: {
      NameEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Name: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  NamedArgumentTypeEncoder: {
    kind: "struct",
    members: {
      NamedArgumentTypeEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Object: {
        kind: "method",
        methodKind: "ordinary",
      },
      ScalarType: {
        kind: "method",
        methodKind: "ordinary",
      },
      SZArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  NamedArgumentsEncoder: {
    kind: "struct",
    members: {
      NamedArgumentsEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddArgument: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  ParameterTypeEncoder: {
    kind: "struct",
    members: {
      ParameterTypeEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      CustomModifiers: {
        kind: "method",
        methodKind: "ordinary",
      },
      Type: {
        kind: "method",
        methodKind: "ordinary",
      },
      TypedReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  ParametersEncoder: {
    kind: "struct",
    members: {
      ParametersEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      StartVarArgs: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
      HasVarArgs: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  PermissionSetEncoder: {
    kind: "struct",
    members: {
      PermissionSetEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddPermission: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  PortablePdbBuilder: {
    kind: "class",
    members: {
      PortablePdbBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      Serialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      FormatVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      IdProvider: {
        kind: "property",
        type: () => {
          return System.Func;
        },
      },
      MetadataVersion: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  ReturnTypeEncoder: {
    kind: "struct",
    members: {
      ReturnTypeEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      CustomModifiers: {
        kind: "method",
        methodKind: "ordinary",
      },
      Type: {
        kind: "method",
        methodKind: "ordinary",
      },
      TypedReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      Void: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  ScalarEncoder: {
    kind: "struct",
    members: {
      ScalarEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Constant: {
        kind: "method",
        methodKind: "ordinary",
      },
      NullArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      SystemType: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  SignatureDecoder: {
    kind: "struct",
    members: {
      SignatureDecoder: {
        kind: "method",
        methodKind: "constructor",
      },
      DecodeFieldSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      DecodeLocalSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      DecodeMethodSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      DecodeMethodSpecificationSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      DecodeType: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  SignatureTypeEncoder: {
    kind: "struct",
    members: {
      SignatureTypeEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Array: {
        kind: "method",
        methodKind: "ordinary",
      },
      Boolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      Byte: {
        kind: "method",
        methodKind: "ordinary",
      },
      Char: {
        kind: "method",
        methodKind: "ordinary",
      },
      CustomModifiers: {
        kind: "method",
        methodKind: "ordinary",
      },
      Double: {
        kind: "method",
        methodKind: "ordinary",
      },
      FunctionPointer: {
        kind: "method",
        methodKind: "ordinary",
      },
      GenericInstantiation: {
        kind: "method",
        methodKind: "ordinary",
      },
      GenericMethodTypeParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      GenericTypeParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      Int16: {
        kind: "method",
        methodKind: "ordinary",
      },
      Int32: {
        kind: "method",
        methodKind: "ordinary",
      },
      Int64: {
        kind: "method",
        methodKind: "ordinary",
      },
      IntPtr: {
        kind: "method",
        methodKind: "ordinary",
      },
      Object: {
        kind: "method",
        methodKind: "ordinary",
      },
      Pointer: {
        kind: "method",
        methodKind: "ordinary",
      },
      PrimitiveType: {
        kind: "method",
        methodKind: "ordinary",
      },
      SByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      Single: {
        kind: "method",
        methodKind: "ordinary",
      },
      String: {
        kind: "method",
        methodKind: "ordinary",
      },
      SZArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      Type: {
        kind: "method",
        methodKind: "ordinary",
      },
      TypedReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      UInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      UInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      UInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      UIntPtr: {
        kind: "method",
        methodKind: "ordinary",
      },
      VoidPointer: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
  SwitchInstructionEncoder: {
    kind: "struct",
    members: {
      Branch: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  TableIndex: {
    kind: "enum",
    members: {
      Module: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      TypeRef: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      TypeDef: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      FieldPtr: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      Field: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      MethodPtr: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      MethodDef: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      ParamPtr: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      Param: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      InterfaceImpl: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      MemberRef: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      Constant: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      CustomAttribute: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      FieldMarshal: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      DeclSecurity: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      ClassLayout: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      FieldLayout: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      StandAloneSig: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      EventMap: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      EventPtr: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      Event: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      PropertyMap: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      PropertyPtr: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      Property: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      MethodSemantics: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      MethodImpl: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      ModuleRef: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      TypeSpec: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      ImplMap: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      FieldRva: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      EncLog: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      EncMap: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      Assembly: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      AssemblyProcessor: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      AssemblyOS: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      AssemblyRef: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      AssemblyRefProcessor: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      AssemblyRefOS: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      File: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      ExportedType: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      ManifestResource: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      NestedClass: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      GenericParam: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      MethodSpec: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      GenericParamConstraint: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      Document: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      MethodDebugInformation: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      LocalScope: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      LocalVariable: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      LocalConstant: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      ImportScope: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      StateMachineMethod: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
      CustomDebugInformation: {
        kind: "field",
        type: () => {
          return Ecma335.TableIndex;
        },
      },
    },
  },
  VectorEncoder: {
    kind: "struct",
    members: {
      VectorEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Count: {
        kind: "method",
        methodKind: "ordinary",
      },
      Builder: {
        kind: "property",
        type: () => {
          return Metadata.BlobBuilder;
        },
      },
    },
  },
});
export default Ecma335
