import { Descriptor, LibraryFrom } from "../../../index.js";

const decorators = {
  added: { kind: "decorator" },
  madeOptional: { kind: "decorator" },
  madeRequired: { kind: "decorator" },
  removed: { kind: "decorator" },
  renamedFrom: { kind: "decorator" },
  returnTypeChangedFrom: { kind: "decorator" },
  typeChangedFrom: { kind: "decorator" },
  useDependency: { kind: "decorator" },
  versioned: { kind: "decorator" },
} satisfies Record<string, Descriptor>;

export type LibraryDecorators = LibraryFrom<typeof decorators>;

export default decorators;
