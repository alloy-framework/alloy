import Generic from "../../Collections/Generic/index.js";
import Specialized from "../../Collections/Specialized/index.js";
import System from "../../index.js";
import Http from "../Http/index.js";
import Net from "../index.js";
import Security from "../Security/index.js";
import X509Certificates from "../../Security/Cryptography/X509Certificates/index.js";
import Principal from "../../Security/Principal/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type WebSocketsLibrary = LibrarySymbolReference & {
  ClientWebSocket: LibrarySymbolReference & {
    ClientWebSocket: LibrarySymbolReference;
    Abort: LibrarySymbolReference;
    CloseAsync: LibrarySymbolReference;
    CloseOutputAsync: LibrarySymbolReference;
    ConnectAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    ReceiveAsync: LibrarySymbolReference;
    SendAsync: LibrarySymbolReference;
    CloseStatus: LibrarySymbolReference;
    CloseStatusDescription: LibrarySymbolReference;
    HttpStatusCode: LibrarySymbolReference;
    HttpResponseHeaders: LibrarySymbolReference;
    Options: LibrarySymbolReference;
    State: LibrarySymbolReference;
    SubProtocol: LibrarySymbolReference
  };
  ClientWebSocketOptions: LibrarySymbolReference & {
    AddSubProtocol: LibrarySymbolReference;
    SetBuffer: LibrarySymbolReference;
    SetRequestHeader: LibrarySymbolReference;
    ClientCertificates: LibrarySymbolReference;
    Cookies: LibrarySymbolReference;
    CollectHttpResponseDetails: LibrarySymbolReference;
    Credentials: LibrarySymbolReference;
    KeepAliveInterval: LibrarySymbolReference;
    KeepAliveTimeout: LibrarySymbolReference;
    DangerousDeflateOptions: LibrarySymbolReference;
    Proxy: LibrarySymbolReference;
    RemoteCertificateValidationCallback: LibrarySymbolReference;
    UseDefaultCredentials: LibrarySymbolReference;
    HttpVersion: LibrarySymbolReference;
    HttpVersionPolicy: LibrarySymbolReference
  };
  HttpListenerWebSocketContext: LibrarySymbolReference & {
    CookieCollection: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    IsAuthenticated: LibrarySymbolReference;
    IsLocal: LibrarySymbolReference;
    IsSecureConnection: LibrarySymbolReference;
    Origin: LibrarySymbolReference;
    RequestUri: LibrarySymbolReference;
    SecWebSocketKey: LibrarySymbolReference;
    SecWebSocketProtocols: LibrarySymbolReference;
    SecWebSocketVersion: LibrarySymbolReference;
    User: LibrarySymbolReference;
    WebSocket: LibrarySymbolReference
  };
  ValueWebSocketReceiveResult: LibrarySymbolReference & {
    ValueWebSocketReceiveResult: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    EndOfMessage: LibrarySymbolReference;
    MessageType: LibrarySymbolReference
  };
  WebSocket: LibrarySymbolReference & {
    WebSocket: LibrarySymbolReference;
    Abort: LibrarySymbolReference;
    CloseAsync: LibrarySymbolReference;
    CloseOutputAsync: LibrarySymbolReference;
    CreateClientBuffer: LibrarySymbolReference;
    CreateFromStream: LibrarySymbolReference;
    CreateServerBuffer: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    IsStateTerminal: LibrarySymbolReference;
    ReceiveAsync: LibrarySymbolReference;
    SendAsync: LibrarySymbolReference;
    ThrowOnInvalidState: LibrarySymbolReference;
    CloseStatus: LibrarySymbolReference;
    CloseStatusDescription: LibrarySymbolReference;
    DefaultKeepAliveInterval: LibrarySymbolReference;
    State: LibrarySymbolReference;
    SubProtocol: LibrarySymbolReference
  };
  WebSocketCloseStatus: LibrarySymbolReference & {
    NormalClosure: LibrarySymbolReference;
    EndpointUnavailable: LibrarySymbolReference;
    ProtocolError: LibrarySymbolReference;
    InvalidMessageType: LibrarySymbolReference;
    Empty: LibrarySymbolReference;
    InvalidPayloadData: LibrarySymbolReference;
    PolicyViolation: LibrarySymbolReference;
    MessageTooBig: LibrarySymbolReference;
    MandatoryExtension: LibrarySymbolReference;
    InternalServerError: LibrarySymbolReference
  };
  WebSocketContext: LibrarySymbolReference & {
    WebSocketContext: LibrarySymbolReference;
    CookieCollection: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    IsAuthenticated: LibrarySymbolReference;
    IsLocal: LibrarySymbolReference;
    IsSecureConnection: LibrarySymbolReference;
    Origin: LibrarySymbolReference;
    RequestUri: LibrarySymbolReference;
    SecWebSocketKey: LibrarySymbolReference;
    SecWebSocketProtocols: LibrarySymbolReference;
    SecWebSocketVersion: LibrarySymbolReference;
    User: LibrarySymbolReference;
    WebSocket: LibrarySymbolReference
  };
  WebSocketCreationOptions: LibrarySymbolReference & {
    WebSocketCreationOptions: LibrarySymbolReference;
    IsServer: LibrarySymbolReference;
    SubProtocol: LibrarySymbolReference;
    KeepAliveInterval: LibrarySymbolReference;
    KeepAliveTimeout: LibrarySymbolReference;
    DangerousDeflateOptions: LibrarySymbolReference
  };
  WebSocketDeflateOptions: LibrarySymbolReference & {
    WebSocketDeflateOptions: LibrarySymbolReference;
    ClientMaxWindowBits: LibrarySymbolReference;
    ClientContextTakeover: LibrarySymbolReference;
    ServerMaxWindowBits: LibrarySymbolReference;
    ServerContextTakeover: LibrarySymbolReference
  };
  WebSocketError: LibrarySymbolReference & {
    Success: LibrarySymbolReference;
    InvalidMessageType: LibrarySymbolReference;
    Faulted: LibrarySymbolReference;
    NativeError: LibrarySymbolReference;
    NotAWebSocket: LibrarySymbolReference;
    UnsupportedVersion: LibrarySymbolReference;
    UnsupportedProtocol: LibrarySymbolReference;
    HeaderError: LibrarySymbolReference;
    ConnectionClosedPrematurely: LibrarySymbolReference;
    InvalidState: LibrarySymbolReference
  };
  WebSocketException: LibrarySymbolReference & {
    WebSocketException: LibrarySymbolReference;
    ErrorCode: LibrarySymbolReference;
    WebSocketErrorCode: LibrarySymbolReference
  };
  WebSocketMessageFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    EndOfMessage: LibrarySymbolReference;
    DisableCompression: LibrarySymbolReference
  };
  WebSocketMessageType: LibrarySymbolReference & {
    Text: LibrarySymbolReference;
    Binary: LibrarySymbolReference;
    Close: LibrarySymbolReference
  };
  WebSocketReceiveResult: LibrarySymbolReference & {
    WebSocketReceiveResult: LibrarySymbolReference;
    CloseStatus: LibrarySymbolReference;
    CloseStatusDescription: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    EndOfMessage: LibrarySymbolReference;
    MessageType: LibrarySymbolReference
  };
  WebSocketState: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Connecting: LibrarySymbolReference;
    Open: LibrarySymbolReference;
    CloseSent: LibrarySymbolReference;
    CloseReceived: LibrarySymbolReference;
    Closed: LibrarySymbolReference;
    Aborted: LibrarySymbolReference
  }
};
const WebSockets: WebSocketsLibrary = createLibrary("System.Net.WebSockets", {
  ClientWebSocket: {
    kind: "class",
    members: {
      ClientWebSocket: {
        kind: "method",
        methodKind: "constructor",
      },
      Abort: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CloseAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CloseOutputAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConnectAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReceiveAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SendAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CloseStatus: {
        kind: "property",
        type: () => {
          return WebSockets.WebSocketCloseStatus;
        },
        isNullable: true,
        isOverride: true,
      },
      CloseStatusDescription: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      HttpStatusCode: {
        kind: "property",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      HttpResponseHeaders: {
        kind: "property",
        type: () => {
          return Generic.IReadOnlyDictionary;
        },
        isNullable: true,
      },
      Options: {
        kind: "property",
        type: () => {
          return WebSockets.ClientWebSocketOptions;
        },
      },
      State: {
        kind: "property",
        type: () => {
          return WebSockets.WebSocketState;
        },
        isOverride: true,
      },
      SubProtocol: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
    },
    isSealed: true,
  },
  ClientWebSocketOptions: {
    kind: "class",
    members: {
      AddSubProtocol: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetBuffer: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetRequestHeader: {
        kind: "method",
        methodKind: "ordinary",
      },
      ClientCertificates: {
        kind: "property",
        type: () => {
          return X509Certificates.X509CertificateCollection;
        },
      },
      Cookies: {
        kind: "property",
        type: () => {
          return Net.CookieContainer;
        },
        isNullable: true,
      },
      CollectHttpResponseDetails: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Credentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
      },
      KeepAliveInterval: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      KeepAliveTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      DangerousDeflateOptions: {
        kind: "property",
        type: () => {
          return WebSockets.WebSocketDeflateOptions;
        },
        isNullable: true,
      },
      Proxy: {
        kind: "property",
        type: () => {
          return Net.IWebProxy;
        },
      },
      RemoteCertificateValidationCallback: {
        kind: "property",
        type: () => {
          return Security.RemoteCertificateValidationCallback;
        },
      },
      UseDefaultCredentials: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      HttpVersion: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
      HttpVersionPolicy: {
        kind: "property",
        type: () => {
          return Http.HttpVersionPolicy;
        },
      },
    },
    isSealed: true,
  },
  HttpListenerWebSocketContext: {
    kind: "class",
    members: {
      CookieCollection: {
        kind: "property",
        type: () => {
          return Net.CookieCollection;
        },
        isOverride: true,
      },
      Headers: {
        kind: "property",
        type: () => {
          return Specialized.NameValueCollection;
        },
        isOverride: true,
      },
      IsAuthenticated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsLocal: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsSecureConnection: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      Origin: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      RequestUri: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isOverride: true,
      },
      SecWebSocketKey: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      SecWebSocketProtocols: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isOverride: true,
      },
      SecWebSocketVersion: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      User: {
        kind: "property",
        type: () => {
          return Principal.IPrincipal;
        },
        isOverride: true,
      },
      WebSocket: {
        kind: "property",
        type: () => {
          return WebSockets.WebSocket;
        },
        isOverride: true,
      },
    },
  },
  ValueWebSocketReceiveResult: {
    kind: "struct",
    members: {
      ValueWebSocketReceiveResult: {
        kind: "method",
        methodKind: "constructor",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      EndOfMessage: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MessageType: {
        kind: "property",
        type: () => {
          return WebSockets.WebSocketMessageType;
        },
      },
    },
  },
  WebSocket: {
    kind: "class",
    members: {
      WebSocket: {
        kind: "method",
        methodKind: "constructor",
      },
      Abort: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CloseAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CloseOutputAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CreateClientBuffer: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromStream: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateServerBuffer: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IsStateTerminal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReceiveAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SendAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ThrowOnInvalidState: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CloseStatus: {
        kind: "property",
        type: () => {
          return WebSockets.WebSocketCloseStatus;
        },
        isNullable: true,
        isAbstract: true,
      },
      CloseStatusDescription: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isAbstract: true,
      },
      DefaultKeepAliveInterval: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
        isStatic: true,
      },
      State: {
        kind: "property",
        type: () => {
          return WebSockets.WebSocketState;
        },
        isAbstract: true,
      },
      SubProtocol: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  WebSocketCloseStatus: {
    kind: "enum",
    members: {
      NormalClosure: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketCloseStatus;
        },
      },
      EndpointUnavailable: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketCloseStatus;
        },
      },
      ProtocolError: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketCloseStatus;
        },
      },
      InvalidMessageType: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketCloseStatus;
        },
      },
      Empty: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketCloseStatus;
        },
      },
      InvalidPayloadData: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketCloseStatus;
        },
      },
      PolicyViolation: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketCloseStatus;
        },
      },
      MessageTooBig: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketCloseStatus;
        },
      },
      MandatoryExtension: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketCloseStatus;
        },
      },
      InternalServerError: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketCloseStatus;
        },
      },
    },
  },
  WebSocketContext: {
    kind: "class",
    members: {
      WebSocketContext: {
        kind: "method",
        methodKind: "constructor",
      },
      CookieCollection: {
        kind: "property",
        type: () => {
          return Net.CookieCollection;
        },
        isAbstract: true,
      },
      Headers: {
        kind: "property",
        type: () => {
          return Specialized.NameValueCollection;
        },
        isAbstract: true,
      },
      IsAuthenticated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      IsLocal: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      IsSecureConnection: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      Origin: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      RequestUri: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isAbstract: true,
      },
      SecWebSocketKey: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      SecWebSocketProtocols: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isAbstract: true,
      },
      SecWebSocketVersion: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      User: {
        kind: "property",
        type: () => {
          return Principal.IPrincipal;
        },
        isNullable: true,
        isAbstract: true,
      },
      WebSocket: {
        kind: "property",
        type: () => {
          return WebSockets.WebSocket;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  WebSocketCreationOptions: {
    kind: "class",
    members: {
      WebSocketCreationOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      IsServer: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SubProtocol: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      KeepAliveInterval: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      KeepAliveTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      DangerousDeflateOptions: {
        kind: "property",
        type: () => {
          return WebSockets.WebSocketDeflateOptions;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  WebSocketDeflateOptions: {
    kind: "class",
    members: {
      WebSocketDeflateOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      ClientMaxWindowBits: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ClientContextTakeover: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ServerMaxWindowBits: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ServerContextTakeover: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  WebSocketError: {
    kind: "enum",
    members: {
      Success: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketError;
        },
      },
      InvalidMessageType: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketError;
        },
      },
      Faulted: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketError;
        },
      },
      NativeError: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketError;
        },
      },
      NotAWebSocket: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketError;
        },
      },
      UnsupportedVersion: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketError;
        },
      },
      UnsupportedProtocol: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketError;
        },
      },
      HeaderError: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketError;
        },
      },
      ConnectionClosedPrematurely: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketError;
        },
      },
      InvalidState: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketError;
        },
      },
    },
  },
  WebSocketException: {
    kind: "class",
    members: {
      WebSocketException: {
        kind: "method",
        methodKind: "constructor",
      },
      ErrorCode: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      WebSocketErrorCode: {
        kind: "property",
        type: () => {
          return WebSockets.WebSocketError;
        },
      },
    },
    isSealed: true,
  },
  WebSocketMessageFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketMessageFlags;
        },
      },
      EndOfMessage: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketMessageFlags;
        },
      },
      DisableCompression: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketMessageFlags;
        },
      },
    },
  },
  WebSocketMessageType: {
    kind: "enum",
    members: {
      Text: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketMessageType;
        },
      },
      Binary: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketMessageType;
        },
      },
      Close: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketMessageType;
        },
      },
    },
  },
  WebSocketReceiveResult: {
    kind: "class",
    members: {
      WebSocketReceiveResult: {
        kind: "method",
        methodKind: "constructor",
      },
      CloseStatus: {
        kind: "property",
        type: () => {
          return WebSockets.WebSocketCloseStatus;
        },
        isNullable: true,
      },
      CloseStatusDescription: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      EndOfMessage: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MessageType: {
        kind: "property",
        type: () => {
          return WebSockets.WebSocketMessageType;
        },
      },
    },
  },
  WebSocketState: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketState;
        },
      },
      Connecting: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketState;
        },
      },
      Open: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketState;
        },
      },
      CloseSent: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketState;
        },
      },
      CloseReceived: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketState;
        },
      },
      Closed: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketState;
        },
      },
      Aborted: {
        kind: "field",
        type: () => {
          return WebSockets.WebSocketState;
        },
      },
    },
  },
});
export default WebSockets
