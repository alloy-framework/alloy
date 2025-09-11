import Data from "../Data/index.js";
import System from "../index.js";
import Cache from "../Net/Cache/index.js";
import Net from "../Net/index.js";
import Text from "../Text/index.js";
import Schema from "./Schema/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Linq } from "./Linq/index.js";
export { default as Resolvers } from "./Resolvers/index.js";
export { default as Schema } from "./Schema/index.js";
export { default as Serialization } from "./Serialization/index.js";
export { default as XPath } from "./XPath/index.js";
export { default as Xsl } from "./Xsl/index.js";

type XmlLibrary = LibrarySymbolReference & {
  ConformanceLevel: LibrarySymbolReference & {
    Auto: LibrarySymbolReference;
    Fragment: LibrarySymbolReference;
    Document: LibrarySymbolReference
  };
  DtdProcessing: LibrarySymbolReference & {
    Prohibit: LibrarySymbolReference;
    Ignore: LibrarySymbolReference;
    Parse: LibrarySymbolReference
  };
  EntityHandling: LibrarySymbolReference & {
    ExpandEntities: LibrarySymbolReference;
    ExpandCharEntities: LibrarySymbolReference
  };
  Formatting: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Indented: LibrarySymbolReference
  };
  IFragmentCapableXmlDictionaryWriter: LibrarySymbolReference & {
    EndFragment: LibrarySymbolReference;
    StartFragment: LibrarySymbolReference;
    WriteFragment: LibrarySymbolReference;
    CanFragment: LibrarySymbolReference
  };
  IHasXmlNode: LibrarySymbolReference & {
    GetNode: LibrarySymbolReference
  };
  IStreamProvider: LibrarySymbolReference & {
    GetStream: LibrarySymbolReference;
    ReleaseStream: LibrarySymbolReference
  };
  IXmlBinaryReaderInitializer: LibrarySymbolReference & {
    SetInput: LibrarySymbolReference
  };
  IXmlBinaryWriterInitializer: LibrarySymbolReference & {
    SetOutput: LibrarySymbolReference
  };
  IXmlDictionary: LibrarySymbolReference & {
    TryLookup: LibrarySymbolReference
  };
  IXmlLineInfo: LibrarySymbolReference & {
    HasLineInfo: LibrarySymbolReference;
    LineNumber: LibrarySymbolReference;
    LinePosition: LibrarySymbolReference
  };
  IXmlNamespaceResolver: LibrarySymbolReference & {
    GetNamespacesInScope: LibrarySymbolReference;
    LookupNamespace: LibrarySymbolReference;
    LookupPrefix: LibrarySymbolReference
  };
  IXmlTextReaderInitializer: LibrarySymbolReference & {
    SetInput: LibrarySymbolReference
  };
  IXmlTextWriterInitializer: LibrarySymbolReference & {
    SetOutput: LibrarySymbolReference
  };
  NameTable: LibrarySymbolReference & {
    NameTable: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Get: LibrarySymbolReference
  };
  NamespaceHandling: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    OmitDuplicates: LibrarySymbolReference
  };
  NewLineHandling: LibrarySymbolReference & {
    Replace: LibrarySymbolReference;
    Entitize: LibrarySymbolReference;
    None: LibrarySymbolReference
  };
  OnXmlDictionaryReaderClose: LibrarySymbolReference & {
    OnXmlDictionaryReaderClose: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  ReadState: LibrarySymbolReference & {
    Initial: LibrarySymbolReference;
    Interactive: LibrarySymbolReference;
    Error: LibrarySymbolReference;
    EndOfFile: LibrarySymbolReference;
    Closed: LibrarySymbolReference
  };
  UniqueId: LibrarySymbolReference & {
    UniqueId: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToCharArray: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryGetGuid: LibrarySymbolReference;
    CharArrayLength: LibrarySymbolReference;
    IsGuid: LibrarySymbolReference
  };
  ValidationType: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Auto: LibrarySymbolReference;
    DTD: LibrarySymbolReference;
    XDR: LibrarySymbolReference;
    Schema: LibrarySymbolReference
  };
  WhitespaceHandling: LibrarySymbolReference & {
    All: LibrarySymbolReference;
    Significant: LibrarySymbolReference;
    None: LibrarySymbolReference
  };
  WriteState: LibrarySymbolReference & {
    Start: LibrarySymbolReference;
    Prolog: LibrarySymbolReference;
    Element: LibrarySymbolReference;
    Attribute: LibrarySymbolReference;
    Content: LibrarySymbolReference;
    Closed: LibrarySymbolReference;
    Error: LibrarySymbolReference
  };
  XmlAttribute: LibrarySymbolReference & {
    XmlAttribute: LibrarySymbolReference;
    AppendChild: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    InsertAfter: LibrarySymbolReference;
    InsertBefore: LibrarySymbolReference;
    PrependChild: LibrarySymbolReference;
    RemoveChild: LibrarySymbolReference;
    ReplaceChild: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    BaseURI: LibrarySymbolReference;
    InnerText: LibrarySymbolReference;
    InnerXml: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NamespaceURI: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    OwnerDocument: LibrarySymbolReference;
    OwnerElement: LibrarySymbolReference;
    ParentNode: LibrarySymbolReference;
    Prefix: LibrarySymbolReference;
    SchemaInfo: LibrarySymbolReference;
    Specified: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  XmlAttributeCollection: LibrarySymbolReference & {
    Append: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    InsertAfter: LibrarySymbolReference;
    InsertBefore: LibrarySymbolReference;
    Prepend: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAll: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    SetNamedItem: LibrarySymbolReference;
    ItemOf: LibrarySymbolReference
  };
  XmlBinaryReaderSession: LibrarySymbolReference & {
    XmlBinaryReaderSession: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    TryLookup: LibrarySymbolReference
  };
  XmlBinaryWriterSession: LibrarySymbolReference & {
    XmlBinaryWriterSession: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    TryAdd: LibrarySymbolReference
  };
  XmlCDataSection: LibrarySymbolReference & {
    XmlCDataSection: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    ParentNode: LibrarySymbolReference;
    PreviousText: LibrarySymbolReference
  };
  XmlCharacterData: LibrarySymbolReference & {
    XmlCharacterData: LibrarySymbolReference;
    AppendData: LibrarySymbolReference;
    DeleteData: LibrarySymbolReference;
    InsertData: LibrarySymbolReference;
    ReplaceData: LibrarySymbolReference;
    Substring: LibrarySymbolReference;
    Data: LibrarySymbolReference;
    InnerText: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  XmlComment: LibrarySymbolReference & {
    XmlComment: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference
  };
  XmlConvert: LibrarySymbolReference & {
    XmlConvert: LibrarySymbolReference;
    DecodeName: LibrarySymbolReference;
    EncodeLocalName: LibrarySymbolReference;
    EncodeName: LibrarySymbolReference;
    EncodeNmToken: LibrarySymbolReference;
    IsNCNameChar: LibrarySymbolReference;
    IsPublicIdChar: LibrarySymbolReference;
    IsStartNCNameChar: LibrarySymbolReference;
    IsWhitespaceChar: LibrarySymbolReference;
    IsXmlChar: LibrarySymbolReference;
    IsXmlSurrogatePair: LibrarySymbolReference;
    ToBoolean: LibrarySymbolReference;
    ToByte: LibrarySymbolReference;
    ToChar: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToDateTimeOffset: LibrarySymbolReference;
    ToDecimal: LibrarySymbolReference;
    ToDouble: LibrarySymbolReference;
    ToGuid: LibrarySymbolReference;
    ToInt16: LibrarySymbolReference;
    ToInt32: LibrarySymbolReference;
    ToInt64: LibrarySymbolReference;
    ToSByte: LibrarySymbolReference;
    ToSingle: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ToTimeSpan: LibrarySymbolReference;
    ToUInt16: LibrarySymbolReference;
    ToUInt32: LibrarySymbolReference;
    ToUInt64: LibrarySymbolReference;
    VerifyName: LibrarySymbolReference;
    VerifyNCName: LibrarySymbolReference;
    VerifyNMTOKEN: LibrarySymbolReference;
    VerifyPublicId: LibrarySymbolReference;
    VerifyTOKEN: LibrarySymbolReference;
    VerifyWhitespace: LibrarySymbolReference;
    VerifyXmlChars: LibrarySymbolReference
  };
  XmlDataDocument: LibrarySymbolReference & {
    XmlDataDocument: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    CreateElement: LibrarySymbolReference;
    CreateEntityReference: LibrarySymbolReference;
    CreateNavigator: LibrarySymbolReference;
    GetElementById: LibrarySymbolReference;
    GetElementFromRow: LibrarySymbolReference;
    GetElementsByTagName: LibrarySymbolReference;
    GetRowFromElement: LibrarySymbolReference;
    Load: LibrarySymbolReference;
    DataSet: LibrarySymbolReference
  };
  XmlDateTimeSerializationMode: LibrarySymbolReference & {
    Local: LibrarySymbolReference;
    Utc: LibrarySymbolReference;
    Unspecified: LibrarySymbolReference;
    RoundtripKind: LibrarySymbolReference
  };
  XmlDeclaration: LibrarySymbolReference & {
    XmlDeclaration: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    Encoding: LibrarySymbolReference;
    InnerText: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Standalone: LibrarySymbolReference;
    Value: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  XmlDictionary: LibrarySymbolReference & {
    XmlDictionary: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    TryLookup: LibrarySymbolReference;
    Empty: LibrarySymbolReference
  };
  XmlDictionaryReader: LibrarySymbolReference & {
    XmlDictionaryReader: LibrarySymbolReference;
    CreateBinaryReader: LibrarySymbolReference;
    CreateDictionaryReader: LibrarySymbolReference;
    CreateMtomReader: LibrarySymbolReference;
    CreateTextReader: LibrarySymbolReference;
    EndCanonicalization: LibrarySymbolReference;
    GetAttribute: LibrarySymbolReference;
    GetNonAtomizedNames: LibrarySymbolReference;
    IndexOfLocalName: LibrarySymbolReference;
    IsLocalName: LibrarySymbolReference;
    IsNamespaceUri: LibrarySymbolReference;
    IsStartArray: LibrarySymbolReference;
    IsStartElement: LibrarySymbolReference;
    IsTextNode: LibrarySymbolReference;
    MoveToStartElement: LibrarySymbolReference;
    ReadArray: LibrarySymbolReference;
    ReadBooleanArray: LibrarySymbolReference;
    ReadContentAs: LibrarySymbolReference;
    ReadContentAsBase64: LibrarySymbolReference;
    ReadContentAsBinHex: LibrarySymbolReference;
    ReadContentAsChars: LibrarySymbolReference;
    ReadContentAsDecimal: LibrarySymbolReference;
    ReadContentAsFloat: LibrarySymbolReference;
    ReadContentAsGuid: LibrarySymbolReference;
    ReadContentAsQualifiedName: LibrarySymbolReference;
    ReadContentAsString: LibrarySymbolReference;
    ReadContentAsTimeSpan: LibrarySymbolReference;
    ReadContentAsUniqueId: LibrarySymbolReference;
    ReadDateTimeArray: LibrarySymbolReference;
    ReadDecimalArray: LibrarySymbolReference;
    ReadDoubleArray: LibrarySymbolReference;
    ReadElementContentAsBase64: LibrarySymbolReference;
    ReadElementContentAsBinHex: LibrarySymbolReference;
    ReadElementContentAsBoolean: LibrarySymbolReference;
    ReadElementContentAsDateTime: LibrarySymbolReference;
    ReadElementContentAsDecimal: LibrarySymbolReference;
    ReadElementContentAsDouble: LibrarySymbolReference;
    ReadElementContentAsFloat: LibrarySymbolReference;
    ReadElementContentAsGuid: LibrarySymbolReference;
    ReadElementContentAsInt: LibrarySymbolReference;
    ReadElementContentAsLong: LibrarySymbolReference;
    ReadElementContentAsString: LibrarySymbolReference;
    ReadElementContentAsTimeSpan: LibrarySymbolReference;
    ReadElementContentAsUniqueId: LibrarySymbolReference;
    ReadFullStartElement: LibrarySymbolReference;
    ReadGuidArray: LibrarySymbolReference;
    ReadInt16Array: LibrarySymbolReference;
    ReadInt32Array: LibrarySymbolReference;
    ReadInt64Array: LibrarySymbolReference;
    ReadSingleArray: LibrarySymbolReference;
    ReadStartElement: LibrarySymbolReference;
    ReadString: LibrarySymbolReference;
    ReadTimeSpanArray: LibrarySymbolReference;
    ReadValueAsBase64: LibrarySymbolReference;
    StartCanonicalization: LibrarySymbolReference;
    TryGetArrayLength: LibrarySymbolReference;
    TryGetBase64ContentLength: LibrarySymbolReference;
    TryGetLocalNameAsDictionaryString: LibrarySymbolReference;
    TryGetNamespaceUriAsDictionaryString: LibrarySymbolReference;
    TryGetValueAsDictionaryString: LibrarySymbolReference;
    CanCanonicalize: LibrarySymbolReference;
    Quotas: LibrarySymbolReference
  };
  XmlDictionaryReaderQuotaTypes: LibrarySymbolReference & {
    MaxDepth: LibrarySymbolReference;
    MaxStringContentLength: LibrarySymbolReference;
    MaxArrayLength: LibrarySymbolReference;
    MaxBytesPerRead: LibrarySymbolReference;
    MaxNameTableCharCount: LibrarySymbolReference
  };
  XmlDictionaryReaderQuotas: LibrarySymbolReference & {
    XmlDictionaryReaderQuotas: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Max: LibrarySymbolReference;
    MaxArrayLength: LibrarySymbolReference;
    MaxBytesPerRead: LibrarySymbolReference;
    MaxDepth: LibrarySymbolReference;
    MaxNameTableCharCount: LibrarySymbolReference;
    MaxStringContentLength: LibrarySymbolReference;
    ModifiedQuotas: LibrarySymbolReference
  };
  XmlDictionaryString: LibrarySymbolReference & {
    XmlDictionaryString: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Dictionary: LibrarySymbolReference;
    Empty: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  XmlDictionaryWriter: LibrarySymbolReference & {
    XmlDictionaryWriter: LibrarySymbolReference;
    CreateBinaryWriter: LibrarySymbolReference;
    CreateDictionaryWriter: LibrarySymbolReference;
    CreateMtomWriter: LibrarySymbolReference;
    CreateTextWriter: LibrarySymbolReference;
    EndCanonicalization: LibrarySymbolReference;
    StartCanonicalization: LibrarySymbolReference;
    WriteArray: LibrarySymbolReference;
    WriteAttributeString: LibrarySymbolReference;
    WriteBase64Async: LibrarySymbolReference;
    WriteElementString: LibrarySymbolReference;
    WriteNode: LibrarySymbolReference;
    WriteQualifiedName: LibrarySymbolReference;
    WriteStartAttribute: LibrarySymbolReference;
    WriteStartElement: LibrarySymbolReference;
    WriteString: LibrarySymbolReference;
    WriteTextNode: LibrarySymbolReference;
    WriteValue: LibrarySymbolReference;
    WriteValueAsync: LibrarySymbolReference;
    WriteXmlAttribute: LibrarySymbolReference;
    WriteXmlnsAttribute: LibrarySymbolReference;
    CanCanonicalize: LibrarySymbolReference
  };
  XmlDocument: LibrarySymbolReference & {
    XmlDocument: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    CreateAttribute: LibrarySymbolReference;
    CreateCDataSection: LibrarySymbolReference;
    CreateComment: LibrarySymbolReference;
    CreateDefaultAttribute: LibrarySymbolReference;
    CreateDocumentFragment: LibrarySymbolReference;
    CreateDocumentType: LibrarySymbolReference;
    CreateElement: LibrarySymbolReference;
    CreateEntityReference: LibrarySymbolReference;
    CreateNavigator: LibrarySymbolReference;
    CreateNode: LibrarySymbolReference;
    CreateProcessingInstruction: LibrarySymbolReference;
    CreateSignificantWhitespace: LibrarySymbolReference;
    CreateTextNode: LibrarySymbolReference;
    CreateWhitespace: LibrarySymbolReference;
    CreateXmlDeclaration: LibrarySymbolReference;
    GetElementById: LibrarySymbolReference;
    GetElementsByTagName: LibrarySymbolReference;
    ImportNode: LibrarySymbolReference;
    Load: LibrarySymbolReference;
    LoadXml: LibrarySymbolReference;
    ReadNode: LibrarySymbolReference;
    Save: LibrarySymbolReference;
    Validate: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    BaseURI: LibrarySymbolReference;
    DocumentElement: LibrarySymbolReference;
    DocumentType: LibrarySymbolReference;
    Implementation: LibrarySymbolReference;
    InnerText: LibrarySymbolReference;
    InnerXml: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NameTable: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    OwnerDocument: LibrarySymbolReference;
    ParentNode: LibrarySymbolReference;
    PreserveWhitespace: LibrarySymbolReference;
    SchemaInfo: LibrarySymbolReference;
    Schemas: LibrarySymbolReference;
    XmlResolver: LibrarySymbolReference
  };
  XmlDocumentFragment: LibrarySymbolReference & {
    XmlDocumentFragment: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    InnerXml: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    OwnerDocument: LibrarySymbolReference;
    ParentNode: LibrarySymbolReference
  };
  XmlDocumentType: LibrarySymbolReference & {
    XmlDocumentType: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    Entities: LibrarySymbolReference;
    InternalSubset: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Notations: LibrarySymbolReference;
    PublicId: LibrarySymbolReference;
    SystemId: LibrarySymbolReference
  };
  XmlElement: LibrarySymbolReference & {
    XmlElement: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    GetAttribute: LibrarySymbolReference;
    GetAttributeNode: LibrarySymbolReference;
    GetElementsByTagName: LibrarySymbolReference;
    HasAttribute: LibrarySymbolReference;
    RemoveAll: LibrarySymbolReference;
    RemoveAllAttributes: LibrarySymbolReference;
    RemoveAttribute: LibrarySymbolReference;
    RemoveAttributeAt: LibrarySymbolReference;
    RemoveAttributeNode: LibrarySymbolReference;
    SetAttribute: LibrarySymbolReference;
    SetAttributeNode: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    HasAttributes: LibrarySymbolReference;
    InnerText: LibrarySymbolReference;
    InnerXml: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NamespaceURI: LibrarySymbolReference;
    NextSibling: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    OwnerDocument: LibrarySymbolReference;
    ParentNode: LibrarySymbolReference;
    Prefix: LibrarySymbolReference;
    SchemaInfo: LibrarySymbolReference
  };
  XmlEntity: LibrarySymbolReference & {
    CloneNode: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    BaseURI: LibrarySymbolReference;
    InnerText: LibrarySymbolReference;
    InnerXml: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    NotationName: LibrarySymbolReference;
    OuterXml: LibrarySymbolReference;
    PublicId: LibrarySymbolReference;
    SystemId: LibrarySymbolReference
  };
  XmlEntityReference: LibrarySymbolReference & {
    XmlEntityReference: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    BaseURI: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  XmlException: LibrarySymbolReference & {
    XmlException: LibrarySymbolReference;
    LineNumber: LibrarySymbolReference;
    LinePosition: LibrarySymbolReference;
    Message: LibrarySymbolReference;
    SourceUri: LibrarySymbolReference
  };
  XmlImplementation: LibrarySymbolReference & {
    XmlImplementation: LibrarySymbolReference;
    CreateDocument: LibrarySymbolReference;
    HasFeature: LibrarySymbolReference
  };
  XmlLinkedNode: LibrarySymbolReference & {
    NextSibling: LibrarySymbolReference;
    PreviousSibling: LibrarySymbolReference
  };
  XmlNameTable: LibrarySymbolReference & {
    XmlNameTable: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Get: LibrarySymbolReference
  };
  XmlNamedNodeMap: LibrarySymbolReference & {
    GetEnumerator: LibrarySymbolReference;
    GetNamedItem: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    RemoveNamedItem: LibrarySymbolReference;
    SetNamedItem: LibrarySymbolReference;
    Count: LibrarySymbolReference
  };
  XmlNamespaceManager: LibrarySymbolReference & {
    XmlNamespaceManager: LibrarySymbolReference;
    AddNamespace: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetNamespacesInScope: LibrarySymbolReference;
    HasNamespace: LibrarySymbolReference;
    LookupNamespace: LibrarySymbolReference;
    LookupPrefix: LibrarySymbolReference;
    PopScope: LibrarySymbolReference;
    PushScope: LibrarySymbolReference;
    RemoveNamespace: LibrarySymbolReference;
    DefaultNamespace: LibrarySymbolReference;
    NameTable: LibrarySymbolReference
  };
  XmlNamespaceScope: LibrarySymbolReference & {
    All: LibrarySymbolReference;
    ExcludeXml: LibrarySymbolReference;
    Local: LibrarySymbolReference
  };
  XmlNode: LibrarySymbolReference & {
    AppendChild: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    CreateNavigator: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetNamespaceOfPrefix: LibrarySymbolReference;
    GetPrefixOfNamespace: LibrarySymbolReference;
    InsertAfter: LibrarySymbolReference;
    InsertBefore: LibrarySymbolReference;
    Normalize: LibrarySymbolReference;
    PrependChild: LibrarySymbolReference;
    RemoveAll: LibrarySymbolReference;
    RemoveChild: LibrarySymbolReference;
    ReplaceChild: LibrarySymbolReference;
    SelectNodes: LibrarySymbolReference;
    SelectSingleNode: LibrarySymbolReference;
    Supports: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    BaseURI: LibrarySymbolReference;
    ChildNodes: LibrarySymbolReference;
    FirstChild: LibrarySymbolReference;
    HasChildNodes: LibrarySymbolReference;
    InnerText: LibrarySymbolReference;
    InnerXml: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    LastChild: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NamespaceURI: LibrarySymbolReference;
    NextSibling: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    OuterXml: LibrarySymbolReference;
    OwnerDocument: LibrarySymbolReference;
    ParentNode: LibrarySymbolReference;
    Prefix: LibrarySymbolReference;
    PreviousSibling: LibrarySymbolReference;
    PreviousText: LibrarySymbolReference;
    SchemaInfo: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  XmlNodeChangedAction: LibrarySymbolReference & {
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Change: LibrarySymbolReference
  };
  XmlNodeChangedEventArgs: LibrarySymbolReference & {
    XmlNodeChangedEventArgs: LibrarySymbolReference;
    Action: LibrarySymbolReference;
    NewParent: LibrarySymbolReference;
    NewValue: LibrarySymbolReference;
    Node: LibrarySymbolReference;
    OldParent: LibrarySymbolReference;
    OldValue: LibrarySymbolReference
  };
  XmlNodeChangedEventHandler: LibrarySymbolReference & {
    XmlNodeChangedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  XmlNodeList: LibrarySymbolReference & {
    XmlNodeList: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    PrivateDisposeNodeList: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    ItemOf: LibrarySymbolReference
  };
  XmlNodeOrder: LibrarySymbolReference & {
    Before: LibrarySymbolReference;
    After: LibrarySymbolReference;
    Same: LibrarySymbolReference;
    Unknown: LibrarySymbolReference
  };
  XmlNodeReader: LibrarySymbolReference & {
    XmlNodeReader: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    GetAttribute: LibrarySymbolReference;
    LookupNamespace: LibrarySymbolReference;
    MoveToAttribute: LibrarySymbolReference;
    MoveToElement: LibrarySymbolReference;
    MoveToFirstAttribute: LibrarySymbolReference;
    MoveToNextAttribute: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAttributeValue: LibrarySymbolReference;
    ReadContentAsBase64: LibrarySymbolReference;
    ReadContentAsBinHex: LibrarySymbolReference;
    ReadElementContentAsBase64: LibrarySymbolReference;
    ReadElementContentAsBinHex: LibrarySymbolReference;
    ReadString: LibrarySymbolReference;
    ResolveEntity: LibrarySymbolReference;
    Skip: LibrarySymbolReference;
    AttributeCount: LibrarySymbolReference;
    BaseURI: LibrarySymbolReference;
    CanReadBinaryContent: LibrarySymbolReference;
    CanResolveEntity: LibrarySymbolReference;
    Depth: LibrarySymbolReference;
    EOF: LibrarySymbolReference;
    HasAttributes: LibrarySymbolReference;
    HasValue: LibrarySymbolReference;
    IsDefault: LibrarySymbolReference;
    IsEmptyElement: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NamespaceURI: LibrarySymbolReference;
    NameTable: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Prefix: LibrarySymbolReference;
    ReadState: LibrarySymbolReference;
    SchemaInfo: LibrarySymbolReference;
    Value: LibrarySymbolReference;
    XmlLang: LibrarySymbolReference;
    XmlSpace: LibrarySymbolReference
  };
  XmlNodeType: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Element: LibrarySymbolReference;
    Attribute: LibrarySymbolReference;
    Text: LibrarySymbolReference;
    CDATA: LibrarySymbolReference;
    EntityReference: LibrarySymbolReference;
    Entity: LibrarySymbolReference;
    ProcessingInstruction: LibrarySymbolReference;
    Comment: LibrarySymbolReference;
    Document: LibrarySymbolReference;
    DocumentType: LibrarySymbolReference;
    DocumentFragment: LibrarySymbolReference;
    Notation: LibrarySymbolReference;
    Whitespace: LibrarySymbolReference;
    SignificantWhitespace: LibrarySymbolReference;
    EndElement: LibrarySymbolReference;
    EndEntity: LibrarySymbolReference;
    XmlDeclaration: LibrarySymbolReference
  };
  XmlNotation: LibrarySymbolReference & {
    CloneNode: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    InnerXml: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    OuterXml: LibrarySymbolReference;
    PublicId: LibrarySymbolReference;
    SystemId: LibrarySymbolReference
  };
  XmlOutputMethod: LibrarySymbolReference & {
    Xml: LibrarySymbolReference;
    Html: LibrarySymbolReference;
    Text: LibrarySymbolReference;
    AutoDetect: LibrarySymbolReference
  };
  XmlParserContext: LibrarySymbolReference & {
    XmlParserContext: LibrarySymbolReference;
    BaseURI: LibrarySymbolReference;
    DocTypeName: LibrarySymbolReference;
    Encoding: LibrarySymbolReference;
    InternalSubset: LibrarySymbolReference;
    NamespaceManager: LibrarySymbolReference;
    NameTable: LibrarySymbolReference;
    PublicId: LibrarySymbolReference;
    SystemId: LibrarySymbolReference;
    XmlLang: LibrarySymbolReference;
    XmlSpace: LibrarySymbolReference
  };
  XmlProcessingInstruction: LibrarySymbolReference & {
    XmlProcessingInstruction: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    Data: LibrarySymbolReference;
    InnerText: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Target: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  XmlQualifiedName: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    XmlQualifiedName: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Namespace: LibrarySymbolReference
  };
  XmlReader: LibrarySymbolReference & {
    XmlReader: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetAttribute: LibrarySymbolReference;
    GetValueAsync: LibrarySymbolReference;
    IsName: LibrarySymbolReference;
    IsNameToken: LibrarySymbolReference;
    IsStartElement: LibrarySymbolReference;
    LookupNamespace: LibrarySymbolReference;
    MoveToAttribute: LibrarySymbolReference;
    MoveToContent: LibrarySymbolReference;
    MoveToContentAsync: LibrarySymbolReference;
    MoveToElement: LibrarySymbolReference;
    MoveToFirstAttribute: LibrarySymbolReference;
    MoveToNextAttribute: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadAttributeValue: LibrarySymbolReference;
    ReadContentAs: LibrarySymbolReference;
    ReadContentAsAsync: LibrarySymbolReference;
    ReadContentAsBase64: LibrarySymbolReference;
    ReadContentAsBase64Async: LibrarySymbolReference;
    ReadContentAsBinHex: LibrarySymbolReference;
    ReadContentAsBinHexAsync: LibrarySymbolReference;
    ReadContentAsBoolean: LibrarySymbolReference;
    ReadContentAsDateTime: LibrarySymbolReference;
    ReadContentAsDateTimeOffset: LibrarySymbolReference;
    ReadContentAsDecimal: LibrarySymbolReference;
    ReadContentAsDouble: LibrarySymbolReference;
    ReadContentAsFloat: LibrarySymbolReference;
    ReadContentAsInt: LibrarySymbolReference;
    ReadContentAsLong: LibrarySymbolReference;
    ReadContentAsObject: LibrarySymbolReference;
    ReadContentAsObjectAsync: LibrarySymbolReference;
    ReadContentAsString: LibrarySymbolReference;
    ReadContentAsStringAsync: LibrarySymbolReference;
    ReadElementContentAs: LibrarySymbolReference;
    ReadElementContentAsAsync: LibrarySymbolReference;
    ReadElementContentAsBase64: LibrarySymbolReference;
    ReadElementContentAsBase64Async: LibrarySymbolReference;
    ReadElementContentAsBinHex: LibrarySymbolReference;
    ReadElementContentAsBinHexAsync: LibrarySymbolReference;
    ReadElementContentAsBoolean: LibrarySymbolReference;
    ReadElementContentAsDateTime: LibrarySymbolReference;
    ReadElementContentAsDecimal: LibrarySymbolReference;
    ReadElementContentAsDouble: LibrarySymbolReference;
    ReadElementContentAsFloat: LibrarySymbolReference;
    ReadElementContentAsInt: LibrarySymbolReference;
    ReadElementContentAsLong: LibrarySymbolReference;
    ReadElementContentAsObject: LibrarySymbolReference;
    ReadElementContentAsObjectAsync: LibrarySymbolReference;
    ReadElementContentAsString: LibrarySymbolReference;
    ReadElementContentAsStringAsync: LibrarySymbolReference;
    ReadEndElement: LibrarySymbolReference;
    ReadInnerXml: LibrarySymbolReference;
    ReadInnerXmlAsync: LibrarySymbolReference;
    ReadOuterXml: LibrarySymbolReference;
    ReadOuterXmlAsync: LibrarySymbolReference;
    ReadStartElement: LibrarySymbolReference;
    ReadSubtree: LibrarySymbolReference;
    ReadToDescendant: LibrarySymbolReference;
    ReadToFollowing: LibrarySymbolReference;
    ReadToNextSibling: LibrarySymbolReference;
    ReadValueChunk: LibrarySymbolReference;
    ReadValueChunkAsync: LibrarySymbolReference;
    ResolveEntity: LibrarySymbolReference;
    Skip: LibrarySymbolReference;
    SkipAsync: LibrarySymbolReference;
    AttributeCount: LibrarySymbolReference;
    BaseURI: LibrarySymbolReference;
    CanReadBinaryContent: LibrarySymbolReference;
    CanReadValueChunk: LibrarySymbolReference;
    CanResolveEntity: LibrarySymbolReference;
    Depth: LibrarySymbolReference;
    EOF: LibrarySymbolReference;
    HasAttributes: LibrarySymbolReference;
    HasValue: LibrarySymbolReference;
    IsDefault: LibrarySymbolReference;
    IsEmptyElement: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NamespaceURI: LibrarySymbolReference;
    NameTable: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Prefix: LibrarySymbolReference;
    QuoteChar: LibrarySymbolReference;
    ReadState: LibrarySymbolReference;
    SchemaInfo: LibrarySymbolReference;
    Settings: LibrarySymbolReference;
    Value: LibrarySymbolReference;
    ValueType: LibrarySymbolReference;
    XmlLang: LibrarySymbolReference;
    XmlSpace: LibrarySymbolReference
  };
  XmlReaderSettings: LibrarySymbolReference & {
    XmlReaderSettings: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Async: LibrarySymbolReference;
    CheckCharacters: LibrarySymbolReference;
    CloseInput: LibrarySymbolReference;
    ConformanceLevel: LibrarySymbolReference;
    DtdProcessing: LibrarySymbolReference;
    IgnoreComments: LibrarySymbolReference;
    IgnoreProcessingInstructions: LibrarySymbolReference;
    IgnoreWhitespace: LibrarySymbolReference;
    LineNumberOffset: LibrarySymbolReference;
    LinePositionOffset: LibrarySymbolReference;
    MaxCharactersFromEntities: LibrarySymbolReference;
    MaxCharactersInDocument: LibrarySymbolReference;
    NameTable: LibrarySymbolReference;
    ProhibitDtd: LibrarySymbolReference;
    Schemas: LibrarySymbolReference;
    ValidationFlags: LibrarySymbolReference;
    ValidationType: LibrarySymbolReference;
    XmlResolver: LibrarySymbolReference
  };
  XmlResolver: LibrarySymbolReference & {
    XmlResolver: LibrarySymbolReference;
    GetEntity: LibrarySymbolReference;
    GetEntityAsync: LibrarySymbolReference;
    ResolveUri: LibrarySymbolReference;
    SupportsType: LibrarySymbolReference;
    Credentials: LibrarySymbolReference;
    ThrowingResolver: LibrarySymbolReference;
    FileSystemResolver: LibrarySymbolReference
  };
  XmlSecureResolver: LibrarySymbolReference & {
    XmlSecureResolver: LibrarySymbolReference;
    GetEntity: LibrarySymbolReference;
    GetEntityAsync: LibrarySymbolReference;
    ResolveUri: LibrarySymbolReference;
    Credentials: LibrarySymbolReference
  };
  XmlSignificantWhitespace: LibrarySymbolReference & {
    XmlSignificantWhitespace: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    ParentNode: LibrarySymbolReference;
    PreviousText: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  XmlSpace: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    Preserve: LibrarySymbolReference
  };
  XmlText: LibrarySymbolReference & {
    XmlText: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    SplitText: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    ParentNode: LibrarySymbolReference;
    PreviousText: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  XmlTokenizedType: LibrarySymbolReference & {
    CDATA: LibrarySymbolReference;
    ID: LibrarySymbolReference;
    IDREF: LibrarySymbolReference;
    IDREFS: LibrarySymbolReference;
    ENTITY: LibrarySymbolReference;
    ENTITIES: LibrarySymbolReference;
    NMTOKEN: LibrarySymbolReference;
    NMTOKENS: LibrarySymbolReference;
    NOTATION: LibrarySymbolReference;
    ENUMERATION: LibrarySymbolReference;
    QName: LibrarySymbolReference;
    NCName: LibrarySymbolReference;
    None: LibrarySymbolReference
  };
  XmlUrlResolver: LibrarySymbolReference & {
    XmlUrlResolver: LibrarySymbolReference;
    GetEntity: LibrarySymbolReference;
    GetEntityAsync: LibrarySymbolReference;
    ResolveUri: LibrarySymbolReference;
    CachePolicy: LibrarySymbolReference;
    Credentials: LibrarySymbolReference;
    Proxy: LibrarySymbolReference
  };
  XmlValidatingReader: LibrarySymbolReference & {
    XmlValidatingReader: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    GetAttribute: LibrarySymbolReference;
    HasLineInfo: LibrarySymbolReference;
    LookupNamespace: LibrarySymbolReference;
    MoveToAttribute: LibrarySymbolReference;
    MoveToElement: LibrarySymbolReference;
    MoveToFirstAttribute: LibrarySymbolReference;
    MoveToNextAttribute: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAttributeValue: LibrarySymbolReference;
    ReadContentAsBase64: LibrarySymbolReference;
    ReadContentAsBinHex: LibrarySymbolReference;
    ReadElementContentAsBase64: LibrarySymbolReference;
    ReadElementContentAsBinHex: LibrarySymbolReference;
    ReadString: LibrarySymbolReference;
    ReadTypedValue: LibrarySymbolReference;
    ResolveEntity: LibrarySymbolReference;
    AttributeCount: LibrarySymbolReference;
    BaseURI: LibrarySymbolReference;
    CanReadBinaryContent: LibrarySymbolReference;
    CanResolveEntity: LibrarySymbolReference;
    Depth: LibrarySymbolReference;
    Encoding: LibrarySymbolReference;
    EntityHandling: LibrarySymbolReference;
    EOF: LibrarySymbolReference;
    HasValue: LibrarySymbolReference;
    IsDefault: LibrarySymbolReference;
    IsEmptyElement: LibrarySymbolReference;
    LineNumber: LibrarySymbolReference;
    LinePosition: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Namespaces: LibrarySymbolReference;
    NamespaceURI: LibrarySymbolReference;
    NameTable: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Prefix: LibrarySymbolReference;
    QuoteChar: LibrarySymbolReference;
    Reader: LibrarySymbolReference;
    ReadState: LibrarySymbolReference;
    Schemas: LibrarySymbolReference;
    SchemaType: LibrarySymbolReference;
    ValidationType: LibrarySymbolReference;
    Value: LibrarySymbolReference;
    XmlLang: LibrarySymbolReference;
    XmlResolver: LibrarySymbolReference;
    XmlSpace: LibrarySymbolReference
  };
  XmlWhitespace: LibrarySymbolReference & {
    XmlWhitespace: LibrarySymbolReference;
    CloneNode: LibrarySymbolReference;
    WriteContentTo: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    ParentNode: LibrarySymbolReference;
    PreviousText: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  XmlWriter: LibrarySymbolReference & {
    XmlWriter: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    LookupPrefix: LibrarySymbolReference;
    WriteAttributes: LibrarySymbolReference;
    WriteAttributesAsync: LibrarySymbolReference;
    WriteAttributeString: LibrarySymbolReference;
    WriteAttributeStringAsync: LibrarySymbolReference;
    WriteBase64: LibrarySymbolReference;
    WriteBase64Async: LibrarySymbolReference;
    WriteBinHex: LibrarySymbolReference;
    WriteBinHexAsync: LibrarySymbolReference;
    WriteCData: LibrarySymbolReference;
    WriteCDataAsync: LibrarySymbolReference;
    WriteCharEntity: LibrarySymbolReference;
    WriteCharEntityAsync: LibrarySymbolReference;
    WriteChars: LibrarySymbolReference;
    WriteCharsAsync: LibrarySymbolReference;
    WriteComment: LibrarySymbolReference;
    WriteCommentAsync: LibrarySymbolReference;
    WriteDocType: LibrarySymbolReference;
    WriteDocTypeAsync: LibrarySymbolReference;
    WriteElementString: LibrarySymbolReference;
    WriteElementStringAsync: LibrarySymbolReference;
    WriteEndAttribute: LibrarySymbolReference;
    WriteEndAttributeAsync: LibrarySymbolReference;
    WriteEndDocument: LibrarySymbolReference;
    WriteEndDocumentAsync: LibrarySymbolReference;
    WriteEndElement: LibrarySymbolReference;
    WriteEndElementAsync: LibrarySymbolReference;
    WriteEntityRef: LibrarySymbolReference;
    WriteEntityRefAsync: LibrarySymbolReference;
    WriteFullEndElement: LibrarySymbolReference;
    WriteFullEndElementAsync: LibrarySymbolReference;
    WriteName: LibrarySymbolReference;
    WriteNameAsync: LibrarySymbolReference;
    WriteNmToken: LibrarySymbolReference;
    WriteNmTokenAsync: LibrarySymbolReference;
    WriteNode: LibrarySymbolReference;
    WriteNodeAsync: LibrarySymbolReference;
    WriteProcessingInstruction: LibrarySymbolReference;
    WriteProcessingInstructionAsync: LibrarySymbolReference;
    WriteQualifiedName: LibrarySymbolReference;
    WriteQualifiedNameAsync: LibrarySymbolReference;
    WriteRaw: LibrarySymbolReference;
    WriteRawAsync: LibrarySymbolReference;
    WriteStartAttribute: LibrarySymbolReference;
    WriteStartAttributeAsync: LibrarySymbolReference;
    WriteStartDocument: LibrarySymbolReference;
    WriteStartDocumentAsync: LibrarySymbolReference;
    WriteStartElement: LibrarySymbolReference;
    WriteStartElementAsync: LibrarySymbolReference;
    WriteString: LibrarySymbolReference;
    WriteStringAsync: LibrarySymbolReference;
    WriteSurrogateCharEntity: LibrarySymbolReference;
    WriteSurrogateCharEntityAsync: LibrarySymbolReference;
    WriteValue: LibrarySymbolReference;
    WriteWhitespace: LibrarySymbolReference;
    WriteWhitespaceAsync: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    DisposeAsyncCore: LibrarySymbolReference;
    Settings: LibrarySymbolReference;
    WriteState: LibrarySymbolReference;
    XmlLang: LibrarySymbolReference;
    XmlSpace: LibrarySymbolReference
  };
  XmlWriterSettings: LibrarySymbolReference & {
    XmlWriterSettings: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Async: LibrarySymbolReference;
    CheckCharacters: LibrarySymbolReference;
    CloseOutput: LibrarySymbolReference;
    ConformanceLevel: LibrarySymbolReference;
    DoNotEscapeUriAttributes: LibrarySymbolReference;
    Encoding: LibrarySymbolReference;
    Indent: LibrarySymbolReference;
    IndentChars: LibrarySymbolReference;
    NamespaceHandling: LibrarySymbolReference;
    NewLineChars: LibrarySymbolReference;
    NewLineHandling: LibrarySymbolReference;
    NewLineOnAttributes: LibrarySymbolReference;
    OmitXmlDeclaration: LibrarySymbolReference;
    OutputMethod: LibrarySymbolReference;
    WriteEndDocumentOnClose: LibrarySymbolReference
  }
};
const Xml: XmlLibrary = createLibrary("System.Xml", {
  ConformanceLevel: {
    kind: "enum",
    members: {
      Auto: {
        kind: "field",
        type: () => {
          return Xml.ConformanceLevel;
        },
      },
      Fragment: {
        kind: "field",
        type: () => {
          return Xml.ConformanceLevel;
        },
      },
      Document: {
        kind: "field",
        type: () => {
          return Xml.ConformanceLevel;
        },
      },
    },
  },
  DtdProcessing: {
    kind: "enum",
    members: {
      Prohibit: {
        kind: "field",
        type: () => {
          return Xml.DtdProcessing;
        },
      },
      Ignore: {
        kind: "field",
        type: () => {
          return Xml.DtdProcessing;
        },
      },
      Parse: {
        kind: "field",
        type: () => {
          return Xml.DtdProcessing;
        },
      },
    },
  },
  EntityHandling: {
    kind: "enum",
    members: {
      ExpandEntities: {
        kind: "field",
        type: () => {
          return Xml.EntityHandling;
        },
      },
      ExpandCharEntities: {
        kind: "field",
        type: () => {
          return Xml.EntityHandling;
        },
      },
    },
  },
  Formatting: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Xml.Formatting;
        },
      },
      Indented: {
        kind: "field",
        type: () => {
          return Xml.Formatting;
        },
      },
    },
  },
  IFragmentCapableXmlDictionaryWriter: {
    kind: "interface",
    members: {
      EndFragment: {
        kind: "method",
        methodKind: "ordinary",
      },
      StartFragment: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteFragment: {
        kind: "method",
        methodKind: "ordinary",
      },
      CanFragment: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  IHasXmlNode: {
    kind: "interface",
    members: {
      GetNode: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IStreamProvider: {
    kind: "interface",
    members: {
      GetStream: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReleaseStream: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IXmlBinaryReaderInitializer: {
    kind: "interface",
    members: {
      SetInput: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IXmlBinaryWriterInitializer: {
    kind: "interface",
    members: {
      SetOutput: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IXmlDictionary: {
    kind: "interface",
    members: {
      TryLookup: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IXmlLineInfo: {
    kind: "interface",
    members: {
      HasLineInfo: {
        kind: "method",
        methodKind: "ordinary",
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
    },
  },
  IXmlNamespaceResolver: {
    kind: "interface",
    members: {
      GetNamespacesInScope: {
        kind: "method",
        methodKind: "ordinary",
      },
      LookupNamespace: {
        kind: "method",
        methodKind: "ordinary",
      },
      LookupPrefix: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IXmlTextReaderInitializer: {
    kind: "interface",
    members: {
      SetInput: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IXmlTextWriterInitializer: {
    kind: "interface",
    members: {
      SetOutput: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  NameTable: {
    kind: "class",
    members: {
      NameTable: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Get: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  NamespaceHandling: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Xml.NamespaceHandling;
        },
      },
      OmitDuplicates: {
        kind: "field",
        type: () => {
          return Xml.NamespaceHandling;
        },
      },
    },
  },
  NewLineHandling: {
    kind: "enum",
    members: {
      Replace: {
        kind: "field",
        type: () => {
          return Xml.NewLineHandling;
        },
      },
      Entitize: {
        kind: "field",
        type: () => {
          return Xml.NewLineHandling;
        },
      },
      None: {
        kind: "field",
        type: () => {
          return Xml.NewLineHandling;
        },
      },
    },
  },
  OnXmlDictionaryReaderClose: {
    kind: "generic",
    members: {
      OnXmlDictionaryReaderClose: {
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
  ReadState: {
    kind: "enum",
    members: {
      Initial: {
        kind: "field",
        type: () => {
          return Xml.ReadState;
        },
      },
      Interactive: {
        kind: "field",
        type: () => {
          return Xml.ReadState;
        },
      },
      Error: {
        kind: "field",
        type: () => {
          return Xml.ReadState;
        },
      },
      EndOfFile: {
        kind: "field",
        type: () => {
          return Xml.ReadState;
        },
      },
      Closed: {
        kind: "field",
        type: () => {
          return Xml.ReadState;
        },
      },
    },
  },
  UniqueId: {
    kind: "class",
    members: {
      UniqueId: {
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
      ToCharArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryGetGuid: {
        kind: "method",
        methodKind: "ordinary",
      },
      CharArrayLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsGuid: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ValidationType: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Xml.ValidationType;
        },
      },
      Auto: {
        kind: "field",
        type: () => {
          return Xml.ValidationType;
        },
      },
      DTD: {
        kind: "field",
        type: () => {
          return Xml.ValidationType;
        },
      },
      XDR: {
        kind: "field",
        type: () => {
          return Xml.ValidationType;
        },
      },
      Schema: {
        kind: "field",
        type: () => {
          return Xml.ValidationType;
        },
      },
    },
  },
  WhitespaceHandling: {
    kind: "enum",
    members: {
      All: {
        kind: "field",
        type: () => {
          return Xml.WhitespaceHandling;
        },
      },
      Significant: {
        kind: "field",
        type: () => {
          return Xml.WhitespaceHandling;
        },
      },
      None: {
        kind: "field",
        type: () => {
          return Xml.WhitespaceHandling;
        },
      },
    },
  },
  WriteState: {
    kind: "enum",
    members: {
      Start: {
        kind: "field",
        type: () => {
          return Xml.WriteState;
        },
      },
      Prolog: {
        kind: "field",
        type: () => {
          return Xml.WriteState;
        },
      },
      Element: {
        kind: "field",
        type: () => {
          return Xml.WriteState;
        },
      },
      Attribute: {
        kind: "field",
        type: () => {
          return Xml.WriteState;
        },
      },
      Content: {
        kind: "field",
        type: () => {
          return Xml.WriteState;
        },
      },
      Closed: {
        kind: "field",
        type: () => {
          return Xml.WriteState;
        },
      },
      Error: {
        kind: "field",
        type: () => {
          return Xml.WriteState;
        },
      },
    },
  },
  XmlAttribute: {
    kind: "class",
    members: {
      XmlAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AppendChild: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InsertAfter: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InsertBefore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      PrependChild: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      RemoveChild: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReplaceChild: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BaseURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      InnerText: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      InnerXml: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NamespaceURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      OwnerDocument: {
        kind: "property",
        type: () => {
          return Xml.XmlDocument;
        },
        isOverride: true,
      },
      OwnerElement: {
        kind: "property",
        type: () => {
          return Xml.XmlElement;
        },
        isNullable: true,
        isVirtual: true,
      },
      ParentNode: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
      Prefix: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      SchemaInfo: {
        kind: "property",
        type: () => {
          return Schema.IXmlSchemaInfo;
        },
        isOverride: true,
      },
      Specified: {
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
        isOverride: true,
      },
    },
  },
  XmlAttributeCollection: {
    kind: "class",
    members: {
      Append: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      InsertAfter: {
        kind: "method",
        methodKind: "ordinary",
      },
      InsertBefore: {
        kind: "method",
        methodKind: "ordinary",
      },
      Prepend: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetNamedItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ItemOf: {
        kind: "property",
        type: () => {
          return Xml.XmlAttribute;
        },
      },
    },
    isSealed: true,
  },
  XmlBinaryReaderSession: {
    kind: "class",
    members: {
      XmlBinaryReaderSession: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryLookup: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  XmlBinaryWriterSession: {
    kind: "class",
    members: {
      XmlBinaryWriterSession: {
        kind: "method",
        methodKind: "constructor",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryAdd: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  XmlCDataSection: {
    kind: "class",
    members: {
      XmlCDataSection: {
        kind: "method",
        methodKind: "constructor",
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      ParentNode: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
      PreviousText: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
    },
  },
  XmlCharacterData: {
    kind: "class",
    members: {
      XmlCharacterData: {
        kind: "method",
        methodKind: "constructor",
      },
      AppendData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DeleteData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      InsertData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReplaceData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Substring: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Data: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      InnerText: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  XmlComment: {
    kind: "class",
    members: {
      XmlComment: {
        kind: "method",
        methodKind: "constructor",
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
    },
  },
  XmlConvert: {
    kind: "class",
    members: {
      XmlConvert: {
        kind: "method",
        methodKind: "constructor",
      },
      DecodeName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EncodeLocalName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EncodeName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EncodeNmToken: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNCNameChar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPublicIdChar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsStartNCNameChar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsWhitespaceChar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsXmlChar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsXmlSurrogatePair: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToBoolean: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToByte: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToChar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToDateTimeOffset: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToDecimal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToDouble: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToGuid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToInt16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToInt32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToInt64: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSByte: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSingle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToTimeSpan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUInt16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUInt32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUInt64: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      VerifyName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      VerifyNCName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      VerifyNMTOKEN: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      VerifyPublicId: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      VerifyTOKEN: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      VerifyWhitespace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      VerifyXmlChars: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  XmlDataDocument: {
    kind: "class",
    members: {
      XmlDataDocument: {
        kind: "method",
        methodKind: "constructor",
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateElement: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateEntityReference: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateNavigator: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetElementById: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetElementFromRow: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetElementsByTagName: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetRowFromElement: {
        kind: "method",
        methodKind: "ordinary",
      },
      Load: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DataSet: {
        kind: "property",
        type: () => {
          return Data.DataSet;
        },
      },
    },
  },
  XmlDateTimeSerializationMode: {
    kind: "enum",
    members: {
      Local: {
        kind: "field",
        type: () => {
          return Xml.XmlDateTimeSerializationMode;
        },
      },
      Utc: {
        kind: "field",
        type: () => {
          return Xml.XmlDateTimeSerializationMode;
        },
      },
      Unspecified: {
        kind: "field",
        type: () => {
          return Xml.XmlDateTimeSerializationMode;
        },
      },
      RoundtripKind: {
        kind: "field",
        type: () => {
          return Xml.XmlDateTimeSerializationMode;
        },
      },
    },
  },
  XmlDeclaration: {
    kind: "class",
    members: {
      XmlDeclaration: {
        kind: "method",
        methodKind: "constructor",
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Encoding: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      InnerText: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      Standalone: {
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
        isOverride: true,
      },
      Version: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  XmlDictionary: {
    kind: "class",
    members: {
      XmlDictionary: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryLookup: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Empty: {
        kind: "property",
        type: () => {
          return Xml.IXmlDictionary;
        },
        isStatic: true,
      },
    },
  },
  XmlDictionaryReader: {
    kind: "class",
    members: {
      XmlDictionaryReader: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateBinaryReader: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateDictionaryReader: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateMtomReader: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateTextReader: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EndCanonicalization: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetNonAtomizedNames: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IndexOfLocalName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsLocalName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsNamespaceUri: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsStartArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsStartElement: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsTextNode: {
        kind: "method",
        methodKind: "ordinary",
      },
      MoveToStartElement: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadBooleanArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAs: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadContentAsBase64: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsBinHex: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsChars: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsDecimal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadContentAsFloat: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadContentAsGuid: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsQualifiedName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadContentAsTimeSpan: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsUniqueId: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadDateTimeArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadDecimalArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadDoubleArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsBase64: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsBinHex: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsBoolean: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadElementContentAsDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadElementContentAsDecimal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadElementContentAsDouble: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadElementContentAsFloat: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadElementContentAsGuid: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsInt: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadElementContentAsLong: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadElementContentAsString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadElementContentAsTimeSpan: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsUniqueId: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadFullStartElement: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadGuidArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadInt16Array: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadInt32Array: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadInt64Array: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadSingleArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadStartElement: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadTimeSpanArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadValueAsBase64: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      StartCanonicalization: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryGetArrayLength: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryGetBase64ContentLength: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryGetLocalNameAsDictionaryString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryGetNamespaceUriAsDictionaryString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryGetValueAsDictionaryString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CanCanonicalize: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Quotas: {
        kind: "property",
        type: () => {
          return Xml.XmlDictionaryReaderQuotas;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  XmlDictionaryReaderQuotaTypes: {
    kind: "enum",
    members: {
      MaxDepth: {
        kind: "field",
        type: () => {
          return Xml.XmlDictionaryReaderQuotaTypes;
        },
      },
      MaxStringContentLength: {
        kind: "field",
        type: () => {
          return Xml.XmlDictionaryReaderQuotaTypes;
        },
      },
      MaxArrayLength: {
        kind: "field",
        type: () => {
          return Xml.XmlDictionaryReaderQuotaTypes;
        },
      },
      MaxBytesPerRead: {
        kind: "field",
        type: () => {
          return Xml.XmlDictionaryReaderQuotaTypes;
        },
      },
      MaxNameTableCharCount: {
        kind: "field",
        type: () => {
          return Xml.XmlDictionaryReaderQuotaTypes;
        },
      },
    },
  },
  XmlDictionaryReaderQuotas: {
    kind: "class",
    members: {
      XmlDictionaryReaderQuotas: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Max: {
        kind: "property",
        type: () => {
          return Xml.XmlDictionaryReaderQuotas;
        },
        isStatic: true,
      },
      MaxArrayLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxBytesPerRead: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxDepth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxNameTableCharCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxStringContentLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ModifiedQuotas: {
        kind: "property",
        type: () => {
          return Xml.XmlDictionaryReaderQuotaTypes;
        },
      },
    },
    isSealed: true,
  },
  XmlDictionaryString: {
    kind: "class",
    members: {
      XmlDictionaryString: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dictionary: {
        kind: "property",
        type: () => {
          return Xml.IXmlDictionary;
        },
      },
      Empty: {
        kind: "property",
        type: () => {
          return Xml.XmlDictionaryString;
        },
        isStatic: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  XmlDictionaryWriter: {
    kind: "class",
    members: {
      XmlDictionaryWriter: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateBinaryWriter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateDictionaryWriter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateMtomWriter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateTextWriter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EndCanonicalization: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      StartCanonicalization: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteAttributeString: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteBase64Async: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteElementString: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteNode: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteQualifiedName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteStartAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteStartElement: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteTextNode: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteValue: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteValueAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteXmlAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteXmlnsAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CanCanonicalize: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  XmlDocument: {
    kind: "class",
    members: {
      XmlDocument: {
        kind: "method",
        methodKind: "constructor",
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateCDataSection: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateComment: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateDocumentFragment: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateDocumentType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateElement: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateEntityReference: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateNavigator: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateNode: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateProcessingInstruction: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateSignificantWhitespace: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateTextNode: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateWhitespace: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateXmlDeclaration: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetElementById: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetElementsByTagName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ImportNode: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Load: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      LoadXml: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadNode: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Save: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Validate: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BaseURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      DocumentElement: {
        kind: "property",
        type: () => {
          return Xml.XmlElement;
        },
        isNullable: true,
      },
      DocumentType: {
        kind: "property",
        type: () => {
          return Xml.XmlDocumentType;
        },
        isVirtual: true,
      },
      Implementation: {
        kind: "property",
        type: () => {
          return Xml.XmlImplementation;
        },
      },
      InnerText: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      InnerXml: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NameTable: {
        kind: "property",
        type: () => {
          return Xml.XmlNameTable;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      OwnerDocument: {
        kind: "property",
        type: () => {
          return Xml.XmlDocument;
        },
        isNullable: true,
        isOverride: true,
      },
      ParentNode: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
      PreserveWhitespace: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SchemaInfo: {
        kind: "property",
        type: () => {
          return Schema.IXmlSchemaInfo;
        },
        isOverride: true,
      },
      Schemas: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaSet;
        },
      },
      XmlResolver: {
        kind: "property",
        type: () => {
          return Xml.XmlResolver;
        },
        isVirtual: true,
      },
    },
  },
  XmlDocumentFragment: {
    kind: "class",
    members: {
      XmlDocumentFragment: {
        kind: "method",
        methodKind: "constructor",
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InnerXml: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      OwnerDocument: {
        kind: "property",
        type: () => {
          return Xml.XmlDocument;
        },
        isOverride: true,
      },
      ParentNode: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
    },
  },
  XmlDocumentType: {
    kind: "class",
    members: {
      XmlDocumentType: {
        kind: "method",
        methodKind: "constructor",
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Entities: {
        kind: "property",
        type: () => {
          return Xml.XmlNamedNodeMap;
        },
      },
      InternalSubset: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      Notations: {
        kind: "property",
        type: () => {
          return Xml.XmlNamedNodeMap;
        },
      },
      PublicId: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SystemId: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlElement: {
    kind: "class",
    members: {
      XmlElement: {
        kind: "method",
        methodKind: "constructor",
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetAttributeNode: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetElementsByTagName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      HasAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveAll: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      RemoveAllAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveAttributeAt: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveAttributeNode: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetAttributeNode: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Xml.XmlAttributeCollection;
        },
        isOverride: true,
      },
      HasAttributes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      InnerText: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      InnerXml: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NamespaceURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      NextSibling: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      OwnerDocument: {
        kind: "property",
        type: () => {
          return Xml.XmlDocument;
        },
        isOverride: true,
      },
      ParentNode: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
      Prefix: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      SchemaInfo: {
        kind: "property",
        type: () => {
          return Schema.IXmlSchemaInfo;
        },
        isOverride: true,
      },
    },
  },
  XmlEntity: {
    kind: "class",
    members: {
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BaseURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      InnerText: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      InnerXml: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      NotationName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      OuterXml: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      PublicId: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SystemId: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlEntityReference: {
    kind: "class",
    members: {
      XmlEntityReference: {
        kind: "method",
        methodKind: "constructor",
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BaseURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
    },
  },
  XmlException: {
    kind: "class",
    members: {
      XmlException: {
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
      SourceUri: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlImplementation: {
    kind: "class",
    members: {
      XmlImplementation: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateDocument: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      HasFeature: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  XmlLinkedNode: {
    kind: "class",
    members: {
      NextSibling: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
      PreviousSibling: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  XmlNameTable: {
    kind: "class",
    members: {
      XmlNameTable: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Get: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  XmlNamedNodeMap: {
    kind: "class",
    members: {
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetNamedItem: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Item: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveNamedItem: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetNamedItem: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
    },
  },
  XmlNamespaceManager: {
    kind: "class",
    members: {
      XmlNamespaceManager: {
        kind: "method",
        methodKind: "constructor",
      },
      AddNamespace: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetNamespacesInScope: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      HasNamespace: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      LookupNamespace: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      LookupPrefix: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      PopScope: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      PushScope: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveNamespace: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DefaultNamespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      NameTable: {
        kind: "property",
        type: () => {
          return Xml.XmlNameTable;
        },
        isVirtual: true,
      },
    },
  },
  XmlNamespaceScope: {
    kind: "enum",
    members: {
      All: {
        kind: "field",
        type: () => {
          return Xml.XmlNamespaceScope;
        },
      },
      ExcludeXml: {
        kind: "field",
        type: () => {
          return Xml.XmlNamespaceScope;
        },
      },
      Local: {
        kind: "field",
        type: () => {
          return Xml.XmlNamespaceScope;
        },
      },
    },
  },
  XmlNode: {
    kind: "class",
    members: {
      AppendChild: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CreateNavigator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNamespaceOfPrefix: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetPrefixOfNamespace: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      InsertAfter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      InsertBefore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Normalize: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      PrependChild: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveAll: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveChild: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReplaceChild: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SelectNodes: {
        kind: "method",
        methodKind: "ordinary",
      },
      SelectSingleNode: {
        kind: "method",
        methodKind: "ordinary",
      },
      Supports: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Xml.XmlAttributeCollection;
        },
        isNullable: true,
        isVirtual: true,
      },
      BaseURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      ChildNodes: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeList;
        },
        isVirtual: true,
      },
      FirstChild: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isVirtual: true,
      },
      HasChildNodes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      InnerText: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      InnerXml: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return Xml.XmlElement;
        },
        isVirtual: true,
      },
      LastChild: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isVirtual: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      NamespaceURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      NextSibling: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isVirtual: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isAbstract: true,
      },
      OuterXml: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      OwnerDocument: {
        kind: "property",
        type: () => {
          return Xml.XmlDocument;
        },
        isNullable: true,
        isVirtual: true,
      },
      ParentNode: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isVirtual: true,
      },
      Prefix: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      PreviousSibling: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isVirtual: true,
      },
      PreviousText: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isVirtual: true,
      },
      SchemaInfo: {
        kind: "property",
        type: () => {
          return Schema.IXmlSchemaInfo;
        },
        isVirtual: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  XmlNodeChangedAction: {
    kind: "enum",
    members: {
      Insert: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeChangedAction;
        },
      },
      Remove: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeChangedAction;
        },
      },
      Change: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeChangedAction;
        },
      },
    },
  },
  XmlNodeChangedEventArgs: {
    kind: "class",
    members: {
      XmlNodeChangedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Action: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeChangedAction;
        },
      },
      NewParent: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
      },
      NewValue: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Node: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
      },
      OldParent: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
      },
      OldValue: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlNodeChangedEventHandler: {
    kind: "generic",
    members: {
      XmlNodeChangedEventHandler: {
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
  XmlNodeList: {
    kind: "class",
    members: {
      XmlNodeList: {
        kind: "method",
        methodKind: "constructor",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Item: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      PrivateDisposeNodeList: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      ItemOf: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  XmlNodeOrder: {
    kind: "enum",
    members: {
      Before: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeOrder;
        },
      },
      After: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeOrder;
        },
      },
      Same: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeOrder;
        },
      },
      Unknown: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeOrder;
        },
      },
    },
  },
  XmlNodeReader: {
    kind: "class",
    members: {
      XmlNodeReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      LookupNamespace: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MoveToAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MoveToElement: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MoveToFirstAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MoveToNextAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadAttributeValue: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadContentAsBase64: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadContentAsBinHex: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadElementContentAsBase64: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadElementContentAsBinHex: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ResolveEntity: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Skip: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AttributeCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      BaseURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      CanReadBinaryContent: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      CanResolveEntity: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      Depth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      EOF: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      HasAttributes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      HasValue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsDefault: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsEmptyElement: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NamespaceURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      NameTable: {
        kind: "property",
        type: () => {
          return Xml.XmlNameTable;
        },
        isOverride: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      Prefix: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      ReadState: {
        kind: "property",
        type: () => {
          return Xml.ReadState;
        },
        isOverride: true,
      },
      SchemaInfo: {
        kind: "property",
        type: () => {
          return Schema.IXmlSchemaInfo;
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
      XmlLang: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      XmlSpace: {
        kind: "property",
        type: () => {
          return Xml.XmlSpace;
        },
        isOverride: true,
      },
    },
  },
  XmlNodeType: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      Element: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      Attribute: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      Text: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      CDATA: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      EntityReference: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      Entity: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      ProcessingInstruction: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      Comment: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      Document: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      DocumentType: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      DocumentFragment: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      Notation: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      Whitespace: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      SignificantWhitespace: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      EndElement: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      EndEntity: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
      XmlDeclaration: {
        kind: "field",
        type: () => {
          return Xml.XmlNodeType;
        },
      },
    },
  },
  XmlNotation: {
    kind: "class",
    members: {
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InnerXml: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      OuterXml: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      PublicId: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SystemId: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  XmlOutputMethod: {
    kind: "enum",
    members: {
      Xml: {
        kind: "field",
        type: () => {
          return Xml.XmlOutputMethod;
        },
      },
      Html: {
        kind: "field",
        type: () => {
          return Xml.XmlOutputMethod;
        },
      },
      Text: {
        kind: "field",
        type: () => {
          return Xml.XmlOutputMethod;
        },
      },
      AutoDetect: {
        kind: "field",
        type: () => {
          return Xml.XmlOutputMethod;
        },
      },
    },
  },
  XmlParserContext: {
    kind: "class",
    members: {
      XmlParserContext: {
        kind: "method",
        methodKind: "constructor",
      },
      BaseURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DocTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Encoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
      },
      InternalSubset: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      NamespaceManager: {
        kind: "property",
        type: () => {
          return Xml.XmlNamespaceManager;
        },
      },
      NameTable: {
        kind: "property",
        type: () => {
          return Xml.XmlNameTable;
        },
      },
      PublicId: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SystemId: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      XmlLang: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      XmlSpace: {
        kind: "property",
        type: () => {
          return Xml.XmlSpace;
        },
      },
    },
  },
  XmlProcessingInstruction: {
    kind: "class",
    members: {
      XmlProcessingInstruction: {
        kind: "method",
        methodKind: "constructor",
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Data: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      InnerText: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      Target: {
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
        isOverride: true,
      },
    },
  },
  XmlQualifiedName: {
    kind: "class",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return Xml.XmlQualifiedName;
        },
        isStatic: true,
        isReadOnly: true,
      },
      XmlQualifiedName: {
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
      IsEmpty: {
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
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  XmlReader: {
    kind: "class",
    members: {
      XmlReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetValueAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNameToken: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsStartElement: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      LookupNamespace: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MoveToAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MoveToContent: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MoveToContentAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MoveToElement: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MoveToFirstAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MoveToNextAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ReadAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadAttributeValue: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ReadContentAs: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsBase64: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsBase64Async: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsBinHex: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsBinHexAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsBoolean: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsDateTimeOffset: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsDecimal: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsDouble: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsFloat: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsInt: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsLong: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsObject: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsObjectAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadContentAsStringAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAs: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsBase64: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsBase64Async: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsBinHex: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsBinHexAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsBoolean: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsDecimal: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsDouble: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsFloat: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsInt: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsLong: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsObject: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsObjectAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadElementContentAsStringAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadEndElement: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadInnerXml: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadInnerXmlAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadOuterXml: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadOuterXmlAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadStartElement: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadSubtree: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadToDescendant: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadToFollowing: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadToNextSibling: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadValueChunk: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadValueChunkAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ResolveEntity: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Skip: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SkipAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AttributeCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      BaseURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      CanReadBinaryContent: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      CanReadValueChunk: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      CanResolveEntity: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Depth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      EOF: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      HasAttributes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      HasValue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsDefault: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsEmptyElement: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      NamespaceURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      NameTable: {
        kind: "property",
        type: () => {
          return Xml.XmlNameTable;
        },
        isAbstract: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isAbstract: true,
      },
      Prefix: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      QuoteChar: {
        kind: "property",
        type: () => {
          return System.Char;
        },
        isVirtual: true,
      },
      ReadState: {
        kind: "property",
        type: () => {
          return Xml.ReadState;
        },
        isAbstract: true,
      },
      SchemaInfo: {
        kind: "property",
        type: () => {
          return Schema.IXmlSchemaInfo;
        },
        isVirtual: true,
      },
      Settings: {
        kind: "property",
        type: () => {
          return Xml.XmlReaderSettings;
        },
        isVirtual: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      ValueType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isVirtual: true,
      },
      XmlLang: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      XmlSpace: {
        kind: "property",
        type: () => {
          return Xml.XmlSpace;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  XmlReaderSettings: {
    kind: "class",
    members: {
      XmlReaderSettings: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Async: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      CheckCharacters: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      CloseInput: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ConformanceLevel: {
        kind: "property",
        type: () => {
          return Xml.ConformanceLevel;
        },
      },
      DtdProcessing: {
        kind: "property",
        type: () => {
          return Xml.DtdProcessing;
        },
      },
      IgnoreComments: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IgnoreProcessingInstructions: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IgnoreWhitespace: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LineNumberOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      LinePositionOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxCharactersFromEntities: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      MaxCharactersInDocument: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      NameTable: {
        kind: "property",
        type: () => {
          return Xml.XmlNameTable;
        },
      },
      ProhibitDtd: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Schemas: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaSet;
        },
      },
      ValidationFlags: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaValidationFlags;
        },
      },
      ValidationType: {
        kind: "property",
        type: () => {
          return Xml.ValidationType;
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
  XmlResolver: {
    kind: "class",
    members: {
      XmlResolver: {
        kind: "method",
        methodKind: "constructor",
      },
      GetEntity: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetEntityAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ResolveUri: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SupportsType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Credentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
        isVirtual: true,
      },
      ThrowingResolver: {
        kind: "property",
        type: () => {
          return Xml.XmlResolver;
        },
        isStatic: true,
      },
      FileSystemResolver: {
        kind: "property",
        type: () => {
          return Xml.XmlResolver;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  XmlSecureResolver: {
    kind: "class",
    members: {
      XmlSecureResolver: {
        kind: "method",
        methodKind: "constructor",
      },
      GetEntity: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEntityAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ResolveUri: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Credentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
        isOverride: true,
      },
    },
  },
  XmlSignificantWhitespace: {
    kind: "class",
    members: {
      XmlSignificantWhitespace: {
        kind: "method",
        methodKind: "constructor",
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      ParentNode: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
      PreviousText: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
    },
  },
  XmlSpace: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Xml.XmlSpace;
        },
      },
      Default: {
        kind: "field",
        type: () => {
          return Xml.XmlSpace;
        },
      },
      Preserve: {
        kind: "field",
        type: () => {
          return Xml.XmlSpace;
        },
      },
    },
  },
  XmlText: {
    kind: "class",
    members: {
      XmlText: {
        kind: "method",
        methodKind: "constructor",
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SplitText: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      ParentNode: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
      PreviousText: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
    },
  },
  XmlTokenizedType: {
    kind: "enum",
    members: {
      CDATA: {
        kind: "field",
        type: () => {
          return Xml.XmlTokenizedType;
        },
      },
      ID: {
        kind: "field",
        type: () => {
          return Xml.XmlTokenizedType;
        },
      },
      IDREF: {
        kind: "field",
        type: () => {
          return Xml.XmlTokenizedType;
        },
      },
      IDREFS: {
        kind: "field",
        type: () => {
          return Xml.XmlTokenizedType;
        },
      },
      ENTITY: {
        kind: "field",
        type: () => {
          return Xml.XmlTokenizedType;
        },
      },
      ENTITIES: {
        kind: "field",
        type: () => {
          return Xml.XmlTokenizedType;
        },
      },
      NMTOKEN: {
        kind: "field",
        type: () => {
          return Xml.XmlTokenizedType;
        },
      },
      NMTOKENS: {
        kind: "field",
        type: () => {
          return Xml.XmlTokenizedType;
        },
      },
      NOTATION: {
        kind: "field",
        type: () => {
          return Xml.XmlTokenizedType;
        },
      },
      ENUMERATION: {
        kind: "field",
        type: () => {
          return Xml.XmlTokenizedType;
        },
      },
      QName: {
        kind: "field",
        type: () => {
          return Xml.XmlTokenizedType;
        },
      },
      NCName: {
        kind: "field",
        type: () => {
          return Xml.XmlTokenizedType;
        },
      },
      None: {
        kind: "field",
        type: () => {
          return Xml.XmlTokenizedType;
        },
      },
    },
  },
  XmlUrlResolver: {
    kind: "class",
    members: {
      XmlUrlResolver: {
        kind: "method",
        methodKind: "constructor",
      },
      GetEntity: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEntityAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ResolveUri: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CachePolicy: {
        kind: "property",
        type: () => {
          return Cache.RequestCachePolicy;
        },
      },
      Credentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
        isOverride: true,
      },
      Proxy: {
        kind: "property",
        type: () => {
          return Net.IWebProxy;
        },
      },
    },
  },
  XmlValidatingReader: {
    kind: "class",
    members: {
      XmlValidatingReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HasLineInfo: {
        kind: "method",
        methodKind: "ordinary",
      },
      LookupNamespace: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MoveToAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MoveToElement: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MoveToFirstAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MoveToNextAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadAttributeValue: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadContentAsBase64: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadContentAsBinHex: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadElementContentAsBase64: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadElementContentAsBinHex: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadTypedValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResolveEntity: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AttributeCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      BaseURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      CanReadBinaryContent: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      CanResolveEntity: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      Depth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Encoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
      },
      EntityHandling: {
        kind: "property",
        type: () => {
          return Xml.EntityHandling;
        },
      },
      EOF: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      HasValue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsDefault: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsEmptyElement: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
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
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      Namespaces: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      NamespaceURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      NameTable: {
        kind: "property",
        type: () => {
          return Xml.XmlNameTable;
        },
        isOverride: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      Prefix: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      QuoteChar: {
        kind: "property",
        type: () => {
          return System.Char;
        },
        isOverride: true,
      },
      Reader: {
        kind: "property",
        type: () => {
          return Xml.XmlReader;
        },
      },
      ReadState: {
        kind: "property",
        type: () => {
          return Xml.ReadState;
        },
        isOverride: true,
      },
      Schemas: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaCollection;
        },
      },
      SchemaType: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      ValidationType: {
        kind: "property",
        type: () => {
          return Xml.ValidationType;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      XmlLang: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      XmlResolver: {
        kind: "property",
        type: () => {
          return Xml.XmlResolver;
        },
      },
      XmlSpace: {
        kind: "property",
        type: () => {
          return Xml.XmlSpace;
        },
        isOverride: true,
      },
    },
  },
  XmlWhitespace: {
    kind: "class",
    members: {
      XmlWhitespace: {
        kind: "method",
        methodKind: "constructor",
      },
      CloneNode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteContentTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
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
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      ParentNode: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
      PreviousText: {
        kind: "property",
        type: () => {
          return Xml.XmlNode;
        },
        isNullable: true,
        isOverride: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
    },
  },
  XmlWriter: {
    kind: "class",
    members: {
      XmlWriter: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      FlushAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      LookupPrefix: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteAttributesAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteAttributeString: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteAttributeStringAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteBase64: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteBase64Async: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteBinHex: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteBinHexAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteCData: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteCDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteCharEntity: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteCharEntityAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteChars: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteCharsAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteComment: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteCommentAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteDocType: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteDocTypeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteElementString: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteElementStringAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteEndAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteEndAttributeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteEndDocument: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteEndDocumentAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteEndElement: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteEndElementAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteEntityRef: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteEntityRefAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteFullEndElement: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteFullEndElementAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteNameAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteNmToken: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteNmTokenAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteNode: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteNodeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteProcessingInstruction: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteProcessingInstructionAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteQualifiedName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteQualifiedNameAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteRaw: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteRawAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteStartAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteStartAttributeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteStartDocument: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteStartDocumentAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteStartElement: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteStartElementAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteString: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteStringAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteSurrogateCharEntity: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteSurrogateCharEntityAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteValue: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteWhitespace: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteWhitespaceAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisposeAsyncCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Settings: {
        kind: "property",
        type: () => {
          return Xml.XmlWriterSettings;
        },
        isVirtual: true,
      },
      WriteState: {
        kind: "property",
        type: () => {
          return Xml.WriteState;
        },
        isAbstract: true,
      },
      XmlLang: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      XmlSpace: {
        kind: "property",
        type: () => {
          return Xml.XmlSpace;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  XmlWriterSettings: {
    kind: "class",
    members: {
      XmlWriterSettings: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Async: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      CheckCharacters: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      CloseOutput: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ConformanceLevel: {
        kind: "property",
        type: () => {
          return Xml.ConformanceLevel;
        },
      },
      DoNotEscapeUriAttributes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Encoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
      },
      Indent: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IndentChars: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      NamespaceHandling: {
        kind: "property",
        type: () => {
          return Xml.NamespaceHandling;
        },
      },
      NewLineChars: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      NewLineHandling: {
        kind: "property",
        type: () => {
          return Xml.NewLineHandling;
        },
      },
      NewLineOnAttributes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      OmitXmlDeclaration: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      OutputMethod: {
        kind: "property",
        type: () => {
          return Xml.XmlOutputMethod;
        },
      },
      WriteEndDocumentOnClose: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
});
export default Xml
