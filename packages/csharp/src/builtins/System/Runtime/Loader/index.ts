import Generic from "../../Collections/Generic/index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type LoaderLibrary = LibrarySymbolReference & {
  AssemblyDependencyResolver: LibrarySymbolReference & {
    AssemblyDependencyResolver: LibrarySymbolReference;
    ResolveAssemblyToPath: LibrarySymbolReference;
    ResolveUnmanagedDllToPath: LibrarySymbolReference
  };
  AssemblyLoadContext: LibrarySymbolReference & {
    AssemblyLoadContext: LibrarySymbolReference;
    EnterContextualReflection: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    GetAssemblyName: LibrarySymbolReference;
    GetLoadContext: LibrarySymbolReference;
    Load: LibrarySymbolReference;
    LoadFromAssemblyName: LibrarySymbolReference;
    LoadFromAssemblyPath: LibrarySymbolReference;
    LoadFromNativeImagePath: LibrarySymbolReference;
    LoadFromStream: LibrarySymbolReference;
    LoadUnmanagedDll: LibrarySymbolReference;
    LoadUnmanagedDllFromPath: LibrarySymbolReference;
    SetProfileOptimizationRoot: LibrarySymbolReference;
    StartProfileOptimization: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Unload: LibrarySymbolReference;
    All: LibrarySymbolReference;
    Assemblies: LibrarySymbolReference;
    CurrentContextualReflectionContext: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    IsCollectible: LibrarySymbolReference;
    Name: LibrarySymbolReference
  }
};
const Loader: LoaderLibrary = createLibrary("System.Runtime.Loader", {
  AssemblyDependencyResolver: {
    kind: "class",
    members: {
      AssemblyDependencyResolver: {
        kind: "method",
        methodKind: "constructor",
      },
      ResolveAssemblyToPath: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResolveUnmanagedDllToPath: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  AssemblyLoadContext: {
    kind: "class",
    members: {
      AssemblyLoadContext: {
        kind: "method",
        methodKind: "constructor",
      },
      EnterContextualReflection: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAssemblyName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLoadContext: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Load: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      LoadFromAssemblyName: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadFromAssemblyPath: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadFromNativeImagePath: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadFromStream: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadUnmanagedDll: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      LoadUnmanagedDllFromPath: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetProfileOptimizationRoot: {
        kind: "method",
        methodKind: "ordinary",
      },
      StartProfileOptimization: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Unload: {
        kind: "method",
        methodKind: "ordinary",
      },
      All: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isStatic: true,
      },
      Assemblies: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
      },
      CurrentContextualReflectionContext: {
        kind: "property",
        type: () => {
          return Loader.AssemblyLoadContext;
        },
        isNullable: true,
        isStatic: true,
      },
      Default: {
        kind: "property",
        type: () => {
          return Loader.AssemblyLoadContext;
        },
        isStatic: true,
      },
      IsCollectible: {
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
});
export default Loader
