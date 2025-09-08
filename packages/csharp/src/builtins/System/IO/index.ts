import SafeHandles from "../../Microsoft/Win32/SafeHandles/index.js";
import System from "../index.js";
import Text from "../Text/index.js";

import { createLibrary } from "#createLibrary";
export { default as Enumeration } from "./Enumeration/index.js";

const IO = createLibrary("System.IO", {
  BinaryReader: {
    kind: "class",
    members: {
      BinaryReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      FillBuffer: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      PeekChar: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Read7BitEncodedInt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Read7BitEncodedInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadBoolean: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadByte: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadBytes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadChar: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadChars: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadDecimal: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadDouble: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadHalf: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadInt16: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadInt32: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadInt64: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadSByte: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadSingle: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadUInt16: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadUInt32: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadUInt64: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BaseStream: {
        kind: "property",
        type: () => {
          return IO.Stream;
        },
        isVirtual: true,
      },
    },
  },
  BinaryWriter: {
    kind: "class",
    members: {
      Null: {
        kind: "field",
        type: () => {
          return IO.BinaryWriter;
        },
        isStatic: true,
        isReadOnly: true,
      },
      OutStream: {
        kind: "field",
        type: () => {
          return IO.Stream;
        },
      },
      BinaryWriter: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Seek: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Write7BitEncodedInt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Write7BitEncodedInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      BaseStream: {
        kind: "property",
        type: () => {
          return IO.Stream;
        },
        isVirtual: true,
      },
    },
  },
  BufferedStream: {
    kind: "class",
    members: {
      BufferedStream: {
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
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CopyToAsync: {
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
      BufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
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
      UnderlyingStream: {
        kind: "property",
        type: () => {
          return IO.Stream;
        },
      },
    },
    isSealed: true,
  },
  Directory: {
    kind: "class",
    members: {
      CreateDirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateSymbolicLink: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateTempSubdirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Delete: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EnumerateDirectories: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EnumerateFiles: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EnumerateFileSystemEntries: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exists: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCreationTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCreationTimeUtc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCurrentDirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDirectories: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDirectoryRoot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFiles: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFileSystemEntries: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLastAccessTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLastAccessTimeUtc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLastWriteTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLastWriteTimeUtc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLogicalDrives: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetParent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Move: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ResolveLinkTarget: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetCreationTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetCreationTimeUtc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetCurrentDirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetLastAccessTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetLastAccessTimeUtc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetLastWriteTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetLastWriteTimeUtc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  DirectoryInfo: {
    kind: "class",
    members: {
      DirectoryInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateSubdirectory: {
        kind: "method",
        methodKind: "ordinary",
      },
      Delete: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EnumerateDirectories: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnumerateFiles: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnumerateFileSystemInfos: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDirectories: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetFiles: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetFileSystemInfos: {
        kind: "method",
        methodKind: "ordinary",
      },
      MoveTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Exists: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
      Parent: {
        kind: "property",
        type: () => {
          return IO.DirectoryInfo;
        },
        isNullable: true,
      },
      Root: {
        kind: "property",
        type: () => {
          return IO.DirectoryInfo;
        },
      },
    },
    isSealed: true,
  },
  DirectoryNotFoundException: {
    kind: "class",
    members: {
      DirectoryNotFoundException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  EndOfStreamException: {
    kind: "class",
    members: {
      EndOfStreamException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  EnumerationOptions: {
    kind: "class",
    members: {
      EnumerationOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      AttributesToSkip: {
        kind: "property",
        type: () => {
          return IO.FileAttributes;
        },
      },
      BufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IgnoreInaccessible: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MatchCasing: {
        kind: "property",
        type: () => {
          return IO.MatchCasing;
        },
      },
      MatchType: {
        kind: "property",
        type: () => {
          return IO.MatchType;
        },
      },
      MaxRecursionDepth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      RecurseSubdirectories: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ReturnSpecialDirectories: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  File: {
    kind: "class",
    members: {
      AppendAllBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AppendAllBytesAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AppendAllLines: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AppendAllLinesAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AppendAllText: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AppendAllTextAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AppendText: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Copy: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateSymbolicLink: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateText: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Decrypt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Delete: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Encrypt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exists: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCreationTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCreationTimeUtc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLastAccessTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLastAccessTimeUtc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLastWriteTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLastWriteTimeUtc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetUnixFileMode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Move: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Open: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OpenHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OpenRead: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OpenText: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OpenWrite: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadAllBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadAllBytesAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadAllLines: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadAllLinesAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadAllText: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadAllTextAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadLines: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadLinesAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Replace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ResolveLinkTarget: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetCreationTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetCreationTimeUtc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetLastAccessTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetLastAccessTimeUtc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetLastWriteTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetLastWriteTimeUtc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetUnixFileMode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteAllBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteAllBytesAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteAllLines: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteAllLinesAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteAllText: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteAllTextAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  FileAccess: {
    kind: "enum",
    members: {
      Read: {
        kind: "field",
        type: () => {
          return IO.FileAccess;
        },
      },
      Write: {
        kind: "field",
        type: () => {
          return IO.FileAccess;
        },
      },
      ReadWrite: {
        kind: "field",
        type: () => {
          return IO.FileAccess;
        },
      },
    },
  },
  FileAttributes: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      ReadOnly: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      Hidden: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      System: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      Directory: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      Archive: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      Device: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      Normal: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      Temporary: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      SparseFile: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      ReparsePoint: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      Compressed: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      Offline: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      NotContentIndexed: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      Encrypted: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      IntegrityStream: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
      NoScrubData: {
        kind: "field",
        type: () => {
          return IO.FileAttributes;
        },
      },
    },
  },
  FileInfo: {
    kind: "class",
    members: {
      FileInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      AppendText: {
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
      },
      CreateText: {
        kind: "method",
        methodKind: "ordinary",
      },
      Decrypt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Delete: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Encrypt: {
        kind: "method",
        methodKind: "ordinary",
      },
      MoveTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Open: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenRead: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenText: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenWrite: {
        kind: "method",
        methodKind: "ordinary",
      },
      Replace: {
        kind: "method",
        methodKind: "ordinary",
      },
      Directory: {
        kind: "property",
        type: () => {
          return IO.DirectoryInfo;
        },
      },
      DirectoryName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Exists: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsReadOnly: {
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
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  FileLoadException: {
    kind: "class",
    members: {
      FileLoadException: {
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
  FileMode: {
    kind: "enum",
    members: {
      CreateNew: {
        kind: "field",
        type: () => {
          return IO.FileMode;
        },
      },
      Create: {
        kind: "field",
        type: () => {
          return IO.FileMode;
        },
      },
      Open: {
        kind: "field",
        type: () => {
          return IO.FileMode;
        },
      },
      OpenOrCreate: {
        kind: "field",
        type: () => {
          return IO.FileMode;
        },
      },
      Truncate: {
        kind: "field",
        type: () => {
          return IO.FileMode;
        },
      },
      Append: {
        kind: "field",
        type: () => {
          return IO.FileMode;
        },
      },
    },
  },
  FileNotFoundException: {
    kind: "class",
    members: {
      FileNotFoundException: {
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
  FileOptions: {
    kind: "enum",
    members: {
      WriteThrough: {
        kind: "field",
        type: () => {
          return IO.FileOptions;
        },
      },
      None: {
        kind: "field",
        type: () => {
          return IO.FileOptions;
        },
      },
      Encrypted: {
        kind: "field",
        type: () => {
          return IO.FileOptions;
        },
      },
      DeleteOnClose: {
        kind: "field",
        type: () => {
          return IO.FileOptions;
        },
      },
      SequentialScan: {
        kind: "field",
        type: () => {
          return IO.FileOptions;
        },
      },
      RandomAccess: {
        kind: "field",
        type: () => {
          return IO.FileOptions;
        },
      },
      Asynchronous: {
        kind: "field",
        type: () => {
          return IO.FileOptions;
        },
      },
    },
  },
  FileShare: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return IO.FileShare;
        },
      },
      Read: {
        kind: "field",
        type: () => {
          return IO.FileShare;
        },
      },
      Write: {
        kind: "field",
        type: () => {
          return IO.FileShare;
        },
      },
      ReadWrite: {
        kind: "field",
        type: () => {
          return IO.FileShare;
        },
      },
      Delete: {
        kind: "field",
        type: () => {
          return IO.FileShare;
        },
      },
      Inheritable: {
        kind: "field",
        type: () => {
          return IO.FileShare;
        },
      },
    },
  },
  FileStream: {
    kind: "class",
    members: {
      FileStream: {
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
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CopyToAsync: {
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
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
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
        isVirtual: true,
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
        isVirtual: true,
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
        isVirtual: true,
      },
      IsAsync: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isOverride: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
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
      SafeFileHandle: {
        kind: "property",
        type: () => {
          return SafeHandles.SafeFileHandle;
        },
        isVirtual: true,
      },
    },
  },
  FileStreamOptions: {
    kind: "class",
    members: {
      FileStreamOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      Access: {
        kind: "property",
        type: () => {
          return IO.FileAccess;
        },
      },
      BufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Mode: {
        kind: "property",
        type: () => {
          return IO.FileMode;
        },
      },
      Options: {
        kind: "property",
        type: () => {
          return IO.FileOptions;
        },
      },
      PreallocationSize: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      Share: {
        kind: "property",
        type: () => {
          return IO.FileShare;
        },
      },
      UnixCreateMode: {
        kind: "property",
        type: () => {
          return IO.UnixFileMode;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  FileSystemInfo: {
    kind: "class",
    members: {
      FullPath: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      OriginalPath: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      FileSystemInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateAsSymbolicLink: {
        kind: "method",
        methodKind: "ordinary",
      },
      Delete: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Refresh: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResolveLinkTarget: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return IO.FileAttributes;
        },
      },
      CreationTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      CreationTimeUtc: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      Exists: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      Extension: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      FullName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      LastAccessTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      LastAccessTimeUtc: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      LastWriteTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      LastWriteTimeUtc: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      LinkTarget: {
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
        isAbstract: true,
      },
      UnixFileMode: {
        kind: "property",
        type: () => {
          return IO.UnixFileMode;
        },
      },
    },
    isAbstract: true,
  },
  HandleInheritability: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return IO.HandleInheritability;
        },
      },
      Inheritable: {
        kind: "field",
        type: () => {
          return IO.HandleInheritability;
        },
      },
    },
  },
  IOException: {
    kind: "class",
    members: {
      IOException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  InvalidDataException: {
    kind: "class",
    members: {
      InvalidDataException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  MatchCasing: {
    kind: "enum",
    members: {
      PlatformDefault: {
        kind: "field",
        type: () => {
          return IO.MatchCasing;
        },
      },
      CaseSensitive: {
        kind: "field",
        type: () => {
          return IO.MatchCasing;
        },
      },
      CaseInsensitive: {
        kind: "field",
        type: () => {
          return IO.MatchCasing;
        },
      },
    },
  },
  MatchType: {
    kind: "enum",
    members: {
      Simple: {
        kind: "field",
        type: () => {
          return IO.MatchType;
        },
      },
      Win32: {
        kind: "field",
        type: () => {
          return IO.MatchType;
        },
      },
    },
  },
  MemoryStream: {
    kind: "class",
    members: {
      MemoryStream: {
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
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CopyToAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
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
      GetBuffer: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
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
      ToArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryGetBuffer: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
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
      WriteTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
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
      Capacity: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
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
    },
  },
  Path: {
    kind: "class",
    members: {
      AltDirectorySeparatorChar: {
        kind: "field",
        type: () => {
          return System.Char;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DirectorySeparatorChar: {
        kind: "field",
        type: () => {
          return System.Char;
        },
        isStatic: true,
        isReadOnly: true,
      },
      InvalidPathChars: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isStatic: true,
        isReadOnly: true,
      },
      PathSeparator: {
        kind: "field",
        type: () => {
          return System.Char;
        },
        isStatic: true,
        isReadOnly: true,
      },
      VolumeSeparatorChar: {
        kind: "field",
        type: () => {
          return System.Char;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ChangeExtension: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Combine: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EndsInDirectorySeparator: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Exists: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDirectoryName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetExtension: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFileName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFileNameWithoutExtension: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFullPath: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetInvalidFileNameChars: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetInvalidPathChars: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetPathRoot: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRandomFileName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRelativePath: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTempFileName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTempPath: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      HasExtension: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPathFullyQualified: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPathRooted: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Join: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TrimEndingDirectorySeparator: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryJoin: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  PathTooLongException: {
    kind: "class",
    members: {
      PathTooLongException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  RandomAccess: {
    kind: "class",
    members: {
      FlushToDisk: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetLength: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetLength: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  SearchOption: {
    kind: "enum",
    members: {
      TopDirectoryOnly: {
        kind: "field",
        type: () => {
          return IO.SearchOption;
        },
      },
      AllDirectories: {
        kind: "field",
        type: () => {
          return IO.SearchOption;
        },
      },
    },
  },
  SeekOrigin: {
    kind: "enum",
    members: {
      Begin: {
        kind: "field",
        type: () => {
          return IO.SeekOrigin;
        },
      },
      Current: {
        kind: "field",
        type: () => {
          return IO.SeekOrigin;
        },
      },
      End: {
        kind: "field",
        type: () => {
          return IO.SeekOrigin;
        },
      },
    },
  },
  Stream: {
    kind: "class",
    members: {
      Null: {
        kind: "field",
        type: () => {
          return IO.Stream;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Stream: {
        kind: "method",
        methodKind: "constructor",
      },
      BeginRead: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BeginWrite: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyToAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateWaitHandle: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EndRead: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EndWrite: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      FlushAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ObjectInvariant: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
        isOverride: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ReadAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadAtLeast: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadAtLeastAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadByte: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadExactly: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadExactlyAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Seek: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetLength: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Synchronized: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ValidateBufferArguments: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ValidateCopyToArguments: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      WriteAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteByte: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CanRead: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      CanSeek: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      CanTimeout: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      CanWrite: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      Position: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
        isAbstract: true,
      },
      ReadTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      WriteTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  StreamReader: {
    kind: "class",
    members: {
      Null: {
        kind: "field",
        type: () => {
          return IO.StreamReader;
        },
        isStatic: true,
        isReadOnly: true,
      },
      StreamReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DiscardBufferedData: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Peek: {
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
      ReadBlock: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadBlockAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadLine: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadLineAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadToEnd: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadToEndAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BaseStream: {
        kind: "property",
        type: () => {
          return IO.Stream;
        },
        isVirtual: true,
      },
      CurrentEncoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isVirtual: true,
      },
      EndOfStream: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  StreamWriter: {
    kind: "class",
    members: {
      Null: {
        kind: "field",
        type: () => {
          return IO.StreamWriter;
        },
        isStatic: true,
        isReadOnly: true,
      },
      StreamWriter: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
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
      WriteLine: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteLineAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AutoFlush: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      BaseStream: {
        kind: "property",
        type: () => {
          return IO.Stream;
        },
        isVirtual: true,
      },
      Encoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isOverride: true,
      },
    },
  },
  StringReader: {
    kind: "class",
    members: {
      StringReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Peek: {
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
      ReadBlock: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadBlockAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadLine: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadLineAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadToEnd: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadToEndAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  StringWriter: {
    kind: "class",
    members: {
      StringWriter: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FlushAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStringBuilder: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToString: {
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
      WriteLine: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteLineAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Encoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isOverride: true,
      },
    },
  },
  TextReader: {
    kind: "class",
    members: {
      Null: {
        kind: "field",
        type: () => {
          return IO.TextReader;
        },
        isStatic: true,
        isReadOnly: true,
      },
      TextReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Peek: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadBlock: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadBlockAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadLine: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadLineAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadToEnd: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadToEndAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Synchronized: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  TextWriter: {
    kind: "class",
    members: {
      CoreNewLine: {
        kind: "field",
        type: () => {
          return System.Array;
        },
      },
      Null: {
        kind: "field",
        type: () => {
          return IO.TextWriter;
        },
        isStatic: true,
        isReadOnly: true,
      },
      TextWriter: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateBroadcasting: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      FlushAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Synchronized: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteLine: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteLineAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Encoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isAbstract: true,
      },
      FormatProvider: {
        kind: "property",
        type: () => {
          return System.IFormatProvider;
        },
        isVirtual: true,
      },
      NewLine: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  UnixFileMode: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return IO.UnixFileMode;
        },
      },
      OtherExecute: {
        kind: "field",
        type: () => {
          return IO.UnixFileMode;
        },
      },
      OtherWrite: {
        kind: "field",
        type: () => {
          return IO.UnixFileMode;
        },
      },
      OtherRead: {
        kind: "field",
        type: () => {
          return IO.UnixFileMode;
        },
      },
      GroupExecute: {
        kind: "field",
        type: () => {
          return IO.UnixFileMode;
        },
      },
      GroupWrite: {
        kind: "field",
        type: () => {
          return IO.UnixFileMode;
        },
      },
      GroupRead: {
        kind: "field",
        type: () => {
          return IO.UnixFileMode;
        },
      },
      UserExecute: {
        kind: "field",
        type: () => {
          return IO.UnixFileMode;
        },
      },
      UserWrite: {
        kind: "field",
        type: () => {
          return IO.UnixFileMode;
        },
      },
      UserRead: {
        kind: "field",
        type: () => {
          return IO.UnixFileMode;
        },
      },
      StickyBit: {
        kind: "field",
        type: () => {
          return IO.UnixFileMode;
        },
      },
      SetGroup: {
        kind: "field",
        type: () => {
          return IO.UnixFileMode;
        },
      },
      SetUser: {
        kind: "field",
        type: () => {
          return IO.UnixFileMode;
        },
      },
    },
  },
  UnmanagedMemoryStream: {
    kind: "class",
    members: {
      UnmanagedMemoryStream: {
        kind: "method",
        methodKind: "constructor",
      },
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
      FlushAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Initialize: {
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
      Capacity: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
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
      PositionPointer: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
    },
  },
});
export default IO
