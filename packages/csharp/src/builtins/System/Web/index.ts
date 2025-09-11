import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type WebLibrary = LibrarySymbolReference & {
  HttpUtility: LibrarySymbolReference & {
    HttpUtility: LibrarySymbolReference;
    HtmlAttributeEncode: LibrarySymbolReference;
    HtmlDecode: LibrarySymbolReference;
    HtmlEncode: LibrarySymbolReference;
    JavaScriptStringEncode: LibrarySymbolReference;
    ParseQueryString: LibrarySymbolReference;
    UrlDecode: LibrarySymbolReference;
    UrlDecodeToBytes: LibrarySymbolReference;
    UrlEncode: LibrarySymbolReference;
    UrlEncodeToBytes: LibrarySymbolReference;
    UrlEncodeUnicode: LibrarySymbolReference;
    UrlEncodeUnicodeToBytes: LibrarySymbolReference;
    UrlPathEncode: LibrarySymbolReference
  };
  IHtmlString: LibrarySymbolReference & {
    ToHtmlString: LibrarySymbolReference
  }
};
const Web: WebLibrary = createLibrary("System.Web", {
  HttpUtility: {
    kind: "class",
    members: {
      HttpUtility: {
        kind: "method",
        methodKind: "constructor",
      },
      HtmlAttributeEncode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HtmlDecode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HtmlEncode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      JavaScriptStringEncode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ParseQueryString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UrlDecode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UrlDecodeToBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UrlEncode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UrlEncodeToBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UrlEncodeUnicode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UrlEncodeUnicodeToBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UrlPathEncode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  IHtmlString: {
    kind: "interface",
    members: {
      ToHtmlString: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
});
export default Web
