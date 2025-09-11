import Generic from "../Generic/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type FrozenLibrary = LibrarySymbolReference & {
  FrozenDictionary: LibrarySymbolReference & {
    AlternateLookup: LibrarySymbolReference & {
      ContainsKey: LibrarySymbolReference;
      TryGetValue: LibrarySymbolReference;
      Dictionary: LibrarySymbolReference;
      Item: LibrarySymbolReference
    };
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  FrozenSet: LibrarySymbolReference & {
    AlternateLookup: LibrarySymbolReference & {
      Contains: LibrarySymbolReference;
      TryGetValue: LibrarySymbolReference;
      Set: LibrarySymbolReference
    };
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  }
};
const Frozen: FrozenLibrary = createLibrary("System.Collections.Frozen", {
  FrozenDictionary: {
    kind: "class",
    members: {
      AlternateLookup: {
        kind: "struct",
        members: {
          ContainsKey: {
            kind: "method",
            methodKind: "ordinary",
          },
          TryGetValue: {
            kind: "method",
            methodKind: "ordinary",
          },
          Dictionary: {
            kind: "property",
            type: () => {
              return Frozen.FrozenDictionary;
            },
          },
          Item: {
            kind: "property",
            type: undefined,
          },
        },
      },
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Generic.KeyValuePair;
            },
            isReadOnly: true,
          },
        },
      },
    },
  },
  FrozenSet: {
    kind: "class",
    members: {
      AlternateLookup: {
        kind: "struct",
        members: {
          Contains: {
            kind: "method",
            methodKind: "ordinary",
          },
          TryGetValue: {
            kind: "method",
            methodKind: "ordinary",
          },
          Set: {
            kind: "property",
            type: () => {
              return Frozen.FrozenSet;
            },
          },
        },
      },
      Enumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: undefined,
            isReadOnly: true,
          },
        },
      },
    },
  },
});
export default Frozen
