import System from "../../../index.js";
import Json from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Metadata } from "./Metadata/index.js";

type SerializationLibrary = LibrarySymbolReference & {
  IJsonOnDeserialized: LibrarySymbolReference & {
    OnDeserialized: LibrarySymbolReference
  };
  IJsonOnDeserializing: LibrarySymbolReference & {
    OnDeserializing: LibrarySymbolReference
  };
  IJsonOnSerialized: LibrarySymbolReference & {
    OnSerialized: LibrarySymbolReference
  };
  IJsonOnSerializing: LibrarySymbolReference & {
    OnSerializing: LibrarySymbolReference
  };
  JsonAttribute: LibrarySymbolReference & {
    JsonAttribute: LibrarySymbolReference
  };
  JsonConstructorAttribute: LibrarySymbolReference & {
    JsonConstructorAttribute: LibrarySymbolReference
  };
  JsonConverter: LibrarySymbolReference & {
    JsonConverter: LibrarySymbolReference;
    CanConvert: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsPropertyName: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsPropertyName: LibrarySymbolReference;
    HandleNull: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  JsonConverterAttribute: LibrarySymbolReference & {
    JsonConverterAttribute: LibrarySymbolReference;
    CreateConverter: LibrarySymbolReference;
    ConverterType: LibrarySymbolReference
  };
  JsonConverterFactory: LibrarySymbolReference & {
    JsonConverterFactory: LibrarySymbolReference;
    CreateConverter: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  JsonDerivedTypeAttribute: LibrarySymbolReference & {
    JsonDerivedTypeAttribute: LibrarySymbolReference;
    DerivedType: LibrarySymbolReference;
    TypeDiscriminator: LibrarySymbolReference
  };
  JsonExtensionDataAttribute: LibrarySymbolReference & {
    JsonExtensionDataAttribute: LibrarySymbolReference
  };
  JsonIgnoreAttribute: LibrarySymbolReference & {
    JsonIgnoreAttribute: LibrarySymbolReference;
    Condition: LibrarySymbolReference
  };
  JsonIgnoreCondition: LibrarySymbolReference & {
    Never: LibrarySymbolReference;
    Always: LibrarySymbolReference;
    WhenWritingDefault: LibrarySymbolReference;
    WhenWritingNull: LibrarySymbolReference
  };
  JsonIncludeAttribute: LibrarySymbolReference & {
    JsonIncludeAttribute: LibrarySymbolReference
  };
  JsonKnownNamingPolicy: LibrarySymbolReference & {
    Unspecified: LibrarySymbolReference;
    CamelCase: LibrarySymbolReference;
    SnakeCaseLower: LibrarySymbolReference;
    SnakeCaseUpper: LibrarySymbolReference;
    KebabCaseLower: LibrarySymbolReference;
    KebabCaseUpper: LibrarySymbolReference
  };
  JsonNumberEnumConverter: LibrarySymbolReference & {
    JsonNumberEnumConverter: LibrarySymbolReference;
    CanConvert: LibrarySymbolReference;
    CreateConverter: LibrarySymbolReference
  };
  JsonNumberHandling: LibrarySymbolReference & {
    Strict: LibrarySymbolReference;
    AllowReadingFromString: LibrarySymbolReference;
    WriteAsString: LibrarySymbolReference;
    AllowNamedFloatingPointLiterals: LibrarySymbolReference
  };
  JsonNumberHandlingAttribute: LibrarySymbolReference & {
    JsonNumberHandlingAttribute: LibrarySymbolReference;
    Handling: LibrarySymbolReference
  };
  JsonObjectCreationHandling: LibrarySymbolReference & {
    Replace: LibrarySymbolReference;
    Populate: LibrarySymbolReference
  };
  JsonObjectCreationHandlingAttribute: LibrarySymbolReference & {
    JsonObjectCreationHandlingAttribute: LibrarySymbolReference;
    Handling: LibrarySymbolReference
  };
  JsonPolymorphicAttribute: LibrarySymbolReference & {
    JsonPolymorphicAttribute: LibrarySymbolReference;
    IgnoreUnrecognizedTypeDiscriminators: LibrarySymbolReference;
    TypeDiscriminatorPropertyName: LibrarySymbolReference;
    UnknownDerivedTypeHandling: LibrarySymbolReference
  };
  JsonPropertyNameAttribute: LibrarySymbolReference & {
    JsonPropertyNameAttribute: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  JsonPropertyOrderAttribute: LibrarySymbolReference & {
    JsonPropertyOrderAttribute: LibrarySymbolReference;
    Order: LibrarySymbolReference
  };
  JsonRequiredAttribute: LibrarySymbolReference & {
    JsonRequiredAttribute: LibrarySymbolReference
  };
  JsonSerializableAttribute: LibrarySymbolReference & {
    JsonSerializableAttribute: LibrarySymbolReference;
    GenerationMode: LibrarySymbolReference;
    TypeInfoPropertyName: LibrarySymbolReference
  };
  JsonSerializerContext: LibrarySymbolReference & {
    JsonSerializerContext: LibrarySymbolReference;
    GetTypeInfo: LibrarySymbolReference;
    GeneratedSerializerOptions: LibrarySymbolReference;
    Options: LibrarySymbolReference
  };
  JsonSourceGenerationMode: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    Metadata: LibrarySymbolReference;
    Serialization: LibrarySymbolReference
  };
  JsonSourceGenerationOptionsAttribute: LibrarySymbolReference & {
    JsonSourceGenerationOptionsAttribute: LibrarySymbolReference;
    AllowOutOfOrderMetadataProperties: LibrarySymbolReference;
    AllowTrailingCommas: LibrarySymbolReference;
    Converters: LibrarySymbolReference;
    DefaultBufferSize: LibrarySymbolReference;
    DefaultIgnoreCondition: LibrarySymbolReference;
    DictionaryKeyPolicy: LibrarySymbolReference;
    GenerationMode: LibrarySymbolReference;
    IgnoreReadOnlyFields: LibrarySymbolReference;
    IgnoreReadOnlyProperties: LibrarySymbolReference;
    IncludeFields: LibrarySymbolReference;
    MaxDepth: LibrarySymbolReference;
    NewLine: LibrarySymbolReference;
    NumberHandling: LibrarySymbolReference;
    PreferredObjectCreationHandling: LibrarySymbolReference;
    PropertyNameCaseInsensitive: LibrarySymbolReference;
    PropertyNamingPolicy: LibrarySymbolReference;
    ReadCommentHandling: LibrarySymbolReference;
    RespectNullableAnnotations: LibrarySymbolReference;
    RespectRequiredConstructorParameters: LibrarySymbolReference;
    UnknownTypeHandling: LibrarySymbolReference;
    UnmappedMemberHandling: LibrarySymbolReference;
    UseStringEnumConverter: LibrarySymbolReference;
    WriteIndented: LibrarySymbolReference;
    IndentCharacter: LibrarySymbolReference;
    IndentSize: LibrarySymbolReference
  };
  JsonStringEnumConverter: LibrarySymbolReference & {
    JsonStringEnumConverter: LibrarySymbolReference;
    CanConvert: LibrarySymbolReference;
    CreateConverter: LibrarySymbolReference
  };
  JsonStringEnumMemberNameAttribute: LibrarySymbolReference & {
    JsonStringEnumMemberNameAttribute: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  JsonUnknownDerivedTypeHandling: LibrarySymbolReference & {
    FailSerialization: LibrarySymbolReference;
    FallBackToBaseType: LibrarySymbolReference;
    FallBackToNearestAncestor: LibrarySymbolReference
  };
  JsonUnknownTypeHandling: LibrarySymbolReference & {
    JsonElement: LibrarySymbolReference;
    JsonNode: LibrarySymbolReference
  };
  JsonUnmappedMemberHandling: LibrarySymbolReference & {
    Skip: LibrarySymbolReference;
    Disallow: LibrarySymbolReference
  };
  JsonUnmappedMemberHandlingAttribute: LibrarySymbolReference & {
    JsonUnmappedMemberHandlingAttribute: LibrarySymbolReference;
    UnmappedMemberHandling: LibrarySymbolReference
  };
  ReferenceHandler: LibrarySymbolReference & {
    ReferenceHandler: LibrarySymbolReference;
    CreateResolver: LibrarySymbolReference
  };
  ReferenceResolver: LibrarySymbolReference & {
    ReferenceResolver: LibrarySymbolReference;
    AddReference: LibrarySymbolReference;
    GetReference: LibrarySymbolReference;
    ResolveReference: LibrarySymbolReference
  }
};
const Serialization: SerializationLibrary = createLibrary("System.Text.Json.Serialization", {
  IJsonOnDeserialized: {
    kind: "interface",
    members: {
      OnDeserialized: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IJsonOnDeserializing: {
    kind: "interface",
    members: {
      OnDeserializing: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IJsonOnSerialized: {
    kind: "interface",
    members: {
      OnSerialized: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IJsonOnSerializing: {
    kind: "interface",
    members: {
      OnSerializing: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  JsonAttribute: {
    kind: "class",
    members: {
      JsonAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isAbstract: true,
  },
  JsonConstructorAttribute: {
    kind: "class",
    members: {
      JsonConstructorAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  JsonConverter: {
    kind: "class",
    members: {
      JsonConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvert: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ReadAsPropertyName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteAsPropertyName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      HandleNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  JsonConverterAttribute: {
    kind: "class",
    members: {
      JsonConverterAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateConverter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ConverterType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
    },
  },
  JsonConverterFactory: {
    kind: "class",
    members: {
      JsonConverterFactory: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateConverter: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  JsonDerivedTypeAttribute: {
    kind: "class",
    members: {
      JsonDerivedTypeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      DerivedType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      TypeDiscriminator: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  JsonExtensionDataAttribute: {
    kind: "class",
    members: {
      JsonExtensionDataAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  JsonIgnoreAttribute: {
    kind: "class",
    members: {
      JsonIgnoreAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Condition: {
        kind: "property",
        type: () => {
          return Serialization.JsonIgnoreCondition;
        },
      },
    },
    isSealed: true,
  },
  JsonIgnoreCondition: {
    kind: "enum",
    members: {
      Never: {
        kind: "field",
        type: () => {
          return Serialization.JsonIgnoreCondition;
        },
      },
      Always: {
        kind: "field",
        type: () => {
          return Serialization.JsonIgnoreCondition;
        },
      },
      WhenWritingDefault: {
        kind: "field",
        type: () => {
          return Serialization.JsonIgnoreCondition;
        },
      },
      WhenWritingNull: {
        kind: "field",
        type: () => {
          return Serialization.JsonIgnoreCondition;
        },
      },
    },
  },
  JsonIncludeAttribute: {
    kind: "class",
    members: {
      JsonIncludeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  JsonKnownNamingPolicy: {
    kind: "enum",
    members: {
      Unspecified: {
        kind: "field",
        type: () => {
          return Serialization.JsonKnownNamingPolicy;
        },
      },
      CamelCase: {
        kind: "field",
        type: () => {
          return Serialization.JsonKnownNamingPolicy;
        },
      },
      SnakeCaseLower: {
        kind: "field",
        type: () => {
          return Serialization.JsonKnownNamingPolicy;
        },
      },
      SnakeCaseUpper: {
        kind: "field",
        type: () => {
          return Serialization.JsonKnownNamingPolicy;
        },
      },
      KebabCaseLower: {
        kind: "field",
        type: () => {
          return Serialization.JsonKnownNamingPolicy;
        },
      },
      KebabCaseUpper: {
        kind: "field",
        type: () => {
          return Serialization.JsonKnownNamingPolicy;
        },
      },
    },
  },
  JsonNumberEnumConverter: {
    kind: "class",
    members: {
      JsonNumberEnumConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvert: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateConverter: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  JsonNumberHandling: {
    kind: "enum",
    members: {
      Strict: {
        kind: "field",
        type: () => {
          return Serialization.JsonNumberHandling;
        },
      },
      AllowReadingFromString: {
        kind: "field",
        type: () => {
          return Serialization.JsonNumberHandling;
        },
      },
      WriteAsString: {
        kind: "field",
        type: () => {
          return Serialization.JsonNumberHandling;
        },
      },
      AllowNamedFloatingPointLiterals: {
        kind: "field",
        type: () => {
          return Serialization.JsonNumberHandling;
        },
      },
    },
  },
  JsonNumberHandlingAttribute: {
    kind: "class",
    members: {
      JsonNumberHandlingAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Handling: {
        kind: "property",
        type: () => {
          return Serialization.JsonNumberHandling;
        },
      },
    },
    isSealed: true,
  },
  JsonObjectCreationHandling: {
    kind: "enum",
    members: {
      Replace: {
        kind: "field",
        type: () => {
          return Serialization.JsonObjectCreationHandling;
        },
      },
      Populate: {
        kind: "field",
        type: () => {
          return Serialization.JsonObjectCreationHandling;
        },
      },
    },
  },
  JsonObjectCreationHandlingAttribute: {
    kind: "class",
    members: {
      JsonObjectCreationHandlingAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Handling: {
        kind: "property",
        type: () => {
          return Serialization.JsonObjectCreationHandling;
        },
      },
    },
    isSealed: true,
  },
  JsonPolymorphicAttribute: {
    kind: "class",
    members: {
      JsonPolymorphicAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IgnoreUnrecognizedTypeDiscriminators: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      TypeDiscriminatorPropertyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      UnknownDerivedTypeHandling: {
        kind: "property",
        type: () => {
          return Serialization.JsonUnknownDerivedTypeHandling;
        },
      },
    },
    isSealed: true,
  },
  JsonPropertyNameAttribute: {
    kind: "class",
    members: {
      JsonPropertyNameAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  JsonPropertyOrderAttribute: {
    kind: "class",
    members: {
      JsonPropertyOrderAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Order: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  JsonRequiredAttribute: {
    kind: "class",
    members: {
      JsonRequiredAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  JsonSerializableAttribute: {
    kind: "class",
    members: {
      JsonSerializableAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      GenerationMode: {
        kind: "property",
        type: () => {
          return Serialization.JsonSourceGenerationMode;
        },
      },
      TypeInfoPropertyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  JsonSerializerContext: {
    kind: "class",
    members: {
      JsonSerializerContext: {
        kind: "method",
        methodKind: "constructor",
      },
      GetTypeInfo: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GeneratedSerializerOptions: {
        kind: "property",
        type: () => {
          return Json.JsonSerializerOptions;
        },
        isNullable: true,
        isAbstract: true,
      },
      Options: {
        kind: "property",
        type: () => {
          return Json.JsonSerializerOptions;
        },
      },
    },
    isAbstract: true,
  },
  JsonSourceGenerationMode: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Serialization.JsonSourceGenerationMode;
        },
      },
      Metadata: {
        kind: "field",
        type: () => {
          return Serialization.JsonSourceGenerationMode;
        },
      },
      Serialization: {
        kind: "field",
        type: () => {
          return Serialization.JsonSourceGenerationMode;
        },
      },
    },
  },
  JsonSourceGenerationOptionsAttribute: {
    kind: "class",
    members: {
      JsonSourceGenerationOptionsAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AllowOutOfOrderMetadataProperties: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AllowTrailingCommas: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Converters: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      DefaultBufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      DefaultIgnoreCondition: {
        kind: "property",
        type: () => {
          return Serialization.JsonIgnoreCondition;
        },
      },
      DictionaryKeyPolicy: {
        kind: "property",
        type: () => {
          return Serialization.JsonKnownNamingPolicy;
        },
      },
      GenerationMode: {
        kind: "property",
        type: () => {
          return Serialization.JsonSourceGenerationMode;
        },
      },
      IgnoreReadOnlyFields: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IgnoreReadOnlyProperties: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IncludeFields: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MaxDepth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      NewLine: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      NumberHandling: {
        kind: "property",
        type: () => {
          return Serialization.JsonNumberHandling;
        },
      },
      PreferredObjectCreationHandling: {
        kind: "property",
        type: () => {
          return Serialization.JsonObjectCreationHandling;
        },
      },
      PropertyNameCaseInsensitive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PropertyNamingPolicy: {
        kind: "property",
        type: () => {
          return Serialization.JsonKnownNamingPolicy;
        },
      },
      ReadCommentHandling: {
        kind: "property",
        type: () => {
          return Json.JsonCommentHandling;
        },
      },
      RespectNullableAnnotations: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      RespectRequiredConstructorParameters: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      UnknownTypeHandling: {
        kind: "property",
        type: () => {
          return Serialization.JsonUnknownTypeHandling;
        },
      },
      UnmappedMemberHandling: {
        kind: "property",
        type: () => {
          return Serialization.JsonUnmappedMemberHandling;
        },
      },
      UseStringEnumConverter: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      WriteIndented: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IndentCharacter: {
        kind: "property",
        type: () => {
          return System.Char;
        },
      },
      IndentSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  JsonStringEnumConverter: {
    kind: "class",
    members: {
      JsonStringEnumConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvert: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      CreateConverter: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
    },
  },
  JsonStringEnumMemberNameAttribute: {
    kind: "class",
    members: {
      JsonStringEnumMemberNameAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  JsonUnknownDerivedTypeHandling: {
    kind: "enum",
    members: {
      FailSerialization: {
        kind: "field",
        type: () => {
          return Serialization.JsonUnknownDerivedTypeHandling;
        },
      },
      FallBackToBaseType: {
        kind: "field",
        type: () => {
          return Serialization.JsonUnknownDerivedTypeHandling;
        },
      },
      FallBackToNearestAncestor: {
        kind: "field",
        type: () => {
          return Serialization.JsonUnknownDerivedTypeHandling;
        },
      },
    },
  },
  JsonUnknownTypeHandling: {
    kind: "enum",
    members: {
      JsonElement: {
        kind: "field",
        type: () => {
          return Serialization.JsonUnknownTypeHandling;
        },
      },
      JsonNode: {
        kind: "field",
        type: () => {
          return Serialization.JsonUnknownTypeHandling;
        },
      },
    },
  },
  JsonUnmappedMemberHandling: {
    kind: "enum",
    members: {
      Skip: {
        kind: "field",
        type: () => {
          return Serialization.JsonUnmappedMemberHandling;
        },
      },
      Disallow: {
        kind: "field",
        type: () => {
          return Serialization.JsonUnmappedMemberHandling;
        },
      },
    },
  },
  JsonUnmappedMemberHandlingAttribute: {
    kind: "class",
    members: {
      JsonUnmappedMemberHandlingAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      UnmappedMemberHandling: {
        kind: "property",
        type: () => {
          return Serialization.JsonUnmappedMemberHandling;
        },
      },
    },
  },
  ReferenceHandler: {
    kind: "class",
    members: {
      ReferenceHandler: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateResolver: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  ReferenceResolver: {
    kind: "class",
    members: {
      ReferenceResolver: {
        kind: "method",
        methodKind: "constructor",
      },
      AddReference: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetReference: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ResolveReference: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
});
export default Serialization
