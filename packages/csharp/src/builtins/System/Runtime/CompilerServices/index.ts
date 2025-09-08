import Generic from "../../Collections/Generic/index.js";
import System from "../../index.js";
import Tasks from "../../Threading/Tasks/index.js";

import { createLibrary } from "#createLibrary";


const CompilerServices = createLibrary("System.Runtime.CompilerServices", {
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
  INotifyCompletion: {
    kind: "interface",
    members: {
      OnCompleted: {
        kind: "method",
        methodKind: "ordinary",
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
  IsConst: {
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
