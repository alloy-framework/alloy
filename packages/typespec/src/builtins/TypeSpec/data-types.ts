import { Descriptor, LibraryFrom } from "../../index.js";

const dataTypes = {
  Array: { kind: "model", members: {} },
  Create: { kind: "model", members: {} },
  CreateOrUpdate: { kind: "model", members: {} },
  DefaultKeyVisibility: { kind: "model", members: {} },
  Delete: { kind: "model", members: {} },
  DiscriminatedOptions: {
    kind: "model",
    members: {
      envelope: {
        kind: "property",
        type: {
          kind: "union",
          members: {},
        },
      },
      discriminatorPropertyName: {
        kind: "property",
        type: () => dataTypes.string,
      },
      envelopePropertyName: { kind: "property", type: () => dataTypes.string },
    },
  },
  ExampleOptions: {
    kind: "model",
    members: {
      title: { kind: "property", type: () => dataTypes.string },
      description: { kind: "property", type: () => dataTypes.string },
    },
  },
  OmitDefaults: { kind: "model", members: {} },
  OmitProperties: { kind: "model", members: {} },
  OperationExample: {
    kind: "model",
    members: {
      parameters: { kind: "property" },
      returnType: { kind: "property" },
    },
  },
  OptionalProperties: { kind: "model", members: {} },
  PickProperties: { kind: "model", members: {} },
  Query: { kind: "model", members: {} },
  Read: { kind: "model", members: {} },
  Record: { kind: "model", members: {} },
  ServiceOptions: {
    kind: "model",
    members: { title: { kind: "property", type: () => dataTypes.string } },
  },
  Update: { kind: "model", members: {} },
  UpdateableProperties: { kind: "model", members: {} },
  VisibilityFilter: {
    kind: "model",
    members: {
      any: {
        kind: "property",
        type: {
          kind: "enum-member",
        },
      },
    },
  },
  ArrayEncoding: {
    kind: "enum",
    members: {
      pipeDelimited: { kind: "enum-member" },
      spaceDelimited: { kind: "enum-member" },
      commaDelimited: { kind: "enum-member" },
      newlineDelimited: { kind: "enum-member" },
    },
  },
  BytesKnownEncoding: {
    kind: "enum",
    members: {
      base64: { kind: "enum-member" },
      base64url: { kind: "enum-member" },
    },
  },
  DateTimeKnownEncoding: {
    kind: "enum",
    members: {
      rfc3339: { kind: "enum-member" },
      rfc7231: { kind: "enum-member" },
      unixTimestamp: { kind: "enum-member" },
    },
  },
  DurationKnownEncoding: {
    kind: "enum",
    members: {
      ISO8601: { kind: "enum-member" },
      seconds: { kind: "enum-member" },
      milliseconds: { kind: "enum-member" },
    },
  },
  Lifecycle: {
    kind: "enum",
    members: {
      Create: { kind: "enum-member" },
      Read: { kind: "enum-member" },
      Update: { kind: "enum-member" },
      Delete: { kind: "enum-member" },
      Query: { kind: "enum-member" },
    },
  },
  boolean: { kind: "scalar" },
  bytes: { kind: "scalar" },
  decimal: { kind: "scalar" },
  decimal128: { kind: "scalar" },
  duration: { kind: "scalar" },
  float: { kind: "scalar" },
  float32: { kind: "scalar" },
  float64: { kind: "scalar" },
  int16: { kind: "scalar" },
  int32: { kind: "scalar" },
  int64: { kind: "scalar" },
  int8: { kind: "scalar" },
  integer: { kind: "scalar" },
  numeric: { kind: "scalar" },
  offsetDateTime: { kind: "scalar" },
  plainDate: { kind: "scalar" },
  plainTime: { kind: "scalar" },
  safeint: { kind: "scalar" },
  string: { kind: "scalar" },
  uint16: { kind: "scalar" },
  uint32: { kind: "scalar" },
  uint64: { kind: "scalar" },
  uint8: { kind: "scalar" },
  unixTimestamp32: { kind: "scalar" },
  url: { kind: "scalar" },
  utcDateTime: { kind: "scalar" },
} satisfies Record<string, Descriptor>;

export type LibraryDataTypes = LibraryFrom<typeof dataTypes>;

export default dataTypes;
