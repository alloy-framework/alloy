import SafeHandles from "../../Microsoft/Win32/SafeHandles/index.js";
import System from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Tasks } from "./Tasks/index.js";

type ThreadingLibrary = LibrarySymbolReference & {
  CancellationToken: LibrarySymbolReference & {
    CancellationToken: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Register: LibrarySymbolReference;
    ThrowIfCancellationRequested: LibrarySymbolReference;
    UnsafeRegister: LibrarySymbolReference;
    CanBeCanceled: LibrarySymbolReference;
    IsCancellationRequested: LibrarySymbolReference;
    None: LibrarySymbolReference;
    WaitHandle: LibrarySymbolReference
  };
  CancellationTokenRegistration: LibrarySymbolReference & {
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Unregister: LibrarySymbolReference;
    Token: LibrarySymbolReference
  };
  CancellationTokenSource: LibrarySymbolReference & {
    CancellationTokenSource: LibrarySymbolReference;
    Cancel: LibrarySymbolReference;
    CancelAfter: LibrarySymbolReference;
    CancelAsync: LibrarySymbolReference;
    CreateLinkedTokenSource: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    TryReset: LibrarySymbolReference;
    IsCancellationRequested: LibrarySymbolReference;
    Token: LibrarySymbolReference
  };
  ITimer: LibrarySymbolReference & {
    Change: LibrarySymbolReference
  };
  LazyThreadSafetyMode: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    PublicationOnly: LibrarySymbolReference;
    ExecutionAndPublication: LibrarySymbolReference
  };
  Lock: LibrarySymbolReference & {
    Scope: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference
    }
  };
  PeriodicTimer: LibrarySymbolReference & {
    PeriodicTimer: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    WaitForNextTickAsync: LibrarySymbolReference;
    Period: LibrarySymbolReference
  };
  Timeout: LibrarySymbolReference & {
    Infinite: LibrarySymbolReference;
    InfiniteTimeSpan: LibrarySymbolReference
  };
  Timer: LibrarySymbolReference & {
    Timer: LibrarySymbolReference;
    Change: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    ActiveCount: LibrarySymbolReference
  };
  TimerCallback: LibrarySymbolReference & {
    TimerCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  WaitHandle: LibrarySymbolReference & {
    InvalidHandle: LibrarySymbolReference;
    WaitTimeout: LibrarySymbolReference;
    WaitHandle: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    SignalAndWait: LibrarySymbolReference;
    WaitAll: LibrarySymbolReference;
    WaitAny: LibrarySymbolReference;
    WaitOne: LibrarySymbolReference;
    Handle: LibrarySymbolReference;
    SafeWaitHandle: LibrarySymbolReference
  };
  WaitHandleExtensions: LibrarySymbolReference & {
    GetSafeWaitHandle: LibrarySymbolReference;
    SetSafeWaitHandle: LibrarySymbolReference
  }
};
const Threading: ThreadingLibrary = createLibrary("System.Threading", {
  CancellationToken: {
    kind: "struct",
    members: {
      CancellationToken: {
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
      Register: {
        kind: "method",
        methodKind: "ordinary",
      },
      ThrowIfCancellationRequested: {
        kind: "method",
        methodKind: "ordinary",
      },
      UnsafeRegister: {
        kind: "method",
        methodKind: "ordinary",
      },
      CanBeCanceled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsCancellationRequested: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      None: {
        kind: "property",
        type: () => {
          return Threading.CancellationToken;
        },
        isStatic: true,
      },
      WaitHandle: {
        kind: "property",
        type: () => {
          return Threading.WaitHandle;
        },
      },
    },
  },
  CancellationTokenRegistration: {
    kind: "struct",
    members: {
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
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
      Unregister: {
        kind: "method",
        methodKind: "ordinary",
      },
      Token: {
        kind: "property",
        type: () => {
          return Threading.CancellationToken;
        },
      },
    },
  },
  CancellationTokenSource: {
    kind: "class",
    members: {
      CancellationTokenSource: {
        kind: "method",
        methodKind: "constructor",
      },
      Cancel: {
        kind: "method",
        methodKind: "ordinary",
      },
      CancelAfter: {
        kind: "method",
        methodKind: "ordinary",
      },
      CancelAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateLinkedTokenSource: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReset: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsCancellationRequested: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Token: {
        kind: "property",
        type: () => {
          return Threading.CancellationToken;
        },
      },
    },
  },
  ITimer: {
    kind: "interface",
    members: {
      Change: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  LazyThreadSafetyMode: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Threading.LazyThreadSafetyMode;
        },
      },
      PublicationOnly: {
        kind: "field",
        type: () => {
          return Threading.LazyThreadSafetyMode;
        },
      },
      ExecutionAndPublication: {
        kind: "field",
        type: () => {
          return Threading.LazyThreadSafetyMode;
        },
      },
    },
  },
  Lock: {
    kind: "class",
    members: {
      Scope: {
        kind: "struct",
        members: {
          Dispose: {
            kind: "method",
            methodKind: "ordinary",
          },
        },
      },
    },
  },
  PeriodicTimer: {
    kind: "class",
    members: {
      PeriodicTimer: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      WaitForNextTickAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Period: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
    },
    isSealed: true,
  },
  Timeout: {
    kind: "class",
    members: {
      Infinite: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      InfiniteTimeSpan: {
        kind: "field",
        type: () => {
          return System.TimeSpan;
        },
        isStatic: true,
        isReadOnly: true,
      },
    },
    isStatic: true,
  },
  Timer: {
    kind: "class",
    members: {
      Timer: {
        kind: "method",
        methodKind: "constructor",
      },
      Change: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ActiveCount: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  TimerCallback: {
    kind: "generic",
    members: {
      TimerCallback: {
        kind: "method",
        methodKind: "constructor",
      },
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BeginInvoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EndInvoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  WaitHandle: {
    kind: "class",
    members: {
      InvalidHandle: {
        kind: "field",
        type: () => {
          return System.IntPtr;
        },
        isStatic: true,
        isReadOnly: true,
      },
      WaitTimeout: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      WaitHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      SignalAndWait: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WaitAll: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WaitAny: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WaitOne: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Handle: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
        isVirtual: true,
      },
      SafeWaitHandle: {
        kind: "property",
        type: () => {
          return SafeHandles.SafeWaitHandle;
        },
      },
    },
    isAbstract: true,
  },
  WaitHandleExtensions: {
    kind: "class",
    members: {
      GetSafeWaitHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetSafeWaitHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Threading
