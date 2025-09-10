import Collections from "../../Collections/index.js";
import System from "../../index.js";
import Xml from "../index.js";
import Schema from "../Schema/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type XPathLibrary = LibrarySymbolReference & {
  Extensions: LibrarySymbolReference & {
    CreateNavigator: LibrarySymbolReference;
    XPathEvaluate: LibrarySymbolReference;
    XPathSelectElement: LibrarySymbolReference;
    XPathSelectElements: LibrarySymbolReference
  };
  IXPathNavigable: LibrarySymbolReference & {
    CreateNavigator: LibrarySymbolReference
  };
  XDocumentExtensions: LibrarySymbolReference & {
    ToXPathNavigable: LibrarySymbolReference
  };
  XPathDocument: LibrarySymbolReference & {
    XPathDocument: LibrarySymbolReference;
    CreateNavigator: LibrarySymbolReference
  };
  XPathException: LibrarySymbolReference & {
    XPathException: LibrarySymbolReference;
    Message: LibrarySymbolReference
  };
  XPathExpression: LibrarySymbolReference & {
    AddSort: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Compile: LibrarySymbolReference;
    SetContext: LibrarySymbolReference;
    Expression: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  };
  XPathItem: LibrarySymbolReference & {
    XPathItem: LibrarySymbolReference;
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
  XPathNamespaceScope: LibrarySymbolReference & {
    All: LibrarySymbolReference;
    ExcludeXml: LibrarySymbolReference;
    Local: LibrarySymbolReference
  };
  XPathNavigator: LibrarySymbolReference & {
    XPathNavigator: LibrarySymbolReference;
    AppendChild: LibrarySymbolReference;
    AppendChildElement: LibrarySymbolReference;
    CheckValidity: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    ComparePosition: LibrarySymbolReference;
    Compile: LibrarySymbolReference;
    CreateAttribute: LibrarySymbolReference;
    CreateAttributes: LibrarySymbolReference;
    CreateNavigator: LibrarySymbolReference;
    DeleteRange: LibrarySymbolReference;
    DeleteSelf: LibrarySymbolReference;
    Evaluate: LibrarySymbolReference;
    GetAttribute: LibrarySymbolReference;
    GetNamespace: LibrarySymbolReference;
    GetNamespacesInScope: LibrarySymbolReference;
    InsertAfter: LibrarySymbolReference;
    InsertBefore: LibrarySymbolReference;
    InsertElementAfter: LibrarySymbolReference;
    InsertElementBefore: LibrarySymbolReference;
    IsDescendant: LibrarySymbolReference;
    IsSamePosition: LibrarySymbolReference;
    LookupNamespace: LibrarySymbolReference;
    LookupPrefix: LibrarySymbolReference;
    Matches: LibrarySymbolReference;
    MoveTo: LibrarySymbolReference;
    MoveToAttribute: LibrarySymbolReference;
    MoveToChild: LibrarySymbolReference;
    MoveToFirst: LibrarySymbolReference;
    MoveToFirstAttribute: LibrarySymbolReference;
    MoveToFirstChild: LibrarySymbolReference;
    MoveToFirstNamespace: LibrarySymbolReference;
    MoveToFollowing: LibrarySymbolReference;
    MoveToId: LibrarySymbolReference;
    MoveToNamespace: LibrarySymbolReference;
    MoveToNext: LibrarySymbolReference;
    MoveToNextAttribute: LibrarySymbolReference;
    MoveToNextNamespace: LibrarySymbolReference;
    MoveToParent: LibrarySymbolReference;
    MoveToPrevious: LibrarySymbolReference;
    MoveToRoot: LibrarySymbolReference;
    PrependChild: LibrarySymbolReference;
    PrependChildElement: LibrarySymbolReference;
    ReadSubtree: LibrarySymbolReference;
    ReplaceRange: LibrarySymbolReference;
    ReplaceSelf: LibrarySymbolReference;
    Select: LibrarySymbolReference;
    SelectAncestors: LibrarySymbolReference;
    SelectChildren: LibrarySymbolReference;
    SelectDescendants: LibrarySymbolReference;
    SelectSingleNode: LibrarySymbolReference;
    SetTypedValue: LibrarySymbolReference;
    SetValue: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ValueAs: LibrarySymbolReference;
    WriteSubtree: LibrarySymbolReference;
    BaseURI: LibrarySymbolReference;
    CanEdit: LibrarySymbolReference;
    HasAttributes: LibrarySymbolReference;
    HasChildren: LibrarySymbolReference;
    InnerXml: LibrarySymbolReference;
    IsEmptyElement: LibrarySymbolReference;
    IsNode: LibrarySymbolReference;
    LocalName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NamespaceURI: LibrarySymbolReference;
    NameTable: LibrarySymbolReference;
    NavigatorComparer: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    OuterXml: LibrarySymbolReference;
    Prefix: LibrarySymbolReference;
    SchemaInfo: LibrarySymbolReference;
    TypedValue: LibrarySymbolReference;
    UnderlyingObject: LibrarySymbolReference;
    ValueAsBoolean: LibrarySymbolReference;
    ValueAsDateTime: LibrarySymbolReference;
    ValueAsDouble: LibrarySymbolReference;
    ValueAsInt: LibrarySymbolReference;
    ValueAsLong: LibrarySymbolReference;
    ValueType: LibrarySymbolReference;
    XmlLang: LibrarySymbolReference;
    XmlType: LibrarySymbolReference
  };
  XPathNodeIterator: LibrarySymbolReference & {
    XPathNodeIterator: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    MoveNext: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Current: LibrarySymbolReference;
    CurrentPosition: LibrarySymbolReference
  };
  XPathNodeType: LibrarySymbolReference & {
    Root: LibrarySymbolReference;
    Element: LibrarySymbolReference;
    Attribute: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    Text: LibrarySymbolReference;
    SignificantWhitespace: LibrarySymbolReference;
    Whitespace: LibrarySymbolReference;
    ProcessingInstruction: LibrarySymbolReference;
    Comment: LibrarySymbolReference;
    All: LibrarySymbolReference
  };
  XPathResultType: LibrarySymbolReference & {
    Number: LibrarySymbolReference;
    Navigator: LibrarySymbolReference;
    String: LibrarySymbolReference;
    Boolean: LibrarySymbolReference;
    NodeSet: LibrarySymbolReference;
    Any: LibrarySymbolReference;
    Error: LibrarySymbolReference
  };
  XmlCaseOrder: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    UpperFirst: LibrarySymbolReference;
    LowerFirst: LibrarySymbolReference
  };
  XmlDataType: LibrarySymbolReference & {
    Text: LibrarySymbolReference;
    Number: LibrarySymbolReference
  };
  XmlSortOrder: LibrarySymbolReference & {
    Ascending: LibrarySymbolReference;
    Descending: LibrarySymbolReference
  }
};
const XPath: XPathLibrary = createLibrary("System.Xml.XPath", {
  Extensions: {
    kind: "class",
    members: {
      CreateNavigator: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      XPathEvaluate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      XPathSelectElement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      XPathSelectElements: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  IXPathNavigable: {
    kind: "interface",
    members: {
      CreateNavigator: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  XDocumentExtensions: {
    kind: "class",
    members: {
      ToXPathNavigable: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  XPathDocument: {
    kind: "class",
    members: {
      XPathDocument: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateNavigator: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  XPathException: {
    kind: "class",
    members: {
      XPathException: {
        kind: "method",
        methodKind: "constructor",
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
  },
  XPathExpression: {
    kind: "class",
    members: {
      AddSort: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Compile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetContext: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Expression: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return XPath.XPathResultType;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  XPathItem: {
    kind: "class",
    members: {
      XPathItem: {
        kind: "method",
        methodKind: "constructor",
      },
      ValueAs: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsNode: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      TypedValue: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isAbstract: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      ValueAsBoolean: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      ValueAsDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isAbstract: true,
      },
      ValueAsDouble: {
        kind: "property",
        type: () => {
          return System.Double;
        },
        isAbstract: true,
      },
      ValueAsInt: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      ValueAsLong: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ValueType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isAbstract: true,
      },
      XmlType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaType;
        },
        isNullable: true,
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  XPathNamespaceScope: {
    kind: "enum",
    members: {
      All: {
        kind: "field",
        type: () => {
          return XPath.XPathNamespaceScope;
        },
      },
      ExcludeXml: {
        kind: "field",
        type: () => {
          return XPath.XPathNamespaceScope;
        },
      },
      Local: {
        kind: "field",
        type: () => {
          return XPath.XPathNamespaceScope;
        },
      },
    },
  },
  XPathNavigator: {
    kind: "class",
    members: {
      XPathNavigator: {
        kind: "method",
        methodKind: "constructor",
      },
      AppendChild: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AppendChildElement: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CheckValidity: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ComparePosition: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Compile: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateNavigator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DeleteRange: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DeleteSelf: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Evaluate: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetNamespace: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetNamespacesInScope: {
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
      InsertElementAfter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      InsertElementBefore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsDescendant: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsSamePosition: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
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
      Matches: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MoveTo: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MoveToAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MoveToChild: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MoveToFirst: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MoveToFirstAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MoveToFirstChild: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MoveToFirstNamespace: {
        kind: "method",
        methodKind: "ordinary",
      },
      MoveToFollowing: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MoveToId: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MoveToNamespace: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MoveToNext: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MoveToNextAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MoveToNextNamespace: {
        kind: "method",
        methodKind: "ordinary",
      },
      MoveToParent: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MoveToPrevious: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MoveToRoot: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      PrependChild: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      PrependChildElement: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadSubtree: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReplaceRange: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReplaceSelf: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Select: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SelectAncestors: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SelectChildren: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SelectDescendants: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SelectSingleNode: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetTypedValue: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetValue: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
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
      WriteSubtree: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BaseURI: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      CanEdit: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      HasAttributes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      HasChildren: {
        kind: "property",
        type: () => {
          return System.Boolean;
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
      IsEmptyElement: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      IsNode: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
        isSealed: true,
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
        isAbstract: true,
      },
      NameTable: {
        kind: "property",
        type: () => {
          return Xml.XmlNameTable;
        },
        isAbstract: true,
      },
      NavigatorComparer: {
        kind: "property",
        type: () => {
          return Collections.IEqualityComparer;
        },
        isStatic: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return XPath.XPathNodeType;
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
      Prefix: {
        kind: "property",
        type: () => {
          return System.String;
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
      TypedValue: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isOverride: true,
      },
      UnderlyingObject: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
        isVirtual: true,
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
      XmlLang: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      XmlType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaType;
        },
        isNullable: true,
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  XPathNodeIterator: {
    kind: "class",
    members: {
      XPathNodeIterator: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MoveNext: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      Current: {
        kind: "property",
        type: () => {
          return XPath.XPathNavigator;
        },
        isNullable: true,
        isAbstract: true,
      },
      CurrentPosition: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  XPathNodeType: {
    kind: "enum",
    members: {
      Root: {
        kind: "field",
        type: () => {
          return XPath.XPathNodeType;
        },
      },
      Element: {
        kind: "field",
        type: () => {
          return XPath.XPathNodeType;
        },
      },
      Attribute: {
        kind: "field",
        type: () => {
          return XPath.XPathNodeType;
        },
      },
      Namespace: {
        kind: "field",
        type: () => {
          return XPath.XPathNodeType;
        },
      },
      Text: {
        kind: "field",
        type: () => {
          return XPath.XPathNodeType;
        },
      },
      SignificantWhitespace: {
        kind: "field",
        type: () => {
          return XPath.XPathNodeType;
        },
      },
      Whitespace: {
        kind: "field",
        type: () => {
          return XPath.XPathNodeType;
        },
      },
      ProcessingInstruction: {
        kind: "field",
        type: () => {
          return XPath.XPathNodeType;
        },
      },
      Comment: {
        kind: "field",
        type: () => {
          return XPath.XPathNodeType;
        },
      },
      All: {
        kind: "field",
        type: () => {
          return XPath.XPathNodeType;
        },
      },
    },
  },
  XPathResultType: {
    kind: "enum",
    members: {
      Number: {
        kind: "field",
        type: () => {
          return XPath.XPathResultType;
        },
      },
      Navigator: {
        kind: "field",
        type: () => {
          return XPath.XPathResultType;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return XPath.XPathResultType;
        },
      },
      Boolean: {
        kind: "field",
        type: () => {
          return XPath.XPathResultType;
        },
      },
      NodeSet: {
        kind: "field",
        type: () => {
          return XPath.XPathResultType;
        },
      },
      Any: {
        kind: "field",
        type: () => {
          return XPath.XPathResultType;
        },
      },
      Error: {
        kind: "field",
        type: () => {
          return XPath.XPathResultType;
        },
      },
    },
  },
  XmlCaseOrder: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return XPath.XmlCaseOrder;
        },
      },
      UpperFirst: {
        kind: "field",
        type: () => {
          return XPath.XmlCaseOrder;
        },
      },
      LowerFirst: {
        kind: "field",
        type: () => {
          return XPath.XmlCaseOrder;
        },
      },
    },
  },
  XmlDataType: {
    kind: "enum",
    members: {
      Text: {
        kind: "field",
        type: () => {
          return XPath.XmlDataType;
        },
      },
      Number: {
        kind: "field",
        type: () => {
          return XPath.XmlDataType;
        },
      },
    },
  },
  XmlSortOrder: {
    kind: "enum",
    members: {
      Ascending: {
        kind: "field",
        type: () => {
          return XPath.XmlSortOrder;
        },
      },
      Descending: {
        kind: "field",
        type: () => {
          return XPath.XmlSortOrder;
        },
      },
    },
  },
});
export default XPath
