import SafeHandles from "../../Microsoft/Win32/SafeHandles/index.js";
import Generic from "../Collections/Generic/index.js";
import Globalization from "../Globalization/index.js";
import System from "../index.js";
import InteropServices from "../Runtime/InteropServices/index.js";
import Principal from "../Security/Principal/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Channels } from "./Channels/index.js";
export { default as Tasks } from "./Tasks/index.js";

type ThreadingLibrary = LibrarySymbolReference & {
  AbandonedMutexException: LibrarySymbolReference & {
    AbandonedMutexException: LibrarySymbolReference;
    Mutex: LibrarySymbolReference;
    MutexIndex: LibrarySymbolReference
  };
  ApartmentState: LibrarySymbolReference & {
    STA: LibrarySymbolReference;
    MTA: LibrarySymbolReference;
    Unknown: LibrarySymbolReference
  };
  AsyncFlowControl: LibrarySymbolReference & {
    Dispose: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Undo: LibrarySymbolReference
  };
  AsyncLocal: LibrarySymbolReference & {
    AsyncLocal: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  AsyncLocalValueChangedArgs: LibrarySymbolReference & {
    CurrentValue: LibrarySymbolReference;
    PreviousValue: LibrarySymbolReference;
    ThreadContextChanged: LibrarySymbolReference
  };
  AutoResetEvent: LibrarySymbolReference & {
    AutoResetEvent: LibrarySymbolReference
  };
  Barrier: LibrarySymbolReference & {
    Barrier: LibrarySymbolReference;
    AddParticipant: LibrarySymbolReference;
    AddParticipants: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    RemoveParticipant: LibrarySymbolReference;
    RemoveParticipants: LibrarySymbolReference;
    SignalAndWait: LibrarySymbolReference;
    CurrentPhaseNumber: LibrarySymbolReference;
    ParticipantCount: LibrarySymbolReference;
    ParticipantsRemaining: LibrarySymbolReference
  };
  BarrierPostPhaseException: LibrarySymbolReference & {
    BarrierPostPhaseException: LibrarySymbolReference
  };
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
  CompressedStack: LibrarySymbolReference & {
    Capture: LibrarySymbolReference;
    CreateCopy: LibrarySymbolReference;
    GetCompressedStack: LibrarySymbolReference;
    Run: LibrarySymbolReference
  };
  ContextCallback: LibrarySymbolReference & {
    ContextCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  CountdownEvent: LibrarySymbolReference & {
    CountdownEvent: LibrarySymbolReference;
    AddCount: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Signal: LibrarySymbolReference;
    TryAddCount: LibrarySymbolReference;
    Wait: LibrarySymbolReference;
    CurrentCount: LibrarySymbolReference;
    InitialCount: LibrarySymbolReference;
    IsSet: LibrarySymbolReference;
    WaitHandle: LibrarySymbolReference
  };
  EventResetMode: LibrarySymbolReference & {
    AutoReset: LibrarySymbolReference;
    ManualReset: LibrarySymbolReference
  };
  EventWaitHandle: LibrarySymbolReference & {
    EventWaitHandle: LibrarySymbolReference;
    OpenExisting: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Set: LibrarySymbolReference;
    TryOpenExisting: LibrarySymbolReference
  };
  ExecutionContext: LibrarySymbolReference & {
    Capture: LibrarySymbolReference;
    CreateCopy: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    IsFlowSuppressed: LibrarySymbolReference;
    Restore: LibrarySymbolReference;
    RestoreFlow: LibrarySymbolReference;
    Run: LibrarySymbolReference;
    SuppressFlow: LibrarySymbolReference
  };
  HostExecutionContext: LibrarySymbolReference & {
    HostExecutionContext: LibrarySymbolReference;
    CreateCopy: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    State: LibrarySymbolReference
  };
  HostExecutionContextManager: LibrarySymbolReference & {
    HostExecutionContextManager: LibrarySymbolReference;
    Capture: LibrarySymbolReference;
    Revert: LibrarySymbolReference;
    SetHostExecutionContext: LibrarySymbolReference
  };
  IOCompletionCallback: LibrarySymbolReference & {
    IOCompletionCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  IThreadPoolWorkItem: LibrarySymbolReference & {
    Execute: LibrarySymbolReference
  };
  ITimer: LibrarySymbolReference & {
    Change: LibrarySymbolReference
  };
  Interlocked: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    And: LibrarySymbolReference;
    CompareExchange: LibrarySymbolReference;
    Decrement: LibrarySymbolReference;
    Exchange: LibrarySymbolReference;
    Increment: LibrarySymbolReference;
    MemoryBarrier: LibrarySymbolReference;
    MemoryBarrierProcessWide: LibrarySymbolReference;
    Or: LibrarySymbolReference;
    Read: LibrarySymbolReference
  };
  LazyInitializer: LibrarySymbolReference & {

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
  LockCookie: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference
  };
  LockRecursionException: LibrarySymbolReference & {
    LockRecursionException: LibrarySymbolReference
  };
  LockRecursionPolicy: LibrarySymbolReference & {
    NoRecursion: LibrarySymbolReference;
    SupportsRecursion: LibrarySymbolReference
  };
  ManualResetEvent: LibrarySymbolReference & {
    ManualResetEvent: LibrarySymbolReference
  };
  ManualResetEventSlim: LibrarySymbolReference & {
    ManualResetEventSlim: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Set: LibrarySymbolReference;
    Wait: LibrarySymbolReference;
    IsSet: LibrarySymbolReference;
    SpinCount: LibrarySymbolReference;
    WaitHandle: LibrarySymbolReference
  };
  Monitor: LibrarySymbolReference & {
    Enter: LibrarySymbolReference;
    Exit: LibrarySymbolReference;
    IsEntered: LibrarySymbolReference;
    Pulse: LibrarySymbolReference;
    PulseAll: LibrarySymbolReference;
    TryEnter: LibrarySymbolReference;
    Wait: LibrarySymbolReference;
    LockContentionCount: LibrarySymbolReference
  };
  Mutex: LibrarySymbolReference & {
    Mutex: LibrarySymbolReference;
    OpenExisting: LibrarySymbolReference;
    ReleaseMutex: LibrarySymbolReference;
    TryOpenExisting: LibrarySymbolReference
  };
  NativeOverlapped: LibrarySymbolReference & {
    EventHandle: LibrarySymbolReference;
    InternalHigh: LibrarySymbolReference;
    InternalLow: LibrarySymbolReference;
    OffsetHigh: LibrarySymbolReference;
    OffsetLow: LibrarySymbolReference
  };
  Overlapped: LibrarySymbolReference & {
    Overlapped: LibrarySymbolReference;
    Free: LibrarySymbolReference;
    Pack: LibrarySymbolReference;
    Unpack: LibrarySymbolReference;
    UnsafePack: LibrarySymbolReference;
    AsyncResult: LibrarySymbolReference;
    EventHandle: LibrarySymbolReference;
    EventHandleIntPtr: LibrarySymbolReference;
    OffsetHigh: LibrarySymbolReference;
    OffsetLow: LibrarySymbolReference
  };
  ParameterizedThreadStart: LibrarySymbolReference & {
    ParameterizedThreadStart: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  PeriodicTimer: LibrarySymbolReference & {
    PeriodicTimer: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    WaitForNextTickAsync: LibrarySymbolReference;
    Period: LibrarySymbolReference
  };
  PreAllocatedOverlapped: LibrarySymbolReference & {
    PreAllocatedOverlapped: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    UnsafeCreate: LibrarySymbolReference
  };
  ReaderWriterLock: LibrarySymbolReference & {
    ReaderWriterLock: LibrarySymbolReference;
    AcquireReaderLock: LibrarySymbolReference;
    AcquireWriterLock: LibrarySymbolReference;
    AnyWritersSince: LibrarySymbolReference;
    DowngradeFromWriterLock: LibrarySymbolReference;
    ReleaseLock: LibrarySymbolReference;
    ReleaseReaderLock: LibrarySymbolReference;
    ReleaseWriterLock: LibrarySymbolReference;
    RestoreLock: LibrarySymbolReference;
    UpgradeToWriterLock: LibrarySymbolReference;
    IsReaderLockHeld: LibrarySymbolReference;
    IsWriterLockHeld: LibrarySymbolReference;
    WriterSeqNum: LibrarySymbolReference
  };
  ReaderWriterLockSlim: LibrarySymbolReference & {
    ReaderWriterLockSlim: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EnterReadLock: LibrarySymbolReference;
    EnterUpgradeableReadLock: LibrarySymbolReference;
    EnterWriteLock: LibrarySymbolReference;
    ExitReadLock: LibrarySymbolReference;
    ExitUpgradeableReadLock: LibrarySymbolReference;
    ExitWriteLock: LibrarySymbolReference;
    TryEnterReadLock: LibrarySymbolReference;
    TryEnterUpgradeableReadLock: LibrarySymbolReference;
    TryEnterWriteLock: LibrarySymbolReference;
    CurrentReadCount: LibrarySymbolReference;
    IsReadLockHeld: LibrarySymbolReference;
    IsUpgradeableReadLockHeld: LibrarySymbolReference;
    IsWriteLockHeld: LibrarySymbolReference;
    RecursionPolicy: LibrarySymbolReference;
    RecursiveReadCount: LibrarySymbolReference;
    RecursiveUpgradeCount: LibrarySymbolReference;
    RecursiveWriteCount: LibrarySymbolReference;
    WaitingReadCount: LibrarySymbolReference;
    WaitingUpgradeCount: LibrarySymbolReference;
    WaitingWriteCount: LibrarySymbolReference
  };
  RegisteredWaitHandle: LibrarySymbolReference & {
    Unregister: LibrarySymbolReference
  };
  Semaphore: LibrarySymbolReference & {
    Semaphore: LibrarySymbolReference;
    OpenExisting: LibrarySymbolReference;
    Release: LibrarySymbolReference;
    TryOpenExisting: LibrarySymbolReference
  };
  SemaphoreFullException: LibrarySymbolReference & {
    SemaphoreFullException: LibrarySymbolReference
  };
  SemaphoreSlim: LibrarySymbolReference & {
    SemaphoreSlim: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Release: LibrarySymbolReference;
    Wait: LibrarySymbolReference;
    WaitAsync: LibrarySymbolReference;
    AvailableWaitHandle: LibrarySymbolReference;
    CurrentCount: LibrarySymbolReference
  };
  SendOrPostCallback: LibrarySymbolReference & {
    SendOrPostCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  SpinLock: LibrarySymbolReference & {
    SpinLock: LibrarySymbolReference;
    Enter: LibrarySymbolReference;
    Exit: LibrarySymbolReference;
    TryEnter: LibrarySymbolReference;
    IsHeld: LibrarySymbolReference;
    IsHeldByCurrentThread: LibrarySymbolReference;
    IsThreadOwnerTrackingEnabled: LibrarySymbolReference
  };
  SpinWait: LibrarySymbolReference & {
    Reset: LibrarySymbolReference;
    SpinOnce: LibrarySymbolReference;
    SpinUntil: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    NextSpinWillYield: LibrarySymbolReference
  };
  SynchronizationContext: LibrarySymbolReference & {
    SynchronizationContext: LibrarySymbolReference;
    CreateCopy: LibrarySymbolReference;
    IsWaitNotificationRequired: LibrarySymbolReference;
    OperationCompleted: LibrarySymbolReference;
    OperationStarted: LibrarySymbolReference;
    Post: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    SetSynchronizationContext: LibrarySymbolReference;
    SetWaitNotificationRequired: LibrarySymbolReference;
    Wait: LibrarySymbolReference;
    WaitHelper: LibrarySymbolReference;
    Current: LibrarySymbolReference
  };
  SynchronizationLockException: LibrarySymbolReference & {
    SynchronizationLockException: LibrarySymbolReference
  };
  Thread: LibrarySymbolReference & {
    Thread: LibrarySymbolReference;
    Abort: LibrarySymbolReference;
    AllocateDataSlot: LibrarySymbolReference;
    AllocateNamedDataSlot: LibrarySymbolReference;
    BeginCriticalRegion: LibrarySymbolReference;
    BeginThreadAffinity: LibrarySymbolReference;
    DisableComObjectEagerCleanup: LibrarySymbolReference;
    EndCriticalRegion: LibrarySymbolReference;
    EndThreadAffinity: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    FreeNamedDataSlot: LibrarySymbolReference;
    GetApartmentState: LibrarySymbolReference;
    GetCompressedStack: LibrarySymbolReference;
    GetCurrentProcessorId: LibrarySymbolReference;
    GetData: LibrarySymbolReference;
    GetDomain: LibrarySymbolReference;
    GetDomainID: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetNamedDataSlot: LibrarySymbolReference;
    Interrupt: LibrarySymbolReference;
    Join: LibrarySymbolReference;
    MemoryBarrier: LibrarySymbolReference;
    ResetAbort: LibrarySymbolReference;
    Resume: LibrarySymbolReference;
    SetApartmentState: LibrarySymbolReference;
    SetCompressedStack: LibrarySymbolReference;
    SetData: LibrarySymbolReference;
    Sleep: LibrarySymbolReference;
    SpinWait: LibrarySymbolReference;
    Start: LibrarySymbolReference;
    Suspend: LibrarySymbolReference;
    TrySetApartmentState: LibrarySymbolReference;
    UnsafeStart: LibrarySymbolReference;
    Yield: LibrarySymbolReference;
    ApartmentState: LibrarySymbolReference;
    CurrentCulture: LibrarySymbolReference;
    CurrentPrincipal: LibrarySymbolReference;
    CurrentThread: LibrarySymbolReference;
    CurrentUICulture: LibrarySymbolReference;
    ExecutionContext: LibrarySymbolReference;
    IsAlive: LibrarySymbolReference;
    IsBackground: LibrarySymbolReference;
    IsThreadPoolThread: LibrarySymbolReference;
    ManagedThreadId: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Priority: LibrarySymbolReference;
    ThreadState: LibrarySymbolReference
  };
  ThreadAbortException: LibrarySymbolReference & {
    ExceptionState: LibrarySymbolReference
  };
  ThreadExceptionEventArgs: LibrarySymbolReference & {
    ThreadExceptionEventArgs: LibrarySymbolReference;
    Exception: LibrarySymbolReference
  };
  ThreadExceptionEventHandler: LibrarySymbolReference & {
    ThreadExceptionEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  ThreadInterruptedException: LibrarySymbolReference & {
    ThreadInterruptedException: LibrarySymbolReference
  };
  ThreadLocal: LibrarySymbolReference & {
    ThreadLocal: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    IsValueCreated: LibrarySymbolReference;
    Value: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  ThreadPool: LibrarySymbolReference & {
    BindHandle: LibrarySymbolReference;
    GetAvailableThreads: LibrarySymbolReference;
    GetMaxThreads: LibrarySymbolReference;
    GetMinThreads: LibrarySymbolReference;
    QueueUserWorkItem: LibrarySymbolReference;
    RegisterWaitForSingleObject: LibrarySymbolReference;
    SetMaxThreads: LibrarySymbolReference;
    SetMinThreads: LibrarySymbolReference;
    UnsafeQueueNativeOverlapped: LibrarySymbolReference;
    UnsafeQueueUserWorkItem: LibrarySymbolReference;
    UnsafeRegisterWaitForSingleObject: LibrarySymbolReference;
    CompletedWorkItemCount: LibrarySymbolReference;
    PendingWorkItemCount: LibrarySymbolReference;
    ThreadCount: LibrarySymbolReference
  };
  ThreadPoolBoundHandle: LibrarySymbolReference & {
    AllocateNativeOverlapped: LibrarySymbolReference;
    BindHandle: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    FreeNativeOverlapped: LibrarySymbolReference;
    GetNativeOverlappedState: LibrarySymbolReference;
    UnsafeAllocateNativeOverlapped: LibrarySymbolReference;
    Handle: LibrarySymbolReference
  };
  ThreadPriority: LibrarySymbolReference & {
    Lowest: LibrarySymbolReference;
    BelowNormal: LibrarySymbolReference;
    Normal: LibrarySymbolReference;
    AboveNormal: LibrarySymbolReference;
    Highest: LibrarySymbolReference
  };
  ThreadStart: LibrarySymbolReference & {
    ThreadStart: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  ThreadStartException: LibrarySymbolReference & {

  };
  ThreadState: LibrarySymbolReference & {
    Running: LibrarySymbolReference;
    StopRequested: LibrarySymbolReference;
    SuspendRequested: LibrarySymbolReference;
    Background: LibrarySymbolReference;
    Unstarted: LibrarySymbolReference;
    Stopped: LibrarySymbolReference;
    WaitSleepJoin: LibrarySymbolReference;
    Suspended: LibrarySymbolReference;
    AbortRequested: LibrarySymbolReference;
    Aborted: LibrarySymbolReference
  };
  ThreadStateException: LibrarySymbolReference & {
    ThreadStateException: LibrarySymbolReference
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
  Volatile: LibrarySymbolReference & {
    Read: LibrarySymbolReference;
    Write: LibrarySymbolReference
  };
  WaitCallback: LibrarySymbolReference & {
    WaitCallback: LibrarySymbolReference;
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
  WaitHandleCannotBeOpenedException: LibrarySymbolReference & {
    WaitHandleCannotBeOpenedException: LibrarySymbolReference
  };
  WaitHandleExtensions: LibrarySymbolReference & {
    GetSafeWaitHandle: LibrarySymbolReference;
    SetSafeWaitHandle: LibrarySymbolReference
  };
  WaitOrTimerCallback: LibrarySymbolReference & {
    WaitOrTimerCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  }
};
const Threading: ThreadingLibrary = createLibrary("System.Threading", {
  AbandonedMutexException: {
    kind: "class",
    members: {
      AbandonedMutexException: {
        kind: "method",
        methodKind: "constructor",
      },
      Mutex: {
        kind: "property",
        type: () => {
          return Threading.Mutex;
        },
      },
      MutexIndex: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  ApartmentState: {
    kind: "enum",
    members: {
      STA: {
        kind: "field",
        type: () => {
          return Threading.ApartmentState;
        },
      },
      MTA: {
        kind: "field",
        type: () => {
          return Threading.ApartmentState;
        },
      },
      Unknown: {
        kind: "field",
        type: () => {
          return Threading.ApartmentState;
        },
      },
    },
  },
  AsyncFlowControl: {
    kind: "struct",
    members: {
      Dispose: {
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
      Undo: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  AsyncLocal: {
    kind: "class",
    members: {
      AsyncLocal: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: undefined,
      },
    },
    isSealed: true,
  },
  AsyncLocalValueChangedArgs: {
    kind: "struct",
    members: {
      CurrentValue: {
        kind: "property",
        type: undefined,
        isNullable: true,
      },
      PreviousValue: {
        kind: "property",
        type: undefined,
        isNullable: true,
      },
      ThreadContextChanged: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  AutoResetEvent: {
    kind: "class",
    members: {
      AutoResetEvent: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  Barrier: {
    kind: "class",
    members: {
      Barrier: {
        kind: "method",
        methodKind: "constructor",
      },
      AddParticipant: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddParticipants: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveParticipant: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveParticipants: {
        kind: "method",
        methodKind: "ordinary",
      },
      SignalAndWait: {
        kind: "method",
        methodKind: "ordinary",
      },
      CurrentPhaseNumber: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      ParticipantCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ParticipantsRemaining: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  BarrierPostPhaseException: {
    kind: "class",
    members: {
      BarrierPostPhaseException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
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
  CompressedStack: {
    kind: "class",
    members: {
      Capture: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateCopy: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCompressedStack: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Run: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  ContextCallback: {
    kind: "generic",
    members: {
      ContextCallback: {
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
  CountdownEvent: {
    kind: "class",
    members: {
      CountdownEvent: {
        kind: "method",
        methodKind: "constructor",
      },
      AddCount: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Signal: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryAddCount: {
        kind: "method",
        methodKind: "ordinary",
      },
      Wait: {
        kind: "method",
        methodKind: "ordinary",
      },
      CurrentCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      InitialCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsSet: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      WaitHandle: {
        kind: "property",
        type: () => {
          return Threading.WaitHandle;
        },
      },
    },
  },
  EventResetMode: {
    kind: "enum",
    members: {
      AutoReset: {
        kind: "field",
        type: () => {
          return Threading.EventResetMode;
        },
      },
      ManualReset: {
        kind: "field",
        type: () => {
          return Threading.EventResetMode;
        },
      },
    },
  },
  EventWaitHandle: {
    kind: "class",
    members: {
      EventWaitHandle: {
        kind: "method",
        methodKind: "constructor",
      },
      OpenExisting: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Set: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryOpenExisting: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  ExecutionContext: {
    kind: "class",
    members: {
      Capture: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateCopy: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsFlowSuppressed: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Restore: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RestoreFlow: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Run: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SuppressFlow: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  HostExecutionContext: {
    kind: "class",
    members: {
      HostExecutionContext: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateCopy: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      State: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  HostExecutionContextManager: {
    kind: "class",
    members: {
      HostExecutionContextManager: {
        kind: "method",
        methodKind: "constructor",
      },
      Capture: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Revert: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetHostExecutionContext: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  IOCompletionCallback: {
    kind: "generic",
    members: {
      IOCompletionCallback: {
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
  IThreadPoolWorkItem: {
    kind: "interface",
    members: {
      Execute: {
        kind: "method",
        methodKind: "ordinary",
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
  Interlocked: {
    kind: "class",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      And: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareExchange: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Decrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exchange: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Increment: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MemoryBarrier: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MemoryBarrierProcessWide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Or: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isReadOnly: true,
      },
    },
    isStatic: true,
  },
  LazyInitializer: {
    kind: "class",
    members: {},
    isStatic: true,
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
  LockCookie: {
    kind: "struct",
    members: {
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
    },
  },
  LockRecursionException: {
    kind: "class",
    members: {
      LockRecursionException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  LockRecursionPolicy: {
    kind: "enum",
    members: {
      NoRecursion: {
        kind: "field",
        type: () => {
          return Threading.LockRecursionPolicy;
        },
      },
      SupportsRecursion: {
        kind: "field",
        type: () => {
          return Threading.LockRecursionPolicy;
        },
      },
    },
  },
  ManualResetEvent: {
    kind: "class",
    members: {
      ManualResetEvent: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ManualResetEventSlim: {
    kind: "class",
    members: {
      ManualResetEventSlim: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Set: {
        kind: "method",
        methodKind: "ordinary",
      },
      Wait: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsSet: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SpinCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      WaitHandle: {
        kind: "property",
        type: () => {
          return Threading.WaitHandle;
        },
      },
    },
  },
  Monitor: {
    kind: "class",
    members: {
      Enter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exit: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsEntered: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Pulse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PulseAll: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryEnter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Wait: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LockContentionCount: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  Mutex: {
    kind: "class",
    members: {
      Mutex: {
        kind: "method",
        methodKind: "constructor",
      },
      OpenExisting: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReleaseMutex: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryOpenExisting: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  NativeOverlapped: {
    kind: "struct",
    members: {
      EventHandle: {
        kind: "field",
        type: () => {
          return System.IntPtr;
        },
      },
      InternalHigh: {
        kind: "field",
        type: () => {
          return System.IntPtr;
        },
      },
      InternalLow: {
        kind: "field",
        type: () => {
          return System.IntPtr;
        },
      },
      OffsetHigh: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      OffsetLow: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  Overlapped: {
    kind: "class",
    members: {
      Overlapped: {
        kind: "method",
        methodKind: "constructor",
      },
      Free: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Pack: {
        kind: "method",
        methodKind: "ordinary",
      },
      Unpack: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UnsafePack: {
        kind: "method",
        methodKind: "ordinary",
      },
      AsyncResult: {
        kind: "property",
        type: () => {
          return System.IAsyncResult;
        },
      },
      EventHandle: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      EventHandleIntPtr: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      OffsetHigh: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      OffsetLow: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  ParameterizedThreadStart: {
    kind: "generic",
    members: {
      ParameterizedThreadStart: {
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
  PreAllocatedOverlapped: {
    kind: "class",
    members: {
      PreAllocatedOverlapped: {
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
      UnsafeCreate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  ReaderWriterLock: {
    kind: "class",
    members: {
      ReaderWriterLock: {
        kind: "method",
        methodKind: "constructor",
      },
      AcquireReaderLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      AcquireWriterLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      AnyWritersSince: {
        kind: "method",
        methodKind: "ordinary",
      },
      DowngradeFromWriterLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReleaseLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReleaseReaderLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReleaseWriterLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      RestoreLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      UpgradeToWriterLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsReaderLockHeld: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsWriterLockHeld: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      WriterSeqNum: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  ReaderWriterLockSlim: {
    kind: "class",
    members: {
      ReaderWriterLockSlim: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnterReadLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnterUpgradeableReadLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnterWriteLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExitReadLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExitUpgradeableReadLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExitWriteLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryEnterReadLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryEnterUpgradeableReadLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryEnterWriteLock: {
        kind: "method",
        methodKind: "ordinary",
      },
      CurrentReadCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsReadLockHeld: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsUpgradeableReadLockHeld: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsWriteLockHeld: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      RecursionPolicy: {
        kind: "property",
        type: () => {
          return Threading.LockRecursionPolicy;
        },
      },
      RecursiveReadCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      RecursiveUpgradeCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      RecursiveWriteCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      WaitingReadCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      WaitingUpgradeCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      WaitingWriteCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  RegisteredWaitHandle: {
    kind: "class",
    members: {
      Unregister: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  Semaphore: {
    kind: "class",
    members: {
      Semaphore: {
        kind: "method",
        methodKind: "constructor",
      },
      OpenExisting: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Release: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryOpenExisting: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  SemaphoreFullException: {
    kind: "class",
    members: {
      SemaphoreFullException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  SemaphoreSlim: {
    kind: "class",
    members: {
      SemaphoreSlim: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Release: {
        kind: "method",
        methodKind: "ordinary",
      },
      Wait: {
        kind: "method",
        methodKind: "ordinary",
      },
      WaitAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      AvailableWaitHandle: {
        kind: "property",
        type: () => {
          return Threading.WaitHandle;
        },
      },
      CurrentCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  SendOrPostCallback: {
    kind: "generic",
    members: {
      SendOrPostCallback: {
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
  SpinLock: {
    kind: "struct",
    members: {
      SpinLock: {
        kind: "method",
        methodKind: "constructor",
      },
      Enter: {
        kind: "method",
        methodKind: "ordinary",
      },
      Exit: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryEnter: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsHeld: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsHeldByCurrentThread: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsThreadOwnerTrackingEnabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  SpinWait: {
    kind: "struct",
    members: {
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      SpinOnce: {
        kind: "method",
        methodKind: "ordinary",
      },
      SpinUntil: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      NextSpinWillYield: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  SynchronizationContext: {
    kind: "class",
    members: {
      SynchronizationContext: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateCopy: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsWaitNotificationRequired: {
        kind: "method",
        methodKind: "ordinary",
      },
      OperationCompleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OperationStarted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Post: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Send: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetSynchronizationContext: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetWaitNotificationRequired: {
        kind: "method",
        methodKind: "ordinary",
      },
      Wait: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WaitHelper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Current: {
        kind: "property",
        type: () => {
          return Threading.SynchronizationContext;
        },
        isNullable: true,
        isStatic: true,
      },
    },
  },
  SynchronizationLockException: {
    kind: "class",
    members: {
      SynchronizationLockException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Thread: {
    kind: "class",
    members: {
      Thread: {
        kind: "method",
        methodKind: "constructor",
      },
      Abort: {
        kind: "method",
        methodKind: "ordinary",
      },
      AllocateDataSlot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AllocateNamedDataSlot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BeginCriticalRegion: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BeginThreadAffinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DisableComObjectEagerCleanup: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndCriticalRegion: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EndThreadAffinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      FreeNamedDataSlot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetApartmentState: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCompressedStack: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCurrentProcessorId: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDomain: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDomainID: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetNamedDataSlot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Interrupt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Join: {
        kind: "method",
        methodKind: "ordinary",
      },
      MemoryBarrier: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ResetAbort: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Resume: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetApartmentState: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCompressedStack: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sleep: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SpinWait: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Start: {
        kind: "method",
        methodKind: "ordinary",
      },
      Suspend: {
        kind: "method",
        methodKind: "ordinary",
      },
      TrySetApartmentState: {
        kind: "method",
        methodKind: "ordinary",
      },
      UnsafeStart: {
        kind: "method",
        methodKind: "ordinary",
      },
      Yield: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ApartmentState: {
        kind: "property",
        type: () => {
          return Threading.ApartmentState;
        },
      },
      CurrentCulture: {
        kind: "property",
        type: () => {
          return Globalization.CultureInfo;
        },
      },
      CurrentPrincipal: {
        kind: "property",
        type: () => {
          return Principal.IPrincipal;
        },
        isNullable: true,
        isStatic: true,
      },
      CurrentThread: {
        kind: "property",
        type: () => {
          return Threading.Thread;
        },
        isStatic: true,
      },
      CurrentUICulture: {
        kind: "property",
        type: () => {
          return Globalization.CultureInfo;
        },
      },
      ExecutionContext: {
        kind: "property",
        type: () => {
          return Threading.ExecutionContext;
        },
      },
      IsAlive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsBackground: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsThreadPoolThread: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ManagedThreadId: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Priority: {
        kind: "property",
        type: () => {
          return Threading.ThreadPriority;
        },
      },
      ThreadState: {
        kind: "property",
        type: () => {
          return Threading.ThreadState;
        },
      },
    },
    isSealed: true,
  },
  ThreadAbortException: {
    kind: "class",
    members: {
      ExceptionState: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  ThreadExceptionEventArgs: {
    kind: "class",
    members: {
      ThreadExceptionEventArgs: {
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
  ThreadExceptionEventHandler: {
    kind: "generic",
    members: {
      ThreadExceptionEventHandler: {
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
  ThreadInterruptedException: {
    kind: "class",
    members: {
      ThreadInterruptedException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  ThreadLocal: {
    kind: "class",
    members: {
      ThreadLocal: {
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
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValueCreated: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Value: {
        kind: "property",
        type: undefined,
      },
      Values: {
        kind: "property",
        type: () => {
          return Generic.IList;
        },
      },
    },
  },
  ThreadPool: {
    kind: "class",
    members: {
      BindHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetAvailableThreads: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetMaxThreads: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetMinThreads: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      QueueUserWorkItem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RegisterWaitForSingleObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetMaxThreads: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetMinThreads: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UnsafeQueueNativeOverlapped: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UnsafeQueueUserWorkItem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UnsafeRegisterWaitForSingleObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompletedWorkItemCount: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isStatic: true,
      },
      PendingWorkItemCount: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isStatic: true,
      },
      ThreadCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  ThreadPoolBoundHandle: {
    kind: "class",
    members: {
      AllocateNativeOverlapped: {
        kind: "method",
        methodKind: "ordinary",
      },
      BindHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      FreeNativeOverlapped: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNativeOverlappedState: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UnsafeAllocateNativeOverlapped: {
        kind: "method",
        methodKind: "ordinary",
      },
      Handle: {
        kind: "property",
        type: () => {
          return InteropServices.SafeHandle;
        },
      },
    },
    isSealed: true,
  },
  ThreadPriority: {
    kind: "enum",
    members: {
      Lowest: {
        kind: "field",
        type: () => {
          return Threading.ThreadPriority;
        },
      },
      BelowNormal: {
        kind: "field",
        type: () => {
          return Threading.ThreadPriority;
        },
      },
      Normal: {
        kind: "field",
        type: () => {
          return Threading.ThreadPriority;
        },
      },
      AboveNormal: {
        kind: "field",
        type: () => {
          return Threading.ThreadPriority;
        },
      },
      Highest: {
        kind: "field",
        type: () => {
          return Threading.ThreadPriority;
        },
      },
    },
  },
  ThreadStart: {
    kind: "generic",
    members: {
      ThreadStart: {
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
  ThreadStartException: {
    kind: "class",
    members: {},
    isSealed: true,
  },
  ThreadState: {
    kind: "enum",
    members: {
      Running: {
        kind: "field",
        type: () => {
          return Threading.ThreadState;
        },
      },
      StopRequested: {
        kind: "field",
        type: () => {
          return Threading.ThreadState;
        },
      },
      SuspendRequested: {
        kind: "field",
        type: () => {
          return Threading.ThreadState;
        },
      },
      Background: {
        kind: "field",
        type: () => {
          return Threading.ThreadState;
        },
      },
      Unstarted: {
        kind: "field",
        type: () => {
          return Threading.ThreadState;
        },
      },
      Stopped: {
        kind: "field",
        type: () => {
          return Threading.ThreadState;
        },
      },
      WaitSleepJoin: {
        kind: "field",
        type: () => {
          return Threading.ThreadState;
        },
      },
      Suspended: {
        kind: "field",
        type: () => {
          return Threading.ThreadState;
        },
      },
      AbortRequested: {
        kind: "field",
        type: () => {
          return Threading.ThreadState;
        },
      },
      Aborted: {
        kind: "field",
        type: () => {
          return Threading.ThreadState;
        },
      },
    },
  },
  ThreadStateException: {
    kind: "class",
    members: {
      ThreadStateException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
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
  Volatile: {
    kind: "class",
    members: {
      Read: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isReadOnly: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  WaitCallback: {
    kind: "generic",
    members: {
      WaitCallback: {
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
  WaitHandleCannotBeOpenedException: {
    kind: "class",
    members: {
      WaitHandleCannotBeOpenedException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
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
  WaitOrTimerCallback: {
    kind: "generic",
    members: {
      WaitOrTimerCallback: {
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
});
export default Threading
