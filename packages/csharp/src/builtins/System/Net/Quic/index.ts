import Generic from "../../Collections/Generic/index.js";
import System from "../../index.js";
import Net from "../index.js";
import Security from "../Security/index.js";
import X509Certificates from "../../Security/Cryptography/X509Certificates/index.js";
import Tasks from "../../Threading/Tasks/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type QuicLibrary = LibrarySymbolReference & {
  QuicAbortDirection: LibrarySymbolReference & {
    Read: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    Both: LibrarySymbolReference
  };
  QuicClientConnectionOptions: LibrarySymbolReference & {
    QuicClientConnectionOptions: LibrarySymbolReference;
    ClientAuthenticationOptions: LibrarySymbolReference;
    LocalEndPoint: LibrarySymbolReference;
    RemoteEndPoint: LibrarySymbolReference
  };
  QuicConnection: LibrarySymbolReference & {
    AcceptInboundStreamAsync: LibrarySymbolReference;
    CloseAsync: LibrarySymbolReference;
    ConnectAsync: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    OpenOutboundStreamAsync: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference;
    LocalEndPoint: LibrarySymbolReference;
    NegotiatedApplicationProtocol: LibrarySymbolReference;
    RemoteCertificate: LibrarySymbolReference;
    RemoteEndPoint: LibrarySymbolReference;
    TargetHostName: LibrarySymbolReference
  };
  QuicConnectionOptions: LibrarySymbolReference & {
    DefaultCloseErrorCode: LibrarySymbolReference;
    DefaultStreamErrorCode: LibrarySymbolReference;
    HandshakeTimeout: LibrarySymbolReference;
    IdleTimeout: LibrarySymbolReference;
    InitialReceiveWindowSizes: LibrarySymbolReference;
    KeepAliveInterval: LibrarySymbolReference;
    MaxInboundBidirectionalStreams: LibrarySymbolReference;
    MaxInboundUnidirectionalStreams: LibrarySymbolReference;
    StreamCapacityCallback: LibrarySymbolReference
  };
  QuicError: LibrarySymbolReference & {
    Success: LibrarySymbolReference;
    InternalError: LibrarySymbolReference;
    ConnectionAborted: LibrarySymbolReference;
    StreamAborted: LibrarySymbolReference;
    ConnectionTimeout: LibrarySymbolReference;
    ConnectionRefused: LibrarySymbolReference;
    VersionNegotiationError: LibrarySymbolReference;
    ConnectionIdle: LibrarySymbolReference;
    OperationAborted: LibrarySymbolReference;
    AlpnInUse: LibrarySymbolReference;
    TransportError: LibrarySymbolReference;
    CallbackError: LibrarySymbolReference
  };
  QuicException: LibrarySymbolReference & {
    QuicException: LibrarySymbolReference;
    ApplicationErrorCode: LibrarySymbolReference;
    QuicError: LibrarySymbolReference;
    TransportErrorCode: LibrarySymbolReference
  };
  QuicListener: LibrarySymbolReference & {
    AcceptConnectionAsync: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    ListenAsync: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference;
    LocalEndPoint: LibrarySymbolReference
  };
  QuicListenerOptions: LibrarySymbolReference & {
    QuicListenerOptions: LibrarySymbolReference;
    ApplicationProtocols: LibrarySymbolReference;
    ConnectionOptionsCallback: LibrarySymbolReference;
    ListenBacklog: LibrarySymbolReference;
    ListenEndPoint: LibrarySymbolReference
  };
  QuicReceiveWindowSizes: LibrarySymbolReference & {
    QuicReceiveWindowSizes: LibrarySymbolReference;
    Connection: LibrarySymbolReference;
    LocallyInitiatedBidirectionalStream: LibrarySymbolReference;
    RemotelyInitiatedBidirectionalStream: LibrarySymbolReference;
    UnidirectionalStream: LibrarySymbolReference
  };
  QuicServerConnectionOptions: LibrarySymbolReference & {
    QuicServerConnectionOptions: LibrarySymbolReference;
    ServerAuthenticationOptions: LibrarySymbolReference
  };
  QuicStream: LibrarySymbolReference & {
    Abort: LibrarySymbolReference;
    BeginRead: LibrarySymbolReference;
    BeginWrite: LibrarySymbolReference;
    CompleteWrites: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    EndRead: LibrarySymbolReference;
    EndWrite: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteByte: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanSeek: LibrarySymbolReference;
    CanTimeout: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    Id: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Position: LibrarySymbolReference;
    ReadsClosed: LibrarySymbolReference;
    ReadTimeout: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    WritesClosed: LibrarySymbolReference;
    WriteTimeout: LibrarySymbolReference
  };
  QuicStreamCapacityChangedArgs: LibrarySymbolReference & {
    BidirectionalIncrement: LibrarySymbolReference;
    UnidirectionalIncrement: LibrarySymbolReference
  };
  QuicStreamType: LibrarySymbolReference & {
    Unidirectional: LibrarySymbolReference;
    Bidirectional: LibrarySymbolReference
  }
};
const Quic: QuicLibrary = createLibrary("System.Net.Quic", {
  QuicAbortDirection: {
    kind: "enum",
    members: {
      Read: {
        kind: "field",
        type: () => {
          return Quic.QuicAbortDirection;
        },
      },
      Write: {
        kind: "field",
        type: () => {
          return Quic.QuicAbortDirection;
        },
      },
      Both: {
        kind: "field",
        type: () => {
          return Quic.QuicAbortDirection;
        },
      },
    },
  },
  QuicClientConnectionOptions: {
    kind: "class",
    members: {
      QuicClientConnectionOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      ClientAuthenticationOptions: {
        kind: "property",
        type: () => {
          return Security.SslClientAuthenticationOptions;
        },
      },
      LocalEndPoint: {
        kind: "property",
        type: () => {
          return Net.IPEndPoint;
        },
        isNullable: true,
      },
      RemoteEndPoint: {
        kind: "property",
        type: () => {
          return Net.EndPoint;
        },
      },
    },
    isSealed: true,
  },
  QuicConnection: {
    kind: "class",
    members: {
      AcceptInboundStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      CloseAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ConnectAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenOutboundStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      LocalEndPoint: {
        kind: "property",
        type: () => {
          return Net.IPEndPoint;
        },
      },
      NegotiatedApplicationProtocol: {
        kind: "property",
        type: () => {
          return Security.SslApplicationProtocol;
        },
      },
      RemoteCertificate: {
        kind: "property",
        type: () => {
          return X509Certificates.X509Certificate;
        },
        isNullable: true,
      },
      RemoteEndPoint: {
        kind: "property",
        type: () => {
          return Net.IPEndPoint;
        },
      },
      TargetHostName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  QuicConnectionOptions: {
    kind: "class",
    members: {
      DefaultCloseErrorCode: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      DefaultStreamErrorCode: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      HandshakeTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      IdleTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      InitialReceiveWindowSizes: {
        kind: "property",
        type: () => {
          return Quic.QuicReceiveWindowSizes;
        },
      },
      KeepAliveInterval: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      MaxInboundBidirectionalStreams: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxInboundUnidirectionalStreams: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      StreamCapacityCallback: {
        kind: "property",
        type: () => {
          return System.Action;
        },
        isNullable: true,
      },
    },
    isAbstract: true,
  },
  QuicError: {
    kind: "enum",
    members: {
      Success: {
        kind: "field",
        type: () => {
          return Quic.QuicError;
        },
      },
      InternalError: {
        kind: "field",
        type: () => {
          return Quic.QuicError;
        },
      },
      ConnectionAborted: {
        kind: "field",
        type: () => {
          return Quic.QuicError;
        },
      },
      StreamAborted: {
        kind: "field",
        type: () => {
          return Quic.QuicError;
        },
      },
      ConnectionTimeout: {
        kind: "field",
        type: () => {
          return Quic.QuicError;
        },
      },
      ConnectionRefused: {
        kind: "field",
        type: () => {
          return Quic.QuicError;
        },
      },
      VersionNegotiationError: {
        kind: "field",
        type: () => {
          return Quic.QuicError;
        },
      },
      ConnectionIdle: {
        kind: "field",
        type: () => {
          return Quic.QuicError;
        },
      },
      OperationAborted: {
        kind: "field",
        type: () => {
          return Quic.QuicError;
        },
      },
      AlpnInUse: {
        kind: "field",
        type: () => {
          return Quic.QuicError;
        },
      },
      TransportError: {
        kind: "field",
        type: () => {
          return Quic.QuicError;
        },
      },
      CallbackError: {
        kind: "field",
        type: () => {
          return Quic.QuicError;
        },
      },
    },
  },
  QuicException: {
    kind: "class",
    members: {
      QuicException: {
        kind: "method",
        methodKind: "constructor",
      },
      ApplicationErrorCode: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isNullable: true,
      },
      QuicError: {
        kind: "property",
        type: () => {
          return Quic.QuicError;
        },
      },
      TransportErrorCode: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  QuicListener: {
    kind: "class",
    members: {
      AcceptConnectionAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ListenAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      LocalEndPoint: {
        kind: "property",
        type: () => {
          return Net.IPEndPoint;
        },
      },
    },
    isSealed: true,
  },
  QuicListenerOptions: {
    kind: "class",
    members: {
      QuicListenerOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      ApplicationProtocols: {
        kind: "property",
        type: () => {
          return Generic.List;
        },
      },
      ConnectionOptionsCallback: {
        kind: "property",
        type: () => {
          return System.Func;
        },
      },
      ListenBacklog: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ListenEndPoint: {
        kind: "property",
        type: () => {
          return Net.IPEndPoint;
        },
      },
    },
    isSealed: true,
  },
  QuicReceiveWindowSizes: {
    kind: "class",
    members: {
      QuicReceiveWindowSizes: {
        kind: "method",
        methodKind: "constructor",
      },
      Connection: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      LocallyInitiatedBidirectionalStream: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      RemotelyInitiatedBidirectionalStream: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      UnidirectionalStream: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  QuicServerConnectionOptions: {
    kind: "class",
    members: {
      QuicServerConnectionOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      ServerAuthenticationOptions: {
        kind: "property",
        type: () => {
          return Security.SslServerAuthenticationOptions;
        },
      },
    },
    isSealed: true,
  },
  QuicStream: {
    kind: "class",
    members: {
      Abort: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginRead: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BeginWrite: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CompleteWrites: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EndRead: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EndWrite: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FlushAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadByte: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Seek: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetLength: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteByte: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanRead: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      CanSeek: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      CanTimeout: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      CanWrite: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      Id: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      Position: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      ReadsClosed: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
      },
      ReadTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return Quic.QuicStreamType;
        },
      },
      WritesClosed: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
      },
      WriteTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  QuicStreamCapacityChangedArgs: {
    kind: "struct",
    members: {
      BidirectionalIncrement: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      UnidirectionalIncrement: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  QuicStreamType: {
    kind: "enum",
    members: {
      Unidirectional: {
        kind: "field",
        type: () => {
          return Quic.QuicStreamType;
        },
      },
      Bidirectional: {
        kind: "field",
        type: () => {
          return Quic.QuicStreamType;
        },
      },
    },
  },
});
export default Quic
