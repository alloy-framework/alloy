import System from "../../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ExtendedProtectionLibrary = LibrarySymbolReference & {
  ChannelBinding: LibrarySymbolReference & {
    ChannelBinding: LibrarySymbolReference;
    Size: LibrarySymbolReference
  };
  ChannelBindingKind: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Unique: LibrarySymbolReference;
    Endpoint: LibrarySymbolReference
  };
  ExtendedProtectionPolicy: LibrarySymbolReference & {
    ExtendedProtectionPolicy: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    CustomChannelBinding: LibrarySymbolReference;
    CustomServiceNames: LibrarySymbolReference;
    OSSupportsExtendedProtection: LibrarySymbolReference;
    PolicyEnforcement: LibrarySymbolReference;
    ProtectionScenario: LibrarySymbolReference
  };
  ExtendedProtectionPolicyTypeConverter: LibrarySymbolReference & {
    ExtendedProtectionPolicyTypeConverter: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference
  };
  PolicyEnforcement: LibrarySymbolReference & {
    Never: LibrarySymbolReference;
    WhenSupported: LibrarySymbolReference;
    Always: LibrarySymbolReference
  };
  ProtectionScenario: LibrarySymbolReference & {
    TransportSelected: LibrarySymbolReference;
    TrustedProxy: LibrarySymbolReference
  };
  ServiceNameCollection: LibrarySymbolReference & {
    ServiceNameCollection: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    Merge: LibrarySymbolReference
  }
};
const ExtendedProtection: ExtendedProtectionLibrary = createLibrary("System.Security.Authentication.ExtendedProtection", {
  ChannelBinding: {
    kind: "class",
    members: {
      ChannelBinding: {
        kind: "method",
        methodKind: "constructor",
      },
      Size: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  ChannelBindingKind: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return ExtendedProtection.ChannelBindingKind;
        },
      },
      Unique: {
        kind: "field",
        type: () => {
          return ExtendedProtection.ChannelBindingKind;
        },
      },
      Endpoint: {
        kind: "field",
        type: () => {
          return ExtendedProtection.ChannelBindingKind;
        },
      },
    },
  },
  ExtendedProtectionPolicy: {
    kind: "class",
    members: {
      ExtendedProtectionPolicy: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CustomChannelBinding: {
        kind: "property",
        type: () => {
          return ExtendedProtection.ChannelBinding;
        },
        isNullable: true,
      },
      CustomServiceNames: {
        kind: "property",
        type: () => {
          return ExtendedProtection.ServiceNameCollection;
        },
        isNullable: true,
      },
      OSSupportsExtendedProtection: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      PolicyEnforcement: {
        kind: "property",
        type: () => {
          return ExtendedProtection.PolicyEnforcement;
        },
      },
      ProtectionScenario: {
        kind: "property",
        type: () => {
          return ExtendedProtection.ProtectionScenario;
        },
      },
    },
  },
  ExtendedProtectionPolicyTypeConverter: {
    kind: "class",
    members: {
      ExtendedProtectionPolicyTypeConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  PolicyEnforcement: {
    kind: "enum",
    members: {
      Never: {
        kind: "field",
        type: () => {
          return ExtendedProtection.PolicyEnforcement;
        },
      },
      WhenSupported: {
        kind: "field",
        type: () => {
          return ExtendedProtection.PolicyEnforcement;
        },
      },
      Always: {
        kind: "field",
        type: () => {
          return ExtendedProtection.PolicyEnforcement;
        },
      },
    },
  },
  ProtectionScenario: {
    kind: "enum",
    members: {
      TransportSelected: {
        kind: "field",
        type: () => {
          return ExtendedProtection.ProtectionScenario;
        },
      },
      TrustedProxy: {
        kind: "field",
        type: () => {
          return ExtendedProtection.ProtectionScenario;
        },
      },
    },
  },
  ServiceNameCollection: {
    kind: "class",
    members: {
      ServiceNameCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      Merge: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
});
export default ExtendedProtection
