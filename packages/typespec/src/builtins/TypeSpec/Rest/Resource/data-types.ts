import { Descriptor, LibraryFrom } from "../../../../index.js";

const dataTypes = {
  CollectionWithNextLink: { kind: "model", members: {} },
  KeysOf: { kind: "model", members: {} },
  ParentKeysOf: { kind: "model", members: {} },
  ResourceCollectionParameters: { kind: "model", members: {} },
  ResourceCreateModel: { kind: "model", members: {} },
  ResourceCreateOrUpdateModel: { kind: "model", members: {} },
  ResourceCreatedResponse: { kind: "model", members: {} },
  ResourceDeletedResponse: { kind: "model", members: {} },
  ResourceError: { kind: "model", members: {} },
  ResourceParameters: { kind: "model", members: {} },
} satisfies Record<string, Descriptor>;

export type LibraryDataTypes = LibraryFrom<typeof dataTypes>;

export default dataTypes;
