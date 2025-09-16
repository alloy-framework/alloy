import System from "../../../index.js";
import Metadata from "../Serialization/Metadata/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type SchemaLibrary = LibrarySymbolReference & {
  JsonSchemaExporter: LibrarySymbolReference & {
    GetJsonSchemaAsNode: LibrarySymbolReference
  };
  JsonSchemaExporterContext: LibrarySymbolReference & {
    BaseTypeInfo: LibrarySymbolReference;
    PropertyInfo: LibrarySymbolReference;
    Path: LibrarySymbolReference;
    TypeInfo: LibrarySymbolReference
  };
  JsonSchemaExporterOptions: LibrarySymbolReference & {
    JsonSchemaExporterOptions: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    TransformSchemaNode: LibrarySymbolReference;
    TreatNullObliviousAsNonNullable: LibrarySymbolReference
  }
};
const Schema: SchemaLibrary = createLibrary("System.Text.Json.Schema", {
  JsonSchemaExporter: {
    kind: "class",
    members: {
      GetJsonSchemaAsNode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  JsonSchemaExporterContext: {
    kind: "struct",
    members: {
      BaseTypeInfo: {
        kind: "property",
        type: () => {
          return Metadata.JsonTypeInfo;
        },
        isNullable: true,
      },
      PropertyInfo: {
        kind: "property",
        type: () => {
          return Metadata.JsonPropertyInfo;
        },
      },
      Path: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
      },
      TypeInfo: {
        kind: "property",
        type: () => {
          return Metadata.JsonTypeInfo;
        },
      },
    },
  },
  JsonSchemaExporterOptions: {
    kind: "class",
    members: {
      JsonSchemaExporterOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      Default: {
        kind: "property",
        type: () => {
          return Schema.JsonSchemaExporterOptions;
        },
        isStatic: true,
      },
      TransformSchemaNode: {
        kind: "property",
        type: () => {
          return System.Func;
        },
        isNullable: true,
      },
      TreatNullObliviousAsNonNullable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
});
export default Schema
