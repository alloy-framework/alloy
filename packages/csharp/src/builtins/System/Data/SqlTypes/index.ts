import Globalization from "../../Globalization/index.js";
import System from "../../index.js";
import IO from "../../IO/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type SqlTypesLibrary = LibrarySymbolReference & {
  INullable: LibrarySymbolReference & {
    IsNull: LibrarySymbolReference
  };
  SqlAlreadyFilledException: LibrarySymbolReference & {
    SqlAlreadyFilledException: LibrarySymbolReference
  };
  SqlBinary: LibrarySymbolReference & {
    Null: LibrarySymbolReference;
    SqlBinary: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    Concat: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    GreaterThan: LibrarySymbolReference;
    GreaterThanOrEqual: LibrarySymbolReference;
    LessThan: LibrarySymbolReference;
    LessThanOrEqual: LibrarySymbolReference;
    NotEquals: LibrarySymbolReference;
    ToSqlGuid: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    WrapBytes: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlBoolean: LibrarySymbolReference & {
    False: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    One: LibrarySymbolReference;
    True: LibrarySymbolReference;
    Zero: LibrarySymbolReference;
    SqlBoolean: LibrarySymbolReference;
    And: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    GreaterThan: LibrarySymbolReference;
    GreaterThanOrEquals: LibrarySymbolReference;
    LessThan: LibrarySymbolReference;
    LessThanOrEquals: LibrarySymbolReference;
    NotEquals: LibrarySymbolReference;
    OnesComplement: LibrarySymbolReference;
    Or: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToSqlByte: LibrarySymbolReference;
    ToSqlDecimal: LibrarySymbolReference;
    ToSqlDouble: LibrarySymbolReference;
    ToSqlInt16: LibrarySymbolReference;
    ToSqlInt32: LibrarySymbolReference;
    ToSqlInt64: LibrarySymbolReference;
    ToSqlMoney: LibrarySymbolReference;
    ToSqlSingle: LibrarySymbolReference;
    ToSqlString: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Xor: LibrarySymbolReference;
    ByteValue: LibrarySymbolReference;
    IsFalse: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    IsTrue: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlByte: LibrarySymbolReference & {
    MaxValue: LibrarySymbolReference;
    MinValue: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    Zero: LibrarySymbolReference;
    SqlByte: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    BitwiseAnd: LibrarySymbolReference;
    BitwiseOr: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    GreaterThan: LibrarySymbolReference;
    GreaterThanOrEqual: LibrarySymbolReference;
    LessThan: LibrarySymbolReference;
    LessThanOrEqual: LibrarySymbolReference;
    Mod: LibrarySymbolReference;
    Modulus: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    NotEquals: LibrarySymbolReference;
    OnesComplement: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToSqlBoolean: LibrarySymbolReference;
    ToSqlDecimal: LibrarySymbolReference;
    ToSqlDouble: LibrarySymbolReference;
    ToSqlInt16: LibrarySymbolReference;
    ToSqlInt32: LibrarySymbolReference;
    ToSqlInt64: LibrarySymbolReference;
    ToSqlMoney: LibrarySymbolReference;
    ToSqlSingle: LibrarySymbolReference;
    ToSqlString: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Xor: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlBytes: LibrarySymbolReference & {
    SqlBytes: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    SetNull: LibrarySymbolReference;
    ToSqlBinary: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    Buffer: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    MaxLength: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    Storage: LibrarySymbolReference;
    Stream: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlChars: LibrarySymbolReference & {
    SqlChars: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    SetLength: LibrarySymbolReference;
    SetNull: LibrarySymbolReference;
    ToSqlString: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    Buffer: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    MaxLength: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    Storage: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlCompareOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    IgnoreCase: LibrarySymbolReference;
    IgnoreNonSpace: LibrarySymbolReference;
    IgnoreKanaType: LibrarySymbolReference;
    IgnoreWidth: LibrarySymbolReference;
    BinarySort2: LibrarySymbolReference;
    BinarySort: LibrarySymbolReference
  };
  SqlDateTime: LibrarySymbolReference & {
    MaxValue: LibrarySymbolReference;
    MinValue: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    SQLTicksPerHour: LibrarySymbolReference;
    SQLTicksPerMinute: LibrarySymbolReference;
    SQLTicksPerSecond: LibrarySymbolReference;
    SqlDateTime: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    GreaterThan: LibrarySymbolReference;
    GreaterThanOrEqual: LibrarySymbolReference;
    LessThan: LibrarySymbolReference;
    LessThanOrEqual: LibrarySymbolReference;
    NotEquals: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToSqlString: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    DayTicks: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    TimeTicks: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlDecimal: LibrarySymbolReference & {
    MaxPrecision: LibrarySymbolReference;
    MaxScale: LibrarySymbolReference;
    MaxValue: LibrarySymbolReference;
    MinValue: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    SqlDecimal: LibrarySymbolReference;
    Abs: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AdjustScale: LibrarySymbolReference;
    Ceiling: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    ConvertToPrecScale: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    Floor: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    GreaterThan: LibrarySymbolReference;
    GreaterThanOrEqual: LibrarySymbolReference;
    LessThan: LibrarySymbolReference;
    LessThanOrEqual: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    NotEquals: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    Power: LibrarySymbolReference;
    Round: LibrarySymbolReference;
    Sign: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToDouble: LibrarySymbolReference;
    ToSqlBoolean: LibrarySymbolReference;
    ToSqlByte: LibrarySymbolReference;
    ToSqlDouble: LibrarySymbolReference;
    ToSqlInt16: LibrarySymbolReference;
    ToSqlInt32: LibrarySymbolReference;
    ToSqlInt64: LibrarySymbolReference;
    ToSqlMoney: LibrarySymbolReference;
    ToSqlSingle: LibrarySymbolReference;
    ToSqlString: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Truncate: LibrarySymbolReference;
    WriteTdsValue: LibrarySymbolReference;
    BinData: LibrarySymbolReference;
    Data: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    IsPositive: LibrarySymbolReference;
    Precision: LibrarySymbolReference;
    Scale: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlDouble: LibrarySymbolReference & {
    MaxValue: LibrarySymbolReference;
    MinValue: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    Zero: LibrarySymbolReference;
    SqlDouble: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    GreaterThan: LibrarySymbolReference;
    GreaterThanOrEqual: LibrarySymbolReference;
    LessThan: LibrarySymbolReference;
    LessThanOrEqual: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    NotEquals: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToSqlBoolean: LibrarySymbolReference;
    ToSqlByte: LibrarySymbolReference;
    ToSqlDecimal: LibrarySymbolReference;
    ToSqlInt16: LibrarySymbolReference;
    ToSqlInt32: LibrarySymbolReference;
    ToSqlInt64: LibrarySymbolReference;
    ToSqlMoney: LibrarySymbolReference;
    ToSqlSingle: LibrarySymbolReference;
    ToSqlString: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlGuid: LibrarySymbolReference & {
    Null: LibrarySymbolReference;
    SqlGuid: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    GreaterThan: LibrarySymbolReference;
    GreaterThanOrEqual: LibrarySymbolReference;
    LessThan: LibrarySymbolReference;
    LessThanOrEqual: LibrarySymbolReference;
    NotEquals: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    ToByteArray: LibrarySymbolReference;
    ToSqlBinary: LibrarySymbolReference;
    ToSqlString: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlInt16: LibrarySymbolReference & {
    MaxValue: LibrarySymbolReference;
    MinValue: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    Zero: LibrarySymbolReference;
    SqlInt16: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    BitwiseAnd: LibrarySymbolReference;
    BitwiseOr: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    GreaterThan: LibrarySymbolReference;
    GreaterThanOrEqual: LibrarySymbolReference;
    LessThan: LibrarySymbolReference;
    LessThanOrEqual: LibrarySymbolReference;
    Mod: LibrarySymbolReference;
    Modulus: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    NotEquals: LibrarySymbolReference;
    OnesComplement: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToSqlBoolean: LibrarySymbolReference;
    ToSqlByte: LibrarySymbolReference;
    ToSqlDecimal: LibrarySymbolReference;
    ToSqlDouble: LibrarySymbolReference;
    ToSqlInt32: LibrarySymbolReference;
    ToSqlInt64: LibrarySymbolReference;
    ToSqlMoney: LibrarySymbolReference;
    ToSqlSingle: LibrarySymbolReference;
    ToSqlString: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Xor: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlInt32: LibrarySymbolReference & {
    MaxValue: LibrarySymbolReference;
    MinValue: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    Zero: LibrarySymbolReference;
    SqlInt32: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    BitwiseAnd: LibrarySymbolReference;
    BitwiseOr: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    GreaterThan: LibrarySymbolReference;
    GreaterThanOrEqual: LibrarySymbolReference;
    LessThan: LibrarySymbolReference;
    LessThanOrEqual: LibrarySymbolReference;
    Mod: LibrarySymbolReference;
    Modulus: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    NotEquals: LibrarySymbolReference;
    OnesComplement: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToSqlBoolean: LibrarySymbolReference;
    ToSqlByte: LibrarySymbolReference;
    ToSqlDecimal: LibrarySymbolReference;
    ToSqlDouble: LibrarySymbolReference;
    ToSqlInt16: LibrarySymbolReference;
    ToSqlInt64: LibrarySymbolReference;
    ToSqlMoney: LibrarySymbolReference;
    ToSqlSingle: LibrarySymbolReference;
    ToSqlString: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Xor: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlInt64: LibrarySymbolReference & {
    MaxValue: LibrarySymbolReference;
    MinValue: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    Zero: LibrarySymbolReference;
    SqlInt64: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    BitwiseAnd: LibrarySymbolReference;
    BitwiseOr: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    GreaterThan: LibrarySymbolReference;
    GreaterThanOrEqual: LibrarySymbolReference;
    LessThan: LibrarySymbolReference;
    LessThanOrEqual: LibrarySymbolReference;
    Mod: LibrarySymbolReference;
    Modulus: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    NotEquals: LibrarySymbolReference;
    OnesComplement: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToSqlBoolean: LibrarySymbolReference;
    ToSqlByte: LibrarySymbolReference;
    ToSqlDecimal: LibrarySymbolReference;
    ToSqlDouble: LibrarySymbolReference;
    ToSqlInt16: LibrarySymbolReference;
    ToSqlInt32: LibrarySymbolReference;
    ToSqlMoney: LibrarySymbolReference;
    ToSqlSingle: LibrarySymbolReference;
    ToSqlString: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Xor: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlMoney: LibrarySymbolReference & {
    MaxValue: LibrarySymbolReference;
    MinValue: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    Zero: LibrarySymbolReference;
    SqlMoney: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    FromTdsValue: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetTdsValue: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    GreaterThan: LibrarySymbolReference;
    GreaterThanOrEqual: LibrarySymbolReference;
    LessThan: LibrarySymbolReference;
    LessThanOrEqual: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    NotEquals: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToDecimal: LibrarySymbolReference;
    ToDouble: LibrarySymbolReference;
    ToInt32: LibrarySymbolReference;
    ToInt64: LibrarySymbolReference;
    ToSqlBoolean: LibrarySymbolReference;
    ToSqlByte: LibrarySymbolReference;
    ToSqlDecimal: LibrarySymbolReference;
    ToSqlDouble: LibrarySymbolReference;
    ToSqlInt16: LibrarySymbolReference;
    ToSqlInt32: LibrarySymbolReference;
    ToSqlInt64: LibrarySymbolReference;
    ToSqlSingle: LibrarySymbolReference;
    ToSqlString: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlNotFilledException: LibrarySymbolReference & {
    SqlNotFilledException: LibrarySymbolReference
  };
  SqlNullValueException: LibrarySymbolReference & {
    SqlNullValueException: LibrarySymbolReference
  };
  SqlSingle: LibrarySymbolReference & {
    MaxValue: LibrarySymbolReference;
    MinValue: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    Zero: LibrarySymbolReference;
    SqlSingle: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    GreaterThan: LibrarySymbolReference;
    GreaterThanOrEqual: LibrarySymbolReference;
    LessThan: LibrarySymbolReference;
    LessThanOrEqual: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    NotEquals: LibrarySymbolReference;
    Parse: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToSqlBoolean: LibrarySymbolReference;
    ToSqlByte: LibrarySymbolReference;
    ToSqlDecimal: LibrarySymbolReference;
    ToSqlDouble: LibrarySymbolReference;
    ToSqlInt16: LibrarySymbolReference;
    ToSqlInt32: LibrarySymbolReference;
    ToSqlInt64: LibrarySymbolReference;
    ToSqlMoney: LibrarySymbolReference;
    ToSqlString: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlString: LibrarySymbolReference & {
    BinarySort: LibrarySymbolReference;
    BinarySort2: LibrarySymbolReference;
    IgnoreCase: LibrarySymbolReference;
    IgnoreKanaType: LibrarySymbolReference;
    IgnoreNonSpace: LibrarySymbolReference;
    IgnoreWidth: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    SqlString: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    CompareOptionsFromSqlCompareOptions: LibrarySymbolReference;
    CompareTo: LibrarySymbolReference;
    Concat: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetNonUnicodeBytes: LibrarySymbolReference;
    GetUnicodeBytes: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    GreaterThan: LibrarySymbolReference;
    GreaterThanOrEqual: LibrarySymbolReference;
    LessThan: LibrarySymbolReference;
    LessThanOrEqual: LibrarySymbolReference;
    NotEquals: LibrarySymbolReference;
    ToSqlBoolean: LibrarySymbolReference;
    ToSqlByte: LibrarySymbolReference;
    ToSqlDateTime: LibrarySymbolReference;
    ToSqlDecimal: LibrarySymbolReference;
    ToSqlDouble: LibrarySymbolReference;
    ToSqlGuid: LibrarySymbolReference;
    ToSqlInt16: LibrarySymbolReference;
    ToSqlInt32: LibrarySymbolReference;
    ToSqlInt64: LibrarySymbolReference;
    ToSqlMoney: LibrarySymbolReference;
    ToSqlSingle: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    CompareInfo: LibrarySymbolReference;
    CultureInfo: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    LCID: LibrarySymbolReference;
    SqlCompareOptions: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  SqlTruncateException: LibrarySymbolReference & {
    SqlTruncateException: LibrarySymbolReference
  };
  SqlTypeException: LibrarySymbolReference & {
    SqlTypeException: LibrarySymbolReference
  };
  SqlXml: LibrarySymbolReference & {
    SqlXml: LibrarySymbolReference;
    CreateReader: LibrarySymbolReference;
    GetXsdType: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  StorageState: LibrarySymbolReference & {
    Buffer: LibrarySymbolReference;
    Stream: LibrarySymbolReference;
    UnmanagedBuffer: LibrarySymbolReference
  }
};
const SqlTypes: SqlTypesLibrary = createLibrary("System.Data.SqlTypes", {
  INullable: {
    kind: "interface",
    members: {
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  SqlAlreadyFilledException: {
    kind: "class",
    members: {
      SqlAlreadyFilledException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  SqlBinary: {
    kind: "struct",
    members: {
      Null: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlBinary;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SqlBinary: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Concat: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSqlGuid: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WrapBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  SqlBoolean: {
    kind: "struct",
    members: {
      False: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlBoolean;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Null: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlBoolean;
        },
        isStatic: true,
        isReadOnly: true,
      },
      One: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlBoolean;
        },
        isStatic: true,
        isReadOnly: true,
      },
      True: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlBoolean;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Zero: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlBoolean;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SqlBoolean: {
        kind: "method",
        methodKind: "constructor",
      },
      And: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThanOrEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThanOrEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OnesComplement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Or: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSqlByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlMoney: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Xor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ByteValue: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      IsFalse: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsTrue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  SqlByte: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlByte;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MinValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlByte;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Null: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlByte;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Zero: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlByte;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SqlByte: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitwiseAnd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitwiseOr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Mod: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Modulus: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OnesComplement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSqlBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlMoney: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Xor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
    },
  },
  SqlBytes: {
    kind: "class",
    members: {
      SqlBytes: {
        kind: "method",
        methodKind: "constructor",
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetLength: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetNull: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlBinary: {
        kind: "method",
        methodKind: "ordinary",
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
      },
      Buffer: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      MaxLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      Null: {
        kind: "property",
        type: () => {
          return SqlTypes.SqlBytes;
        },
        isStatic: true,
      },
      Storage: {
        kind: "property",
        type: () => {
          return SqlTypes.StorageState;
        },
      },
      Stream: {
        kind: "property",
        type: () => {
          return IO.Stream;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
    isSealed: true,
  },
  SqlChars: {
    kind: "class",
    members: {
      SqlChars: {
        kind: "method",
        methodKind: "constructor",
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetLength: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetNull: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
      },
      Buffer: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Char;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      MaxLength: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      Null: {
        kind: "property",
        type: () => {
          return SqlTypes.SqlChars;
        },
        isStatic: true,
      },
      Storage: {
        kind: "property",
        type: () => {
          return SqlTypes.StorageState;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
    isSealed: true,
  },
  SqlCompareOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlCompareOptions;
        },
      },
      IgnoreCase: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlCompareOptions;
        },
      },
      IgnoreNonSpace: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlCompareOptions;
        },
      },
      IgnoreKanaType: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlCompareOptions;
        },
      },
      IgnoreWidth: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlCompareOptions;
        },
      },
      BinarySort2: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlCompareOptions;
        },
      },
      BinarySort: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlCompareOptions;
        },
      },
    },
  },
  SqlDateTime: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlDateTime;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MinValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlDateTime;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Null: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlDateTime;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SQLTicksPerHour: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SQLTicksPerMinute: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SQLTicksPerSecond: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SqlDateTime: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSqlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DayTicks: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      TimeTicks: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
    },
  },
  SqlDecimal: {
    kind: "struct",
    members: {
      MaxPrecision: {
        kind: "field",
        type: () => {
          return System.Byte;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MaxScale: {
        kind: "field",
        type: () => {
          return System.Byte;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MaxValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlDecimal;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MinValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlDecimal;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Null: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlDecimal;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SqlDecimal: {
        kind: "method",
        methodKind: "constructor",
      },
      Abs: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AdjustScale: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ceiling: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      ConvertToPrecScale: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Floor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Power: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Sign: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlMoney: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WriteTdsValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      BinData: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      Data: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsPositive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Precision: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      Scale: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Decimal;
        },
      },
    },
  },
  SqlDouble: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlDouble;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MinValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlDouble;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Null: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlDouble;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Zero: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlDouble;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SqlDouble: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSqlBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlMoney: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Double;
        },
      },
    },
  },
  SqlGuid: {
    kind: "struct",
    members: {
      Null: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlGuid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SqlGuid: {
        kind: "method",
        methodKind: "constructor",
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToByteArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlBinary: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
    },
  },
  SqlInt16: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlInt16;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MinValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlInt16;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Null: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlInt16;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Zero: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlInt16;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SqlInt16: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitwiseAnd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitwiseOr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Mod: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Modulus: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OnesComplement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSqlBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlMoney: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Xor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Int16;
        },
      },
    },
  },
  SqlInt32: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlInt32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MinValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlInt32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Null: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlInt32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Zero: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlInt32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SqlInt32: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitwiseAnd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitwiseOr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Mod: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Modulus: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OnesComplement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSqlBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlMoney: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Xor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  SqlInt64: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlInt64;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MinValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlInt64;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Null: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlInt64;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Zero: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlInt64;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SqlInt64: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitwiseAnd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      BitwiseOr: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Mod: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Modulus: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OnesComplement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSqlBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlMoney: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Xor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  SqlMoney: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlMoney;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MinValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlMoney;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Null: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlMoney;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Zero: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlMoney;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SqlMoney: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromTdsValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetTdsValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Decimal;
        },
      },
    },
  },
  SqlNotFilledException: {
    kind: "class",
    members: {
      SqlNotFilledException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  SqlNullValueException: {
    kind: "class",
    members: {
      SqlNullValueException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  SqlSingle: {
    kind: "struct",
    members: {
      MaxValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlSingle;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MinValue: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlSingle;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Null: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlSingle;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Zero: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlSingle;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SqlSingle: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Divide: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Multiply: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSqlBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlMoney: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Single;
        },
      },
    },
  },
  SqlString: {
    kind: "struct",
    members: {
      BinarySort: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      BinarySort2: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IgnoreCase: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IgnoreKanaType: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IgnoreNonSpace: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IgnoreWidth: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Null: {
        kind: "field",
        type: () => {
          return SqlTypes.SqlString;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SqlString: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      CompareOptionsFromSqlCompareOptions: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Concat: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetNonUnicodeBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUnicodeBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GreaterThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThan: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LessThanOrEqual: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      NotEquals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToSqlBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDateTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlGuid: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlMoney: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSqlSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CompareInfo: {
        kind: "property",
        type: () => {
          return Globalization.CompareInfo;
        },
      },
      CultureInfo: {
        kind: "property",
        type: () => {
          return Globalization.CultureInfo;
        },
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LCID: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SqlCompareOptions: {
        kind: "property",
        type: () => {
          return SqlTypes.SqlCompareOptions;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  SqlTruncateException: {
    kind: "class",
    members: {
      SqlTruncateException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  SqlTypeException: {
    kind: "class",
    members: {
      SqlTypeException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  SqlXml: {
    kind: "class",
    members: {
      SqlXml: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateReader: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetXsdType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Null: {
        kind: "property",
        type: () => {
          return SqlTypes.SqlXml;
        },
        isStatic: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  StorageState: {
    kind: "enum",
    members: {
      Buffer: {
        kind: "field",
        type: () => {
          return SqlTypes.StorageState;
        },
      },
      Stream: {
        kind: "field",
        type: () => {
          return SqlTypes.StorageState;
        },
      },
      UnmanagedBuffer: {
        kind: "field",
        type: () => {
          return SqlTypes.StorageState;
        },
      },
    },
  },
});
export default SqlTypes
