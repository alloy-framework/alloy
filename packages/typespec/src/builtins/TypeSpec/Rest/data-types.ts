import { Descriptor, LibraryFrom } from "../../../index.js";

const dataTypes = {
  ResourceLocation: { kind: "scalar" },
} satisfies Record<string, Descriptor>;

export type LibraryDataTypes = LibraryFrom<typeof dataTypes>;

export default dataTypes;
