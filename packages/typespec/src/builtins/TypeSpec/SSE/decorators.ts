import type { Descriptor, LibraryFrom } from "../../../index.js";

const decorators = {
  terminalEvent: { kind: "decorator" },
} satisfies Record<string, Descriptor>;

export type LibraryDecorators = LibraryFrom<typeof decorators>;

export default decorators;
