import System from "../../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Binary } from "./Binary/index.js";

type FormattersLibrary = LibrarySymbolReference & {
  FormatterAssemblyStyle: LibrarySymbolReference & {
    Simple: LibrarySymbolReference;
    Full: LibrarySymbolReference
  };
  FormatterTypeStyle: LibrarySymbolReference & {
    TypesWhenNeeded: LibrarySymbolReference;
    TypesAlways: LibrarySymbolReference;
    XsdString: LibrarySymbolReference
  };
  IFieldInfo: LibrarySymbolReference & {
    FieldNames: LibrarySymbolReference;
    FieldTypes: LibrarySymbolReference
  };
  TypeFilterLevel: LibrarySymbolReference & {
    Low: LibrarySymbolReference;
    Full: LibrarySymbolReference
  }
};
const Formatters: FormattersLibrary = createLibrary("System.Runtime.Serialization.Formatters", {
  FormatterAssemblyStyle: {
    kind: "enum",
    members: {
      Simple: {
        kind: "field",
        type: () => {
          return Formatters.FormatterAssemblyStyle;
        },
      },
      Full: {
        kind: "field",
        type: () => {
          return Formatters.FormatterAssemblyStyle;
        },
      },
    },
  },
  FormatterTypeStyle: {
    kind: "enum",
    members: {
      TypesWhenNeeded: {
        kind: "field",
        type: () => {
          return Formatters.FormatterTypeStyle;
        },
      },
      TypesAlways: {
        kind: "field",
        type: () => {
          return Formatters.FormatterTypeStyle;
        },
      },
      XsdString: {
        kind: "field",
        type: () => {
          return Formatters.FormatterTypeStyle;
        },
      },
    },
  },
  IFieldInfo: {
    kind: "interface",
    members: {
      FieldNames: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      FieldTypes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
    },
  },
  TypeFilterLevel: {
    kind: "enum",
    members: {
      Low: {
        kind: "field",
        type: () => {
          return Formatters.TypeFilterLevel;
        },
      },
      Full: {
        kind: "field",
        type: () => {
          return Formatters.TypeFilterLevel;
        },
      },
    },
  },
});
export default Formatters
