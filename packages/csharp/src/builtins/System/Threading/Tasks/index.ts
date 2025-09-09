import System from "../../index.js";
import Threading from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Sources } from "./Sources/index.js";

type TasksLibrary = LibrarySymbolReference & {
  ConcurrentExclusiveSchedulerPair: LibrarySymbolReference & {
    ConcurrentExclusiveSchedulerPair: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    Completion: LibrarySymbolReference;
    ConcurrentScheduler: LibrarySymbolReference;
    ExclusiveScheduler: LibrarySymbolReference
  };
  ConfigureAwaitOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    ContinueOnCapturedContext: LibrarySymbolReference;
    SuppressThrowing: LibrarySymbolReference;
    ForceYielding: LibrarySymbolReference
  };
  Task: LibrarySymbolReference & {
    Task: LibrarySymbolReference;
    ConfigureAwait: LibrarySymbolReference;
    ContinueWith: LibrarySymbolReference;
    GetAwaiter: LibrarySymbolReference;
    WaitAsync: LibrarySymbolReference;
    Factory: LibrarySymbolReference;
    Result: LibrarySymbolReference
  };
  TaskAsyncEnumerableExtensions: LibrarySymbolReference & {
    ConfigureAwait: LibrarySymbolReference
  };
  TaskCanceledException: LibrarySymbolReference & {
    TaskCanceledException: LibrarySymbolReference;
    Task: LibrarySymbolReference
  };
  TaskCompletionSource: LibrarySymbolReference & {
    TaskCompletionSource: LibrarySymbolReference;
    SetCanceled: LibrarySymbolReference;
    SetException: LibrarySymbolReference;
    SetFromTask: LibrarySymbolReference;
    SetResult: LibrarySymbolReference;
    TrySetCanceled: LibrarySymbolReference;
    TrySetException: LibrarySymbolReference;
    TrySetFromTask: LibrarySymbolReference;
    TrySetResult: LibrarySymbolReference;
    Task: LibrarySymbolReference
  };
  TaskContinuationOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    PreferFairness: LibrarySymbolReference;
    LongRunning: LibrarySymbolReference;
    AttachedToParent: LibrarySymbolReference;
    DenyChildAttach: LibrarySymbolReference;
    HideScheduler: LibrarySymbolReference;
    LazyCancellation: LibrarySymbolReference;
    RunContinuationsAsynchronously: LibrarySymbolReference;
    NotOnRanToCompletion: LibrarySymbolReference;
    NotOnFaulted: LibrarySymbolReference;
    OnlyOnCanceled: LibrarySymbolReference;
    NotOnCanceled: LibrarySymbolReference;
    OnlyOnFaulted: LibrarySymbolReference;
    OnlyOnRanToCompletion: LibrarySymbolReference;
    ExecuteSynchronously: LibrarySymbolReference
  };
  TaskCreationOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    PreferFairness: LibrarySymbolReference;
    LongRunning: LibrarySymbolReference;
    AttachedToParent: LibrarySymbolReference;
    DenyChildAttach: LibrarySymbolReference;
    HideScheduler: LibrarySymbolReference;
    RunContinuationsAsynchronously: LibrarySymbolReference
  };
  TaskExtensions: LibrarySymbolReference & {
    Unwrap: LibrarySymbolReference
  };
  TaskFactory: LibrarySymbolReference & {
    TaskFactory: LibrarySymbolReference;
    ContinueWhenAll: LibrarySymbolReference;
    ContinueWhenAny: LibrarySymbolReference;
    FromAsync: LibrarySymbolReference;
    StartNew: LibrarySymbolReference;
    CancellationToken: LibrarySymbolReference;
    ContinuationOptions: LibrarySymbolReference;
    CreationOptions: LibrarySymbolReference;
    Scheduler: LibrarySymbolReference
  };
  TaskScheduler: LibrarySymbolReference & {
    TaskScheduler: LibrarySymbolReference;
    FromCurrentSynchronizationContext: LibrarySymbolReference;
    GetScheduledTasks: LibrarySymbolReference;
    QueueTask: LibrarySymbolReference;
    TryDequeue: LibrarySymbolReference;
    TryExecuteTask: LibrarySymbolReference;
    TryExecuteTaskInline: LibrarySymbolReference;
    Current: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    Id: LibrarySymbolReference;
    MaximumConcurrencyLevel: LibrarySymbolReference
  };
  TaskSchedulerException: LibrarySymbolReference & {
    TaskSchedulerException: LibrarySymbolReference
  };
  TaskStatus: LibrarySymbolReference & {
    Created: LibrarySymbolReference;
    WaitingForActivation: LibrarySymbolReference;
    WaitingToRun: LibrarySymbolReference;
    Running: LibrarySymbolReference;
    WaitingForChildrenToComplete: LibrarySymbolReference;
    RanToCompletion: LibrarySymbolReference;
    Canceled: LibrarySymbolReference;
    Faulted: LibrarySymbolReference
  };
  TaskToAsyncResult: LibrarySymbolReference & {
    Begin: LibrarySymbolReference;
    End: LibrarySymbolReference;
    Unwrap: LibrarySymbolReference
  };
  UnobservedTaskExceptionEventArgs: LibrarySymbolReference & {
    UnobservedTaskExceptionEventArgs: LibrarySymbolReference;
    SetObserved: LibrarySymbolReference;
    Exception: LibrarySymbolReference;
    Observed: LibrarySymbolReference
  };
  ValueTask: LibrarySymbolReference & {
    ValueTask: LibrarySymbolReference;
    AsTask: LibrarySymbolReference;
    ConfigureAwait: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetAwaiter: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Preserve: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    IsCanceled: LibrarySymbolReference;
    IsCompleted: LibrarySymbolReference;
    IsCompletedSuccessfully: LibrarySymbolReference;
    IsFaulted: LibrarySymbolReference;
    Result: LibrarySymbolReference
  }
};
const Tasks: TasksLibrary = createLibrary("System.Threading.Tasks", {
  ConcurrentExclusiveSchedulerPair: {
    kind: "class",
    members: {
      ConcurrentExclusiveSchedulerPair: {
        kind: "method",
        methodKind: "constructor",
      },
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
      Completion: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
      },
      ConcurrentScheduler: {
        kind: "property",
        type: () => {
          return Tasks.TaskScheduler;
        },
      },
      ExclusiveScheduler: {
        kind: "property",
        type: () => {
          return Tasks.TaskScheduler;
        },
      },
    },
  },
  ConfigureAwaitOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Tasks.ConfigureAwaitOptions;
        },
      },
      ContinueOnCapturedContext: {
        kind: "field",
        type: () => {
          return Tasks.ConfigureAwaitOptions;
        },
      },
      SuppressThrowing: {
        kind: "field",
        type: () => {
          return Tasks.ConfigureAwaitOptions;
        },
      },
      ForceYielding: {
        kind: "field",
        type: () => {
          return Tasks.ConfigureAwaitOptions;
        },
      },
    },
  },
  Task: {
    kind: "class",
    members: {
      Task: {
        kind: "method",
        methodKind: "constructor",
      },
      ConfigureAwait: {
        kind: "method",
        methodKind: "ordinary",
      },
      ContinueWith: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAwaiter: {
        kind: "method",
        methodKind: "ordinary",
      },
      WaitAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Factory: {
        kind: "property",
        type: () => {
          return Tasks.TaskFactory;
        },
        isStatic: true,
      },
      Result: {
        kind: "property",
        type: undefined,
      },
    },
  },
  TaskAsyncEnumerableExtensions: {
    kind: "class",
    members: {
      ConfigureAwait: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  TaskCanceledException: {
    kind: "class",
    members: {
      TaskCanceledException: {
        kind: "method",
        methodKind: "constructor",
      },
      Task: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
      },
    },
  },
  TaskCompletionSource: {
    kind: "class",
    members: {
      TaskCompletionSource: {
        kind: "method",
        methodKind: "constructor",
      },
      SetCanceled: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetException: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetFromTask: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetResult: {
        kind: "method",
        methodKind: "ordinary",
      },
      TrySetCanceled: {
        kind: "method",
        methodKind: "ordinary",
      },
      TrySetException: {
        kind: "method",
        methodKind: "ordinary",
      },
      TrySetFromTask: {
        kind: "method",
        methodKind: "ordinary",
      },
      TrySetResult: {
        kind: "method",
        methodKind: "ordinary",
      },
      Task: {
        kind: "property",
        type: () => {
          return Tasks.Task;
        },
      },
    },
  },
  TaskContinuationOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      PreferFairness: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      LongRunning: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      AttachedToParent: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      DenyChildAttach: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      HideScheduler: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      LazyCancellation: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      RunContinuationsAsynchronously: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      NotOnRanToCompletion: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      NotOnFaulted: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      OnlyOnCanceled: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      NotOnCanceled: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      OnlyOnFaulted: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      OnlyOnRanToCompletion: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      ExecuteSynchronously: {
        kind: "field",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
    },
  },
  TaskCreationOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Tasks.TaskCreationOptions;
        },
      },
      PreferFairness: {
        kind: "field",
        type: () => {
          return Tasks.TaskCreationOptions;
        },
      },
      LongRunning: {
        kind: "field",
        type: () => {
          return Tasks.TaskCreationOptions;
        },
      },
      AttachedToParent: {
        kind: "field",
        type: () => {
          return Tasks.TaskCreationOptions;
        },
      },
      DenyChildAttach: {
        kind: "field",
        type: () => {
          return Tasks.TaskCreationOptions;
        },
      },
      HideScheduler: {
        kind: "field",
        type: () => {
          return Tasks.TaskCreationOptions;
        },
      },
      RunContinuationsAsynchronously: {
        kind: "field",
        type: () => {
          return Tasks.TaskCreationOptions;
        },
      },
    },
  },
  TaskExtensions: {
    kind: "class",
    members: {
      Unwrap: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  TaskFactory: {
    kind: "class",
    members: {
      TaskFactory: {
        kind: "method",
        methodKind: "constructor",
      },
      ContinueWhenAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      ContinueWhenAny: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      StartNew: {
        kind: "method",
        methodKind: "ordinary",
      },
      CancellationToken: {
        kind: "property",
        type: () => {
          return Threading.CancellationToken;
        },
      },
      ContinuationOptions: {
        kind: "property",
        type: () => {
          return Tasks.TaskContinuationOptions;
        },
      },
      CreationOptions: {
        kind: "property",
        type: () => {
          return Tasks.TaskCreationOptions;
        },
      },
      Scheduler: {
        kind: "property",
        type: () => {
          return Tasks.TaskScheduler;
        },
      },
    },
  },
  TaskScheduler: {
    kind: "class",
    members: {
      TaskScheduler: {
        kind: "method",
        methodKind: "constructor",
      },
      FromCurrentSynchronizationContext: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetScheduledTasks: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      QueueTask: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      TryDequeue: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryExecuteTask: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryExecuteTaskInline: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Current: {
        kind: "property",
        type: () => {
          return Tasks.TaskScheduler;
        },
        isStatic: true,
      },
      Default: {
        kind: "property",
        type: () => {
          return Tasks.TaskScheduler;
        },
        isStatic: true,
      },
      Id: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaximumConcurrencyLevel: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  TaskSchedulerException: {
    kind: "class",
    members: {
      TaskSchedulerException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  TaskStatus: {
    kind: "enum",
    members: {
      Created: {
        kind: "field",
        type: () => {
          return Tasks.TaskStatus;
        },
      },
      WaitingForActivation: {
        kind: "field",
        type: () => {
          return Tasks.TaskStatus;
        },
      },
      WaitingToRun: {
        kind: "field",
        type: () => {
          return Tasks.TaskStatus;
        },
      },
      Running: {
        kind: "field",
        type: () => {
          return Tasks.TaskStatus;
        },
      },
      WaitingForChildrenToComplete: {
        kind: "field",
        type: () => {
          return Tasks.TaskStatus;
        },
      },
      RanToCompletion: {
        kind: "field",
        type: () => {
          return Tasks.TaskStatus;
        },
      },
      Canceled: {
        kind: "field",
        type: () => {
          return Tasks.TaskStatus;
        },
      },
      Faulted: {
        kind: "field",
        type: () => {
          return Tasks.TaskStatus;
        },
      },
    },
  },
  TaskToAsyncResult: {
    kind: "class",
    members: {
      Begin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      End: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Unwrap: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  UnobservedTaskExceptionEventArgs: {
    kind: "class",
    members: {
      UnobservedTaskExceptionEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      SetObserved: {
        kind: "method",
        methodKind: "ordinary",
      },
      Exception: {
        kind: "property",
        type: () => {
          return System.AggregateException;
        },
      },
      Observed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ValueTask: {
    kind: "struct",
    members: {
      ValueTask: {
        kind: "method",
        methodKind: "constructor",
      },
      AsTask: {
        kind: "method",
        methodKind: "ordinary",
      },
      ConfigureAwait: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetAwaiter: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Preserve: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsCanceled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsCompleted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsCompletedSuccessfully: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsFaulted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Result: {
        kind: "property",
        type: undefined,
      },
    },
  },
});
export default Tasks
