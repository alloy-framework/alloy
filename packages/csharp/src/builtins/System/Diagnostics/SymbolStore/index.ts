import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type SymbolStoreLibrary = LibrarySymbolReference & {
  ISymbolBinder: LibrarySymbolReference & {
    GetReader: LibrarySymbolReference
  };
  ISymbolBinder1: LibrarySymbolReference & {
    GetReader: LibrarySymbolReference
  };
  ISymbolDocument: LibrarySymbolReference & {
    FindClosestLine: LibrarySymbolReference;
    GetCheckSum: LibrarySymbolReference;
    GetSourceRange: LibrarySymbolReference;
    CheckSumAlgorithmId: LibrarySymbolReference;
    DocumentType: LibrarySymbolReference;
    HasEmbeddedSource: LibrarySymbolReference;
    Language: LibrarySymbolReference;
    LanguageVendor: LibrarySymbolReference;
    SourceLength: LibrarySymbolReference;
    URL: LibrarySymbolReference
  };
  ISymbolDocumentWriter: LibrarySymbolReference & {
    SetCheckSum: LibrarySymbolReference;
    SetSource: LibrarySymbolReference
  };
  ISymbolMethod: LibrarySymbolReference & {
    GetNamespace: LibrarySymbolReference;
    GetOffset: LibrarySymbolReference;
    GetParameters: LibrarySymbolReference;
    GetRanges: LibrarySymbolReference;
    GetScope: LibrarySymbolReference;
    GetSequencePoints: LibrarySymbolReference;
    GetSourceStartEnd: LibrarySymbolReference;
    RootScope: LibrarySymbolReference;
    SequencePointCount: LibrarySymbolReference;
    Token: LibrarySymbolReference
  };
  ISymbolNamespace: LibrarySymbolReference & {
    GetNamespaces: LibrarySymbolReference;
    GetVariables: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  ISymbolReader: LibrarySymbolReference & {
    GetDocument: LibrarySymbolReference;
    GetDocuments: LibrarySymbolReference;
    GetGlobalVariables: LibrarySymbolReference;
    GetMethod: LibrarySymbolReference;
    GetMethodFromDocumentPosition: LibrarySymbolReference;
    GetNamespaces: LibrarySymbolReference;
    GetSymAttribute: LibrarySymbolReference;
    GetVariables: LibrarySymbolReference;
    UserEntryPoint: LibrarySymbolReference
  };
  ISymbolScope: LibrarySymbolReference & {
    GetChildren: LibrarySymbolReference;
    GetLocals: LibrarySymbolReference;
    GetNamespaces: LibrarySymbolReference;
    EndOffset: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    Parent: LibrarySymbolReference;
    StartOffset: LibrarySymbolReference
  };
  ISymbolVariable: LibrarySymbolReference & {
    GetSignature: LibrarySymbolReference;
    AddressField1: LibrarySymbolReference;
    AddressField2: LibrarySymbolReference;
    AddressField3: LibrarySymbolReference;
    AddressKind: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    EndOffset: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    StartOffset: LibrarySymbolReference
  };
  ISymbolWriter: LibrarySymbolReference & {
    Close: LibrarySymbolReference;
    CloseMethod: LibrarySymbolReference;
    CloseNamespace: LibrarySymbolReference;
    CloseScope: LibrarySymbolReference;
    DefineDocument: LibrarySymbolReference;
    DefineField: LibrarySymbolReference;
    DefineGlobalVariable: LibrarySymbolReference;
    DefineLocalVariable: LibrarySymbolReference;
    DefineParameter: LibrarySymbolReference;
    DefineSequencePoints: LibrarySymbolReference;
    Initialize: LibrarySymbolReference;
    OpenMethod: LibrarySymbolReference;
    OpenNamespace: LibrarySymbolReference;
    OpenScope: LibrarySymbolReference;
    SetMethodSourceRange: LibrarySymbolReference;
    SetScopeRange: LibrarySymbolReference;
    SetSymAttribute: LibrarySymbolReference;
    SetUnderlyingWriter: LibrarySymbolReference;
    SetUserEntryPoint: LibrarySymbolReference;
    UsingNamespace: LibrarySymbolReference
  };
  SymAddressKind: LibrarySymbolReference & {
    ILOffset: LibrarySymbolReference;
    NativeRVA: LibrarySymbolReference;
    NativeRegister: LibrarySymbolReference;
    NativeRegisterRelative: LibrarySymbolReference;
    NativeOffset: LibrarySymbolReference;
    NativeRegisterRegister: LibrarySymbolReference;
    NativeRegisterStack: LibrarySymbolReference;
    NativeStackRegister: LibrarySymbolReference;
    BitField: LibrarySymbolReference;
    NativeSectionOffset: LibrarySymbolReference
  };
  SymDocumentType: LibrarySymbolReference & {
    Text: LibrarySymbolReference;
    SymDocumentType: LibrarySymbolReference
  };
  SymLanguageType: LibrarySymbolReference & {
    Basic: LibrarySymbolReference;
    C: LibrarySymbolReference;
    Cobol: LibrarySymbolReference;
    CPlusPlus: LibrarySymbolReference;
    CSharp: LibrarySymbolReference;
    ILAssembly: LibrarySymbolReference;
    Java: LibrarySymbolReference;
    JScript: LibrarySymbolReference;
    MCPlusPlus: LibrarySymbolReference;
    Pascal: LibrarySymbolReference;
    SMC: LibrarySymbolReference;
    SymLanguageType: LibrarySymbolReference
  };
  SymLanguageVendor: LibrarySymbolReference & {
    Microsoft: LibrarySymbolReference;
    SymLanguageVendor: LibrarySymbolReference
  };
  SymbolToken: LibrarySymbolReference & {
    SymbolToken: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetToken: LibrarySymbolReference
  }
};
const SymbolStore: SymbolStoreLibrary = createLibrary("System.Diagnostics.SymbolStore", {
  ISymbolBinder: {
    kind: "interface",
    members: {
      GetReader: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISymbolBinder1: {
    kind: "interface",
    members: {
      GetReader: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISymbolDocument: {
    kind: "interface",
    members: {
      FindClosestLine: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCheckSum: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSourceRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      CheckSumAlgorithmId: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      DocumentType: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      HasEmbeddedSource: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Language: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      LanguageVendor: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      SourceLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      URL: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  ISymbolDocumentWriter: {
    kind: "interface",
    members: {
      SetCheckSum: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetSource: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISymbolMethod: {
    kind: "interface",
    members: {
      GetNamespace: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOffset: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetParameters: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetRanges: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetScope: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSequencePoints: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSourceStartEnd: {
        kind: "method",
        methodKind: "ordinary",
      },
      RootScope: {
        kind: "property",
        type: () => {
          return SymbolStore.ISymbolScope;
        },
      },
      SequencePointCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Token: {
        kind: "property",
        type: () => {
          return SymbolStore.SymbolToken;
        },
      },
    },
  },
  ISymbolNamespace: {
    kind: "interface",
    members: {
      GetNamespaces: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetVariables: {
        kind: "method",
        methodKind: "ordinary",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  ISymbolReader: {
    kind: "interface",
    members: {
      GetDocument: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDocuments: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetGlobalVariables: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMethodFromDocumentPosition: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNamespaces: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSymAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetVariables: {
        kind: "method",
        methodKind: "ordinary",
      },
      UserEntryPoint: {
        kind: "property",
        type: () => {
          return SymbolStore.SymbolToken;
        },
      },
    },
  },
  ISymbolScope: {
    kind: "interface",
    members: {
      GetChildren: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetLocals: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNamespaces: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Method: {
        kind: "property",
        type: () => {
          return SymbolStore.ISymbolMethod;
        },
      },
      Parent: {
        kind: "property",
        type: () => {
          return SymbolStore.ISymbolScope;
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
  ISymbolVariable: {
    kind: "interface",
    members: {
      GetSignature: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddressField1: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      AddressField2: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      AddressField3: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      AddressKind: {
        kind: "property",
        type: () => {
          return SymbolStore.SymAddressKind;
        },
      },
      Attributes: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      EndOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
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
  ISymbolWriter: {
    kind: "interface",
    members: {
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      CloseMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      CloseNamespace: {
        kind: "method",
        methodKind: "ordinary",
      },
      CloseScope: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineDocument: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineField: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineGlobalVariable: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineLocalVariable: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefineSequencePoints: {
        kind: "method",
        methodKind: "ordinary",
      },
      Initialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenNamespace: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenScope: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetMethodSourceRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetScopeRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetSymAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetUnderlyingWriter: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetUserEntryPoint: {
        kind: "method",
        methodKind: "ordinary",
      },
      UsingNamespace: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  SymAddressKind: {
    kind: "enum",
    members: {
      ILOffset: {
        kind: "field",
        type: () => {
          return SymbolStore.SymAddressKind;
        },
      },
      NativeRVA: {
        kind: "field",
        type: () => {
          return SymbolStore.SymAddressKind;
        },
      },
      NativeRegister: {
        kind: "field",
        type: () => {
          return SymbolStore.SymAddressKind;
        },
      },
      NativeRegisterRelative: {
        kind: "field",
        type: () => {
          return SymbolStore.SymAddressKind;
        },
      },
      NativeOffset: {
        kind: "field",
        type: () => {
          return SymbolStore.SymAddressKind;
        },
      },
      NativeRegisterRegister: {
        kind: "field",
        type: () => {
          return SymbolStore.SymAddressKind;
        },
      },
      NativeRegisterStack: {
        kind: "field",
        type: () => {
          return SymbolStore.SymAddressKind;
        },
      },
      NativeStackRegister: {
        kind: "field",
        type: () => {
          return SymbolStore.SymAddressKind;
        },
      },
      BitField: {
        kind: "field",
        type: () => {
          return SymbolStore.SymAddressKind;
        },
      },
      NativeSectionOffset: {
        kind: "field",
        type: () => {
          return SymbolStore.SymAddressKind;
        },
      },
    },
  },
  SymDocumentType: {
    kind: "class",
    members: {
      Text: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SymDocumentType: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  SymLanguageType: {
    kind: "class",
    members: {
      Basic: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      C: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Cobol: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      CPlusPlus: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      CSharp: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ILAssembly: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Java: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      JScript: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MCPlusPlus: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Pascal: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SMC: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SymLanguageType: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  SymLanguageVendor: {
    kind: "class",
    members: {
      Microsoft: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SymLanguageVendor: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  SymbolToken: {
    kind: "struct",
    members: {
      SymbolToken: {
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
        isOverride: true,
      },
      GetToken: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
});
export default SymbolStore
