import type { Descriptor, LibraryFrom } from "../../../index.js";

const decorators = {
  events: { kind: "decorator" },
  contentType: { kind: "decorator" },
  data: { kind: "decorator" },
} satisfies Record<string, Descriptor>;

export type LibraryDecorators = LibraryFrom<typeof decorators>;

export default decorators;
