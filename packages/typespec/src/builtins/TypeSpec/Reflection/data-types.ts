import { Descriptor, LibraryFrom } from "../../../index.js";

const dataTypes = {
  Enum: { kind: "model", members: {} },
  EnumMember: { kind: "model", members: {} },
  Interface: { kind: "model", members: {} },
  Model: { kind: "model", members: {} },
  ModelProperty: { kind: "model", members: {} },
  Namespace: { kind: "model", members: {} },
  Operation: { kind: "model", members: {} },
  Scalar: { kind: "model", members: {} },
  StringTemplate: { kind: "model", members: {} },
  Union: { kind: "model", members: {} },
  UnionVariant: { kind: "model", members: {} },
} satisfies Record<string, Descriptor>;

export type LibraryDataTypes = LibraryFrom<typeof dataTypes>;

export default dataTypes;
