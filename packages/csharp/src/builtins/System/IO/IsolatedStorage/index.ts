import SafeHandles from "../../../Microsoft/Win32/SafeHandles/index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type IsolatedStorageLibrary = LibrarySymbolReference & {
  INormalizeForIsolatedStorage: LibrarySymbolReference & {
    Normalize: LibrarySymbolReference
  };
  IsolatedStorage: LibrarySymbolReference & {
    IsolatedStorage: LibrarySymbolReference;
    IncreaseQuotaTo: LibrarySymbolReference;
    InitStore: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    ApplicationIdentity: LibrarySymbolReference;
    AssemblyIdentity: LibrarySymbolReference;
    AvailableFreeSpace: LibrarySymbolReference;
    CurrentSize: LibrarySymbolReference;
    DomainIdentity: LibrarySymbolReference;
    MaximumSize: LibrarySymbolReference;
    Quota: LibrarySymbolReference;
    Scope: LibrarySymbolReference;
    SeparatorExternal: LibrarySymbolReference;
    SeparatorInternal: LibrarySymbolReference;
    UsedSize: LibrarySymbolReference
  };
  IsolatedStorageException: LibrarySymbolReference & {
    IsolatedStorageException: LibrarySymbolReference
  };
  IsolatedStorageFile: LibrarySymbolReference & {
    Close: LibrarySymbolReference;
    CopyFile: LibrarySymbolReference;
    CreateDirectory: LibrarySymbolReference;
    CreateFile: LibrarySymbolReference;
    DeleteDirectory: LibrarySymbolReference;
    DeleteFile: LibrarySymbolReference;
    DirectoryExists: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    FileExists: LibrarySymbolReference;
    GetCreationTime: LibrarySymbolReference;
    GetDirectoryNames: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetFileNames: LibrarySymbolReference;
    GetLastAccessTime: LibrarySymbolReference;
    GetLastWriteTime: LibrarySymbolReference;
    GetMachineStoreForApplication: LibrarySymbolReference;
    GetMachineStoreForAssembly: LibrarySymbolReference;
    GetMachineStoreForDomain: LibrarySymbolReference;
    GetStore: LibrarySymbolReference;
    GetUserStoreForApplication: LibrarySymbolReference;
    GetUserStoreForAssembly: LibrarySymbolReference;
    GetUserStoreForDomain: LibrarySymbolReference;
    GetUserStoreForSite: LibrarySymbolReference;
    IncreaseQuotaTo: LibrarySymbolReference;
    MoveDirectory: LibrarySymbolReference;
    MoveFile: LibrarySymbolReference;
    OpenFile: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    AvailableFreeSpace: LibrarySymbolReference;
    CurrentSize: LibrarySymbolReference;
    IsEnabled: LibrarySymbolReference;
    MaximumSize: LibrarySymbolReference;
    Quota: LibrarySymbolReference;
    UsedSize: LibrarySymbolReference
  };
  IsolatedStorageFileStream: LibrarySymbolReference & {
    IsolatedStorageFileStream: LibrarySymbolReference;
    BeginRead: LibrarySymbolReference;
    BeginWrite: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    EndRead: LibrarySymbolReference;
    EndWrite: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    Lock: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    Unlock: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteByte: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanSeek: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    Handle: LibrarySymbolReference;
    IsAsync: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Position: LibrarySymbolReference;
    SafeFileHandle: LibrarySymbolReference
  };
  IsolatedStorageScope: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    User: LibrarySymbolReference;
    Domain: LibrarySymbolReference;
    Assembly: LibrarySymbolReference;
    Roaming: LibrarySymbolReference;
    Machine: LibrarySymbolReference;
    Application: LibrarySymbolReference
  }
};
const IsolatedStorage: IsolatedStorageLibrary = createLibrary("System.IO.IsolatedStorage", {
  INormalizeForIsolatedStorage: {
    kind: "interface",
    members: {
      Normalize: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IsolatedStorage: {
    kind: "class",
    members: {
      IsolatedStorage: {
        kind: "method",
        methodKind: "constructor",
      },
      IncreaseQuotaTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      InitStore: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ApplicationIdentity: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      AssemblyIdentity: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      AvailableFreeSpace: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isVirtual: true,
      },
      CurrentSize: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
        isVirtual: true,
      },
      DomainIdentity: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      MaximumSize: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
        isVirtual: true,
      },
      Quota: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isVirtual: true,
      },
      Scope: {
        kind: "property",
        type: () => {
          return IsolatedStorage.IsolatedStorageScope;
        },
      },
      SeparatorExternal: {
        kind: "property",
        type: () => {
          return System.Char;
        },
        isVirtual: true,
      },
      SeparatorInternal: {
        kind: "property",
        type: () => {
          return System.Char;
        },
        isVirtual: true,
      },
      UsedSize: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  IsolatedStorageException: {
    kind: "class",
    members: {
      IsolatedStorageException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  IsolatedStorageFile: {
    kind: "class",
    members: {
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyFile: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateDirectory: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateFile: {
        kind: "method",
        methodKind: "ordinary",
      },
      DeleteDirectory: {
        kind: "method",
        methodKind: "ordinary",
      },
      DeleteFile: {
        kind: "method",
        methodKind: "ordinary",
      },
      DirectoryExists: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      FileExists: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCreationTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDirectoryNames: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFileNames: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetLastAccessTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetLastWriteTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMachineStoreForApplication: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetMachineStoreForAssembly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetMachineStoreForDomain: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetStore: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetUserStoreForApplication: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetUserStoreForAssembly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetUserStoreForDomain: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetUserStoreForSite: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IncreaseQuotaTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MoveDirectory: {
        kind: "method",
        methodKind: "ordinary",
      },
      MoveFile: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenFile: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AvailableFreeSpace: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      CurrentSize: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
        isOverride: true,
      },
      IsEnabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
      MaximumSize: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
        isOverride: true,
      },
      Quota: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      UsedSize: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  IsolatedStorageFileStream: {
    kind: "class",
    members: {
      IsolatedStorageFileStream: {
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
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DisposeAsync: {
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
      Lock: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
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
      Unlock: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
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
      Handle: {
        kind: "property",
        type: () => {
          return System.IntPtr;
        },
        isOverride: true,
      },
      IsAsync: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      Position: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      SafeFileHandle: {
        kind: "property",
        type: () => {
          return SafeHandles.SafeFileHandle;
        },
        isOverride: true,
      },
    },
  },
  IsolatedStorageScope: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return IsolatedStorage.IsolatedStorageScope;
        },
      },
      User: {
        kind: "field",
        type: () => {
          return IsolatedStorage.IsolatedStorageScope;
        },
      },
      Domain: {
        kind: "field",
        type: () => {
          return IsolatedStorage.IsolatedStorageScope;
        },
      },
      Assembly: {
        kind: "field",
        type: () => {
          return IsolatedStorage.IsolatedStorageScope;
        },
      },
      Roaming: {
        kind: "field",
        type: () => {
          return IsolatedStorage.IsolatedStorageScope;
        },
      },
      Machine: {
        kind: "field",
        type: () => {
          return IsolatedStorage.IsolatedStorageScope;
        },
      },
      Application: {
        kind: "field",
        type: () => {
          return IsolatedStorage.IsolatedStorageScope;
        },
      },
    },
  },
});
export default IsolatedStorage
