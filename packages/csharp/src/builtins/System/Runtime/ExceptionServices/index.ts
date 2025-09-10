import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ExceptionServicesLibrary = LibrarySymbolReference & {
  ExceptionDispatchInfo: LibrarySymbolReference & {
    Capture: LibrarySymbolReference;
    SetCurrentStackTrace: LibrarySymbolReference;
    SetRemoteStackTrace: LibrarySymbolReference;
    Throw: LibrarySymbolReference;
    SourceException: LibrarySymbolReference
  };
  FirstChanceExceptionEventArgs: LibrarySymbolReference & {
    FirstChanceExceptionEventArgs: LibrarySymbolReference;
    Exception: LibrarySymbolReference
  };
  HandleProcessCorruptedStateExceptionsAttribute: LibrarySymbolReference & {
    HandleProcessCorruptedStateExceptionsAttribute: LibrarySymbolReference
  }
};
const ExceptionServices: ExceptionServicesLibrary = createLibrary("System.Runtime.ExceptionServices", {
  ExceptionDispatchInfo: {
    kind: "class",
    members: {
      Capture: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetCurrentStackTrace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetRemoteStackTrace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Throw: {
        kind: "method",
        methodKind: "ordinary",
      },
      SourceException: {
        kind: "property",
        type: () => {
          return System.Exception;
        },
      },
    },
    isSealed: true,
  },
  FirstChanceExceptionEventArgs: {
    kind: "class",
    members: {
      FirstChanceExceptionEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Exception: {
        kind: "property",
        type: () => {
          return System.Exception;
        },
      },
    },
  },
  HandleProcessCorruptedStateExceptionsAttribute: {
    kind: "class",
    members: {
      HandleProcessCorruptedStateExceptionsAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
});
export default ExceptionServices
