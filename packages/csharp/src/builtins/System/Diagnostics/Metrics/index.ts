import Generic from "../../Collections/Generic/index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type MetricsLibrary = LibrarySymbolReference & {
  Counter: LibrarySymbolReference & {
    Add: LibrarySymbolReference
  };
  Gauge: LibrarySymbolReference & {
    Record: LibrarySymbolReference
  };
  Histogram: LibrarySymbolReference & {
    Record: LibrarySymbolReference
  };
  IMeterFactory: LibrarySymbolReference & {
    Create: LibrarySymbolReference
  };
  Instrument: LibrarySymbolReference & {
    Instrument: LibrarySymbolReference;
    RecordMeasurement: LibrarySymbolReference;
    Advice: LibrarySymbolReference
  };
  InstrumentAdvice: LibrarySymbolReference & {
    InstrumentAdvice: LibrarySymbolReference;
    HistogramBucketBoundaries: LibrarySymbolReference
  };
  Measurement: LibrarySymbolReference & {
    Measurement: LibrarySymbolReference;
    Tags: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  MeasurementCallback: LibrarySymbolReference & {
    MeasurementCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  Meter: LibrarySymbolReference & {
    Dispose: LibrarySymbolReference;
    Meter: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Version: LibrarySymbolReference;
    Tags: LibrarySymbolReference;
    Scope: LibrarySymbolReference
  };
  MeterFactoryExtensions: LibrarySymbolReference & {
    Create: LibrarySymbolReference
  };
  MeterListener: LibrarySymbolReference & {
    DisableMeasurementEvents: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EnableMeasurementEvents: LibrarySymbolReference;
    MeterListener: LibrarySymbolReference;
    RecordObservableInstruments: LibrarySymbolReference;
    Start: LibrarySymbolReference;
    InstrumentPublished: LibrarySymbolReference;
    MeasurementsCompleted: LibrarySymbolReference
  };
  MeterOptions: LibrarySymbolReference & {
    MeterOptions: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Version: LibrarySymbolReference;
    Tags: LibrarySymbolReference;
    Scope: LibrarySymbolReference
  };
  ObservableCounter: LibrarySymbolReference & {
    Observe: LibrarySymbolReference
  };
  ObservableGauge: LibrarySymbolReference & {
    Observe: LibrarySymbolReference
  };
  ObservableInstrument: LibrarySymbolReference & {
    ObservableInstrument: LibrarySymbolReference;
    Observe: LibrarySymbolReference;
    IsObservable: LibrarySymbolReference
  };
  ObservableUpDownCounter: LibrarySymbolReference & {
    Observe: LibrarySymbolReference
  };
  UpDownCounter: LibrarySymbolReference & {
    Add: LibrarySymbolReference
  }
};
const Metrics: MetricsLibrary = createLibrary("System.Diagnostics.Metrics", {
  Counter: {
    kind: "class",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  Gauge: {
    kind: "class",
    members: {
      Record: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  Histogram: {
    kind: "class",
    members: {
      Record: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  IMeterFactory: {
    kind: "interface",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  Instrument: {
    kind: "class",
    members: {
      Instrument: {
        kind: "method",
        methodKind: "constructor",
      },
      RecordMeasurement: {
        kind: "method",
        methodKind: "ordinary",
      },
      Advice: {
        kind: "property",
        type: () => {
          return Metrics.InstrumentAdvice;
        },
      },
    },
    isAbstract: true,
  },
  InstrumentAdvice: {
    kind: "class",
    members: {
      InstrumentAdvice: {
        kind: "method",
        methodKind: "constructor",
      },
      HistogramBucketBoundaries: {
        kind: "property",
        type: () => {
          return Generic.IReadOnlyList;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  Measurement: {
    kind: "struct",
    members: {
      Measurement: {
        kind: "method",
        methodKind: "constructor",
      },
      Tags: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
      },
      Value: {
        kind: "property",
        type: undefined,
      },
    },
  },
  MeasurementCallback: {
    kind: "generic",
    members: {
      MeasurementCallback: {
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
  Meter: {
    kind: "class",
    members: {
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Meter: {
        kind: "method",
        methodKind: "constructor",
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
      Scope: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  MeterFactoryExtensions: {
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
  MeterListener: {
    kind: "class",
    members: {
      DisableMeasurementEvents: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnableMeasurementEvents: {
        kind: "method",
        methodKind: "ordinary",
      },
      MeterListener: {
        kind: "method",
        methodKind: "constructor",
      },
      RecordObservableInstruments: {
        kind: "method",
        methodKind: "ordinary",
      },
      Start: {
        kind: "method",
        methodKind: "ordinary",
      },
      InstrumentPublished: {
        kind: "property",
        type: () => {
          return System.Action;
        },
        isNullable: true,
      },
      MeasurementsCompleted: {
        kind: "property",
        type: () => {
          return System.Action;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  MeterOptions: {
    kind: "class",
    members: {
      MeterOptions: {
        kind: "method",
        methodKind: "constructor",
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
      Scope: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  ObservableCounter: {
    kind: "class",
    members: {
      Observe: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  ObservableGauge: {
    kind: "class",
    members: {
      Observe: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  ObservableInstrument: {
    kind: "class",
    members: {
      ObservableInstrument: {
        kind: "method",
        methodKind: "constructor",
      },
      Observe: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IsObservable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  ObservableUpDownCounter: {
    kind: "class",
    members: {
      Observe: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  UpDownCounter: {
    kind: "class",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
});
export default Metrics
