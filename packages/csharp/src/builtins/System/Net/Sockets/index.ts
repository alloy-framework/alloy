import Generic from "../../Collections/Generic/index.js";
import System from "../../index.js";
import IO from "../../IO/index.js";
import Net from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type SocketsLibrary = LibrarySymbolReference & {
  AddressFamily: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Unspecified: LibrarySymbolReference;
    Unix: LibrarySymbolReference;
    InterNetwork: LibrarySymbolReference;
    ImpLink: LibrarySymbolReference;
    Pup: LibrarySymbolReference;
    Chaos: LibrarySymbolReference;
    Ipx: LibrarySymbolReference;
    NS: LibrarySymbolReference;
    Iso: LibrarySymbolReference;
    Osi: LibrarySymbolReference;
    Ecma: LibrarySymbolReference;
    DataKit: LibrarySymbolReference;
    Ccitt: LibrarySymbolReference;
    Sna: LibrarySymbolReference;
    DecNet: LibrarySymbolReference;
    DataLink: LibrarySymbolReference;
    Lat: LibrarySymbolReference;
    HyperChannel: LibrarySymbolReference;
    AppleTalk: LibrarySymbolReference;
    NetBios: LibrarySymbolReference;
    VoiceView: LibrarySymbolReference;
    FireFox: LibrarySymbolReference;
    Banyan: LibrarySymbolReference;
    Atm: LibrarySymbolReference;
    InterNetworkV6: LibrarySymbolReference;
    Cluster: LibrarySymbolReference;
    Ieee12844: LibrarySymbolReference;
    Irda: LibrarySymbolReference;
    NetworkDesigners: LibrarySymbolReference;
    Max: LibrarySymbolReference;
    Packet: LibrarySymbolReference;
    ControllerAreaNetwork: LibrarySymbolReference
  };
  IOControlCode: LibrarySymbolReference & {
    EnableCircularQueuing: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    AddressListChange: LibrarySymbolReference;
    DataToRead: LibrarySymbolReference;
    OobDataRead: LibrarySymbolReference;
    GetBroadcastAddress: LibrarySymbolReference;
    AddressListQuery: LibrarySymbolReference;
    QueryTargetPnpHandle: LibrarySymbolReference;
    AsyncIO: LibrarySymbolReference;
    NonBlockingIO: LibrarySymbolReference;
    AssociateHandle: LibrarySymbolReference;
    MultipointLoopback: LibrarySymbolReference;
    MulticastScope: LibrarySymbolReference;
    SetQos: LibrarySymbolReference;
    SetGroupQos: LibrarySymbolReference;
    RoutingInterfaceChange: LibrarySymbolReference;
    NamespaceChange: LibrarySymbolReference;
    ReceiveAll: LibrarySymbolReference;
    ReceiveAllMulticast: LibrarySymbolReference;
    ReceiveAllIgmpMulticast: LibrarySymbolReference;
    KeepAliveValues: LibrarySymbolReference;
    AbsorbRouterAlert: LibrarySymbolReference;
    UnicastInterface: LibrarySymbolReference;
    LimitBroadcasts: LibrarySymbolReference;
    BindToInterface: LibrarySymbolReference;
    MulticastInterface: LibrarySymbolReference;
    AddMulticastGroupOnInterface: LibrarySymbolReference;
    DeleteMulticastGroupFromInterface: LibrarySymbolReference;
    GetExtensionFunctionPointer: LibrarySymbolReference;
    GetQos: LibrarySymbolReference;
    GetGroupQos: LibrarySymbolReference;
    TranslateHandle: LibrarySymbolReference;
    RoutingInterfaceQuery: LibrarySymbolReference;
    AddressListSort: LibrarySymbolReference
  };
  IPPacketInformation: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Address: LibrarySymbolReference;
    Interface: LibrarySymbolReference
  };
  IPProtectionLevel: LibrarySymbolReference & {
    Unspecified: LibrarySymbolReference;
    Unrestricted: LibrarySymbolReference;
    EdgeRestricted: LibrarySymbolReference;
    Restricted: LibrarySymbolReference
  };
  IPv6MulticastOption: LibrarySymbolReference & {
    IPv6MulticastOption: LibrarySymbolReference;
    Group: LibrarySymbolReference;
    InterfaceIndex: LibrarySymbolReference
  };
  LingerOption: LibrarySymbolReference & {
    LingerOption: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Enabled: LibrarySymbolReference;
    LingerTime: LibrarySymbolReference
  };
  MulticastOption: LibrarySymbolReference & {
    MulticastOption: LibrarySymbolReference;
    Group: LibrarySymbolReference;
    InterfaceIndex: LibrarySymbolReference;
    LocalAddress: LibrarySymbolReference
  };
  NetworkStream: LibrarySymbolReference & {
    NetworkStream: LibrarySymbolReference;
    BeginRead: LibrarySymbolReference;
    BeginWrite: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EndRead: LibrarySymbolReference;
    EndWrite: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteByte: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanSeek: LibrarySymbolReference;
    CanTimeout: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    DataAvailable: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Position: LibrarySymbolReference;
    Readable: LibrarySymbolReference;
    ReadTimeout: LibrarySymbolReference;
    Socket: LibrarySymbolReference;
    Writeable: LibrarySymbolReference;
    WriteTimeout: LibrarySymbolReference
  };
  ProtocolFamily: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Unspecified: LibrarySymbolReference;
    Unix: LibrarySymbolReference;
    InterNetwork: LibrarySymbolReference;
    ImpLink: LibrarySymbolReference;
    Pup: LibrarySymbolReference;
    Chaos: LibrarySymbolReference;
    Ipx: LibrarySymbolReference;
    NS: LibrarySymbolReference;
    Iso: LibrarySymbolReference;
    Osi: LibrarySymbolReference;
    Ecma: LibrarySymbolReference;
    DataKit: LibrarySymbolReference;
    Ccitt: LibrarySymbolReference;
    Sna: LibrarySymbolReference;
    DecNet: LibrarySymbolReference;
    DataLink: LibrarySymbolReference;
    Lat: LibrarySymbolReference;
    HyperChannel: LibrarySymbolReference;
    AppleTalk: LibrarySymbolReference;
    NetBios: LibrarySymbolReference;
    VoiceView: LibrarySymbolReference;
    FireFox: LibrarySymbolReference;
    Banyan: LibrarySymbolReference;
    Atm: LibrarySymbolReference;
    InterNetworkV6: LibrarySymbolReference;
    Cluster: LibrarySymbolReference;
    Ieee12844: LibrarySymbolReference;
    Irda: LibrarySymbolReference;
    NetworkDesigners: LibrarySymbolReference;
    Max: LibrarySymbolReference;
    Packet: LibrarySymbolReference;
    ControllerAreaNetwork: LibrarySymbolReference
  };
  ProtocolType: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    IP: LibrarySymbolReference;
    IPv6HopByHopOptions: LibrarySymbolReference;
    Unspecified: LibrarySymbolReference;
    Icmp: LibrarySymbolReference;
    Igmp: LibrarySymbolReference;
    Ggp: LibrarySymbolReference;
    IPv4: LibrarySymbolReference;
    Tcp: LibrarySymbolReference;
    Pup: LibrarySymbolReference;
    Udp: LibrarySymbolReference;
    Idp: LibrarySymbolReference;
    IPv6: LibrarySymbolReference;
    IPv6RoutingHeader: LibrarySymbolReference;
    IPv6FragmentHeader: LibrarySymbolReference;
    IPSecEncapsulatingSecurityPayload: LibrarySymbolReference;
    IPSecAuthenticationHeader: LibrarySymbolReference;
    IcmpV6: LibrarySymbolReference;
    IPv6NoNextHeader: LibrarySymbolReference;
    IPv6DestinationOptions: LibrarySymbolReference;
    ND: LibrarySymbolReference;
    Raw: LibrarySymbolReference;
    Ipx: LibrarySymbolReference;
    Spx: LibrarySymbolReference;
    SpxII: LibrarySymbolReference
  };
  SafeSocketHandle: LibrarySymbolReference & {
    SafeSocketHandle: LibrarySymbolReference;
    ReleaseHandle: LibrarySymbolReference;
    IsInvalid: LibrarySymbolReference
  };
  SelectMode: LibrarySymbolReference & {
    SelectRead: LibrarySymbolReference;
    SelectWrite: LibrarySymbolReference;
    SelectError: LibrarySymbolReference
  };
  SendPacketsElement: LibrarySymbolReference & {
    SendPacketsElement: LibrarySymbolReference;
    Buffer: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    EndOfPacket: LibrarySymbolReference;
    FilePath: LibrarySymbolReference;
    FileStream: LibrarySymbolReference;
    MemoryBuffer: LibrarySymbolReference;
    Offset: LibrarySymbolReference;
    OffsetLong: LibrarySymbolReference
  };
  Socket: LibrarySymbolReference & {
    Socket: LibrarySymbolReference;
    Accept: LibrarySymbolReference;
    AcceptAsync: LibrarySymbolReference;
    BeginAccept: LibrarySymbolReference;
    BeginConnect: LibrarySymbolReference;
    BeginDisconnect: LibrarySymbolReference;
    BeginReceive: LibrarySymbolReference;
    BeginReceiveFrom: LibrarySymbolReference;
    BeginReceiveMessageFrom: LibrarySymbolReference;
    BeginSend: LibrarySymbolReference;
    BeginSendFile: LibrarySymbolReference;
    BeginSendTo: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    CancelConnectAsync: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Connect: LibrarySymbolReference;
    ConnectAsync: LibrarySymbolReference;
    Disconnect: LibrarySymbolReference;
    DisconnectAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DuplicateAndClose: LibrarySymbolReference;
    EndAccept: LibrarySymbolReference;
    EndConnect: LibrarySymbolReference;
    EndDisconnect: LibrarySymbolReference;
    EndReceive: LibrarySymbolReference;
    EndReceiveFrom: LibrarySymbolReference;
    EndReceiveMessageFrom: LibrarySymbolReference;
    EndSend: LibrarySymbolReference;
    EndSendFile: LibrarySymbolReference;
    EndSendTo: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    GetRawSocketOption: LibrarySymbolReference;
    GetSocketOption: LibrarySymbolReference;
    IOControl: LibrarySymbolReference;
    Listen: LibrarySymbolReference;
    Poll: LibrarySymbolReference;
    Receive: LibrarySymbolReference;
    ReceiveAsync: LibrarySymbolReference;
    ReceiveFrom: LibrarySymbolReference;
    ReceiveFromAsync: LibrarySymbolReference;
    ReceiveMessageFrom: LibrarySymbolReference;
    ReceiveMessageFromAsync: LibrarySymbolReference;
    Select: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    SendAsync: LibrarySymbolReference;
    SendFile: LibrarySymbolReference;
    SendFileAsync: LibrarySymbolReference;
    SendPacketsAsync: LibrarySymbolReference;
    SendTo: LibrarySymbolReference;
    SendToAsync: LibrarySymbolReference;
    SetIPProtectionLevel: LibrarySymbolReference;
    SetRawSocketOption: LibrarySymbolReference;
    SetSocketOption: LibrarySymbolReference;
    Shutdown: LibrarySymbolReference;
    AddressFamily: LibrarySymbolReference;
    Available: LibrarySymbolReference;
    Blocking: LibrarySymbolReference;
    Connected: LibrarySymbolReference;
    DontFragment: LibrarySymbolReference;
    DualMode: LibrarySymbolReference;
    EnableBroadcast: LibrarySymbolReference;
    ExclusiveAddressUse: LibrarySymbolReference;
    Handle: LibrarySymbolReference;
    IsBound: LibrarySymbolReference;
    LingerState: LibrarySymbolReference;
    LocalEndPoint: LibrarySymbolReference;
    MulticastLoopback: LibrarySymbolReference;
    NoDelay: LibrarySymbolReference;
    OSSupportsIPv4: LibrarySymbolReference;
    OSSupportsIPv6: LibrarySymbolReference;
    OSSupportsUnixDomainSockets: LibrarySymbolReference;
    ProtocolType: LibrarySymbolReference;
    ReceiveBufferSize: LibrarySymbolReference;
    ReceiveTimeout: LibrarySymbolReference;
    RemoteEndPoint: LibrarySymbolReference;
    SafeHandle: LibrarySymbolReference;
    SendBufferSize: LibrarySymbolReference;
    SendTimeout: LibrarySymbolReference;
    SocketType: LibrarySymbolReference;
    SupportsIPv4: LibrarySymbolReference;
    SupportsIPv6: LibrarySymbolReference;
    Ttl: LibrarySymbolReference
  };
  SocketAsyncEventArgs: LibrarySymbolReference & {
    SocketAsyncEventArgs: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    OnCompleted: LibrarySymbolReference;
    SetBuffer: LibrarySymbolReference;
    AcceptSocket: LibrarySymbolReference;
    Buffer: LibrarySymbolReference;
    BufferList: LibrarySymbolReference;
    BytesTransferred: LibrarySymbolReference;
    ConnectByNameError: LibrarySymbolReference;
    ConnectSocket: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    DisconnectReuseSocket: LibrarySymbolReference;
    LastOperation: LibrarySymbolReference;
    MemoryBuffer: LibrarySymbolReference;
    Offset: LibrarySymbolReference;
    ReceiveMessageFromPacketInfo: LibrarySymbolReference;
    RemoteEndPoint: LibrarySymbolReference;
    SendPacketsElements: LibrarySymbolReference;
    SendPacketsFlags: LibrarySymbolReference;
    SendPacketsSendSize: LibrarySymbolReference;
    SocketError: LibrarySymbolReference;
    SocketFlags: LibrarySymbolReference;
    UserToken: LibrarySymbolReference
  };
  SocketAsyncOperation: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Accept: LibrarySymbolReference;
    Connect: LibrarySymbolReference;
    Disconnect: LibrarySymbolReference;
    Receive: LibrarySymbolReference;
    ReceiveFrom: LibrarySymbolReference;
    ReceiveMessageFrom: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    SendPackets: LibrarySymbolReference;
    SendTo: LibrarySymbolReference
  };
  SocketError: LibrarySymbolReference & {
    SocketError: LibrarySymbolReference;
    Success: LibrarySymbolReference;
    OperationAborted: LibrarySymbolReference;
    IOPending: LibrarySymbolReference;
    Interrupted: LibrarySymbolReference;
    AccessDenied: LibrarySymbolReference;
    Fault: LibrarySymbolReference;
    InvalidArgument: LibrarySymbolReference;
    TooManyOpenSockets: LibrarySymbolReference;
    WouldBlock: LibrarySymbolReference;
    InProgress: LibrarySymbolReference;
    AlreadyInProgress: LibrarySymbolReference;
    NotSocket: LibrarySymbolReference;
    DestinationAddressRequired: LibrarySymbolReference;
    MessageSize: LibrarySymbolReference;
    ProtocolType: LibrarySymbolReference;
    ProtocolOption: LibrarySymbolReference;
    ProtocolNotSupported: LibrarySymbolReference;
    SocketNotSupported: LibrarySymbolReference;
    OperationNotSupported: LibrarySymbolReference;
    ProtocolFamilyNotSupported: LibrarySymbolReference;
    AddressFamilyNotSupported: LibrarySymbolReference;
    AddressAlreadyInUse: LibrarySymbolReference;
    AddressNotAvailable: LibrarySymbolReference;
    NetworkDown: LibrarySymbolReference;
    NetworkUnreachable: LibrarySymbolReference;
    NetworkReset: LibrarySymbolReference;
    ConnectionAborted: LibrarySymbolReference;
    ConnectionReset: LibrarySymbolReference;
    NoBufferSpaceAvailable: LibrarySymbolReference;
    IsConnected: LibrarySymbolReference;
    NotConnected: LibrarySymbolReference;
    Shutdown: LibrarySymbolReference;
    TimedOut: LibrarySymbolReference;
    ConnectionRefused: LibrarySymbolReference;
    HostDown: LibrarySymbolReference;
    HostUnreachable: LibrarySymbolReference;
    ProcessLimit: LibrarySymbolReference;
    SystemNotReady: LibrarySymbolReference;
    VersionNotSupported: LibrarySymbolReference;
    NotInitialized: LibrarySymbolReference;
    Disconnecting: LibrarySymbolReference;
    TypeNotFound: LibrarySymbolReference;
    HostNotFound: LibrarySymbolReference;
    TryAgain: LibrarySymbolReference;
    NoRecovery: LibrarySymbolReference;
    NoData: LibrarySymbolReference
  };
  SocketException: LibrarySymbolReference & {
    SocketException: LibrarySymbolReference;
    ErrorCode: LibrarySymbolReference;
    Message: LibrarySymbolReference;
    SocketErrorCode: LibrarySymbolReference
  };
  SocketFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    OutOfBand: LibrarySymbolReference;
    Peek: LibrarySymbolReference;
    DontRoute: LibrarySymbolReference;
    Truncated: LibrarySymbolReference;
    ControlDataTruncated: LibrarySymbolReference;
    Broadcast: LibrarySymbolReference;
    Multicast: LibrarySymbolReference;
    Partial: LibrarySymbolReference
  };
  SocketInformation: LibrarySymbolReference & {
    Options: LibrarySymbolReference;
    ProtocolInformation: LibrarySymbolReference
  };
  SocketInformationOptions: LibrarySymbolReference & {
    NonBlocking: LibrarySymbolReference;
    Connected: LibrarySymbolReference;
    Listening: LibrarySymbolReference
  };
  SocketOptionLevel: LibrarySymbolReference & {
    IP: LibrarySymbolReference;
    Tcp: LibrarySymbolReference;
    Udp: LibrarySymbolReference;
    IPv6: LibrarySymbolReference;
    Socket: LibrarySymbolReference
  };
  SocketOptionName: LibrarySymbolReference & {
    DontLinger: LibrarySymbolReference;
    ExclusiveAddressUse: LibrarySymbolReference;
    Debug: LibrarySymbolReference;
    IPOptions: LibrarySymbolReference;
    NoChecksum: LibrarySymbolReference;
    NoDelay: LibrarySymbolReference;
    AcceptConnection: LibrarySymbolReference;
    BsdUrgent: LibrarySymbolReference;
    Expedited: LibrarySymbolReference;
    HeaderIncluded: LibrarySymbolReference;
    TcpKeepAliveTime: LibrarySymbolReference;
    TypeOfService: LibrarySymbolReference;
    IpTimeToLive: LibrarySymbolReference;
    ReuseAddress: LibrarySymbolReference;
    KeepAlive: LibrarySymbolReference;
    MulticastInterface: LibrarySymbolReference;
    MulticastTimeToLive: LibrarySymbolReference;
    MulticastLoopback: LibrarySymbolReference;
    AddMembership: LibrarySymbolReference;
    DropMembership: LibrarySymbolReference;
    DontFragment: LibrarySymbolReference;
    AddSourceMembership: LibrarySymbolReference;
    FastOpen: LibrarySymbolReference;
    DontRoute: LibrarySymbolReference;
    DropSourceMembership: LibrarySymbolReference;
    TcpKeepAliveRetryCount: LibrarySymbolReference;
    BlockSource: LibrarySymbolReference;
    TcpKeepAliveInterval: LibrarySymbolReference;
    UnblockSource: LibrarySymbolReference;
    PacketInformation: LibrarySymbolReference;
    ChecksumCoverage: LibrarySymbolReference;
    HopLimit: LibrarySymbolReference;
    IPProtectionLevel: LibrarySymbolReference;
    IPv6Only: LibrarySymbolReference;
    Broadcast: LibrarySymbolReference;
    UseLoopback: LibrarySymbolReference;
    Linger: LibrarySymbolReference;
    OutOfBandInline: LibrarySymbolReference;
    SendBuffer: LibrarySymbolReference;
    ReceiveBuffer: LibrarySymbolReference;
    SendLowWater: LibrarySymbolReference;
    ReceiveLowWater: LibrarySymbolReference;
    SendTimeout: LibrarySymbolReference;
    ReceiveTimeout: LibrarySymbolReference;
    Error: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    ReuseUnicastPort: LibrarySymbolReference;
    UpdateAcceptContext: LibrarySymbolReference;
    UpdateConnectContext: LibrarySymbolReference;
    MaxConnections: LibrarySymbolReference
  };
  SocketReceiveFromResult: LibrarySymbolReference & {
    ReceivedBytes: LibrarySymbolReference;
    RemoteEndPoint: LibrarySymbolReference
  };
  SocketReceiveMessageFromResult: LibrarySymbolReference & {
    PacketInformation: LibrarySymbolReference;
    ReceivedBytes: LibrarySymbolReference;
    RemoteEndPoint: LibrarySymbolReference;
    SocketFlags: LibrarySymbolReference
  };
  SocketShutdown: LibrarySymbolReference & {
    Receive: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    Both: LibrarySymbolReference
  };
  SocketType: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Stream: LibrarySymbolReference;
    Dgram: LibrarySymbolReference;
    Raw: LibrarySymbolReference;
    Rdm: LibrarySymbolReference;
    Seqpacket: LibrarySymbolReference
  };
  TcpClient: LibrarySymbolReference & {
    TcpClient: LibrarySymbolReference;
    BeginConnect: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Connect: LibrarySymbolReference;
    ConnectAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EndConnect: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    GetStream: LibrarySymbolReference;
    Active: LibrarySymbolReference;
    Available: LibrarySymbolReference;
    Client: LibrarySymbolReference;
    Connected: LibrarySymbolReference;
    ExclusiveAddressUse: LibrarySymbolReference;
    LingerState: LibrarySymbolReference;
    NoDelay: LibrarySymbolReference;
    ReceiveBufferSize: LibrarySymbolReference;
    ReceiveTimeout: LibrarySymbolReference;
    SendBufferSize: LibrarySymbolReference;
    SendTimeout: LibrarySymbolReference
  };
  TcpListener: LibrarySymbolReference & {
    TcpListener: LibrarySymbolReference;
    AcceptSocket: LibrarySymbolReference;
    AcceptSocketAsync: LibrarySymbolReference;
    AcceptTcpClient: LibrarySymbolReference;
    AcceptTcpClientAsync: LibrarySymbolReference;
    AllowNatTraversal: LibrarySymbolReference;
    BeginAcceptSocket: LibrarySymbolReference;
    BeginAcceptTcpClient: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EndAcceptSocket: LibrarySymbolReference;
    EndAcceptTcpClient: LibrarySymbolReference;
    Pending: LibrarySymbolReference;
    Start: LibrarySymbolReference;
    Stop: LibrarySymbolReference;
    Active: LibrarySymbolReference;
    ExclusiveAddressUse: LibrarySymbolReference;
    LocalEndpoint: LibrarySymbolReference;
    Server: LibrarySymbolReference
  };
  TransmitFileOptions: LibrarySymbolReference & {
    UseDefaultWorkerThread: LibrarySymbolReference;
    Disconnect: LibrarySymbolReference;
    ReuseSocket: LibrarySymbolReference;
    WriteBehind: LibrarySymbolReference;
    UseSystemThread: LibrarySymbolReference;
    UseKernelApc: LibrarySymbolReference
  };
  UdpClient: LibrarySymbolReference & {
    UdpClient: LibrarySymbolReference;
    AllowNatTraversal: LibrarySymbolReference;
    BeginReceive: LibrarySymbolReference;
    BeginSend: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Connect: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DropMulticastGroup: LibrarySymbolReference;
    EndReceive: LibrarySymbolReference;
    EndSend: LibrarySymbolReference;
    JoinMulticastGroup: LibrarySymbolReference;
    Receive: LibrarySymbolReference;
    ReceiveAsync: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    SendAsync: LibrarySymbolReference;
    Active: LibrarySymbolReference;
    Available: LibrarySymbolReference;
    Client: LibrarySymbolReference;
    DontFragment: LibrarySymbolReference;
    EnableBroadcast: LibrarySymbolReference;
    ExclusiveAddressUse: LibrarySymbolReference;
    MulticastLoopback: LibrarySymbolReference;
    Ttl: LibrarySymbolReference
  };
  UdpReceiveResult: LibrarySymbolReference & {
    UdpReceiveResult: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Buffer: LibrarySymbolReference;
    RemoteEndPoint: LibrarySymbolReference
  };
  UnixDomainSocketEndPoint: LibrarySymbolReference & {
    UnixDomainSocketEndPoint: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Serialize: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    AddressFamily: LibrarySymbolReference
  }
};
const Sockets: SocketsLibrary = createLibrary("System.Net.Sockets", {
  AddressFamily: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Unspecified: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Unix: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      InterNetwork: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      ImpLink: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Pup: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Chaos: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Ipx: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      NS: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Iso: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Osi: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Ecma: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      DataKit: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Ccitt: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Sna: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      DecNet: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      DataLink: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Lat: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      HyperChannel: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      AppleTalk: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      NetBios: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      VoiceView: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      FireFox: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Banyan: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Atm: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      InterNetworkV6: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Cluster: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Ieee12844: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Irda: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      NetworkDesigners: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Max: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Packet: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      ControllerAreaNetwork: {
        kind: "field",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
    },
  },
  IOControlCode: {
    kind: "enum",
    members: {
      EnableCircularQueuing: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      Flush: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      AddressListChange: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      DataToRead: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      OobDataRead: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      GetBroadcastAddress: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      AddressListQuery: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      QueryTargetPnpHandle: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      AsyncIO: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      NonBlockingIO: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      AssociateHandle: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      MultipointLoopback: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      MulticastScope: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      SetQos: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      SetGroupQos: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      RoutingInterfaceChange: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      NamespaceChange: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      ReceiveAll: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      ReceiveAllMulticast: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      ReceiveAllIgmpMulticast: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      KeepAliveValues: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      AbsorbRouterAlert: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      UnicastInterface: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      LimitBroadcasts: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      BindToInterface: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      MulticastInterface: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      AddMulticastGroupOnInterface: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      DeleteMulticastGroupFromInterface: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      GetExtensionFunctionPointer: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      GetQos: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      GetGroupQos: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      TranslateHandle: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      RoutingInterfaceQuery: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
      AddressListSort: {
        kind: "field",
        type: () => {
          return Sockets.IOControlCode;
        },
      },
    },
  },
  IPPacketInformation: {
    kind: "struct",
    members: {
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Address: {
        kind: "property",
        type: () => {
          return Net.IPAddress;
        },
      },
      Interface: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  IPProtectionLevel: {
    kind: "enum",
    members: {
      Unspecified: {
        kind: "field",
        type: () => {
          return Sockets.IPProtectionLevel;
        },
      },
      Unrestricted: {
        kind: "field",
        type: () => {
          return Sockets.IPProtectionLevel;
        },
      },
      EdgeRestricted: {
        kind: "field",
        type: () => {
          return Sockets.IPProtectionLevel;
        },
      },
      Restricted: {
        kind: "field",
        type: () => {
          return Sockets.IPProtectionLevel;
        },
      },
    },
  },
  IPv6MulticastOption: {
    kind: "class",
    members: {
      IPv6MulticastOption: {
        kind: "method",
        methodKind: "constructor",
      },
      Group: {
        kind: "property",
        type: () => {
          return Net.IPAddress;
        },
      },
      InterfaceIndex: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  LingerOption: {
    kind: "class",
    members: {
      LingerOption: {
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
      Enabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LingerTime: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  MulticastOption: {
    kind: "class",
    members: {
      MulticastOption: {
        kind: "method",
        methodKind: "constructor",
      },
      Group: {
        kind: "property",
        type: () => {
          return Net.IPAddress;
        },
      },
      InterfaceIndex: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      LocalAddress: {
        kind: "property",
        type: () => {
          return Net.IPAddress;
        },
        isNullable: true,
      },
    },
  },
  NetworkStream: {
    kind: "class",
    members: {
      NetworkStream: {
        kind: "method",
        methodKind: "constructor",
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
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
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
      DataAvailable: {
        kind: "property",
        type: () => {
          return System.Boolean;
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
      Position: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      Readable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ReadTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Socket: {
        kind: "property",
        type: () => {
          return Sockets.Socket;
        },
      },
      Writeable: {
        kind: "property",
        type: () => {
          return System.Boolean;
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
  ProtocolFamily: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Unspecified: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Unix: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      InterNetwork: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      ImpLink: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Pup: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Chaos: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Ipx: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      NS: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Iso: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Osi: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Ecma: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      DataKit: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Ccitt: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Sna: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      DecNet: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      DataLink: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Lat: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      HyperChannel: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      AppleTalk: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      NetBios: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      VoiceView: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      FireFox: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Banyan: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Atm: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      InterNetworkV6: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Cluster: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Ieee12844: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Irda: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      NetworkDesigners: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Max: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      Packet: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
      ControllerAreaNetwork: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolFamily;
        },
      },
    },
  },
  ProtocolType: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      IP: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      IPv6HopByHopOptions: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      Unspecified: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      Icmp: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      Igmp: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      Ggp: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      IPv4: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      Tcp: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      Pup: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      Udp: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      Idp: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      IPv6: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      IPv6RoutingHeader: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      IPv6FragmentHeader: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      IPSecEncapsulatingSecurityPayload: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      IPSecAuthenticationHeader: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      IcmpV6: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      IPv6NoNextHeader: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      IPv6DestinationOptions: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      ND: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      Raw: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      Ipx: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      Spx: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      SpxII: {
        kind: "field",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
    },
  },
  SafeSocketHandle: {
    kind: "class",
    members: {
      SafeSocketHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      ReleaseHandle: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsInvalid: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  SelectMode: {
    kind: "enum",
    members: {
      SelectRead: {
        kind: "field",
        type: () => {
          return Sockets.SelectMode;
        },
      },
      SelectWrite: {
        kind: "field",
        type: () => {
          return Sockets.SelectMode;
        },
      },
      SelectError: {
        kind: "field",
        type: () => {
          return Sockets.SelectMode;
        },
      },
    },
  },
  SendPacketsElement: {
    kind: "class",
    members: {
      SendPacketsElement: {
        kind: "method",
        methodKind: "constructor",
      },
      Buffer: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      EndOfPacket: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      FilePath: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      FileStream: {
        kind: "property",
        type: () => {
          return IO.FileStream;
        },
      },
      MemoryBuffer: {
        kind: "property",
        type: () => {
          return System.ReadOnlyMemory;
        },
        isNullable: true,
      },
      Offset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      OffsetLong: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  Socket: {
    kind: "class",
    members: {
      Socket: {
        kind: "method",
        methodKind: "constructor",
      },
      Accept: {
        kind: "method",
        methodKind: "ordinary",
      },
      AcceptAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginAccept: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginConnect: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginDisconnect: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginReceive: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginReceiveFrom: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginReceiveMessageFrom: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginSend: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginSendFile: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginSendTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
      },
      CancelConnectAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      Connect: {
        kind: "method",
        methodKind: "ordinary",
      },
      ConnectAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Disconnect: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisconnectAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      DuplicateAndClose: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndAccept: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndConnect: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndDisconnect: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndReceive: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndReceiveFrom: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndReceiveMessageFrom: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndSend: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndSendFile: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndSendTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetRawSocketOption: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSocketOption: {
        kind: "method",
        methodKind: "ordinary",
      },
      IOControl: {
        kind: "method",
        methodKind: "ordinary",
      },
      Listen: {
        kind: "method",
        methodKind: "ordinary",
      },
      Poll: {
        kind: "method",
        methodKind: "ordinary",
      },
      Receive: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReceiveAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReceiveFrom: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReceiveFromAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReceiveMessageFrom: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReceiveMessageFromAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Select: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Send: {
        kind: "method",
        methodKind: "ordinary",
      },
      SendAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      SendFile: {
        kind: "method",
        methodKind: "ordinary",
      },
      SendFileAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      SendPacketsAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      SendTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      SendToAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetIPProtectionLevel: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetRawSocketOption: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetSocketOption: {
        kind: "method",
        methodKind: "ordinary",
      },
      Shutdown: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddressFamily: {
        kind: "property",
        type: () => {
          return Sockets.AddressFamily;
        },
      },
      Available: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Blocking: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Connected: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      DontFragment: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      DualMode: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      EnableBroadcast: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ExclusiveAddressUse: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Handle: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      IsBound: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LingerState: {
        kind: "property",
        type: () => {
          return Sockets.LingerOption;
        },
        isNullable: true,
      },
      LocalEndPoint: {
        kind: "property",
        type: () => {
          return Net.EndPoint;
        },
        isNullable: true,
      },
      MulticastLoopback: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      NoDelay: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      OSSupportsIPv4: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      OSSupportsIPv6: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      OSSupportsUnixDomainSockets: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      ProtocolType: {
        kind: "property",
        type: () => {
          return Sockets.ProtocolType;
        },
      },
      ReceiveBufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ReceiveTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      RemoteEndPoint: {
        kind: "property",
        type: () => {
          return Net.EndPoint;
        },
        isNullable: true,
      },
      SafeHandle: {
        kind: "property",
        type: () => {
          return Sockets.SafeSocketHandle;
        },
      },
      SendBufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SendTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SocketType: {
        kind: "property",
        type: () => {
          return Sockets.SocketType;
        },
      },
      SupportsIPv4: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      SupportsIPv6: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      Ttl: {
        kind: "property",
        type: () => {
          return System.Int16;
        },
      },
    },
  },
  SocketAsyncEventArgs: {
    kind: "class",
    members: {
      SocketAsyncEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnCompleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetBuffer: {
        kind: "method",
        methodKind: "ordinary",
      },
      AcceptSocket: {
        kind: "property",
        type: () => {
          return Sockets.Socket;
        },
        isNullable: true,
      },
      Buffer: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      BufferList: {
        kind: "property",
        type: () => {
          return Generic.IList;
        },
        isNullable: true,
      },
      BytesTransferred: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ConnectByNameError: {
        kind: "property",
        type: () => {
          return System.Exception;
        },
        isNullable: true,
      },
      ConnectSocket: {
        kind: "property",
        type: () => {
          return Sockets.Socket;
        },
        isNullable: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      DisconnectReuseSocket: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LastOperation: {
        kind: "property",
        type: () => {
          return Sockets.SocketAsyncOperation;
        },
      },
      MemoryBuffer: {
        kind: "property",
        type: () => {
          return System.Memory;
        },
      },
      Offset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ReceiveMessageFromPacketInfo: {
        kind: "property",
        type: () => {
          return Sockets.IPPacketInformation;
        },
      },
      RemoteEndPoint: {
        kind: "property",
        type: () => {
          return Net.EndPoint;
        },
        isNullable: true,
      },
      SendPacketsElements: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      SendPacketsFlags: {
        kind: "property",
        type: () => {
          return Sockets.TransmitFileOptions;
        },
      },
      SendPacketsSendSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SocketError: {
        kind: "property",
        type: () => {
          return Sockets.SocketError;
        },
      },
      SocketFlags: {
        kind: "property",
        type: () => {
          return Sockets.SocketFlags;
        },
      },
      UserToken: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  SocketAsyncOperation: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Sockets.SocketAsyncOperation;
        },
      },
      Accept: {
        kind: "field",
        type: () => {
          return Sockets.SocketAsyncOperation;
        },
      },
      Connect: {
        kind: "field",
        type: () => {
          return Sockets.SocketAsyncOperation;
        },
      },
      Disconnect: {
        kind: "field",
        type: () => {
          return Sockets.SocketAsyncOperation;
        },
      },
      Receive: {
        kind: "field",
        type: () => {
          return Sockets.SocketAsyncOperation;
        },
      },
      ReceiveFrom: {
        kind: "field",
        type: () => {
          return Sockets.SocketAsyncOperation;
        },
      },
      ReceiveMessageFrom: {
        kind: "field",
        type: () => {
          return Sockets.SocketAsyncOperation;
        },
      },
      Send: {
        kind: "field",
        type: () => {
          return Sockets.SocketAsyncOperation;
        },
      },
      SendPackets: {
        kind: "field",
        type: () => {
          return Sockets.SocketAsyncOperation;
        },
      },
      SendTo: {
        kind: "field",
        type: () => {
          return Sockets.SocketAsyncOperation;
        },
      },
    },
  },
  SocketError: {
    kind: "enum",
    members: {
      SocketError: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      Success: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      OperationAborted: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      IOPending: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      Interrupted: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      AccessDenied: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      Fault: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      InvalidArgument: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      TooManyOpenSockets: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      WouldBlock: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      InProgress: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      AlreadyInProgress: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      NotSocket: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      DestinationAddressRequired: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      MessageSize: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      ProtocolType: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      ProtocolOption: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      ProtocolNotSupported: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      SocketNotSupported: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      OperationNotSupported: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      ProtocolFamilyNotSupported: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      AddressFamilyNotSupported: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      AddressAlreadyInUse: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      AddressNotAvailable: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      NetworkDown: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      NetworkUnreachable: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      NetworkReset: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      ConnectionAborted: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      ConnectionReset: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      NoBufferSpaceAvailable: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      IsConnected: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      NotConnected: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      Shutdown: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      TimedOut: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      ConnectionRefused: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      HostDown: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      HostUnreachable: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      ProcessLimit: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      SystemNotReady: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      VersionNotSupported: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      NotInitialized: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      Disconnecting: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      TypeNotFound: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      HostNotFound: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      TryAgain: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      NoRecovery: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
      NoData: {
        kind: "field",
        type: () => {
          return Sockets.SocketError;
        },
      },
    },
  },
  SocketException: {
    kind: "class",
    members: {
      SocketException: {
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
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      SocketErrorCode: {
        kind: "property",
        type: () => {
          return Sockets.SocketError;
        },
      },
    },
  },
  SocketFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Sockets.SocketFlags;
        },
      },
      OutOfBand: {
        kind: "field",
        type: () => {
          return Sockets.SocketFlags;
        },
      },
      Peek: {
        kind: "field",
        type: () => {
          return Sockets.SocketFlags;
        },
      },
      DontRoute: {
        kind: "field",
        type: () => {
          return Sockets.SocketFlags;
        },
      },
      Truncated: {
        kind: "field",
        type: () => {
          return Sockets.SocketFlags;
        },
      },
      ControlDataTruncated: {
        kind: "field",
        type: () => {
          return Sockets.SocketFlags;
        },
      },
      Broadcast: {
        kind: "field",
        type: () => {
          return Sockets.SocketFlags;
        },
      },
      Multicast: {
        kind: "field",
        type: () => {
          return Sockets.SocketFlags;
        },
      },
      Partial: {
        kind: "field",
        type: () => {
          return Sockets.SocketFlags;
        },
      },
    },
  },
  SocketInformation: {
    kind: "struct",
    members: {
      Options: {
        kind: "property",
        type: () => {
          return Sockets.SocketInformationOptions;
        },
        isReadOnly: true,
      },
      ProtocolInformation: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isReadOnly: true,
      },
    },
  },
  SocketInformationOptions: {
    kind: "enum",
    members: {
      NonBlocking: {
        kind: "field",
        type: () => {
          return Sockets.SocketInformationOptions;
        },
      },
      Connected: {
        kind: "field",
        type: () => {
          return Sockets.SocketInformationOptions;
        },
      },
      Listening: {
        kind: "field",
        type: () => {
          return Sockets.SocketInformationOptions;
        },
      },
    },
  },
  SocketOptionLevel: {
    kind: "enum",
    members: {
      IP: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionLevel;
        },
      },
      Tcp: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionLevel;
        },
      },
      Udp: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionLevel;
        },
      },
      IPv6: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionLevel;
        },
      },
      Socket: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionLevel;
        },
      },
    },
  },
  SocketOptionName: {
    kind: "enum",
    members: {
      DontLinger: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      ExclusiveAddressUse: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      Debug: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      IPOptions: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      NoChecksum: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      NoDelay: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      AcceptConnection: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      BsdUrgent: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      Expedited: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      HeaderIncluded: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      TcpKeepAliveTime: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      TypeOfService: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      IpTimeToLive: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      ReuseAddress: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      KeepAlive: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      MulticastInterface: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      MulticastTimeToLive: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      MulticastLoopback: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      AddMembership: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      DropMembership: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      DontFragment: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      AddSourceMembership: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      FastOpen: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      DontRoute: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      DropSourceMembership: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      TcpKeepAliveRetryCount: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      BlockSource: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      TcpKeepAliveInterval: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      UnblockSource: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      PacketInformation: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      ChecksumCoverage: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      HopLimit: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      IPProtectionLevel: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      IPv6Only: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      Broadcast: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      UseLoopback: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      Linger: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      OutOfBandInline: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      SendBuffer: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      ReceiveBuffer: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      SendLowWater: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      ReceiveLowWater: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      SendTimeout: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      ReceiveTimeout: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      Error: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      Type: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      ReuseUnicastPort: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      UpdateAcceptContext: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      UpdateConnectContext: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
      MaxConnections: {
        kind: "field",
        type: () => {
          return Sockets.SocketOptionName;
        },
      },
    },
  },
  SocketReceiveFromResult: {
    kind: "struct",
    members: {
      ReceivedBytes: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      RemoteEndPoint: {
        kind: "field",
        type: () => {
          return Net.EndPoint;
        },
      },
    },
  },
  SocketReceiveMessageFromResult: {
    kind: "struct",
    members: {
      PacketInformation: {
        kind: "field",
        type: () => {
          return Sockets.IPPacketInformation;
        },
      },
      ReceivedBytes: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      RemoteEndPoint: {
        kind: "field",
        type: () => {
          return Net.EndPoint;
        },
      },
      SocketFlags: {
        kind: "field",
        type: () => {
          return Sockets.SocketFlags;
        },
      },
    },
  },
  SocketShutdown: {
    kind: "enum",
    members: {
      Receive: {
        kind: "field",
        type: () => {
          return Sockets.SocketShutdown;
        },
      },
      Send: {
        kind: "field",
        type: () => {
          return Sockets.SocketShutdown;
        },
      },
      Both: {
        kind: "field",
        type: () => {
          return Sockets.SocketShutdown;
        },
      },
    },
  },
  SocketType: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return Sockets.SocketType;
        },
      },
      Stream: {
        kind: "field",
        type: () => {
          return Sockets.SocketType;
        },
      },
      Dgram: {
        kind: "field",
        type: () => {
          return Sockets.SocketType;
        },
      },
      Raw: {
        kind: "field",
        type: () => {
          return Sockets.SocketType;
        },
      },
      Rdm: {
        kind: "field",
        type: () => {
          return Sockets.SocketType;
        },
      },
      Seqpacket: {
        kind: "field",
        type: () => {
          return Sockets.SocketType;
        },
      },
    },
  },
  TcpClient: {
    kind: "class",
    members: {
      TcpClient: {
        kind: "method",
        methodKind: "constructor",
      },
      BeginConnect: {
        kind: "method",
        methodKind: "ordinary",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      Connect: {
        kind: "method",
        methodKind: "ordinary",
      },
      ConnectAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndConnect: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetStream: {
        kind: "method",
        methodKind: "ordinary",
      },
      Active: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Available: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Client: {
        kind: "property",
        type: () => {
          return Sockets.Socket;
        },
      },
      Connected: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ExclusiveAddressUse: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LingerState: {
        kind: "property",
        type: () => {
          return Sockets.LingerOption;
        },
        isNullable: true,
      },
      NoDelay: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ReceiveBufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ReceiveTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SendBufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SendTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  TcpListener: {
    kind: "class",
    members: {
      TcpListener: {
        kind: "method",
        methodKind: "constructor",
      },
      AcceptSocket: {
        kind: "method",
        methodKind: "ordinary",
      },
      AcceptSocketAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      AcceptTcpClient: {
        kind: "method",
        methodKind: "ordinary",
      },
      AcceptTcpClientAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      AllowNatTraversal: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginAcceptSocket: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginAcceptTcpClient: {
        kind: "method",
        methodKind: "ordinary",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndAcceptSocket: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndAcceptTcpClient: {
        kind: "method",
        methodKind: "ordinary",
      },
      Pending: {
        kind: "method",
        methodKind: "ordinary",
      },
      Start: {
        kind: "method",
        methodKind: "ordinary",
      },
      Stop: {
        kind: "method",
        methodKind: "ordinary",
      },
      Active: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ExclusiveAddressUse: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LocalEndpoint: {
        kind: "property",
        type: () => {
          return Net.EndPoint;
        },
      },
      Server: {
        kind: "property",
        type: () => {
          return Sockets.Socket;
        },
      },
    },
  },
  TransmitFileOptions: {
    kind: "enum",
    members: {
      UseDefaultWorkerThread: {
        kind: "field",
        type: () => {
          return Sockets.TransmitFileOptions;
        },
      },
      Disconnect: {
        kind: "field",
        type: () => {
          return Sockets.TransmitFileOptions;
        },
      },
      ReuseSocket: {
        kind: "field",
        type: () => {
          return Sockets.TransmitFileOptions;
        },
      },
      WriteBehind: {
        kind: "field",
        type: () => {
          return Sockets.TransmitFileOptions;
        },
      },
      UseSystemThread: {
        kind: "field",
        type: () => {
          return Sockets.TransmitFileOptions;
        },
      },
      UseKernelApc: {
        kind: "field",
        type: () => {
          return Sockets.TransmitFileOptions;
        },
      },
    },
  },
  UdpClient: {
    kind: "class",
    members: {
      UdpClient: {
        kind: "method",
        methodKind: "constructor",
      },
      AllowNatTraversal: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginReceive: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginSend: {
        kind: "method",
        methodKind: "ordinary",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      Connect: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      DropMulticastGroup: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndReceive: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndSend: {
        kind: "method",
        methodKind: "ordinary",
      },
      JoinMulticastGroup: {
        kind: "method",
        methodKind: "ordinary",
      },
      Receive: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReceiveAsync: {
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
      Active: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Available: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Client: {
        kind: "property",
        type: () => {
          return Sockets.Socket;
        },
      },
      DontFragment: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      EnableBroadcast: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ExclusiveAddressUse: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MulticastLoopback: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Ttl: {
        kind: "property",
        type: () => {
          return System.Int16;
        },
      },
    },
  },
  UdpReceiveResult: {
    kind: "struct",
    members: {
      UdpReceiveResult: {
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
      Buffer: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      RemoteEndPoint: {
        kind: "property",
        type: () => {
          return Net.IPEndPoint;
        },
      },
    },
  },
  UnixDomainSocketEndPoint: {
    kind: "class",
    members: {
      UnixDomainSocketEndPoint: {
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
      AddressFamily: {
        kind: "property",
        type: () => {
          return Sockets.AddressFamily;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
});
export default Sockets
