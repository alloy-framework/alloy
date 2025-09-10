import Immutable from "../../Collections/Immutable/index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type PortableExecutableLibrary = LibrarySymbolReference & {
  Characteristics: LibrarySymbolReference & {
    RelocsStripped: LibrarySymbolReference;
    ExecutableImage: LibrarySymbolReference;
    LineNumsStripped: LibrarySymbolReference;
    LocalSymsStripped: LibrarySymbolReference;
    AggressiveWSTrim: LibrarySymbolReference;
    LargeAddressAware: LibrarySymbolReference;
    BytesReversedLo: LibrarySymbolReference;
    Bit32Machine: LibrarySymbolReference;
    DebugStripped: LibrarySymbolReference;
    RemovableRunFromSwap: LibrarySymbolReference;
    NetRunFromSwap: LibrarySymbolReference;
    System: LibrarySymbolReference;
    Dll: LibrarySymbolReference;
    UpSystemOnly: LibrarySymbolReference;
    BytesReversedHi: LibrarySymbolReference
  };
  CodeViewDebugDirectoryData: LibrarySymbolReference & {
    Age: LibrarySymbolReference;
    Guid: LibrarySymbolReference;
    Path: LibrarySymbolReference
  };
  CoffHeader: LibrarySymbolReference & {
    Characteristics: LibrarySymbolReference;
    Machine: LibrarySymbolReference;
    NumberOfSections: LibrarySymbolReference;
    NumberOfSymbols: LibrarySymbolReference;
    PointerToSymbolTable: LibrarySymbolReference;
    SizeOfOptionalHeader: LibrarySymbolReference;
    TimeDateStamp: LibrarySymbolReference
  };
  CorFlags: LibrarySymbolReference & {
    ILOnly: LibrarySymbolReference;
    Requires32Bit: LibrarySymbolReference;
    ILLibrary: LibrarySymbolReference;
    StrongNameSigned: LibrarySymbolReference;
    NativeEntryPoint: LibrarySymbolReference;
    TrackDebugData: LibrarySymbolReference;
    Prefers32Bit: LibrarySymbolReference
  };
  CorHeader: LibrarySymbolReference & {
    CodeManagerTableDirectory: LibrarySymbolReference;
    EntryPointTokenOrRelativeVirtualAddress: LibrarySymbolReference;
    ExportAddressTableJumpsDirectory: LibrarySymbolReference;
    Flags: LibrarySymbolReference;
    MajorRuntimeVersion: LibrarySymbolReference;
    ManagedNativeHeaderDirectory: LibrarySymbolReference;
    MetadataDirectory: LibrarySymbolReference;
    MinorRuntimeVersion: LibrarySymbolReference;
    ResourcesDirectory: LibrarySymbolReference;
    StrongNameSignatureDirectory: LibrarySymbolReference;
    VtableFixupsDirectory: LibrarySymbolReference
  };
  DebugDirectoryBuilder: LibrarySymbolReference & {
    DebugDirectoryBuilder: LibrarySymbolReference;
    AddCodeViewEntry: LibrarySymbolReference;
    AddEmbeddedPortablePdbEntry: LibrarySymbolReference;
    AddEntry: LibrarySymbolReference;
    AddPdbChecksumEntry: LibrarySymbolReference;
    AddReproducibleEntry: LibrarySymbolReference
  };
  DebugDirectoryEntry: LibrarySymbolReference & {
    DebugDirectoryEntry: LibrarySymbolReference;
    DataPointer: LibrarySymbolReference;
    DataRelativeVirtualAddress: LibrarySymbolReference;
    DataSize: LibrarySymbolReference;
    IsPortableCodeView: LibrarySymbolReference;
    MajorVersion: LibrarySymbolReference;
    MinorVersion: LibrarySymbolReference;
    Stamp: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  DebugDirectoryEntryType: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Coff: LibrarySymbolReference;
    CodeView: LibrarySymbolReference;
    Reproducible: LibrarySymbolReference;
    EmbeddedPortablePdb: LibrarySymbolReference;
    PdbChecksum: LibrarySymbolReference
  };
  DirectoryEntry: LibrarySymbolReference & {
    RelativeVirtualAddress: LibrarySymbolReference;
    Size: LibrarySymbolReference;
    DirectoryEntry: LibrarySymbolReference
  };
  DllCharacteristics: LibrarySymbolReference & {
    ProcessInit: LibrarySymbolReference;
    ProcessTerm: LibrarySymbolReference;
    ThreadInit: LibrarySymbolReference;
    ThreadTerm: LibrarySymbolReference;
    HighEntropyVirtualAddressSpace: LibrarySymbolReference;
    DynamicBase: LibrarySymbolReference;
    ForceIntegrity: LibrarySymbolReference;
    NxCompatible: LibrarySymbolReference;
    NoIsolation: LibrarySymbolReference;
    NoSeh: LibrarySymbolReference;
    NoBind: LibrarySymbolReference;
    AppContainer: LibrarySymbolReference;
    WdmDriver: LibrarySymbolReference;
    ControlFlowGuard: LibrarySymbolReference;
    TerminalServerAware: LibrarySymbolReference
  };
  Machine: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    I386: LibrarySymbolReference;
    WceMipsV2: LibrarySymbolReference;
    Alpha: LibrarySymbolReference;
    SH3: LibrarySymbolReference;
    SH3Dsp: LibrarySymbolReference;
    SH3E: LibrarySymbolReference;
    SH4: LibrarySymbolReference;
    SH5: LibrarySymbolReference;
    Arm: LibrarySymbolReference;
    Thumb: LibrarySymbolReference;
    ArmThumb2: LibrarySymbolReference;
    AM33: LibrarySymbolReference;
    PowerPC: LibrarySymbolReference;
    PowerPCFP: LibrarySymbolReference;
    IA64: LibrarySymbolReference;
    MIPS16: LibrarySymbolReference;
    Alpha64: LibrarySymbolReference;
    MipsFpu: LibrarySymbolReference;
    MipsFpu16: LibrarySymbolReference;
    Tricore: LibrarySymbolReference;
    Ebc: LibrarySymbolReference;
    RiscV32: LibrarySymbolReference;
    RiscV64: LibrarySymbolReference;
    RiscV128: LibrarySymbolReference;
    LoongArch32: LibrarySymbolReference;
    LoongArch64: LibrarySymbolReference;
    Amd64: LibrarySymbolReference;
    M32R: LibrarySymbolReference;
    Arm64: LibrarySymbolReference
  };
  ManagedPEBuilder: LibrarySymbolReference & {
    ManagedResourcesDataAlignment: LibrarySymbolReference;
    MappedFieldDataAlignment: LibrarySymbolReference;
    ManagedPEBuilder: LibrarySymbolReference;
    CreateSections: LibrarySymbolReference;
    GetDirectories: LibrarySymbolReference;
    SerializeSection: LibrarySymbolReference;
    Sign: LibrarySymbolReference
  };
  PEBuilder: LibrarySymbolReference & {
    Section: LibrarySymbolReference & {
      Characteristics: LibrarySymbolReference;
      Name: LibrarySymbolReference;
      Section: LibrarySymbolReference
    }
  };
  PEDirectoriesBuilder: LibrarySymbolReference & {
    PEDirectoriesBuilder: LibrarySymbolReference;
    AddressOfEntryPoint: LibrarySymbolReference;
    BaseRelocationTable: LibrarySymbolReference;
    BoundImportTable: LibrarySymbolReference;
    CopyrightTable: LibrarySymbolReference;
    CorHeaderTable: LibrarySymbolReference;
    DebugTable: LibrarySymbolReference;
    DelayImportTable: LibrarySymbolReference;
    ExceptionTable: LibrarySymbolReference;
    ExportTable: LibrarySymbolReference;
    GlobalPointerTable: LibrarySymbolReference;
    ImportAddressTable: LibrarySymbolReference;
    ImportTable: LibrarySymbolReference;
    LoadConfigTable: LibrarySymbolReference;
    ResourceTable: LibrarySymbolReference;
    ThreadLocalStorageTable: LibrarySymbolReference
  };
  PEHeader: LibrarySymbolReference & {
    AddressOfEntryPoint: LibrarySymbolReference;
    BaseOfCode: LibrarySymbolReference;
    BaseOfData: LibrarySymbolReference;
    BaseRelocationTableDirectory: LibrarySymbolReference;
    BoundImportTableDirectory: LibrarySymbolReference;
    CertificateTableDirectory: LibrarySymbolReference;
    CheckSum: LibrarySymbolReference;
    CopyrightTableDirectory: LibrarySymbolReference;
    CorHeaderTableDirectory: LibrarySymbolReference;
    DebugTableDirectory: LibrarySymbolReference;
    DelayImportTableDirectory: LibrarySymbolReference;
    DllCharacteristics: LibrarySymbolReference;
    ExceptionTableDirectory: LibrarySymbolReference;
    ExportTableDirectory: LibrarySymbolReference;
    FileAlignment: LibrarySymbolReference;
    GlobalPointerTableDirectory: LibrarySymbolReference;
    ImageBase: LibrarySymbolReference;
    ImportAddressTableDirectory: LibrarySymbolReference;
    ImportTableDirectory: LibrarySymbolReference;
    LoadConfigTableDirectory: LibrarySymbolReference;
    Magic: LibrarySymbolReference;
    MajorImageVersion: LibrarySymbolReference;
    MajorLinkerVersion: LibrarySymbolReference;
    MajorOperatingSystemVersion: LibrarySymbolReference;
    MajorSubsystemVersion: LibrarySymbolReference;
    MinorImageVersion: LibrarySymbolReference;
    MinorLinkerVersion: LibrarySymbolReference;
    MinorOperatingSystemVersion: LibrarySymbolReference;
    MinorSubsystemVersion: LibrarySymbolReference;
    NumberOfRvaAndSizes: LibrarySymbolReference;
    ResourceTableDirectory: LibrarySymbolReference;
    SectionAlignment: LibrarySymbolReference;
    SizeOfCode: LibrarySymbolReference;
    SizeOfHeaders: LibrarySymbolReference;
    SizeOfHeapCommit: LibrarySymbolReference;
    SizeOfHeapReserve: LibrarySymbolReference;
    SizeOfImage: LibrarySymbolReference;
    SizeOfInitializedData: LibrarySymbolReference;
    SizeOfStackCommit: LibrarySymbolReference;
    SizeOfStackReserve: LibrarySymbolReference;
    SizeOfUninitializedData: LibrarySymbolReference;
    Subsystem: LibrarySymbolReference;
    ThreadLocalStorageTableDirectory: LibrarySymbolReference
  };
  PEHeaderBuilder: LibrarySymbolReference & {
    PEHeaderBuilder: LibrarySymbolReference;
    CreateExecutableHeader: LibrarySymbolReference;
    CreateLibraryHeader: LibrarySymbolReference;
    DllCharacteristics: LibrarySymbolReference;
    FileAlignment: LibrarySymbolReference;
    ImageBase: LibrarySymbolReference;
    ImageCharacteristics: LibrarySymbolReference;
    Machine: LibrarySymbolReference;
    MajorImageVersion: LibrarySymbolReference;
    MajorLinkerVersion: LibrarySymbolReference;
    MajorOperatingSystemVersion: LibrarySymbolReference;
    MajorSubsystemVersion: LibrarySymbolReference;
    MinorImageVersion: LibrarySymbolReference;
    MinorLinkerVersion: LibrarySymbolReference;
    MinorOperatingSystemVersion: LibrarySymbolReference;
    MinorSubsystemVersion: LibrarySymbolReference;
    SectionAlignment: LibrarySymbolReference;
    SizeOfHeapCommit: LibrarySymbolReference;
    SizeOfHeapReserve: LibrarySymbolReference;
    SizeOfStackCommit: LibrarySymbolReference;
    SizeOfStackReserve: LibrarySymbolReference;
    Subsystem: LibrarySymbolReference
  };
  PEHeaders: LibrarySymbolReference & {
    PEHeaders: LibrarySymbolReference;
    GetContainingSectionIndex: LibrarySymbolReference;
    TryGetDirectoryOffset: LibrarySymbolReference;
    CoffHeader: LibrarySymbolReference;
    CoffHeaderStartOffset: LibrarySymbolReference;
    CorHeader: LibrarySymbolReference;
    CorHeaderStartOffset: LibrarySymbolReference;
    IsCoffOnly: LibrarySymbolReference;
    IsConsoleApplication: LibrarySymbolReference;
    IsDll: LibrarySymbolReference;
    IsExe: LibrarySymbolReference;
    MetadataSize: LibrarySymbolReference;
    MetadataStartOffset: LibrarySymbolReference;
    PEHeader: LibrarySymbolReference;
    PEHeaderStartOffset: LibrarySymbolReference;
    SectionHeaders: LibrarySymbolReference
  };
  PEMagic: LibrarySymbolReference & {
    PE32: LibrarySymbolReference;
    PE32Plus: LibrarySymbolReference
  };
  PEMemoryBlock: LibrarySymbolReference & {
    GetContent: LibrarySymbolReference;
    GetReader: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Pointer: LibrarySymbolReference
  };
  PEReader: LibrarySymbolReference & {
    PEReader: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetEntireImage: LibrarySymbolReference;
    GetMetadata: LibrarySymbolReference;
    GetSectionData: LibrarySymbolReference;
    ReadCodeViewDebugDirectoryData: LibrarySymbolReference;
    ReadDebugDirectory: LibrarySymbolReference;
    ReadEmbeddedPortablePdbDebugDirectoryData: LibrarySymbolReference;
    ReadPdbChecksumDebugDirectoryData: LibrarySymbolReference;
    TryOpenAssociatedPortablePdb: LibrarySymbolReference;
    HasMetadata: LibrarySymbolReference;
    IsEntireImageAvailable: LibrarySymbolReference;
    IsLoadedImage: LibrarySymbolReference;
    PEHeaders: LibrarySymbolReference
  };
  PEStreamOptions: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    LeaveOpen: LibrarySymbolReference;
    PrefetchMetadata: LibrarySymbolReference;
    PrefetchEntireImage: LibrarySymbolReference;
    IsLoadedImage: LibrarySymbolReference
  };
  PdbChecksumDebugDirectoryData: LibrarySymbolReference & {
    AlgorithmName: LibrarySymbolReference;
    Checksum: LibrarySymbolReference
  };
  ResourceSectionBuilder: LibrarySymbolReference & {
    ResourceSectionBuilder: LibrarySymbolReference;
    Serialize: LibrarySymbolReference
  };
  SectionCharacteristics: LibrarySymbolReference & {
    TypeReg: LibrarySymbolReference;
    TypeDSect: LibrarySymbolReference;
    TypeNoLoad: LibrarySymbolReference;
    TypeGroup: LibrarySymbolReference;
    TypeNoPad: LibrarySymbolReference;
    TypeCopy: LibrarySymbolReference;
    ContainsCode: LibrarySymbolReference;
    ContainsInitializedData: LibrarySymbolReference;
    ContainsUninitializedData: LibrarySymbolReference;
    LinkerOther: LibrarySymbolReference;
    LinkerInfo: LibrarySymbolReference;
    TypeOver: LibrarySymbolReference;
    LinkerRemove: LibrarySymbolReference;
    LinkerComdat: LibrarySymbolReference;
    MemProtected: LibrarySymbolReference;
    NoDeferSpecExc: LibrarySymbolReference;
    GPRel: LibrarySymbolReference;
    MemFardata: LibrarySymbolReference;
    MemSysheap: LibrarySymbolReference;
    Mem16Bit: LibrarySymbolReference;
    MemPurgeable: LibrarySymbolReference;
    MemLocked: LibrarySymbolReference;
    MemPreload: LibrarySymbolReference;
    Align1Bytes: LibrarySymbolReference;
    Align2Bytes: LibrarySymbolReference;
    Align4Bytes: LibrarySymbolReference;
    Align8Bytes: LibrarySymbolReference;
    Align16Bytes: LibrarySymbolReference;
    Align32Bytes: LibrarySymbolReference;
    Align64Bytes: LibrarySymbolReference;
    Align128Bytes: LibrarySymbolReference;
    Align256Bytes: LibrarySymbolReference;
    Align512Bytes: LibrarySymbolReference;
    Align1024Bytes: LibrarySymbolReference;
    Align2048Bytes: LibrarySymbolReference;
    Align4096Bytes: LibrarySymbolReference;
    Align8192Bytes: LibrarySymbolReference;
    AlignMask: LibrarySymbolReference;
    LinkerNRelocOvfl: LibrarySymbolReference;
    MemDiscardable: LibrarySymbolReference;
    MemNotCached: LibrarySymbolReference;
    MemNotPaged: LibrarySymbolReference;
    MemShared: LibrarySymbolReference;
    MemExecute: LibrarySymbolReference;
    MemRead: LibrarySymbolReference;
    MemWrite: LibrarySymbolReference
  };
  SectionHeader: LibrarySymbolReference & {
    Name: LibrarySymbolReference;
    NumberOfLineNumbers: LibrarySymbolReference;
    NumberOfRelocations: LibrarySymbolReference;
    PointerToLineNumbers: LibrarySymbolReference;
    PointerToRawData: LibrarySymbolReference;
    PointerToRelocations: LibrarySymbolReference;
    SectionCharacteristics: LibrarySymbolReference;
    SizeOfRawData: LibrarySymbolReference;
    VirtualAddress: LibrarySymbolReference;
    VirtualSize: LibrarySymbolReference
  };
  SectionLocation: LibrarySymbolReference & {
    SectionLocation: LibrarySymbolReference;
    PointerToRawData: LibrarySymbolReference;
    RelativeVirtualAddress: LibrarySymbolReference
  };
  Subsystem: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Native: LibrarySymbolReference;
    WindowsGui: LibrarySymbolReference;
    WindowsCui: LibrarySymbolReference;
    OS2Cui: LibrarySymbolReference;
    PosixCui: LibrarySymbolReference;
    NativeWindows: LibrarySymbolReference;
    WindowsCEGui: LibrarySymbolReference;
    EfiApplication: LibrarySymbolReference;
    EfiBootServiceDriver: LibrarySymbolReference;
    EfiRuntimeDriver: LibrarySymbolReference;
    EfiRom: LibrarySymbolReference;
    Xbox: LibrarySymbolReference;
    WindowsBootApplication: LibrarySymbolReference
  }
};
const PortableExecutable: PortableExecutableLibrary = createLibrary("System.Reflection.PortableExecutable", {
  Characteristics: {
    kind: "enum",
    members: {
      RelocsStripped: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      ExecutableImage: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      LineNumsStripped: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      LocalSymsStripped: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      AggressiveWSTrim: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      LargeAddressAware: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      BytesReversedLo: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      Bit32Machine: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      DebugStripped: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      RemovableRunFromSwap: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      NetRunFromSwap: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      System: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      Dll: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      UpSystemOnly: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      BytesReversedHi: {
        kind: "field",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
    },
  },
  CodeViewDebugDirectoryData: {
    kind: "struct",
    members: {
      Age: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Guid: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
      Path: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  CoffHeader: {
    kind: "class",
    members: {
      Characteristics: {
        kind: "property",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      Machine: {
        kind: "property",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      NumberOfSections: {
        kind: "property",
        type: () => {
          return System.Int16;
        },
      },
      NumberOfSymbols: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PointerToSymbolTable: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SizeOfOptionalHeader: {
        kind: "property",
        type: () => {
          return System.Int16;
        },
      },
      TimeDateStamp: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  CorFlags: {
    kind: "enum",
    members: {
      ILOnly: {
        kind: "field",
        type: () => {
          return PortableExecutable.CorFlags;
        },
      },
      Requires32Bit: {
        kind: "field",
        type: () => {
          return PortableExecutable.CorFlags;
        },
      },
      ILLibrary: {
        kind: "field",
        type: () => {
          return PortableExecutable.CorFlags;
        },
      },
      StrongNameSigned: {
        kind: "field",
        type: () => {
          return PortableExecutable.CorFlags;
        },
      },
      NativeEntryPoint: {
        kind: "field",
        type: () => {
          return PortableExecutable.CorFlags;
        },
      },
      TrackDebugData: {
        kind: "field",
        type: () => {
          return PortableExecutable.CorFlags;
        },
      },
      Prefers32Bit: {
        kind: "field",
        type: () => {
          return PortableExecutable.CorFlags;
        },
      },
    },
  },
  CorHeader: {
    kind: "class",
    members: {
      CodeManagerTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      EntryPointTokenOrRelativeVirtualAddress: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ExportAddressTableJumpsDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      Flags: {
        kind: "property",
        type: () => {
          return PortableExecutable.CorFlags;
        },
      },
      MajorRuntimeVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      ManagedNativeHeaderDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      MetadataDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      MinorRuntimeVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      ResourcesDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      StrongNameSignatureDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      VtableFixupsDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
    },
    isSealed: true,
  },
  DebugDirectoryBuilder: {
    kind: "class",
    members: {
      DebugDirectoryBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddCodeViewEntry: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddEmbeddedPortablePdbEntry: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddEntry: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddPdbChecksumEntry: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddReproducibleEntry: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  DebugDirectoryEntry: {
    kind: "struct",
    members: {
      DebugDirectoryEntry: {
        kind: "method",
        methodKind: "constructor",
      },
      DataPointer: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      DataRelativeVirtualAddress: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      DataSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsPortableCodeView: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MajorVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      MinorVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      Stamp: {
        kind: "property",
        type: () => {
          return System.UInt32;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return PortableExecutable.DebugDirectoryEntryType;
        },
      },
    },
  },
  DebugDirectoryEntryType: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return PortableExecutable.DebugDirectoryEntryType;
        },
      },
      Coff: {
        kind: "field",
        type: () => {
          return PortableExecutable.DebugDirectoryEntryType;
        },
      },
      CodeView: {
        kind: "field",
        type: () => {
          return PortableExecutable.DebugDirectoryEntryType;
        },
      },
      Reproducible: {
        kind: "field",
        type: () => {
          return PortableExecutable.DebugDirectoryEntryType;
        },
      },
      EmbeddedPortablePdb: {
        kind: "field",
        type: () => {
          return PortableExecutable.DebugDirectoryEntryType;
        },
      },
      PdbChecksum: {
        kind: "field",
        type: () => {
          return PortableExecutable.DebugDirectoryEntryType;
        },
      },
    },
  },
  DirectoryEntry: {
    kind: "struct",
    members: {
      RelativeVirtualAddress: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
      Size: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
      DirectoryEntry: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  DllCharacteristics: {
    kind: "enum",
    members: {
      ProcessInit: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      ProcessTerm: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      ThreadInit: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      ThreadTerm: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      HighEntropyVirtualAddressSpace: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      DynamicBase: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      ForceIntegrity: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      NxCompatible: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      NoIsolation: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      NoSeh: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      NoBind: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      AppContainer: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      WdmDriver: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      ControlFlowGuard: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      TerminalServerAware: {
        kind: "field",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
    },
  },
  Machine: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      I386: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      WceMipsV2: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      Alpha: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      SH3: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      SH3Dsp: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      SH3E: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      SH4: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      SH5: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      Arm: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      Thumb: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      ArmThumb2: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      AM33: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      PowerPC: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      PowerPCFP: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      IA64: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      MIPS16: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      Alpha64: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      MipsFpu: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      MipsFpu16: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      Tricore: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      Ebc: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      RiscV32: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      RiscV64: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      RiscV128: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      LoongArch32: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      LoongArch64: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      Amd64: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      M32R: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      Arm64: {
        kind: "field",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
    },
  },
  ManagedPEBuilder: {
    kind: "class",
    members: {
      ManagedResourcesDataAlignment: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      MappedFieldDataAlignment: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      ManagedPEBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateSections: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDirectories: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SerializeSection: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  PEBuilder: {
    kind: "class",
    members: {
      Section: {
        kind: "struct",
        members: {
          Characteristics: {
            kind: "field",
            type: () => {
              return PortableExecutable.SectionCharacteristics;
            },
            isReadOnly: true,
          },
          Name: {
            kind: "field",
            type: () => {
              return System.String;
            },
            isReadOnly: true,
          },
          Section: {
            kind: "method",
            methodKind: "constructor",
          },
        },
      },
    },
  },
  PEDirectoriesBuilder: {
    kind: "class",
    members: {
      PEDirectoriesBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      AddressOfEntryPoint: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      BaseRelocationTable: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      BoundImportTable: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      CopyrightTable: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      CorHeaderTable: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      DebugTable: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      DelayImportTable: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      ExceptionTable: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      ExportTable: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      GlobalPointerTable: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      ImportAddressTable: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      ImportTable: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      LoadConfigTable: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      ResourceTable: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      ThreadLocalStorageTable: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
    },
    isSealed: true,
  },
  PEHeader: {
    kind: "class",
    members: {
      AddressOfEntryPoint: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      BaseOfCode: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      BaseOfData: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      BaseRelocationTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      BoundImportTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      CertificateTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      CheckSum: {
        kind: "property",
        type: () => {
          return System.UInt32;
        },
      },
      CopyrightTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      CorHeaderTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      DebugTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      DelayImportTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      DllCharacteristics: {
        kind: "property",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      ExceptionTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      ExportTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      FileAlignment: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      GlobalPointerTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      ImageBase: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
      },
      ImportAddressTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      ImportTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      LoadConfigTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      Magic: {
        kind: "property",
        type: () => {
          return PortableExecutable.PEMagic;
        },
      },
      MajorImageVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      MajorLinkerVersion: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      MajorOperatingSystemVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      MajorSubsystemVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      MinorImageVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      MinorLinkerVersion: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      MinorOperatingSystemVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      MinorSubsystemVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      NumberOfRvaAndSizes: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ResourceTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
      SectionAlignment: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SizeOfCode: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SizeOfHeaders: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SizeOfHeapCommit: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
      },
      SizeOfHeapReserve: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
      },
      SizeOfImage: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SizeOfInitializedData: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SizeOfStackCommit: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
      },
      SizeOfStackReserve: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
      },
      SizeOfUninitializedData: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Subsystem: {
        kind: "property",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
      ThreadLocalStorageTableDirectory: {
        kind: "property",
        type: () => {
          return PortableExecutable.DirectoryEntry;
        },
      },
    },
    isSealed: true,
  },
  PEHeaderBuilder: {
    kind: "class",
    members: {
      PEHeaderBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateExecutableHeader: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateLibraryHeader: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DllCharacteristics: {
        kind: "property",
        type: () => {
          return PortableExecutable.DllCharacteristics;
        },
      },
      FileAlignment: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ImageBase: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
      },
      ImageCharacteristics: {
        kind: "property",
        type: () => {
          return PortableExecutable.Characteristics;
        },
      },
      Machine: {
        kind: "property",
        type: () => {
          return PortableExecutable.Machine;
        },
      },
      MajorImageVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      MajorLinkerVersion: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      MajorOperatingSystemVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      MajorSubsystemVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      MinorImageVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      MinorLinkerVersion: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      MinorOperatingSystemVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      MinorSubsystemVersion: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      SectionAlignment: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SizeOfHeapCommit: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
      },
      SizeOfHeapReserve: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
      },
      SizeOfStackCommit: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
      },
      SizeOfStackReserve: {
        kind: "property",
        type: () => {
          return System.UInt64;
        },
      },
      Subsystem: {
        kind: "property",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
    },
    isSealed: true,
  },
  PEHeaders: {
    kind: "class",
    members: {
      PEHeaders: {
        kind: "method",
        methodKind: "constructor",
      },
      GetContainingSectionIndex: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetDirectoryOffset: {
        kind: "method",
        methodKind: "ordinary",
      },
      CoffHeader: {
        kind: "property",
        type: () => {
          return PortableExecutable.CoffHeader;
        },
      },
      CoffHeaderStartOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      CorHeader: {
        kind: "property",
        type: () => {
          return PortableExecutable.CorHeader;
        },
      },
      CorHeaderStartOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsCoffOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsConsoleApplication: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsDll: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsExe: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MetadataSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MetadataStartOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PEHeader: {
        kind: "property",
        type: () => {
          return PortableExecutable.PEHeader;
        },
      },
      PEHeaderStartOffset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SectionHeaders: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
    },
    isSealed: true,
  },
  PEMagic: {
    kind: "enum",
    members: {
      PE32: {
        kind: "field",
        type: () => {
          return PortableExecutable.PEMagic;
        },
      },
      PE32Plus: {
        kind: "field",
        type: () => {
          return PortableExecutable.PEMagic;
        },
      },
    },
  },
  PEMemoryBlock: {
    kind: "struct",
    members: {
      GetContent: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetReader: {
        kind: "method",
        methodKind: "ordinary",
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Pointer: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
    },
  },
  PEReader: {
    kind: "class",
    members: {
      PEReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEntireImage: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetMetadata: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSectionData: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadCodeViewDebugDirectoryData: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadDebugDirectory: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadEmbeddedPortablePdbDebugDirectoryData: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadPdbChecksumDebugDirectoryData: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryOpenAssociatedPortablePdb: {
        kind: "method",
        methodKind: "ordinary",
      },
      HasMetadata: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsEntireImageAvailable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsLoadedImage: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PEHeaders: {
        kind: "property",
        type: () => {
          return PortableExecutable.PEHeaders;
        },
      },
    },
    isSealed: true,
  },
  PEStreamOptions: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return PortableExecutable.PEStreamOptions;
        },
      },
      LeaveOpen: {
        kind: "field",
        type: () => {
          return PortableExecutable.PEStreamOptions;
        },
      },
      PrefetchMetadata: {
        kind: "field",
        type: () => {
          return PortableExecutable.PEStreamOptions;
        },
      },
      PrefetchEntireImage: {
        kind: "field",
        type: () => {
          return PortableExecutable.PEStreamOptions;
        },
      },
      IsLoadedImage: {
        kind: "field",
        type: () => {
          return PortableExecutable.PEStreamOptions;
        },
      },
    },
  },
  PdbChecksumDebugDirectoryData: {
    kind: "struct",
    members: {
      AlgorithmName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Checksum: {
        kind: "property",
        type: () => {
          return Immutable.ImmutableArray;
        },
      },
    },
  },
  ResourceSectionBuilder: {
    kind: "class",
    members: {
      ResourceSectionBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      Serialize: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  SectionCharacteristics: {
    kind: "enum",
    members: {
      TypeReg: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      TypeDSect: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      TypeNoLoad: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      TypeGroup: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      TypeNoPad: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      TypeCopy: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      ContainsCode: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      ContainsInitializedData: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      ContainsUninitializedData: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      LinkerOther: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      LinkerInfo: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      TypeOver: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      LinkerRemove: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      LinkerComdat: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      MemProtected: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      NoDeferSpecExc: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      GPRel: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      MemFardata: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      MemSysheap: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Mem16Bit: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      MemPurgeable: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      MemLocked: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      MemPreload: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Align1Bytes: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Align2Bytes: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Align4Bytes: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Align8Bytes: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Align16Bytes: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Align32Bytes: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Align64Bytes: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Align128Bytes: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Align256Bytes: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Align512Bytes: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Align1024Bytes: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Align2048Bytes: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Align4096Bytes: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      Align8192Bytes: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      AlignMask: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      LinkerNRelocOvfl: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      MemDiscardable: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      MemNotCached: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      MemNotPaged: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      MemShared: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      MemExecute: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      MemRead: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      MemWrite: {
        kind: "field",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
    },
  },
  SectionHeader: {
    kind: "struct",
    members: {
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      NumberOfLineNumbers: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      NumberOfRelocations: {
        kind: "property",
        type: () => {
          return System.UInt16;
        },
      },
      PointerToLineNumbers: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PointerToRawData: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PointerToRelocations: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SectionCharacteristics: {
        kind: "property",
        type: () => {
          return PortableExecutable.SectionCharacteristics;
        },
      },
      SizeOfRawData: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      VirtualAddress: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      VirtualSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  SectionLocation: {
    kind: "struct",
    members: {
      SectionLocation: {
        kind: "method",
        methodKind: "constructor",
      },
      PointerToRawData: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      RelativeVirtualAddress: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  Subsystem: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
      Native: {
        kind: "field",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
      WindowsGui: {
        kind: "field",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
      WindowsCui: {
        kind: "field",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
      OS2Cui: {
        kind: "field",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
      PosixCui: {
        kind: "field",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
      NativeWindows: {
        kind: "field",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
      WindowsCEGui: {
        kind: "field",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
      EfiApplication: {
        kind: "field",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
      EfiBootServiceDriver: {
        kind: "field",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
      EfiRuntimeDriver: {
        kind: "field",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
      EfiRom: {
        kind: "field",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
      Xbox: {
        kind: "field",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
      WindowsBootApplication: {
        kind: "field",
        type: () => {
          return PortableExecutable.Subsystem;
        },
      },
    },
  },
});
export default PortableExecutable
