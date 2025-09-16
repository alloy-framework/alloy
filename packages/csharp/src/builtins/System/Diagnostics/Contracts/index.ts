import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ContractsLibrary = LibrarySymbolReference & {
  Contract: LibrarySymbolReference & {
    Assert: LibrarySymbolReference;
    Assume: LibrarySymbolReference;
    EndContractBlock: LibrarySymbolReference;
    Ensures: LibrarySymbolReference;
    Exists: LibrarySymbolReference;
    ForAll: LibrarySymbolReference;
    Invariant: LibrarySymbolReference;
    Requires: LibrarySymbolReference
  };
  ContractAbbreviatorAttribute: LibrarySymbolReference & {
    ContractAbbreviatorAttribute: LibrarySymbolReference
  };
  ContractArgumentValidatorAttribute: LibrarySymbolReference & {
    ContractArgumentValidatorAttribute: LibrarySymbolReference
  };
  ContractClassAttribute: LibrarySymbolReference & {
    ContractClassAttribute: LibrarySymbolReference;
    TypeContainingContracts: LibrarySymbolReference
  };
  ContractClassForAttribute: LibrarySymbolReference & {
    ContractClassForAttribute: LibrarySymbolReference;
    TypeContractsAreFor: LibrarySymbolReference
  };
  ContractFailedEventArgs: LibrarySymbolReference & {
    ContractFailedEventArgs: LibrarySymbolReference;
    SetHandled: LibrarySymbolReference;
    SetUnwind: LibrarySymbolReference;
    Condition: LibrarySymbolReference;
    FailureKind: LibrarySymbolReference;
    Handled: LibrarySymbolReference;
    Message: LibrarySymbolReference;
    OriginalException: LibrarySymbolReference;
    Unwind: LibrarySymbolReference
  };
  ContractFailureKind: LibrarySymbolReference & {
    Precondition: LibrarySymbolReference;
    Postcondition: LibrarySymbolReference;
    PostconditionOnException: LibrarySymbolReference;
    Invariant: LibrarySymbolReference;
    Assert: LibrarySymbolReference;
    Assume: LibrarySymbolReference
  };
  ContractInvariantMethodAttribute: LibrarySymbolReference & {
    ContractInvariantMethodAttribute: LibrarySymbolReference
  };
  ContractOptionAttribute: LibrarySymbolReference & {
    ContractOptionAttribute: LibrarySymbolReference;
    Category: LibrarySymbolReference;
    Enabled: LibrarySymbolReference;
    Setting: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  ContractPublicPropertyNameAttribute: LibrarySymbolReference & {
    ContractPublicPropertyNameAttribute: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  ContractReferenceAssemblyAttribute: LibrarySymbolReference & {
    ContractReferenceAssemblyAttribute: LibrarySymbolReference
  };
  ContractRuntimeIgnoredAttribute: LibrarySymbolReference & {
    ContractRuntimeIgnoredAttribute: LibrarySymbolReference
  };
  ContractVerificationAttribute: LibrarySymbolReference & {
    ContractVerificationAttribute: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  PureAttribute: LibrarySymbolReference & {
    PureAttribute: LibrarySymbolReference
  }
};
const Contracts: ContractsLibrary = createLibrary("System.Diagnostics.Contracts", {
  Contract: {
    kind: "class",
    members: {
      Assert: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Assume: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EndContractBlock: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ensures: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exists: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ForAll: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Invariant: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Requires: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  ContractAbbreviatorAttribute: {
    kind: "class",
    members: {
      ContractAbbreviatorAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ContractArgumentValidatorAttribute: {
    kind: "class",
    members: {
      ContractArgumentValidatorAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ContractClassAttribute: {
    kind: "class",
    members: {
      ContractClassAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      TypeContainingContracts: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  ContractClassForAttribute: {
    kind: "class",
    members: {
      ContractClassForAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      TypeContractsAreFor: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  ContractFailedEventArgs: {
    kind: "class",
    members: {
      ContractFailedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      SetHandled: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetUnwind: {
        kind: "method",
        methodKind: "ordinary",
      },
      Condition: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      FailureKind: {
        kind: "property",
        type: () => {
          return Contracts.ContractFailureKind;
        },
      },
      Handled: {
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
      OriginalException: {
        kind: "property",
        type: () => {
          return System.Exception;
        },
        isNullable: true,
      },
      Unwind: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  ContractFailureKind: {
    kind: "enum",
    members: {
      Precondition: {
        kind: "field",
        type: () => {
          return Contracts.ContractFailureKind;
        },
      },
      Postcondition: {
        kind: "field",
        type: () => {
          return Contracts.ContractFailureKind;
        },
      },
      PostconditionOnException: {
        kind: "field",
        type: () => {
          return Contracts.ContractFailureKind;
        },
      },
      Invariant: {
        kind: "field",
        type: () => {
          return Contracts.ContractFailureKind;
        },
      },
      Assert: {
        kind: "field",
        type: () => {
          return Contracts.ContractFailureKind;
        },
      },
      Assume: {
        kind: "field",
        type: () => {
          return Contracts.ContractFailureKind;
        },
      },
    },
  },
  ContractInvariantMethodAttribute: {
    kind: "class",
    members: {
      ContractInvariantMethodAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ContractOptionAttribute: {
    kind: "class",
    members: {
      ContractOptionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Category: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Enabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Setting: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  ContractPublicPropertyNameAttribute: {
    kind: "class",
    members: {
      ContractPublicPropertyNameAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  ContractReferenceAssemblyAttribute: {
    kind: "class",
    members: {
      ContractReferenceAssemblyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ContractRuntimeIgnoredAttribute: {
    kind: "class",
    members: {
      ContractRuntimeIgnoredAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ContractVerificationAttribute: {
    kind: "class",
    members: {
      ContractVerificationAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  PureAttribute: {
    kind: "class",
    members: {
      PureAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
});
export default Contracts
