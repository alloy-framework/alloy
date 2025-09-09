import Collections from "../Collections/index.js";
import System from "../index.js";
import Reflection from "../Reflection/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Cryptography } from "./Cryptography/index.js";
export { default as Permissions } from "./Permissions/index.js";
export { default as Principal } from "./Principal/index.js";

type SecurityLibrary = LibrarySymbolReference & {
  AllowPartiallyTrustedCallersAttribute: LibrarySymbolReference & {
    AllowPartiallyTrustedCallersAttribute: LibrarySymbolReference;
    PartialTrustVisibilityLevel: LibrarySymbolReference
  };
  IPermission: LibrarySymbolReference & {
    Copy: LibrarySymbolReference;
    Demand: LibrarySymbolReference;
    Intersect: LibrarySymbolReference;
    IsSubsetOf: LibrarySymbolReference;
    Union: LibrarySymbolReference
  };
  ISecurityEncodable: LibrarySymbolReference & {
    FromXml: LibrarySymbolReference;
    ToXml: LibrarySymbolReference
  };
  IStackWalk: LibrarySymbolReference & {
    Assert: LibrarySymbolReference;
    Demand: LibrarySymbolReference;
    Deny: LibrarySymbolReference;
    PermitOnly: LibrarySymbolReference
  };
  PartialTrustVisibilityLevel: LibrarySymbolReference & {
    VisibleToAllHosts: LibrarySymbolReference;
    NotVisibleByDefault: LibrarySymbolReference
  };
  PermissionSet: LibrarySymbolReference & {
    PermissionSet: LibrarySymbolReference;
    AddPermission: LibrarySymbolReference;
    AddPermissionImpl: LibrarySymbolReference;
    Assert: LibrarySymbolReference;
    ContainsNonCodeAccessPermissions: LibrarySymbolReference;
    ConvertPermissionSet: LibrarySymbolReference;
    Copy: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Demand: LibrarySymbolReference;
    Deny: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    FromXml: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetEnumeratorImpl: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetPermission: LibrarySymbolReference;
    GetPermissionImpl: LibrarySymbolReference;
    Intersect: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference;
    IsSubsetOf: LibrarySymbolReference;
    IsUnrestricted: LibrarySymbolReference;
    PermitOnly: LibrarySymbolReference;
    RemovePermission: LibrarySymbolReference;
    RemovePermissionImpl: LibrarySymbolReference;
    RevertAssert: LibrarySymbolReference;
    SetPermission: LibrarySymbolReference;
    SetPermissionImpl: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ToXml: LibrarySymbolReference;
    Union: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  SecurityCriticalAttribute: LibrarySymbolReference & {
    SecurityCriticalAttribute: LibrarySymbolReference;
    Scope: LibrarySymbolReference
  };
  SecurityCriticalScope: LibrarySymbolReference & {
    Explicit: LibrarySymbolReference;
    Everything: LibrarySymbolReference
  };
  SecurityElement: LibrarySymbolReference & {
    SecurityElement: LibrarySymbolReference;
    AddAttribute: LibrarySymbolReference;
    AddChild: LibrarySymbolReference;
    Attribute: LibrarySymbolReference;
    Copy: LibrarySymbolReference;
    Equal: LibrarySymbolReference;
    Escape: LibrarySymbolReference;
    FromString: LibrarySymbolReference;
    IsValidAttributeName: LibrarySymbolReference;
    IsValidAttributeValue: LibrarySymbolReference;
    IsValidTag: LibrarySymbolReference;
    IsValidText: LibrarySymbolReference;
    SearchForChildByTag: LibrarySymbolReference;
    SearchForTextOfTag: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    Children: LibrarySymbolReference;
    Tag: LibrarySymbolReference;
    Text: LibrarySymbolReference
  };
  SecurityException: LibrarySymbolReference & {
    SecurityException: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Demanded: LibrarySymbolReference;
    DenySetInstance: LibrarySymbolReference;
    FailedAssemblyInfo: LibrarySymbolReference;
    GrantedSet: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    PermissionState: LibrarySymbolReference;
    PermissionType: LibrarySymbolReference;
    PermitOnlySetInstance: LibrarySymbolReference;
    RefusedSet: LibrarySymbolReference;
    Url: LibrarySymbolReference
  };
  SecurityRuleSet: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Level1: LibrarySymbolReference;
    Level2: LibrarySymbolReference
  };
  SecurityRulesAttribute: LibrarySymbolReference & {
    SecurityRulesAttribute: LibrarySymbolReference;
    RuleSet: LibrarySymbolReference;
    SkipVerificationInFullTrust: LibrarySymbolReference
  };
  SecuritySafeCriticalAttribute: LibrarySymbolReference & {
    SecuritySafeCriticalAttribute: LibrarySymbolReference
  };
  SecurityTransparentAttribute: LibrarySymbolReference & {
    SecurityTransparentAttribute: LibrarySymbolReference
  };
  SecurityTreatAsSafeAttribute: LibrarySymbolReference & {
    SecurityTreatAsSafeAttribute: LibrarySymbolReference
  };
  SuppressUnmanagedCodeSecurityAttribute: LibrarySymbolReference & {
    SuppressUnmanagedCodeSecurityAttribute: LibrarySymbolReference
  };
  UnverifiableCodeAttribute: LibrarySymbolReference & {
    UnverifiableCodeAttribute: LibrarySymbolReference
  };
  VerificationException: LibrarySymbolReference & {
    VerificationException: LibrarySymbolReference
  }
};
const Security: SecurityLibrary = createLibrary("System.Security", {
  AllowPartiallyTrustedCallersAttribute: {
    kind: "class",
    members: {
      AllowPartiallyTrustedCallersAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      PartialTrustVisibilityLevel: {
        kind: "property",
        type: () => {
          return Security.PartialTrustVisibilityLevel;
        },
      },
    },
    isSealed: true,
  },
  IPermission: {
    kind: "interface",
    members: {
      Copy: {
        kind: "method",
        methodKind: "ordinary",
      },
      Demand: {
        kind: "method",
        methodKind: "ordinary",
      },
      Intersect: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsSubsetOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Union: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISecurityEncodable: {
    kind: "interface",
    members: {
      FromXml: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToXml: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IStackWalk: {
    kind: "interface",
    members: {
      Assert: {
        kind: "method",
        methodKind: "ordinary",
      },
      Demand: {
        kind: "method",
        methodKind: "ordinary",
      },
      Deny: {
        kind: "method",
        methodKind: "ordinary",
      },
      PermitOnly: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  PartialTrustVisibilityLevel: {
    kind: "enum",
    members: {
      VisibleToAllHosts: {
        kind: "field",
        type: () => {
          return Security.PartialTrustVisibilityLevel;
        },
      },
      NotVisibleByDefault: {
        kind: "field",
        type: () => {
          return Security.PartialTrustVisibilityLevel;
        },
      },
    },
  },
  PermissionSet: {
    kind: "class",
    members: {
      PermissionSet: {
        kind: "method",
        methodKind: "constructor",
      },
      AddPermission: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddPermissionImpl: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Assert: {
        kind: "method",
        methodKind: "ordinary",
      },
      ContainsNonCodeAccessPermissions: {
        kind: "method",
        methodKind: "ordinary",
      },
      ConvertPermissionSet: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Copy: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Demand: {
        kind: "method",
        methodKind: "ordinary",
      },
      Deny: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FromXml: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumeratorImpl: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetPermission: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPermissionImpl: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Intersect: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEmpty: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsSubsetOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsUnrestricted: {
        kind: "method",
        methodKind: "ordinary",
      },
      PermitOnly: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemovePermission: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemovePermissionImpl: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RevertAssert: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetPermission: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetPermissionImpl: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToXml: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Union: {
        kind: "method",
        methodKind: "ordinary",
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
      IsSynchronized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isVirtual: true,
      },
    },
  },
  SecurityCriticalAttribute: {
    kind: "class",
    members: {
      SecurityCriticalAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Scope: {
        kind: "property",
        type: () => {
          return Security.SecurityCriticalScope;
        },
      },
    },
    isSealed: true,
  },
  SecurityCriticalScope: {
    kind: "enum",
    members: {
      Explicit: {
        kind: "field",
        type: () => {
          return Security.SecurityCriticalScope;
        },
      },
      Everything: {
        kind: "field",
        type: () => {
          return Security.SecurityCriticalScope;
        },
      },
    },
  },
  SecurityElement: {
    kind: "class",
    members: {
      SecurityElement: {
        kind: "method",
        methodKind: "constructor",
      },
      AddAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddChild: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      Copy: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equal: {
        kind: "method",
        methodKind: "ordinary",
      },
      Escape: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsValidAttributeName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsValidAttributeValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsValidTag: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsValidText: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SearchForChildByTag: {
        kind: "method",
        methodKind: "ordinary",
      },
      SearchForTextOfTag: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Collections.Hashtable;
        },
        isNullable: true,
      },
      Children: {
        kind: "property",
        type: () => {
          return Collections.ArrayList;
        },
        isNullable: true,
      },
      Tag: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Text: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  SecurityException: {
    kind: "class",
    members: {
      SecurityException: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Demanded: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      DenySetInstance: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      FailedAssemblyInfo: {
        kind: "property",
        type: () => {
          return Reflection.AssemblyName;
        },
        isNullable: true,
      },
      GrantedSet: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Method: {
        kind: "property",
        type: () => {
          return Reflection.MethodInfo;
        },
      },
      PermissionState: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      PermissionType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      PermitOnlySetInstance: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      RefusedSet: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Url: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  SecurityRuleSet: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Security.SecurityRuleSet;
        },
      },
      Level1: {
        kind: "field",
        type: () => {
          return Security.SecurityRuleSet;
        },
      },
      Level2: {
        kind: "field",
        type: () => {
          return Security.SecurityRuleSet;
        },
      },
    },
  },
  SecurityRulesAttribute: {
    kind: "class",
    members: {
      SecurityRulesAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      RuleSet: {
        kind: "property",
        type: () => {
          return Security.SecurityRuleSet;
        },
      },
      SkipVerificationInFullTrust: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  SecuritySafeCriticalAttribute: {
    kind: "class",
    members: {
      SecuritySafeCriticalAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  SecurityTransparentAttribute: {
    kind: "class",
    members: {
      SecurityTransparentAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  SecurityTreatAsSafeAttribute: {
    kind: "class",
    members: {
      SecurityTreatAsSafeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  SuppressUnmanagedCodeSecurityAttribute: {
    kind: "class",
    members: {
      SuppressUnmanagedCodeSecurityAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  UnverifiableCodeAttribute: {
    kind: "class",
    members: {
      UnverifiableCodeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  VerificationException: {
    kind: "class",
    members: {
      VerificationException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
});
export default Security
