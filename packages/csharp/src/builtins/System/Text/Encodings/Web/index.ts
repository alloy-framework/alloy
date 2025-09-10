import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type WebLibrary = LibrarySymbolReference & {
  HtmlEncoder: LibrarySymbolReference & {
    HtmlEncoder: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Default: LibrarySymbolReference
  };
  JavaScriptEncoder: LibrarySymbolReference & {
    JavaScriptEncoder: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    UnsafeRelaxedJsonEscaping: LibrarySymbolReference
  };
  TextEncoder: LibrarySymbolReference & {
    TextEncoder: LibrarySymbolReference;
    Encode: LibrarySymbolReference;
    EncodeUtf8: LibrarySymbolReference
  };
  TextEncoderSettings: LibrarySymbolReference & {
    TextEncoderSettings: LibrarySymbolReference;
    AllowCharacter: LibrarySymbolReference;
    AllowCharacters: LibrarySymbolReference;
    AllowCodePoints: LibrarySymbolReference;
    AllowRange: LibrarySymbolReference;
    AllowRanges: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    ForbidCharacter: LibrarySymbolReference;
    ForbidCharacters: LibrarySymbolReference;
    ForbidRange: LibrarySymbolReference;
    ForbidRanges: LibrarySymbolReference;
    GetAllowedCodePoints: LibrarySymbolReference
  };
  UrlEncoder: LibrarySymbolReference & {
    UrlEncoder: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Default: LibrarySymbolReference
  }
};
const Web: WebLibrary = createLibrary("System.Text.Encodings.Web", {
  HtmlEncoder: {
    kind: "class",
    members: {
      HtmlEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Default: {
        kind: "property",
        type: () => {
          return Web.HtmlEncoder;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  JavaScriptEncoder: {
    kind: "class",
    members: {
      JavaScriptEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Default: {
        kind: "property",
        type: () => {
          return Web.JavaScriptEncoder;
        },
        isStatic: true,
      },
      UnsafeRelaxedJsonEscaping: {
        kind: "property",
        type: () => {
          return Web.JavaScriptEncoder;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  TextEncoder: {
    kind: "class",
    members: {
      TextEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Encode: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EncodeUtf8: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  TextEncoderSettings: {
    kind: "class",
    members: {
      TextEncoderSettings: {
        kind: "method",
        methodKind: "constructor",
      },
      AllowCharacter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AllowCharacters: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AllowCodePoints: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AllowRange: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AllowRanges: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ForbidCharacter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ForbidCharacters: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ForbidRange: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ForbidRanges: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetAllowedCodePoints: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  UrlEncoder: {
    kind: "class",
    members: {
      UrlEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Default: {
        kind: "property",
        type: () => {
          return Web.UrlEncoder;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
});
export default Web
