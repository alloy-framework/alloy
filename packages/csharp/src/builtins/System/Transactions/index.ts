import System from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type TransactionsLibrary = LibrarySymbolReference & {
  CommittableTransaction: LibrarySymbolReference & {
    CommittableTransaction: LibrarySymbolReference;
    BeginCommit: LibrarySymbolReference;
    Commit: LibrarySymbolReference;
    EndCommit: LibrarySymbolReference
  };
  DependentCloneOption: LibrarySymbolReference & {
    BlockCommitUntilComplete: LibrarySymbolReference;
    RollbackIfNotComplete: LibrarySymbolReference
  };
  DependentTransaction: LibrarySymbolReference & {
    Complete: LibrarySymbolReference
  };
  Enlistment: LibrarySymbolReference & {
    Done: LibrarySymbolReference
  };
  EnlistmentOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    EnlistDuringPrepareRequired: LibrarySymbolReference
  };
  EnterpriseServicesInteropOption: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Automatic: LibrarySymbolReference;
    Full: LibrarySymbolReference
  };
  HostCurrentTransactionCallback: LibrarySymbolReference & {
    HostCurrentTransactionCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  IDtcTransaction: LibrarySymbolReference & {
    Abort: LibrarySymbolReference;
    Commit: LibrarySymbolReference;
    GetTransactionInfo: LibrarySymbolReference
  };
  IEnlistmentNotification: LibrarySymbolReference & {
    Commit: LibrarySymbolReference;
    InDoubt: LibrarySymbolReference;
    Prepare: LibrarySymbolReference;
    Rollback: LibrarySymbolReference
  };
  IPromotableSinglePhaseNotification: LibrarySymbolReference & {
    Initialize: LibrarySymbolReference;
    Rollback: LibrarySymbolReference;
    SinglePhaseCommit: LibrarySymbolReference
  };
  ISimpleTransactionSuperior: LibrarySymbolReference & {
    Rollback: LibrarySymbolReference
  };
  ISinglePhaseNotification: LibrarySymbolReference & {
    SinglePhaseCommit: LibrarySymbolReference
  };
  ITransactionPromoter: LibrarySymbolReference & {
    Promote: LibrarySymbolReference
  };
  IsolationLevel: LibrarySymbolReference & {
    Serializable: LibrarySymbolReference;
    RepeatableRead: LibrarySymbolReference;
    ReadCommitted: LibrarySymbolReference;
    ReadUncommitted: LibrarySymbolReference;
    Snapshot: LibrarySymbolReference;
    Chaos: LibrarySymbolReference;
    Unspecified: LibrarySymbolReference
  };
  PreparingEnlistment: LibrarySymbolReference & {
    ForceRollback: LibrarySymbolReference;
    Prepared: LibrarySymbolReference;
    RecoveryInformation: LibrarySymbolReference
  };
  SinglePhaseEnlistment: LibrarySymbolReference & {
    Aborted: LibrarySymbolReference;
    Committed: LibrarySymbolReference;
    InDoubt: LibrarySymbolReference
  };
  SubordinateTransaction: LibrarySymbolReference & {
    SubordinateTransaction: LibrarySymbolReference
  };
  Transaction: LibrarySymbolReference & {
    Clone: LibrarySymbolReference;
    DependentClone: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EnlistDurable: LibrarySymbolReference;
    EnlistPromotableSinglePhase: LibrarySymbolReference;
    EnlistVolatile: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetPromotedToken: LibrarySymbolReference;
    PromoteAndEnlistDurable: LibrarySymbolReference;
    Rollback: LibrarySymbolReference;
    SetDistributedTransactionIdentifier: LibrarySymbolReference;
    Current: LibrarySymbolReference;
    IsolationLevel: LibrarySymbolReference;
    PromoterType: LibrarySymbolReference;
    TransactionInformation: LibrarySymbolReference
  };
  TransactionAbortedException: LibrarySymbolReference & {
    TransactionAbortedException: LibrarySymbolReference
  };
  TransactionCompletedEventHandler: LibrarySymbolReference & {
    TransactionCompletedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  TransactionEventArgs: LibrarySymbolReference & {
    TransactionEventArgs: LibrarySymbolReference;
    Transaction: LibrarySymbolReference
  };
  TransactionException: LibrarySymbolReference & {
    TransactionException: LibrarySymbolReference
  };
  TransactionInDoubtException: LibrarySymbolReference & {
    TransactionInDoubtException: LibrarySymbolReference
  };
  TransactionInformation: LibrarySymbolReference & {
    CreationTime: LibrarySymbolReference;
    DistributedIdentifier: LibrarySymbolReference;
    LocalIdentifier: LibrarySymbolReference;
    Status: LibrarySymbolReference
  };
  TransactionInterop: LibrarySymbolReference & {
    PromoterTypeDtc: LibrarySymbolReference;
    GetDtcTransaction: LibrarySymbolReference;
    GetExportCookie: LibrarySymbolReference;
    GetTransactionFromDtcTransaction: LibrarySymbolReference;
    GetTransactionFromExportCookie: LibrarySymbolReference;
    GetTransactionFromTransmitterPropagationToken: LibrarySymbolReference;
    GetTransmitterPropagationToken: LibrarySymbolReference;
    GetWhereabouts: LibrarySymbolReference
  };
  TransactionManager: LibrarySymbolReference & {
    RecoveryComplete: LibrarySymbolReference;
    Reenlist: LibrarySymbolReference;
    DefaultTimeout: LibrarySymbolReference;
    HostCurrentCallback: LibrarySymbolReference;
    MaximumTimeout: LibrarySymbolReference;
    ImplicitDistributedTransactions: LibrarySymbolReference
  };
  TransactionManagerCommunicationException: LibrarySymbolReference & {
    TransactionManagerCommunicationException: LibrarySymbolReference
  };
  TransactionOptions: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsolationLevel: LibrarySymbolReference;
    Timeout: LibrarySymbolReference
  };
  TransactionPromotionException: LibrarySymbolReference & {
    TransactionPromotionException: LibrarySymbolReference
  };
  TransactionScope: LibrarySymbolReference & {
    TransactionScope: LibrarySymbolReference;
    Complete: LibrarySymbolReference;
    Dispose: LibrarySymbolReference
  };
  TransactionScopeAsyncFlowOption: LibrarySymbolReference & {
    Suppress: LibrarySymbolReference;
    Enabled: LibrarySymbolReference
  };
  TransactionScopeOption: LibrarySymbolReference & {
    Required: LibrarySymbolReference;
    RequiresNew: LibrarySymbolReference;
    Suppress: LibrarySymbolReference
  };
  TransactionStartedEventHandler: LibrarySymbolReference & {
    TransactionStartedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  TransactionStatus: LibrarySymbolReference & {
    Active: LibrarySymbolReference;
    Committed: LibrarySymbolReference;
    Aborted: LibrarySymbolReference;
    InDoubt: LibrarySymbolReference
  }
};
const Transactions: TransactionsLibrary = createLibrary("System.Transactions", {
  CommittableTransaction: {
    kind: "class",
    members: {
      CommittableTransaction: {
        kind: "method",
        methodKind: "constructor",
      },
      BeginCommit: {
        kind: "method",
        methodKind: "ordinary",
      },
      Commit: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndCommit: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  DependentCloneOption: {
    kind: "enum",
    members: {
      BlockCommitUntilComplete: {
        kind: "field",
        type: () => {
          return Transactions.DependentCloneOption;
        },
      },
      RollbackIfNotComplete: {
        kind: "field",
        type: () => {
          return Transactions.DependentCloneOption;
        },
      },
    },
  },
  DependentTransaction: {
    kind: "class",
    members: {
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  Enlistment: {
    kind: "class",
    members: {
      Done: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  EnlistmentOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Transactions.EnlistmentOptions;
        },
      },
      EnlistDuringPrepareRequired: {
        kind: "field",
        type: () => {
          return Transactions.EnlistmentOptions;
        },
      },
    },
  },
  EnterpriseServicesInteropOption: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Transactions.EnterpriseServicesInteropOption;
        },
      },
      Automatic: {
        kind: "field",
        type: () => {
          return Transactions.EnterpriseServicesInteropOption;
        },
      },
      Full: {
        kind: "field",
        type: () => {
          return Transactions.EnterpriseServicesInteropOption;
        },
      },
    },
  },
  HostCurrentTransactionCallback: {
    kind: "generic",
    members: {
      HostCurrentTransactionCallback: {
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
  IDtcTransaction: {
    kind: "interface",
    members: {
      Abort: {
        kind: "method",
        methodKind: "ordinary",
      },
      Commit: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetTransactionInfo: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IEnlistmentNotification: {
    kind: "interface",
    members: {
      Commit: {
        kind: "method",
        methodKind: "ordinary",
      },
      InDoubt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Prepare: {
        kind: "method",
        methodKind: "ordinary",
      },
      Rollback: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IPromotableSinglePhaseNotification: {
    kind: "interface",
    members: {
      Initialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      Rollback: {
        kind: "method",
        methodKind: "ordinary",
      },
      SinglePhaseCommit: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISimpleTransactionSuperior: {
    kind: "interface",
    members: {
      Rollback: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISinglePhaseNotification: {
    kind: "interface",
    members: {
      SinglePhaseCommit: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ITransactionPromoter: {
    kind: "interface",
    members: {
      Promote: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IsolationLevel: {
    kind: "enum",
    members: {
      Serializable: {
        kind: "field",
        type: () => {
          return Transactions.IsolationLevel;
        },
      },
      RepeatableRead: {
        kind: "field",
        type: () => {
          return Transactions.IsolationLevel;
        },
      },
      ReadCommitted: {
        kind: "field",
        type: () => {
          return Transactions.IsolationLevel;
        },
      },
      ReadUncommitted: {
        kind: "field",
        type: () => {
          return Transactions.IsolationLevel;
        },
      },
      Snapshot: {
        kind: "field",
        type: () => {
          return Transactions.IsolationLevel;
        },
      },
      Chaos: {
        kind: "field",
        type: () => {
          return Transactions.IsolationLevel;
        },
      },
      Unspecified: {
        kind: "field",
        type: () => {
          return Transactions.IsolationLevel;
        },
      },
    },
  },
  PreparingEnlistment: {
    kind: "class",
    members: {
      ForceRollback: {
        kind: "method",
        methodKind: "ordinary",
      },
      Prepared: {
        kind: "method",
        methodKind: "ordinary",
      },
      RecoveryInformation: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  SinglePhaseEnlistment: {
    kind: "class",
    members: {
      Aborted: {
        kind: "method",
        methodKind: "ordinary",
      },
      Committed: {
        kind: "method",
        methodKind: "ordinary",
      },
      InDoubt: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  SubordinateTransaction: {
    kind: "class",
    members: {
      SubordinateTransaction: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  Transaction: {
    kind: "class",
    members: {
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      DependentClone: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnlistDurable: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnlistPromotableSinglePhase: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnlistVolatile: {
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
      GetPromotedToken: {
        kind: "method",
        methodKind: "ordinary",
      },
      PromoteAndEnlistDurable: {
        kind: "method",
        methodKind: "ordinary",
      },
      Rollback: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetDistributedTransactionIdentifier: {
        kind: "method",
        methodKind: "ordinary",
      },
      Current: {
        kind: "property",
        type: () => {
          return Transactions.Transaction;
        },
        isNullable: true,
        isStatic: true,
      },
      IsolationLevel: {
        kind: "property",
        type: () => {
          return Transactions.IsolationLevel;
        },
      },
      PromoterType: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      TransactionInformation: {
        kind: "property",
        type: () => {
          return Transactions.TransactionInformation;
        },
      },
    },
  },
  TransactionAbortedException: {
    kind: "class",
    members: {
      TransactionAbortedException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  TransactionCompletedEventHandler: {
    kind: "generic",
    members: {
      TransactionCompletedEventHandler: {
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
  TransactionEventArgs: {
    kind: "class",
    members: {
      TransactionEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Transaction: {
        kind: "property",
        type: () => {
          return Transactions.Transaction;
        },
      },
    },
  },
  TransactionException: {
    kind: "class",
    members: {
      TransactionException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  TransactionInDoubtException: {
    kind: "class",
    members: {
      TransactionInDoubtException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  TransactionInformation: {
    kind: "class",
    members: {
      CreationTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      DistributedIdentifier: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      LocalIdentifier: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Status: {
        kind: "property",
        type: () => {
          return Transactions.TransactionStatus;
        },
      },
    },
  },
  TransactionInterop: {
    kind: "class",
    members: {
      PromoterTypeDtc: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      GetDtcTransaction: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetExportCookie: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTransactionFromDtcTransaction: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTransactionFromExportCookie: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTransactionFromTransmitterPropagationToken: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTransmitterPropagationToken: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetWhereabouts: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  TransactionManager: {
    kind: "class",
    members: {
      RecoveryComplete: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Reenlist: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DefaultTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
        isStatic: true,
      },
      HostCurrentCallback: {
        kind: "property",
        type: () => {
          return Transactions.HostCurrentTransactionCallback;
        },
        isNullable: true,
        isStatic: true,
      },
      MaximumTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
        isStatic: true,
      },
      ImplicitDistributedTransactions: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  TransactionManagerCommunicationException: {
    kind: "class",
    members: {
      TransactionManagerCommunicationException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  TransactionOptions: {
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
      IsolationLevel: {
        kind: "property",
        type: () => {
          return Transactions.IsolationLevel;
        },
      },
      Timeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
    },
  },
  TransactionPromotionException: {
    kind: "class",
    members: {
      TransactionPromotionException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  TransactionScope: {
    kind: "class",
    members: {
      TransactionScope: {
        kind: "method",
        methodKind: "constructor",
      },
      Complete: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  TransactionScopeAsyncFlowOption: {
    kind: "enum",
    members: {
      Suppress: {
        kind: "field",
        type: () => {
          return Transactions.TransactionScopeAsyncFlowOption;
        },
      },
      Enabled: {
        kind: "field",
        type: () => {
          return Transactions.TransactionScopeAsyncFlowOption;
        },
      },
    },
  },
  TransactionScopeOption: {
    kind: "enum",
    members: {
      Required: {
        kind: "field",
        type: () => {
          return Transactions.TransactionScopeOption;
        },
      },
      RequiresNew: {
        kind: "field",
        type: () => {
          return Transactions.TransactionScopeOption;
        },
      },
      Suppress: {
        kind: "field",
        type: () => {
          return Transactions.TransactionScopeOption;
        },
      },
    },
  },
  TransactionStartedEventHandler: {
    kind: "generic",
    members: {
      TransactionStartedEventHandler: {
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
  TransactionStatus: {
    kind: "enum",
    members: {
      Active: {
        kind: "field",
        type: () => {
          return Transactions.TransactionStatus;
        },
      },
      Committed: {
        kind: "field",
        type: () => {
          return Transactions.TransactionStatus;
        },
      },
      Aborted: {
        kind: "field",
        type: () => {
          return Transactions.TransactionStatus;
        },
      },
      InDoubt: {
        kind: "field",
        type: () => {
          return Transactions.TransactionStatus;
        },
      },
    },
  },
});
export default Transactions
