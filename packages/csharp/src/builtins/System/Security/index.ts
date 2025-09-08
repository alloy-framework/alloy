import Collections from "../Collections/index.js";
import System from "../index.js";
import Reflection from "../Reflection/index.js";

import { createLibrary } from "#createLibrary";
export { default as Cryptography } from "./Cryptography/index.js";
export { default as Permissions } from "./Permissions/index.js";
export { default as Principal } from "./Principal/index.js";

const Security = createLibrary("System.Security", {
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
