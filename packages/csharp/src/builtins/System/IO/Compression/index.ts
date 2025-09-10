import ObjectModel from "../../Collections/ObjectModel/index.js";
import System from "../../index.js";
import IO from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type CompressionLibrary = LibrarySymbolReference & {
  BrotliCompressionOptions: LibrarySymbolReference & {
    BrotliCompressionOptions: LibrarySymbolReference;
    Quality: LibrarySymbolReference
  };
  BrotliDecoder: LibrarySymbolReference & {
    Decompress: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    TryDecompress: LibrarySymbolReference
  };
  BrotliEncoder: LibrarySymbolReference & {
    BrotliEncoder: LibrarySymbolReference;
    Compress: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    GetMaxCompressedLength: LibrarySymbolReference;
    TryCompress: LibrarySymbolReference
  };
  BrotliStream: LibrarySymbolReference & {
    BrotliStream: LibrarySymbolReference;
    BeginRead: LibrarySymbolReference;
    BeginWrite: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    EndRead: LibrarySymbolReference;
    EndWrite: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteByte: LibrarySymbolReference;
    BaseStream: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanSeek: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Position: LibrarySymbolReference
  };
  CompressionLevel: LibrarySymbolReference & {
    Optimal: LibrarySymbolReference;
    Fastest: LibrarySymbolReference;
    NoCompression: LibrarySymbolReference;
    SmallestSize: LibrarySymbolReference
  };
  CompressionMode: LibrarySymbolReference & {
    Decompress: LibrarySymbolReference;
    Compress: LibrarySymbolReference
  };
  DeflateStream: LibrarySymbolReference & {
    DeflateStream: LibrarySymbolReference;
    BeginRead: LibrarySymbolReference;
    BeginWrite: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    CopyToAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    EndRead: LibrarySymbolReference;
    EndWrite: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteByte: LibrarySymbolReference;
    BaseStream: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanSeek: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Position: LibrarySymbolReference
  };
  GZipStream: LibrarySymbolReference & {
    GZipStream: LibrarySymbolReference;
    BeginRead: LibrarySymbolReference;
    BeginWrite: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    CopyToAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    EndRead: LibrarySymbolReference;
    EndWrite: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteByte: LibrarySymbolReference;
    BaseStream: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanSeek: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Position: LibrarySymbolReference
  };
  ZLibCompressionOptions: LibrarySymbolReference & {
    ZLibCompressionOptions: LibrarySymbolReference;
    CompressionLevel: LibrarySymbolReference;
    CompressionStrategy: LibrarySymbolReference
  };
  ZLibCompressionStrategy: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    Filtered: LibrarySymbolReference;
    HuffmanOnly: LibrarySymbolReference;
    RunLengthEncoding: LibrarySymbolReference;
    Fixed: LibrarySymbolReference
  };
  ZLibStream: LibrarySymbolReference & {
    ZLibStream: LibrarySymbolReference;
    BeginRead: LibrarySymbolReference;
    BeginWrite: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    CopyToAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    EndRead: LibrarySymbolReference;
    EndWrite: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteByte: LibrarySymbolReference;
    BaseStream: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanSeek: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Position: LibrarySymbolReference
  };
  ZipArchive: LibrarySymbolReference & {
    ZipArchive: LibrarySymbolReference;
    CreateEntry: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetEntry: LibrarySymbolReference;
    Comment: LibrarySymbolReference;
    Entries: LibrarySymbolReference;
    Mode: LibrarySymbolReference
  };
  ZipArchiveEntry: LibrarySymbolReference & {
    Delete: LibrarySymbolReference;
    Open: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Archive: LibrarySymbolReference;
    Comment: LibrarySymbolReference;
    CompressedLength: LibrarySymbolReference;
    Crc32: LibrarySymbolReference;
    ExternalAttributes: LibrarySymbolReference;
    FullName: LibrarySymbolReference;
    IsEncrypted: LibrarySymbolReference;
    LastWriteTime: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  ZipArchiveMode: LibrarySymbolReference & {
    Read: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Update: LibrarySymbolReference
  };
  ZipFile: LibrarySymbolReference & {
    CreateFromDirectory: LibrarySymbolReference;
    ExtractToDirectory: LibrarySymbolReference;
    Open: LibrarySymbolReference;
    OpenRead: LibrarySymbolReference
  }
};
const Compression: CompressionLibrary = createLibrary("System.IO.Compression", {
  BrotliCompressionOptions: {
    kind: "class",
    members: {
      BrotliCompressionOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      Quality: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  BrotliDecoder: {
    kind: "struct",
    members: {
      Decompress: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryDecompress: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  BrotliEncoder: {
    kind: "struct",
    members: {
      BrotliEncoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Compress: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMaxCompressedLength: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryCompress: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  BrotliStream: {
    kind: "class",
    members: {
      BrotliStream: {
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
      BaseStream: {
        kind: "property",
        type: () => {
          return IO.Stream;
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
    },
    isSealed: true,
  },
  CompressionLevel: {
    kind: "enum",
    members: {
      Optimal: {
        kind: "field",
        type: () => {
          return Compression.CompressionLevel;
        },
      },
      Fastest: {
        kind: "field",
        type: () => {
          return Compression.CompressionLevel;
        },
      },
      NoCompression: {
        kind: "field",
        type: () => {
          return Compression.CompressionLevel;
        },
      },
      SmallestSize: {
        kind: "field",
        type: () => {
          return Compression.CompressionLevel;
        },
      },
    },
  },
  CompressionMode: {
    kind: "enum",
    members: {
      Decompress: {
        kind: "field",
        type: () => {
          return Compression.CompressionMode;
        },
      },
      Compress: {
        kind: "field",
        type: () => {
          return Compression.CompressionMode;
        },
      },
    },
  },
  DeflateStream: {
    kind: "class",
    members: {
      DeflateStream: {
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
      BaseStream: {
        kind: "property",
        type: () => {
          return IO.Stream;
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
    },
  },
  GZipStream: {
    kind: "class",
    members: {
      GZipStream: {
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
      BaseStream: {
        kind: "property",
        type: () => {
          return IO.Stream;
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
    },
  },
  ZLibCompressionOptions: {
    kind: "class",
    members: {
      ZLibCompressionOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      CompressionLevel: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      CompressionStrategy: {
        kind: "property",
        type: () => {
          return Compression.ZLibCompressionStrategy;
        },
      },
    },
    isSealed: true,
  },
  ZLibCompressionStrategy: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Compression.ZLibCompressionStrategy;
        },
      },
      Filtered: {
        kind: "field",
        type: () => {
          return Compression.ZLibCompressionStrategy;
        },
      },
      HuffmanOnly: {
        kind: "field",
        type: () => {
          return Compression.ZLibCompressionStrategy;
        },
      },
      RunLengthEncoding: {
        kind: "field",
        type: () => {
          return Compression.ZLibCompressionStrategy;
        },
      },
      Fixed: {
        kind: "field",
        type: () => {
          return Compression.ZLibCompressionStrategy;
        },
      },
    },
  },
  ZLibStream: {
    kind: "class",
    members: {
      ZLibStream: {
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
      BaseStream: {
        kind: "property",
        type: () => {
          return IO.Stream;
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
    },
    isSealed: true,
  },
  ZipArchive: {
    kind: "class",
    members: {
      ZipArchive: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateEntry: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEntry: {
        kind: "method",
        methodKind: "ordinary",
      },
      Comment: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Entries: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      Mode: {
        kind: "property",
        type: () => {
          return Compression.ZipArchiveMode;
        },
      },
    },
  },
  ZipArchiveEntry: {
    kind: "class",
    members: {
      Delete: {
        kind: "method",
        methodKind: "ordinary",
      },
      Open: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Archive: {
        kind: "property",
        type: () => {
          return Compression.ZipArchive;
        },
      },
      Comment: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      CompressedLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      Crc32: {
        kind: "property",
        type: () => {
          return System.UInt32;
        },
      },
      ExternalAttributes: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      FullName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      IsEncrypted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LastWriteTime: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
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
      },
    },
  },
  ZipArchiveMode: {
    kind: "enum",
    members: {
      Read: {
        kind: "field",
        type: () => {
          return Compression.ZipArchiveMode;
        },
      },
      Create: {
        kind: "field",
        type: () => {
          return Compression.ZipArchiveMode;
        },
      },
      Update: {
        kind: "field",
        type: () => {
          return Compression.ZipArchiveMode;
        },
      },
    },
  },
  ZipFile: {
    kind: "class",
    members: {
      CreateFromDirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ExtractToDirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Open: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OpenRead: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Compression
