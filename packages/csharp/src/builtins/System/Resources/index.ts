import System from "../index.js";
import Reflection from "../Reflection/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ResourcesLibrary = LibrarySymbolReference & {
  IResourceReader: LibrarySymbolReference & {
    Close: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference
  };
  MissingSatelliteAssemblyException: LibrarySymbolReference & {
    MissingSatelliteAssemblyException: LibrarySymbolReference;
    CultureName: LibrarySymbolReference
  };
  ResourceManager: LibrarySymbolReference & {
    HeaderVersionNumber: LibrarySymbolReference;
    MagicNumber: LibrarySymbolReference;
    MainAssembly: LibrarySymbolReference;
    ResourceManager: LibrarySymbolReference;
    CreateFileBasedResourceManager: LibrarySymbolReference;
    GetNeutralResourcesLanguage: LibrarySymbolReference;
    GetObject: LibrarySymbolReference;
    GetResourceFileName: LibrarySymbolReference;
    GetResourceSet: LibrarySymbolReference;
    GetSatelliteContractVersion: LibrarySymbolReference;
    GetStream: LibrarySymbolReference;
    GetString: LibrarySymbolReference;
    InternalGetResourceSet: LibrarySymbolReference;
    ReleaseAllResources: LibrarySymbolReference;
    BaseName: LibrarySymbolReference;
    FallbackLocation: LibrarySymbolReference;
    IgnoreCase: LibrarySymbolReference;
    ResourceSetType: LibrarySymbolReference
  };
  ResourceReader: LibrarySymbolReference & {
    ResourceReader: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetResourceData: LibrarySymbolReference
  };
  ResourceSet: LibrarySymbolReference & {
    ResourceSet: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetDefaultReader: LibrarySymbolReference;
    GetDefaultWriter: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetObject: LibrarySymbolReference;
    GetString: LibrarySymbolReference;
    ReadResources: LibrarySymbolReference
  };
  UltimateResourceFallbackLocation: LibrarySymbolReference & {
    MainAssembly: LibrarySymbolReference;
    Satellite: LibrarySymbolReference
  }
};
const Resources: ResourcesLibrary = createLibrary("System.Resources", {
  IResourceReader: {
    kind: "interface",
    members: {
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  MissingSatelliteAssemblyException: {
    kind: "class",
    members: {
      MissingSatelliteAssemblyException: {
        kind: "method",
        methodKind: "constructor",
      },
      CultureName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  ResourceManager: {
    kind: "class",
    members: {
      HeaderVersionNumber: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MagicNumber: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MainAssembly: {
        kind: "field",
        type: () => {
          return Reflection.Assembly;
        },
        isNullable: true,
      },
      ResourceManager: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateFileBasedResourceManager: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetNeutralResourcesLanguage: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetObject: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetResourceFileName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetResourceSet: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSatelliteContractVersion: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetStream: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      InternalGetResourceSet: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReleaseAllResources: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BaseName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      FallbackLocation: {
        kind: "property",
        type: () => {
          return Resources.UltimateResourceFallbackLocation;
        },
      },
      IgnoreCase: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      ResourceSetType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isVirtual: true,
      },
    },
  },
  ResourceReader: {
    kind: "class",
    members: {
      ResourceReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetResourceData: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  ResourceSet: {
    kind: "class",
    members: {
      ResourceSet: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDefaultReader: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetDefaultWriter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetObject: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadResources: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  UltimateResourceFallbackLocation: {
    kind: "enum",
    members: {
      MainAssembly: {
        kind: "field",
        type: () => {
          return Resources.UltimateResourceFallbackLocation;
        },
      },
      Satellite: {
        kind: "field",
        type: () => {
          return Resources.UltimateResourceFallbackLocation;
        },
      },
    },
  },
});
export default Resources
