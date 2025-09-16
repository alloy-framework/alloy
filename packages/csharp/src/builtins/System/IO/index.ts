import SafeHandles from "../../Microsoft/Win32/SafeHandles/index.js";
import ObjectModel from "../Collections/ObjectModel/index.js";
import ComponentModel from "../ComponentModel/index.js";
import System from "../index.js";
import Text from "../Text/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Compression } from "./Compression/index.js";
export { default as Enumeration } from "./Enumeration/index.js";
export { default as IsolatedStorage } from "./IsolatedStorage/index.js";
export { default as MemoryMappedFiles } from "./MemoryMappedFiles/index.js";
export { default as Pipelines } from "./Pipelines/index.js";
export { default as Pipes } from "./Pipes/index.js";

type IOLibrary = LibrarySymbolReference & {
  BinaryReader: LibrarySymbolReference & {
    BinaryReader: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    FillBuffer: LibrarySymbolReference;
    PeekChar: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    Read7BitEncodedInt: LibrarySymbolReference;
    Read7BitEncodedInt64: LibrarySymbolReference;
    ReadBoolean: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    ReadBytes: LibrarySymbolReference;
    ReadChar: LibrarySymbolReference;
    ReadChars: LibrarySymbolReference;
    ReadDecimal: LibrarySymbolReference;
    ReadDouble: LibrarySymbolReference;
    ReadHalf: LibrarySymbolReference;
    ReadInt16: LibrarySymbolReference;
    ReadInt32: LibrarySymbolReference;
    ReadInt64: LibrarySymbolReference;
    ReadSByte: LibrarySymbolReference;
    ReadSingle: LibrarySymbolReference;
    ReadString: LibrarySymbolReference;
    ReadUInt16: LibrarySymbolReference;
    ReadUInt32: LibrarySymbolReference;
    ReadUInt64: LibrarySymbolReference;
    BaseStream: LibrarySymbolReference
  };
  BinaryWriter: LibrarySymbolReference & {
    Null: LibrarySymbolReference;
    OutStream: LibrarySymbolReference;
    BinaryWriter: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    Write7BitEncodedInt: LibrarySymbolReference;
    Write7BitEncodedInt64: LibrarySymbolReference;
    BaseStream: LibrarySymbolReference
  };
  BufferedStream: LibrarySymbolReference & {
    BufferedStream: LibrarySymbolReference;
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
    BufferSize: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanSeek: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Position: LibrarySymbolReference;
    UnderlyingStream: LibrarySymbolReference
  };
  Directory: LibrarySymbolReference & {
    CreateDirectory: LibrarySymbolReference;
    CreateSymbolicLink: LibrarySymbolReference;
    CreateTempSubdirectory: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    EnumerateDirectories: LibrarySymbolReference;
    EnumerateFiles: LibrarySymbolReference;
    EnumerateFileSystemEntries: LibrarySymbolReference;
    Exists: LibrarySymbolReference;
    GetCreationTime: LibrarySymbolReference;
    GetCreationTimeUtc: LibrarySymbolReference;
    GetCurrentDirectory: LibrarySymbolReference;
    GetDirectories: LibrarySymbolReference;
    GetDirectoryRoot: LibrarySymbolReference;
    GetFiles: LibrarySymbolReference;
    GetFileSystemEntries: LibrarySymbolReference;
    GetLastAccessTime: LibrarySymbolReference;
    GetLastAccessTimeUtc: LibrarySymbolReference;
    GetLastWriteTime: LibrarySymbolReference;
    GetLastWriteTimeUtc: LibrarySymbolReference;
    GetLogicalDrives: LibrarySymbolReference;
    GetParent: LibrarySymbolReference;
    Move: LibrarySymbolReference;
    ResolveLinkTarget: LibrarySymbolReference;
    SetCreationTime: LibrarySymbolReference;
    SetCreationTimeUtc: LibrarySymbolReference;
    SetCurrentDirectory: LibrarySymbolReference;
    SetLastAccessTime: LibrarySymbolReference;
    SetLastAccessTimeUtc: LibrarySymbolReference;
    SetLastWriteTime: LibrarySymbolReference;
    SetLastWriteTimeUtc: LibrarySymbolReference
  };
  DirectoryInfo: LibrarySymbolReference & {
    DirectoryInfo: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    CreateSubdirectory: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    EnumerateDirectories: LibrarySymbolReference;
    EnumerateFiles: LibrarySymbolReference;
    EnumerateFileSystemInfos: LibrarySymbolReference;
    GetDirectories: LibrarySymbolReference;
    GetFiles: LibrarySymbolReference;
    GetFileSystemInfos: LibrarySymbolReference;
    MoveTo: LibrarySymbolReference;
    Exists: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Parent: LibrarySymbolReference;
    Root: LibrarySymbolReference
  };
  DirectoryNotFoundException: LibrarySymbolReference & {
    DirectoryNotFoundException: LibrarySymbolReference
  };
  DriveInfo: LibrarySymbolReference & {
    DriveInfo: LibrarySymbolReference;
    GetDrives: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    AvailableFreeSpace: LibrarySymbolReference;
    DriveFormat: LibrarySymbolReference;
    DriveType: LibrarySymbolReference;
    IsReady: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    RootDirectory: LibrarySymbolReference;
    TotalFreeSpace: LibrarySymbolReference;
    TotalSize: LibrarySymbolReference;
    VolumeLabel: LibrarySymbolReference
  };
  DriveNotFoundException: LibrarySymbolReference & {
    DriveNotFoundException: LibrarySymbolReference
  };
  DriveType: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    NoRootDirectory: LibrarySymbolReference;
    Removable: LibrarySymbolReference;
    Fixed: LibrarySymbolReference;
    Network: LibrarySymbolReference;
    CDRom: LibrarySymbolReference;
    Ram: LibrarySymbolReference
  };
  EndOfStreamException: LibrarySymbolReference & {
    EndOfStreamException: LibrarySymbolReference
  };
  EnumerationOptions: LibrarySymbolReference & {
    EnumerationOptions: LibrarySymbolReference;
    AttributesToSkip: LibrarySymbolReference;
    BufferSize: LibrarySymbolReference;
    IgnoreInaccessible: LibrarySymbolReference;
    MatchCasing: LibrarySymbolReference;
    MatchType: LibrarySymbolReference;
    MaxRecursionDepth: LibrarySymbolReference;
    RecurseSubdirectories: LibrarySymbolReference;
    ReturnSpecialDirectories: LibrarySymbolReference
  };
  ErrorEventArgs: LibrarySymbolReference & {
    ErrorEventArgs: LibrarySymbolReference;
    GetException: LibrarySymbolReference
  };
  ErrorEventHandler: LibrarySymbolReference & {
    ErrorEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  File: LibrarySymbolReference & {
    AppendAllBytes: LibrarySymbolReference;
    AppendAllBytesAsync: LibrarySymbolReference;
    AppendAllLines: LibrarySymbolReference;
    AppendAllLinesAsync: LibrarySymbolReference;
    AppendAllText: LibrarySymbolReference;
    AppendAllTextAsync: LibrarySymbolReference;
    AppendText: LibrarySymbolReference;
    Copy: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    CreateSymbolicLink: LibrarySymbolReference;
    CreateText: LibrarySymbolReference;
    Decrypt: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    Encrypt: LibrarySymbolReference;
    Exists: LibrarySymbolReference;
    GetAttributes: LibrarySymbolReference;
    GetCreationTime: LibrarySymbolReference;
    GetCreationTimeUtc: LibrarySymbolReference;
    GetLastAccessTime: LibrarySymbolReference;
    GetLastAccessTimeUtc: LibrarySymbolReference;
    GetLastWriteTime: LibrarySymbolReference;
    GetLastWriteTimeUtc: LibrarySymbolReference;
    GetUnixFileMode: LibrarySymbolReference;
    Move: LibrarySymbolReference;
    Open: LibrarySymbolReference;
    OpenHandle: LibrarySymbolReference;
    OpenRead: LibrarySymbolReference;
    OpenText: LibrarySymbolReference;
    OpenWrite: LibrarySymbolReference;
    ReadAllBytes: LibrarySymbolReference;
    ReadAllBytesAsync: LibrarySymbolReference;
    ReadAllLines: LibrarySymbolReference;
    ReadAllLinesAsync: LibrarySymbolReference;
    ReadAllText: LibrarySymbolReference;
    ReadAllTextAsync: LibrarySymbolReference;
    ReadLines: LibrarySymbolReference;
    ReadLinesAsync: LibrarySymbolReference;
    Replace: LibrarySymbolReference;
    ResolveLinkTarget: LibrarySymbolReference;
    SetAttributes: LibrarySymbolReference;
    SetCreationTime: LibrarySymbolReference;
    SetCreationTimeUtc: LibrarySymbolReference;
    SetLastAccessTime: LibrarySymbolReference;
    SetLastAccessTimeUtc: LibrarySymbolReference;
    SetLastWriteTime: LibrarySymbolReference;
    SetLastWriteTimeUtc: LibrarySymbolReference;
    SetUnixFileMode: LibrarySymbolReference;
    WriteAllBytes: LibrarySymbolReference;
    WriteAllBytesAsync: LibrarySymbolReference;
    WriteAllLines: LibrarySymbolReference;
    WriteAllLinesAsync: LibrarySymbolReference;
    WriteAllText: LibrarySymbolReference;
    WriteAllTextAsync: LibrarySymbolReference
  };
  FileAccess: LibrarySymbolReference & {
    Read: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    ReadWrite: LibrarySymbolReference
  };
  FileAttributes: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    ReadOnly: LibrarySymbolReference;
    Hidden: LibrarySymbolReference;
    System: LibrarySymbolReference;
    Directory: LibrarySymbolReference;
    Archive: LibrarySymbolReference;
    Device: LibrarySymbolReference;
    Normal: LibrarySymbolReference;
    Temporary: LibrarySymbolReference;
    SparseFile: LibrarySymbolReference;
    ReparsePoint: LibrarySymbolReference;
    Compressed: LibrarySymbolReference;
    Offline: LibrarySymbolReference;
    NotContentIndexed: LibrarySymbolReference;
    Encrypted: LibrarySymbolReference;
    IntegrityStream: LibrarySymbolReference;
    NoScrubData: LibrarySymbolReference
  };
  FileInfo: LibrarySymbolReference & {
    FileInfo: LibrarySymbolReference;
    AppendText: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    CreateText: LibrarySymbolReference;
    Decrypt: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    Encrypt: LibrarySymbolReference;
    MoveTo: LibrarySymbolReference;
    Open: LibrarySymbolReference;
    OpenRead: LibrarySymbolReference;
    OpenText: LibrarySymbolReference;
    OpenWrite: LibrarySymbolReference;
    Replace: LibrarySymbolReference;
    Directory: LibrarySymbolReference;
    DirectoryName: LibrarySymbolReference;
    Exists: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  FileLoadException: LibrarySymbolReference & {
    FileLoadException: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    FileName: LibrarySymbolReference;
    FusionLog: LibrarySymbolReference;
    Message: LibrarySymbolReference
  };
  FileMode: LibrarySymbolReference & {
    CreateNew: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    Open: LibrarySymbolReference;
    OpenOrCreate: LibrarySymbolReference;
    Truncate: LibrarySymbolReference;
    Append: LibrarySymbolReference
  };
  FileNotFoundException: LibrarySymbolReference & {
    FileNotFoundException: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    FileName: LibrarySymbolReference;
    FusionLog: LibrarySymbolReference;
    Message: LibrarySymbolReference
  };
  FileOptions: LibrarySymbolReference & {
    WriteThrough: LibrarySymbolReference;
    None: LibrarySymbolReference;
    Encrypted: LibrarySymbolReference;
    DeleteOnClose: LibrarySymbolReference;
    SequentialScan: LibrarySymbolReference;
    RandomAccess: LibrarySymbolReference;
    Asynchronous: LibrarySymbolReference
  };
  FileShare: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    ReadWrite: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    Inheritable: LibrarySymbolReference
  };
  FileStream: LibrarySymbolReference & {
    FileStream: LibrarySymbolReference;
    BeginRead: LibrarySymbolReference;
    BeginWrite: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    CopyToAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    EndRead: LibrarySymbolReference;
    EndWrite: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
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
    Name: LibrarySymbolReference;
    Position: LibrarySymbolReference;
    SafeFileHandle: LibrarySymbolReference
  };
  FileStreamOptions: LibrarySymbolReference & {
    FileStreamOptions: LibrarySymbolReference;
    Access: LibrarySymbolReference;
    BufferSize: LibrarySymbolReference;
    Mode: LibrarySymbolReference;
    Options: LibrarySymbolReference;
    PreallocationSize: LibrarySymbolReference;
    Share: LibrarySymbolReference;
    UnixCreateMode: LibrarySymbolReference
  };
  FileSystemAclExtensions: LibrarySymbolReference & {
    Create: LibrarySymbolReference;
    CreateDirectory: LibrarySymbolReference;
    GetAccessControl: LibrarySymbolReference;
    SetAccessControl: LibrarySymbolReference
  };
  FileSystemEventArgs: LibrarySymbolReference & {
    FileSystemEventArgs: LibrarySymbolReference;
    ChangeType: LibrarySymbolReference;
    FullPath: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  FileSystemEventHandler: LibrarySymbolReference & {
    FileSystemEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  FileSystemInfo: LibrarySymbolReference & {
    FullPath: LibrarySymbolReference;
    OriginalPath: LibrarySymbolReference;
    FileSystemInfo: LibrarySymbolReference;
    CreateAsSymbolicLink: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    Refresh: LibrarySymbolReference;
    ResolveLinkTarget: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    CreationTime: LibrarySymbolReference;
    CreationTimeUtc: LibrarySymbolReference;
    Exists: LibrarySymbolReference;
    Extension: LibrarySymbolReference;
    FullName: LibrarySymbolReference;
    LastAccessTime: LibrarySymbolReference;
    LastAccessTimeUtc: LibrarySymbolReference;
    LastWriteTime: LibrarySymbolReference;
    LastWriteTimeUtc: LibrarySymbolReference;
    LinkTarget: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    UnixFileMode: LibrarySymbolReference
  };
  FileSystemWatcher: LibrarySymbolReference & {
    FileSystemWatcher: LibrarySymbolReference;
    BeginInit: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EndInit: LibrarySymbolReference;
    OnChanged: LibrarySymbolReference;
    OnCreated: LibrarySymbolReference;
    OnDeleted: LibrarySymbolReference;
    OnError: LibrarySymbolReference;
    OnRenamed: LibrarySymbolReference;
    WaitForChanged: LibrarySymbolReference;
    EnableRaisingEvents: LibrarySymbolReference;
    Filter: LibrarySymbolReference;
    Filters: LibrarySymbolReference;
    IncludeSubdirectories: LibrarySymbolReference;
    InternalBufferSize: LibrarySymbolReference;
    NotifyFilter: LibrarySymbolReference;
    Path: LibrarySymbolReference;
    Site: LibrarySymbolReference;
    SynchronizingObject: LibrarySymbolReference
  };
  HandleInheritability: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Inheritable: LibrarySymbolReference
  };
  IOException: LibrarySymbolReference & {
    IOException: LibrarySymbolReference
  };
  InternalBufferOverflowException: LibrarySymbolReference & {
    InternalBufferOverflowException: LibrarySymbolReference
  };
  InvalidDataException: LibrarySymbolReference & {
    InvalidDataException: LibrarySymbolReference
  };
  MatchCasing: LibrarySymbolReference & {
    PlatformDefault: LibrarySymbolReference;
    CaseSensitive: LibrarySymbolReference;
    CaseInsensitive: LibrarySymbolReference
  };
  MatchType: LibrarySymbolReference & {
    Simple: LibrarySymbolReference;
    Win32: LibrarySymbolReference
  };
  MemoryStream: LibrarySymbolReference & {
    MemoryStream: LibrarySymbolReference;
    BeginRead: LibrarySymbolReference;
    BeginWrite: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    CopyToAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EndRead: LibrarySymbolReference;
    EndWrite: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    GetBuffer: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    ToArray: LibrarySymbolReference;
    TryGetBuffer: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteByte: LibrarySymbolReference;
    WriteTo: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanSeek: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    Capacity: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Position: LibrarySymbolReference
  };
  NotifyFilters: LibrarySymbolReference & {
    FileName: LibrarySymbolReference;
    DirectoryName: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    Size: LibrarySymbolReference;
    LastWrite: LibrarySymbolReference;
    LastAccess: LibrarySymbolReference;
    CreationTime: LibrarySymbolReference;
    Security: LibrarySymbolReference
  };
  Path: LibrarySymbolReference & {
    AltDirectorySeparatorChar: LibrarySymbolReference;
    DirectorySeparatorChar: LibrarySymbolReference;
    InvalidPathChars: LibrarySymbolReference;
    PathSeparator: LibrarySymbolReference;
    VolumeSeparatorChar: LibrarySymbolReference;
    ChangeExtension: LibrarySymbolReference;
    Combine: LibrarySymbolReference;
    EndsInDirectorySeparator: LibrarySymbolReference;
    Exists: LibrarySymbolReference;
    GetDirectoryName: LibrarySymbolReference;
    GetExtension: LibrarySymbolReference;
    GetFileName: LibrarySymbolReference;
    GetFileNameWithoutExtension: LibrarySymbolReference;
    GetFullPath: LibrarySymbolReference;
    GetInvalidFileNameChars: LibrarySymbolReference;
    GetInvalidPathChars: LibrarySymbolReference;
    GetPathRoot: LibrarySymbolReference;
    GetRandomFileName: LibrarySymbolReference;
    GetRelativePath: LibrarySymbolReference;
    GetTempFileName: LibrarySymbolReference;
    GetTempPath: LibrarySymbolReference;
    HasExtension: LibrarySymbolReference;
    IsPathFullyQualified: LibrarySymbolReference;
    IsPathRooted: LibrarySymbolReference;
    Join: LibrarySymbolReference;
    TrimEndingDirectorySeparator: LibrarySymbolReference;
    TryJoin: LibrarySymbolReference
  };
  PathTooLongException: LibrarySymbolReference & {
    PathTooLongException: LibrarySymbolReference
  };
  RandomAccess: LibrarySymbolReference & {
    FlushToDisk: LibrarySymbolReference;
    GetLength: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference
  };
  RenamedEventArgs: LibrarySymbolReference & {
    RenamedEventArgs: LibrarySymbolReference;
    OldFullPath: LibrarySymbolReference;
    OldName: LibrarySymbolReference
  };
  RenamedEventHandler: LibrarySymbolReference & {
    RenamedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  SearchOption: LibrarySymbolReference & {
    TopDirectoryOnly: LibrarySymbolReference;
    AllDirectories: LibrarySymbolReference
  };
  SeekOrigin: LibrarySymbolReference & {
    Begin: LibrarySymbolReference;
    Current: LibrarySymbolReference;
    End: LibrarySymbolReference
  };
  Stream: LibrarySymbolReference & {
    Null: LibrarySymbolReference;
    Stream: LibrarySymbolReference;
    BeginRead: LibrarySymbolReference;
    BeginWrite: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    CopyToAsync: LibrarySymbolReference;
    CreateWaitHandle: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    EndRead: LibrarySymbolReference;
    EndWrite: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    ObjectInvariant: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadAtLeast: LibrarySymbolReference;
    ReadAtLeastAsync: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    ReadExactly: LibrarySymbolReference;
    ReadExactlyAsync: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    Synchronized: LibrarySymbolReference;
    ValidateBufferArguments: LibrarySymbolReference;
    ValidateCopyToArguments: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteByte: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanSeek: LibrarySymbolReference;
    CanTimeout: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Position: LibrarySymbolReference;
    ReadTimeout: LibrarySymbolReference;
    WriteTimeout: LibrarySymbolReference
  };
  StreamReader: LibrarySymbolReference & {
    Null: LibrarySymbolReference;
    StreamReader: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    DiscardBufferedData: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Peek: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadBlock: LibrarySymbolReference;
    ReadBlockAsync: LibrarySymbolReference;
    ReadLine: LibrarySymbolReference;
    ReadLineAsync: LibrarySymbolReference;
    ReadToEnd: LibrarySymbolReference;
    ReadToEndAsync: LibrarySymbolReference;
    BaseStream: LibrarySymbolReference;
    CurrentEncoding: LibrarySymbolReference;
    EndOfStream: LibrarySymbolReference
  };
  StreamWriter: LibrarySymbolReference & {
    Null: LibrarySymbolReference;
    StreamWriter: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteLine: LibrarySymbolReference;
    WriteLineAsync: LibrarySymbolReference;
    AutoFlush: LibrarySymbolReference;
    BaseStream: LibrarySymbolReference;
    Encoding: LibrarySymbolReference
  };
  StringReader: LibrarySymbolReference & {
    StringReader: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Peek: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadBlock: LibrarySymbolReference;
    ReadBlockAsync: LibrarySymbolReference;
    ReadLine: LibrarySymbolReference;
    ReadLineAsync: LibrarySymbolReference;
    ReadToEnd: LibrarySymbolReference;
    ReadToEndAsync: LibrarySymbolReference
  };
  StringWriter: LibrarySymbolReference & {
    StringWriter: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    GetStringBuilder: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteLine: LibrarySymbolReference;
    WriteLineAsync: LibrarySymbolReference;
    Encoding: LibrarySymbolReference
  };
  TextReader: LibrarySymbolReference & {
    Null: LibrarySymbolReference;
    TextReader: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Peek: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadBlock: LibrarySymbolReference;
    ReadBlockAsync: LibrarySymbolReference;
    ReadLine: LibrarySymbolReference;
    ReadLineAsync: LibrarySymbolReference;
    ReadToEnd: LibrarySymbolReference;
    ReadToEndAsync: LibrarySymbolReference;
    Synchronized: LibrarySymbolReference
  };
  TextWriter: LibrarySymbolReference & {
    CoreNewLine: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    TextWriter: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    CreateBroadcasting: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    Synchronized: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteLine: LibrarySymbolReference;
    WriteLineAsync: LibrarySymbolReference;
    Encoding: LibrarySymbolReference;
    FormatProvider: LibrarySymbolReference;
    NewLine: LibrarySymbolReference
  };
  UnixFileMode: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    OtherExecute: LibrarySymbolReference;
    OtherWrite: LibrarySymbolReference;
    OtherRead: LibrarySymbolReference;
    GroupExecute: LibrarySymbolReference;
    GroupWrite: LibrarySymbolReference;
    GroupRead: LibrarySymbolReference;
    UserExecute: LibrarySymbolReference;
    UserWrite: LibrarySymbolReference;
    UserRead: LibrarySymbolReference;
    StickyBit: LibrarySymbolReference;
    SetGroup: LibrarySymbolReference;
    SetUser: LibrarySymbolReference
  };
  UnmanagedMemoryAccessor: LibrarySymbolReference & {
    UnmanagedMemoryAccessor: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Initialize: LibrarySymbolReference;
    ReadBoolean: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    ReadChar: LibrarySymbolReference;
    ReadDecimal: LibrarySymbolReference;
    ReadDouble: LibrarySymbolReference;
    ReadInt16: LibrarySymbolReference;
    ReadInt32: LibrarySymbolReference;
    ReadInt64: LibrarySymbolReference;
    ReadSByte: LibrarySymbolReference;
    ReadSingle: LibrarySymbolReference;
    ReadUInt16: LibrarySymbolReference;
    ReadUInt32: LibrarySymbolReference;
    ReadUInt64: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    Capacity: LibrarySymbolReference;
    IsOpen: LibrarySymbolReference
  };
  UnmanagedMemoryStream: LibrarySymbolReference & {
    UnmanagedMemoryStream: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    Initialize: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    ReadByte: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteByte: LibrarySymbolReference;
    CanRead: LibrarySymbolReference;
    CanSeek: LibrarySymbolReference;
    CanWrite: LibrarySymbolReference;
    Capacity: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Position: LibrarySymbolReference;
    PositionPointer: LibrarySymbolReference
  };
  WaitForChangedResult: LibrarySymbolReference & {
    ChangeType: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    OldName: LibrarySymbolReference;
    TimedOut: LibrarySymbolReference
  };
  WatcherChangeTypes: LibrarySymbolReference & {
    Created: LibrarySymbolReference;
    Deleted: LibrarySymbolReference;
    Changed: LibrarySymbolReference;
    Renamed: LibrarySymbolReference;
    All: LibrarySymbolReference
  }
};
const IO: IOLibrary = createLibrary("System.IO", {
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
  DriveInfo: {
    kind: "class",
    members: {
      DriveInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      GetDrives: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AvailableFreeSpace: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      DriveFormat: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DriveType: {
        kind: "property",
        type: () => {
          return IO.DriveType;
        },
      },
      IsReady: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      RootDirectory: {
        kind: "property",
        type: () => {
          return IO.DirectoryInfo;
        },
      },
      TotalFreeSpace: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      TotalSize: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      VolumeLabel: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  DriveNotFoundException: {
    kind: "class",
    members: {
      DriveNotFoundException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  DriveType: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return IO.DriveType;
        },
      },
      NoRootDirectory: {
        kind: "field",
        type: () => {
          return IO.DriveType;
        },
      },
      Removable: {
        kind: "field",
        type: () => {
          return IO.DriveType;
        },
      },
      Fixed: {
        kind: "field",
        type: () => {
          return IO.DriveType;
        },
      },
      Network: {
        kind: "field",
        type: () => {
          return IO.DriveType;
        },
      },
      CDRom: {
        kind: "field",
        type: () => {
          return IO.DriveType;
        },
      },
      Ram: {
        kind: "field",
        type: () => {
          return IO.DriveType;
        },
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
  ErrorEventArgs: {
    kind: "class",
    members: {
      ErrorEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      GetException: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  ErrorEventHandler: {
    kind: "generic",
    members: {
      ErrorEventHandler: {
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
  FileSystemAclExtensions: {
    kind: "class",
    members: {
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateDirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
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
  FileSystemEventArgs: {
    kind: "class",
    members: {
      FileSystemEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      ChangeType: {
        kind: "property",
        type: () => {
          return IO.WatcherChangeTypes;
        },
      },
      FullPath: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  FileSystemEventHandler: {
    kind: "generic",
    members: {
      FileSystemEventHandler: {
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
  FileSystemWatcher: {
    kind: "class",
    members: {
      FileSystemWatcher: {
        kind: "method",
        methodKind: "constructor",
      },
      BeginInit: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EndInit: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnChanged: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnCreated: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnDeleted: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnError: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnRenamed: {
        kind: "method",
        methodKind: "ordinary",
      },
      WaitForChanged: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnableRaisingEvents: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Filter: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Filters: {
        kind: "property",
        type: () => {
          return ObjectModel.Collection;
        },
      },
      IncludeSubdirectories: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      InternalBufferSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      NotifyFilter: {
        kind: "property",
        type: () => {
          return IO.NotifyFilters;
        },
      },
      Path: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Site: {
        kind: "property",
        type: () => {
          return ComponentModel.ISite;
        },
        isOverride: true,
      },
      SynchronizingObject: {
        kind: "property",
        type: () => {
          return ComponentModel.ISynchronizeInvoke;
        },
        isNullable: true,
      },
    },
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
  InternalBufferOverflowException: {
    kind: "class",
    members: {
      InternalBufferOverflowException: {
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
  NotifyFilters: {
    kind: "enum",
    members: {
      FileName: {
        kind: "field",
        type: () => {
          return IO.NotifyFilters;
        },
      },
      DirectoryName: {
        kind: "field",
        type: () => {
          return IO.NotifyFilters;
        },
      },
      Attributes: {
        kind: "field",
        type: () => {
          return IO.NotifyFilters;
        },
      },
      Size: {
        kind: "field",
        type: () => {
          return IO.NotifyFilters;
        },
      },
      LastWrite: {
        kind: "field",
        type: () => {
          return IO.NotifyFilters;
        },
      },
      LastAccess: {
        kind: "field",
        type: () => {
          return IO.NotifyFilters;
        },
      },
      CreationTime: {
        kind: "field",
        type: () => {
          return IO.NotifyFilters;
        },
      },
      Security: {
        kind: "field",
        type: () => {
          return IO.NotifyFilters;
        },
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
  RenamedEventArgs: {
    kind: "class",
    members: {
      RenamedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      OldFullPath: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      OldName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  RenamedEventHandler: {
    kind: "generic",
    members: {
      RenamedEventHandler: {
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
  UnmanagedMemoryAccessor: {
    kind: "class",
    members: {
      UnmanagedMemoryAccessor: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Initialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadChar: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadSByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadUInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadUInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadUInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
      },
      CanRead: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      CanWrite: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Capacity: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      IsOpen: {
        kind: "property",
        type: () => {
          return System.Boolean;
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
  WaitForChangedResult: {
    kind: "struct",
    members: {
      ChangeType: {
        kind: "property",
        type: () => {
          return IO.WatcherChangeTypes;
        },
        isReadOnly: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isReadOnly: true,
      },
      OldName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isReadOnly: true,
      },
      TimedOut: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
    },
  },
  WatcherChangeTypes: {
    kind: "enum",
    members: {
      Created: {
        kind: "field",
        type: () => {
          return IO.WatcherChangeTypes;
        },
      },
      Deleted: {
        kind: "field",
        type: () => {
          return IO.WatcherChangeTypes;
        },
      },
      Changed: {
        kind: "field",
        type: () => {
          return IO.WatcherChangeTypes;
        },
      },
      Renamed: {
        kind: "field",
        type: () => {
          return IO.WatcherChangeTypes;
        },
      },
      All: {
        kind: "field",
        type: () => {
          return IO.WatcherChangeTypes;
        },
      },
    },
  },
});
export default IO
