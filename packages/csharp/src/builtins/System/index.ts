import Collections from "./Collections/index.js";
import ObjectModel from "./Collections/ObjectModel/index.js";
import Reflection from "./Reflection/index.js";
import InteropServices from "./Runtime/InteropServices/index.js";
import Security from "./Security/index.js";
import Threading from "./Threading/index.js";

import { createLibrary } from "#createLibrary";
export { default as Buffers } from "./Buffers/index.js";
export { default as CodeDom } from "./CodeDom/index.js";
export { default as Collections } from "./Collections/index.js";
export { default as ComponentModel } from "./ComponentModel/index.js";
export { default as Configuration } from "./Configuration/index.js";
export { default as Diagnostics } from "./Diagnostics/index.js";
export { default as Globalization } from "./Globalization/index.js";
export { default as IO } from "./IO/index.js";
export { default as Net } from "./Net/index.js";
export { default as Numerics } from "./Numerics/index.js";
export { default as Reflection } from "./Reflection/index.js";
export { default as Resources } from "./Resources/index.js";
export { default as Runtime } from "./Runtime/index.js";
export { default as Security } from "./Security/index.js";
export { default as Text } from "./Text/index.js";
export { default as Threading } from "./Threading/index.js";

const System = createLibrary("System", {
  AccessViolationException: {
    kind: "class",
    members: {
      AccessViolationException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Action: {
    kind: "generic",
    members: {
      Action: {
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
  Activator: {
    kind: "class",
    members: {
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateInstanceFrom: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  AggregateException: {
    kind: "class",
    members: {
      AggregateException: {
        kind: "method",
        methodKind: "constructor",
      },
      Flatten: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetBaseException: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Handle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InnerExceptions: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
  },
  AppContext: {
    kind: "class",
    members: {
      GetData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetData: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetSwitch: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryGetSwitch: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BaseDirectory: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
      TargetFrameworkName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isStatic: true,
      },
    },
    isStatic: true,
  },
  AppDomain: {
    kind: "class",
    members: {
      AppendPrivatePath: {
        kind: "method",
        methodKind: "ordinary",
      },
      ApplyPolicy: {
        kind: "method",
        methodKind: "ordinary",
      },
      ClearPrivatePath: {
        kind: "method",
        methodKind: "ordinary",
      },
      ClearShadowCopyPath: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateDomain: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateInstanceAndUnwrap: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateInstanceFrom: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateInstanceFromAndUnwrap: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExecuteAssembly: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExecuteAssemblyByName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAssemblies: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCurrentThreadId: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetData: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsCompatibilitySwitchSet: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsDefaultAppDomain: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsFinalizingForUnload: {
        kind: "method",
        methodKind: "ordinary",
      },
      Load: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReflectionOnlyGetAssemblies: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetCachePath: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetData: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetDynamicBase: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetPrincipalPolicy: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetShadowCopyFiles: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetShadowCopyPath: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetThreadPrincipal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Unload: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BaseDirectory: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      CurrentDomain: {
        kind: "property",
        type: () => {
          return System.AppDomain;
        },
        isStatic: true,
      },
      DynamicDirectory: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      FriendlyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Id: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsFullyTrusted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsHomogenous: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MonitoringIsEnabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      MonitoringSurvivedMemorySize: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      MonitoringSurvivedProcessMemorySize: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isStatic: true,
      },
      MonitoringTotalAllocatedMemorySize: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      MonitoringTotalProcessorTime: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      PermissionSet: {
        kind: "property",
        type: () => {
          return Security.PermissionSet;
        },
      },
      RelativeSearchPath: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SetupInformation: {
        kind: "property",
        type: () => {
          return System.AppDomainSetup;
        },
      },
      ShadowCopyFiles: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  AppDomainSetup: {
    kind: "class",
    members: {
      ApplicationBase: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      TargetFrameworkName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  AppDomainUnloadedException: {
    kind: "class",
    members: {
      AppDomainUnloadedException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  ApplicationException: {
    kind: "class",
    members: {
      ApplicationException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  ApplicationId: {
    kind: "class",
    members: {
      ApplicationId: {
        kind: "method",
        methodKind: "constructor",
      },
      Copy: {
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
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Culture: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ProcessorArchitecture: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      PublicKeyToken: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      Version: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
    },
    isSealed: true,
  },
  ArgIterator: {
    kind: "struct",
    members: {
      ArgIterator: {
        kind: "method",
        methodKind: "constructor",
      },
      End: {
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
      GetNextArg: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNextArgType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetRemainingCount: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ArgumentException: {
    kind: "class",
    members: {
      ArgumentException: {
        kind: "method",
        methodKind: "constructor",
      },
      ThrowIfNullOrEmpty: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ThrowIfNullOrWhiteSpace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      ParamName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
  },
  ArgumentNullException: {
    kind: "class",
    members: {
      ArgumentNullException: {
        kind: "method",
        methodKind: "constructor",
      },
      ThrowIfNull: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  ArgumentOutOfRangeException: {
    kind: "class",
    members: {
      ArgumentOutOfRangeException: {
        kind: "method",
        methodKind: "constructor",
      },
      ActualValue: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
        isVirtual: true,
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
  },
  ArithmeticException: {
    kind: "class",
    members: {
      ArithmeticException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Array: {
    kind: "class",
    members: {
      BinarySearch: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      ConstrainedCopy: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Copy: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateInstanceFromArrayType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetLength: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetLongLength: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetLowerBound: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUpperBound: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Initialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      LastIndexOf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Reverse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Sort: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsFixedSize: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSynchronized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      LongLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      MaxLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      Rank: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
    isAbstract: true,
  },
  ArraySegment: {
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
            type: undefined,
          },
        },
      },
    },
  },
  ArrayTypeMismatchException: {
    kind: "class",
    members: {
      ArrayTypeMismatchException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  AssemblyLoadEventArgs: {
    kind: "class",
    members: {
      AssemblyLoadEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      LoadedAssembly: {
        kind: "property",
        type: () => {
          return Reflection.Assembly;
        },
      },
    },
  },
  AssemblyLoadEventHandler: {
    kind: "generic",
    members: {
      AssemblyLoadEventHandler: {
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
  AsyncCallback: {
    kind: "generic",
    members: {
      AsyncCallback: {
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
  Attribute: {
    kind: "class",
    members: {
      Attribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCustomAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCustomAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Match: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TypeId: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  AttributeTargets: {
    kind: "enum",
    members: {
      Assembly: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      Module: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      Class: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      Struct: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      Enum: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      Constructor: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      Method: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      Property: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      Field: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      Event: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      Interface: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      Parameter: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      Delegate: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      ReturnValue: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      GenericParameter: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
      All: {
        kind: "field",
        type: () => {
          return System.AttributeTargets;
        },
      },
    },
  },
  AttributeUsageAttribute: {
    kind: "class",
    members: {
      AttributeUsageAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AllowMultiple: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Inherited: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ValidOn: {
        kind: "property",
        type: () => {
          return System.AttributeTargets;
        },
      },
    },
    isSealed: true,
  },
  BadImageFormatException: {
    kind: "class",
    members: {
      BadImageFormatException: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FileName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      FusionLog: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
  },
  Base64FormattingOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return System.Base64FormattingOptions;
        },
      },
      InsertLineBreaks: {
        kind: "field",
        type: () => {
          return System.Base64FormattingOptions;
        },
      },
    },
  },
  BitConverter: {
    kind: "class",
    members: {
      IsLittleEndian: {
        kind: "field",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DoubleToInt64Bits: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DoubleToUInt64Bits: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HalfToInt16Bits: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HalfToUInt16Bits: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Int16BitsToHalf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Int32BitsToSingle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Int64BitsToDouble: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SingleToInt32Bits: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SingleToUInt32Bits: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToBoolean: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToChar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToDouble: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToHalf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToInt128: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToInt16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToInt32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToInt64: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSingle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUInt128: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUInt16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUInt32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUInt64: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UInt16BitsToHalf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UInt32BitsToSingle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UInt64BitsToDouble: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  Boolean: {
    kind: "struct",
    members: {
      FalseString: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      TrueString: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
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
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  Buffer: {
    kind: "class",
    members: {
      BlockCopy: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ByteLength: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetByte: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MemoryCopy: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetByte: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  Byte: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return System.Byte;
        },
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.Byte;
        },
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      DivRem: {
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
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LeadingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateRight: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  CLSCompliantAttribute: {
    kind: "class",
    members: {
      CLSCompliantAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsCompliant: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  CannotUnloadAppDomainException: {
    kind: "class",
    members: {
      CannotUnloadAppDomainException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Char: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return System.Char;
        },
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.Char;
        },
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      ConvertFromUtf32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ConvertToUtf32: {
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
      GetNumericValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUnicodeCategory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsAscii: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsAsciiDigit: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsAsciiHexDigit: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsAsciiHexDigitLower: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsAsciiHexDigitUpper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsAsciiLetter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsAsciiLetterLower: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsAsciiLetterOrDigit: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsAsciiLetterUpper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsBetween: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsControl: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsDigit: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsHighSurrogate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsLetter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsLetterOrDigit: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsLower: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsLowSurrogate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPunctuation: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSeparator: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSurrogate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSurrogatePair: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSymbol: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsUpper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsWhiteSpace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToLower: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToLowerInvariant: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToUpper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUpperInvariant: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  CharEnumerator: {
    kind: "class",
    members: {
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
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
          return System.Char;
        },
      },
    },
    isSealed: true,
  },
  Comparison: {
    kind: "generic",
    members: {
      Comparison: {
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
  ContextBoundObject: {
    kind: "class",
    members: {
      ContextBoundObject: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isAbstract: true,
  },
  ContextMarshalException: {
    kind: "class",
    members: {
      ContextMarshalException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  ContextStaticAttribute: {
    kind: "class",
    members: {
      ContextStaticAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Convert: {
    kind: "class",
    members: {
      DBNull: {
        kind: "field",
        type: () => {
          return System.Object;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ChangeType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromBase64CharArray: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromBase64String: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromHexString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsDBNull: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToBase64CharArray: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToBase64String: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToBoolean: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToByte: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToChar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToDecimal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToDouble: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToHexString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToHexStringLower: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToInt16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToInt32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToInt64: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSByte: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSingle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUInt16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUInt32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUInt64: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFromBase64Chars: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFromBase64String: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryToBase64Chars: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryToHexString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryToHexStringLower: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  Converter: {
    kind: "generic",
    members: {
      Converter: {
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
  DBNull: {
    kind: "class",
    members: {
      Value: {
        kind: "field",
        type: () => {
          return System.DBNull;
        },
        isStatic: true,
        isReadOnly: true,
      },
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  DateOnly: {
    kind: "struct",
    members: {
      DateOnly: {
        kind: "method",
        methodKind: "constructor",
      },
      AddDays: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromDayNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ParseExact: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToLongDateString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToShortDateString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryParseExact: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Day: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      DayNumber: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      DayOfWeek: {
        kind: "property",
        type: () => {
          return System.DayOfWeek;
        },
      },
      DayOfYear: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxValue: {
        kind: "property",
        type: () => {
          return System.DateOnly;
        },
        isStatic: true,
      },
      MinValue: {
        kind: "property",
        type: () => {
          return System.DateOnly;
        },
        isStatic: true,
      },
      Month: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Year: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  DateTime: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return System.DateTime;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.DateTime;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UnixEpoch: {
        kind: "field",
        type: () => {
          return System.DateTime;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DateTime: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddDays: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddHours: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMicroseconds: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMilliseconds: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMinutes: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddSeconds: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddTicks: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
      },
      Compare: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      DaysInMonth: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromBinary: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromFileTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromFileTimeUtc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromOADate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDateTimeFormats: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsDaylightSavingTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsLeapYear: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ParseExact: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SpecifyKind: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToBinary: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToFileTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToFileTimeUtc: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToLocalTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToLongDateString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToLongTimeString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToOADate: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToShortDateString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToShortTimeString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToUniversalTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryParseExact: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Date: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      Day: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      DayOfWeek: {
        kind: "property",
        type: () => {
          return System.DayOfWeek;
        },
      },
      DayOfYear: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Hour: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Kind: {
        kind: "property",
        type: () => {
          return System.DateTimeKind;
        },
      },
      Microsecond: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Millisecond: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Minute: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Month: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Nanosecond: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Now: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isStatic: true,
      },
      Second: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Ticks: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      TimeOfDay: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      Today: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isStatic: true,
      },
      UtcNow: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isStatic: true,
      },
      Year: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  DateTimeKind: {
    kind: "enum",
    members: {
      Unspecified: {
        kind: "field",
        type: () => {
          return System.DateTimeKind;
        },
      },
      Utc: {
        kind: "field",
        type: () => {
          return System.DateTimeKind;
        },
      },
      Local: {
        kind: "field",
        type: () => {
          return System.DateTimeKind;
        },
      },
    },
  },
  DateTimeOffset: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return System.DateTimeOffset;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.DateTimeOffset;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UnixEpoch: {
        kind: "field",
        type: () => {
          return System.DateTimeOffset;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DateTimeOffset: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddDays: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddHours: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMicroseconds: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMilliseconds: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMinutes: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddSeconds: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddTicks: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
      },
      Compare: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      EqualsExact: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromFileTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromUnixTimeMilliseconds: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromUnixTimeSeconds: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ParseExact: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToFileTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToLocalTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToOffset: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToUniversalTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUnixTimeMilliseconds: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUnixTimeSeconds: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryParseExact: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Date: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      DateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      Day: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      DayOfWeek: {
        kind: "property",
        type: () => {
          return System.DayOfWeek;
        },
      },
      DayOfYear: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Hour: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      LocalDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      Microsecond: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Millisecond: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Minute: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Month: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Nanosecond: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Now: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
        isStatic: true,
      },
      Offset: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      Second: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Ticks: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      TimeOfDay: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      TotalOffsetMinutes: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      UtcDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      UtcNow: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
        isStatic: true,
      },
      UtcTicks: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      Year: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  DayOfWeek: {
    kind: "enum",
    members: {
      Sunday: {
        kind: "field",
        type: () => {
          return System.DayOfWeek;
        },
      },
      Monday: {
        kind: "field",
        type: () => {
          return System.DayOfWeek;
        },
      },
      Tuesday: {
        kind: "field",
        type: () => {
          return System.DayOfWeek;
        },
      },
      Wednesday: {
        kind: "field",
        type: () => {
          return System.DayOfWeek;
        },
      },
      Thursday: {
        kind: "field",
        type: () => {
          return System.DayOfWeek;
        },
      },
      Friday: {
        kind: "field",
        type: () => {
          return System.DayOfWeek;
        },
      },
      Saturday: {
        kind: "field",
        type: () => {
          return System.DayOfWeek;
        },
      },
    },
  },
  Decimal: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return System.Decimal;
        },
        isReadOnly: true,
      },
      MinusOne: {
        kind: "field",
        type: () => {
          return System.Decimal;
        },
        isReadOnly: true,
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.Decimal;
        },
        isReadOnly: true,
      },
      One: {
        kind: "field",
        type: () => {
          return System.Decimal;
        },
        isReadOnly: true,
      },
      Zero: {
        kind: "field",
        type: () => {
          return System.Decimal;
        },
        isReadOnly: true,
      },
      Decimal: {
        kind: "method",
        methodKind: "constructor",
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ceiling: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Compare: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      Floor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromOACurrency: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetBits: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsCanonical: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Negate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Remainder: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToByte: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToDouble: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToInt16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToInt32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToInt64: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToOACurrency: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSByte: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSingle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToUInt16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUInt32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUInt64: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetBits: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Scale: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
    },
  },
  Delegate: {
    kind: "class",
    members: {
      InvocationListEnumerator: {
        kind: "struct",
        members: {
          MoveNext: {
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
  DivideByZeroException: {
    kind: "class",
    members: {
      DivideByZeroException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Double: {
    kind: "struct",
    members: {
      E: {
        kind: "field",
        type: () => {
          return System.Double;
        },
      },
      Epsilon: {
        kind: "field",
        type: () => {
          return System.Double;
        },
      },
      MaxValue: {
        kind: "field",
        type: () => {
          return System.Double;
        },
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.Double;
        },
      },
      NaN: {
        kind: "field",
        type: () => {
          return System.Double;
        },
      },
      NegativeInfinity: {
        kind: "field",
        type: () => {
          return System.Double;
        },
      },
      NegativeZero: {
        kind: "field",
        type: () => {
          return System.Double;
        },
      },
      Pi: {
        kind: "field",
        type: () => {
          return System.Double;
        },
      },
      PositiveInfinity: {
        kind: "field",
        type: () => {
          return System.Double;
        },
      },
      Tau: {
        kind: "field",
        type: () => {
          return System.Double;
        },
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Acos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Acosh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AcosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Asin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Asinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AsinPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan2Pi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atanh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AtanPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitDecrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitIncrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cbrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ceiling: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cosh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DegreesToRadians: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      Exp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp10: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp10M1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp2M1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ExpM1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Floor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FusedMultiplyAdd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      Hypot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ieee754Remainder: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ILogB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsFinite: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNaN: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegativeInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNormal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositiveInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsRealNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSubnormal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Lerp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log10: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log10P1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2P1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LogP1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitudeNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitudeNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MultiplyAddEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Pow: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RadiansToDegrees: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReciprocalEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReciprocalSqrtEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RootN: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ScaleB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinCos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinCosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sqrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Tan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Tanh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TanPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  DuplicateWaitObjectException: {
    kind: "class",
    members: {
      DuplicateWaitObjectException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  EntryPointNotFoundException: {
    kind: "class",
    members: {
      EntryPointNotFoundException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Enum: {
    kind: "class",
    members: {
      Enum: {
        kind: "method",
        methodKind: "constructor",
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Format: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetNames: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUnderlyingType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetValues: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetValuesAsUnderlyingType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HasFlag: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsDefined: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  Environment: {
    kind: "class",
    members: {
      ProcessCpuUsage: {
        kind: "struct",
        members: {
          UserTime: {
            kind: "property",
            type: () => {
              return System.TimeSpan;
            },
          },
          PrivilegedTime: {
            kind: "property",
            type: () => {
              return System.TimeSpan;
            },
          },
          TotalTime: {
            kind: "property",
            type: () => {
              return System.TimeSpan;
            },
          },
        },
      },
      SpecialFolder: {
        kind: "enum",
        members: {
          Desktop: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          Programs: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          MyDocuments: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          Personal: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          Favorites: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          Startup: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          Recent: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          SendTo: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          StartMenu: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          MyMusic: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          MyVideos: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          DesktopDirectory: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          MyComputer: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          NetworkShortcuts: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          Fonts: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          Templates: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CommonStartMenu: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CommonPrograms: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CommonStartup: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CommonDesktopDirectory: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          ApplicationData: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          PrinterShortcuts: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          LocalApplicationData: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          InternetCache: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          Cookies: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          History: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CommonApplicationData: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          Windows: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          System: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          ProgramFiles: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          MyPictures: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          UserProfile: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          SystemX86: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          ProgramFilesX86: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CommonProgramFiles: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CommonProgramFilesX86: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CommonTemplates: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CommonDocuments: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CommonAdminTools: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          AdminTools: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CommonMusic: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CommonPictures: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CommonVideos: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          Resources: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          LocalizedResources: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CommonOemLinks: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
          CDBurning: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolder;
            },
          },
        },
      },
      SpecialFolderOption: {
        kind: "enum",
        members: {
          None: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolderOption;
            },
          },
          DoNotVerify: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolderOption;
            },
          },
          Create: {
            kind: "field",
            type: () => {
              return System.Environment.SpecialFolderOption;
            },
          },
        },
      },
    },
  },
  EnvironmentVariableTarget: {
    kind: "enum",
    members: {
      Process: {
        kind: "field",
        type: () => {
          return System.EnvironmentVariableTarget;
        },
      },
      User: {
        kind: "field",
        type: () => {
          return System.EnvironmentVariableTarget;
        },
      },
      Machine: {
        kind: "field",
        type: () => {
          return System.EnvironmentVariableTarget;
        },
      },
    },
  },
  EventArgs: {
    kind: "class",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return System.EventArgs;
        },
        isStatic: true,
        isReadOnly: true,
      },
      EventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  EventHandler: {
    kind: "generic",
    members: {
      EventHandler: {
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
  Exception: {
    kind: "class",
    members: {
      Exception: {
        kind: "method",
        methodKind: "constructor",
      },
      GetBaseException: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetType: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Data: {
        kind: "property",
        type: () => {
          return Collections.IDictionary;
        },
        isVirtual: true,
      },
      HelpLink: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      HResult: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      InnerException: {
        kind: "property",
        type: () => {
          return System.Exception;
        },
        isNullable: true,
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      Source: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      StackTrace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      TargetSite: {
        kind: "property",
        type: () => {
          return Reflection.MethodBase;
        },
        isNullable: true,
      },
    },
  },
  ExecutionEngineException: {
    kind: "class",
    members: {
      ExecutionEngineException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  FieldAccessException: {
    kind: "class",
    members: {
      FieldAccessException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  FileStyleUriParser: {
    kind: "class",
    members: {
      FileStyleUriParser: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  FlagsAttribute: {
    kind: "class",
    members: {
      FlagsAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  FormatException: {
    kind: "class",
    members: {
      FormatException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  FormattableString: {
    kind: "class",
    members: {
      FormattableString: {
        kind: "method",
        methodKind: "constructor",
      },
      CurrentCulture: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetArgument: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetArguments: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Invariant: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ArgumentCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      Format: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  FtpStyleUriParser: {
    kind: "class",
    members: {
      FtpStyleUriParser: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Func: {
    kind: "generic",
    members: {
      Func: {
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
  GC: {
    kind: "class",
    members: {
      AddMemoryPressure: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CancelFullGCNotification: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Collect: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CollectionCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EndNoGCRegion: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetAllocatedBytesForCurrentThread: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetConfigurationVariables: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetGCMemoryInfo: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetGeneration: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTotalAllocatedBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTotalMemory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTotalPauseDuration: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      KeepAlive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RefreshMemoryLimit: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RegisterForFullGCNotification: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RegisterNoGCRegionCallback: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RemoveMemoryPressure: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReRegisterForFinalize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SuppressFinalize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryStartNoGCRegion: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WaitForFullGCApproach: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WaitForFullGCComplete: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WaitForPendingFinalizers: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxGeneration: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  GCCollectionMode: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return System.GCCollectionMode;
        },
      },
      Forced: {
        kind: "field",
        type: () => {
          return System.GCCollectionMode;
        },
      },
      Optimized: {
        kind: "field",
        type: () => {
          return System.GCCollectionMode;
        },
      },
      Aggressive: {
        kind: "field",
        type: () => {
          return System.GCCollectionMode;
        },
      },
    },
  },
  GCGenerationInfo: {
    kind: "struct",
    members: {
      FragmentationAfterBytes: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      FragmentationBeforeBytes: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      SizeAfterBytes: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      SizeBeforeBytes: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  GCKind: {
    kind: "enum",
    members: {
      Any: {
        kind: "field",
        type: () => {
          return System.GCKind;
        },
      },
      Ephemeral: {
        kind: "field",
        type: () => {
          return System.GCKind;
        },
      },
      FullBlocking: {
        kind: "field",
        type: () => {
          return System.GCKind;
        },
      },
      Background: {
        kind: "field",
        type: () => {
          return System.GCKind;
        },
      },
    },
  },
  GCMemoryInfo: {
    kind: "struct",
    members: {
      Compacted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Concurrent: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      FinalizationPendingCount: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      FragmentedBytes: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      Generation: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      GenerationInfo: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
      },
      HeapSizeBytes: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      HighMemoryLoadThresholdBytes: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      Index: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      MemoryLoadBytes: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      PauseDurations: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
      },
      PauseTimePercentage: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
      PinnedObjectsCount: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      PromotedBytes: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      TotalAvailableMemoryBytes: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      TotalCommittedBytes: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  GCNotificationStatus: {
    kind: "enum",
    members: {
      Succeeded: {
        kind: "field",
        type: () => {
          return System.GCNotificationStatus;
        },
      },
      Failed: {
        kind: "field",
        type: () => {
          return System.GCNotificationStatus;
        },
      },
      Canceled: {
        kind: "field",
        type: () => {
          return System.GCNotificationStatus;
        },
      },
      Timeout: {
        kind: "field",
        type: () => {
          return System.GCNotificationStatus;
        },
      },
      NotApplicable: {
        kind: "field",
        type: () => {
          return System.GCNotificationStatus;
        },
      },
    },
  },
  GenericUriParser: {
    kind: "class",
    members: {
      GenericUriParser: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  GenericUriParserOptions: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return System.GenericUriParserOptions;
        },
      },
      GenericAuthority: {
        kind: "field",
        type: () => {
          return System.GenericUriParserOptions;
        },
      },
      AllowEmptyAuthority: {
        kind: "field",
        type: () => {
          return System.GenericUriParserOptions;
        },
      },
      NoUserInfo: {
        kind: "field",
        type: () => {
          return System.GenericUriParserOptions;
        },
      },
      NoPort: {
        kind: "field",
        type: () => {
          return System.GenericUriParserOptions;
        },
      },
      NoQuery: {
        kind: "field",
        type: () => {
          return System.GenericUriParserOptions;
        },
      },
      NoFragment: {
        kind: "field",
        type: () => {
          return System.GenericUriParserOptions;
        },
      },
      DontConvertPathBackslashes: {
        kind: "field",
        type: () => {
          return System.GenericUriParserOptions;
        },
      },
      DontCompressPath: {
        kind: "field",
        type: () => {
          return System.GenericUriParserOptions;
        },
      },
      DontUnescapePathDotsAndSlashes: {
        kind: "field",
        type: () => {
          return System.GenericUriParserOptions;
        },
      },
      Idn: {
        kind: "field",
        type: () => {
          return System.GenericUriParserOptions;
        },
      },
      IriParsing: {
        kind: "field",
        type: () => {
          return System.GenericUriParserOptions;
        },
      },
    },
  },
  GopherStyleUriParser: {
    kind: "class",
    members: {
      GopherStyleUriParser: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Guid: {
    kind: "struct",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Guid: {
        kind: "method",
        methodKind: "constructor",
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateVersion7: {
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
      NewGuid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ParseExact: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToByteArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryParseExact: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      AllBitsSet: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
      },
      Variant: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Version: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  Half: {
    kind: "struct",
    members: {
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Acos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Acosh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AcosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Asin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Asinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AsinPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan2Pi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atanh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AtanPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitDecrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitIncrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cbrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ceiling: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cosh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DegreesToRadians: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      Exp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp10: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp10M1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp2M1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ExpM1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Floor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FusedMultiplyAdd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Hypot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ieee754Remainder: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ILogB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsFinite: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNaN: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegativeInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNormal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositiveInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsRealNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSubnormal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Lerp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log10: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log10P1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2P1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LogP1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitudeNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitudeNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MultiplyAddEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Pow: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RadiansToDegrees: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReciprocalEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReciprocalSqrtEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RootN: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ScaleB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinCos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinCosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sqrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Tan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Tanh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TanPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      E: {
        kind: "property",
        type: () => {
          return System.Half;
        },
        isStatic: true,
      },
      Epsilon: {
        kind: "property",
        type: () => {
          return System.Half;
        },
        isStatic: true,
      },
      MaxValue: {
        kind: "property",
        type: () => {
          return System.Half;
        },
        isStatic: true,
      },
      MinValue: {
        kind: "property",
        type: () => {
          return System.Half;
        },
        isStatic: true,
      },
      MultiplicativeIdentity: {
        kind: "property",
        type: () => {
          return System.Half;
        },
        isStatic: true,
      },
      NaN: {
        kind: "property",
        type: () => {
          return System.Half;
        },
        isStatic: true,
      },
      NegativeInfinity: {
        kind: "property",
        type: () => {
          return System.Half;
        },
        isStatic: true,
      },
      NegativeOne: {
        kind: "property",
        type: () => {
          return System.Half;
        },
        isStatic: true,
      },
      NegativeZero: {
        kind: "property",
        type: () => {
          return System.Half;
        },
        isStatic: true,
      },
      One: {
        kind: "property",
        type: () => {
          return System.Half;
        },
        isStatic: true,
      },
      Pi: {
        kind: "property",
        type: () => {
          return System.Half;
        },
        isStatic: true,
      },
      PositiveInfinity: {
        kind: "property",
        type: () => {
          return System.Half;
        },
        isStatic: true,
      },
      Tau: {
        kind: "property",
        type: () => {
          return System.Half;
        },
        isStatic: true,
      },
      Zero: {
        kind: "property",
        type: () => {
          return System.Half;
        },
        isStatic: true,
      },
    },
  },
  HashCode: {
    kind: "struct",
    members: {
      AddBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToHashCode: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  HttpStyleUriParser: {
    kind: "class",
    members: {
      HttpStyleUriParser: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  IAsyncDisposable: {
    kind: "interface",
    members: {
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IAsyncResult: {
    kind: "interface",
    members: {
      AsyncState: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      AsyncWaitHandle: {
        kind: "property",
        type: () => {
          return Threading.WaitHandle;
        },
      },
      CompletedSynchronously: {
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
    },
  },
  ICloneable: {
    kind: "interface",
    members: {
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IComparable: {
    kind: "interface",
    members: {
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IConvertible: {
    kind: "interface",
    members: {
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToChar: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToType: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ICustomFormatter: {
    kind: "interface",
    members: {
      Format: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IDisposable: {
    kind: "interface",
    members: {
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IEquatable: {
    kind: "interface",
    members: {
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IFormatProvider: {
    kind: "interface",
    members: {
      GetFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IFormattable: {
    kind: "interface",
    members: {
      ToString: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IObservable: {
    kind: "interface",
    members: {
      Subscribe: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IObserver: {
    kind: "interface",
    members: {
      OnCompleted: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnError: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnNext: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IParsable: {
    kind: "interface",
    members: {
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  IProgress: {
    kind: "interface",
    members: {
      Report: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISpanFormattable: {
    kind: "interface",
    members: {
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISpanParsable: {
    kind: "interface",
    members: {
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  IUtf8SpanFormattable: {
    kind: "interface",
    members: {
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IUtf8SpanParsable: {
    kind: "interface",
    members: {
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
        isAbstract: true,
      },
    },
  },
  Index: {
    kind: "struct",
    members: {
      Index: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromEnd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromStart: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetOffset: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      End: {
        kind: "property",
        type: () => {
          return System.Index;
        },
        isStatic: true,
      },
      IsFromEnd: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Start: {
        kind: "property",
        type: () => {
          return System.Index;
        },
        isStatic: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  IndexOutOfRangeException: {
    kind: "class",
    members: {
      IndexOutOfRangeException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  InsufficientExecutionStackException: {
    kind: "class",
    members: {
      InsufficientExecutionStackException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  InsufficientMemoryException: {
    kind: "class",
    members: {
      InsufficientMemoryException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  Int128: {
    kind: "struct",
    members: {
      Int128: {
        kind: "method",
        methodKind: "constructor",
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DivRem: {
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
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LeadingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateRight: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxValue: {
        kind: "property",
        type: () => {
          return System.Int128;
        },
        isStatic: true,
      },
      MinValue: {
        kind: "property",
        type: () => {
          return System.Int128;
        },
        isStatic: true,
      },
      NegativeOne: {
        kind: "property",
        type: () => {
          return System.Int128;
        },
        isStatic: true,
      },
      One: {
        kind: "property",
        type: () => {
          return System.Int128;
        },
        isStatic: true,
      },
      Zero: {
        kind: "property",
        type: () => {
          return System.Int128;
        },
        isStatic: true,
      },
    },
  },
  Int16: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return System.Int16;
        },
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.Int16;
        },
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DivRem: {
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
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LeadingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateRight: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  Int32: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BigMul: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DivRem: {
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
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LeadingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateRight: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  Int64: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BigMul: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DivRem: {
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
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LeadingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateRight: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  IntPtr: {
    kind: "struct",
    members: {
      Zero: {
        kind: "field",
        type: () => {
          return System.IntPtr;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IntPtr: {
        kind: "method",
        methodKind: "constructor",
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DivRem: {
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
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LeadingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateRight: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToPointer: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxValue: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
        isStatic: true,
      },
      MinValue: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
        isStatic: true,
      },
      Size: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
    },
  },
  InvalidCastException: {
    kind: "class",
    members: {
      InvalidCastException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  InvalidOperationException: {
    kind: "class",
    members: {
      InvalidOperationException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  InvalidProgramException: {
    kind: "class",
    members: {
      InvalidProgramException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  InvalidTimeZoneException: {
    kind: "class",
    members: {
      InvalidTimeZoneException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Lazy: {
    kind: "class",
    members: {
      Lazy: {
        kind: "method",
        methodKind: "constructor",
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
    },
  },
  LdapStyleUriParser: {
    kind: "class",
    members: {
      LdapStyleUriParser: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  LoaderOptimization: {
    kind: "enum",
    members: {
      NotSpecified: {
        kind: "field",
        type: () => {
          return System.LoaderOptimization;
        },
      },
      SingleDomain: {
        kind: "field",
        type: () => {
          return System.LoaderOptimization;
        },
      },
      MultiDomain: {
        kind: "field",
        type: () => {
          return System.LoaderOptimization;
        },
      },
      DomainMask: {
        kind: "field",
        type: () => {
          return System.LoaderOptimization;
        },
      },
      MultiDomainHost: {
        kind: "field",
        type: () => {
          return System.LoaderOptimization;
        },
      },
      DisallowBindings: {
        kind: "field",
        type: () => {
          return System.LoaderOptimization;
        },
      },
    },
  },
  LoaderOptimizationAttribute: {
    kind: "class",
    members: {
      LoaderOptimizationAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.LoaderOptimization;
        },
      },
    },
    isSealed: true,
  },
  MTAThreadAttribute: {
    kind: "class",
    members: {
      MTAThreadAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  MarshalByRefObject: {
    kind: "class",
    members: {
      MarshalByRefObject: {
        kind: "method",
        methodKind: "constructor",
      },
      GetLifetimeService: {
        kind: "method",
        methodKind: "ordinary",
      },
      InitializeLifetimeService: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MemberwiseClone: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isAbstract: true,
  },
  Math: {
    kind: "class",
    members: {
      E: {
        kind: "field",
        type: () => {
          return System.Double;
        },
      },
      PI: {
        kind: "field",
        type: () => {
          return System.Double;
        },
      },
      Tau: {
        kind: "field",
        type: () => {
          return System.Double;
        },
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Acos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Acosh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Asin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Asinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atanh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BigMul: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitDecrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitIncrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cbrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ceiling: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cosh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DivRem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Floor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FusedMultiplyAdd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IEEERemainder: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ILogB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log10: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Pow: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReciprocalEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReciprocalSqrtEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ScaleB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinCos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sqrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Tan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Tanh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  MathF: {
    kind: "class",
    members: {
      E: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      PI: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Tau: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Acos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Acosh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Asin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Asinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atanh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitDecrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitIncrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cbrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ceiling: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cosh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Floor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FusedMultiplyAdd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IEEERemainder: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ILogB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log10: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Pow: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReciprocalEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReciprocalSqrtEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ScaleB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinCos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sqrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Tan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Tanh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  MemberAccessException: {
    kind: "class",
    members: {
      MemberAccessException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Memory: {
    kind: "struct",
    members: {
      Memory: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      Pin: {
        kind: "method",
        methodKind: "ordinary",
      },
      Slice: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryCopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Empty: {
        kind: "property",
        type: () => {
          return System.Memory;
        },
        isStatic: true,
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Span: {
        kind: "property",
        type: () => {
          return System.Span;
        },
      },
    },
  },
  MethodAccessException: {
    kind: "class",
    members: {
      MethodAccessException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  MidpointRounding: {
    kind: "enum",
    members: {
      ToEven: {
        kind: "field",
        type: () => {
          return System.MidpointRounding;
        },
      },
      AwayFromZero: {
        kind: "field",
        type: () => {
          return System.MidpointRounding;
        },
      },
      ToZero: {
        kind: "field",
        type: () => {
          return System.MidpointRounding;
        },
      },
      ToNegativeInfinity: {
        kind: "field",
        type: () => {
          return System.MidpointRounding;
        },
      },
      ToPositiveInfinity: {
        kind: "field",
        type: () => {
          return System.MidpointRounding;
        },
      },
    },
  },
  MissingFieldException: {
    kind: "class",
    members: {
      MissingFieldException: {
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
    },
  },
  MissingMemberException: {
    kind: "class",
    members: {
      ClassName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      MemberName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Signature: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      MissingMemberException: {
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
    },
  },
  MissingMethodException: {
    kind: "class",
    members: {
      MissingMethodException: {
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
    },
  },
  ModuleHandle: {
    kind: "struct",
    members: {
      EmptyHandle: {
        kind: "field",
        type: () => {
          return System.ModuleHandle;
        },
        isStatic: true,
        isReadOnly: true,
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
      GetRuntimeFieldHandleFromMetadataToken: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetRuntimeMethodHandleFromMetadataToken: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetRuntimeTypeHandleFromMetadataToken: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResolveFieldHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResolveMethodHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResolveTypeHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      MDStreamVersion: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  MulticastDelegate: {
    kind: "class",
    members: {
      MulticastDelegate: {
        kind: "method",
        methodKind: "constructor",
      },
      CombineImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      GetInvocationList: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      GetMethodImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      RemoveImpl: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  MulticastNotSupportedException: {
    kind: "class",
    members: {
      MulticastNotSupportedException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  NetPipeStyleUriParser: {
    kind: "class",
    members: {
      NetPipeStyleUriParser: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  NetTcpStyleUriParser: {
    kind: "class",
    members: {
      NetTcpStyleUriParser: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  NewsStyleUriParser: {
    kind: "class",
    members: {
      NewsStyleUriParser: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  NotFiniteNumberException: {
    kind: "class",
    members: {
      NotFiniteNumberException: {
        kind: "method",
        methodKind: "constructor",
      },
      OffendingNumber: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
    },
  },
  NotImplementedException: {
    kind: "class",
    members: {
      NotImplementedException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  NotSupportedException: {
    kind: "class",
    members: {
      NotSupportedException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  NullReferenceException: {
    kind: "class",
    members: {
      NullReferenceException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Nullable: {
    kind: "struct",
    members: {
      Nullable: {
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
      GetValueOrDefault: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      HasValue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      Value: {
        kind: "property",
        type: undefined,
        isReadOnly: true,
      },
    },
  },
  Object: {
    kind: "class",
    members: {
      Object: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetType: {
        kind: "method",
        methodKind: "ordinary",
      },
      MemberwiseClone: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReferenceEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  ObjectDisposedException: {
    kind: "class",
    members: {
      ObjectDisposedException: {
        kind: "method",
        methodKind: "constructor",
      },
      ThrowIf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      ObjectName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  ObsoleteAttribute: {
    kind: "class",
    members: {
      ObsoleteAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      DiagnosticId: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      IsError: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      UrlFormat: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  OperatingSystem: {
    kind: "class",
    members: {
      OperatingSystem: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsAndroid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsAndroidVersionAtLeast: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsBrowser: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsFreeBSD: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsFreeBSDVersionAtLeast: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsIOS: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsIOSVersionAtLeast: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsLinux: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsMacCatalyst: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsMacCatalystVersionAtLeast: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsMacOS: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsMacOSVersionAtLeast: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOSPlatform: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOSPlatformVersionAtLeast: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsTvOS: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsTvOSVersionAtLeast: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsWasi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsWatchOS: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsWatchOSVersionAtLeast: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsWindows: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsWindowsVersionAtLeast: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Platform: {
        kind: "property",
        type: () => {
          return System.PlatformID;
        },
      },
      ServicePack: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Version: {
        kind: "property",
        type: () => {
          return System.Version;
        },
      },
      VersionString: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  OperationCanceledException: {
    kind: "class",
    members: {
      OperationCanceledException: {
        kind: "method",
        methodKind: "constructor",
      },
      CancellationToken: {
        kind: "property",
        type: () => {
          return Threading.CancellationToken;
        },
      },
    },
  },
  OutOfMemoryException: {
    kind: "class",
    members: {
      OutOfMemoryException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  OverflowException: {
    kind: "class",
    members: {
      OverflowException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  ParamArrayAttribute: {
    kind: "class",
    members: {
      ParamArrayAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  PlatformID: {
    kind: "enum",
    members: {
      Win32NT: {
        kind: "field",
        type: () => {
          return System.PlatformID;
        },
      },
      Unix: {
        kind: "field",
        type: () => {
          return System.PlatformID;
        },
      },
      Other: {
        kind: "field",
        type: () => {
          return System.PlatformID;
        },
      },
    },
  },
  PlatformNotSupportedException: {
    kind: "class",
    members: {
      PlatformNotSupportedException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Predicate: {
    kind: "generic",
    members: {
      Predicate: {
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
  Progress: {
    kind: "class",
    members: {
      Progress: {
        kind: "method",
        methodKind: "constructor",
      },
      OnReport: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  Random: {
    kind: "class",
    members: {
      Random: {
        kind: "method",
        methodKind: "constructor",
      },
      Next: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      NextBytes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      NextDouble: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      NextInt64: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      NextSingle: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Sample: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Shared: {
        kind: "property",
        type: () => {
          return System.Random;
        },
        isStatic: true,
      },
    },
  },
  Range: {
    kind: "struct",
    members: {
      Range: {
        kind: "method",
        methodKind: "constructor",
      },
      EndAt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      GetOffsetAndLength: {
        kind: "method",
        methodKind: "ordinary",
      },
      StartAt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      All: {
        kind: "property",
        type: () => {
          return System.Range;
        },
        isStatic: true,
      },
      End: {
        kind: "property",
        type: () => {
          return System.Index;
        },
      },
      Start: {
        kind: "property",
        type: () => {
          return System.Index;
        },
      },
    },
  },
  RankException: {
    kind: "class",
    members: {
      RankException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  ReadOnlyMemory: {
    kind: "struct",
    members: {
      ReadOnlyMemory: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      Pin: {
        kind: "method",
        methodKind: "ordinary",
      },
      Slice: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryCopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Empty: {
        kind: "property",
        type: () => {
          return System.ReadOnlyMemory;
        },
        isStatic: true,
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Span: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
      },
    },
  },
  ReadOnlySpan: {
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
  ResolveEventArgs: {
    kind: "class",
    members: {
      ResolveEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      RequestingAssembly: {
        kind: "property",
        type: () => {
          return Reflection.Assembly;
        },
        isNullable: true,
      },
    },
  },
  ResolveEventHandler: {
    kind: "generic",
    members: {
      ResolveEventHandler: {
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
  RuntimeArgumentHandle: {
    kind: "struct",
    members: {},
  },
  RuntimeFieldHandle: {
    kind: "struct",
    members: {
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FromIntPtr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToIntPtr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
    },
  },
  RuntimeMethodHandle: {
    kind: "struct",
    members: {
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FromIntPtr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFunctionPointer: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToIntPtr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
    },
  },
  RuntimeTypeHandle: {
    kind: "struct",
    members: {
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FromIntPtr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetModuleHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToIntPtr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
      },
    },
  },
  SByte: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return System.SByte;
        },
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.SByte;
        },
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DivRem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LeadingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateRight: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  STAThreadAttribute: {
    kind: "class",
    members: {
      STAThreadAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  Single: {
    kind: "struct",
    members: {
      E: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Epsilon: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      MaxValue: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      NaN: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      NegativeInfinity: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      NegativeZero: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Pi: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      PositiveInfinity: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Tau: {
        kind: "field",
        type: () => {
          return System.Single;
        },
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Acos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Acosh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AcosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Asin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Asinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AsinPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atan2Pi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Atanh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AtanPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitDecrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitIncrement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cbrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ceiling: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopySign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Cosh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DegreesToRadians: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Exp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp10: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp10M1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exp2M1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ExpM1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Floor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FusedMultiplyAdd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      Hypot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ieee754Remainder: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ILogB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsFinite: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNaN: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegative: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNegativeInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNormal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPositiveInfinity: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsRealNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSubnormal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Lerp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log10: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log10P1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2P1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LogP1: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxMagnitudeNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitude: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinMagnitudeNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MinNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MultiplyAddEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Pow: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RadiansToDegrees: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReciprocalEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReciprocalSqrtEstimate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RootN: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ScaleB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinCos: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinCosPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sinh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SinPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sqrt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Tan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Tanh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TanPi: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  Span: {
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
          },
        },
      },
    },
  },
  StackOverflowException: {
    kind: "class",
    members: {
      StackOverflowException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  String: {
    kind: "class",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      String: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      Compare: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareOrdinal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Concat: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EndsWith: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnumerateRunes: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Format: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOfAny: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      Intern: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsInterned: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNormalized: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsNullOrEmpty: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNullOrWhiteSpace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Join: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LastIndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      LastIndexOfAny: {
        kind: "method",
        methodKind: "ordinary",
      },
      Normalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      PadLeft: {
        kind: "method",
        methodKind: "ordinary",
      },
      PadRight: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      Replace: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReplaceLineEndings: {
        kind: "method",
        methodKind: "ordinary",
      },
      Split: {
        kind: "method",
        methodKind: "ordinary",
      },
      StartsWith: {
        kind: "method",
        methodKind: "ordinary",
      },
      Substring: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToCharArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToLower: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToLowerInvariant: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToUpper: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUpperInvariant: {
        kind: "method",
        methodKind: "ordinary",
      },
      Trim: {
        kind: "method",
        methodKind: "ordinary",
      },
      TrimEnd: {
        kind: "method",
        methodKind: "ordinary",
      },
      TrimStart: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryCopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Chars: {
        kind: "property",
        type: () => {
          return System.Char;
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
  StringComparer: {
    kind: "class",
    members: {
      StringComparer: {
        kind: "method",
        methodKind: "constructor",
      },
      Compare: {
        kind: "method",
        methodKind: "ordinary",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromComparison: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsWellKnownCultureAwareComparer: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsWellKnownOrdinalComparer: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CurrentCulture: {
        kind: "property",
        type: () => {
          return System.StringComparer;
        },
        isStatic: true,
      },
      CurrentCultureIgnoreCase: {
        kind: "property",
        type: () => {
          return System.StringComparer;
        },
        isStatic: true,
      },
      InvariantCulture: {
        kind: "property",
        type: () => {
          return System.StringComparer;
        },
        isStatic: true,
      },
      InvariantCultureIgnoreCase: {
        kind: "property",
        type: () => {
          return System.StringComparer;
        },
        isStatic: true,
      },
      Ordinal: {
        kind: "property",
        type: () => {
          return System.StringComparer;
        },
        isStatic: true,
      },
      OrdinalIgnoreCase: {
        kind: "property",
        type: () => {
          return System.StringComparer;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  StringComparison: {
    kind: "enum",
    members: {
      CurrentCulture: {
        kind: "field",
        type: () => {
          return System.StringComparison;
        },
      },
      CurrentCultureIgnoreCase: {
        kind: "field",
        type: () => {
          return System.StringComparison;
        },
      },
      InvariantCulture: {
        kind: "field",
        type: () => {
          return System.StringComparison;
        },
      },
      InvariantCultureIgnoreCase: {
        kind: "field",
        type: () => {
          return System.StringComparison;
        },
      },
      Ordinal: {
        kind: "field",
        type: () => {
          return System.StringComparison;
        },
      },
      OrdinalIgnoreCase: {
        kind: "field",
        type: () => {
          return System.StringComparison;
        },
      },
    },
  },
  StringNormalizationExtensions: {
    kind: "class",
    members: {
      IsNormalized: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Normalize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  StringSplitOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return System.StringSplitOptions;
        },
      },
      RemoveEmptyEntries: {
        kind: "field",
        type: () => {
          return System.StringSplitOptions;
        },
      },
      TrimEntries: {
        kind: "field",
        type: () => {
          return System.StringSplitOptions;
        },
      },
    },
  },
  SystemException: {
    kind: "class",
    members: {
      SystemException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  ThreadStaticAttribute: {
    kind: "class",
    members: {
      ThreadStaticAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  TimeOnly: {
    kind: "struct",
    members: {
      TimeOnly: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddHours: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMinutes: {
        kind: "method",
        methodKind: "ordinary",
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FromDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromTimeSpan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsBetween: {
        kind: "method",
        methodKind: "ordinary",
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ParseExact: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToLongTimeString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToShortTimeString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToTimeSpan: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryParseExact: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Hour: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxValue: {
        kind: "property",
        type: () => {
          return System.TimeOnly;
        },
        isStatic: true,
      },
      Microsecond: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Millisecond: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Minute: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MinValue: {
        kind: "property",
        type: () => {
          return System.TimeOnly;
        },
        isStatic: true,
      },
      Nanosecond: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Second: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Ticks: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  TimeProvider: {
    kind: "class",
    members: {
      TimeProvider: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateTimer: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetElapsedTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetLocalNow: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetTimestamp: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetUtcNow: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      LocalTimeZone: {
        kind: "property",
        type: () => {
          return System.TimeZoneInfo;
        },
        isVirtual: true,
      },
      System: {
        kind: "property",
        type: () => {
          return System.TimeProvider;
        },
        isStatic: true,
      },
      TimestampFrequency: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  TimeSpan: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return System.TimeSpan;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.TimeSpan;
        },
        isStatic: true,
        isReadOnly: true,
      },
      NanosecondsPerTick: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      TicksPerDay: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      TicksPerHour: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      TicksPerMicrosecond: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      TicksPerMillisecond: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      TicksPerMinute: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      TicksPerSecond: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      MicrosecondsPerMillisecond: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      MicrosecondsPerSecond: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      MicrosecondsPerMinute: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      MicrosecondsPerHour: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      MicrosecondsPerDay: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      MillisecondsPerSecond: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      MillisecondsPerMinute: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      MillisecondsPerHour: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      MillisecondsPerDay: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      SecondsPerMinute: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      SecondsPerHour: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      SecondsPerDay: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      MinutesPerHour: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      MinutesPerDay: {
        kind: "field",
        type: () => {
          return System.Int64;
        },
      },
      HoursPerDay: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      Zero: {
        kind: "field",
        type: () => {
          return System.TimeSpan;
        },
        isStatic: true,
        isReadOnly: true,
      },
      TimeSpan: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Compare: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
      },
      Duration: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FromDays: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromHours: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromMinutes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromSeconds: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromMilliseconds: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromMicroseconds: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromTicks: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
      },
      Negate: {
        kind: "method",
        methodKind: "ordinary",
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ParseExact: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryParseExact: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Days: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Hours: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Microseconds: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Milliseconds: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Minutes: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Nanoseconds: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Seconds: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Ticks: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      TotalDays: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
      TotalHours: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
      TotalMicroseconds: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
      TotalMilliseconds: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
      TotalMinutes: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
      TotalNanoseconds: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
      TotalSeconds: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
    },
  },
  TimeZone: {
    kind: "class",
    members: {
      TimeZone: {
        kind: "method",
        methodKind: "constructor",
      },
      GetDaylightChanges: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetUtcOffset: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IsDaylightSavingTime: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToLocalTime: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToUniversalTime: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CurrentTimeZone: {
        kind: "property",
        type: () => {
          return System.TimeZone;
        },
        isStatic: true,
      },
      DaylightName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      StandardName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  TimeZoneInfo: {
    kind: "class",
    members: {
      AdjustmentRule: {
        kind: "class",
        members: {
          CreateAdjustmentRule: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
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
          BaseUtcOffsetDelta: {
            kind: "property",
            type: () => {
              return System.TimeSpan;
            },
          },
          DateEnd: {
            kind: "property",
            type: () => {
              return System.DateTime;
            },
          },
          DateStart: {
            kind: "property",
            type: () => {
              return System.DateTime;
            },
          },
          DaylightDelta: {
            kind: "property",
            type: () => {
              return System.TimeSpan;
            },
          },
          DaylightTransitionEnd: {
            kind: "property",
            type: () => {
              return System.TimeZoneInfo.TransitionTime;
            },
          },
          DaylightTransitionStart: {
            kind: "property",
            type: () => {
              return System.TimeZoneInfo.TransitionTime;
            },
          },
        },
        isSealed: true,
      },
      TransitionTime: {
        kind: "struct",
        members: {
          CreateFixedDateRule: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
          },
          CreateFloatingDateRule: {
            kind: "method",
            methodKind: "ordinary",
            isStatic: true,
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
          Day: {
            kind: "property",
            type: () => {
              return System.Int32;
            },
          },
          DayOfWeek: {
            kind: "property",
            type: () => {
              return System.DayOfWeek;
            },
          },
          IsFixedDateRule: {
            kind: "property",
            type: () => {
              return System.Boolean;
            },
          },
          Month: {
            kind: "property",
            type: () => {
              return System.Int32;
            },
          },
          TimeOfDay: {
            kind: "property",
            type: () => {
              return System.DateTime;
            },
          },
          Week: {
            kind: "property",
            type: () => {
              return System.Int32;
            },
          },
        },
      },
    },
  },
  TimeZoneNotFoundException: {
    kind: "class",
    members: {
      TimeZoneNotFoundException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  TimeoutException: {
    kind: "class",
    members: {
      TimeoutException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Tuple: {
    kind: "class",
    members: {
      Tuple: {
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
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Item1: {
        kind: "property",
        type: undefined,
      },
    },
  },
  TupleExtensions: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  Type: {
    kind: "class",
    members: {
      Delimiter: {
        kind: "field",
        type: () => {
          return System.Char;
        },
        isStatic: true,
        isReadOnly: true,
      },
      EmptyTypes: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isStatic: true,
        isReadOnly: true,
      },
      FilterAttribute: {
        kind: "field",
        type: () => {
          return Reflection.MemberFilter;
        },
        isStatic: true,
        isReadOnly: true,
      },
      FilterName: {
        kind: "field",
        type: () => {
          return Reflection.MemberFilter;
        },
        isStatic: true,
        isReadOnly: true,
      },
      FilterNameIgnoreCase: {
        kind: "field",
        type: () => {
          return Reflection.MemberFilter;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Missing: {
        kind: "field",
        type: () => {
          return System.Object;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Type: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FindInterfaces: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      FindMembers: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetArrayRank: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetAttributeFlagsImpl: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetConstructor: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetConstructorImpl: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetConstructors: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDefaultMembers: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetElementType: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetEnumName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumNames: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumUnderlyingType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumValues: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumValuesAsUnderlyingType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEvent: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEvents: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetField: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetFields: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetFunctionPointerCallingConventions: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetFunctionPointerParameterTypes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetFunctionPointerReturnType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetGenericArguments: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetGenericParameterConstraints: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetGenericTypeDefinition: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetInterface: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInterfaceMap: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetInterfaces: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetMember: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMembers: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMemberWithSameMetadataDefinitionAs: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetMethod: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMethodImpl: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetMethods: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNestedType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNestedTypes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOptionalCustomModifiers: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPropertyImpl: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetRequiredCustomModifiers: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetTypeArray: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypeCodeImpl: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetTypeFromCLSID: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypeFromHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypeFromProgID: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypeHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HasElementTypeImpl: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      InvokeMember: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsArrayImpl: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IsAssignableFrom: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsAssignableTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsByRefImpl: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IsCOMObjectImpl: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IsContextfulImpl: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsEnumDefined: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsEquivalentTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsInstanceOfType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsMarshalByRefImpl: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsPointerImpl: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IsPrimitiveImpl: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IsSubclassOf: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsValueTypeImpl: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MakeArrayType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MakeByRefType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MakeGenericMethodParameter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MakeGenericSignatureType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MakeGenericType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      MakePointerType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReflectionOnlyGetType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Assembly: {
        kind: "property",
        type: () => {
          return Reflection.Assembly;
        },
        isAbstract: true,
      },
      AssemblyQualifiedName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isAbstract: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return Reflection.TypeAttributes;
        },
      },
      BaseType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isAbstract: true,
      },
      ContainsGenericParameters: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      DeclaringMethod: {
        kind: "property",
        type: () => {
          return Reflection.MethodBase;
        },
        isNullable: true,
        isVirtual: true,
      },
      DeclaringType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isOverride: true,
      },
      DefaultBinder: {
        kind: "property",
        type: () => {
          return Reflection.Binder;
        },
        isStatic: true,
      },
      FullName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isAbstract: true,
      },
      GenericParameterAttributes: {
        kind: "property",
        type: () => {
          return Reflection.GenericParameterAttributes;
        },
        isVirtual: true,
      },
      GenericParameterPosition: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      GenericTypeArguments: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
      GUID: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
        isAbstract: true,
      },
      HasElementType: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsAbstract: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsAnsiClass: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsArray: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsAutoClass: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsAutoLayout: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsByRef: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsByRefLike: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsClass: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsCOMObject: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsConstructedGenericType: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsContextful: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsEnum: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsExplicitLayout: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsFunctionPointer: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsGenericMethodParameter: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsGenericParameter: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsGenericType: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsGenericTypeDefinition: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsGenericTypeParameter: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsImport: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsInterface: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsLayoutSequential: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsMarshalByRef: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNested: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNestedAssembly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNestedFamANDAssem: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNestedFamily: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNestedFamORAssem: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNestedPrivate: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNestedPublic: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNotPublic: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsPointer: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsPrimitive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsPublic: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSealed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSecurityCritical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsSecuritySafeCritical: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsSecurityTransparent: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsSerializable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsSignatureType: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsSpecialName: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSZArray: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsTypeDefinition: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsUnicodeClass: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsUnmanagedFunctionPointer: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsValueType: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsVariableBoundArray: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsVisible: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MemberType: {
        kind: "property",
        type: () => {
          return Reflection.MemberTypes;
        },
        isOverride: true,
      },
      Module: {
        kind: "property",
        type: () => {
          return Reflection.Module;
        },
        isAbstract: true,
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isAbstract: true,
      },
      ReflectedType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isOverride: true,
      },
      StructLayoutAttribute: {
        kind: "property",
        type: () => {
          return InteropServices.StructLayoutAttribute;
        },
        isVirtual: true,
      },
      TypeHandle: {
        kind: "property",
        type: () => {
          return System.RuntimeTypeHandle;
        },
        isVirtual: true,
      },
      TypeInitializer: {
        kind: "property",
        type: () => {
          return Reflection.ConstructorInfo;
        },
        isNullable: true,
      },
      UnderlyingSystemType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  TypeAccessException: {
    kind: "class",
    members: {
      TypeAccessException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  TypeCode: {
    kind: "enum",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      Object: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      DBNull: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      Boolean: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      Char: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      SByte: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      Byte: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      Int16: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      UInt16: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      Int32: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      UInt32: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      Int64: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      UInt64: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      Single: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      Double: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      Decimal: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      DateTime: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return System.TypeCode;
        },
      },
    },
  },
  TypeInitializationException: {
    kind: "class",
    members: {
      TypeInitializationException: {
        kind: "method",
        methodKind: "constructor",
      },
      TypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  TypeLoadException: {
    kind: "class",
    members: {
      TypeLoadException: {
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
      TypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  TypeUnloadedException: {
    kind: "class",
    members: {
      TypeUnloadedException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  TypedReference: {
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
      GetTargetType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MakeTypedReference: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetTypedReference: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TargetTypeToken: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  UInt128: {
    kind: "struct",
    members: {
      UInt128: {
        kind: "method",
        methodKind: "constructor",
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      DivRem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LeadingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateRight: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxValue: {
        kind: "property",
        type: () => {
          return System.UInt128;
        },
        isStatic: true,
      },
      MinValue: {
        kind: "property",
        type: () => {
          return System.UInt128;
        },
        isStatic: true,
      },
      One: {
        kind: "property",
        type: () => {
          return System.UInt128;
        },
        isStatic: true,
      },
      Zero: {
        kind: "property",
        type: () => {
          return System.UInt128;
        },
        isStatic: true,
      },
    },
  },
  UInt16: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return System.UInt16;
        },
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.UInt16;
        },
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      DivRem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LeadingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateRight: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  UInt32: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return System.UInt32;
        },
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.UInt32;
        },
      },
      BigMul: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      DivRem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LeadingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateRight: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  UInt64: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return System.UInt64;
        },
      },
      MinValue: {
        kind: "field",
        type: () => {
          return System.UInt64;
        },
      },
      BigMul: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      DivRem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      GetTypeCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LeadingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateRight: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  UIntPtr: {
    kind: "struct",
    members: {
      Zero: {
        kind: "field",
        type: () => {
          return System.UIntPtr;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UIntPtr: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clamp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      DivRem: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      IsEvenInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsOddInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPow2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LeadingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Log2: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Max: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Min: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PopCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateLeft: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RotateRight: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToPointer: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToUInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      TrailingZeroCount: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MaxValue: {
        kind: "property",
        type: () => {
          return System.UIntPtr;
        },
        isStatic: true,
      },
      MinValue: {
        kind: "property",
        type: () => {
          return System.UIntPtr;
        },
        isStatic: true,
      },
      Size: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
    },
  },
  UnauthorizedAccessException: {
    kind: "class",
    members: {
      UnauthorizedAccessException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  UnhandledExceptionEventArgs: {
    kind: "class",
    members: {
      UnhandledExceptionEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      ExceptionObject: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      IsTerminating: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  UnhandledExceptionEventHandler: {
    kind: "generic",
    members: {
      UnhandledExceptionEventHandler: {
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
  Uri: {
    kind: "class",
    members: {
      SchemeDelimiter: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeFile: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeFtp: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeFtps: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeGopher: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeHttp: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeHttps: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeMailto: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeNetPipe: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeNetTcp: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeNews: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeNntp: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeSftp: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeSsh: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeTelnet: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeWs: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UriSchemeWss: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Uri: {
        kind: "method",
        methodKind: "constructor",
      },
      Canonicalize: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CheckHostName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CheckSchemeName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CheckSecurity: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Compare: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Escape: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EscapeDataString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryEscapeDataString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EscapeString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EscapeUriString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromHex: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetComponents: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLeftPart: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetObjectData: {
        kind: "method",
        methodKind: "ordinary",
      },
      HexEscape: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HexUnescape: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsBadFileSystemCharacter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsBaseOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsExcludedCharacter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsHexDigit: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsHexEncoding: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsReservedCharacter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsWellFormedOriginalString: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsWellFormedUriString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MakeRelative: {
        kind: "method",
        methodKind: "ordinary",
      },
      MakeRelativeUri: {
        kind: "method",
        methodKind: "ordinary",
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryCreate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      Unescape: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      UnescapeDataString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryUnescapeDataString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AbsolutePath: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      AbsoluteUri: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Authority: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DnsSafeHost: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Fragment: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Host: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      HostNameType: {
        kind: "property",
        type: () => {
          return System.UriHostNameType;
        },
      },
      IdnHost: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      IsAbsoluteUri: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsDefaultPort: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsFile: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsLoopback: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsUnc: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LocalPath: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      OriginalString: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      PathAndQuery: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Port: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Query: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Scheme: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Segments: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      UserEscaped: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      UserInfo: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  UriBuilder: {
    kind: "class",
    members: {
      UriBuilder: {
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
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Fragment: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Host: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Password: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Path: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Port: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Query: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Scheme: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Uri: {
        kind: "property",
        type: () => {
          return System.Uri;
        },
      },
      UserName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  UriComponents: {
    kind: "enum",
    members: {
      SerializationInfoString: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      Scheme: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      UserInfo: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      Host: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      Port: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      SchemeAndServer: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      Path: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      Query: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      PathAndQuery: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      HttpRequestUrl: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      Fragment: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      AbsoluteUri: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      StrongPort: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      HostAndPort: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      StrongAuthority: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      NormalizedHost: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
      KeepDelimiter: {
        kind: "field",
        type: () => {
          return System.UriComponents;
        },
      },
    },
  },
  UriCreationOptions: {
    kind: "struct",
    members: {
      DangerousDisablePathAndQueryCanonicalization: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
    },
  },
  UriFormat: {
    kind: "enum",
    members: {
      UriEscaped: {
        kind: "field",
        type: () => {
          return System.UriFormat;
        },
      },
      Unescaped: {
        kind: "field",
        type: () => {
          return System.UriFormat;
        },
      },
      SafeUnescaped: {
        kind: "field",
        type: () => {
          return System.UriFormat;
        },
      },
    },
  },
  UriFormatException: {
    kind: "class",
    members: {
      UriFormatException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  UriHostNameType: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return System.UriHostNameType;
        },
      },
      Basic: {
        kind: "field",
        type: () => {
          return System.UriHostNameType;
        },
      },
      Dns: {
        kind: "field",
        type: () => {
          return System.UriHostNameType;
        },
      },
      IPv4: {
        kind: "field",
        type: () => {
          return System.UriHostNameType;
        },
      },
      IPv6: {
        kind: "field",
        type: () => {
          return System.UriHostNameType;
        },
      },
    },
  },
  UriKind: {
    kind: "enum",
    members: {
      RelativeOrAbsolute: {
        kind: "field",
        type: () => {
          return System.UriKind;
        },
      },
      Absolute: {
        kind: "field",
        type: () => {
          return System.UriKind;
        },
      },
      Relative: {
        kind: "field",
        type: () => {
          return System.UriKind;
        },
      },
    },
  },
  UriParser: {
    kind: "class",
    members: {
      UriParser: {
        kind: "method",
        methodKind: "constructor",
      },
      GetComponents: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      InitializeAndValidate: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsBaseOf: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsKnownScheme: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsWellFormedOriginalString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnNewUri: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRegister: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Register: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Resolve: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  UriPartial: {
    kind: "enum",
    members: {
      Scheme: {
        kind: "field",
        type: () => {
          return System.UriPartial;
        },
      },
      Authority: {
        kind: "field",
        type: () => {
          return System.UriPartial;
        },
      },
      Path: {
        kind: "field",
        type: () => {
          return System.UriPartial;
        },
      },
      Query: {
        kind: "field",
        type: () => {
          return System.UriPartial;
        },
      },
    },
  },
  ValueTuple: {
    kind: "struct",
    members: {
      Item1: {
        kind: "field",
        type: undefined,
      },
      ValueTuple: {
        kind: "method",
        methodKind: "constructor",
      },
      CompareTo: {
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
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  ValueType: {
    kind: "class",
    members: {
      ValueType: {
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
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  Version: {
    kind: "class",
    members: {
      Version: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      CompareTo: {
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
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryParse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Build: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Major: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MajorRevision: {
        kind: "property",
        type: () => {
          return System.Int16;
        },
      },
      Minor: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MinorRevision: {
        kind: "property",
        type: () => {
          return System.Int16;
        },
      },
      Revision: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  Void: {
    kind: "struct",
    members: {},
  },
  WeakReference: {
    kind: "class",
    members: {
      WeakReference: {
        kind: "method",
        methodKind: "constructor",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetTarget: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetTarget: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
});
export default System
