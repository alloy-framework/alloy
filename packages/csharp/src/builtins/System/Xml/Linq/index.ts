import Generic from "../../Collections/Generic/index.js";
import System from "../../index.js";
import Xml from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type LinqLibrary = LibrarySymbolReference & {
  Extensions: LibrarySymbolReference & {
    AncestorsAndSelf: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    DescendantNodesAndSelf: LibrarySymbolReference;
    DescendantsAndSelf: LibrarySymbolReference;
    Remove: LibrarySymbolReference
  };
  LoadOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    PreserveWhitespace: LibrarySymbolReference;
    SetBaseUri: LibrarySymbolReference;
    SetLineInfo: LibrarySymbolReference
  };
  ReaderOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    OmitDuplicateNamespaces: LibrarySymbolReference
  };
  SaveOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    DisableFormatting: LibrarySymbolReference;
    OmitDuplicateNamespaces: LibrarySymbolReference
  };
  XAttribute: LibrarySymbolReference & {
    XAttribute: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    SetValue: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    EmptySequence: LibrarySymbolReference;
    IsNamespaceDeclaration: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NextAttribute: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    PreviousAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  XCData: LibrarySymbolReference & {
    XCData: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    WriteToAsync: LibrarySymbolReference;
    NodeType: LibrarySymbolReference
  };
  XComment: LibrarySymbolReference & {
    XComment: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    WriteToAsync: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  XContainer: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    AddFirst: LibrarySymbolReference;
    CreateWriter: LibrarySymbolReference;
    DescendantNodes: LibrarySymbolReference;
    Descendants: LibrarySymbolReference;
    Element: LibrarySymbolReference;
    Elements: LibrarySymbolReference;
    Nodes: LibrarySymbolReference;
    RemoveNodes: LibrarySymbolReference;
    ReplaceNodes: LibrarySymbolReference;
    FirstNode: LibrarySymbolReference;
    LastNode: LibrarySymbolReference
  };
  XDeclaration: LibrarySymbolReference & {
    XDeclaration: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Encoding: LibrarySymbolReference;
    Standalone: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  XDocument: LibrarySymbolReference & {
    XDocument: LibrarySymbolReference;
    Load: LibrarySymbolReference;
    LoadAsync: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    Save: LibrarySymbolReference;
    SaveAsync: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    WriteToAsync: LibrarySymbolReference;
    Declaration: LibrarySymbolReference;
    DocumentType: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Root: LibrarySymbolReference
  };
  XDocumentType: LibrarySymbolReference & {
    XDocumentType: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    WriteToAsync: LibrarySymbolReference;
    InternalSubset: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    PublicId: LibrarySymbolReference;
    SystemId: LibrarySymbolReference
  };
  XElement: LibrarySymbolReference & {
    XElement: LibrarySymbolReference;
    AncestorsAndSelf: LibrarySymbolReference;
    Attribute: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    DescendantNodesAndSelf: LibrarySymbolReference;
    DescendantsAndSelf: LibrarySymbolReference;
    GetDefaultNamespace: LibrarySymbolReference;
    GetNamespaceOfPrefix: LibrarySymbolReference;
    GetPrefixOfNamespace: LibrarySymbolReference;
    Load: LibrarySymbolReference;
    LoadAsync: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    RemoveAll: LibrarySymbolReference;
    RemoveAttributes: LibrarySymbolReference;
    ReplaceAll: LibrarySymbolReference;
    ReplaceAttributes: LibrarySymbolReference;
    Save: LibrarySymbolReference;
    SaveAsync: LibrarySymbolReference;
    SetAttributeValue: LibrarySymbolReference;
    SetElementValue: LibrarySymbolReference;
    SetValue: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    WriteToAsync: LibrarySymbolReference;
    EmptySequence: LibrarySymbolReference;
    FirstAttribute: LibrarySymbolReference;
    HasAttributes: LibrarySymbolReference;
    HasElements: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference;
    LastAttribute: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  XName: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    Get: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    NamespaceName: LibrarySymbolReference
  };
  XNamespace: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    Get: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetName: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    NamespaceName: LibrarySymbolReference;
    None: LibrarySymbolReference;
    Xml: LibrarySymbolReference;
    Xmlns: LibrarySymbolReference
  };
  XNode: LibrarySymbolReference & {
    AddAfterSelf: LibrarySymbolReference;
    AddBeforeSelf: LibrarySymbolReference;
    Ancestors: LibrarySymbolReference;
    CompareDocumentOrder: LibrarySymbolReference;
    CreateReader: LibrarySymbolReference;
    DeepEquals: LibrarySymbolReference;
    ElementsAfterSelf: LibrarySymbolReference;
    ElementsBeforeSelf: LibrarySymbolReference;
    IsAfter: LibrarySymbolReference;
    IsBefore: LibrarySymbolReference;
    NodesAfterSelf: LibrarySymbolReference;
    NodesBeforeSelf: LibrarySymbolReference;
    ReadFrom: LibrarySymbolReference;
    ReadFromAsync: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    ReplaceWith: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    WriteToAsync: LibrarySymbolReference;
    DocumentOrderComparer: LibrarySymbolReference;
    EqualityComparer: LibrarySymbolReference;
    NextNode: LibrarySymbolReference;
    PreviousNode: LibrarySymbolReference
  };
  XNodeDocumentOrderComparer: LibrarySymbolReference & {
    XNodeDocumentOrderComparer: LibrarySymbolReference;
    Compare: LibrarySymbolReference
  };
  XNodeEqualityComparer: LibrarySymbolReference & {
    XNodeEqualityComparer: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference
  };
  XObject: LibrarySymbolReference & {
    AddAnnotation: LibrarySymbolReference;
    Annotation: LibrarySymbolReference;
    Annotations: LibrarySymbolReference;
    RemoveAnnotations: LibrarySymbolReference;
    BaseUri: LibrarySymbolReference;
    Document: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Parent: LibrarySymbolReference
  };
  XObjectChange: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  XObjectChangeEventArgs: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Value: LibrarySymbolReference;
    XObjectChangeEventArgs: LibrarySymbolReference;
    ObjectChange: LibrarySymbolReference
  };
  XProcessingInstruction: LibrarySymbolReference & {
    XProcessingInstruction: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    WriteToAsync: LibrarySymbolReference;
    Data: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Target: LibrarySymbolReference
  };
  XStreamingElement: LibrarySymbolReference & {
    XStreamingElement: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Save: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  XText: LibrarySymbolReference & {
    XText: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    WriteToAsync: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Value: LibrarySymbolReference
  }
};
const Linq: LinqLibrary = createLibrary("System.Xml.Linq", {
  Extensions: {
    kind: "class",
    members: {
      AncestorsAndSelf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Attributes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DescendantNodesAndSelf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DescendantsAndSelf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  LoadOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Linq.LoadOptions;
        },
      },
      PreserveWhitespace: {
        kind: "field",
        type: () => {
          return Linq.LoadOptions;
        },
      },
      SetBaseUri: {
        kind: "field",
        type: () => {
          return Linq.LoadOptions;
        },
      },
      SetLineInfo: {
        kind: "field",
        type: () => {
          return Linq.LoadOptions;
        },
      },
    },
  },
  ReaderOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Linq.ReaderOptions;
        },
      },
      OmitDuplicateNamespaces: {
        kind: "field",
        type: () => {
          return Linq.ReaderOptions;
        },
      },
    },
  },
  SaveOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Linq.SaveOptions;
        },
      },
      DisableFormatting: {
        kind: "field",
        type: () => {
          return Linq.SaveOptions;
        },
      },
      OmitDuplicateNamespaces: {
        kind: "field",
        type: () => {
          return Linq.SaveOptions;
        },
      },
    },
  },
  XAttribute: {
    kind: "class",
    members: {
      XAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EmptySequence: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isStatic: true,
      },
      IsNamespaceDeclaration: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return Linq.XName;
        },
      },
      NextAttribute: {
        kind: "property",
        type: () => {
          return Linq.XAttribute;
        },
        isNullable: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      PreviousAttribute: {
        kind: "property",
        type: () => {
          return Linq.XAttribute;
        },
        isNullable: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  XCData: {
    kind: "class",
    members: {
      XCData: {
        kind: "method",
        methodKind: "constructor",
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteToAsync: {
        kind: "method",
        methodKind: "ordinary",
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
  XComment: {
    kind: "class",
    members: {
      XComment: {
        kind: "method",
        methodKind: "constructor",
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteToAsync: {
        kind: "method",
        methodKind: "ordinary",
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
      },
    },
  },
  XContainer: {
    kind: "class",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddFirst: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateWriter: {
        kind: "method",
        methodKind: "ordinary",
      },
      DescendantNodes: {
        kind: "method",
        methodKind: "ordinary",
      },
      Descendants: {
        kind: "method",
        methodKind: "ordinary",
      },
      Element: {
        kind: "method",
        methodKind: "ordinary",
      },
      Elements: {
        kind: "method",
        methodKind: "ordinary",
      },
      Nodes: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveNodes: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReplaceNodes: {
        kind: "method",
        methodKind: "ordinary",
      },
      FirstNode: {
        kind: "property",
        type: () => {
          return Linq.XNode;
        },
        isNullable: true,
      },
      LastNode: {
        kind: "property",
        type: () => {
          return Linq.XNode;
        },
        isNullable: true,
      },
    },
    isAbstract: true,
  },
  XDeclaration: {
    kind: "class",
    members: {
      XDeclaration: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Encoding: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Standalone: {
        kind: "property",
        type: () => {
          return System.String;
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
  XDocument: {
    kind: "class",
    members: {
      XDocument: {
        kind: "method",
        methodKind: "constructor",
      },
      Load: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Save: {
        kind: "method",
        methodKind: "ordinary",
      },
      SaveAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteToAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Declaration: {
        kind: "property",
        type: () => {
          return Linq.XDeclaration;
        },
      },
      DocumentType: {
        kind: "property",
        type: () => {
          return Linq.XDocumentType;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isOverride: true,
      },
      Root: {
        kind: "property",
        type: () => {
          return Linq.XElement;
        },
        isNullable: true,
      },
    },
  },
  XDocumentType: {
    kind: "class",
    members: {
      XDocumentType: {
        kind: "method",
        methodKind: "constructor",
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteToAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InternalSubset: {
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
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
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
  XElement: {
    kind: "class",
    members: {
      XElement: {
        kind: "method",
        methodKind: "constructor",
      },
      AncestorsAndSelf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      DescendantNodesAndSelf: {
        kind: "method",
        methodKind: "ordinary",
      },
      DescendantsAndSelf: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDefaultNamespace: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNamespaceOfPrefix: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPrefixOfNamespace: {
        kind: "method",
        methodKind: "ordinary",
      },
      Load: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RemoveAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReplaceAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReplaceAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      Save: {
        kind: "method",
        methodKind: "ordinary",
      },
      SaveAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAttributeValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetElementValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteToAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EmptySequence: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isStatic: true,
      },
      FirstAttribute: {
        kind: "property",
        type: () => {
          return Linq.XAttribute;
        },
        isNullable: true,
      },
      HasAttributes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      HasElements: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LastAttribute: {
        kind: "property",
        type: () => {
          return Linq.XAttribute;
        },
        isNullable: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return Linq.XName;
        },
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
      },
    },
  },
  XName: {
    kind: "class",
    members: {
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Get: {
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
      LocalName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return Linq.XNamespace;
        },
      },
      NamespaceName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  XNamespace: {
    kind: "class",
    members: {
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Get: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      NamespaceName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      None: {
        kind: "property",
        type: () => {
          return Linq.XNamespace;
        },
        isStatic: true,
      },
      Xml: {
        kind: "property",
        type: () => {
          return Linq.XNamespace;
        },
        isStatic: true,
      },
      Xmlns: {
        kind: "property",
        type: () => {
          return Linq.XNamespace;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  XNode: {
    kind: "class",
    members: {
      AddAfterSelf: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddBeforeSelf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Ancestors: {
        kind: "method",
        methodKind: "ordinary",
      },
      CompareDocumentOrder: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateReader: {
        kind: "method",
        methodKind: "ordinary",
      },
      DeepEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ElementsAfterSelf: {
        kind: "method",
        methodKind: "ordinary",
      },
      ElementsBeforeSelf: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsAfter: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsBefore: {
        kind: "method",
        methodKind: "ordinary",
      },
      NodesAfterSelf: {
        kind: "method",
        methodKind: "ordinary",
      },
      NodesBeforeSelf: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadFrom: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadFromAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReplaceWith: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteToAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DocumentOrderComparer: {
        kind: "property",
        type: () => {
          return Linq.XNodeDocumentOrderComparer;
        },
        isStatic: true,
      },
      EqualityComparer: {
        kind: "property",
        type: () => {
          return Linq.XNodeEqualityComparer;
        },
        isStatic: true,
      },
      NextNode: {
        kind: "property",
        type: () => {
          return Linq.XNode;
        },
        isNullable: true,
      },
      PreviousNode: {
        kind: "property",
        type: () => {
          return Linq.XNode;
        },
        isNullable: true,
      },
    },
    isAbstract: true,
  },
  XNodeDocumentOrderComparer: {
    kind: "class",
    members: {
      XNodeDocumentOrderComparer: {
        kind: "method",
        methodKind: "constructor",
      },
      Compare: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  XNodeEqualityComparer: {
    kind: "class",
    members: {
      XNodeEqualityComparer: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  XObject: {
    kind: "class",
    members: {
      AddAnnotation: {
        kind: "method",
        methodKind: "ordinary",
      },
      Annotation: {
        kind: "method",
        methodKind: "ordinary",
      },
      Annotations: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAnnotations: {
        kind: "method",
        methodKind: "ordinary",
      },
      BaseUri: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Document: {
        kind: "property",
        type: () => {
          return Linq.XDocument;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Xml.XmlNodeType;
        },
        isAbstract: true,
      },
      Parent: {
        kind: "property",
        type: () => {
          return Linq.XElement;
        },
        isNullable: true,
      },
    },
    isAbstract: true,
  },
  XObjectChange: {
    kind: "enum",
    members: {
      Add: {
        kind: "field",
        type: () => {
          return Linq.XObjectChange;
        },
      },
      Remove: {
        kind: "field",
        type: () => {
          return Linq.XObjectChange;
        },
      },
      Name: {
        kind: "field",
        type: () => {
          return Linq.XObjectChange;
        },
      },
      Value: {
        kind: "field",
        type: () => {
          return Linq.XObjectChange;
        },
      },
    },
  },
  XObjectChangeEventArgs: {
    kind: "class",
    members: {
      Add: {
        kind: "field",
        type: () => {
          return Linq.XObjectChangeEventArgs;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Name: {
        kind: "field",
        type: () => {
          return Linq.XObjectChangeEventArgs;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Remove: {
        kind: "field",
        type: () => {
          return Linq.XObjectChangeEventArgs;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Value: {
        kind: "field",
        type: () => {
          return Linq.XObjectChangeEventArgs;
        },
        isStatic: true,
        isReadOnly: true,
      },
      XObjectChangeEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      ObjectChange: {
        kind: "property",
        type: () => {
          return Linq.XObjectChange;
        },
      },
    },
  },
  XProcessingInstruction: {
    kind: "class",
    members: {
      XProcessingInstruction: {
        kind: "method",
        methodKind: "constructor",
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteToAsync: {
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
    },
  },
  XStreamingElement: {
    kind: "class",
    members: {
      XStreamingElement: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Save: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Name: {
        kind: "property",
        type: () => {
          return Linq.XName;
        },
      },
    },
  },
  XText: {
    kind: "class",
    members: {
      XText: {
        kind: "method",
        methodKind: "constructor",
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteToAsync: {
        kind: "method",
        methodKind: "ordinary",
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
      },
    },
  },
});
export default Linq
