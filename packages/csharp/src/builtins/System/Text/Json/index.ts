import Buffers from "../../Buffers/index.js";
import Generic from "../../Collections/Generic/index.js";
import System from "../../index.js";
import Web from "../Encodings/Web/index.js";
import Serialization from "./Serialization/index.js";
import Metadata from "./Serialization/Metadata/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Nodes } from "./Nodes/index.js";
export { default as Schema } from "./Schema/index.js";
export { default as Serialization } from "./Serialization/index.js";

type JsonLibrary = LibrarySymbolReference & {
  JsonCommentHandling: LibrarySymbolReference & {
    Disallow: LibrarySymbolReference;
    Skip: LibrarySymbolReference;
    Allow: LibrarySymbolReference
  };
  JsonDocument: LibrarySymbolReference & {
    Dispose: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ParseAsync: LibrarySymbolReference;
    ParseValue: LibrarySymbolReference;
    TryParseValue: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    RootElement: LibrarySymbolReference
  };
  JsonDocumentOptions: LibrarySymbolReference & {
    AllowTrailingCommas: LibrarySymbolReference;
    CommentHandling: LibrarySymbolReference;
    MaxDepth: LibrarySymbolReference
  };
  JsonElement: LibrarySymbolReference & {
    ArrayEnumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      GetEnumerator: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Reset: LibrarySymbolReference;
      Current: LibrarySymbolReference
    };
    ObjectEnumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      GetEnumerator: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Reset: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  JsonEncodedText: LibrarySymbolReference & {
    Encode: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    EncodedUtf8Bytes: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  JsonException: LibrarySymbolReference & {
    JsonException: LibrarySymbolReference;
    BytePositionInLine: LibrarySymbolReference;
    LineNumber: LibrarySymbolReference;
    Message: LibrarySymbolReference;
    Path: LibrarySymbolReference
  };
  JsonNamingPolicy: LibrarySymbolReference & {
    JsonNamingPolicy: LibrarySymbolReference;
    ConvertName: LibrarySymbolReference;
    CamelCase: LibrarySymbolReference;
    KebabCaseLower: LibrarySymbolReference;
    KebabCaseUpper: LibrarySymbolReference;
    SnakeCaseLower: LibrarySymbolReference;
    SnakeCaseUpper: LibrarySymbolReference
  };
  JsonProperty: LibrarySymbolReference & {
    NameEquals: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  JsonReaderOptions: LibrarySymbolReference & {
    AllowTrailingCommas: LibrarySymbolReference;
    AllowMultipleValues: LibrarySymbolReference;
    CommentHandling: LibrarySymbolReference;
    MaxDepth: LibrarySymbolReference
  };
  JsonReaderState: LibrarySymbolReference & {
    JsonReaderState: LibrarySymbolReference;
    Options: LibrarySymbolReference
  };
  JsonSerializer: LibrarySymbolReference & {
    Deserialize: LibrarySymbolReference;
    DeserializeAsync: LibrarySymbolReference;
    Serialize: LibrarySymbolReference;
    SerializeAsync: LibrarySymbolReference;
    SerializeToDocument: LibrarySymbolReference;
    SerializeToElement: LibrarySymbolReference;
    SerializeToNode: LibrarySymbolReference;
    SerializeToUtf8Bytes: LibrarySymbolReference;
    IsReflectionEnabledByDefault: LibrarySymbolReference
  };
  JsonSerializerDefaults: LibrarySymbolReference & {
    General: LibrarySymbolReference;
    Web: LibrarySymbolReference
  };
  JsonSerializerOptions: LibrarySymbolReference & {
    JsonSerializerOptions: LibrarySymbolReference;
    GetConverter: LibrarySymbolReference;
    GetTypeInfo: LibrarySymbolReference;
    MakeReadOnly: LibrarySymbolReference;
    TryGetTypeInfo: LibrarySymbolReference;
    AllowOutOfOrderMetadataProperties: LibrarySymbolReference;
    AllowTrailingCommas: LibrarySymbolReference;
    Converters: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    Web: LibrarySymbolReference;
    DefaultBufferSize: LibrarySymbolReference;
    DefaultIgnoreCondition: LibrarySymbolReference;
    DictionaryKeyPolicy: LibrarySymbolReference;
    Encoder: LibrarySymbolReference;
    IgnoreReadOnlyFields: LibrarySymbolReference;
    IgnoreReadOnlyProperties: LibrarySymbolReference;
    IncludeFields: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    MaxDepth: LibrarySymbolReference;
    NewLine: LibrarySymbolReference;
    NumberHandling: LibrarySymbolReference;
    PreferredObjectCreationHandling: LibrarySymbolReference;
    PropertyNameCaseInsensitive: LibrarySymbolReference;
    PropertyNamingPolicy: LibrarySymbolReference;
    ReadCommentHandling: LibrarySymbolReference;
    ReferenceHandler: LibrarySymbolReference;
    RespectNullableAnnotations: LibrarySymbolReference;
    RespectRequiredConstructorParameters: LibrarySymbolReference;
    TypeInfoResolver: LibrarySymbolReference;
    TypeInfoResolverChain: LibrarySymbolReference;
    UnknownTypeHandling: LibrarySymbolReference;
    UnmappedMemberHandling: LibrarySymbolReference;
    WriteIndented: LibrarySymbolReference;
    IndentCharacter: LibrarySymbolReference;
    IndentSize: LibrarySymbolReference
  };
  JsonTokenType: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    StartObject: LibrarySymbolReference;
    EndObject: LibrarySymbolReference;
    StartArray: LibrarySymbolReference;
    EndArray: LibrarySymbolReference;
    PropertyName: LibrarySymbolReference;
    Comment: LibrarySymbolReference;
    String: LibrarySymbolReference;
    Number: LibrarySymbolReference;
    True: LibrarySymbolReference;
    False: LibrarySymbolReference;
    Null: LibrarySymbolReference
  };
  JsonValueKind: LibrarySymbolReference & {
    Undefined: LibrarySymbolReference;
    Object: LibrarySymbolReference;
    Array: LibrarySymbolReference;
    String: LibrarySymbolReference;
    Number: LibrarySymbolReference;
    True: LibrarySymbolReference;
    False: LibrarySymbolReference;
    Null: LibrarySymbolReference
  };
  JsonWriterOptions: LibrarySymbolReference & {
    Encoder: LibrarySymbolReference;
    Indented: LibrarySymbolReference;
    IndentCharacter: LibrarySymbolReference;
    IndentSize: LibrarySymbolReference;
    NewLine: LibrarySymbolReference;
    MaxDepth: LibrarySymbolReference;
    SkipValidation: LibrarySymbolReference
  };
  Utf8JsonReader: LibrarySymbolReference & {
    Utf8JsonReader: LibrarySymbolReference;
    CopyString: LibrarySymbolReference;
    GetBoolean: LibrarySymbolReference;
    GetByte: LibrarySymbolReference;
    GetBytesFromBase64: LibrarySymbolReference;
    GetComment: LibrarySymbolReference;
    GetDateTime: LibrarySymbolReference;
    GetDateTimeOffset: LibrarySymbolReference;
    GetDecimal: LibrarySymbolReference;
    GetDouble: LibrarySymbolReference;
    GetGuid: LibrarySymbolReference;
    GetInt16: LibrarySymbolReference;
    GetInt32: LibrarySymbolReference;
    GetInt64: LibrarySymbolReference;
    GetSByte: LibrarySymbolReference;
    GetSingle: LibrarySymbolReference;
    GetString: LibrarySymbolReference;
    GetUInt16: LibrarySymbolReference;
    GetUInt32: LibrarySymbolReference;
    GetUInt64: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    Skip: LibrarySymbolReference;
    TryGetByte: LibrarySymbolReference;
    TryGetBytesFromBase64: LibrarySymbolReference;
    TryGetDateTime: LibrarySymbolReference;
    TryGetDateTimeOffset: LibrarySymbolReference;
    TryGetDecimal: LibrarySymbolReference;
    TryGetDouble: LibrarySymbolReference;
    TryGetGuid: LibrarySymbolReference;
    TryGetInt16: LibrarySymbolReference;
    TryGetInt32: LibrarySymbolReference;
    TryGetInt64: LibrarySymbolReference;
    TryGetSByte: LibrarySymbolReference;
    TryGetSingle: LibrarySymbolReference;
    TryGetUInt16: LibrarySymbolReference;
    TryGetUInt32: LibrarySymbolReference;
    TryGetUInt64: LibrarySymbolReference;
    TrySkip: LibrarySymbolReference;
    ValueTextEquals: LibrarySymbolReference;
    BytesConsumed: LibrarySymbolReference;
    CurrentDepth: LibrarySymbolReference;
    CurrentState: LibrarySymbolReference;
    HasValueSequence: LibrarySymbolReference;
    IsFinalBlock: LibrarySymbolReference;
    Position: LibrarySymbolReference;
    TokenStartIndex: LibrarySymbolReference;
    TokenType: LibrarySymbolReference;
    ValueIsEscaped: LibrarySymbolReference;
    ValueSequence: LibrarySymbolReference;
    ValueSpan: LibrarySymbolReference
  };
  Utf8JsonWriter: LibrarySymbolReference & {
    Utf8JsonWriter: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    WriteBase64String: LibrarySymbolReference;
    WriteBase64StringValue: LibrarySymbolReference;
    WriteBoolean: LibrarySymbolReference;
    WriteBooleanValue: LibrarySymbolReference;
    WriteCommentValue: LibrarySymbolReference;
    WriteEndArray: LibrarySymbolReference;
    WriteEndObject: LibrarySymbolReference;
    WriteNull: LibrarySymbolReference;
    WriteNullValue: LibrarySymbolReference;
    WriteNumber: LibrarySymbolReference;
    WriteNumberValue: LibrarySymbolReference;
    WritePropertyName: LibrarySymbolReference;
    WriteRawValue: LibrarySymbolReference;
    WriteStartArray: LibrarySymbolReference;
    WriteStartObject: LibrarySymbolReference;
    WriteString: LibrarySymbolReference;
    WriteStringValue: LibrarySymbolReference;
    BytesCommitted: LibrarySymbolReference;
    BytesPending: LibrarySymbolReference;
    CurrentDepth: LibrarySymbolReference;
    Options: LibrarySymbolReference
  }
};
const Json: JsonLibrary = createLibrary("System.Text.Json", {
  JsonCommentHandling: {
    kind: "enum",
    members: {
      Disallow: {
        kind: "field",
        type: () => {
          return Json.JsonCommentHandling;
        },
      },
      Skip: {
        kind: "field",
        type: () => {
          return Json.JsonCommentHandling;
        },
      },
      Allow: {
        kind: "field",
        type: () => {
          return Json.JsonCommentHandling;
        },
      },
    },
  },
  JsonDocument: {
    kind: "class",
    members: {
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ParseAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ParseValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryParseValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      RootElement: {
        kind: "property",
        type: () => {
          return Json.JsonElement;
        },
      },
    },
    isSealed: true,
  },
  JsonDocumentOptions: {
    kind: "struct",
    members: {
      AllowTrailingCommas: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      CommentHandling: {
        kind: "property",
        type: () => {
          return Json.JsonCommentHandling;
        },
        isReadOnly: true,
      },
      MaxDepth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
    },
  },
  JsonElement: {
    kind: "class",
    members: {
      ArrayEnumerator: {
        kind: "struct",
        members: {
          Dispose: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetEnumerator: {
            kind: "method",
            methodKind: "ordinary",
          },
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Reset: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Json.JsonElement;
            },
          },
        },
      },
      ObjectEnumerator: {
        kind: "struct",
        members: {
          Dispose: {
            kind: "method",
            methodKind: "ordinary",
          },
          GetEnumerator: {
            kind: "method",
            methodKind: "ordinary",
          },
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Reset: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Json.JsonProperty;
            },
          },
        },
      },
    },
  },
  JsonEncodedText: {
    kind: "struct",
    members: {
      Encode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      EncodedUtf8Bytes: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  JsonException: {
    kind: "class",
    members: {
      JsonException: {
        kind: "method",
        methodKind: "constructor",
      },
      BytePositionInLine: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isNullable: true,
      },
      LineNumber: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isNullable: true,
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      Path: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  JsonNamingPolicy: {
    kind: "class",
    members: {
      JsonNamingPolicy: {
        kind: "method",
        methodKind: "constructor",
      },
      ConvertName: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CamelCase: {
        kind: "property",
        type: () => {
          return Json.JsonNamingPolicy;
        },
        isStatic: true,
      },
      KebabCaseLower: {
        kind: "property",
        type: () => {
          return Json.JsonNamingPolicy;
        },
        isStatic: true,
      },
      KebabCaseUpper: {
        kind: "property",
        type: () => {
          return Json.JsonNamingPolicy;
        },
        isStatic: true,
      },
      SnakeCaseLower: {
        kind: "property",
        type: () => {
          return Json.JsonNamingPolicy;
        },
        isStatic: true,
      },
      SnakeCaseUpper: {
        kind: "property",
        type: () => {
          return Json.JsonNamingPolicy;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  JsonProperty: {
    kind: "struct",
    members: {
      NameEquals: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return Json.JsonElement;
        },
      },
    },
  },
  JsonReaderOptions: {
    kind: "struct",
    members: {
      AllowTrailingCommas: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      AllowMultipleValues: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      CommentHandling: {
        kind: "property",
        type: () => {
          return Json.JsonCommentHandling;
        },
        isReadOnly: true,
      },
      MaxDepth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
    },
  },
  JsonReaderState: {
    kind: "struct",
    members: {
      JsonReaderState: {
        kind: "method",
        methodKind: "constructor",
      },
      Options: {
        kind: "property",
        type: () => {
          return Json.JsonReaderOptions;
        },
      },
    },
  },
  JsonSerializer: {
    kind: "class",
    members: {
      Deserialize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DeserializeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Serialize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SerializeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SerializeToDocument: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SerializeToElement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SerializeToNode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SerializeToUtf8Bytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsReflectionEnabledByDefault: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  JsonSerializerDefaults: {
    kind: "enum",
    members: {
      General: {
        kind: "field",
        type: () => {
          return Json.JsonSerializerDefaults;
        },
      },
      Web: {
        kind: "field",
        type: () => {
          return Json.JsonSerializerDefaults;
        },
      },
    },
  },
  JsonSerializerOptions: {
    kind: "class",
    members: {
      JsonSerializerOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      GetConverter: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetTypeInfo: {
        kind: "method",
        methodKind: "ordinary",
      },
      MakeReadOnly: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetTypeInfo: {
        kind: "method",
        methodKind: "ordinary",
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
          return Generic.IList;
        },
      },
      Default: {
        kind: "property",
        type: () => {
          return Json.JsonSerializerOptions;
        },
        isStatic: true,
      },
      Web: {
        kind: "property",
        type: () => {
          return Json.JsonSerializerOptions;
        },
        isStatic: true,
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
          return Json.JsonNamingPolicy;
        },
        isNullable: true,
      },
      Encoder: {
        kind: "property",
        type: () => {
          return Web.JavaScriptEncoder;
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
      IsReadOnly: {
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
          return Json.JsonNamingPolicy;
        },
        isNullable: true,
      },
      ReadCommentHandling: {
        kind: "property",
        type: () => {
          return Json.JsonCommentHandling;
        },
      },
      ReferenceHandler: {
        kind: "property",
        type: () => {
          return Serialization.ReferenceHandler;
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
      TypeInfoResolver: {
        kind: "property",
        type: () => {
          return Metadata.IJsonTypeInfoResolver;
        },
      },
      TypeInfoResolverChain: {
        kind: "property",
        type: () => {
          return Generic.IList;
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
  JsonTokenType: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Json.JsonTokenType;
        },
      },
      StartObject: {
        kind: "field",
        type: () => {
          return Json.JsonTokenType;
        },
      },
      EndObject: {
        kind: "field",
        type: () => {
          return Json.JsonTokenType;
        },
      },
      StartArray: {
        kind: "field",
        type: () => {
          return Json.JsonTokenType;
        },
      },
      EndArray: {
        kind: "field",
        type: () => {
          return Json.JsonTokenType;
        },
      },
      PropertyName: {
        kind: "field",
        type: () => {
          return Json.JsonTokenType;
        },
      },
      Comment: {
        kind: "field",
        type: () => {
          return Json.JsonTokenType;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return Json.JsonTokenType;
        },
      },
      Number: {
        kind: "field",
        type: () => {
          return Json.JsonTokenType;
        },
      },
      True: {
        kind: "field",
        type: () => {
          return Json.JsonTokenType;
        },
      },
      False: {
        kind: "field",
        type: () => {
          return Json.JsonTokenType;
        },
      },
      Null: {
        kind: "field",
        type: () => {
          return Json.JsonTokenType;
        },
      },
    },
  },
  JsonValueKind: {
    kind: "enum",
    members: {
      Undefined: {
        kind: "field",
        type: () => {
          return Json.JsonValueKind;
        },
      },
      Object: {
        kind: "field",
        type: () => {
          return Json.JsonValueKind;
        },
      },
      Array: {
        kind: "field",
        type: () => {
          return Json.JsonValueKind;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return Json.JsonValueKind;
        },
      },
      Number: {
        kind: "field",
        type: () => {
          return Json.JsonValueKind;
        },
      },
      True: {
        kind: "field",
        type: () => {
          return Json.JsonValueKind;
        },
      },
      False: {
        kind: "field",
        type: () => {
          return Json.JsonValueKind;
        },
      },
      Null: {
        kind: "field",
        type: () => {
          return Json.JsonValueKind;
        },
      },
    },
  },
  JsonWriterOptions: {
    kind: "struct",
    members: {
      Encoder: {
        kind: "property",
        type: () => {
          return Web.JavaScriptEncoder;
        },
        isReadOnly: true,
      },
      Indented: {
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
      NewLine: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MaxDepth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
      SkipValidation: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  Utf8JsonReader: {
    kind: "struct",
    members: {
      Utf8JsonReader: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyString: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      GetBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetBytesFromBase64: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetComment: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDateTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDateTimeOffset: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetGuid: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetString: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
      },
      Skip: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetBytesFromBase64: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetDateTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetDateTimeOffset: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetGuid: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetSByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetUInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetUInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetUInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      TrySkip: {
        kind: "method",
        methodKind: "ordinary",
      },
      ValueTextEquals: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      BytesConsumed: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isReadOnly: true,
      },
      CurrentDepth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
      CurrentState: {
        kind: "property",
        type: () => {
          return Json.JsonReaderState;
        },
        isReadOnly: true,
      },
      HasValueSequence: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      IsFinalBlock: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      Position: {
        kind: "property",
        type: () => {
          return System.SequencePosition;
        },
        isReadOnly: true,
      },
      TokenStartIndex: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isReadOnly: true,
      },
      TokenType: {
        kind: "property",
        type: () => {
          return Json.JsonTokenType;
        },
        isReadOnly: true,
      },
      ValueIsEscaped: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      ValueSequence: {
        kind: "property",
        type: () => {
          return Buffers.ReadOnlySequence;
        },
        isReadOnly: true,
      },
      ValueSpan: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
        isReadOnly: true,
      },
    },
  },
  Utf8JsonWriter: {
    kind: "class",
    members: {
      Utf8JsonWriter: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
      },
      FlushAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteBase64String: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteBase64StringValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteBooleanValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteCommentValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteEndArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteEndObject: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteNull: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteNullValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteNumber: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteNumberValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      WritePropertyName: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteRawValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteStartArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteStartObject: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteString: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteStringValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      BytesCommitted: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      BytesPending: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      CurrentDepth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Options: {
        kind: "property",
        type: () => {
          return Json.JsonWriterOptions;
        },
      },
    },
    isSealed: true,
  },
});
export default Json
