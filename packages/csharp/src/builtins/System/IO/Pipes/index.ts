import SafeHandles from "../../../Microsoft/Win32/SafeHandles/index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type PipesLibrary = LibrarySymbolReference & {
  AnonymousPipeClientStream: LibrarySymbolReference & {
    AnonymousPipeClientStream: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    ReadMode: LibrarySymbolReference;
    TransmissionMode: LibrarySymbolReference
  };
  AnonymousPipeServerStream: LibrarySymbolReference & {
    AnonymousPipeServerStream: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeLocalCopyOfClientHandle: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    GetClientHandleAsString: LibrarySymbolReference;
    ClientSafePipeHandle: LibrarySymbolReference;
    ReadMode: LibrarySymbolReference;
    TransmissionMode: LibrarySymbolReference
  };
  AnonymousPipeServerStreamAcl: LibrarySymbolReference & {
    Create: LibrarySymbolReference
  };
  NamedPipeClientStream: LibrarySymbolReference & {
    NamedPipeClientStream: LibrarySymbolReference;
    CheckPipePropertyOperations: LibrarySymbolReference;
    Connect: LibrarySymbolReference;
    ConnectAsync: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    NumberOfServerInstances: LibrarySymbolReference
  };
  NamedPipeServerStream: LibrarySymbolReference & {
    MaxAllowedServerInstances: LibrarySymbolReference;
    NamedPipeServerStream: LibrarySymbolReference;
    BeginWaitForConnection: LibrarySymbolReference;
    Disconnect: LibrarySymbolReference;
    EndWaitForConnection: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    GetImpersonationUserName: LibrarySymbolReference;
    RunAsClient: LibrarySymbolReference;
    WaitForConnection: LibrarySymbolReference;
    WaitForConnectionAsync: LibrarySymbolReference
  };
  NamedPipeServerStreamAcl: LibrarySymbolReference & {
    Create: LibrarySymbolReference
  };
  PipeAccessRights: LibrarySymbolReference & {
    ReadData: LibrarySymbolReference;
    WriteData: LibrarySymbolReference;
    CreateNewInstance: LibrarySymbolReference;
    ReadExtendedAttributes: LibrarySymbolReference;
    WriteExtendedAttributes: LibrarySymbolReference;
    ReadAttributes: LibrarySymbolReference;
    WriteAttributes: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    ReadPermissions: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadWrite: LibrarySymbolReference;
    ChangePermissions: LibrarySymbolReference;
    TakeOwnership: LibrarySymbolReference;
    Synchronize: LibrarySymbolReference;
    FullControl: LibrarySymbolReference;
    AccessSystemSecurity: LibrarySymbolReference
  };
  PipeAccessRule: LibrarySymbolReference & {
    PipeAccessRule: LibrarySymbolReference;
    PipeAccessRights: LibrarySymbolReference
  };
  PipeAuditRule: LibrarySymbolReference & {
    PipeAuditRule: LibrarySymbolReference;
    PipeAccessRights: LibrarySymbolReference
  };
  PipeDirection: LibrarySymbolReference & {
    In: LibrarySymbolReference;
    Out: LibrarySymbolReference;
    InOut: LibrarySymbolReference
  };
  PipeOptions: LibrarySymbolReference & {
    WriteThrough: LibrarySymbolReference;
    None: LibrarySymbolReference;
    CurrentUserOnly: LibrarySymbolReference;
    Asynchronous: LibrarySymbolReference;
    FirstPipeInstance: LibrarySymbolReference
  };
  PipeSecurity: LibrarySymbolReference & {
    PipeSecurity: LibrarySymbolReference;
    AccessRuleFactory: LibrarySymbolReference;
    AddAccessRule: LibrarySymbolReference;
    AddAuditRule: LibrarySymbolReference;
    AuditRuleFactory: LibrarySymbolReference;
    Persist: LibrarySymbolReference;
    RemoveAccessRule: LibrarySymbolReference;
    RemoveAccessRuleSpecific: LibrarySymbolReference;
    RemoveAuditRule: LibrarySymbolReference;
    RemoveAuditRuleAll: LibrarySymbolReference;
    RemoveAuditRuleSpecific: LibrarySymbolReference;
    ResetAccessRule: LibrarySymbolReference;
    SetAccessRule: LibrarySymbolReference;
    SetAuditRule: LibrarySymbolReference;
    AccessRightType: LibrarySymbolReference;
    AccessRuleType: LibrarySymbolReference;
    AuditRuleType: LibrarySymbolReference
  };
  PipeStream: LibrarySymbolReference & {
    PipeStream: LibrarySymbolReference;
    BeginRead: LibrarySymbolReference;
    BeginWrite: LibrarySymbolReference;
    CheckPipePropertyOperations: LibrarySymbolReference;
    CheckReadOperations: LibrarySymbolReference;
    CheckWriteOperations: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EndRead: LibrarySymbolReference;
    EndWrite: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    InitializeHandle: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    WaitForPipeDrain: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteByte: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanSeek: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    InBufferSize: LibrarySymbolReference;
    IsAsync: LibrarySymbolReference;
    IsConnected: LibrarySymbolReference;
    IsHandleExposed: LibrarySymbolReference;
    IsMessageComplete: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    OutBufferSize: LibrarySymbolReference;
    Position: LibrarySymbolReference;
    ReadMode: LibrarySymbolReference;
    SafePipeHandle: LibrarySymbolReference;
    TransmissionMode: LibrarySymbolReference
  };
  PipeStreamImpersonationWorker: LibrarySymbolReference & {
    PipeStreamImpersonationWorker: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  PipeTransmissionMode: LibrarySymbolReference & {
    Byte: LibrarySymbolReference;
    Message: LibrarySymbolReference
  };
  PipesAclExtensions: LibrarySymbolReference & {
    GetAccessControl: LibrarySymbolReference;
    SetAccessControl: LibrarySymbolReference
  }
};
const Pipes: PipesLibrary = createLibrary("System.IO.Pipes", {
  AnonymousPipeClientStream: {
    kind: "class",
    members: {
      AnonymousPipeClientStream: {
        kind: "method",
        methodKind: "constructor",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadMode: {
        kind: "property",
        type: () => {
          return Pipes.PipeTransmissionMode;
        },
        isOverride: true,
      },
      TransmissionMode: {
        kind: "property",
        type: () => {
          return Pipes.PipeTransmissionMode;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  AnonymousPipeServerStream: {
    kind: "class",
    members: {
      AnonymousPipeServerStream: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DisposeLocalCopyOfClientHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetClientHandleAsString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ClientSafePipeHandle: {
        kind: "property",
        type: () => {
          return SafeHandles.SafePipeHandle;
        },
      },
      ReadMode: {
        kind: "property",
        type: () => {
          return Pipes.PipeTransmissionMode;
        },
        isOverride: true,
      },
      TransmissionMode: {
        kind: "property",
        type: () => {
          return Pipes.PipeTransmissionMode;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  AnonymousPipeServerStreamAcl: {
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
  NamedPipeClientStream: {
    kind: "class",
    members: {
      NamedPipeClientStream: {
        kind: "method",
        methodKind: "constructor",
      },
      CheckPipePropertyOperations: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Connect: {
        kind: "method",
        methodKind: "ordinary",
      },
      ConnectAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      NumberOfServerInstances: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  NamedPipeServerStream: {
    kind: "class",
    members: {
      MaxAllowedServerInstances: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      NamedPipeServerStream: {
        kind: "method",
        methodKind: "constructor",
      },
      BeginWaitForConnection: {
        kind: "method",
        methodKind: "ordinary",
      },
      Disconnect: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndWaitForConnection: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetImpersonationUserName: {
        kind: "method",
        methodKind: "ordinary",
      },
      RunAsClient: {
        kind: "method",
        methodKind: "ordinary",
      },
      WaitForConnection: {
        kind: "method",
        methodKind: "ordinary",
      },
      WaitForConnectionAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  NamedPipeServerStreamAcl: {
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
  PipeAccessRights: {
    kind: "enum",
    members: {
      ReadData: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      WriteData: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      CreateNewInstance: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      ReadExtendedAttributes: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      WriteExtendedAttributes: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      ReadAttributes: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      WriteAttributes: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      Write: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      Delete: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      ReadPermissions: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      Read: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      ReadWrite: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      ChangePermissions: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      TakeOwnership: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      Synchronize: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      FullControl: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
      AccessSystemSecurity: {
        kind: "field",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
    },
  },
  PipeAccessRule: {
    kind: "class",
    members: {
      PipeAccessRule: {
        kind: "method",
        methodKind: "constructor",
      },
      PipeAccessRights: {
        kind: "property",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
    },
    isSealed: true,
  },
  PipeAuditRule: {
    kind: "class",
    members: {
      PipeAuditRule: {
        kind: "method",
        methodKind: "constructor",
      },
      PipeAccessRights: {
        kind: "property",
        type: () => {
          return Pipes.PipeAccessRights;
        },
      },
    },
    isSealed: true,
  },
  PipeDirection: {
    kind: "enum",
    members: {
      In: {
        kind: "field",
        type: () => {
          return Pipes.PipeDirection;
        },
      },
      Out: {
        kind: "field",
        type: () => {
          return Pipes.PipeDirection;
        },
      },
      InOut: {
        kind: "field",
        type: () => {
          return Pipes.PipeDirection;
        },
      },
    },
  },
  PipeOptions: {
    kind: "enum",
    members: {
      WriteThrough: {
        kind: "field",
        type: () => {
          return Pipes.PipeOptions;
        },
      },
      None: {
        kind: "field",
        type: () => {
          return Pipes.PipeOptions;
        },
      },
      CurrentUserOnly: {
        kind: "field",
        type: () => {
          return Pipes.PipeOptions;
        },
      },
      Asynchronous: {
        kind: "field",
        type: () => {
          return Pipes.PipeOptions;
        },
      },
      FirstPipeInstance: {
        kind: "field",
        type: () => {
          return Pipes.PipeOptions;
        },
      },
    },
  },
  PipeSecurity: {
    kind: "class",
    members: {
      PipeSecurity: {
        kind: "method",
        methodKind: "constructor",
      },
      AccessRuleFactory: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      AuditRuleFactory: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      Persist: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAccessRuleSpecific: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRuleAll: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAuditRuleSpecific: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResetAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAccessRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAuditRule: {
        kind: "method",
        methodKind: "ordinary",
      },
      AccessRightType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
      AccessRuleType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
      AuditRuleType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
    },
  },
  PipeStream: {
    kind: "class",
    members: {
      PipeStream: {
        kind: "method",
        methodKind: "constructor",
      },
      BeginRead: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BeginWrite: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CheckPipePropertyOperations: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CheckReadOperations: {
        kind: "method",
        methodKind: "ordinary",
      },
      CheckWriteOperations: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EndRead: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EndWrite: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FlushAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InitializeHandle: {
        kind: "method",
        methodKind: "ordinary",
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadByte: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Seek: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetLength: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WaitForPipeDrain: {
        kind: "method",
        methodKind: "ordinary",
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteByte: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanRead: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      CanSeek: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      CanWrite: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      InBufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsAsync: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsConnected: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsHandleExposed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsMessageComplete: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      OutBufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      Position: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      ReadMode: {
        kind: "property",
        type: () => {
          return Pipes.PipeTransmissionMode;
        },
        isVirtual: true,
      },
      SafePipeHandle: {
        kind: "property",
        type: () => {
          return SafeHandles.SafePipeHandle;
        },
      },
      TransmissionMode: {
        kind: "property",
        type: () => {
          return Pipes.PipeTransmissionMode;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  PipeStreamImpersonationWorker: {
    kind: "generic",
    members: {
      PipeStreamImpersonationWorker: {
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
  PipeTransmissionMode: {
    kind: "enum",
    members: {
      Byte: {
        kind: "field",
        type: () => {
          return Pipes.PipeTransmissionMode;
        },
      },
      Message: {
        kind: "field",
        type: () => {
          return Pipes.PipeTransmissionMode;
        },
      },
    },
  },
  PipesAclExtensions: {
    kind: "class",
    members: {
      GetAccessControl: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetAccessControl: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Pipes
