import System from "../../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type JavaScriptLibrary = LibrarySymbolReference & {
  JSException: LibrarySymbolReference & {
    JSException: LibrarySymbolReference
  };
  JSExportAttribute: LibrarySymbolReference & {
    JSExportAttribute: LibrarySymbolReference
  };
  JSHost: LibrarySymbolReference & {
    ImportAsync: LibrarySymbolReference;
    GlobalThis: LibrarySymbolReference;
    DotnetInstance: LibrarySymbolReference
  };
  JSImportAttribute: LibrarySymbolReference & {
    JSImportAttribute: LibrarySymbolReference;
    FunctionName: LibrarySymbolReference;
    ModuleName: LibrarySymbolReference
  };
  JSMarshalAsAttribute: LibrarySymbolReference & {
    JSMarshalAsAttribute: LibrarySymbolReference
  };
  JSObject: LibrarySymbolReference & {
    Dispose: LibrarySymbolReference;
    HasProperty: LibrarySymbolReference;
    GetTypeOfProperty: LibrarySymbolReference;
    GetPropertyAsBoolean: LibrarySymbolReference;
    GetPropertyAsInt32: LibrarySymbolReference;
    GetPropertyAsDouble: LibrarySymbolReference;
    GetPropertyAsString: LibrarySymbolReference;
    GetPropertyAsJSObject: LibrarySymbolReference;
    GetPropertyAsByteArray: LibrarySymbolReference;
    SetProperty: LibrarySymbolReference;
    IsDisposed: LibrarySymbolReference
  };
  JSType: LibrarySymbolReference & {
    Any: LibrarySymbolReference & {

    };
    Array: LibrarySymbolReference & {

    };
    BigInt: LibrarySymbolReference & {

    };
    Boolean: LibrarySymbolReference & {

    };
    Date: LibrarySymbolReference & {

    };
    Discard: LibrarySymbolReference & {

    };
    Error: LibrarySymbolReference & {

    };
    Function: LibrarySymbolReference & {

    };
    MemoryView: LibrarySymbolReference & {

    };
    Number: LibrarySymbolReference & {

    };
    Object: LibrarySymbolReference & {

    };
    Promise: LibrarySymbolReference & {

    };
    String: LibrarySymbolReference & {

    };
    Void: LibrarySymbolReference & {

    }
  }
};
const JavaScript: JavaScriptLibrary = createLibrary("System.Runtime.InteropServices.JavaScript", {
  JSException: {
    kind: "class",
    members: {
      JSException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  JSExportAttribute: {
    kind: "class",
    members: {
      JSExportAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  JSHost: {
    kind: "class",
    members: {
      ImportAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GlobalThis: {
        kind: "property",
        type: () => {
          return JavaScript.JSObject;
        },
        isStatic: true,
      },
      DotnetInstance: {
        kind: "property",
        type: () => {
          return JavaScript.JSObject;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  JSImportAttribute: {
    kind: "class",
    members: {
      JSImportAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      FunctionName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ModuleName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  JSMarshalAsAttribute: {
    kind: "class",
    members: {
      JSMarshalAsAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  JSObject: {
    kind: "class",
    members: {
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      HasProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetTypeOfProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPropertyAsBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPropertyAsInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPropertyAsDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPropertyAsString: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPropertyAsJSObject: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPropertyAsByteArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsDisposed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  JSType: {
    kind: "class",
    members: {
      Any: {
        kind: "class",
        members: {},
        isSealed: true,
      },
      Array: {
        kind: "class",
        members: {},
        isSealed: true,
      },
      BigInt: {
        kind: "class",
        members: {},
        isSealed: true,
      },
      Boolean: {
        kind: "class",
        members: {},
        isSealed: true,
      },
      Date: {
        kind: "class",
        members: {},
        isSealed: true,
      },
      Discard: {
        kind: "class",
        members: {},
        isSealed: true,
      },
      Error: {
        kind: "class",
        members: {},
        isSealed: true,
      },
      Function: {
        kind: "class",
        members: {},
        isSealed: true,
      },
      MemoryView: {
        kind: "class",
        members: {},
        isSealed: true,
      },
      Number: {
        kind: "class",
        members: {},
        isSealed: true,
      },
      Object: {
        kind: "class",
        members: {},
        isSealed: true,
      },
      Promise: {
        kind: "class",
        members: {},
        isSealed: true,
      },
      String: {
        kind: "class",
        members: {},
        isSealed: true,
      },
      Void: {
        kind: "class",
        members: {},
        isSealed: true,
      },
    },
  },
});
export default JavaScript
