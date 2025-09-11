import Collections from "../../Collections/index.js";
import System from "../../index.js";
import Xml from "../index.js";
import Serialization from "../Serialization/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type SchemaLibrary = LibrarySymbolReference & {
  Extensions: LibrarySymbolReference & {
    GetSchemaInfo: LibrarySymbolReference;
    Validate: LibrarySymbolReference
  };
  IXmlSchemaInfo: LibrarySymbolReference & {
    IsDefault: LibrarySymbolReference;
    IsNil: LibrarySymbolReference;
    MemberType: LibrarySymbolReference;
    SchemaAttribute: LibrarySymbolReference;
    SchemaElement: LibrarySymbolReference;
    SchemaType: LibrarySymbolReference;
    Validity: LibrarySymbolReference
  };
  ValidationEventArgs: LibrarySymbolReference & {
    Exception: LibrarySymbolReference;
    Message: LibrarySymbolReference;
    Severity: LibrarySymbolReference
  };
  ValidationEventHandler: LibrarySymbolReference & {
    ValidationEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  XmlAtomicValue: LibrarySymbolReference & {
    Clone: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ValueAs: LibrarySymbolReference;
    IsNode: LibrarySymbolReference;
    TypedValue: LibrarySymbolReference;
    Value: LibrarySymbolReference;
    ValueAsBoolean: LibrarySymbolReference;
    ValueAsDateTime: LibrarySymbolReference;
    ValueAsDouble: LibrarySymbolReference;
    ValueAsInt: LibrarySymbolReference;
    ValueAsLong: LibrarySymbolReference;
    ValueType: LibrarySymbolReference;
    XmlType: LibrarySymbolReference
  };
  XmlSchema: LibrarySymbolReference & {
    InstanceNamespace: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    XmlSchema: LibrarySymbolReference;
    Compile: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    AttributeFormDefault: LibrarySymbolReference;
    AttributeGroups: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    BlockDefault: LibrarySymbolReference;
    ElementFormDefault: LibrarySymbolReference;
    Elements: LibrarySymbolReference;
    FinalDefault: LibrarySymbolReference;
    Groups: LibrarySymbolReference;
    Id: LibrarySymbolReference;
    Includes: LibrarySymbolReference;
    IsCompiled: LibrarySymbolReference;
    Items: LibrarySymbolReference;
    Notations: LibrarySymbolReference;
    SchemaTypes: LibrarySymbolReference;
    TargetNamespace: LibrarySymbolReference;
    UnhandledAttributes: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  XmlSchemaAll: LibrarySymbolReference & {
    XmlSchemaAll: LibrarySymbolReference;
    Items: LibrarySymbolReference
  };
  XmlSchemaAnnotated: LibrarySymbolReference & {
    XmlSchemaAnnotated: LibrarySymbolReference;
    Annotation: LibrarySymbolReference;
    Id: LibrarySymbolReference;
    UnhandledAttributes: LibrarySymbolReference
  };
  XmlSchemaAnnotation: LibrarySymbolReference & {
    XmlSchemaAnnotation: LibrarySymbolReference;
    Id: LibrarySymbolReference;
    Items: LibrarySymbolReference;
    UnhandledAttributes: LibrarySymbolReference
  };
  XmlSchemaAny: LibrarySymbolReference & {
    XmlSchemaAny: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    ProcessContents: LibrarySymbolReference
  };
  XmlSchemaAnyAttribute: LibrarySymbolReference & {
    XmlSchemaAnyAttribute: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    ProcessContents: LibrarySymbolReference
  };
  XmlSchemaAppInfo: LibrarySymbolReference & {
    XmlSchemaAppInfo: LibrarySymbolReference;
    Markup: LibrarySymbolReference;
    Source: LibrarySymbolReference
  };
  XmlSchemaAttribute: LibrarySymbolReference & {
    XmlSchemaAttribute: LibrarySymbolReference;
    AttributeSchemaType: LibrarySymbolReference;
    AttributeType: LibrarySymbolReference;
    DefaultValue: LibrarySymbolReference;
    FixedValue: LibrarySymbolReference;
    Form: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    QualifiedName: LibrarySymbolReference;
    RefName: LibrarySymbolReference;
    SchemaType: LibrarySymbolReference;
    SchemaTypeName: LibrarySymbolReference;
    Use: LibrarySymbolReference
  };
  XmlSchemaAttributeGroup: LibrarySymbolReference & {
    XmlSchemaAttributeGroup: LibrarySymbolReference;
    AnyAttribute: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    QualifiedName: LibrarySymbolReference;
    RedefinedAttributeGroup: LibrarySymbolReference
  };
  XmlSchemaAttributeGroupRef: LibrarySymbolReference & {
    XmlSchemaAttributeGroupRef: LibrarySymbolReference;
    RefName: LibrarySymbolReference
  };
  XmlSchemaChoice: LibrarySymbolReference & {
    XmlSchemaChoice: LibrarySymbolReference;
    Items: LibrarySymbolReference
  };
  XmlSchemaCollection: LibrarySymbolReference & {
    XmlSchemaCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    NameTable: LibrarySymbolReference
  };
  XmlSchemaCollectionEnumerator: LibrarySymbolReference & {
    MoveNext: LibrarySymbolReference;
    Current: LibrarySymbolReference
  };
  XmlSchemaCompilationSettings: LibrarySymbolReference & {
    XmlSchemaCompilationSettings: LibrarySymbolReference;
    EnableUpaCheck: LibrarySymbolReference
  };
  XmlSchemaComplexContent: LibrarySymbolReference & {
    XmlSchemaComplexContent: LibrarySymbolReference;
    Content: LibrarySymbolReference;
    IsMixed: LibrarySymbolReference
  };
  XmlSchemaComplexContentExtension: LibrarySymbolReference & {
    XmlSchemaComplexContentExtension: LibrarySymbolReference;
    AnyAttribute: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    BaseTypeName: LibrarySymbolReference;
    Particle: LibrarySymbolReference
  };
  XmlSchemaComplexContentRestriction: LibrarySymbolReference & {
    XmlSchemaComplexContentRestriction: LibrarySymbolReference;
    AnyAttribute: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    BaseTypeName: LibrarySymbolReference;
    Particle: LibrarySymbolReference
  };
  XmlSchemaComplexType: LibrarySymbolReference & {
    XmlSchemaComplexType: LibrarySymbolReference;
    AnyAttribute: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    AttributeUses: LibrarySymbolReference;
    AttributeWildcard: LibrarySymbolReference;
    Block: LibrarySymbolReference;
    BlockResolved: LibrarySymbolReference;
    ContentModel: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    ContentTypeParticle: LibrarySymbolReference;
    IsAbstract: LibrarySymbolReference;
    IsMixed: LibrarySymbolReference;
    Particle: LibrarySymbolReference
  };
  XmlSchemaContent: LibrarySymbolReference & {
    XmlSchemaContent: LibrarySymbolReference
  };
  XmlSchemaContentModel: LibrarySymbolReference & {
    XmlSchemaContentModel: LibrarySymbolReference;
    Content: LibrarySymbolReference
  };
  XmlSchemaContentProcessing: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Skip: LibrarySymbolReference;
    Lax: LibrarySymbolReference;
    Strict: LibrarySymbolReference
  };
  XmlSchemaContentType: LibrarySymbolReference & {
    TextOnly: LibrarySymbolReference;
    Empty: LibrarySymbolReference;
    ElementOnly: LibrarySymbolReference;
    Mixed: LibrarySymbolReference
  };
  XmlSchemaDatatype: LibrarySymbolReference & {
    ChangeType: LibrarySymbolReference;
    IsDerivedFrom: LibrarySymbolReference;
    ParseValue: LibrarySymbolReference;
    TokenizedType: LibrarySymbolReference;
    TypeCode: LibrarySymbolReference;
    ValueType: LibrarySymbolReference;
    Variety: LibrarySymbolReference
  };
  XmlSchemaDatatypeVariety: LibrarySymbolReference & {
    Atomic: LibrarySymbolReference;
    List: LibrarySymbolReference;
    Union: LibrarySymbolReference
  };
  XmlSchemaDerivationMethod: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    Substitution: LibrarySymbolReference;
    Extension: LibrarySymbolReference;
    Restriction: LibrarySymbolReference;
    List: LibrarySymbolReference;
    Union: LibrarySymbolReference;
    All: LibrarySymbolReference;
    None: LibrarySymbolReference
  };
  XmlSchemaDocumentation: LibrarySymbolReference & {
    XmlSchemaDocumentation: LibrarySymbolReference;
    Language: LibrarySymbolReference;
    Markup: LibrarySymbolReference;
    Source: LibrarySymbolReference
  };
  XmlSchemaElement: LibrarySymbolReference & {
    XmlSchemaElement: LibrarySymbolReference;
    Block: LibrarySymbolReference;
    BlockResolved: LibrarySymbolReference;
    Constraints: LibrarySymbolReference;
    DefaultValue: LibrarySymbolReference;
    ElementSchemaType: LibrarySymbolReference;
    ElementType: LibrarySymbolReference;
    Final: LibrarySymbolReference;
    FinalResolved: LibrarySymbolReference;
    FixedValue: LibrarySymbolReference;
    Form: LibrarySymbolReference;
    IsAbstract: LibrarySymbolReference;
    IsNillable: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    QualifiedName: LibrarySymbolReference;
    RefName: LibrarySymbolReference;
    SchemaType: LibrarySymbolReference;
    SchemaTypeName: LibrarySymbolReference;
    SubstitutionGroup: LibrarySymbolReference
  };
  XmlSchemaEnumerationFacet: LibrarySymbolReference & {
    XmlSchemaEnumerationFacet: LibrarySymbolReference
  };
  XmlSchemaException: LibrarySymbolReference & {
    XmlSchemaException: LibrarySymbolReference;
    LineNumber: LibrarySymbolReference;
    LinePosition: LibrarySymbolReference;
    Message: LibrarySymbolReference;
    SourceSchemaObject: LibrarySymbolReference;
    SourceUri: LibrarySymbolReference
  };
  XmlSchemaExternal: LibrarySymbolReference & {
    XmlSchemaExternal: LibrarySymbolReference;
    Id: LibrarySymbolReference;
    Schema: LibrarySymbolReference;
    SchemaLocation: LibrarySymbolReference;
    UnhandledAttributes: LibrarySymbolReference
  };
  XmlSchemaFacet: LibrarySymbolReference & {
    XmlSchemaFacet: LibrarySymbolReference;
    IsFixed: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  XmlSchemaForm: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Qualified: LibrarySymbolReference;
    Unqualified: LibrarySymbolReference
  };
  XmlSchemaFractionDigitsFacet: LibrarySymbolReference & {
    XmlSchemaFractionDigitsFacet: LibrarySymbolReference
  };
  XmlSchemaGroup: LibrarySymbolReference & {
    XmlSchemaGroup: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Particle: LibrarySymbolReference;
    QualifiedName: LibrarySymbolReference
  };
  XmlSchemaGroupBase: LibrarySymbolReference & {
    Items: LibrarySymbolReference
  };
  XmlSchemaGroupRef: LibrarySymbolReference & {
    XmlSchemaGroupRef: LibrarySymbolReference;
    Particle: LibrarySymbolReference;
    RefName: LibrarySymbolReference
  };
  XmlSchemaIdentityConstraint: LibrarySymbolReference & {
    XmlSchemaIdentityConstraint: LibrarySymbolReference;
    Fields: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    QualifiedName: LibrarySymbolReference;
    Selector: LibrarySymbolReference
  };
  XmlSchemaImport: LibrarySymbolReference & {
    XmlSchemaImport: LibrarySymbolReference;
    Annotation: LibrarySymbolReference;
    Namespace: LibrarySymbolReference
  };
  XmlSchemaInclude: LibrarySymbolReference & {
    XmlSchemaInclude: LibrarySymbolReference;
    Annotation: LibrarySymbolReference
  };
  XmlSchemaInference: LibrarySymbolReference & {
    InferenceOption: LibrarySymbolReference & {
      Restricted: LibrarySymbolReference;
      Relaxed: LibrarySymbolReference
    }
  };
  XmlSchemaInferenceException: LibrarySymbolReference & {
    XmlSchemaInferenceException: LibrarySymbolReference
  };
  XmlSchemaInfo: LibrarySymbolReference & {
    XmlSchemaInfo: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    IsDefault: LibrarySymbolReference;
    IsNil: LibrarySymbolReference;
    MemberType: LibrarySymbolReference;
    SchemaAttribute: LibrarySymbolReference;
    SchemaElement: LibrarySymbolReference;
    SchemaType: LibrarySymbolReference;
    Validity: LibrarySymbolReference
  };
  XmlSchemaKey: LibrarySymbolReference & {
    XmlSchemaKey: LibrarySymbolReference
  };
  XmlSchemaKeyref: LibrarySymbolReference & {
    XmlSchemaKeyref: LibrarySymbolReference;
    Refer: LibrarySymbolReference
  };
  XmlSchemaLengthFacet: LibrarySymbolReference & {
    XmlSchemaLengthFacet: LibrarySymbolReference
  };
  XmlSchemaMaxExclusiveFacet: LibrarySymbolReference & {
    XmlSchemaMaxExclusiveFacet: LibrarySymbolReference
  };
  XmlSchemaMaxInclusiveFacet: LibrarySymbolReference & {
    XmlSchemaMaxInclusiveFacet: LibrarySymbolReference
  };
  XmlSchemaMaxLengthFacet: LibrarySymbolReference & {
    XmlSchemaMaxLengthFacet: LibrarySymbolReference
  };
  XmlSchemaMinExclusiveFacet: LibrarySymbolReference & {
    XmlSchemaMinExclusiveFacet: LibrarySymbolReference
  };
  XmlSchemaMinInclusiveFacet: LibrarySymbolReference & {
    XmlSchemaMinInclusiveFacet: LibrarySymbolReference
  };
  XmlSchemaMinLengthFacet: LibrarySymbolReference & {
    XmlSchemaMinLengthFacet: LibrarySymbolReference
  };
  XmlSchemaNotation: LibrarySymbolReference & {
    XmlSchemaNotation: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Public: LibrarySymbolReference;
    System: LibrarySymbolReference
  };
  XmlSchemaNumericFacet: LibrarySymbolReference & {
    XmlSchemaNumericFacet: LibrarySymbolReference
  };
  XmlSchemaObject: LibrarySymbolReference & {
    XmlSchemaObject: LibrarySymbolReference;
    LineNumber: LibrarySymbolReference;
    LinePosition: LibrarySymbolReference;
    Namespaces: LibrarySymbolReference;
    Parent: LibrarySymbolReference;
    SourceUri: LibrarySymbolReference
  };
  XmlSchemaObjectCollection: LibrarySymbolReference & {
    XmlSchemaObjectCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    OnClear: LibrarySymbolReference;
    OnInsert: LibrarySymbolReference;
    OnRemove: LibrarySymbolReference;
    OnSet: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  XmlSchemaObjectEnumerator: LibrarySymbolReference & {
    MoveNext: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Current: LibrarySymbolReference
  };
  XmlSchemaObjectTable: LibrarySymbolReference & {
    Contains: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Names: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  XmlSchemaParticle: LibrarySymbolReference & {
    XmlSchemaParticle: LibrarySymbolReference;
    MaxOccurs: LibrarySymbolReference;
    MaxOccursString: LibrarySymbolReference;
    MinOccurs: LibrarySymbolReference;
    MinOccursString: LibrarySymbolReference
  };
  XmlSchemaPatternFacet: LibrarySymbolReference & {
    XmlSchemaPatternFacet: LibrarySymbolReference
  };
  XmlSchemaRedefine: LibrarySymbolReference & {
    XmlSchemaRedefine: LibrarySymbolReference;
    AttributeGroups: LibrarySymbolReference;
    Groups: LibrarySymbolReference;
    Items: LibrarySymbolReference;
    SchemaTypes: LibrarySymbolReference
  };
  XmlSchemaSequence: LibrarySymbolReference & {
    XmlSchemaSequence: LibrarySymbolReference;
    Items: LibrarySymbolReference
  };
  XmlSchemaSet: LibrarySymbolReference & {
    XmlSchemaSet: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Compile: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveRecursive: LibrarySymbolReference;
    Reprocess: LibrarySymbolReference;
    Schemas: LibrarySymbolReference;
    CompilationSettings: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    GlobalAttributes: LibrarySymbolReference;
    GlobalElements: LibrarySymbolReference;
    GlobalTypes: LibrarySymbolReference;
    IsCompiled: LibrarySymbolReference;
    NameTable: LibrarySymbolReference;
    XmlResolver: LibrarySymbolReference
  };
  XmlSchemaSimpleContent: LibrarySymbolReference & {
    XmlSchemaSimpleContent: LibrarySymbolReference;
    Content: LibrarySymbolReference
  };
  XmlSchemaSimpleContentExtension: LibrarySymbolReference & {
    XmlSchemaSimpleContentExtension: LibrarySymbolReference;
    AnyAttribute: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    BaseTypeName: LibrarySymbolReference
  };
  XmlSchemaSimpleContentRestriction: LibrarySymbolReference & {
    XmlSchemaSimpleContentRestriction: LibrarySymbolReference;
    AnyAttribute: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    BaseType: LibrarySymbolReference;
    BaseTypeName: LibrarySymbolReference;
    Facets: LibrarySymbolReference
  };
  XmlSchemaSimpleType: LibrarySymbolReference & {
    XmlSchemaSimpleType: LibrarySymbolReference;
    Content: LibrarySymbolReference
  };
  XmlSchemaSimpleTypeContent: LibrarySymbolReference & {
    XmlSchemaSimpleTypeContent: LibrarySymbolReference
  };
  XmlSchemaSimpleTypeList: LibrarySymbolReference & {
    XmlSchemaSimpleTypeList: LibrarySymbolReference;
    BaseItemType: LibrarySymbolReference;
    ItemType: LibrarySymbolReference;
    ItemTypeName: LibrarySymbolReference
  };
  XmlSchemaSimpleTypeRestriction: LibrarySymbolReference & {
    XmlSchemaSimpleTypeRestriction: LibrarySymbolReference;
    BaseType: LibrarySymbolReference;
    BaseTypeName: LibrarySymbolReference;
    Facets: LibrarySymbolReference
  };
  XmlSchemaSimpleTypeUnion: LibrarySymbolReference & {
    XmlSchemaSimpleTypeUnion: LibrarySymbolReference;
    BaseMemberTypes: LibrarySymbolReference;
    BaseTypes: LibrarySymbolReference;
    MemberTypes: LibrarySymbolReference
  };
  XmlSchemaTotalDigitsFacet: LibrarySymbolReference & {
    XmlSchemaTotalDigitsFacet: LibrarySymbolReference
  };
  XmlSchemaType: LibrarySymbolReference & {
    XmlSchemaType: LibrarySymbolReference;
    GetBuiltInComplexType: LibrarySymbolReference;
    GetBuiltInSimpleType: LibrarySymbolReference;
    IsDerivedFrom: LibrarySymbolReference;
    BaseSchemaType: LibrarySymbolReference;
    BaseXmlSchemaType: LibrarySymbolReference;
    Datatype: LibrarySymbolReference;
    DerivedBy: LibrarySymbolReference;
    Final: LibrarySymbolReference;
    FinalResolved: LibrarySymbolReference;
    IsMixed: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    QualifiedName: LibrarySymbolReference;
    TypeCode: LibrarySymbolReference
  };
  XmlSchemaUnique: LibrarySymbolReference & {
    XmlSchemaUnique: LibrarySymbolReference
  };
  XmlSchemaUse: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Optional: LibrarySymbolReference;
    Prohibited: LibrarySymbolReference;
    Required: LibrarySymbolReference
  };
  XmlSchemaValidationException: LibrarySymbolReference & {
    XmlSchemaValidationException: LibrarySymbolReference;
    SetSourceObject: LibrarySymbolReference;
    SourceObject: LibrarySymbolReference
  };
  XmlSchemaValidationFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    ProcessInlineSchema: LibrarySymbolReference;
    ProcessSchemaLocation: LibrarySymbolReference;
    ReportValidationWarnings: LibrarySymbolReference;
    ProcessIdentityConstraints: LibrarySymbolReference;
    AllowXmlAttributes: LibrarySymbolReference
  };
  XmlSchemaValidator: LibrarySymbolReference & {
    XmlSchemaValidator: LibrarySymbolReference;
    AddSchema: LibrarySymbolReference;
    EndValidation: LibrarySymbolReference;
    GetExpectedAttributes: LibrarySymbolReference;
    GetExpectedParticles: LibrarySymbolReference;
    GetUnspecifiedDefaultAttributes: LibrarySymbolReference;
    Initialize: LibrarySymbolReference;
    SkipToEndElement: LibrarySymbolReference;
    ValidateAttribute: LibrarySymbolReference;
    ValidateElement: LibrarySymbolReference;
    ValidateEndElement: LibrarySymbolReference;
    ValidateEndOfAttributes: LibrarySymbolReference;
    ValidateText: LibrarySymbolReference;
    ValidateWhitespace: LibrarySymbolReference;
    LineInfoProvider: LibrarySymbolReference;
    SourceUri: LibrarySymbolReference;
    ValidationEventSender: LibrarySymbolReference;
    XmlResolver: LibrarySymbolReference
  };
  XmlSchemaValidity: LibrarySymbolReference & {
    NotKnown: LibrarySymbolReference;
    Valid: LibrarySymbolReference;
    Invalid: LibrarySymbolReference
  };
  XmlSchemaWhiteSpaceFacet: LibrarySymbolReference & {
    XmlSchemaWhiteSpaceFacet: LibrarySymbolReference
  };
  XmlSchemaXPath: LibrarySymbolReference & {
    XmlSchemaXPath: LibrarySymbolReference;
    XPath: LibrarySymbolReference
  };
  XmlSeverityType: LibrarySymbolReference & {
    Error: LibrarySymbolReference;
    Warning: LibrarySymbolReference
  };
  XmlTypeCode: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Node: LibrarySymbolReference;
    Document: LibrarySymbolReference;
    Element: LibrarySymbolReference;
    Attribute: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    ProcessingInstruction: LibrarySymbolReference;
    Comment: LibrarySymbolReference;
    Text: LibrarySymbolReference;
    AnyAtomicType: LibrarySymbolReference;
    UntypedAtomic: LibrarySymbolReference;
    String: LibrarySymbolReference;
    Boolean: LibrarySymbolReference;
    Decimal: LibrarySymbolReference;
    Float: LibrarySymbolReference;
    Double: LibrarySymbolReference;
    Duration: LibrarySymbolReference;
    DateTime: LibrarySymbolReference;
    Time: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    GYearMonth: LibrarySymbolReference;
    GYear: LibrarySymbolReference;
    GMonthDay: LibrarySymbolReference;
    GDay: LibrarySymbolReference;
    GMonth: LibrarySymbolReference;
    HexBinary: LibrarySymbolReference;
    Base64Binary: LibrarySymbolReference;
    AnyUri: LibrarySymbolReference;
    QName: LibrarySymbolReference;
    Notation: LibrarySymbolReference;
    NormalizedString: LibrarySymbolReference;
    Token: LibrarySymbolReference;
    Language: LibrarySymbolReference;
    NmToken: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NCName: LibrarySymbolReference;
    Id: LibrarySymbolReference;
    Idref: LibrarySymbolReference;
    Entity: LibrarySymbolReference;
    Integer: LibrarySymbolReference;
    NonPositiveInteger: LibrarySymbolReference;
    NegativeInteger: LibrarySymbolReference;
    Long: LibrarySymbolReference;
    Int: LibrarySymbolReference;
    Short: LibrarySymbolReference;
    Byte: LibrarySymbolReference;
    NonNegativeInteger: LibrarySymbolReference;
    UnsignedLong: LibrarySymbolReference;
    UnsignedInt: LibrarySymbolReference;
    UnsignedShort: LibrarySymbolReference;
    UnsignedByte: LibrarySymbolReference;
    PositiveInteger: LibrarySymbolReference;
    YearMonthDuration: LibrarySymbolReference;
    DayTimeDuration: LibrarySymbolReference
  };
  XmlValueGetter: LibrarySymbolReference & {
    XmlValueGetter: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  }
};
const Schema: SchemaLibrary = createLibrary("System.Xml.Schema", {
  Extensions: {
    kind: "class",
    members: {
      GetSchemaInfo: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Validate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  IXmlSchemaInfo: {
    kind: "interface",
    members: {
      IsDefault: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MemberType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaSimpleType;
        },
        isNullable: true,
      },
      SchemaAttribute: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaAttribute;
        },
      },
      SchemaElement: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaElement;
        },
      },
      SchemaType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaType;
        },
      },
      Validity: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaValidity;
        },
      },
    },
  },
  ValidationEventArgs: {
    kind: "class",
    members: {
      Exception: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaException;
        },
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Severity: {
        kind: "property",
        type: () => {
          return Schema.XmlSeverityType;
        },
      },
    },
  },
  ValidationEventHandler: {
    kind: "generic",
    members: {
      ValidationEventHandler: {
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
  XmlAtomicValue: {
    kind: "class",
    members: {
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ValueAs: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsNode: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      TypedValue: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isOverride: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      ValueAsBoolean: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      ValueAsDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      ValueAsDouble: {
        kind: "property",
        type: () => {
          return System.Double;
        },
        isOverride: true,
      },
      ValueAsInt: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      ValueAsLong: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      ValueType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
      XmlType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaType;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  XmlSchema: {
    kind: "class",
    members: {
      InstanceNamespace: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Namespace: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      XmlSchema: {
        kind: "method",
        methodKind: "constructor",
      },
      Compile: {
        kind: "method",
        methodKind: "ordinary",
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
      },
      AttributeFormDefault: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaForm;
        },
      },
      AttributeGroups: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectTable;
        },
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectTable;
        },
      },
      BlockDefault: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      ElementFormDefault: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaForm;
        },
      },
      Elements: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectTable;
        },
      },
      FinalDefault: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      Groups: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectTable;
        },
      },
      Id: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Includes: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
      IsCompiled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Items: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
      Notations: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectTable;
        },
      },
      SchemaTypes: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectTable;
        },
      },
      TargetNamespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      UnhandledAttributes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Version: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlSchemaAll: {
    kind: "class",
    members: {
      XmlSchemaAll: {
        kind: "method",
        methodKind: "constructor",
      },
      Items: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
        isOverride: true,
      },
    },
  },
  XmlSchemaAnnotated: {
    kind: "class",
    members: {
      XmlSchemaAnnotated: {
        kind: "method",
        methodKind: "constructor",
      },
      Annotation: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaAnnotation;
        },
      },
      Id: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      UnhandledAttributes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
    },
  },
  XmlSchemaAnnotation: {
    kind: "class",
    members: {
      XmlSchemaAnnotation: {
        kind: "method",
        methodKind: "constructor",
      },
      Id: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Items: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
      UnhandledAttributes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
    },
  },
  XmlSchemaAny: {
    kind: "class",
    members: {
      XmlSchemaAny: {
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
      ProcessContents: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaContentProcessing;
        },
      },
    },
  },
  XmlSchemaAnyAttribute: {
    kind: "class",
    members: {
      XmlSchemaAnyAttribute: {
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
      ProcessContents: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaContentProcessing;
        },
      },
    },
  },
  XmlSchemaAppInfo: {
    kind: "class",
    members: {
      XmlSchemaAppInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      Markup: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Source: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlSchemaAttribute: {
    kind: "class",
    members: {
      XmlSchemaAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AttributeSchemaType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaSimpleType;
        },
        isNullable: true,
      },
      AttributeType: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      DefaultValue: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      FixedValue: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Form: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaForm;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      QualifiedName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
      RefName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
      SchemaType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaSimpleType;
        },
        isNullable: true,
      },
      SchemaTypeName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
      Use: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaUse;
        },
      },
    },
  },
  XmlSchemaAttributeGroup: {
    kind: "class",
    members: {
      XmlSchemaAttributeGroup: {
        kind: "method",
        methodKind: "constructor",
      },
      AnyAttribute: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaAnyAttribute;
        },
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      QualifiedName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
      RedefinedAttributeGroup: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaAttributeGroup;
        },
        isNullable: true,
      },
    },
  },
  XmlSchemaAttributeGroupRef: {
    kind: "class",
    members: {
      XmlSchemaAttributeGroupRef: {
        kind: "method",
        methodKind: "constructor",
      },
      RefName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
    },
  },
  XmlSchemaChoice: {
    kind: "class",
    members: {
      XmlSchemaChoice: {
        kind: "method",
        methodKind: "constructor",
      },
      Items: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
        isOverride: true,
      },
    },
  },
  XmlSchemaCollection: {
    kind: "class",
    members: {
      XmlSchemaCollection: {
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
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return Schema.XmlSchema;
        },
      },
      NameTable: {
        kind: "property",
        type: () => {
          return Xml.XmlNameTable;
        },
      },
    },
    isSealed: true,
  },
  XmlSchemaCollectionEnumerator: {
    kind: "class",
    members: {
      MoveNext: {
        kind: "method",
        methodKind: "ordinary",
      },
      Current: {
        kind: "property",
        type: () => {
          return Schema.XmlSchema;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  XmlSchemaCompilationSettings: {
    kind: "class",
    members: {
      XmlSchemaCompilationSettings: {
        kind: "method",
        methodKind: "constructor",
      },
      EnableUpaCheck: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  XmlSchemaComplexContent: {
    kind: "class",
    members: {
      XmlSchemaComplexContent: {
        kind: "method",
        methodKind: "constructor",
      },
      Content: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaContent;
        },
        isOverride: true,
      },
      IsMixed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  XmlSchemaComplexContentExtension: {
    kind: "class",
    members: {
      XmlSchemaComplexContentExtension: {
        kind: "method",
        methodKind: "constructor",
      },
      AnyAttribute: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaAnyAttribute;
        },
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
      BaseTypeName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
      Particle: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaParticle;
        },
      },
    },
  },
  XmlSchemaComplexContentRestriction: {
    kind: "class",
    members: {
      XmlSchemaComplexContentRestriction: {
        kind: "method",
        methodKind: "constructor",
      },
      AnyAttribute: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaAnyAttribute;
        },
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
      BaseTypeName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
      Particle: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaParticle;
        },
      },
    },
  },
  XmlSchemaComplexType: {
    kind: "class",
    members: {
      XmlSchemaComplexType: {
        kind: "method",
        methodKind: "constructor",
      },
      AnyAttribute: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaAnyAttribute;
        },
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
      AttributeUses: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectTable;
        },
      },
      AttributeWildcard: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaAnyAttribute;
        },
        isNullable: true,
      },
      Block: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      BlockResolved: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      ContentModel: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaContentModel;
        },
      },
      ContentType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaContentType;
        },
      },
      ContentTypeParticle: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaParticle;
        },
      },
      IsAbstract: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsMixed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      Particle: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaParticle;
        },
      },
    },
  },
  XmlSchemaContent: {
    kind: "class",
    members: {
      XmlSchemaContent: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isAbstract: true,
  },
  XmlSchemaContentModel: {
    kind: "class",
    members: {
      XmlSchemaContentModel: {
        kind: "method",
        methodKind: "constructor",
      },
      Content: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaContent;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  XmlSchemaContentProcessing: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaContentProcessing;
        },
      },
      Skip: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaContentProcessing;
        },
      },
      Lax: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaContentProcessing;
        },
      },
      Strict: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaContentProcessing;
        },
      },
    },
  },
  XmlSchemaContentType: {
    kind: "enum",
    members: {
      TextOnly: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaContentType;
        },
      },
      Empty: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaContentType;
        },
      },
      ElementOnly: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaContentType;
        },
      },
      Mixed: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaContentType;
        },
      },
    },
  },
  XmlSchemaDatatype: {
    kind: "class",
    members: {
      ChangeType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsDerivedFrom: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ParseValue: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      TokenizedType: {
        kind: "property",
        type: () => {
          return Xml.XmlTokenizedType;
        },
        isAbstract: true,
      },
      TypeCode: {
        kind: "property",
        type: () => {
          return Schema.XmlTypeCode;
        },
        isVirtual: true,
      },
      ValueType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isAbstract: true,
      },
      Variety: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaDatatypeVariety;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  XmlSchemaDatatypeVariety: {
    kind: "enum",
    members: {
      Atomic: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaDatatypeVariety;
        },
      },
      List: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaDatatypeVariety;
        },
      },
      Union: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaDatatypeVariety;
        },
      },
    },
  },
  XmlSchemaDerivationMethod: {
    kind: "enum",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      Substitution: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      Extension: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      Restriction: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      List: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      Union: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      All: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      None: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
    },
  },
  XmlSchemaDocumentation: {
    kind: "class",
    members: {
      XmlSchemaDocumentation: {
        kind: "method",
        methodKind: "constructor",
      },
      Language: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Markup: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Source: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlSchemaElement: {
    kind: "class",
    members: {
      XmlSchemaElement: {
        kind: "method",
        methodKind: "constructor",
      },
      Block: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      BlockResolved: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      Constraints: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
      DefaultValue: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ElementSchemaType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaType;
        },
        isNullable: true,
      },
      ElementType: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      Final: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      FinalResolved: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      FixedValue: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Form: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaForm;
        },
      },
      IsAbstract: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNillable: {
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
      QualifiedName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
      RefName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
      SchemaType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaType;
        },
      },
      SchemaTypeName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
      SubstitutionGroup: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
    },
  },
  XmlSchemaEnumerationFacet: {
    kind: "class",
    members: {
      XmlSchemaEnumerationFacet: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaException: {
    kind: "class",
    members: {
      XmlSchemaException: {
        kind: "method",
        methodKind: "constructor",
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
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      SourceSchemaObject: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObject;
        },
        isNullable: true,
      },
      SourceUri: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlSchemaExternal: {
    kind: "class",
    members: {
      XmlSchemaExternal: {
        kind: "method",
        methodKind: "constructor",
      },
      Id: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Schema: {
        kind: "property",
        type: () => {
          return Schema.XmlSchema;
        },
      },
      SchemaLocation: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      UnhandledAttributes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
    },
    isAbstract: true,
  },
  XmlSchemaFacet: {
    kind: "class",
    members: {
      XmlSchemaFacet: {
        kind: "method",
        methodKind: "constructor",
      },
      IsFixed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isAbstract: true,
  },
  XmlSchemaForm: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaForm;
        },
      },
      Qualified: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaForm;
        },
      },
      Unqualified: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaForm;
        },
      },
    },
  },
  XmlSchemaFractionDigitsFacet: {
    kind: "class",
    members: {
      XmlSchemaFractionDigitsFacet: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaGroup: {
    kind: "class",
    members: {
      XmlSchemaGroup: {
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
      Particle: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaGroupBase;
        },
        isNullable: true,
      },
      QualifiedName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
    },
  },
  XmlSchemaGroupBase: {
    kind: "class",
    members: {
      Items: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  XmlSchemaGroupRef: {
    kind: "class",
    members: {
      XmlSchemaGroupRef: {
        kind: "method",
        methodKind: "constructor",
      },
      Particle: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaGroupBase;
        },
        isNullable: true,
      },
      RefName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
    },
  },
  XmlSchemaIdentityConstraint: {
    kind: "class",
    members: {
      XmlSchemaIdentityConstraint: {
        kind: "method",
        methodKind: "constructor",
      },
      Fields: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      QualifiedName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
      Selector: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaXPath;
        },
        isNullable: true,
      },
    },
  },
  XmlSchemaImport: {
    kind: "class",
    members: {
      XmlSchemaImport: {
        kind: "method",
        methodKind: "constructor",
      },
      Annotation: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaAnnotation;
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
  XmlSchemaInclude: {
    kind: "class",
    members: {
      XmlSchemaInclude: {
        kind: "method",
        methodKind: "constructor",
      },
      Annotation: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaAnnotation;
        },
      },
    },
  },
  XmlSchemaInference: {
    kind: "class",
    members: {
      InferenceOption: {
        kind: "enum",
        members: {
          Restricted: {
            kind: "field",
            type: () => {
              return Schema.XmlSchemaInference.InferenceOption;
            },
          },
          Relaxed: {
            kind: "field",
            type: () => {
              return Schema.XmlSchemaInference.InferenceOption;
            },
          },
        },
      },
    },
  },
  XmlSchemaInferenceException: {
    kind: "class",
    members: {
      XmlSchemaInferenceException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaInfo: {
    kind: "class",
    members: {
      XmlSchemaInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      ContentType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaContentType;
        },
      },
      IsDefault: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNil: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MemberType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaSimpleType;
        },
        isNullable: true,
      },
      SchemaAttribute: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaAttribute;
        },
      },
      SchemaElement: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaElement;
        },
      },
      SchemaType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaType;
        },
      },
      Validity: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaValidity;
        },
      },
    },
  },
  XmlSchemaKey: {
    kind: "class",
    members: {
      XmlSchemaKey: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaKeyref: {
    kind: "class",
    members: {
      XmlSchemaKeyref: {
        kind: "method",
        methodKind: "constructor",
      },
      Refer: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
    },
  },
  XmlSchemaLengthFacet: {
    kind: "class",
    members: {
      XmlSchemaLengthFacet: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaMaxExclusiveFacet: {
    kind: "class",
    members: {
      XmlSchemaMaxExclusiveFacet: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaMaxInclusiveFacet: {
    kind: "class",
    members: {
      XmlSchemaMaxInclusiveFacet: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaMaxLengthFacet: {
    kind: "class",
    members: {
      XmlSchemaMaxLengthFacet: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaMinExclusiveFacet: {
    kind: "class",
    members: {
      XmlSchemaMinExclusiveFacet: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaMinInclusiveFacet: {
    kind: "class",
    members: {
      XmlSchemaMinInclusiveFacet: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaMinLengthFacet: {
    kind: "class",
    members: {
      XmlSchemaMinLengthFacet: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaNotation: {
    kind: "class",
    members: {
      XmlSchemaNotation: {
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
      Public: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      System: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlSchemaNumericFacet: {
    kind: "class",
    members: {
      XmlSchemaNumericFacet: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isAbstract: true,
  },
  XmlSchemaObject: {
    kind: "class",
    members: {
      XmlSchemaObject: {
        kind: "method",
        methodKind: "constructor",
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
      Namespaces: {
        kind: "property",
        type: () => {
          return Serialization.XmlSerializerNamespaces;
        },
      },
      Parent: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObject;
        },
        isNullable: true,
      },
      SourceUri: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isAbstract: true,
  },
  XmlSchemaObjectCollection: {
    kind: "class",
    members: {
      XmlSchemaObjectCollection: {
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
      GetEnumerator: {
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
      Item: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObject;
        },
        isVirtual: true,
      },
    },
  },
  XmlSchemaObjectEnumerator: {
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
          return Schema.XmlSchemaObject;
        },
      },
    },
  },
  XmlSchemaObjectTable: {
    kind: "class",
    members: {
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObject;
        },
      },
      Names: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
      },
      Values: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
      },
    },
  },
  XmlSchemaParticle: {
    kind: "class",
    members: {
      XmlSchemaParticle: {
        kind: "method",
        methodKind: "constructor",
      },
      MaxOccurs: {
        kind: "property",
        type: () => {
          return System.Decimal;
        },
      },
      MaxOccursString: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      MinOccurs: {
        kind: "property",
        type: () => {
          return System.Decimal;
        },
      },
      MinOccursString: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isAbstract: true,
  },
  XmlSchemaPatternFacet: {
    kind: "class",
    members: {
      XmlSchemaPatternFacet: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaRedefine: {
    kind: "class",
    members: {
      XmlSchemaRedefine: {
        kind: "method",
        methodKind: "constructor",
      },
      AttributeGroups: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectTable;
        },
      },
      Groups: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectTable;
        },
      },
      Items: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
      SchemaTypes: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectTable;
        },
      },
    },
  },
  XmlSchemaSequence: {
    kind: "class",
    members: {
      XmlSchemaSequence: {
        kind: "method",
        methodKind: "constructor",
      },
      Items: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
        isOverride: true,
      },
    },
  },
  XmlSchemaSet: {
    kind: "class",
    members: {
      XmlSchemaSet: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
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
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveRecursive: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reprocess: {
        kind: "method",
        methodKind: "ordinary",
      },
      Schemas: {
        kind: "method",
        methodKind: "ordinary",
      },
      CompilationSettings: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaCompilationSettings;
        },
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      GlobalAttributes: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectTable;
        },
      },
      GlobalElements: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectTable;
        },
      },
      GlobalTypes: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectTable;
        },
      },
      IsCompiled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      NameTable: {
        kind: "property",
        type: () => {
          return Xml.XmlNameTable;
        },
      },
      XmlResolver: {
        kind: "property",
        type: () => {
          return Xml.XmlResolver;
        },
      },
    },
  },
  XmlSchemaSimpleContent: {
    kind: "class",
    members: {
      XmlSchemaSimpleContent: {
        kind: "method",
        methodKind: "constructor",
      },
      Content: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaContent;
        },
        isOverride: true,
      },
    },
  },
  XmlSchemaSimpleContentExtension: {
    kind: "class",
    members: {
      XmlSchemaSimpleContentExtension: {
        kind: "method",
        methodKind: "constructor",
      },
      AnyAttribute: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaAnyAttribute;
        },
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
      BaseTypeName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
    },
  },
  XmlSchemaSimpleContentRestriction: {
    kind: "class",
    members: {
      XmlSchemaSimpleContentRestriction: {
        kind: "method",
        methodKind: "constructor",
      },
      AnyAttribute: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaAnyAttribute;
        },
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
      BaseType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaSimpleType;
        },
        isNullable: true,
      },
      BaseTypeName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
      Facets: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
    },
  },
  XmlSchemaSimpleType: {
    kind: "class",
    members: {
      XmlSchemaSimpleType: {
        kind: "method",
        methodKind: "constructor",
      },
      Content: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaSimpleTypeContent;
        },
      },
    },
  },
  XmlSchemaSimpleTypeContent: {
    kind: "class",
    members: {
      XmlSchemaSimpleTypeContent: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isAbstract: true,
  },
  XmlSchemaSimpleTypeList: {
    kind: "class",
    members: {
      XmlSchemaSimpleTypeList: {
        kind: "method",
        methodKind: "constructor",
      },
      BaseItemType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaSimpleType;
        },
        isNullable: true,
      },
      ItemType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaSimpleType;
        },
        isNullable: true,
      },
      ItemTypeName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
    },
  },
  XmlSchemaSimpleTypeRestriction: {
    kind: "class",
    members: {
      XmlSchemaSimpleTypeRestriction: {
        kind: "method",
        methodKind: "constructor",
      },
      BaseType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaSimpleType;
        },
        isNullable: true,
      },
      BaseTypeName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
      Facets: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
    },
  },
  XmlSchemaSimpleTypeUnion: {
    kind: "class",
    members: {
      XmlSchemaSimpleTypeUnion: {
        kind: "method",
        methodKind: "constructor",
      },
      BaseMemberTypes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      BaseTypes: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaObjectCollection;
        },
      },
      MemberTypes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
    },
  },
  XmlSchemaTotalDigitsFacet: {
    kind: "class",
    members: {
      XmlSchemaTotalDigitsFacet: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaType: {
    kind: "class",
    members: {
      XmlSchemaType: {
        kind: "method",
        methodKind: "constructor",
      },
      GetBuiltInComplexType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetBuiltInSimpleType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsDerivedFrom: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BaseSchemaType: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      BaseXmlSchemaType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaType;
        },
        isNullable: true,
      },
      Datatype: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaDatatype;
        },
      },
      DerivedBy: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      Final: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      FinalResolved: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaDerivationMethod;
        },
      },
      IsMixed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      QualifiedName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
      },
      TypeCode: {
        kind: "property",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
    },
  },
  XmlSchemaUnique: {
    kind: "class",
    members: {
      XmlSchemaUnique: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaUse: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaUse;
        },
      },
      Optional: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaUse;
        },
      },
      Prohibited: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaUse;
        },
      },
      Required: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaUse;
        },
      },
    },
  },
  XmlSchemaValidationException: {
    kind: "class",
    members: {
      XmlSchemaValidationException: {
        kind: "method",
        methodKind: "constructor",
      },
      SetSourceObject: {
        kind: "method",
        methodKind: "ordinary",
      },
      SourceObject: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  XmlSchemaValidationFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaValidationFlags;
        },
      },
      ProcessInlineSchema: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaValidationFlags;
        },
      },
      ProcessSchemaLocation: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaValidationFlags;
        },
      },
      ReportValidationWarnings: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaValidationFlags;
        },
      },
      ProcessIdentityConstraints: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaValidationFlags;
        },
      },
      AllowXmlAttributes: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaValidationFlags;
        },
      },
    },
  },
  XmlSchemaValidator: {
    kind: "class",
    members: {
      XmlSchemaValidator: {
        kind: "method",
        methodKind: "constructor",
      },
      AddSchema: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndValidation: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetExpectedAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetExpectedParticles: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUnspecifiedDefaultAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      Initialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      SkipToEndElement: {
        kind: "method",
        methodKind: "ordinary",
      },
      ValidateAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      ValidateElement: {
        kind: "method",
        methodKind: "ordinary",
      },
      ValidateEndElement: {
        kind: "method",
        methodKind: "ordinary",
      },
      ValidateEndOfAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      ValidateText: {
        kind: "method",
        methodKind: "ordinary",
      },
      ValidateWhitespace: {
        kind: "method",
        methodKind: "ordinary",
      },
      LineInfoProvider: {
        kind: "property",
        type: () => {
          return Xml.IXmlLineInfo;
        },
      },
      SourceUri: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isNullable: true,
      },
      ValidationEventSender: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      XmlResolver: {
        kind: "property",
        type: () => {
          return Xml.XmlResolver;
        },
      },
    },
    isSealed: true,
  },
  XmlSchemaValidity: {
    kind: "enum",
    members: {
      NotKnown: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaValidity;
        },
      },
      Valid: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaValidity;
        },
      },
      Invalid: {
        kind: "field",
        type: () => {
          return Schema.XmlSchemaValidity;
        },
      },
    },
  },
  XmlSchemaWhiteSpaceFacet: {
    kind: "class",
    members: {
      XmlSchemaWhiteSpaceFacet: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlSchemaXPath: {
    kind: "class",
    members: {
      XmlSchemaXPath: {
        kind: "method",
        methodKind: "constructor",
      },
      XPath: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlSeverityType: {
    kind: "enum",
    members: {
      Error: {
        kind: "field",
        type: () => {
          return Schema.XmlSeverityType;
        },
      },
      Warning: {
        kind: "field",
        type: () => {
          return Schema.XmlSeverityType;
        },
      },
    },
  },
  XmlTypeCode: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Item: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Node: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Document: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Element: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Attribute: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Namespace: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      ProcessingInstruction: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Comment: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Text: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      AnyAtomicType: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      UntypedAtomic: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Boolean: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Decimal: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Float: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Double: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Duration: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      DateTime: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Time: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Date: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      GYearMonth: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      GYear: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      GMonthDay: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      GDay: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      GMonth: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      HexBinary: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Base64Binary: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      AnyUri: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      QName: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Notation: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      NormalizedString: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Token: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Language: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      NmToken: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Name: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      NCName: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Id: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Idref: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Entity: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Integer: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      NonPositiveInteger: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      NegativeInteger: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Long: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Int: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Short: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      Byte: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      NonNegativeInteger: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      UnsignedLong: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      UnsignedInt: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      UnsignedShort: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      UnsignedByte: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      PositiveInteger: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      YearMonthDuration: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
      DayTimeDuration: {
        kind: "field",
        type: () => {
          return Schema.XmlTypeCode;
        },
      },
    },
  },
  XmlValueGetter: {
    kind: "generic",
    members: {
      XmlValueGetter: {
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
});
export default Schema
