import System from "../../index.js";

import { createLibrary } from "#createLibrary";


const Permissions = createLibrary("System.Security.Permissions", {
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
