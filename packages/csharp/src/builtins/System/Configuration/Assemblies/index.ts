import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type AssembliesLibrary = LibrarySymbolReference & {
  AssemblyHashAlgorithm: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    MD5: LibrarySymbolReference;
    SHA1: LibrarySymbolReference;
    SHA256: LibrarySymbolReference;
    SHA384: LibrarySymbolReference;
    SHA512: LibrarySymbolReference
  };
  AssemblyVersionCompatibility: LibrarySymbolReference & {
    SameMachine: LibrarySymbolReference;
    SameProcess: LibrarySymbolReference;
    SameDomain: LibrarySymbolReference
  }
};
const Assemblies: AssembliesLibrary = createLibrary("System.Configuration.Assemblies", {
  AssemblyHashAlgorithm: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Assemblies.AssemblyHashAlgorithm;
        },
      },
      MD5: {
        kind: "field",
        type: () => {
          return Assemblies.AssemblyHashAlgorithm;
        },
      },
      SHA1: {
        kind: "field",
        type: () => {
          return Assemblies.AssemblyHashAlgorithm;
        },
      },
      SHA256: {
        kind: "field",
        type: () => {
          return Assemblies.AssemblyHashAlgorithm;
        },
      },
      SHA384: {
        kind: "field",
        type: () => {
          return Assemblies.AssemblyHashAlgorithm;
        },
      },
      SHA512: {
        kind: "field",
        type: () => {
          return Assemblies.AssemblyHashAlgorithm;
        },
      },
    },
  },
  AssemblyVersionCompatibility: {
    kind: "enum",
    members: {
      SameMachine: {
        kind: "field",
        type: () => {
          return Assemblies.AssemblyVersionCompatibility;
        },
      },
      SameProcess: {
        kind: "field",
        type: () => {
          return Assemblies.AssemblyVersionCompatibility;
        },
      },
      SameDomain: {
        kind: "field",
        type: () => {
          return Assemblies.AssemblyVersionCompatibility;
        },
      },
    },
  },
});
export default Assemblies
