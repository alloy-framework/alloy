import SafeHandles from "../../Microsoft/Win32/SafeHandles/index.js";
import Generic from "../Collections/Generic/index.js";
import Collections from "../Collections/index.js";
import ObjectModel from "../Collections/ObjectModel/index.js";
import Specialized from "../Collections/Specialized/index.js";
import ComponentModel from "../ComponentModel/index.js";
import System from "../index.js";
import IO from "../IO/index.js";
import Security from "../Security/index.js";
import Text from "../Text/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as CodeAnalysis } from "./CodeAnalysis/index.js";
export { default as Contracts } from "./Contracts/index.js";
export { default as Metrics } from "./Metrics/index.js";
export { default as SymbolStore } from "./SymbolStore/index.js";
export { default as Tracing } from "./Tracing/index.js";

type DiagnosticsLibrary = LibrarySymbolReference & {
  Activity: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ActivityChangedEventArgs: LibrarySymbolReference & {
    Previous: LibrarySymbolReference;
    Current: LibrarySymbolReference
  };
  ActivityContext: LibrarySymbolReference & {
    ActivityContext: LibrarySymbolReference;
    TryParse: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    TraceId: LibrarySymbolReference;
    SpanId: LibrarySymbolReference;
    TraceFlags: LibrarySymbolReference;
    TraceState: LibrarySymbolReference;
    IsRemote: LibrarySymbolReference
  };
  ActivityCreationOptions: LibrarySymbolReference & {
    Source: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Kind: LibrarySymbolReference;
    Parent: LibrarySymbolReference;
    Tags: LibrarySymbolReference;
    Links: LibrarySymbolReference;
    SamplingTags: LibrarySymbolReference;
    TraceId: LibrarySymbolReference;
    TraceState: LibrarySymbolReference
  };
  ActivityEvent: LibrarySymbolReference & {
    ActivityEvent: LibrarySymbolReference;
    EnumerateTagObjects: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Timestamp: LibrarySymbolReference;
    Tags: LibrarySymbolReference
  };
  ActivityIdFormat: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Hierarchical: LibrarySymbolReference;
    W3C: LibrarySymbolReference
  };
  ActivityKind: LibrarySymbolReference & {
    Internal: LibrarySymbolReference;
    Server: LibrarySymbolReference;
    Client: LibrarySymbolReference;
    Producer: LibrarySymbolReference;
    Consumer: LibrarySymbolReference
  };
  ActivityLink: LibrarySymbolReference & {
    ActivityLink: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    EnumerateTagObjects: LibrarySymbolReference;
    Context: LibrarySymbolReference;
    Tags: LibrarySymbolReference
  };
  ActivityListener: LibrarySymbolReference & {
    ActivityListener: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    ActivityStarted: LibrarySymbolReference;
    ActivityStopped: LibrarySymbolReference;
    ExceptionRecorder: LibrarySymbolReference;
    ShouldListenTo: LibrarySymbolReference;
    SampleUsingParentId: LibrarySymbolReference;
    Sample: LibrarySymbolReference
  };
  ActivitySamplingResult: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    PropagationData: LibrarySymbolReference;
    AllData: LibrarySymbolReference;
    AllDataAndRecorded: LibrarySymbolReference
  };
  ActivitySource: LibrarySymbolReference & {
    ActivitySource: LibrarySymbolReference;
    HasListeners: LibrarySymbolReference;
    CreateActivity: LibrarySymbolReference;
    StartActivity: LibrarySymbolReference;
    AddActivityListener: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Version: LibrarySymbolReference;
    Tags: LibrarySymbolReference
  };
  ActivitySpanId: LibrarySymbolReference & {
    CopyTo: LibrarySymbolReference;
    CreateFromBytes: LibrarySymbolReference;
    CreateFromString: LibrarySymbolReference;
    CreateFromUtf8String: LibrarySymbolReference;
    CreateRandom: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToHexString: LibrarySymbolReference;
    ToString: LibrarySymbolReference
  };
  ActivityStatusCode: LibrarySymbolReference & {
    Unset: LibrarySymbolReference;
    Ok: LibrarySymbolReference;
    Error: LibrarySymbolReference
  };
  ActivityTagsCollection: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ActivityTraceFlags: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Recorded: LibrarySymbolReference
  };
  ActivityTraceId: LibrarySymbolReference & {
    CopyTo: LibrarySymbolReference;
    CreateFromBytes: LibrarySymbolReference;
    CreateFromString: LibrarySymbolReference;
    CreateFromUtf8String: LibrarySymbolReference;
    CreateRandom: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToHexString: LibrarySymbolReference;
    ToString: LibrarySymbolReference
  };
  BooleanSwitch: LibrarySymbolReference & {
    BooleanSwitch: LibrarySymbolReference;
    OnValueChanged: LibrarySymbolReference;
    Enabled: LibrarySymbolReference
  };
  ConditionalAttribute: LibrarySymbolReference & {
    ConditionalAttribute: LibrarySymbolReference;
    ConditionString: LibrarySymbolReference
  };
  ConsoleTraceListener: LibrarySymbolReference & {
    ConsoleTraceListener: LibrarySymbolReference;
    Close: LibrarySymbolReference
  };
  CorrelationManager: LibrarySymbolReference & {
    StartLogicalOperation: LibrarySymbolReference;
    StopLogicalOperation: LibrarySymbolReference;
    ActivityId: LibrarySymbolReference;
    LogicalOperationStack: LibrarySymbolReference
  };
  DataReceivedEventArgs: LibrarySymbolReference & {
    Data: LibrarySymbolReference
  };
  DataReceivedEventHandler: LibrarySymbolReference & {
    DataReceivedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  Debug: LibrarySymbolReference & {
    Assert: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Fail: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    Indent: LibrarySymbolReference;
    Print: LibrarySymbolReference;
    Unindent: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteIf: LibrarySymbolReference;
    WriteLine: LibrarySymbolReference;
    WriteLineIf: LibrarySymbolReference;
    AutoFlush: LibrarySymbolReference;
    IndentLevel: LibrarySymbolReference;
    IndentSize: LibrarySymbolReference
  };
  DebuggableAttribute: LibrarySymbolReference & {
    DebuggingModes: LibrarySymbolReference & {
      None: LibrarySymbolReference;
      Default: LibrarySymbolReference;
      IgnoreSymbolStoreSequencePoints: LibrarySymbolReference;
      EnableEditAndContinue: LibrarySymbolReference;
      DisableOptimizations: LibrarySymbolReference
    }
  };
  Debugger: LibrarySymbolReference & {
    DefaultCategory: LibrarySymbolReference;
    Break: LibrarySymbolReference;
    BreakForUserUnhandledException: LibrarySymbolReference;
    IsLogging: LibrarySymbolReference;
    Launch: LibrarySymbolReference;
    Log: LibrarySymbolReference;
    NotifyOfCrossThreadDependency: LibrarySymbolReference;
    IsAttached: LibrarySymbolReference
  };
  DebuggerBrowsableAttribute: LibrarySymbolReference & {
    DebuggerBrowsableAttribute: LibrarySymbolReference;
    State: LibrarySymbolReference
  };
  DebuggerBrowsableState: LibrarySymbolReference & {
    Never: LibrarySymbolReference;
    Collapsed: LibrarySymbolReference;
    RootHidden: LibrarySymbolReference
  };
  DebuggerDisableUserUnhandledExceptionsAttribute: LibrarySymbolReference & {
    DebuggerDisableUserUnhandledExceptionsAttribute: LibrarySymbolReference
  };
  DebuggerDisplayAttribute: LibrarySymbolReference & {
    DebuggerDisplayAttribute: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Target: LibrarySymbolReference;
    TargetTypeName: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  DebuggerHiddenAttribute: LibrarySymbolReference & {
    DebuggerHiddenAttribute: LibrarySymbolReference
  };
  DebuggerNonUserCodeAttribute: LibrarySymbolReference & {
    DebuggerNonUserCodeAttribute: LibrarySymbolReference
  };
  DebuggerStepThroughAttribute: LibrarySymbolReference & {
    DebuggerStepThroughAttribute: LibrarySymbolReference
  };
  DebuggerStepperBoundaryAttribute: LibrarySymbolReference & {
    DebuggerStepperBoundaryAttribute: LibrarySymbolReference
  };
  DebuggerTypeProxyAttribute: LibrarySymbolReference & {
    DebuggerTypeProxyAttribute: LibrarySymbolReference;
    ProxyTypeName: LibrarySymbolReference;
    Target: LibrarySymbolReference;
    TargetTypeName: LibrarySymbolReference
  };
  DebuggerVisualizerAttribute: LibrarySymbolReference & {
    DebuggerVisualizerAttribute: LibrarySymbolReference;
    Description: LibrarySymbolReference;
    Target: LibrarySymbolReference;
    TargetTypeName: LibrarySymbolReference;
    VisualizerObjectSourceTypeName: LibrarySymbolReference;
    VisualizerTypeName: LibrarySymbolReference
  };
  DefaultTraceListener: LibrarySymbolReference & {
    DefaultTraceListener: LibrarySymbolReference;
    Fail: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteLine: LibrarySymbolReference;
    AssertUiEnabled: LibrarySymbolReference;
    LogFileName: LibrarySymbolReference
  };
  DelimitedListTraceListener: LibrarySymbolReference & {
    DelimitedListTraceListener: LibrarySymbolReference;
    GetSupportedAttributes: LibrarySymbolReference;
    TraceData: LibrarySymbolReference;
    TraceEvent: LibrarySymbolReference;
    Delimiter: LibrarySymbolReference
  };
  DiagnosticListener: LibrarySymbolReference & {
    DiagnosticListener: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    IsEnabled: LibrarySymbolReference;
    Subscribe: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    OnActivityExport: LibrarySymbolReference;
    OnActivityImport: LibrarySymbolReference;
    AllListeners: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  DiagnosticMethodInfo: LibrarySymbolReference & {
    Create: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    DeclaringTypeName: LibrarySymbolReference;
    DeclaringAssemblyName: LibrarySymbolReference
  };
  DiagnosticSource: LibrarySymbolReference & {
    DiagnosticSource: LibrarySymbolReference;
    IsEnabled: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    OnActivityExport: LibrarySymbolReference;
    OnActivityImport: LibrarySymbolReference;
    StartActivity: LibrarySymbolReference;
    StopActivity: LibrarySymbolReference
  };
  DistributedContextPropagator: LibrarySymbolReference & {
    PropagatorGetterCallback: LibrarySymbolReference & {
      PropagatorGetterCallback: LibrarySymbolReference;
      Invoke: LibrarySymbolReference;
      BeginInvoke: LibrarySymbolReference;
      EndInvoke: LibrarySymbolReference
    };
    PropagatorSetterCallback: LibrarySymbolReference & {
      PropagatorSetterCallback: LibrarySymbolReference;
      Invoke: LibrarySymbolReference;
      BeginInvoke: LibrarySymbolReference;
      EndInvoke: LibrarySymbolReference
    }
  };
  EventTypeFilter: LibrarySymbolReference & {
    EventTypeFilter: LibrarySymbolReference;
    ShouldTrace: LibrarySymbolReference;
    EventType: LibrarySymbolReference
  };
  ExceptionRecorder: LibrarySymbolReference & {
    ExceptionRecorder: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  FileVersionInfo: LibrarySymbolReference & {
    GetVersionInfo: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Comments: LibrarySymbolReference;
    CompanyName: LibrarySymbolReference;
    FileBuildPart: LibrarySymbolReference;
    FileDescription: LibrarySymbolReference;
    FileMajorPart: LibrarySymbolReference;
    FileMinorPart: LibrarySymbolReference;
    FileName: LibrarySymbolReference;
    FilePrivatePart: LibrarySymbolReference;
    FileVersion: LibrarySymbolReference;
    InternalName: LibrarySymbolReference;
    IsDebug: LibrarySymbolReference;
    IsPatched: LibrarySymbolReference;
    IsPreRelease: LibrarySymbolReference;
    IsPrivateBuild: LibrarySymbolReference;
    IsSpecialBuild: LibrarySymbolReference;
    Language: LibrarySymbolReference;
    LegalCopyright: LibrarySymbolReference;
    LegalTrademarks: LibrarySymbolReference;
    OriginalFilename: LibrarySymbolReference;
    PrivateBuild: LibrarySymbolReference;
    ProductBuildPart: LibrarySymbolReference;
    ProductMajorPart: LibrarySymbolReference;
    ProductMinorPart: LibrarySymbolReference;
    ProductName: LibrarySymbolReference;
    ProductPrivatePart: LibrarySymbolReference;
    ProductVersion: LibrarySymbolReference;
    SpecialBuild: LibrarySymbolReference
  };
  InitializingSwitchEventArgs: LibrarySymbolReference & {
    InitializingSwitchEventArgs: LibrarySymbolReference;
    Switch: LibrarySymbolReference
  };
  InitializingTraceSourceEventArgs: LibrarySymbolReference & {
    InitializingTraceSourceEventArgs: LibrarySymbolReference;
    TraceSource: LibrarySymbolReference;
    WasInitialized: LibrarySymbolReference
  };
  MonitoringDescriptionAttribute: LibrarySymbolReference & {
    MonitoringDescriptionAttribute: LibrarySymbolReference;
    Description: LibrarySymbolReference
  };
  Process: LibrarySymbolReference & {
    Process: LibrarySymbolReference;
    BeginErrorReadLine: LibrarySymbolReference;
    BeginOutputReadLine: LibrarySymbolReference;
    CancelErrorRead: LibrarySymbolReference;
    CancelOutputRead: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    CloseMainWindow: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EnterDebugMode: LibrarySymbolReference;
    GetCurrentProcess: LibrarySymbolReference;
    GetProcessById: LibrarySymbolReference;
    GetProcesses: LibrarySymbolReference;
    GetProcessesByName: LibrarySymbolReference;
    Kill: LibrarySymbolReference;
    LeaveDebugMode: LibrarySymbolReference;
    OnExited: LibrarySymbolReference;
    Refresh: LibrarySymbolReference;
    Start: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    WaitForExit: LibrarySymbolReference;
    WaitForExitAsync: LibrarySymbolReference;
    WaitForInputIdle: LibrarySymbolReference;
    BasePriority: LibrarySymbolReference;
    EnableRaisingEvents: LibrarySymbolReference;
    ExitCode: LibrarySymbolReference;
    ExitTime: LibrarySymbolReference;
    Handle: LibrarySymbolReference;
    HandleCount: LibrarySymbolReference;
    HasExited: LibrarySymbolReference;
    Id: LibrarySymbolReference;
    MachineName: LibrarySymbolReference;
    MainModule: LibrarySymbolReference;
    MainWindowHandle: LibrarySymbolReference;
    MainWindowTitle: LibrarySymbolReference;
    MaxWorkingSet: LibrarySymbolReference;
    MinWorkingSet: LibrarySymbolReference;
    Modules: LibrarySymbolReference;
    NonpagedSystemMemorySize: LibrarySymbolReference;
    NonpagedSystemMemorySize64: LibrarySymbolReference;
    PagedMemorySize: LibrarySymbolReference;
    PagedMemorySize64: LibrarySymbolReference;
    PagedSystemMemorySize: LibrarySymbolReference;
    PagedSystemMemorySize64: LibrarySymbolReference;
    PeakPagedMemorySize: LibrarySymbolReference;
    PeakPagedMemorySize64: LibrarySymbolReference;
    PeakVirtualMemorySize: LibrarySymbolReference;
    PeakVirtualMemorySize64: LibrarySymbolReference;
    PeakWorkingSet: LibrarySymbolReference;
    PeakWorkingSet64: LibrarySymbolReference;
    PriorityBoostEnabled: LibrarySymbolReference;
    PriorityClass: LibrarySymbolReference;
    PrivateMemorySize: LibrarySymbolReference;
    PrivateMemorySize64: LibrarySymbolReference;
    PrivilegedProcessorTime: LibrarySymbolReference;
    ProcessName: LibrarySymbolReference;
    ProcessorAffinity: LibrarySymbolReference;
    Responding: LibrarySymbolReference;
    SafeHandle: LibrarySymbolReference;
    SessionId: LibrarySymbolReference;
    StandardError: LibrarySymbolReference;
    StandardInput: LibrarySymbolReference;
    StandardOutput: LibrarySymbolReference;
    StartInfo: LibrarySymbolReference;
    StartTime: LibrarySymbolReference;
    SynchronizingObject: LibrarySymbolReference;
    Threads: LibrarySymbolReference;
    TotalProcessorTime: LibrarySymbolReference;
    UserProcessorTime: LibrarySymbolReference;
    VirtualMemorySize: LibrarySymbolReference;
    VirtualMemorySize64: LibrarySymbolReference;
    WorkingSet: LibrarySymbolReference;
    WorkingSet64: LibrarySymbolReference
  };
  ProcessModule: LibrarySymbolReference & {
    ToString: LibrarySymbolReference;
    BaseAddress: LibrarySymbolReference;
    EntryPointAddress: LibrarySymbolReference;
    FileName: LibrarySymbolReference;
    FileVersionInfo: LibrarySymbolReference;
    ModuleMemorySize: LibrarySymbolReference;
    ModuleName: LibrarySymbolReference
  };
  ProcessModuleCollection: LibrarySymbolReference & {
    ProcessModuleCollection: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  ProcessPriorityClass: LibrarySymbolReference & {
    Normal: LibrarySymbolReference;
    Idle: LibrarySymbolReference;
    High: LibrarySymbolReference;
    RealTime: LibrarySymbolReference;
    BelowNormal: LibrarySymbolReference;
    AboveNormal: LibrarySymbolReference
  };
  ProcessStartInfo: LibrarySymbolReference & {
    ProcessStartInfo: LibrarySymbolReference;
    ArgumentList: LibrarySymbolReference;
    Arguments: LibrarySymbolReference;
    CreateNoWindow: LibrarySymbolReference;
    Domain: LibrarySymbolReference;
    Environment: LibrarySymbolReference;
    EnvironmentVariables: LibrarySymbolReference;
    ErrorDialog: LibrarySymbolReference;
    ErrorDialogParentHandle: LibrarySymbolReference;
    FileName: LibrarySymbolReference;
    LoadUserProfile: LibrarySymbolReference;
    UseCredentialsForNetworkingOnly: LibrarySymbolReference;
    Password: LibrarySymbolReference;
    PasswordInClearText: LibrarySymbolReference;
    RedirectStandardError: LibrarySymbolReference;
    RedirectStandardInput: LibrarySymbolReference;
    RedirectStandardOutput: LibrarySymbolReference;
    StandardErrorEncoding: LibrarySymbolReference;
    StandardInputEncoding: LibrarySymbolReference;
    StandardOutputEncoding: LibrarySymbolReference;
    UserName: LibrarySymbolReference;
    UseShellExecute: LibrarySymbolReference;
    Verb: LibrarySymbolReference;
    Verbs: LibrarySymbolReference;
    WindowStyle: LibrarySymbolReference;
    WorkingDirectory: LibrarySymbolReference
  };
  ProcessThread: LibrarySymbolReference & {
    ResetIdealProcessor: LibrarySymbolReference;
    BasePriority: LibrarySymbolReference;
    CurrentPriority: LibrarySymbolReference;
    Id: LibrarySymbolReference;
    IdealProcessor: LibrarySymbolReference;
    PriorityBoostEnabled: LibrarySymbolReference;
    PriorityLevel: LibrarySymbolReference;
    PrivilegedProcessorTime: LibrarySymbolReference;
    ProcessorAffinity: LibrarySymbolReference;
    StartAddress: LibrarySymbolReference;
    StartTime: LibrarySymbolReference;
    ThreadState: LibrarySymbolReference;
    TotalProcessorTime: LibrarySymbolReference;
    UserProcessorTime: LibrarySymbolReference;
    WaitReason: LibrarySymbolReference
  };
  ProcessThreadCollection: LibrarySymbolReference & {
    ProcessThreadCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  ProcessWindowStyle: LibrarySymbolReference & {
    Normal: LibrarySymbolReference;
    Hidden: LibrarySymbolReference;
    Minimized: LibrarySymbolReference;
    Maximized: LibrarySymbolReference
  };
  SampleActivity: LibrarySymbolReference & {
    SampleActivity: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  SourceFilter: LibrarySymbolReference & {
    SourceFilter: LibrarySymbolReference;
    ShouldTrace: LibrarySymbolReference;
    Source: LibrarySymbolReference
  };
  SourceLevels: LibrarySymbolReference & {
    All: LibrarySymbolReference;
    Off: LibrarySymbolReference;
    Critical: LibrarySymbolReference;
    Error: LibrarySymbolReference;
    Warning: LibrarySymbolReference;
    Information: LibrarySymbolReference;
    Verbose: LibrarySymbolReference;
    ActivityTracing: LibrarySymbolReference
  };
  SourceSwitch: LibrarySymbolReference & {
    SourceSwitch: LibrarySymbolReference;
    OnValueChanged: LibrarySymbolReference;
    ShouldTrace: LibrarySymbolReference;
    Level: LibrarySymbolReference
  };
  StackFrame: LibrarySymbolReference & {
    StackFrame: LibrarySymbolReference;
    GetFileColumnNumber: LibrarySymbolReference;
    GetFileLineNumber: LibrarySymbolReference;
    GetFileName: LibrarySymbolReference;
    GetILOffset: LibrarySymbolReference;
    GetMethod: LibrarySymbolReference;
    GetNativeOffset: LibrarySymbolReference;
    ToString: LibrarySymbolReference
  };
  StackFrameExtensions: LibrarySymbolReference & {
    GetNativeImageBase: LibrarySymbolReference;
    GetNativeIP: LibrarySymbolReference;
    HasILOffset: LibrarySymbolReference;
    HasMethod: LibrarySymbolReference;
    HasNativeImage: LibrarySymbolReference;
    HasSource: LibrarySymbolReference
  };
  StackTrace: LibrarySymbolReference & {
    StackTrace: LibrarySymbolReference;
    GetFrame: LibrarySymbolReference;
    GetFrames: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    FrameCount: LibrarySymbolReference
  };
  StackTraceHiddenAttribute: LibrarySymbolReference & {
    StackTraceHiddenAttribute: LibrarySymbolReference
  };
  Stopwatch: LibrarySymbolReference & {
    Frequency: LibrarySymbolReference;
    IsHighResolution: LibrarySymbolReference;
    Stopwatch: LibrarySymbolReference;
    GetElapsedTime: LibrarySymbolReference;
    GetTimestamp: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Restart: LibrarySymbolReference;
    Start: LibrarySymbolReference;
    StartNew: LibrarySymbolReference;
    Stop: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Elapsed: LibrarySymbolReference;
    ElapsedMilliseconds: LibrarySymbolReference;
    ElapsedTicks: LibrarySymbolReference;
    IsRunning: LibrarySymbolReference
  };
  Switch: LibrarySymbolReference & {
    Switch: LibrarySymbolReference;
    GetSupportedAttributes: LibrarySymbolReference;
    OnSwitchSettingChanged: LibrarySymbolReference;
    OnValueChanged: LibrarySymbolReference;
    Refresh: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    DefaultValue: LibrarySymbolReference;
    Description: LibrarySymbolReference;
    DisplayName: LibrarySymbolReference;
    SwitchSetting: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SwitchAttribute: LibrarySymbolReference & {
    SwitchAttribute: LibrarySymbolReference;
    GetAll: LibrarySymbolReference;
    SwitchDescription: LibrarySymbolReference;
    SwitchName: LibrarySymbolReference;
    SwitchType: LibrarySymbolReference
  };
  SwitchLevelAttribute: LibrarySymbolReference & {
    SwitchLevelAttribute: LibrarySymbolReference;
    SwitchLevelType: LibrarySymbolReference
  };
  TagList: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Reset: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  TextWriterTraceListener: LibrarySymbolReference & {
    TextWriterTraceListener: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteLine: LibrarySymbolReference;
    Writer: LibrarySymbolReference
  };
  ThreadPriorityLevel: LibrarySymbolReference & {
    Idle: LibrarySymbolReference;
    Lowest: LibrarySymbolReference;
    BelowNormal: LibrarySymbolReference;
    Normal: LibrarySymbolReference;
    AboveNormal: LibrarySymbolReference;
    Highest: LibrarySymbolReference;
    TimeCritical: LibrarySymbolReference
  };
  ThreadState: LibrarySymbolReference & {
    Initialized: LibrarySymbolReference;
    Ready: LibrarySymbolReference;
    Running: LibrarySymbolReference;
    Standby: LibrarySymbolReference;
    Terminated: LibrarySymbolReference;
    Wait: LibrarySymbolReference;
    Transition: LibrarySymbolReference;
    Unknown: LibrarySymbolReference
  };
  ThreadWaitReason: LibrarySymbolReference & {
    Executive: LibrarySymbolReference;
    FreePage: LibrarySymbolReference;
    PageIn: LibrarySymbolReference;
    SystemAllocation: LibrarySymbolReference;
    ExecutionDelay: LibrarySymbolReference;
    Suspended: LibrarySymbolReference;
    UserRequest: LibrarySymbolReference;
    EventPairHigh: LibrarySymbolReference;
    EventPairLow: LibrarySymbolReference;
    LpcReceive: LibrarySymbolReference;
    LpcReply: LibrarySymbolReference;
    VirtualMemory: LibrarySymbolReference;
    PageOut: LibrarySymbolReference;
    Unknown: LibrarySymbolReference
  };
  Trace: LibrarySymbolReference & {
    Assert: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Fail: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    Indent: LibrarySymbolReference;
    Refresh: LibrarySymbolReference;
    TraceError: LibrarySymbolReference;
    TraceInformation: LibrarySymbolReference;
    TraceWarning: LibrarySymbolReference;
    Unindent: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteIf: LibrarySymbolReference;
    WriteLine: LibrarySymbolReference;
    WriteLineIf: LibrarySymbolReference;
    AutoFlush: LibrarySymbolReference;
    CorrelationManager: LibrarySymbolReference;
    IndentLevel: LibrarySymbolReference;
    IndentSize: LibrarySymbolReference;
    Listeners: LibrarySymbolReference;
    UseGlobalLock: LibrarySymbolReference
  };
  TraceEventCache: LibrarySymbolReference & {
    TraceEventCache: LibrarySymbolReference;
    Callstack: LibrarySymbolReference;
    DateTime: LibrarySymbolReference;
    LogicalOperationStack: LibrarySymbolReference;
    ProcessId: LibrarySymbolReference;
    ThreadId: LibrarySymbolReference;
    Timestamp: LibrarySymbolReference
  };
  TraceEventType: LibrarySymbolReference & {
    Critical: LibrarySymbolReference;
    Error: LibrarySymbolReference;
    Warning: LibrarySymbolReference;
    Information: LibrarySymbolReference;
    Verbose: LibrarySymbolReference;
    Start: LibrarySymbolReference;
    Stop: LibrarySymbolReference;
    Suspend: LibrarySymbolReference;
    Resume: LibrarySymbolReference;
    Transfer: LibrarySymbolReference
  };
  TraceFilter: LibrarySymbolReference & {
    TraceFilter: LibrarySymbolReference;
    ShouldTrace: LibrarySymbolReference
  };
  TraceLevel: LibrarySymbolReference & {
    Off: LibrarySymbolReference;
    Error: LibrarySymbolReference;
    Warning: LibrarySymbolReference;
    Info: LibrarySymbolReference;
    Verbose: LibrarySymbolReference
  };
  TraceListener: LibrarySymbolReference & {
    TraceListener: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Fail: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    GetSupportedAttributes: LibrarySymbolReference;
    TraceData: LibrarySymbolReference;
    TraceEvent: LibrarySymbolReference;
    TraceTransfer: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteIndent: LibrarySymbolReference;
    WriteLine: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    Filter: LibrarySymbolReference;
    IndentLevel: LibrarySymbolReference;
    IndentSize: LibrarySymbolReference;
    IsThreadSafe: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NeedIndent: LibrarySymbolReference;
    TraceOutputOptions: LibrarySymbolReference
  };
  TraceListenerCollection: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  TraceOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    LogicalOperationStack: LibrarySymbolReference;
    DateTime: LibrarySymbolReference;
    Timestamp: LibrarySymbolReference;
    ProcessId: LibrarySymbolReference;
    ThreadId: LibrarySymbolReference;
    Callstack: LibrarySymbolReference
  };
  TraceSource: LibrarySymbolReference & {
    TraceSource: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    GetSupportedAttributes: LibrarySymbolReference;
    TraceData: LibrarySymbolReference;
    TraceEvent: LibrarySymbolReference;
    TraceInformation: LibrarySymbolReference;
    TraceTransfer: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    DefaultLevel: LibrarySymbolReference;
    Listeners: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Switch: LibrarySymbolReference
  };
  TraceSwitch: LibrarySymbolReference & {
    TraceSwitch: LibrarySymbolReference;
    OnSwitchSettingChanged: LibrarySymbolReference;
    OnValueChanged: LibrarySymbolReference;
    Level: LibrarySymbolReference;
    TraceError: LibrarySymbolReference;
    TraceInfo: LibrarySymbolReference;
    TraceVerbose: LibrarySymbolReference;
    TraceWarning: LibrarySymbolReference
  };
  UnreachableException: LibrarySymbolReference & {
    UnreachableException: LibrarySymbolReference
  };
  XmlWriterTraceListener: LibrarySymbolReference & {
    XmlWriterTraceListener: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Fail: LibrarySymbolReference;
    TraceData: LibrarySymbolReference;
    TraceEvent: LibrarySymbolReference;
    TraceTransfer: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteLine: LibrarySymbolReference
  }
};
const Diagnostics: DiagnosticsLibrary = createLibrary("System.Diagnostics", {
  Activity: {
    kind: "class",
    members: {
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
  ActivityChangedEventArgs: {
    kind: "struct",
    members: {
      Previous: {
        kind: "property",
        type: () => {
          return Diagnostics.Activity;
        },
        isNullable: true,
      },
      Current: {
        kind: "property",
        type: () => {
          return Diagnostics.Activity;
        },
        isNullable: true,
      },
    },
  },
  ActivityContext: {
    kind: "struct",
    members: {
      ActivityContext: {
        kind: "method",
        methodKind: "constructor",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TraceId: {
        kind: "property",
        type: () => {
          return Diagnostics.ActivityTraceId;
        },
      },
      SpanId: {
        kind: "property",
        type: () => {
          return Diagnostics.ActivitySpanId;
        },
      },
      TraceFlags: {
        kind: "property",
        type: () => {
          return Diagnostics.ActivityTraceFlags;
        },
      },
      TraceState: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      IsRemote: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ActivityCreationOptions: {
    kind: "struct",
    members: {
      Source: {
        kind: "property",
        type: () => {
          return Diagnostics.ActivitySource;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Kind: {
        kind: "property",
        type: () => {
          return Diagnostics.ActivityKind;
        },
      },
      Parent: {
        kind: "property",
        type: undefined,
      },
      Tags: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isNullable: true,
      },
      Links: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isNullable: true,
      },
      SamplingTags: {
        kind: "property",
        type: () => {
          return Diagnostics.ActivityTagsCollection;
        },
      },
      TraceId: {
        kind: "property",
        type: () => {
          return Diagnostics.ActivityTraceId;
        },
      },
      TraceState: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  ActivityEvent: {
    kind: "struct",
    members: {
      ActivityEvent: {
        kind: "method",
        methodKind: "constructor",
      },
      EnumerateTagObjects: {
        kind: "method",
        methodKind: "ordinary",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Timestamp: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
      },
      Tags: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
      },
    },
  },
  ActivityIdFormat: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivityIdFormat;
        },
      },
      Hierarchical: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivityIdFormat;
        },
      },
      W3C: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivityIdFormat;
        },
      },
    },
  },
  ActivityKind: {
    kind: "enum",
    members: {
      Internal: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivityKind;
        },
      },
      Server: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivityKind;
        },
      },
      Client: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivityKind;
        },
      },
      Producer: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivityKind;
        },
      },
      Consumer: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivityKind;
        },
      },
    },
  },
  ActivityLink: {
    kind: "struct",
    members: {
      ActivityLink: {
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
      EnumerateTagObjects: {
        kind: "method",
        methodKind: "ordinary",
      },
      Context: {
        kind: "property",
        type: () => {
          return Diagnostics.ActivityContext;
        },
      },
      Tags: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isNullable: true,
      },
    },
  },
  ActivityListener: {
    kind: "class",
    members: {
      ActivityListener: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      ActivityStarted: {
        kind: "property",
        type: () => {
          return System.Action;
        },
        isNullable: true,
      },
      ActivityStopped: {
        kind: "property",
        type: () => {
          return System.Action;
        },
        isNullable: true,
      },
      ExceptionRecorder: {
        kind: "property",
        type: () => {
          return Diagnostics.ExceptionRecorder;
        },
      },
      ShouldListenTo: {
        kind: "property",
        type: () => {
          return System.Func;
        },
        isNullable: true,
      },
      SampleUsingParentId: {
        kind: "property",
        type: () => {
          return Diagnostics.SampleActivity;
        },
        isNullable: true,
      },
      Sample: {
        kind: "property",
        type: () => {
          return Diagnostics.SampleActivity;
        },
      },
    },
    isSealed: true,
  },
  ActivitySamplingResult: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivitySamplingResult;
        },
      },
      PropagationData: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivitySamplingResult;
        },
      },
      AllData: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivitySamplingResult;
        },
      },
      AllDataAndRecorded: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivitySamplingResult;
        },
      },
    },
  },
  ActivitySource: {
    kind: "class",
    members: {
      ActivitySource: {
        kind: "method",
        methodKind: "constructor",
      },
      HasListeners: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateActivity: {
        kind: "method",
        methodKind: "ordinary",
      },
      StartActivity: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddActivityListener: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Version: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Tags: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  ActivitySpanId: {
    kind: "struct",
    members: {
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateFromBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromUtf8String: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateRandom: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToHexString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  ActivityStatusCode: {
    kind: "enum",
    members: {
      Unset: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivityStatusCode;
        },
      },
      Ok: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivityStatusCode;
        },
      },
      Error: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivityStatusCode;
        },
      },
    },
  },
  ActivityTagsCollection: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          Dispose: {
            kind: "method",
            methodKind: "ordinary",
          },
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Generic.KeyValuePair;
            },
          },
        },
      },
    },
  },
  ActivityTraceFlags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivityTraceFlags;
        },
      },
      Recorded: {
        kind: "field",
        type: () => {
          return Diagnostics.ActivityTraceFlags;
        },
      },
    },
  },
  ActivityTraceId: {
    kind: "struct",
    members: {
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateFromBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromUtf8String: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateRandom: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToHexString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  BooleanSwitch: {
    kind: "class",
    members: {
      BooleanSwitch: {
        kind: "method",
        methodKind: "constructor",
      },
      OnValueChanged: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Enabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ConditionalAttribute: {
    kind: "class",
    members: {
      ConditionalAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ConditionString: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  ConsoleTraceListener: {
    kind: "class",
    members: {
      ConsoleTraceListener: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  CorrelationManager: {
    kind: "class",
    members: {
      StartLogicalOperation: {
        kind: "method",
        methodKind: "ordinary",
      },
      StopLogicalOperation: {
        kind: "method",
        methodKind: "ordinary",
      },
      ActivityId: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      LogicalOperationStack: {
        kind: "property",
        type: () => {
          return Collections.Stack;
        },
      },
    },
  },
  DataReceivedEventArgs: {
    kind: "class",
    members: {
      Data: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  DataReceivedEventHandler: {
    kind: "generic",
    members: {
      DataReceivedEventHandler: {
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
  Debug: {
    kind: "class",
    members: {
      Assert: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Fail: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Indent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Print: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Unindent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteIf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteLine: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteLineIf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AutoFlush: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      IndentLevel: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      IndentSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  DebuggableAttribute: {
    kind: "class",
    members: {
      DebuggingModes: {
        kind: "enum",
        members: {
          None: {
            kind: "field",
            type: () => {
              return Diagnostics.DebuggableAttribute.DebuggingModes;
            },
          },
          Default: {
            kind: "field",
            type: () => {
              return Diagnostics.DebuggableAttribute.DebuggingModes;
            },
          },
          IgnoreSymbolStoreSequencePoints: {
            kind: "field",
            type: () => {
              return Diagnostics.DebuggableAttribute.DebuggingModes;
            },
          },
          EnableEditAndContinue: {
            kind: "field",
            type: () => {
              return Diagnostics.DebuggableAttribute.DebuggingModes;
            },
          },
          DisableOptimizations: {
            kind: "field",
            type: () => {
              return Diagnostics.DebuggableAttribute.DebuggingModes;
            },
          },
        },
      },
    },
  },
  Debugger: {
    kind: "class",
    members: {
      DefaultCategory: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isStatic: true,
        isReadOnly: true,
      },
      Break: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BreakForUserUnhandledException: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsLogging: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Launch: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotifyOfCrossThreadDependency: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsAttached: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  DebuggerBrowsableAttribute: {
    kind: "class",
    members: {
      DebuggerBrowsableAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      State: {
        kind: "property",
        type: () => {
          return Diagnostics.DebuggerBrowsableState;
        },
      },
    },
    isSealed: true,
  },
  DebuggerBrowsableState: {
    kind: "enum",
    members: {
      Never: {
        kind: "field",
        type: () => {
          return Diagnostics.DebuggerBrowsableState;
        },
      },
      Collapsed: {
        kind: "field",
        type: () => {
          return Diagnostics.DebuggerBrowsableState;
        },
      },
      RootHidden: {
        kind: "field",
        type: () => {
          return Diagnostics.DebuggerBrowsableState;
        },
      },
    },
  },
  DebuggerDisableUserUnhandledExceptionsAttribute: {
    kind: "class",
    members: {
      DebuggerDisableUserUnhandledExceptionsAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DebuggerDisplayAttribute: {
    kind: "class",
    members: {
      DebuggerDisplayAttribute: {
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
      Target: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      TargetTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  DebuggerHiddenAttribute: {
    kind: "class",
    members: {
      DebuggerHiddenAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DebuggerNonUserCodeAttribute: {
    kind: "class",
    members: {
      DebuggerNonUserCodeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DebuggerStepThroughAttribute: {
    kind: "class",
    members: {
      DebuggerStepThroughAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DebuggerStepperBoundaryAttribute: {
    kind: "class",
    members: {
      DebuggerStepperBoundaryAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DebuggerTypeProxyAttribute: {
    kind: "class",
    members: {
      DebuggerTypeProxyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ProxyTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Target: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      TargetTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  DebuggerVisualizerAttribute: {
    kind: "class",
    members: {
      DebuggerVisualizerAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Description: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Target: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      TargetTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      VisualizerObjectSourceTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      VisualizerTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  DefaultTraceListener: {
    kind: "class",
    members: {
      DefaultTraceListener: {
        kind: "method",
        methodKind: "constructor",
      },
      Fail: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteLine: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AssertUiEnabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LogFileName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  DelimitedListTraceListener: {
    kind: "class",
    members: {
      DelimitedListTraceListener: {
        kind: "method",
        methodKind: "constructor",
      },
      GetSupportedAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TraceData: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TraceEvent: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Delimiter: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  DiagnosticListener: {
    kind: "class",
    members: {
      DiagnosticListener: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsEnabled: {
        kind: "method",
        methodKind: "ordinary",
      },
      Subscribe: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      OnActivityExport: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      OnActivityImport: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AllListeners: {
        kind: "property",
        type: () => {
          return System.IObservable;
        },
        isStatic: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  DiagnosticMethodInfo: {
    kind: "class",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DeclaringTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DeclaringAssemblyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  DiagnosticSource: {
    kind: "class",
    members: {
      DiagnosticSource: {
        kind: "method",
        methodKind: "constructor",
      },
      IsEnabled: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      OnActivityExport: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnActivityImport: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      StartActivity: {
        kind: "method",
        methodKind: "ordinary",
      },
      StopActivity: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isAbstract: true,
  },
  DistributedContextPropagator: {
    kind: "class",
    members: {
      PropagatorGetterCallback: {
        kind: "generic",
        members: {
          PropagatorGetterCallback: {
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
      PropagatorSetterCallback: {
        kind: "generic",
        members: {
          PropagatorSetterCallback: {
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
    },
  },
  EventTypeFilter: {
    kind: "class",
    members: {
      EventTypeFilter: {
        kind: "method",
        methodKind: "constructor",
      },
      ShouldTrace: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EventType: {
        kind: "property",
        type: () => {
          return Diagnostics.SourceLevels;
        },
      },
    },
  },
  ExceptionRecorder: {
    kind: "generic",
    members: {
      ExceptionRecorder: {
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
  FileVersionInfo: {
    kind: "class",
    members: {
      GetVersionInfo: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Comments: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      CompanyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      FileBuildPart: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      FileDescription: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      FileMajorPart: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      FileMinorPart: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      FileName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      FilePrivatePart: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      FileVersion: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      InternalName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      IsDebug: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsPatched: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsPreRelease: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsPrivateBuild: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSpecialBuild: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Language: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      LegalCopyright: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      LegalTrademarks: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      OriginalFilename: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      PrivateBuild: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ProductBuildPart: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ProductMajorPart: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ProductMinorPart: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ProductName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ProductPrivatePart: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ProductVersion: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SpecialBuild: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  InitializingSwitchEventArgs: {
    kind: "class",
    members: {
      InitializingSwitchEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Switch: {
        kind: "property",
        type: () => {
          return Diagnostics.Switch;
        },
      },
    },
    isSealed: true,
  },
  InitializingTraceSourceEventArgs: {
    kind: "class",
    members: {
      InitializingTraceSourceEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      TraceSource: {
        kind: "property",
        type: () => {
          return Diagnostics.TraceSource;
        },
      },
      WasInitialized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  MonitoringDescriptionAttribute: {
    kind: "class",
    members: {
      MonitoringDescriptionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Description: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
  },
  Process: {
    kind: "class",
    members: {
      Process: {
        kind: "method",
        methodKind: "constructor",
      },
      BeginErrorReadLine: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginOutputReadLine: {
        kind: "method",
        methodKind: "ordinary",
      },
      CancelErrorRead: {
        kind: "method",
        methodKind: "ordinary",
      },
      CancelOutputRead: {
        kind: "method",
        methodKind: "ordinary",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      CloseMainWindow: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EnterDebugMode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCurrentProcess: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetProcessById: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetProcesses: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetProcessesByName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Kill: {
        kind: "method",
        methodKind: "ordinary",
      },
      LeaveDebugMode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OnExited: {
        kind: "method",
        methodKind: "ordinary",
      },
      Refresh: {
        kind: "method",
        methodKind: "ordinary",
      },
      Start: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WaitForExit: {
        kind: "method",
        methodKind: "ordinary",
      },
      WaitForExitAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      WaitForInputIdle: {
        kind: "method",
        methodKind: "ordinary",
      },
      BasePriority: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      EnableRaisingEvents: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ExitCode: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ExitTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      Handle: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      HandleCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      HasExited: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Id: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MachineName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MainModule: {
        kind: "property",
        type: () => {
          return Diagnostics.ProcessModule;
        },
        isNullable: true,
      },
      MainWindowHandle: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      MainWindowTitle: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MaxWorkingSet: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      MinWorkingSet: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      Modules: {
        kind: "property",
        type: () => {
          return Diagnostics.ProcessModuleCollection;
        },
      },
      NonpagedSystemMemorySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      NonpagedSystemMemorySize64: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      PagedMemorySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PagedMemorySize64: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      PagedSystemMemorySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PagedSystemMemorySize64: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      PeakPagedMemorySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PeakPagedMemorySize64: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      PeakVirtualMemorySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PeakVirtualMemorySize64: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      PeakWorkingSet: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PeakWorkingSet64: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      PriorityBoostEnabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PriorityClass: {
        kind: "property",
        type: () => {
          return Diagnostics.ProcessPriorityClass;
        },
      },
      PrivateMemorySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PrivateMemorySize64: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      PrivilegedProcessorTime: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      ProcessName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ProcessorAffinity: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      Responding: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SafeHandle: {
        kind: "property",
        type: () => {
          return SafeHandles.SafeProcessHandle;
        },
      },
      SessionId: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      StandardError: {
        kind: "property",
        type: () => {
          return IO.StreamReader;
        },
      },
      StandardInput: {
        kind: "property",
        type: () => {
          return IO.StreamWriter;
        },
      },
      StandardOutput: {
        kind: "property",
        type: () => {
          return IO.StreamReader;
        },
      },
      StartInfo: {
        kind: "property",
        type: () => {
          return Diagnostics.ProcessStartInfo;
        },
      },
      StartTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      SynchronizingObject: {
        kind: "property",
        type: () => {
          return ComponentModel.ISynchronizeInvoke;
        },
        isNullable: true,
      },
      Threads: {
        kind: "property",
        type: () => {
          return Diagnostics.ProcessThreadCollection;
        },
      },
      TotalProcessorTime: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      UserProcessorTime: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      VirtualMemorySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      VirtualMemorySize64: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      WorkingSet: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      WorkingSet64: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  ProcessModule: {
    kind: "class",
    members: {
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BaseAddress: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      EntryPointAddress: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      FileName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      FileVersionInfo: {
        kind: "property",
        type: () => {
          return Diagnostics.FileVersionInfo;
        },
      },
      ModuleMemorySize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ModuleName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  ProcessModuleCollection: {
    kind: "class",
    members: {
      ProcessModuleCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return Diagnostics.ProcessModule;
        },
      },
    },
  },
  ProcessPriorityClass: {
    kind: "enum",
    members: {
      Normal: {
        kind: "field",
        type: () => {
          return Diagnostics.ProcessPriorityClass;
        },
      },
      Idle: {
        kind: "field",
        type: () => {
          return Diagnostics.ProcessPriorityClass;
        },
      },
      High: {
        kind: "field",
        type: () => {
          return Diagnostics.ProcessPriorityClass;
        },
      },
      RealTime: {
        kind: "field",
        type: () => {
          return Diagnostics.ProcessPriorityClass;
        },
      },
      BelowNormal: {
        kind: "field",
        type: () => {
          return Diagnostics.ProcessPriorityClass;
        },
      },
      AboveNormal: {
        kind: "field",
        type: () => {
          return Diagnostics.ProcessPriorityClass;
        },
      },
    },
  },
  ProcessStartInfo: {
    kind: "class",
    members: {
      ProcessStartInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      ArgumentList: {
        kind: "property",
        type: () => {
          return ObjectModel.Collection;
        },
      },
      Arguments: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      CreateNoWindow: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Domain: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Environment: {
        kind: "property",
        type: () => {
          return Generic.IDictionary;
        },
      },
      EnvironmentVariables: {
        kind: "property",
        type: () => {
          return Specialized.StringDictionary;
        },
      },
      ErrorDialog: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ErrorDialogParentHandle: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      FileName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      LoadUserProfile: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      UseCredentialsForNetworkingOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Password: {
        kind: "property",
        type: () => {
          return Security.SecureString;
        },
      },
      PasswordInClearText: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      RedirectStandardError: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      RedirectStandardInput: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      RedirectStandardOutput: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      StandardErrorEncoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isNullable: true,
      },
      StandardInputEncoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isNullable: true,
      },
      StandardOutputEncoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isNullable: true,
      },
      UserName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      UseShellExecute: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Verb: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Verbs: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      WindowStyle: {
        kind: "property",
        type: () => {
          return Diagnostics.ProcessWindowStyle;
        },
      },
      WorkingDirectory: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  ProcessThread: {
    kind: "class",
    members: {
      ResetIdealProcessor: {
        kind: "method",
        methodKind: "ordinary",
      },
      BasePriority: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      CurrentPriority: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Id: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IdealProcessor: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PriorityBoostEnabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PriorityLevel: {
        kind: "property",
        type: () => {
          return Diagnostics.ThreadPriorityLevel;
        },
      },
      PrivilegedProcessorTime: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      ProcessorAffinity: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      StartAddress: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
      StartTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      ThreadState: {
        kind: "property",
        type: () => {
          return Diagnostics.ThreadState;
        },
      },
      TotalProcessorTime: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      UserProcessorTime: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      WaitReason: {
        kind: "property",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
    },
  },
  ProcessThreadCollection: {
    kind: "class",
    members: {
      ProcessThreadCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return Diagnostics.ProcessThread;
        },
      },
    },
  },
  ProcessWindowStyle: {
    kind: "enum",
    members: {
      Normal: {
        kind: "field",
        type: () => {
          return Diagnostics.ProcessWindowStyle;
        },
      },
      Hidden: {
        kind: "field",
        type: () => {
          return Diagnostics.ProcessWindowStyle;
        },
      },
      Minimized: {
        kind: "field",
        type: () => {
          return Diagnostics.ProcessWindowStyle;
        },
      },
      Maximized: {
        kind: "field",
        type: () => {
          return Diagnostics.ProcessWindowStyle;
        },
      },
    },
  },
  SampleActivity: {
    kind: "generic",
    members: {
      SampleActivity: {
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
  SourceFilter: {
    kind: "class",
    members: {
      SourceFilter: {
        kind: "method",
        methodKind: "constructor",
      },
      ShouldTrace: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Source: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  SourceLevels: {
    kind: "enum",
    members: {
      All: {
        kind: "field",
        type: () => {
          return Diagnostics.SourceLevels;
        },
      },
      Off: {
        kind: "field",
        type: () => {
          return Diagnostics.SourceLevels;
        },
      },
      Critical: {
        kind: "field",
        type: () => {
          return Diagnostics.SourceLevels;
        },
      },
      Error: {
        kind: "field",
        type: () => {
          return Diagnostics.SourceLevels;
        },
      },
      Warning: {
        kind: "field",
        type: () => {
          return Diagnostics.SourceLevels;
        },
      },
      Information: {
        kind: "field",
        type: () => {
          return Diagnostics.SourceLevels;
        },
      },
      Verbose: {
        kind: "field",
        type: () => {
          return Diagnostics.SourceLevels;
        },
      },
      ActivityTracing: {
        kind: "field",
        type: () => {
          return Diagnostics.SourceLevels;
        },
      },
    },
  },
  SourceSwitch: {
    kind: "class",
    members: {
      SourceSwitch: {
        kind: "method",
        methodKind: "constructor",
      },
      OnValueChanged: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ShouldTrace: {
        kind: "method",
        methodKind: "ordinary",
      },
      Level: {
        kind: "property",
        type: () => {
          return Diagnostics.SourceLevels;
        },
      },
    },
  },
  StackFrame: {
    kind: "class",
    members: {
      StackFrame: {
        kind: "method",
        methodKind: "constructor",
      },
      GetFileColumnNumber: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetFileLineNumber: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetFileName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetILOffset: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetMethod: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetNativeOffset: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  StackFrameExtensions: {
    kind: "class",
    members: {
      GetNativeImageBase: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetNativeIP: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HasILOffset: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HasMethod: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HasNativeImage: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HasSource: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  StackTrace: {
    kind: "class",
    members: {
      StackTrace: {
        kind: "method",
        methodKind: "constructor",
      },
      GetFrame: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetFrames: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FrameCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
    },
  },
  StackTraceHiddenAttribute: {
    kind: "class",
    members: {
      StackTraceHiddenAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  Stopwatch: {
    kind: "class",
    members: {
      Frequency: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsHighResolution: {
        kind: "field",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Stopwatch: {
        kind: "method",
        methodKind: "constructor",
      },
      GetElapsedTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTimestamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Restart: {
        kind: "method",
        methodKind: "ordinary",
      },
      Start: {
        kind: "method",
        methodKind: "ordinary",
      },
      StartNew: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Stop: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Elapsed: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      ElapsedMilliseconds: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      ElapsedTicks: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      IsRunning: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  Switch: {
    kind: "class",
    members: {
      Switch: {
        kind: "method",
        methodKind: "constructor",
      },
      GetSupportedAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnSwitchSettingChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnValueChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Refresh: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Specialized.StringDictionary;
        },
      },
      DefaultValue: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Description: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DisplayName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SwitchSetting: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isAbstract: true,
  },
  SwitchAttribute: {
    kind: "class",
    members: {
      SwitchAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      GetAll: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SwitchDescription: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SwitchName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SwitchType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  SwitchLevelAttribute: {
    kind: "class",
    members: {
      SwitchLevelAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      SwitchLevelType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  TagList: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          Dispose: {
            kind: "method",
            methodKind: "ordinary",
          },
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Reset: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return Generic.KeyValuePair;
            },
          },
        },
      },
    },
  },
  TextWriterTraceListener: {
    kind: "class",
    members: {
      TextWriterTraceListener: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteLine: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Writer: {
        kind: "property",
        type: () => {
          return IO.TextWriter;
        },
      },
    },
  },
  ThreadPriorityLevel: {
    kind: "enum",
    members: {
      Idle: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadPriorityLevel;
        },
      },
      Lowest: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadPriorityLevel;
        },
      },
      BelowNormal: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadPriorityLevel;
        },
      },
      Normal: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadPriorityLevel;
        },
      },
      AboveNormal: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadPriorityLevel;
        },
      },
      Highest: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadPriorityLevel;
        },
      },
      TimeCritical: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadPriorityLevel;
        },
      },
    },
  },
  ThreadState: {
    kind: "enum",
    members: {
      Initialized: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadState;
        },
      },
      Ready: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadState;
        },
      },
      Running: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadState;
        },
      },
      Standby: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadState;
        },
      },
      Terminated: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadState;
        },
      },
      Wait: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadState;
        },
      },
      Transition: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadState;
        },
      },
      Unknown: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadState;
        },
      },
    },
  },
  ThreadWaitReason: {
    kind: "enum",
    members: {
      Executive: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
      FreePage: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
      PageIn: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
      SystemAllocation: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
      ExecutionDelay: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
      Suspended: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
      UserRequest: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
      EventPairHigh: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
      EventPairLow: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
      LpcReceive: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
      LpcReply: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
      VirtualMemory: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
      PageOut: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
      Unknown: {
        kind: "field",
        type: () => {
          return Diagnostics.ThreadWaitReason;
        },
      },
    },
  },
  Trace: {
    kind: "class",
    members: {
      Assert: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Fail: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Indent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Refresh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TraceError: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TraceInformation: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TraceWarning: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Unindent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteIf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteLine: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteLineIf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AutoFlush: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      CorrelationManager: {
        kind: "property",
        type: () => {
          return Diagnostics.CorrelationManager;
        },
        isStatic: true,
      },
      IndentLevel: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      IndentSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      Listeners: {
        kind: "property",
        type: () => {
          return Diagnostics.TraceListenerCollection;
        },
        isStatic: true,
      },
      UseGlobalLock: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  TraceEventCache: {
    kind: "class",
    members: {
      TraceEventCache: {
        kind: "method",
        methodKind: "constructor",
      },
      Callstack: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      LogicalOperationStack: {
        kind: "property",
        type: () => {
          return Collections.Stack;
        },
      },
      ProcessId: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ThreadId: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Timestamp: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  TraceEventType: {
    kind: "enum",
    members: {
      Critical: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceEventType;
        },
      },
      Error: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceEventType;
        },
      },
      Warning: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceEventType;
        },
      },
      Information: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceEventType;
        },
      },
      Verbose: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceEventType;
        },
      },
      Start: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceEventType;
        },
      },
      Stop: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceEventType;
        },
      },
      Suspend: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceEventType;
        },
      },
      Resume: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceEventType;
        },
      },
      Transfer: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceEventType;
        },
      },
    },
  },
  TraceFilter: {
    kind: "class",
    members: {
      TraceFilter: {
        kind: "method",
        methodKind: "constructor",
      },
      ShouldTrace: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  TraceLevel: {
    kind: "enum",
    members: {
      Off: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceLevel;
        },
      },
      Error: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceLevel;
        },
      },
      Warning: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceLevel;
        },
      },
      Info: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceLevel;
        },
      },
      Verbose: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceLevel;
        },
      },
    },
  },
  TraceListener: {
    kind: "class",
    members: {
      TraceListener: {
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
      Fail: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSupportedAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TraceData: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TraceEvent: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TraceTransfer: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteIndent: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteLine: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Specialized.StringDictionary;
        },
      },
      Filter: {
        kind: "property",
        type: () => {
          return Diagnostics.TraceFilter;
        },
      },
      IndentLevel: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IndentSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsThreadSafe: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      NeedIndent: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      TraceOutputOptions: {
        kind: "property",
        type: () => {
          return Diagnostics.TraceOptions;
        },
      },
    },
    isAbstract: true,
  },
  TraceListenerCollection: {
    kind: "class",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return Diagnostics.TraceListener;
        },
      },
    },
  },
  TraceOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceOptions;
        },
      },
      LogicalOperationStack: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceOptions;
        },
      },
      DateTime: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceOptions;
        },
      },
      Timestamp: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceOptions;
        },
      },
      ProcessId: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceOptions;
        },
      },
      ThreadId: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceOptions;
        },
      },
      Callstack: {
        kind: "field",
        type: () => {
          return Diagnostics.TraceOptions;
        },
      },
    },
  },
  TraceSource: {
    kind: "class",
    members: {
      TraceSource: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSupportedAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TraceData: {
        kind: "method",
        methodKind: "ordinary",
      },
      TraceEvent: {
        kind: "method",
        methodKind: "ordinary",
      },
      TraceInformation: {
        kind: "method",
        methodKind: "ordinary",
      },
      TraceTransfer: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Specialized.StringDictionary;
        },
      },
      DefaultLevel: {
        kind: "property",
        type: () => {
          return Diagnostics.SourceLevels;
        },
      },
      Listeners: {
        kind: "property",
        type: () => {
          return Diagnostics.TraceListenerCollection;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Switch: {
        kind: "property",
        type: () => {
          return Diagnostics.SourceSwitch;
        },
      },
    },
  },
  TraceSwitch: {
    kind: "class",
    members: {
      TraceSwitch: {
        kind: "method",
        methodKind: "constructor",
      },
      OnSwitchSettingChanged: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      OnValueChanged: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Level: {
        kind: "property",
        type: () => {
          return Diagnostics.TraceLevel;
        },
      },
      TraceError: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      TraceInfo: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      TraceVerbose: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      TraceWarning: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  UnreachableException: {
    kind: "class",
    members: {
      UnreachableException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  XmlWriterTraceListener: {
    kind: "class",
    members: {
      XmlWriterTraceListener: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Fail: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TraceData: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TraceEvent: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TraceTransfer: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteLine: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
});
export default Diagnostics
