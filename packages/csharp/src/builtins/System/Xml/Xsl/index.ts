import System from "../../index.js";
import Xml from "../index.js";
import XPath from "../XPath/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type XslLibrary = LibrarySymbolReference & {
  IXsltContextFunction: LibrarySymbolReference & {
    Invoke: LibrarySymbolReference;
    ArgTypes: LibrarySymbolReference;
    Maxargs: LibrarySymbolReference;
    Minargs: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  };
  IXsltContextVariable: LibrarySymbolReference & {
    Evaluate: LibrarySymbolReference;
    IsLocal: LibrarySymbolReference;
    IsParam: LibrarySymbolReference;
    VariableType: LibrarySymbolReference
  };
  XslCompiledTransform: LibrarySymbolReference & {
    XslCompiledTransform: LibrarySymbolReference;
    Load: LibrarySymbolReference;
    Transform: LibrarySymbolReference;
    OutputSettings: LibrarySymbolReference
  };
  XslTransform: LibrarySymbolReference & {
    XslTransform: LibrarySymbolReference;
    Load: LibrarySymbolReference;
    Transform: LibrarySymbolReference;
    XmlResolver: LibrarySymbolReference
  };
  XsltArgumentList: LibrarySymbolReference & {
    XsltArgumentList: LibrarySymbolReference;
    AddExtensionObject: LibrarySymbolReference;
    AddParam: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    GetExtensionObject: LibrarySymbolReference;
    GetParam: LibrarySymbolReference;
    RemoveExtensionObject: LibrarySymbolReference;
    RemoveParam: LibrarySymbolReference
  };
  XsltCompileException: LibrarySymbolReference & {
    XsltCompileException: LibrarySymbolReference
  };
  XsltContext: LibrarySymbolReference & {
    XsltContext: LibrarySymbolReference;
    CompareDocument: LibrarySymbolReference;
    PreserveWhitespace: LibrarySymbolReference;
    ResolveFunction: LibrarySymbolReference;
    ResolveVariable: LibrarySymbolReference;
    Whitespace: LibrarySymbolReference
  };
  XsltException: LibrarySymbolReference & {
    XsltException: LibrarySymbolReference;
    LineNumber: LibrarySymbolReference;
    LinePosition: LibrarySymbolReference;
    Message: LibrarySymbolReference;
    SourceUri: LibrarySymbolReference
  };
  XsltMessageEncounteredEventArgs: LibrarySymbolReference & {
    XsltMessageEncounteredEventArgs: LibrarySymbolReference;
    Message: LibrarySymbolReference
  };
  XsltMessageEncounteredEventHandler: LibrarySymbolReference & {
    XsltMessageEncounteredEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  XsltSettings: LibrarySymbolReference & {
    XsltSettings: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    EnableDocumentFunction: LibrarySymbolReference;
    EnableScript: LibrarySymbolReference;
    TrustedXslt: LibrarySymbolReference
  }
};
const Xsl: XslLibrary = createLibrary("System.Xml.Xsl", {
  IXsltContextFunction: {
    kind: "interface",
    members: {
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
      },
      ArgTypes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      Maxargs: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Minargs: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return XPath.XPathResultType;
        },
      },
    },
  },
  IXsltContextVariable: {
    kind: "interface",
    members: {
      Evaluate: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsLocal: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsParam: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      VariableType: {
        kind: "property",
        type: () => {
          return XPath.XPathResultType;
        },
      },
    },
  },
  XslCompiledTransform: {
    kind: "class",
    members: {
      XslCompiledTransform: {
        kind: "method",
        methodKind: "constructor",
      },
      Load: {
        kind: "method",
        methodKind: "ordinary",
      },
      Transform: {
        kind: "method",
        methodKind: "ordinary",
      },
      OutputSettings: {
        kind: "property",
        type: () => {
          return Xml.XmlWriterSettings;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  XslTransform: {
    kind: "class",
    members: {
      XslTransform: {
        kind: "method",
        methodKind: "constructor",
      },
      Load: {
        kind: "method",
        methodKind: "ordinary",
      },
      Transform: {
        kind: "method",
        methodKind: "ordinary",
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
  XsltArgumentList: {
    kind: "class",
    members: {
      XsltArgumentList: {
        kind: "method",
        methodKind: "constructor",
      },
      AddExtensionObject: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddParam: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetExtensionObject: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetParam: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveExtensionObject: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveParam: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  XsltCompileException: {
    kind: "class",
    members: {
      XsltCompileException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XsltContext: {
    kind: "class",
    members: {
      XsltContext: {
        kind: "method",
        methodKind: "constructor",
      },
      CompareDocument: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      PreserveWhitespace: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ResolveFunction: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ResolveVariable: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Whitespace: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  XsltException: {
    kind: "class",
    members: {
      XsltException: {
        kind: "method",
        methodKind: "constructor",
      },
      LineNumber: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      LinePosition: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
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
        isVirtual: true,
      },
    },
  },
  XsltMessageEncounteredEventArgs: {
    kind: "class",
    members: {
      XsltMessageEncounteredEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  XsltMessageEncounteredEventHandler: {
    kind: "generic",
    members: {
      XsltMessageEncounteredEventHandler: {
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
  XsltSettings: {
    kind: "class",
    members: {
      XsltSettings: {
        kind: "method",
        methodKind: "constructor",
      },
      Default: {
        kind: "property",
        type: () => {
          return Xsl.XsltSettings;
        },
        isStatic: true,
      },
      EnableDocumentFunction: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      EnableScript: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      TrustedXslt: {
        kind: "property",
        type: () => {
          return Xsl.XsltSettings;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
});
export default Xsl
