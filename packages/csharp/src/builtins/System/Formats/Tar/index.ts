import Generic from "../../Collections/Generic/index.js";
import System from "../../index.js";
import IO from "../../IO/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type TarLibrary = LibrarySymbolReference & {
  GnuTarEntry: LibrarySymbolReference & {
    GnuTarEntry: LibrarySymbolReference;
    AccessTime: LibrarySymbolReference;
    ChangeTime: LibrarySymbolReference
  };
  PaxGlobalExtendedAttributesTarEntry: LibrarySymbolReference & {
    PaxGlobalExtendedAttributesTarEntry: LibrarySymbolReference;
    GlobalExtendedAttributes: LibrarySymbolReference
  };
  PaxTarEntry: LibrarySymbolReference & {
    PaxTarEntry: LibrarySymbolReference;
    ExtendedAttributes: LibrarySymbolReference
  };
  PosixTarEntry: LibrarySymbolReference & {
    DeviceMajor: LibrarySymbolReference;
    DeviceMinor: LibrarySymbolReference;
    GroupName: LibrarySymbolReference;
    UserName: LibrarySymbolReference
  };
  TarEntry: LibrarySymbolReference & {
    ExtractToFile: LibrarySymbolReference;
    ExtractToFileAsync: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Checksum: LibrarySymbolReference;
    DataStream: LibrarySymbolReference;
    EntryType: LibrarySymbolReference;
    Format: LibrarySymbolReference;
    Gid: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    LinkName: LibrarySymbolReference;
    Mode: LibrarySymbolReference;
    ModificationTime: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    DataOffset: LibrarySymbolReference;
    Uid: LibrarySymbolReference
  };
  TarEntryFormat: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    V7: LibrarySymbolReference;
    Ustar: LibrarySymbolReference;
    Pax: LibrarySymbolReference;
    Gnu: LibrarySymbolReference
  };
  TarEntryType: LibrarySymbolReference & {
    V7RegularFile: LibrarySymbolReference;
    RegularFile: LibrarySymbolReference;
    HardLink: LibrarySymbolReference;
    SymbolicLink: LibrarySymbolReference;
    CharacterDevice: LibrarySymbolReference;
    BlockDevice: LibrarySymbolReference;
    Directory: LibrarySymbolReference;
    Fifo: LibrarySymbolReference;
    ContiguousFile: LibrarySymbolReference;
    DirectoryList: LibrarySymbolReference;
    LongLink: LibrarySymbolReference;
    LongPath: LibrarySymbolReference;
    MultiVolume: LibrarySymbolReference;
    RenamedOrSymlinked: LibrarySymbolReference;
    SparseFile: LibrarySymbolReference;
    TapeVolume: LibrarySymbolReference;
    GlobalExtendedAttributes: LibrarySymbolReference;
    ExtendedAttributes: LibrarySymbolReference
  };
  TarFile: LibrarySymbolReference & {
    CreateFromDirectory: LibrarySymbolReference;
    CreateFromDirectoryAsync: LibrarySymbolReference;
    ExtractToDirectory: LibrarySymbolReference;
    ExtractToDirectoryAsync: LibrarySymbolReference
  };
  TarReader: LibrarySymbolReference & {
    TarReader: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    GetNextEntry: LibrarySymbolReference;
    GetNextEntryAsync: LibrarySymbolReference
  };
  TarWriter: LibrarySymbolReference & {
    TarWriter: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    WriteEntry: LibrarySymbolReference;
    WriteEntryAsync: LibrarySymbolReference;
    Format: LibrarySymbolReference
  };
  UstarTarEntry: LibrarySymbolReference & {
    UstarTarEntry: LibrarySymbolReference
  };
  V7TarEntry: LibrarySymbolReference & {
    V7TarEntry: LibrarySymbolReference
  }
};
const Tar: TarLibrary = createLibrary("System.Formats.Tar", {
  GnuTarEntry: {
    kind: "class",
    members: {
      GnuTarEntry: {
        kind: "method",
        methodKind: "constructor",
      },
      AccessTime: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
      },
      ChangeTime: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
      },
    },
    isSealed: true,
  },
  PaxGlobalExtendedAttributesTarEntry: {
    kind: "class",
    members: {
      PaxGlobalExtendedAttributesTarEntry: {
        kind: "method",
        methodKind: "constructor",
      },
      GlobalExtendedAttributes: {
        kind: "property",
        type: () => {
          return Generic.IReadOnlyDictionary;
        },
      },
    },
    isSealed: true,
  },
  PaxTarEntry: {
    kind: "class",
    members: {
      PaxTarEntry: {
        kind: "method",
        methodKind: "constructor",
      },
      ExtendedAttributes: {
        kind: "property",
        type: () => {
          return Generic.IReadOnlyDictionary;
        },
      },
    },
    isSealed: true,
  },
  PosixTarEntry: {
    kind: "class",
    members: {
      DeviceMajor: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      DeviceMinor: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      GroupName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      UserName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isAbstract: true,
  },
  TarEntry: {
    kind: "class",
    members: {
      ExtractToFile: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExtractToFileAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Checksum: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      DataStream: {
        kind: "property",
        type: () => {
          return IO.Stream;
        },
        isNullable: true,
      },
      EntryType: {
        kind: "property",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      Format: {
        kind: "property",
        type: () => {
          return Tar.TarEntryFormat;
        },
      },
      Gid: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      LinkName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Mode: {
        kind: "property",
        type: () => {
          return IO.UnixFileMode;
        },
      },
      ModificationTime: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DataOffset: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      Uid: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isAbstract: true,
  },
  TarEntryFormat: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return Tar.TarEntryFormat;
        },
      },
      V7: {
        kind: "field",
        type: () => {
          return Tar.TarEntryFormat;
        },
      },
      Ustar: {
        kind: "field",
        type: () => {
          return Tar.TarEntryFormat;
        },
      },
      Pax: {
        kind: "field",
        type: () => {
          return Tar.TarEntryFormat;
        },
      },
      Gnu: {
        kind: "field",
        type: () => {
          return Tar.TarEntryFormat;
        },
      },
    },
  },
  TarEntryType: {
    kind: "enum",
    members: {
      V7RegularFile: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      RegularFile: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      HardLink: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      SymbolicLink: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      CharacterDevice: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      BlockDevice: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      Directory: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      Fifo: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      ContiguousFile: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      DirectoryList: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      LongLink: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      LongPath: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      MultiVolume: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      RenamedOrSymlinked: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      SparseFile: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      TapeVolume: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      GlobalExtendedAttributes: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
      ExtendedAttributes: {
        kind: "field",
        type: () => {
          return Tar.TarEntryType;
        },
      },
    },
  },
  TarFile: {
    kind: "class",
    members: {
      CreateFromDirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateFromDirectoryAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ExtractToDirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ExtractToDirectoryAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  TarReader: {
    kind: "class",
    members: {
      TarReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNextEntry: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetNextEntryAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  TarWriter: {
    kind: "class",
    members: {
      TarWriter: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteEntry: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteEntryAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Format: {
        kind: "property",
        type: () => {
          return Tar.TarEntryFormat;
        },
      },
    },
    isSealed: true,
  },
  UstarTarEntry: {
    kind: "class",
    members: {
      UstarTarEntry: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  V7TarEntry: {
    kind: "class",
    members: {
      V7TarEntry: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
});
export default Tar
