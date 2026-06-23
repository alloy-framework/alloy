import { Descriptor, LibraryFrom } from "../../../index.js";

const dataTypes = {
  AdditionalInfo: { kind: "model", members: {} },
  Contact: { kind: "model", members: {} },
  ExternalDocs: { kind: "model", members: {} },
  License: { kind: "model", members: {} },
  TagMetadata: { kind: "model", members: {} },
  TagMetadataWithName: { kind: "model", members: {} },
} satisfies Record<string, Descriptor>;

export type LibraryDataTypes = LibraryFrom<typeof dataTypes>;

export default dataTypes;
