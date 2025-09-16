import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type CacheLibrary = LibrarySymbolReference & {
  HttpCacheAgeControl: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    MinFresh: LibrarySymbolReference;
    MaxAge: LibrarySymbolReference;
    MaxAgeAndMinFresh: LibrarySymbolReference;
    MaxStale: LibrarySymbolReference;
    MaxAgeAndMaxStale: LibrarySymbolReference
  };
  HttpRequestCacheLevel: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    BypassCache: LibrarySymbolReference;
    CacheOnly: LibrarySymbolReference;
    CacheIfAvailable: LibrarySymbolReference;
    Revalidate: LibrarySymbolReference;
    Reload: LibrarySymbolReference;
    NoCacheNoStore: LibrarySymbolReference;
    CacheOrNextCacheOnly: LibrarySymbolReference;
    Refresh: LibrarySymbolReference
  };
  HttpRequestCachePolicy: LibrarySymbolReference & {
    HttpRequestCachePolicy: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    CacheSyncDate: LibrarySymbolReference;
    Level: LibrarySymbolReference;
    MaxAge: LibrarySymbolReference;
    MaxStale: LibrarySymbolReference;
    MinFresh: LibrarySymbolReference
  };
  RequestCacheLevel: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    BypassCache: LibrarySymbolReference;
    CacheOnly: LibrarySymbolReference;
    CacheIfAvailable: LibrarySymbolReference;
    Revalidate: LibrarySymbolReference;
    Reload: LibrarySymbolReference;
    NoCacheNoStore: LibrarySymbolReference
  };
  RequestCachePolicy: LibrarySymbolReference & {
    RequestCachePolicy: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Level: LibrarySymbolReference
  }
};
const Cache: CacheLibrary = createLibrary("System.Net.Cache", {
  HttpCacheAgeControl: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Cache.HttpCacheAgeControl;
        },
      },
      MinFresh: {
        kind: "field",
        type: () => {
          return Cache.HttpCacheAgeControl;
        },
      },
      MaxAge: {
        kind: "field",
        type: () => {
          return Cache.HttpCacheAgeControl;
        },
      },
      MaxAgeAndMinFresh: {
        kind: "field",
        type: () => {
          return Cache.HttpCacheAgeControl;
        },
      },
      MaxStale: {
        kind: "field",
        type: () => {
          return Cache.HttpCacheAgeControl;
        },
      },
      MaxAgeAndMaxStale: {
        kind: "field",
        type: () => {
          return Cache.HttpCacheAgeControl;
        },
      },
    },
  },
  HttpRequestCacheLevel: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Cache.HttpRequestCacheLevel;
        },
      },
      BypassCache: {
        kind: "field",
        type: () => {
          return Cache.HttpRequestCacheLevel;
        },
      },
      CacheOnly: {
        kind: "field",
        type: () => {
          return Cache.HttpRequestCacheLevel;
        },
      },
      CacheIfAvailable: {
        kind: "field",
        type: () => {
          return Cache.HttpRequestCacheLevel;
        },
      },
      Revalidate: {
        kind: "field",
        type: () => {
          return Cache.HttpRequestCacheLevel;
        },
      },
      Reload: {
        kind: "field",
        type: () => {
          return Cache.HttpRequestCacheLevel;
        },
      },
      NoCacheNoStore: {
        kind: "field",
        type: () => {
          return Cache.HttpRequestCacheLevel;
        },
      },
      CacheOrNextCacheOnly: {
        kind: "field",
        type: () => {
          return Cache.HttpRequestCacheLevel;
        },
      },
      Refresh: {
        kind: "field",
        type: () => {
          return Cache.HttpRequestCacheLevel;
        },
      },
    },
  },
  HttpRequestCachePolicy: {
    kind: "class",
    members: {
      HttpRequestCachePolicy: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CacheSyncDate: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      Level: {
        kind: "property",
        type: () => {
          return Cache.HttpRequestCacheLevel;
        },
      },
      MaxAge: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      MaxStale: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      MinFresh: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
    },
  },
  RequestCacheLevel: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Cache.RequestCacheLevel;
        },
      },
      BypassCache: {
        kind: "field",
        type: () => {
          return Cache.RequestCacheLevel;
        },
      },
      CacheOnly: {
        kind: "field",
        type: () => {
          return Cache.RequestCacheLevel;
        },
      },
      CacheIfAvailable: {
        kind: "field",
        type: () => {
          return Cache.RequestCacheLevel;
        },
      },
      Revalidate: {
        kind: "field",
        type: () => {
          return Cache.RequestCacheLevel;
        },
      },
      Reload: {
        kind: "field",
        type: () => {
          return Cache.RequestCacheLevel;
        },
      },
      NoCacheNoStore: {
        kind: "field",
        type: () => {
          return Cache.RequestCacheLevel;
        },
      },
    },
  },
  RequestCachePolicy: {
    kind: "class",
    members: {
      RequestCachePolicy: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Level: {
        kind: "property",
        type: () => {
          return Cache.RequestCacheLevel;
        },
      },
    },
  },
});
export default Cache
