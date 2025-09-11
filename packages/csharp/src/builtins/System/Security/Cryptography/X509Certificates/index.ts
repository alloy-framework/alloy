import SafeHandles from "../../../../Microsoft/Win32/SafeHandles/index.js";
import ObjectModel from "../../../Collections/ObjectModel/index.js";
import System from "../../../index.js";
import Cryptography from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type X509CertificatesLibrary = LibrarySymbolReference & {
  CertificateRequest: LibrarySymbolReference & {
    CertificateRequest: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    CreateSelfSigned: LibrarySymbolReference;
    CreateSigningRequest: LibrarySymbolReference;
    CreateSigningRequestPem: LibrarySymbolReference;
    LoadSigningRequest: LibrarySymbolReference;
    LoadSigningRequestPem: LibrarySymbolReference;
    CertificateExtensions: LibrarySymbolReference;
    HashAlgorithm: LibrarySymbolReference;
    OtherRequestAttributes: LibrarySymbolReference;
    PublicKey: LibrarySymbolReference;
    SubjectName: LibrarySymbolReference
  };
  CertificateRequestLoadOptions: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    SkipSignatureValidation: LibrarySymbolReference;
    UnsafeLoadCertificateExtensions: LibrarySymbolReference
  };
  CertificateRevocationListBuilder: LibrarySymbolReference & {
    CertificateRevocationListBuilder: LibrarySymbolReference;
    AddEntry: LibrarySymbolReference;
    Build: LibrarySymbolReference;
    BuildCrlDistributionPointExtension: LibrarySymbolReference;
    Load: LibrarySymbolReference;
    LoadPem: LibrarySymbolReference;
    RemoveEntry: LibrarySymbolReference
  };
  DSACertificateExtensions: LibrarySymbolReference & {
    CopyWithPrivateKey: LibrarySymbolReference;
    GetDSAPrivateKey: LibrarySymbolReference;
    GetDSAPublicKey: LibrarySymbolReference
  };
  ECDsaCertificateExtensions: LibrarySymbolReference & {
    CopyWithPrivateKey: LibrarySymbolReference;
    GetECDsaPrivateKey: LibrarySymbolReference;
    GetECDsaPublicKey: LibrarySymbolReference
  };
  OpenFlags: LibrarySymbolReference & {
    ReadOnly: LibrarySymbolReference;
    ReadWrite: LibrarySymbolReference;
    MaxAllowed: LibrarySymbolReference;
    OpenExistingOnly: LibrarySymbolReference;
    IncludeArchived: LibrarySymbolReference
  };
  Pkcs12LoadLimitExceededException: LibrarySymbolReference & {
    Pkcs12LoadLimitExceededException: LibrarySymbolReference
  };
  Pkcs12LoaderLimits: LibrarySymbolReference & {
    Pkcs12LoaderLimits: LibrarySymbolReference;
    MakeReadOnly: LibrarySymbolReference;
    DangerousNoLimits: LibrarySymbolReference;
    Defaults: LibrarySymbolReference;
    IgnoreEncryptedAuthSafes: LibrarySymbolReference;
    IgnorePrivateKeys: LibrarySymbolReference;
    IndividualKdfIterationLimit: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    MacIterationLimit: LibrarySymbolReference;
    MaxCertificates: LibrarySymbolReference;
    MaxKeys: LibrarySymbolReference;
    PreserveCertificateAlias: LibrarySymbolReference;
    PreserveKeyName: LibrarySymbolReference;
    PreserveStorageProvider: LibrarySymbolReference;
    PreserveUnknownAttributes: LibrarySymbolReference;
    TotalKdfIterationLimit: LibrarySymbolReference
  };
  PublicKey: LibrarySymbolReference & {
    PublicKey: LibrarySymbolReference;
    CreateFromSubjectPublicKeyInfo: LibrarySymbolReference;
    ExportSubjectPublicKeyInfo: LibrarySymbolReference;
    GetDSAPublicKey: LibrarySymbolReference;
    GetECDiffieHellmanPublicKey: LibrarySymbolReference;
    GetECDsaPublicKey: LibrarySymbolReference;
    GetRSAPublicKey: LibrarySymbolReference;
    TryExportSubjectPublicKeyInfo: LibrarySymbolReference;
    EncodedKeyValue: LibrarySymbolReference;
    EncodedParameters: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    Oid: LibrarySymbolReference
  };
  RSACertificateExtensions: LibrarySymbolReference & {
    CopyWithPrivateKey: LibrarySymbolReference;
    GetRSAPrivateKey: LibrarySymbolReference;
    GetRSAPublicKey: LibrarySymbolReference
  };
  StoreLocation: LibrarySymbolReference & {
    CurrentUser: LibrarySymbolReference;
    LocalMachine: LibrarySymbolReference
  };
  StoreName: LibrarySymbolReference & {
    AddressBook: LibrarySymbolReference;
    AuthRoot: LibrarySymbolReference;
    CertificateAuthority: LibrarySymbolReference;
    Disallowed: LibrarySymbolReference;
    My: LibrarySymbolReference;
    Root: LibrarySymbolReference;
    TrustedPeople: LibrarySymbolReference;
    TrustedPublisher: LibrarySymbolReference
  };
  SubjectAlternativeNameBuilder: LibrarySymbolReference & {
    SubjectAlternativeNameBuilder: LibrarySymbolReference;
    AddDnsName: LibrarySymbolReference;
    AddEmailAddress: LibrarySymbolReference;
    AddIpAddress: LibrarySymbolReference;
    AddUri: LibrarySymbolReference;
    AddUserPrincipalName: LibrarySymbolReference;
    Build: LibrarySymbolReference
  };
  X500DistinguishedName: LibrarySymbolReference & {
    X500DistinguishedName: LibrarySymbolReference;
    Decode: LibrarySymbolReference;
    EnumerateRelativeDistinguishedNames: LibrarySymbolReference;
    Format: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  X500DistinguishedNameBuilder: LibrarySymbolReference & {
    X500DistinguishedNameBuilder: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AddCommonName: LibrarySymbolReference;
    AddCountryOrRegion: LibrarySymbolReference;
    AddDomainComponent: LibrarySymbolReference;
    AddEmailAddress: LibrarySymbolReference;
    AddLocalityName: LibrarySymbolReference;
    AddOrganizationalUnitName: LibrarySymbolReference;
    AddOrganizationName: LibrarySymbolReference;
    AddStateOrProvinceName: LibrarySymbolReference;
    Build: LibrarySymbolReference
  };
  X500DistinguishedNameFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Reversed: LibrarySymbolReference;
    UseSemicolons: LibrarySymbolReference;
    DoNotUsePlusSign: LibrarySymbolReference;
    DoNotUseQuotes: LibrarySymbolReference;
    UseCommas: LibrarySymbolReference;
    UseNewLines: LibrarySymbolReference;
    UseUTF8Encoding: LibrarySymbolReference;
    UseT61Encoding: LibrarySymbolReference;
    ForceUTF8Encoding: LibrarySymbolReference
  };
  X500RelativeDistinguishedName: LibrarySymbolReference & {
    GetSingleElementType: LibrarySymbolReference;
    GetSingleElementValue: LibrarySymbolReference;
    HasMultipleElements: LibrarySymbolReference;
    RawData: LibrarySymbolReference
  };
  X509AuthorityInformationAccessExtension: LibrarySymbolReference & {
    X509AuthorityInformationAccessExtension: LibrarySymbolReference;
    CopyFrom: LibrarySymbolReference;
    EnumerateCAIssuersUris: LibrarySymbolReference;
    EnumerateOcspUris: LibrarySymbolReference;
    EnumerateUris: LibrarySymbolReference
  };
  X509AuthorityKeyIdentifierExtension: LibrarySymbolReference & {
    X509AuthorityKeyIdentifierExtension: LibrarySymbolReference;
    CopyFrom: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    CreateFromCertificate: LibrarySymbolReference;
    CreateFromIssuerNameAndSerialNumber: LibrarySymbolReference;
    CreateFromSubjectKeyIdentifier: LibrarySymbolReference;
    KeyIdentifier: LibrarySymbolReference;
    NamedIssuer: LibrarySymbolReference;
    RawIssuer: LibrarySymbolReference;
    SerialNumber: LibrarySymbolReference
  };
  X509BasicConstraintsExtension: LibrarySymbolReference & {
    X509BasicConstraintsExtension: LibrarySymbolReference;
    CopyFrom: LibrarySymbolReference;
    CreateForCertificateAuthority: LibrarySymbolReference;
    CreateForEndEntity: LibrarySymbolReference;
    CertificateAuthority: LibrarySymbolReference;
    HasPathLengthConstraint: LibrarySymbolReference;
    PathLengthConstraint: LibrarySymbolReference
  };
  X509Certificate: LibrarySymbolReference & {
    X509Certificate: LibrarySymbolReference;
    CreateFromCertFile: LibrarySymbolReference;
    CreateFromSignedFile: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    Export: LibrarySymbolReference;
    FormatDate: LibrarySymbolReference;
    GetCertHash: LibrarySymbolReference;
    GetCertHashString: LibrarySymbolReference;
    GetEffectiveDateString: LibrarySymbolReference;
    GetExpirationDateString: LibrarySymbolReference;
    GetFormat: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetIssuerName: LibrarySymbolReference;
    GetKeyAlgorithm: LibrarySymbolReference;
    GetKeyAlgorithmParameters: LibrarySymbolReference;
    GetKeyAlgorithmParametersString: LibrarySymbolReference;
    GetName: LibrarySymbolReference;
    GetPublicKey: LibrarySymbolReference;
    GetPublicKeyString: LibrarySymbolReference;
    GetRawCertData: LibrarySymbolReference;
    GetRawCertDataString: LibrarySymbolReference;
    GetSerialNumber: LibrarySymbolReference;
    GetSerialNumberString: LibrarySymbolReference;
    Import: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryGetCertHash: LibrarySymbolReference;
    Handle: LibrarySymbolReference;
    Issuer: LibrarySymbolReference;
    SerialNumberBytes: LibrarySymbolReference;
    Subject: LibrarySymbolReference
  };
  X509Certificate2: LibrarySymbolReference & {
    X509Certificate2: LibrarySymbolReference;
    CopyWithPrivateKey: LibrarySymbolReference;
    CreateFromEncryptedPem: LibrarySymbolReference;
    CreateFromEncryptedPemFile: LibrarySymbolReference;
    CreateFromPem: LibrarySymbolReference;
    CreateFromPemFile: LibrarySymbolReference;
    ExportCertificatePem: LibrarySymbolReference;
    GetCertContentType: LibrarySymbolReference;
    GetECDiffieHellmanPrivateKey: LibrarySymbolReference;
    GetECDiffieHellmanPublicKey: LibrarySymbolReference;
    GetNameInfo: LibrarySymbolReference;
    Import: LibrarySymbolReference;
    MatchesHostname: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryExportCertificatePem: LibrarySymbolReference;
    Verify: LibrarySymbolReference;
    Archived: LibrarySymbolReference;
    Extensions: LibrarySymbolReference;
    FriendlyName: LibrarySymbolReference;
    HasPrivateKey: LibrarySymbolReference;
    IssuerName: LibrarySymbolReference;
    NotAfter: LibrarySymbolReference;
    NotBefore: LibrarySymbolReference;
    PrivateKey: LibrarySymbolReference;
    PublicKey: LibrarySymbolReference;
    RawData: LibrarySymbolReference;
    RawDataMemory: LibrarySymbolReference;
    SerialNumber: LibrarySymbolReference;
    SignatureAlgorithm: LibrarySymbolReference;
    SubjectName: LibrarySymbolReference;
    Thumbprint: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  X509Certificate2Collection: LibrarySymbolReference & {
    X509Certificate2Collection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    Export: LibrarySymbolReference;
    ExportCertificatePems: LibrarySymbolReference;
    ExportPkcs7Pem: LibrarySymbolReference;
    Find: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Import: LibrarySymbolReference;
    ImportFromPem: LibrarySymbolReference;
    ImportFromPemFile: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveRange: LibrarySymbolReference;
    TryExportCertificatePems: LibrarySymbolReference;
    TryExportPkcs7Pem: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  X509Certificate2Enumerator: LibrarySymbolReference & {
    MoveNext: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Current: LibrarySymbolReference
  };
  X509CertificateCollection: LibrarySymbolReference & {
    X509CertificateEnumerator: LibrarySymbolReference & {
      X509CertificateEnumerator: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Reset: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  X509CertificateLoader: LibrarySymbolReference & {
    LoadCertificate: LibrarySymbolReference;
    LoadCertificateFromFile: LibrarySymbolReference;
    LoadPkcs12: LibrarySymbolReference;
    LoadPkcs12Collection: LibrarySymbolReference;
    LoadPkcs12CollectionFromFile: LibrarySymbolReference;
    LoadPkcs12FromFile: LibrarySymbolReference
  };
  X509Chain: LibrarySymbolReference & {
    X509Chain: LibrarySymbolReference;
    Build: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    ChainContext: LibrarySymbolReference;
    ChainElements: LibrarySymbolReference;
    ChainPolicy: LibrarySymbolReference;
    ChainStatus: LibrarySymbolReference;
    SafeHandle: LibrarySymbolReference
  };
  X509ChainElement: LibrarySymbolReference & {
    Certificate: LibrarySymbolReference;
    ChainElementStatus: LibrarySymbolReference;
    Information: LibrarySymbolReference
  };
  X509ChainElementCollection: LibrarySymbolReference & {
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  X509ChainElementEnumerator: LibrarySymbolReference & {
    MoveNext: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Current: LibrarySymbolReference
  };
  X509ChainPolicy: LibrarySymbolReference & {
    X509ChainPolicy: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    ApplicationPolicy: LibrarySymbolReference;
    CertificatePolicy: LibrarySymbolReference;
    CustomTrustStore: LibrarySymbolReference;
    DisableCertificateDownloads: LibrarySymbolReference;
    ExtraStore: LibrarySymbolReference;
    RevocationFlag: LibrarySymbolReference;
    RevocationMode: LibrarySymbolReference;
    TrustMode: LibrarySymbolReference;
    UrlRetrievalTimeout: LibrarySymbolReference;
    VerificationFlags: LibrarySymbolReference;
    VerificationTime: LibrarySymbolReference;
    VerificationTimeIgnored: LibrarySymbolReference
  };
  X509ChainStatus: LibrarySymbolReference & {
    Status: LibrarySymbolReference;
    StatusInformation: LibrarySymbolReference
  };
  X509ChainStatusFlags: LibrarySymbolReference & {
    NoError: LibrarySymbolReference;
    NotTimeValid: LibrarySymbolReference;
    NotTimeNested: LibrarySymbolReference;
    Revoked: LibrarySymbolReference;
    NotSignatureValid: LibrarySymbolReference;
    NotValidForUsage: LibrarySymbolReference;
    UntrustedRoot: LibrarySymbolReference;
    RevocationStatusUnknown: LibrarySymbolReference;
    Cyclic: LibrarySymbolReference;
    InvalidExtension: LibrarySymbolReference;
    InvalidPolicyConstraints: LibrarySymbolReference;
    InvalidBasicConstraints: LibrarySymbolReference;
    InvalidNameConstraints: LibrarySymbolReference;
    HasNotSupportedNameConstraint: LibrarySymbolReference;
    HasNotDefinedNameConstraint: LibrarySymbolReference;
    HasNotPermittedNameConstraint: LibrarySymbolReference;
    HasExcludedNameConstraint: LibrarySymbolReference;
    PartialChain: LibrarySymbolReference;
    CtlNotTimeValid: LibrarySymbolReference;
    CtlNotSignatureValid: LibrarySymbolReference;
    CtlNotValidForUsage: LibrarySymbolReference;
    HasWeakSignature: LibrarySymbolReference;
    OfflineRevocation: LibrarySymbolReference;
    NoIssuanceChainPolicy: LibrarySymbolReference;
    ExplicitDistrust: LibrarySymbolReference;
    HasNotSupportedCriticalExtension: LibrarySymbolReference
  };
  X509ChainTrustMode: LibrarySymbolReference & {
    System: LibrarySymbolReference;
    CustomRootTrust: LibrarySymbolReference
  };
  X509ContentType: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Cert: LibrarySymbolReference;
    SerializedCert: LibrarySymbolReference;
    Pfx: LibrarySymbolReference;
    Pkcs12: LibrarySymbolReference;
    SerializedStore: LibrarySymbolReference;
    Pkcs7: LibrarySymbolReference;
    Authenticode: LibrarySymbolReference
  };
  X509EnhancedKeyUsageExtension: LibrarySymbolReference & {
    X509EnhancedKeyUsageExtension: LibrarySymbolReference;
    CopyFrom: LibrarySymbolReference;
    EnhancedKeyUsages: LibrarySymbolReference
  };
  X509Extension: LibrarySymbolReference & {
    X509Extension: LibrarySymbolReference;
    CopyFrom: LibrarySymbolReference;
    Critical: LibrarySymbolReference
  };
  X509ExtensionCollection: LibrarySymbolReference & {
    X509ExtensionCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  X509ExtensionEnumerator: LibrarySymbolReference & {
    MoveNext: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Current: LibrarySymbolReference
  };
  X509FindType: LibrarySymbolReference & {
    FindByThumbprint: LibrarySymbolReference;
    FindBySubjectName: LibrarySymbolReference;
    FindBySubjectDistinguishedName: LibrarySymbolReference;
    FindByIssuerName: LibrarySymbolReference;
    FindByIssuerDistinguishedName: LibrarySymbolReference;
    FindBySerialNumber: LibrarySymbolReference;
    FindByTimeValid: LibrarySymbolReference;
    FindByTimeNotYetValid: LibrarySymbolReference;
    FindByTimeExpired: LibrarySymbolReference;
    FindByTemplateName: LibrarySymbolReference;
    FindByApplicationPolicy: LibrarySymbolReference;
    FindByCertificatePolicy: LibrarySymbolReference;
    FindByExtension: LibrarySymbolReference;
    FindByKeyUsage: LibrarySymbolReference;
    FindBySubjectKeyIdentifier: LibrarySymbolReference
  };
  X509IncludeOption: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    ExcludeRoot: LibrarySymbolReference;
    EndCertOnly: LibrarySymbolReference;
    WholeChain: LibrarySymbolReference
  };
  X509KeyStorageFlags: LibrarySymbolReference & {
    DefaultKeySet: LibrarySymbolReference;
    UserKeySet: LibrarySymbolReference;
    MachineKeySet: LibrarySymbolReference;
    Exportable: LibrarySymbolReference;
    UserProtected: LibrarySymbolReference;
    PersistKeySet: LibrarySymbolReference;
    EphemeralKeySet: LibrarySymbolReference
  };
  X509KeyUsageExtension: LibrarySymbolReference & {
    X509KeyUsageExtension: LibrarySymbolReference;
    CopyFrom: LibrarySymbolReference;
    KeyUsages: LibrarySymbolReference
  };
  X509KeyUsageFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    EncipherOnly: LibrarySymbolReference;
    CrlSign: LibrarySymbolReference;
    KeyCertSign: LibrarySymbolReference;
    KeyAgreement: LibrarySymbolReference;
    DataEncipherment: LibrarySymbolReference;
    KeyEncipherment: LibrarySymbolReference;
    NonRepudiation: LibrarySymbolReference;
    DigitalSignature: LibrarySymbolReference;
    DecipherOnly: LibrarySymbolReference
  };
  X509NameType: LibrarySymbolReference & {
    SimpleName: LibrarySymbolReference;
    EmailName: LibrarySymbolReference;
    UpnName: LibrarySymbolReference;
    DnsName: LibrarySymbolReference;
    DnsFromAlternativeName: LibrarySymbolReference;
    UrlName: LibrarySymbolReference
  };
  X509RevocationFlag: LibrarySymbolReference & {
    EndCertificateOnly: LibrarySymbolReference;
    EntireChain: LibrarySymbolReference;
    ExcludeRoot: LibrarySymbolReference
  };
  X509RevocationMode: LibrarySymbolReference & {
    NoCheck: LibrarySymbolReference;
    Online: LibrarySymbolReference;
    Offline: LibrarySymbolReference
  };
  X509RevocationReason: LibrarySymbolReference & {
    Unspecified: LibrarySymbolReference;
    KeyCompromise: LibrarySymbolReference;
    CACompromise: LibrarySymbolReference;
    AffiliationChanged: LibrarySymbolReference;
    Superseded: LibrarySymbolReference;
    CessationOfOperation: LibrarySymbolReference;
    CertificateHold: LibrarySymbolReference;
    RemoveFromCrl: LibrarySymbolReference;
    PrivilegeWithdrawn: LibrarySymbolReference;
    AACompromise: LibrarySymbolReference;
    WeakAlgorithmOrKey: LibrarySymbolReference
  };
  X509SignatureGenerator: LibrarySymbolReference & {
    X509SignatureGenerator: LibrarySymbolReference;
    BuildPublicKey: LibrarySymbolReference;
    CreateForECDsa: LibrarySymbolReference;
    CreateForRSA: LibrarySymbolReference;
    GetSignatureAlgorithmIdentifier: LibrarySymbolReference;
    SignData: LibrarySymbolReference;
    PublicKey: LibrarySymbolReference
  };
  X509Store: LibrarySymbolReference & {
    X509Store: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Open: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveRange: LibrarySymbolReference;
    Certificates: LibrarySymbolReference;
    IsOpen: LibrarySymbolReference;
    Location: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    StoreHandle: LibrarySymbolReference
  };
  X509SubjectAlternativeNameExtension: LibrarySymbolReference & {
    X509SubjectAlternativeNameExtension: LibrarySymbolReference;
    CopyFrom: LibrarySymbolReference;
    EnumerateDnsNames: LibrarySymbolReference;
    EnumerateIPAddresses: LibrarySymbolReference
  };
  X509SubjectKeyIdentifierExtension: LibrarySymbolReference & {
    X509SubjectKeyIdentifierExtension: LibrarySymbolReference;
    CopyFrom: LibrarySymbolReference;
    SubjectKeyIdentifier: LibrarySymbolReference;
    SubjectKeyIdentifierBytes: LibrarySymbolReference
  };
  X509SubjectKeyIdentifierHashAlgorithm: LibrarySymbolReference & {
    Sha1: LibrarySymbolReference;
    ShortSha1: LibrarySymbolReference;
    CapiSha1: LibrarySymbolReference;
    Sha256: LibrarySymbolReference;
    Sha384: LibrarySymbolReference;
    Sha512: LibrarySymbolReference;
    ShortSha256: LibrarySymbolReference;
    ShortSha384: LibrarySymbolReference;
    ShortSha512: LibrarySymbolReference
  };
  X509VerificationFlags: LibrarySymbolReference & {
    NoFlag: LibrarySymbolReference;
    IgnoreNotTimeValid: LibrarySymbolReference;
    IgnoreCtlNotTimeValid: LibrarySymbolReference;
    IgnoreNotTimeNested: LibrarySymbolReference;
    IgnoreInvalidBasicConstraints: LibrarySymbolReference;
    AllowUnknownCertificateAuthority: LibrarySymbolReference;
    IgnoreWrongUsage: LibrarySymbolReference;
    IgnoreInvalidName: LibrarySymbolReference;
    IgnoreInvalidPolicy: LibrarySymbolReference;
    IgnoreEndRevocationUnknown: LibrarySymbolReference;
    IgnoreCtlSignerRevocationUnknown: LibrarySymbolReference;
    IgnoreCertificateAuthorityRevocationUnknown: LibrarySymbolReference;
    IgnoreRootRevocationUnknown: LibrarySymbolReference;
    AllFlags: LibrarySymbolReference
  }
};
const X509Certificates: X509CertificatesLibrary = createLibrary("System.Security.Cryptography.X509Certificates", {
  CertificateRequest: {
    kind: "class",
    members: {
      CertificateRequest: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateSelfSigned: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateSigningRequest: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateSigningRequestPem: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadSigningRequest: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadSigningRequestPem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CertificateExtensions: {
        kind: "property",
        type: () => {
          return ObjectModel.Collection;
        },
      },
      HashAlgorithm: {
        kind: "property",
        type: () => {
          return Cryptography.HashAlgorithmName;
        },
      },
      OtherRequestAttributes: {
        kind: "property",
        type: () => {
          return ObjectModel.Collection;
        },
      },
      PublicKey: {
        kind: "property",
        type: () => {
          return X509Certificates.PublicKey;
        },
      },
      SubjectName: {
        kind: "property",
        type: () => {
          return X509Certificates.X500DistinguishedName;
        },
      },
    },
    isSealed: true,
  },
  CertificateRequestLoadOptions: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return X509Certificates.CertificateRequestLoadOptions;
        },
      },
      SkipSignatureValidation: {
        kind: "field",
        type: () => {
          return X509Certificates.CertificateRequestLoadOptions;
        },
      },
      UnsafeLoadCertificateExtensions: {
        kind: "field",
        type: () => {
          return X509Certificates.CertificateRequestLoadOptions;
        },
      },
    },
  },
  CertificateRevocationListBuilder: {
    kind: "class",
    members: {
      CertificateRevocationListBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddEntry: {
        kind: "method",
        methodKind: "ordinary",
      },
      Build: {
        kind: "method",
        methodKind: "ordinary",
      },
      BuildCrlDistributionPointExtension: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Load: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadPem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RemoveEntry: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  DSACertificateExtensions: {
    kind: "class",
    members: {
      CopyWithPrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDSAPrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDSAPublicKey: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  ECDsaCertificateExtensions: {
    kind: "class",
    members: {
      CopyWithPrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetECDsaPrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetECDsaPublicKey: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  OpenFlags: {
    kind: "enum",
    members: {
      ReadOnly: {
        kind: "field",
        type: () => {
          return X509Certificates.OpenFlags;
        },
      },
      ReadWrite: {
        kind: "field",
        type: () => {
          return X509Certificates.OpenFlags;
        },
      },
      MaxAllowed: {
        kind: "field",
        type: () => {
          return X509Certificates.OpenFlags;
        },
      },
      OpenExistingOnly: {
        kind: "field",
        type: () => {
          return X509Certificates.OpenFlags;
        },
      },
      IncludeArchived: {
        kind: "field",
        type: () => {
          return X509Certificates.OpenFlags;
        },
      },
    },
  },
  Pkcs12LoadLimitExceededException: {
    kind: "class",
    members: {
      Pkcs12LoadLimitExceededException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  Pkcs12LoaderLimits: {
    kind: "class",
    members: {
      Pkcs12LoaderLimits: {
        kind: "method",
        methodKind: "constructor",
      },
      MakeReadOnly: {
        kind: "method",
        methodKind: "ordinary",
      },
      DangerousNoLimits: {
        kind: "property",
        type: () => {
          return X509Certificates.Pkcs12LoaderLimits;
        },
        isStatic: true,
      },
      Defaults: {
        kind: "property",
        type: () => {
          return X509Certificates.Pkcs12LoaderLimits;
        },
        isStatic: true,
      },
      IgnoreEncryptedAuthSafes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IgnorePrivateKeys: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IndividualKdfIterationLimit: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isNullable: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MacIterationLimit: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isNullable: true,
      },
      MaxCertificates: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isNullable: true,
      },
      MaxKeys: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isNullable: true,
      },
      PreserveCertificateAlias: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PreserveKeyName: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PreserveStorageProvider: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PreserveUnknownAttributes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      TotalKdfIterationLimit: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  PublicKey: {
    kind: "class",
    members: {
      PublicKey: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateFromSubjectPublicKeyInfo: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ExportSubjectPublicKeyInfo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDSAPublicKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetECDiffieHellmanPublicKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetECDsaPublicKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetRSAPublicKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryExportSubjectPublicKeyInfo: {
        kind: "method",
        methodKind: "ordinary",
      },
      EncodedKeyValue: {
        kind: "property",
        type: () => {
          return Cryptography.AsnEncodedData;
        },
      },
      EncodedParameters: {
        kind: "property",
        type: () => {
          return Cryptography.AsnEncodedData;
        },
      },
      Key: {
        kind: "property",
        type: () => {
          return Cryptography.AsymmetricAlgorithm;
        },
      },
      Oid: {
        kind: "property",
        type: () => {
          return Cryptography.Oid;
        },
      },
    },
    isSealed: true,
  },
  RSACertificateExtensions: {
    kind: "class",
    members: {
      CopyWithPrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRSAPrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRSAPublicKey: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  StoreLocation: {
    kind: "enum",
    members: {
      CurrentUser: {
        kind: "field",
        type: () => {
          return X509Certificates.StoreLocation;
        },
      },
      LocalMachine: {
        kind: "field",
        type: () => {
          return X509Certificates.StoreLocation;
        },
      },
    },
  },
  StoreName: {
    kind: "enum",
    members: {
      AddressBook: {
        kind: "field",
        type: () => {
          return X509Certificates.StoreName;
        },
      },
      AuthRoot: {
        kind: "field",
        type: () => {
          return X509Certificates.StoreName;
        },
      },
      CertificateAuthority: {
        kind: "field",
        type: () => {
          return X509Certificates.StoreName;
        },
      },
      Disallowed: {
        kind: "field",
        type: () => {
          return X509Certificates.StoreName;
        },
      },
      My: {
        kind: "field",
        type: () => {
          return X509Certificates.StoreName;
        },
      },
      Root: {
        kind: "field",
        type: () => {
          return X509Certificates.StoreName;
        },
      },
      TrustedPeople: {
        kind: "field",
        type: () => {
          return X509Certificates.StoreName;
        },
      },
      TrustedPublisher: {
        kind: "field",
        type: () => {
          return X509Certificates.StoreName;
        },
      },
    },
  },
  SubjectAlternativeNameBuilder: {
    kind: "class",
    members: {
      SubjectAlternativeNameBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddDnsName: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddEmailAddress: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddIpAddress: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddUri: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddUserPrincipalName: {
        kind: "method",
        methodKind: "ordinary",
      },
      Build: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  X500DistinguishedName: {
    kind: "class",
    members: {
      X500DistinguishedName: {
        kind: "method",
        methodKind: "constructor",
      },
      Decode: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnumerateRelativeDistinguishedNames: {
        kind: "method",
        methodKind: "ordinary",
      },
      Format: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  X500DistinguishedNameBuilder: {
    kind: "class",
    members: {
      X500DistinguishedNameBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddCommonName: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddCountryOrRegion: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddDomainComponent: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddEmailAddress: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddLocalityName: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddOrganizationalUnitName: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddOrganizationName: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddStateOrProvinceName: {
        kind: "method",
        methodKind: "ordinary",
      },
      Build: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  X500DistinguishedNameFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return X509Certificates.X500DistinguishedNameFlags;
        },
      },
      Reversed: {
        kind: "field",
        type: () => {
          return X509Certificates.X500DistinguishedNameFlags;
        },
      },
      UseSemicolons: {
        kind: "field",
        type: () => {
          return X509Certificates.X500DistinguishedNameFlags;
        },
      },
      DoNotUsePlusSign: {
        kind: "field",
        type: () => {
          return X509Certificates.X500DistinguishedNameFlags;
        },
      },
      DoNotUseQuotes: {
        kind: "field",
        type: () => {
          return X509Certificates.X500DistinguishedNameFlags;
        },
      },
      UseCommas: {
        kind: "field",
        type: () => {
          return X509Certificates.X500DistinguishedNameFlags;
        },
      },
      UseNewLines: {
        kind: "field",
        type: () => {
          return X509Certificates.X500DistinguishedNameFlags;
        },
      },
      UseUTF8Encoding: {
        kind: "field",
        type: () => {
          return X509Certificates.X500DistinguishedNameFlags;
        },
      },
      UseT61Encoding: {
        kind: "field",
        type: () => {
          return X509Certificates.X500DistinguishedNameFlags;
        },
      },
      ForceUTF8Encoding: {
        kind: "field",
        type: () => {
          return X509Certificates.X500DistinguishedNameFlags;
        },
      },
    },
  },
  X500RelativeDistinguishedName: {
    kind: "class",
    members: {
      GetSingleElementType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSingleElementValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      HasMultipleElements: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      RawData: {
        kind: "property",
        type: () => {
          return System.ReadOnlyMemory;
        },
      },
    },
    isSealed: true,
  },
  X509AuthorityInformationAccessExtension: {
    kind: "class",
    members: {
      X509AuthorityInformationAccessExtension: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EnumerateCAIssuersUris: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnumerateOcspUris: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnumerateUris: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  X509AuthorityKeyIdentifierExtension: {
    kind: "class",
    members: {
      X509AuthorityKeyIdentifierExtension: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromCertificate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromIssuerNameAndSerialNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromSubjectKeyIdentifier: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      KeyIdentifier: {
        kind: "property",
        type: () => {
          return System.ReadOnlyMemory;
        },
        isNullable: true,
      },
      NamedIssuer: {
        kind: "property",
        type: () => {
          return X509Certificates.X500DistinguishedName;
        },
        isNullable: true,
      },
      RawIssuer: {
        kind: "property",
        type: () => {
          return System.ReadOnlyMemory;
        },
        isNullable: true,
      },
      SerialNumber: {
        kind: "property",
        type: () => {
          return System.ReadOnlyMemory;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  X509BasicConstraintsExtension: {
    kind: "class",
    members: {
      X509BasicConstraintsExtension: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateForCertificateAuthority: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateForEndEntity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CertificateAuthority: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      HasPathLengthConstraint: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PathLengthConstraint: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  X509Certificate: {
    kind: "class",
    members: {
      X509Certificate: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateFromCertFile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromSignedFile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Export: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      FormatDate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCertHash: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetCertHashString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEffectiveDateString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetExpirationDateString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetFormat: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetIssuerName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetKeyAlgorithm: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetKeyAlgorithmParameters: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetKeyAlgorithmParametersString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetPublicKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetPublicKeyString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetRawCertData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetRawCertDataString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSerialNumber: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSerialNumberString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Import: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryGetCertHash: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Handle: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      Issuer: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SerialNumberBytes: {
        kind: "property",
        type: () => {
          return System.ReadOnlyMemory;
        },
      },
      Subject: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  X509Certificate2: {
    kind: "class",
    members: {
      X509Certificate2: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyWithPrivateKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateFromEncryptedPem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromEncryptedPemFile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromPem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromPemFile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ExportCertificatePem: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCertContentType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetECDiffieHellmanPrivateKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetECDiffieHellmanPublicKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNameInfo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Import: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MatchesHostname: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryExportCertificatePem: {
        kind: "method",
        methodKind: "ordinary",
      },
      Verify: {
        kind: "method",
        methodKind: "ordinary",
      },
      Archived: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Extensions: {
        kind: "property",
        type: () => {
          return X509Certificates.X509ExtensionCollection;
        },
      },
      FriendlyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      HasPrivateKey: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IssuerName: {
        kind: "property",
        type: () => {
          return X509Certificates.X500DistinguishedName;
        },
      },
      NotAfter: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      NotBefore: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      PrivateKey: {
        kind: "property",
        type: () => {
          return Cryptography.AsymmetricAlgorithm;
        },
      },
      PublicKey: {
        kind: "property",
        type: () => {
          return X509Certificates.PublicKey;
        },
      },
      RawData: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      RawDataMemory: {
        kind: "property",
        type: () => {
          return System.ReadOnlyMemory;
        },
      },
      SerialNumber: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SignatureAlgorithm: {
        kind: "property",
        type: () => {
          return Cryptography.Oid;
        },
      },
      SubjectName: {
        kind: "property",
        type: () => {
          return X509Certificates.X500DistinguishedName;
        },
      },
      Thumbprint: {
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
  },
  X509Certificate2Collection: {
    kind: "class",
    members: {
      X509Certificate2Collection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      Export: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportCertificatePems: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportPkcs7Pem: {
        kind: "method",
        methodKind: "ordinary",
      },
      Find: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Import: {
        kind: "method",
        methodKind: "ordinary",
      },
      ImportFromPem: {
        kind: "method",
        methodKind: "ordinary",
      },
      ImportFromPemFile: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryExportCertificatePems: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryExportPkcs7Pem: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return X509Certificates.X509Certificate2;
        },
      },
    },
  },
  X509Certificate2Enumerator: {
    kind: "class",
    members: {
      MoveNext: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Current: {
        kind: "property",
        type: () => {
          return X509Certificates.X509Certificate2;
        },
      },
    },
    isSealed: true,
  },
  X509CertificateCollection: {
    kind: "class",
    members: {
      X509CertificateEnumerator: {
        kind: "class",
        members: {
          X509CertificateEnumerator: {
            kind: "method",
            methodKind: "constructor",
          },
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Reset: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return X509Certificates.X509Certificate;
            },
          },
        },
      },
    },
  },
  X509CertificateLoader: {
    kind: "class",
    members: {
      LoadCertificate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadCertificateFromFile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadPkcs12: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadPkcs12Collection: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadPkcs12CollectionFromFile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LoadPkcs12FromFile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  X509Chain: {
    kind: "class",
    members: {
      X509Chain: {
        kind: "method",
        methodKind: "constructor",
      },
      Build: {
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
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      ChainContext: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      ChainElements: {
        kind: "property",
        type: () => {
          return X509Certificates.X509ChainElementCollection;
        },
      },
      ChainPolicy: {
        kind: "property",
        type: () => {
          return X509Certificates.X509ChainPolicy;
        },
      },
      ChainStatus: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      SafeHandle: {
        kind: "property",
        type: () => {
          return SafeHandles.SafeX509ChainHandle;
        },
        isNullable: true,
      },
    },
  },
  X509ChainElement: {
    kind: "class",
    members: {
      Certificate: {
        kind: "property",
        type: () => {
          return X509Certificates.X509Certificate2;
        },
      },
      ChainElementStatus: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      Information: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  X509ChainElementCollection: {
    kind: "class",
    members: {
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
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
          return X509Certificates.X509ChainElement;
        },
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
    isSealed: true,
  },
  X509ChainElementEnumerator: {
    kind: "class",
    members: {
      MoveNext: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Current: {
        kind: "property",
        type: () => {
          return X509Certificates.X509ChainElement;
        },
      },
    },
    isSealed: true,
  },
  X509ChainPolicy: {
    kind: "class",
    members: {
      X509ChainPolicy: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      ApplicationPolicy: {
        kind: "property",
        type: () => {
          return Cryptography.OidCollection;
        },
      },
      CertificatePolicy: {
        kind: "property",
        type: () => {
          return Cryptography.OidCollection;
        },
      },
      CustomTrustStore: {
        kind: "property",
        type: () => {
          return X509Certificates.X509Certificate2Collection;
        },
      },
      DisableCertificateDownloads: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ExtraStore: {
        kind: "property",
        type: () => {
          return X509Certificates.X509Certificate2Collection;
        },
      },
      RevocationFlag: {
        kind: "property",
        type: () => {
          return X509Certificates.X509RevocationFlag;
        },
      },
      RevocationMode: {
        kind: "property",
        type: () => {
          return X509Certificates.X509RevocationMode;
        },
      },
      TrustMode: {
        kind: "property",
        type: () => {
          return X509Certificates.X509ChainTrustMode;
        },
      },
      UrlRetrievalTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      VerificationFlags: {
        kind: "property",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
      VerificationTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      VerificationTimeIgnored: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  X509ChainStatus: {
    kind: "struct",
    members: {
      Status: {
        kind: "property",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
        isReadOnly: true,
      },
      StatusInformation: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  X509ChainStatusFlags: {
    kind: "enum",
    members: {
      NoError: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      NotTimeValid: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      NotTimeNested: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      Revoked: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      NotSignatureValid: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      NotValidForUsage: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      UntrustedRoot: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      RevocationStatusUnknown: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      Cyclic: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      InvalidExtension: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      InvalidPolicyConstraints: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      InvalidBasicConstraints: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      InvalidNameConstraints: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      HasNotSupportedNameConstraint: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      HasNotDefinedNameConstraint: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      HasNotPermittedNameConstraint: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      HasExcludedNameConstraint: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      PartialChain: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      CtlNotTimeValid: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      CtlNotSignatureValid: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      CtlNotValidForUsage: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      HasWeakSignature: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      OfflineRevocation: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      NoIssuanceChainPolicy: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      ExplicitDistrust: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
      HasNotSupportedCriticalExtension: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainStatusFlags;
        },
      },
    },
  },
  X509ChainTrustMode: {
    kind: "enum",
    members: {
      System: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainTrustMode;
        },
      },
      CustomRootTrust: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ChainTrustMode;
        },
      },
    },
  },
  X509ContentType: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ContentType;
        },
      },
      Cert: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ContentType;
        },
      },
      SerializedCert: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ContentType;
        },
      },
      Pfx: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ContentType;
        },
      },
      Pkcs12: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ContentType;
        },
      },
      SerializedStore: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ContentType;
        },
      },
      Pkcs7: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ContentType;
        },
      },
      Authenticode: {
        kind: "field",
        type: () => {
          return X509Certificates.X509ContentType;
        },
      },
    },
  },
  X509EnhancedKeyUsageExtension: {
    kind: "class",
    members: {
      X509EnhancedKeyUsageExtension: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EnhancedKeyUsages: {
        kind: "property",
        type: () => {
          return Cryptography.OidCollection;
        },
      },
    },
    isSealed: true,
  },
  X509Extension: {
    kind: "class",
    members: {
      X509Extension: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Critical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  X509ExtensionCollection: {
    kind: "class",
    members: {
      X509ExtensionCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
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
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
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
          return X509Certificates.X509Extension;
        },
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
    isSealed: true,
  },
  X509ExtensionEnumerator: {
    kind: "class",
    members: {
      MoveNext: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Current: {
        kind: "property",
        type: () => {
          return X509Certificates.X509Extension;
        },
      },
    },
    isSealed: true,
  },
  X509FindType: {
    kind: "enum",
    members: {
      FindByThumbprint: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
      FindBySubjectName: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
      FindBySubjectDistinguishedName: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
      FindByIssuerName: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
      FindByIssuerDistinguishedName: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
      FindBySerialNumber: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
      FindByTimeValid: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
      FindByTimeNotYetValid: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
      FindByTimeExpired: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
      FindByTemplateName: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
      FindByApplicationPolicy: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
      FindByCertificatePolicy: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
      FindByExtension: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
      FindByKeyUsage: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
      FindBySubjectKeyIdentifier: {
        kind: "field",
        type: () => {
          return X509Certificates.X509FindType;
        },
      },
    },
  },
  X509IncludeOption: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return X509Certificates.X509IncludeOption;
        },
      },
      ExcludeRoot: {
        kind: "field",
        type: () => {
          return X509Certificates.X509IncludeOption;
        },
      },
      EndCertOnly: {
        kind: "field",
        type: () => {
          return X509Certificates.X509IncludeOption;
        },
      },
      WholeChain: {
        kind: "field",
        type: () => {
          return X509Certificates.X509IncludeOption;
        },
      },
    },
  },
  X509KeyStorageFlags: {
    kind: "enum",
    members: {
      DefaultKeySet: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyStorageFlags;
        },
      },
      UserKeySet: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyStorageFlags;
        },
      },
      MachineKeySet: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyStorageFlags;
        },
      },
      Exportable: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyStorageFlags;
        },
      },
      UserProtected: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyStorageFlags;
        },
      },
      PersistKeySet: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyStorageFlags;
        },
      },
      EphemeralKeySet: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyStorageFlags;
        },
      },
    },
  },
  X509KeyUsageExtension: {
    kind: "class",
    members: {
      X509KeyUsageExtension: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      KeyUsages: {
        kind: "property",
        type: () => {
          return X509Certificates.X509KeyUsageFlags;
        },
      },
    },
    isSealed: true,
  },
  X509KeyUsageFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyUsageFlags;
        },
      },
      EncipherOnly: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyUsageFlags;
        },
      },
      CrlSign: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyUsageFlags;
        },
      },
      KeyCertSign: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyUsageFlags;
        },
      },
      KeyAgreement: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyUsageFlags;
        },
      },
      DataEncipherment: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyUsageFlags;
        },
      },
      KeyEncipherment: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyUsageFlags;
        },
      },
      NonRepudiation: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyUsageFlags;
        },
      },
      DigitalSignature: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyUsageFlags;
        },
      },
      DecipherOnly: {
        kind: "field",
        type: () => {
          return X509Certificates.X509KeyUsageFlags;
        },
      },
    },
  },
  X509NameType: {
    kind: "enum",
    members: {
      SimpleName: {
        kind: "field",
        type: () => {
          return X509Certificates.X509NameType;
        },
      },
      EmailName: {
        kind: "field",
        type: () => {
          return X509Certificates.X509NameType;
        },
      },
      UpnName: {
        kind: "field",
        type: () => {
          return X509Certificates.X509NameType;
        },
      },
      DnsName: {
        kind: "field",
        type: () => {
          return X509Certificates.X509NameType;
        },
      },
      DnsFromAlternativeName: {
        kind: "field",
        type: () => {
          return X509Certificates.X509NameType;
        },
      },
      UrlName: {
        kind: "field",
        type: () => {
          return X509Certificates.X509NameType;
        },
      },
    },
  },
  X509RevocationFlag: {
    kind: "enum",
    members: {
      EndCertificateOnly: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationFlag;
        },
      },
      EntireChain: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationFlag;
        },
      },
      ExcludeRoot: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationFlag;
        },
      },
    },
  },
  X509RevocationMode: {
    kind: "enum",
    members: {
      NoCheck: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationMode;
        },
      },
      Online: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationMode;
        },
      },
      Offline: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationMode;
        },
      },
    },
  },
  X509RevocationReason: {
    kind: "enum",
    members: {
      Unspecified: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationReason;
        },
      },
      KeyCompromise: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationReason;
        },
      },
      CACompromise: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationReason;
        },
      },
      AffiliationChanged: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationReason;
        },
      },
      Superseded: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationReason;
        },
      },
      CessationOfOperation: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationReason;
        },
      },
      CertificateHold: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationReason;
        },
      },
      RemoveFromCrl: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationReason;
        },
      },
      PrivilegeWithdrawn: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationReason;
        },
      },
      AACompromise: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationReason;
        },
      },
      WeakAlgorithmOrKey: {
        kind: "field",
        type: () => {
          return X509Certificates.X509RevocationReason;
        },
      },
    },
  },
  X509SignatureGenerator: {
    kind: "class",
    members: {
      X509SignatureGenerator: {
        kind: "method",
        methodKind: "constructor",
      },
      BuildPublicKey: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CreateForECDsa: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateForRSA: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetSignatureAlgorithmIdentifier: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SignData: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      PublicKey: {
        kind: "property",
        type: () => {
          return X509Certificates.PublicKey;
        },
      },
    },
    isAbstract: true,
  },
  X509Store: {
    kind: "class",
    members: {
      X509Store: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Open: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      Certificates: {
        kind: "property",
        type: () => {
          return X509Certificates.X509Certificate2Collection;
        },
      },
      IsOpen: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Location: {
        kind: "property",
        type: () => {
          return X509Certificates.StoreLocation;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      StoreHandle: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
    },
    isSealed: true,
  },
  X509SubjectAlternativeNameExtension: {
    kind: "class",
    members: {
      X509SubjectAlternativeNameExtension: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EnumerateDnsNames: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnumerateIPAddresses: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  X509SubjectKeyIdentifierExtension: {
    kind: "class",
    members: {
      X509SubjectKeyIdentifierExtension: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SubjectKeyIdentifier: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SubjectKeyIdentifierBytes: {
        kind: "property",
        type: () => {
          return System.ReadOnlyMemory;
        },
      },
    },
    isSealed: true,
  },
  X509SubjectKeyIdentifierHashAlgorithm: {
    kind: "enum",
    members: {
      Sha1: {
        kind: "field",
        type: () => {
          return X509Certificates.X509SubjectKeyIdentifierHashAlgorithm;
        },
      },
      ShortSha1: {
        kind: "field",
        type: () => {
          return X509Certificates.X509SubjectKeyIdentifierHashAlgorithm;
        },
      },
      CapiSha1: {
        kind: "field",
        type: () => {
          return X509Certificates.X509SubjectKeyIdentifierHashAlgorithm;
        },
      },
      Sha256: {
        kind: "field",
        type: () => {
          return X509Certificates.X509SubjectKeyIdentifierHashAlgorithm;
        },
      },
      Sha384: {
        kind: "field",
        type: () => {
          return X509Certificates.X509SubjectKeyIdentifierHashAlgorithm;
        },
      },
      Sha512: {
        kind: "field",
        type: () => {
          return X509Certificates.X509SubjectKeyIdentifierHashAlgorithm;
        },
      },
      ShortSha256: {
        kind: "field",
        type: () => {
          return X509Certificates.X509SubjectKeyIdentifierHashAlgorithm;
        },
      },
      ShortSha384: {
        kind: "field",
        type: () => {
          return X509Certificates.X509SubjectKeyIdentifierHashAlgorithm;
        },
      },
      ShortSha512: {
        kind: "field",
        type: () => {
          return X509Certificates.X509SubjectKeyIdentifierHashAlgorithm;
        },
      },
    },
  },
  X509VerificationFlags: {
    kind: "enum",
    members: {
      NoFlag: {
        kind: "field",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
      IgnoreNotTimeValid: {
        kind: "field",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
      IgnoreCtlNotTimeValid: {
        kind: "field",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
      IgnoreNotTimeNested: {
        kind: "field",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
      IgnoreInvalidBasicConstraints: {
        kind: "field",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
      AllowUnknownCertificateAuthority: {
        kind: "field",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
      IgnoreWrongUsage: {
        kind: "field",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
      IgnoreInvalidName: {
        kind: "field",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
      IgnoreInvalidPolicy: {
        kind: "field",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
      IgnoreEndRevocationUnknown: {
        kind: "field",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
      IgnoreCtlSignerRevocationUnknown: {
        kind: "field",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
      IgnoreCertificateAuthorityRevocationUnknown: {
        kind: "field",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
      IgnoreRootRevocationUnknown: {
        kind: "field",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
      AllFlags: {
        kind: "field",
        type: () => {
          return X509Certificates.X509VerificationFlags;
        },
      },
    },
  },
});
export default X509Certificates
