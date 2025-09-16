import Generic from "../../Collections/Generic/index.js";
import System from "../../index.js";
import Expressions from "../../Linq/Expressions/index.js";
import Tasks from "../../Threading/Tasks/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type CompilerServicesLibrary = LibrarySymbolReference & {
  AccessedThroughPropertyAttribute: LibrarySymbolReference & {
    AccessedThroughPropertyAttribute: LibrarySymbolReference;
    PropertyName: LibrarySymbolReference
  };
  AsyncIteratorMethodBuilder: LibrarySymbolReference & {
    Complete: LibrarySymbolReference;
    Create: LibrarySymbolReference
  };
  AsyncIteratorStateMachineAttribute: LibrarySymbolReference & {
    AsyncIteratorStateMachineAttribute: LibrarySymbolReference
  };
  AsyncMethodBuilderAttribute: LibrarySymbolReference & {
    AsyncMethodBuilderAttribute: LibrarySymbolReference;
    BuilderType: LibrarySymbolReference
  };
  AsyncStateMachineAttribute: LibrarySymbolReference & {
    AsyncStateMachineAttribute: LibrarySymbolReference
  };
  AsyncTaskMethodBuilder: LibrarySymbolReference & {
    Create: LibrarySymbolReference;
    SetException: LibrarySymbolReference;
    SetResult: LibrarySymbolReference;
    SetStateMachine: LibrarySymbolReference;
    Task: LibrarySymbolReference
  };
  AsyncValueTaskMethodBuilder: LibrarySymbolReference & {
    Create: LibrarySymbolReference;
    SetException: LibrarySymbolReference;
    SetResult: LibrarySymbolReference;
    SetStateMachine: LibrarySymbolReference;
    Task: LibrarySymbolReference
  };
  AsyncVoidMethodBuilder: LibrarySymbolReference & {
    Create: LibrarySymbolReference;
    SetException: LibrarySymbolReference;
    SetResult: LibrarySymbolReference;
    SetStateMachine: LibrarySymbolReference
  };
  CallConvCdecl: LibrarySymbolReference & {
    CallConvCdecl: LibrarySymbolReference
  };
  CallConvFastcall: LibrarySymbolReference & {
    CallConvFastcall: LibrarySymbolReference
  };
  CallConvMemberFunction: LibrarySymbolReference & {
    CallConvMemberFunction: LibrarySymbolReference
  };
  CallConvStdcall: LibrarySymbolReference & {
    CallConvStdcall: LibrarySymbolReference
  };
  CallConvSuppressGCTransition: LibrarySymbolReference & {
    CallConvSuppressGCTransition: LibrarySymbolReference
  };
  CallConvSwift: LibrarySymbolReference & {
    CallConvSwift: LibrarySymbolReference
  };
  CallConvThiscall: LibrarySymbolReference & {
    CallConvThiscall: LibrarySymbolReference
  };
  CallSite: LibrarySymbolReference & {
    Target: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Update: LibrarySymbolReference
  };
  CallSiteBinder: LibrarySymbolReference & {
    CallSiteBinder: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    UpdateLabel: LibrarySymbolReference
  };
  CallSiteHelpers: LibrarySymbolReference & {
    IsInternalFrame: LibrarySymbolReference
  };
  CallerArgumentExpressionAttribute: LibrarySymbolReference & {
    CallerArgumentExpressionAttribute: LibrarySymbolReference;
    ParameterName: LibrarySymbolReference
  };
  CallerFilePathAttribute: LibrarySymbolReference & {
    CallerFilePathAttribute: LibrarySymbolReference
  };
  CallerLineNumberAttribute: LibrarySymbolReference & {
    CallerLineNumberAttribute: LibrarySymbolReference
  };
  CallerMemberNameAttribute: LibrarySymbolReference & {
    CallerMemberNameAttribute: LibrarySymbolReference
  };
  CollectionBuilderAttribute: LibrarySymbolReference & {
    CollectionBuilderAttribute: LibrarySymbolReference;
    BuilderType: LibrarySymbolReference;
    MethodName: LibrarySymbolReference
  };
  CompilationRelaxations: LibrarySymbolReference & {
    NoStringInterning: LibrarySymbolReference
  };
  CompilationRelaxationsAttribute: LibrarySymbolReference & {
    CompilationRelaxationsAttribute: LibrarySymbolReference;
    CompilationRelaxations: LibrarySymbolReference
  };
  CompilerFeatureRequiredAttribute: LibrarySymbolReference & {
    RefStructs: LibrarySymbolReference;
    RequiredMembers: LibrarySymbolReference;
    CompilerFeatureRequiredAttribute: LibrarySymbolReference;
    FeatureName: LibrarySymbolReference;
    IsOptional: LibrarySymbolReference
  };
  CompilerGeneratedAttribute: LibrarySymbolReference & {
    CompilerGeneratedAttribute: LibrarySymbolReference
  };
  CompilerGlobalScopeAttribute: LibrarySymbolReference & {
    CompilerGlobalScopeAttribute: LibrarySymbolReference
  };
  CompilerMarshalOverride: LibrarySymbolReference & {

  };
  ConditionalWeakTable: LibrarySymbolReference & {
    CreateValueCallback: LibrarySymbolReference & {
      CreateValueCallback: LibrarySymbolReference;
      Invoke: LibrarySymbolReference;
      BeginInvoke: LibrarySymbolReference;
      EndInvoke: LibrarySymbolReference
    }
  };
  ConfiguredAsyncDisposable: LibrarySymbolReference & {
    DisposeAsync: LibrarySymbolReference
  };
  ConfiguredCancelableAsyncEnumerable: LibrarySymbolReference & {
    Enumerator: LibrarySymbolReference & {
      DisposeAsync: LibrarySymbolReference;
      MoveNextAsync: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  ConfiguredTaskAwaitable: LibrarySymbolReference & {
    ConfiguredTaskAwaiter: LibrarySymbolReference & {
      GetResult: LibrarySymbolReference;
      OnCompleted: LibrarySymbolReference;
      UnsafeOnCompleted: LibrarySymbolReference;
      IsCompleted: LibrarySymbolReference
    }
  };
  ConfiguredValueTaskAwaitable: LibrarySymbolReference & {
    ConfiguredValueTaskAwaiter: LibrarySymbolReference & {
      GetResult: LibrarySymbolReference;
      OnCompleted: LibrarySymbolReference;
      UnsafeOnCompleted: LibrarySymbolReference;
      IsCompleted: LibrarySymbolReference
    }
  };
  ContractHelper: LibrarySymbolReference & {
    RaiseContractFailedEvent: LibrarySymbolReference;
    TriggerFailure: LibrarySymbolReference
  };
  CppInlineNamespaceAttribute: LibrarySymbolReference & {
    CppInlineNamespaceAttribute: LibrarySymbolReference
  };
  CreateNewOnMetadataUpdateAttribute: LibrarySymbolReference & {
    CreateNewOnMetadataUpdateAttribute: LibrarySymbolReference
  };
  CustomConstantAttribute: LibrarySymbolReference & {
    CustomConstantAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  DateTimeConstantAttribute: LibrarySymbolReference & {
    DateTimeConstantAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  DebugInfoGenerator: LibrarySymbolReference & {
    DebugInfoGenerator: LibrarySymbolReference;
    CreatePdbGenerator: LibrarySymbolReference;
    MarkSequencePoint: LibrarySymbolReference
  };
  DecimalConstantAttribute: LibrarySymbolReference & {
    DecimalConstantAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  DefaultDependencyAttribute: LibrarySymbolReference & {
    DefaultDependencyAttribute: LibrarySymbolReference;
    LoadHint: LibrarySymbolReference
  };
  DefaultInterpolatedStringHandler: LibrarySymbolReference & {
    DefaultInterpolatedStringHandler: LibrarySymbolReference;
    AppendFormatted: LibrarySymbolReference;
    AppendLiteral: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ToStringAndClear: LibrarySymbolReference
  };
  DependencyAttribute: LibrarySymbolReference & {
    DependencyAttribute: LibrarySymbolReference;
    DependentAssembly: LibrarySymbolReference;
    LoadHint: LibrarySymbolReference
  };
  DisablePrivateReflectionAttribute: LibrarySymbolReference & {
    DisablePrivateReflectionAttribute: LibrarySymbolReference
  };
  DisableRuntimeMarshallingAttribute: LibrarySymbolReference & {
    DisableRuntimeMarshallingAttribute: LibrarySymbolReference
  };
  DiscardableAttribute: LibrarySymbolReference & {
    DiscardableAttribute: LibrarySymbolReference
  };
  DynamicAttribute: LibrarySymbolReference & {
    DynamicAttribute: LibrarySymbolReference;
    TransformFlags: LibrarySymbolReference
  };
  EnumeratorCancellationAttribute: LibrarySymbolReference & {
    EnumeratorCancellationAttribute: LibrarySymbolReference
  };
  ExtensionAttribute: LibrarySymbolReference & {
    ExtensionAttribute: LibrarySymbolReference
  };
  FixedAddressValueTypeAttribute: LibrarySymbolReference & {
    FixedAddressValueTypeAttribute: LibrarySymbolReference
  };
  FixedBufferAttribute: LibrarySymbolReference & {
    FixedBufferAttribute: LibrarySymbolReference;
    ElementType: LibrarySymbolReference;
    Length: LibrarySymbolReference
  };
  FormattableStringFactory: LibrarySymbolReference & {
    Create: LibrarySymbolReference
  };
  HasCopySemanticsAttribute: LibrarySymbolReference & {
    HasCopySemanticsAttribute: LibrarySymbolReference
  };
  IAsyncStateMachine: LibrarySymbolReference & {
    MoveNext: LibrarySymbolReference;
    SetStateMachine: LibrarySymbolReference
  };
  ICriticalNotifyCompletion: LibrarySymbolReference & {
    UnsafeOnCompleted: LibrarySymbolReference
  };
  IDispatchConstantAttribute: LibrarySymbolReference & {
    IDispatchConstantAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  INotifyCompletion: LibrarySymbolReference & {
    OnCompleted: LibrarySymbolReference
  };
  IRuntimeVariables: LibrarySymbolReference & {
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  IStrongBox: LibrarySymbolReference & {
    Value: LibrarySymbolReference
  };
  ITuple: LibrarySymbolReference & {
    Item: LibrarySymbolReference;
    Length: LibrarySymbolReference
  };
  IUnknownConstantAttribute: LibrarySymbolReference & {
    IUnknownConstantAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  IndexerNameAttribute: LibrarySymbolReference & {
    IndexerNameAttribute: LibrarySymbolReference
  };
  InlineArrayAttribute: LibrarySymbolReference & {
    InlineArrayAttribute: LibrarySymbolReference;
    Length: LibrarySymbolReference
  };
  InternalsVisibleToAttribute: LibrarySymbolReference & {
    InternalsVisibleToAttribute: LibrarySymbolReference;
    AllInternalsVisible: LibrarySymbolReference;
    AssemblyName: LibrarySymbolReference
  };
  InterpolatedStringHandlerArgumentAttribute: LibrarySymbolReference & {
    InterpolatedStringHandlerArgumentAttribute: LibrarySymbolReference;
    Arguments: LibrarySymbolReference
  };
  InterpolatedStringHandlerAttribute: LibrarySymbolReference & {
    InterpolatedStringHandlerAttribute: LibrarySymbolReference
  };
  IsBoxed: LibrarySymbolReference & {

  };
  IsByValue: LibrarySymbolReference & {

  };
  IsConst: LibrarySymbolReference & {

  };
  IsCopyConstructed: LibrarySymbolReference & {

  };
  IsExplicitlyDereferenced: LibrarySymbolReference & {

  };
  IsImplicitlyDereferenced: LibrarySymbolReference & {

  };
  IsJitIntrinsic: LibrarySymbolReference & {

  };
  IsLong: LibrarySymbolReference & {

  };
  IsPinned: LibrarySymbolReference & {

  };
  IsSignUnspecifiedByte: LibrarySymbolReference & {

  };
  IsUdtReturn: LibrarySymbolReference & {

  };
  IsVolatile: LibrarySymbolReference & {

  };
  IteratorStateMachineAttribute: LibrarySymbolReference & {
    IteratorStateMachineAttribute: LibrarySymbolReference
  };
  LoadHint: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    Always: LibrarySymbolReference;
    Sometimes: LibrarySymbolReference
  };
  MetadataUpdateOriginalTypeAttribute: LibrarySymbolReference & {
    MetadataUpdateOriginalTypeAttribute: LibrarySymbolReference;
    OriginalType: LibrarySymbolReference
  };
  MethodCodeType: LibrarySymbolReference & {
    IL: LibrarySymbolReference;
    Native: LibrarySymbolReference;
    OPTIL: LibrarySymbolReference;
    Runtime: LibrarySymbolReference
  };
  MethodImplAttribute: LibrarySymbolReference & {
    MethodCodeType: LibrarySymbolReference;
    MethodImplAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  MethodImplOptions: LibrarySymbolReference & {
    Unmanaged: LibrarySymbolReference;
    NoInlining: LibrarySymbolReference;
    ForwardRef: LibrarySymbolReference;
    Synchronized: LibrarySymbolReference;
    NoOptimization: LibrarySymbolReference;
    PreserveSig: LibrarySymbolReference;
    AggressiveInlining: LibrarySymbolReference;
    AggressiveOptimization: LibrarySymbolReference;
    InternalCall: LibrarySymbolReference
  };
  ModuleInitializerAttribute: LibrarySymbolReference & {
    ModuleInitializerAttribute: LibrarySymbolReference
  };
  NativeCppClassAttribute: LibrarySymbolReference & {
    NativeCppClassAttribute: LibrarySymbolReference
  };
  OverloadResolutionPriorityAttribute: LibrarySymbolReference & {
    OverloadResolutionPriorityAttribute: LibrarySymbolReference;
    Priority: LibrarySymbolReference
  };
  ParamCollectionAttribute: LibrarySymbolReference & {
    ParamCollectionAttribute: LibrarySymbolReference
  };
  PoolingAsyncValueTaskMethodBuilder: LibrarySymbolReference & {
    Create: LibrarySymbolReference;
    SetException: LibrarySymbolReference;
    SetResult: LibrarySymbolReference;
    SetStateMachine: LibrarySymbolReference;
    Task: LibrarySymbolReference
  };
  PreserveBaseOverridesAttribute: LibrarySymbolReference & {
    PreserveBaseOverridesAttribute: LibrarySymbolReference
  };
  ReadOnlyCollectionBuilder: LibrarySymbolReference & {
    ReadOnlyCollectionBuilder: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Reverse: LibrarySymbolReference;
    ToArray: LibrarySymbolReference;
    ToReadOnlyCollection: LibrarySymbolReference;
    Capacity: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  ReferenceAssemblyAttribute: LibrarySymbolReference & {
    ReferenceAssemblyAttribute: LibrarySymbolReference;
    Description: LibrarySymbolReference
  };
  RequiredAttributeAttribute: LibrarySymbolReference & {
    RequiredAttributeAttribute: LibrarySymbolReference;
    RequiredContract: LibrarySymbolReference
  };
  RuntimeCompatibilityAttribute: LibrarySymbolReference & {
    RuntimeCompatibilityAttribute: LibrarySymbolReference;
    WrapNonExceptionThrows: LibrarySymbolReference
  };
  RuntimeFeature: LibrarySymbolReference & {
    ByRefFields: LibrarySymbolReference;
    ByRefLikeGenerics: LibrarySymbolReference;
    CovariantReturnsOfClasses: LibrarySymbolReference;
    DefaultImplementationsOfInterfaces: LibrarySymbolReference;
    NumericIntPtr: LibrarySymbolReference;
    PortablePdb: LibrarySymbolReference;
    UnmanagedSignatureCallingConvention: LibrarySymbolReference;
    VirtualStaticsInInterfaces: LibrarySymbolReference;
    IsSupported: LibrarySymbolReference;
    IsDynamicCodeCompiled: LibrarySymbolReference;
    IsDynamicCodeSupported: LibrarySymbolReference
  };
  RuntimeHelpers: LibrarySymbolReference & {
    CleanupCode: LibrarySymbolReference & {
      CleanupCode: LibrarySymbolReference;
      Invoke: LibrarySymbolReference;
      BeginInvoke: LibrarySymbolReference;
      EndInvoke: LibrarySymbolReference
    };
    TryCode: LibrarySymbolReference & {
      TryCode: LibrarySymbolReference;
      Invoke: LibrarySymbolReference;
      BeginInvoke: LibrarySymbolReference;
      EndInvoke: LibrarySymbolReference
    }
  };
  RuntimeWrappedException: LibrarySymbolReference & {
    RuntimeWrappedException: LibrarySymbolReference;
    WrappedException: LibrarySymbolReference
  };
  ScopelessEnumAttribute: LibrarySymbolReference & {
    ScopelessEnumAttribute: LibrarySymbolReference
  };
  SkipLocalsInitAttribute: LibrarySymbolReference & {
    SkipLocalsInitAttribute: LibrarySymbolReference
  };
  SpecialNameAttribute: LibrarySymbolReference & {
    SpecialNameAttribute: LibrarySymbolReference
  };
  StateMachineAttribute: LibrarySymbolReference & {
    StateMachineAttribute: LibrarySymbolReference;
    StateMachineType: LibrarySymbolReference
  };
  StringFreezingAttribute: LibrarySymbolReference & {
    StringFreezingAttribute: LibrarySymbolReference
  };
  StrongBox: LibrarySymbolReference & {
    Value: LibrarySymbolReference;
    StrongBox: LibrarySymbolReference
  };
  SuppressIldasmAttribute: LibrarySymbolReference & {
    SuppressIldasmAttribute: LibrarySymbolReference
  };
  SwitchExpressionException: LibrarySymbolReference & {
    SwitchExpressionException: LibrarySymbolReference;
    Message: LibrarySymbolReference;
    UnmatchedValue: LibrarySymbolReference
  };
  TaskAwaiter: LibrarySymbolReference & {
    GetResult: LibrarySymbolReference;
    OnCompleted: LibrarySymbolReference;
    UnsafeOnCompleted: LibrarySymbolReference;
    IsCompleted: LibrarySymbolReference
  };
  TupleElementNamesAttribute: LibrarySymbolReference & {
    TupleElementNamesAttribute: LibrarySymbolReference;
    TransformNames: LibrarySymbolReference
  };
  TypeForwardedFromAttribute: LibrarySymbolReference & {
    TypeForwardedFromAttribute: LibrarySymbolReference;
    AssemblyFullName: LibrarySymbolReference
  };
  TypeForwardedToAttribute: LibrarySymbolReference & {
    TypeForwardedToAttribute: LibrarySymbolReference;
    Destination: LibrarySymbolReference
  };
  Unsafe: LibrarySymbolReference & {
    CopyBlock: LibrarySymbolReference;
    CopyBlockUnaligned: LibrarySymbolReference;
    InitBlock: LibrarySymbolReference;
    InitBlockUnaligned: LibrarySymbolReference
  };
  UnsafeAccessorAttribute: LibrarySymbolReference & {
    UnsafeAccessorAttribute: LibrarySymbolReference;
    Kind: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  UnsafeAccessorKind: LibrarySymbolReference & {
    Constructor: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    StaticMethod: LibrarySymbolReference;
    Field: LibrarySymbolReference;
    StaticField: LibrarySymbolReference
  };
  UnsafeValueTypeAttribute: LibrarySymbolReference & {
    UnsafeValueTypeAttribute: LibrarySymbolReference
  };
  ValueTaskAwaiter: LibrarySymbolReference & {
    GetResult: LibrarySymbolReference;
    OnCompleted: LibrarySymbolReference;
    UnsafeOnCompleted: LibrarySymbolReference;
    IsCompleted: LibrarySymbolReference
  };
  YieldAwaitable: LibrarySymbolReference & {
    YieldAwaiter: LibrarySymbolReference & {
      GetResult: LibrarySymbolReference;
      OnCompleted: LibrarySymbolReference;
      UnsafeOnCompleted: LibrarySymbolReference;
      IsCompleted: LibrarySymbolReference
    }
  }
};
const CompilerServices: CompilerServicesLibrary = createLibrary("System.Runtime.CompilerServices", {
  AccessedThroughPropertyAttribute: {
    kind: "class",
    members: {
      AccessedThroughPropertyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      PropertyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  AsyncIteratorMethodBuilder: {
    kind: "struct",
    members: {
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  AsyncIteratorStateMachineAttribute: {
    kind: "class",
    members: {
      AsyncIteratorStateMachineAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  AsyncMethodBuilderAttribute: {
    kind: "class",
    members: {
      AsyncMethodBuilderAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      BuilderType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  AsyncStateMachineAttribute: {
    kind: "class",
    members: {
      AsyncStateMachineAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  AsyncTaskMethodBuilder: {
    kind: "struct",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetException: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetResult: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetStateMachine: {
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
  AsyncValueTaskMethodBuilder: {
    kind: "struct",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetException: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetResult: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetStateMachine: {
        kind: "method",
        methodKind: "ordinary",
      },
      Task: {
        kind: "property",
        type: () => {
          return Tasks.ValueTask;
        },
      },
    },
  },
  AsyncVoidMethodBuilder: {
    kind: "struct",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetException: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetResult: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetStateMachine: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  CallConvCdecl: {
    kind: "class",
    members: {
      CallConvCdecl: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CallConvFastcall: {
    kind: "class",
    members: {
      CallConvFastcall: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CallConvMemberFunction: {
    kind: "class",
    members: {
      CallConvMemberFunction: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CallConvStdcall: {
    kind: "class",
    members: {
      CallConvStdcall: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CallConvSuppressGCTransition: {
    kind: "class",
    members: {
      CallConvSuppressGCTransition: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CallConvSwift: {
    kind: "class",
    members: {
      CallConvSwift: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CallConvThiscall: {
    kind: "class",
    members: {
      CallConvThiscall: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CallSite: {
    kind: "class",
    members: {
      Target: {
        kind: "field",
        type: undefined,
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Update: {
        kind: "property",
        type: undefined,
      },
    },
  },
  CallSiteBinder: {
    kind: "class",
    members: {
      CallSiteBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      UpdateLabel: {
        kind: "property",
        type: () => {
          return Expressions.LabelTarget;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  CallSiteHelpers: {
    kind: "class",
    members: {
      IsInternalFrame: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  CallerArgumentExpressionAttribute: {
    kind: "class",
    members: {
      CallerArgumentExpressionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ParameterName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  CallerFilePathAttribute: {
    kind: "class",
    members: {
      CallerFilePathAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  CallerLineNumberAttribute: {
    kind: "class",
    members: {
      CallerLineNumberAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  CallerMemberNameAttribute: {
    kind: "class",
    members: {
      CallerMemberNameAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  CollectionBuilderAttribute: {
    kind: "class",
    members: {
      CollectionBuilderAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      BuilderType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      MethodName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  CompilationRelaxations: {
    kind: "enum",
    members: {
      NoStringInterning: {
        kind: "field",
        type: () => {
          return CompilerServices.CompilationRelaxations;
        },
      },
    },
  },
  CompilationRelaxationsAttribute: {
    kind: "class",
    members: {
      CompilationRelaxationsAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      CompilationRelaxations: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  CompilerFeatureRequiredAttribute: {
    kind: "class",
    members: {
      RefStructs: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      RequiredMembers: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      CompilerFeatureRequiredAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      FeatureName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      IsOptional: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  CompilerGeneratedAttribute: {
    kind: "class",
    members: {
      CompilerGeneratedAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  CompilerGlobalScopeAttribute: {
    kind: "class",
    members: {
      CompilerGlobalScopeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CompilerMarshalOverride: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  ConditionalWeakTable: {
    kind: "class",
    members: {
      CreateValueCallback: {
        kind: "generic",
        members: {
          CreateValueCallback: {
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
  ConfiguredAsyncDisposable: {
    kind: "struct",
    members: {
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ConfiguredCancelableAsyncEnumerable: {
    kind: "class",
    members: {
      Enumerator: {
        kind: "struct",
        members: {
          DisposeAsync: {
            kind: "method",
            methodKind: "ordinary",
          },
          MoveNextAsync: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: undefined,
          },
        },
      },
    },
  },
  ConfiguredTaskAwaitable: {
    kind: "class",
    members: {
      ConfiguredTaskAwaiter: {
        kind: "struct",
        members: {
          GetResult: {
            kind: "method",
            methodKind: "ordinary",
          },
          OnCompleted: {
            kind: "method",
            methodKind: "ordinary",
          },
          UnsafeOnCompleted: {
            kind: "method",
            methodKind: "ordinary",
          },
          IsCompleted: {
            kind: "property",
            type: () => {
              return System.Boolean;
            },
          },
        },
      },
    },
  },
  ConfiguredValueTaskAwaitable: {
    kind: "class",
    members: {
      ConfiguredValueTaskAwaiter: {
        kind: "struct",
        members: {
          GetResult: {
            kind: "method",
            methodKind: "ordinary",
          },
          OnCompleted: {
            kind: "method",
            methodKind: "ordinary",
          },
          UnsafeOnCompleted: {
            kind: "method",
            methodKind: "ordinary",
          },
          IsCompleted: {
            kind: "property",
            type: () => {
              return System.Boolean;
            },
          },
        },
      },
    },
  },
  ContractHelper: {
    kind: "class",
    members: {
      RaiseContractFailedEvent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TriggerFailure: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  CppInlineNamespaceAttribute: {
    kind: "class",
    members: {
      CppInlineNamespaceAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  CreateNewOnMetadataUpdateAttribute: {
    kind: "class",
    members: {
      CreateNewOnMetadataUpdateAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  CustomConstantAttribute: {
    kind: "class",
    members: {
      CustomConstantAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  DateTimeConstantAttribute: {
    kind: "class",
    members: {
      DateTimeConstantAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  DebugInfoGenerator: {
    kind: "class",
    members: {
      DebugInfoGenerator: {
        kind: "method",
        methodKind: "constructor",
      },
      CreatePdbGenerator: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MarkSequencePoint: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  DecimalConstantAttribute: {
    kind: "class",
    members: {
      DecimalConstantAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Decimal;
        },
      },
    },
    isSealed: true,
  },
  DefaultDependencyAttribute: {
    kind: "class",
    members: {
      DefaultDependencyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      LoadHint: {
        kind: "property",
        type: () => {
          return CompilerServices.LoadHint;
        },
      },
    },
    isSealed: true,
  },
  DefaultInterpolatedStringHandler: {
    kind: "struct",
    members: {
      DefaultInterpolatedStringHandler: {
        kind: "method",
        methodKind: "constructor",
      },
      AppendFormatted: {
        kind: "method",
        methodKind: "ordinary",
      },
      AppendLiteral: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToStringAndClear: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  DependencyAttribute: {
    kind: "class",
    members: {
      DependencyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      DependentAssembly: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      LoadHint: {
        kind: "property",
        type: () => {
          return CompilerServices.LoadHint;
        },
      },
    },
    isSealed: true,
  },
  DisablePrivateReflectionAttribute: {
    kind: "class",
    members: {
      DisablePrivateReflectionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DisableRuntimeMarshallingAttribute: {
    kind: "class",
    members: {
      DisableRuntimeMarshallingAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DiscardableAttribute: {
    kind: "class",
    members: {
      DiscardableAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  DynamicAttribute: {
    kind: "class",
    members: {
      DynamicAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      TransformFlags: {
        kind: "property",
        type: () => {
          return Generic.IList;
        },
      },
    },
    isSealed: true,
  },
  EnumeratorCancellationAttribute: {
    kind: "class",
    members: {
      EnumeratorCancellationAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ExtensionAttribute: {
    kind: "class",
    members: {
      ExtensionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  FixedAddressValueTypeAttribute: {
    kind: "class",
    members: {
      FixedAddressValueTypeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  FixedBufferAttribute: {
    kind: "class",
    members: {
      FixedBufferAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ElementType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  FormattableStringFactory: {
    kind: "class",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  HasCopySemanticsAttribute: {
    kind: "class",
    members: {
      HasCopySemanticsAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  IAsyncStateMachine: {
    kind: "interface",
    members: {
      MoveNext: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetStateMachine: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ICriticalNotifyCompletion: {
    kind: "interface",
    members: {
      UnsafeOnCompleted: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IDispatchConstantAttribute: {
    kind: "class",
    members: {
      IDispatchConstantAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  INotifyCompletion: {
    kind: "interface",
    members: {
      OnCompleted: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IRuntimeVariables: {
    kind: "interface",
    members: {
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
  },
  IStrongBox: {
    kind: "interface",
    members: {
      Value: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  ITuple: {
    kind: "interface",
    members: {
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  IUnknownConstantAttribute: {
    kind: "class",
    members: {
      IUnknownConstantAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  IndexerNameAttribute: {
    kind: "class",
    members: {
      IndexerNameAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  InlineArrayAttribute: {
    kind: "class",
    members: {
      InlineArrayAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  InternalsVisibleToAttribute: {
    kind: "class",
    members: {
      InternalsVisibleToAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AllInternalsVisible: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AssemblyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  InterpolatedStringHandlerArgumentAttribute: {
    kind: "class",
    members: {
      InterpolatedStringHandlerArgumentAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Arguments: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
    isSealed: true,
  },
  InterpolatedStringHandlerAttribute: {
    kind: "class",
    members: {
      InterpolatedStringHandlerAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  IsBoxed: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  IsByValue: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  IsConst: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  IsCopyConstructed: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  IsExplicitlyDereferenced: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  IsImplicitlyDereferenced: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  IsJitIntrinsic: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  IsLong: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  IsPinned: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  IsSignUnspecifiedByte: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  IsUdtReturn: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  IsVolatile: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  IteratorStateMachineAttribute: {
    kind: "class",
    members: {
      IteratorStateMachineAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  LoadHint: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return CompilerServices.LoadHint;
        },
      },
      Always: {
        kind: "field",
        type: () => {
          return CompilerServices.LoadHint;
        },
      },
      Sometimes: {
        kind: "field",
        type: () => {
          return CompilerServices.LoadHint;
        },
      },
    },
  },
  MetadataUpdateOriginalTypeAttribute: {
    kind: "class",
    members: {
      MetadataUpdateOriginalTypeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      OriginalType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
  },
  MethodCodeType: {
    kind: "enum",
    members: {
      IL: {
        kind: "field",
        type: () => {
          return CompilerServices.MethodCodeType;
        },
      },
      Native: {
        kind: "field",
        type: () => {
          return CompilerServices.MethodCodeType;
        },
      },
      OPTIL: {
        kind: "field",
        type: () => {
          return CompilerServices.MethodCodeType;
        },
      },
      Runtime: {
        kind: "field",
        type: () => {
          return CompilerServices.MethodCodeType;
        },
      },
    },
  },
  MethodImplAttribute: {
    kind: "class",
    members: {
      MethodCodeType: {
        kind: "field",
        type: () => {
          return CompilerServices.MethodCodeType;
        },
      },
      MethodImplAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return CompilerServices.MethodImplOptions;
        },
      },
    },
    isSealed: true,
  },
  MethodImplOptions: {
    kind: "enum",
    members: {
      Unmanaged: {
        kind: "field",
        type: () => {
          return CompilerServices.MethodImplOptions;
        },
      },
      NoInlining: {
        kind: "field",
        type: () => {
          return CompilerServices.MethodImplOptions;
        },
      },
      ForwardRef: {
        kind: "field",
        type: () => {
          return CompilerServices.MethodImplOptions;
        },
      },
      Synchronized: {
        kind: "field",
        type: () => {
          return CompilerServices.MethodImplOptions;
        },
      },
      NoOptimization: {
        kind: "field",
        type: () => {
          return CompilerServices.MethodImplOptions;
        },
      },
      PreserveSig: {
        kind: "field",
        type: () => {
          return CompilerServices.MethodImplOptions;
        },
      },
      AggressiveInlining: {
        kind: "field",
        type: () => {
          return CompilerServices.MethodImplOptions;
        },
      },
      AggressiveOptimization: {
        kind: "field",
        type: () => {
          return CompilerServices.MethodImplOptions;
        },
      },
      InternalCall: {
        kind: "field",
        type: () => {
          return CompilerServices.MethodImplOptions;
        },
      },
    },
  },
  ModuleInitializerAttribute: {
    kind: "class",
    members: {
      ModuleInitializerAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  NativeCppClassAttribute: {
    kind: "class",
    members: {
      NativeCppClassAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  OverloadResolutionPriorityAttribute: {
    kind: "class",
    members: {
      OverloadResolutionPriorityAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Priority: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  ParamCollectionAttribute: {
    kind: "class",
    members: {
      ParamCollectionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  PoolingAsyncValueTaskMethodBuilder: {
    kind: "struct",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetException: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetResult: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetStateMachine: {
        kind: "method",
        methodKind: "ordinary",
      },
      Task: {
        kind: "property",
        type: () => {
          return Tasks.ValueTask;
        },
      },
    },
  },
  PreserveBaseOverridesAttribute: {
    kind: "class",
    members: {
      PreserveBaseOverridesAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ReadOnlyCollectionBuilder: {
    kind: "class",
    members: {
      ReadOnlyCollectionBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
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
      Reverse: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToReadOnlyCollection: {
        kind: "method",
        methodKind: "ordinary",
      },
      Capacity: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Item: {
        kind: "property",
        type: undefined,
      },
    },
    isSealed: true,
  },
  ReferenceAssemblyAttribute: {
    kind: "class",
    members: {
      ReferenceAssemblyAttribute: {
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
    },
    isSealed: true,
  },
  RequiredAttributeAttribute: {
    kind: "class",
    members: {
      RequiredAttributeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      RequiredContract: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  RuntimeCompatibilityAttribute: {
    kind: "class",
    members: {
      RuntimeCompatibilityAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      WrapNonExceptionThrows: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  RuntimeFeature: {
    kind: "class",
    members: {
      ByRefFields: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      ByRefLikeGenerics: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      CovariantReturnsOfClasses: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DefaultImplementationsOfInterfaces: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      NumericIntPtr: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      PortablePdb: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      UnmanagedSignatureCallingConvention: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      VirtualStaticsInInterfaces: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      IsSupported: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsDynamicCodeCompiled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      IsDynamicCodeSupported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  RuntimeHelpers: {
    kind: "class",
    members: {
      CleanupCode: {
        kind: "generic",
        members: {
          CleanupCode: {
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
      TryCode: {
        kind: "generic",
        members: {
          TryCode: {
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
  RuntimeWrappedException: {
    kind: "class",
    members: {
      RuntimeWrappedException: {
        kind: "method",
        methodKind: "constructor",
      },
      WrappedException: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
    isSealed: true,
  },
  ScopelessEnumAttribute: {
    kind: "class",
    members: {
      ScopelessEnumAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  SkipLocalsInitAttribute: {
    kind: "class",
    members: {
      SkipLocalsInitAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  SpecialNameAttribute: {
    kind: "class",
    members: {
      SpecialNameAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  StateMachineAttribute: {
    kind: "class",
    members: {
      StateMachineAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      StateMachineType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
  },
  StringFreezingAttribute: {
    kind: "class",
    members: {
      StringFreezingAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  StrongBox: {
    kind: "class",
    members: {
      Value: {
        kind: "field",
        type: undefined,
      },
      StrongBox: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  SuppressIldasmAttribute: {
    kind: "class",
    members: {
      SuppressIldasmAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  SwitchExpressionException: {
    kind: "class",
    members: {
      SwitchExpressionException: {
        kind: "method",
        methodKind: "constructor",
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      UnmatchedValue: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  TaskAwaiter: {
    kind: "struct",
    members: {
      GetResult: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnCompleted: {
        kind: "method",
        methodKind: "ordinary",
      },
      UnsafeOnCompleted: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsCompleted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  TupleElementNamesAttribute: {
    kind: "class",
    members: {
      TupleElementNamesAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      TransformNames: {
        kind: "property",
        type: () => {
          return Generic.IList;
        },
      },
    },
    isSealed: true,
  },
  TypeForwardedFromAttribute: {
    kind: "class",
    members: {
      TypeForwardedFromAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AssemblyFullName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  TypeForwardedToAttribute: {
    kind: "class",
    members: {
      TypeForwardedToAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Destination: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  Unsafe: {
    kind: "class",
    members: {
      CopyBlock: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isReadOnly: true,
      },
      CopyBlockUnaligned: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isReadOnly: true,
      },
      InitBlock: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      InitBlockUnaligned: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  UnsafeAccessorAttribute: {
    kind: "class",
    members: {
      UnsafeAccessorAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Kind: {
        kind: "property",
        type: () => {
          return CompilerServices.UnsafeAccessorKind;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  UnsafeAccessorKind: {
    kind: "enum",
    members: {
      Constructor: {
        kind: "field",
        type: () => {
          return CompilerServices.UnsafeAccessorKind;
        },
      },
      Method: {
        kind: "field",
        type: () => {
          return CompilerServices.UnsafeAccessorKind;
        },
      },
      StaticMethod: {
        kind: "field",
        type: () => {
          return CompilerServices.UnsafeAccessorKind;
        },
      },
      Field: {
        kind: "field",
        type: () => {
          return CompilerServices.UnsafeAccessorKind;
        },
      },
      StaticField: {
        kind: "field",
        type: () => {
          return CompilerServices.UnsafeAccessorKind;
        },
      },
    },
  },
  UnsafeValueTypeAttribute: {
    kind: "class",
    members: {
      UnsafeValueTypeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ValueTaskAwaiter: {
    kind: "struct",
    members: {
      GetResult: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnCompleted: {
        kind: "method",
        methodKind: "ordinary",
      },
      UnsafeOnCompleted: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsCompleted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  YieldAwaitable: {
    kind: "class",
    members: {
      YieldAwaiter: {
        kind: "struct",
        members: {
          GetResult: {
            kind: "method",
            methodKind: "ordinary",
          },
          OnCompleted: {
            kind: "method",
            methodKind: "ordinary",
          },
          UnsafeOnCompleted: {
            kind: "method",
            methodKind: "ordinary",
          },
          IsCompleted: {
            kind: "property",
            type: () => {
              return System.Boolean;
            },
          },
        },
      },
    },
  },
});
export default CompilerServices
