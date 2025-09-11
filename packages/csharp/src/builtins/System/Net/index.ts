import Collections from "../Collections/index.js";
import Specialized from "../Collections/Specialized/index.js";
import System from "../index.js";
import IO from "../IO/index.js";
import Cache from "./Cache/index.js";
import Security from "./Security/index.js";
import Sockets from "./Sockets/index.js";
import X509Certificates from "../Security/Cryptography/X509Certificates/index.js";
import Security_2 from "../Security/index.js";
import Principal from "../Security/Principal/index.js";
import Text from "../Text/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Cache } from "./Cache/index.js";
export { default as Http } from "./Http/index.js";
export { default as Mail } from "./Mail/index.js";
export { default as Mime } from "./Mime/index.js";
export { default as NetworkInformation } from "./NetworkInformation/index.js";
export { default as Quic } from "./Quic/index.js";
export { default as Security } from "./Security/index.js";
export { default as Sockets } from "./Sockets/index.js";
export { default as WebSockets } from "./WebSockets/index.js";

type NetLibrary = LibrarySymbolReference & {
  AuthenticationManager: LibrarySymbolReference & {
    Authenticate: LibrarySymbolReference;
    PreAuthenticate: LibrarySymbolReference;
    Register: LibrarySymbolReference;
    Unregister: LibrarySymbolReference;
    CredentialPolicy: LibrarySymbolReference;
    CustomTargetNameDictionary: LibrarySymbolReference;
    RegisteredModules: LibrarySymbolReference
  };
  AuthenticationSchemeSelector: LibrarySymbolReference & {
    AuthenticationSchemeSelector: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  AuthenticationSchemes: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Digest: LibrarySymbolReference;
    Negotiate: LibrarySymbolReference;
    Ntlm: LibrarySymbolReference;
    IntegratedWindowsAuthentication: LibrarySymbolReference;
    Basic: LibrarySymbolReference;
    Anonymous: LibrarySymbolReference
  };
  Authorization: LibrarySymbolReference & {
    Authorization: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    ConnectionGroupId: LibrarySymbolReference;
    Message: LibrarySymbolReference;
    MutuallyAuthenticated: LibrarySymbolReference;
    ProtectionRealm: LibrarySymbolReference
  };
  BindIPEndPoint: LibrarySymbolReference & {
    BindIPEndPoint: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  Cookie: LibrarySymbolReference & {
    Cookie: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Comment: LibrarySymbolReference;
    CommentUri: LibrarySymbolReference;
    Discard: LibrarySymbolReference;
    Domain: LibrarySymbolReference;
    Expired: LibrarySymbolReference;
    Expires: LibrarySymbolReference;
    HttpOnly: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Path: LibrarySymbolReference;
    Port: LibrarySymbolReference;
    Secure: LibrarySymbolReference;
    TimeStamp: LibrarySymbolReference;
    Value: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  CookieCollection: LibrarySymbolReference & {
    CookieCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  CookieContainer: LibrarySymbolReference & {
    DefaultCookieLengthLimit: LibrarySymbolReference;
    DefaultCookieLimit: LibrarySymbolReference;
    DefaultPerDomainCookieLimit: LibrarySymbolReference;
    CookieContainer: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    GetAllCookies: LibrarySymbolReference;
    GetCookieHeader: LibrarySymbolReference;
    GetCookies: LibrarySymbolReference;
    SetCookies: LibrarySymbolReference;
    Capacity: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    MaxCookieSize: LibrarySymbolReference;
    PerDomainCapacity: LibrarySymbolReference
  };
  CookieException: LibrarySymbolReference & {
    CookieException: LibrarySymbolReference
  };
  CredentialCache: LibrarySymbolReference & {
    CredentialCache: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    GetCredential: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    DefaultCredentials: LibrarySymbolReference;
    DefaultNetworkCredentials: LibrarySymbolReference
  };
  DecompressionMethods: LibrarySymbolReference & {
    All: LibrarySymbolReference;
    None: LibrarySymbolReference;
    GZip: LibrarySymbolReference;
    Deflate: LibrarySymbolReference;
    Brotli: LibrarySymbolReference
  };
  Dns: LibrarySymbolReference & {
    BeginGetHostAddresses: LibrarySymbolReference;
    BeginGetHostByName: LibrarySymbolReference;
    BeginGetHostEntry: LibrarySymbolReference;
    BeginResolve: LibrarySymbolReference;
    EndGetHostAddresses: LibrarySymbolReference;
    EndGetHostByName: LibrarySymbolReference;
    EndGetHostEntry: LibrarySymbolReference;
    EndResolve: LibrarySymbolReference;
    GetHostAddresses: LibrarySymbolReference;
    GetHostAddressesAsync: LibrarySymbolReference;
    GetHostByAddress: LibrarySymbolReference;
    GetHostByName: LibrarySymbolReference;
    GetHostEntry: LibrarySymbolReference;
    GetHostEntryAsync: LibrarySymbolReference;
    GetHostName: LibrarySymbolReference;
    Resolve: LibrarySymbolReference
  };
  DnsEndPoint: LibrarySymbolReference & {
    DnsEndPoint: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    AddressFamily: LibrarySymbolReference;
    Host: LibrarySymbolReference;
    Port: LibrarySymbolReference
  };
  DownloadDataCompletedEventArgs: LibrarySymbolReference & {
    Result: LibrarySymbolReference
  };
  DownloadDataCompletedEventHandler: LibrarySymbolReference & {
    DownloadDataCompletedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  DownloadProgressChangedEventArgs: LibrarySymbolReference & {
    BytesReceived: LibrarySymbolReference;
    TotalBytesToReceive: LibrarySymbolReference
  };
  DownloadProgressChangedEventHandler: LibrarySymbolReference & {
    DownloadProgressChangedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  DownloadStringCompletedEventArgs: LibrarySymbolReference & {
    Result: LibrarySymbolReference
  };
  DownloadStringCompletedEventHandler: LibrarySymbolReference & {
    DownloadStringCompletedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  EndPoint: LibrarySymbolReference & {
    EndPoint: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Serialize: LibrarySymbolReference;
    AddressFamily: LibrarySymbolReference
  };
  FileWebRequest: LibrarySymbolReference & {
    Abort: LibrarySymbolReference;
    BeginGetRequestStream: LibrarySymbolReference;
    BeginGetResponse: LibrarySymbolReference;
    EndGetRequestStream: LibrarySymbolReference;
    EndGetResponse: LibrarySymbolReference;
    GetObjectData: LibrarySymbolReference;
    GetRequestStream: LibrarySymbolReference;
    GetRequestStreamAsync: LibrarySymbolReference;
    GetResponse: LibrarySymbolReference;
    GetResponseAsync: LibrarySymbolReference;
    ConnectionGroupName: LibrarySymbolReference;
    ContentLength: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    Credentials: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    PreAuthenticate: LibrarySymbolReference;
    Proxy: LibrarySymbolReference;
    RequestUri: LibrarySymbolReference;
    Timeout: LibrarySymbolReference;
    UseDefaultCredentials: LibrarySymbolReference
  };
  FileWebResponse: LibrarySymbolReference & {
    Close: LibrarySymbolReference;
    GetObjectData: LibrarySymbolReference;
    GetResponseStream: LibrarySymbolReference;
    ContentLength: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    ResponseUri: LibrarySymbolReference;
    SupportsHeaders: LibrarySymbolReference
  };
  FtpStatusCode: LibrarySymbolReference & {
    Undefined: LibrarySymbolReference;
    RestartMarker: LibrarySymbolReference;
    ServiceTemporarilyNotAvailable: LibrarySymbolReference;
    DataAlreadyOpen: LibrarySymbolReference;
    OpeningData: LibrarySymbolReference;
    CommandOK: LibrarySymbolReference;
    CommandExtraneous: LibrarySymbolReference;
    DirectoryStatus: LibrarySymbolReference;
    FileStatus: LibrarySymbolReference;
    SystemType: LibrarySymbolReference;
    SendUserCommand: LibrarySymbolReference;
    ClosingControl: LibrarySymbolReference;
    ClosingData: LibrarySymbolReference;
    EnteringPassive: LibrarySymbolReference;
    LoggedInProceed: LibrarySymbolReference;
    ServerWantsSecureSession: LibrarySymbolReference;
    FileActionOK: LibrarySymbolReference;
    PathnameCreated: LibrarySymbolReference;
    SendPasswordCommand: LibrarySymbolReference;
    NeedLoginAccount: LibrarySymbolReference;
    FileCommandPending: LibrarySymbolReference;
    ServiceNotAvailable: LibrarySymbolReference;
    CantOpenData: LibrarySymbolReference;
    ConnectionClosed: LibrarySymbolReference;
    ActionNotTakenFileUnavailableOrBusy: LibrarySymbolReference;
    ActionAbortedLocalProcessingError: LibrarySymbolReference;
    ActionNotTakenInsufficientSpace: LibrarySymbolReference;
    CommandSyntaxError: LibrarySymbolReference;
    ArgumentSyntaxError: LibrarySymbolReference;
    CommandNotImplemented: LibrarySymbolReference;
    BadCommandSequence: LibrarySymbolReference;
    NotLoggedIn: LibrarySymbolReference;
    AccountNeeded: LibrarySymbolReference;
    ActionNotTakenFileUnavailable: LibrarySymbolReference;
    ActionAbortedUnknownPageType: LibrarySymbolReference;
    FileActionAborted: LibrarySymbolReference;
    ActionNotTakenFilenameNotAllowed: LibrarySymbolReference
  };
  FtpWebRequest: LibrarySymbolReference & {
    Abort: LibrarySymbolReference;
    BeginGetRequestStream: LibrarySymbolReference;
    BeginGetResponse: LibrarySymbolReference;
    EndGetRequestStream: LibrarySymbolReference;
    EndGetResponse: LibrarySymbolReference;
    GetRequestStream: LibrarySymbolReference;
    GetResponse: LibrarySymbolReference;
    ClientCertificates: LibrarySymbolReference;
    ConnectionGroupName: LibrarySymbolReference;
    ContentLength: LibrarySymbolReference;
    ContentOffset: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    Credentials: LibrarySymbolReference;
    DefaultCachePolicy: LibrarySymbolReference;
    EnableSsl: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    KeepAlive: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    PreAuthenticate: LibrarySymbolReference;
    Proxy: LibrarySymbolReference;
    ReadWriteTimeout: LibrarySymbolReference;
    RenameTo: LibrarySymbolReference;
    RequestUri: LibrarySymbolReference;
    ServicePoint: LibrarySymbolReference;
    Timeout: LibrarySymbolReference;
    UseBinary: LibrarySymbolReference;
    UseDefaultCredentials: LibrarySymbolReference;
    UsePassive: LibrarySymbolReference
  };
  FtpWebResponse: LibrarySymbolReference & {
    Close: LibrarySymbolReference;
    GetResponseStream: LibrarySymbolReference;
    BannerMessage: LibrarySymbolReference;
    ContentLength: LibrarySymbolReference;
    ExitMessage: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    LastModified: LibrarySymbolReference;
    ResponseUri: LibrarySymbolReference;
    StatusCode: LibrarySymbolReference;
    StatusDescription: LibrarySymbolReference;
    SupportsHeaders: LibrarySymbolReference;
    WelcomeMessage: LibrarySymbolReference
  };
  GlobalProxySelection: LibrarySymbolReference & {
    GlobalProxySelection: LibrarySymbolReference;
    GetEmptyWebProxy: LibrarySymbolReference;
    Select: LibrarySymbolReference
  };
  HttpContinueDelegate: LibrarySymbolReference & {
    HttpContinueDelegate: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  HttpListener: LibrarySymbolReference & {
    ExtendedProtectionSelector: LibrarySymbolReference & {
      ExtendedProtectionSelector: LibrarySymbolReference;
      Invoke: LibrarySymbolReference;
      BeginInvoke: LibrarySymbolReference;
      EndInvoke: LibrarySymbolReference
    }
  };
  HttpListenerBasicIdentity: LibrarySymbolReference & {
    HttpListenerBasicIdentity: LibrarySymbolReference;
    Password: LibrarySymbolReference
  };
  HttpListenerContext: LibrarySymbolReference & {
    AcceptWebSocketAsync: LibrarySymbolReference;
    Request: LibrarySymbolReference;
    Response: LibrarySymbolReference;
    User: LibrarySymbolReference
  };
  HttpListenerException: LibrarySymbolReference & {
    HttpListenerException: LibrarySymbolReference;
    ErrorCode: LibrarySymbolReference
  };
  HttpListenerPrefixCollection: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference
  };
  HttpListenerRequest: LibrarySymbolReference & {
    BeginGetClientCertificate: LibrarySymbolReference;
    EndGetClientCertificate: LibrarySymbolReference;
    GetClientCertificate: LibrarySymbolReference;
    GetClientCertificateAsync: LibrarySymbolReference;
    AcceptTypes: LibrarySymbolReference;
    ClientCertificateError: LibrarySymbolReference;
    ContentEncoding: LibrarySymbolReference;
    ContentLength64: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    Cookies: LibrarySymbolReference;
    HasEntityBody: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    HttpMethod: LibrarySymbolReference;
    InputStream: LibrarySymbolReference;
    IsAuthenticated: LibrarySymbolReference;
    IsLocal: LibrarySymbolReference;
    IsSecureConnection: LibrarySymbolReference;
    IsWebSocketRequest: LibrarySymbolReference;
    KeepAlive: LibrarySymbolReference;
    LocalEndPoint: LibrarySymbolReference;
    ProtocolVersion: LibrarySymbolReference;
    QueryString: LibrarySymbolReference;
    RawUrl: LibrarySymbolReference;
    RemoteEndPoint: LibrarySymbolReference;
    RequestTraceIdentifier: LibrarySymbolReference;
    ServiceName: LibrarySymbolReference;
    TransportContext: LibrarySymbolReference;
    Url: LibrarySymbolReference;
    UrlReferrer: LibrarySymbolReference;
    UserAgent: LibrarySymbolReference;
    UserHostAddress: LibrarySymbolReference;
    UserHostName: LibrarySymbolReference;
    UserLanguages: LibrarySymbolReference
  };
  HttpListenerResponse: LibrarySymbolReference & {
    Abort: LibrarySymbolReference;
    AddHeader: LibrarySymbolReference;
    AppendCookie: LibrarySymbolReference;
    AppendHeader: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    CopyFrom: LibrarySymbolReference;
    Redirect: LibrarySymbolReference;
    SetCookie: LibrarySymbolReference;
    ContentEncoding: LibrarySymbolReference;
    ContentLength64: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    Cookies: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    KeepAlive: LibrarySymbolReference;
    OutputStream: LibrarySymbolReference;
    ProtocolVersion: LibrarySymbolReference;
    RedirectLocation: LibrarySymbolReference;
    SendChunked: LibrarySymbolReference;
    StatusCode: LibrarySymbolReference;
    StatusDescription: LibrarySymbolReference
  };
  HttpListenerTimeoutManager: LibrarySymbolReference & {
    DrainEntityBody: LibrarySymbolReference;
    EntityBody: LibrarySymbolReference;
    HeaderWait: LibrarySymbolReference;
    IdleConnection: LibrarySymbolReference;
    MinSendBytesPerSecond: LibrarySymbolReference;
    RequestQueue: LibrarySymbolReference
  };
  HttpRequestHeader: LibrarySymbolReference & {
    CacheControl: LibrarySymbolReference;
    Connection: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    KeepAlive: LibrarySymbolReference;
    Pragma: LibrarySymbolReference;
    Trailer: LibrarySymbolReference;
    TransferEncoding: LibrarySymbolReference;
    Upgrade: LibrarySymbolReference;
    Via: LibrarySymbolReference;
    Warning: LibrarySymbolReference;
    Allow: LibrarySymbolReference;
    ContentLength: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    ContentEncoding: LibrarySymbolReference;
    ContentLanguage: LibrarySymbolReference;
    ContentLocation: LibrarySymbolReference;
    ContentMd5: LibrarySymbolReference;
    ContentRange: LibrarySymbolReference;
    Expires: LibrarySymbolReference;
    LastModified: LibrarySymbolReference;
    Accept: LibrarySymbolReference;
    AcceptCharset: LibrarySymbolReference;
    AcceptEncoding: LibrarySymbolReference;
    AcceptLanguage: LibrarySymbolReference;
    Authorization: LibrarySymbolReference;
    Cookie: LibrarySymbolReference;
    Expect: LibrarySymbolReference;
    From: LibrarySymbolReference;
    Host: LibrarySymbolReference;
    IfMatch: LibrarySymbolReference;
    IfModifiedSince: LibrarySymbolReference;
    IfNoneMatch: LibrarySymbolReference;
    IfRange: LibrarySymbolReference;
    IfUnmodifiedSince: LibrarySymbolReference;
    MaxForwards: LibrarySymbolReference;
    ProxyAuthorization: LibrarySymbolReference;
    Referer: LibrarySymbolReference;
    Range: LibrarySymbolReference;
    Te: LibrarySymbolReference;
    Translate: LibrarySymbolReference;
    UserAgent: LibrarySymbolReference
  };
  HttpResponseHeader: LibrarySymbolReference & {
    CacheControl: LibrarySymbolReference;
    Connection: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    KeepAlive: LibrarySymbolReference;
    Pragma: LibrarySymbolReference;
    Trailer: LibrarySymbolReference;
    TransferEncoding: LibrarySymbolReference;
    Upgrade: LibrarySymbolReference;
    Via: LibrarySymbolReference;
    Warning: LibrarySymbolReference;
    Allow: LibrarySymbolReference;
    ContentLength: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    ContentEncoding: LibrarySymbolReference;
    ContentLanguage: LibrarySymbolReference;
    ContentLocation: LibrarySymbolReference;
    ContentMd5: LibrarySymbolReference;
    ContentRange: LibrarySymbolReference;
    Expires: LibrarySymbolReference;
    LastModified: LibrarySymbolReference;
    AcceptRanges: LibrarySymbolReference;
    Age: LibrarySymbolReference;
    ETag: LibrarySymbolReference;
    Location: LibrarySymbolReference;
    ProxyAuthenticate: LibrarySymbolReference;
    RetryAfter: LibrarySymbolReference;
    Server: LibrarySymbolReference;
    SetCookie: LibrarySymbolReference;
    Vary: LibrarySymbolReference;
    WwwAuthenticate: LibrarySymbolReference
  };
  HttpStatusCode: LibrarySymbolReference & {
    Continue: LibrarySymbolReference;
    SwitchingProtocols: LibrarySymbolReference;
    Processing: LibrarySymbolReference;
    EarlyHints: LibrarySymbolReference;
    OK: LibrarySymbolReference;
    Created: LibrarySymbolReference;
    Accepted: LibrarySymbolReference;
    NonAuthoritativeInformation: LibrarySymbolReference;
    NoContent: LibrarySymbolReference;
    ResetContent: LibrarySymbolReference;
    PartialContent: LibrarySymbolReference;
    MultiStatus: LibrarySymbolReference;
    AlreadyReported: LibrarySymbolReference;
    IMUsed: LibrarySymbolReference;
    Ambiguous: LibrarySymbolReference;
    MultipleChoices: LibrarySymbolReference;
    Moved: LibrarySymbolReference;
    MovedPermanently: LibrarySymbolReference;
    Found: LibrarySymbolReference;
    Redirect: LibrarySymbolReference;
    RedirectMethod: LibrarySymbolReference;
    SeeOther: LibrarySymbolReference;
    NotModified: LibrarySymbolReference;
    UseProxy: LibrarySymbolReference;
    Unused: LibrarySymbolReference;
    RedirectKeepVerb: LibrarySymbolReference;
    TemporaryRedirect: LibrarySymbolReference;
    PermanentRedirect: LibrarySymbolReference;
    BadRequest: LibrarySymbolReference;
    Unauthorized: LibrarySymbolReference;
    PaymentRequired: LibrarySymbolReference;
    Forbidden: LibrarySymbolReference;
    NotFound: LibrarySymbolReference;
    MethodNotAllowed: LibrarySymbolReference;
    NotAcceptable: LibrarySymbolReference;
    ProxyAuthenticationRequired: LibrarySymbolReference;
    RequestTimeout: LibrarySymbolReference;
    Conflict: LibrarySymbolReference;
    Gone: LibrarySymbolReference;
    LengthRequired: LibrarySymbolReference;
    PreconditionFailed: LibrarySymbolReference;
    RequestEntityTooLarge: LibrarySymbolReference;
    RequestUriTooLong: LibrarySymbolReference;
    UnsupportedMediaType: LibrarySymbolReference;
    RequestedRangeNotSatisfiable: LibrarySymbolReference;
    ExpectationFailed: LibrarySymbolReference;
    MisdirectedRequest: LibrarySymbolReference;
    UnprocessableEntity: LibrarySymbolReference;
    UnprocessableContent: LibrarySymbolReference;
    Locked: LibrarySymbolReference;
    FailedDependency: LibrarySymbolReference;
    UpgradeRequired: LibrarySymbolReference;
    PreconditionRequired: LibrarySymbolReference;
    TooManyRequests: LibrarySymbolReference;
    RequestHeaderFieldsTooLarge: LibrarySymbolReference;
    UnavailableForLegalReasons: LibrarySymbolReference;
    InternalServerError: LibrarySymbolReference;
    NotImplemented: LibrarySymbolReference;
    BadGateway: LibrarySymbolReference;
    ServiceUnavailable: LibrarySymbolReference;
    GatewayTimeout: LibrarySymbolReference;
    HttpVersionNotSupported: LibrarySymbolReference;
    VariantAlsoNegotiates: LibrarySymbolReference;
    InsufficientStorage: LibrarySymbolReference;
    LoopDetected: LibrarySymbolReference;
    NotExtended: LibrarySymbolReference;
    NetworkAuthenticationRequired: LibrarySymbolReference
  };
  HttpVersion: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Version10: LibrarySymbolReference;
    Version11: LibrarySymbolReference;
    Version20: LibrarySymbolReference;
    Version30: LibrarySymbolReference
  };
  HttpWebRequest: LibrarySymbolReference & {
    Abort: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    BeginGetRequestStream: LibrarySymbolReference;
    BeginGetResponse: LibrarySymbolReference;
    EndGetRequestStream: LibrarySymbolReference;
    EndGetResponse: LibrarySymbolReference;
    GetObjectData: LibrarySymbolReference;
    GetRequestStream: LibrarySymbolReference;
    GetResponse: LibrarySymbolReference;
    Accept: LibrarySymbolReference;
    Address: LibrarySymbolReference;
    AllowAutoRedirect: LibrarySymbolReference;
    AllowReadStreamBuffering: LibrarySymbolReference;
    AllowWriteStreamBuffering: LibrarySymbolReference;
    AutomaticDecompression: LibrarySymbolReference;
    ClientCertificates: LibrarySymbolReference;
    Connection: LibrarySymbolReference;
    ConnectionGroupName: LibrarySymbolReference;
    ContentLength: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    ContinueDelegate: LibrarySymbolReference;
    ContinueTimeout: LibrarySymbolReference;
    CookieContainer: LibrarySymbolReference;
    Credentials: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    DefaultCachePolicy: LibrarySymbolReference;
    DefaultMaximumErrorResponseLength: LibrarySymbolReference;
    DefaultMaximumResponseHeadersLength: LibrarySymbolReference;
    Expect: LibrarySymbolReference;
    HaveResponse: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    Host: LibrarySymbolReference;
    IfModifiedSince: LibrarySymbolReference;
    KeepAlive: LibrarySymbolReference;
    MaximumAutomaticRedirections: LibrarySymbolReference;
    MaximumResponseHeadersLength: LibrarySymbolReference;
    MediaType: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    Pipelined: LibrarySymbolReference;
    PreAuthenticate: LibrarySymbolReference;
    ProtocolVersion: LibrarySymbolReference;
    Proxy: LibrarySymbolReference;
    ReadWriteTimeout: LibrarySymbolReference;
    Referer: LibrarySymbolReference;
    RequestUri: LibrarySymbolReference;
    SendChunked: LibrarySymbolReference;
    ServerCertificateValidationCallback: LibrarySymbolReference;
    ServicePoint: LibrarySymbolReference;
    SupportsCookieContainer: LibrarySymbolReference;
    Timeout: LibrarySymbolReference;
    TransferEncoding: LibrarySymbolReference;
    UnsafeAuthenticatedConnectionSharing: LibrarySymbolReference;
    UseDefaultCredentials: LibrarySymbolReference;
    UserAgent: LibrarySymbolReference
  };
  HttpWebResponse: LibrarySymbolReference & {
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetObjectData: LibrarySymbolReference;
    GetResponseHeader: LibrarySymbolReference;
    GetResponseStream: LibrarySymbolReference;
    CharacterSet: LibrarySymbolReference;
    ContentEncoding: LibrarySymbolReference;
    ContentLength: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    Cookies: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    IsMutuallyAuthenticated: LibrarySymbolReference;
    LastModified: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    ProtocolVersion: LibrarySymbolReference;
    ResponseUri: LibrarySymbolReference;
    Server: LibrarySymbolReference;
    StatusCode: LibrarySymbolReference;
    StatusDescription: LibrarySymbolReference;
    SupportsHeaders: LibrarySymbolReference
  };
  IAuthenticationModule: LibrarySymbolReference & {
    Authenticate: LibrarySymbolReference;
    PreAuthenticate: LibrarySymbolReference;
    AuthenticationType: LibrarySymbolReference;
    CanPreAuthenticate: LibrarySymbolReference
  };
  ICredentialPolicy: LibrarySymbolReference & {
    ShouldSendCredential: LibrarySymbolReference
  };
  ICredentials: LibrarySymbolReference & {
    GetCredential: LibrarySymbolReference
  };
  ICredentialsByHost: LibrarySymbolReference & {
    GetCredential: LibrarySymbolReference
  };
  IPAddress: LibrarySymbolReference & {
    Any: LibrarySymbolReference;
    Broadcast: LibrarySymbolReference;
    IPv6Any: LibrarySymbolReference;
    IPv6Loopback: LibrarySymbolReference;
    IPv6None: LibrarySymbolReference;
    Loopback: LibrarySymbolReference;
    None: LibrarySymbolReference;
    IPAddress: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetAddressBytes: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    HostToNetworkOrder: LibrarySymbolReference;
    IsLoopback: LibrarySymbolReference;
    MapToIPv4: LibrarySymbolReference;
    MapToIPv6: LibrarySymbolReference;
    NetworkToHostOrder: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryFormat: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    TryWriteBytes: LibrarySymbolReference;
    Address: LibrarySymbolReference;
    AddressFamily: LibrarySymbolReference;
    IsIPv4MappedToIPv6: LibrarySymbolReference;
    IsIPv6LinkLocal: LibrarySymbolReference;
    IsIPv6Multicast: LibrarySymbolReference;
    IsIPv6SiteLocal: LibrarySymbolReference;
    IsIPv6Teredo: LibrarySymbolReference;
    IsIPv6UniqueLocal: LibrarySymbolReference;
    ScopeId: LibrarySymbolReference
  };
  IPEndPoint: LibrarySymbolReference & {
    MaxPort: LibrarySymbolReference;
    MinPort: LibrarySymbolReference;
    IPEndPoint: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    Serialize: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Address: LibrarySymbolReference;
    AddressFamily: LibrarySymbolReference;
    Port: LibrarySymbolReference
  };
  IPHostEntry: LibrarySymbolReference & {
    IPHostEntry: LibrarySymbolReference;
    AddressList: LibrarySymbolReference;
    Aliases: LibrarySymbolReference;
    HostName: LibrarySymbolReference
  };
  IPNetwork: LibrarySymbolReference & {
    IPNetwork: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryFormat: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    BaseAddress: LibrarySymbolReference;
    PrefixLength: LibrarySymbolReference
  };
  IWebProxy: LibrarySymbolReference & {
    GetProxy: LibrarySymbolReference;
    IsBypassed: LibrarySymbolReference;
    Credentials: LibrarySymbolReference
  };
  IWebProxyScript: LibrarySymbolReference & {
    Close: LibrarySymbolReference;
    Load: LibrarySymbolReference;
    Run: LibrarySymbolReference
  };
  IWebRequestCreate: LibrarySymbolReference & {
    Create: LibrarySymbolReference
  };
  NetworkCredential: LibrarySymbolReference & {
    NetworkCredential: LibrarySymbolReference;
    GetCredential: LibrarySymbolReference;
    Domain: LibrarySymbolReference;
    Password: LibrarySymbolReference;
    SecurePassword: LibrarySymbolReference;
    UserName: LibrarySymbolReference
  };
  OpenReadCompletedEventArgs: LibrarySymbolReference & {
    Result: LibrarySymbolReference
  };
  OpenReadCompletedEventHandler: LibrarySymbolReference & {
    OpenReadCompletedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  OpenWriteCompletedEventArgs: LibrarySymbolReference & {
    Result: LibrarySymbolReference
  };
  OpenWriteCompletedEventHandler: LibrarySymbolReference & {
    OpenWriteCompletedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  ProtocolViolationException: LibrarySymbolReference & {
    ProtocolViolationException: LibrarySymbolReference
  };
  SecurityProtocolType: LibrarySymbolReference & {
    SystemDefault: LibrarySymbolReference;
    Ssl3: LibrarySymbolReference;
    Tls: LibrarySymbolReference;
    Tls11: LibrarySymbolReference;
    Tls12: LibrarySymbolReference;
    Tls13: LibrarySymbolReference
  };
  ServicePoint: LibrarySymbolReference & {
    CloseConnectionGroup: LibrarySymbolReference;
    SetTcpKeepAlive: LibrarySymbolReference;
    Address: LibrarySymbolReference;
    BindIPEndPointDelegate: LibrarySymbolReference;
    Certificate: LibrarySymbolReference;
    ClientCertificate: LibrarySymbolReference;
    ConnectionLeaseTimeout: LibrarySymbolReference;
    ConnectionLimit: LibrarySymbolReference;
    ConnectionName: LibrarySymbolReference;
    CurrentConnections: LibrarySymbolReference;
    Expect100Continue: LibrarySymbolReference;
    IdleSince: LibrarySymbolReference;
    MaxIdleTime: LibrarySymbolReference;
    ProtocolVersion: LibrarySymbolReference;
    ReceiveBufferSize: LibrarySymbolReference;
    SupportsPipelining: LibrarySymbolReference;
    UseNagleAlgorithm: LibrarySymbolReference
  };
  ServicePointManager: LibrarySymbolReference & {
    DefaultNonPersistentConnectionLimit: LibrarySymbolReference;
    DefaultPersistentConnectionLimit: LibrarySymbolReference;
    FindServicePoint: LibrarySymbolReference;
    SetTcpKeepAlive: LibrarySymbolReference;
    CheckCertificateRevocationList: LibrarySymbolReference;
    DefaultConnectionLimit: LibrarySymbolReference;
    DnsRefreshTimeout: LibrarySymbolReference;
    EnableDnsRoundRobin: LibrarySymbolReference;
    EncryptionPolicy: LibrarySymbolReference;
    Expect100Continue: LibrarySymbolReference;
    MaxServicePointIdleTime: LibrarySymbolReference;
    MaxServicePoints: LibrarySymbolReference;
    ReusePort: LibrarySymbolReference;
    SecurityProtocol: LibrarySymbolReference;
    ServerCertificateValidationCallback: LibrarySymbolReference;
    UseNagleAlgorithm: LibrarySymbolReference
  };
  SocketAddress: LibrarySymbolReference & {
    SocketAddress: LibrarySymbolReference;
    GetMaximumAddressSize: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Family: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Size: LibrarySymbolReference;
    Buffer: LibrarySymbolReference
  };
  TransportContext: LibrarySymbolReference & {
    TransportContext: LibrarySymbolReference;
    GetChannelBinding: LibrarySymbolReference
  };
  UploadDataCompletedEventArgs: LibrarySymbolReference & {
    Result: LibrarySymbolReference
  };
  UploadDataCompletedEventHandler: LibrarySymbolReference & {
    UploadDataCompletedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  UploadFileCompletedEventArgs: LibrarySymbolReference & {
    Result: LibrarySymbolReference
  };
  UploadFileCompletedEventHandler: LibrarySymbolReference & {
    UploadFileCompletedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  UploadProgressChangedEventArgs: LibrarySymbolReference & {
    BytesReceived: LibrarySymbolReference;
    BytesSent: LibrarySymbolReference;
    TotalBytesToReceive: LibrarySymbolReference;
    TotalBytesToSend: LibrarySymbolReference
  };
  UploadProgressChangedEventHandler: LibrarySymbolReference & {
    UploadProgressChangedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  UploadStringCompletedEventArgs: LibrarySymbolReference & {
    Result: LibrarySymbolReference
  };
  UploadStringCompletedEventHandler: LibrarySymbolReference & {
    UploadStringCompletedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  UploadValuesCompletedEventArgs: LibrarySymbolReference & {
    Result: LibrarySymbolReference
  };
  UploadValuesCompletedEventHandler: LibrarySymbolReference & {
    UploadValuesCompletedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  WebClient: LibrarySymbolReference & {
    WebClient: LibrarySymbolReference;
    CancelAsync: LibrarySymbolReference;
    DownloadData: LibrarySymbolReference;
    DownloadDataAsync: LibrarySymbolReference;
    DownloadDataTaskAsync: LibrarySymbolReference;
    DownloadFile: LibrarySymbolReference;
    DownloadFileAsync: LibrarySymbolReference;
    DownloadFileTaskAsync: LibrarySymbolReference;
    DownloadString: LibrarySymbolReference;
    DownloadStringAsync: LibrarySymbolReference;
    DownloadStringTaskAsync: LibrarySymbolReference;
    GetWebRequest: LibrarySymbolReference;
    GetWebResponse: LibrarySymbolReference;
    OnDownloadDataCompleted: LibrarySymbolReference;
    OnDownloadFileCompleted: LibrarySymbolReference;
    OnDownloadProgressChanged: LibrarySymbolReference;
    OnDownloadStringCompleted: LibrarySymbolReference;
    OnOpenReadCompleted: LibrarySymbolReference;
    OnOpenWriteCompleted: LibrarySymbolReference;
    OnUploadDataCompleted: LibrarySymbolReference;
    OnUploadFileCompleted: LibrarySymbolReference;
    OnUploadProgressChanged: LibrarySymbolReference;
    OnUploadStringCompleted: LibrarySymbolReference;
    OnUploadValuesCompleted: LibrarySymbolReference;
    OpenRead: LibrarySymbolReference;
    OpenReadAsync: LibrarySymbolReference;
    OpenReadTaskAsync: LibrarySymbolReference;
    OpenWrite: LibrarySymbolReference;
    OpenWriteAsync: LibrarySymbolReference;
    OpenWriteTaskAsync: LibrarySymbolReference;
    UploadData: LibrarySymbolReference;
    UploadDataAsync: LibrarySymbolReference;
    UploadDataTaskAsync: LibrarySymbolReference;
    UploadFile: LibrarySymbolReference;
    UploadFileAsync: LibrarySymbolReference;
    UploadFileTaskAsync: LibrarySymbolReference;
    UploadString: LibrarySymbolReference;
    UploadStringAsync: LibrarySymbolReference;
    UploadStringTaskAsync: LibrarySymbolReference;
    UploadValues: LibrarySymbolReference;
    UploadValuesAsync: LibrarySymbolReference;
    UploadValuesTaskAsync: LibrarySymbolReference;
    BaseAddress: LibrarySymbolReference;
    CachePolicy: LibrarySymbolReference;
    Credentials: LibrarySymbolReference;
    Encoding: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    IsBusy: LibrarySymbolReference;
    Proxy: LibrarySymbolReference;
    QueryString: LibrarySymbolReference;
    ResponseHeaders: LibrarySymbolReference;
    UseDefaultCredentials: LibrarySymbolReference
  };
  WebException: LibrarySymbolReference & {
    WebException: LibrarySymbolReference;
    Response: LibrarySymbolReference;
    Status: LibrarySymbolReference
  };
  WebExceptionStatus: LibrarySymbolReference & {
    Success: LibrarySymbolReference;
    NameResolutionFailure: LibrarySymbolReference;
    ConnectFailure: LibrarySymbolReference;
    ReceiveFailure: LibrarySymbolReference;
    SendFailure: LibrarySymbolReference;
    PipelineFailure: LibrarySymbolReference;
    RequestCanceled: LibrarySymbolReference;
    ProtocolError: LibrarySymbolReference;
    ConnectionClosed: LibrarySymbolReference;
    TrustFailure: LibrarySymbolReference;
    SecureChannelFailure: LibrarySymbolReference;
    ServerProtocolViolation: LibrarySymbolReference;
    KeepAliveFailure: LibrarySymbolReference;
    Pending: LibrarySymbolReference;
    Timeout: LibrarySymbolReference;
    ProxyNameResolutionFailure: LibrarySymbolReference;
    UnknownError: LibrarySymbolReference;
    MessageLengthLimitExceeded: LibrarySymbolReference;
    CacheEntryNotFound: LibrarySymbolReference;
    RequestProhibitedByCachePolicy: LibrarySymbolReference;
    RequestProhibitedByProxy: LibrarySymbolReference
  };
  WebHeaderCollection: LibrarySymbolReference & {
    WebHeaderCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AddWithoutValidate: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Get: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetKey: LibrarySymbolReference;
    GetValues: LibrarySymbolReference;
    IsRestricted: LibrarySymbolReference;
    OnDeserialization: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Set: LibrarySymbolReference;
    ToByteArray: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    AllKeys: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Keys: LibrarySymbolReference
  };
  WebProxy: LibrarySymbolReference & {
    WebProxy: LibrarySymbolReference;
    GetDefaultProxy: LibrarySymbolReference;
    GetObjectData: LibrarySymbolReference;
    GetProxy: LibrarySymbolReference;
    IsBypassed: LibrarySymbolReference;
    Address: LibrarySymbolReference;
    BypassArrayList: LibrarySymbolReference;
    BypassList: LibrarySymbolReference;
    BypassProxyOnLocal: LibrarySymbolReference;
    Credentials: LibrarySymbolReference;
    UseDefaultCredentials: LibrarySymbolReference
  };
  WebRequest: LibrarySymbolReference & {
    WebRequest: LibrarySymbolReference;
    Abort: LibrarySymbolReference;
    BeginGetRequestStream: LibrarySymbolReference;
    BeginGetResponse: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    CreateDefault: LibrarySymbolReference;
    CreateHttp: LibrarySymbolReference;
    EndGetRequestStream: LibrarySymbolReference;
    EndGetResponse: LibrarySymbolReference;
    GetObjectData: LibrarySymbolReference;
    GetRequestStream: LibrarySymbolReference;
    GetRequestStreamAsync: LibrarySymbolReference;
    GetResponse: LibrarySymbolReference;
    GetResponseAsync: LibrarySymbolReference;
    GetSystemWebProxy: LibrarySymbolReference;
    RegisterPrefix: LibrarySymbolReference;
    AuthenticationLevel: LibrarySymbolReference;
    CachePolicy: LibrarySymbolReference;
    ConnectionGroupName: LibrarySymbolReference;
    ContentLength: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    Credentials: LibrarySymbolReference;
    DefaultCachePolicy: LibrarySymbolReference;
    DefaultWebProxy: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    ImpersonationLevel: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    PreAuthenticate: LibrarySymbolReference;
    Proxy: LibrarySymbolReference;
    RequestUri: LibrarySymbolReference;
    Timeout: LibrarySymbolReference;
    UseDefaultCredentials: LibrarySymbolReference
  };
  WebRequestMethods: LibrarySymbolReference & {
    File: LibrarySymbolReference & {
      DownloadFile: LibrarySymbolReference;
      UploadFile: LibrarySymbolReference
    };
    Ftp: LibrarySymbolReference & {
      AppendFile: LibrarySymbolReference;
      DeleteFile: LibrarySymbolReference;
      DownloadFile: LibrarySymbolReference;
      GetDateTimestamp: LibrarySymbolReference;
      GetFileSize: LibrarySymbolReference;
      ListDirectory: LibrarySymbolReference;
      ListDirectoryDetails: LibrarySymbolReference;
      MakeDirectory: LibrarySymbolReference;
      PrintWorkingDirectory: LibrarySymbolReference;
      RemoveDirectory: LibrarySymbolReference;
      Rename: LibrarySymbolReference;
      UploadFile: LibrarySymbolReference;
      UploadFileWithUniqueName: LibrarySymbolReference
    };
    Http: LibrarySymbolReference & {
      Connect: LibrarySymbolReference;
      Get: LibrarySymbolReference;
      Head: LibrarySymbolReference;
      MkCol: LibrarySymbolReference;
      Post: LibrarySymbolReference;
      Put: LibrarySymbolReference
    }
  };
  WebResponse: LibrarySymbolReference & {
    WebResponse: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetObjectData: LibrarySymbolReference;
    GetResponseStream: LibrarySymbolReference;
    ContentLength: LibrarySymbolReference;
    ContentType: LibrarySymbolReference;
    Headers: LibrarySymbolReference;
    IsFromCache: LibrarySymbolReference;
    IsMutuallyAuthenticated: LibrarySymbolReference;
    ResponseUri: LibrarySymbolReference;
    SupportsHeaders: LibrarySymbolReference
  };
  WebUtility: LibrarySymbolReference & {
    HtmlDecode: LibrarySymbolReference;
    HtmlEncode: LibrarySymbolReference;
    UrlDecode: LibrarySymbolReference;
    UrlDecodeToBytes: LibrarySymbolReference;
    UrlEncode: LibrarySymbolReference;
    UrlEncodeToBytes: LibrarySymbolReference
  }
};
const Net: NetLibrary = createLibrary("System.Net", {
  AuthenticationManager: {
    kind: "class",
    members: {
      Authenticate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PreAuthenticate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Register: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Unregister: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CredentialPolicy: {
        kind: "property",
        type: () => {
          return Net.ICredentialPolicy;
        },
        isStatic: true,
      },
      CustomTargetNameDictionary: {
        kind: "property",
        type: () => {
          return Specialized.StringDictionary;
        },
        isStatic: true,
      },
      RegisteredModules: {
        kind: "property",
        type: () => {
          return Collections.IEnumerator;
        },
        isStatic: true,
      },
    },
  },
  AuthenticationSchemeSelector: {
    kind: "generic",
    members: {
      AuthenticationSchemeSelector: {
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
  AuthenticationSchemes: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Net.AuthenticationSchemes;
        },
      },
      Digest: {
        kind: "field",
        type: () => {
          return Net.AuthenticationSchemes;
        },
      },
      Negotiate: {
        kind: "field",
        type: () => {
          return Net.AuthenticationSchemes;
        },
      },
      Ntlm: {
        kind: "field",
        type: () => {
          return Net.AuthenticationSchemes;
        },
      },
      IntegratedWindowsAuthentication: {
        kind: "field",
        type: () => {
          return Net.AuthenticationSchemes;
        },
      },
      Basic: {
        kind: "field",
        type: () => {
          return Net.AuthenticationSchemes;
        },
      },
      Anonymous: {
        kind: "field",
        type: () => {
          return Net.AuthenticationSchemes;
        },
      },
    },
  },
  Authorization: {
    kind: "class",
    members: {
      Authorization: {
        kind: "method",
        methodKind: "constructor",
      },
      Complete: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ConnectionGroupId: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      MutuallyAuthenticated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ProtectionRealm: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
    },
  },
  BindIPEndPoint: {
    kind: "generic",
    members: {
      BindIPEndPoint: {
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
  Cookie: {
    kind: "class",
    members: {
      Cookie: {
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
      Comment: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      CommentUri: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isNullable: true,
      },
      Discard: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Domain: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Expired: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Expires: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      HttpOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Path: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Port: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Secure: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      TimeStamp: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Version: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  CookieCollection: {
    kind: "class",
    members: {
      CookieCollection: {
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
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
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
      IsSynchronized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return Net.Cookie;
        },
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
  },
  CookieContainer: {
    kind: "class",
    members: {
      DefaultCookieLengthLimit: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      DefaultCookieLimit: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      DefaultPerDomainCookieLimit: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      CookieContainer: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAllCookies: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCookieHeader: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCookies: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCookies: {
        kind: "method",
        methodKind: "ordinary",
      },
      Capacity: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxCookieSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PerDomainCapacity: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  CookieException: {
    kind: "class",
    members: {
      CookieException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CredentialCache: {
    kind: "class",
    members: {
      CredentialCache: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCredential: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefaultCredentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
        isStatic: true,
      },
      DefaultNetworkCredentials: {
        kind: "property",
        type: () => {
          return Net.NetworkCredential;
        },
        isStatic: true,
      },
    },
  },
  DecompressionMethods: {
    kind: "enum",
    members: {
      All: {
        kind: "field",
        type: () => {
          return Net.DecompressionMethods;
        },
      },
      None: {
        kind: "field",
        type: () => {
          return Net.DecompressionMethods;
        },
      },
      GZip: {
        kind: "field",
        type: () => {
          return Net.DecompressionMethods;
        },
      },
      Deflate: {
        kind: "field",
        type: () => {
          return Net.DecompressionMethods;
        },
      },
      Brotli: {
        kind: "field",
        type: () => {
          return Net.DecompressionMethods;
        },
      },
    },
  },
  Dns: {
    kind: "class",
    members: {
      BeginGetHostAddresses: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BeginGetHostByName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BeginGetHostEntry: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BeginResolve: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EndGetHostAddresses: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EndGetHostByName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EndGetHostEntry: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EndResolve: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHostAddresses: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHostAddressesAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHostByAddress: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHostByName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHostEntry: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHostEntryAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHostName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Resolve: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  DnsEndPoint: {
    kind: "class",
    members: {
      DnsEndPoint: {
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
      AddressFamily: {
        kind: "property",
        type: () => {
          return Sockets.AddressFamily;
        },
        isOverride: true,
      },
      Host: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Port: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  DownloadDataCompletedEventArgs: {
    kind: "class",
    members: {
      Result: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  DownloadDataCompletedEventHandler: {
    kind: "generic",
    members: {
      DownloadDataCompletedEventHandler: {
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
  DownloadProgressChangedEventArgs: {
    kind: "class",
    members: {
      BytesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      TotalBytesToReceive: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  DownloadProgressChangedEventHandler: {
    kind: "generic",
    members: {
      DownloadProgressChangedEventHandler: {
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
  DownloadStringCompletedEventArgs: {
    kind: "class",
    members: {
      Result: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  DownloadStringCompletedEventHandler: {
    kind: "generic",
    members: {
      DownloadStringCompletedEventHandler: {
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
  EndPoint: {
    kind: "class",
    members: {
      EndPoint: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Serialize: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddressFamily: {
        kind: "property",
        type: () => {
          return Sockets.AddressFamily;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  FileWebRequest: {
    kind: "class",
    members: {
      Abort: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BeginGetRequestStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BeginGetResponse: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EndGetRequestStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EndGetResponse: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetObjectData: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetRequestStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetRequestStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetResponse: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetResponseAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConnectionGroupName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      ContentLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      ContentType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      Credentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
        isOverride: true,
      },
      Headers: {
        kind: "property",
        type: () => {
          return Net.WebHeaderCollection;
        },
        isOverride: true,
      },
      Method: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      PreAuthenticate: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      Proxy: {
        kind: "property",
        type: () => {
          return Net.IWebProxy;
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
      Timeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      UseDefaultCredentials: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
    },
  },
  FileWebResponse: {
    kind: "class",
    members: {
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetObjectData: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetResponseStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ContentLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      ContentType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      Headers: {
        kind: "property",
        type: () => {
          return Net.WebHeaderCollection;
        },
        isOverride: true,
      },
      ResponseUri: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isOverride: true,
      },
      SupportsHeaders: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
    },
  },
  FtpStatusCode: {
    kind: "enum",
    members: {
      Undefined: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      RestartMarker: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      ServiceTemporarilyNotAvailable: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      DataAlreadyOpen: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      OpeningData: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      CommandOK: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      CommandExtraneous: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      DirectoryStatus: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      FileStatus: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      SystemType: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      SendUserCommand: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      ClosingControl: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      ClosingData: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      EnteringPassive: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      LoggedInProceed: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      ServerWantsSecureSession: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      FileActionOK: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      PathnameCreated: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      SendPasswordCommand: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      NeedLoginAccount: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      FileCommandPending: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      ServiceNotAvailable: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      CantOpenData: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      ConnectionClosed: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      ActionNotTakenFileUnavailableOrBusy: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      ActionAbortedLocalProcessingError: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      ActionNotTakenInsufficientSpace: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      CommandSyntaxError: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      ArgumentSyntaxError: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      CommandNotImplemented: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      BadCommandSequence: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      NotLoggedIn: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      AccountNeeded: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      ActionNotTakenFileUnavailable: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      ActionAbortedUnknownPageType: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      FileActionAborted: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      ActionNotTakenFilenameNotAllowed: {
        kind: "field",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
    },
  },
  FtpWebRequest: {
    kind: "class",
    members: {
      Abort: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BeginGetRequestStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BeginGetResponse: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EndGetRequestStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EndGetResponse: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetRequestStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetResponse: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ClientCertificates: {
        kind: "property",
        type: () => {
          return X509Certificates.X509CertificateCollection;
        },
      },
      ConnectionGroupName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      ContentLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      ContentOffset: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      ContentType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      Credentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
        isOverride: true,
      },
      DefaultCachePolicy: {
        kind: "property",
        type: () => {
          return Cache.RequestCachePolicy;
        },
        isNullable: true,
        isStatic: true,
      },
      EnableSsl: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Headers: {
        kind: "property",
        type: () => {
          return Net.WebHeaderCollection;
        },
        isOverride: true,
      },
      KeepAlive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Method: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      PreAuthenticate: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      Proxy: {
        kind: "property",
        type: () => {
          return Net.IWebProxy;
        },
        isOverride: true,
      },
      ReadWriteTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      RenameTo: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      RequestUri: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isOverride: true,
      },
      ServicePoint: {
        kind: "property",
        type: () => {
          return Net.ServicePoint;
        },
      },
      Timeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      UseBinary: {
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
        isOverride: true,
      },
      UsePassive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  FtpWebResponse: {
    kind: "class",
    members: {
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetResponseStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BannerMessage: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ContentLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      ExitMessage: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Headers: {
        kind: "property",
        type: () => {
          return Net.WebHeaderCollection;
        },
        isOverride: true,
      },
      LastModified: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      ResponseUri: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isOverride: true,
      },
      StatusCode: {
        kind: "property",
        type: () => {
          return Net.FtpStatusCode;
        },
      },
      StatusDescription: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SupportsHeaders: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      WelcomeMessage: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  GlobalProxySelection: {
    kind: "class",
    members: {
      GlobalProxySelection: {
        kind: "method",
        methodKind: "constructor",
      },
      GetEmptyWebProxy: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Select: {
        kind: "property",
        type: () => {
          return Net.IWebProxy;
        },
        isStatic: true,
      },
    },
  },
  HttpContinueDelegate: {
    kind: "generic",
    members: {
      HttpContinueDelegate: {
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
  HttpListener: {
    kind: "class",
    members: {
      ExtendedProtectionSelector: {
        kind: "generic",
        members: {
          ExtendedProtectionSelector: {
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
    },
  },
  HttpListenerBasicIdentity: {
    kind: "class",
    members: {
      HttpListenerBasicIdentity: {
        kind: "method",
        methodKind: "constructor",
      },
      Password: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
    },
  },
  HttpListenerContext: {
    kind: "class",
    members: {
      AcceptWebSocketAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Request: {
        kind: "property",
        type: () => {
          return Net.HttpListenerRequest;
        },
      },
      Response: {
        kind: "property",
        type: () => {
          return Net.HttpListenerResponse;
        },
      },
      User: {
        kind: "property",
        type: () => {
          return Principal.IPrincipal;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  HttpListenerException: {
    kind: "class",
    members: {
      HttpListenerException: {
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
    },
  },
  HttpListenerPrefixCollection: {
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
      Remove: {
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
      IsSynchronized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  HttpListenerRequest: {
    kind: "class",
    members: {
      BeginGetClientCertificate: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndGetClientCertificate: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetClientCertificate: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetClientCertificateAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      AcceptTypes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      ClientCertificateError: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ContentEncoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
      },
      ContentLength64: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      ContentType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Cookies: {
        kind: "property",
        type: () => {
          return Net.CookieCollection;
        },
      },
      HasEntityBody: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Headers: {
        kind: "property",
        type: () => {
          return Specialized.NameValueCollection;
        },
      },
      HttpMethod: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      InputStream: {
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
      },
      IsLocal: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSecureConnection: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsWebSocketRequest: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      KeepAlive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LocalEndPoint: {
        kind: "property",
        type: () => {
          return Net.IPEndPoint;
        },
      },
      ProtocolVersion: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
      QueryString: {
        kind: "property",
        type: () => {
          return Specialized.NameValueCollection;
        },
      },
      RawUrl: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      RemoteEndPoint: {
        kind: "property",
        type: () => {
          return Net.IPEndPoint;
        },
      },
      RequestTraceIdentifier: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      ServiceName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      TransportContext: {
        kind: "property",
        type: () => {
          return Net.TransportContext;
        },
      },
      Url: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isNullable: true,
      },
      UrlReferrer: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isNullable: true,
      },
      UserAgent: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      UserHostAddress: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      UserHostName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      UserLanguages: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  HttpListenerResponse: {
    kind: "class",
    members: {
      Abort: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddHeader: {
        kind: "method",
        methodKind: "ordinary",
      },
      AppendCookie: {
        kind: "method",
        methodKind: "ordinary",
      },
      AppendHeader: {
        kind: "method",
        methodKind: "ordinary",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyFrom: {
        kind: "method",
        methodKind: "ordinary",
      },
      Redirect: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCookie: {
        kind: "method",
        methodKind: "ordinary",
      },
      ContentEncoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isNullable: true,
      },
      ContentLength64: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      ContentType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Cookies: {
        kind: "property",
        type: () => {
          return Net.CookieCollection;
        },
      },
      Headers: {
        kind: "property",
        type: () => {
          return Net.WebHeaderCollection;
        },
      },
      KeepAlive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      OutputStream: {
        kind: "property",
        type: () => {
          return IO.Stream;
        },
      },
      ProtocolVersion: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
      RedirectLocation: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SendChunked: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      StatusCode: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      StatusDescription: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  HttpListenerTimeoutManager: {
    kind: "class",
    members: {
      DrainEntityBody: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      EntityBody: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      HeaderWait: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      IdleConnection: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      MinSendBytesPerSecond: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      RequestQueue: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
    },
  },
  HttpRequestHeader: {
    kind: "enum",
    members: {
      CacheControl: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Connection: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Date: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      KeepAlive: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Pragma: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Trailer: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      TransferEncoding: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Upgrade: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Via: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Warning: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Allow: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      ContentLength: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      ContentType: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      ContentEncoding: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      ContentLanguage: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      ContentLocation: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      ContentMd5: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      ContentRange: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Expires: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      LastModified: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Accept: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      AcceptCharset: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      AcceptEncoding: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      AcceptLanguage: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Authorization: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Cookie: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Expect: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      From: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Host: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      IfMatch: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      IfModifiedSince: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      IfNoneMatch: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      IfRange: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      IfUnmodifiedSince: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      MaxForwards: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      ProxyAuthorization: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Referer: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Range: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Te: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      Translate: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
      UserAgent: {
        kind: "field",
        type: () => {
          return Net.HttpRequestHeader;
        },
      },
    },
  },
  HttpResponseHeader: {
    kind: "enum",
    members: {
      CacheControl: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      Connection: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      Date: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      KeepAlive: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      Pragma: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      Trailer: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      TransferEncoding: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      Upgrade: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      Via: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      Warning: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      Allow: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      ContentLength: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      ContentType: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      ContentEncoding: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      ContentLanguage: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      ContentLocation: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      ContentMd5: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      ContentRange: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      Expires: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      LastModified: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      AcceptRanges: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      Age: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      ETag: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      Location: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      ProxyAuthenticate: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      RetryAfter: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      Server: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      SetCookie: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      Vary: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
      WwwAuthenticate: {
        kind: "field",
        type: () => {
          return Net.HttpResponseHeader;
        },
      },
    },
  },
  HttpStatusCode: {
    kind: "enum",
    members: {
      Continue: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      SwitchingProtocols: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      Processing: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      EarlyHints: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      OK: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      Created: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      Accepted: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      NonAuthoritativeInformation: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      NoContent: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      ResetContent: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      PartialContent: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      MultiStatus: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      AlreadyReported: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      IMUsed: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      Ambiguous: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      MultipleChoices: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      Moved: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      MovedPermanently: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      Found: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      Redirect: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      RedirectMethod: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      SeeOther: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      NotModified: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      UseProxy: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      Unused: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      RedirectKeepVerb: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      TemporaryRedirect: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      PermanentRedirect: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      BadRequest: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      Unauthorized: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      PaymentRequired: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      Forbidden: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      NotFound: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      MethodNotAllowed: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      NotAcceptable: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      ProxyAuthenticationRequired: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      RequestTimeout: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      Conflict: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      Gone: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      LengthRequired: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      PreconditionFailed: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      RequestEntityTooLarge: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      RequestUriTooLong: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      UnsupportedMediaType: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      RequestedRangeNotSatisfiable: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      ExpectationFailed: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      MisdirectedRequest: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      UnprocessableEntity: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      UnprocessableContent: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      Locked: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      FailedDependency: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      UpgradeRequired: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      PreconditionRequired: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      TooManyRequests: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      RequestHeaderFieldsTooLarge: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      UnavailableForLegalReasons: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      InternalServerError: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      NotImplemented: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      BadGateway: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      ServiceUnavailable: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      GatewayTimeout: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      HttpVersionNotSupported: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      VariantAlsoNegotiates: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      InsufficientStorage: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      LoopDetected: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      NotExtended: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
      NetworkAuthenticationRequired: {
        kind: "field",
        type: () => {
          return Net.HttpStatusCode;
        },
      },
    },
  },
  HttpVersion: {
    kind: "class",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return System.Version;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Version10: {
        kind: "field",
        type: () => {
          return System.Version;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Version11: {
        kind: "field",
        type: () => {
          return System.Version;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Version20: {
        kind: "field",
        type: () => {
          return System.Version;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Version30: {
        kind: "field",
        type: () => {
          return System.Version;
        },
        isStatic: true,
        isReadOnly: true,
      },
    },
    isStatic: true,
  },
  HttpWebRequest: {
    kind: "class",
    members: {
      Abort: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginGetRequestStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BeginGetResponse: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EndGetRequestStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EndGetResponse: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetObjectData: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetRequestStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetResponse: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Accept: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Address: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
      },
      AllowAutoRedirect: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      AllowReadStreamBuffering: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      AllowWriteStreamBuffering: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      AutomaticDecompression: {
        kind: "property",
        type: () => {
          return Net.DecompressionMethods;
        },
      },
      ClientCertificates: {
        kind: "property",
        type: () => {
          return X509Certificates.X509CertificateCollection;
        },
      },
      Connection: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ConnectionGroupName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      ContentLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      ContentType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      ContinueDelegate: {
        kind: "property",
        type: () => {
          return Net.HttpContinueDelegate;
        },
      },
      ContinueTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      CookieContainer: {
        kind: "property",
        type: () => {
          return Net.CookieContainer;
        },
        isVirtual: true,
      },
      Credentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
        isOverride: true,
      },
      Date: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      DefaultCachePolicy: {
        kind: "property",
        type: () => {
          return Cache.RequestCachePolicy;
        },
        isNullable: true,
        isStatic: true,
      },
      DefaultMaximumErrorResponseLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      DefaultMaximumResponseHeadersLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      Expect: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      HaveResponse: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Headers: {
        kind: "property",
        type: () => {
          return Net.WebHeaderCollection;
        },
        isOverride: true,
      },
      Host: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      IfModifiedSince: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      KeepAlive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MaximumAutomaticRedirections: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaximumResponseHeadersLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MediaType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Method: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      Pipelined: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PreAuthenticate: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      ProtocolVersion: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
      Proxy: {
        kind: "property",
        type: () => {
          return Net.IWebProxy;
        },
        isOverride: true,
      },
      ReadWriteTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Referer: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      RequestUri: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isOverride: true,
      },
      SendChunked: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ServerCertificateValidationCallback: {
        kind: "property",
        type: () => {
          return Security.RemoteCertificateValidationCallback;
        },
        isNullable: true,
      },
      ServicePoint: {
        kind: "property",
        type: () => {
          return Net.ServicePoint;
        },
      },
      SupportsCookieContainer: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Timeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      TransferEncoding: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      UnsafeAuthenticatedConnectionSharing: {
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
        isOverride: true,
      },
      UserAgent: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  HttpWebResponse: {
    kind: "class",
    members: {
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetObjectData: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetResponseHeader: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetResponseStream: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CharacterSet: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ContentEncoding: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ContentLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      ContentType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      Cookies: {
        kind: "property",
        type: () => {
          return Net.CookieCollection;
        },
        isVirtual: true,
      },
      Headers: {
        kind: "property",
        type: () => {
          return Net.WebHeaderCollection;
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
      LastModified: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      Method: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      ProtocolVersion: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
      ResponseUri: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isOverride: true,
      },
      Server: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      StatusCode: {
        kind: "property",
        type: () => {
          return Net.HttpStatusCode;
        },
        isVirtual: true,
      },
      StatusDescription: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      SupportsHeaders: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
    },
  },
  IAuthenticationModule: {
    kind: "interface",
    members: {
      Authenticate: {
        kind: "method",
        methodKind: "ordinary",
      },
      PreAuthenticate: {
        kind: "method",
        methodKind: "ordinary",
      },
      AuthenticationType: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      CanPreAuthenticate: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ICredentialPolicy: {
    kind: "interface",
    members: {
      ShouldSendCredential: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ICredentials: {
    kind: "interface",
    members: {
      GetCredential: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ICredentialsByHost: {
    kind: "interface",
    members: {
      GetCredential: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IPAddress: {
    kind: "class",
    members: {
      Any: {
        kind: "field",
        type: () => {
          return Net.IPAddress;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Broadcast: {
        kind: "field",
        type: () => {
          return Net.IPAddress;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IPv6Any: {
        kind: "field",
        type: () => {
          return Net.IPAddress;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IPv6Loopback: {
        kind: "field",
        type: () => {
          return Net.IPAddress;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IPv6None: {
        kind: "field",
        type: () => {
          return Net.IPAddress;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Loopback: {
        kind: "field",
        type: () => {
          return Net.IPAddress;
        },
        isStatic: true,
        isReadOnly: true,
      },
      None: {
        kind: "field",
        type: () => {
          return Net.IPAddress;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IPAddress: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetAddressBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HostToNetworkOrder: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsLoopback: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MapToIPv4: {
        kind: "method",
        methodKind: "ordinary",
      },
      MapToIPv6: {
        kind: "method",
        methodKind: "ordinary",
      },
      NetworkToHostOrder: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      Address: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      AddressFamily: {
        kind: "property",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      IsIPv4MappedToIPv6: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsIPv6LinkLocal: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsIPv6Multicast: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsIPv6SiteLocal: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsIPv6Teredo: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsIPv6UniqueLocal: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ScopeId: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  IPEndPoint: {
    kind: "class",
    members: {
      MaxPort: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      MinPort: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      IPEndPoint: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
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
      Serialize: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
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
      Address: {
        kind: "property",
        type: () => {
          return Net.IPAddress;
        },
      },
      AddressFamily: {
        kind: "property",
        type: () => {
          return Sockets.AddressFamily;
        },
        isOverride: true,
      },
      Port: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  IPHostEntry: {
    kind: "class",
    members: {
      IPHostEntry: {
        kind: "method",
        methodKind: "constructor",
      },
      AddressList: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      Aliases: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      HostName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  IPNetwork: {
    kind: "struct",
    members: {
      IPNetwork: {
        kind: "method",
        methodKind: "constructor",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
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
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BaseAddress: {
        kind: "property",
        type: () => {
          return Net.IPAddress;
        },
      },
      PrefixLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  IWebProxy: {
    kind: "interface",
    members: {
      GetProxy: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsBypassed: {
        kind: "method",
        methodKind: "ordinary",
      },
      Credentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
      },
    },
  },
  IWebProxyScript: {
    kind: "interface",
    members: {
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      Load: {
        kind: "method",
        methodKind: "ordinary",
      },
      Run: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IWebRequestCreate: {
    kind: "interface",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  NetworkCredential: {
    kind: "class",
    members: {
      NetworkCredential: {
        kind: "method",
        methodKind: "constructor",
      },
      GetCredential: {
        kind: "method",
        methodKind: "ordinary",
      },
      Domain: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Password: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SecurePassword: {
        kind: "property",
        type: () => {
          return Security_2.SecureString;
        },
      },
      UserName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  OpenReadCompletedEventArgs: {
    kind: "class",
    members: {
      Result: {
        kind: "property",
        type: () => {
          return IO.Stream;
        },
      },
    },
  },
  OpenReadCompletedEventHandler: {
    kind: "generic",
    members: {
      OpenReadCompletedEventHandler: {
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
  OpenWriteCompletedEventArgs: {
    kind: "class",
    members: {
      Result: {
        kind: "property",
        type: () => {
          return IO.Stream;
        },
      },
    },
  },
  OpenWriteCompletedEventHandler: {
    kind: "generic",
    members: {
      OpenWriteCompletedEventHandler: {
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
  ProtocolViolationException: {
    kind: "class",
    members: {
      ProtocolViolationException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  SecurityProtocolType: {
    kind: "enum",
    members: {
      SystemDefault: {
        kind: "field",
        type: () => {
          return Net.SecurityProtocolType;
        },
      },
      Ssl3: {
        kind: "field",
        type: () => {
          return Net.SecurityProtocolType;
        },
      },
      Tls: {
        kind: "field",
        type: () => {
          return Net.SecurityProtocolType;
        },
      },
      Tls11: {
        kind: "field",
        type: () => {
          return Net.SecurityProtocolType;
        },
      },
      Tls12: {
        kind: "field",
        type: () => {
          return Net.SecurityProtocolType;
        },
      },
      Tls13: {
        kind: "field",
        type: () => {
          return Net.SecurityProtocolType;
        },
      },
    },
  },
  ServicePoint: {
    kind: "class",
    members: {
      CloseConnectionGroup: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetTcpKeepAlive: {
        kind: "method",
        methodKind: "ordinary",
      },
      Address: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
      },
      BindIPEndPointDelegate: {
        kind: "property",
        type: () => {
          return Net.BindIPEndPoint;
        },
        isNullable: true,
      },
      Certificate: {
        kind: "property",
        type: () => {
          return X509Certificates.X509Certificate;
        },
      },
      ClientCertificate: {
        kind: "property",
        type: () => {
          return X509Certificates.X509Certificate;
        },
        isNullable: true,
      },
      ConnectionLeaseTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ConnectionLimit: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ConnectionName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      CurrentConnections: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Expect100Continue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IdleSince: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      MaxIdleTime: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ProtocolVersion: {
        kind: "property",
        type: () => {
          return System.Version;
        },
        isVirtual: true,
      },
      ReceiveBufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SupportsPipelining: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      UseNagleAlgorithm: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ServicePointManager: {
    kind: "class",
    members: {
      DefaultNonPersistentConnectionLimit: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      DefaultPersistentConnectionLimit: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      FindServicePoint: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetTcpKeepAlive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CheckCertificateRevocationList: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      DefaultConnectionLimit: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      DnsRefreshTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      EnableDnsRoundRobin: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      EncryptionPolicy: {
        kind: "property",
        type: () => {
          return Security.EncryptionPolicy;
        },
        isStatic: true,
      },
      Expect100Continue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      MaxServicePointIdleTime: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      MaxServicePoints: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      ReusePort: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      SecurityProtocol: {
        kind: "property",
        type: () => {
          return Net.SecurityProtocolType;
        },
        isStatic: true,
      },
      ServerCertificateValidationCallback: {
        kind: "property",
        type: () => {
          return Security.RemoteCertificateValidationCallback;
        },
        isNullable: true,
        isStatic: true,
      },
      UseNagleAlgorithm: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
  },
  SocketAddress: {
    kind: "class",
    members: {
      SocketAddress: {
        kind: "method",
        methodKind: "constructor",
      },
      GetMaximumAddressSize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      Family: {
        kind: "property",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      Size: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Buffer: {
        kind: "property",
        type: () => {
          return System.Memory;
        },
      },
    },
  },
  TransportContext: {
    kind: "class",
    members: {
      TransportContext: {
        kind: "method",
        methodKind: "constructor",
      },
      GetChannelBinding: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  UploadDataCompletedEventArgs: {
    kind: "class",
    members: {
      Result: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  UploadDataCompletedEventHandler: {
    kind: "generic",
    members: {
      UploadDataCompletedEventHandler: {
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
  UploadFileCompletedEventArgs: {
    kind: "class",
    members: {
      Result: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  UploadFileCompletedEventHandler: {
    kind: "generic",
    members: {
      UploadFileCompletedEventHandler: {
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
  UploadProgressChangedEventArgs: {
    kind: "class",
    members: {
      BytesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      BytesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      TotalBytesToReceive: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      TotalBytesToSend: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  UploadProgressChangedEventHandler: {
    kind: "generic",
    members: {
      UploadProgressChangedEventHandler: {
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
  UploadStringCompletedEventArgs: {
    kind: "class",
    members: {
      Result: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  UploadStringCompletedEventHandler: {
    kind: "generic",
    members: {
      UploadStringCompletedEventHandler: {
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
  UploadValuesCompletedEventArgs: {
    kind: "class",
    members: {
      Result: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  UploadValuesCompletedEventHandler: {
    kind: "generic",
    members: {
      UploadValuesCompletedEventHandler: {
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
  WebClient: {
    kind: "class",
    members: {
      WebClient: {
        kind: "method",
        methodKind: "constructor",
      },
      CancelAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      DownloadData: {
        kind: "method",
        methodKind: "ordinary",
      },
      DownloadDataAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      DownloadDataTaskAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      DownloadFile: {
        kind: "method",
        methodKind: "ordinary",
      },
      DownloadFileAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      DownloadFileTaskAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      DownloadString: {
        kind: "method",
        methodKind: "ordinary",
      },
      DownloadStringAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      DownloadStringTaskAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetWebRequest: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetWebResponse: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnDownloadDataCompleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnDownloadFileCompleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnDownloadProgressChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnDownloadStringCompleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnOpenReadCompleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnOpenWriteCompleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnUploadDataCompleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnUploadFileCompleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnUploadProgressChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnUploadStringCompleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnUploadValuesCompleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OpenRead: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenReadAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenReadTaskAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenWrite: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenWriteAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenWriteTaskAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      UploadData: {
        kind: "method",
        methodKind: "ordinary",
      },
      UploadDataAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      UploadDataTaskAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      UploadFile: {
        kind: "method",
        methodKind: "ordinary",
      },
      UploadFileAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      UploadFileTaskAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      UploadString: {
        kind: "method",
        methodKind: "ordinary",
      },
      UploadStringAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      UploadStringTaskAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      UploadValues: {
        kind: "method",
        methodKind: "ordinary",
      },
      UploadValuesAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      UploadValuesTaskAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      BaseAddress: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      CachePolicy: {
        kind: "property",
        type: () => {
          return Cache.RequestCachePolicy;
        },
      },
      Credentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
      },
      Encoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
      },
      Headers: {
        kind: "property",
        type: () => {
          return Net.WebHeaderCollection;
        },
      },
      IsBusy: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Proxy: {
        kind: "property",
        type: () => {
          return Net.IWebProxy;
        },
      },
      QueryString: {
        kind: "property",
        type: () => {
          return Specialized.NameValueCollection;
        },
      },
      ResponseHeaders: {
        kind: "property",
        type: () => {
          return Net.WebHeaderCollection;
        },
        isNullable: true,
      },
      UseDefaultCredentials: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  WebException: {
    kind: "class",
    members: {
      WebException: {
        kind: "method",
        methodKind: "constructor",
      },
      Response: {
        kind: "property",
        type: () => {
          return Net.WebResponse;
        },
      },
      Status: {
        kind: "property",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
    },
  },
  WebExceptionStatus: {
    kind: "enum",
    members: {
      Success: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      NameResolutionFailure: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      ConnectFailure: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      ReceiveFailure: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      SendFailure: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      PipelineFailure: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      RequestCanceled: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      ProtocolError: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      ConnectionClosed: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      TrustFailure: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      SecureChannelFailure: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      ServerProtocolViolation: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      KeepAliveFailure: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      Pending: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      Timeout: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      ProxyNameResolutionFailure: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      UnknownError: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      MessageLengthLimitExceeded: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      CacheEntryNotFound: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      RequestProhibitedByCachePolicy: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
      RequestProhibitedByProxy: {
        kind: "field",
        type: () => {
          return Net.WebExceptionStatus;
        },
      },
    },
  },
  WebHeaderCollection: {
    kind: "class",
    members: {
      WebHeaderCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddWithoutValidate: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Get: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetValues: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsRestricted: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OnDeserialization: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      Set: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToByteArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AllKeys: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Keys: {
        kind: "property",
        type: () => {
          return Specialized.NameObjectCollectionBase.KeysCollection;
        },
        isOverride: true,
      },
    },
  },
  WebProxy: {
    kind: "class",
    members: {
      WebProxy: {
        kind: "method",
        methodKind: "constructor",
      },
      GetDefaultProxy: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetObjectData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetProxy: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsBypassed: {
        kind: "method",
        methodKind: "ordinary",
      },
      Address: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isNullable: true,
      },
      BypassArrayList: {
        kind: "property",
        type: () => {
          return Collections.ArrayList;
        },
      },
      BypassList: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      BypassProxyOnLocal: {
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
      UseDefaultCredentials: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  WebRequest: {
    kind: "class",
    members: {
      WebRequest: {
        kind: "method",
        methodKind: "constructor",
      },
      Abort: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BeginGetRequestStream: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BeginGetResponse: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateDefault: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateHttp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EndGetRequestStream: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EndGetResponse: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetObjectData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetRequestStream: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetRequestStreamAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetResponse: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetResponseAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSystemWebProxy: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RegisterPrefix: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AuthenticationLevel: {
        kind: "property",
        type: () => {
          return Security.AuthenticationLevel;
        },
      },
      CachePolicy: {
        kind: "property",
        type: () => {
          return Cache.RequestCachePolicy;
        },
        isVirtual: true,
      },
      ConnectionGroupName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      ContentLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isVirtual: true,
      },
      ContentType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      Credentials: {
        kind: "property",
        type: () => {
          return Net.ICredentials;
        },
        isVirtual: true,
      },
      DefaultCachePolicy: {
        kind: "property",
        type: () => {
          return Cache.RequestCachePolicy;
        },
        isNullable: true,
        isStatic: true,
      },
      DefaultWebProxy: {
        kind: "property",
        type: () => {
          return Net.IWebProxy;
        },
        isNullable: true,
        isStatic: true,
      },
      Headers: {
        kind: "property",
        type: () => {
          return Net.WebHeaderCollection;
        },
        isVirtual: true,
      },
      ImpersonationLevel: {
        kind: "property",
        type: () => {
          return Principal.TokenImpersonationLevel;
        },
      },
      Method: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      PreAuthenticate: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Proxy: {
        kind: "property",
        type: () => {
          return Net.IWebProxy;
        },
        isVirtual: true,
      },
      RequestUri: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isVirtual: true,
      },
      Timeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      UseDefaultCredentials: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  WebRequestMethods: {
    kind: "class",
    members: {
      File: {
        kind: "class",
        members: {
          DownloadFile: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          UploadFile: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
        },
        isStatic: true,
      },
      Ftp: {
        kind: "class",
        members: {
          AppendFile: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          DeleteFile: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          DownloadFile: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          GetDateTimestamp: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          GetFileSize: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          ListDirectory: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          ListDirectoryDetails: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          MakeDirectory: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          PrintWorkingDirectory: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          RemoveDirectory: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Rename: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          UploadFile: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          UploadFileWithUniqueName: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
        },
        isStatic: true,
      },
      Http: {
        kind: "class",
        members: {
          Connect: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Get: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Head: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          MkCol: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Post: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Put: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
        },
        isStatic: true,
      },
    },
  },
  WebResponse: {
    kind: "class",
    members: {
      WebResponse: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetObjectData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetResponseStream: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ContentLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isVirtual: true,
      },
      ContentType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      Headers: {
        kind: "property",
        type: () => {
          return Net.WebHeaderCollection;
        },
        isVirtual: true,
      },
      IsFromCache: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsMutuallyAuthenticated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      ResponseUri: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
        isVirtual: true,
      },
      SupportsHeaders: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  WebUtility: {
    kind: "class",
    members: {
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
    },
    isStatic: true,
  },
});
export default Net
