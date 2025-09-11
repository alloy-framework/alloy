import Formatters from "../index.js";
import Serialization from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type BinaryLibrary = LibrarySymbolReference & {
  BinaryFormatter: LibrarySymbolReference & {
    BinaryFormatter: LibrarySymbolReference;
    Deserialize: LibrarySymbolReference;
    Serialize: LibrarySymbolReference;
    AssemblyFormat: LibrarySymbolReference;
    Binder: LibrarySymbolReference;
    Context: LibrarySymbolReference;
    FilterLevel: LibrarySymbolReference;
    SurrogateSelector: LibrarySymbolReference;
    TypeFormat: LibrarySymbolReference
  }
};
const Binary: BinaryLibrary = createLibrary("System.Runtime.Serialization.Formatters.Binary", {
  BinaryFormatter: {
    kind: "class",
    members: {
      BinaryFormatter: {
        kind: "method",
        methodKind: "constructor",
      },
      Deserialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      Serialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      AssemblyFormat: {
        kind: "property",
        type: () => {
          return Formatters.FormatterAssemblyStyle;
        },
      },
      Binder: {
        kind: "property",
        type: () => {
          return Serialization.SerializationBinder;
        },
      },
      Context: {
        kind: "property",
        type: () => {
          return Serialization.StreamingContext;
        },
      },
      FilterLevel: {
        kind: "property",
        type: () => {
          return Formatters.TypeFilterLevel;
        },
      },
      SurrogateSelector: {
        kind: "property",
        type: () => {
          return Serialization.ISurrogateSelector;
        },
      },
      TypeFormat: {
        kind: "property",
        type: () => {
          return Formatters.FormatterTypeStyle;
        },
      },
    },
    isSealed: true,
  },
});
export default Binary
