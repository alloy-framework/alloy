import type { Descriptor, LibraryFrom } from "../../../index.js";

const dataTypes = {
  SSEStream: { kind: "model", members: {} },
} satisfies Record<string, Descriptor>;

export type LibraryDataTypes = LibraryFrom<typeof dataTypes>;

export default dataTypes;
