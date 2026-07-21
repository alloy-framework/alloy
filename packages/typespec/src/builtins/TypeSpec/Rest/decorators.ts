import { Descriptor, LibraryFrom } from "../../../index.js";

const decorators = {
  action: { kind: "decorator" },
  actionSeparator: { kind: "decorator" },
  autoRoute: { kind: "decorator" },
  collectionAction: { kind: "decorator" },
  copyResourceKeyParameters: { kind: "decorator" },
  createsOrReplacesResource: { kind: "decorator" },
  createsOrUpdatesResource: { kind: "decorator" },
  createsResource: { kind: "decorator" },
  deletesResource: { kind: "decorator" },
  listsResource: { kind: "decorator" },
  parentResource: { kind: "decorator" },
  readsResource: { kind: "decorator" },
  resource: { kind: "decorator" },
  segment: { kind: "decorator" },
  segmentOf: { kind: "decorator" },
  updatesResource: { kind: "decorator" },
} satisfies Record<string, Descriptor>;

export type LibraryDecorators = LibraryFrom<typeof decorators>;

export default decorators;
