import Generic from "../../Collections/Generic/index.js";
import ObjectModel from "../../Collections/ObjectModel/index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type TracingLibrary = LibrarySymbolReference & {
  DiagnosticCounter: LibrarySymbolReference & {
    AddMetadata: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisplayName: LibrarySymbolReference;
    DisplayUnits: LibrarySymbolReference;
    EventSource: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  EventActivityOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Disable: LibrarySymbolReference;
    Recursive: LibrarySymbolReference;
    Detachable: LibrarySymbolReference
  };
  EventAttribute: LibrarySymbolReference & {
    EventAttribute: LibrarySymbolReference;
    ActivityOptions: LibrarySymbolReference;
    Channel: LibrarySymbolReference;
    EventId: LibrarySymbolReference;
    Keywords: LibrarySymbolReference;
    Level: LibrarySymbolReference;
    Message: LibrarySymbolReference;
    Opcode: LibrarySymbolReference;
    Tags: LibrarySymbolReference;
    Task: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  EventChannel: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Admin: LibrarySymbolReference;
    Operational: LibrarySymbolReference;
    Analytic: LibrarySymbolReference;
    Debug: LibrarySymbolReference
  };
  EventCommand: LibrarySymbolReference & {
    Disable: LibrarySymbolReference;
    Enable: LibrarySymbolReference;
    SendManifest: LibrarySymbolReference;
    Update: LibrarySymbolReference
  };
  EventCommandEventArgs: LibrarySymbolReference & {
    DisableEvent: LibrarySymbolReference;
    EnableEvent: LibrarySymbolReference;
    Arguments: LibrarySymbolReference;
    Command: LibrarySymbolReference
  };
  EventCounter: LibrarySymbolReference & {
    EventCounter: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    WriteMetric: LibrarySymbolReference
  };
  EventDataAttribute: LibrarySymbolReference & {
    EventDataAttribute: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  EventFieldAttribute: LibrarySymbolReference & {
    EventFieldAttribute: LibrarySymbolReference;
    Format: LibrarySymbolReference;
    Tags: LibrarySymbolReference
  };
  EventFieldFormat: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    String: LibrarySymbolReference;
    Boolean: LibrarySymbolReference;
    Hexadecimal: LibrarySymbolReference;
    Xml: LibrarySymbolReference;
    Json: LibrarySymbolReference;
    HResult: LibrarySymbolReference
  };
  EventFieldTags: LibrarySymbolReference & {
    None: LibrarySymbolReference
  };
  EventIgnoreAttribute: LibrarySymbolReference & {
    EventIgnoreAttribute: LibrarySymbolReference
  };
  EventKeywords: LibrarySymbolReference & {
    All: LibrarySymbolReference;
    None: LibrarySymbolReference;
    MicrosoftTelemetry: LibrarySymbolReference;
    WdiContext: LibrarySymbolReference;
    WdiDiagnostic: LibrarySymbolReference;
    Sqm: LibrarySymbolReference;
    AuditFailure: LibrarySymbolReference;
    CorrelationHint: LibrarySymbolReference;
    AuditSuccess: LibrarySymbolReference;
    EventLogClassic: LibrarySymbolReference
  };
  EventLevel: LibrarySymbolReference & {
    LogAlways: LibrarySymbolReference;
    Critical: LibrarySymbolReference;
    Error: LibrarySymbolReference;
    Warning: LibrarySymbolReference;
    Informational: LibrarySymbolReference;
    Verbose: LibrarySymbolReference
  };
  EventListener: LibrarySymbolReference & {
    EventListener: LibrarySymbolReference;
    DisableEvents: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EnableEvents: LibrarySymbolReference;
    EventSourceIndex: LibrarySymbolReference;
    OnEventSourceCreated: LibrarySymbolReference;
    OnEventWritten: LibrarySymbolReference
  };
  EventManifestOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Strict: LibrarySymbolReference;
    AllCultures: LibrarySymbolReference;
    OnlyIfNeededForRegistration: LibrarySymbolReference;
    AllowEventSourceOverride: LibrarySymbolReference
  };
  EventOpcode: LibrarySymbolReference & {
    Info: LibrarySymbolReference;
    Start: LibrarySymbolReference;
    Stop: LibrarySymbolReference;
    DataCollectionStart: LibrarySymbolReference;
    DataCollectionStop: LibrarySymbolReference;
    Extension: LibrarySymbolReference;
    Reply: LibrarySymbolReference;
    Resume: LibrarySymbolReference;
    Suspend: LibrarySymbolReference;
    Send: LibrarySymbolReference;
    Receive: LibrarySymbolReference
  };
  EventSource: LibrarySymbolReference & {
    EventData: LibrarySymbolReference & {
      DataPointer: LibrarySymbolReference;
      Size: LibrarySymbolReference
    };
    EventSourcePrimitive: LibrarySymbolReference & {

    }
  };
  EventSourceAttribute: LibrarySymbolReference & {
    EventSourceAttribute: LibrarySymbolReference;
    Guid: LibrarySymbolReference;
    LocalizationResources: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  EventSourceCreatedEventArgs: LibrarySymbolReference & {
    EventSourceCreatedEventArgs: LibrarySymbolReference;
    EventSource: LibrarySymbolReference
  };
  EventSourceException: LibrarySymbolReference & {
    EventSourceException: LibrarySymbolReference
  };
  EventSourceOptions: LibrarySymbolReference & {
    ActivityOptions: LibrarySymbolReference;
    Keywords: LibrarySymbolReference;
    Level: LibrarySymbolReference;
    Opcode: LibrarySymbolReference;
    Tags: LibrarySymbolReference
  };
  EventSourceSettings: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    ThrowOnEventWriteErrors: LibrarySymbolReference;
    EtwManifestEventFormat: LibrarySymbolReference;
    EtwSelfDescribingEventFormat: LibrarySymbolReference
  };
  EventTags: LibrarySymbolReference & {
    None: LibrarySymbolReference
  };
  EventTask: LibrarySymbolReference & {
    None: LibrarySymbolReference
  };
  EventWrittenEventArgs: LibrarySymbolReference & {
    ActivityId: LibrarySymbolReference;
    Channel: LibrarySymbolReference;
    EventId: LibrarySymbolReference;
    EventName: LibrarySymbolReference;
    EventSource: LibrarySymbolReference;
    Keywords: LibrarySymbolReference;
    Level: LibrarySymbolReference;
    Message: LibrarySymbolReference;
    Opcode: LibrarySymbolReference;
    OSThreadId: LibrarySymbolReference;
    Payload: LibrarySymbolReference;
    PayloadNames: LibrarySymbolReference;
    RelatedActivityId: LibrarySymbolReference;
    Tags: LibrarySymbolReference;
    Task: LibrarySymbolReference;
    TimeStamp: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  IncrementingEventCounter: LibrarySymbolReference & {
    IncrementingEventCounter: LibrarySymbolReference;
    Increment: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    DisplayRateTimeScale: LibrarySymbolReference
  };
  IncrementingPollingCounter: LibrarySymbolReference & {
    IncrementingPollingCounter: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    DisplayRateTimeScale: LibrarySymbolReference
  };
  NonEventAttribute: LibrarySymbolReference & {
    NonEventAttribute: LibrarySymbolReference
  };
  PollingCounter: LibrarySymbolReference & {
    PollingCounter: LibrarySymbolReference;
    ToString: LibrarySymbolReference
  }
};
const Tracing: TracingLibrary = createLibrary("System.Diagnostics.Tracing", {
  DiagnosticCounter: {
    kind: "class",
    members: {
      AddMetadata: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisplayName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DisplayUnits: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      EventSource: {
        kind: "property",
        type: () => {
          return Tracing.EventSource;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isAbstract: true,
  },
  EventActivityOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Tracing.EventActivityOptions;
        },
      },
      Disable: {
        kind: "field",
        type: () => {
          return Tracing.EventActivityOptions;
        },
      },
      Recursive: {
        kind: "field",
        type: () => {
          return Tracing.EventActivityOptions;
        },
      },
      Detachable: {
        kind: "field",
        type: () => {
          return Tracing.EventActivityOptions;
        },
      },
    },
  },
  EventAttribute: {
    kind: "class",
    members: {
      EventAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ActivityOptions: {
        kind: "property",
        type: () => {
          return Tracing.EventActivityOptions;
        },
      },
      Channel: {
        kind: "property",
        type: () => {
          return Tracing.EventChannel;
        },
      },
      EventId: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Keywords: {
        kind: "property",
        type: () => {
          return Tracing.EventKeywords;
        },
      },
      Level: {
        kind: "property",
        type: () => {
          return Tracing.EventLevel;
        },
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Opcode: {
        kind: "property",
        type: () => {
          return Tracing.EventOpcode;
        },
      },
      Tags: {
        kind: "property",
        type: () => {
          return Tracing.EventTags;
        },
      },
      Task: {
        kind: "property",
        type: () => {
          return Tracing.EventTask;
        },
      },
      Version: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
    },
    isSealed: true,
  },
  EventChannel: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Tracing.EventChannel;
        },
      },
      Admin: {
        kind: "field",
        type: () => {
          return Tracing.EventChannel;
        },
      },
      Operational: {
        kind: "field",
        type: () => {
          return Tracing.EventChannel;
        },
      },
      Analytic: {
        kind: "field",
        type: () => {
          return Tracing.EventChannel;
        },
      },
      Debug: {
        kind: "field",
        type: () => {
          return Tracing.EventChannel;
        },
      },
    },
  },
  EventCommand: {
    kind: "enum",
    members: {
      Disable: {
        kind: "field",
        type: () => {
          return Tracing.EventCommand;
        },
      },
      Enable: {
        kind: "field",
        type: () => {
          return Tracing.EventCommand;
        },
      },
      SendManifest: {
        kind: "field",
        type: () => {
          return Tracing.EventCommand;
        },
      },
      Update: {
        kind: "field",
        type: () => {
          return Tracing.EventCommand;
        },
      },
    },
  },
  EventCommandEventArgs: {
    kind: "class",
    members: {
      DisableEvent: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnableEvent: {
        kind: "method",
        methodKind: "ordinary",
      },
      Arguments: {
        kind: "property",
        type: () => {
          return Generic.IDictionary;
        },
        isNullable: true,
      },
      Command: {
        kind: "property",
        type: () => {
          return Tracing.EventCommand;
        },
      },
    },
  },
  EventCounter: {
    kind: "class",
    members: {
      EventCounter: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteMetric: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  EventDataAttribute: {
    kind: "class",
    members: {
      EventDataAttribute: {
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
    },
  },
  EventFieldAttribute: {
    kind: "class",
    members: {
      EventFieldAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Format: {
        kind: "property",
        type: () => {
          return Tracing.EventFieldFormat;
        },
      },
      Tags: {
        kind: "property",
        type: () => {
          return Tracing.EventFieldTags;
        },
      },
    },
  },
  EventFieldFormat: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Tracing.EventFieldFormat;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return Tracing.EventFieldFormat;
        },
      },
      Boolean: {
        kind: "field",
        type: () => {
          return Tracing.EventFieldFormat;
        },
      },
      Hexadecimal: {
        kind: "field",
        type: () => {
          return Tracing.EventFieldFormat;
        },
      },
      Xml: {
        kind: "field",
        type: () => {
          return Tracing.EventFieldFormat;
        },
      },
      Json: {
        kind: "field",
        type: () => {
          return Tracing.EventFieldFormat;
        },
      },
      HResult: {
        kind: "field",
        type: () => {
          return Tracing.EventFieldFormat;
        },
      },
    },
  },
  EventFieldTags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Tracing.EventFieldTags;
        },
      },
    },
  },
  EventIgnoreAttribute: {
    kind: "class",
    members: {
      EventIgnoreAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  EventKeywords: {
    kind: "enum",
    members: {
      All: {
        kind: "field",
        type: () => {
          return Tracing.EventKeywords;
        },
      },
      None: {
        kind: "field",
        type: () => {
          return Tracing.EventKeywords;
        },
      },
      MicrosoftTelemetry: {
        kind: "field",
        type: () => {
          return Tracing.EventKeywords;
        },
      },
      WdiContext: {
        kind: "field",
        type: () => {
          return Tracing.EventKeywords;
        },
      },
      WdiDiagnostic: {
        kind: "field",
        type: () => {
          return Tracing.EventKeywords;
        },
      },
      Sqm: {
        kind: "field",
        type: () => {
          return Tracing.EventKeywords;
        },
      },
      AuditFailure: {
        kind: "field",
        type: () => {
          return Tracing.EventKeywords;
        },
      },
      CorrelationHint: {
        kind: "field",
        type: () => {
          return Tracing.EventKeywords;
        },
      },
      AuditSuccess: {
        kind: "field",
        type: () => {
          return Tracing.EventKeywords;
        },
      },
      EventLogClassic: {
        kind: "field",
        type: () => {
          return Tracing.EventKeywords;
        },
      },
    },
  },
  EventLevel: {
    kind: "enum",
    members: {
      LogAlways: {
        kind: "field",
        type: () => {
          return Tracing.EventLevel;
        },
      },
      Critical: {
        kind: "field",
        type: () => {
          return Tracing.EventLevel;
        },
      },
      Error: {
        kind: "field",
        type: () => {
          return Tracing.EventLevel;
        },
      },
      Warning: {
        kind: "field",
        type: () => {
          return Tracing.EventLevel;
        },
      },
      Informational: {
        kind: "field",
        type: () => {
          return Tracing.EventLevel;
        },
      },
      Verbose: {
        kind: "field",
        type: () => {
          return Tracing.EventLevel;
        },
      },
    },
  },
  EventListener: {
    kind: "class",
    members: {
      EventListener: {
        kind: "method",
        methodKind: "constructor",
      },
      DisableEvents: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EnableEvents: {
        kind: "method",
        methodKind: "ordinary",
      },
      EventSourceIndex: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OnEventSourceCreated: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnEventWritten: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  EventManifestOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Tracing.EventManifestOptions;
        },
      },
      Strict: {
        kind: "field",
        type: () => {
          return Tracing.EventManifestOptions;
        },
      },
      AllCultures: {
        kind: "field",
        type: () => {
          return Tracing.EventManifestOptions;
        },
      },
      OnlyIfNeededForRegistration: {
        kind: "field",
        type: () => {
          return Tracing.EventManifestOptions;
        },
      },
      AllowEventSourceOverride: {
        kind: "field",
        type: () => {
          return Tracing.EventManifestOptions;
        },
      },
    },
  },
  EventOpcode: {
    kind: "enum",
    members: {
      Info: {
        kind: "field",
        type: () => {
          return Tracing.EventOpcode;
        },
      },
      Start: {
        kind: "field",
        type: () => {
          return Tracing.EventOpcode;
        },
      },
      Stop: {
        kind: "field",
        type: () => {
          return Tracing.EventOpcode;
        },
      },
      DataCollectionStart: {
        kind: "field",
        type: () => {
          return Tracing.EventOpcode;
        },
      },
      DataCollectionStop: {
        kind: "field",
        type: () => {
          return Tracing.EventOpcode;
        },
      },
      Extension: {
        kind: "field",
        type: () => {
          return Tracing.EventOpcode;
        },
      },
      Reply: {
        kind: "field",
        type: () => {
          return Tracing.EventOpcode;
        },
      },
      Resume: {
        kind: "field",
        type: () => {
          return Tracing.EventOpcode;
        },
      },
      Suspend: {
        kind: "field",
        type: () => {
          return Tracing.EventOpcode;
        },
      },
      Send: {
        kind: "field",
        type: () => {
          return Tracing.EventOpcode;
        },
      },
      Receive: {
        kind: "field",
        type: () => {
          return Tracing.EventOpcode;
        },
      },
    },
  },
  EventSource: {
    kind: "class",
    members: {
      EventData: {
        kind: "struct",
        members: {
          DataPointer: {
            kind: "property",
            type: () => {
              return System.IntPtr;
            },
          },
          Size: {
            kind: "property",
            type: () => {
              return System.Int32;
            },
          },
        },
      },
      EventSourcePrimitive: {
        kind: "struct",
        members: {},
      },
    },
  },
  EventSourceAttribute: {
    kind: "class",
    members: {
      EventSourceAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Guid: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      LocalizationResources: {
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
        isNullable: true,
      },
    },
    isSealed: true,
  },
  EventSourceCreatedEventArgs: {
    kind: "class",
    members: {
      EventSourceCreatedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      EventSource: {
        kind: "property",
        type: () => {
          return Tracing.EventSource;
        },
      },
    },
  },
  EventSourceException: {
    kind: "class",
    members: {
      EventSourceException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  EventSourceOptions: {
    kind: "struct",
    members: {
      ActivityOptions: {
        kind: "property",
        type: () => {
          return Tracing.EventActivityOptions;
        },
      },
      Keywords: {
        kind: "property",
        type: () => {
          return Tracing.EventKeywords;
        },
      },
      Level: {
        kind: "property",
        type: () => {
          return Tracing.EventLevel;
        },
      },
      Opcode: {
        kind: "property",
        type: () => {
          return Tracing.EventOpcode;
        },
      },
      Tags: {
        kind: "property",
        type: () => {
          return Tracing.EventTags;
        },
      },
    },
  },
  EventSourceSettings: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Tracing.EventSourceSettings;
        },
      },
      ThrowOnEventWriteErrors: {
        kind: "field",
        type: () => {
          return Tracing.EventSourceSettings;
        },
      },
      EtwManifestEventFormat: {
        kind: "field",
        type: () => {
          return Tracing.EventSourceSettings;
        },
      },
      EtwSelfDescribingEventFormat: {
        kind: "field",
        type: () => {
          return Tracing.EventSourceSettings;
        },
      },
    },
  },
  EventTags: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Tracing.EventTags;
        },
      },
    },
  },
  EventTask: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Tracing.EventTask;
        },
      },
    },
  },
  EventWrittenEventArgs: {
    kind: "class",
    members: {
      ActivityId: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      Channel: {
        kind: "property",
        type: () => {
          return Tracing.EventChannel;
        },
      },
      EventId: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      EventName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      EventSource: {
        kind: "property",
        type: () => {
          return Tracing.EventSource;
        },
      },
      Keywords: {
        kind: "property",
        type: () => {
          return Tracing.EventKeywords;
        },
      },
      Level: {
        kind: "property",
        type: () => {
          return Tracing.EventLevel;
        },
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Opcode: {
        kind: "property",
        type: () => {
          return Tracing.EventOpcode;
        },
      },
      OSThreadId: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      Payload: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
        isNullable: true,
      },
      PayloadNames: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
        isNullable: true,
      },
      RelatedActivityId: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      Tags: {
        kind: "property",
        type: () => {
          return Tracing.EventTags;
        },
      },
      Task: {
        kind: "property",
        type: () => {
          return Tracing.EventTask;
        },
      },
      TimeStamp: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      Version: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
    },
  },
  IncrementingEventCounter: {
    kind: "class",
    members: {
      IncrementingEventCounter: {
        kind: "method",
        methodKind: "constructor",
      },
      Increment: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DisplayRateTimeScale: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
    },
  },
  IncrementingPollingCounter: {
    kind: "class",
    members: {
      IncrementingPollingCounter: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DisplayRateTimeScale: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
    },
  },
  NonEventAttribute: {
    kind: "class",
    members: {
      NonEventAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  PollingCounter: {
    kind: "class",
    members: {
      PollingCounter: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
});
export default Tracing
