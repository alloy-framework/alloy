import Collections from "../../Collections/index.js";
import Data from "../index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type CommonLibrary = LibrarySymbolReference & {
  CatalogLocation: LibrarySymbolReference & {
    Start: LibrarySymbolReference;
    End: LibrarySymbolReference
  };
  DataAdapter: LibrarySymbolReference & {
    DataAdapter: LibrarySymbolReference;
    CloneInternals: LibrarySymbolReference;
    CreateTableMappings: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Fill: LibrarySymbolReference;
    FillSchema: LibrarySymbolReference;
    GetFillParameters: LibrarySymbolReference;
    HasTableMappings: LibrarySymbolReference;
    OnFillError: LibrarySymbolReference;
    ShouldSerializeTableMappings: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    AcceptChangesDuringFill: LibrarySymbolReference;
    AcceptChangesDuringUpdate: LibrarySymbolReference;
    ContinueUpdateOnError: LibrarySymbolReference;
    FillLoadOption: LibrarySymbolReference;
    MissingMappingAction: LibrarySymbolReference;
    MissingSchemaAction: LibrarySymbolReference;
    ReturnProviderSpecificTypes: LibrarySymbolReference;
    TableMappings: LibrarySymbolReference
  };
  DataColumnMapping: LibrarySymbolReference & {
    DataColumnMapping: LibrarySymbolReference;
    GetDataColumnBySchemaAction: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    DataSetColumn: LibrarySymbolReference;
    SourceColumn: LibrarySymbolReference
  };
  DataColumnMappingCollection: LibrarySymbolReference & {
    DataColumnMappingCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetByDataSetColumn: LibrarySymbolReference;
    GetColumnMappingBySchemaAction: LibrarySymbolReference;
    GetDataColumn: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    IndexOfDataSetColumn: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  DataTableMapping: LibrarySymbolReference & {
    DataTableMapping: LibrarySymbolReference;
    GetColumnMappingBySchemaAction: LibrarySymbolReference;
    GetDataColumn: LibrarySymbolReference;
    GetDataTableBySchemaAction: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ColumnMappings: LibrarySymbolReference;
    DataSetTable: LibrarySymbolReference;
    SourceTable: LibrarySymbolReference
  };
  DataTableMappingCollection: LibrarySymbolReference & {
    DataTableMappingCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetByDataSetTable: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    GetTableMappingBySchemaAction: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    IndexOfDataSetTable: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  DbBatch: LibrarySymbolReference & {
    ExecuteReader: LibrarySymbolReference;
    ExecuteDbDataReader: LibrarySymbolReference;
    ExecuteReaderAsync: LibrarySymbolReference;
    ExecuteDbDataReaderAsync: LibrarySymbolReference;
    ExecuteNonQuery: LibrarySymbolReference;
    ExecuteNonQueryAsync: LibrarySymbolReference;
    ExecuteScalar: LibrarySymbolReference;
    ExecuteScalarAsync: LibrarySymbolReference;
    Prepare: LibrarySymbolReference;
    PrepareAsync: LibrarySymbolReference;
    Cancel: LibrarySymbolReference;
    CreateBatchCommand: LibrarySymbolReference;
    CreateDbBatchCommand: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    DbBatch: LibrarySymbolReference;
    BatchCommands: LibrarySymbolReference;
    DbBatchCommands: LibrarySymbolReference;
    Timeout: LibrarySymbolReference;
    Connection: LibrarySymbolReference;
    DbConnection: LibrarySymbolReference;
    Transaction: LibrarySymbolReference;
    DbTransaction: LibrarySymbolReference
  };
  DbBatchCommand: LibrarySymbolReference & {
    CreateParameter: LibrarySymbolReference;
    DbBatchCommand: LibrarySymbolReference;
    CommandText: LibrarySymbolReference;
    CommandType: LibrarySymbolReference;
    RecordsAffected: LibrarySymbolReference;
    Parameters: LibrarySymbolReference;
    DbParameterCollection: LibrarySymbolReference;
    CanCreateParameter: LibrarySymbolReference
  };
  DbBatchCommandCollection: LibrarySymbolReference & {
    GetEnumerator: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    GetBatchCommand: LibrarySymbolReference;
    SetBatchCommand: LibrarySymbolReference;
    DbBatchCommandCollection: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  DbColumn: LibrarySymbolReference & {
    DbColumn: LibrarySymbolReference;
    AllowDBNull: LibrarySymbolReference;
    BaseCatalogName: LibrarySymbolReference;
    BaseColumnName: LibrarySymbolReference;
    BaseSchemaName: LibrarySymbolReference;
    BaseServerName: LibrarySymbolReference;
    BaseTableName: LibrarySymbolReference;
    ColumnName: LibrarySymbolReference;
    ColumnOrdinal: LibrarySymbolReference;
    ColumnSize: LibrarySymbolReference;
    DataType: LibrarySymbolReference;
    DataTypeName: LibrarySymbolReference;
    IsAliased: LibrarySymbolReference;
    IsAutoIncrement: LibrarySymbolReference;
    IsExpression: LibrarySymbolReference;
    IsHidden: LibrarySymbolReference;
    IsIdentity: LibrarySymbolReference;
    IsKey: LibrarySymbolReference;
    IsLong: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsUnique: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    NumericPrecision: LibrarySymbolReference;
    NumericScale: LibrarySymbolReference;
    UdtAssemblyQualifiedName: LibrarySymbolReference
  };
  DbCommand: LibrarySymbolReference & {
    DbCommand: LibrarySymbolReference;
    Cancel: LibrarySymbolReference;
    CreateDbParameter: LibrarySymbolReference;
    CreateParameter: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    ExecuteDbDataReader: LibrarySymbolReference;
    ExecuteDbDataReaderAsync: LibrarySymbolReference;
    ExecuteNonQuery: LibrarySymbolReference;
    ExecuteNonQueryAsync: LibrarySymbolReference;
    ExecuteReader: LibrarySymbolReference;
    ExecuteReaderAsync: LibrarySymbolReference;
    ExecuteScalar: LibrarySymbolReference;
    ExecuteScalarAsync: LibrarySymbolReference;
    Prepare: LibrarySymbolReference;
    PrepareAsync: LibrarySymbolReference;
    CommandText: LibrarySymbolReference;
    CommandTimeout: LibrarySymbolReference;
    CommandType: LibrarySymbolReference;
    Connection: LibrarySymbolReference;
    DbConnection: LibrarySymbolReference;
    DbParameterCollection: LibrarySymbolReference;
    DbTransaction: LibrarySymbolReference;
    Parameters: LibrarySymbolReference;
    Transaction: LibrarySymbolReference;
    UpdatedRowSource: LibrarySymbolReference
  };
  DbCommandBuilder: LibrarySymbolReference & {
    DbCommandBuilder: LibrarySymbolReference;
    ApplyParameterInfo: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetDeleteCommand: LibrarySymbolReference;
    GetInsertCommand: LibrarySymbolReference;
    GetParameterName: LibrarySymbolReference;
    GetParameterPlaceholder: LibrarySymbolReference;
    GetSchemaTable: LibrarySymbolReference;
    GetUpdateCommand: LibrarySymbolReference;
    InitializeCommand: LibrarySymbolReference;
    QuoteIdentifier: LibrarySymbolReference;
    RefreshSchema: LibrarySymbolReference;
    RowUpdatingHandler: LibrarySymbolReference;
    SetRowUpdatingHandler: LibrarySymbolReference;
    UnquoteIdentifier: LibrarySymbolReference;
    CatalogLocation: LibrarySymbolReference;
    CatalogSeparator: LibrarySymbolReference;
    ConflictOption: LibrarySymbolReference;
    DataAdapter: LibrarySymbolReference;
    QuotePrefix: LibrarySymbolReference;
    QuoteSuffix: LibrarySymbolReference;
    SchemaSeparator: LibrarySymbolReference;
    SetAllValues: LibrarySymbolReference
  };
  DbConnection: LibrarySymbolReference & {
    DbConnection: LibrarySymbolReference;
    BeginDbTransaction: LibrarySymbolReference;
    BeginDbTransactionAsync: LibrarySymbolReference;
    BeginTransaction: LibrarySymbolReference;
    BeginTransactionAsync: LibrarySymbolReference;
    ChangeDatabase: LibrarySymbolReference;
    ChangeDatabaseAsync: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    CloseAsync: LibrarySymbolReference;
    CreateBatch: LibrarySymbolReference;
    CreateDbBatch: LibrarySymbolReference;
    CreateCommand: LibrarySymbolReference;
    CreateDbCommand: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    EnlistTransaction: LibrarySymbolReference;
    GetSchema: LibrarySymbolReference;
    GetSchemaAsync: LibrarySymbolReference;
    OnStateChange: LibrarySymbolReference;
    Open: LibrarySymbolReference;
    OpenAsync: LibrarySymbolReference;
    ConnectionString: LibrarySymbolReference;
    ConnectionTimeout: LibrarySymbolReference;
    Database: LibrarySymbolReference;
    DataSource: LibrarySymbolReference;
    DbProviderFactory: LibrarySymbolReference;
    ServerVersion: LibrarySymbolReference;
    State: LibrarySymbolReference;
    CanCreateBatch: LibrarySymbolReference
  };
  DbConnectionStringBuilder: LibrarySymbolReference & {
    DbConnectionStringBuilder: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AppendKeyValuePair: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    ClearPropertyDescriptors: LibrarySymbolReference;
    ContainsKey: LibrarySymbolReference;
    EquivalentTo: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    ShouldSerialize: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryGetValue: LibrarySymbolReference;
    ConnectionString: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsFixedSize: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Keys: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  DbDataAdapter: LibrarySymbolReference & {
    DefaultSourceTableName: LibrarySymbolReference;
    DbDataAdapter: LibrarySymbolReference;
    AddToBatch: LibrarySymbolReference;
    ClearBatch: LibrarySymbolReference;
    CreateRowUpdatedEvent: LibrarySymbolReference;
    CreateRowUpdatingEvent: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    ExecuteBatch: LibrarySymbolReference;
    Fill: LibrarySymbolReference;
    FillSchema: LibrarySymbolReference;
    GetBatchedParameter: LibrarySymbolReference;
    GetBatchedRecordsAffected: LibrarySymbolReference;
    GetFillParameters: LibrarySymbolReference;
    InitializeBatching: LibrarySymbolReference;
    OnRowUpdated: LibrarySymbolReference;
    OnRowUpdating: LibrarySymbolReference;
    TerminateBatching: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    DeleteCommand: LibrarySymbolReference;
    FillCommandBehavior: LibrarySymbolReference;
    InsertCommand: LibrarySymbolReference;
    SelectCommand: LibrarySymbolReference;
    UpdateBatchSize: LibrarySymbolReference;
    UpdateCommand: LibrarySymbolReference
  };
  DbDataReader: LibrarySymbolReference & {
    DbDataReader: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    CloseAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    GetBoolean: LibrarySymbolReference;
    GetByte: LibrarySymbolReference;
    GetBytes: LibrarySymbolReference;
    GetChar: LibrarySymbolReference;
    GetChars: LibrarySymbolReference;
    GetDataTypeName: LibrarySymbolReference;
    GetDateTime: LibrarySymbolReference;
    GetDbDataReader: LibrarySymbolReference;
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
    GetSchemaTable: LibrarySymbolReference;
    GetSchemaTableAsync: LibrarySymbolReference;
    GetColumnSchemaAsync: LibrarySymbolReference;
    GetStream: LibrarySymbolReference;
    GetString: LibrarySymbolReference;
    GetTextReader: LibrarySymbolReference;
    GetValue: LibrarySymbolReference;
    GetValues: LibrarySymbolReference;
    IsDBNull: LibrarySymbolReference;
    IsDBNullAsync: LibrarySymbolReference;
    NextResult: LibrarySymbolReference;
    NextResultAsync: LibrarySymbolReference;
    Read: LibrarySymbolReference;
    ReadAsync: LibrarySymbolReference;
    Depth: LibrarySymbolReference;
    FieldCount: LibrarySymbolReference;
    HasRows: LibrarySymbolReference;
    IsClosed: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    RecordsAffected: LibrarySymbolReference;
    VisibleFieldCount: LibrarySymbolReference
  };
  DbDataReaderExtensions: LibrarySymbolReference & {
    CanGetColumnSchema: LibrarySymbolReference;
    GetColumnSchema: LibrarySymbolReference
  };
  DbDataRecord: LibrarySymbolReference & {
    DbDataRecord: LibrarySymbolReference;
    GetBoolean: LibrarySymbolReference;
    GetByte: LibrarySymbolReference;
    GetBytes: LibrarySymbolReference;
    GetChar: LibrarySymbolReference;
    GetChars: LibrarySymbolReference;
    GetData: LibrarySymbolReference;
    GetDataTypeName: LibrarySymbolReference;
    GetDateTime: LibrarySymbolReference;
    GetDbDataReader: LibrarySymbolReference;
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
  DbDataSource: LibrarySymbolReference & {
    CreateDbConnection: LibrarySymbolReference;
    OpenDbConnection: LibrarySymbolReference;
    OpenDbConnectionAsync: LibrarySymbolReference;
    CreateDbCommand: LibrarySymbolReference;
    CreateDbBatch: LibrarySymbolReference;
    CreateConnection: LibrarySymbolReference;
    OpenConnection: LibrarySymbolReference;
    OpenConnectionAsync: LibrarySymbolReference;
    CreateCommand: LibrarySymbolReference;
    CreateBatch: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    DisposeAsyncCore: LibrarySymbolReference;
    DbDataSource: LibrarySymbolReference;
    ConnectionString: LibrarySymbolReference
  };
  DbDataSourceEnumerator: LibrarySymbolReference & {
    DbDataSourceEnumerator: LibrarySymbolReference;
    GetDataSources: LibrarySymbolReference
  };
  DbEnumerator: LibrarySymbolReference & {
    DbEnumerator: LibrarySymbolReference;
    MoveNext: LibrarySymbolReference;
    Current: LibrarySymbolReference
  };
  DbException: LibrarySymbolReference & {
    DbException: LibrarySymbolReference;
    IsTransient: LibrarySymbolReference;
    SqlState: LibrarySymbolReference;
    BatchCommand: LibrarySymbolReference;
    DbBatchCommand: LibrarySymbolReference
  };
  DbMetaDataCollectionNames: LibrarySymbolReference & {
    DataSourceInformation: LibrarySymbolReference;
    DataTypes: LibrarySymbolReference;
    MetaDataCollections: LibrarySymbolReference;
    ReservedWords: LibrarySymbolReference;
    Restrictions: LibrarySymbolReference
  };
  DbMetaDataColumnNames: LibrarySymbolReference & {
    CollectionName: LibrarySymbolReference;
    ColumnSize: LibrarySymbolReference;
    CompositeIdentifierSeparatorPattern: LibrarySymbolReference;
    CreateFormat: LibrarySymbolReference;
    CreateParameters: LibrarySymbolReference;
    DataSourceProductName: LibrarySymbolReference;
    DataSourceProductVersion: LibrarySymbolReference;
    DataSourceProductVersionNormalized: LibrarySymbolReference;
    DataType: LibrarySymbolReference;
    GroupByBehavior: LibrarySymbolReference;
    IdentifierCase: LibrarySymbolReference;
    IdentifierPattern: LibrarySymbolReference;
    IsAutoIncrementable: LibrarySymbolReference;
    IsBestMatch: LibrarySymbolReference;
    IsCaseSensitive: LibrarySymbolReference;
    IsConcurrencyType: LibrarySymbolReference;
    IsFixedLength: LibrarySymbolReference;
    IsFixedPrecisionScale: LibrarySymbolReference;
    IsLiteralSupported: LibrarySymbolReference;
    IsLong: LibrarySymbolReference;
    IsNullable: LibrarySymbolReference;
    IsSearchable: LibrarySymbolReference;
    IsSearchableWithLike: LibrarySymbolReference;
    IsUnsigned: LibrarySymbolReference;
    LiteralPrefix: LibrarySymbolReference;
    LiteralSuffix: LibrarySymbolReference;
    MaximumScale: LibrarySymbolReference;
    MinimumScale: LibrarySymbolReference;
    NumberOfIdentifierParts: LibrarySymbolReference;
    NumberOfRestrictions: LibrarySymbolReference;
    OrderByColumnsInSelect: LibrarySymbolReference;
    ParameterMarkerFormat: LibrarySymbolReference;
    ParameterMarkerPattern: LibrarySymbolReference;
    ParameterNameMaxLength: LibrarySymbolReference;
    ParameterNamePattern: LibrarySymbolReference;
    ProviderDbType: LibrarySymbolReference;
    QuotedIdentifierCase: LibrarySymbolReference;
    QuotedIdentifierPattern: LibrarySymbolReference;
    ReservedWord: LibrarySymbolReference;
    StatementSeparatorPattern: LibrarySymbolReference;
    StringLiteralPattern: LibrarySymbolReference;
    SupportedJoinOperators: LibrarySymbolReference;
    TypeName: LibrarySymbolReference
  };
  DbParameter: LibrarySymbolReference & {
    DbParameter: LibrarySymbolReference;
    ResetDbType: LibrarySymbolReference;
    DbType: LibrarySymbolReference;
    Direction: LibrarySymbolReference;
    ParameterName: LibrarySymbolReference;
    Precision: LibrarySymbolReference;
    Scale: LibrarySymbolReference;
    Size: LibrarySymbolReference;
    SourceColumn: LibrarySymbolReference;
    SourceColumnNullMapping: LibrarySymbolReference;
    SourceVersion: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  DbParameterCollection: LibrarySymbolReference & {
    DbParameterCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetParameter: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    SetParameter: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  DbProviderFactories: LibrarySymbolReference & {
    GetFactory: LibrarySymbolReference;
    GetFactoryClasses: LibrarySymbolReference;
    GetProviderInvariantNames: LibrarySymbolReference;
    RegisterFactory: LibrarySymbolReference;
    TryGetFactory: LibrarySymbolReference;
    UnregisterFactory: LibrarySymbolReference
  };
  DbProviderFactory: LibrarySymbolReference & {
    DbProviderFactory: LibrarySymbolReference;
    CreateBatch: LibrarySymbolReference;
    CreateBatchCommand: LibrarySymbolReference;
    CreateCommand: LibrarySymbolReference;
    CreateCommandBuilder: LibrarySymbolReference;
    CreateConnection: LibrarySymbolReference;
    CreateConnectionStringBuilder: LibrarySymbolReference;
    CreateDataAdapter: LibrarySymbolReference;
    CreateDataSourceEnumerator: LibrarySymbolReference;
    CreateParameter: LibrarySymbolReference;
    CreateDataSource: LibrarySymbolReference;
    CanCreateBatch: LibrarySymbolReference;
    CanCreateCommandBuilder: LibrarySymbolReference;
    CanCreateDataAdapter: LibrarySymbolReference;
    CanCreateDataSourceEnumerator: LibrarySymbolReference
  };
  DbProviderSpecificTypePropertyAttribute: LibrarySymbolReference & {
    DbProviderSpecificTypePropertyAttribute: LibrarySymbolReference;
    IsProviderSpecificTypeProperty: LibrarySymbolReference
  };
  DbTransaction: LibrarySymbolReference & {
    DbTransaction: LibrarySymbolReference;
    Commit: LibrarySymbolReference;
    CommitAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    Rollback: LibrarySymbolReference;
    RollbackAsync: LibrarySymbolReference;
    SaveAsync: LibrarySymbolReference;
    ReleaseAsync: LibrarySymbolReference;
    Save: LibrarySymbolReference;
    Release: LibrarySymbolReference;
    Connection: LibrarySymbolReference;
    DbConnection: LibrarySymbolReference;
    IsolationLevel: LibrarySymbolReference;
    SupportsSavepoints: LibrarySymbolReference
  };
  GroupByBehavior: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    NotSupported: LibrarySymbolReference;
    Unrelated: LibrarySymbolReference;
    MustContainAll: LibrarySymbolReference;
    ExactMatch: LibrarySymbolReference
  };
  IDbColumnSchemaGenerator: LibrarySymbolReference & {
    GetColumnSchema: LibrarySymbolReference
  };
  IdentifierCase: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    Insensitive: LibrarySymbolReference;
    Sensitive: LibrarySymbolReference
  };
  RowUpdatedEventArgs: LibrarySymbolReference & {
    RowUpdatedEventArgs: LibrarySymbolReference;
    CopyToRows: LibrarySymbolReference;
    Command: LibrarySymbolReference;
    Errors: LibrarySymbolReference;
    RecordsAffected: LibrarySymbolReference;
    Row: LibrarySymbolReference;
    RowCount: LibrarySymbolReference;
    StatementType: LibrarySymbolReference;
    Status: LibrarySymbolReference;
    TableMapping: LibrarySymbolReference
  };
  RowUpdatingEventArgs: LibrarySymbolReference & {
    RowUpdatingEventArgs: LibrarySymbolReference;
    BaseCommand: LibrarySymbolReference;
    Command: LibrarySymbolReference;
    Errors: LibrarySymbolReference;
    Row: LibrarySymbolReference;
    StatementType: LibrarySymbolReference;
    Status: LibrarySymbolReference;
    TableMapping: LibrarySymbolReference
  };
  SchemaTableColumn: LibrarySymbolReference & {
    AllowDBNull: LibrarySymbolReference;
    BaseColumnName: LibrarySymbolReference;
    BaseSchemaName: LibrarySymbolReference;
    BaseTableName: LibrarySymbolReference;
    ColumnName: LibrarySymbolReference;
    ColumnOrdinal: LibrarySymbolReference;
    ColumnSize: LibrarySymbolReference;
    DataType: LibrarySymbolReference;
    IsAliased: LibrarySymbolReference;
    IsExpression: LibrarySymbolReference;
    IsKey: LibrarySymbolReference;
    IsLong: LibrarySymbolReference;
    IsUnique: LibrarySymbolReference;
    NonVersionedProviderType: LibrarySymbolReference;
    NumericPrecision: LibrarySymbolReference;
    NumericScale: LibrarySymbolReference;
    ProviderType: LibrarySymbolReference
  };
  SchemaTableOptionalColumn: LibrarySymbolReference & {
    AutoIncrementSeed: LibrarySymbolReference;
    AutoIncrementStep: LibrarySymbolReference;
    BaseCatalogName: LibrarySymbolReference;
    BaseColumnNamespace: LibrarySymbolReference;
    BaseServerName: LibrarySymbolReference;
    BaseTableNamespace: LibrarySymbolReference;
    ColumnMapping: LibrarySymbolReference;
    DefaultValue: LibrarySymbolReference;
    Expression: LibrarySymbolReference;
    IsAutoIncrement: LibrarySymbolReference;
    IsHidden: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsRowVersion: LibrarySymbolReference;
    ProviderSpecificDataType: LibrarySymbolReference
  };
  SupportedJoinOperators: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Inner: LibrarySymbolReference;
    LeftOuter: LibrarySymbolReference;
    RightOuter: LibrarySymbolReference;
    FullOuter: LibrarySymbolReference
  }
};
const Common: CommonLibrary = createLibrary("System.Data.Common", {
  CatalogLocation: {
    kind: "enum",
    members: {
      Start: {
        kind: "field",
        type: () => {
          return Common.CatalogLocation;
        },
      },
      End: {
        kind: "field",
        type: () => {
          return Common.CatalogLocation;
        },
      },
    },
  },
  DataAdapter: {
    kind: "class",
    members: {
      DataAdapter: {
        kind: "method",
        methodKind: "constructor",
      },
      CloneInternals: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateTableMappings: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Fill: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      FillSchema: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetFillParameters: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      HasTableMappings: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnFillError: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ShouldSerializeTableMappings: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AcceptChangesDuringFill: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AcceptChangesDuringUpdate: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ContinueUpdateOnError: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      FillLoadOption: {
        kind: "property",
        type: () => {
          return Data.LoadOption;
        },
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
      ReturnProviderSpecificTypes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      TableMappings: {
        kind: "property",
        type: () => {
          return Common.DataTableMappingCollection;
        },
      },
    },
  },
  DataColumnMapping: {
    kind: "class",
    members: {
      DataColumnMapping: {
        kind: "method",
        methodKind: "constructor",
      },
      GetDataColumnBySchemaAction: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
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
    isSealed: true,
  },
  DataColumnMappingCollection: {
    kind: "class",
    members: {
      DataColumnMappingCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddRange: {
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
      GetByDataSetColumn: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetColumnMappingBySchemaAction: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDataColumn: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOfDataSetColumn: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
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
      },
      Item: {
        kind: "property",
        type: () => {
          return Common.DataColumnMapping;
        },
      },
    },
    isSealed: true,
  },
  DataTableMapping: {
    kind: "class",
    members: {
      DataTableMapping: {
        kind: "method",
        methodKind: "constructor",
      },
      GetColumnMappingBySchemaAction: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDataColumn: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDataTableBySchemaAction: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ColumnMappings: {
        kind: "property",
        type: () => {
          return Common.DataColumnMappingCollection;
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
    isSealed: true,
  },
  DataTableMappingCollection: {
    kind: "class",
    members: {
      DataTableMappingCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddRange: {
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
      GetByDataSetTable: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetTableMappingBySchemaAction: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOfDataSetTable: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
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
      },
      Item: {
        kind: "property",
        type: () => {
          return Common.DataTableMapping;
        },
      },
    },
    isSealed: true,
  },
  DbBatch: {
    kind: "class",
    members: {
      ExecuteReader: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExecuteDbDataReader: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ExecuteReaderAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExecuteDbDataReaderAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ExecuteNonQuery: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ExecuteNonQueryAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ExecuteScalar: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ExecuteScalarAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Prepare: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      PrepareAsync: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Cancel: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CreateBatchCommand: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateDbBatchCommand: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DbBatch: {
        kind: "method",
        methodKind: "constructor",
      },
      BatchCommands: {
        kind: "property",
        type: () => {
          return Common.DbBatchCommandCollection;
        },
      },
      DbBatchCommands: {
        kind: "property",
        type: () => {
          return Common.DbBatchCommandCollection;
        },
        isAbstract: true,
      },
      Timeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      Connection: {
        kind: "property",
        type: () => {
          return Common.DbConnection;
        },
      },
      DbConnection: {
        kind: "property",
        type: () => {
          return Common.DbConnection;
        },
        isAbstract: true,
      },
      Transaction: {
        kind: "property",
        type: () => {
          return Common.DbTransaction;
        },
      },
      DbTransaction: {
        kind: "property",
        type: () => {
          return Common.DbTransaction;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  DbBatchCommand: {
    kind: "class",
    members: {
      CreateParameter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DbBatchCommand: {
        kind: "method",
        methodKind: "constructor",
      },
      CommandText: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      CommandType: {
        kind: "property",
        type: () => {
          return Data.CommandType;
        },
        isAbstract: true,
      },
      RecordsAffected: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      Parameters: {
        kind: "property",
        type: () => {
          return Common.DbParameterCollection;
        },
      },
      DbParameterCollection: {
        kind: "property",
        type: () => {
          return Common.DbParameterCollection;
        },
        isAbstract: true,
      },
      CanCreateParameter: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  DbBatchCommandCollection: {
    kind: "class",
    members: {
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetBatchCommand: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetBatchCommand: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DbBatchCommandCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return Common.DbBatchCommand;
        },
      },
    },
    isAbstract: true,
  },
  DbColumn: {
    kind: "class",
    members: {
      DbColumn: {
        kind: "method",
        methodKind: "constructor",
      },
      AllowDBNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      BaseCatalogName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      BaseColumnName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      BaseSchemaName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      BaseServerName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      BaseTableName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ColumnName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ColumnOrdinal: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isNullable: true,
      },
      ColumnSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isNullable: true,
      },
      DataType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      DataTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      IsAliased: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      IsAutoIncrement: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      IsExpression: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      IsHidden: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      IsIdentity: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      IsKey: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      IsLong: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      IsUnique: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isVirtual: true,
      },
      NumericPrecision: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isNullable: true,
      },
      NumericScale: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isNullable: true,
      },
      UdtAssemblyQualifiedName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isAbstract: true,
  },
  DbCommand: {
    kind: "class",
    members: {
      DbCommand: {
        kind: "method",
        methodKind: "constructor",
      },
      Cancel: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CreateDbParameter: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CreateParameter: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ExecuteDbDataReader: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ExecuteDbDataReaderAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ExecuteNonQuery: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ExecuteNonQueryAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExecuteReader: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExecuteReaderAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ExecuteScalar: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ExecuteScalarAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Prepare: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      PrepareAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CommandText: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      CommandTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      CommandType: {
        kind: "property",
        type: () => {
          return Data.CommandType;
        },
        isAbstract: true,
      },
      Connection: {
        kind: "property",
        type: () => {
          return Common.DbConnection;
        },
      },
      DbConnection: {
        kind: "property",
        type: () => {
          return Common.DbConnection;
        },
        isAbstract: true,
      },
      DbParameterCollection: {
        kind: "property",
        type: () => {
          return Common.DbParameterCollection;
        },
        isAbstract: true,
      },
      DbTransaction: {
        kind: "property",
        type: () => {
          return Common.DbTransaction;
        },
        isAbstract: true,
      },
      Parameters: {
        kind: "property",
        type: () => {
          return Common.DbParameterCollection;
        },
      },
      Transaction: {
        kind: "property",
        type: () => {
          return Common.DbTransaction;
        },
      },
      UpdatedRowSource: {
        kind: "property",
        type: () => {
          return Data.UpdateRowSource;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  DbCommandBuilder: {
    kind: "class",
    members: {
      DbCommandBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      ApplyParameterInfo: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDeleteCommand: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInsertCommand: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetParameterName: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetParameterPlaceholder: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetSchemaTable: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetUpdateCommand: {
        kind: "method",
        methodKind: "ordinary",
      },
      InitializeCommand: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      QuoteIdentifier: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RefreshSchema: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RowUpdatingHandler: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetRowUpdatingHandler: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      UnquoteIdentifier: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CatalogLocation: {
        kind: "property",
        type: () => {
          return Common.CatalogLocation;
        },
        isVirtual: true,
      },
      CatalogSeparator: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      ConflictOption: {
        kind: "property",
        type: () => {
          return Data.ConflictOption;
        },
        isVirtual: true,
      },
      DataAdapter: {
        kind: "property",
        type: () => {
          return Common.DbDataAdapter;
        },
      },
      QuotePrefix: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      QuoteSuffix: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      SchemaSeparator: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      SetAllValues: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isAbstract: true,
  },
  DbConnection: {
    kind: "class",
    members: {
      DbConnection: {
        kind: "method",
        methodKind: "constructor",
      },
      BeginDbTransaction: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      BeginDbTransactionAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BeginTransaction: {
        kind: "method",
        methodKind: "ordinary",
      },
      BeginTransactionAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ChangeDatabase: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ChangeDatabaseAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CloseAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateBatch: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateDbBatch: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateCommand: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateDbCommand: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EnlistTransaction: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSchema: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSchemaAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnStateChange: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Open: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      OpenAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      ConnectionString: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      ConnectionTimeout: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      Database: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      DataSource: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      DbProviderFactory: {
        kind: "property",
        type: () => {
          return Common.DbProviderFactory;
        },
        isVirtual: true,
      },
      ServerVersion: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      State: {
        kind: "property",
        type: () => {
          return Data.ConnectionState;
        },
        isAbstract: true,
      },
      CanCreateBatch: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  DbConnectionStringBuilder: {
    kind: "class",
    members: {
      DbConnectionStringBuilder: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      AppendKeyValuePair: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ClearPropertyDescriptors: {
        kind: "method",
        methodKind: "ordinary",
      },
      ContainsKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      EquivalentTo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ShouldSerialize: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryGetValue: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ConnectionString: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsFixedSize: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsReadOnly: {
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
        isVirtual: true,
      },
      Keys: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
        isVirtual: true,
      },
      Values: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
        isVirtual: true,
      },
    },
  },
  DbDataAdapter: {
    kind: "class",
    members: {
      DefaultSourceTableName: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DbDataAdapter: {
        kind: "method",
        methodKind: "constructor",
      },
      AddToBatch: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ClearBatch: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateRowUpdatedEvent: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateRowUpdatingEvent: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExecuteBatch: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Fill: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FillSchema: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetBatchedParameter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetBatchedRecordsAffected: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetFillParameters: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InitializeBatching: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRowUpdated: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRowUpdating: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TerminateBatching: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      DeleteCommand: {
        kind: "property",
        type: () => {
          return Common.DbCommand;
        },
      },
      FillCommandBehavior: {
        kind: "property",
        type: () => {
          return Data.CommandBehavior;
        },
      },
      InsertCommand: {
        kind: "property",
        type: () => {
          return Common.DbCommand;
        },
      },
      SelectCommand: {
        kind: "property",
        type: () => {
          return Common.DbCommand;
        },
      },
      UpdateBatchSize: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      UpdateCommand: {
        kind: "property",
        type: () => {
          return Common.DbCommand;
        },
      },
    },
    isAbstract: true,
  },
  DbDataReader: {
    kind: "class",
    members: {
      DbDataReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CloseAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetBoolean: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetByte: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetBytes: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetChar: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetChars: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetDataTypeName: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetDbDataReader: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetDecimal: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetDouble: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetFieldType: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetFloat: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetGuid: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetInt16: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetInt32: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetInt64: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetOrdinal: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetSchemaTable: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSchemaTableAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetColumnSchemaAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetStream: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetString: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetTextReader: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetValues: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IsDBNull: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IsDBNullAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      NextResult: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      NextResultAsync: {
        kind: "method",
        methodKind: "ordinary",
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
      Depth: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      FieldCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      HasRows: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      IsClosed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isAbstract: true,
      },
      RecordsAffected: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      VisibleFieldCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  DbDataReaderExtensions: {
    kind: "class",
    members: {
      CanGetColumnSchema: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetColumnSchema: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  DbDataRecord: {
    kind: "class",
    members: {
      DbDataRecord: {
        kind: "method",
        methodKind: "constructor",
      },
      GetBoolean: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetByte: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetBytes: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetChar: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetChars: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetData: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDataTypeName: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetDbDataReader: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetDecimal: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetDouble: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetFieldType: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetFloat: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetGuid: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetInt16: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetInt32: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetInt64: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetOrdinal: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetString: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetValues: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IsDBNull: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      FieldCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  DbDataSource: {
    kind: "class",
    members: {
      CreateDbConnection: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      OpenDbConnection: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OpenDbConnectionAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateDbCommand: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateDbBatch: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateConnection: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenConnection: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenConnectionAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateCommand: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateBatch: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisposeAsyncCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      DbDataSource: {
        kind: "method",
        methodKind: "constructor",
      },
      ConnectionString: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  DbDataSourceEnumerator: {
    kind: "class",
    members: {
      DbDataSourceEnumerator: {
        kind: "method",
        methodKind: "constructor",
      },
      GetDataSources: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  DbEnumerator: {
    kind: "class",
    members: {
      DbEnumerator: {
        kind: "method",
        methodKind: "constructor",
      },
      MoveNext: {
        kind: "method",
        methodKind: "ordinary",
      },
      Current: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
  },
  DbException: {
    kind: "class",
    members: {
      DbException: {
        kind: "method",
        methodKind: "constructor",
      },
      IsTransient: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      SqlState: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      BatchCommand: {
        kind: "property",
        type: () => {
          return Common.DbBatchCommand;
        },
      },
      DbBatchCommand: {
        kind: "property",
        type: () => {
          return Common.DbBatchCommand;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  DbMetaDataCollectionNames: {
    kind: "class",
    members: {
      DataSourceInformation: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DataTypes: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MetaDataCollections: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ReservedWords: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Restrictions: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
    },
    isStatic: true,
  },
  DbMetaDataColumnNames: {
    kind: "class",
    members: {
      CollectionName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ColumnSize: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      CompositeIdentifierSeparatorPattern: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      CreateFormat: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      CreateParameters: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DataSourceProductName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DataSourceProductVersion: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DataSourceProductVersionNormalized: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DataType: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      GroupByBehavior: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IdentifierCase: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IdentifierPattern: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsAutoIncrementable: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsBestMatch: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsCaseSensitive: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsConcurrencyType: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsFixedLength: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsFixedPrecisionScale: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsLiteralSupported: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsLong: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsNullable: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsSearchable: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsSearchableWithLike: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsUnsigned: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      LiteralPrefix: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      LiteralSuffix: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MaximumScale: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MinimumScale: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      NumberOfIdentifierParts: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      NumberOfRestrictions: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      OrderByColumnsInSelect: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ParameterMarkerFormat: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ParameterMarkerPattern: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ParameterNameMaxLength: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ParameterNamePattern: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ProviderDbType: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      QuotedIdentifierCase: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      QuotedIdentifierPattern: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ReservedWord: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      StatementSeparatorPattern: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      StringLiteralPattern: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SupportedJoinOperators: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      TypeName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
    },
    isStatic: true,
  },
  DbParameter: {
    kind: "class",
    members: {
      DbParameter: {
        kind: "method",
        methodKind: "constructor",
      },
      ResetDbType: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DbType: {
        kind: "property",
        type: () => {
          return Data.DbType;
        },
        isAbstract: true,
      },
      Direction: {
        kind: "property",
        type: () => {
          return Data.ParameterDirection;
        },
        isAbstract: true,
      },
      ParameterName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      Precision: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
        isVirtual: true,
      },
      Scale: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
        isVirtual: true,
      },
      Size: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      SourceColumn: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
      SourceColumnNullMapping: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
      SourceVersion: {
        kind: "property",
        type: () => {
          return Data.DataRowVersion;
        },
        isVirtual: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  DbParameterCollection: {
    kind: "class",
    members: {
      DbParameterCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      AddRange: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Clear: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetParameter: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetParameter: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return Common.DbParameter;
        },
      },
    },
    isAbstract: true,
  },
  DbProviderFactories: {
    kind: "class",
    members: {
      GetFactory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFactoryClasses: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetProviderInvariantNames: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RegisterFactory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryGetFactory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UnregisterFactory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  DbProviderFactory: {
    kind: "class",
    members: {
      DbProviderFactory: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateBatch: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateBatchCommand: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateCommand: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateCommandBuilder: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateConnection: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateConnectionStringBuilder: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateDataAdapter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateDataSourceEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateParameter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateDataSource: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CanCreateBatch: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      CanCreateCommandBuilder: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      CanCreateDataAdapter: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      CanCreateDataSourceEnumerator: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  DbProviderSpecificTypePropertyAttribute: {
    kind: "class",
    members: {
      DbProviderSpecificTypePropertyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsProviderSpecificTypeProperty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  DbTransaction: {
    kind: "class",
    members: {
      DbTransaction: {
        kind: "method",
        methodKind: "constructor",
      },
      Commit: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CommitAsync: {
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
      Rollback: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      RollbackAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SaveAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReleaseAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Save: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Release: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Connection: {
        kind: "property",
        type: () => {
          return Common.DbConnection;
        },
      },
      DbConnection: {
        kind: "property",
        type: () => {
          return Common.DbConnection;
        },
        isAbstract: true,
      },
      IsolationLevel: {
        kind: "property",
        type: () => {
          return Data.IsolationLevel;
        },
        isAbstract: true,
      },
      SupportsSavepoints: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  GroupByBehavior: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return Common.GroupByBehavior;
        },
      },
      NotSupported: {
        kind: "field",
        type: () => {
          return Common.GroupByBehavior;
        },
      },
      Unrelated: {
        kind: "field",
        type: () => {
          return Common.GroupByBehavior;
        },
      },
      MustContainAll: {
        kind: "field",
        type: () => {
          return Common.GroupByBehavior;
        },
      },
      ExactMatch: {
        kind: "field",
        type: () => {
          return Common.GroupByBehavior;
        },
      },
    },
  },
  IDbColumnSchemaGenerator: {
    kind: "interface",
    members: {
      GetColumnSchema: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IdentifierCase: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return Common.IdentifierCase;
        },
      },
      Insensitive: {
        kind: "field",
        type: () => {
          return Common.IdentifierCase;
        },
      },
      Sensitive: {
        kind: "field",
        type: () => {
          return Common.IdentifierCase;
        },
      },
    },
  },
  RowUpdatedEventArgs: {
    kind: "class",
    members: {
      RowUpdatedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyToRows: {
        kind: "method",
        methodKind: "ordinary",
      },
      Command: {
        kind: "property",
        type: () => {
          return Data.IDbCommand;
        },
      },
      Errors: {
        kind: "property",
        type: () => {
          return System.Exception;
        },
        isNullable: true,
      },
      RecordsAffected: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
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
      StatementType: {
        kind: "property",
        type: () => {
          return Data.StatementType;
        },
      },
      Status: {
        kind: "property",
        type: () => {
          return Data.UpdateStatus;
        },
      },
      TableMapping: {
        kind: "property",
        type: () => {
          return Common.DataTableMapping;
        },
      },
    },
  },
  RowUpdatingEventArgs: {
    kind: "class",
    members: {
      RowUpdatingEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      BaseCommand: {
        kind: "property",
        type: () => {
          return Data.IDbCommand;
        },
        isNullable: true,
        isVirtual: true,
      },
      Command: {
        kind: "property",
        type: () => {
          return Data.IDbCommand;
        },
      },
      Errors: {
        kind: "property",
        type: () => {
          return System.Exception;
        },
        isNullable: true,
      },
      Row: {
        kind: "property",
        type: () => {
          return Data.DataRow;
        },
      },
      StatementType: {
        kind: "property",
        type: () => {
          return Data.StatementType;
        },
      },
      Status: {
        kind: "property",
        type: () => {
          return Data.UpdateStatus;
        },
      },
      TableMapping: {
        kind: "property",
        type: () => {
          return Common.DataTableMapping;
        },
      },
    },
  },
  SchemaTableColumn: {
    kind: "class",
    members: {
      AllowDBNull: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      BaseColumnName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      BaseSchemaName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      BaseTableName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ColumnName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ColumnOrdinal: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ColumnSize: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DataType: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsAliased: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsExpression: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsKey: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsLong: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsUnique: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      NonVersionedProviderType: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      NumericPrecision: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      NumericScale: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ProviderType: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
    },
    isStatic: true,
  },
  SchemaTableOptionalColumn: {
    kind: "class",
    members: {
      AutoIncrementSeed: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      AutoIncrementStep: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      BaseCatalogName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      BaseColumnNamespace: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      BaseServerName: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      BaseTableNamespace: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ColumnMapping: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DefaultValue: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Expression: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsAutoIncrement: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsHidden: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsReadOnly: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      IsRowVersion: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ProviderSpecificDataType: {
        kind: "field",
        type: () => {
          return System.String;
        },
        isStatic: true,
        isReadOnly: true,
      },
    },
    isStatic: true,
  },
  SupportedJoinOperators: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Common.SupportedJoinOperators;
        },
      },
      Inner: {
        kind: "field",
        type: () => {
          return Common.SupportedJoinOperators;
        },
      },
      LeftOuter: {
        kind: "field",
        type: () => {
          return Common.SupportedJoinOperators;
        },
      },
      RightOuter: {
        kind: "field",
        type: () => {
          return Common.SupportedJoinOperators;
        },
      },
      FullOuter: {
        kind: "field",
        type: () => {
          return Common.SupportedJoinOperators;
        },
      },
    },
  },
});
export default Common
