import System from "../../System/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as FileIO } from "./FileIO/index.js";

type VisualBasicLibrary = LibrarySymbolReference & {
  AppWinStyle: LibrarySymbolReference & {
    Hide: LibrarySymbolReference;
    NormalFocus: LibrarySymbolReference;
    MinimizedFocus: LibrarySymbolReference;
    MaximizedFocus: LibrarySymbolReference;
    NormalNoFocus: LibrarySymbolReference;
    MinimizedNoFocus: LibrarySymbolReference
  };
  CallType: LibrarySymbolReference & {
    Method: LibrarySymbolReference;
    Get: LibrarySymbolReference;
    Let: LibrarySymbolReference;
    Set: LibrarySymbolReference
  };
  Collection: LibrarySymbolReference & {
    Collection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  ComClassAttribute: LibrarySymbolReference & {
    ComClassAttribute: LibrarySymbolReference;
    ClassID: LibrarySymbolReference;
    EventID: LibrarySymbolReference;
    InterfaceID: LibrarySymbolReference;
    InterfaceShadows: LibrarySymbolReference
  };
  CompareMethod: LibrarySymbolReference & {
    Binary: LibrarySymbolReference;
    Text: LibrarySymbolReference
  };
  Constants: LibrarySymbolReference & {
    vbAbort: LibrarySymbolReference;
    vbAbortRetryIgnore: LibrarySymbolReference;
    vbApplicationModal: LibrarySymbolReference;
    vbArchive: LibrarySymbolReference;
    vbArray: LibrarySymbolReference;
    vbBack: LibrarySymbolReference;
    vbBinaryCompare: LibrarySymbolReference;
    vbBoolean: LibrarySymbolReference;
    vbByte: LibrarySymbolReference;
    vbCancel: LibrarySymbolReference;
    vbCr: LibrarySymbolReference;
    vbCritical: LibrarySymbolReference;
    vbCrLf: LibrarySymbolReference;
    vbCurrency: LibrarySymbolReference;
    vbDate: LibrarySymbolReference;
    vbDecimal: LibrarySymbolReference;
    vbDefaultButton1: LibrarySymbolReference;
    vbDefaultButton2: LibrarySymbolReference;
    vbDefaultButton3: LibrarySymbolReference;
    vbDirectory: LibrarySymbolReference;
    vbDouble: LibrarySymbolReference;
    vbEmpty: LibrarySymbolReference;
    vbExclamation: LibrarySymbolReference;
    vbFalse: LibrarySymbolReference;
    vbFirstFourDays: LibrarySymbolReference;
    vbFirstFullWeek: LibrarySymbolReference;
    vbFirstJan1: LibrarySymbolReference;
    vbFormFeed: LibrarySymbolReference;
    vbFriday: LibrarySymbolReference;
    vbGeneralDate: LibrarySymbolReference;
    vbGet: LibrarySymbolReference;
    vbHidden: LibrarySymbolReference;
    vbHide: LibrarySymbolReference;
    vbHiragana: LibrarySymbolReference;
    vbIgnore: LibrarySymbolReference;
    vbInformation: LibrarySymbolReference;
    vbInteger: LibrarySymbolReference;
    vbKatakana: LibrarySymbolReference;
    vbLet: LibrarySymbolReference;
    vbLf: LibrarySymbolReference;
    vbLinguisticCasing: LibrarySymbolReference;
    vbLong: LibrarySymbolReference;
    vbLongDate: LibrarySymbolReference;
    vbLongTime: LibrarySymbolReference;
    vbLowerCase: LibrarySymbolReference;
    vbMaximizedFocus: LibrarySymbolReference;
    vbMethod: LibrarySymbolReference;
    vbMinimizedFocus: LibrarySymbolReference;
    vbMinimizedNoFocus: LibrarySymbolReference;
    vbMonday: LibrarySymbolReference;
    vbMsgBoxHelp: LibrarySymbolReference;
    vbMsgBoxRight: LibrarySymbolReference;
    vbMsgBoxRtlReading: LibrarySymbolReference;
    vbMsgBoxSetForeground: LibrarySymbolReference;
    vbNarrow: LibrarySymbolReference;
    vbNewLine: LibrarySymbolReference;
    vbNo: LibrarySymbolReference;
    vbNormal: LibrarySymbolReference;
    vbNormalFocus: LibrarySymbolReference;
    vbNormalNoFocus: LibrarySymbolReference;
    vbNull: LibrarySymbolReference;
    vbNullChar: LibrarySymbolReference;
    vbNullString: LibrarySymbolReference;
    vbObject: LibrarySymbolReference;
    vbObjectError: LibrarySymbolReference;
    vbOK: LibrarySymbolReference;
    vbOKCancel: LibrarySymbolReference;
    vbOKOnly: LibrarySymbolReference;
    vbProperCase: LibrarySymbolReference;
    vbQuestion: LibrarySymbolReference;
    vbReadOnly: LibrarySymbolReference;
    vbRetry: LibrarySymbolReference;
    vbRetryCancel: LibrarySymbolReference;
    vbSaturday: LibrarySymbolReference;
    vbSet: LibrarySymbolReference;
    vbShortDate: LibrarySymbolReference;
    vbShortTime: LibrarySymbolReference;
    vbSimplifiedChinese: LibrarySymbolReference;
    vbSingle: LibrarySymbolReference;
    vbString: LibrarySymbolReference;
    vbSunday: LibrarySymbolReference;
    vbSystem: LibrarySymbolReference;
    vbSystemModal: LibrarySymbolReference;
    vbTab: LibrarySymbolReference;
    vbTextCompare: LibrarySymbolReference;
    vbThursday: LibrarySymbolReference;
    vbTraditionalChinese: LibrarySymbolReference;
    vbTrue: LibrarySymbolReference;
    vbTuesday: LibrarySymbolReference;
    vbUpperCase: LibrarySymbolReference;
    vbUseDefault: LibrarySymbolReference;
    vbUserDefinedType: LibrarySymbolReference;
    vbUseSystem: LibrarySymbolReference;
    vbUseSystemDayOfWeek: LibrarySymbolReference;
    vbVariant: LibrarySymbolReference;
    vbVerticalTab: LibrarySymbolReference;
    vbVolume: LibrarySymbolReference;
    vbWednesday: LibrarySymbolReference;
    vbWide: LibrarySymbolReference;
    vbYes: LibrarySymbolReference;
    vbYesNo: LibrarySymbolReference;
    vbYesNoCancel: LibrarySymbolReference
  };
  ControlChars: LibrarySymbolReference & {
    Back: LibrarySymbolReference;
    Cr: LibrarySymbolReference;
    CrLf: LibrarySymbolReference;
    FormFeed: LibrarySymbolReference;
    Lf: LibrarySymbolReference;
    NewLine: LibrarySymbolReference;
    NullChar: LibrarySymbolReference;
    Quote: LibrarySymbolReference;
    Tab: LibrarySymbolReference;
    VerticalTab: LibrarySymbolReference;
    ControlChars: LibrarySymbolReference
  };
  Conversion: LibrarySymbolReference & {
    CTypeDynamic: LibrarySymbolReference;
    ErrorToString: LibrarySymbolReference;
    Fix: LibrarySymbolReference;
    Hex: LibrarySymbolReference;
    Int: LibrarySymbolReference;
    Oct: LibrarySymbolReference;
    Str: LibrarySymbolReference;
    Val: LibrarySymbolReference
  };
  DateAndTime: LibrarySymbolReference & {
    DateAdd: LibrarySymbolReference;
    DateDiff: LibrarySymbolReference;
    DatePart: LibrarySymbolReference;
    DateSerial: LibrarySymbolReference;
    DateValue: LibrarySymbolReference;
    Day: LibrarySymbolReference;
    Hour: LibrarySymbolReference;
    Minute: LibrarySymbolReference;
    Month: LibrarySymbolReference;
    MonthName: LibrarySymbolReference;
    Second: LibrarySymbolReference;
    TimeSerial: LibrarySymbolReference;
    TimeValue: LibrarySymbolReference;
    Weekday: LibrarySymbolReference;
    WeekdayName: LibrarySymbolReference;
    Year: LibrarySymbolReference;
    DateString: LibrarySymbolReference;
    Now: LibrarySymbolReference;
    TimeOfDay: LibrarySymbolReference;
    Timer: LibrarySymbolReference;
    TimeString: LibrarySymbolReference;
    Today: LibrarySymbolReference
  };
  DateFormat: LibrarySymbolReference & {
    GeneralDate: LibrarySymbolReference;
    LongDate: LibrarySymbolReference;
    ShortDate: LibrarySymbolReference;
    LongTime: LibrarySymbolReference;
    ShortTime: LibrarySymbolReference
  };
  DateInterval: LibrarySymbolReference & {
    Year: LibrarySymbolReference;
    Quarter: LibrarySymbolReference;
    Month: LibrarySymbolReference;
    DayOfYear: LibrarySymbolReference;
    Day: LibrarySymbolReference;
    WeekOfYear: LibrarySymbolReference;
    Weekday: LibrarySymbolReference;
    Hour: LibrarySymbolReference;
    Minute: LibrarySymbolReference;
    Second: LibrarySymbolReference
  };
  DueDate: LibrarySymbolReference & {
    EndOfPeriod: LibrarySymbolReference;
    BegOfPeriod: LibrarySymbolReference
  };
  ErrObject: LibrarySymbolReference & {
    Clear: LibrarySymbolReference;
    GetException: LibrarySymbolReference;
    Raise: LibrarySymbolReference;
    Description: LibrarySymbolReference;
    Erl: LibrarySymbolReference;
    HelpContext: LibrarySymbolReference;
    HelpFile: LibrarySymbolReference;
    LastDllError: LibrarySymbolReference;
    Number: LibrarySymbolReference;
    Source: LibrarySymbolReference
  };
  FileAttribute: LibrarySymbolReference & {
    Normal: LibrarySymbolReference;
    ReadOnly: LibrarySymbolReference;
    Hidden: LibrarySymbolReference;
    System: LibrarySymbolReference;
    Volume: LibrarySymbolReference;
    Directory: LibrarySymbolReference;
    Archive: LibrarySymbolReference
  };
  FileSystem: LibrarySymbolReference & {
    ChDir: LibrarySymbolReference;
    ChDrive: LibrarySymbolReference;
    CurDir: LibrarySymbolReference;
    Dir: LibrarySymbolReference;
    EOF: LibrarySymbolReference;
    FileAttr: LibrarySymbolReference;
    FileClose: LibrarySymbolReference;
    FileCopy: LibrarySymbolReference;
    FileDateTime: LibrarySymbolReference;
    FileGet: LibrarySymbolReference;
    FileGetObject: LibrarySymbolReference;
    FileLen: LibrarySymbolReference;
    FileOpen: LibrarySymbolReference;
    FilePut: LibrarySymbolReference;
    FilePutObject: LibrarySymbolReference;
    FileWidth: LibrarySymbolReference;
    FreeFile: LibrarySymbolReference;
    GetAttr: LibrarySymbolReference;
    Input: LibrarySymbolReference;
    InputString: LibrarySymbolReference;
    Kill: LibrarySymbolReference;
    LineInput: LibrarySymbolReference;
    Loc: LibrarySymbolReference;
    Lock: LibrarySymbolReference;
    LOF: LibrarySymbolReference;
    MkDir: LibrarySymbolReference;
    Print: LibrarySymbolReference;
    PrintLine: LibrarySymbolReference;
    Rename: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    RmDir: LibrarySymbolReference;
    Seek: LibrarySymbolReference;
    SetAttr: LibrarySymbolReference;
    SPC: LibrarySymbolReference;
    TAB: LibrarySymbolReference;
    Unlock: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteLine: LibrarySymbolReference
  };
  Financial: LibrarySymbolReference & {
    DDB: LibrarySymbolReference;
    FV: LibrarySymbolReference;
    IPmt: LibrarySymbolReference;
    IRR: LibrarySymbolReference;
    MIRR: LibrarySymbolReference;
    NPer: LibrarySymbolReference;
    NPV: LibrarySymbolReference;
    Pmt: LibrarySymbolReference;
    PPmt: LibrarySymbolReference;
    PV: LibrarySymbolReference;
    Rate: LibrarySymbolReference;
    SLN: LibrarySymbolReference;
    SYD: LibrarySymbolReference
  };
  FirstDayOfWeek: LibrarySymbolReference & {
    System: LibrarySymbolReference;
    Sunday: LibrarySymbolReference;
    Monday: LibrarySymbolReference;
    Tuesday: LibrarySymbolReference;
    Wednesday: LibrarySymbolReference;
    Thursday: LibrarySymbolReference;
    Friday: LibrarySymbolReference;
    Saturday: LibrarySymbolReference
  };
  FirstWeekOfYear: LibrarySymbolReference & {
    System: LibrarySymbolReference;
    Jan1: LibrarySymbolReference;
    FirstFourDays: LibrarySymbolReference;
    FirstFullWeek: LibrarySymbolReference
  };
  Information: LibrarySymbolReference & {
    Erl: LibrarySymbolReference;
    Err: LibrarySymbolReference;
    IsArray: LibrarySymbolReference;
    IsDate: LibrarySymbolReference;
    IsDBNull: LibrarySymbolReference;
    IsError: LibrarySymbolReference;
    IsNothing: LibrarySymbolReference;
    IsNumeric: LibrarySymbolReference;
    IsReference: LibrarySymbolReference;
    LBound: LibrarySymbolReference;
    QBColor: LibrarySymbolReference;
    RGB: LibrarySymbolReference;
    SystemTypeName: LibrarySymbolReference;
    TypeName: LibrarySymbolReference;
    UBound: LibrarySymbolReference;
    VarType: LibrarySymbolReference;
    VbTypeName: LibrarySymbolReference
  };
  Interaction: LibrarySymbolReference & {
    AppActivate: LibrarySymbolReference;
    Beep: LibrarySymbolReference;
    CallByName: LibrarySymbolReference;
    Choose: LibrarySymbolReference;
    Command: LibrarySymbolReference;
    CreateObject: LibrarySymbolReference;
    DeleteSetting: LibrarySymbolReference;
    Environ: LibrarySymbolReference;
    GetAllSettings: LibrarySymbolReference;
    GetObject: LibrarySymbolReference;
    GetSetting: LibrarySymbolReference;
    IIf: LibrarySymbolReference;
    InputBox: LibrarySymbolReference;
    MsgBox: LibrarySymbolReference;
    Partition: LibrarySymbolReference;
    SaveSetting: LibrarySymbolReference;
    Shell: LibrarySymbolReference;
    Switch: LibrarySymbolReference
  };
  MsgBoxResult: LibrarySymbolReference & {
    Ok: LibrarySymbolReference;
    Cancel: LibrarySymbolReference;
    Abort: LibrarySymbolReference;
    Retry: LibrarySymbolReference;
    Ignore: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    No: LibrarySymbolReference
  };
  MsgBoxStyle: LibrarySymbolReference & {
    ApplicationModal: LibrarySymbolReference;
    DefaultButton1: LibrarySymbolReference;
    OkOnly: LibrarySymbolReference;
    OkCancel: LibrarySymbolReference;
    AbortRetryIgnore: LibrarySymbolReference;
    YesNoCancel: LibrarySymbolReference;
    YesNo: LibrarySymbolReference;
    RetryCancel: LibrarySymbolReference;
    Critical: LibrarySymbolReference;
    Question: LibrarySymbolReference;
    Exclamation: LibrarySymbolReference;
    Information: LibrarySymbolReference;
    DefaultButton2: LibrarySymbolReference;
    DefaultButton3: LibrarySymbolReference;
    SystemModal: LibrarySymbolReference;
    MsgBoxHelp: LibrarySymbolReference;
    MsgBoxSetForeground: LibrarySymbolReference;
    MsgBoxRight: LibrarySymbolReference;
    MsgBoxRtlReading: LibrarySymbolReference
  };
  MyGroupCollectionAttribute: LibrarySymbolReference & {
    MyGroupCollectionAttribute: LibrarySymbolReference;
    CreateMethod: LibrarySymbolReference;
    DefaultInstanceAlias: LibrarySymbolReference;
    DisposeMethod: LibrarySymbolReference;
    MyGroupName: LibrarySymbolReference
  };
  OpenAccess: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    ReadWrite: LibrarySymbolReference
  };
  OpenMode: LibrarySymbolReference & {
    Input: LibrarySymbolReference;
    Output: LibrarySymbolReference;
    Random: LibrarySymbolReference;
    Append: LibrarySymbolReference;
    Binary: LibrarySymbolReference
  };
  OpenShare: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    LockReadWrite: LibrarySymbolReference;
    LockWrite: LibrarySymbolReference;
    LockRead: LibrarySymbolReference;
    Shared: LibrarySymbolReference
  };
  Strings: LibrarySymbolReference & {
    Asc: LibrarySymbolReference;
    AscW: LibrarySymbolReference;
    Chr: LibrarySymbolReference;
    ChrW: LibrarySymbolReference;
    Filter: LibrarySymbolReference;
    Format: LibrarySymbolReference;
    FormatCurrency: LibrarySymbolReference;
    FormatDateTime: LibrarySymbolReference;
    FormatNumber: LibrarySymbolReference;
    FormatPercent: LibrarySymbolReference;
    GetChar: LibrarySymbolReference;
    InStr: LibrarySymbolReference;
    InStrRev: LibrarySymbolReference;
    Join: LibrarySymbolReference;
    LCase: LibrarySymbolReference;
    Left: LibrarySymbolReference;
    Len: LibrarySymbolReference;
    LSet: LibrarySymbolReference;
    LTrim: LibrarySymbolReference;
    Mid: LibrarySymbolReference;
    Replace: LibrarySymbolReference;
    Right: LibrarySymbolReference;
    RSet: LibrarySymbolReference;
    RTrim: LibrarySymbolReference;
    Space: LibrarySymbolReference;
    Split: LibrarySymbolReference;
    StrComp: LibrarySymbolReference;
    StrConv: LibrarySymbolReference;
    StrDup: LibrarySymbolReference;
    StrReverse: LibrarySymbolReference;
    Trim: LibrarySymbolReference;
    UCase: LibrarySymbolReference
  };
  TriState: LibrarySymbolReference & {
    UseDefault: LibrarySymbolReference;
    True: LibrarySymbolReference;
    False: LibrarySymbolReference
  };
  VBFixedArrayAttribute: LibrarySymbolReference & {
    VBFixedArrayAttribute: LibrarySymbolReference;
    Bounds: LibrarySymbolReference;
    Length: LibrarySymbolReference
  };
  VBFixedStringAttribute: LibrarySymbolReference & {
    VBFixedStringAttribute: LibrarySymbolReference;
    Length: LibrarySymbolReference
  };
  VBMath: LibrarySymbolReference & {
    Randomize: LibrarySymbolReference;
    Rnd: LibrarySymbolReference
  };
  VariantType: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    Short: LibrarySymbolReference;
    Integer: LibrarySymbolReference;
    Single: LibrarySymbolReference;
    Double: LibrarySymbolReference;
    Currency: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    String: LibrarySymbolReference;
    Object: LibrarySymbolReference;
    Error: LibrarySymbolReference;
    Boolean: LibrarySymbolReference;
    Variant: LibrarySymbolReference;
    DataObject: LibrarySymbolReference;
    Decimal: LibrarySymbolReference;
    Byte: LibrarySymbolReference;
    Char: LibrarySymbolReference;
    Long: LibrarySymbolReference;
    UserDefinedType: LibrarySymbolReference;
    Array: LibrarySymbolReference
  };
  VbStrConv: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Uppercase: LibrarySymbolReference;
    Lowercase: LibrarySymbolReference;
    ProperCase: LibrarySymbolReference;
    Wide: LibrarySymbolReference;
    Narrow: LibrarySymbolReference;
    Katakana: LibrarySymbolReference;
    Hiragana: LibrarySymbolReference;
    SimplifiedChinese: LibrarySymbolReference;
    TraditionalChinese: LibrarySymbolReference;
    LinguisticCasing: LibrarySymbolReference
  }
};
const VisualBasic: VisualBasicLibrary = createLibrary("Microsoft.VisualBasic", {
  AppWinStyle: {
    kind: "enum",
    members: {
      Hide: {
        kind: "field",
        type: () => {
          return VisualBasic.AppWinStyle;
        },
      },
      NormalFocus: {
        kind: "field",
        type: () => {
          return VisualBasic.AppWinStyle;
        },
      },
      MinimizedFocus: {
        kind: "field",
        type: () => {
          return VisualBasic.AppWinStyle;
        },
      },
      MaximizedFocus: {
        kind: "field",
        type: () => {
          return VisualBasic.AppWinStyle;
        },
      },
      NormalNoFocus: {
        kind: "field",
        type: () => {
          return VisualBasic.AppWinStyle;
        },
      },
      MinimizedNoFocus: {
        kind: "field",
        type: () => {
          return VisualBasic.AppWinStyle;
        },
      },
    },
  },
  CallType: {
    kind: "enum",
    members: {
      Method: {
        kind: "field",
        type: () => {
          return VisualBasic.CallType;
        },
      },
      Get: {
        kind: "field",
        type: () => {
          return VisualBasic.CallType;
        },
      },
      Let: {
        kind: "field",
        type: () => {
          return VisualBasic.CallType;
        },
      },
      Set: {
        kind: "field",
        type: () => {
          return VisualBasic.CallType;
        },
      },
    },
  },
  Collection: {
    kind: "class",
    members: {
      Collection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
    isSealed: true,
  },
  ComClassAttribute: {
    kind: "class",
    members: {
      ComClassAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ClassID: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      EventID: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      InterfaceID: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      InterfaceShadows: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  CompareMethod: {
    kind: "enum",
    members: {
      Binary: {
        kind: "field",
        type: () => {
          return VisualBasic.CompareMethod;
        },
      },
      Text: {
        kind: "field",
        type: () => {
          return VisualBasic.CompareMethod;
        },
      },
    },
  },
  Constants: {
    kind: "class",
    members: {
      vbAbort: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxResult;
        },
      },
      vbAbortRetryIgnore: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbApplicationModal: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbArchive: {
        kind: "field",
        type: () => {
          return VisualBasic.FileAttribute;
        },
      },
      vbArray: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbBack: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      vbBinaryCompare: {
        kind: "field",
        type: () => {
          return VisualBasic.CompareMethod;
        },
      },
      vbBoolean: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbByte: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbCancel: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxResult;
        },
      },
      vbCr: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      vbCritical: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbCrLf: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      vbCurrency: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbDate: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbDecimal: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbDefaultButton1: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbDefaultButton2: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbDefaultButton3: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbDirectory: {
        kind: "field",
        type: () => {
          return VisualBasic.FileAttribute;
        },
      },
      vbDouble: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbEmpty: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbExclamation: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbFalse: {
        kind: "field",
        type: () => {
          return VisualBasic.TriState;
        },
      },
      vbFirstFourDays: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstWeekOfYear;
        },
      },
      vbFirstFullWeek: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstWeekOfYear;
        },
      },
      vbFirstJan1: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstWeekOfYear;
        },
      },
      vbFormFeed: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      vbFriday: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      vbGeneralDate: {
        kind: "field",
        type: () => {
          return VisualBasic.DateFormat;
        },
      },
      vbGet: {
        kind: "field",
        type: () => {
          return VisualBasic.CallType;
        },
      },
      vbHidden: {
        kind: "field",
        type: () => {
          return VisualBasic.FileAttribute;
        },
      },
      vbHide: {
        kind: "field",
        type: () => {
          return VisualBasic.AppWinStyle;
        },
      },
      vbHiragana: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      vbIgnore: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxResult;
        },
      },
      vbInformation: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbInteger: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbKatakana: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      vbLet: {
        kind: "field",
        type: () => {
          return VisualBasic.CallType;
        },
      },
      vbLf: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      vbLinguisticCasing: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      vbLong: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbLongDate: {
        kind: "field",
        type: () => {
          return VisualBasic.DateFormat;
        },
      },
      vbLongTime: {
        kind: "field",
        type: () => {
          return VisualBasic.DateFormat;
        },
      },
      vbLowerCase: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      vbMaximizedFocus: {
        kind: "field",
        type: () => {
          return VisualBasic.AppWinStyle;
        },
      },
      vbMethod: {
        kind: "field",
        type: () => {
          return VisualBasic.CallType;
        },
      },
      vbMinimizedFocus: {
        kind: "field",
        type: () => {
          return VisualBasic.AppWinStyle;
        },
      },
      vbMinimizedNoFocus: {
        kind: "field",
        type: () => {
          return VisualBasic.AppWinStyle;
        },
      },
      vbMonday: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      vbMsgBoxHelp: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbMsgBoxRight: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbMsgBoxRtlReading: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbMsgBoxSetForeground: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbNarrow: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      vbNewLine: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      vbNo: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxResult;
        },
      },
      vbNormal: {
        kind: "field",
        type: () => {
          return VisualBasic.FileAttribute;
        },
      },
      vbNormalFocus: {
        kind: "field",
        type: () => {
          return VisualBasic.AppWinStyle;
        },
      },
      vbNormalNoFocus: {
        kind: "field",
        type: () => {
          return VisualBasic.AppWinStyle;
        },
      },
      vbNull: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbNullChar: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      vbNullString: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      vbObject: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbObjectError: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      vbOK: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxResult;
        },
      },
      vbOKCancel: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbOKOnly: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbProperCase: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      vbQuestion: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbReadOnly: {
        kind: "field",
        type: () => {
          return VisualBasic.FileAttribute;
        },
      },
      vbRetry: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxResult;
        },
      },
      vbRetryCancel: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbSaturday: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      vbSet: {
        kind: "field",
        type: () => {
          return VisualBasic.CallType;
        },
      },
      vbShortDate: {
        kind: "field",
        type: () => {
          return VisualBasic.DateFormat;
        },
      },
      vbShortTime: {
        kind: "field",
        type: () => {
          return VisualBasic.DateFormat;
        },
      },
      vbSimplifiedChinese: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      vbSingle: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbString: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbSunday: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      vbSystem: {
        kind: "field",
        type: () => {
          return VisualBasic.FileAttribute;
        },
      },
      vbSystemModal: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbTab: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      vbTextCompare: {
        kind: "field",
        type: () => {
          return VisualBasic.CompareMethod;
        },
      },
      vbThursday: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      vbTraditionalChinese: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      vbTrue: {
        kind: "field",
        type: () => {
          return VisualBasic.TriState;
        },
      },
      vbTuesday: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      vbUpperCase: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      vbUseDefault: {
        kind: "field",
        type: () => {
          return VisualBasic.TriState;
        },
      },
      vbUserDefinedType: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbUseSystem: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstWeekOfYear;
        },
      },
      vbUseSystemDayOfWeek: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      vbVariant: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      vbVerticalTab: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      vbVolume: {
        kind: "field",
        type: () => {
          return VisualBasic.FileAttribute;
        },
      },
      vbWednesday: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      vbWide: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      vbYes: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxResult;
        },
      },
      vbYesNo: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      vbYesNoCancel: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
    },
    isSealed: true,
  },
  ControlChars: {
    kind: "class",
    members: {
      Back: {
        kind: "field",
        type: () => {
          return System.Char;
        },
      },
      Cr: {
        kind: "field",
        type: () => {
          return System.Char;
        },
      },
      CrLf: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      FormFeed: {
        kind: "field",
        type: () => {
          return System.Char;
        },
      },
      Lf: {
        kind: "field",
        type: () => {
          return System.Char;
        },
      },
      NewLine: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      NullChar: {
        kind: "field",
        type: () => {
          return System.Char;
        },
      },
      Quote: {
        kind: "field",
        type: () => {
          return System.Char;
        },
      },
      Tab: {
        kind: "field",
        type: () => {
          return System.Char;
        },
      },
      VerticalTab: {
        kind: "field",
        type: () => {
          return System.Char;
        },
      },
      ControlChars: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  Conversion: {
    kind: "class",
    members: {
      CTypeDynamic: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ErrorToString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Fix: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Hex: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Int: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Oct: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Str: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Val: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  DateAndTime: {
    kind: "class",
    members: {
      DateAdd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DateDiff: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DatePart: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DateSerial: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DateValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Day: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Hour: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Minute: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Month: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MonthName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Second: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TimeSerial: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TimeValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Weekday: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WeekdayName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Year: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DateString: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
      Now: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isStatic: true,
      },
      TimeOfDay: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isStatic: true,
      },
      Timer: {
        kind: "property",
        type: () => {
          return System.Double;
        },
        isStatic: true,
      },
      TimeString: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isStatic: true,
      },
      Today: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  DateFormat: {
    kind: "enum",
    members: {
      GeneralDate: {
        kind: "field",
        type: () => {
          return VisualBasic.DateFormat;
        },
      },
      LongDate: {
        kind: "field",
        type: () => {
          return VisualBasic.DateFormat;
        },
      },
      ShortDate: {
        kind: "field",
        type: () => {
          return VisualBasic.DateFormat;
        },
      },
      LongTime: {
        kind: "field",
        type: () => {
          return VisualBasic.DateFormat;
        },
      },
      ShortTime: {
        kind: "field",
        type: () => {
          return VisualBasic.DateFormat;
        },
      },
    },
  },
  DateInterval: {
    kind: "enum",
    members: {
      Year: {
        kind: "field",
        type: () => {
          return VisualBasic.DateInterval;
        },
      },
      Quarter: {
        kind: "field",
        type: () => {
          return VisualBasic.DateInterval;
        },
      },
      Month: {
        kind: "field",
        type: () => {
          return VisualBasic.DateInterval;
        },
      },
      DayOfYear: {
        kind: "field",
        type: () => {
          return VisualBasic.DateInterval;
        },
      },
      Day: {
        kind: "field",
        type: () => {
          return VisualBasic.DateInterval;
        },
      },
      WeekOfYear: {
        kind: "field",
        type: () => {
          return VisualBasic.DateInterval;
        },
      },
      Weekday: {
        kind: "field",
        type: () => {
          return VisualBasic.DateInterval;
        },
      },
      Hour: {
        kind: "field",
        type: () => {
          return VisualBasic.DateInterval;
        },
      },
      Minute: {
        kind: "field",
        type: () => {
          return VisualBasic.DateInterval;
        },
      },
      Second: {
        kind: "field",
        type: () => {
          return VisualBasic.DateInterval;
        },
      },
    },
  },
  DueDate: {
    kind: "enum",
    members: {
      EndOfPeriod: {
        kind: "field",
        type: () => {
          return VisualBasic.DueDate;
        },
      },
      BegOfPeriod: {
        kind: "field",
        type: () => {
          return VisualBasic.DueDate;
        },
      },
    },
  },
  ErrObject: {
    kind: "class",
    members: {
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetException: {
        kind: "method",
        methodKind: "ordinary",
      },
      Raise: {
        kind: "method",
        methodKind: "ordinary",
      },
      Description: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Erl: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      HelpContext: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      HelpFile: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      LastDllError: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Number: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Source: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  FileAttribute: {
    kind: "enum",
    members: {
      Normal: {
        kind: "field",
        type: () => {
          return VisualBasic.FileAttribute;
        },
      },
      ReadOnly: {
        kind: "field",
        type: () => {
          return VisualBasic.FileAttribute;
        },
      },
      Hidden: {
        kind: "field",
        type: () => {
          return VisualBasic.FileAttribute;
        },
      },
      System: {
        kind: "field",
        type: () => {
          return VisualBasic.FileAttribute;
        },
      },
      Volume: {
        kind: "field",
        type: () => {
          return VisualBasic.FileAttribute;
        },
      },
      Directory: {
        kind: "field",
        type: () => {
          return VisualBasic.FileAttribute;
        },
      },
      Archive: {
        kind: "field",
        type: () => {
          return VisualBasic.FileAttribute;
        },
      },
    },
  },
  FileSystem: {
    kind: "class",
    members: {
      ChDir: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ChDrive: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CurDir: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Dir: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EOF: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FileAttr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FileClose: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FileCopy: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FileDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FileGet: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FileGetObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FileLen: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FileOpen: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FilePut: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FilePutObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FileWidth: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FreeFile: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetAttr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Input: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      InputString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Kill: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LineInput: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Loc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Lock: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LOF: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MkDir: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Print: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PrintLine: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Rename: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RmDir: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Seek: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetAttr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SPC: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TAB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Unlock: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteLine: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  Financial: {
    kind: "class",
    members: {
      DDB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FV: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IPmt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IRR: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MIRR: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NPer: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NPV: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Pmt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PPmt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      PV: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Rate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SLN: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SYD: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  FirstDayOfWeek: {
    kind: "enum",
    members: {
      System: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      Sunday: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      Monday: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      Tuesday: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      Wednesday: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      Thursday: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      Friday: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
      Saturday: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstDayOfWeek;
        },
      },
    },
  },
  FirstWeekOfYear: {
    kind: "enum",
    members: {
      System: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstWeekOfYear;
        },
      },
      Jan1: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstWeekOfYear;
        },
      },
      FirstFourDays: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstWeekOfYear;
        },
      },
      FirstFullWeek: {
        kind: "field",
        type: () => {
          return VisualBasic.FirstWeekOfYear;
        },
      },
    },
  },
  Information: {
    kind: "class",
    members: {
      Erl: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Err: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsArray: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsDate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsDBNull: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsError: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNothing: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNumeric: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsReference: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LBound: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      QBColor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RGB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SystemTypeName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TypeName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UBound: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      VarType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      VbTypeName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  Interaction: {
    kind: "class",
    members: {
      AppActivate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Beep: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CallByName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Choose: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Command: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DeleteSetting: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Environ: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetAllSettings: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetSetting: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IIf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      InputBox: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MsgBox: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Partition: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SaveSetting: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Shell: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Switch: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  MsgBoxResult: {
    kind: "enum",
    members: {
      Ok: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxResult;
        },
      },
      Cancel: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxResult;
        },
      },
      Abort: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxResult;
        },
      },
      Retry: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxResult;
        },
      },
      Ignore: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxResult;
        },
      },
      Yes: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxResult;
        },
      },
      No: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxResult;
        },
      },
    },
  },
  MsgBoxStyle: {
    kind: "enum",
    members: {
      ApplicationModal: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      DefaultButton1: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      OkOnly: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      OkCancel: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      AbortRetryIgnore: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      YesNoCancel: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      YesNo: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      RetryCancel: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      Critical: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      Question: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      Exclamation: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      Information: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      DefaultButton2: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      DefaultButton3: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      SystemModal: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      MsgBoxHelp: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      MsgBoxSetForeground: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      MsgBoxRight: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
      MsgBoxRtlReading: {
        kind: "field",
        type: () => {
          return VisualBasic.MsgBoxStyle;
        },
      },
    },
  },
  MyGroupCollectionAttribute: {
    kind: "class",
    members: {
      MyGroupCollectionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateMethod: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DefaultInstanceAlias: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DisposeMethod: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MyGroupName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  OpenAccess: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return VisualBasic.OpenAccess;
        },
      },
      Read: {
        kind: "field",
        type: () => {
          return VisualBasic.OpenAccess;
        },
      },
      Write: {
        kind: "field",
        type: () => {
          return VisualBasic.OpenAccess;
        },
      },
      ReadWrite: {
        kind: "field",
        type: () => {
          return VisualBasic.OpenAccess;
        },
      },
    },
  },
  OpenMode: {
    kind: "enum",
    members: {
      Input: {
        kind: "field",
        type: () => {
          return VisualBasic.OpenMode;
        },
      },
      Output: {
        kind: "field",
        type: () => {
          return VisualBasic.OpenMode;
        },
      },
      Random: {
        kind: "field",
        type: () => {
          return VisualBasic.OpenMode;
        },
      },
      Append: {
        kind: "field",
        type: () => {
          return VisualBasic.OpenMode;
        },
      },
      Binary: {
        kind: "field",
        type: () => {
          return VisualBasic.OpenMode;
        },
      },
    },
  },
  OpenShare: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return VisualBasic.OpenShare;
        },
      },
      LockReadWrite: {
        kind: "field",
        type: () => {
          return VisualBasic.OpenShare;
        },
      },
      LockWrite: {
        kind: "field",
        type: () => {
          return VisualBasic.OpenShare;
        },
      },
      LockRead: {
        kind: "field",
        type: () => {
          return VisualBasic.OpenShare;
        },
      },
      Shared: {
        kind: "field",
        type: () => {
          return VisualBasic.OpenShare;
        },
      },
    },
  },
  Strings: {
    kind: "class",
    members: {
      Asc: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AscW: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Chr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ChrW: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Filter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Format: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FormatCurrency: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FormatDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FormatNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FormatPercent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetChar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      InStr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      InStrRev: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Join: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LCase: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Left: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Len: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LSet: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LTrim: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Mid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Replace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Right: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RSet: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RTrim: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Space: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Split: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StrComp: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StrConv: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StrDup: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      StrReverse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Trim: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UCase: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  TriState: {
    kind: "enum",
    members: {
      UseDefault: {
        kind: "field",
        type: () => {
          return VisualBasic.TriState;
        },
      },
      True: {
        kind: "field",
        type: () => {
          return VisualBasic.TriState;
        },
      },
      False: {
        kind: "field",
        type: () => {
          return VisualBasic.TriState;
        },
      },
    },
  },
  VBFixedArrayAttribute: {
    kind: "class",
    members: {
      VBFixedArrayAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Bounds: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  VBFixedStringAttribute: {
    kind: "class",
    members: {
      VBFixedStringAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  VBMath: {
    kind: "class",
    members: {
      Randomize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Rnd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isSealed: true,
  },
  VariantType: {
    kind: "enum",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Null: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Short: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Integer: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Single: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Double: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Currency: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Date: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Object: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Error: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Boolean: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Variant: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      DataObject: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Decimal: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Byte: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Char: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Long: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      UserDefinedType: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
      Array: {
        kind: "field",
        type: () => {
          return VisualBasic.VariantType;
        },
      },
    },
  },
  VbStrConv: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      Uppercase: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      Lowercase: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      ProperCase: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      Wide: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      Narrow: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      Katakana: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      Hiragana: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      SimplifiedChinese: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      TraditionalChinese: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
      LinguisticCasing: {
        kind: "field",
        type: () => {
          return VisualBasic.VbStrConv;
        },
      },
    },
  },
});
export default VisualBasic
