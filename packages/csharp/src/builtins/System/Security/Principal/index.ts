import SafeHandles from "../../../Microsoft/Win32/SafeHandles/index.js";
import Generic from "../../Collections/Generic/index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type PrincipalLibrary = LibrarySymbolReference & {
  GenericIdentity: LibrarySymbolReference & {
    GenericIdentity: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    AuthenticationType: LibrarySymbolReference;
    Claims: LibrarySymbolReference;
    IsAuthenticated: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  GenericPrincipal: LibrarySymbolReference & {
    GenericPrincipal: LibrarySymbolReference;
    IsInRole: LibrarySymbolReference;
    Identity: LibrarySymbolReference
  };
  IIdentity: LibrarySymbolReference & {
    AuthenticationType: LibrarySymbolReference;
    IsAuthenticated: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  IPrincipal: LibrarySymbolReference & {
    IsInRole: LibrarySymbolReference;
    Identity: LibrarySymbolReference
  };
  IdentityNotMappedException: LibrarySymbolReference & {
    IdentityNotMappedException: LibrarySymbolReference;
    UnmappedIdentities: LibrarySymbolReference
  };
  IdentityReference: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsValidTargetType: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Translate: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  IdentityReferenceCollection: LibrarySymbolReference & {
    IdentityReferenceCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Translate: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  NTAccount: LibrarySymbolReference & {
    NTAccount: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsValidTargetType: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Translate: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  PrincipalPolicy: LibrarySymbolReference & {
    UnauthenticatedPrincipal: LibrarySymbolReference;
    NoPrincipal: LibrarySymbolReference;
    WindowsPrincipal: LibrarySymbolReference
  };
  SecurityIdentifier: LibrarySymbolReference & {
    MaxBinaryLength: LibrarySymbolReference;
    MinBinaryLength: LibrarySymbolReference;
    SecurityIdentifier: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetBinaryForm: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsAccountSid: LibrarySymbolReference;
    IsEqualDomainSid: LibrarySymbolReference;
    IsValidTargetType: LibrarySymbolReference;
    IsWellKnown: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Translate: LibrarySymbolReference;
    AccountDomainSid: LibrarySymbolReference;
    BinaryLength: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  TokenAccessLevels: LibrarySymbolReference & {
    AssignPrimary: LibrarySymbolReference;
    Duplicate: LibrarySymbolReference;
    Impersonate: LibrarySymbolReference;
    Query: LibrarySymbolReference;
    QuerySource: LibrarySymbolReference;
    AdjustPrivileges: LibrarySymbolReference;
    AdjustGroups: LibrarySymbolReference;
    AdjustDefault: LibrarySymbolReference;
    AdjustSessionId: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    AllAccess: LibrarySymbolReference;
    MaximumAllowed: LibrarySymbolReference
  };
  TokenImpersonationLevel: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Anonymous: LibrarySymbolReference;
    Identification: LibrarySymbolReference;
    Impersonation: LibrarySymbolReference;
    Delegation: LibrarySymbolReference
  };
  WellKnownSidType: LibrarySymbolReference & {
    NullSid: LibrarySymbolReference;
    WorldSid: LibrarySymbolReference;
    LocalSid: LibrarySymbolReference;
    CreatorOwnerSid: LibrarySymbolReference;
    CreatorGroupSid: LibrarySymbolReference;
    CreatorOwnerServerSid: LibrarySymbolReference;
    CreatorGroupServerSid: LibrarySymbolReference;
    NTAuthoritySid: LibrarySymbolReference;
    DialupSid: LibrarySymbolReference;
    NetworkSid: LibrarySymbolReference;
    BatchSid: LibrarySymbolReference;
    InteractiveSid: LibrarySymbolReference;
    ServiceSid: LibrarySymbolReference;
    AnonymousSid: LibrarySymbolReference;
    ProxySid: LibrarySymbolReference;
    EnterpriseControllersSid: LibrarySymbolReference;
    SelfSid: LibrarySymbolReference;
    AuthenticatedUserSid: LibrarySymbolReference;
    RestrictedCodeSid: LibrarySymbolReference;
    TerminalServerSid: LibrarySymbolReference;
    RemoteLogonIdSid: LibrarySymbolReference;
    LogonIdsSid: LibrarySymbolReference;
    LocalSystemSid: LibrarySymbolReference;
    LocalServiceSid: LibrarySymbolReference;
    NetworkServiceSid: LibrarySymbolReference;
    BuiltinDomainSid: LibrarySymbolReference;
    BuiltinAdministratorsSid: LibrarySymbolReference;
    BuiltinUsersSid: LibrarySymbolReference;
    BuiltinGuestsSid: LibrarySymbolReference;
    BuiltinPowerUsersSid: LibrarySymbolReference;
    BuiltinAccountOperatorsSid: LibrarySymbolReference;
    BuiltinSystemOperatorsSid: LibrarySymbolReference;
    BuiltinPrintOperatorsSid: LibrarySymbolReference;
    BuiltinBackupOperatorsSid: LibrarySymbolReference;
    BuiltinReplicatorSid: LibrarySymbolReference;
    BuiltinPreWindows2000CompatibleAccessSid: LibrarySymbolReference;
    BuiltinRemoteDesktopUsersSid: LibrarySymbolReference;
    BuiltinNetworkConfigurationOperatorsSid: LibrarySymbolReference;
    AccountAdministratorSid: LibrarySymbolReference;
    AccountGuestSid: LibrarySymbolReference;
    AccountKrbtgtSid: LibrarySymbolReference;
    AccountDomainAdminsSid: LibrarySymbolReference;
    AccountDomainUsersSid: LibrarySymbolReference;
    AccountDomainGuestsSid: LibrarySymbolReference;
    AccountComputersSid: LibrarySymbolReference;
    AccountControllersSid: LibrarySymbolReference;
    AccountCertAdminsSid: LibrarySymbolReference;
    AccountSchemaAdminsSid: LibrarySymbolReference;
    AccountEnterpriseAdminsSid: LibrarySymbolReference;
    AccountPolicyAdminsSid: LibrarySymbolReference;
    AccountRasAndIasServersSid: LibrarySymbolReference;
    NtlmAuthenticationSid: LibrarySymbolReference;
    DigestAuthenticationSid: LibrarySymbolReference;
    SChannelAuthenticationSid: LibrarySymbolReference;
    ThisOrganizationSid: LibrarySymbolReference;
    OtherOrganizationSid: LibrarySymbolReference;
    BuiltinIncomingForestTrustBuildersSid: LibrarySymbolReference;
    BuiltinPerformanceMonitoringUsersSid: LibrarySymbolReference;
    BuiltinPerformanceLoggingUsersSid: LibrarySymbolReference;
    BuiltinAuthorizationAccessSid: LibrarySymbolReference;
    WinBuiltinTerminalServerLicenseServersSid: LibrarySymbolReference;
    WinBuiltinDCOMUsersSid: LibrarySymbolReference;
    WinBuiltinIUsersSid: LibrarySymbolReference;
    WinIUserSid: LibrarySymbolReference;
    WinBuiltinCryptoOperatorsSid: LibrarySymbolReference;
    WinUntrustedLabelSid: LibrarySymbolReference;
    WinLowLabelSid: LibrarySymbolReference;
    WinMediumLabelSid: LibrarySymbolReference;
    WinHighLabelSid: LibrarySymbolReference;
    WinSystemLabelSid: LibrarySymbolReference;
    WinWriteRestrictedCodeSid: LibrarySymbolReference;
    WinCreatorOwnerRightsSid: LibrarySymbolReference;
    WinCacheablePrincipalsGroupSid: LibrarySymbolReference;
    WinNonCacheablePrincipalsGroupSid: LibrarySymbolReference;
    WinEnterpriseReadonlyControllersSid: LibrarySymbolReference;
    WinAccountReadonlyControllersSid: LibrarySymbolReference;
    WinBuiltinEventLogReadersGroup: LibrarySymbolReference;
    WinNewEnterpriseReadonlyControllersSid: LibrarySymbolReference;
    WinBuiltinCertSvcDComAccessGroup: LibrarySymbolReference;
    WinMediumPlusLabelSid: LibrarySymbolReference;
    WinLocalLogonSid: LibrarySymbolReference;
    WinConsoleLogonSid: LibrarySymbolReference;
    WinThisOrganizationCertificateSid: LibrarySymbolReference;
    WinApplicationPackageAuthoritySid: LibrarySymbolReference;
    WinBuiltinAnyPackageSid: LibrarySymbolReference;
    WinCapabilityInternetClientSid: LibrarySymbolReference;
    WinCapabilityInternetClientServerSid: LibrarySymbolReference;
    WinCapabilityPrivateNetworkClientServerSid: LibrarySymbolReference;
    WinCapabilityPicturesLibrarySid: LibrarySymbolReference;
    WinCapabilityVideosLibrarySid: LibrarySymbolReference;
    WinCapabilityMusicLibrarySid: LibrarySymbolReference;
    WinCapabilityDocumentsLibrarySid: LibrarySymbolReference;
    WinCapabilitySharedUserCertificatesSid: LibrarySymbolReference;
    WinCapabilityEnterpriseAuthenticationSid: LibrarySymbolReference;
    WinCapabilityRemovableStorageSid: LibrarySymbolReference
  };
  WindowsAccountType: LibrarySymbolReference & {
    Normal: LibrarySymbolReference;
    Guest: LibrarySymbolReference;
    System: LibrarySymbolReference;
    Anonymous: LibrarySymbolReference
  };
  WindowsBuiltInRole: LibrarySymbolReference & {
    Administrator: LibrarySymbolReference;
    User: LibrarySymbolReference;
    Guest: LibrarySymbolReference;
    PowerUser: LibrarySymbolReference;
    AccountOperator: LibrarySymbolReference;
    SystemOperator: LibrarySymbolReference;
    PrintOperator: LibrarySymbolReference;
    BackupOperator: LibrarySymbolReference;
    Replicator: LibrarySymbolReference
  };
  WindowsIdentity: LibrarySymbolReference & {
    DefaultIssuer: LibrarySymbolReference;
    WindowsIdentity: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetAnonymous: LibrarySymbolReference;
    GetCurrent: LibrarySymbolReference;
    RunImpersonated: LibrarySymbolReference;
    RunImpersonatedAsync: LibrarySymbolReference;
    AccessToken: LibrarySymbolReference;
    AuthenticationType: LibrarySymbolReference;
    Claims: LibrarySymbolReference;
    DeviceClaims: LibrarySymbolReference;
    Groups: LibrarySymbolReference;
    ImpersonationLevel: LibrarySymbolReference;
    IsAnonymous: LibrarySymbolReference;
    IsAuthenticated: LibrarySymbolReference;
    IsGuest: LibrarySymbolReference;
    IsSystem: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Owner: LibrarySymbolReference;
    Token: LibrarySymbolReference;
    User: LibrarySymbolReference;
    UserClaims: LibrarySymbolReference
  };
  WindowsPrincipal: LibrarySymbolReference & {
    WindowsPrincipal: LibrarySymbolReference;
    IsInRole: LibrarySymbolReference;
    DeviceClaims: LibrarySymbolReference;
    Identity: LibrarySymbolReference;
    UserClaims: LibrarySymbolReference
  }
};
const Principal: PrincipalLibrary = createLibrary("System.Security.Principal", {
  GenericIdentity: {
    kind: "class",
    members: {
      GenericIdentity: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AuthenticationType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      Claims: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
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
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
  },
  GenericPrincipal: {
    kind: "class",
    members: {
      GenericPrincipal: {
        kind: "method",
        methodKind: "constructor",
      },
      IsInRole: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Identity: {
        kind: "property",
        type: () => {
          return Principal.IIdentity;
        },
        isOverride: true,
      },
    },
  },
  IIdentity: {
    kind: "interface",
    members: {
      AuthenticationType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      IsAuthenticated: {
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
        isNullable: true,
      },
    },
  },
  IPrincipal: {
    kind: "interface",
    members: {
      IsInRole: {
        kind: "method",
        methodKind: "ordinary",
      },
      Identity: {
        kind: "property",
        type: () => {
          return Principal.IIdentity;
        },
      },
    },
  },
  IdentityNotMappedException: {
    kind: "class",
    members: {
      IdentityNotMappedException: {
        kind: "method",
        methodKind: "constructor",
      },
      UnmappedIdentities: {
        kind: "property",
        type: () => {
          return Principal.IdentityReferenceCollection;
        },
      },
    },
    isSealed: true,
  },
  IdentityReference: {
    kind: "class",
    members: {
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
        isOverride: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
        isOverride: true,
      },
      IsValidTargetType: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
        isOverride: true,
      },
      Translate: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  IdentityReferenceCollection: {
    kind: "class",
    members: {
      IdentityReferenceCollection: {
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
      Translate: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return Principal.IdentityReference;
        },
      },
    },
  },
  NTAccount: {
    kind: "class",
    members: {
      NTAccount: {
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
      IsValidTargetType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Translate: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  PrincipalPolicy: {
    kind: "enum",
    members: {
      UnauthenticatedPrincipal: {
        kind: "field",
        type: () => {
          return Principal.PrincipalPolicy;
        },
      },
      NoPrincipal: {
        kind: "field",
        type: () => {
          return Principal.PrincipalPolicy;
        },
      },
      WindowsPrincipal: {
        kind: "field",
        type: () => {
          return Principal.PrincipalPolicy;
        },
      },
    },
  },
  SecurityIdentifier: {
    kind: "class",
    members: {
      MaxBinaryLength: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MinBinaryLength: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SecurityIdentifier: {
        kind: "method",
        methodKind: "constructor",
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetBinaryForm: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsAccountSid: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEqualDomainSid: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsValidTargetType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsWellKnown: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Translate: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AccountDomainSid: {
        kind: "property",
        type: () => {
          return Principal.SecurityIdentifier;
        },
        isNullable: true,
      },
      BinaryLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  TokenAccessLevels: {
    kind: "enum",
    members: {
      AssignPrimary: {
        kind: "field",
        type: () => {
          return Principal.TokenAccessLevels;
        },
      },
      Duplicate: {
        kind: "field",
        type: () => {
          return Principal.TokenAccessLevels;
        },
      },
      Impersonate: {
        kind: "field",
        type: () => {
          return Principal.TokenAccessLevels;
        },
      },
      Query: {
        kind: "field",
        type: () => {
          return Principal.TokenAccessLevels;
        },
      },
      QuerySource: {
        kind: "field",
        type: () => {
          return Principal.TokenAccessLevels;
        },
      },
      AdjustPrivileges: {
        kind: "field",
        type: () => {
          return Principal.TokenAccessLevels;
        },
      },
      AdjustGroups: {
        kind: "field",
        type: () => {
          return Principal.TokenAccessLevels;
        },
      },
      AdjustDefault: {
        kind: "field",
        type: () => {
          return Principal.TokenAccessLevels;
        },
      },
      AdjustSessionId: {
        kind: "field",
        type: () => {
          return Principal.TokenAccessLevels;
        },
      },
      Read: {
        kind: "field",
        type: () => {
          return Principal.TokenAccessLevels;
        },
      },
      Write: {
        kind: "field",
        type: () => {
          return Principal.TokenAccessLevels;
        },
      },
      AllAccess: {
        kind: "field",
        type: () => {
          return Principal.TokenAccessLevels;
        },
      },
      MaximumAllowed: {
        kind: "field",
        type: () => {
          return Principal.TokenAccessLevels;
        },
      },
    },
  },
  TokenImpersonationLevel: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Principal.TokenImpersonationLevel;
        },
      },
      Anonymous: {
        kind: "field",
        type: () => {
          return Principal.TokenImpersonationLevel;
        },
      },
      Identification: {
        kind: "field",
        type: () => {
          return Principal.TokenImpersonationLevel;
        },
      },
      Impersonation: {
        kind: "field",
        type: () => {
          return Principal.TokenImpersonationLevel;
        },
      },
      Delegation: {
        kind: "field",
        type: () => {
          return Principal.TokenImpersonationLevel;
        },
      },
    },
  },
  WellKnownSidType: {
    kind: "enum",
    members: {
      NullSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WorldSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      LocalSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      CreatorOwnerSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      CreatorGroupSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      CreatorOwnerServerSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      CreatorGroupServerSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      NTAuthoritySid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      DialupSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      NetworkSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BatchSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      InteractiveSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      ServiceSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AnonymousSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      ProxySid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      EnterpriseControllersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      SelfSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AuthenticatedUserSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      RestrictedCodeSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      TerminalServerSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      RemoteLogonIdSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      LogonIdsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      LocalSystemSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      LocalServiceSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      NetworkServiceSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinDomainSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinAdministratorsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinUsersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinGuestsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinPowerUsersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinAccountOperatorsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinSystemOperatorsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinPrintOperatorsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinBackupOperatorsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinReplicatorSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinPreWindows2000CompatibleAccessSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinRemoteDesktopUsersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinNetworkConfigurationOperatorsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AccountAdministratorSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AccountGuestSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AccountKrbtgtSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AccountDomainAdminsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AccountDomainUsersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AccountDomainGuestsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AccountComputersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AccountControllersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AccountCertAdminsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AccountSchemaAdminsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AccountEnterpriseAdminsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AccountPolicyAdminsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      AccountRasAndIasServersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      NtlmAuthenticationSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      DigestAuthenticationSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      SChannelAuthenticationSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      ThisOrganizationSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      OtherOrganizationSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinIncomingForestTrustBuildersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinPerformanceMonitoringUsersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinPerformanceLoggingUsersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      BuiltinAuthorizationAccessSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinBuiltinTerminalServerLicenseServersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinBuiltinDCOMUsersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinBuiltinIUsersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinIUserSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinBuiltinCryptoOperatorsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinUntrustedLabelSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinLowLabelSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinMediumLabelSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinHighLabelSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinSystemLabelSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinWriteRestrictedCodeSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinCreatorOwnerRightsSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinCacheablePrincipalsGroupSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinNonCacheablePrincipalsGroupSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinEnterpriseReadonlyControllersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinAccountReadonlyControllersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinBuiltinEventLogReadersGroup: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinNewEnterpriseReadonlyControllersSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinBuiltinCertSvcDComAccessGroup: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinMediumPlusLabelSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinLocalLogonSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinConsoleLogonSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinThisOrganizationCertificateSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinApplicationPackageAuthoritySid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinBuiltinAnyPackageSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinCapabilityInternetClientSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinCapabilityInternetClientServerSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinCapabilityPrivateNetworkClientServerSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinCapabilityPicturesLibrarySid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinCapabilityVideosLibrarySid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinCapabilityMusicLibrarySid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinCapabilityDocumentsLibrarySid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinCapabilitySharedUserCertificatesSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinCapabilityEnterpriseAuthenticationSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
      WinCapabilityRemovableStorageSid: {
        kind: "field",
        type: () => {
          return Principal.WellKnownSidType;
        },
      },
    },
  },
  WindowsAccountType: {
    kind: "enum",
    members: {
      Normal: {
        kind: "field",
        type: () => {
          return Principal.WindowsAccountType;
        },
      },
      Guest: {
        kind: "field",
        type: () => {
          return Principal.WindowsAccountType;
        },
      },
      System: {
        kind: "field",
        type: () => {
          return Principal.WindowsAccountType;
        },
      },
      Anonymous: {
        kind: "field",
        type: () => {
          return Principal.WindowsAccountType;
        },
      },
    },
  },
  WindowsBuiltInRole: {
    kind: "enum",
    members: {
      Administrator: {
        kind: "field",
        type: () => {
          return Principal.WindowsBuiltInRole;
        },
      },
      User: {
        kind: "field",
        type: () => {
          return Principal.WindowsBuiltInRole;
        },
      },
      Guest: {
        kind: "field",
        type: () => {
          return Principal.WindowsBuiltInRole;
        },
      },
      PowerUser: {
        kind: "field",
        type: () => {
          return Principal.WindowsBuiltInRole;
        },
      },
      AccountOperator: {
        kind: "field",
        type: () => {
          return Principal.WindowsBuiltInRole;
        },
      },
      SystemOperator: {
        kind: "field",
        type: () => {
          return Principal.WindowsBuiltInRole;
        },
      },
      PrintOperator: {
        kind: "field",
        type: () => {
          return Principal.WindowsBuiltInRole;
        },
      },
      BackupOperator: {
        kind: "field",
        type: () => {
          return Principal.WindowsBuiltInRole;
        },
      },
      Replicator: {
        kind: "field",
        type: () => {
          return Principal.WindowsBuiltInRole;
        },
      },
    },
  },
  WindowsIdentity: {
    kind: "class",
    members: {
      DefaultIssuer: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      WindowsIdentity: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAnonymous: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCurrent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RunImpersonated: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RunImpersonatedAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AccessToken: {
        kind: "property",
        type: () => {
          return SafeHandles.SafeAccessTokenHandle;
        },
      },
      AuthenticationType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
        isSealed: true,
      },
      Claims: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isOverride: true,
      },
      DeviceClaims: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      Groups: {
        kind: "property",
        type: () => {
          return Principal.IdentityReferenceCollection;
        },
        isNullable: true,
      },
      ImpersonationLevel: {
        kind: "property",
        type: () => {
          return Principal.TokenImpersonationLevel;
        },
      },
      IsAnonymous: {
        kind: "property",
        type: () => {
          return System.Boolean;
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
      IsGuest: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsSystem: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      Owner: {
        kind: "property",
        type: () => {
          return Principal.SecurityIdentifier;
        },
        isNullable: true,
      },
      Token: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
        isVirtual: true,
      },
      User: {
        kind: "property",
        type: () => {
          return Principal.SecurityIdentifier;
        },
        isNullable: true,
      },
      UserClaims: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
    },
  },
  WindowsPrincipal: {
    kind: "class",
    members: {
      WindowsPrincipal: {
        kind: "method",
        methodKind: "constructor",
      },
      IsInRole: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DeviceClaims: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      Identity: {
        kind: "property",
        type: () => {
          return Principal.IIdentity;
        },
        isOverride: true,
      },
      UserClaims: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
    },
  },
});
export default Principal
