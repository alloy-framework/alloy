import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ConstrainedExecutionLibrary = LibrarySymbolReference & {
  Cer: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    MayFail: LibrarySymbolReference;
    Success: LibrarySymbolReference
  };
  Consistency: LibrarySymbolReference & {
    MayCorruptProcess: LibrarySymbolReference;
    MayCorruptAppDomain: LibrarySymbolReference;
    MayCorruptInstance: LibrarySymbolReference;
    WillNotCorruptState: LibrarySymbolReference
  };
  CriticalFinalizerObject: LibrarySymbolReference & {
    CriticalFinalizerObject: LibrarySymbolReference;
    Finalize: LibrarySymbolReference
  };
  PrePrepareMethodAttribute: LibrarySymbolReference & {
    PrePrepareMethodAttribute: LibrarySymbolReference
  };
  ReliabilityContractAttribute: LibrarySymbolReference & {
    ReliabilityContractAttribute: LibrarySymbolReference;
    Cer: LibrarySymbolReference;
    ConsistencyGuarantee: LibrarySymbolReference
  }
};
const ConstrainedExecution: ConstrainedExecutionLibrary = createLibrary("System.Runtime.ConstrainedExecution", {
  Cer: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return ConstrainedExecution.Cer;
        },
      },
      MayFail: {
        kind: "field",
        type: () => {
          return ConstrainedExecution.Cer;
        },
      },
      Success: {
        kind: "field",
        type: () => {
          return ConstrainedExecution.Cer;
        },
      },
    },
  },
  Consistency: {
    kind: "enum",
    members: {
      MayCorruptProcess: {
        kind: "field",
        type: () => {
          return ConstrainedExecution.Consistency;
        },
      },
      MayCorruptAppDomain: {
        kind: "field",
        type: () => {
          return ConstrainedExecution.Consistency;
        },
      },
      MayCorruptInstance: {
        kind: "field",
        type: () => {
          return ConstrainedExecution.Consistency;
        },
      },
      WillNotCorruptState: {
        kind: "field",
        type: () => {
          return ConstrainedExecution.Consistency;
        },
      },
    },
  },
  CriticalFinalizerObject: {
    kind: "class",
    members: {
      CriticalFinalizerObject: {
        kind: "method",
        methodKind: "constructor",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isAbstract: true,
  },
  PrePrepareMethodAttribute: {
    kind: "class",
    members: {
      PrePrepareMethodAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ReliabilityContractAttribute: {
    kind: "class",
    members: {
      ReliabilityContractAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Cer: {
        kind: "property",
        type: () => {
          return ConstrainedExecution.Cer;
        },
      },
      ConsistencyGuarantee: {
        kind: "property",
        type: () => {
          return ConstrainedExecution.Consistency;
        },
      },
    },
    isSealed: true,
  },
});
export default ConstrainedExecution
