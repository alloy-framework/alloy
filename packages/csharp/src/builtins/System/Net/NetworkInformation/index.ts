import System from "../../index.js";
import Net from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type NetworkInformationLibrary = LibrarySymbolReference & {
  DuplicateAddressDetectionState: LibrarySymbolReference & {
    Invalid: LibrarySymbolReference;
    Tentative: LibrarySymbolReference;
    Duplicate: LibrarySymbolReference;
    Deprecated: LibrarySymbolReference;
    Preferred: LibrarySymbolReference
  };
  GatewayIPAddressInformation: LibrarySymbolReference & {
    GatewayIPAddressInformation: LibrarySymbolReference;
    Address: LibrarySymbolReference
  };
  GatewayIPAddressInformationCollection: LibrarySymbolReference & {
    GatewayIPAddressInformationCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  IPAddressCollection: LibrarySymbolReference & {
    IPAddressCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  IPAddressInformation: LibrarySymbolReference & {
    IPAddressInformation: LibrarySymbolReference;
    Address: LibrarySymbolReference;
    IsDnsEligible: LibrarySymbolReference;
    IsTransient: LibrarySymbolReference
  };
  IPAddressInformationCollection: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  IPGlobalProperties: LibrarySymbolReference & {
    IPGlobalProperties: LibrarySymbolReference;
    BeginGetUnicastAddresses: LibrarySymbolReference;
    EndGetUnicastAddresses: LibrarySymbolReference;
    GetActiveTcpConnections: LibrarySymbolReference;
    GetActiveTcpListeners: LibrarySymbolReference;
    GetActiveUdpListeners: LibrarySymbolReference;
    GetIcmpV4Statistics: LibrarySymbolReference;
    GetIcmpV6Statistics: LibrarySymbolReference;
    GetIPGlobalProperties: LibrarySymbolReference;
    GetIPv4GlobalStatistics: LibrarySymbolReference;
    GetIPv6GlobalStatistics: LibrarySymbolReference;
    GetTcpIPv4Statistics: LibrarySymbolReference;
    GetTcpIPv6Statistics: LibrarySymbolReference;
    GetUdpIPv4Statistics: LibrarySymbolReference;
    GetUdpIPv6Statistics: LibrarySymbolReference;
    GetUnicastAddresses: LibrarySymbolReference;
    GetUnicastAddressesAsync: LibrarySymbolReference;
    DhcpScopeName: LibrarySymbolReference;
    DomainName: LibrarySymbolReference;
    HostName: LibrarySymbolReference;
    IsWinsProxy: LibrarySymbolReference;
    NodeType: LibrarySymbolReference
  };
  IPGlobalStatistics: LibrarySymbolReference & {
    IPGlobalStatistics: LibrarySymbolReference;
    DefaultTtl: LibrarySymbolReference;
    ForwardingEnabled: LibrarySymbolReference;
    NumberOfInterfaces: LibrarySymbolReference;
    NumberOfIPAddresses: LibrarySymbolReference;
    NumberOfRoutes: LibrarySymbolReference;
    OutputPacketRequests: LibrarySymbolReference;
    OutputPacketRoutingDiscards: LibrarySymbolReference;
    OutputPacketsDiscarded: LibrarySymbolReference;
    OutputPacketsWithNoRoute: LibrarySymbolReference;
    PacketFragmentFailures: LibrarySymbolReference;
    PacketReassembliesRequired: LibrarySymbolReference;
    PacketReassemblyFailures: LibrarySymbolReference;
    PacketReassemblyTimeout: LibrarySymbolReference;
    PacketsFragmented: LibrarySymbolReference;
    PacketsReassembled: LibrarySymbolReference;
    ReceivedPackets: LibrarySymbolReference;
    ReceivedPacketsDelivered: LibrarySymbolReference;
    ReceivedPacketsDiscarded: LibrarySymbolReference;
    ReceivedPacketsForwarded: LibrarySymbolReference;
    ReceivedPacketsWithAddressErrors: LibrarySymbolReference;
    ReceivedPacketsWithHeadersErrors: LibrarySymbolReference;
    ReceivedPacketsWithUnknownProtocol: LibrarySymbolReference
  };
  IPInterfaceProperties: LibrarySymbolReference & {
    IPInterfaceProperties: LibrarySymbolReference;
    GetIPv4Properties: LibrarySymbolReference;
    GetIPv6Properties: LibrarySymbolReference;
    AnycastAddresses: LibrarySymbolReference;
    DhcpServerAddresses: LibrarySymbolReference;
    DnsAddresses: LibrarySymbolReference;
    DnsSuffix: LibrarySymbolReference;
    GatewayAddresses: LibrarySymbolReference;
    IsDnsEnabled: LibrarySymbolReference;
    IsDynamicDnsEnabled: LibrarySymbolReference;
    MulticastAddresses: LibrarySymbolReference;
    UnicastAddresses: LibrarySymbolReference;
    WinsServersAddresses: LibrarySymbolReference
  };
  IPInterfaceStatistics: LibrarySymbolReference & {
    IPInterfaceStatistics: LibrarySymbolReference;
    BytesReceived: LibrarySymbolReference;
    BytesSent: LibrarySymbolReference;
    IncomingPacketsDiscarded: LibrarySymbolReference;
    IncomingPacketsWithErrors: LibrarySymbolReference;
    IncomingUnknownProtocolPackets: LibrarySymbolReference;
    NonUnicastPacketsReceived: LibrarySymbolReference;
    NonUnicastPacketsSent: LibrarySymbolReference;
    OutgoingPacketsDiscarded: LibrarySymbolReference;
    OutgoingPacketsWithErrors: LibrarySymbolReference;
    OutputQueueLength: LibrarySymbolReference;
    UnicastPacketsReceived: LibrarySymbolReference;
    UnicastPacketsSent: LibrarySymbolReference
  };
  IPStatus: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Success: LibrarySymbolReference;
    DestinationNetworkUnreachable: LibrarySymbolReference;
    DestinationHostUnreachable: LibrarySymbolReference;
    DestinationProhibited: LibrarySymbolReference;
    DestinationProtocolUnreachable: LibrarySymbolReference;
    DestinationPortUnreachable: LibrarySymbolReference;
    NoResources: LibrarySymbolReference;
    BadOption: LibrarySymbolReference;
    HardwareError: LibrarySymbolReference;
    PacketTooBig: LibrarySymbolReference;
    TimedOut: LibrarySymbolReference;
    BadRoute: LibrarySymbolReference;
    TtlExpired: LibrarySymbolReference;
    TtlReassemblyTimeExceeded: LibrarySymbolReference;
    ParameterProblem: LibrarySymbolReference;
    SourceQuench: LibrarySymbolReference;
    BadDestination: LibrarySymbolReference;
    DestinationUnreachable: LibrarySymbolReference;
    TimeExceeded: LibrarySymbolReference;
    BadHeader: LibrarySymbolReference;
    UnrecognizedNextHeader: LibrarySymbolReference;
    IcmpError: LibrarySymbolReference;
    DestinationScopeMismatch: LibrarySymbolReference
  };
  IPv4InterfaceProperties: LibrarySymbolReference & {
    IPv4InterfaceProperties: LibrarySymbolReference;
    Index: LibrarySymbolReference;
    IsAutomaticPrivateAddressingActive: LibrarySymbolReference;
    IsAutomaticPrivateAddressingEnabled: LibrarySymbolReference;
    IsDhcpEnabled: LibrarySymbolReference;
    IsForwardingEnabled: LibrarySymbolReference;
    Mtu: LibrarySymbolReference;
    UsesWins: LibrarySymbolReference
  };
  IPv4InterfaceStatistics: LibrarySymbolReference & {
    IPv4InterfaceStatistics: LibrarySymbolReference;
    BytesReceived: LibrarySymbolReference;
    BytesSent: LibrarySymbolReference;
    IncomingPacketsDiscarded: LibrarySymbolReference;
    IncomingPacketsWithErrors: LibrarySymbolReference;
    IncomingUnknownProtocolPackets: LibrarySymbolReference;
    NonUnicastPacketsReceived: LibrarySymbolReference;
    NonUnicastPacketsSent: LibrarySymbolReference;
    OutgoingPacketsDiscarded: LibrarySymbolReference;
    OutgoingPacketsWithErrors: LibrarySymbolReference;
    OutputQueueLength: LibrarySymbolReference;
    UnicastPacketsReceived: LibrarySymbolReference;
    UnicastPacketsSent: LibrarySymbolReference
  };
  IPv6InterfaceProperties: LibrarySymbolReference & {
    IPv6InterfaceProperties: LibrarySymbolReference;
    GetScopeId: LibrarySymbolReference;
    Index: LibrarySymbolReference;
    Mtu: LibrarySymbolReference
  };
  IcmpV4Statistics: LibrarySymbolReference & {
    IcmpV4Statistics: LibrarySymbolReference;
    AddressMaskRepliesReceived: LibrarySymbolReference;
    AddressMaskRepliesSent: LibrarySymbolReference;
    AddressMaskRequestsReceived: LibrarySymbolReference;
    AddressMaskRequestsSent: LibrarySymbolReference;
    DestinationUnreachableMessagesReceived: LibrarySymbolReference;
    DestinationUnreachableMessagesSent: LibrarySymbolReference;
    EchoRepliesReceived: LibrarySymbolReference;
    EchoRepliesSent: LibrarySymbolReference;
    EchoRequestsReceived: LibrarySymbolReference;
    EchoRequestsSent: LibrarySymbolReference;
    ErrorsReceived: LibrarySymbolReference;
    ErrorsSent: LibrarySymbolReference;
    MessagesReceived: LibrarySymbolReference;
    MessagesSent: LibrarySymbolReference;
    ParameterProblemsReceived: LibrarySymbolReference;
    ParameterProblemsSent: LibrarySymbolReference;
    RedirectsReceived: LibrarySymbolReference;
    RedirectsSent: LibrarySymbolReference;
    SourceQuenchesReceived: LibrarySymbolReference;
    SourceQuenchesSent: LibrarySymbolReference;
    TimeExceededMessagesReceived: LibrarySymbolReference;
    TimeExceededMessagesSent: LibrarySymbolReference;
    TimestampRepliesReceived: LibrarySymbolReference;
    TimestampRepliesSent: LibrarySymbolReference;
    TimestampRequestsReceived: LibrarySymbolReference;
    TimestampRequestsSent: LibrarySymbolReference
  };
  IcmpV6Statistics: LibrarySymbolReference & {
    IcmpV6Statistics: LibrarySymbolReference;
    DestinationUnreachableMessagesReceived: LibrarySymbolReference;
    DestinationUnreachableMessagesSent: LibrarySymbolReference;
    EchoRepliesReceived: LibrarySymbolReference;
    EchoRepliesSent: LibrarySymbolReference;
    EchoRequestsReceived: LibrarySymbolReference;
    EchoRequestsSent: LibrarySymbolReference;
    ErrorsReceived: LibrarySymbolReference;
    ErrorsSent: LibrarySymbolReference;
    MembershipQueriesReceived: LibrarySymbolReference;
    MembershipQueriesSent: LibrarySymbolReference;
    MembershipReductionsReceived: LibrarySymbolReference;
    MembershipReductionsSent: LibrarySymbolReference;
    MembershipReportsReceived: LibrarySymbolReference;
    MembershipReportsSent: LibrarySymbolReference;
    MessagesReceived: LibrarySymbolReference;
    MessagesSent: LibrarySymbolReference;
    NeighborAdvertisementsReceived: LibrarySymbolReference;
    NeighborAdvertisementsSent: LibrarySymbolReference;
    NeighborSolicitsReceived: LibrarySymbolReference;
    NeighborSolicitsSent: LibrarySymbolReference;
    PacketTooBigMessagesReceived: LibrarySymbolReference;
    PacketTooBigMessagesSent: LibrarySymbolReference;
    ParameterProblemsReceived: LibrarySymbolReference;
    ParameterProblemsSent: LibrarySymbolReference;
    RedirectsReceived: LibrarySymbolReference;
    RedirectsSent: LibrarySymbolReference;
    RouterAdvertisementsReceived: LibrarySymbolReference;
    RouterAdvertisementsSent: LibrarySymbolReference;
    RouterSolicitsReceived: LibrarySymbolReference;
    RouterSolicitsSent: LibrarySymbolReference;
    TimeExceededMessagesReceived: LibrarySymbolReference;
    TimeExceededMessagesSent: LibrarySymbolReference
  };
  MulticastIPAddressInformation: LibrarySymbolReference & {
    MulticastIPAddressInformation: LibrarySymbolReference;
    AddressPreferredLifetime: LibrarySymbolReference;
    AddressValidLifetime: LibrarySymbolReference;
    DhcpLeaseLifetime: LibrarySymbolReference;
    DuplicateAddressDetectionState: LibrarySymbolReference;
    PrefixOrigin: LibrarySymbolReference;
    SuffixOrigin: LibrarySymbolReference
  };
  MulticastIPAddressInformationCollection: LibrarySymbolReference & {
    MulticastIPAddressInformationCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  NetBiosNodeType: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Broadcast: LibrarySymbolReference;
    Peer2Peer: LibrarySymbolReference;
    Mixed: LibrarySymbolReference;
    Hybrid: LibrarySymbolReference
  };
  NetworkAddressChangedEventHandler: LibrarySymbolReference & {
    NetworkAddressChangedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  NetworkAvailabilityChangedEventHandler: LibrarySymbolReference & {
    NetworkAvailabilityChangedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  NetworkAvailabilityEventArgs: LibrarySymbolReference & {
    IsAvailable: LibrarySymbolReference
  };
  NetworkChange: LibrarySymbolReference & {

  };
  NetworkInformationException: LibrarySymbolReference & {
    NetworkInformationException: LibrarySymbolReference;
    ErrorCode: LibrarySymbolReference
  };
  NetworkInterface: LibrarySymbolReference & {
    NetworkInterface: LibrarySymbolReference;
    GetAllNetworkInterfaces: LibrarySymbolReference;
    GetIPProperties: LibrarySymbolReference;
    GetIPStatistics: LibrarySymbolReference;
    GetIPv4Statistics: LibrarySymbolReference;
    GetIsNetworkAvailable: LibrarySymbolReference;
    GetPhysicalAddress: LibrarySymbolReference;
    Supports: LibrarySymbolReference;
    Description: LibrarySymbolReference;
    Id: LibrarySymbolReference;
    IPv6LoopbackInterfaceIndex: LibrarySymbolReference;
    IsReceiveOnly: LibrarySymbolReference;
    LoopbackInterfaceIndex: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NetworkInterfaceType: LibrarySymbolReference;
    OperationalStatus: LibrarySymbolReference;
    Speed: LibrarySymbolReference;
    SupportsMulticast: LibrarySymbolReference
  };
  NetworkInterfaceComponent: LibrarySymbolReference & {
    IPv4: LibrarySymbolReference;
    IPv6: LibrarySymbolReference
  };
  NetworkInterfaceType: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Ethernet: LibrarySymbolReference;
    TokenRing: LibrarySymbolReference;
    Fddi: LibrarySymbolReference;
    BasicIsdn: LibrarySymbolReference;
    PrimaryIsdn: LibrarySymbolReference;
    Ppp: LibrarySymbolReference;
    Loopback: LibrarySymbolReference;
    Ethernet3Megabit: LibrarySymbolReference;
    Slip: LibrarySymbolReference;
    Atm: LibrarySymbolReference;
    GenericModem: LibrarySymbolReference;
    FastEthernetT: LibrarySymbolReference;
    Isdn: LibrarySymbolReference;
    FastEthernetFx: LibrarySymbolReference;
    Wireless80211: LibrarySymbolReference;
    AsymmetricDsl: LibrarySymbolReference;
    RateAdaptDsl: LibrarySymbolReference;
    SymmetricDsl: LibrarySymbolReference;
    VeryHighSpeedDsl: LibrarySymbolReference;
    IPOverAtm: LibrarySymbolReference;
    GigabitEthernet: LibrarySymbolReference;
    Tunnel: LibrarySymbolReference;
    MultiRateSymmetricDsl: LibrarySymbolReference;
    HighPerformanceSerialBus: LibrarySymbolReference;
    Wman: LibrarySymbolReference;
    Wwanpp: LibrarySymbolReference;
    Wwanpp2: LibrarySymbolReference
  };
  OperationalStatus: LibrarySymbolReference & {
    Up: LibrarySymbolReference;
    Down: LibrarySymbolReference;
    Testing: LibrarySymbolReference;
    Unknown: LibrarySymbolReference;
    Dormant: LibrarySymbolReference;
    NotPresent: LibrarySymbolReference;
    LowerLayerDown: LibrarySymbolReference
  };
  PhysicalAddress: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    PhysicalAddress: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetAddressBytes: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryParse: LibrarySymbolReference
  };
  Ping: LibrarySymbolReference & {
    Ping: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    OnPingCompleted: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    SendAsync: LibrarySymbolReference;
    SendAsyncCancel: LibrarySymbolReference;
    SendPingAsync: LibrarySymbolReference
  };
  PingCompletedEventArgs: LibrarySymbolReference & {
    Reply: LibrarySymbolReference
  };
  PingCompletedEventHandler: LibrarySymbolReference & {
    PingCompletedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  PingException: LibrarySymbolReference & {
    PingException: LibrarySymbolReference
  };
  PingOptions: LibrarySymbolReference & {
    PingOptions: LibrarySymbolReference;
    DontFragment: LibrarySymbolReference;
    Ttl: LibrarySymbolReference
  };
  PingReply: LibrarySymbolReference & {
    Address: LibrarySymbolReference;
    Buffer: LibrarySymbolReference;
    Options: LibrarySymbolReference;
    RoundtripTime: LibrarySymbolReference;
    Status: LibrarySymbolReference
  };
  PrefixOrigin: LibrarySymbolReference & {
    Other: LibrarySymbolReference;
    Manual: LibrarySymbolReference;
    WellKnown: LibrarySymbolReference;
    Dhcp: LibrarySymbolReference;
    RouterAdvertisement: LibrarySymbolReference
  };
  ScopeLevel: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Interface: LibrarySymbolReference;
    Link: LibrarySymbolReference;
    Subnet: LibrarySymbolReference;
    Admin: LibrarySymbolReference;
    Site: LibrarySymbolReference;
    Organization: LibrarySymbolReference;
    Global: LibrarySymbolReference
  };
  SuffixOrigin: LibrarySymbolReference & {
    Other: LibrarySymbolReference;
    Manual: LibrarySymbolReference;
    WellKnown: LibrarySymbolReference;
    OriginDhcp: LibrarySymbolReference;
    LinkLayerAddress: LibrarySymbolReference;
    Random: LibrarySymbolReference
  };
  TcpConnectionInformation: LibrarySymbolReference & {
    TcpConnectionInformation: LibrarySymbolReference;
    LocalEndPoint: LibrarySymbolReference;
    RemoteEndPoint: LibrarySymbolReference;
    State: LibrarySymbolReference
  };
  TcpState: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Closed: LibrarySymbolReference;
    Listen: LibrarySymbolReference;
    SynSent: LibrarySymbolReference;
    SynReceived: LibrarySymbolReference;
    Established: LibrarySymbolReference;
    FinWait1: LibrarySymbolReference;
    FinWait2: LibrarySymbolReference;
    CloseWait: LibrarySymbolReference;
    Closing: LibrarySymbolReference;
    LastAck: LibrarySymbolReference;
    TimeWait: LibrarySymbolReference;
    DeleteTcb: LibrarySymbolReference
  };
  TcpStatistics: LibrarySymbolReference & {
    TcpStatistics: LibrarySymbolReference;
    ConnectionsAccepted: LibrarySymbolReference;
    ConnectionsInitiated: LibrarySymbolReference;
    CumulativeConnections: LibrarySymbolReference;
    CurrentConnections: LibrarySymbolReference;
    ErrorsReceived: LibrarySymbolReference;
    FailedConnectionAttempts: LibrarySymbolReference;
    MaximumConnections: LibrarySymbolReference;
    MaximumTransmissionTimeout: LibrarySymbolReference;
    MinimumTransmissionTimeout: LibrarySymbolReference;
    ResetConnections: LibrarySymbolReference;
    ResetsSent: LibrarySymbolReference;
    SegmentsReceived: LibrarySymbolReference;
    SegmentsResent: LibrarySymbolReference;
    SegmentsSent: LibrarySymbolReference
  };
  UdpStatistics: LibrarySymbolReference & {
    UdpStatistics: LibrarySymbolReference;
    DatagramsReceived: LibrarySymbolReference;
    DatagramsSent: LibrarySymbolReference;
    IncomingDatagramsDiscarded: LibrarySymbolReference;
    IncomingDatagramsWithErrors: LibrarySymbolReference;
    UdpListeners: LibrarySymbolReference
  };
  UnicastIPAddressInformation: LibrarySymbolReference & {
    UnicastIPAddressInformation: LibrarySymbolReference;
    AddressPreferredLifetime: LibrarySymbolReference;
    AddressValidLifetime: LibrarySymbolReference;
    DhcpLeaseLifetime: LibrarySymbolReference;
    DuplicateAddressDetectionState: LibrarySymbolReference;
    IPv4Mask: LibrarySymbolReference;
    PrefixLength: LibrarySymbolReference;
    PrefixOrigin: LibrarySymbolReference;
    SuffixOrigin: LibrarySymbolReference
  };
  UnicastIPAddressInformationCollection: LibrarySymbolReference & {
    UnicastIPAddressInformationCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    Item: LibrarySymbolReference
  }
};
const NetworkInformation: NetworkInformationLibrary = createLibrary("System.Net.NetworkInformation", {
  DuplicateAddressDetectionState: {
    kind: "enum",
    members: {
      Invalid: {
        kind: "field",
        type: () => {
          return NetworkInformation.DuplicateAddressDetectionState;
        },
      },
      Tentative: {
        kind: "field",
        type: () => {
          return NetworkInformation.DuplicateAddressDetectionState;
        },
      },
      Duplicate: {
        kind: "field",
        type: () => {
          return NetworkInformation.DuplicateAddressDetectionState;
        },
      },
      Deprecated: {
        kind: "field",
        type: () => {
          return NetworkInformation.DuplicateAddressDetectionState;
        },
      },
      Preferred: {
        kind: "field",
        type: () => {
          return NetworkInformation.DuplicateAddressDetectionState;
        },
      },
    },
  },
  GatewayIPAddressInformation: {
    kind: "class",
    members: {
      GatewayIPAddressInformation: {
        kind: "method",
        methodKind: "constructor",
      },
      Address: {
        kind: "property",
        type: () => {
          return Net.IPAddress;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  GatewayIPAddressInformationCollection: {
    kind: "class",
    members: {
      GatewayIPAddressInformationCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return NetworkInformation.GatewayIPAddressInformation;
        },
        isVirtual: true,
      },
    },
  },
  IPAddressCollection: {
    kind: "class",
    members: {
      IPAddressCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return Net.IPAddress;
        },
        isVirtual: true,
      },
    },
  },
  IPAddressInformation: {
    kind: "class",
    members: {
      IPAddressInformation: {
        kind: "method",
        methodKind: "constructor",
      },
      Address: {
        kind: "property",
        type: () => {
          return Net.IPAddress;
        },
        isAbstract: true,
      },
      IsDnsEligible: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      IsTransient: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  IPAddressInformationCollection: {
    kind: "class",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return NetworkInformation.IPAddressInformation;
        },
        isVirtual: true,
      },
    },
  },
  IPGlobalProperties: {
    kind: "class",
    members: {
      IPGlobalProperties: {
        kind: "method",
        methodKind: "constructor",
      },
      BeginGetUnicastAddresses: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EndGetUnicastAddresses: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetActiveTcpConnections: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetActiveTcpListeners: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetActiveUdpListeners: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetIcmpV4Statistics: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetIcmpV6Statistics: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetIPGlobalProperties: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetIPv4GlobalStatistics: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetIPv6GlobalStatistics: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetTcpIPv4Statistics: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetTcpIPv6Statistics: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetUdpIPv4Statistics: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetUdpIPv6Statistics: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetUnicastAddresses: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetUnicastAddressesAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DhcpScopeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      DomainName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      HostName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      IsWinsProxy: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return NetworkInformation.NetBiosNodeType;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  IPGlobalStatistics: {
    kind: "class",
    members: {
      IPGlobalStatistics: {
        kind: "method",
        methodKind: "constructor",
      },
      DefaultTtl: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      ForwardingEnabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      NumberOfInterfaces: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      NumberOfIPAddresses: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      NumberOfRoutes: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      OutputPacketRequests: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      OutputPacketRoutingDiscards: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      OutputPacketsDiscarded: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      OutputPacketsWithNoRoute: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      PacketFragmentFailures: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      PacketReassembliesRequired: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      PacketReassemblyFailures: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      PacketReassemblyTimeout: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      PacketsFragmented: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      PacketsReassembled: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ReceivedPackets: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ReceivedPacketsDelivered: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ReceivedPacketsDiscarded: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ReceivedPacketsForwarded: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ReceivedPacketsWithAddressErrors: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ReceivedPacketsWithHeadersErrors: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ReceivedPacketsWithUnknownProtocol: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  IPInterfaceProperties: {
    kind: "class",
    members: {
      IPInterfaceProperties: {
        kind: "method",
        methodKind: "constructor",
      },
      GetIPv4Properties: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetIPv6Properties: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      AnycastAddresses: {
        kind: "property",
        type: () => {
          return NetworkInformation.IPAddressInformationCollection;
        },
        isAbstract: true,
      },
      DhcpServerAddresses: {
        kind: "property",
        type: () => {
          return NetworkInformation.IPAddressCollection;
        },
        isAbstract: true,
      },
      DnsAddresses: {
        kind: "property",
        type: () => {
          return NetworkInformation.IPAddressCollection;
        },
        isAbstract: true,
      },
      DnsSuffix: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      GatewayAddresses: {
        kind: "property",
        type: () => {
          return NetworkInformation.GatewayIPAddressInformationCollection;
        },
        isAbstract: true,
      },
      IsDnsEnabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      IsDynamicDnsEnabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      MulticastAddresses: {
        kind: "property",
        type: () => {
          return NetworkInformation.MulticastIPAddressInformationCollection;
        },
        isAbstract: true,
      },
      UnicastAddresses: {
        kind: "property",
        type: () => {
          return NetworkInformation.UnicastIPAddressInformationCollection;
        },
        isAbstract: true,
      },
      WinsServersAddresses: {
        kind: "property",
        type: () => {
          return NetworkInformation.IPAddressCollection;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  IPInterfaceStatistics: {
    kind: "class",
    members: {
      IPInterfaceStatistics: {
        kind: "method",
        methodKind: "constructor",
      },
      BytesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      BytesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      IncomingPacketsDiscarded: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      IncomingPacketsWithErrors: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      IncomingUnknownProtocolPackets: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      NonUnicastPacketsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      NonUnicastPacketsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      OutgoingPacketsDiscarded: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      OutgoingPacketsWithErrors: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      OutputQueueLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      UnicastPacketsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      UnicastPacketsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  IPStatus: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      Success: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      DestinationNetworkUnreachable: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      DestinationHostUnreachable: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      DestinationProhibited: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      DestinationProtocolUnreachable: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      DestinationPortUnreachable: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      NoResources: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      BadOption: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      HardwareError: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      PacketTooBig: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      TimedOut: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      BadRoute: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      TtlExpired: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      TtlReassemblyTimeExceeded: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      ParameterProblem: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      SourceQuench: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      BadDestination: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      DestinationUnreachable: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      TimeExceeded: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      BadHeader: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      UnrecognizedNextHeader: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      IcmpError: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
      DestinationScopeMismatch: {
        kind: "field",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
    },
  },
  IPv4InterfaceProperties: {
    kind: "class",
    members: {
      IPv4InterfaceProperties: {
        kind: "method",
        methodKind: "constructor",
      },
      Index: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      IsAutomaticPrivateAddressingActive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      IsAutomaticPrivateAddressingEnabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      IsDhcpEnabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      IsForwardingEnabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      Mtu: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      UsesWins: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  IPv4InterfaceStatistics: {
    kind: "class",
    members: {
      IPv4InterfaceStatistics: {
        kind: "method",
        methodKind: "constructor",
      },
      BytesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      BytesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      IncomingPacketsDiscarded: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      IncomingPacketsWithErrors: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      IncomingUnknownProtocolPackets: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      NonUnicastPacketsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      NonUnicastPacketsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      OutgoingPacketsDiscarded: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      OutgoingPacketsWithErrors: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      OutputQueueLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      UnicastPacketsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      UnicastPacketsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  IPv6InterfaceProperties: {
    kind: "class",
    members: {
      IPv6InterfaceProperties: {
        kind: "method",
        methodKind: "constructor",
      },
      GetScopeId: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Index: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      Mtu: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  IcmpV4Statistics: {
    kind: "class",
    members: {
      IcmpV4Statistics: {
        kind: "method",
        methodKind: "constructor",
      },
      AddressMaskRepliesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      AddressMaskRepliesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      AddressMaskRequestsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      AddressMaskRequestsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      DestinationUnreachableMessagesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      DestinationUnreachableMessagesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      EchoRepliesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      EchoRepliesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      EchoRequestsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      EchoRequestsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ErrorsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ErrorsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      MessagesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      MessagesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ParameterProblemsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ParameterProblemsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      RedirectsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      RedirectsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      SourceQuenchesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      SourceQuenchesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      TimeExceededMessagesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      TimeExceededMessagesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      TimestampRepliesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      TimestampRepliesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      TimestampRequestsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      TimestampRequestsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  IcmpV6Statistics: {
    kind: "class",
    members: {
      IcmpV6Statistics: {
        kind: "method",
        methodKind: "constructor",
      },
      DestinationUnreachableMessagesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      DestinationUnreachableMessagesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      EchoRepliesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      EchoRepliesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      EchoRequestsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      EchoRequestsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ErrorsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ErrorsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      MembershipQueriesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      MembershipQueriesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      MembershipReductionsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      MembershipReductionsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      MembershipReportsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      MembershipReportsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      MessagesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      MessagesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      NeighborAdvertisementsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      NeighborAdvertisementsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      NeighborSolicitsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      NeighborSolicitsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      PacketTooBigMessagesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      PacketTooBigMessagesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ParameterProblemsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ParameterProblemsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      RedirectsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      RedirectsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      RouterAdvertisementsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      RouterAdvertisementsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      RouterSolicitsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      RouterSolicitsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      TimeExceededMessagesReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      TimeExceededMessagesSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  MulticastIPAddressInformation: {
    kind: "class",
    members: {
      MulticastIPAddressInformation: {
        kind: "method",
        methodKind: "constructor",
      },
      AddressPreferredLifetime: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      AddressValidLifetime: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      DhcpLeaseLifetime: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      DuplicateAddressDetectionState: {
        kind: "property",
        type: () => {
          return NetworkInformation.DuplicateAddressDetectionState;
        },
        isAbstract: true,
      },
      PrefixOrigin: {
        kind: "property",
        type: () => {
          return NetworkInformation.PrefixOrigin;
        },
        isAbstract: true,
      },
      SuffixOrigin: {
        kind: "property",
        type: () => {
          return NetworkInformation.SuffixOrigin;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  MulticastIPAddressInformationCollection: {
    kind: "class",
    members: {
      MulticastIPAddressInformationCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return NetworkInformation.MulticastIPAddressInformation;
        },
        isVirtual: true,
      },
    },
  },
  NetBiosNodeType: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetBiosNodeType;
        },
      },
      Broadcast: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetBiosNodeType;
        },
      },
      Peer2Peer: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetBiosNodeType;
        },
      },
      Mixed: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetBiosNodeType;
        },
      },
      Hybrid: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetBiosNodeType;
        },
      },
    },
  },
  NetworkAddressChangedEventHandler: {
    kind: "generic",
    members: {
      NetworkAddressChangedEventHandler: {
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
  NetworkAvailabilityChangedEventHandler: {
    kind: "generic",
    members: {
      NetworkAvailabilityChangedEventHandler: {
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
  NetworkAvailabilityEventArgs: {
    kind: "class",
    members: {
      IsAvailable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  NetworkChange: {
    kind: "class",
    members: {},
  },
  NetworkInformationException: {
    kind: "class",
    members: {
      NetworkInformationException: {
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
  NetworkInterface: {
    kind: "class",
    members: {
      NetworkInterface: {
        kind: "method",
        methodKind: "constructor",
      },
      GetAllNetworkInterfaces: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetIPProperties: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetIPStatistics: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetIPv4Statistics: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetIsNetworkAvailable: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetPhysicalAddress: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Supports: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Description: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      Id: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      IPv6LoopbackInterfaceIndex: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      IsReceiveOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      LoopbackInterfaceIndex: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      NetworkInterfaceType: {
        kind: "property",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
        isVirtual: true,
      },
      OperationalStatus: {
        kind: "property",
        type: () => {
          return NetworkInformation.OperationalStatus;
        },
        isVirtual: true,
      },
      Speed: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isVirtual: true,
      },
      SupportsMulticast: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  NetworkInterfaceComponent: {
    kind: "enum",
    members: {
      IPv4: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceComponent;
        },
      },
      IPv6: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceComponent;
        },
      },
    },
  },
  NetworkInterfaceType: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      Ethernet: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      TokenRing: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      Fddi: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      BasicIsdn: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      PrimaryIsdn: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      Ppp: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      Loopback: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      Ethernet3Megabit: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      Slip: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      Atm: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      GenericModem: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      FastEthernetT: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      Isdn: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      FastEthernetFx: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      Wireless80211: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      AsymmetricDsl: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      RateAdaptDsl: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      SymmetricDsl: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      VeryHighSpeedDsl: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      IPOverAtm: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      GigabitEthernet: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      Tunnel: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      MultiRateSymmetricDsl: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      HighPerformanceSerialBus: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      Wman: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      Wwanpp: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
      Wwanpp2: {
        kind: "field",
        type: () => {
          return NetworkInformation.NetworkInterfaceType;
        },
      },
    },
  },
  OperationalStatus: {
    kind: "enum",
    members: {
      Up: {
        kind: "field",
        type: () => {
          return NetworkInformation.OperationalStatus;
        },
      },
      Down: {
        kind: "field",
        type: () => {
          return NetworkInformation.OperationalStatus;
        },
      },
      Testing: {
        kind: "field",
        type: () => {
          return NetworkInformation.OperationalStatus;
        },
      },
      Unknown: {
        kind: "field",
        type: () => {
          return NetworkInformation.OperationalStatus;
        },
      },
      Dormant: {
        kind: "field",
        type: () => {
          return NetworkInformation.OperationalStatus;
        },
      },
      NotPresent: {
        kind: "field",
        type: () => {
          return NetworkInformation.OperationalStatus;
        },
      },
      LowerLayerDown: {
        kind: "field",
        type: () => {
          return NetworkInformation.OperationalStatus;
        },
      },
    },
  },
  PhysicalAddress: {
    kind: "class",
    members: {
      None: {
        kind: "field",
        type: () => {
          return NetworkInformation.PhysicalAddress;
        },
        isStatic: true,
        isReadOnly: true,
      },
      PhysicalAddress: {
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
    },
  },
  Ping: {
    kind: "class",
    members: {
      Ping: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      OnPingCompleted: {
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
      SendAsyncCancel: {
        kind: "method",
        methodKind: "ordinary",
      },
      SendPingAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  PingCompletedEventArgs: {
    kind: "class",
    members: {
      Reply: {
        kind: "property",
        type: () => {
          return NetworkInformation.PingReply;
        },
      },
    },
  },
  PingCompletedEventHandler: {
    kind: "generic",
    members: {
      PingCompletedEventHandler: {
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
  PingException: {
    kind: "class",
    members: {
      PingException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  PingOptions: {
    kind: "class",
    members: {
      PingOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      DontFragment: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Ttl: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  PingReply: {
    kind: "class",
    members: {
      Address: {
        kind: "property",
        type: () => {
          return Net.IPAddress;
        },
      },
      Buffer: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      Options: {
        kind: "property",
        type: () => {
          return NetworkInformation.PingOptions;
        },
      },
      RoundtripTime: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      Status: {
        kind: "property",
        type: () => {
          return NetworkInformation.IPStatus;
        },
      },
    },
  },
  PrefixOrigin: {
    kind: "enum",
    members: {
      Other: {
        kind: "field",
        type: () => {
          return NetworkInformation.PrefixOrigin;
        },
      },
      Manual: {
        kind: "field",
        type: () => {
          return NetworkInformation.PrefixOrigin;
        },
      },
      WellKnown: {
        kind: "field",
        type: () => {
          return NetworkInformation.PrefixOrigin;
        },
      },
      Dhcp: {
        kind: "field",
        type: () => {
          return NetworkInformation.PrefixOrigin;
        },
      },
      RouterAdvertisement: {
        kind: "field",
        type: () => {
          return NetworkInformation.PrefixOrigin;
        },
      },
    },
  },
  ScopeLevel: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return NetworkInformation.ScopeLevel;
        },
      },
      Interface: {
        kind: "field",
        type: () => {
          return NetworkInformation.ScopeLevel;
        },
      },
      Link: {
        kind: "field",
        type: () => {
          return NetworkInformation.ScopeLevel;
        },
      },
      Subnet: {
        kind: "field",
        type: () => {
          return NetworkInformation.ScopeLevel;
        },
      },
      Admin: {
        kind: "field",
        type: () => {
          return NetworkInformation.ScopeLevel;
        },
      },
      Site: {
        kind: "field",
        type: () => {
          return NetworkInformation.ScopeLevel;
        },
      },
      Organization: {
        kind: "field",
        type: () => {
          return NetworkInformation.ScopeLevel;
        },
      },
      Global: {
        kind: "field",
        type: () => {
          return NetworkInformation.ScopeLevel;
        },
      },
    },
  },
  SuffixOrigin: {
    kind: "enum",
    members: {
      Other: {
        kind: "field",
        type: () => {
          return NetworkInformation.SuffixOrigin;
        },
      },
      Manual: {
        kind: "field",
        type: () => {
          return NetworkInformation.SuffixOrigin;
        },
      },
      WellKnown: {
        kind: "field",
        type: () => {
          return NetworkInformation.SuffixOrigin;
        },
      },
      OriginDhcp: {
        kind: "field",
        type: () => {
          return NetworkInformation.SuffixOrigin;
        },
      },
      LinkLayerAddress: {
        kind: "field",
        type: () => {
          return NetworkInformation.SuffixOrigin;
        },
      },
      Random: {
        kind: "field",
        type: () => {
          return NetworkInformation.SuffixOrigin;
        },
      },
    },
  },
  TcpConnectionInformation: {
    kind: "class",
    members: {
      TcpConnectionInformation: {
        kind: "method",
        methodKind: "constructor",
      },
      LocalEndPoint: {
        kind: "property",
        type: () => {
          return Net.IPEndPoint;
        },
        isAbstract: true,
      },
      RemoteEndPoint: {
        kind: "property",
        type: () => {
          return Net.IPEndPoint;
        },
        isAbstract: true,
      },
      State: {
        kind: "property",
        type: () => {
          return NetworkInformation.TcpState;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  TcpState: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return NetworkInformation.TcpState;
        },
      },
      Closed: {
        kind: "field",
        type: () => {
          return NetworkInformation.TcpState;
        },
      },
      Listen: {
        kind: "field",
        type: () => {
          return NetworkInformation.TcpState;
        },
      },
      SynSent: {
        kind: "field",
        type: () => {
          return NetworkInformation.TcpState;
        },
      },
      SynReceived: {
        kind: "field",
        type: () => {
          return NetworkInformation.TcpState;
        },
      },
      Established: {
        kind: "field",
        type: () => {
          return NetworkInformation.TcpState;
        },
      },
      FinWait1: {
        kind: "field",
        type: () => {
          return NetworkInformation.TcpState;
        },
      },
      FinWait2: {
        kind: "field",
        type: () => {
          return NetworkInformation.TcpState;
        },
      },
      CloseWait: {
        kind: "field",
        type: () => {
          return NetworkInformation.TcpState;
        },
      },
      Closing: {
        kind: "field",
        type: () => {
          return NetworkInformation.TcpState;
        },
      },
      LastAck: {
        kind: "field",
        type: () => {
          return NetworkInformation.TcpState;
        },
      },
      TimeWait: {
        kind: "field",
        type: () => {
          return NetworkInformation.TcpState;
        },
      },
      DeleteTcb: {
        kind: "field",
        type: () => {
          return NetworkInformation.TcpState;
        },
      },
    },
  },
  TcpStatistics: {
    kind: "class",
    members: {
      TcpStatistics: {
        kind: "method",
        methodKind: "constructor",
      },
      ConnectionsAccepted: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ConnectionsInitiated: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      CumulativeConnections: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      CurrentConnections: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ErrorsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      FailedConnectionAttempts: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      MaximumConnections: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      MaximumTransmissionTimeout: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      MinimumTransmissionTimeout: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ResetConnections: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ResetsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      SegmentsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      SegmentsResent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      SegmentsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  UdpStatistics: {
    kind: "class",
    members: {
      UdpStatistics: {
        kind: "method",
        methodKind: "constructor",
      },
      DatagramsReceived: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      DatagramsSent: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      IncomingDatagramsDiscarded: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      IncomingDatagramsWithErrors: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      UdpListeners: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  UnicastIPAddressInformation: {
    kind: "class",
    members: {
      UnicastIPAddressInformation: {
        kind: "method",
        methodKind: "constructor",
      },
      AddressPreferredLifetime: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      AddressValidLifetime: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      DhcpLeaseLifetime: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      DuplicateAddressDetectionState: {
        kind: "property",
        type: () => {
          return NetworkInformation.DuplicateAddressDetectionState;
        },
        isAbstract: true,
      },
      IPv4Mask: {
        kind: "property",
        type: () => {
          return Net.IPAddress;
        },
        isAbstract: true,
      },
      PrefixLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      PrefixOrigin: {
        kind: "property",
        type: () => {
          return NetworkInformation.PrefixOrigin;
        },
        isAbstract: true,
      },
      SuffixOrigin: {
        kind: "property",
        type: () => {
          return NetworkInformation.SuffixOrigin;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  UnicastIPAddressInformationCollection: {
    kind: "class",
    members: {
      UnicastIPAddressInformationCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return NetworkInformation.UnicastIPAddressInformation;
        },
        isVirtual: true,
      },
    },
  },
});
export default NetworkInformation
