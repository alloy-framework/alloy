import Generic from "../../../Collections/Generic/index.js";
import System from "../../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type HeadersLibrary = LibrarySymbolReference & {
  AuthenticationHeaderValue: LibrarySymbolReference & {
    AuthenticationHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Parameter: LibrarySymbolReference;
    Scheme: LibrarySymbolReference
  };
  CacheControlHeaderValue: LibrarySymbolReference & {
    CacheControlHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Extensions: LibrarySymbolReference;
    MaxAge: LibrarySymbolReference;
    MaxStale: LibrarySymbolReference;
    MaxStaleLimit: LibrarySymbolReference;
    MinFresh: LibrarySymbolReference;
    MustRevalidate: LibrarySymbolReference;
    NoCache: LibrarySymbolReference;
    NoCacheHeaders: LibrarySymbolReference;
    NoStore: LibrarySymbolReference;
    NoTransform: LibrarySymbolReference;
    OnlyIfCached: LibrarySymbolReference;
    Private: LibrarySymbolReference;
    PrivateHeaders: LibrarySymbolReference;
    ProxyRevalidate: LibrarySymbolReference;
    Public: LibrarySymbolReference;
    SharedMaxAge: LibrarySymbolReference
  };
  ContentDispositionHeaderValue: LibrarySymbolReference & {
    ContentDispositionHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    CreationDate: LibrarySymbolReference;
    DispositionType: LibrarySymbolReference;
    FileName: LibrarySymbolReference;
    FileNameStar: LibrarySymbolReference;
    ModificationDate: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Parameters: LibrarySymbolReference;
    ReadDate: LibrarySymbolReference;
    Size: LibrarySymbolReference
  };
  ContentRangeHeaderValue: LibrarySymbolReference & {
    ContentRangeHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    From: LibrarySymbolReference;
    HasLength: LibrarySymbolReference;
    HasRange: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    To: LibrarySymbolReference;
    Unit: LibrarySymbolReference
  };
  EntityTagHeaderValue: LibrarySymbolReference & {
    EntityTagHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Any: LibrarySymbolReference;
    IsWeak: LibrarySymbolReference;
    Tag: LibrarySymbolReference
  };
  HeaderStringValues: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  HttpContentHeaders: LibrarySymbolReference & {
    Allow: LibrarySymbolReference;
    ContentDisposition: LibrarySymbolReference;
    ContentEncoding: LibrarySymbolReference;
    ContentLanguage: LibrarySymbolReference;
    ContentLength: LibrarySymbolReference;
    ContentLocation: LibrarySymbolReference;
    ContentMD5: LibrarySymbolReference;
    ContentRange: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    Expires: LibrarySymbolReference;
    LastModified: LibrarySymbolReference
  };
  HttpHeaderValueCollection: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    ParseAdd: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParseAdd: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference
  };
  HttpHeaders: LibrarySymbolReference & {
    HttpHeaders: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetValues: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryAddWithoutValidation: LibrarySymbolReference;
    TryGetValues: LibrarySymbolReference;
    NonValidated: LibrarySymbolReference
  };
  HttpHeadersNonValidated: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  HttpRequestHeaders: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    AcceptCharset: LibrarySymbolReference;
    AcceptEncoding: LibrarySymbolReference;
    AcceptLanguage: LibrarySymbolReference;
    Authorization: LibrarySymbolReference;
    CacheControl: LibrarySymbolReference;
    Connection: LibrarySymbolReference;
    ConnectionClose: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    Expect: LibrarySymbolReference;
    ExpectContinue: LibrarySymbolReference;
    From: LibrarySymbolReference;
    Host: LibrarySymbolReference;
    IfMatch: LibrarySymbolReference;
    IfModifiedSince: LibrarySymbolReference;
    IfNoneMatch: LibrarySymbolReference;
    IfRange: LibrarySymbolReference;
    IfUnmodifiedSince: LibrarySymbolReference;
    MaxForwards: LibrarySymbolReference;
    Pragma: LibrarySymbolReference;
    Protocol: LibrarySymbolReference;
    ProxyAuthorization: LibrarySymbolReference;
    Range: LibrarySymbolReference;
    Referrer: LibrarySymbolReference;
    TE: LibrarySymbolReference;
    Trailer: LibrarySymbolReference;
    TransferEncoding: LibrarySymbolReference;
    TransferEncodingChunked: LibrarySymbolReference;
    Upgrade: LibrarySymbolReference;
    UserAgent: LibrarySymbolReference;
    Via: LibrarySymbolReference;
    Warning: LibrarySymbolReference
  };
  HttpResponseHeaders: LibrarySymbolReference & {
    AcceptRanges: LibrarySymbolReference;
    Age: LibrarySymbolReference;
    CacheControl: LibrarySymbolReference;
    Connection: LibrarySymbolReference;
    ConnectionClose: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    ETag: LibrarySymbolReference;
    Location: LibrarySymbolReference;
    Pragma: LibrarySymbolReference;
    ProxyAuthenticate: LibrarySymbolReference;
    RetryAfter: LibrarySymbolReference;
    Server: LibrarySymbolReference;
    Trailer: LibrarySymbolReference;
    TransferEncoding: LibrarySymbolReference;
    TransferEncodingChunked: LibrarySymbolReference;
    Upgrade: LibrarySymbolReference;
    Vary: LibrarySymbolReference;
    Via: LibrarySymbolReference;
    Warning: LibrarySymbolReference;
    WwwAuthenticate: LibrarySymbolReference
  };
  MediaTypeHeaderValue: LibrarySymbolReference & {
    MediaTypeHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    CharSet: LibrarySymbolReference;
    MediaType: LibrarySymbolReference;
    Parameters: LibrarySymbolReference
  };
  MediaTypeWithQualityHeaderValue: LibrarySymbolReference & {
    MediaTypeWithQualityHeaderValue: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Quality: LibrarySymbolReference
  };
  NameValueHeaderValue: LibrarySymbolReference & {
    NameValueHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  NameValueWithParametersHeaderValue: LibrarySymbolReference & {
    NameValueWithParametersHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Parameters: LibrarySymbolReference
  };
  ProductHeaderValue: LibrarySymbolReference & {
    ProductHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  ProductInfoHeaderValue: LibrarySymbolReference & {
    ProductInfoHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Comment: LibrarySymbolReference;
    Product: LibrarySymbolReference
  };
  RangeConditionHeaderValue: LibrarySymbolReference & {
    RangeConditionHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    EntityTag: LibrarySymbolReference
  };
  RangeHeaderValue: LibrarySymbolReference & {
    RangeHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Ranges: LibrarySymbolReference;
    Unit: LibrarySymbolReference
  };
  RangeItemHeaderValue: LibrarySymbolReference & {
    RangeItemHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    From: LibrarySymbolReference;
    To: LibrarySymbolReference
  };
  RetryConditionHeaderValue: LibrarySymbolReference & {
    RetryConditionHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    Delta: LibrarySymbolReference
  };
  StringWithQualityHeaderValue: LibrarySymbolReference & {
    StringWithQualityHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Quality: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  TransferCodingHeaderValue: LibrarySymbolReference & {
    TransferCodingHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Parameters: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  TransferCodingWithQualityHeaderValue: LibrarySymbolReference & {
    TransferCodingWithQualityHeaderValue: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Quality: LibrarySymbolReference
  };
  ViaHeaderValue: LibrarySymbolReference & {
    ViaHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Comment: LibrarySymbolReference;
    ProtocolName: LibrarySymbolReference;
    ProtocolVersion: LibrarySymbolReference;
    ReceivedBy: LibrarySymbolReference
  };
  WarningHeaderValue: LibrarySymbolReference & {
    WarningHeaderValue: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Agent: LibrarySymbolReference;
    Code: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    Text: LibrarySymbolReference
  }
};
const Headers: HeadersLibrary = createLibrary("System.Net.Http.Headers", {
  AuthenticationHeaderValue: {
    kind: "class",
    members: {
      AuthenticationHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parameter: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Scheme: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  CacheControlHeaderValue: {
    kind: "class",
    members: {
      CacheControlHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Extensions: {
        kind: "property",
        type: () => {
          return Generic.ICollection;
        },
      },
      MaxAge: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
        isNullable: true,
      },
      MaxStale: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MaxStaleLimit: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
        isNullable: true,
      },
      MinFresh: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
        isNullable: true,
      },
      MustRevalidate: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      NoCache: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      NoCacheHeaders: {
        kind: "property",
        type: () => {
          return Generic.ICollection;
        },
      },
      NoStore: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      NoTransform: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      OnlyIfCached: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Private: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PrivateHeaders: {
        kind: "property",
        type: () => {
          return Generic.ICollection;
        },
      },
      ProxyRevalidate: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Public: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SharedMaxAge: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
        isNullable: true,
      },
    },
  },
  ContentDispositionHeaderValue: {
    kind: "class",
    members: {
      ContentDispositionHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreationDate: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
        isNullable: true,
      },
      DispositionType: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      FileName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      FileNameStar: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ModificationDate: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
        isNullable: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Parameters: {
        kind: "property",
        type: () => {
          return Generic.ICollection;
        },
      },
      ReadDate: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
        isNullable: true,
      },
      Size: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isNullable: true,
      },
    },
  },
  ContentRangeHeaderValue: {
    kind: "class",
    members: {
      ContentRangeHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      From: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isNullable: true,
      },
      HasLength: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      HasRange: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isNullable: true,
      },
      To: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isNullable: true,
      },
      Unit: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  EntityTagHeaderValue: {
    kind: "class",
    members: {
      EntityTagHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Any: {
        kind: "property",
        type: () => {
          return Headers.EntityTagHeaderValue;
        },
        isStatic: true,
      },
      IsWeak: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Tag: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  HeaderStringValues: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          Dispose: {
            kind: "method",
            methodKind: "ordinary",
          },
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return System.String;
            },
          },
        },
      },
    },
  },
  HttpContentHeaders: {
    kind: "class",
    members: {
      Allow: {
        kind: "property",
        type: () => {
          return Generic.ICollection;
        },
      },
      ContentDisposition: {
        kind: "property",
        type: () => {
          return Headers.ContentDispositionHeaderValue;
        },
      },
      ContentEncoding: {
        kind: "property",
        type: () => {
          return Generic.ICollection;
        },
      },
      ContentLanguage: {
        kind: "property",
        type: () => {
          return Generic.ICollection;
        },
      },
      ContentLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isNullable: true,
      },
      ContentLocation: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isNullable: true,
      },
      ContentMD5: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      ContentRange: {
        kind: "property",
        type: () => {
          return Headers.ContentRangeHeaderValue;
        },
      },
      ContentType: {
        kind: "property",
        type: () => {
          return Headers.MediaTypeHeaderValue;
        },
        isNullable: true,
      },
      Expires: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
        isNullable: true,
      },
      LastModified: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  HttpHeaderValueCollection: {
    kind: "class",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
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
      ParseAdd: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParseAdd: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  HttpHeaders: {
    kind: "class",
    members: {
      HttpHeaders: {
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
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetValues: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryAddWithoutValidation: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetValues: {
        kind: "method",
        methodKind: "ordinary",
      },
      NonValidated: {
        kind: "property",
        type: () => {
          return Headers.HttpHeadersNonValidated;
        },
      },
    },
    isAbstract: true,
  },
  HttpHeadersNonValidated: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          Dispose: {
            kind: "method",
            methodKind: "ordinary",
          },
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Generic.KeyValuePair;
            },
          },
        },
      },
    },
  },
  HttpRequestHeaders: {
    kind: "class",
    members: {
      Accept: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      AcceptCharset: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      AcceptEncoding: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      AcceptLanguage: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      Authorization: {
        kind: "property",
        type: () => {
          return Headers.AuthenticationHeaderValue;
        },
        isNullable: true,
      },
      CacheControl: {
        kind: "property",
        type: () => {
          return Headers.CacheControlHeaderValue;
        },
      },
      Connection: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      ConnectionClose: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      Date: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
        isNullable: true,
      },
      Expect: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      ExpectContinue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      From: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Host: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      IfMatch: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      IfModifiedSince: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
        isNullable: true,
      },
      IfNoneMatch: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      IfRange: {
        kind: "property",
        type: () => {
          return Headers.RangeConditionHeaderValue;
        },
        isNullable: true,
      },
      IfUnmodifiedSince: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
        isNullable: true,
      },
      MaxForwards: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isNullable: true,
      },
      Pragma: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      Protocol: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ProxyAuthorization: {
        kind: "property",
        type: () => {
          return Headers.AuthenticationHeaderValue;
        },
        isNullable: true,
      },
      Range: {
        kind: "property",
        type: () => {
          return Headers.RangeHeaderValue;
        },
      },
      Referrer: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isNullable: true,
      },
      TE: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      Trailer: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      TransferEncoding: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      TransferEncodingChunked: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      Upgrade: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      UserAgent: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      Via: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      Warning: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
    },
    isSealed: true,
  },
  HttpResponseHeaders: {
    kind: "class",
    members: {
      AcceptRanges: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      Age: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
        isNullable: true,
      },
      CacheControl: {
        kind: "property",
        type: () => {
          return Headers.CacheControlHeaderValue;
        },
      },
      Connection: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      ConnectionClose: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      Date: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
        isNullable: true,
      },
      ETag: {
        kind: "property",
        type: () => {
          return Headers.EntityTagHeaderValue;
        },
        isNullable: true,
      },
      Location: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isNullable: true,
      },
      Pragma: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      ProxyAuthenticate: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      RetryAfter: {
        kind: "property",
        type: () => {
          return Headers.RetryConditionHeaderValue;
        },
        isNullable: true,
      },
      Server: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      Trailer: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      TransferEncoding: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      TransferEncodingChunked: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      Upgrade: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      Vary: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      Via: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      Warning: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
      WwwAuthenticate: {
        kind: "property",
        type: () => {
          return Headers.HttpHeaderValueCollection;
        },
      },
    },
    isSealed: true,
  },
  MediaTypeHeaderValue: {
    kind: "class",
    members: {
      MediaTypeHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CharSet: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      MediaType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Parameters: {
        kind: "property",
        type: () => {
          return Generic.ICollection;
        },
      },
    },
  },
  MediaTypeWithQualityHeaderValue: {
    kind: "class",
    members: {
      MediaTypeWithQualityHeaderValue: {
        kind: "method",
        methodKind: "constructor",
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Quality: {
        kind: "property",
        type: () => {
          return System.Double;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  NameValueHeaderValue: {
    kind: "class",
    members: {
      NameValueHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Name: {
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
      },
    },
  },
  NameValueWithParametersHeaderValue: {
    kind: "class",
    members: {
      NameValueWithParametersHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parameters: {
        kind: "property",
        type: () => {
          return Generic.ICollection;
        },
      },
    },
  },
  ProductHeaderValue: {
    kind: "class",
    members: {
      ProductHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
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
  ProductInfoHeaderValue: {
    kind: "class",
    members: {
      ProductInfoHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Comment: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Product: {
        kind: "property",
        type: () => {
          return Headers.ProductHeaderValue;
        },
      },
    },
  },
  RangeConditionHeaderValue: {
    kind: "class",
    members: {
      RangeConditionHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Date: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
        isNullable: true,
      },
      EntityTag: {
        kind: "property",
        type: () => {
          return Headers.EntityTagHeaderValue;
        },
      },
    },
  },
  RangeHeaderValue: {
    kind: "class",
    members: {
      RangeHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ranges: {
        kind: "property",
        type: () => {
          return Generic.ICollection;
        },
      },
      Unit: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  RangeItemHeaderValue: {
    kind: "class",
    members: {
      RangeItemHeaderValue: {
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
      From: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isNullable: true,
      },
      To: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isNullable: true,
      },
    },
  },
  RetryConditionHeaderValue: {
    kind: "class",
    members: {
      RetryConditionHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Date: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
        isNullable: true,
      },
      Delta: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
        isNullable: true,
      },
    },
  },
  StringWithQualityHeaderValue: {
    kind: "class",
    members: {
      StringWithQualityHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Quality: {
        kind: "property",
        type: () => {
          return System.Double;
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
  TransferCodingHeaderValue: {
    kind: "class",
    members: {
      TransferCodingHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parameters: {
        kind: "property",
        type: () => {
          return Generic.ICollection;
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
  TransferCodingWithQualityHeaderValue: {
    kind: "class",
    members: {
      TransferCodingWithQualityHeaderValue: {
        kind: "method",
        methodKind: "constructor",
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Quality: {
        kind: "property",
        type: () => {
          return System.Double;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  ViaHeaderValue: {
    kind: "class",
    members: {
      ViaHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Comment: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ProtocolName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ProtocolVersion: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ReceivedBy: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  WarningHeaderValue: {
    kind: "class",
    members: {
      WarningHeaderValue: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Agent: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Code: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Date: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
        isNullable: true,
      },
      Text: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
});
export default Headers
