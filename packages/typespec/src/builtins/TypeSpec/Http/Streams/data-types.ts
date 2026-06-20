import { Descriptor, LibraryFrom } from "../../../../index.js";

const dataTypes = {
  HttpStream: { kind: "model", members: {} },
  JsonlStream: { kind: "model", members: {} },
} satisfies Record<string, Descriptor>;

export type LibraryDataTypes = LibraryFrom<typeof dataTypes>;

export default dataTypes;
