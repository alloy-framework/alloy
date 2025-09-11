import Collections from "../../Collections/index.js";
import Specialized from "../../Collections/Specialized/index.js";
import System from "../../index.js";
import Xml from "../index.js";
import Schema from "../Schema/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type SerializationLibrary = LibrarySymbolReference & {
  CodeGenerationOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    GenerateProperties: LibrarySymbolReference;
    GenerateNewAsync: LibrarySymbolReference;
    GenerateOldAsync: LibrarySymbolReference;
    GenerateOrder: LibrarySymbolReference;
    EnableDataBinding: LibrarySymbolReference
  };
  CodeIdentifier: LibrarySymbolReference & {
    CodeIdentifier: LibrarySymbolReference;
    MakeCamel: LibrarySymbolReference;
    MakePascal: LibrarySymbolReference;
    MakeValid: LibrarySymbolReference
  };
  CodeIdentifiers: LibrarySymbolReference & {
    CodeIdentifiers: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AddReserved: LibrarySymbolReference;
    AddUnique: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    IsInUse: LibrarySymbolReference;
    MakeRightCase: LibrarySymbolReference;
    MakeUnique: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveReserved: LibrarySymbolReference;
    ToArray: LibrarySymbolReference;
    UseCamelCasing: LibrarySymbolReference
  };
  IXmlSerializable: LibrarySymbolReference & {
    ReadXml: LibrarySymbolReference;
    WriteXml: LibrarySymbolReference
  };
  IXmlTextParser: LibrarySymbolReference & {
    Normalized: LibrarySymbolReference;
    WhitespaceHandling: LibrarySymbolReference
  };
  ImportContext: LibrarySymbolReference & {
    ImportContext: LibrarySymbolReference;
    ShareTypes: LibrarySymbolReference;
    TypeIdentifiers: LibrarySymbolReference;
    Warnings: LibrarySymbolReference
  };
  SchemaImporter: LibrarySymbolReference & {

  };
  SoapAttributeAttribute: LibrarySymbolReference & {
    SoapAttributeAttribute: LibrarySymbolReference;
    AttributeName: LibrarySymbolReference;
    DataType: LibrarySymbolReference;
    Namespace: LibrarySymbolReference
  };
  SoapAttributeOverrides: LibrarySymbolReference & {
    SoapAttributeOverrides: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  SoapAttributes: LibrarySymbolReference & {
    SoapAttributes: LibrarySymbolReference;
    SoapAttribute: LibrarySymbolReference;
    SoapDefaultValue: LibrarySymbolReference;
    SoapElement: LibrarySymbolReference;
    SoapEnum: LibrarySymbolReference;
    SoapIgnore: LibrarySymbolReference;
    SoapType: LibrarySymbolReference
  };
  SoapElementAttribute: LibrarySymbolReference & {
    SoapElementAttribute: LibrarySymbolReference;
    DataType: LibrarySymbolReference;
    ElementName: LibrarySymbolReference;
    IsNullable: LibrarySymbolReference
  };
  SoapEnumAttribute: LibrarySymbolReference & {
    SoapEnumAttribute: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  SoapIgnoreAttribute: LibrarySymbolReference & {
    SoapIgnoreAttribute: LibrarySymbolReference
  };
  SoapIncludeAttribute: LibrarySymbolReference & {
    SoapIncludeAttribute: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  SoapReflectionImporter: LibrarySymbolReference & {
    SoapReflectionImporter: LibrarySymbolReference;
    ImportMembersMapping: LibrarySymbolReference;
    ImportTypeMapping: LibrarySymbolReference;
    IncludeType: LibrarySymbolReference;
    IncludeTypes: LibrarySymbolReference
  };
  SoapSchemaMember: LibrarySymbolReference & {
    SoapSchemaMember: LibrarySymbolReference;
    MemberName: LibrarySymbolReference;
    MemberType: LibrarySymbolReference
  };
  SoapTypeAttribute: LibrarySymbolReference & {
    SoapTypeAttribute: LibrarySymbolReference;
    IncludeInSchema: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    TypeName: LibrarySymbolReference
  };
  UnreferencedObjectEventArgs: LibrarySymbolReference & {
    UnreferencedObjectEventArgs: LibrarySymbolReference;
    UnreferencedId: LibrarySymbolReference;
    UnreferencedObject: LibrarySymbolReference
  };
  UnreferencedObjectEventHandler: LibrarySymbolReference & {
    UnreferencedObjectEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  XmlAnyAttributeAttribute: LibrarySymbolReference & {
    XmlAnyAttributeAttribute: LibrarySymbolReference
  };
  XmlAnyElementAttribute: LibrarySymbolReference & {
    XmlAnyElementAttribute: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    Order: LibrarySymbolReference
  };
  XmlAnyElementAttributes: LibrarySymbolReference & {
    XmlAnyElementAttributes: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  XmlArrayAttribute: LibrarySymbolReference & {
    XmlArrayAttribute: LibrarySymbolReference;
    ElementName: LibrarySymbolReference;
    Form: LibrarySymbolReference;
    IsNullable: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    Order: LibrarySymbolReference
  };
  XmlArrayItemAttribute: LibrarySymbolReference & {
    XmlArrayItemAttribute: LibrarySymbolReference;
    DataType: LibrarySymbolReference;
    ElementName: LibrarySymbolReference;
    Form: LibrarySymbolReference;
    IsNullable: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    NestingLevel: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  XmlArrayItemAttributes: LibrarySymbolReference & {
    XmlArrayItemAttributes: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  XmlAttributeAttribute: LibrarySymbolReference & {
    XmlAttributeAttribute: LibrarySymbolReference;
    AttributeName: LibrarySymbolReference;
    DataType: LibrarySymbolReference;
    Form: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  XmlAttributeEventArgs: LibrarySymbolReference & {
    Attr: LibrarySymbolReference;
    ExpectedAttributes: LibrarySymbolReference;
    LineNumber: LibrarySymbolReference;
    LinePosition: LibrarySymbolReference;
    ObjectBeingDeserialized: LibrarySymbolReference
  };
  XmlAttributeEventHandler: LibrarySymbolReference & {
    XmlAttributeEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  XmlAttributeOverrides: LibrarySymbolReference & {
    XmlAttributeOverrides: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  XmlAttributes: LibrarySymbolReference & {
    XmlAttributes: LibrarySymbolReference;
    XmlAnyAttribute: LibrarySymbolReference;
    XmlAnyElements: LibrarySymbolReference;
    XmlArray: LibrarySymbolReference;
    XmlArrayItems: LibrarySymbolReference;
    XmlAttribute: LibrarySymbolReference;
    XmlChoiceIdentifier: LibrarySymbolReference;
    XmlDefaultValue: LibrarySymbolReference;
    XmlElements: LibrarySymbolReference;
    XmlEnum: LibrarySymbolReference;
    XmlIgnore: LibrarySymbolReference;
    Xmlns: LibrarySymbolReference;
    XmlRoot: LibrarySymbolReference;
    XmlText: LibrarySymbolReference;
    XmlType: LibrarySymbolReference
  };
  XmlChoiceIdentifierAttribute: LibrarySymbolReference & {
    XmlChoiceIdentifierAttribute: LibrarySymbolReference;
    MemberName: LibrarySymbolReference
  };
  XmlDeserializationEvents: LibrarySymbolReference & {
    OnUnknownAttribute: LibrarySymbolReference;
    OnUnknownElement: LibrarySymbolReference;
    OnUnknownNode: LibrarySymbolReference;
    OnUnreferencedObject: LibrarySymbolReference
  };
  XmlElementAttribute: LibrarySymbolReference & {
    XmlElementAttribute: LibrarySymbolReference;
    DataType: LibrarySymbolReference;
    ElementName: LibrarySymbolReference;
    Form: LibrarySymbolReference;
    IsNullable: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    Order: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  XmlElementAttributes: LibrarySymbolReference & {
    XmlElementAttributes: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  XmlElementEventArgs: LibrarySymbolReference & {
    Element: LibrarySymbolReference;
    ExpectedElements: LibrarySymbolReference;
    LineNumber: LibrarySymbolReference;
    LinePosition: LibrarySymbolReference;
    ObjectBeingDeserialized: LibrarySymbolReference
  };
  XmlElementEventHandler: LibrarySymbolReference & {
    XmlElementEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  XmlEnumAttribute: LibrarySymbolReference & {
    XmlEnumAttribute: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  XmlIgnoreAttribute: LibrarySymbolReference & {
    XmlIgnoreAttribute: LibrarySymbolReference
  };
  XmlIncludeAttribute: LibrarySymbolReference & {
    XmlIncludeAttribute: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  XmlMapping: LibrarySymbolReference & {
    SetKey: LibrarySymbolReference;
    ElementName: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    XsdElementName: LibrarySymbolReference
  };
  XmlMappingAccess: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    Write: LibrarySymbolReference
  };
  XmlMemberMapping: LibrarySymbolReference & {
    Any: LibrarySymbolReference;
    CheckSpecified: LibrarySymbolReference;
    ElementName: LibrarySymbolReference;
    MemberName: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    TypeFullName: LibrarySymbolReference;
    TypeName: LibrarySymbolReference;
    TypeNamespace: LibrarySymbolReference;
    XsdElementName: LibrarySymbolReference
  };
  XmlMembersMapping: LibrarySymbolReference & {
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    TypeName: LibrarySymbolReference;
    TypeNamespace: LibrarySymbolReference
  };
  XmlNamespaceDeclarationsAttribute: LibrarySymbolReference & {
    XmlNamespaceDeclarationsAttribute: LibrarySymbolReference
  };
  XmlNodeEventArgs: LibrarySymbolReference & {
    LineNumber: LibrarySymbolReference;
    LinePosition: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NamespaceURI: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    ObjectBeingDeserialized: LibrarySymbolReference;
    Text: LibrarySymbolReference
  };
  XmlNodeEventHandler: LibrarySymbolReference & {
    XmlNodeEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  XmlReflectionImporter: LibrarySymbolReference & {
    XmlReflectionImporter: LibrarySymbolReference;
    ImportMembersMapping: LibrarySymbolReference;
    ImportTypeMapping: LibrarySymbolReference;
    IncludeType: LibrarySymbolReference;
    IncludeTypes: LibrarySymbolReference
  };
  XmlReflectionMember: LibrarySymbolReference & {
    XmlReflectionMember: LibrarySymbolReference;
    IsReturnValue: LibrarySymbolReference;
    MemberName: LibrarySymbolReference;
    MemberType: LibrarySymbolReference;
    OverrideIsNullable: LibrarySymbolReference;
    SoapAttributes: LibrarySymbolReference;
    XmlAttributes: LibrarySymbolReference
  };
  XmlRootAttribute: LibrarySymbolReference & {
    XmlRootAttribute: LibrarySymbolReference;
    DataType: LibrarySymbolReference;
    ElementName: LibrarySymbolReference;
    IsNullable: LibrarySymbolReference;
    Namespace: LibrarySymbolReference
  };
  XmlSchemaEnumerator: LibrarySymbolReference & {
    XmlSchemaEnumerator: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    MoveNext: LibrarySymbolReference;
    Current: LibrarySymbolReference
  };
  XmlSchemaExporter: LibrarySymbolReference & {
    XmlSchemaExporter: LibrarySymbolReference;
    ExportAnyType: LibrarySymbolReference;
    ExportMembersMapping: LibrarySymbolReference;
    ExportTypeMapping: LibrarySymbolReference
  };
  XmlSchemaImporter: LibrarySymbolReference & {
    XmlSchemaImporter: LibrarySymbolReference;
    ImportAnyType: LibrarySymbolReference;
    ImportDerivedTypeMapping: LibrarySymbolReference;
    ImportMembersMapping: LibrarySymbolReference;
    ImportSchemaType: LibrarySymbolReference;
    ImportTypeMapping: LibrarySymbolReference
  };
  XmlSchemaProviderAttribute: LibrarySymbolReference & {
    XmlSchemaProviderAttribute: LibrarySymbolReference;
    IsAny: LibrarySymbolReference;
    MethodName: LibrarySymbolReference
  };
  XmlSchemas: LibrarySymbolReference & {
    XmlSchemas: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AddReference: LibrarySymbolReference;
    Compile: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Find: LibrarySymbolReference;
    GetSchemas: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    IsDataSet: LibrarySymbolReference;
    OnClear: LibrarySymbolReference;
    OnInsert: LibrarySymbolReference;
    OnRemove: LibrarySymbolReference;
    OnSet: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    IsCompiled: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  XmlSerializationCollectionFixupCallback: LibrarySymbolReference & {
    XmlSerializationCollectionFixupCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  XmlSerializationFixupCallback: LibrarySymbolReference & {
    XmlSerializationFixupCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  XmlSerializationGeneratedCode: LibrarySymbolReference & {
    XmlSerializationGeneratedCode: LibrarySymbolReference
  };
  XmlSerializationReadCallback: LibrarySymbolReference & {
    XmlSerializationReadCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  XmlSerializationReader: LibrarySymbolReference & {
    CollectionFixup: LibrarySymbolReference & {
      CollectionFixup: LibrarySymbolReference;
      Callback: LibrarySymbolReference;
      Collection: LibrarySymbolReference;
      CollectionItems: LibrarySymbolReference
    };
    Fixup: LibrarySymbolReference & {
      Fixup: LibrarySymbolReference;
      Callback: LibrarySymbolReference;
      Ids: LibrarySymbolReference;
      Source: LibrarySymbolReference
    }
  };
  XmlSerializationWriteCallback: LibrarySymbolReference & {
    XmlSerializationWriteCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  XmlSerializationWriter: LibrarySymbolReference & {
    XmlSerializationWriter: LibrarySymbolReference;
    AddWriteCallback: LibrarySymbolReference;
    CreateChoiceIdentifierValueException: LibrarySymbolReference;
    CreateInvalidAnyTypeException: LibrarySymbolReference;
    CreateInvalidChoiceIdentifierValueException: LibrarySymbolReference;
    CreateInvalidEnumValueException: LibrarySymbolReference;
    CreateMismatchChoiceException: LibrarySymbolReference;
    CreateUnknownAnyElementException: LibrarySymbolReference;
    CreateUnknownTypeException: LibrarySymbolReference;
    FromByteArrayBase64: LibrarySymbolReference;
    FromByteArrayHex: LibrarySymbolReference;
    FromChar: LibrarySymbolReference;
    FromDate: LibrarySymbolReference;
    FromDateTime: LibrarySymbolReference;
    FromEnum: LibrarySymbolReference;
    FromTime: LibrarySymbolReference;
    FromXmlName: LibrarySymbolReference;
    FromXmlNCName: LibrarySymbolReference;
    FromXmlNmToken: LibrarySymbolReference;
    FromXmlNmTokens: LibrarySymbolReference;
    FromXmlQualifiedName: LibrarySymbolReference;
    InitCallbacks: LibrarySymbolReference;
    ResolveDynamicAssembly: LibrarySymbolReference;
    TopLevelElement: LibrarySymbolReference;
    WriteAttribute: LibrarySymbolReference;
    WriteElementEncoded: LibrarySymbolReference;
    WriteElementLiteral: LibrarySymbolReference;
    WriteElementQualifiedName: LibrarySymbolReference;
    WriteElementString: LibrarySymbolReference;
    WriteElementStringRaw: LibrarySymbolReference;
    WriteEmptyTag: LibrarySymbolReference;
    WriteEndElement: LibrarySymbolReference;
    WriteId: LibrarySymbolReference;
    WriteNamespaceDeclarations: LibrarySymbolReference;
    WriteNullableQualifiedNameEncoded: LibrarySymbolReference;
    WriteNullableQualifiedNameLiteral: LibrarySymbolReference;
    WriteNullableStringEncoded: LibrarySymbolReference;
    WriteNullableStringEncodedRaw: LibrarySymbolReference;
    WriteNullableStringLiteral: LibrarySymbolReference;
    WriteNullableStringLiteralRaw: LibrarySymbolReference;
    WriteNullTagEncoded: LibrarySymbolReference;
    WriteNullTagLiteral: LibrarySymbolReference;
    WritePotentiallyReferencingElement: LibrarySymbolReference;
    WriteReferencedElements: LibrarySymbolReference;
    WriteReferencingElement: LibrarySymbolReference;
    WriteRpcResult: LibrarySymbolReference;
    WriteSerializable: LibrarySymbolReference;
    WriteStartDocument: LibrarySymbolReference;
    WriteStartElement: LibrarySymbolReference;
    WriteTypedPrimitive: LibrarySymbolReference;
    WriteValue: LibrarySymbolReference;
    WriteXmlAttribute: LibrarySymbolReference;
    WriteXsiType: LibrarySymbolReference;
    EscapeName: LibrarySymbolReference;
    Namespaces: LibrarySymbolReference;
    Writer: LibrarySymbolReference
  };
  XmlSerializer: LibrarySymbolReference & {
    XmlSerializer: LibrarySymbolReference;
    CanDeserialize: LibrarySymbolReference;
    CreateReader: LibrarySymbolReference;
    CreateWriter: LibrarySymbolReference;
    Deserialize: LibrarySymbolReference;
    FromMappings: LibrarySymbolReference;
    FromTypes: LibrarySymbolReference;
    GetXmlSerializerAssemblyName: LibrarySymbolReference;
    Serialize: LibrarySymbolReference
  };
  XmlSerializerAssemblyAttribute: LibrarySymbolReference & {
    XmlSerializerAssemblyAttribute: LibrarySymbolReference;
    AssemblyName: LibrarySymbolReference;
    CodeBase: LibrarySymbolReference
  };
  XmlSerializerFactory: LibrarySymbolReference & {
    XmlSerializerFactory: LibrarySymbolReference;
    CreateSerializer: LibrarySymbolReference
  };
  XmlSerializerImplementation: LibrarySymbolReference & {
    XmlSerializerImplementation: LibrarySymbolReference;
    CanSerialize: LibrarySymbolReference;
    GetSerializer: LibrarySymbolReference;
    Reader: LibrarySymbolReference;
    ReadMethods: LibrarySymbolReference;
    TypedSerializers: LibrarySymbolReference;
    WriteMethods: LibrarySymbolReference;
    Writer: LibrarySymbolReference
  };
  XmlSerializerNamespaces: LibrarySymbolReference & {
    XmlSerializerNamespaces: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    ToArray: LibrarySymbolReference;
    Count: LibrarySymbolReference
  };
  XmlSerializerVersionAttribute: LibrarySymbolReference & {
    XmlSerializerVersionAttribute: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    ParentAssemblyId: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  XmlTextAttribute: LibrarySymbolReference & {
    XmlTextAttribute: LibrarySymbolReference;
    DataType: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  XmlTypeAttribute: LibrarySymbolReference & {
    XmlTypeAttribute: LibrarySymbolReference;
    AnonymousType: LibrarySymbolReference;
    IncludeInSchema: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    TypeName: LibrarySymbolReference
  };
  XmlTypeMapping: LibrarySymbolReference & {
    TypeFullName: LibrarySymbolReference;
    TypeName: LibrarySymbolReference;
    XsdTypeName: LibrarySymbolReference;
    XsdTypeNamespace: LibrarySymbolReference
  }
};
const Serialization: SerializationLibrary = createLibrary("System.Xml.Serialization", {
  CodeGenerationOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Serialization.CodeGenerationOptions;
        },
      },
      GenerateProperties: {
        kind: "field",
        type: () => {
          return Serialization.CodeGenerationOptions;
        },
      },
      GenerateNewAsync: {
        kind: "field",
        type: () => {
          return Serialization.CodeGenerationOptions;
        },
      },
      GenerateOldAsync: {
        kind: "field",
        type: () => {
          return Serialization.CodeGenerationOptions;
        },
      },
      GenerateOrder: {
        kind: "field",
        type: () => {
          return Serialization.CodeGenerationOptions;
        },
      },
      EnableDataBinding: {
        kind: "field",
        type: () => {
          return Serialization.CodeGenerationOptions;
        },
      },
    },
  },
  CodeIdentifier: {
    kind: "class",
    members: {
      CodeIdentifier: {
        kind: "method",
        methodKind: "constructor",
        isStatic: true,
      },
      MakeCamel: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MakePascal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MakeValid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  CodeIdentifiers: {
    kind: "class",
    members: {
      CodeIdentifiers: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddReserved: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddUnique: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsInUse: {
        kind: "method",
        methodKind: "ordinary",
      },
      MakeRightCase: {
        kind: "method",
        methodKind: "ordinary",
      },
      MakeUnique: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveReserved: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      UseCamelCasing: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  IXmlSerializable: {
    kind: "interface",
    members: {
      ReadXml: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteXml: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IXmlTextParser: {
    kind: "interface",
    members: {
      Normalized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      WhitespaceHandling: {
        kind: "property",
        type: () => {
          return Xml.WhitespaceHandling;
        },
      },
    },
  },
  ImportContext: {
    kind: "class",
    members: {
      ImportContext: {
        kind: "method",
        methodKind: "constructor",
      },
      ShareTypes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      TypeIdentifiers: {
        kind: "property",
        type: () => {
          return Serialization.CodeIdentifiers;
        },
      },
      Warnings: {
        kind: "property",
        type: () => {
          return Specialized.StringCollection;
        },
      },
    },
  },
  SchemaImporter: {
    kind: "class",
    members: {},
    isAbstract: true,
  },
  SoapAttributeAttribute: {
    kind: "class",
    members: {
      SoapAttributeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AttributeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DataType: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  SoapAttributeOverrides: {
    kind: "class",
    members: {
      SoapAttributeOverrides: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return Serialization.SoapAttributes;
        },
      },
    },
  },
  SoapAttributes: {
    kind: "class",
    members: {
      SoapAttributes: {
        kind: "method",
        methodKind: "constructor",
      },
      SoapAttribute: {
        kind: "property",
        type: () => {
          return Serialization.SoapAttributeAttribute;
        },
      },
      SoapDefaultValue: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      SoapElement: {
        kind: "property",
        type: () => {
          return Serialization.SoapElementAttribute;
        },
      },
      SoapEnum: {
        kind: "property",
        type: () => {
          return Serialization.SoapEnumAttribute;
        },
      },
      SoapIgnore: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SoapType: {
        kind: "property",
        type: () => {
          return Serialization.SoapTypeAttribute;
        },
      },
    },
  },
  SoapElementAttribute: {
    kind: "class",
    members: {
      SoapElementAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      DataType: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ElementName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      IsNullable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  SoapEnumAttribute: {
    kind: "class",
    members: {
      SoapEnumAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  SoapIgnoreAttribute: {
    kind: "class",
    members: {
      SoapIgnoreAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  SoapIncludeAttribute: {
    kind: "class",
    members: {
      SoapIncludeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
  },
  SoapReflectionImporter: {
    kind: "class",
    members: {
      SoapReflectionImporter: {
        kind: "method",
        methodKind: "constructor",
      },
      ImportMembersMapping: {
        kind: "method",
        methodKind: "ordinary",
      },
      ImportTypeMapping: {
        kind: "method",
        methodKind: "ordinary",
      },
      IncludeType: {
        kind: "method",
        methodKind: "ordinary",
      },
      IncludeTypes: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  SoapSchemaMember: {
    kind: "class",
    members: {
      SoapSchemaMember: {
        kind: "method",
        methodKind: "constructor",
      },
      MemberName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MemberType: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
        isNullable: true,
      },
    },
  },
  SoapTypeAttribute: {
    kind: "class",
    members: {
      SoapTypeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IncludeInSchema: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      TypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  UnreferencedObjectEventArgs: {
    kind: "class",
    members: {
      UnreferencedObjectEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      UnreferencedId: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      UnreferencedObject: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  UnreferencedObjectEventHandler: {
    kind: "generic",
    members: {
      UnreferencedObjectEventHandler: {
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
  XmlAnyAttributeAttribute: {
    kind: "class",
    members: {
      XmlAnyAttributeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlAnyElementAttribute: {
    kind: "class",
    members: {
      XmlAnyElementAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Namespace: {
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
  },
  XmlAnyElementAttributes: {
    kind: "class",
    members: {
      XmlAnyElementAttributes: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return Serialization.XmlAnyElementAttribute;
        },
      },
    },
  },
  XmlArrayAttribute: {
    kind: "class",
    members: {
      XmlArrayAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ElementName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Form: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaForm;
        },
      },
      IsNullable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Namespace: {
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
  },
  XmlArrayItemAttribute: {
    kind: "class",
    members: {
      XmlArrayItemAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      DataType: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ElementName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Form: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaForm;
        },
      },
      IsNullable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      NestingLevel: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
  },
  XmlArrayItemAttributes: {
    kind: "class",
    members: {
      XmlArrayItemAttributes: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return Serialization.XmlArrayItemAttribute;
        },
      },
    },
  },
  XmlAttributeAttribute: {
    kind: "class",
    members: {
      XmlAttributeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AttributeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DataType: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Form: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaForm;
        },
      },
      Namespace: {
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
  },
  XmlAttributeEventArgs: {
    kind: "class",
    members: {
      Attr: {
        kind: "property",
        type: () => {
          return Xml.XmlAttribute;
        },
      },
      ExpectedAttributes: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      LineNumber: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      LinePosition: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ObjectBeingDeserialized: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  XmlAttributeEventHandler: {
    kind: "generic",
    members: {
      XmlAttributeEventHandler: {
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
  XmlAttributeOverrides: {
    kind: "class",
    members: {
      XmlAttributeOverrides: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return Serialization.XmlAttributes;
        },
      },
    },
  },
  XmlAttributes: {
    kind: "class",
    members: {
      XmlAttributes: {
        kind: "method",
        methodKind: "constructor",
      },
      XmlAnyAttribute: {
        kind: "property",
        type: () => {
          return Serialization.XmlAnyAttributeAttribute;
        },
      },
      XmlAnyElements: {
        kind: "property",
        type: () => {
          return Serialization.XmlAnyElementAttributes;
        },
      },
      XmlArray: {
        kind: "property",
        type: () => {
          return Serialization.XmlArrayAttribute;
        },
      },
      XmlArrayItems: {
        kind: "property",
        type: () => {
          return Serialization.XmlArrayItemAttributes;
        },
      },
      XmlAttribute: {
        kind: "property",
        type: () => {
          return Serialization.XmlAttributeAttribute;
        },
      },
      XmlChoiceIdentifier: {
        kind: "property",
        type: () => {
          return Serialization.XmlChoiceIdentifierAttribute;
        },
      },
      XmlDefaultValue: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      XmlElements: {
        kind: "property",
        type: () => {
          return Serialization.XmlElementAttributes;
        },
      },
      XmlEnum: {
        kind: "property",
        type: () => {
          return Serialization.XmlEnumAttribute;
        },
      },
      XmlIgnore: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Xmlns: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      XmlRoot: {
        kind: "property",
        type: () => {
          return Serialization.XmlRootAttribute;
        },
      },
      XmlText: {
        kind: "property",
        type: () => {
          return Serialization.XmlTextAttribute;
        },
      },
      XmlType: {
        kind: "property",
        type: () => {
          return Serialization.XmlTypeAttribute;
        },
      },
    },
  },
  XmlChoiceIdentifierAttribute: {
    kind: "class",
    members: {
      XmlChoiceIdentifierAttribute: {
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
  },
  XmlDeserializationEvents: {
    kind: "struct",
    members: {
      OnUnknownAttribute: {
        kind: "property",
        type: () => {
          return Serialization.XmlAttributeEventHandler;
        },
        isNullable: true,
      },
      OnUnknownElement: {
        kind: "property",
        type: () => {
          return Serialization.XmlElementEventHandler;
        },
        isNullable: true,
      },
      OnUnknownNode: {
        kind: "property",
        type: () => {
          return Serialization.XmlNodeEventHandler;
        },
        isNullable: true,
      },
      OnUnreferencedObject: {
        kind: "property",
        type: () => {
          return Serialization.UnreferencedObjectEventHandler;
        },
        isNullable: true,
      },
    },
  },
  XmlElementAttribute: {
    kind: "class",
    members: {
      XmlElementAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      DataType: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ElementName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Form: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaForm;
        },
      },
      IsNullable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Namespace: {
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
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
  },
  XmlElementAttributes: {
    kind: "class",
    members: {
      XmlElementAttributes: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return Serialization.XmlElementAttribute;
        },
      },
    },
  },
  XmlElementEventArgs: {
    kind: "class",
    members: {
      Element: {
        kind: "property",
        type: () => {
          return Xml.XmlElement;
        },
      },
      ExpectedElements: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      LineNumber: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      LinePosition: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ObjectBeingDeserialized: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  XmlElementEventHandler: {
    kind: "generic",
    members: {
      XmlElementEventHandler: {
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
  XmlEnumAttribute: {
    kind: "class",
    members: {
      XmlEnumAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlIgnoreAttribute: {
    kind: "class",
    members: {
      XmlIgnoreAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlIncludeAttribute: {
    kind: "class",
    members: {
      XmlIncludeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
  },
  XmlMapping: {
    kind: "class",
    members: {
      SetKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      ElementName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      XsdElementName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isAbstract: true,
  },
  XmlMappingAccess: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Serialization.XmlMappingAccess;
        },
      },
      Read: {
        kind: "field",
        type: () => {
          return Serialization.XmlMappingAccess;
        },
      },
      Write: {
        kind: "field",
        type: () => {
          return Serialization.XmlMappingAccess;
        },
      },
    },
  },
  XmlMemberMapping: {
    kind: "class",
    members: {
      Any: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      CheckSpecified: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ElementName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MemberName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      TypeFullName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      TypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      TypeNamespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      XsdElementName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  XmlMembersMapping: {
    kind: "class",
    members: {
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return Serialization.XmlMemberMapping;
        },
      },
      TypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      TypeNamespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlNamespaceDeclarationsAttribute: {
    kind: "class",
    members: {
      XmlNamespaceDeclarationsAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlNodeEventArgs: {
    kind: "class",
    members: {
      LineNumber: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      LinePosition: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      LocalName: {
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
      NamespaceURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      ObjectBeingDeserialized: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      Text: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlNodeEventHandler: {
    kind: "generic",
    members: {
      XmlNodeEventHandler: {
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
  XmlReflectionImporter: {
    kind: "class",
    members: {
      XmlReflectionImporter: {
        kind: "method",
        methodKind: "constructor",
      },
      ImportMembersMapping: {
        kind: "method",
        methodKind: "ordinary",
      },
      ImportTypeMapping: {
        kind: "method",
        methodKind: "ordinary",
      },
      IncludeType: {
        kind: "method",
        methodKind: "ordinary",
      },
      IncludeTypes: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  XmlReflectionMember: {
    kind: "class",
    members: {
      XmlReflectionMember: {
        kind: "method",
        methodKind: "constructor",
      },
      IsReturnValue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MemberName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MemberType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      OverrideIsNullable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SoapAttributes: {
        kind: "property",
        type: () => {
          return Serialization.SoapAttributes;
        },
      },
      XmlAttributes: {
        kind: "property",
        type: () => {
          return Serialization.XmlAttributes;
        },
      },
    },
  },
  XmlRootAttribute: {
    kind: "class",
    members: {
      XmlRootAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      DataType: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ElementName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      IsNullable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlSchemaEnumerator: {
    kind: "class",
    members: {
      XmlSchemaEnumerator: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      MoveNext: {
        kind: "method",
        methodKind: "ordinary",
      },
      Current: {
        kind: "property",
        type: () => {
          return Schema.XmlSchema;
        },
      },
    },
  },
  XmlSchemaExporter: {
    kind: "class",
    members: {
      XmlSchemaExporter: {
        kind: "method",
        methodKind: "constructor",
      },
      ExportAnyType: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportMembersMapping: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportTypeMapping: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  XmlSchemaImporter: {
    kind: "class",
    members: {
      XmlSchemaImporter: {
        kind: "method",
        methodKind: "constructor",
      },
      ImportAnyType: {
        kind: "method",
        methodKind: "ordinary",
      },
      ImportDerivedTypeMapping: {
        kind: "method",
        methodKind: "ordinary",
      },
      ImportMembersMapping: {
        kind: "method",
        methodKind: "ordinary",
      },
      ImportSchemaType: {
        kind: "method",
        methodKind: "ordinary",
      },
      ImportTypeMapping: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  XmlSchemaProviderAttribute: {
    kind: "class",
    members: {
      XmlSchemaProviderAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsAny: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MethodName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  XmlSchemas: {
    kind: "class",
    members: {
      XmlSchemas: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      Compile: {
        kind: "method",
        methodKind: "ordinary",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Find: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSchemas: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsDataSet: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OnClear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      OnInsert: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      OnRemove: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      OnSet: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsCompiled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return Schema.XmlSchema;
        },
      },
    },
  },
  XmlSerializationCollectionFixupCallback: {
    kind: "generic",
    members: {
      XmlSerializationCollectionFixupCallback: {
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
  XmlSerializationFixupCallback: {
    kind: "generic",
    members: {
      XmlSerializationFixupCallback: {
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
  XmlSerializationGeneratedCode: {
    kind: "class",
    members: {
      XmlSerializationGeneratedCode: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isAbstract: true,
  },
  XmlSerializationReadCallback: {
    kind: "generic",
    members: {
      XmlSerializationReadCallback: {
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
  XmlSerializationReader: {
    kind: "class",
    members: {
      CollectionFixup: {
        kind: "class",
        members: {
          CollectionFixup: {
            kind: "method",
            methodKind: "constructor",
          },
          Callback: {
            kind: "property",
            type: () => {
              return Serialization.XmlSerializationCollectionFixupCallback;
            },
          },
          Collection: {
            kind: "property",
            type: () => {
              return System.Object;
            },
            isNullable: true,
          },
          CollectionItems: {
            kind: "property",
            type: () => {
              return System.Object;
            },
          },
        },
      },
      Fixup: {
        kind: "class",
        members: {
          Fixup: {
            kind: "method",
            methodKind: "constructor",
          },
          Callback: {
            kind: "property",
            type: () => {
              return Serialization.XmlSerializationFixupCallback;
            },
          },
          Ids: {
            kind: "property",
            type: () => {
              return System.Array;
            },
            isNullable: true,
          },
          Source: {
            kind: "property",
            type: () => {
              return System.Object;
            },
            isNullable: true,
          },
        },
      },
    },
  },
  XmlSerializationWriteCallback: {
    kind: "generic",
    members: {
      XmlSerializationWriteCallback: {
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
  XmlSerializationWriter: {
    kind: "class",
    members: {
      XmlSerializationWriter: {
        kind: "method",
        methodKind: "constructor",
      },
      AddWriteCallback: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateChoiceIdentifierValueException: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateInvalidAnyTypeException: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateInvalidChoiceIdentifierValueException: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateInvalidEnumValueException: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateMismatchChoiceException: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateUnknownAnyElementException: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateUnknownTypeException: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromByteArrayBase64: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromByteArrayHex: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromChar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromDate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromEnum: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromXmlName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromXmlNCName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromXmlNmToken: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromXmlNmTokens: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromXmlQualifiedName: {
        kind: "method",
        methodKind: "ordinary",
      },
      InitCallbacks: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ResolveDynamicAssembly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TopLevelElement: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteElementEncoded: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteElementLiteral: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteElementQualifiedName: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteElementString: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteElementStringRaw: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteEmptyTag: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteEndElement: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteId: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteNamespaceDeclarations: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteNullableQualifiedNameEncoded: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteNullableQualifiedNameLiteral: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteNullableStringEncoded: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteNullableStringEncodedRaw: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteNullableStringLiteral: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteNullableStringLiteralRaw: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteNullTagEncoded: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteNullTagLiteral: {
        kind: "method",
        methodKind: "ordinary",
      },
      WritePotentiallyReferencingElement: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteReferencedElements: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteReferencingElement: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteRpcResult: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteSerializable: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteStartDocument: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteStartElement: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteTypedPrimitive: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteXmlAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteXsiType: {
        kind: "method",
        methodKind: "ordinary",
      },
      EscapeName: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Namespaces: {
        kind: "property",
        type: () => {
          return Collections.ArrayList;
        },
        isNullable: true,
      },
      Writer: {
        kind: "property",
        type: () => {
          return Xml.XmlWriter;
        },
      },
    },
    isAbstract: true,
  },
  XmlSerializer: {
    kind: "class",
    members: {
      XmlSerializer: {
        kind: "method",
        methodKind: "constructor",
      },
      CanDeserialize: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateReader: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateWriter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Deserialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromMappings: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromTypes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetXmlSerializerAssemblyName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Serialize: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  XmlSerializerAssemblyAttribute: {
    kind: "class",
    members: {
      XmlSerializerAssemblyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AssemblyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      CodeBase: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  XmlSerializerFactory: {
    kind: "class",
    members: {
      XmlSerializerFactory: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateSerializer: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  XmlSerializerImplementation: {
    kind: "class",
    members: {
      XmlSerializerImplementation: {
        kind: "method",
        methodKind: "constructor",
      },
      CanSerialize: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSerializer: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Reader: {
        kind: "property",
        type: () => {
          return Serialization.XmlSerializationReader;
        },
        isVirtual: true,
      },
      ReadMethods: {
        kind: "property",
        type: () => {
          return Collections.Hashtable;
        },
        isVirtual: true,
      },
      TypedSerializers: {
        kind: "property",
        type: () => {
          return Collections.Hashtable;
        },
        isVirtual: true,
      },
      WriteMethods: {
        kind: "property",
        type: () => {
          return Collections.Hashtable;
        },
        isVirtual: true,
      },
      Writer: {
        kind: "property",
        type: () => {
          return Serialization.XmlSerializationWriter;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  XmlSerializerNamespaces: {
    kind: "class",
    members: {
      XmlSerializerNamespaces: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  XmlSerializerVersionAttribute: {
    kind: "class",
    members: {
      XmlSerializerVersionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ParentAssemblyId: {
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
      Version: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  XmlTextAttribute: {
    kind: "class",
    members: {
      XmlTextAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      DataType: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
  },
  XmlTypeAttribute: {
    kind: "class",
    members: {
      XmlTypeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AnonymousType: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IncludeInSchema: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      TypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  XmlTypeMapping: {
    kind: "class",
    members: {
      TypeFullName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      TypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      XsdTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      XsdTypeNamespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
});
export default Serialization
