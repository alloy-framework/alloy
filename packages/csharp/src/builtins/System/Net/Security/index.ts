import Generic from "../../Collections/Generic/index.js";
import ObjectModel from "../../Collections/ObjectModel/index.js";
import System from "../../index.js";
import IO from "../../IO/index.js";
import Net from "../index.js";
import ExtendedProtection from "../../Security/Authentication/ExtendedProtection/index.js";
import Authentication from "../../Security/Authentication/index.js";
import X509Certificates from "../../Security/Cryptography/X509Certificates/index.js";
import Principal from "../../Security/Principal/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type SecurityLibrary = LibrarySymbolReference & {
  AuthenticatedStream: LibrarySymbolReference & {
    AuthenticatedStream: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    InnerStream: LibrarySymbolReference;
    IsAuthenticated: LibrarySymbolReference;
    IsEncrypted: LibrarySymbolReference;
    IsMutuallyAuthenticated: LibrarySymbolReference;
    IsServer: LibrarySymbolReference;
    IsSigned: LibrarySymbolReference;
    LeaveInnerStreamOpen: LibrarySymbolReference
  };
  AuthenticationLevel: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    MutualAuthRequested: LibrarySymbolReference;
    MutualAuthRequired: LibrarySymbolReference
  };
  CipherSuitesPolicy: LibrarySymbolReference & {
    CipherSuitesPolicy: LibrarySymbolReference;
    AllowedCipherSuites: LibrarySymbolReference
  };
  EncryptionPolicy: LibrarySymbolReference & {
    RequireEncryption: LibrarySymbolReference;
    AllowNoEncryption: LibrarySymbolReference;
    NoEncryption: LibrarySymbolReference
  };
  LocalCertificateSelectionCallback: LibrarySymbolReference & {
    LocalCertificateSelectionCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  NegotiateAuthentication: LibrarySymbolReference & {
    NegotiateAuthentication: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetOutgoingBlob: LibrarySymbolReference;
    Unwrap: LibrarySymbolReference;
    UnwrapInPlace: LibrarySymbolReference;
    Wrap: LibrarySymbolReference;
    ComputeIntegrityCheck: LibrarySymbolReference;
    VerifyIntegrityCheck: LibrarySymbolReference;
    ImpersonationLevel: LibrarySymbolReference;
    IsAuthenticated: LibrarySymbolReference;
    IsEncrypted: LibrarySymbolReference;
    IsMutuallyAuthenticated: LibrarySymbolReference;
    IsServer: LibrarySymbolReference;
    IsSigned: LibrarySymbolReference;
    Package: LibrarySymbolReference;
    ProtectionLevel: LibrarySymbolReference;
    RemoteIdentity: LibrarySymbolReference;
    TargetName: LibrarySymbolReference
  };
  NegotiateAuthenticationClientOptions: LibrarySymbolReference & {
    NegotiateAuthenticationClientOptions: LibrarySymbolReference;
    AllowedImpersonationLevel: LibrarySymbolReference;
    Binding: LibrarySymbolReference;
    Credential: LibrarySymbolReference;
    Package: LibrarySymbolReference;
    RequiredProtectionLevel: LibrarySymbolReference;
    RequireMutualAuthentication: LibrarySymbolReference;
    TargetName: LibrarySymbolReference
  };
  NegotiateAuthenticationServerOptions: LibrarySymbolReference & {
    NegotiateAuthenticationServerOptions: LibrarySymbolReference;
    Binding: LibrarySymbolReference;
    Credential: LibrarySymbolReference;
    Package: LibrarySymbolReference;
    Policy: LibrarySymbolReference;
    RequiredImpersonationLevel: LibrarySymbolReference;
    RequiredProtectionLevel: LibrarySymbolReference
  };
  NegotiateAuthenticationStatusCode: LibrarySymbolReference & {
    Completed: LibrarySymbolReference;
    ContinueNeeded: LibrarySymbolReference;
    GenericFailure: LibrarySymbolReference;
    BadBinding: LibrarySymbolReference;
    Unsupported: LibrarySymbolReference;
    MessageAltered: LibrarySymbolReference;
    ContextExpired: LibrarySymbolReference;
    CredentialsExpired: LibrarySymbolReference;
    InvalidCredentials: LibrarySymbolReference;
    InvalidToken: LibrarySymbolReference;
    UnknownCredentials: LibrarySymbolReference;
    QopNotSupported: LibrarySymbolReference;
    OutOfSequence: LibrarySymbolReference;
    SecurityQosFailed: LibrarySymbolReference;
    TargetUnknown: LibrarySymbolReference;
    ImpersonationValidationFailed: LibrarySymbolReference
  };
  NegotiateStream: LibrarySymbolReference & {
    NegotiateStream: LibrarySymbolReference;
    AuthenticateAsClient: LibrarySymbolReference;
    AuthenticateAsClientAsync: LibrarySymbolReference;
    AuthenticateAsServer: LibrarySymbolReference;
    AuthenticateAsServerAsync: LibrarySymbolReference;
    BeginAuthenticateAsClient: LibrarySymbolReference;
    BeginAuthenticateAsServer: LibrarySymbolReference;
    BeginRead: LibrarySymbolReference;
    BeginWrite: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    EndAuthenticateAsClient: LibrarySymbolReference;
    EndAuthenticateAsServer: LibrarySymbolReference;
    EndRead: LibrarySymbolReference;
    EndWrite: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanSeek: LibrarySymbolReference;
    CanTimeout: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    ImpersonationLevel: LibrarySymbolReference;
    IsAuthenticated: LibrarySymbolReference;
    IsEncrypted: LibrarySymbolReference;
    IsMutuallyAuthenticated: LibrarySymbolReference;
    IsServer: LibrarySymbolReference;
    IsSigned: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Position: LibrarySymbolReference;
    ReadTimeout: LibrarySymbolReference;
    RemoteIdentity: LibrarySymbolReference;
    WriteTimeout: LibrarySymbolReference
  };
  ProtectionLevel: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Sign: LibrarySymbolReference;
    EncryptAndSign: LibrarySymbolReference
  };
  RemoteCertificateValidationCallback: LibrarySymbolReference & {
    RemoteCertificateValidationCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  ServerCertificateSelectionCallback: LibrarySymbolReference & {
    ServerCertificateSelectionCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  ServerOptionsSelectionCallback: LibrarySymbolReference & {
    ServerOptionsSelectionCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  SslApplicationProtocol: LibrarySymbolReference & {
    Http11: LibrarySymbolReference;
    Http2: LibrarySymbolReference;
    Http3: LibrarySymbolReference;
    SslApplicationProtocol: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Protocol: LibrarySymbolReference
  };
  SslCertificateTrust: LibrarySymbolReference & {
    CreateForX509Collection: LibrarySymbolReference;
    CreateForX509Store: LibrarySymbolReference
  };
  SslClientAuthenticationOptions: LibrarySymbolReference & {
    SslClientAuthenticationOptions: LibrarySymbolReference;
    AllowRenegotiation: LibrarySymbolReference;
    AllowTlsResume: LibrarySymbolReference;
    ApplicationProtocols: LibrarySymbolReference;
    CertificateChainPolicy: LibrarySymbolReference;
    CertificateRevocationCheckMode: LibrarySymbolReference;
    CipherSuitesPolicy: LibrarySymbolReference;
    ClientCertificateContext: LibrarySymbolReference;
    ClientCertificates: LibrarySymbolReference;
    EnabledSslProtocols: LibrarySymbolReference;
    EncryptionPolicy: LibrarySymbolReference;
    LocalCertificateSelectionCallback: LibrarySymbolReference;
    RemoteCertificateValidationCallback: LibrarySymbolReference;
    TargetHost: LibrarySymbolReference
  };
  SslClientHelloInfo: LibrarySymbolReference & {
    SslClientHelloInfo: LibrarySymbolReference;
    ServerName: LibrarySymbolReference;
    SslProtocols: LibrarySymbolReference
  };
  SslPolicyErrors: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    RemoteCertificateNotAvailable: LibrarySymbolReference;
    RemoteCertificateNameMismatch: LibrarySymbolReference;
    RemoteCertificateChainErrors: LibrarySymbolReference
  };
  SslServerAuthenticationOptions: LibrarySymbolReference & {
    SslServerAuthenticationOptions: LibrarySymbolReference;
    AllowRenegotiation: LibrarySymbolReference;
    AllowTlsResume: LibrarySymbolReference;
    ApplicationProtocols: LibrarySymbolReference;
    CertificateChainPolicy: LibrarySymbolReference;
    CertificateRevocationCheckMode: LibrarySymbolReference;
    CipherSuitesPolicy: LibrarySymbolReference;
    ClientCertificateRequired: LibrarySymbolReference;
    EnabledSslProtocols: LibrarySymbolReference;
    EncryptionPolicy: LibrarySymbolReference;
    RemoteCertificateValidationCallback: LibrarySymbolReference;
    ServerCertificate: LibrarySymbolReference;
    ServerCertificateContext: LibrarySymbolReference;
    ServerCertificateSelectionCallback: LibrarySymbolReference
  };
  SslStream: LibrarySymbolReference & {
    SslStream: LibrarySymbolReference;
    AuthenticateAsClient: LibrarySymbolReference;
    AuthenticateAsClientAsync: LibrarySymbolReference;
    AuthenticateAsServer: LibrarySymbolReference;
    AuthenticateAsServerAsync: LibrarySymbolReference;
    BeginAuthenticateAsClient: LibrarySymbolReference;
    BeginAuthenticateAsServer: LibrarySymbolReference;
    BeginRead: LibrarySymbolReference;
    BeginWrite: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    EndAuthenticateAsClient: LibrarySymbolReference;
    EndAuthenticateAsServer: LibrarySymbolReference;
    EndRead: LibrarySymbolReference;
    EndWrite: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    NegotiateClientCertificateAsync: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    ShutdownAsync: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanSeek: LibrarySymbolReference;
    CanTimeout: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    CheckCertRevocationStatus: LibrarySymbolReference;
    CipherAlgorithm: LibrarySymbolReference;
    CipherStrength: LibrarySymbolReference;
    HashAlgorithm: LibrarySymbolReference;
    HashStrength: LibrarySymbolReference;
    IsAuthenticated: LibrarySymbolReference;
    IsEncrypted: LibrarySymbolReference;
    IsMutuallyAuthenticated: LibrarySymbolReference;
    IsServer: LibrarySymbolReference;
    IsSigned: LibrarySymbolReference;
    KeyExchangeAlgorithm: LibrarySymbolReference;
    KeyExchangeStrength: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    LocalCertificate: LibrarySymbolReference;
    NegotiatedApplicationProtocol: LibrarySymbolReference;
    NegotiatedCipherSuite: LibrarySymbolReference;
    Position: LibrarySymbolReference;
    ReadTimeout: LibrarySymbolReference;
    RemoteCertificate: LibrarySymbolReference;
    SslProtocol: LibrarySymbolReference;
    TargetHostName: LibrarySymbolReference;
    TransportContext: LibrarySymbolReference;
    WriteTimeout: LibrarySymbolReference
  };
  SslStreamCertificateContext: LibrarySymbolReference & {
    Create: LibrarySymbolReference;
    IntermediateCertificates: LibrarySymbolReference;
    TargetCertificate: LibrarySymbolReference
  };
  TlsCipherSuite: LibrarySymbolReference & {

  }
};
const Security: SecurityLibrary = createLibrary("System.Net.Security", {
  AuthenticatedStream: {
    kind: "class",
    members: {
      AuthenticatedStream: {
        kind: "method",
        methodKind: "constructor",
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
      InnerStream: {
        kind: "property",
        type: () => {
          return IO.Stream;
        },
      },
      IsAuthenticated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      IsEncrypted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      IsMutuallyAuthenticated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      IsServer: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      IsSigned: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      LeaveInnerStreamOpen: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isAbstract: true,
  },
  AuthenticationLevel: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Security.AuthenticationLevel;
        },
      },
      MutualAuthRequested: {
        kind: "field",
        type: () => {
          return Security.AuthenticationLevel;
        },
      },
      MutualAuthRequired: {
        kind: "field",
        type: () => {
          return Security.AuthenticationLevel;
        },
      },
    },
  },
  CipherSuitesPolicy: {
    kind: "class",
    members: {
      CipherSuitesPolicy: {
        kind: "method",
        methodKind: "constructor",
      },
      AllowedCipherSuites: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
      },
    },
    isSealed: true,
  },
  EncryptionPolicy: {
    kind: "enum",
    members: {
      RequireEncryption: {
        kind: "field",
        type: () => {
          return Security.EncryptionPolicy;
        },
      },
      AllowNoEncryption: {
        kind: "field",
        type: () => {
          return Security.EncryptionPolicy;
        },
      },
      NoEncryption: {
        kind: "field",
        type: () => {
          return Security.EncryptionPolicy;
        },
      },
    },
  },
  LocalCertificateSelectionCallback: {
    kind: "generic",
    members: {
      LocalCertificateSelectionCallback: {
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
  NegotiateAuthentication: {
    kind: "class",
    members: {
      NegotiateAuthentication: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOutgoingBlob: {
        kind: "method",
        methodKind: "ordinary",
      },
      Unwrap: {
        kind: "method",
        methodKind: "ordinary",
      },
      UnwrapInPlace: {
        kind: "method",
        methodKind: "ordinary",
      },
      Wrap: {
        kind: "method",
        methodKind: "ordinary",
      },
      ComputeIntegrityCheck: {
        kind: "method",
        methodKind: "ordinary",
      },
      VerifyIntegrityCheck: {
        kind: "method",
        methodKind: "ordinary",
      },
      ImpersonationLevel: {
        kind: "property",
        type: () => {
          return Principal.TokenImpersonationLevel;
        },
      },
      IsAuthenticated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsEncrypted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsMutuallyAuthenticated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsServer: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSigned: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Package: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ProtectionLevel: {
        kind: "property",
        type: () => {
          return Security.ProtectionLevel;
        },
      },
      RemoteIdentity: {
        kind: "property",
        type: () => {
          return Principal.IIdentity;
        },
      },
      TargetName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  NegotiateAuthenticationClientOptions: {
    kind: "class",
    members: {
      NegotiateAuthenticationClientOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      AllowedImpersonationLevel: {
        kind: "property",
        type: () => {
          return Principal.TokenImpersonationLevel;
        },
      },
      Binding: {
        kind: "property",
        type: () => {
          return ExtendedProtection.ChannelBinding;
        },
      },
      Credential: {
        kind: "property",
        type: () => {
          return Net.NetworkCredential;
        },
      },
      Package: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      RequiredProtectionLevel: {
        kind: "property",
        type: () => {
          return Security.ProtectionLevel;
        },
      },
      RequireMutualAuthentication: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      TargetName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  NegotiateAuthenticationServerOptions: {
    kind: "class",
    members: {
      NegotiateAuthenticationServerOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      Binding: {
        kind: "property",
        type: () => {
          return ExtendedProtection.ChannelBinding;
        },
      },
      Credential: {
        kind: "property",
        type: () => {
          return Net.NetworkCredential;
        },
      },
      Package: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Policy: {
        kind: "property",
        type: () => {
          return ExtendedProtection.ExtendedProtectionPolicy;
        },
      },
      RequiredImpersonationLevel: {
        kind: "property",
        type: () => {
          return Principal.TokenImpersonationLevel;
        },
      },
      RequiredProtectionLevel: {
        kind: "property",
        type: () => {
          return Security.ProtectionLevel;
        },
      },
    },
  },
  NegotiateAuthenticationStatusCode: {
    kind: "enum",
    members: {
      Completed: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      ContinueNeeded: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      GenericFailure: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      BadBinding: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      Unsupported: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      MessageAltered: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      ContextExpired: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      CredentialsExpired: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      InvalidCredentials: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      InvalidToken: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      UnknownCredentials: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      QopNotSupported: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      OutOfSequence: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      SecurityQosFailed: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      TargetUnknown: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
      ImpersonationValidationFailed: {
        kind: "field",
        type: () => {
          return Security.NegotiateAuthenticationStatusCode;
        },
      },
    },
  },
  NegotiateStream: {
    kind: "class",
    members: {
      NegotiateStream: {
        kind: "method",
        methodKind: "constructor",
      },
      AuthenticateAsClient: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AuthenticateAsClientAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AuthenticateAsServer: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AuthenticateAsServerAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BeginAuthenticateAsClient: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BeginAuthenticateAsServer: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
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
      EndAuthenticateAsClient: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EndAuthenticateAsServer: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
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
      ImpersonationLevel: {
        kind: "property",
        type: () => {
          return Principal.TokenImpersonationLevel;
        },
        isVirtual: true,
      },
      IsAuthenticated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsEncrypted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsMutuallyAuthenticated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsServer: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsSigned: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
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
      ReadTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      RemoteIdentity: {
        kind: "property",
        type: () => {
          return Principal.IIdentity;
        },
        isVirtual: true,
      },
      WriteTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
  },
  ProtectionLevel: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Security.ProtectionLevel;
        },
      },
      Sign: {
        kind: "field",
        type: () => {
          return Security.ProtectionLevel;
        },
      },
      EncryptAndSign: {
        kind: "field",
        type: () => {
          return Security.ProtectionLevel;
        },
      },
    },
  },
  RemoteCertificateValidationCallback: {
    kind: "generic",
    members: {
      RemoteCertificateValidationCallback: {
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
  ServerCertificateSelectionCallback: {
    kind: "generic",
    members: {
      ServerCertificateSelectionCallback: {
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
  ServerOptionsSelectionCallback: {
    kind: "generic",
    members: {
      ServerOptionsSelectionCallback: {
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
  SslApplicationProtocol: {
    kind: "struct",
    members: {
      Http11: {
        kind: "field",
        type: () => {
          return Security.SslApplicationProtocol;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Http2: {
        kind: "field",
        type: () => {
          return Security.SslApplicationProtocol;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Http3: {
        kind: "field",
        type: () => {
          return Security.SslApplicationProtocol;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SslApplicationProtocol: {
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
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Protocol: {
        kind: "property",
        type: () => {
          return System.ReadOnlyMemory;
        },
      },
    },
  },
  SslCertificateTrust: {
    kind: "class",
    members: {
      CreateForX509Collection: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateForX509Store: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  SslClientAuthenticationOptions: {
    kind: "class",
    members: {
      SslClientAuthenticationOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      AllowRenegotiation: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AllowTlsResume: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ApplicationProtocols: {
        kind: "property",
        type: () => {
          return Generic.List;
        },
        isNullable: true,
      },
      CertificateChainPolicy: {
        kind: "property",
        type: () => {
          return X509Certificates.X509ChainPolicy;
        },
        isNullable: true,
      },
      CertificateRevocationCheckMode: {
        kind: "property",
        type: () => {
          return X509Certificates.X509RevocationMode;
        },
      },
      CipherSuitesPolicy: {
        kind: "property",
        type: () => {
          return Security.CipherSuitesPolicy;
        },
      },
      ClientCertificateContext: {
        kind: "property",
        type: () => {
          return Security.SslStreamCertificateContext;
        },
        isNullable: true,
      },
      ClientCertificates: {
        kind: "property",
        type: () => {
          return X509Certificates.X509CertificateCollection;
        },
        isNullable: true,
      },
      EnabledSslProtocols: {
        kind: "property",
        type: () => {
          return Authentication.SslProtocols;
        },
      },
      EncryptionPolicy: {
        kind: "property",
        type: () => {
          return Security.EncryptionPolicy;
        },
      },
      LocalCertificateSelectionCallback: {
        kind: "property",
        type: () => {
          return Security.LocalCertificateSelectionCallback;
        },
      },
      RemoteCertificateValidationCallback: {
        kind: "property",
        type: () => {
          return Security.RemoteCertificateValidationCallback;
        },
      },
      TargetHost: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  SslClientHelloInfo: {
    kind: "struct",
    members: {
      SslClientHelloInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      ServerName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SslProtocols: {
        kind: "property",
        type: () => {
          return Authentication.SslProtocols;
        },
      },
    },
  },
  SslPolicyErrors: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Security.SslPolicyErrors;
        },
      },
      RemoteCertificateNotAvailable: {
        kind: "field",
        type: () => {
          return Security.SslPolicyErrors;
        },
      },
      RemoteCertificateNameMismatch: {
        kind: "field",
        type: () => {
          return Security.SslPolicyErrors;
        },
      },
      RemoteCertificateChainErrors: {
        kind: "field",
        type: () => {
          return Security.SslPolicyErrors;
        },
      },
    },
  },
  SslServerAuthenticationOptions: {
    kind: "class",
    members: {
      SslServerAuthenticationOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      AllowRenegotiation: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AllowTlsResume: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ApplicationProtocols: {
        kind: "property",
        type: () => {
          return Generic.List;
        },
        isNullable: true,
      },
      CertificateChainPolicy: {
        kind: "property",
        type: () => {
          return X509Certificates.X509ChainPolicy;
        },
        isNullable: true,
      },
      CertificateRevocationCheckMode: {
        kind: "property",
        type: () => {
          return X509Certificates.X509RevocationMode;
        },
      },
      CipherSuitesPolicy: {
        kind: "property",
        type: () => {
          return Security.CipherSuitesPolicy;
        },
      },
      ClientCertificateRequired: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      EnabledSslProtocols: {
        kind: "property",
        type: () => {
          return Authentication.SslProtocols;
        },
      },
      EncryptionPolicy: {
        kind: "property",
        type: () => {
          return Security.EncryptionPolicy;
        },
      },
      RemoteCertificateValidationCallback: {
        kind: "property",
        type: () => {
          return Security.RemoteCertificateValidationCallback;
        },
      },
      ServerCertificate: {
        kind: "property",
        type: () => {
          return X509Certificates.X509Certificate;
        },
        isNullable: true,
      },
      ServerCertificateContext: {
        kind: "property",
        type: () => {
          return Security.SslStreamCertificateContext;
        },
        isNullable: true,
      },
      ServerCertificateSelectionCallback: {
        kind: "property",
        type: () => {
          return Security.ServerCertificateSelectionCallback;
        },
      },
    },
  },
  SslStream: {
    kind: "class",
    members: {
      SslStream: {
        kind: "method",
        methodKind: "constructor",
      },
      AuthenticateAsClient: {
        kind: "method",
        methodKind: "ordinary",
      },
      AuthenticateAsClientAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      AuthenticateAsServer: {
        kind: "method",
        methodKind: "ordinary",
      },
      AuthenticateAsServerAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginAuthenticateAsClient: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BeginAuthenticateAsServer: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
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
      EndAuthenticateAsClient: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EndAuthenticateAsServer: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
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
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
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
      NegotiateClientCertificateAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
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
      ShutdownAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteAsync: {
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
      CheckCertRevocationStatus: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      CipherAlgorithm: {
        kind: "property",
        type: () => {
          return Authentication.CipherAlgorithmType;
        },
        isVirtual: true,
      },
      CipherStrength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      HashAlgorithm: {
        kind: "property",
        type: () => {
          return Authentication.HashAlgorithmType;
        },
        isVirtual: true,
      },
      HashStrength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsAuthenticated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsEncrypted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsMutuallyAuthenticated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsServer: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsSigned: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      KeyExchangeAlgorithm: {
        kind: "property",
        type: () => {
          return Authentication.ExchangeAlgorithmType;
        },
        isVirtual: true,
      },
      KeyExchangeStrength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      LocalCertificate: {
        kind: "property",
        type: () => {
          return X509Certificates.X509Certificate;
        },
        isNullable: true,
        isVirtual: true,
      },
      NegotiatedApplicationProtocol: {
        kind: "property",
        type: () => {
          return Security.SslApplicationProtocol;
        },
      },
      NegotiatedCipherSuite: {
        kind: "property",
        type: () => {
          return Security.TlsCipherSuite;
        },
        isVirtual: true,
      },
      Position: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      ReadTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      RemoteCertificate: {
        kind: "property",
        type: () => {
          return X509Certificates.X509Certificate;
        },
        isNullable: true,
        isVirtual: true,
      },
      SslProtocol: {
        kind: "property",
        type: () => {
          return Authentication.SslProtocols;
        },
        isVirtual: true,
      },
      TargetHostName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      TransportContext: {
        kind: "property",
        type: () => {
          return Net.TransportContext;
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
  },
  SslStreamCertificateContext: {
    kind: "class",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IntermediateCertificates: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      TargetCertificate: {
        kind: "property",
        type: () => {
          return X509Certificates.X509Certificate2;
        },
      },
    },
  },
  TlsCipherSuite: {
    kind: "enum",
    members: {},
  },
});
export default Security
