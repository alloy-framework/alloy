import System from "../../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type SchemaLibrary = LibrarySymbolReference & {
  ColumnAttribute: LibrarySymbolReference & {
    ColumnAttribute: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Order: LibrarySymbolReference;
    TypeName: LibrarySymbolReference
  };
  ComplexTypeAttribute: LibrarySymbolReference & {
    ComplexTypeAttribute: LibrarySymbolReference
  };
  DatabaseGeneratedAttribute: LibrarySymbolReference & {
    DatabaseGeneratedAttribute: LibrarySymbolReference;
    DatabaseGeneratedOption: LibrarySymbolReference
  };
  DatabaseGeneratedOption: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Identity: LibrarySymbolReference;
    Computed: LibrarySymbolReference
  };
  ForeignKeyAttribute: LibrarySymbolReference & {
    ForeignKeyAttribute: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  InversePropertyAttribute: LibrarySymbolReference & {
    InversePropertyAttribute: LibrarySymbolReference;
    Property: LibrarySymbolReference
  };
  NotMappedAttribute: LibrarySymbolReference & {
    NotMappedAttribute: LibrarySymbolReference
  };
  TableAttribute: LibrarySymbolReference & {
    TableAttribute: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Schema: LibrarySymbolReference
  }
};
const Schema: SchemaLibrary = createLibrary("System.ComponentModel.DataAnnotations.Schema", {
  ColumnAttribute: {
    kind: "class",
    members: {
      ColumnAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Order: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      TypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  ComplexTypeAttribute: {
    kind: "class",
    members: {
      ComplexTypeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  DatabaseGeneratedAttribute: {
    kind: "class",
    members: {
      DatabaseGeneratedAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      DatabaseGeneratedOption: {
        kind: "property",
        type: () => {
          return Schema.DatabaseGeneratedOption;
        },
      },
    },
  },
  DatabaseGeneratedOption: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Schema.DatabaseGeneratedOption;
        },
      },
      Identity: {
        kind: "field",
        type: () => {
          return Schema.DatabaseGeneratedOption;
        },
      },
      Computed: {
        kind: "field",
        type: () => {
          return Schema.DatabaseGeneratedOption;
        },
      },
    },
  },
  ForeignKeyAttribute: {
    kind: "class",
    members: {
      ForeignKeyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  InversePropertyAttribute: {
    kind: "class",
    members: {
      InversePropertyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Property: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  NotMappedAttribute: {
    kind: "class",
    members: {
      NotMappedAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  TableAttribute: {
    kind: "class",
    members: {
      TableAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Schema: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
});
export default Schema
