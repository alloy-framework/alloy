import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type PermissionsLibrary = LibrarySymbolReference & {
  CodeAccessSecurityAttribute: LibrarySymbolReference & {
    CodeAccessSecurityAttribute: LibrarySymbolReference
  };
  PermissionState: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Unrestricted: LibrarySymbolReference
  };
  SecurityAction: LibrarySymbolReference & {
    Demand: LibrarySymbolReference;
    Assert: LibrarySymbolReference;
    Deny: LibrarySymbolReference;
    PermitOnly: LibrarySymbolReference;
    LinkDemand: LibrarySymbolReference;
    InheritanceDemand: LibrarySymbolReference;
    RequestMinimum: LibrarySymbolReference;
    RequestOptional: LibrarySymbolReference;
    RequestRefuse: LibrarySymbolReference
  };
  SecurityAttribute: LibrarySymbolReference & {
    SecurityAttribute: LibrarySymbolReference;
    CreatePermission: LibrarySymbolReference;
    Action: LibrarySymbolReference;
    Unrestricted: LibrarySymbolReference
  };
  SecurityPermissionAttribute: LibrarySymbolReference & {
    SecurityPermissionAttribute: LibrarySymbolReference;
    CreatePermission: LibrarySymbolReference;
    Assertion: LibrarySymbolReference;
    BindingRedirects: LibrarySymbolReference;
    ControlAppDomain: LibrarySymbolReference;
    ControlDomainPolicy: LibrarySymbolReference;
    ControlEvidence: LibrarySymbolReference;
    ControlPolicy: LibrarySymbolReference;
    ControlPrincipal: LibrarySymbolReference;
    ControlThread: LibrarySymbolReference;
    Execution: LibrarySymbolReference;
    Flags: LibrarySymbolReference;
    Infrastructure: LibrarySymbolReference;
    RemotingConfiguration: LibrarySymbolReference;
    SerializationFormatter: LibrarySymbolReference;
    SkipVerification: LibrarySymbolReference;
    UnmanagedCode: LibrarySymbolReference
  };
  SecurityPermissionFlag: LibrarySymbolReference & {
    NoFlags: LibrarySymbolReference;
    Assertion: LibrarySymbolReference;
    UnmanagedCode: LibrarySymbolReference;
    SkipVerification: LibrarySymbolReference;
    Execution: LibrarySymbolReference;
    ControlThread: LibrarySymbolReference;
    ControlEvidence: LibrarySymbolReference;
    ControlPolicy: LibrarySymbolReference;
    SerializationFormatter: LibrarySymbolReference;
    ControlDomainPolicy: LibrarySymbolReference;
    ControlPrincipal: LibrarySymbolReference;
    ControlAppDomain: LibrarySymbolReference;
    RemotingConfiguration: LibrarySymbolReference;
    Infrastructure: LibrarySymbolReference;
    BindingRedirects: LibrarySymbolReference;
    AllFlags: LibrarySymbolReference
  }
};
const Permissions: PermissionsLibrary = createLibrary("System.Security.Permissions", {
  CodeAccessSecurityAttribute: {
    kind: "class",
    members: {
      CodeAccessSecurityAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isAbstract: true,
  },
  PermissionState: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Permissions.PermissionState;
        },
      },
      Unrestricted: {
        kind: "field",
        type: () => {
          return Permissions.PermissionState;
        },
      },
    },
  },
  SecurityAction: {
    kind: "enum",
    members: {
      Demand: {
        kind: "field",
        type: () => {
          return Permissions.SecurityAction;
        },
      },
      Assert: {
        kind: "field",
        type: () => {
          return Permissions.SecurityAction;
        },
      },
      Deny: {
        kind: "field",
        type: () => {
          return Permissions.SecurityAction;
        },
      },
      PermitOnly: {
        kind: "field",
        type: () => {
          return Permissions.SecurityAction;
        },
      },
      LinkDemand: {
        kind: "field",
        type: () => {
          return Permissions.SecurityAction;
        },
      },
      InheritanceDemand: {
        kind: "field",
        type: () => {
          return Permissions.SecurityAction;
        },
      },
      RequestMinimum: {
        kind: "field",
        type: () => {
          return Permissions.SecurityAction;
        },
      },
      RequestOptional: {
        kind: "field",
        type: () => {
          return Permissions.SecurityAction;
        },
      },
      RequestRefuse: {
        kind: "field",
        type: () => {
          return Permissions.SecurityAction;
        },
      },
    },
  },
  SecurityAttribute: {
    kind: "class",
    members: {
      SecurityAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      CreatePermission: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Action: {
        kind: "property",
        type: () => {
          return Permissions.SecurityAction;
        },
      },
      Unrestricted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isAbstract: true,
  },
  SecurityPermissionAttribute: {
    kind: "class",
    members: {
      SecurityPermissionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      CreatePermission: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Assertion: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      BindingRedirects: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ControlAppDomain: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ControlDomainPolicy: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ControlEvidence: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ControlPolicy: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ControlPrincipal: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ControlThread: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Execution: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Flags: {
        kind: "property",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      Infrastructure: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      RemotingConfiguration: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SerializationFormatter: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SkipVerification: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      UnmanagedCode: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  SecurityPermissionFlag: {
    kind: "enum",
    members: {
      NoFlags: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      Assertion: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      UnmanagedCode: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      SkipVerification: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      Execution: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      ControlThread: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      ControlEvidence: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      ControlPolicy: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      SerializationFormatter: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      ControlDomainPolicy: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      ControlPrincipal: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      ControlAppDomain: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      RemotingConfiguration: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      Infrastructure: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      BindingRedirects: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
      AllFlags: {
        kind: "field",
        type: () => {
          return Permissions.SecurityPermissionFlag;
        },
      },
    },
  },
});
export default Permissions
