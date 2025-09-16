import Collections from "../Collections/index.js";
import ComponentModel from "../ComponentModel/index.js";
import Globalization from "../Globalization/index.js";
import System from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Common } from "./Common/index.js";
export { default as SqlTypes } from "./SqlTypes/index.js";

type DataLibrary = LibrarySymbolReference & {
  AcceptRejectRule: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Cascade: LibrarySymbolReference
  };
  CommandBehavior: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    SingleResult: LibrarySymbolReference;
    SchemaOnly: LibrarySymbolReference;
    KeyInfo: LibrarySymbolReference;
    SingleRow: LibrarySymbolReference;
    SequentialAccess: LibrarySymbolReference;
    CloseConnection: LibrarySymbolReference
  };
  CommandType: LibrarySymbolReference & {
    Text: LibrarySymbolReference;
    StoredProcedure: LibrarySymbolReference;
    TableDirect: LibrarySymbolReference
  };
  ConflictOption: LibrarySymbolReference & {
    CompareAllSearchableValues: LibrarySymbolReference;
    CompareRowVersion: LibrarySymbolReference;
    OverwriteChanges: LibrarySymbolReference
  };
  ConnectionState: LibrarySymbolReference & {
    Closed: LibrarySymbolReference;
    Open: LibrarySymbolReference;
    Connecting: LibrarySymbolReference;
    Executing: LibrarySymbolReference;
    Fetching: LibrarySymbolReference;
    Broken: LibrarySymbolReference
  };
  Constraint: LibrarySymbolReference & {
    CheckStateForProperty: LibrarySymbolReference;
    SetDataSet: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ConstraintName: LibrarySymbolReference;
    ExtendedProperties: LibrarySymbolReference;
    Table: LibrarySymbolReference
  };
  ConstraintCollection: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    CanRemove: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    List: LibrarySymbolReference
  };
  ConstraintException: LibrarySymbolReference & {
    ConstraintException: LibrarySymbolReference
  };
  DBConcurrencyException: LibrarySymbolReference & {
    DBConcurrencyException: LibrarySymbolReference;
    CopyToRows: LibrarySymbolReference;
    Row: LibrarySymbolReference;
    RowCount: LibrarySymbolReference
  };
  DataColumn: LibrarySymbolReference & {
    DataColumn: LibrarySymbolReference;
    CheckNotAllowNull: LibrarySymbolReference;
    CheckUnique: LibrarySymbolReference;
    OnPropertyChanging: LibrarySymbolReference;
    RaisePropertyChanging: LibrarySymbolReference;
    SetOrdinal: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    AllowDBNull: LibrarySymbolReference;
    AutoIncrement: LibrarySymbolReference;
    AutoIncrementSeed: LibrarySymbolReference;
    AutoIncrementStep: LibrarySymbolReference;
    Caption: LibrarySymbolReference;
    ColumnMapping: LibrarySymbolReference;
    ColumnName: LibrarySymbolReference;
    DateTimeMode: LibrarySymbolReference;
    Expression: LibrarySymbolReference;
    ExtendedProperties: LibrarySymbolReference;
    MaxLength: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    Ordinal: LibrarySymbolReference;
    Prefix: LibrarySymbolReference;
    ReadOnly: LibrarySymbolReference;
    Table: LibrarySymbolReference;
    Unique: LibrarySymbolReference;
    DataType: LibrarySymbolReference;
    DefaultValue: LibrarySymbolReference
  };
  DataColumnChangeEventArgs: LibrarySymbolReference & {
    DataColumnChangeEventArgs: LibrarySymbolReference;
    Column: LibrarySymbolReference;
    ProposedValue: LibrarySymbolReference;
    Row: LibrarySymbolReference
  };
  DataColumnChangeEventHandler: LibrarySymbolReference & {
    DataColumnChangeEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  DataColumnCollection: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    CanRemove: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    List: LibrarySymbolReference
  };
  DataException: LibrarySymbolReference & {
    DataException: LibrarySymbolReference
  };
  DataReaderExtensions: LibrarySymbolReference & {
    GetBoolean: LibrarySymbolReference;
    GetByte: LibrarySymbolReference;
    GetBytes: LibrarySymbolReference;
    GetChar: LibrarySymbolReference;
    GetChars: LibrarySymbolReference;
    GetDataTypeName: LibrarySymbolReference;
    GetDateTime: LibrarySymbolReference;
    GetDecimal: LibrarySymbolReference;
    GetDouble: LibrarySymbolReference;
    GetFieldType: LibrarySymbolReference;
    GetFloat: LibrarySymbolReference;
    GetGuid: LibrarySymbolReference;
    GetInt16: LibrarySymbolReference;
    GetInt32: LibrarySymbolReference;
    GetInt64: LibrarySymbolReference;
    GetStream: LibrarySymbolReference;
    GetString: LibrarySymbolReference;
    GetTextReader: LibrarySymbolReference;
    GetValue: LibrarySymbolReference;
    IsDBNull: LibrarySymbolReference;
    IsDBNullAsync: LibrarySymbolReference
  };
  DataRelation: LibrarySymbolReference & {
    DataRelation: LibrarySymbolReference;
    CheckStateForProperty: LibrarySymbolReference;
    OnPropertyChanging: LibrarySymbolReference;
    RaisePropertyChanging: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ChildColumns: LibrarySymbolReference;
    ChildKeyConstraint: LibrarySymbolReference;
    ChildTable: LibrarySymbolReference;
    DataSet: LibrarySymbolReference;
    ExtendedProperties: LibrarySymbolReference;
    Nested: LibrarySymbolReference;
    ParentColumns: LibrarySymbolReference;
    ParentKeyConstraint: LibrarySymbolReference;
    ParentTable: LibrarySymbolReference;
    RelationName: LibrarySymbolReference
  };
  DataRelationCollection: LibrarySymbolReference & {
    DataRelationCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AddCore: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    CanRemove: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetDataSet: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    OnCollectionChanged: LibrarySymbolReference;
    OnCollectionChanging: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    RemoveCore: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  DataRow: LibrarySymbolReference & {
    DataRow: LibrarySymbolReference;
    AcceptChanges: LibrarySymbolReference;
    BeginEdit: LibrarySymbolReference;
    CancelEdit: LibrarySymbolReference;
    ClearErrors: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    EndEdit: LibrarySymbolReference;
    GetChildRows: LibrarySymbolReference;
    GetColumnError: LibrarySymbolReference;
    GetColumnsInError: LibrarySymbolReference;
    GetParentRow: LibrarySymbolReference;
    GetParentRows: LibrarySymbolReference;
    HasVersion: LibrarySymbolReference;
    IsNull: LibrarySymbolReference;
    RejectChanges: LibrarySymbolReference;
    SetAdded: LibrarySymbolReference;
    SetColumnError: LibrarySymbolReference;
    SetModified: LibrarySymbolReference;
    SetNull: LibrarySymbolReference;
    SetParentRow: LibrarySymbolReference;
    HasErrors: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    ItemArray: LibrarySymbolReference;
    RowError: LibrarySymbolReference;
    RowState: LibrarySymbolReference;
    Table: LibrarySymbolReference
  };
  DataRowAction: LibrarySymbolReference & {
    Nothing: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    Change: LibrarySymbolReference;
    Rollback: LibrarySymbolReference;
    Commit: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    ChangeOriginal: LibrarySymbolReference;
    ChangeCurrentAndOriginal: LibrarySymbolReference
  };
  DataRowBuilder: LibrarySymbolReference & {

  };
  DataRowChangeEventArgs: LibrarySymbolReference & {
    DataRowChangeEventArgs: LibrarySymbolReference;
    Action: LibrarySymbolReference;
    Row: LibrarySymbolReference
  };
  DataRowChangeEventHandler: LibrarySymbolReference & {
    DataRowChangeEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  DataRowCollection: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Find: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    InsertAt: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  DataRowComparer: LibrarySymbolReference & {
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Default: LibrarySymbolReference
  };
  DataRowExtensions: LibrarySymbolReference & {

  };
  DataRowState: LibrarySymbolReference & {
    Detached: LibrarySymbolReference;
    Unchanged: LibrarySymbolReference;
    Added: LibrarySymbolReference;
    Deleted: LibrarySymbolReference;
    Modified: LibrarySymbolReference
  };
  DataRowVersion: LibrarySymbolReference & {
    Original: LibrarySymbolReference;
    Current: LibrarySymbolReference;
    Proposed: LibrarySymbolReference;
    Default: LibrarySymbolReference
  };
  DataRowView: LibrarySymbolReference & {
    BeginEdit: LibrarySymbolReference;
    CancelEdit: LibrarySymbolReference;
    CreateChildView: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    EndEdit: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    DataView: LibrarySymbolReference;
    IsEdit: LibrarySymbolReference;
    IsNew: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Row: LibrarySymbolReference;
    RowVersion: LibrarySymbolReference
  };
  DataSet: LibrarySymbolReference & {
    DataSet: LibrarySymbolReference;
    AcceptChanges: LibrarySymbolReference;
    BeginInit: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Copy: LibrarySymbolReference;
    CreateDataReader: LibrarySymbolReference;
    DetermineSchemaSerializationMode: LibrarySymbolReference;
    EndInit: LibrarySymbolReference;
    GetChanges: LibrarySymbolReference;
    GetDataSetSchema: LibrarySymbolReference;
    GetSchemaSerializable: LibrarySymbolReference;
    GetSerializationData: LibrarySymbolReference;
    GetXml: LibrarySymbolReference;
    GetXmlSchema: LibrarySymbolReference;
    HasChanges: LibrarySymbolReference;
    InferXmlSchema: LibrarySymbolReference;
    InitializeDerivedDataSet: LibrarySymbolReference;
    IsBinarySerialized: LibrarySymbolReference;
    Load: LibrarySymbolReference;
    Merge: LibrarySymbolReference;
    OnPropertyChanging: LibrarySymbolReference;
    OnRemoveRelation: LibrarySymbolReference;
    OnRemoveTable: LibrarySymbolReference;
    RaisePropertyChanging: LibrarySymbolReference;
    ReadXml: LibrarySymbolReference;
    ReadXmlSchema: LibrarySymbolReference;
    ReadXmlSerializable: LibrarySymbolReference;
    RejectChanges: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    ShouldSerializeRelations: LibrarySymbolReference;
    ShouldSerializeTables: LibrarySymbolReference;
    WriteXml: LibrarySymbolReference;
    WriteXmlSchema: LibrarySymbolReference;
    CaseSensitive: LibrarySymbolReference;
    DataSetName: LibrarySymbolReference;
    DefaultViewManager: LibrarySymbolReference;
    EnforceConstraints: LibrarySymbolReference;
    ExtendedProperties: LibrarySymbolReference;
    HasErrors: LibrarySymbolReference;
    IsInitialized: LibrarySymbolReference;
    Locale: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    Prefix: LibrarySymbolReference;
    Relations: LibrarySymbolReference;
    RemotingFormat: LibrarySymbolReference;
    SchemaSerializationMode: LibrarySymbolReference;
    Site: LibrarySymbolReference;
    Tables: LibrarySymbolReference
  };
  DataSetDateTime: LibrarySymbolReference & {
    Local: LibrarySymbolReference;
    Unspecified: LibrarySymbolReference;
    UnspecifiedLocal: LibrarySymbolReference;
    Utc: LibrarySymbolReference
  };
  DataSysDescriptionAttribute: LibrarySymbolReference & {
    DataSysDescriptionAttribute: LibrarySymbolReference;
    Description: LibrarySymbolReference
  };
  DataTable: LibrarySymbolReference & {
    fInitInProgress: LibrarySymbolReference;
    DataTable: LibrarySymbolReference;
    AcceptChanges: LibrarySymbolReference;
    BeginInit: LibrarySymbolReference;
    BeginLoadData: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    Compute: LibrarySymbolReference;
    Copy: LibrarySymbolReference;
    CreateDataReader: LibrarySymbolReference;
    CreateInstance: LibrarySymbolReference;
    EndInit: LibrarySymbolReference;
    EndLoadData: LibrarySymbolReference;
    GetChanges: LibrarySymbolReference;
    GetDataTableSchema: LibrarySymbolReference;
    GetErrors: LibrarySymbolReference;
    GetRowType: LibrarySymbolReference;
    GetSchema: LibrarySymbolReference;
    ImportRow: LibrarySymbolReference;
    Load: LibrarySymbolReference;
    LoadDataRow: LibrarySymbolReference;
    Merge: LibrarySymbolReference;
    NewRow: LibrarySymbolReference;
    NewRowArray: LibrarySymbolReference;
    NewRowFromBuilder: LibrarySymbolReference;
    OnColumnChanged: LibrarySymbolReference;
    OnColumnChanging: LibrarySymbolReference;
    OnPropertyChanging: LibrarySymbolReference;
    OnRemoveColumn: LibrarySymbolReference;
    OnRowChanged: LibrarySymbolReference;
    OnRowChanging: LibrarySymbolReference;
    OnRowDeleted: LibrarySymbolReference;
    OnRowDeleting: LibrarySymbolReference;
    OnTableCleared: LibrarySymbolReference;
    OnTableClearing: LibrarySymbolReference;
    OnTableNewRow: LibrarySymbolReference;
    ReadXml: LibrarySymbolReference;
    ReadXmlSchema: LibrarySymbolReference;
    ReadXmlSerializable: LibrarySymbolReference;
    RejectChanges: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Select: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    WriteXml: LibrarySymbolReference;
    WriteXmlSchema: LibrarySymbolReference;
    CaseSensitive: LibrarySymbolReference;
    ChildRelations: LibrarySymbolReference;
    Columns: LibrarySymbolReference;
    Constraints: LibrarySymbolReference;
    DataSet: LibrarySymbolReference;
    DefaultView: LibrarySymbolReference;
    DisplayExpression: LibrarySymbolReference;
    ExtendedProperties: LibrarySymbolReference;
    HasErrors: LibrarySymbolReference;
    IsInitialized: LibrarySymbolReference;
    Locale: LibrarySymbolReference;
    MinimumCapacity: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    ParentRelations: LibrarySymbolReference;
    Prefix: LibrarySymbolReference;
    RemotingFormat: LibrarySymbolReference;
    Rows: LibrarySymbolReference;
    Site: LibrarySymbolReference;
    TableName: LibrarySymbolReference;
    PrimaryKey: LibrarySymbolReference
  };
  DataTableClearEventArgs: LibrarySymbolReference & {
    DataTableClearEventArgs: LibrarySymbolReference;
    Table: LibrarySymbolReference;
    TableName: LibrarySymbolReference;
    TableNamespace: LibrarySymbolReference
  };
  DataTableClearEventHandler: LibrarySymbolReference & {
    DataTableClearEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  DataTableCollection: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    CanRemove: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    List: LibrarySymbolReference
  };
  DataTableExtensions: LibrarySymbolReference & {
    AsDataView: LibrarySymbolReference;
    AsEnumerable: LibrarySymbolReference
  };
  DataTableNewRowEventArgs: LibrarySymbolReference & {
    DataTableNewRowEventArgs: LibrarySymbolReference;
    Row: LibrarySymbolReference
  };
  DataTableNewRowEventHandler: LibrarySymbolReference & {
    DataTableNewRowEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  DataTableReader: LibrarySymbolReference & {
    DataTableReader: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    GetBoolean: LibrarySymbolReference;
    GetByte: LibrarySymbolReference;
    GetBytes: LibrarySymbolReference;
    GetChar: LibrarySymbolReference;
    GetChars: LibrarySymbolReference;
    GetDataTypeName: LibrarySymbolReference;
    GetDateTime: LibrarySymbolReference;
    GetDecimal: LibrarySymbolReference;
    GetDouble: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetFieldType: LibrarySymbolReference;
    GetFloat: LibrarySymbolReference;
    GetGuid: LibrarySymbolReference;
    GetInt16: LibrarySymbolReference;
    GetInt32: LibrarySymbolReference;
    GetInt64: LibrarySymbolReference;
    GetName: LibrarySymbolReference;
    GetOrdinal: LibrarySymbolReference;
    GetProviderSpecificFieldType: LibrarySymbolReference;
    GetProviderSpecificValue: LibrarySymbolReference;
    GetProviderSpecificValues: LibrarySymbolReference;
    GetSchemaTable: LibrarySymbolReference;
    GetString: LibrarySymbolReference;
    GetValue: LibrarySymbolReference;
    GetValues: LibrarySymbolReference;
    IsDBNull: LibrarySymbolReference;
    NextResult: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    Depth: LibrarySymbolReference;
    FieldCount: LibrarySymbolReference;
    HasRows: LibrarySymbolReference;
    IsClosed: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    RecordsAffected: LibrarySymbolReference
  };
  DataView: LibrarySymbolReference & {
    DataView: LibrarySymbolReference;
    AddNew: LibrarySymbolReference;
    BeginInit: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    ColumnCollectionChanged: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    EndInit: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    Find: LibrarySymbolReference;
    FindRows: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    IndexListChanged: LibrarySymbolReference;
    OnListChanged: LibrarySymbolReference;
    Open: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    ToTable: LibrarySymbolReference;
    UpdateIndex: LibrarySymbolReference;
    AllowDelete: LibrarySymbolReference;
    AllowEdit: LibrarySymbolReference;
    AllowNew: LibrarySymbolReference;
    ApplyDefaultSort: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    DataViewManager: LibrarySymbolReference;
    IsInitialized: LibrarySymbolReference;
    IsOpen: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    RowFilter: LibrarySymbolReference;
    RowStateFilter: LibrarySymbolReference;
    Sort: LibrarySymbolReference;
    Table: LibrarySymbolReference
  };
  DataViewManager: LibrarySymbolReference & {
    DataViewManager: LibrarySymbolReference;
    CreateDataView: LibrarySymbolReference;
    OnListChanged: LibrarySymbolReference;
    RelationCollectionChanged: LibrarySymbolReference;
    TableCollectionChanged: LibrarySymbolReference;
    DataSet: LibrarySymbolReference;
    DataViewSettingCollectionString: LibrarySymbolReference;
    DataViewSettings: LibrarySymbolReference
  };
  DataViewRowState: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Unchanged: LibrarySymbolReference;
    Added: LibrarySymbolReference;
    Deleted: LibrarySymbolReference;
    ModifiedCurrent: LibrarySymbolReference;
    CurrentRows: LibrarySymbolReference;
    ModifiedOriginal: LibrarySymbolReference;
    OriginalRows: LibrarySymbolReference
  };
  DataViewSetting: LibrarySymbolReference & {
    ApplyDefaultSort: LibrarySymbolReference;
    DataViewManager: LibrarySymbolReference;
    RowFilter: LibrarySymbolReference;
    RowStateFilter: LibrarySymbolReference;
    Sort: LibrarySymbolReference;
    Table: LibrarySymbolReference
  };
  DataViewSettingCollection: LibrarySymbolReference & {
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  DbType: LibrarySymbolReference & {
    AnsiString: LibrarySymbolReference;
    Binary: LibrarySymbolReference;
    Byte: LibrarySymbolReference;
    Boolean: LibrarySymbolReference;
    Currency: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    DateTime: LibrarySymbolReference;
    Decimal: LibrarySymbolReference;
    Double: LibrarySymbolReference;
    Guid: LibrarySymbolReference;
    Int16: LibrarySymbolReference;
    Int32: LibrarySymbolReference;
    Int64: LibrarySymbolReference;
    Object: LibrarySymbolReference;
    SByte: LibrarySymbolReference;
    Single: LibrarySymbolReference;
    String: LibrarySymbolReference;
    Time: LibrarySymbolReference;
    UInt16: LibrarySymbolReference;
    UInt32: LibrarySymbolReference;
    UInt64: LibrarySymbolReference;
    VarNumeric: LibrarySymbolReference;
    AnsiStringFixedLength: LibrarySymbolReference;
    StringFixedLength: LibrarySymbolReference;
    Xml: LibrarySymbolReference;
    DateTime2: LibrarySymbolReference;
    DateTimeOffset: LibrarySymbolReference
  };
  DeletedRowInaccessibleException: LibrarySymbolReference & {
    DeletedRowInaccessibleException: LibrarySymbolReference
  };
  DuplicateNameException: LibrarySymbolReference & {
    DuplicateNameException: LibrarySymbolReference
  };
  EnumerableRowCollection: LibrarySymbolReference & {
    GetEnumerator: LibrarySymbolReference
  };
  EnumerableRowCollectionExtensions: LibrarySymbolReference & {

  };
  EvaluateException: LibrarySymbolReference & {
    EvaluateException: LibrarySymbolReference
  };
  FillErrorEventArgs: LibrarySymbolReference & {
    FillErrorEventArgs: LibrarySymbolReference;
    Continue: LibrarySymbolReference;
    DataTable: LibrarySymbolReference;
    Errors: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  FillErrorEventHandler: LibrarySymbolReference & {
    FillErrorEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  ForeignKeyConstraint: LibrarySymbolReference & {
    ForeignKeyConstraint: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    AcceptRejectRule: LibrarySymbolReference;
    Columns: LibrarySymbolReference;
    DeleteRule: LibrarySymbolReference;
    RelatedColumns: LibrarySymbolReference;
    RelatedTable: LibrarySymbolReference;
    Table: LibrarySymbolReference;
    UpdateRule: LibrarySymbolReference
  };
  IColumnMapping: LibrarySymbolReference & {
    DataSetColumn: LibrarySymbolReference;
    SourceColumn: LibrarySymbolReference
  };
  IColumnMappingCollection: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    GetByDataSetColumn: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  IDataAdapter: LibrarySymbolReference & {
    Fill: LibrarySymbolReference;
    FillSchema: LibrarySymbolReference;
    GetFillParameters: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    MissingMappingAction: LibrarySymbolReference;
    MissingSchemaAction: LibrarySymbolReference;
    TableMappings: LibrarySymbolReference
  };
  IDataParameter: LibrarySymbolReference & {
    DbType: LibrarySymbolReference;
    Direction: LibrarySymbolReference;
    IsNullable: LibrarySymbolReference;
    ParameterName: LibrarySymbolReference;
    SourceColumn: LibrarySymbolReference;
    SourceVersion: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  IDataParameterCollection: LibrarySymbolReference & {
    Contains: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  IDataReader: LibrarySymbolReference & {
    Close: LibrarySymbolReference;
    GetSchemaTable: LibrarySymbolReference;
    NextResult: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    Depth: LibrarySymbolReference;
    IsClosed: LibrarySymbolReference;
    RecordsAffected: LibrarySymbolReference
  };
  IDataRecord: LibrarySymbolReference & {
    GetBoolean: LibrarySymbolReference;
    GetByte: LibrarySymbolReference;
    GetBytes: LibrarySymbolReference;
    GetChar: LibrarySymbolReference;
    GetChars: LibrarySymbolReference;
    GetData: LibrarySymbolReference;
    GetDataTypeName: LibrarySymbolReference;
    GetDateTime: LibrarySymbolReference;
    GetDecimal: LibrarySymbolReference;
    GetDouble: LibrarySymbolReference;
    GetFieldType: LibrarySymbolReference;
    GetFloat: LibrarySymbolReference;
    GetGuid: LibrarySymbolReference;
    GetInt16: LibrarySymbolReference;
    GetInt32: LibrarySymbolReference;
    GetInt64: LibrarySymbolReference;
    GetName: LibrarySymbolReference;
    GetOrdinal: LibrarySymbolReference;
    GetString: LibrarySymbolReference;
    GetValue: LibrarySymbolReference;
    GetValues: LibrarySymbolReference;
    IsDBNull: LibrarySymbolReference;
    FieldCount: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  IDbCommand: LibrarySymbolReference & {
    Cancel: LibrarySymbolReference;
    CreateParameter: LibrarySymbolReference;
    ExecuteNonQuery: LibrarySymbolReference;
    ExecuteReader: LibrarySymbolReference;
    ExecuteScalar: LibrarySymbolReference;
    Prepare: LibrarySymbolReference;
    CommandText: LibrarySymbolReference;
    CommandTimeout: LibrarySymbolReference;
    CommandType: LibrarySymbolReference;
    Connection: LibrarySymbolReference;
    Parameters: LibrarySymbolReference;
    Transaction: LibrarySymbolReference;
    UpdatedRowSource: LibrarySymbolReference
  };
  IDbConnection: LibrarySymbolReference & {
    BeginTransaction: LibrarySymbolReference;
    ChangeDatabase: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    CreateCommand: LibrarySymbolReference;
    Open: LibrarySymbolReference;
    ConnectionString: LibrarySymbolReference;
    ConnectionTimeout: LibrarySymbolReference;
    Database: LibrarySymbolReference;
    State: LibrarySymbolReference
  };
  IDbDataAdapter: LibrarySymbolReference & {
    DeleteCommand: LibrarySymbolReference;
    InsertCommand: LibrarySymbolReference;
    SelectCommand: LibrarySymbolReference;
    UpdateCommand: LibrarySymbolReference
  };
  IDbDataParameter: LibrarySymbolReference & {
    Precision: LibrarySymbolReference;
    Scale: LibrarySymbolReference;
    Size: LibrarySymbolReference
  };
  IDbTransaction: LibrarySymbolReference & {
    Commit: LibrarySymbolReference;
    Rollback: LibrarySymbolReference;
    Connection: LibrarySymbolReference;
    IsolationLevel: LibrarySymbolReference
  };
  ITableMapping: LibrarySymbolReference & {
    ColumnMappings: LibrarySymbolReference;
    DataSetTable: LibrarySymbolReference;
    SourceTable: LibrarySymbolReference
  };
  ITableMappingCollection: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    GetByDataSetTable: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  InRowChangingEventException: LibrarySymbolReference & {
    InRowChangingEventException: LibrarySymbolReference
  };
  InternalDataCollectionBase: LibrarySymbolReference & {
    InternalDataCollectionBase: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    List: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  InvalidConstraintException: LibrarySymbolReference & {
    InvalidConstraintException: LibrarySymbolReference
  };
  InvalidExpressionException: LibrarySymbolReference & {
    InvalidExpressionException: LibrarySymbolReference
  };
  IsolationLevel: LibrarySymbolReference & {
    Unspecified: LibrarySymbolReference;
    Chaos: LibrarySymbolReference;
    ReadUncommitted: LibrarySymbolReference;
    ReadCommitted: LibrarySymbolReference;
    RepeatableRead: LibrarySymbolReference;
    Serializable: LibrarySymbolReference;
    Snapshot: LibrarySymbolReference
  };
  KeyRestrictionBehavior: LibrarySymbolReference & {
    AllowOnly: LibrarySymbolReference;
    PreventUsage: LibrarySymbolReference
  };
  LoadOption: LibrarySymbolReference & {
    OverwriteChanges: LibrarySymbolReference;
    PreserveChanges: LibrarySymbolReference;
    Upsert: LibrarySymbolReference
  };
  MappingType: LibrarySymbolReference & {
    Element: LibrarySymbolReference;
    Attribute: LibrarySymbolReference;
    SimpleContent: LibrarySymbolReference;
    Hidden: LibrarySymbolReference
  };
  MergeFailedEventArgs: LibrarySymbolReference & {
    MergeFailedEventArgs: LibrarySymbolReference;
    Conflict: LibrarySymbolReference;
    Table: LibrarySymbolReference
  };
  MergeFailedEventHandler: LibrarySymbolReference & {
    MergeFailedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  MissingMappingAction: LibrarySymbolReference & {
    Passthrough: LibrarySymbolReference;
    Ignore: LibrarySymbolReference;
    Error: LibrarySymbolReference
  };
  MissingPrimaryKeyException: LibrarySymbolReference & {
    MissingPrimaryKeyException: LibrarySymbolReference
  };
  MissingSchemaAction: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Ignore: LibrarySymbolReference;
    Error: LibrarySymbolReference;
    AddWithKey: LibrarySymbolReference
  };
  NoNullAllowedException: LibrarySymbolReference & {
    NoNullAllowedException: LibrarySymbolReference
  };
  OrderedEnumerableRowCollection: LibrarySymbolReference & {

  };
  ParameterDirection: LibrarySymbolReference & {
    Input: LibrarySymbolReference;
    Output: LibrarySymbolReference;
    InputOutput: LibrarySymbolReference;
    ReturnValue: LibrarySymbolReference
  };
  PropertyCollection: LibrarySymbolReference & {
    PropertyCollection: LibrarySymbolReference;
    Clone: LibrarySymbolReference
  };
  ReadOnlyException: LibrarySymbolReference & {
    ReadOnlyException: LibrarySymbolReference
  };
  RowNotInTableException: LibrarySymbolReference & {
    RowNotInTableException: LibrarySymbolReference
  };
  Rule: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Cascade: LibrarySymbolReference;
    SetNull: LibrarySymbolReference;
    SetDefault: LibrarySymbolReference
  };
  SchemaSerializationMode: LibrarySymbolReference & {
    IncludeSchema: LibrarySymbolReference;
    ExcludeSchema: LibrarySymbolReference
  };
  SchemaType: LibrarySymbolReference & {
    Source: LibrarySymbolReference;
    Mapped: LibrarySymbolReference
  };
  SerializationFormat: LibrarySymbolReference & {
    Xml: LibrarySymbolReference;
    Binary: LibrarySymbolReference
  };
  SqlDbType: LibrarySymbolReference & {
    BigInt: LibrarySymbolReference;
    Binary: LibrarySymbolReference;
    Bit: LibrarySymbolReference;
    Char: LibrarySymbolReference;
    DateTime: LibrarySymbolReference;
    Decimal: LibrarySymbolReference;
    Float: LibrarySymbolReference;
    Image: LibrarySymbolReference;
    Int: LibrarySymbolReference;
    Money: LibrarySymbolReference;
    NChar: LibrarySymbolReference;
    NText: LibrarySymbolReference;
    NVarChar: LibrarySymbolReference;
    Real: LibrarySymbolReference;
    UniqueIdentifier: LibrarySymbolReference;
    SmallDateTime: LibrarySymbolReference;
    SmallInt: LibrarySymbolReference;
    SmallMoney: LibrarySymbolReference;
    Text: LibrarySymbolReference;
    Timestamp: LibrarySymbolReference;
    TinyInt: LibrarySymbolReference;
    VarBinary: LibrarySymbolReference;
    VarChar: LibrarySymbolReference;
    Variant: LibrarySymbolReference;
    Xml: LibrarySymbolReference;
    Udt: LibrarySymbolReference;
    Structured: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    Time: LibrarySymbolReference;
    DateTime2: LibrarySymbolReference;
    DateTimeOffset: LibrarySymbolReference;
    Json: LibrarySymbolReference
  };
  StateChangeEventArgs: LibrarySymbolReference & {
    StateChangeEventArgs: LibrarySymbolReference;
    CurrentState: LibrarySymbolReference;
    OriginalState: LibrarySymbolReference
  };
  StateChangeEventHandler: LibrarySymbolReference & {
    StateChangeEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  StatementCompletedEventArgs: LibrarySymbolReference & {
    StatementCompletedEventArgs: LibrarySymbolReference;
    RecordCount: LibrarySymbolReference
  };
  StatementCompletedEventHandler: LibrarySymbolReference & {
    StatementCompletedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  StatementType: LibrarySymbolReference & {
    Select: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    Batch: LibrarySymbolReference
  };
  StrongTypingException: LibrarySymbolReference & {
    StrongTypingException: LibrarySymbolReference
  };
  SyntaxErrorException: LibrarySymbolReference & {
    SyntaxErrorException: LibrarySymbolReference
  };
  TypedTableBase: LibrarySymbolReference & {
    TypedTableBase: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference
  };
  TypedTableBaseExtensions: LibrarySymbolReference & {

  };
  UniqueConstraint: LibrarySymbolReference & {
    UniqueConstraint: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Columns: LibrarySymbolReference;
    IsPrimaryKey: LibrarySymbolReference;
    Table: LibrarySymbolReference
  };
  UpdateRowSource: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    OutputParameters: LibrarySymbolReference;
    FirstReturnedRecord: LibrarySymbolReference;
    Both: LibrarySymbolReference
  };
  UpdateStatus: LibrarySymbolReference & {
    Continue: LibrarySymbolReference;
    ErrorsOccurred: LibrarySymbolReference;
    SkipCurrentRow: LibrarySymbolReference;
    SkipAllRemainingRows: LibrarySymbolReference
  };
  VersionNotFoundException: LibrarySymbolReference & {
    VersionNotFoundException: LibrarySymbolReference
  };
  XmlReadMode: LibrarySymbolReference & {
    Auto: LibrarySymbolReference;
    ReadSchema: LibrarySymbolReference;
    IgnoreSchema: LibrarySymbolReference;
    InferSchema: LibrarySymbolReference;
    DiffGram: LibrarySymbolReference;
    Fragment: LibrarySymbolReference;
    InferTypedSchema: LibrarySymbolReference
  };
  XmlWriteMode: LibrarySymbolReference & {
    WriteSchema: LibrarySymbolReference;
    IgnoreSchema: LibrarySymbolReference;
    DiffGram: LibrarySymbolReference
  }
};
const Data: DataLibrary = createLibrary("System.Data", {
  AcceptRejectRule: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Data.AcceptRejectRule;
        },
      },
      Cascade: {
        kind: "field",
        type: () => {
          return Data.AcceptRejectRule;
        },
      },
    },
  },
  CommandBehavior: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Data.CommandBehavior;
        },
      },
      SingleResult: {
        kind: "field",
        type: () => {
          return Data.CommandBehavior;
        },
      },
      SchemaOnly: {
        kind: "field",
        type: () => {
          return Data.CommandBehavior;
        },
      },
      KeyInfo: {
        kind: "field",
        type: () => {
          return Data.CommandBehavior;
        },
      },
      SingleRow: {
        kind: "field",
        type: () => {
          return Data.CommandBehavior;
        },
      },
      SequentialAccess: {
        kind: "field",
        type: () => {
          return Data.CommandBehavior;
        },
      },
      CloseConnection: {
        kind: "field",
        type: () => {
          return Data.CommandBehavior;
        },
      },
    },
  },
  CommandType: {
    kind: "enum",
    members: {
      Text: {
        kind: "field",
        type: () => {
          return Data.CommandType;
        },
      },
      StoredProcedure: {
        kind: "field",
        type: () => {
          return Data.CommandType;
        },
      },
      TableDirect: {
        kind: "field",
        type: () => {
          return Data.CommandType;
        },
      },
    },
  },
  ConflictOption: {
    kind: "enum",
    members: {
      CompareAllSearchableValues: {
        kind: "field",
        type: () => {
          return Data.ConflictOption;
        },
      },
      CompareRowVersion: {
        kind: "field",
        type: () => {
          return Data.ConflictOption;
        },
      },
      OverwriteChanges: {
        kind: "field",
        type: () => {
          return Data.ConflictOption;
        },
      },
    },
  },
  ConnectionState: {
    kind: "enum",
    members: {
      Closed: {
        kind: "field",
        type: () => {
          return Data.ConnectionState;
        },
      },
      Open: {
        kind: "field",
        type: () => {
          return Data.ConnectionState;
        },
      },
      Connecting: {
        kind: "field",
        type: () => {
          return Data.ConnectionState;
        },
      },
      Executing: {
        kind: "field",
        type: () => {
          return Data.ConnectionState;
        },
      },
      Fetching: {
        kind: "field",
        type: () => {
          return Data.ConnectionState;
        },
      },
      Broken: {
        kind: "field",
        type: () => {
          return Data.ConnectionState;
        },
      },
    },
  },
  Constraint: {
    kind: "class",
    members: {
      CheckStateForProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetDataSet: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConstraintName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      ExtendedProperties: {
        kind: "property",
        type: () => {
          return Data.PropertyCollection;
        },
      },
      Table: {
        kind: "property",
        type: () => {
          return Data.DataTable;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  ConstraintCollection: {
    kind: "class",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      CanRemove: {
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
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return Data.Constraint;
        },
      },
      List: {
        kind: "property",
        type: () => {
          return Collections.ArrayList;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  ConstraintException: {
    kind: "class",
    members: {
      ConstraintException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  DBConcurrencyException: {
    kind: "class",
    members: {
      DBConcurrencyException: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyToRows: {
        kind: "method",
        methodKind: "ordinary",
      },
      Row: {
        kind: "property",
        type: () => {
          return Data.DataRow;
        },
      },
      RowCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  DataColumn: {
    kind: "class",
    members: {
      DataColumn: {
        kind: "method",
        methodKind: "constructor",
      },
      CheckNotAllowNull: {
        kind: "method",
        methodKind: "ordinary",
      },
      CheckUnique: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnPropertyChanging: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RaisePropertyChanging: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetOrdinal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AllowDBNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AutoIncrement: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AutoIncrementSeed: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      AutoIncrementStep: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      Caption: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ColumnMapping: {
        kind: "property",
        type: () => {
          return Data.MappingType;
        },
        isVirtual: true,
      },
      ColumnName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DateTimeMode: {
        kind: "property",
        type: () => {
          return Data.DataSetDateTime;
        },
      },
      Expression: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ExtendedProperties: {
        kind: "property",
        type: () => {
          return Data.PropertyCollection;
        },
      },
      MaxLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Ordinal: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Prefix: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Table: {
        kind: "property",
        type: () => {
          return Data.DataTable;
        },
      },
      Unique: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      DataType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      DefaultValue: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
  },
  DataColumnChangeEventArgs: {
    kind: "class",
    members: {
      DataColumnChangeEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Column: {
        kind: "property",
        type: () => {
          return Data.DataColumn;
        },
      },
      ProposedValue: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      Row: {
        kind: "property",
        type: () => {
          return Data.DataRow;
        },
      },
    },
  },
  DataColumnChangeEventHandler: {
    kind: "generic",
    members: {
      DataColumnChangeEventHandler: {
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
  DataColumnCollection: {
    kind: "class",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      CanRemove: {
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
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return Data.DataColumn;
        },
      },
      List: {
        kind: "property",
        type: () => {
          return Collections.ArrayList;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  DataException: {
    kind: "class",
    members: {
      DataException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  DataReaderExtensions: {
    kind: "class",
    members: {
      GetBoolean: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetByte: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetChar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetChars: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDataTypeName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDecimal: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDouble: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFieldType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFloat: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetGuid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetInt16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetInt32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetInt64: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetStream: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTextReader: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsDBNull: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsDBNullAsync: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  DataRelation: {
    kind: "class",
    members: {
      DataRelation: {
        kind: "method",
        methodKind: "constructor",
      },
      CheckStateForProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnPropertyChanging: {
        kind: "method",
        methodKind: "ordinary",
      },
      RaisePropertyChanging: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ChildColumns: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
      ChildKeyConstraint: {
        kind: "property",
        type: () => {
          return Data.ForeignKeyConstraint;
        },
        isNullable: true,
        isVirtual: true,
      },
      ChildTable: {
        kind: "property",
        type: () => {
          return Data.DataTable;
        },
        isVirtual: true,
      },
      DataSet: {
        kind: "property",
        type: () => {
          return Data.DataSet;
        },
        isVirtual: true,
      },
      ExtendedProperties: {
        kind: "property",
        type: () => {
          return Data.PropertyCollection;
        },
      },
      Nested: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      ParentColumns: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
      ParentKeyConstraint: {
        kind: "property",
        type: () => {
          return Data.UniqueConstraint;
        },
        isNullable: true,
        isVirtual: true,
      },
      ParentTable: {
        kind: "property",
        type: () => {
          return Data.DataTable;
        },
        isVirtual: true,
      },
      RelationName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
    },
  },
  DataRelationCollection: {
    kind: "class",
    members: {
      DataRelationCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddRange: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CanRemove: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDataSet: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnCollectionChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnCollectionChanging: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return Data.DataRelation;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  DataRow: {
    kind: "class",
    members: {
      DataRow: {
        kind: "method",
        methodKind: "constructor",
      },
      AcceptChanges: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginEdit: {
        kind: "method",
        methodKind: "ordinary",
      },
      CancelEdit: {
        kind: "method",
        methodKind: "ordinary",
      },
      ClearErrors: {
        kind: "method",
        methodKind: "ordinary",
      },
      Delete: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndEdit: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetChildRows: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetColumnError: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetColumnsInError: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetParentRow: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetParentRows: {
        kind: "method",
        methodKind: "ordinary",
      },
      HasVersion: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsNull: {
        kind: "method",
        methodKind: "ordinary",
      },
      RejectChanges: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAdded: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetColumnError: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetModified: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetNull: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetParentRow: {
        kind: "method",
        methodKind: "ordinary",
      },
      HasErrors: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      ItemArray: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      RowError: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      RowState: {
        kind: "property",
        type: () => {
          return Data.DataRowState;
        },
      },
      Table: {
        kind: "property",
        type: () => {
          return Data.DataTable;
        },
      },
    },
  },
  DataRowAction: {
    kind: "enum",
    members: {
      Nothing: {
        kind: "field",
        type: () => {
          return Data.DataRowAction;
        },
      },
      Delete: {
        kind: "field",
        type: () => {
          return Data.DataRowAction;
        },
      },
      Change: {
        kind: "field",
        type: () => {
          return Data.DataRowAction;
        },
      },
      Rollback: {
        kind: "field",
        type: () => {
          return Data.DataRowAction;
        },
      },
      Commit: {
        kind: "field",
        type: () => {
          return Data.DataRowAction;
        },
      },
      Add: {
        kind: "field",
        type: () => {
          return Data.DataRowAction;
        },
      },
      ChangeOriginal: {
        kind: "field",
        type: () => {
          return Data.DataRowAction;
        },
      },
      ChangeCurrentAndOriginal: {
        kind: "field",
        type: () => {
          return Data.DataRowAction;
        },
      },
    },
  },
  DataRowBuilder: {
    kind: "class",
    members: {},
    isSealed: true,
  },
  DataRowChangeEventArgs: {
    kind: "class",
    members: {
      DataRowChangeEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Action: {
        kind: "property",
        type: () => {
          return Data.DataRowAction;
        },
      },
      Row: {
        kind: "property",
        type: () => {
          return Data.DataRow;
        },
      },
    },
  },
  DataRowChangeEventHandler: {
    kind: "generic",
    members: {
      DataRowChangeEventHandler: {
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
  DataRowCollection: {
    kind: "class",
    members: {
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
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Find: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      InsertAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return Data.DataRow;
        },
      },
    },
    isSealed: true,
  },
  DataRowComparer: {
    kind: "class",
    members: {
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
      },
      Default: {
        kind: "property",
        type: () => {
          return Data.DataRowComparer;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  DataRowExtensions: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  DataRowState: {
    kind: "enum",
    members: {
      Detached: {
        kind: "field",
        type: () => {
          return Data.DataRowState;
        },
      },
      Unchanged: {
        kind: "field",
        type: () => {
          return Data.DataRowState;
        },
      },
      Added: {
        kind: "field",
        type: () => {
          return Data.DataRowState;
        },
      },
      Deleted: {
        kind: "field",
        type: () => {
          return Data.DataRowState;
        },
      },
      Modified: {
        kind: "field",
        type: () => {
          return Data.DataRowState;
        },
      },
    },
  },
  DataRowVersion: {
    kind: "enum",
    members: {
      Original: {
        kind: "field",
        type: () => {
          return Data.DataRowVersion;
        },
      },
      Current: {
        kind: "field",
        type: () => {
          return Data.DataRowVersion;
        },
      },
      Proposed: {
        kind: "field",
        type: () => {
          return Data.DataRowVersion;
        },
      },
      Default: {
        kind: "field",
        type: () => {
          return Data.DataRowVersion;
        },
      },
    },
  },
  DataRowView: {
    kind: "class",
    members: {
      BeginEdit: {
        kind: "method",
        methodKind: "ordinary",
      },
      CancelEdit: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateChildView: {
        kind: "method",
        methodKind: "ordinary",
      },
      Delete: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndEdit: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DataView: {
        kind: "property",
        type: () => {
          return Data.DataView;
        },
      },
      IsEdit: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNew: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      Row: {
        kind: "property",
        type: () => {
          return Data.DataRow;
        },
      },
      RowVersion: {
        kind: "property",
        type: () => {
          return Data.DataRowVersion;
        },
      },
    },
  },
  DataSet: {
    kind: "class",
    members: {
      DataSet: {
        kind: "method",
        methodKind: "constructor",
      },
      AcceptChanges: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginInit: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Copy: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateDataReader: {
        kind: "method",
        methodKind: "ordinary",
      },
      DetermineSchemaSerializationMode: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndInit: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetChanges: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDataSetSchema: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetSchemaSerializable: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSerializationData: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetXml: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetXmlSchema: {
        kind: "method",
        methodKind: "ordinary",
      },
      HasChanges: {
        kind: "method",
        methodKind: "ordinary",
      },
      InferXmlSchema: {
        kind: "method",
        methodKind: "ordinary",
      },
      InitializeDerivedDataSet: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsBinarySerialized: {
        kind: "method",
        methodKind: "ordinary",
      },
      Load: {
        kind: "method",
        methodKind: "ordinary",
      },
      Merge: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnPropertyChanging: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRemoveRelation: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRemoveTable: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RaisePropertyChanging: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadXml: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadXmlSchema: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadXmlSerializable: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RejectChanges: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ShouldSerializeRelations: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ShouldSerializeTables: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      WriteXml: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteXmlSchema: {
        kind: "method",
        methodKind: "ordinary",
      },
      CaseSensitive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      DataSetName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DefaultViewManager: {
        kind: "property",
        type: () => {
          return Data.DataViewManager;
        },
      },
      EnforceConstraints: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ExtendedProperties: {
        kind: "property",
        type: () => {
          return Data.PropertyCollection;
        },
      },
      HasErrors: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsInitialized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Locale: {
        kind: "property",
        type: () => {
          return Globalization.CultureInfo;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Prefix: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Relations: {
        kind: "property",
        type: () => {
          return Data.DataRelationCollection;
        },
      },
      RemotingFormat: {
        kind: "property",
        type: () => {
          return Data.SerializationFormat;
        },
      },
      SchemaSerializationMode: {
        kind: "property",
        type: () => {
          return Data.SchemaSerializationMode;
        },
        isVirtual: true,
      },
      Site: {
        kind: "property",
        type: () => {
          return ComponentModel.ISite;
        },
        isOverride: true,
      },
      Tables: {
        kind: "property",
        type: () => {
          return Data.DataTableCollection;
        },
      },
    },
  },
  DataSetDateTime: {
    kind: "enum",
    members: {
      Local: {
        kind: "field",
        type: () => {
          return Data.DataSetDateTime;
        },
      },
      Unspecified: {
        kind: "field",
        type: () => {
          return Data.DataSetDateTime;
        },
      },
      UnspecifiedLocal: {
        kind: "field",
        type: () => {
          return Data.DataSetDateTime;
        },
      },
      Utc: {
        kind: "field",
        type: () => {
          return Data.DataSetDateTime;
        },
      },
    },
  },
  DataSysDescriptionAttribute: {
    kind: "class",
    members: {
      DataSysDescriptionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Description: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
  },
  DataTable: {
    kind: "class",
    members: {
      fInitInProgress: {
        kind: "field",
        type: () => {
          return System.Boolean;
        },
      },
      DataTable: {
        kind: "method",
        methodKind: "constructor",
      },
      AcceptChanges: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginInit: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BeginLoadData: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Compute: {
        kind: "method",
        methodKind: "ordinary",
      },
      Copy: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateDataReader: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EndInit: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EndLoadData: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetChanges: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDataTableSchema: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetErrors: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetRowType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSchema: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ImportRow: {
        kind: "method",
        methodKind: "ordinary",
      },
      Load: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadDataRow: {
        kind: "method",
        methodKind: "ordinary",
      },
      Merge: {
        kind: "method",
        methodKind: "ordinary",
      },
      NewRow: {
        kind: "method",
        methodKind: "ordinary",
      },
      NewRowArray: {
        kind: "method",
        methodKind: "ordinary",
      },
      NewRowFromBuilder: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnColumnChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnColumnChanging: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnPropertyChanging: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRemoveColumn: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRowChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRowChanging: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRowDeleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRowDeleting: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnTableCleared: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnTableClearing: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnTableNewRow: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadXml: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadXmlSchema: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadXmlSerializable: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RejectChanges: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Select: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteXml: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteXmlSchema: {
        kind: "method",
        methodKind: "ordinary",
      },
      CaseSensitive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ChildRelations: {
        kind: "property",
        type: () => {
          return Data.DataRelationCollection;
        },
      },
      Columns: {
        kind: "property",
        type: () => {
          return Data.DataColumnCollection;
        },
      },
      Constraints: {
        kind: "property",
        type: () => {
          return Data.ConstraintCollection;
        },
      },
      DataSet: {
        kind: "property",
        type: () => {
          return Data.DataSet;
        },
      },
      DefaultView: {
        kind: "property",
        type: () => {
          return Data.DataView;
        },
      },
      DisplayExpression: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ExtendedProperties: {
        kind: "property",
        type: () => {
          return Data.PropertyCollection;
        },
      },
      HasErrors: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsInitialized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Locale: {
        kind: "property",
        type: () => {
          return Globalization.CultureInfo;
        },
      },
      MinimumCapacity: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ParentRelations: {
        kind: "property",
        type: () => {
          return Data.DataRelationCollection;
        },
      },
      Prefix: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      RemotingFormat: {
        kind: "property",
        type: () => {
          return Data.SerializationFormat;
        },
      },
      Rows: {
        kind: "property",
        type: () => {
          return Data.DataRowCollection;
        },
      },
      Site: {
        kind: "property",
        type: () => {
          return ComponentModel.ISite;
        },
        isOverride: true,
      },
      TableName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      PrimaryKey: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  DataTableClearEventArgs: {
    kind: "class",
    members: {
      DataTableClearEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Table: {
        kind: "property",
        type: () => {
          return Data.DataTable;
        },
      },
      TableName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      TableNamespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  DataTableClearEventHandler: {
    kind: "generic",
    members: {
      DataTableClearEventHandler: {
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
  DataTableCollection: {
    kind: "class",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      CanRemove: {
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
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return Data.DataTable;
        },
      },
      List: {
        kind: "property",
        type: () => {
          return Collections.ArrayList;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  DataTableExtensions: {
    kind: "class",
    members: {
      AsDataView: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AsEnumerable: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  DataTableNewRowEventArgs: {
    kind: "class",
    members: {
      DataTableNewRowEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Row: {
        kind: "property",
        type: () => {
          return Data.DataRow;
        },
      },
    },
    isSealed: true,
  },
  DataTableNewRowEventHandler: {
    kind: "generic",
    members: {
      DataTableNewRowEventHandler: {
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
  DataTableReader: {
    kind: "class",
    members: {
      DataTableReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetBoolean: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetByte: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetBytes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetChar: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetChars: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDataTypeName: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDecimal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDouble: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetFieldType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetFloat: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetGuid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetInt16: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetInt32: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetInt64: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetOrdinal: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetProviderSpecificFieldType: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetProviderSpecificValue: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetProviderSpecificValues: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetSchemaTable: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetValues: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsDBNull: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      NextResult: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Depth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      FieldCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      HasRows: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsClosed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isOverride: true,
      },
      RecordsAffected: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  DataView: {
    kind: "class",
    members: {
      DataView: {
        kind: "method",
        methodKind: "constructor",
      },
      AddNew: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BeginInit: {
        kind: "method",
        methodKind: "ordinary",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      ColumnCollectionChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Delete: {
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
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Find: {
        kind: "method",
        methodKind: "ordinary",
      },
      FindRows: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexListChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnListChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Open: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToTable: {
        kind: "method",
        methodKind: "ordinary",
      },
      UpdateIndex: {
        kind: "method",
        methodKind: "ordinary",
      },
      AllowDelete: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AllowEdit: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AllowNew: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ApplyDefaultSort: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      DataViewManager: {
        kind: "property",
        type: () => {
          return Data.DataViewManager;
        },
      },
      IsInitialized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsOpen: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return Data.DataRowView;
        },
      },
      RowFilter: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      RowStateFilter: {
        kind: "property",
        type: () => {
          return Data.DataViewRowState;
        },
      },
      Sort: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Table: {
        kind: "property",
        type: () => {
          return Data.DataTable;
        },
      },
    },
  },
  DataViewManager: {
    kind: "class",
    members: {
      DataViewManager: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateDataView: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnListChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RelationCollectionChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TableCollectionChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DataSet: {
        kind: "property",
        type: () => {
          return Data.DataSet;
        },
      },
      DataViewSettingCollectionString: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DataViewSettings: {
        kind: "property",
        type: () => {
          return Data.DataViewSettingCollection;
        },
      },
    },
  },
  DataViewRowState: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Data.DataViewRowState;
        },
      },
      Unchanged: {
        kind: "field",
        type: () => {
          return Data.DataViewRowState;
        },
      },
      Added: {
        kind: "field",
        type: () => {
          return Data.DataViewRowState;
        },
      },
      Deleted: {
        kind: "field",
        type: () => {
          return Data.DataViewRowState;
        },
      },
      ModifiedCurrent: {
        kind: "field",
        type: () => {
          return Data.DataViewRowState;
        },
      },
      CurrentRows: {
        kind: "field",
        type: () => {
          return Data.DataViewRowState;
        },
      },
      ModifiedOriginal: {
        kind: "field",
        type: () => {
          return Data.DataViewRowState;
        },
      },
      OriginalRows: {
        kind: "field",
        type: () => {
          return Data.DataViewRowState;
        },
      },
    },
  },
  DataViewSetting: {
    kind: "class",
    members: {
      ApplyDefaultSort: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      DataViewManager: {
        kind: "property",
        type: () => {
          return Data.DataViewManager;
        },
      },
      RowFilter: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      RowStateFilter: {
        kind: "property",
        type: () => {
          return Data.DataViewRowState;
        },
      },
      Sort: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Table: {
        kind: "property",
        type: () => {
          return Data.DataTable;
        },
      },
    },
  },
  DataViewSettingCollection: {
    kind: "class",
    members: {
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSynchronized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return Data.DataViewSetting;
        },
        isVirtual: true,
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
  },
  DbType: {
    kind: "enum",
    members: {
      AnsiString: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Binary: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Byte: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Boolean: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Currency: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Date: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      DateTime: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Decimal: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Double: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Guid: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Int16: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Int32: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Int64: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Object: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      SByte: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Single: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Time: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      UInt16: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      UInt32: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      UInt64: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      VarNumeric: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      AnsiStringFixedLength: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      StringFixedLength: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      Xml: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      DateTime2: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
      DateTimeOffset: {
        kind: "field",
        type: () => {
          return Data.DbType;
        },
      },
    },
  },
  DeletedRowInaccessibleException: {
    kind: "class",
    members: {
      DeletedRowInaccessibleException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  DuplicateNameException: {
    kind: "class",
    members: {
      DuplicateNameException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  EnumerableRowCollection: {
    kind: "class",
    members: {
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  EnumerableRowCollectionExtensions: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  EvaluateException: {
    kind: "class",
    members: {
      EvaluateException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  FillErrorEventArgs: {
    kind: "class",
    members: {
      FillErrorEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Continue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      DataTable: {
        kind: "property",
        type: () => {
          return Data.DataTable;
        },
      },
      Errors: {
        kind: "property",
        type: () => {
          return System.Exception;
        },
        isNullable: true,
      },
      Values: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  FillErrorEventHandler: {
    kind: "generic",
    members: {
      FillErrorEventHandler: {
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
  ForeignKeyConstraint: {
    kind: "class",
    members: {
      ForeignKeyConstraint: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AcceptRejectRule: {
        kind: "property",
        type: () => {
          return Data.AcceptRejectRule;
        },
        isVirtual: true,
      },
      Columns: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
      DeleteRule: {
        kind: "property",
        type: () => {
          return Data.Rule;
        },
        isVirtual: true,
      },
      RelatedColumns: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
      RelatedTable: {
        kind: "property",
        type: () => {
          return Data.DataTable;
        },
        isVirtual: true,
      },
      Table: {
        kind: "property",
        type: () => {
          return Data.DataTable;
        },
        isOverride: true,
      },
      UpdateRule: {
        kind: "property",
        type: () => {
          return Data.Rule;
        },
        isVirtual: true,
      },
    },
  },
  IColumnMapping: {
    kind: "interface",
    members: {
      DataSetColumn: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SourceColumn: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  IColumnMappingCollection: {
    kind: "interface",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetByDataSetColumn: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
  },
  IDataAdapter: {
    kind: "interface",
    members: {
      Fill: {
        kind: "method",
        methodKind: "ordinary",
      },
      FillSchema: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetFillParameters: {
        kind: "method",
        methodKind: "ordinary",
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      MissingMappingAction: {
        kind: "property",
        type: () => {
          return Data.MissingMappingAction;
        },
      },
      MissingSchemaAction: {
        kind: "property",
        type: () => {
          return Data.MissingSchemaAction;
        },
      },
      TableMappings: {
        kind: "property",
        type: () => {
          return Data.ITableMappingCollection;
        },
      },
    },
  },
  IDataParameter: {
    kind: "interface",
    members: {
      DbType: {
        kind: "property",
        type: () => {
          return Data.DbType;
        },
      },
      Direction: {
        kind: "property",
        type: () => {
          return Data.ParameterDirection;
        },
      },
      IsNullable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ParameterName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SourceColumn: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SourceVersion: {
        kind: "property",
        type: () => {
          return Data.DataRowVersion;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  IDataParameterCollection: {
    kind: "interface",
    members: {
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
  },
  IDataReader: {
    kind: "interface",
    members: {
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSchemaTable: {
        kind: "method",
        methodKind: "ordinary",
      },
      NextResult: {
        kind: "method",
        methodKind: "ordinary",
      },
      Read: {
        kind: "method",
        methodKind: "ordinary",
      },
      Depth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsClosed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      RecordsAffected: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  IDataRecord: {
    kind: "interface",
    members: {
      GetBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetChar: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetChars: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetData: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDataTypeName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDateTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetFieldType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetFloat: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetGuid: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOrdinal: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetString: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetValues: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsDBNull: {
        kind: "method",
        methodKind: "ordinary",
      },
      FieldCount: {
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
  },
  IDbCommand: {
    kind: "interface",
    members: {
      Cancel: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExecuteNonQuery: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExecuteReader: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExecuteScalar: {
        kind: "method",
        methodKind: "ordinary",
      },
      Prepare: {
        kind: "method",
        methodKind: "ordinary",
      },
      CommandText: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      CommandTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      CommandType: {
        kind: "property",
        type: () => {
          return Data.CommandType;
        },
      },
      Connection: {
        kind: "property",
        type: () => {
          return Data.IDbConnection;
        },
      },
      Parameters: {
        kind: "property",
        type: () => {
          return Data.IDataParameterCollection;
        },
      },
      Transaction: {
        kind: "property",
        type: () => {
          return Data.IDbTransaction;
        },
      },
      UpdatedRowSource: {
        kind: "property",
        type: () => {
          return Data.UpdateRowSource;
        },
      },
    },
  },
  IDbConnection: {
    kind: "interface",
    members: {
      BeginTransaction: {
        kind: "method",
        methodKind: "ordinary",
      },
      ChangeDatabase: {
        kind: "method",
        methodKind: "ordinary",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateCommand: {
        kind: "method",
        methodKind: "ordinary",
      },
      Open: {
        kind: "method",
        methodKind: "ordinary",
      },
      ConnectionString: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ConnectionTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Database: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      State: {
        kind: "property",
        type: () => {
          return Data.ConnectionState;
        },
      },
    },
  },
  IDbDataAdapter: {
    kind: "interface",
    members: {
      DeleteCommand: {
        kind: "property",
        type: () => {
          return Data.IDbCommand;
        },
        isNullable: true,
      },
      InsertCommand: {
        kind: "property",
        type: () => {
          return Data.IDbCommand;
        },
        isNullable: true,
      },
      SelectCommand: {
        kind: "property",
        type: () => {
          return Data.IDbCommand;
        },
        isNullable: true,
      },
      UpdateCommand: {
        kind: "property",
        type: () => {
          return Data.IDbCommand;
        },
        isNullable: true,
      },
    },
  },
  IDbDataParameter: {
    kind: "interface",
    members: {
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
      Size: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  IDbTransaction: {
    kind: "interface",
    members: {
      Commit: {
        kind: "method",
        methodKind: "ordinary",
      },
      Rollback: {
        kind: "method",
        methodKind: "ordinary",
      },
      Connection: {
        kind: "property",
        type: () => {
          return Data.IDbConnection;
        },
      },
      IsolationLevel: {
        kind: "property",
        type: () => {
          return Data.IsolationLevel;
        },
      },
    },
  },
  ITableMapping: {
    kind: "interface",
    members: {
      ColumnMappings: {
        kind: "property",
        type: () => {
          return Data.IColumnMappingCollection;
        },
      },
      DataSetTable: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SourceTable: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  ITableMappingCollection: {
    kind: "interface",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetByDataSetTable: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
  },
  InRowChangingEventException: {
    kind: "class",
    members: {
      InRowChangingEventException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  InternalDataCollectionBase: {
    kind: "class",
    members: {
      InternalDataCollectionBase: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSynchronized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      List: {
        kind: "property",
        type: () => {
          return Collections.ArrayList;
        },
        isVirtual: true,
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
  },
  InvalidConstraintException: {
    kind: "class",
    members: {
      InvalidConstraintException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  InvalidExpressionException: {
    kind: "class",
    members: {
      InvalidExpressionException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  IsolationLevel: {
    kind: "enum",
    members: {
      Unspecified: {
        kind: "field",
        type: () => {
          return Data.IsolationLevel;
        },
      },
      Chaos: {
        kind: "field",
        type: () => {
          return Data.IsolationLevel;
        },
      },
      ReadUncommitted: {
        kind: "field",
        type: () => {
          return Data.IsolationLevel;
        },
      },
      ReadCommitted: {
        kind: "field",
        type: () => {
          return Data.IsolationLevel;
        },
      },
      RepeatableRead: {
        kind: "field",
        type: () => {
          return Data.IsolationLevel;
        },
      },
      Serializable: {
        kind: "field",
        type: () => {
          return Data.IsolationLevel;
        },
      },
      Snapshot: {
        kind: "field",
        type: () => {
          return Data.IsolationLevel;
        },
      },
    },
  },
  KeyRestrictionBehavior: {
    kind: "enum",
    members: {
      AllowOnly: {
        kind: "field",
        type: () => {
          return Data.KeyRestrictionBehavior;
        },
      },
      PreventUsage: {
        kind: "field",
        type: () => {
          return Data.KeyRestrictionBehavior;
        },
      },
    },
  },
  LoadOption: {
    kind: "enum",
    members: {
      OverwriteChanges: {
        kind: "field",
        type: () => {
          return Data.LoadOption;
        },
      },
      PreserveChanges: {
        kind: "field",
        type: () => {
          return Data.LoadOption;
        },
      },
      Upsert: {
        kind: "field",
        type: () => {
          return Data.LoadOption;
        },
      },
    },
  },
  MappingType: {
    kind: "enum",
    members: {
      Element: {
        kind: "field",
        type: () => {
          return Data.MappingType;
        },
      },
      Attribute: {
        kind: "field",
        type: () => {
          return Data.MappingType;
        },
      },
      SimpleContent: {
        kind: "field",
        type: () => {
          return Data.MappingType;
        },
      },
      Hidden: {
        kind: "field",
        type: () => {
          return Data.MappingType;
        },
      },
    },
  },
  MergeFailedEventArgs: {
    kind: "class",
    members: {
      MergeFailedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Conflict: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Table: {
        kind: "property",
        type: () => {
          return Data.DataTable;
        },
      },
    },
  },
  MergeFailedEventHandler: {
    kind: "generic",
    members: {
      MergeFailedEventHandler: {
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
  MissingMappingAction: {
    kind: "enum",
    members: {
      Passthrough: {
        kind: "field",
        type: () => {
          return Data.MissingMappingAction;
        },
      },
      Ignore: {
        kind: "field",
        type: () => {
          return Data.MissingMappingAction;
        },
      },
      Error: {
        kind: "field",
        type: () => {
          return Data.MissingMappingAction;
        },
      },
    },
  },
  MissingPrimaryKeyException: {
    kind: "class",
    members: {
      MissingPrimaryKeyException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  MissingSchemaAction: {
    kind: "enum",
    members: {
      Add: {
        kind: "field",
        type: () => {
          return Data.MissingSchemaAction;
        },
      },
      Ignore: {
        kind: "field",
        type: () => {
          return Data.MissingSchemaAction;
        },
      },
      Error: {
        kind: "field",
        type: () => {
          return Data.MissingSchemaAction;
        },
      },
      AddWithKey: {
        kind: "field",
        type: () => {
          return Data.MissingSchemaAction;
        },
      },
    },
  },
  NoNullAllowedException: {
    kind: "class",
    members: {
      NoNullAllowedException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  OrderedEnumerableRowCollection: {
    kind: "class",
    members: {},
    isSealed: true,
  },
  ParameterDirection: {
    kind: "enum",
    members: {
      Input: {
        kind: "field",
        type: () => {
          return Data.ParameterDirection;
        },
      },
      Output: {
        kind: "field",
        type: () => {
          return Data.ParameterDirection;
        },
      },
      InputOutput: {
        kind: "field",
        type: () => {
          return Data.ParameterDirection;
        },
      },
      ReturnValue: {
        kind: "field",
        type: () => {
          return Data.ParameterDirection;
        },
      },
    },
  },
  PropertyCollection: {
    kind: "class",
    members: {
      PropertyCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  ReadOnlyException: {
    kind: "class",
    members: {
      ReadOnlyException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  RowNotInTableException: {
    kind: "class",
    members: {
      RowNotInTableException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Rule: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Data.Rule;
        },
      },
      Cascade: {
        kind: "field",
        type: () => {
          return Data.Rule;
        },
      },
      SetNull: {
        kind: "field",
        type: () => {
          return Data.Rule;
        },
      },
      SetDefault: {
        kind: "field",
        type: () => {
          return Data.Rule;
        },
      },
    },
  },
  SchemaSerializationMode: {
    kind: "enum",
    members: {
      IncludeSchema: {
        kind: "field",
        type: () => {
          return Data.SchemaSerializationMode;
        },
      },
      ExcludeSchema: {
        kind: "field",
        type: () => {
          return Data.SchemaSerializationMode;
        },
      },
    },
  },
  SchemaType: {
    kind: "enum",
    members: {
      Source: {
        kind: "field",
        type: () => {
          return Data.SchemaType;
        },
      },
      Mapped: {
        kind: "field",
        type: () => {
          return Data.SchemaType;
        },
      },
    },
  },
  SerializationFormat: {
    kind: "enum",
    members: {
      Xml: {
        kind: "field",
        type: () => {
          return Data.SerializationFormat;
        },
      },
      Binary: {
        kind: "field",
        type: () => {
          return Data.SerializationFormat;
        },
      },
    },
  },
  SqlDbType: {
    kind: "enum",
    members: {
      BigInt: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Binary: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Bit: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Char: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      DateTime: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Decimal: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Float: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Image: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Int: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Money: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      NChar: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      NText: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      NVarChar: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Real: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      UniqueIdentifier: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      SmallDateTime: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      SmallInt: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      SmallMoney: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Text: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Timestamp: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      TinyInt: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      VarBinary: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      VarChar: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Variant: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Xml: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Udt: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Structured: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Date: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Time: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      DateTime2: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      DateTimeOffset: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
      Json: {
        kind: "field",
        type: () => {
          return Data.SqlDbType;
        },
      },
    },
  },
  StateChangeEventArgs: {
    kind: "class",
    members: {
      StateChangeEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      CurrentState: {
        kind: "property",
        type: () => {
          return Data.ConnectionState;
        },
      },
      OriginalState: {
        kind: "property",
        type: () => {
          return Data.ConnectionState;
        },
      },
    },
    isSealed: true,
  },
  StateChangeEventHandler: {
    kind: "generic",
    members: {
      StateChangeEventHandler: {
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
  StatementCompletedEventArgs: {
    kind: "class",
    members: {
      StatementCompletedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      RecordCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  StatementCompletedEventHandler: {
    kind: "generic",
    members: {
      StatementCompletedEventHandler: {
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
  StatementType: {
    kind: "enum",
    members: {
      Select: {
        kind: "field",
        type: () => {
          return Data.StatementType;
        },
      },
      Insert: {
        kind: "field",
        type: () => {
          return Data.StatementType;
        },
      },
      Update: {
        kind: "field",
        type: () => {
          return Data.StatementType;
        },
      },
      Delete: {
        kind: "field",
        type: () => {
          return Data.StatementType;
        },
      },
      Batch: {
        kind: "field",
        type: () => {
          return Data.StatementType;
        },
      },
    },
  },
  StrongTypingException: {
    kind: "class",
    members: {
      StrongTypingException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  SyntaxErrorException: {
    kind: "class",
    members: {
      SyntaxErrorException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  TypedTableBase: {
    kind: "class",
    members: {
      TypedTableBase: {
        kind: "method",
        methodKind: "constructor",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isAbstract: true,
  },
  TypedTableBaseExtensions: {
    kind: "class",
    members: {},
    isStatic: true,
  },
  UniqueConstraint: {
    kind: "class",
    members: {
      UniqueConstraint: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Columns: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
      IsPrimaryKey: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Table: {
        kind: "property",
        type: () => {
          return Data.DataTable;
        },
        isOverride: true,
      },
    },
  },
  UpdateRowSource: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Data.UpdateRowSource;
        },
      },
      OutputParameters: {
        kind: "field",
        type: () => {
          return Data.UpdateRowSource;
        },
      },
      FirstReturnedRecord: {
        kind: "field",
        type: () => {
          return Data.UpdateRowSource;
        },
      },
      Both: {
        kind: "field",
        type: () => {
          return Data.UpdateRowSource;
        },
      },
    },
  },
  UpdateStatus: {
    kind: "enum",
    members: {
      Continue: {
        kind: "field",
        type: () => {
          return Data.UpdateStatus;
        },
      },
      ErrorsOccurred: {
        kind: "field",
        type: () => {
          return Data.UpdateStatus;
        },
      },
      SkipCurrentRow: {
        kind: "field",
        type: () => {
          return Data.UpdateStatus;
        },
      },
      SkipAllRemainingRows: {
        kind: "field",
        type: () => {
          return Data.UpdateStatus;
        },
      },
    },
  },
  VersionNotFoundException: {
    kind: "class",
    members: {
      VersionNotFoundException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  XmlReadMode: {
    kind: "enum",
    members: {
      Auto: {
        kind: "field",
        type: () => {
          return Data.XmlReadMode;
        },
      },
      ReadSchema: {
        kind: "field",
        type: () => {
          return Data.XmlReadMode;
        },
      },
      IgnoreSchema: {
        kind: "field",
        type: () => {
          return Data.XmlReadMode;
        },
      },
      InferSchema: {
        kind: "field",
        type: () => {
          return Data.XmlReadMode;
        },
      },
      DiffGram: {
        kind: "field",
        type: () => {
          return Data.XmlReadMode;
        },
      },
      Fragment: {
        kind: "field",
        type: () => {
          return Data.XmlReadMode;
        },
      },
      InferTypedSchema: {
        kind: "field",
        type: () => {
          return Data.XmlReadMode;
        },
      },
    },
  },
  XmlWriteMode: {
    kind: "enum",
    members: {
      WriteSchema: {
        kind: "field",
        type: () => {
          return Data.XmlWriteMode;
        },
      },
      IgnoreSchema: {
        kind: "field",
        type: () => {
          return Data.XmlWriteMode;
        },
      },
      DiffGram: {
        kind: "field",
        type: () => {
          return Data.XmlWriteMode;
        },
      },
    },
  },
});
export default Data
