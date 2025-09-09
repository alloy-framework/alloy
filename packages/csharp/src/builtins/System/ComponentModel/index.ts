import System from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ComponentModelLibrary = LibrarySymbolReference & {
  DefaultValueAttribute: LibrarySymbolReference & {
    DefaultValueAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    SetValue: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  EditorBrowsableAttribute: LibrarySymbolReference & {
    EditorBrowsableAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    State: LibrarySymbolReference
  };
  EditorBrowsableState: LibrarySymbolReference & {
    Always: LibrarySymbolReference;
    Never: LibrarySymbolReference;
    Advanced: LibrarySymbolReference
  }
};
const ComponentModel: ComponentModelLibrary = createLibrary("System.ComponentModel", {
  DefaultValueAttribute: {
    kind: "class",
    members: {
      DefaultValueAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
  },
  EditorBrowsableAttribute: {
    kind: "class",
    members: {
      EditorBrowsableAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      State: {
        kind: "property",
        type: () => {
          return ComponentModel.EditorBrowsableState;
        },
      },
    },
    isSealed: true,
  },
  EditorBrowsableState: {
    kind: "enum",
    members: {
      Always: {
        kind: "field",
        type: () => {
          return ComponentModel.EditorBrowsableState;
        },
      },
      Never: {
        kind: "field",
        type: () => {
          return ComponentModel.EditorBrowsableState;
        },
      },
      Advanced: {
        kind: "field",
        type: () => {
          return ComponentModel.EditorBrowsableState;
        },
      },
    },
  },
});
export default ComponentModel
