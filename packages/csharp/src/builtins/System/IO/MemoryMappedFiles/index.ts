import SafeHandles from "../../../Microsoft/Win32/SafeHandles/index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type MemoryMappedFilesLibrary = LibrarySymbolReference & {
  MemoryMappedFile: LibrarySymbolReference & {
    CreateFromFile: LibrarySymbolReference;
    CreateNew: LibrarySymbolReference;
    CreateOrOpen: LibrarySymbolReference;
    CreateViewAccessor: LibrarySymbolReference;
    CreateViewStream: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    OpenExisting: LibrarySymbolReference;
    SafeMemoryMappedFileHandle: LibrarySymbolReference
  };
  MemoryMappedFileAccess: LibrarySymbolReference & {
    ReadWrite: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    CopyOnWrite: LibrarySymbolReference;
    ReadExecute: LibrarySymbolReference;
    ReadWriteExecute: LibrarySymbolReference
  };
  MemoryMappedFileOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    DelayAllocatePages: LibrarySymbolReference
  };
  MemoryMappedFileRights: LibrarySymbolReference & {
    CopyOnWrite: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadWrite: LibrarySymbolReference;
    Execute: LibrarySymbolReference;
    ReadExecute: LibrarySymbolReference;
    ReadWriteExecute: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    ReadPermissions: LibrarySymbolReference;
    ChangePermissions: LibrarySymbolReference;
    TakeOwnership: LibrarySymbolReference;
    FullControl: LibrarySymbolReference;
    AccessSystemSecurity: LibrarySymbolReference
  };
  MemoryMappedViewAccessor: LibrarySymbolReference & {
    Dispose: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    PointerOffset: LibrarySymbolReference;
    SafeMemoryMappedViewHandle: LibrarySymbolReference
  };
  MemoryMappedViewStream: LibrarySymbolReference & {
    Dispose: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    PointerOffset: LibrarySymbolReference;
    SafeMemoryMappedViewHandle: LibrarySymbolReference
  }
};
const MemoryMappedFiles: MemoryMappedFilesLibrary = createLibrary("System.IO.MemoryMappedFiles", {
  MemoryMappedFile: {
    kind: "class",
    members: {
      CreateFromFile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateNew: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateOrOpen: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateViewAccessor: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateViewStream: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenExisting: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SafeMemoryMappedFileHandle: {
        kind: "property",
        type: () => {
          return SafeHandles.SafeMemoryMappedFileHandle;
        },
      },
    },
  },
  MemoryMappedFileAccess: {
    kind: "enum",
    members: {
      ReadWrite: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileAccess;
        },
      },
      Read: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileAccess;
        },
      },
      Write: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileAccess;
        },
      },
      CopyOnWrite: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileAccess;
        },
      },
      ReadExecute: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileAccess;
        },
      },
      ReadWriteExecute: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileAccess;
        },
      },
    },
  },
  MemoryMappedFileOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileOptions;
        },
      },
      DelayAllocatePages: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileOptions;
        },
      },
    },
  },
  MemoryMappedFileRights: {
    kind: "enum",
    members: {
      CopyOnWrite: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileRights;
        },
      },
      Write: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileRights;
        },
      },
      Read: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileRights;
        },
      },
      ReadWrite: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileRights;
        },
      },
      Execute: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileRights;
        },
      },
      ReadExecute: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileRights;
        },
      },
      ReadWriteExecute: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileRights;
        },
      },
      Delete: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileRights;
        },
      },
      ReadPermissions: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileRights;
        },
      },
      ChangePermissions: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileRights;
        },
      },
      TakeOwnership: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileRights;
        },
      },
      FullControl: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileRights;
        },
      },
      AccessSystemSecurity: {
        kind: "field",
        type: () => {
          return MemoryMappedFiles.MemoryMappedFileRights;
        },
      },
    },
  },
  MemoryMappedViewAccessor: {
    kind: "class",
    members: {
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
      },
      PointerOffset: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      SafeMemoryMappedViewHandle: {
        kind: "property",
        type: () => {
          return SafeHandles.SafeMemoryMappedViewHandle;
        },
      },
    },
    isSealed: true,
  },
  MemoryMappedViewStream: {
    kind: "class",
    members: {
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetLength: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      PointerOffset: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      SafeMemoryMappedViewHandle: {
        kind: "property",
        type: () => {
          return SafeHandles.SafeMemoryMappedViewHandle;
        },
      },
    },
    isSealed: true,
  },
});
export default MemoryMappedFiles
