import Generic from "../../../Collections/Generic/index.js";
import ObjectModel from "../../../Collections/ObjectModel/index.js";
import System from "../../../index.js";
import Serialization from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type JsonLibrary = LibrarySymbolReference & {
  DataContractJsonSerializer: LibrarySymbolReference & {
    DataContractJsonSerializer: LibrarySymbolReference;
    GetSerializationSurrogateProvider: LibrarySymbolReference;
    SetSerializationSurrogateProvider: LibrarySymbolReference;
    IsStartObject: LibrarySymbolReference;
    ReadObject: LibrarySymbolReference;
    WriteEndObject: LibrarySymbolReference;
    WriteObject: LibrarySymbolReference;
    WriteObjectContent: LibrarySymbolReference;
    WriteStartObject: LibrarySymbolReference;
    DateTimeFormat: LibrarySymbolReference;
    EmitTypeInformation: LibrarySymbolReference;
    IgnoreExtensionDataObject: LibrarySymbolReference;
    KnownTypes: LibrarySymbolReference;
    MaxItemsInObjectGraph: LibrarySymbolReference;
    SerializeReadOnlyTypes: LibrarySymbolReference;
    UseSimpleDictionaryFormat: LibrarySymbolReference
  };
  DataContractJsonSerializerSettings: LibrarySymbolReference & {
    DataContractJsonSerializerSettings: LibrarySymbolReference;
    DateTimeFormat: LibrarySymbolReference;
    EmitTypeInformation: LibrarySymbolReference;
    IgnoreExtensionDataObject: LibrarySymbolReference;
    KnownTypes: LibrarySymbolReference;
    MaxItemsInObjectGraph: LibrarySymbolReference;
    RootName: LibrarySymbolReference;
    SerializeReadOnlyTypes: LibrarySymbolReference;
    UseSimpleDictionaryFormat: LibrarySymbolReference
  };
  IXmlJsonReaderInitializer: LibrarySymbolReference & {
    SetInput: LibrarySymbolReference
  };
  IXmlJsonWriterInitializer: LibrarySymbolReference & {
    SetOutput: LibrarySymbolReference
  };
  JsonReaderWriterFactory: LibrarySymbolReference & {
    CreateJsonReader: LibrarySymbolReference;
    CreateJsonWriter: LibrarySymbolReference
  }
};
const Json: JsonLibrary = createLibrary("System.Runtime.Serialization.Json", {
  DataContractJsonSerializer: {
    kind: "class",
    members: {
      DataContractJsonSerializer: {
        kind: "method",
        methodKind: "constructor",
      },
      GetSerializationSurrogateProvider: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetSerializationSurrogateProvider: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsStartObject: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadObject: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteEndObject: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteObject: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteObjectContent: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteStartObject: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DateTimeFormat: {
        kind: "property",
        type: () => {
          return Serialization.DateTimeFormat;
        },
      },
      EmitTypeInformation: {
        kind: "property",
        type: () => {
          return Serialization.EmitTypeInformation;
        },
      },
      IgnoreExtensionDataObject: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      KnownTypes: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      MaxItemsInObjectGraph: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SerializeReadOnlyTypes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      UseSimpleDictionaryFormat: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  DataContractJsonSerializerSettings: {
    kind: "class",
    members: {
      DataContractJsonSerializerSettings: {
        kind: "method",
        methodKind: "constructor",
      },
      DateTimeFormat: {
        kind: "property",
        type: () => {
          return Serialization.DateTimeFormat;
        },
      },
      EmitTypeInformation: {
        kind: "property",
        type: () => {
          return Serialization.EmitTypeInformation;
        },
      },
      IgnoreExtensionDataObject: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      KnownTypes: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isNullable: true,
      },
      MaxItemsInObjectGraph: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      RootName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SerializeReadOnlyTypes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      UseSimpleDictionaryFormat: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  IXmlJsonReaderInitializer: {
    kind: "interface",
    members: {
      SetInput: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IXmlJsonWriterInitializer: {
    kind: "interface",
    members: {
      SetOutput: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  JsonReaderWriterFactory: {
    kind: "class",
    members: {
      CreateJsonReader: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateJsonWriter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Json
