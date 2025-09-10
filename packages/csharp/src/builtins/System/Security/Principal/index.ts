import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type PrincipalLibrary = LibrarySymbolReference & {
  IIdentity: LibrarySymbolReference & {
    AuthenticationType: LibrarySymbolReference;
    IsAuthenticated: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  IPrincipal: LibrarySymbolReference & {
    IsInRole: LibrarySymbolReference;
    Identity: LibrarySymbolReference
  };
  PrincipalPolicy: LibrarySymbolReference & {
    UnauthenticatedPrincipal: LibrarySymbolReference;
    NoPrincipal: LibrarySymbolReference;
    WindowsPrincipal: LibrarySymbolReference
  };
  TokenImpersonationLevel: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Anonymous: LibrarySymbolReference;
    Identification: LibrarySymbolReference;
    Impersonation: LibrarySymbolReference;
    Delegation: LibrarySymbolReference
  }
};
const Principal: PrincipalLibrary = createLibrary("System.Security.Principal", {
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
});
export default Principal
