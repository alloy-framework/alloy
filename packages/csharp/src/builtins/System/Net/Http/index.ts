import Generic from "../../Collections/Generic/index.js";
import Diagnostics from "../../Diagnostics/index.js";
import Metrics from "../../Diagnostics/Metrics/index.js";
import System from "../../index.js";
import IO from "../../IO/index.js";
import Headers from "./Headers/index.js";
import Net from "../index.js";
import Security from "../Security/index.js";
import Authentication from "../../Security/Authentication/index.js";
import X509Certificates from "../../Security/Cryptography/X509Certificates/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Headers } from "./Headers/index.js";
export { default as Json } from "./Json/index.js";
export { default as Metrics } from "./Metrics/index.js";

type HttpLibrary = LibrarySymbolReference & {
  ByteArrayContent: LibrarySymbolReference & {
    ByteArrayContent: LibrarySymbolReference;
    CreateContentReadStream: LibrarySymbolReference;
    CreateContentReadStreamAsync: LibrarySymbolReference;
    SerializeToStream: LibrarySymbolReference;
    SerializeToStreamAsync: LibrarySymbolReference;
    TryComputeLength: LibrarySymbolReference
  };
  ClientCertificateOption: LibrarySymbolReference & {
    Manual: LibrarySymbolReference;
    Automatic: LibrarySymbolReference
  };
  DelegatingHandler: LibrarySymbolReference & {
    DelegatingHandler: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    SendAsync: LibrarySymbolReference;
    InnerHandler: LibrarySymbolReference
  };
  FormUrlEncodedContent: LibrarySymbolReference & {
    FormUrlEncodedContent: LibrarySymbolReference;
    SerializeToStreamAsync: LibrarySymbolReference
  };
  HeaderEncodingSelector: LibrarySymbolReference & {
    HeaderEncodingSelector: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  HttpClient: LibrarySymbolReference & {
    HttpClient: LibrarySymbolReference;
    CancelPendingRequests: LibrarySymbolReference;
    DeleteAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetAsync: LibrarySymbolReference;
    GetByteArrayAsync: LibrarySymbolReference;
    GetStreamAsync: LibrarySymbolReference;
    GetStringAsync: LibrarySymbolReference;
    PatchAsync: LibrarySymbolReference;
    PostAsync: LibrarySymbolReference;
    PutAsync: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    SendAsync: LibrarySymbolReference;
    BaseAddress: LibrarySymbolReference;
    DefaultProxy: LibrarySymbolReference;
    DefaultRequestHeaders: LibrarySymbolReference;
    DefaultRequestVersion: LibrarySymbolReference;
    DefaultVersionPolicy: LibrarySymbolReference;
    MaxResponseContentBufferSize: LibrarySymbolReference;
    Timeout: LibrarySymbolReference
  };
  HttpClientHandler: LibrarySymbolReference & {
    HttpClientHandler: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    SendAsync: LibrarySymbolReference;
    AllowAutoRedirect: LibrarySymbolReference;
    AutomaticDecompression: LibrarySymbolReference;
    CheckCertificateRevocationList: LibrarySymbolReference;
    ClientCertificateOptions: LibrarySymbolReference;
    ClientCertificates: LibrarySymbolReference;
    CookieContainer: LibrarySymbolReference;
    Credentials: LibrarySymbolReference;
    DangerousAcceptAnyServerCertificateValidator: LibrarySymbolReference;
    DefaultProxyCredentials: LibrarySymbolReference;
    MaxAutomaticRedirections: LibrarySymbolReference;
    MaxConnectionsPerServer: LibrarySymbolReference;
    MaxRequestContentBufferSize: LibrarySymbolReference;
    MaxResponseHeadersLength: LibrarySymbolReference;
    MeterFactory: LibrarySymbolReference;
    PreAuthenticate: LibrarySymbolReference;
    Properties: LibrarySymbolReference;
    Proxy: LibrarySymbolReference;
    ServerCertificateCustomValidationCallback: LibrarySymbolReference;
    SslProtocols: LibrarySymbolReference;
    SupportsAutomaticDecompression: LibrarySymbolReference;
    SupportsProxy: LibrarySymbolReference;
    SupportsRedirectConfiguration: LibrarySymbolReference;
    UseCookies: LibrarySymbolReference;
    UseDefaultCredentials: LibrarySymbolReference;
    UseProxy: LibrarySymbolReference
  };
  HttpCompletionOption: LibrarySymbolReference & {
    ResponseContentRead: LibrarySymbolReference;
    ResponseHeadersRead: LibrarySymbolReference
  };
  HttpContent: LibrarySymbolReference & {
    HttpContent: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    CopyToAsync: LibrarySymbolReference;
    CreateContentReadStream: LibrarySymbolReference;
    CreateContentReadStreamAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    LoadIntoBufferAsync: LibrarySymbolReference;
    ReadAsByteArrayAsync: LibrarySymbolReference;
    ReadAsStream: LibrarySymbolReference;
    ReadAsStreamAsync: LibrarySymbolReference;
    ReadAsStringAsync: LibrarySymbolReference;
    SerializeToStream: LibrarySymbolReference;
    SerializeToStreamAsync: LibrarySymbolReference;
    TryComputeLength: LibrarySymbolReference;
    Headers: LibrarySymbolReference
  };
  HttpIOException: LibrarySymbolReference & {
    HttpIOException: LibrarySymbolReference;
    HttpRequestError: LibrarySymbolReference;
    Message: LibrarySymbolReference
  };
  HttpKeepAlivePingPolicy: LibrarySymbolReference & {
    WithActiveRequests: LibrarySymbolReference;
    Always: LibrarySymbolReference
  };
  HttpMessageHandler: LibrarySymbolReference & {
    HttpMessageHandler: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    SendAsync: LibrarySymbolReference
  };
  HttpMessageInvoker: LibrarySymbolReference & {
    HttpMessageInvoker: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    SendAsync: LibrarySymbolReference
  };
  HttpMethod: LibrarySymbolReference & {
    HttpMethod: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Connect: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    Get: LibrarySymbolReference;
    Head: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    Options: LibrarySymbolReference;
    Patch: LibrarySymbolReference;
    Post: LibrarySymbolReference;
    Put: LibrarySymbolReference;
    Trace: LibrarySymbolReference
  };
  HttpProtocolException: LibrarySymbolReference & {
    HttpProtocolException: LibrarySymbolReference;
    ErrorCode: LibrarySymbolReference
  };
  HttpRequestError: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    NameResolutionError: LibrarySymbolReference;
    ConnectionError: LibrarySymbolReference;
    SecureConnectionError: LibrarySymbolReference;
    HttpProtocolError: LibrarySymbolReference;
    ExtendedConnectNotSupported: LibrarySymbolReference;
    VersionNegotiationError: LibrarySymbolReference;
    UserAuthenticationError: LibrarySymbolReference;
    ProxyTunnelError: LibrarySymbolReference;
    InvalidResponse: LibrarySymbolReference;
    ResponseEnded: LibrarySymbolReference;
    ConfigurationLimitExceeded: LibrarySymbolReference
  };
  HttpRequestException: LibrarySymbolReference & {
    HttpRequestException: LibrarySymbolReference;
    HttpRequestError: LibrarySymbolReference;
    StatusCode: LibrarySymbolReference
  };
  HttpRequestMessage: LibrarySymbolReference & {
    HttpRequestMessage: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Content: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    Options: LibrarySymbolReference;
    Properties: LibrarySymbolReference;
    RequestUri: LibrarySymbolReference;
    Version: LibrarySymbolReference;
    VersionPolicy: LibrarySymbolReference
  };
  HttpRequestOptions: LibrarySymbolReference & {
    HttpRequestOptions: LibrarySymbolReference
  };
  HttpRequestOptionsKey: LibrarySymbolReference & {
    HttpRequestOptionsKey: LibrarySymbolReference;
    Key: LibrarySymbolReference
  };
  HttpResponseMessage: LibrarySymbolReference & {
    HttpResponseMessage: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EnsureSuccessStatusCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Content: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    IsSuccessStatusCode: LibrarySymbolReference;
    ReasonPhrase: LibrarySymbolReference;
    RequestMessage: LibrarySymbolReference;
    StatusCode: LibrarySymbolReference;
    TrailingHeaders: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  HttpVersionPolicy: LibrarySymbolReference & {
    RequestVersionOrLower: LibrarySymbolReference;
    RequestVersionOrHigher: LibrarySymbolReference;
    RequestVersionExact: LibrarySymbolReference
  };
  MessageProcessingHandler: LibrarySymbolReference & {
    MessageProcessingHandler: LibrarySymbolReference;
    ProcessRequest: LibrarySymbolReference;
    ProcessResponse: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    SendAsync: LibrarySymbolReference
  };
  MultipartContent: LibrarySymbolReference & {
    MultipartContent: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    CreateContentReadStream: LibrarySymbolReference;
    CreateContentReadStreamAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    SerializeToStream: LibrarySymbolReference;
    SerializeToStreamAsync: LibrarySymbolReference;
    TryComputeLength: LibrarySymbolReference;
    HeaderEncodingSelector: LibrarySymbolReference
  };
  MultipartFormDataContent: LibrarySymbolReference & {
    MultipartFormDataContent: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    SerializeToStreamAsync: LibrarySymbolReference
  };
  ReadOnlyMemoryContent: LibrarySymbolReference & {
    ReadOnlyMemoryContent: LibrarySymbolReference;
    CreateContentReadStream: LibrarySymbolReference;
    CreateContentReadStreamAsync: LibrarySymbolReference;
    SerializeToStream: LibrarySymbolReference;
    SerializeToStreamAsync: LibrarySymbolReference;
    TryComputeLength: LibrarySymbolReference
  };
  SocketsHttpConnectionContext: LibrarySymbolReference & {
    DnsEndPoint: LibrarySymbolReference;
    InitialRequestMessage: LibrarySymbolReference
  };
  SocketsHttpHandler: LibrarySymbolReference & {
    SocketsHttpHandler: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    SendAsync: LibrarySymbolReference;
    ActivityHeadersPropagator: LibrarySymbolReference;
    AllowAutoRedirect: LibrarySymbolReference;
    AutomaticDecompression: LibrarySymbolReference;
    ConnectCallback: LibrarySymbolReference;
    ConnectTimeout: LibrarySymbolReference;
    CookieContainer: LibrarySymbolReference;
    Credentials: LibrarySymbolReference;
    DefaultProxyCredentials: LibrarySymbolReference;
    EnableMultipleHttp2Connections: LibrarySymbolReference;
    EnableMultipleHttp3Connections: LibrarySymbolReference;
    Expect100ContinueTimeout: LibrarySymbolReference;
    InitialHttp2StreamWindowSize: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference;
    KeepAlivePingDelay: LibrarySymbolReference;
    KeepAlivePingPolicy: LibrarySymbolReference;
    KeepAlivePingTimeout: LibrarySymbolReference;
    MaxAutomaticRedirections: LibrarySymbolReference;
    MaxConnectionsPerServer: LibrarySymbolReference;
    MaxResponseDrainSize: LibrarySymbolReference;
    MaxResponseHeadersLength: LibrarySymbolReference;
    MeterFactory: LibrarySymbolReference;
    PlaintextStreamFilter: LibrarySymbolReference;
    PooledConnectionIdleTimeout: LibrarySymbolReference;
    PooledConnectionLifetime: LibrarySymbolReference;
    PreAuthenticate: LibrarySymbolReference;
    Properties: LibrarySymbolReference;
    Proxy: LibrarySymbolReference;
    RequestHeaderEncodingSelector: LibrarySymbolReference;
    ResponseDrainTimeout: LibrarySymbolReference;
    ResponseHeaderEncodingSelector: LibrarySymbolReference;
    SslOptions: LibrarySymbolReference;
    UseCookies: LibrarySymbolReference;
    UseProxy: LibrarySymbolReference
  };
  SocketsHttpPlaintextStreamFilterContext: LibrarySymbolReference & {
    InitialRequestMessage: LibrarySymbolReference;
    NegotiatedHttpVersion: LibrarySymbolReference;
    PlaintextStream: LibrarySymbolReference
  };
  StreamContent: LibrarySymbolReference & {
    StreamContent: LibrarySymbolReference;
    CreateContentReadStream: LibrarySymbolReference;
    CreateContentReadStreamAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    SerializeToStream: LibrarySymbolReference;
    SerializeToStreamAsync: LibrarySymbolReference;
    TryComputeLength: LibrarySymbolReference
  };
  StringContent: LibrarySymbolReference & {
    StringContent: LibrarySymbolReference;
    SerializeToStreamAsync: LibrarySymbolReference
  }
};
const Http: HttpLibrary = createLibrary("System.Net.Http", {
  ByteArrayContent: {
    kind: "class",
    members: {
      ByteArrayContent: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateContentReadStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateContentReadStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SerializeToStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SerializeToStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryComputeLength: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  ClientCertificateOption: {
    kind: "enum",
    members: {
      Manual: {
        kind: "field",
        type: () => {
          return Http.ClientCertificateOption;
        },
      },
      Automatic: {
        kind: "field",
        type: () => {
          return Http.ClientCertificateOption;
        },
      },
    },
  },
  DelegatingHandler: {
    kind: "class",
    members: {
      DelegatingHandler: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Send: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SendAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InnerHandler: {
        kind: "property",
        type: () => {
          return Http.HttpMessageHandler;
        },
        isNullable: true,
      },
    },
    isAbstract: true,
  },
  FormUrlEncodedContent: {
    kind: "class",
    members: {
      FormUrlEncodedContent: {
        kind: "method",
        methodKind: "constructor",
      },
      SerializeToStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  HeaderEncodingSelector: {
    kind: "generic",
    members: {
      HeaderEncodingSelector: {
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
  HttpClient: {
    kind: "class",
    members: {
      HttpClient: {
        kind: "method",
        methodKind: "constructor",
      },
      CancelPendingRequests: {
        kind: "method",
        methodKind: "ordinary",
      },
      DeleteAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetByteArrayAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetStringAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      PatchAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      PostAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      PutAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Send: {
        kind: "method",
        methodKind: "ordinary",
      },
      SendAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      BaseAddress: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isNullable: true,
      },
      DefaultProxy: {
        kind: "property",
        type: () => {
          return Net.IWebProxy;
        },
        isStatic: true,
      },
      DefaultRequestHeaders: {
        kind: "property",
        type: () => {
          return Headers.HttpRequestHeaders;
        },
      },
      DefaultRequestVersion: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
      DefaultVersionPolicy: {
        kind: "property",
        type: () => {
          return Http.HttpVersionPolicy;
        },
      },
      MaxResponseContentBufferSize: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      Timeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
    },
  },
  HttpClientHandler: {
    kind: "class",
    members: {
      HttpClientHandler: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Send: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SendAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AllowAutoRedirect: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AutomaticDecompression: {
        kind: "property",
        type: () => {
          return Net.DecompressionMethods;
        },
      },
      CheckCertificateRevocationList: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ClientCertificateOptions: {
        kind: "property",
        type: () => {
          return Http.ClientCertificateOption;
        },
      },
      ClientCertificates: {
        kind: "property",
        type: () => {
          return X509Certificates.X509CertificateCollection;
        },
      },
      CookieContainer: {
        kind: "property",
        type: () => {
          return Net.CookieContainer;
        },
      },
      Credentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
      },
      DangerousAcceptAnyServerCertificateValidator: {
        kind: "property",
        type: () => {
          return System.Func;
        },
        isStatic: true,
      },
      DefaultProxyCredentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
        isNullable: true,
      },
      MaxAutomaticRedirections: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxConnectionsPerServer: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxRequestContentBufferSize: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      MaxResponseHeadersLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MeterFactory: {
        kind: "property",
        type: () => {
          return Metrics.IMeterFactory;
        },
      },
      PreAuthenticate: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Properties: {
        kind: "property",
        type: () => {
          return Generic.IDictionary;
        },
      },
      Proxy: {
        kind: "property",
        type: () => {
          return Net.IWebProxy;
        },
      },
      ServerCertificateCustomValidationCallback: {
        kind: "property",
        type: () => {
          return System.Func;
        },
        isNullable: true,
      },
      SslProtocols: {
        kind: "property",
        type: () => {
          return Authentication.SslProtocols;
        },
      },
      SupportsAutomaticDecompression: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      SupportsProxy: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      SupportsRedirectConfiguration: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      UseCookies: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      UseDefaultCredentials: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      UseProxy: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  HttpCompletionOption: {
    kind: "enum",
    members: {
      ResponseContentRead: {
        kind: "field",
        type: () => {
          return Http.HttpCompletionOption;
        },
      },
      ResponseHeadersRead: {
        kind: "field",
        type: () => {
          return Http.HttpCompletionOption;
        },
      },
    },
  },
  HttpContent: {
    kind: "class",
    members: {
      HttpContent: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyToAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateContentReadStream: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateContentReadStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadIntoBufferAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadAsByteArrayAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadAsStream: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadAsStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadAsStringAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      SerializeToStream: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SerializeToStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      TryComputeLength: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Headers: {
        kind: "property",
        type: () => {
          return Headers.HttpContentHeaders;
        },
      },
    },
    isAbstract: true,
  },
  HttpIOException: {
    kind: "class",
    members: {
      HttpIOException: {
        kind: "method",
        methodKind: "constructor",
      },
      HttpRequestError: {
        kind: "property",
        type: () => {
          return Http.HttpRequestError;
        },
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
  HttpKeepAlivePingPolicy: {
    kind: "enum",
    members: {
      WithActiveRequests: {
        kind: "field",
        type: () => {
          return Http.HttpKeepAlivePingPolicy;
        },
      },
      Always: {
        kind: "field",
        type: () => {
          return Http.HttpKeepAlivePingPolicy;
        },
      },
    },
  },
  HttpMessageHandler: {
    kind: "class",
    members: {
      HttpMessageHandler: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Send: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SendAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  HttpMessageInvoker: {
    kind: "class",
    members: {
      HttpMessageInvoker: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Send: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SendAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  HttpMethod: {
    kind: "class",
    members: {
      HttpMethod: {
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
      Connect: {
        kind: "property",
        type: () => {
          return Http.HttpMethod;
        },
        isStatic: true,
      },
      Delete: {
        kind: "property",
        type: () => {
          return Http.HttpMethod;
        },
        isStatic: true,
      },
      Get: {
        kind: "property",
        type: () => {
          return Http.HttpMethod;
        },
        isStatic: true,
      },
      Head: {
        kind: "property",
        type: () => {
          return Http.HttpMethod;
        },
        isStatic: true,
      },
      Method: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Options: {
        kind: "property",
        type: () => {
          return Http.HttpMethod;
        },
        isStatic: true,
      },
      Patch: {
        kind: "property",
        type: () => {
          return Http.HttpMethod;
        },
        isStatic: true,
      },
      Post: {
        kind: "property",
        type: () => {
          return Http.HttpMethod;
        },
        isStatic: true,
      },
      Put: {
        kind: "property",
        type: () => {
          return Http.HttpMethod;
        },
        isStatic: true,
      },
      Trace: {
        kind: "property",
        type: () => {
          return Http.HttpMethod;
        },
        isStatic: true,
      },
    },
  },
  HttpProtocolException: {
    kind: "class",
    members: {
      HttpProtocolException: {
        kind: "method",
        methodKind: "constructor",
      },
      ErrorCode: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
    isSealed: true,
  },
  HttpRequestError: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return Http.HttpRequestError;
        },
      },
      NameResolutionError: {
        kind: "field",
        type: () => {
          return Http.HttpRequestError;
        },
      },
      ConnectionError: {
        kind: "field",
        type: () => {
          return Http.HttpRequestError;
        },
      },
      SecureConnectionError: {
        kind: "field",
        type: () => {
          return Http.HttpRequestError;
        },
      },
      HttpProtocolError: {
        kind: "field",
        type: () => {
          return Http.HttpRequestError;
        },
      },
      ExtendedConnectNotSupported: {
        kind: "field",
        type: () => {
          return Http.HttpRequestError;
        },
      },
      VersionNegotiationError: {
        kind: "field",
        type: () => {
          return Http.HttpRequestError;
        },
      },
      UserAuthenticationError: {
        kind: "field",
        type: () => {
          return Http.HttpRequestError;
        },
      },
      ProxyTunnelError: {
        kind: "field",
        type: () => {
          return Http.HttpRequestError;
        },
      },
      InvalidResponse: {
        kind: "field",
        type: () => {
          return Http.HttpRequestError;
        },
      },
      ResponseEnded: {
        kind: "field",
        type: () => {
          return Http.HttpRequestError;
        },
      },
      ConfigurationLimitExceeded: {
        kind: "field",
        type: () => {
          return Http.HttpRequestError;
        },
      },
    },
  },
  HttpRequestException: {
    kind: "class",
    members: {
      HttpRequestException: {
        kind: "method",
        methodKind: "constructor",
      },
      HttpRequestError: {
        kind: "property",
        type: () => {
          return Http.HttpRequestError;
        },
      },
      StatusCode: {
        kind: "property",
        type: () => {
          return Net.HttpStatusCode;
        },
        isNullable: true,
      },
    },
  },
  HttpRequestMessage: {
    kind: "class",
    members: {
      HttpRequestMessage: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Content: {
        kind: "property",
        type: () => {
          return Http.HttpContent;
        },
      },
      Headers: {
        kind: "property",
        type: () => {
          return Headers.HttpRequestHeaders;
        },
      },
      Method: {
        kind: "property",
        type: () => {
          return Http.HttpMethod;
        },
      },
      Options: {
        kind: "property",
        type: () => {
          return Http.HttpRequestOptions;
        },
      },
      Properties: {
        kind: "property",
        type: () => {
          return Generic.IDictionary;
        },
      },
      RequestUri: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isNullable: true,
      },
      Version: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
      VersionPolicy: {
        kind: "property",
        type: () => {
          return Http.HttpVersionPolicy;
        },
      },
    },
  },
  HttpRequestOptions: {
    kind: "class",
    members: {
      HttpRequestOptions: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  HttpRequestOptionsKey: {
    kind: "struct",
    members: {
      HttpRequestOptionsKey: {
        kind: "method",
        methodKind: "constructor",
      },
      Key: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  HttpResponseMessage: {
    kind: "class",
    members: {
      HttpResponseMessage: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnsureSuccessStatusCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Content: {
        kind: "property",
        type: () => {
          return Http.HttpContent;
        },
      },
      Headers: {
        kind: "property",
        type: () => {
          return Headers.HttpResponseHeaders;
        },
      },
      IsSuccessStatusCode: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ReasonPhrase: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      RequestMessage: {
        kind: "property",
        type: () => {
          return Http.HttpRequestMessage;
        },
      },
      StatusCode: {
        kind: "property",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      TrailingHeaders: {
        kind: "property",
        type: () => {
          return Headers.HttpResponseHeaders;
        },
      },
      Version: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
    },
  },
  HttpVersionPolicy: {
    kind: "enum",
    members: {
      RequestVersionOrLower: {
        kind: "field",
        type: () => {
          return Http.HttpVersionPolicy;
        },
      },
      RequestVersionOrHigher: {
        kind: "field",
        type: () => {
          return Http.HttpVersionPolicy;
        },
      },
      RequestVersionExact: {
        kind: "field",
        type: () => {
          return Http.HttpVersionPolicy;
        },
      },
    },
  },
  MessageProcessingHandler: {
    kind: "class",
    members: {
      MessageProcessingHandler: {
        kind: "method",
        methodKind: "constructor",
      },
      ProcessRequest: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ProcessResponse: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Send: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      SendAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  MultipartContent: {
    kind: "class",
    members: {
      MultipartContent: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateContentReadStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateContentReadStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      SerializeToStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SerializeToStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryComputeLength: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HeaderEncodingSelector: {
        kind: "property",
        type: () => {
          return Http.HeaderEncodingSelector;
        },
      },
    },
  },
  MultipartFormDataContent: {
    kind: "class",
    members: {
      MultipartFormDataContent: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SerializeToStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  ReadOnlyMemoryContent: {
    kind: "class",
    members: {
      ReadOnlyMemoryContent: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateContentReadStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateContentReadStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SerializeToStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SerializeToStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryComputeLength: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  SocketsHttpConnectionContext: {
    kind: "class",
    members: {
      DnsEndPoint: {
        kind: "property",
        type: () => {
          return Net.DnsEndPoint;
        },
      },
      InitialRequestMessage: {
        kind: "property",
        type: () => {
          return Http.HttpRequestMessage;
        },
      },
    },
    isSealed: true,
  },
  SocketsHttpHandler: {
    kind: "class",
    members: {
      SocketsHttpHandler: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Send: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SendAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ActivityHeadersPropagator: {
        kind: "property",
        type: () => {
          return Diagnostics.DistributedContextPropagator;
        },
      },
      AllowAutoRedirect: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AutomaticDecompression: {
        kind: "property",
        type: () => {
          return Net.DecompressionMethods;
        },
      },
      ConnectCallback: {
        kind: "property",
        type: () => {
          return System.Func;
        },
        isNullable: true,
      },
      ConnectTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      CookieContainer: {
        kind: "property",
        type: () => {
          return Net.CookieContainer;
        },
      },
      Credentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
      },
      DefaultProxyCredentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
        isNullable: true,
      },
      EnableMultipleHttp2Connections: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      EnableMultipleHttp3Connections: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Expect100ContinueTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      InitialHttp2StreamWindowSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      KeepAlivePingDelay: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      KeepAlivePingPolicy: {
        kind: "property",
        type: () => {
          return Http.HttpKeepAlivePingPolicy;
        },
      },
      KeepAlivePingTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      MaxAutomaticRedirections: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxConnectionsPerServer: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxResponseDrainSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxResponseHeadersLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MeterFactory: {
        kind: "property",
        type: () => {
          return Metrics.IMeterFactory;
        },
      },
      PlaintextStreamFilter: {
        kind: "property",
        type: () => {
          return System.Func;
        },
      },
      PooledConnectionIdleTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      PooledConnectionLifetime: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      PreAuthenticate: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Properties: {
        kind: "property",
        type: () => {
          return Generic.IDictionary;
        },
      },
      Proxy: {
        kind: "property",
        type: () => {
          return Net.IWebProxy;
        },
      },
      RequestHeaderEncodingSelector: {
        kind: "property",
        type: () => {
          return Http.HeaderEncodingSelector;
        },
        isNullable: true,
      },
      ResponseDrainTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      ResponseHeaderEncodingSelector: {
        kind: "property",
        type: () => {
          return Http.HeaderEncodingSelector;
        },
        isNullable: true,
      },
      SslOptions: {
        kind: "property",
        type: () => {
          return Security.SslClientAuthenticationOptions;
        },
      },
      UseCookies: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      UseProxy: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  SocketsHttpPlaintextStreamFilterContext: {
    kind: "class",
    members: {
      InitialRequestMessage: {
        kind: "property",
        type: () => {
          return Http.HttpRequestMessage;
        },
      },
      NegotiatedHttpVersion: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
      PlaintextStream: {
        kind: "property",
        type: () => {
          return IO.Stream;
        },
      },
    },
    isSealed: true,
  },
  StreamContent: {
    kind: "class",
    members: {
      StreamContent: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateContentReadStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateContentReadStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SerializeToStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SerializeToStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryComputeLength: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  StringContent: {
    kind: "class",
    members: {
      StringContent: {
        kind: "method",
        methodKind: "constructor",
      },
      SerializeToStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
});
export default Http
