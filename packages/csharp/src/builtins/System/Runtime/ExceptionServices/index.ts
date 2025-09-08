import System from "../../index.js";

import { createLibrary } from "#createLibrary";


const ExceptionServices = createLibrary("System.Runtime.ExceptionServices", {
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
