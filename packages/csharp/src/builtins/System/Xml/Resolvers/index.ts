import Generic from "../../Collections/Generic/index.js";
import Net from "../../Net/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ResolversLibrary = LibrarySymbolReference & {
  XmlKnownDtds: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Xhtml10: LibrarySymbolReference;
    Rss091: LibrarySymbolReference;
    All: LibrarySymbolReference
  };
  XmlPreloadedResolver: LibrarySymbolReference & {
    XmlPreloadedResolver: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    GetEntity: LibrarySymbolReference;
    GetEntityAsync: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    ResolveUri: LibrarySymbolReference;
    SupportsType: LibrarySymbolReference;
    Credentials: LibrarySymbolReference;
    PreloadedUris: LibrarySymbolReference
  }
};
const Resolvers: ResolversLibrary = createLibrary("System.Xml.Resolvers", {
  XmlKnownDtds: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Resolvers.XmlKnownDtds;
        },
      },
      Xhtml10: {
        kind: "field",
        type: () => {
          return Resolvers.XmlKnownDtds;
        },
      },
      Rss091: {
        kind: "field",
        type: () => {
          return Resolvers.XmlKnownDtds;
        },
      },
      All: {
        kind: "field",
        type: () => {
          return Resolvers.XmlKnownDtds;
        },
      },
    },
  },
  XmlPreloadedResolver: {
    kind: "class",
    members: {
      XmlPreloadedResolver: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
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
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResolveUri: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SupportsType: {
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
      PreloadedUris: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
      },
    },
  },
});
export default Resolvers
