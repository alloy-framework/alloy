import Generic from "../../Collections/Generic/index.js";
import System from "../../index.js";
import Principal from "../Principal/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ClaimsLibrary = LibrarySymbolReference & {
  Claim: LibrarySymbolReference & {
    Claim: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    CustomSerializationData: LibrarySymbolReference;
    Issuer: LibrarySymbolReference;
    OriginalIssuer: LibrarySymbolReference;
    Properties: LibrarySymbolReference;
    Subject: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    Value: LibrarySymbolReference;
    ValueType: LibrarySymbolReference
  };
  ClaimTypes: LibrarySymbolReference & {
    Actor: LibrarySymbolReference;
    Anonymous: LibrarySymbolReference;
    Authentication: LibrarySymbolReference;
    AuthenticationInstant: LibrarySymbolReference;
    AuthenticationMethod: LibrarySymbolReference;
    AuthorizationDecision: LibrarySymbolReference;
    CookiePath: LibrarySymbolReference;
    Country: LibrarySymbolReference;
    DateOfBirth: LibrarySymbolReference;
    DenyOnlyPrimaryGroupSid: LibrarySymbolReference;
    DenyOnlyPrimarySid: LibrarySymbolReference;
    DenyOnlySid: LibrarySymbolReference;
    DenyOnlyWindowsDeviceGroup: LibrarySymbolReference;
    Dns: LibrarySymbolReference;
    Dsa: LibrarySymbolReference;
    Email: LibrarySymbolReference;
    Expiration: LibrarySymbolReference;
    Expired: LibrarySymbolReference;
    Gender: LibrarySymbolReference;
    GivenName: LibrarySymbolReference;
    GroupSid: LibrarySymbolReference;
    Hash: LibrarySymbolReference;
    HomePhone: LibrarySymbolReference;
    IsPersistent: LibrarySymbolReference;
    Locality: LibrarySymbolReference;
    MobilePhone: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NameIdentifier: LibrarySymbolReference;
    OtherPhone: LibrarySymbolReference;
    PostalCode: LibrarySymbolReference;
    PrimaryGroupSid: LibrarySymbolReference;
    PrimarySid: LibrarySymbolReference;
    Role: LibrarySymbolReference;
    Rsa: LibrarySymbolReference;
    SerialNumber: LibrarySymbolReference;
    Sid: LibrarySymbolReference;
    Spn: LibrarySymbolReference;
    StateOrProvince: LibrarySymbolReference;
    StreetAddress: LibrarySymbolReference;
    Surname: LibrarySymbolReference;
    System: LibrarySymbolReference;
    Thumbprint: LibrarySymbolReference;
    Upn: LibrarySymbolReference;
    Uri: LibrarySymbolReference;
    UserData: LibrarySymbolReference;
    Version: LibrarySymbolReference;
    Webpage: LibrarySymbolReference;
    WindowsAccountName: LibrarySymbolReference;
    WindowsDeviceClaim: LibrarySymbolReference;
    WindowsDeviceGroup: LibrarySymbolReference;
    WindowsFqbnVersion: LibrarySymbolReference;
    WindowsSubAuthority: LibrarySymbolReference;
    WindowsUserClaim: LibrarySymbolReference;
    X500DistinguishedName: LibrarySymbolReference
  };
  ClaimValueTypes: LibrarySymbolReference & {
    Base64Binary: LibrarySymbolReference;
    Base64Octet: LibrarySymbolReference;
    Boolean: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    DateTime: LibrarySymbolReference;
    DaytimeDuration: LibrarySymbolReference;
    DnsName: LibrarySymbolReference;
    Double: LibrarySymbolReference;
    DsaKeyValue: LibrarySymbolReference;
    Email: LibrarySymbolReference;
    Fqbn: LibrarySymbolReference;
    HexBinary: LibrarySymbolReference;
    Integer: LibrarySymbolReference;
    Integer32: LibrarySymbolReference;
    Integer64: LibrarySymbolReference;
    KeyInfo: LibrarySymbolReference;
    Rfc822Name: LibrarySymbolReference;
    Rsa: LibrarySymbolReference;
    RsaKeyValue: LibrarySymbolReference;
    Sid: LibrarySymbolReference;
    String: LibrarySymbolReference;
    Time: LibrarySymbolReference;
    UInteger32: LibrarySymbolReference;
    UInteger64: LibrarySymbolReference;
    UpnName: LibrarySymbolReference;
    X500Name: LibrarySymbolReference;
    YearMonthDuration: LibrarySymbolReference
  };
  ClaimsIdentity: LibrarySymbolReference & {
    DefaultIssuer: LibrarySymbolReference;
    DefaultNameClaimType: LibrarySymbolReference;
    DefaultRoleClaimType: LibrarySymbolReference;
    ClaimsIdentity: LibrarySymbolReference;
    AddClaim: LibrarySymbolReference;
    AddClaims: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    CreateClaim: LibrarySymbolReference;
    FindAll: LibrarySymbolReference;
    FindFirst: LibrarySymbolReference;
    GetObjectData: LibrarySymbolReference;
    HasClaim: LibrarySymbolReference;
    RemoveClaim: LibrarySymbolReference;
    TryRemoveClaim: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    Actor: LibrarySymbolReference;
    AuthenticationType: LibrarySymbolReference;
    BootstrapContext: LibrarySymbolReference;
    Claims: LibrarySymbolReference;
    CustomSerializationData: LibrarySymbolReference;
    IsAuthenticated: LibrarySymbolReference;
    Label: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NameClaimType: LibrarySymbolReference;
    RoleClaimType: LibrarySymbolReference
  };
  ClaimsPrincipal: LibrarySymbolReference & {
    ClaimsPrincipal: LibrarySymbolReference;
    AddIdentities: LibrarySymbolReference;
    AddIdentity: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    CreateClaimsIdentity: LibrarySymbolReference;
    FindAll: LibrarySymbolReference;
    FindFirst: LibrarySymbolReference;
    GetObjectData: LibrarySymbolReference;
    HasClaim: LibrarySymbolReference;
    IsInRole: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    Claims: LibrarySymbolReference;
    ClaimsPrincipalSelector: LibrarySymbolReference;
    Current: LibrarySymbolReference;
    CustomSerializationData: LibrarySymbolReference;
    Identities: LibrarySymbolReference;
    Identity: LibrarySymbolReference;
    PrimaryIdentitySelector: LibrarySymbolReference
  }
};
const Claims: ClaimsLibrary = createLibrary("System.Security.Claims", {
  Claim: {
    kind: "class",
    members: {
      Claim: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CustomSerializationData: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
        isVirtual: true,
      },
      Issuer: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      OriginalIssuer: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Properties: {
        kind: "property",
        type: () => {
          return Generic.IDictionary;
        },
      },
      Subject: {
        kind: "property",
        type: () => {
          return Claims.ClaimsIdentity;
        },
        isNullable: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ValueType: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  ClaimTypes: {
    kind: "class",
    members: {
      Actor: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Anonymous: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Authentication: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      AuthenticationInstant: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      AuthenticationMethod: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      AuthorizationDecision: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      CookiePath: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Country: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DateOfBirth: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DenyOnlyPrimaryGroupSid: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DenyOnlyPrimarySid: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DenyOnlySid: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DenyOnlyWindowsDeviceGroup: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Dns: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Dsa: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Email: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Expiration: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Expired: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Gender: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      GivenName: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      GroupSid: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Hash: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      HomePhone: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      IsPersistent: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Locality: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      MobilePhone: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Name: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      NameIdentifier: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      OtherPhone: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      PostalCode: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      PrimaryGroupSid: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      PrimarySid: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Role: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Rsa: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      SerialNumber: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Sid: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Spn: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      StateOrProvince: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      StreetAddress: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Surname: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      System: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Thumbprint: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Upn: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Uri: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      UserData: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Version: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Webpage: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      WindowsAccountName: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      WindowsDeviceClaim: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      WindowsDeviceGroup: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      WindowsFqbnVersion: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      WindowsSubAuthority: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      WindowsUserClaim: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      X500DistinguishedName: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
    },
    isStatic: true,
  },
  ClaimValueTypes: {
    kind: "class",
    members: {
      Base64Binary: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Base64Octet: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Boolean: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Date: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DateTime: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DaytimeDuration: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DnsName: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Double: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DsaKeyValue: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Email: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Fqbn: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      HexBinary: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Integer: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Integer32: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Integer64: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      KeyInfo: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Rfc822Name: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Rsa: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      RsaKeyValue: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Sid: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Time: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      UInteger32: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      UInteger64: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      UpnName: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      X500Name: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      YearMonthDuration: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
    },
    isStatic: true,
  },
  ClaimsIdentity: {
    kind: "class",
    members: {
      DefaultIssuer: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DefaultNameClaimType: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DefaultRoleClaimType: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      ClaimsIdentity: {
        kind: "method",
        methodKind: "constructor",
      },
      AddClaim: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddClaims: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateClaim: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      FindAll: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      FindFirst: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetObjectData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      HasClaim: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveClaim: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryRemoveClaim: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Actor: {
        kind: "property",
        type: () => {
          return Claims.ClaimsIdentity;
        },
        isNullable: true,
      },
      AuthenticationType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      BootstrapContext: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      Claims: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      CustomSerializationData: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
        isVirtual: true,
      },
      IsAuthenticated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Label: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      NameClaimType: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      RoleClaimType: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  ClaimsPrincipal: {
    kind: "class",
    members: {
      ClaimsPrincipal: {
        kind: "method",
        methodKind: "constructor",
      },
      AddIdentities: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddIdentity: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateClaimsIdentity: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      FindAll: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      FindFirst: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetObjectData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      HasClaim: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsInRole: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Claims: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isVirtual: true,
      },
      ClaimsPrincipalSelector: {
        kind: "property",
        type: () => {
          return System.Func;
        },
        isStatic: true,
      },
      Current: {
        kind: "property",
        type: () => {
          return Claims.ClaimsPrincipal;
        },
        isNullable: true,
        isStatic: true,
      },
      CustomSerializationData: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
        isVirtual: true,
      },
      Identities: {
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
        isVirtual: true,
      },
      PrimaryIdentitySelector: {
        kind: "property",
        type: () => {
          return System.Func;
        },
        isStatic: true,
      },
    },
  },
});
export default Claims
