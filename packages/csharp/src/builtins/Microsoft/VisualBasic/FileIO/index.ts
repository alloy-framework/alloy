import ObjectModel from "../../../System/Collections/ObjectModel/index.js";
import System from "../../../System/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type FileIOLibrary = LibrarySymbolReference & {
  DeleteDirectoryOption: LibrarySymbolReference & {
    ThrowIfDirectoryNonEmpty: LibrarySymbolReference;
    DeleteAllContents: LibrarySymbolReference
  };
  FieldType: LibrarySymbolReference & {
    Delimited: LibrarySymbolReference;
    FixedWidth: LibrarySymbolReference
  };
  FileSystem: LibrarySymbolReference & {
    FileSystem: LibrarySymbolReference;
    CombinePath: LibrarySymbolReference;
    CopyDirectory: LibrarySymbolReference;
    CopyFile: LibrarySymbolReference;
    CreateDirectory: LibrarySymbolReference;
    DeleteDirectory: LibrarySymbolReference;
    DeleteFile: LibrarySymbolReference;
    DirectoryExists: LibrarySymbolReference;
    FileExists: LibrarySymbolReference;
    FindInFiles: LibrarySymbolReference;
    GetDirectories: LibrarySymbolReference;
    GetDirectoryInfo: LibrarySymbolReference;
    GetDriveInfo: LibrarySymbolReference;
    GetFileInfo: LibrarySymbolReference;
    GetFiles: LibrarySymbolReference;
    GetName: LibrarySymbolReference;
    GetParentPath: LibrarySymbolReference;
    GetTempFileName: LibrarySymbolReference;
    MoveDirectory: LibrarySymbolReference;
    MoveFile: LibrarySymbolReference;
    OpenTextFieldParser: LibrarySymbolReference;
    OpenTextFileReader: LibrarySymbolReference;
    OpenTextFileWriter: LibrarySymbolReference;
    ReadAllBytes: LibrarySymbolReference;
    ReadAllText: LibrarySymbolReference;
    RenameDirectory: LibrarySymbolReference;
    RenameFile: LibrarySymbolReference;
    WriteAllBytes: LibrarySymbolReference;
    WriteAllText: LibrarySymbolReference;
    CurrentDirectory: LibrarySymbolReference;
    Drives: LibrarySymbolReference
  };
  MalformedLineException: LibrarySymbolReference & {
    MalformedLineException: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    LineNumber: LibrarySymbolReference
  };
  RecycleOption: LibrarySymbolReference & {
    DeletePermanently: LibrarySymbolReference;
    SendToRecycleBin: LibrarySymbolReference
  };
  SearchOption: LibrarySymbolReference & {
    SearchTopLevelOnly: LibrarySymbolReference;
    SearchAllSubDirectories: LibrarySymbolReference
  };
  SpecialDirectories: LibrarySymbolReference & {
    SpecialDirectories: LibrarySymbolReference;
    AllUsersApplicationData: LibrarySymbolReference;
    CurrentUserApplicationData: LibrarySymbolReference;
    Desktop: LibrarySymbolReference;
    MyDocuments: LibrarySymbolReference;
    MyMusic: LibrarySymbolReference;
    MyPictures: LibrarySymbolReference;
    ProgramFiles: LibrarySymbolReference;
    Programs: LibrarySymbolReference;
    Temp: LibrarySymbolReference
  };
  TextFieldParser: LibrarySymbolReference & {
    TextFieldParser: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    PeekChars: LibrarySymbolReference;
    ReadFields: LibrarySymbolReference;
    ReadLine: LibrarySymbolReference;
    ReadToEnd: LibrarySymbolReference;
    SetDelimiters: LibrarySymbolReference;
    SetFieldWidths: LibrarySymbolReference;
    CommentTokens: LibrarySymbolReference;
    Delimiters: LibrarySymbolReference;
    EndOfData: LibrarySymbolReference;
    ErrorLine: LibrarySymbolReference;
    ErrorLineNumber: LibrarySymbolReference;
    FieldWidths: LibrarySymbolReference;
    HasFieldsEnclosedInQuotes: LibrarySymbolReference;
    LineNumber: LibrarySymbolReference;
    TextFieldType: LibrarySymbolReference;
    TrimWhiteSpace: LibrarySymbolReference
  };
  UICancelOption: LibrarySymbolReference & {
    DoNothing: LibrarySymbolReference;
    ThrowException: LibrarySymbolReference
  };
  UIOption: LibrarySymbolReference & {
    OnlyErrorDialogs: LibrarySymbolReference;
    AllDialogs: LibrarySymbolReference
  }
};
const FileIO: FileIOLibrary = createLibrary("Microsoft.VisualBasic.FileIO", {
  DeleteDirectoryOption: {
    kind: "enum",
    members: {
      ThrowIfDirectoryNonEmpty: {
        kind: "field",
        type: () => {
          return FileIO.DeleteDirectoryOption;
        },
      },
      DeleteAllContents: {
        kind: "field",
        type: () => {
          return FileIO.DeleteDirectoryOption;
        },
      },
    },
  },
  FieldType: {
    kind: "enum",
    members: {
      Delimited: {
        kind: "field",
        type: () => {
          return FileIO.FieldType;
        },
      },
      FixedWidth: {
        kind: "field",
        type: () => {
          return FileIO.FieldType;
        },
      },
    },
  },
  FileSystem: {
    kind: "class",
    members: {
      FileSystem: {
        kind: "method",
        methodKind: "constructor",
      },
      CombinePath: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CopyDirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CopyFile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateDirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DeleteDirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DeleteFile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DirectoryExists: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FileExists: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FindInFiles: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDirectories: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDirectoryInfo: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDriveInfo: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFileInfo: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFiles: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetParentPath: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTempFileName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MoveDirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MoveFile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OpenTextFieldParser: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OpenTextFileReader: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OpenTextFileWriter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadAllBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadAllText: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RenameDirectory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RenameFile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteAllBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteAllText: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CurrentDirectory: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
      Drives: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
        isStatic: true,
      },
    },
  },
  MalformedLineException: {
    kind: "class",
    members: {
      MalformedLineException: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      LineNumber: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  RecycleOption: {
    kind: "enum",
    members: {
      DeletePermanently: {
        kind: "field",
        type: () => {
          return FileIO.RecycleOption;
        },
      },
      SendToRecycleBin: {
        kind: "field",
        type: () => {
          return FileIO.RecycleOption;
        },
      },
    },
  },
  SearchOption: {
    kind: "enum",
    members: {
      SearchTopLevelOnly: {
        kind: "field",
        type: () => {
          return FileIO.SearchOption;
        },
      },
      SearchAllSubDirectories: {
        kind: "field",
        type: () => {
          return FileIO.SearchOption;
        },
      },
    },
  },
  SpecialDirectories: {
    kind: "class",
    members: {
      SpecialDirectories: {
        kind: "method",
        methodKind: "constructor",
      },
      AllUsersApplicationData: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
      CurrentUserApplicationData: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
      Desktop: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
      MyDocuments: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
      MyMusic: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
      MyPictures: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
      ProgramFiles: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
      Programs: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
      Temp: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
    },
  },
  TextFieldParser: {
    kind: "class",
    members: {
      TextFieldParser: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      PeekChars: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadFields: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadLine: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadToEnd: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetDelimiters: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetFieldWidths: {
        kind: "method",
        methodKind: "ordinary",
      },
      CommentTokens: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Delimiters: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      EndOfData: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ErrorLine: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ErrorLineNumber: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      FieldWidths: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      HasFieldsEnclosedInQuotes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LineNumber: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      TextFieldType: {
        kind: "property",
        type: () => {
          return FileIO.FieldType;
        },
      },
      TrimWhiteSpace: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  UICancelOption: {
    kind: "enum",
    members: {
      DoNothing: {
        kind: "field",
        type: () => {
          return FileIO.UICancelOption;
        },
      },
      ThrowException: {
        kind: "field",
        type: () => {
          return FileIO.UICancelOption;
        },
      },
    },
  },
  UIOption: {
    kind: "enum",
    members: {
      OnlyErrorDialogs: {
        kind: "field",
        type: () => {
          return FileIO.UIOption;
        },
      },
      AllDialogs: {
        kind: "field",
        type: () => {
          return FileIO.UIOption;
        },
      },
    },
  },
});
export default FileIO
