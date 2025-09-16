import SafeHandles from "../../../Microsoft/Win32/SafeHandles/index.js";
import System from "../../index.js";
import Security from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as X509Certificates } from "./X509Certificates/index.js";

type CryptographyLibrary = LibrarySymbolReference & {
  Aes: LibrarySymbolReference & {
    Aes: LibrarySymbolReference;
    Create: LibrarySymbolReference
  };
  AesCcm: LibrarySymbolReference & {
    AesCcm: LibrarySymbolReference;
    Decrypt: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Encrypt: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference;
    NonceByteSizes: LibrarySymbolReference;
    TagByteSizes: LibrarySymbolReference
  };
  AesCng: LibrarySymbolReference & {
    AesCng: LibrarySymbolReference;
    CreateDecryptor: LibrarySymbolReference;
    CreateEncryptor: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GenerateIV: LibrarySymbolReference;
    GenerateKey: LibrarySymbolReference;
    TryDecryptCbcCore: LibrarySymbolReference;
    TryDecryptCfbCore: LibrarySymbolReference;
    TryDecryptEcbCore: LibrarySymbolReference;
    TryEncryptCbcCore: LibrarySymbolReference;
    TryEncryptCfbCore: LibrarySymbolReference;
    TryEncryptEcbCore: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    KeySize: LibrarySymbolReference
  };
  AesGcm: LibrarySymbolReference & {
    AesGcm: LibrarySymbolReference;
    Decrypt: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Encrypt: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference;
    NonceByteSizes: LibrarySymbolReference;
    TagByteSizes: LibrarySymbolReference;
    TagSizeInBytes: LibrarySymbolReference
  };
  AsnEncodedData: LibrarySymbolReference & {
    AsnEncodedData: LibrarySymbolReference;
    CopyFrom: LibrarySymbolReference;
    Format: LibrarySymbolReference;
    Oid: LibrarySymbolReference;
    RawData: LibrarySymbolReference
  };
  AsnEncodedDataCollection: LibrarySymbolReference & {
    AsnEncodedDataCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  AsnEncodedDataEnumerator: LibrarySymbolReference & {
    MoveNext: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Current: LibrarySymbolReference
  };
  AsymmetricAlgorithm: LibrarySymbolReference & {
    KeySizeValue: LibrarySymbolReference;
    LegalKeySizesValue: LibrarySymbolReference;
    AsymmetricAlgorithm: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    ExportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ExportEncryptedPkcs8PrivateKeyPem: LibrarySymbolReference;
    ExportPkcs8PrivateKey: LibrarySymbolReference;
    ExportPkcs8PrivateKeyPem: LibrarySymbolReference;
    ExportSubjectPublicKeyInfo: LibrarySymbolReference;
    ExportSubjectPublicKeyInfoPem: LibrarySymbolReference;
    FromXmlString: LibrarySymbolReference;
    ImportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ImportFromEncryptedPem: LibrarySymbolReference;
    ImportFromPem: LibrarySymbolReference;
    ImportPkcs8PrivateKey: LibrarySymbolReference;
    ImportSubjectPublicKeyInfo: LibrarySymbolReference;
    ToXmlString: LibrarySymbolReference;
    TryExportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    TryExportEncryptedPkcs8PrivateKeyPem: LibrarySymbolReference;
    TryExportPkcs8PrivateKey: LibrarySymbolReference;
    TryExportPkcs8PrivateKeyPem: LibrarySymbolReference;
    TryExportSubjectPublicKeyInfo: LibrarySymbolReference;
    TryExportSubjectPublicKeyInfoPem: LibrarySymbolReference;
    KeyExchangeAlgorithm: LibrarySymbolReference;
    KeySize: LibrarySymbolReference;
    LegalKeySizes: LibrarySymbolReference;
    SignatureAlgorithm: LibrarySymbolReference
  };
  AsymmetricKeyExchangeDeformatter: LibrarySymbolReference & {
    AsymmetricKeyExchangeDeformatter: LibrarySymbolReference;
    DecryptKeyExchange: LibrarySymbolReference;
    SetKey: LibrarySymbolReference;
    Parameters: LibrarySymbolReference
  };
  AsymmetricKeyExchangeFormatter: LibrarySymbolReference & {
    AsymmetricKeyExchangeFormatter: LibrarySymbolReference;
    CreateKeyExchange: LibrarySymbolReference;
    SetKey: LibrarySymbolReference;
    Parameters: LibrarySymbolReference
  };
  AsymmetricSignatureDeformatter: LibrarySymbolReference & {
    AsymmetricSignatureDeformatter: LibrarySymbolReference;
    SetHashAlgorithm: LibrarySymbolReference;
    SetKey: LibrarySymbolReference;
    VerifySignature: LibrarySymbolReference
  };
  AsymmetricSignatureFormatter: LibrarySymbolReference & {
    AsymmetricSignatureFormatter: LibrarySymbolReference;
    CreateSignature: LibrarySymbolReference;
    SetHashAlgorithm: LibrarySymbolReference;
    SetKey: LibrarySymbolReference
  };
  AuthenticationTagMismatchException: LibrarySymbolReference & {
    AuthenticationTagMismatchException: LibrarySymbolReference
  };
  ChaCha20Poly1305: LibrarySymbolReference & {
    ChaCha20Poly1305: LibrarySymbolReference;
    Decrypt: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Encrypt: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference
  };
  CipherMode: LibrarySymbolReference & {
    CBC: LibrarySymbolReference;
    ECB: LibrarySymbolReference;
    CFB: LibrarySymbolReference;
    CTS: LibrarySymbolReference
  };
  CngAlgorithm: LibrarySymbolReference & {
    CngAlgorithm: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Algorithm: LibrarySymbolReference;
    ECDiffieHellman: LibrarySymbolReference;
    ECDiffieHellmanP256: LibrarySymbolReference;
    ECDiffieHellmanP384: LibrarySymbolReference;
    ECDiffieHellmanP521: LibrarySymbolReference;
    ECDsa: LibrarySymbolReference;
    ECDsaP256: LibrarySymbolReference;
    ECDsaP384: LibrarySymbolReference;
    ECDsaP521: LibrarySymbolReference;
    MD5: LibrarySymbolReference;
    Rsa: LibrarySymbolReference;
    Sha1: LibrarySymbolReference;
    Sha256: LibrarySymbolReference;
    Sha384: LibrarySymbolReference;
    Sha512: LibrarySymbolReference
  };
  CngAlgorithmGroup: LibrarySymbolReference & {
    CngAlgorithmGroup: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    AlgorithmGroup: LibrarySymbolReference;
    DiffieHellman: LibrarySymbolReference;
    Dsa: LibrarySymbolReference;
    ECDiffieHellman: LibrarySymbolReference;
    ECDsa: LibrarySymbolReference;
    Rsa: LibrarySymbolReference
  };
  CngExportPolicies: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    AllowExport: LibrarySymbolReference;
    AllowPlaintextExport: LibrarySymbolReference;
    AllowArchiving: LibrarySymbolReference;
    AllowPlaintextArchiving: LibrarySymbolReference
  };
  CngKey: LibrarySymbolReference & {
    Create: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Exists: LibrarySymbolReference;
    Export: LibrarySymbolReference;
    GetProperty: LibrarySymbolReference;
    HasProperty: LibrarySymbolReference;
    Import: LibrarySymbolReference;
    Open: LibrarySymbolReference;
    SetProperty: LibrarySymbolReference;
    Algorithm: LibrarySymbolReference;
    AlgorithmGroup: LibrarySymbolReference;
    ExportPolicy: LibrarySymbolReference;
    Handle: LibrarySymbolReference;
    IsEphemeral: LibrarySymbolReference;
    IsMachineKey: LibrarySymbolReference;
    KeyName: LibrarySymbolReference;
    KeySize: LibrarySymbolReference;
    KeyUsage: LibrarySymbolReference;
    ParentWindowHandle: LibrarySymbolReference;
    Provider: LibrarySymbolReference;
    ProviderHandle: LibrarySymbolReference;
    UIPolicy: LibrarySymbolReference;
    UniqueName: LibrarySymbolReference
  };
  CngKeyBlobFormat: LibrarySymbolReference & {
    CngKeyBlobFormat: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    EccFullPrivateBlob: LibrarySymbolReference;
    EccFullPublicBlob: LibrarySymbolReference;
    EccPrivateBlob: LibrarySymbolReference;
    EccPublicBlob: LibrarySymbolReference;
    Format: LibrarySymbolReference;
    GenericPrivateBlob: LibrarySymbolReference;
    GenericPublicBlob: LibrarySymbolReference;
    OpaqueTransportBlob: LibrarySymbolReference;
    Pkcs8PrivateBlob: LibrarySymbolReference
  };
  CngKeyCreationOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    MachineKey: LibrarySymbolReference;
    OverwriteExistingKey: LibrarySymbolReference;
    PreferVbs: LibrarySymbolReference;
    RequireVbs: LibrarySymbolReference;
    UsePerBootKey: LibrarySymbolReference
  };
  CngKeyCreationParameters: LibrarySymbolReference & {
    CngKeyCreationParameters: LibrarySymbolReference;
    ExportPolicy: LibrarySymbolReference;
    KeyCreationOptions: LibrarySymbolReference;
    KeyUsage: LibrarySymbolReference;
    Parameters: LibrarySymbolReference;
    ParentWindowHandle: LibrarySymbolReference;
    Provider: LibrarySymbolReference;
    UIPolicy: LibrarySymbolReference
  };
  CngKeyHandleOpenOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    EphemeralKey: LibrarySymbolReference
  };
  CngKeyOpenOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    UserKey: LibrarySymbolReference;
    MachineKey: LibrarySymbolReference;
    Silent: LibrarySymbolReference
  };
  CngKeyUsages: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Decryption: LibrarySymbolReference;
    Signing: LibrarySymbolReference;
    KeyAgreement: LibrarySymbolReference;
    AllUsages: LibrarySymbolReference
  };
  CngProperty: LibrarySymbolReference & {
    CngProperty: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetValue: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Options: LibrarySymbolReference
  };
  CngPropertyCollection: LibrarySymbolReference & {
    CngPropertyCollection: LibrarySymbolReference
  };
  CngPropertyOptions: LibrarySymbolReference & {
    Persist: LibrarySymbolReference;
    None: LibrarySymbolReference;
    CustomProperty: LibrarySymbolReference
  };
  CngProvider: LibrarySymbolReference & {
    CngProvider: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    MicrosoftPlatformCryptoProvider: LibrarySymbolReference;
    MicrosoftSmartCardKeyStorageProvider: LibrarySymbolReference;
    MicrosoftSoftwareKeyStorageProvider: LibrarySymbolReference;
    Provider: LibrarySymbolReference
  };
  CngUIPolicy: LibrarySymbolReference & {
    CngUIPolicy: LibrarySymbolReference;
    CreationTitle: LibrarySymbolReference;
    Description: LibrarySymbolReference;
    FriendlyName: LibrarySymbolReference;
    ProtectionLevel: LibrarySymbolReference;
    UseContext: LibrarySymbolReference
  };
  CngUIProtectionLevels: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    ProtectKey: LibrarySymbolReference;
    ForceHighProtection: LibrarySymbolReference
  };
  CryptoConfig: LibrarySymbolReference & {
    CryptoConfig: LibrarySymbolReference;
    AddAlgorithm: LibrarySymbolReference;
    AddOID: LibrarySymbolReference;
    CreateFromName: LibrarySymbolReference;
    EncodeOID: LibrarySymbolReference;
    MapNameToOID: LibrarySymbolReference;
    AllowOnlyFipsAlgorithms: LibrarySymbolReference
  };
  CryptoStream: LibrarySymbolReference & {
    CryptoStream: LibrarySymbolReference;
    BeginRead: LibrarySymbolReference;
    BeginWrite: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    CopyToAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    EndRead: LibrarySymbolReference;
    EndWrite: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    FlushFinalBlock: LibrarySymbolReference;
    FlushFinalBlockAsync: LibrarySymbolReference;
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
    CanWrite: LibrarySymbolReference;
    HasFlushedFinalBlock: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Position: LibrarySymbolReference
  };
  CryptoStreamMode: LibrarySymbolReference & {
    Read: LibrarySymbolReference;
    Write: LibrarySymbolReference
  };
  CryptographicException: LibrarySymbolReference & {
    CryptographicException: LibrarySymbolReference
  };
  CryptographicOperations: LibrarySymbolReference & {
    FixedTimeEquals: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    HmacData: LibrarySymbolReference;
    HmacDataAsync: LibrarySymbolReference;
    TryHashData: LibrarySymbolReference;
    TryHmacData: LibrarySymbolReference;
    ZeroMemory: LibrarySymbolReference
  };
  CryptographicUnexpectedOperationException: LibrarySymbolReference & {
    CryptographicUnexpectedOperationException: LibrarySymbolReference
  };
  CspKeyContainerInfo: LibrarySymbolReference & {
    CspKeyContainerInfo: LibrarySymbolReference;
    Accessible: LibrarySymbolReference;
    Exportable: LibrarySymbolReference;
    HardwareDevice: LibrarySymbolReference;
    KeyContainerName: LibrarySymbolReference;
    KeyNumber: LibrarySymbolReference;
    MachineKeyStore: LibrarySymbolReference;
    Protected: LibrarySymbolReference;
    ProviderName: LibrarySymbolReference;
    ProviderType: LibrarySymbolReference;
    RandomlyGenerated: LibrarySymbolReference;
    Removable: LibrarySymbolReference;
    UniqueKeyContainerName: LibrarySymbolReference
  };
  CspParameters: LibrarySymbolReference & {
    KeyContainerName: LibrarySymbolReference;
    KeyNumber: LibrarySymbolReference;
    ProviderName: LibrarySymbolReference;
    ProviderType: LibrarySymbolReference;
    CspParameters: LibrarySymbolReference;
    Flags: LibrarySymbolReference;
    KeyPassword: LibrarySymbolReference;
    ParentWindowHandle: LibrarySymbolReference
  };
  CspProviderFlags: LibrarySymbolReference & {
    NoFlags: LibrarySymbolReference;
    UseMachineKeyStore: LibrarySymbolReference;
    UseDefaultKeyContainer: LibrarySymbolReference;
    UseNonExportableKey: LibrarySymbolReference;
    UseExistingKey: LibrarySymbolReference;
    UseArchivableKey: LibrarySymbolReference;
    UseUserProtectedKey: LibrarySymbolReference;
    NoPrompt: LibrarySymbolReference;
    CreateEphemeralKey: LibrarySymbolReference
  };
  DSA: LibrarySymbolReference & {
    DSA: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    CreateSignature: LibrarySymbolReference;
    CreateSignatureCore: LibrarySymbolReference;
    ExportParameters: LibrarySymbolReference;
    FromXmlString: LibrarySymbolReference;
    GetMaxSignatureSize: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    ImportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ImportFromEncryptedPem: LibrarySymbolReference;
    ImportFromPem: LibrarySymbolReference;
    ImportParameters: LibrarySymbolReference;
    ImportPkcs8PrivateKey: LibrarySymbolReference;
    ImportSubjectPublicKeyInfo: LibrarySymbolReference;
    SignData: LibrarySymbolReference;
    SignDataCore: LibrarySymbolReference;
    ToXmlString: LibrarySymbolReference;
    TryCreateSignature: LibrarySymbolReference;
    TryCreateSignatureCore: LibrarySymbolReference;
    TryExportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    TryExportPkcs8PrivateKey: LibrarySymbolReference;
    TryExportSubjectPublicKeyInfo: LibrarySymbolReference;
    TryHashData: LibrarySymbolReference;
    TrySignData: LibrarySymbolReference;
    TrySignDataCore: LibrarySymbolReference;
    VerifyData: LibrarySymbolReference;
    VerifyDataCore: LibrarySymbolReference;
    VerifySignature: LibrarySymbolReference;
    VerifySignatureCore: LibrarySymbolReference
  };
  DSACng: LibrarySymbolReference & {
    DSACng: LibrarySymbolReference;
    CreateSignature: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    ExportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ExportParameters: LibrarySymbolReference;
    ImportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ImportParameters: LibrarySymbolReference;
    TryCreateSignatureCore: LibrarySymbolReference;
    TryExportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    TryExportPkcs8PrivateKey: LibrarySymbolReference;
    VerifySignature: LibrarySymbolReference;
    VerifySignatureCore: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    KeyExchangeAlgorithm: LibrarySymbolReference;
    LegalKeySizes: LibrarySymbolReference;
    SignatureAlgorithm: LibrarySymbolReference
  };
  DSACryptoServiceProvider: LibrarySymbolReference & {
    DSACryptoServiceProvider: LibrarySymbolReference;
    CreateSignature: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    ExportCspBlob: LibrarySymbolReference;
    ExportParameters: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    ImportCspBlob: LibrarySymbolReference;
    ImportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ImportParameters: LibrarySymbolReference;
    SignData: LibrarySymbolReference;
    SignHash: LibrarySymbolReference;
    VerifyData: LibrarySymbolReference;
    VerifyHash: LibrarySymbolReference;
    VerifySignature: LibrarySymbolReference;
    CspKeyContainerInfo: LibrarySymbolReference;
    KeyExchangeAlgorithm: LibrarySymbolReference;
    KeySize: LibrarySymbolReference;
    LegalKeySizes: LibrarySymbolReference;
    PersistKeyInCsp: LibrarySymbolReference;
    PublicOnly: LibrarySymbolReference;
    SignatureAlgorithm: LibrarySymbolReference;
    UseMachineKeyStore: LibrarySymbolReference
  };
  DSAOpenSsl: LibrarySymbolReference & {
    DSAOpenSsl: LibrarySymbolReference;
    CreateSignature: LibrarySymbolReference;
    DuplicateKeyHandle: LibrarySymbolReference;
    ExportParameters: LibrarySymbolReference;
    ImportParameters: LibrarySymbolReference;
    VerifySignature: LibrarySymbolReference
  };
  DSAParameters: LibrarySymbolReference & {
    Counter: LibrarySymbolReference;
    G: LibrarySymbolReference;
    J: LibrarySymbolReference;
    P: LibrarySymbolReference;
    Q: LibrarySymbolReference;
    Seed: LibrarySymbolReference;
    X: LibrarySymbolReference;
    Y: LibrarySymbolReference
  };
  DSASignatureDeformatter: LibrarySymbolReference & {
    DSASignatureDeformatter: LibrarySymbolReference;
    SetHashAlgorithm: LibrarySymbolReference;
    SetKey: LibrarySymbolReference;
    VerifySignature: LibrarySymbolReference
  };
  DSASignatureFormat: LibrarySymbolReference & {
    IeeeP1363FixedFieldConcatenation: LibrarySymbolReference;
    Rfc3279DerSequence: LibrarySymbolReference
  };
  DSASignatureFormatter: LibrarySymbolReference & {
    DSASignatureFormatter: LibrarySymbolReference;
    CreateSignature: LibrarySymbolReference;
    SetHashAlgorithm: LibrarySymbolReference;
    SetKey: LibrarySymbolReference
  };
  DeriveBytes: LibrarySymbolReference & {
    DeriveBytes: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetBytes: LibrarySymbolReference;
    Reset: LibrarySymbolReference
  };
  ECAlgorithm: LibrarySymbolReference & {
    ECAlgorithm: LibrarySymbolReference;
    ExportECPrivateKey: LibrarySymbolReference;
    ExportECPrivateKeyPem: LibrarySymbolReference;
    ExportExplicitParameters: LibrarySymbolReference;
    ExportParameters: LibrarySymbolReference;
    GenerateKey: LibrarySymbolReference;
    ImportECPrivateKey: LibrarySymbolReference;
    ImportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ImportFromEncryptedPem: LibrarySymbolReference;
    ImportFromPem: LibrarySymbolReference;
    ImportParameters: LibrarySymbolReference;
    ImportPkcs8PrivateKey: LibrarySymbolReference;
    ImportSubjectPublicKeyInfo: LibrarySymbolReference;
    TryExportECPrivateKey: LibrarySymbolReference;
    TryExportECPrivateKeyPem: LibrarySymbolReference;
    TryExportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    TryExportPkcs8PrivateKey: LibrarySymbolReference;
    TryExportSubjectPublicKeyInfo: LibrarySymbolReference
  };
  ECCurve: LibrarySymbolReference & {
    ECCurveType: LibrarySymbolReference & {
      Implicit: LibrarySymbolReference;
      PrimeShortWeierstrass: LibrarySymbolReference;
      PrimeTwistedEdwards: LibrarySymbolReference;
      PrimeMontgomery: LibrarySymbolReference;
      Characteristic2: LibrarySymbolReference;
      Named: LibrarySymbolReference
    };
    NamedCurves: LibrarySymbolReference & {
      brainpoolP160r1: LibrarySymbolReference;
      brainpoolP160t1: LibrarySymbolReference;
      brainpoolP192r1: LibrarySymbolReference;
      brainpoolP192t1: LibrarySymbolReference;
      brainpoolP224r1: LibrarySymbolReference;
      brainpoolP224t1: LibrarySymbolReference;
      brainpoolP256r1: LibrarySymbolReference;
      brainpoolP256t1: LibrarySymbolReference;
      brainpoolP320r1: LibrarySymbolReference;
      brainpoolP320t1: LibrarySymbolReference;
      brainpoolP384r1: LibrarySymbolReference;
      brainpoolP384t1: LibrarySymbolReference;
      brainpoolP512r1: LibrarySymbolReference;
      brainpoolP512t1: LibrarySymbolReference;
      nistP256: LibrarySymbolReference;
      nistP384: LibrarySymbolReference;
      nistP521: LibrarySymbolReference
    }
  };
  ECDiffieHellman: LibrarySymbolReference & {
    ECDiffieHellman: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    DeriveKeyFromHash: LibrarySymbolReference;
    DeriveKeyFromHmac: LibrarySymbolReference;
    DeriveKeyMaterial: LibrarySymbolReference;
    DeriveKeyTls: LibrarySymbolReference;
    DeriveRawSecretAgreement: LibrarySymbolReference;
    FromXmlString: LibrarySymbolReference;
    ToXmlString: LibrarySymbolReference;
    KeyExchangeAlgorithm: LibrarySymbolReference;
    PublicKey: LibrarySymbolReference;
    SignatureAlgorithm: LibrarySymbolReference
  };
  ECDiffieHellmanCng: LibrarySymbolReference & {
    ECDiffieHellmanCng: LibrarySymbolReference;
    DeriveKeyFromHash: LibrarySymbolReference;
    DeriveKeyFromHmac: LibrarySymbolReference;
    DeriveKeyMaterial: LibrarySymbolReference;
    DeriveKeyTls: LibrarySymbolReference;
    DeriveSecretAgreementHandle: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    ExportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ExportExplicitParameters: LibrarySymbolReference;
    ExportParameters: LibrarySymbolReference;
    FromXmlString: LibrarySymbolReference;
    GenerateKey: LibrarySymbolReference;
    ImportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ImportParameters: LibrarySymbolReference;
    ImportPkcs8PrivateKey: LibrarySymbolReference;
    ToXmlString: LibrarySymbolReference;
    TryExportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    TryExportPkcs8PrivateKey: LibrarySymbolReference;
    HashAlgorithm: LibrarySymbolReference;
    HmacKey: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    KeyDerivationFunction: LibrarySymbolReference;
    KeySize: LibrarySymbolReference;
    Label: LibrarySymbolReference;
    LegalKeySizes: LibrarySymbolReference;
    PublicKey: LibrarySymbolReference;
    SecretAppend: LibrarySymbolReference;
    SecretPrepend: LibrarySymbolReference;
    Seed: LibrarySymbolReference;
    UseSecretAgreementAsHmacKey: LibrarySymbolReference
  };
  ECDiffieHellmanCngPublicKey: LibrarySymbolReference & {
    Dispose: LibrarySymbolReference;
    ExportExplicitParameters: LibrarySymbolReference;
    ExportParameters: LibrarySymbolReference;
    FromByteArray: LibrarySymbolReference;
    FromXmlString: LibrarySymbolReference;
    Import: LibrarySymbolReference;
    ToXmlString: LibrarySymbolReference;
    BlobFormat: LibrarySymbolReference
  };
  ECDiffieHellmanKeyDerivationFunction: LibrarySymbolReference & {
    Hash: LibrarySymbolReference;
    Hmac: LibrarySymbolReference;
    Tls: LibrarySymbolReference
  };
  ECDiffieHellmanOpenSsl: LibrarySymbolReference & {
    ECDiffieHellmanOpenSsl: LibrarySymbolReference;
    DuplicateKeyHandle: LibrarySymbolReference;
    ExportParameters: LibrarySymbolReference;
    ImportParameters: LibrarySymbolReference;
    PublicKey: LibrarySymbolReference
  };
  ECDiffieHellmanPublicKey: LibrarySymbolReference & {
    ECDiffieHellmanPublicKey: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    ExportExplicitParameters: LibrarySymbolReference;
    ExportParameters: LibrarySymbolReference;
    ExportSubjectPublicKeyInfo: LibrarySymbolReference;
    ToByteArray: LibrarySymbolReference;
    ToXmlString: LibrarySymbolReference;
    TryExportSubjectPublicKeyInfo: LibrarySymbolReference
  };
  ECDsa: LibrarySymbolReference & {
    ECDsa: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    FromXmlString: LibrarySymbolReference;
    GetMaxSignatureSize: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    SignData: LibrarySymbolReference;
    SignDataCore: LibrarySymbolReference;
    SignHash: LibrarySymbolReference;
    SignHashCore: LibrarySymbolReference;
    ToXmlString: LibrarySymbolReference;
    TryHashData: LibrarySymbolReference;
    TrySignData: LibrarySymbolReference;
    TrySignDataCore: LibrarySymbolReference;
    TrySignHash: LibrarySymbolReference;
    TrySignHashCore: LibrarySymbolReference;
    VerifyData: LibrarySymbolReference;
    VerifyDataCore: LibrarySymbolReference;
    VerifyHash: LibrarySymbolReference;
    VerifyHashCore: LibrarySymbolReference;
    KeyExchangeAlgorithm: LibrarySymbolReference;
    SignatureAlgorithm: LibrarySymbolReference
  };
  ECDsaCng: LibrarySymbolReference & {
    ECDsaCng: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    ExportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ExportExplicitParameters: LibrarySymbolReference;
    ExportParameters: LibrarySymbolReference;
    FromXmlString: LibrarySymbolReference;
    GenerateKey: LibrarySymbolReference;
    ImportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ImportParameters: LibrarySymbolReference;
    ImportPkcs8PrivateKey: LibrarySymbolReference;
    SignData: LibrarySymbolReference;
    SignHash: LibrarySymbolReference;
    ToXmlString: LibrarySymbolReference;
    TryExportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    TryExportPkcs8PrivateKey: LibrarySymbolReference;
    TrySignHash: LibrarySymbolReference;
    TrySignHashCore: LibrarySymbolReference;
    VerifyData: LibrarySymbolReference;
    VerifyHash: LibrarySymbolReference;
    VerifyHashCore: LibrarySymbolReference;
    HashAlgorithm: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    KeySize: LibrarySymbolReference;
    LegalKeySizes: LibrarySymbolReference
  };
  ECDsaOpenSsl: LibrarySymbolReference & {
    ECDsaOpenSsl: LibrarySymbolReference;
    DuplicateKeyHandle: LibrarySymbolReference;
    SignHash: LibrarySymbolReference;
    VerifyHash: LibrarySymbolReference
  };
  ECKeyXmlFormat: LibrarySymbolReference & {
    Rfc4050: LibrarySymbolReference
  };
  ECParameters: LibrarySymbolReference & {
    Curve: LibrarySymbolReference;
    D: LibrarySymbolReference;
    Q: LibrarySymbolReference;
    Validate: LibrarySymbolReference
  };
  ECPoint: LibrarySymbolReference & {
    X: LibrarySymbolReference;
    Y: LibrarySymbolReference
  };
  FromBase64Transform: LibrarySymbolReference & {
    FromBase64Transform: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    TransformBlock: LibrarySymbolReference;
    TransformFinalBlock: LibrarySymbolReference;
    CanReuseTransform: LibrarySymbolReference;
    CanTransformMultipleBlocks: LibrarySymbolReference;
    InputBlockSize: LibrarySymbolReference;
    OutputBlockSize: LibrarySymbolReference
  };
  FromBase64TransformMode: LibrarySymbolReference & {
    IgnoreWhiteSpaces: LibrarySymbolReference;
    DoNotIgnoreWhiteSpaces: LibrarySymbolReference
  };
  HKDF: LibrarySymbolReference & {
    DeriveKey: LibrarySymbolReference;
    Expand: LibrarySymbolReference;
    Extract: LibrarySymbolReference
  };
  HMAC: LibrarySymbolReference & {
    HMAC: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    HashCore: LibrarySymbolReference;
    HashFinal: LibrarySymbolReference;
    Initialize: LibrarySymbolReference;
    TryHashFinal: LibrarySymbolReference;
    BlockSizeValue: LibrarySymbolReference;
    HashName: LibrarySymbolReference;
    Key: LibrarySymbolReference
  };
  HMACMD5: LibrarySymbolReference & {
    HashSizeInBits: LibrarySymbolReference;
    HashSizeInBytes: LibrarySymbolReference;
    HMACMD5: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    HashCore: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    HashFinal: LibrarySymbolReference;
    Initialize: LibrarySymbolReference;
    TryHashData: LibrarySymbolReference;
    TryHashFinal: LibrarySymbolReference;
    Key: LibrarySymbolReference
  };
  HMACSHA1: LibrarySymbolReference & {
    HashSizeInBits: LibrarySymbolReference;
    HashSizeInBytes: LibrarySymbolReference;
    HMACSHA1: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    HashCore: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    HashFinal: LibrarySymbolReference;
    Initialize: LibrarySymbolReference;
    TryHashData: LibrarySymbolReference;
    TryHashFinal: LibrarySymbolReference;
    Key: LibrarySymbolReference
  };
  HMACSHA256: LibrarySymbolReference & {
    HashSizeInBits: LibrarySymbolReference;
    HashSizeInBytes: LibrarySymbolReference;
    HMACSHA256: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    HashCore: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    HashFinal: LibrarySymbolReference;
    Initialize: LibrarySymbolReference;
    TryHashData: LibrarySymbolReference;
    TryHashFinal: LibrarySymbolReference;
    Key: LibrarySymbolReference
  };
  HMACSHA384: LibrarySymbolReference & {
    HashSizeInBits: LibrarySymbolReference;
    HashSizeInBytes: LibrarySymbolReference;
    HMACSHA384: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    HashCore: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    HashFinal: LibrarySymbolReference;
    Initialize: LibrarySymbolReference;
    TryHashData: LibrarySymbolReference;
    TryHashFinal: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    ProduceLegacyHmacValues: LibrarySymbolReference
  };
  HMACSHA512: LibrarySymbolReference & {
    HashSizeInBits: LibrarySymbolReference;
    HashSizeInBytes: LibrarySymbolReference;
    HMACSHA512: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    HashCore: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    HashFinal: LibrarySymbolReference;
    Initialize: LibrarySymbolReference;
    TryHashData: LibrarySymbolReference;
    TryHashFinal: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    ProduceLegacyHmacValues: LibrarySymbolReference
  };
  HashAlgorithm: LibrarySymbolReference & {
    HashSizeValue: LibrarySymbolReference;
    HashValue: LibrarySymbolReference;
    State: LibrarySymbolReference;
    HashAlgorithm: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    ComputeHash: LibrarySymbolReference;
    ComputeHashAsync: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    HashCore: LibrarySymbolReference;
    HashFinal: LibrarySymbolReference;
    Initialize: LibrarySymbolReference;
    TransformBlock: LibrarySymbolReference;
    TransformFinalBlock: LibrarySymbolReference;
    TryComputeHash: LibrarySymbolReference;
    TryHashFinal: LibrarySymbolReference;
    CanReuseTransform: LibrarySymbolReference;
    CanTransformMultipleBlocks: LibrarySymbolReference;
    Hash: LibrarySymbolReference;
    HashSize: LibrarySymbolReference;
    InputBlockSize: LibrarySymbolReference;
    OutputBlockSize: LibrarySymbolReference
  };
  HashAlgorithmName: LibrarySymbolReference & {
    HashAlgorithmName: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    FromOid: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryFromOid: LibrarySymbolReference;
    MD5: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    SHA1: LibrarySymbolReference;
    SHA256: LibrarySymbolReference;
    SHA384: LibrarySymbolReference;
    SHA512: LibrarySymbolReference
  };
  ICryptoTransform: LibrarySymbolReference & {
    TransformBlock: LibrarySymbolReference;
    TransformFinalBlock: LibrarySymbolReference;
    CanReuseTransform: LibrarySymbolReference;
    CanTransformMultipleBlocks: LibrarySymbolReference;
    InputBlockSize: LibrarySymbolReference;
    OutputBlockSize: LibrarySymbolReference
  };
  ICspAsymmetricAlgorithm: LibrarySymbolReference & {
    ExportCspBlob: LibrarySymbolReference;
    ImportCspBlob: LibrarySymbolReference;
    CspKeyContainerInfo: LibrarySymbolReference
  };
  IncrementalHash: LibrarySymbolReference & {
    AppendData: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    CreateHash: LibrarySymbolReference;
    CreateHMAC: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetCurrentHash: LibrarySymbolReference;
    GetHashAndReset: LibrarySymbolReference;
    TryGetCurrentHash: LibrarySymbolReference;
    TryGetHashAndReset: LibrarySymbolReference;
    AlgorithmName: LibrarySymbolReference;
    HashLengthInBytes: LibrarySymbolReference
  };
  KeyNumber: LibrarySymbolReference & {
    Exchange: LibrarySymbolReference;
    Signature: LibrarySymbolReference
  };
  KeySizes: LibrarySymbolReference & {
    KeySizes: LibrarySymbolReference;
    MaxSize: LibrarySymbolReference;
    MinSize: LibrarySymbolReference;
    SkipSize: LibrarySymbolReference
  };
  KeyedHashAlgorithm: LibrarySymbolReference & {
    KeyValue: LibrarySymbolReference;
    KeyedHashAlgorithm: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Key: LibrarySymbolReference
  };
  Kmac128: LibrarySymbolReference & {
    Kmac128: LibrarySymbolReference;
    AppendData: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetCurrentHash: LibrarySymbolReference;
    GetHashAndReset: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference
  };
  Kmac256: LibrarySymbolReference & {
    Kmac256: LibrarySymbolReference;
    AppendData: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetCurrentHash: LibrarySymbolReference;
    GetHashAndReset: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference
  };
  KmacXof128: LibrarySymbolReference & {
    KmacXof128: LibrarySymbolReference;
    AppendData: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetCurrentHash: LibrarySymbolReference;
    GetHashAndReset: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference
  };
  KmacXof256: LibrarySymbolReference & {
    KmacXof256: LibrarySymbolReference;
    AppendData: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetCurrentHash: LibrarySymbolReference;
    GetHashAndReset: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference
  };
  MD5: LibrarySymbolReference & {
    HashSizeInBits: LibrarySymbolReference;
    HashSizeInBytes: LibrarySymbolReference;
    MD5: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    TryHashData: LibrarySymbolReference
  };
  MaskGenerationMethod: LibrarySymbolReference & {
    MaskGenerationMethod: LibrarySymbolReference;
    GenerateMask: LibrarySymbolReference
  };
  Oid: LibrarySymbolReference & {
    Oid: LibrarySymbolReference;
    FromFriendlyName: LibrarySymbolReference;
    FromOidValue: LibrarySymbolReference;
    FriendlyName: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  OidCollection: LibrarySymbolReference & {
    OidCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  OidEnumerator: LibrarySymbolReference & {
    MoveNext: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Current: LibrarySymbolReference
  };
  OidGroup: LibrarySymbolReference & {
    All: LibrarySymbolReference;
    HashAlgorithm: LibrarySymbolReference;
    EncryptionAlgorithm: LibrarySymbolReference;
    PublicKeyAlgorithm: LibrarySymbolReference;
    SignatureAlgorithm: LibrarySymbolReference;
    Attribute: LibrarySymbolReference;
    ExtensionOrAttribute: LibrarySymbolReference;
    EnhancedKeyUsage: LibrarySymbolReference;
    Policy: LibrarySymbolReference;
    Template: LibrarySymbolReference;
    KeyDerivationFunction: LibrarySymbolReference
  };
  PKCS1MaskGenerationMethod: LibrarySymbolReference & {
    PKCS1MaskGenerationMethod: LibrarySymbolReference;
    GenerateMask: LibrarySymbolReference;
    HashName: LibrarySymbolReference
  };
  PaddingMode: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    PKCS7: LibrarySymbolReference;
    Zeros: LibrarySymbolReference;
    ANSIX923: LibrarySymbolReference;
    ISO10126: LibrarySymbolReference
  };
  PbeEncryptionAlgorithm: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Aes128Cbc: LibrarySymbolReference;
    Aes192Cbc: LibrarySymbolReference;
    Aes256Cbc: LibrarySymbolReference;
    TripleDes3KeyPkcs12: LibrarySymbolReference
  };
  PbeParameters: LibrarySymbolReference & {
    PbeParameters: LibrarySymbolReference;
    EncryptionAlgorithm: LibrarySymbolReference;
    HashAlgorithm: LibrarySymbolReference;
    IterationCount: LibrarySymbolReference
  };
  PemEncoding: LibrarySymbolReference & {
    Find: LibrarySymbolReference;
    GetEncodedSize: LibrarySymbolReference;
    TryFind: LibrarySymbolReference;
    TryWrite: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteString: LibrarySymbolReference
  };
  PemFields: LibrarySymbolReference & {
    Base64Data: LibrarySymbolReference;
    DecodedDataLength: LibrarySymbolReference;
    Label: LibrarySymbolReference;
    Location: LibrarySymbolReference
  };
  RSA: LibrarySymbolReference & {
    RSA: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Decrypt: LibrarySymbolReference;
    Encrypt: LibrarySymbolReference;
    ExportParameters: LibrarySymbolReference;
    ExportRSAPrivateKey: LibrarySymbolReference;
    ExportRSAPrivateKeyPem: LibrarySymbolReference;
    ExportRSAPublicKey: LibrarySymbolReference;
    ExportRSAPublicKeyPem: LibrarySymbolReference;
    FromXmlString: LibrarySymbolReference;
    GetMaxOutputSize: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    ImportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ImportFromEncryptedPem: LibrarySymbolReference;
    ImportFromPem: LibrarySymbolReference;
    ImportParameters: LibrarySymbolReference;
    ImportPkcs8PrivateKey: LibrarySymbolReference;
    ImportRSAPrivateKey: LibrarySymbolReference;
    ImportRSAPublicKey: LibrarySymbolReference;
    ImportSubjectPublicKeyInfo: LibrarySymbolReference;
    SignData: LibrarySymbolReference;
    SignHash: LibrarySymbolReference;
    ToXmlString: LibrarySymbolReference;
    TryDecrypt: LibrarySymbolReference;
    TryEncrypt: LibrarySymbolReference;
    TryExportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    TryExportPkcs8PrivateKey: LibrarySymbolReference;
    TryExportRSAPrivateKey: LibrarySymbolReference;
    TryExportRSAPrivateKeyPem: LibrarySymbolReference;
    TryExportRSAPublicKey: LibrarySymbolReference;
    TryExportRSAPublicKeyPem: LibrarySymbolReference;
    TryExportSubjectPublicKeyInfo: LibrarySymbolReference;
    TryHashData: LibrarySymbolReference;
    TrySignData: LibrarySymbolReference;
    TrySignHash: LibrarySymbolReference;
    VerifyData: LibrarySymbolReference;
    VerifyHash: LibrarySymbolReference;
    KeyExchangeAlgorithm: LibrarySymbolReference;
    SignatureAlgorithm: LibrarySymbolReference
  };
  RSACng: LibrarySymbolReference & {
    RSACng: LibrarySymbolReference;
    Decrypt: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Encrypt: LibrarySymbolReference;
    ExportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ExportParameters: LibrarySymbolReference;
    ImportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ImportParameters: LibrarySymbolReference;
    ImportPkcs8PrivateKey: LibrarySymbolReference;
    SignHash: LibrarySymbolReference;
    TryDecrypt: LibrarySymbolReference;
    TryEncrypt: LibrarySymbolReference;
    TryExportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    TryExportPkcs8PrivateKey: LibrarySymbolReference;
    TrySignHash: LibrarySymbolReference;
    VerifyHash: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    LegalKeySizes: LibrarySymbolReference
  };
  RSACryptoServiceProvider: LibrarySymbolReference & {
    RSACryptoServiceProvider: LibrarySymbolReference;
    Decrypt: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Encrypt: LibrarySymbolReference;
    ExportCspBlob: LibrarySymbolReference;
    ExportParameters: LibrarySymbolReference;
    ImportCspBlob: LibrarySymbolReference;
    ImportEncryptedPkcs8PrivateKey: LibrarySymbolReference;
    ImportParameters: LibrarySymbolReference;
    SignData: LibrarySymbolReference;
    SignHash: LibrarySymbolReference;
    VerifyData: LibrarySymbolReference;
    VerifyHash: LibrarySymbolReference;
    CspKeyContainerInfo: LibrarySymbolReference;
    KeyExchangeAlgorithm: LibrarySymbolReference;
    KeySize: LibrarySymbolReference;
    LegalKeySizes: LibrarySymbolReference;
    PersistKeyInCsp: LibrarySymbolReference;
    PublicOnly: LibrarySymbolReference;
    SignatureAlgorithm: LibrarySymbolReference;
    UseMachineKeyStore: LibrarySymbolReference
  };
  RSAEncryptionPadding: LibrarySymbolReference & {
    CreateOaep: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Mode: LibrarySymbolReference;
    OaepHashAlgorithm: LibrarySymbolReference;
    OaepSHA1: LibrarySymbolReference;
    OaepSHA256: LibrarySymbolReference;
    OaepSHA384: LibrarySymbolReference;
    OaepSHA512: LibrarySymbolReference;
    Pkcs1: LibrarySymbolReference
  };
  RSAEncryptionPaddingMode: LibrarySymbolReference & {
    Pkcs1: LibrarySymbolReference;
    Oaep: LibrarySymbolReference
  };
  RSAOAEPKeyExchangeDeformatter: LibrarySymbolReference & {
    RSAOAEPKeyExchangeDeformatter: LibrarySymbolReference;
    DecryptKeyExchange: LibrarySymbolReference;
    SetKey: LibrarySymbolReference;
    Parameters: LibrarySymbolReference
  };
  RSAOAEPKeyExchangeFormatter: LibrarySymbolReference & {
    RSAOAEPKeyExchangeFormatter: LibrarySymbolReference;
    CreateKeyExchange: LibrarySymbolReference;
    SetKey: LibrarySymbolReference;
    Parameter: LibrarySymbolReference;
    Parameters: LibrarySymbolReference;
    Rng: LibrarySymbolReference
  };
  RSAOpenSsl: LibrarySymbolReference & {
    RSAOpenSsl: LibrarySymbolReference;
    DuplicateKeyHandle: LibrarySymbolReference;
    ExportParameters: LibrarySymbolReference;
    ImportParameters: LibrarySymbolReference
  };
  RSAPKCS1KeyExchangeDeformatter: LibrarySymbolReference & {
    RSAPKCS1KeyExchangeDeformatter: LibrarySymbolReference;
    DecryptKeyExchange: LibrarySymbolReference;
    SetKey: LibrarySymbolReference;
    Parameters: LibrarySymbolReference;
    RNG: LibrarySymbolReference
  };
  RSAPKCS1KeyExchangeFormatter: LibrarySymbolReference & {
    RSAPKCS1KeyExchangeFormatter: LibrarySymbolReference;
    CreateKeyExchange: LibrarySymbolReference;
    SetKey: LibrarySymbolReference;
    Parameters: LibrarySymbolReference;
    Rng: LibrarySymbolReference
  };
  RSAPKCS1SignatureDeformatter: LibrarySymbolReference & {
    RSAPKCS1SignatureDeformatter: LibrarySymbolReference;
    SetHashAlgorithm: LibrarySymbolReference;
    SetKey: LibrarySymbolReference;
    VerifySignature: LibrarySymbolReference
  };
  RSAPKCS1SignatureFormatter: LibrarySymbolReference & {
    RSAPKCS1SignatureFormatter: LibrarySymbolReference;
    CreateSignature: LibrarySymbolReference;
    SetHashAlgorithm: LibrarySymbolReference;
    SetKey: LibrarySymbolReference
  };
  RSAParameters: LibrarySymbolReference & {
    D: LibrarySymbolReference;
    DP: LibrarySymbolReference;
    DQ: LibrarySymbolReference;
    Exponent: LibrarySymbolReference;
    InverseQ: LibrarySymbolReference;
    Modulus: LibrarySymbolReference;
    P: LibrarySymbolReference;
    Q: LibrarySymbolReference
  };
  RSASignaturePadding: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Mode: LibrarySymbolReference;
    Pkcs1: LibrarySymbolReference;
    Pss: LibrarySymbolReference
  };
  RSASignaturePaddingMode: LibrarySymbolReference & {
    Pkcs1: LibrarySymbolReference;
    Pss: LibrarySymbolReference
  };
  RandomNumberGenerator: LibrarySymbolReference & {
    RandomNumberGenerator: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Fill: LibrarySymbolReference;
    GetBytes: LibrarySymbolReference;
    GetHexString: LibrarySymbolReference;
    GetInt32: LibrarySymbolReference;
    GetNonZeroBytes: LibrarySymbolReference;
    GetString: LibrarySymbolReference
  };
  Rfc2898DeriveBytes: LibrarySymbolReference & {
    Rfc2898DeriveBytes: LibrarySymbolReference;
    CryptDeriveKey: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetBytes: LibrarySymbolReference;
    Pbkdf2: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    HashAlgorithm: LibrarySymbolReference;
    IterationCount: LibrarySymbolReference;
    Salt: LibrarySymbolReference
  };
  SHA1: LibrarySymbolReference & {
    HashSizeInBits: LibrarySymbolReference;
    HashSizeInBytes: LibrarySymbolReference;
    SHA1: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    TryHashData: LibrarySymbolReference
  };
  SHA256: LibrarySymbolReference & {
    HashSizeInBits: LibrarySymbolReference;
    HashSizeInBytes: LibrarySymbolReference;
    SHA256: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    TryHashData: LibrarySymbolReference
  };
  SHA384: LibrarySymbolReference & {
    HashSizeInBits: LibrarySymbolReference;
    HashSizeInBytes: LibrarySymbolReference;
    SHA384: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    TryHashData: LibrarySymbolReference
  };
  SHA512: LibrarySymbolReference & {
    HashSizeInBits: LibrarySymbolReference;
    HashSizeInBytes: LibrarySymbolReference;
    SHA512: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    TryHashData: LibrarySymbolReference
  };
  SP800108HmacCounterKdf: LibrarySymbolReference & {
    SP800108HmacCounterKdf: LibrarySymbolReference;
    DeriveBytes: LibrarySymbolReference;
    DeriveKey: LibrarySymbolReference;
    Dispose: LibrarySymbolReference
  };
  SafeEvpPKeyHandle: LibrarySymbolReference & {
    SafeEvpPKeyHandle: LibrarySymbolReference;
    DuplicateHandle: LibrarySymbolReference;
    OpenKeyFromProvider: LibrarySymbolReference;
    OpenPrivateKeyFromEngine: LibrarySymbolReference;
    OpenPublicKeyFromEngine: LibrarySymbolReference;
    ReleaseHandle: LibrarySymbolReference;
    IsInvalid: LibrarySymbolReference;
    OpenSslVersion: LibrarySymbolReference
  };
  Shake128: LibrarySymbolReference & {
    Shake128: LibrarySymbolReference;
    AppendData: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetCurrentHash: LibrarySymbolReference;
    GetHashAndReset: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference
  };
  Shake256: LibrarySymbolReference & {
    Shake256: LibrarySymbolReference;
    AppendData: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetCurrentHash: LibrarySymbolReference;
    GetHashAndReset: LibrarySymbolReference;
    HashData: LibrarySymbolReference;
    HashDataAsync: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference
  };
  SignatureDescription: LibrarySymbolReference & {
    SignatureDescription: LibrarySymbolReference;
    CreateDeformatter: LibrarySymbolReference;
    CreateDigest: LibrarySymbolReference;
    CreateFormatter: LibrarySymbolReference;
    DeformatterAlgorithm: LibrarySymbolReference;
    DigestAlgorithm: LibrarySymbolReference;
    FormatterAlgorithm: LibrarySymbolReference;
    KeyAlgorithm: LibrarySymbolReference
  };
  SymmetricAlgorithm: LibrarySymbolReference & {
    BlockSizeValue: LibrarySymbolReference;
    FeedbackSizeValue: LibrarySymbolReference;
    IVValue: LibrarySymbolReference;
    KeySizeValue: LibrarySymbolReference;
    KeyValue: LibrarySymbolReference;
    LegalBlockSizesValue: LibrarySymbolReference;
    LegalKeySizesValue: LibrarySymbolReference;
    ModeValue: LibrarySymbolReference;
    PaddingValue: LibrarySymbolReference;
    SymmetricAlgorithm: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    CreateDecryptor: LibrarySymbolReference;
    CreateEncryptor: LibrarySymbolReference;
    DecryptCbc: LibrarySymbolReference;
    DecryptCfb: LibrarySymbolReference;
    DecryptEcb: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EncryptCbc: LibrarySymbolReference;
    EncryptCfb: LibrarySymbolReference;
    EncryptEcb: LibrarySymbolReference;
    GenerateIV: LibrarySymbolReference;
    GenerateKey: LibrarySymbolReference;
    GetCiphertextLengthCbc: LibrarySymbolReference;
    GetCiphertextLengthCfb: LibrarySymbolReference;
    GetCiphertextLengthEcb: LibrarySymbolReference;
    TryDecryptCbc: LibrarySymbolReference;
    TryDecryptCbcCore: LibrarySymbolReference;
    TryDecryptCfb: LibrarySymbolReference;
    TryDecryptCfbCore: LibrarySymbolReference;
    TryDecryptEcb: LibrarySymbolReference;
    TryDecryptEcbCore: LibrarySymbolReference;
    TryEncryptCbc: LibrarySymbolReference;
    TryEncryptCbcCore: LibrarySymbolReference;
    TryEncryptCfb: LibrarySymbolReference;
    TryEncryptCfbCore: LibrarySymbolReference;
    TryEncryptEcb: LibrarySymbolReference;
    TryEncryptEcbCore: LibrarySymbolReference;
    ValidKeySize: LibrarySymbolReference;
    BlockSize: LibrarySymbolReference;
    FeedbackSize: LibrarySymbolReference;
    IV: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    KeySize: LibrarySymbolReference;
    LegalBlockSizes: LibrarySymbolReference;
    LegalKeySizes: LibrarySymbolReference;
    Mode: LibrarySymbolReference;
    Padding: LibrarySymbolReference
  };
  ToBase64Transform: LibrarySymbolReference & {
    ToBase64Transform: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    TransformBlock: LibrarySymbolReference;
    TransformFinalBlock: LibrarySymbolReference;
    CanReuseTransform: LibrarySymbolReference;
    CanTransformMultipleBlocks: LibrarySymbolReference;
    InputBlockSize: LibrarySymbolReference;
    OutputBlockSize: LibrarySymbolReference
  };
  TripleDES: LibrarySymbolReference & {
    TripleDES: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    IsWeakKey: LibrarySymbolReference;
    Key: LibrarySymbolReference
  };
  TripleDESCng: LibrarySymbolReference & {
    TripleDESCng: LibrarySymbolReference;
    CreateDecryptor: LibrarySymbolReference;
    CreateEncryptor: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GenerateIV: LibrarySymbolReference;
    GenerateKey: LibrarySymbolReference;
    TryDecryptCbcCore: LibrarySymbolReference;
    TryDecryptCfbCore: LibrarySymbolReference;
    TryDecryptEcbCore: LibrarySymbolReference;
    TryEncryptCbcCore: LibrarySymbolReference;
    TryEncryptCfbCore: LibrarySymbolReference;
    TryEncryptEcbCore: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    KeySize: LibrarySymbolReference
  }
};
const Cryptography: CryptographyLibrary = createLibrary("System.Security.Cryptography", {
  Aes: {
    kind: "class",
    members: {
      Aes: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  AesCcm: {
    kind: "class",
    members: {
      AesCcm: {
        kind: "method",
        methodKind: "constructor",
      },
      Decrypt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Encrypt: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      NonceByteSizes: {
        kind: "property",
        type: () => {
          return Cryptography.KeySizes;
        },
        isStatic: true,
      },
      TagByteSizes: {
        kind: "property",
        type: () => {
          return Cryptography.KeySizes;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  AesCng: {
    kind: "class",
    members: {
      AesCng: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateDecryptor: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateEncryptor: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GenerateIV: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GenerateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryDecryptCbcCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryDecryptCfbCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryDecryptEcbCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryEncryptCbcCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryEncryptCfbCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryEncryptEcbCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      KeySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  AesGcm: {
    kind: "class",
    members: {
      AesGcm: {
        kind: "method",
        methodKind: "constructor",
      },
      Decrypt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Encrypt: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      NonceByteSizes: {
        kind: "property",
        type: () => {
          return Cryptography.KeySizes;
        },
        isStatic: true,
      },
      TagByteSizes: {
        kind: "property",
        type: () => {
          return Cryptography.KeySizes;
        },
        isStatic: true,
      },
      TagSizeInBytes: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  AsnEncodedData: {
    kind: "class",
    members: {
      AsnEncodedData: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyFrom: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Format: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Oid: {
        kind: "property",
        type: () => {
          return Cryptography.Oid;
        },
      },
      RawData: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  AsnEncodedDataCollection: {
    kind: "class",
    members: {
      AsnEncodedDataCollection: {
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
      IsSynchronized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return Cryptography.AsnEncodedData;
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
  AsnEncodedDataEnumerator: {
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
          return Cryptography.AsnEncodedData;
        },
      },
    },
    isSealed: true,
  },
  AsymmetricAlgorithm: {
    kind: "class",
    members: {
      KeySizeValue: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      LegalKeySizesValue: {
        kind: "field",
        type: () => {
          return System.Array;
        },
      },
      AsymmetricAlgorithm: {
        kind: "method",
        methodKind: "constructor",
      },
      Clear: {
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
      ExportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ExportEncryptedPkcs8PrivateKeyPem: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ExportPkcs8PrivateKeyPem: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportSubjectPublicKeyInfo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ExportSubjectPublicKeyInfoPem: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromXmlString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ImportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ImportFromEncryptedPem: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ImportFromPem: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ImportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ImportSubjectPublicKeyInfo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToXmlString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryExportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryExportEncryptedPkcs8PrivateKeyPem: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryExportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryExportPkcs8PrivateKeyPem: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryExportSubjectPublicKeyInfo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryExportSubjectPublicKeyInfoPem: {
        kind: "method",
        methodKind: "ordinary",
      },
      KeyExchangeAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      KeySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      LegalKeySizes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
      SignatureAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  AsymmetricKeyExchangeDeformatter: {
    kind: "class",
    members: {
      AsymmetricKeyExchangeDeformatter: {
        kind: "method",
        methodKind: "constructor",
      },
      DecryptKeyExchange: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetKey: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Parameters: {
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
  AsymmetricKeyExchangeFormatter: {
    kind: "class",
    members: {
      AsymmetricKeyExchangeFormatter: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateKeyExchange: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetKey: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Parameters: {
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
  AsymmetricSignatureDeformatter: {
    kind: "class",
    members: {
      AsymmetricSignatureDeformatter: {
        kind: "method",
        methodKind: "constructor",
      },
      SetHashAlgorithm: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetKey: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      VerifySignature: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  AsymmetricSignatureFormatter: {
    kind: "class",
    members: {
      AsymmetricSignatureFormatter: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateSignature: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetHashAlgorithm: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetKey: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  AuthenticationTagMismatchException: {
    kind: "class",
    members: {
      AuthenticationTagMismatchException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ChaCha20Poly1305: {
    kind: "class",
    members: {
      ChaCha20Poly1305: {
        kind: "method",
        methodKind: "constructor",
      },
      Decrypt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Encrypt: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  CipherMode: {
    kind: "enum",
    members: {
      CBC: {
        kind: "field",
        type: () => {
          return Cryptography.CipherMode;
        },
      },
      ECB: {
        kind: "field",
        type: () => {
          return Cryptography.CipherMode;
        },
      },
      CFB: {
        kind: "field",
        type: () => {
          return Cryptography.CipherMode;
        },
      },
      CTS: {
        kind: "field",
        type: () => {
          return Cryptography.CipherMode;
        },
      },
    },
  },
  CngAlgorithm: {
    kind: "class",
    members: {
      CngAlgorithm: {
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
      Algorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ECDiffieHellman: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
        isStatic: true,
      },
      ECDiffieHellmanP256: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
        isStatic: true,
      },
      ECDiffieHellmanP384: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
        isStatic: true,
      },
      ECDiffieHellmanP521: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
        isStatic: true,
      },
      ECDsa: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
        isStatic: true,
      },
      ECDsaP256: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
        isStatic: true,
      },
      ECDsaP384: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
        isStatic: true,
      },
      ECDsaP521: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
        isStatic: true,
      },
      MD5: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
        isStatic: true,
      },
      Rsa: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
        isStatic: true,
      },
      Sha1: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
        isStatic: true,
      },
      Sha256: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
        isStatic: true,
      },
      Sha384: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
        isStatic: true,
      },
      Sha512: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  CngAlgorithmGroup: {
    kind: "class",
    members: {
      CngAlgorithmGroup: {
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
      AlgorithmGroup: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DiffieHellman: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithmGroup;
        },
        isStatic: true,
      },
      Dsa: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithmGroup;
        },
        isStatic: true,
      },
      ECDiffieHellman: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithmGroup;
        },
        isStatic: true,
      },
      ECDsa: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithmGroup;
        },
        isStatic: true,
      },
      Rsa: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithmGroup;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  CngExportPolicies: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Cryptography.CngExportPolicies;
        },
      },
      AllowExport: {
        kind: "field",
        type: () => {
          return Cryptography.CngExportPolicies;
        },
      },
      AllowPlaintextExport: {
        kind: "field",
        type: () => {
          return Cryptography.CngExportPolicies;
        },
      },
      AllowArchiving: {
        kind: "field",
        type: () => {
          return Cryptography.CngExportPolicies;
        },
      },
      AllowPlaintextArchiving: {
        kind: "field",
        type: () => {
          return Cryptography.CngExportPolicies;
        },
      },
    },
  },
  CngKey: {
    kind: "class",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Delete: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Exists: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Export: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      HasProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      Import: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Open: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      Algorithm: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
      },
      AlgorithmGroup: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithmGroup;
        },
      },
      ExportPolicy: {
        kind: "property",
        type: () => {
          return Cryptography.CngExportPolicies;
        },
      },
      Handle: {
        kind: "property",
        type: () => {
          return SafeHandles.SafeNCryptKeyHandle;
        },
      },
      IsEphemeral: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsMachineKey: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      KeyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      KeySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      KeyUsage: {
        kind: "property",
        type: () => {
          return Cryptography.CngKeyUsages;
        },
      },
      ParentWindowHandle: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      Provider: {
        kind: "property",
        type: () => {
          return Cryptography.CngProvider;
        },
      },
      ProviderHandle: {
        kind: "property",
        type: () => {
          return SafeHandles.SafeNCryptProviderHandle;
        },
      },
      UIPolicy: {
        kind: "property",
        type: () => {
          return Cryptography.CngUIPolicy;
        },
      },
      UniqueName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  CngKeyBlobFormat: {
    kind: "class",
    members: {
      CngKeyBlobFormat: {
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
      EccFullPrivateBlob: {
        kind: "property",
        type: () => {
          return Cryptography.CngKeyBlobFormat;
        },
        isStatic: true,
      },
      EccFullPublicBlob: {
        kind: "property",
        type: () => {
          return Cryptography.CngKeyBlobFormat;
        },
        isStatic: true,
      },
      EccPrivateBlob: {
        kind: "property",
        type: () => {
          return Cryptography.CngKeyBlobFormat;
        },
        isStatic: true,
      },
      EccPublicBlob: {
        kind: "property",
        type: () => {
          return Cryptography.CngKeyBlobFormat;
        },
        isStatic: true,
      },
      Format: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      GenericPrivateBlob: {
        kind: "property",
        type: () => {
          return Cryptography.CngKeyBlobFormat;
        },
        isStatic: true,
      },
      GenericPublicBlob: {
        kind: "property",
        type: () => {
          return Cryptography.CngKeyBlobFormat;
        },
        isStatic: true,
      },
      OpaqueTransportBlob: {
        kind: "property",
        type: () => {
          return Cryptography.CngKeyBlobFormat;
        },
        isStatic: true,
      },
      Pkcs8PrivateBlob: {
        kind: "property",
        type: () => {
          return Cryptography.CngKeyBlobFormat;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  CngKeyCreationOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyCreationOptions;
        },
      },
      MachineKey: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyCreationOptions;
        },
      },
      OverwriteExistingKey: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyCreationOptions;
        },
      },
      PreferVbs: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyCreationOptions;
        },
      },
      RequireVbs: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyCreationOptions;
        },
      },
      UsePerBootKey: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyCreationOptions;
        },
      },
    },
  },
  CngKeyCreationParameters: {
    kind: "class",
    members: {
      CngKeyCreationParameters: {
        kind: "method",
        methodKind: "constructor",
      },
      ExportPolicy: {
        kind: "property",
        type: () => {
          return Cryptography.CngExportPolicies;
        },
        isNullable: true,
      },
      KeyCreationOptions: {
        kind: "property",
        type: () => {
          return Cryptography.CngKeyCreationOptions;
        },
      },
      KeyUsage: {
        kind: "property",
        type: () => {
          return Cryptography.CngKeyUsages;
        },
        isNullable: true,
      },
      Parameters: {
        kind: "property",
        type: () => {
          return Cryptography.CngPropertyCollection;
        },
      },
      ParentWindowHandle: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      Provider: {
        kind: "property",
        type: () => {
          return Cryptography.CngProvider;
        },
      },
      UIPolicy: {
        kind: "property",
        type: () => {
          return Cryptography.CngUIPolicy;
        },
      },
    },
    isSealed: true,
  },
  CngKeyHandleOpenOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyHandleOpenOptions;
        },
      },
      EphemeralKey: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyHandleOpenOptions;
        },
      },
    },
  },
  CngKeyOpenOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyOpenOptions;
        },
      },
      UserKey: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyOpenOptions;
        },
      },
      MachineKey: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyOpenOptions;
        },
      },
      Silent: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyOpenOptions;
        },
      },
    },
  },
  CngKeyUsages: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyUsages;
        },
      },
      Decryption: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyUsages;
        },
      },
      Signing: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyUsages;
        },
      },
      KeyAgreement: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyUsages;
        },
      },
      AllUsages: {
        kind: "field",
        type: () => {
          return Cryptography.CngKeyUsages;
        },
      },
    },
  },
  CngProperty: {
    kind: "struct",
    members: {
      CngProperty: {
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
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isReadOnly: true,
      },
      Options: {
        kind: "property",
        type: () => {
          return Cryptography.CngPropertyOptions;
        },
        isReadOnly: true,
      },
    },
  },
  CngPropertyCollection: {
    kind: "class",
    members: {
      CngPropertyCollection: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  CngPropertyOptions: {
    kind: "enum",
    members: {
      Persist: {
        kind: "field",
        type: () => {
          return Cryptography.CngPropertyOptions;
        },
      },
      None: {
        kind: "field",
        type: () => {
          return Cryptography.CngPropertyOptions;
        },
      },
      CustomProperty: {
        kind: "field",
        type: () => {
          return Cryptography.CngPropertyOptions;
        },
      },
    },
  },
  CngProvider: {
    kind: "class",
    members: {
      CngProvider: {
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
      MicrosoftPlatformCryptoProvider: {
        kind: "property",
        type: () => {
          return Cryptography.CngProvider;
        },
        isStatic: true,
      },
      MicrosoftSmartCardKeyStorageProvider: {
        kind: "property",
        type: () => {
          return Cryptography.CngProvider;
        },
        isStatic: true,
      },
      MicrosoftSoftwareKeyStorageProvider: {
        kind: "property",
        type: () => {
          return Cryptography.CngProvider;
        },
        isStatic: true,
      },
      Provider: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  CngUIPolicy: {
    kind: "class",
    members: {
      CngUIPolicy: {
        kind: "method",
        methodKind: "constructor",
      },
      CreationTitle: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Description: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      FriendlyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ProtectionLevel: {
        kind: "property",
        type: () => {
          return Cryptography.CngUIProtectionLevels;
        },
      },
      UseContext: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  CngUIProtectionLevels: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Cryptography.CngUIProtectionLevels;
        },
      },
      ProtectKey: {
        kind: "field",
        type: () => {
          return Cryptography.CngUIProtectionLevels;
        },
      },
      ForceHighProtection: {
        kind: "field",
        type: () => {
          return Cryptography.CngUIProtectionLevels;
        },
      },
    },
  },
  CryptoConfig: {
    kind: "class",
    members: {
      CryptoConfig: {
        kind: "method",
        methodKind: "constructor",
      },
      AddAlgorithm: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AddOID: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EncodeOID: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MapNameToOID: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AllowOnlyFipsAlgorithms: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
  },
  CryptoStream: {
    kind: "class",
    members: {
      CryptoStream: {
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
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CopyToAsync: {
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
      FlushFinalBlock: {
        kind: "method",
        methodKind: "ordinary",
      },
      FlushFinalBlockAsync: {
        kind: "method",
        methodKind: "ordinary",
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
      CanWrite: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      HasFlushedFinalBlock: {
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
        isOverride: true,
      },
      Position: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
    },
  },
  CryptoStreamMode: {
    kind: "enum",
    members: {
      Read: {
        kind: "field",
        type: () => {
          return Cryptography.CryptoStreamMode;
        },
      },
      Write: {
        kind: "field",
        type: () => {
          return Cryptography.CryptoStreamMode;
        },
      },
    },
  },
  CryptographicException: {
    kind: "class",
    members: {
      CryptographicException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CryptographicOperations: {
    kind: "class",
    members: {
      FixedTimeEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HmacData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HmacDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryHashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryHmacData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ZeroMemory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  CryptographicUnexpectedOperationException: {
    kind: "class",
    members: {
      CryptographicUnexpectedOperationException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CspKeyContainerInfo: {
    kind: "class",
    members: {
      CspKeyContainerInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      Accessible: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Exportable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      HardwareDevice: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      KeyContainerName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      KeyNumber: {
        kind: "property",
        type: () => {
          return Cryptography.KeyNumber;
        },
      },
      MachineKeyStore: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Protected: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ProviderName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ProviderType: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      RandomlyGenerated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Removable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      UniqueKeyContainerName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  CspParameters: {
    kind: "class",
    members: {
      KeyContainerName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      KeyNumber: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      ProviderName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ProviderType: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      CspParameters: {
        kind: "method",
        methodKind: "constructor",
      },
      Flags: {
        kind: "property",
        type: () => {
          return Cryptography.CspProviderFlags;
        },
      },
      KeyPassword: {
        kind: "property",
        type: () => {
          return Security.SecureString;
        },
      },
      ParentWindowHandle: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
    },
    isSealed: true,
  },
  CspProviderFlags: {
    kind: "enum",
    members: {
      NoFlags: {
        kind: "field",
        type: () => {
          return Cryptography.CspProviderFlags;
        },
      },
      UseMachineKeyStore: {
        kind: "field",
        type: () => {
          return Cryptography.CspProviderFlags;
        },
      },
      UseDefaultKeyContainer: {
        kind: "field",
        type: () => {
          return Cryptography.CspProviderFlags;
        },
      },
      UseNonExportableKey: {
        kind: "field",
        type: () => {
          return Cryptography.CspProviderFlags;
        },
      },
      UseExistingKey: {
        kind: "field",
        type: () => {
          return Cryptography.CspProviderFlags;
        },
      },
      UseArchivableKey: {
        kind: "field",
        type: () => {
          return Cryptography.CspProviderFlags;
        },
      },
      UseUserProtectedKey: {
        kind: "field",
        type: () => {
          return Cryptography.CspProviderFlags;
        },
      },
      NoPrompt: {
        kind: "field",
        type: () => {
          return Cryptography.CspProviderFlags;
        },
      },
      CreateEphemeralKey: {
        kind: "field",
        type: () => {
          return Cryptography.CspProviderFlags;
        },
      },
    },
  },
  DSA: {
    kind: "class",
    members: {
      DSA: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateSignature: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CreateSignatureCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ExportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      FromXmlString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMaxSignatureSize: {
        kind: "method",
        methodKind: "ordinary",
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ImportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportFromEncryptedPem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportFromPem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ImportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportSubjectPublicKeyInfo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SignData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SignDataCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToXmlString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryCreateSignature: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryCreateSignatureCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryExportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryExportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryExportSubjectPublicKeyInfo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryHashData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TrySignData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TrySignDataCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VerifyData: {
        kind: "method",
        methodKind: "ordinary",
      },
      VerifyDataCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VerifySignature: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      VerifySignatureCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  DSACng: {
    kind: "class",
    members: {
      DSACng: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateSignature: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryCreateSignatureCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryExportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryExportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      VerifySignature: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      VerifySignatureCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return Cryptography.CngKey;
        },
      },
      KeyExchangeAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      LegalKeySizes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      SignatureAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  DSACryptoServiceProvider: {
    kind: "class",
    members: {
      DSACryptoServiceProvider: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateSignature: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExportCspBlob: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportCspBlob: {
        kind: "method",
        methodKind: "ordinary",
      },
      ImportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SignData: {
        kind: "method",
        methodKind: "ordinary",
      },
      SignHash: {
        kind: "method",
        methodKind: "ordinary",
      },
      VerifyData: {
        kind: "method",
        methodKind: "ordinary",
      },
      VerifyHash: {
        kind: "method",
        methodKind: "ordinary",
      },
      VerifySignature: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CspKeyContainerInfo: {
        kind: "property",
        type: () => {
          return Cryptography.CspKeyContainerInfo;
        },
      },
      KeyExchangeAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      KeySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      LegalKeySizes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      PersistKeyInCsp: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PublicOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SignatureAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      UseMachineKeyStore: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  DSAOpenSsl: {
    kind: "class",
    members: {
      DSAOpenSsl: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateSignature: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DuplicateKeyHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      VerifySignature: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  DSAParameters: {
    kind: "struct",
    members: {
      Counter: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      G: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      J: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      P: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Q: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Seed: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      X: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Y: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
    },
  },
  DSASignatureDeformatter: {
    kind: "class",
    members: {
      DSASignatureDeformatter: {
        kind: "method",
        methodKind: "constructor",
      },
      SetHashAlgorithm: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      VerifySignature: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  DSASignatureFormat: {
    kind: "enum",
    members: {
      IeeeP1363FixedFieldConcatenation: {
        kind: "field",
        type: () => {
          return Cryptography.DSASignatureFormat;
        },
      },
      Rfc3279DerSequence: {
        kind: "field",
        type: () => {
          return Cryptography.DSASignatureFormat;
        },
      },
    },
  },
  DSASignatureFormatter: {
    kind: "class",
    members: {
      DSASignatureFormatter: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateSignature: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetHashAlgorithm: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  DeriveBytes: {
    kind: "class",
    members: {
      DeriveBytes: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetBytes: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  ECAlgorithm: {
    kind: "class",
    members: {
      ECAlgorithm: {
        kind: "method",
        methodKind: "constructor",
      },
      ExportECPrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ExportECPrivateKeyPem: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportExplicitParameters: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ExportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GenerateKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ImportECPrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ImportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportFromEncryptedPem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportFromPem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ImportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportSubjectPublicKeyInfo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryExportECPrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryExportECPrivateKeyPem: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryExportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryExportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryExportSubjectPublicKeyInfo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  ECCurve: {
    kind: "class",
    members: {
      ECCurveType: {
        kind: "enum",
        members: {
          Implicit: {
            kind: "field",
            type: () => {
              return Cryptography.ECCurve.ECCurveType;
            },
          },
          PrimeShortWeierstrass: {
            kind: "field",
            type: () => {
              return Cryptography.ECCurve.ECCurveType;
            },
          },
          PrimeTwistedEdwards: {
            kind: "field",
            type: () => {
              return Cryptography.ECCurve.ECCurveType;
            },
          },
          PrimeMontgomery: {
            kind: "field",
            type: () => {
              return Cryptography.ECCurve.ECCurveType;
            },
          },
          Characteristic2: {
            kind: "field",
            type: () => {
              return Cryptography.ECCurve.ECCurveType;
            },
          },
          Named: {
            kind: "field",
            type: () => {
              return Cryptography.ECCurve.ECCurveType;
            },
          },
        },
      },
      NamedCurves: {
        kind: "class",
        members: {
          brainpoolP160r1: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          brainpoolP160t1: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          brainpoolP192r1: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          brainpoolP192t1: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          brainpoolP224r1: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          brainpoolP224t1: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          brainpoolP256r1: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          brainpoolP256t1: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          brainpoolP320r1: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          brainpoolP320t1: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          brainpoolP384r1: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          brainpoolP384t1: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          brainpoolP512r1: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          brainpoolP512t1: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          nistP256: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          nistP384: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
          nistP521: {
            kind: "property",
            type: () => {
              return Cryptography.ECCurve;
            },
            isStatic: true,
          },
        },
        isStatic: true,
      },
    },
  },
  ECDiffieHellman: {
    kind: "class",
    members: {
      ECDiffieHellman: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DeriveKeyFromHash: {
        kind: "method",
        methodKind: "ordinary",
      },
      DeriveKeyFromHmac: {
        kind: "method",
        methodKind: "ordinary",
      },
      DeriveKeyMaterial: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DeriveKeyTls: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DeriveRawSecretAgreement: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      FromXmlString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToXmlString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      KeyExchangeAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      PublicKey: {
        kind: "property",
        type: () => {
          return Cryptography.ECDiffieHellmanPublicKey;
        },
        isAbstract: true,
      },
      SignatureAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  ECDiffieHellmanCng: {
    kind: "class",
    members: {
      ECDiffieHellmanCng: {
        kind: "method",
        methodKind: "constructor",
      },
      DeriveKeyFromHash: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DeriveKeyFromHmac: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DeriveKeyMaterial: {
        kind: "method",
        methodKind: "ordinary",
      },
      DeriveKeyTls: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DeriveSecretAgreementHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExportExplicitParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FromXmlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      GenerateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToXmlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryExportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryExportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashAlgorithm: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
      },
      HmacKey: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return Cryptography.CngKey;
        },
      },
      KeyDerivationFunction: {
        kind: "property",
        type: () => {
          return Cryptography.ECDiffieHellmanKeyDerivationFunction;
        },
      },
      KeySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Label: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      LegalKeySizes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      PublicKey: {
        kind: "property",
        type: () => {
          return Cryptography.ECDiffieHellmanPublicKey;
        },
        isOverride: true,
      },
      SecretAppend: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      SecretPrepend: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Seed: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      UseSecretAgreementAsHmacKey: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  ECDiffieHellmanCngPublicKey: {
    kind: "class",
    members: {
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExportExplicitParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FromByteArray: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromXmlString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Import: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToXmlString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BlobFormat: {
        kind: "property",
        type: () => {
          return Cryptography.CngKeyBlobFormat;
        },
      },
    },
    isSealed: true,
  },
  ECDiffieHellmanKeyDerivationFunction: {
    kind: "enum",
    members: {
      Hash: {
        kind: "field",
        type: () => {
          return Cryptography.ECDiffieHellmanKeyDerivationFunction;
        },
      },
      Hmac: {
        kind: "field",
        type: () => {
          return Cryptography.ECDiffieHellmanKeyDerivationFunction;
        },
      },
      Tls: {
        kind: "field",
        type: () => {
          return Cryptography.ECDiffieHellmanKeyDerivationFunction;
        },
      },
    },
  },
  ECDiffieHellmanOpenSsl: {
    kind: "class",
    members: {
      ECDiffieHellmanOpenSsl: {
        kind: "method",
        methodKind: "constructor",
      },
      DuplicateKeyHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      PublicKey: {
        kind: "property",
        type: () => {
          return Cryptography.ECDiffieHellmanPublicKey;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  ECDiffieHellmanPublicKey: {
    kind: "class",
    members: {
      ECDiffieHellmanPublicKey: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportExplicitParameters: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ExportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ExportSubjectPublicKeyInfo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToByteArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToXmlString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryExportSubjectPublicKeyInfo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  ECDsa: {
    kind: "class",
    members: {
      ECDsa: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromXmlString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMaxSignatureSize: {
        kind: "method",
        methodKind: "ordinary",
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SignData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SignDataCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SignHash: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SignHashCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToXmlString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryHashData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TrySignData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TrySignDataCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TrySignHash: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TrySignHashCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VerifyData: {
        kind: "method",
        methodKind: "ordinary",
      },
      VerifyDataCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VerifyHash: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      VerifyHashCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      KeyExchangeAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      SignatureAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  ECDsaCng: {
    kind: "class",
    members: {
      ECDsaCng: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExportExplicitParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FromXmlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      GenerateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SignData: {
        kind: "method",
        methodKind: "ordinary",
      },
      SignHash: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToXmlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryExportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryExportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrySignHash: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrySignHashCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      VerifyData: {
        kind: "method",
        methodKind: "ordinary",
      },
      VerifyHash: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      VerifyHashCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashAlgorithm: {
        kind: "property",
        type: () => {
          return Cryptography.CngAlgorithm;
        },
      },
      Key: {
        kind: "property",
        type: () => {
          return Cryptography.CngKey;
        },
      },
      KeySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      LegalKeySizes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  ECDsaOpenSsl: {
    kind: "class",
    members: {
      ECDsaOpenSsl: {
        kind: "method",
        methodKind: "constructor",
      },
      DuplicateKeyHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      SignHash: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      VerifyHash: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  ECKeyXmlFormat: {
    kind: "enum",
    members: {
      Rfc4050: {
        kind: "field",
        type: () => {
          return Cryptography.ECKeyXmlFormat;
        },
      },
    },
  },
  ECParameters: {
    kind: "struct",
    members: {
      Curve: {
        kind: "field",
        type: () => {
          return Cryptography.ECCurve;
        },
      },
      D: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Q: {
        kind: "field",
        type: () => {
          return Cryptography.ECPoint;
        },
      },
      Validate: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ECPoint: {
    kind: "struct",
    members: {
      X: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Y: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
    },
  },
  FromBase64Transform: {
    kind: "class",
    members: {
      FromBase64Transform: {
        kind: "method",
        methodKind: "constructor",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      TransformBlock: {
        kind: "method",
        methodKind: "ordinary",
      },
      TransformFinalBlock: {
        kind: "method",
        methodKind: "ordinary",
      },
      CanReuseTransform: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      CanTransformMultipleBlocks: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      InputBlockSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      OutputBlockSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  FromBase64TransformMode: {
    kind: "enum",
    members: {
      IgnoreWhiteSpaces: {
        kind: "field",
        type: () => {
          return Cryptography.FromBase64TransformMode;
        },
      },
      DoNotIgnoreWhiteSpaces: {
        kind: "field",
        type: () => {
          return Cryptography.FromBase64TransformMode;
        },
      },
    },
  },
  HKDF: {
    kind: "class",
    members: {
      DeriveKey: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Expand: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Extract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  HMAC: {
    kind: "class",
    members: {
      HMAC: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashFinal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Initialize: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryHashFinal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BlockSizeValue: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      HashName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Key: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  HMACMD5: {
    kind: "class",
    members: {
      HashSizeInBits: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HashSizeInBytes: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HMACMD5: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashFinal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Initialize: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryHashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryHashFinal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
    },
  },
  HMACSHA1: {
    kind: "class",
    members: {
      HashSizeInBits: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HashSizeInBytes: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HMACSHA1: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashFinal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Initialize: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryHashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryHashFinal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
    },
  },
  HMACSHA256: {
    kind: "class",
    members: {
      HashSizeInBits: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HashSizeInBytes: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HMACSHA256: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashFinal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Initialize: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryHashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryHashFinal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
    },
  },
  HMACSHA384: {
    kind: "class",
    members: {
      HashSizeInBits: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HashSizeInBytes: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HMACSHA384: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashFinal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Initialize: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryHashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryHashFinal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      ProduceLegacyHmacValues: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  HMACSHA512: {
    kind: "class",
    members: {
      HashSizeInBits: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HashSizeInBytes: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HMACSHA512: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashFinal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Initialize: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryHashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryHashFinal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      ProduceLegacyHmacValues: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  HashAlgorithm: {
    kind: "class",
    members: {
      HashSizeValue: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HashValue: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      State: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HashAlgorithm: {
        kind: "method",
        methodKind: "constructor",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      ComputeHash: {
        kind: "method",
        methodKind: "ordinary",
      },
      ComputeHashAsync: {
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
      HashCore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      HashFinal: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Initialize: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      TransformBlock: {
        kind: "method",
        methodKind: "ordinary",
      },
      TransformFinalBlock: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryComputeHash: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryHashFinal: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CanReuseTransform: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      CanTransformMultipleBlocks: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Hash: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
        isVirtual: true,
      },
      HashSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      InputBlockSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      OutputBlockSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  HashAlgorithmName: {
    kind: "struct",
    members: {
      HashAlgorithmName: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FromOid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      TryFromOid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MD5: {
        kind: "property",
        type: () => {
          return Cryptography.HashAlgorithmName;
        },
        isStatic: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SHA1: {
        kind: "property",
        type: () => {
          return Cryptography.HashAlgorithmName;
        },
        isStatic: true,
      },
      SHA256: {
        kind: "property",
        type: () => {
          return Cryptography.HashAlgorithmName;
        },
        isStatic: true,
      },
      SHA384: {
        kind: "property",
        type: () => {
          return Cryptography.HashAlgorithmName;
        },
        isStatic: true,
      },
      SHA512: {
        kind: "property",
        type: () => {
          return Cryptography.HashAlgorithmName;
        },
        isStatic: true,
      },
    },
  },
  ICryptoTransform: {
    kind: "interface",
    members: {
      TransformBlock: {
        kind: "method",
        methodKind: "ordinary",
      },
      TransformFinalBlock: {
        kind: "method",
        methodKind: "ordinary",
      },
      CanReuseTransform: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      CanTransformMultipleBlocks: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      InputBlockSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      OutputBlockSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  ICspAsymmetricAlgorithm: {
    kind: "interface",
    members: {
      ExportCspBlob: {
        kind: "method",
        methodKind: "ordinary",
      },
      ImportCspBlob: {
        kind: "method",
        methodKind: "ordinary",
      },
      CspKeyContainerInfo: {
        kind: "property",
        type: () => {
          return Cryptography.CspKeyContainerInfo;
        },
      },
    },
  },
  IncrementalHash: {
    kind: "class",
    members: {
      AppendData: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateHash: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateHMAC: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCurrentHash: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashAndReset: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetCurrentHash: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetHashAndReset: {
        kind: "method",
        methodKind: "ordinary",
      },
      AlgorithmName: {
        kind: "property",
        type: () => {
          return Cryptography.HashAlgorithmName;
        },
      },
      HashLengthInBytes: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  KeyNumber: {
    kind: "enum",
    members: {
      Exchange: {
        kind: "field",
        type: () => {
          return Cryptography.KeyNumber;
        },
      },
      Signature: {
        kind: "field",
        type: () => {
          return Cryptography.KeyNumber;
        },
      },
    },
  },
  KeySizes: {
    kind: "class",
    members: {
      KeySizes: {
        kind: "method",
        methodKind: "constructor",
      },
      MaxSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MinSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SkipSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  KeyedHashAlgorithm: {
    kind: "class",
    members: {
      KeyValue: {
        kind: "field",
        type: () => {
          return System.Array;
        },
      },
      KeyedHashAlgorithm: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  Kmac128: {
    kind: "class",
    members: {
      Kmac128: {
        kind: "method",
        methodKind: "constructor",
      },
      AppendData: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCurrentHash: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashAndReset: {
        kind: "method",
        methodKind: "ordinary",
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  Kmac256: {
    kind: "class",
    members: {
      Kmac256: {
        kind: "method",
        methodKind: "constructor",
      },
      AppendData: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCurrentHash: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashAndReset: {
        kind: "method",
        methodKind: "ordinary",
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  KmacXof128: {
    kind: "class",
    members: {
      KmacXof128: {
        kind: "method",
        methodKind: "constructor",
      },
      AppendData: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCurrentHash: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashAndReset: {
        kind: "method",
        methodKind: "ordinary",
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  KmacXof256: {
    kind: "class",
    members: {
      KmacXof256: {
        kind: "method",
        methodKind: "constructor",
      },
      AppendData: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCurrentHash: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashAndReset: {
        kind: "method",
        methodKind: "ordinary",
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  MD5: {
    kind: "class",
    members: {
      HashSizeInBits: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HashSizeInBytes: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      MD5: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryHashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  MaskGenerationMethod: {
    kind: "class",
    members: {
      MaskGenerationMethod: {
        kind: "method",
        methodKind: "constructor",
      },
      GenerateMask: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  Oid: {
    kind: "class",
    members: {
      Oid: {
        kind: "method",
        methodKind: "constructor",
      },
      FromFriendlyName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromOidValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FriendlyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  OidCollection: {
    kind: "class",
    members: {
      OidCollection: {
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
          return Cryptography.Oid;
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
  OidEnumerator: {
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
          return Cryptography.Oid;
        },
      },
    },
    isSealed: true,
  },
  OidGroup: {
    kind: "enum",
    members: {
      All: {
        kind: "field",
        type: () => {
          return Cryptography.OidGroup;
        },
      },
      HashAlgorithm: {
        kind: "field",
        type: () => {
          return Cryptography.OidGroup;
        },
      },
      EncryptionAlgorithm: {
        kind: "field",
        type: () => {
          return Cryptography.OidGroup;
        },
      },
      PublicKeyAlgorithm: {
        kind: "field",
        type: () => {
          return Cryptography.OidGroup;
        },
      },
      SignatureAlgorithm: {
        kind: "field",
        type: () => {
          return Cryptography.OidGroup;
        },
      },
      Attribute: {
        kind: "field",
        type: () => {
          return Cryptography.OidGroup;
        },
      },
      ExtensionOrAttribute: {
        kind: "field",
        type: () => {
          return Cryptography.OidGroup;
        },
      },
      EnhancedKeyUsage: {
        kind: "field",
        type: () => {
          return Cryptography.OidGroup;
        },
      },
      Policy: {
        kind: "field",
        type: () => {
          return Cryptography.OidGroup;
        },
      },
      Template: {
        kind: "field",
        type: () => {
          return Cryptography.OidGroup;
        },
      },
      KeyDerivationFunction: {
        kind: "field",
        type: () => {
          return Cryptography.OidGroup;
        },
      },
    },
  },
  PKCS1MaskGenerationMethod: {
    kind: "class",
    members: {
      PKCS1MaskGenerationMethod: {
        kind: "method",
        methodKind: "constructor",
      },
      GenerateMask: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  PaddingMode: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Cryptography.PaddingMode;
        },
      },
      PKCS7: {
        kind: "field",
        type: () => {
          return Cryptography.PaddingMode;
        },
      },
      Zeros: {
        kind: "field",
        type: () => {
          return Cryptography.PaddingMode;
        },
      },
      ANSIX923: {
        kind: "field",
        type: () => {
          return Cryptography.PaddingMode;
        },
      },
      ISO10126: {
        kind: "field",
        type: () => {
          return Cryptography.PaddingMode;
        },
      },
    },
  },
  PbeEncryptionAlgorithm: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return Cryptography.PbeEncryptionAlgorithm;
        },
      },
      Aes128Cbc: {
        kind: "field",
        type: () => {
          return Cryptography.PbeEncryptionAlgorithm;
        },
      },
      Aes192Cbc: {
        kind: "field",
        type: () => {
          return Cryptography.PbeEncryptionAlgorithm;
        },
      },
      Aes256Cbc: {
        kind: "field",
        type: () => {
          return Cryptography.PbeEncryptionAlgorithm;
        },
      },
      TripleDes3KeyPkcs12: {
        kind: "field",
        type: () => {
          return Cryptography.PbeEncryptionAlgorithm;
        },
      },
    },
  },
  PbeParameters: {
    kind: "class",
    members: {
      PbeParameters: {
        kind: "method",
        methodKind: "constructor",
      },
      EncryptionAlgorithm: {
        kind: "property",
        type: () => {
          return Cryptography.PbeEncryptionAlgorithm;
        },
      },
      HashAlgorithm: {
        kind: "property",
        type: () => {
          return Cryptography.HashAlgorithmName;
        },
      },
      IterationCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  PemEncoding: {
    kind: "class",
    members: {
      Find: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetEncodedSize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFind: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWrite: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  PemFields: {
    kind: "struct",
    members: {
      Base64Data: {
        kind: "property",
        type: () => {
          return System.Range;
        },
      },
      DecodedDataLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Label: {
        kind: "property",
        type: () => {
          return System.Range;
        },
      },
      Location: {
        kind: "property",
        type: () => {
          return System.Range;
        },
      },
    },
  },
  RSA: {
    kind: "class",
    members: {
      RSA: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Decrypt: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Encrypt: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ExportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ExportRSAPrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ExportRSAPrivateKeyPem: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportRSAPublicKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ExportRSAPublicKeyPem: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromXmlString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMaxOutputSize: {
        kind: "method",
        methodKind: "ordinary",
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ImportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportFromEncryptedPem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportFromPem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ImportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportRSAPrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ImportRSAPublicKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ImportSubjectPublicKeyInfo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SignData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SignHash: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToXmlString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryDecrypt: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryEncrypt: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryExportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryExportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryExportRSAPrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryExportRSAPrivateKeyPem: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryExportRSAPublicKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryExportRSAPublicKeyPem: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryExportSubjectPublicKeyInfo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryHashData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TrySignData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TrySignHash: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VerifyData: {
        kind: "method",
        methodKind: "ordinary",
      },
      VerifyHash: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      KeyExchangeAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      SignatureAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  RSACng: {
    kind: "class",
    members: {
      RSACng: {
        kind: "method",
        methodKind: "constructor",
      },
      Decrypt: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Encrypt: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SignHash: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryDecrypt: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryEncrypt: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryExportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryExportPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrySignHash: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      VerifyHash: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return Cryptography.CngKey;
        },
      },
      LegalKeySizes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  RSACryptoServiceProvider: {
    kind: "class",
    members: {
      RSACryptoServiceProvider: {
        kind: "method",
        methodKind: "constructor",
      },
      Decrypt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Encrypt: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportCspBlob: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportCspBlob: {
        kind: "method",
        methodKind: "ordinary",
      },
      ImportEncryptedPkcs8PrivateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SignData: {
        kind: "method",
        methodKind: "ordinary",
      },
      SignHash: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      VerifyData: {
        kind: "method",
        methodKind: "ordinary",
      },
      VerifyHash: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CspKeyContainerInfo: {
        kind: "property",
        type: () => {
          return Cryptography.CspKeyContainerInfo;
        },
      },
      KeyExchangeAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      KeySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      LegalKeySizes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      PersistKeyInCsp: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PublicOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SignatureAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      UseMachineKeyStore: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  RSAEncryptionPadding: {
    kind: "class",
    members: {
      CreateOaep: {
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
      Mode: {
        kind: "property",
        type: () => {
          return Cryptography.RSAEncryptionPaddingMode;
        },
      },
      OaepHashAlgorithm: {
        kind: "property",
        type: () => {
          return Cryptography.HashAlgorithmName;
        },
      },
      OaepSHA1: {
        kind: "property",
        type: () => {
          return Cryptography.RSAEncryptionPadding;
        },
        isStatic: true,
      },
      OaepSHA256: {
        kind: "property",
        type: () => {
          return Cryptography.RSAEncryptionPadding;
        },
        isStatic: true,
      },
      OaepSHA384: {
        kind: "property",
        type: () => {
          return Cryptography.RSAEncryptionPadding;
        },
        isStatic: true,
      },
      OaepSHA512: {
        kind: "property",
        type: () => {
          return Cryptography.RSAEncryptionPadding;
        },
        isStatic: true,
      },
      Pkcs1: {
        kind: "property",
        type: () => {
          return Cryptography.RSAEncryptionPadding;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  RSAEncryptionPaddingMode: {
    kind: "enum",
    members: {
      Pkcs1: {
        kind: "field",
        type: () => {
          return Cryptography.RSAEncryptionPaddingMode;
        },
      },
      Oaep: {
        kind: "field",
        type: () => {
          return Cryptography.RSAEncryptionPaddingMode;
        },
      },
    },
  },
  RSAOAEPKeyExchangeDeformatter: {
    kind: "class",
    members: {
      RSAOAEPKeyExchangeDeformatter: {
        kind: "method",
        methodKind: "constructor",
      },
      DecryptKeyExchange: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Parameters: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
    },
  },
  RSAOAEPKeyExchangeFormatter: {
    kind: "class",
    members: {
      RSAOAEPKeyExchangeFormatter: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateKeyExchange: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Parameter: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Parameters: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      Rng: {
        kind: "property",
        type: () => {
          return Cryptography.RandomNumberGenerator;
        },
        isNullable: true,
      },
    },
  },
  RSAOpenSsl: {
    kind: "class",
    members: {
      RSAOpenSsl: {
        kind: "method",
        methodKind: "constructor",
      },
      DuplicateKeyHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ImportParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  RSAPKCS1KeyExchangeDeformatter: {
    kind: "class",
    members: {
      RSAPKCS1KeyExchangeDeformatter: {
        kind: "method",
        methodKind: "constructor",
      },
      DecryptKeyExchange: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Parameters: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isOverride: true,
      },
      RNG: {
        kind: "property",
        type: () => {
          return Cryptography.RandomNumberGenerator;
        },
        isNullable: true,
      },
    },
  },
  RSAPKCS1KeyExchangeFormatter: {
    kind: "class",
    members: {
      RSAPKCS1KeyExchangeFormatter: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateKeyExchange: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Parameters: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      Rng: {
        kind: "property",
        type: () => {
          return Cryptography.RandomNumberGenerator;
        },
        isNullable: true,
      },
    },
  },
  RSAPKCS1SignatureDeformatter: {
    kind: "class",
    members: {
      RSAPKCS1SignatureDeformatter: {
        kind: "method",
        methodKind: "constructor",
      },
      SetHashAlgorithm: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      VerifySignature: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  RSAPKCS1SignatureFormatter: {
    kind: "class",
    members: {
      RSAPKCS1SignatureFormatter: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateSignature: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetHashAlgorithm: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  RSAParameters: {
    kind: "struct",
    members: {
      D: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      DP: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      DQ: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Exponent: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      InverseQ: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Modulus: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      P: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Q: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
    },
  },
  RSASignaturePadding: {
    kind: "class",
    members: {
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
      Mode: {
        kind: "property",
        type: () => {
          return Cryptography.RSASignaturePaddingMode;
        },
      },
      Pkcs1: {
        kind: "property",
        type: () => {
          return Cryptography.RSASignaturePadding;
        },
        isStatic: true,
      },
      Pss: {
        kind: "property",
        type: () => {
          return Cryptography.RSASignaturePadding;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  RSASignaturePaddingMode: {
    kind: "enum",
    members: {
      Pkcs1: {
        kind: "field",
        type: () => {
          return Cryptography.RSASignaturePaddingMode;
        },
      },
      Pss: {
        kind: "field",
        type: () => {
          return Cryptography.RSASignaturePaddingMode;
        },
      },
    },
  },
  RandomNumberGenerator: {
    kind: "class",
    members: {
      RandomNumberGenerator: {
        kind: "method",
        methodKind: "constructor",
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
      Fill: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetBytes: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetHexString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetInt32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetNonZeroBytes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  Rfc2898DeriveBytes: {
    kind: "class",
    members: {
      Rfc2898DeriveBytes: {
        kind: "method",
        methodKind: "constructor",
      },
      CryptDeriveKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetBytes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Pbkdf2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HashAlgorithm: {
        kind: "property",
        type: () => {
          return Cryptography.HashAlgorithmName;
        },
      },
      IterationCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Salt: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  SHA1: {
    kind: "class",
    members: {
      HashSizeInBits: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HashSizeInBytes: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      SHA1: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryHashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  SHA256: {
    kind: "class",
    members: {
      HashSizeInBits: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HashSizeInBytes: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      SHA256: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryHashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  SHA384: {
    kind: "class",
    members: {
      HashSizeInBits: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HashSizeInBytes: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      SHA384: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryHashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  SHA512: {
    kind: "class",
    members: {
      HashSizeInBits: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      HashSizeInBytes: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      SHA512: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryHashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  SP800108HmacCounterKdf: {
    kind: "class",
    members: {
      SP800108HmacCounterKdf: {
        kind: "method",
        methodKind: "constructor",
      },
      DeriveBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DeriveKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  SafeEvpPKeyHandle: {
    kind: "class",
    members: {
      SafeEvpPKeyHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      DuplicateHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenKeyFromProvider: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OpenPrivateKeyFromEngine: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OpenPublicKeyFromEngine: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      OpenSslVersion: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  Shake128: {
    kind: "class",
    members: {
      Shake128: {
        kind: "method",
        methodKind: "constructor",
      },
      AppendData: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCurrentHash: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashAndReset: {
        kind: "method",
        methodKind: "ordinary",
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  Shake256: {
    kind: "class",
    members: {
      Shake256: {
        kind: "method",
        methodKind: "constructor",
      },
      AppendData: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCurrentHash: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashAndReset: {
        kind: "method",
        methodKind: "ordinary",
      },
      HashData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HashDataAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  SignatureDescription: {
    kind: "class",
    members: {
      SignatureDescription: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateDeformatter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateDigest: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateFormatter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DeformatterAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      DigestAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      FormatterAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      KeyAlgorithm: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  SymmetricAlgorithm: {
    kind: "class",
    members: {
      BlockSizeValue: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      FeedbackSizeValue: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      IVValue: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      KeySizeValue: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      KeyValue: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      LegalBlockSizesValue: {
        kind: "field",
        type: () => {
          return System.Array;
        },
      },
      LegalKeySizesValue: {
        kind: "field",
        type: () => {
          return System.Array;
        },
      },
      ModeValue: {
        kind: "field",
        type: () => {
          return Cryptography.CipherMode;
        },
      },
      PaddingValue: {
        kind: "field",
        type: () => {
          return Cryptography.PaddingMode;
        },
      },
      SymmetricAlgorithm: {
        kind: "method",
        methodKind: "constructor",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateDecryptor: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateEncryptor: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DecryptCbc: {
        kind: "method",
        methodKind: "ordinary",
      },
      DecryptCfb: {
        kind: "method",
        methodKind: "ordinary",
      },
      DecryptEcb: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      EncryptCbc: {
        kind: "method",
        methodKind: "ordinary",
      },
      EncryptCfb: {
        kind: "method",
        methodKind: "ordinary",
      },
      EncryptEcb: {
        kind: "method",
        methodKind: "ordinary",
      },
      GenerateIV: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GenerateKey: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetCiphertextLengthCbc: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCiphertextLengthCfb: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCiphertextLengthEcb: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryDecryptCbc: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryDecryptCbcCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryDecryptCfb: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryDecryptCfbCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryDecryptEcb: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryDecryptEcbCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryEncryptCbc: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryEncryptCbcCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryEncryptCfb: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryEncryptCfbCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryEncryptEcb: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryEncryptEcbCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ValidKeySize: {
        kind: "method",
        methodKind: "ordinary",
      },
      BlockSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      FeedbackSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IV: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
      KeySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      LegalBlockSizes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
      LegalKeySizes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
      Mode: {
        kind: "property",
        type: () => {
          return Cryptography.CipherMode;
        },
        isVirtual: true,
      },
      Padding: {
        kind: "property",
        type: () => {
          return Cryptography.PaddingMode;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  ToBase64Transform: {
    kind: "class",
    members: {
      ToBase64Transform: {
        kind: "method",
        methodKind: "constructor",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      TransformBlock: {
        kind: "method",
        methodKind: "ordinary",
      },
      TransformFinalBlock: {
        kind: "method",
        methodKind: "ordinary",
      },
      CanReuseTransform: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      CanTransformMultipleBlocks: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      InputBlockSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      OutputBlockSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  TripleDES: {
    kind: "class",
    members: {
      TripleDES: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsWeakKey: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  TripleDESCng: {
    kind: "class",
    members: {
      TripleDESCng: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateDecryptor: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateEncryptor: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GenerateIV: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GenerateKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryDecryptCbcCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryDecryptCfbCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryDecryptEcbCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryEncryptCbcCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryEncryptCfbCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryEncryptEcbCore: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      KeySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
});
export default Cryptography
