import Generic from "../../Collections/Generic/index.js";
import ObjectModel from "../../Collections/ObjectModel/index.js";
import Globalization from "../../Globalization/index.js";
import System from "../../index.js";
import Xml from "../../Xml/index.js";
import Schema from "../../Xml/Schema/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as DataContracts } from "./DataContracts/index.js";
export { default as Formatters } from "./Formatters/index.js";
export { default as Json } from "./Json/index.js";

type SerializationLibrary = LibrarySymbolReference & {
  CollectionDataContractAttribute: LibrarySymbolReference & {
    CollectionDataContractAttribute: LibrarySymbolReference;
    IsItemNameSetExplicitly: LibrarySymbolReference;
    IsKeyNameSetExplicitly: LibrarySymbolReference;
    IsNameSetExplicitly: LibrarySymbolReference;
    IsNamespaceSetExplicitly: LibrarySymbolReference;
    IsReference: LibrarySymbolReference;
    IsReferenceSetExplicitly: LibrarySymbolReference;
    IsValueNameSetExplicitly: LibrarySymbolReference;
    ItemName: LibrarySymbolReference;
    KeyName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    ValueName: LibrarySymbolReference
  };
  ContractNamespaceAttribute: LibrarySymbolReference & {
    ContractNamespaceAttribute: LibrarySymbolReference;
    ClrNamespace: LibrarySymbolReference;
    ContractNamespace: LibrarySymbolReference
  };
  DataContractAttribute: LibrarySymbolReference & {
    DataContractAttribute: LibrarySymbolReference;
    IsNameSetExplicitly: LibrarySymbolReference;
    IsNamespaceSetExplicitly: LibrarySymbolReference;
    IsReference: LibrarySymbolReference;
    IsReferenceSetExplicitly: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Namespace: LibrarySymbolReference
  };
  DataContractResolver: LibrarySymbolReference & {
    DataContractResolver: LibrarySymbolReference;
    ResolveName: LibrarySymbolReference;
    TryResolveType: LibrarySymbolReference
  };
  DataContractSerializer: LibrarySymbolReference & {
    DataContractSerializer: LibrarySymbolReference;
    IsStartObject: LibrarySymbolReference;
    ReadObject: LibrarySymbolReference;
    WriteEndObject: LibrarySymbolReference;
    WriteObject: LibrarySymbolReference;
    WriteObjectContent: LibrarySymbolReference;
    WriteStartObject: LibrarySymbolReference;
    DataContractResolver: LibrarySymbolReference;
    IgnoreExtensionDataObject: LibrarySymbolReference;
    KnownTypes: LibrarySymbolReference;
    MaxItemsInObjectGraph: LibrarySymbolReference;
    PreserveObjectReferences: LibrarySymbolReference;
    SerializeReadOnlyTypes: LibrarySymbolReference
  };
  DataContractSerializerExtensions: LibrarySymbolReference & {
    GetSerializationSurrogateProvider: LibrarySymbolReference;
    SetSerializationSurrogateProvider: LibrarySymbolReference
  };
  DataContractSerializerSettings: LibrarySymbolReference & {
    DataContractSerializerSettings: LibrarySymbolReference;
    DataContractResolver: LibrarySymbolReference;
    IgnoreExtensionDataObject: LibrarySymbolReference;
    KnownTypes: LibrarySymbolReference;
    MaxItemsInObjectGraph: LibrarySymbolReference;
    PreserveObjectReferences: LibrarySymbolReference;
    RootName: LibrarySymbolReference;
    RootNamespace: LibrarySymbolReference;
    SerializeReadOnlyTypes: LibrarySymbolReference
  };
  DataMemberAttribute: LibrarySymbolReference & {
    DataMemberAttribute: LibrarySymbolReference;
    EmitDefaultValue: LibrarySymbolReference;
    IsNameSetExplicitly: LibrarySymbolReference;
    IsRequired: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Order: LibrarySymbolReference
  };
  DateTimeFormat: LibrarySymbolReference & {
    DateTimeFormat: LibrarySymbolReference;
    DateTimeStyles: LibrarySymbolReference;
    FormatProvider: LibrarySymbolReference;
    FormatString: LibrarySymbolReference
  };
  EmitTypeInformation: LibrarySymbolReference & {
    AsNeeded: LibrarySymbolReference;
    Always: LibrarySymbolReference;
    Never: LibrarySymbolReference
  };
  EnumMemberAttribute: LibrarySymbolReference & {
    EnumMemberAttribute: LibrarySymbolReference;
    IsValueSetExplicitly: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  ExportOptions: LibrarySymbolReference & {
    ExportOptions: LibrarySymbolReference;
    KnownTypes: LibrarySymbolReference;
    DataContractSurrogate: LibrarySymbolReference
  };
  ExtensionDataObject: LibrarySymbolReference & {

  };
  Formatter: LibrarySymbolReference & {
    Formatter: LibrarySymbolReference;
    Deserialize: LibrarySymbolReference;
    GetNext: LibrarySymbolReference;
    Schedule: LibrarySymbolReference;
    Serialize: LibrarySymbolReference;
    WriteArray: LibrarySymbolReference;
    WriteBoolean: LibrarySymbolReference;
    WriteByte: LibrarySymbolReference;
    WriteChar: LibrarySymbolReference;
    WriteDateTime: LibrarySymbolReference;
    WriteDecimal: LibrarySymbolReference;
    WriteDouble: LibrarySymbolReference;
    WriteInt16: LibrarySymbolReference;
    WriteInt32: LibrarySymbolReference;
    WriteInt64: LibrarySymbolReference;
    WriteMember: LibrarySymbolReference;
    WriteObjectRef: LibrarySymbolReference;
    WriteSByte: LibrarySymbolReference;
    WriteSingle: LibrarySymbolReference;
    WriteTimeSpan: LibrarySymbolReference;
    WriteUInt16: LibrarySymbolReference;
    WriteUInt32: LibrarySymbolReference;
    WriteUInt64: LibrarySymbolReference;
    WriteValueType: LibrarySymbolReference;
    Binder: LibrarySymbolReference;
    Context: LibrarySymbolReference;
    SurrogateSelector: LibrarySymbolReference
  };
  FormatterConverter: LibrarySymbolReference & {
    FormatterConverter: LibrarySymbolReference;
    Convert: LibrarySymbolReference;
    ToBoolean: LibrarySymbolReference;
    ToByte: LibrarySymbolReference;
    ToChar: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToDecimal: LibrarySymbolReference;
    ToDouble: LibrarySymbolReference;
    ToInt16: LibrarySymbolReference;
    ToInt32: LibrarySymbolReference;
    ToInt64: LibrarySymbolReference;
    ToSByte: LibrarySymbolReference;
    ToSingle: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ToUInt16: LibrarySymbolReference;
    ToUInt32: LibrarySymbolReference;
    ToUInt64: LibrarySymbolReference
  };
  FormatterServices: LibrarySymbolReference & {
    CheckTypeSecurity: LibrarySymbolReference;
    GetObjectData: LibrarySymbolReference;
    GetSafeUninitializedObject: LibrarySymbolReference;
    GetSerializableMembers: LibrarySymbolReference;
    GetSurrogateForCyclicalReference: LibrarySymbolReference;
    GetTypeFromAssembly: LibrarySymbolReference;
    GetUninitializedObject: LibrarySymbolReference;
    PopulateObjectMembers: LibrarySymbolReference
  };
  IDeserializationCallback: LibrarySymbolReference & {
    OnDeserialization: LibrarySymbolReference
  };
  IExtensibleDataObject: LibrarySymbolReference & {
    ExtensionData: LibrarySymbolReference
  };
  IFormatter: LibrarySymbolReference & {
    Deserialize: LibrarySymbolReference;
    Serialize: LibrarySymbolReference;
    Binder: LibrarySymbolReference;
    Context: LibrarySymbolReference;
    SurrogateSelector: LibrarySymbolReference
  };
  IFormatterConverter: LibrarySymbolReference & {
    Convert: LibrarySymbolReference;
    ToBoolean: LibrarySymbolReference;
    ToByte: LibrarySymbolReference;
    ToChar: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToDecimal: LibrarySymbolReference;
    ToDouble: LibrarySymbolReference;
    ToInt16: LibrarySymbolReference;
    ToInt32: LibrarySymbolReference;
    ToInt64: LibrarySymbolReference;
    ToSByte: LibrarySymbolReference;
    ToSingle: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ToUInt16: LibrarySymbolReference;
    ToUInt32: LibrarySymbolReference;
    ToUInt64: LibrarySymbolReference
  };
  IObjectReference: LibrarySymbolReference & {
    GetRealObject: LibrarySymbolReference
  };
  ISafeSerializationData: LibrarySymbolReference & {
    CompleteDeserialization: LibrarySymbolReference
  };
  ISerializable: LibrarySymbolReference & {
    GetObjectData: LibrarySymbolReference
  };
  ISerializationSurrogate: LibrarySymbolReference & {
    GetObjectData: LibrarySymbolReference;
    SetObjectData: LibrarySymbolReference
  };
  ISerializationSurrogateProvider: LibrarySymbolReference & {
    GetDeserializedObject: LibrarySymbolReference;
    GetObjectToSerialize: LibrarySymbolReference;
    GetSurrogateType: LibrarySymbolReference
  };
  ISerializationSurrogateProvider2: LibrarySymbolReference & {
    GetCustomDataToExport: LibrarySymbolReference;
    GetKnownCustomDataTypes: LibrarySymbolReference;
    GetReferencedTypeOnImport: LibrarySymbolReference
  };
  ISurrogateSelector: LibrarySymbolReference & {
    ChainSelector: LibrarySymbolReference;
    GetNextSelector: LibrarySymbolReference;
    GetSurrogate: LibrarySymbolReference
  };
  IgnoreDataMemberAttribute: LibrarySymbolReference & {
    IgnoreDataMemberAttribute: LibrarySymbolReference
  };
  InvalidDataContractException: LibrarySymbolReference & {
    InvalidDataContractException: LibrarySymbolReference
  };
  KnownTypeAttribute: LibrarySymbolReference & {
    KnownTypeAttribute: LibrarySymbolReference;
    MethodName: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  ObjectIDGenerator: LibrarySymbolReference & {
    ObjectIDGenerator: LibrarySymbolReference;
    GetId: LibrarySymbolReference;
    HasId: LibrarySymbolReference
  };
  ObjectManager: LibrarySymbolReference & {
    ObjectManager: LibrarySymbolReference;
    DoFixups: LibrarySymbolReference;
    GetObject: LibrarySymbolReference;
    RaiseDeserializationEvent: LibrarySymbolReference;
    RaiseOnDeserializingEvent: LibrarySymbolReference;
    RecordArrayElementFixup: LibrarySymbolReference;
    RecordDelayedFixup: LibrarySymbolReference;
    RecordFixup: LibrarySymbolReference;
    RegisterObject: LibrarySymbolReference
  };
  OnDeserializedAttribute: LibrarySymbolReference & {
    OnDeserializedAttribute: LibrarySymbolReference
  };
  OnDeserializingAttribute: LibrarySymbolReference & {
    OnDeserializingAttribute: LibrarySymbolReference
  };
  OnSerializedAttribute: LibrarySymbolReference & {
    OnSerializedAttribute: LibrarySymbolReference
  };
  OnSerializingAttribute: LibrarySymbolReference & {
    OnSerializingAttribute: LibrarySymbolReference
  };
  OptionalFieldAttribute: LibrarySymbolReference & {
    OptionalFieldAttribute: LibrarySymbolReference;
    VersionAdded: LibrarySymbolReference
  };
  SafeSerializationEventArgs: LibrarySymbolReference & {
    AddSerializedState: LibrarySymbolReference;
    StreamingContext: LibrarySymbolReference
  };
  SerializationBinder: LibrarySymbolReference & {
    SerializationBinder: LibrarySymbolReference;
    BindToName: LibrarySymbolReference;
    BindToType: LibrarySymbolReference
  };
  SerializationEntry: LibrarySymbolReference & {
    Name: LibrarySymbolReference;
    ObjectType: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SerializationException: LibrarySymbolReference & {
    SerializationException: LibrarySymbolReference
  };
  SerializationInfo: LibrarySymbolReference & {
    SerializationInfo: LibrarySymbolReference;
    AddValue: LibrarySymbolReference;
    GetBoolean: LibrarySymbolReference;
    GetByte: LibrarySymbolReference;
    GetChar: LibrarySymbolReference;
    GetDateTime: LibrarySymbolReference;
    GetDecimal: LibrarySymbolReference;
    GetDouble: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetInt16: LibrarySymbolReference;
    GetInt32: LibrarySymbolReference;
    GetInt64: LibrarySymbolReference;
    GetSByte: LibrarySymbolReference;
    GetSingle: LibrarySymbolReference;
    GetString: LibrarySymbolReference;
    GetUInt16: LibrarySymbolReference;
    GetUInt32: LibrarySymbolReference;
    GetUInt64: LibrarySymbolReference;
    GetValue: LibrarySymbolReference;
    SetType: LibrarySymbolReference;
    AssemblyName: LibrarySymbolReference;
    FullTypeName: LibrarySymbolReference;
    IsAssemblyNameSetExplicit: LibrarySymbolReference;
    IsFullTypeNameSetExplicit: LibrarySymbolReference;
    MemberCount: LibrarySymbolReference;
    ObjectType: LibrarySymbolReference
  };
  SerializationInfoEnumerator: LibrarySymbolReference & {
    MoveNext: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Current: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ObjectType: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SerializationObjectManager: LibrarySymbolReference & {
    SerializationObjectManager: LibrarySymbolReference;
    RaiseOnSerializedEvent: LibrarySymbolReference;
    RegisterObject: LibrarySymbolReference
  };
  StreamingContext: LibrarySymbolReference & {
    StreamingContext: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Context: LibrarySymbolReference;
    State: LibrarySymbolReference
  };
  StreamingContextStates: LibrarySymbolReference & {
    CrossProcess: LibrarySymbolReference;
    CrossMachine: LibrarySymbolReference;
    File: LibrarySymbolReference;
    Persistence: LibrarySymbolReference;
    Remoting: LibrarySymbolReference;
    Other: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    CrossAppDomain: LibrarySymbolReference;
    All: LibrarySymbolReference
  };
  SurrogateSelector: LibrarySymbolReference & {
    SurrogateSelector: LibrarySymbolReference;
    AddSurrogate: LibrarySymbolReference;
    ChainSelector: LibrarySymbolReference;
    GetNextSelector: LibrarySymbolReference;
    GetSurrogate: LibrarySymbolReference;
    RemoveSurrogate: LibrarySymbolReference
  };
  XPathQueryGenerator: LibrarySymbolReference & {
    CreateFromDataContractSerializer: LibrarySymbolReference
  };
  XmlObjectSerializer: LibrarySymbolReference & {
    XmlObjectSerializer: LibrarySymbolReference;
    IsStartObject: LibrarySymbolReference;
    ReadObject: LibrarySymbolReference;
    WriteEndObject: LibrarySymbolReference;
    WriteObject: LibrarySymbolReference;
    WriteObjectContent: LibrarySymbolReference;
    WriteStartObject: LibrarySymbolReference
  };
  XmlSerializableServices: LibrarySymbolReference & {
    AddDefaultSchema: LibrarySymbolReference;
    ReadNodes: LibrarySymbolReference;
    WriteNodes: LibrarySymbolReference
  };
  XsdDataContractExporter: LibrarySymbolReference & {
    XsdDataContractExporter: LibrarySymbolReference;
    CanExport: LibrarySymbolReference;
    Export: LibrarySymbolReference;
    GetRootElementName: LibrarySymbolReference;
    GetSchemaType: LibrarySymbolReference;
    GetSchemaTypeName: LibrarySymbolReference;
    Options: LibrarySymbolReference;
    Schemas: LibrarySymbolReference
  }
};
const Serialization: SerializationLibrary = createLibrary("System.Runtime.Serialization", {
  CollectionDataContractAttribute: {
    kind: "class",
    members: {
      CollectionDataContractAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsItemNameSetExplicitly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsKeyNameSetExplicitly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNameSetExplicitly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNamespaceSetExplicitly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsReference: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsReferenceSetExplicitly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsValueNameSetExplicitly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ItemName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      KeyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ValueName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  ContractNamespaceAttribute: {
    kind: "class",
    members: {
      ContractNamespaceAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ClrNamespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ContractNamespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  DataContractAttribute: {
    kind: "class",
    members: {
      DataContractAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsNameSetExplicitly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNamespaceSetExplicitly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsReference: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsReferenceSetExplicitly: {
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
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  DataContractResolver: {
    kind: "class",
    members: {
      DataContractResolver: {
        kind: "method",
        methodKind: "constructor",
      },
      ResolveName: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      TryResolveType: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  DataContractSerializer: {
    kind: "class",
    members: {
      DataContractSerializer: {
        kind: "method",
        methodKind: "constructor",
      },
      IsStartObject: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadObject: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteEndObject: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteObject: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteObjectContent: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteStartObject: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DataContractResolver: {
        kind: "property",
        type: () => {
          return Serialization.DataContractResolver;
        },
      },
      IgnoreExtensionDataObject: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      KnownTypes: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      MaxItemsInObjectGraph: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PreserveObjectReferences: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SerializeReadOnlyTypes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  DataContractSerializerExtensions: {
    kind: "class",
    members: {
      GetSerializationSurrogateProvider: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetSerializationSurrogateProvider: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  DataContractSerializerSettings: {
    kind: "class",
    members: {
      DataContractSerializerSettings: {
        kind: "method",
        methodKind: "constructor",
      },
      DataContractResolver: {
        kind: "property",
        type: () => {
          return Serialization.DataContractResolver;
        },
      },
      IgnoreExtensionDataObject: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      KnownTypes: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isNullable: true,
      },
      MaxItemsInObjectGraph: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PreserveObjectReferences: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      RootName: {
        kind: "property",
        type: () => {
          return Xml.XmlDictionaryString;
        },
        isNullable: true,
      },
      RootNamespace: {
        kind: "property",
        type: () => {
          return Xml.XmlDictionaryString;
        },
        isNullable: true,
      },
      SerializeReadOnlyTypes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  DataMemberAttribute: {
    kind: "class",
    members: {
      DataMemberAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      EmitDefaultValue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNameSetExplicitly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsRequired: {
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
      },
      Order: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  DateTimeFormat: {
    kind: "class",
    members: {
      DateTimeFormat: {
        kind: "method",
        methodKind: "constructor",
      },
      DateTimeStyles: {
        kind: "property",
        type: () => {
          return Globalization.DateTimeStyles;
        },
      },
      FormatProvider: {
        kind: "property",
        type: () => {
          return System.IFormatProvider;
        },
      },
      FormatString: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  EmitTypeInformation: {
    kind: "enum",
    members: {
      AsNeeded: {
        kind: "field",
        type: () => {
          return Serialization.EmitTypeInformation;
        },
      },
      Always: {
        kind: "field",
        type: () => {
          return Serialization.EmitTypeInformation;
        },
      },
      Never: {
        kind: "field",
        type: () => {
          return Serialization.EmitTypeInformation;
        },
      },
    },
  },
  EnumMemberAttribute: {
    kind: "class",
    members: {
      EnumMemberAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsValueSetExplicitly: {
        kind: "property",
        type: () => {
          return System.Boolean;
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
  ExportOptions: {
    kind: "class",
    members: {
      ExportOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      KnownTypes: {
        kind: "property",
        type: () => {
          return ObjectModel.Collection;
        },
      },
      DataContractSurrogate: {
        kind: "property",
        type: () => {
          return Serialization.ISerializationSurrogateProvider;
        },
        isNullable: true,
      },
    },
  },
  ExtensionDataObject: {
    kind: "class",
    members: {},
    isSealed: true,
  },
  Formatter: {
    kind: "class",
    members: {
      Formatter: {
        kind: "method",
        methodKind: "constructor",
      },
      Deserialize: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetNext: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Schedule: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Serialize: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteArray: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteBoolean: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteByte: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteChar: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteDecimal: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteDouble: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteInt16: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteInt32: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteInt64: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteMember: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteObjectRef: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteSByte: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteSingle: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteTimeSpan: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteUInt16: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteUInt32: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteUInt64: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteValueType: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Binder: {
        kind: "property",
        type: () => {
          return Serialization.SerializationBinder;
        },
        isAbstract: true,
      },
      Context: {
        kind: "property",
        type: () => {
          return Serialization.StreamingContext;
        },
        isAbstract: true,
      },
      SurrogateSelector: {
        kind: "property",
        type: () => {
          return Serialization.ISurrogateSelector;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  FormatterConverter: {
    kind: "class",
    members: {
      FormatterConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      Convert: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToChar: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  FormatterServices: {
    kind: "class",
    members: {
      CheckTypeSecurity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetObjectData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetSafeUninitializedObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetSerializableMembers: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetSurrogateForCyclicalReference: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypeFromAssembly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetUninitializedObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopulateObjectMembers: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  IDeserializationCallback: {
    kind: "interface",
    members: {
      OnDeserialization: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IExtensibleDataObject: {
    kind: "interface",
    members: {
      ExtensionData: {
        kind: "property",
        type: () => {
          return Serialization.ExtensionDataObject;
        },
      },
    },
  },
  IFormatter: {
    kind: "interface",
    members: {
      Deserialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      Serialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      Binder: {
        kind: "property",
        type: () => {
          return Serialization.SerializationBinder;
        },
      },
      Context: {
        kind: "property",
        type: () => {
          return Serialization.StreamingContext;
        },
      },
      SurrogateSelector: {
        kind: "property",
        type: () => {
          return Serialization.ISurrogateSelector;
        },
      },
    },
  },
  IFormatterConverter: {
    kind: "interface",
    members: {
      Convert: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToChar: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IObjectReference: {
    kind: "interface",
    members: {
      GetRealObject: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISafeSerializationData: {
    kind: "interface",
    members: {
      CompleteDeserialization: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISerializable: {
    kind: "interface",
    members: {
      GetObjectData: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISerializationSurrogate: {
    kind: "interface",
    members: {
      GetObjectData: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetObjectData: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISerializationSurrogateProvider: {
    kind: "interface",
    members: {
      GetDeserializedObject: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetObjectToSerialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSurrogateType: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISerializationSurrogateProvider2: {
    kind: "interface",
    members: {
      GetCustomDataToExport: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetKnownCustomDataTypes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetReferencedTypeOnImport: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISurrogateSelector: {
    kind: "interface",
    members: {
      ChainSelector: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNextSelector: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSurrogate: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IgnoreDataMemberAttribute: {
    kind: "class",
    members: {
      IgnoreDataMemberAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  InvalidDataContractException: {
    kind: "class",
    members: {
      InvalidDataContractException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  KnownTypeAttribute: {
    kind: "class",
    members: {
      KnownTypeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      MethodName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  ObjectIDGenerator: {
    kind: "class",
    members: {
      ObjectIDGenerator: {
        kind: "method",
        methodKind: "constructor",
      },
      GetId: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      HasId: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  ObjectManager: {
    kind: "class",
    members: {
      ObjectManager: {
        kind: "method",
        methodKind: "constructor",
      },
      DoFixups: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetObject: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RaiseDeserializationEvent: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RaiseOnDeserializingEvent: {
        kind: "method",
        methodKind: "ordinary",
      },
      RecordArrayElementFixup: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RecordDelayedFixup: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RecordFixup: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RegisterObject: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  OnDeserializedAttribute: {
    kind: "class",
    members: {
      OnDeserializedAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  OnDeserializingAttribute: {
    kind: "class",
    members: {
      OnDeserializingAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  OnSerializedAttribute: {
    kind: "class",
    members: {
      OnSerializedAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  OnSerializingAttribute: {
    kind: "class",
    members: {
      OnSerializingAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  OptionalFieldAttribute: {
    kind: "class",
    members: {
      OptionalFieldAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      VersionAdded: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  SafeSerializationEventArgs: {
    kind: "class",
    members: {
      AddSerializedState: {
        kind: "method",
        methodKind: "ordinary",
      },
      StreamingContext: {
        kind: "property",
        type: () => {
          return Serialization.StreamingContext;
        },
      },
    },
    isSealed: true,
  },
  SerializationBinder: {
    kind: "class",
    members: {
      SerializationBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      BindToName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BindToType: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  SerializationEntry: {
    kind: "struct",
    members: {
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ObjectType: {
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
  SerializationException: {
    kind: "class",
    members: {
      SerializationException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  SerializationInfo: {
    kind: "class",
    members: {
      SerializationInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      AddValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetChar: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDateTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetString: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetType: {
        kind: "method",
        methodKind: "ordinary",
      },
      AssemblyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      FullTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      IsAssemblyNameSetExplicit: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsFullTypeNameSetExplicit: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MemberCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ObjectType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  SerializationInfoEnumerator: {
    kind: "class",
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
          return Serialization.SerializationEntry;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ObjectType: {
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
    isSealed: true,
  },
  SerializationObjectManager: {
    kind: "class",
    members: {
      SerializationObjectManager: {
        kind: "method",
        methodKind: "constructor",
      },
      RaiseOnSerializedEvent: {
        kind: "method",
        methodKind: "ordinary",
      },
      RegisterObject: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  StreamingContext: {
    kind: "struct",
    members: {
      StreamingContext: {
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
      Context: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      State: {
        kind: "property",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
    },
  },
  StreamingContextStates: {
    kind: "enum",
    members: {
      CrossProcess: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      CrossMachine: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      File: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      Persistence: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      Remoting: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      Other: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      Clone: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      CrossAppDomain: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      All: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
    },
  },
  SurrogateSelector: {
    kind: "class",
    members: {
      SurrogateSelector: {
        kind: "method",
        methodKind: "constructor",
      },
      AddSurrogate: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ChainSelector: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetNextSelector: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSurrogate: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveSurrogate: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  XPathQueryGenerator: {
    kind: "class",
    members: {
      CreateFromDataContractSerializer: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  XmlObjectSerializer: {
    kind: "class",
    members: {
      XmlObjectSerializer: {
        kind: "method",
        methodKind: "constructor",
      },
      IsStartObject: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ReadObject: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteEndObject: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteObject: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteObjectContent: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteStartObject: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  XmlSerializableServices: {
    kind: "class",
    members: {
      AddDefaultSchema: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadNodes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteNodes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  XsdDataContractExporter: {
    kind: "class",
    members: {
      XsdDataContractExporter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanExport: {
        kind: "method",
        methodKind: "ordinary",
      },
      Export: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetRootElementName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSchemaType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSchemaTypeName: {
        kind: "method",
        methodKind: "ordinary",
      },
      Options: {
        kind: "property",
        type: () => {
          return Serialization.ExportOptions;
        },
      },
      Schemas: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaSet;
        },
      },
    },
  },
});
export default Serialization
