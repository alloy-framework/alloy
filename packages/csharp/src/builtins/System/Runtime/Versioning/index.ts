import System from "../../index.js";

import { createLibrary } from "#createLibrary";


const Versioning = createLibrary("System.Runtime.Versioning", {
  ComponentGuaranteesAttribute: {
    kind: "class",
    members: {
      ComponentGuaranteesAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Guarantees: {
        kind: "property",
        type: () => {
          return Versioning.ComponentGuaranteesOptions;
        },
      },
    },
    isSealed: true,
  },
  ComponentGuaranteesOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Versioning.ComponentGuaranteesOptions;
        },
      },
      Exchange: {
        kind: "field",
        type: () => {
          return Versioning.ComponentGuaranteesOptions;
        },
      },
      Stable: {
        kind: "field",
        type: () => {
          return Versioning.ComponentGuaranteesOptions;
        },
      },
      SideBySide: {
        kind: "field",
        type: () => {
          return Versioning.ComponentGuaranteesOptions;
        },
      },
    },
  },
  FrameworkName: {
    kind: "class",
    members: {
      FrameworkName: {
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
      FullName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Identifier: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Profile: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Version: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
    },
    isSealed: true,
  },
  OSPlatformAttribute: {
    kind: "class",
    members: {
      PlatformName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isAbstract: true,
  },
  ObsoletedOSPlatformAttribute: {
    kind: "class",
    members: {
      ObsoletedOSPlatformAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Message: {
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
    isSealed: true,
  },
  RequiresPreviewFeaturesAttribute: {
    kind: "class",
    members: {
      RequiresPreviewFeaturesAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Message: {
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
    isSealed: true,
  },
  ResourceConsumptionAttribute: {
    kind: "class",
    members: {
      ResourceConsumptionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ConsumptionScope: {
        kind: "property",
        type: () => {
          return Versioning.ResourceScope;
        },
      },
      ResourceScope: {
        kind: "property",
        type: () => {
          return Versioning.ResourceScope;
        },
      },
    },
    isSealed: true,
  },
  ResourceExposureAttribute: {
    kind: "class",
    members: {
      ResourceExposureAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ResourceExposureLevel: {
        kind: "property",
        type: () => {
          return Versioning.ResourceScope;
        },
      },
    },
    isSealed: true,
  },
  ResourceScope: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Versioning.ResourceScope;
        },
      },
      Machine: {
        kind: "field",
        type: () => {
          return Versioning.ResourceScope;
        },
      },
      Process: {
        kind: "field",
        type: () => {
          return Versioning.ResourceScope;
        },
      },
      AppDomain: {
        kind: "field",
        type: () => {
          return Versioning.ResourceScope;
        },
      },
      Library: {
        kind: "field",
        type: () => {
          return Versioning.ResourceScope;
        },
      },
      Private: {
        kind: "field",
        type: () => {
          return Versioning.ResourceScope;
        },
      },
      Assembly: {
        kind: "field",
        type: () => {
          return Versioning.ResourceScope;
        },
      },
    },
  },
  SupportedOSPlatformAttribute: {
    kind: "class",
    members: {
      SupportedOSPlatformAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  SupportedOSPlatformGuardAttribute: {
    kind: "class",
    members: {
      SupportedOSPlatformGuardAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  TargetFrameworkAttribute: {
    kind: "class",
    members: {
      TargetFrameworkAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      FrameworkDisplayName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      FrameworkName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  TargetPlatformAttribute: {
    kind: "class",
    members: {
      TargetPlatformAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  UnsupportedOSPlatformAttribute: {
    kind: "class",
    members: {
      UnsupportedOSPlatformAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  UnsupportedOSPlatformGuardAttribute: {
    kind: "class",
    members: {
      UnsupportedOSPlatformGuardAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  VersioningHelper: {
    kind: "class",
    members: {
      MakeVersionSafeName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Versioning
