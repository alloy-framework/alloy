import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type BinaryLibrary = LibrarySymbolReference & {
  BinaryPrimitives: LibrarySymbolReference & {
    ReadDoubleBigEndian: LibrarySymbolReference;
    ReadDoubleLittleEndian: LibrarySymbolReference;
    ReadHalfBigEndian: LibrarySymbolReference;
    ReadHalfLittleEndian: LibrarySymbolReference;
    ReadInt16BigEndian: LibrarySymbolReference;
    ReadInt16LittleEndian: LibrarySymbolReference;
    ReadInt32BigEndian: LibrarySymbolReference;
    ReadInt32LittleEndian: LibrarySymbolReference;
    ReadInt64BigEndian: LibrarySymbolReference;
    ReadInt64LittleEndian: LibrarySymbolReference;
    ReadInt128BigEndian: LibrarySymbolReference;
    ReadInt128LittleEndian: LibrarySymbolReference;
    ReadIntPtrBigEndian: LibrarySymbolReference;
    ReadIntPtrLittleEndian: LibrarySymbolReference;
    ReadSingleBigEndian: LibrarySymbolReference;
    ReadSingleLittleEndian: LibrarySymbolReference;
    ReadUInt16BigEndian: LibrarySymbolReference;
    ReadUInt16LittleEndian: LibrarySymbolReference;
    ReadUInt32BigEndian: LibrarySymbolReference;
    ReadUInt32LittleEndian: LibrarySymbolReference;
    ReadUInt64BigEndian: LibrarySymbolReference;
    ReadUInt64LittleEndian: LibrarySymbolReference;
    ReadUInt128BigEndian: LibrarySymbolReference;
    ReadUInt128LittleEndian: LibrarySymbolReference;
    ReadUIntPtrBigEndian: LibrarySymbolReference;
    ReadUIntPtrLittleEndian: LibrarySymbolReference;
    ReverseEndianness: LibrarySymbolReference;
    TryReadDoubleBigEndian: LibrarySymbolReference;
    TryReadDoubleLittleEndian: LibrarySymbolReference;
    TryReadHalfBigEndian: LibrarySymbolReference;
    TryReadHalfLittleEndian: LibrarySymbolReference;
    TryReadInt16BigEndian: LibrarySymbolReference;
    TryReadInt16LittleEndian: LibrarySymbolReference;
    TryReadInt32BigEndian: LibrarySymbolReference;
    TryReadInt32LittleEndian: LibrarySymbolReference;
    TryReadInt64BigEndian: LibrarySymbolReference;
    TryReadInt64LittleEndian: LibrarySymbolReference;
    TryReadInt128BigEndian: LibrarySymbolReference;
    TryReadInt128LittleEndian: LibrarySymbolReference;
    TryReadIntPtrBigEndian: LibrarySymbolReference;
    TryReadIntPtrLittleEndian: LibrarySymbolReference;
    TryReadSingleBigEndian: LibrarySymbolReference;
    TryReadSingleLittleEndian: LibrarySymbolReference;
    TryReadUInt16BigEndian: LibrarySymbolReference;
    TryReadUInt16LittleEndian: LibrarySymbolReference;
    TryReadUInt32BigEndian: LibrarySymbolReference;
    TryReadUInt32LittleEndian: LibrarySymbolReference;
    TryReadUInt64BigEndian: LibrarySymbolReference;
    TryReadUInt64LittleEndian: LibrarySymbolReference;
    TryReadUInt128BigEndian: LibrarySymbolReference;
    TryReadUInt128LittleEndian: LibrarySymbolReference;
    TryReadUIntPtrBigEndian: LibrarySymbolReference;
    TryReadUIntPtrLittleEndian: LibrarySymbolReference;
    TryWriteDoubleBigEndian: LibrarySymbolReference;
    TryWriteDoubleLittleEndian: LibrarySymbolReference;
    TryWriteHalfBigEndian: LibrarySymbolReference;
    TryWriteHalfLittleEndian: LibrarySymbolReference;
    TryWriteInt16BigEndian: LibrarySymbolReference;
    TryWriteInt16LittleEndian: LibrarySymbolReference;
    TryWriteInt32BigEndian: LibrarySymbolReference;
    TryWriteInt32LittleEndian: LibrarySymbolReference;
    TryWriteInt64BigEndian: LibrarySymbolReference;
    TryWriteInt64LittleEndian: LibrarySymbolReference;
    TryWriteInt128BigEndian: LibrarySymbolReference;
    TryWriteInt128LittleEndian: LibrarySymbolReference;
    TryWriteIntPtrBigEndian: LibrarySymbolReference;
    TryWriteIntPtrLittleEndian: LibrarySymbolReference;
    TryWriteSingleBigEndian: LibrarySymbolReference;
    TryWriteSingleLittleEndian: LibrarySymbolReference;
    TryWriteUInt16BigEndian: LibrarySymbolReference;
    TryWriteUInt16LittleEndian: LibrarySymbolReference;
    TryWriteUInt32BigEndian: LibrarySymbolReference;
    TryWriteUInt32LittleEndian: LibrarySymbolReference;
    TryWriteUInt64BigEndian: LibrarySymbolReference;
    TryWriteUInt64LittleEndian: LibrarySymbolReference;
    TryWriteUInt128BigEndian: LibrarySymbolReference;
    TryWriteUInt128LittleEndian: LibrarySymbolReference;
    TryWriteUIntPtrBigEndian: LibrarySymbolReference;
    TryWriteUIntPtrLittleEndian: LibrarySymbolReference;
    WriteDoubleBigEndian: LibrarySymbolReference;
    WriteDoubleLittleEndian: LibrarySymbolReference;
    WriteHalfBigEndian: LibrarySymbolReference;
    WriteHalfLittleEndian: LibrarySymbolReference;
    WriteInt16BigEndian: LibrarySymbolReference;
    WriteInt16LittleEndian: LibrarySymbolReference;
    WriteInt32BigEndian: LibrarySymbolReference;
    WriteInt32LittleEndian: LibrarySymbolReference;
    WriteInt64BigEndian: LibrarySymbolReference;
    WriteInt64LittleEndian: LibrarySymbolReference;
    WriteInt128BigEndian: LibrarySymbolReference;
    WriteInt128LittleEndian: LibrarySymbolReference;
    WriteIntPtrBigEndian: LibrarySymbolReference;
    WriteIntPtrLittleEndian: LibrarySymbolReference;
    WriteSingleBigEndian: LibrarySymbolReference;
    WriteSingleLittleEndian: LibrarySymbolReference;
    WriteUInt16BigEndian: LibrarySymbolReference;
    WriteUInt16LittleEndian: LibrarySymbolReference;
    WriteUInt32BigEndian: LibrarySymbolReference;
    WriteUInt32LittleEndian: LibrarySymbolReference;
    WriteUInt64BigEndian: LibrarySymbolReference;
    WriteUInt64LittleEndian: LibrarySymbolReference;
    WriteUInt128BigEndian: LibrarySymbolReference;
    WriteUInt128LittleEndian: LibrarySymbolReference;
    WriteUIntPtrBigEndian: LibrarySymbolReference;
    WriteUIntPtrLittleEndian: LibrarySymbolReference
  }
};
const Binary: BinaryLibrary = createLibrary("System.Buffers.Binary", {
  BinaryPrimitives: {
    kind: "class",
    members: {
      ReadDoubleBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadDoubleLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadHalfBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadHalfLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadInt16BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadInt16LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadInt32BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadInt32LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadInt64BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadInt64LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadInt128BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadInt128LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadIntPtrBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadIntPtrLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadSingleBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadSingleLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadUInt16BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadUInt16LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadUInt32BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadUInt32LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadUInt64BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadUInt64LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadUInt128BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadUInt128LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadUIntPtrBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadUIntPtrLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReverseEndianness: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadDoubleBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadDoubleLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadHalfBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadHalfLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadInt16BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadInt16LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadInt32BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadInt32LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadInt64BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadInt64LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadInt128BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadInt128LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadIntPtrBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadIntPtrLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadSingleBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadSingleLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadUInt16BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadUInt16LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadUInt32BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadUInt32LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadUInt64BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadUInt64LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadUInt128BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadUInt128LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadUIntPtrBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadUIntPtrLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteDoubleBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteDoubleLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteHalfBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteHalfLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteInt16BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteInt16LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteInt32BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteInt32LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteInt64BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteInt64LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteInt128BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteInt128LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteIntPtrBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteIntPtrLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteSingleBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteSingleLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteUInt16BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteUInt16LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteUInt32BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteUInt32LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteUInt64BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteUInt64LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteUInt128BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteUInt128LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteUIntPtrBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWriteUIntPtrLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteDoubleBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteDoubleLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteHalfBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteHalfLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteInt16BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteInt16LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteInt32BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteInt32LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteInt64BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteInt64LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteInt128BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteInt128LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteIntPtrBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteIntPtrLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteSingleBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteSingleLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteUInt16BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteUInt16LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteUInt32BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteUInt32LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteUInt64BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteUInt64LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteUInt128BigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteUInt128LittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteUIntPtrBigEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteUIntPtrLittleEndian: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Binary
