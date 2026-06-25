import { Descriptor, LibraryFrom } from "../../../index.js";

const decorators = {
  defaultResponse: { kind: "decorator" },
  extension: { kind: "decorator" },
  externalDocs: { kind: "decorator" },
  info: { kind: "decorator" },
  oneOf: { kind: "decorator" },
  operationId: { kind: "decorator" },
  tagMetadata: { kind: "decorator" },
  useRef: { kind: "decorator" },
} satisfies Record<string, Descriptor>;

export type LibraryDecorators = LibraryFrom<typeof decorators>;

export default decorators;
