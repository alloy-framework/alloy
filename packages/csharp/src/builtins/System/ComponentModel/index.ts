import Collections from "../Collections/index.js";
import Globalization from "../Globalization/index.js";
import System from "../index.js";
import Threading from "../Threading/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as DataAnnotations } from "./DataAnnotations/index.js";
export { default as Design } from "./Design/index.js";

type ComponentModelLibrary = LibrarySymbolReference & {
  AddingNewEventArgs: LibrarySymbolReference & {
    AddingNewEventArgs: LibrarySymbolReference;
    NewObject: LibrarySymbolReference
  };
  AddingNewEventHandler: LibrarySymbolReference & {
    AddingNewEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  AmbientValueAttribute: LibrarySymbolReference & {
    AmbientValueAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  ArrayConverter: LibrarySymbolReference & {
    ArrayConverter: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetPropertiesSupported: LibrarySymbolReference
  };
  AsyncCompletedEventArgs: LibrarySymbolReference & {
    AsyncCompletedEventArgs: LibrarySymbolReference;
    RaiseExceptionIfNecessary: LibrarySymbolReference;
    Cancelled: LibrarySymbolReference;
    Error: LibrarySymbolReference;
    UserState: LibrarySymbolReference
  };
  AsyncCompletedEventHandler: LibrarySymbolReference & {
    AsyncCompletedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  AsyncOperation: LibrarySymbolReference & {
    Finalize: LibrarySymbolReference;
    OperationCompleted: LibrarySymbolReference;
    Post: LibrarySymbolReference;
    PostOperationCompleted: LibrarySymbolReference;
    SynchronizationContext: LibrarySymbolReference;
    UserSuppliedState: LibrarySymbolReference
  };
  AsyncOperationManager: LibrarySymbolReference & {
    CreateOperation: LibrarySymbolReference;
    SynchronizationContext: LibrarySymbolReference
  };
  AttributeCollection: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    AttributeCollection: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    FromExisting: LibrarySymbolReference;
    GetDefaultAttribute: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Matches: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  AttributeProviderAttribute: LibrarySymbolReference & {
    AttributeProviderAttribute: LibrarySymbolReference;
    PropertyName: LibrarySymbolReference;
    TypeName: LibrarySymbolReference
  };
  BackgroundWorker: LibrarySymbolReference & {
    BackgroundWorker: LibrarySymbolReference;
    CancelAsync: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    OnDoWork: LibrarySymbolReference;
    OnProgressChanged: LibrarySymbolReference;
    OnRunWorkerCompleted: LibrarySymbolReference;
    ReportProgress: LibrarySymbolReference;
    RunWorkerAsync: LibrarySymbolReference;
    CancellationPending: LibrarySymbolReference;
    IsBusy: LibrarySymbolReference;
    WorkerReportsProgress: LibrarySymbolReference;
    WorkerSupportsCancellation: LibrarySymbolReference
  };
  BaseNumberConverter: LibrarySymbolReference & {
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference
  };
  BindableAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    BindableAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    Bindable: LibrarySymbolReference;
    Direction: LibrarySymbolReference
  };
  BindableSupport: LibrarySymbolReference & {
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    Default: LibrarySymbolReference
  };
  BindingDirection: LibrarySymbolReference & {
    OneWay: LibrarySymbolReference;
    TwoWay: LibrarySymbolReference
  };
  BindingList: LibrarySymbolReference & {
    BindingList: LibrarySymbolReference;
    AddNew: LibrarySymbolReference;
    AddNewCore: LibrarySymbolReference;
    ApplySortCore: LibrarySymbolReference;
    CancelNew: LibrarySymbolReference;
    ClearItems: LibrarySymbolReference;
    EndNew: LibrarySymbolReference;
    FindCore: LibrarySymbolReference;
    InsertItem: LibrarySymbolReference;
    OnAddingNew: LibrarySymbolReference;
    OnListChanged: LibrarySymbolReference;
    RemoveItem: LibrarySymbolReference;
    RemoveSortCore: LibrarySymbolReference;
    ResetBindings: LibrarySymbolReference;
    ResetItem: LibrarySymbolReference;
    SetItem: LibrarySymbolReference;
    AllowEdit: LibrarySymbolReference;
    AllowNew: LibrarySymbolReference;
    AllowRemove: LibrarySymbolReference;
    IsSortedCore: LibrarySymbolReference;
    RaiseListChangedEvents: LibrarySymbolReference;
    SortDirectionCore: LibrarySymbolReference;
    SortPropertyCore: LibrarySymbolReference;
    SupportsChangeNotificationCore: LibrarySymbolReference;
    SupportsSearchingCore: LibrarySymbolReference;
    SupportsSortingCore: LibrarySymbolReference
  };
  BooleanConverter: LibrarySymbolReference & {
    BooleanConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    GetStandardValues: LibrarySymbolReference;
    GetStandardValuesExclusive: LibrarySymbolReference;
    GetStandardValuesSupported: LibrarySymbolReference
  };
  BrowsableAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    BrowsableAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    Browsable: LibrarySymbolReference
  };
  ByteConverter: LibrarySymbolReference & {
    ByteConverter: LibrarySymbolReference
  };
  CancelEventArgs: LibrarySymbolReference & {
    CancelEventArgs: LibrarySymbolReference;
    Cancel: LibrarySymbolReference
  };
  CancelEventHandler: LibrarySymbolReference & {
    CancelEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  CategoryAttribute: LibrarySymbolReference & {
    CategoryAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetLocalizedString: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    Action: LibrarySymbolReference;
    Appearance: LibrarySymbolReference;
    Asynchronous: LibrarySymbolReference;
    Behavior: LibrarySymbolReference;
    Category: LibrarySymbolReference;
    Data: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    Design: LibrarySymbolReference;
    DragDrop: LibrarySymbolReference;
    Focus: LibrarySymbolReference;
    Format: LibrarySymbolReference;
    Key: LibrarySymbolReference;
    Layout: LibrarySymbolReference;
    Mouse: LibrarySymbolReference;
    WindowStyle: LibrarySymbolReference
  };
  CharConverter: LibrarySymbolReference & {
    CharConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference
  };
  CollectionChangeAction: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Refresh: LibrarySymbolReference
  };
  CollectionChangeEventArgs: LibrarySymbolReference & {
    CollectionChangeEventArgs: LibrarySymbolReference;
    Action: LibrarySymbolReference;
    Element: LibrarySymbolReference
  };
  CollectionChangeEventHandler: LibrarySymbolReference & {
    CollectionChangeEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  CollectionConverter: LibrarySymbolReference & {
    CollectionConverter: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference
  };
  ComplexBindingPropertiesAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    ComplexBindingPropertiesAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    DataMember: LibrarySymbolReference;
    DataSource: LibrarySymbolReference
  };
  Component: LibrarySymbolReference & {
    Component: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    GetService: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    CanRaiseEvents: LibrarySymbolReference;
    Container: LibrarySymbolReference;
    DesignMode: LibrarySymbolReference;
    Events: LibrarySymbolReference;
    Site: LibrarySymbolReference
  };
  ComponentCollection: LibrarySymbolReference & {
    ComponentCollection: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  ComponentConverter: LibrarySymbolReference & {
    ComponentConverter: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetPropertiesSupported: LibrarySymbolReference
  };
  ComponentEditor: LibrarySymbolReference & {
    ComponentEditor: LibrarySymbolReference;
    EditComponent: LibrarySymbolReference
  };
  ComponentResourceManager: LibrarySymbolReference & {
    ComponentResourceManager: LibrarySymbolReference;
    ApplyResources: LibrarySymbolReference;
    ApplyResourcesToRegisteredType: LibrarySymbolReference
  };
  Container: LibrarySymbolReference & {
    Container: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    CreateSite: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    GetService: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveWithoutUnsiting: LibrarySymbolReference;
    ValidateName: LibrarySymbolReference;
    Components: LibrarySymbolReference
  };
  ContainerFilterService: LibrarySymbolReference & {
    ContainerFilterService: LibrarySymbolReference;
    FilterComponents: LibrarySymbolReference
  };
  CultureInfoConverter: LibrarySymbolReference & {
    CultureInfoConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference;
    GetCultureName: LibrarySymbolReference;
    GetStandardValues: LibrarySymbolReference;
    GetStandardValuesExclusive: LibrarySymbolReference;
    GetStandardValuesSupported: LibrarySymbolReference
  };
  CustomTypeDescriptor: LibrarySymbolReference & {
    CustomTypeDescriptor: LibrarySymbolReference;
    GetAttributes: LibrarySymbolReference;
    GetClassName: LibrarySymbolReference;
    GetComponentName: LibrarySymbolReference;
    GetConverter: LibrarySymbolReference;
    GetConverterFromRegisteredType: LibrarySymbolReference;
    GetDefaultEvent: LibrarySymbolReference;
    GetDefaultProperty: LibrarySymbolReference;
    GetEditor: LibrarySymbolReference;
    GetEvents: LibrarySymbolReference;
    GetEventsFromRegisteredType: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetPropertiesFromRegisteredType: LibrarySymbolReference;
    GetPropertyOwner: LibrarySymbolReference;
    RequireRegisteredTypes: LibrarySymbolReference
  };
  DataErrorsChangedEventArgs: LibrarySymbolReference & {
    DataErrorsChangedEventArgs: LibrarySymbolReference;
    PropertyName: LibrarySymbolReference
  };
  DataObjectAttribute: LibrarySymbolReference & {
    DataObject: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    NonDataObject: LibrarySymbolReference;
    DataObjectAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    IsDataObject: LibrarySymbolReference
  };
  DataObjectFieldAttribute: LibrarySymbolReference & {
    DataObjectFieldAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsIdentity: LibrarySymbolReference;
    IsNullable: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    PrimaryKey: LibrarySymbolReference
  };
  DataObjectMethodAttribute: LibrarySymbolReference & {
    DataObjectMethodAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Match: LibrarySymbolReference;
    IsDefault: LibrarySymbolReference;
    MethodType: LibrarySymbolReference
  };
  DataObjectMethodType: LibrarySymbolReference & {
    Fill: LibrarySymbolReference;
    Select: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    Delete: LibrarySymbolReference
  };
  DateOnlyConverter: LibrarySymbolReference & {
    DateOnlyConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference
  };
  DateTimeConverter: LibrarySymbolReference & {
    DateTimeConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference
  };
  DateTimeOffsetConverter: LibrarySymbolReference & {
    DateTimeOffsetConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference
  };
  DecimalConverter: LibrarySymbolReference & {
    DecimalConverter: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference
  };
  DefaultBindingPropertyAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    DefaultBindingPropertyAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  DefaultEventAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    DefaultEventAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  DefaultPropertyAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    DefaultPropertyAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  DefaultValueAttribute: LibrarySymbolReference & {
    DefaultValueAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    SetValue: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  DescriptionAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    DescriptionAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    Description: LibrarySymbolReference;
    DescriptionValue: LibrarySymbolReference
  };
  DesignOnlyAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    DesignOnlyAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    IsDesignOnly: LibrarySymbolReference
  };
  DesignTimeVisibleAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    DesignTimeVisibleAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    Visible: LibrarySymbolReference
  };
  DesignerAttribute: LibrarySymbolReference & {
    DesignerAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    DesignerBaseTypeName: LibrarySymbolReference;
    DesignerTypeName: LibrarySymbolReference;
    TypeId: LibrarySymbolReference
  };
  DesignerCategoryAttribute: LibrarySymbolReference & {
    Component: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    Form: LibrarySymbolReference;
    Generic: LibrarySymbolReference;
    DesignerCategoryAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    Category: LibrarySymbolReference;
    TypeId: LibrarySymbolReference
  };
  DesignerSerializationVisibility: LibrarySymbolReference & {
    Hidden: LibrarySymbolReference;
    Visible: LibrarySymbolReference;
    Content: LibrarySymbolReference
  };
  DesignerSerializationVisibilityAttribute: LibrarySymbolReference & {
    Content: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    Hidden: LibrarySymbolReference;
    Visible: LibrarySymbolReference;
    DesignerSerializationVisibilityAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    Visibility: LibrarySymbolReference
  };
  DisplayNameAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    DisplayNameAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    DisplayName: LibrarySymbolReference;
    DisplayNameValue: LibrarySymbolReference
  };
  DoWorkEventArgs: LibrarySymbolReference & {
    DoWorkEventArgs: LibrarySymbolReference;
    Argument: LibrarySymbolReference;
    Result: LibrarySymbolReference
  };
  DoWorkEventHandler: LibrarySymbolReference & {
    DoWorkEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  DoubleConverter: LibrarySymbolReference & {
    DoubleConverter: LibrarySymbolReference
  };
  EditorAttribute: LibrarySymbolReference & {
    EditorAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    EditorBaseTypeName: LibrarySymbolReference;
    EditorTypeName: LibrarySymbolReference;
    TypeId: LibrarySymbolReference
  };
  EditorBrowsableAttribute: LibrarySymbolReference & {
    EditorBrowsableAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    State: LibrarySymbolReference
  };
  EditorBrowsableState: LibrarySymbolReference & {
    Always: LibrarySymbolReference;
    Never: LibrarySymbolReference;
    Advanced: LibrarySymbolReference
  };
  EnumConverter: LibrarySymbolReference & {
    EnumConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference;
    GetStandardValues: LibrarySymbolReference;
    GetStandardValuesExclusive: LibrarySymbolReference;
    GetStandardValuesSupported: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    Comparer: LibrarySymbolReference;
    EnumType: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  EventDescriptor: LibrarySymbolReference & {
    EventDescriptor: LibrarySymbolReference;
    AddEventHandler: LibrarySymbolReference;
    RemoveEventHandler: LibrarySymbolReference;
    ComponentType: LibrarySymbolReference;
    EventType: LibrarySymbolReference;
    IsMulticast: LibrarySymbolReference
  };
  EventDescriptorCollection: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    EventDescriptorCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    Find: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    InternalSort: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Sort: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  EventHandlerList: LibrarySymbolReference & {
    EventHandlerList: LibrarySymbolReference;
    AddHandler: LibrarySymbolReference;
    AddHandlers: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    RemoveHandler: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  ExpandableObjectConverter: LibrarySymbolReference & {
    ExpandableObjectConverter: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetPropertiesSupported: LibrarySymbolReference
  };
  ExtenderProvidedPropertyAttribute: LibrarySymbolReference & {
    ExtenderProvidedPropertyAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    ExtenderProperty: LibrarySymbolReference;
    Provider: LibrarySymbolReference;
    ReceiverType: LibrarySymbolReference
  };
  GuidConverter: LibrarySymbolReference & {
    GuidConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference
  };
  HalfConverter: LibrarySymbolReference & {
    HalfConverter: LibrarySymbolReference
  };
  HandledEventArgs: LibrarySymbolReference & {
    HandledEventArgs: LibrarySymbolReference;
    Handled: LibrarySymbolReference
  };
  HandledEventHandler: LibrarySymbolReference & {
    HandledEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  IBindingList: LibrarySymbolReference & {
    AddIndex: LibrarySymbolReference;
    AddNew: LibrarySymbolReference;
    ApplySort: LibrarySymbolReference;
    Find: LibrarySymbolReference;
    RemoveIndex: LibrarySymbolReference;
    RemoveSort: LibrarySymbolReference;
    AllowEdit: LibrarySymbolReference;
    AllowNew: LibrarySymbolReference;
    AllowRemove: LibrarySymbolReference;
    IsSorted: LibrarySymbolReference;
    SortDirection: LibrarySymbolReference;
    SortProperty: LibrarySymbolReference;
    SupportsChangeNotification: LibrarySymbolReference;
    SupportsSearching: LibrarySymbolReference;
    SupportsSorting: LibrarySymbolReference
  };
  IBindingListView: LibrarySymbolReference & {
    ApplySort: LibrarySymbolReference;
    RemoveFilter: LibrarySymbolReference;
    Filter: LibrarySymbolReference;
    SortDescriptions: LibrarySymbolReference;
    SupportsAdvancedSorting: LibrarySymbolReference;
    SupportsFiltering: LibrarySymbolReference
  };
  ICancelAddNew: LibrarySymbolReference & {
    CancelNew: LibrarySymbolReference;
    EndNew: LibrarySymbolReference
  };
  IChangeTracking: LibrarySymbolReference & {
    AcceptChanges: LibrarySymbolReference;
    IsChanged: LibrarySymbolReference
  };
  IComNativeDescriptorHandler: LibrarySymbolReference & {
    GetAttributes: LibrarySymbolReference;
    GetClassName: LibrarySymbolReference;
    GetConverter: LibrarySymbolReference;
    GetDefaultEvent: LibrarySymbolReference;
    GetDefaultProperty: LibrarySymbolReference;
    GetEditor: LibrarySymbolReference;
    GetEvents: LibrarySymbolReference;
    GetName: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetPropertyValue: LibrarySymbolReference
  };
  IComponent: LibrarySymbolReference & {
    Site: LibrarySymbolReference
  };
  IContainer: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Components: LibrarySymbolReference
  };
  ICustomTypeDescriptor: LibrarySymbolReference & {
    GetAttributes: LibrarySymbolReference;
    GetClassName: LibrarySymbolReference;
    GetComponentName: LibrarySymbolReference;
    GetConverter: LibrarySymbolReference;
    GetConverterFromRegisteredType: LibrarySymbolReference;
    GetDefaultEvent: LibrarySymbolReference;
    GetDefaultProperty: LibrarySymbolReference;
    GetEditor: LibrarySymbolReference;
    GetEvents: LibrarySymbolReference;
    GetEventsFromRegisteredType: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetPropertiesFromRegisteredType: LibrarySymbolReference;
    GetPropertyOwner: LibrarySymbolReference;
    RequireRegisteredTypes: LibrarySymbolReference
  };
  IDataErrorInfo: LibrarySymbolReference & {
    Error: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  IEditableObject: LibrarySymbolReference & {
    BeginEdit: LibrarySymbolReference;
    CancelEdit: LibrarySymbolReference;
    EndEdit: LibrarySymbolReference
  };
  IExtenderProvider: LibrarySymbolReference & {
    CanExtend: LibrarySymbolReference
  };
  IIntellisenseBuilder: LibrarySymbolReference & {
    Show: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  IListSource: LibrarySymbolReference & {
    GetList: LibrarySymbolReference;
    ContainsListCollection: LibrarySymbolReference
  };
  INestedContainer: LibrarySymbolReference & {
    Owner: LibrarySymbolReference
  };
  INestedSite: LibrarySymbolReference & {
    FullName: LibrarySymbolReference
  };
  INotifyDataErrorInfo: LibrarySymbolReference & {
    GetErrors: LibrarySymbolReference;
    HasErrors: LibrarySymbolReference
  };
  INotifyPropertyChanged: LibrarySymbolReference & {

  };
  INotifyPropertyChanging: LibrarySymbolReference & {

  };
  IRaiseItemChangedEvents: LibrarySymbolReference & {
    RaisesItemChangedEvents: LibrarySymbolReference
  };
  IRevertibleChangeTracking: LibrarySymbolReference & {
    RejectChanges: LibrarySymbolReference
  };
  ISite: LibrarySymbolReference & {
    Component: LibrarySymbolReference;
    Container: LibrarySymbolReference;
    DesignMode: LibrarySymbolReference;
    Name: LibrarySymbolReference
  };
  ISupportInitialize: LibrarySymbolReference & {
    BeginInit: LibrarySymbolReference;
    EndInit: LibrarySymbolReference
  };
  ISupportInitializeNotification: LibrarySymbolReference & {
    IsInitialized: LibrarySymbolReference
  };
  ISynchronizeInvoke: LibrarySymbolReference & {
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    InvokeRequired: LibrarySymbolReference
  };
  ITypeDescriptorContext: LibrarySymbolReference & {
    OnComponentChanged: LibrarySymbolReference;
    OnComponentChanging: LibrarySymbolReference;
    Container: LibrarySymbolReference;
    Instance: LibrarySymbolReference;
    PropertyDescriptor: LibrarySymbolReference
  };
  ITypedList: LibrarySymbolReference & {
    GetItemProperties: LibrarySymbolReference;
    GetListName: LibrarySymbolReference
  };
  ImmutableObjectAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    ImmutableObjectAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    Immutable: LibrarySymbolReference
  };
  InheritanceAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    Inherited: LibrarySymbolReference;
    InheritedReadOnly: LibrarySymbolReference;
    NotInherited: LibrarySymbolReference;
    InheritanceAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    InheritanceLevel: LibrarySymbolReference
  };
  InheritanceLevel: LibrarySymbolReference & {
    Inherited: LibrarySymbolReference;
    InheritedReadOnly: LibrarySymbolReference;
    NotInherited: LibrarySymbolReference
  };
  InitializationEventAttribute: LibrarySymbolReference & {
    InitializationEventAttribute: LibrarySymbolReference;
    EventName: LibrarySymbolReference
  };
  InstallerTypeAttribute: LibrarySymbolReference & {
    InstallerTypeAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    InstallerType: LibrarySymbolReference
  };
  InstanceCreationEditor: LibrarySymbolReference & {
    InstanceCreationEditor: LibrarySymbolReference;
    CreateInstance: LibrarySymbolReference;
    Text: LibrarySymbolReference
  };
  Int128Converter: LibrarySymbolReference & {
    Int128Converter: LibrarySymbolReference
  };
  Int16Converter: LibrarySymbolReference & {
    Int16Converter: LibrarySymbolReference
  };
  Int32Converter: LibrarySymbolReference & {
    Int32Converter: LibrarySymbolReference
  };
  Int64Converter: LibrarySymbolReference & {
    Int64Converter: LibrarySymbolReference
  };
  InvalidAsynchronousStateException: LibrarySymbolReference & {
    InvalidAsynchronousStateException: LibrarySymbolReference
  };
  InvalidEnumArgumentException: LibrarySymbolReference & {
    InvalidEnumArgumentException: LibrarySymbolReference
  };
  LicFileLicenseProvider: LibrarySymbolReference & {
    LicFileLicenseProvider: LibrarySymbolReference;
    GetKey: LibrarySymbolReference;
    GetLicense: LibrarySymbolReference;
    IsKeyValid: LibrarySymbolReference
  };
  License: LibrarySymbolReference & {
    License: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    LicenseKey: LibrarySymbolReference
  };
  LicenseContext: LibrarySymbolReference & {
    LicenseContext: LibrarySymbolReference;
    GetSavedLicenseKey: LibrarySymbolReference;
    GetService: LibrarySymbolReference;
    SetSavedLicenseKey: LibrarySymbolReference;
    UsageMode: LibrarySymbolReference
  };
  LicenseException: LibrarySymbolReference & {
    LicenseException: LibrarySymbolReference;
    LicensedType: LibrarySymbolReference
  };
  LicenseManager: LibrarySymbolReference & {
    CreateWithContext: LibrarySymbolReference;
    IsLicensed: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    LockContext: LibrarySymbolReference;
    UnlockContext: LibrarySymbolReference;
    Validate: LibrarySymbolReference;
    CurrentContext: LibrarySymbolReference;
    UsageMode: LibrarySymbolReference
  };
  LicenseProvider: LibrarySymbolReference & {
    LicenseProvider: LibrarySymbolReference;
    GetLicense: LibrarySymbolReference
  };
  LicenseProviderAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    LicenseProviderAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    LicenseProvider: LibrarySymbolReference;
    TypeId: LibrarySymbolReference
  };
  LicenseUsageMode: LibrarySymbolReference & {
    Runtime: LibrarySymbolReference;
    Designtime: LibrarySymbolReference
  };
  ListBindableAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    ListBindableAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    ListBindable: LibrarySymbolReference
  };
  ListChangedEventArgs: LibrarySymbolReference & {
    ListChangedEventArgs: LibrarySymbolReference;
    ListChangedType: LibrarySymbolReference;
    NewIndex: LibrarySymbolReference;
    OldIndex: LibrarySymbolReference;
    PropertyDescriptor: LibrarySymbolReference
  };
  ListChangedEventHandler: LibrarySymbolReference & {
    ListChangedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  ListChangedType: LibrarySymbolReference & {
    Reset: LibrarySymbolReference;
    ItemAdded: LibrarySymbolReference;
    ItemDeleted: LibrarySymbolReference;
    ItemMoved: LibrarySymbolReference;
    ItemChanged: LibrarySymbolReference;
    PropertyDescriptorAdded: LibrarySymbolReference;
    PropertyDescriptorDeleted: LibrarySymbolReference;
    PropertyDescriptorChanged: LibrarySymbolReference
  };
  ListSortDescription: LibrarySymbolReference & {
    ListSortDescription: LibrarySymbolReference;
    PropertyDescriptor: LibrarySymbolReference;
    SortDirection: LibrarySymbolReference
  };
  ListSortDescriptionCollection: LibrarySymbolReference & {
    ListSortDescriptionCollection: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  ListSortDirection: LibrarySymbolReference & {
    Ascending: LibrarySymbolReference;
    Descending: LibrarySymbolReference
  };
  LocalizableAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    LocalizableAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    IsLocalizable: LibrarySymbolReference
  };
  LookupBindingPropertiesAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    LookupBindingPropertiesAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    DataSource: LibrarySymbolReference;
    DisplayMember: LibrarySymbolReference;
    LookupMember: LibrarySymbolReference;
    ValueMember: LibrarySymbolReference
  };
  MarshalByValueComponent: LibrarySymbolReference & {
    MarshalByValueComponent: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    GetService: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Container: LibrarySymbolReference;
    DesignMode: LibrarySymbolReference;
    Events: LibrarySymbolReference;
    Site: LibrarySymbolReference
  };
  MaskedTextProvider: LibrarySymbolReference & {
    MaskedTextProvider: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    FindAssignedEditPositionFrom: LibrarySymbolReference;
    FindAssignedEditPositionInRange: LibrarySymbolReference;
    FindEditPositionFrom: LibrarySymbolReference;
    FindEditPositionInRange: LibrarySymbolReference;
    FindNonEditPositionFrom: LibrarySymbolReference;
    FindNonEditPositionInRange: LibrarySymbolReference;
    FindUnassignedEditPositionFrom: LibrarySymbolReference;
    FindUnassignedEditPositionInRange: LibrarySymbolReference;
    GetOperationResultFromHint: LibrarySymbolReference;
    InsertAt: LibrarySymbolReference;
    IsAvailablePosition: LibrarySymbolReference;
    IsEditPosition: LibrarySymbolReference;
    IsValidInputChar: LibrarySymbolReference;
    IsValidMaskChar: LibrarySymbolReference;
    IsValidPasswordChar: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Replace: LibrarySymbolReference;
    Set: LibrarySymbolReference;
    ToDisplayString: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    VerifyChar: LibrarySymbolReference;
    VerifyEscapeChar: LibrarySymbolReference;
    VerifyString: LibrarySymbolReference;
    AllowPromptAsInput: LibrarySymbolReference;
    AsciiOnly: LibrarySymbolReference;
    AssignedEditPositionCount: LibrarySymbolReference;
    AvailableEditPositionCount: LibrarySymbolReference;
    Culture: LibrarySymbolReference;
    DefaultPasswordChar: LibrarySymbolReference;
    EditPositionCount: LibrarySymbolReference;
    EditPositions: LibrarySymbolReference;
    IncludeLiterals: LibrarySymbolReference;
    IncludePrompt: LibrarySymbolReference;
    InvalidIndex: LibrarySymbolReference;
    IsPassword: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    LastAssignedPosition: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Mask: LibrarySymbolReference;
    MaskCompleted: LibrarySymbolReference;
    MaskFull: LibrarySymbolReference;
    PasswordChar: LibrarySymbolReference;
    PromptChar: LibrarySymbolReference;
    ResetOnPrompt: LibrarySymbolReference;
    ResetOnSpace: LibrarySymbolReference;
    SkipLiterals: LibrarySymbolReference
  };
  MaskedTextResultHint: LibrarySymbolReference & {
    PositionOutOfRange: LibrarySymbolReference;
    NonEditPosition: LibrarySymbolReference;
    UnavailableEditPosition: LibrarySymbolReference;
    PromptCharNotAllowed: LibrarySymbolReference;
    InvalidInput: LibrarySymbolReference;
    SignedDigitExpected: LibrarySymbolReference;
    LetterExpected: LibrarySymbolReference;
    DigitExpected: LibrarySymbolReference;
    AlphanumericCharacterExpected: LibrarySymbolReference;
    AsciiCharacterExpected: LibrarySymbolReference;
    Unknown: LibrarySymbolReference;
    CharacterEscaped: LibrarySymbolReference;
    NoEffect: LibrarySymbolReference;
    SideEffect: LibrarySymbolReference;
    Success: LibrarySymbolReference
  };
  MemberDescriptor: LibrarySymbolReference & {
    MemberDescriptor: LibrarySymbolReference;
    CreateAttributeCollection: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    FillAttributes: LibrarySymbolReference;
    FindMethod: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetInvocationTarget: LibrarySymbolReference;
    GetInvokee: LibrarySymbolReference;
    GetSite: LibrarySymbolReference;
    AttributeArray: LibrarySymbolReference;
    Attributes: LibrarySymbolReference;
    Category: LibrarySymbolReference;
    Description: LibrarySymbolReference;
    DesignTimeOnly: LibrarySymbolReference;
    DisplayName: LibrarySymbolReference;
    IsBrowsable: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NameHashCode: LibrarySymbolReference
  };
  MergablePropertyAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    MergablePropertyAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    AllowMerge: LibrarySymbolReference
  };
  MultilineStringConverter: LibrarySymbolReference & {
    MultilineStringConverter: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetPropertiesSupported: LibrarySymbolReference
  };
  NestedContainer: LibrarySymbolReference & {
    NestedContainer: LibrarySymbolReference;
    CreateSite: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetService: LibrarySymbolReference;
    Owner: LibrarySymbolReference;
    OwnerName: LibrarySymbolReference
  };
  NotifyParentPropertyAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    NotifyParentPropertyAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    NotifyParent: LibrarySymbolReference
  };
  NullableConverter: LibrarySymbolReference & {
    NullableConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference;
    CreateInstance: LibrarySymbolReference;
    GetCreateInstanceSupported: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetPropertiesSupported: LibrarySymbolReference;
    GetStandardValues: LibrarySymbolReference;
    GetStandardValuesExclusive: LibrarySymbolReference;
    GetStandardValuesSupported: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    NullableType: LibrarySymbolReference;
    UnderlyingType: LibrarySymbolReference;
    UnderlyingTypeConverter: LibrarySymbolReference
  };
  ParenthesizePropertyNameAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    ParenthesizePropertyNameAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    NeedParenthesis: LibrarySymbolReference
  };
  PasswordPropertyTextAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    PasswordPropertyTextAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    Password: LibrarySymbolReference
  };
  ProgressChangedEventArgs: LibrarySymbolReference & {
    ProgressChangedEventArgs: LibrarySymbolReference;
    ProgressPercentage: LibrarySymbolReference;
    UserState: LibrarySymbolReference
  };
  ProgressChangedEventHandler: LibrarySymbolReference & {
    ProgressChangedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  PropertyChangedEventArgs: LibrarySymbolReference & {
    PropertyChangedEventArgs: LibrarySymbolReference;
    PropertyName: LibrarySymbolReference
  };
  PropertyChangedEventHandler: LibrarySymbolReference & {
    PropertyChangedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  PropertyChangingEventArgs: LibrarySymbolReference & {
    PropertyChangingEventArgs: LibrarySymbolReference;
    PropertyName: LibrarySymbolReference
  };
  PropertyChangingEventHandler: LibrarySymbolReference & {
    PropertyChangingEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  PropertyDescriptor: LibrarySymbolReference & {
    PropertyDescriptor: LibrarySymbolReference;
    AddValueChanged: LibrarySymbolReference;
    CanResetValue: LibrarySymbolReference;
    CreateInstance: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    FillAttributes: LibrarySymbolReference;
    GetChildProperties: LibrarySymbolReference;
    GetEditor: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetInvocationTarget: LibrarySymbolReference;
    GetTypeFromName: LibrarySymbolReference;
    GetValue: LibrarySymbolReference;
    GetValueChangedHandler: LibrarySymbolReference;
    OnValueChanged: LibrarySymbolReference;
    RemoveValueChanged: LibrarySymbolReference;
    ResetValue: LibrarySymbolReference;
    SetValue: LibrarySymbolReference;
    ShouldSerializeValue: LibrarySymbolReference;
    ComponentType: LibrarySymbolReference;
    Converter: LibrarySymbolReference;
    ConverterFromRegisteredType: LibrarySymbolReference;
    IsLocalizable: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    PropertyType: LibrarySymbolReference;
    SerializationVisibility: LibrarySymbolReference;
    SupportsChangeEvents: LibrarySymbolReference
  };
  PropertyDescriptorCollection: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    PropertyDescriptorCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Clear: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    Find: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    InternalSort: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    RemoveAt: LibrarySymbolReference;
    Sort: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  PropertyTabAttribute: LibrarySymbolReference & {
    PropertyTabAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    InitializeArrays: LibrarySymbolReference;
    TabClasses: LibrarySymbolReference;
    TabClassNames: LibrarySymbolReference;
    TabScopes: LibrarySymbolReference
  };
  PropertyTabScope: LibrarySymbolReference & {
    Static: LibrarySymbolReference;
    Global: LibrarySymbolReference;
    Document: LibrarySymbolReference;
    Component: LibrarySymbolReference
  };
  ProvidePropertyAttribute: LibrarySymbolReference & {
    ProvidePropertyAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    PropertyName: LibrarySymbolReference;
    ReceiverTypeName: LibrarySymbolReference;
    TypeId: LibrarySymbolReference
  };
  ReadOnlyAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    ReadOnlyAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference
  };
  RecommendedAsConfigurableAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    RecommendedAsConfigurableAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    RecommendedAsConfigurable: LibrarySymbolReference
  };
  ReferenceConverter: LibrarySymbolReference & {
    ReferenceConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference;
    GetStandardValues: LibrarySymbolReference;
    GetStandardValuesExclusive: LibrarySymbolReference;
    GetStandardValuesSupported: LibrarySymbolReference;
    IsValueAllowed: LibrarySymbolReference
  };
  RefreshEventArgs: LibrarySymbolReference & {
    RefreshEventArgs: LibrarySymbolReference;
    ComponentChanged: LibrarySymbolReference;
    TypeChanged: LibrarySymbolReference
  };
  RefreshEventHandler: LibrarySymbolReference & {
    RefreshEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  RefreshProperties: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    All: LibrarySymbolReference;
    Repaint: LibrarySymbolReference
  };
  RefreshPropertiesAttribute: LibrarySymbolReference & {
    All: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    Repaint: LibrarySymbolReference;
    RefreshPropertiesAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    RefreshProperties: LibrarySymbolReference
  };
  RunInstallerAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    RunInstallerAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    RunInstaller: LibrarySymbolReference
  };
  RunWorkerCompletedEventArgs: LibrarySymbolReference & {
    RunWorkerCompletedEventArgs: LibrarySymbolReference;
    Result: LibrarySymbolReference
  };
  RunWorkerCompletedEventHandler: LibrarySymbolReference & {
    RunWorkerCompletedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  SByteConverter: LibrarySymbolReference & {
    SByteConverter: LibrarySymbolReference
  };
  SettingsBindableAttribute: LibrarySymbolReference & {
    No: LibrarySymbolReference;
    Yes: LibrarySymbolReference;
    SettingsBindableAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Bindable: LibrarySymbolReference
  };
  SingleConverter: LibrarySymbolReference & {
    SingleConverter: LibrarySymbolReference
  };
  StringConverter: LibrarySymbolReference & {
    StringConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference
  };
  SyntaxCheck: LibrarySymbolReference & {
    CheckMachineName: LibrarySymbolReference;
    CheckPath: LibrarySymbolReference;
    CheckRootedPath: LibrarySymbolReference
  };
  TimeOnlyConverter: LibrarySymbolReference & {
    TimeOnlyConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference
  };
  TimeSpanConverter: LibrarySymbolReference & {
    TimeSpanConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference
  };
  ToolboxItemAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    None: LibrarySymbolReference;
    ToolboxItemAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    ToolboxItemType: LibrarySymbolReference;
    ToolboxItemTypeName: LibrarySymbolReference
  };
  ToolboxItemFilterAttribute: LibrarySymbolReference & {
    ToolboxItemFilterAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Match: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    FilterString: LibrarySymbolReference;
    FilterType: LibrarySymbolReference;
    TypeId: LibrarySymbolReference
  };
  ToolboxItemFilterType: LibrarySymbolReference & {
    Allow: LibrarySymbolReference;
    Custom: LibrarySymbolReference;
    Prevent: LibrarySymbolReference;
    Require: LibrarySymbolReference
  };
  TypeConverter: LibrarySymbolReference & {
    SimplePropertyDescriptor: LibrarySymbolReference & {
      SimplePropertyDescriptor: LibrarySymbolReference;
      CanResetValue: LibrarySymbolReference;
      ResetValue: LibrarySymbolReference;
      ShouldSerializeValue: LibrarySymbolReference;
      ComponentType: LibrarySymbolReference;
      IsReadOnly: LibrarySymbolReference;
      PropertyType: LibrarySymbolReference
    };
    StandardValuesCollection: LibrarySymbolReference & {
      StandardValuesCollection: LibrarySymbolReference;
      CopyTo: LibrarySymbolReference;
      GetEnumerator: LibrarySymbolReference;
      Count: LibrarySymbolReference;
      Item: LibrarySymbolReference
    }
  };
  TypeConverterAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    TypeConverterAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ConverterTypeName: LibrarySymbolReference
  };
  TypeDescriptionProvider: LibrarySymbolReference & {
    TypeDescriptionProvider: LibrarySymbolReference;
    CreateInstance: LibrarySymbolReference;
    GetCache: LibrarySymbolReference;
    GetExtendedTypeDescriptor: LibrarySymbolReference;
    GetExtendedTypeDescriptorFromRegisteredType: LibrarySymbolReference;
    GetExtenderProviders: LibrarySymbolReference;
    GetFullComponentName: LibrarySymbolReference;
    GetReflectionType: LibrarySymbolReference;
    GetRuntimeType: LibrarySymbolReference;
    GetTypeDescriptor: LibrarySymbolReference;
    GetTypeDescriptorFromRegisteredType: LibrarySymbolReference;
    IsRegisteredType: LibrarySymbolReference;
    IsSupportedType: LibrarySymbolReference;
    RequireRegisteredTypes: LibrarySymbolReference
  };
  TypeDescriptionProviderAttribute: LibrarySymbolReference & {
    TypeDescriptionProviderAttribute: LibrarySymbolReference;
    TypeName: LibrarySymbolReference
  };
  TypeDescriptor: LibrarySymbolReference & {
    AddAttributes: LibrarySymbolReference;
    AddEditorTable: LibrarySymbolReference;
    AddProvider: LibrarySymbolReference;
    AddProviderTransparent: LibrarySymbolReference;
    CreateAssociation: LibrarySymbolReference;
    CreateDesigner: LibrarySymbolReference;
    CreateEvent: LibrarySymbolReference;
    CreateInstance: LibrarySymbolReference;
    CreateProperty: LibrarySymbolReference;
    GetAssociation: LibrarySymbolReference;
    GetAttributes: LibrarySymbolReference;
    GetClassName: LibrarySymbolReference;
    GetComponentName: LibrarySymbolReference;
    GetConverter: LibrarySymbolReference;
    GetConverterFromRegisteredType: LibrarySymbolReference;
    GetDefaultEvent: LibrarySymbolReference;
    GetDefaultProperty: LibrarySymbolReference;
    GetEditor: LibrarySymbolReference;
    GetEvents: LibrarySymbolReference;
    GetEventsFromRegisteredType: LibrarySymbolReference;
    GetFullComponentName: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetPropertiesFromRegisteredType: LibrarySymbolReference;
    GetProvider: LibrarySymbolReference;
    GetReflectionType: LibrarySymbolReference;
    Refresh: LibrarySymbolReference;
    RemoveAssociation: LibrarySymbolReference;
    RemoveAssociations: LibrarySymbolReference;
    RemoveProvider: LibrarySymbolReference;
    RemoveProviderTransparent: LibrarySymbolReference;
    SortDescriptorArray: LibrarySymbolReference;
    ComNativeDescriptorHandler: LibrarySymbolReference;
    ComObjectType: LibrarySymbolReference;
    InterfaceType: LibrarySymbolReference
  };
  TypeListConverter: LibrarySymbolReference & {
    TypeListConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference;
    GetStandardValues: LibrarySymbolReference;
    GetStandardValuesExclusive: LibrarySymbolReference;
    GetStandardValuesSupported: LibrarySymbolReference
  };
  UInt128Converter: LibrarySymbolReference & {
    UInt128Converter: LibrarySymbolReference
  };
  UInt16Converter: LibrarySymbolReference & {
    UInt16Converter: LibrarySymbolReference
  };
  UInt32Converter: LibrarySymbolReference & {
    UInt32Converter: LibrarySymbolReference
  };
  UInt64Converter: LibrarySymbolReference & {
    UInt64Converter: LibrarySymbolReference
  };
  VersionConverter: LibrarySymbolReference & {
    VersionConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference;
    IsValid: LibrarySymbolReference
  };
  WarningException: LibrarySymbolReference & {
    WarningException: LibrarySymbolReference;
    HelpTopic: LibrarySymbolReference;
    HelpUrl: LibrarySymbolReference
  };
  Win32Exception: LibrarySymbolReference & {
    Win32Exception: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    NativeErrorCode: LibrarySymbolReference
  }
};
const ComponentModel: ComponentModelLibrary = createLibrary("System.ComponentModel", {
  AddingNewEventArgs: {
    kind: "class",
    members: {
      AddingNewEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      NewObject: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  AddingNewEventHandler: {
    kind: "generic",
    members: {
      AddingNewEventHandler: {
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
  AmbientValueAttribute: {
    kind: "class",
    members: {
      AmbientValueAttribute: {
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
      Value: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  ArrayConverter: {
    kind: "class",
    members: {
      ArrayConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetPropertiesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  AsyncCompletedEventArgs: {
    kind: "class",
    members: {
      AsyncCompletedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      RaiseExceptionIfNecessary: {
        kind: "method",
        methodKind: "ordinary",
      },
      Cancelled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Error: {
        kind: "property",
        type: () => {
          return System.Exception;
        },
        isNullable: true,
      },
      UserState: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  AsyncCompletedEventHandler: {
    kind: "generic",
    members: {
      AsyncCompletedEventHandler: {
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
  AsyncOperation: {
    kind: "class",
    members: {
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      OperationCompleted: {
        kind: "method",
        methodKind: "ordinary",
      },
      Post: {
        kind: "method",
        methodKind: "ordinary",
      },
      PostOperationCompleted: {
        kind: "method",
        methodKind: "ordinary",
      },
      SynchronizationContext: {
        kind: "property",
        type: () => {
          return Threading.SynchronizationContext;
        },
      },
      UserSuppliedState: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  AsyncOperationManager: {
    kind: "class",
    members: {
      CreateOperation: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SynchronizationContext: {
        kind: "property",
        type: () => {
          return Threading.SynchronizationContext;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  AttributeCollection: {
    kind: "class",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return ComponentModel.AttributeCollection;
        },
        isStatic: true,
        isReadOnly: true,
      },
      AttributeCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromExisting: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Matches: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
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
          return System.Attribute;
        },
        isVirtual: true,
      },
    },
  },
  AttributeProviderAttribute: {
    kind: "class",
    members: {
      AttributeProviderAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      PropertyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      TypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  BackgroundWorker: {
    kind: "class",
    members: {
      BackgroundWorker: {
        kind: "method",
        methodKind: "constructor",
      },
      CancelAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      OnDoWork: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnProgressChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnRunWorkerCompleted: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReportProgress: {
        kind: "method",
        methodKind: "ordinary",
      },
      RunWorkerAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      CancellationPending: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsBusy: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      WorkerReportsProgress: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      WorkerSupportsCancellation: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  BaseNumberConverter: {
    kind: "class",
    members: {
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  BindableAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.BindableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.BindableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.BindableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      BindableAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Bindable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Direction: {
        kind: "property",
        type: () => {
          return ComponentModel.BindingDirection;
        },
      },
    },
    isSealed: true,
  },
  BindableSupport: {
    kind: "enum",
    members: {
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.BindableSupport;
        },
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.BindableSupport;
        },
      },
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.BindableSupport;
        },
      },
    },
  },
  BindingDirection: {
    kind: "enum",
    members: {
      OneWay: {
        kind: "field",
        type: () => {
          return ComponentModel.BindingDirection;
        },
      },
      TwoWay: {
        kind: "field",
        type: () => {
          return ComponentModel.BindingDirection;
        },
      },
    },
  },
  BindingList: {
    kind: "class",
    members: {
      BindingList: {
        kind: "method",
        methodKind: "constructor",
      },
      AddNew: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddNewCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ApplySortCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CancelNew: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ClearItems: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EndNew: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      FindCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      InsertItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      OnAddingNew: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnListChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      RemoveSortCore: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ResetBindings: {
        kind: "method",
        methodKind: "ordinary",
      },
      ResetItem: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetItem: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
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
      AllowRemove: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSortedCore: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      RaiseListChangedEvents: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SortDirectionCore: {
        kind: "property",
        type: () => {
          return ComponentModel.ListSortDirection;
        },
        isVirtual: true,
      },
      SortPropertyCore: {
        kind: "property",
        type: () => {
          return ComponentModel.PropertyDescriptor;
        },
        isNullable: true,
        isVirtual: true,
      },
      SupportsChangeNotificationCore: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      SupportsSearchingCore: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      SupportsSortingCore: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
    },
  },
  BooleanConverter: {
    kind: "class",
    members: {
      BooleanConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValues: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValuesExclusive: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValuesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  BrowsableAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.BrowsableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.BrowsableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.BrowsableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      BrowsableAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Browsable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  ByteConverter: {
    kind: "class",
    members: {
      ByteConverter: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CancelEventArgs: {
    kind: "class",
    members: {
      CancelEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Cancel: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  CancelEventHandler: {
    kind: "generic",
    members: {
      CancelEventHandler: {
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
  CategoryAttribute: {
    kind: "class",
    members: {
      CategoryAttribute: {
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
      GetLocalizedString: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Action: {
        kind: "property",
        type: () => {
          return ComponentModel.CategoryAttribute;
        },
        isStatic: true,
      },
      Appearance: {
        kind: "property",
        type: () => {
          return ComponentModel.CategoryAttribute;
        },
        isStatic: true,
      },
      Asynchronous: {
        kind: "property",
        type: () => {
          return ComponentModel.CategoryAttribute;
        },
        isStatic: true,
      },
      Behavior: {
        kind: "property",
        type: () => {
          return ComponentModel.CategoryAttribute;
        },
        isStatic: true,
      },
      Category: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Data: {
        kind: "property",
        type: () => {
          return ComponentModel.CategoryAttribute;
        },
        isStatic: true,
      },
      Default: {
        kind: "property",
        type: () => {
          return ComponentModel.CategoryAttribute;
        },
        isStatic: true,
      },
      Design: {
        kind: "property",
        type: () => {
          return ComponentModel.CategoryAttribute;
        },
        isStatic: true,
      },
      DragDrop: {
        kind: "property",
        type: () => {
          return ComponentModel.CategoryAttribute;
        },
        isStatic: true,
      },
      Focus: {
        kind: "property",
        type: () => {
          return ComponentModel.CategoryAttribute;
        },
        isStatic: true,
      },
      Format: {
        kind: "property",
        type: () => {
          return ComponentModel.CategoryAttribute;
        },
        isStatic: true,
      },
      Key: {
        kind: "property",
        type: () => {
          return ComponentModel.CategoryAttribute;
        },
        isStatic: true,
      },
      Layout: {
        kind: "property",
        type: () => {
          return ComponentModel.CategoryAttribute;
        },
        isStatic: true,
      },
      Mouse: {
        kind: "property",
        type: () => {
          return ComponentModel.CategoryAttribute;
        },
        isStatic: true,
      },
      WindowStyle: {
        kind: "property",
        type: () => {
          return ComponentModel.CategoryAttribute;
        },
        isStatic: true,
      },
    },
  },
  CharConverter: {
    kind: "class",
    members: {
      CharConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  CollectionChangeAction: {
    kind: "enum",
    members: {
      Add: {
        kind: "field",
        type: () => {
          return ComponentModel.CollectionChangeAction;
        },
      },
      Remove: {
        kind: "field",
        type: () => {
          return ComponentModel.CollectionChangeAction;
        },
      },
      Refresh: {
        kind: "field",
        type: () => {
          return ComponentModel.CollectionChangeAction;
        },
      },
    },
  },
  CollectionChangeEventArgs: {
    kind: "class",
    members: {
      CollectionChangeEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Action: {
        kind: "property",
        type: () => {
          return ComponentModel.CollectionChangeAction;
        },
        isVirtual: true,
      },
      Element: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
  },
  CollectionChangeEventHandler: {
    kind: "generic",
    members: {
      CollectionChangeEventHandler: {
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
  CollectionConverter: {
    kind: "class",
    members: {
      CollectionConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  ComplexBindingPropertiesAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.ComplexBindingPropertiesAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ComplexBindingPropertiesAttribute: {
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
      DataMember: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      DataSource: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  Component: {
    kind: "class",
    members: {
      Component: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetService: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanRaiseEvents: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Container: {
        kind: "property",
        type: () => {
          return ComponentModel.IContainer;
        },
      },
      DesignMode: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Events: {
        kind: "property",
        type: () => {
          return ComponentModel.EventHandlerList;
        },
      },
      Site: {
        kind: "property",
        type: () => {
          return ComponentModel.ISite;
        },
        isVirtual: true,
      },
    },
  },
  ComponentCollection: {
    kind: "class",
    members: {
      ComponentCollection: {
        kind: "method",
        methodKind: "constructor",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return ComponentModel.IComponent;
        },
        isVirtual: true,
      },
    },
  },
  ComponentConverter: {
    kind: "class",
    members: {
      ComponentConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetPropertiesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  ComponentEditor: {
    kind: "class",
    members: {
      ComponentEditor: {
        kind: "method",
        methodKind: "constructor",
      },
      EditComponent: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  ComponentResourceManager: {
    kind: "class",
    members: {
      ComponentResourceManager: {
        kind: "method",
        methodKind: "constructor",
      },
      ApplyResources: {
        kind: "method",
        methodKind: "ordinary",
      },
      ApplyResourcesToRegisteredType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  Container: {
    kind: "class",
    members: {
      Container: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateSite: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetService: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveWithoutUnsiting: {
        kind: "method",
        methodKind: "ordinary",
      },
      ValidateName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Components: {
        kind: "property",
        type: () => {
          return ComponentModel.ComponentCollection;
        },
        isVirtual: true,
      },
    },
  },
  ContainerFilterService: {
    kind: "class",
    members: {
      ContainerFilterService: {
        kind: "method",
        methodKind: "constructor",
      },
      FilterComponents: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  CultureInfoConverter: {
    kind: "class",
    members: {
      CultureInfoConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCultureName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetStandardValues: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValuesExclusive: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValuesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  CustomTypeDescriptor: {
    kind: "class",
    members: {
      CustomTypeDescriptor: {
        kind: "method",
        methodKind: "constructor",
      },
      GetAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetClassName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetComponentName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetConverter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetConverterFromRegisteredType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetDefaultEvent: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetDefaultProperty: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEditor: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEvents: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEventsFromRegisteredType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetPropertiesFromRegisteredType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetPropertyOwner: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RequireRegisteredTypes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  DataErrorsChangedEventArgs: {
    kind: "class",
    members: {
      DataErrorsChangedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      PropertyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
  },
  DataObjectAttribute: {
    kind: "class",
    members: {
      DataObject: {
        kind: "field",
        type: () => {
          return ComponentModel.DataObjectAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.DataObjectAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      NonDataObject: {
        kind: "field",
        type: () => {
          return ComponentModel.DataObjectAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DataObjectAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsDataObject: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  DataObjectFieldAttribute: {
    kind: "class",
    members: {
      DataObjectFieldAttribute: {
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
      IsIdentity: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNullable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PrimaryKey: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  DataObjectMethodAttribute: {
    kind: "class",
    members: {
      DataObjectMethodAttribute: {
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
      Match: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsDefault: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MethodType: {
        kind: "property",
        type: () => {
          return ComponentModel.DataObjectMethodType;
        },
      },
    },
    isSealed: true,
  },
  DataObjectMethodType: {
    kind: "enum",
    members: {
      Fill: {
        kind: "field",
        type: () => {
          return ComponentModel.DataObjectMethodType;
        },
      },
      Select: {
        kind: "field",
        type: () => {
          return ComponentModel.DataObjectMethodType;
        },
      },
      Update: {
        kind: "field",
        type: () => {
          return ComponentModel.DataObjectMethodType;
        },
      },
      Insert: {
        kind: "field",
        type: () => {
          return ComponentModel.DataObjectMethodType;
        },
      },
      Delete: {
        kind: "field",
        type: () => {
          return ComponentModel.DataObjectMethodType;
        },
      },
    },
  },
  DateOnlyConverter: {
    kind: "class",
    members: {
      DateOnlyConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  DateTimeConverter: {
    kind: "class",
    members: {
      DateTimeConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  DateTimeOffsetConverter: {
    kind: "class",
    members: {
      DateTimeOffsetConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  DecimalConverter: {
    kind: "class",
    members: {
      DecimalConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  DefaultBindingPropertyAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.DefaultBindingPropertyAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DefaultBindingPropertyAttribute: {
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
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  DefaultEventAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.DefaultEventAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DefaultEventAttribute: {
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
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  DefaultPropertyAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.DefaultPropertyAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DefaultPropertyAttribute: {
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
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  DefaultValueAttribute: {
    kind: "class",
    members: {
      DefaultValueAttribute: {
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
      SetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
  },
  DescriptionAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.DescriptionAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DescriptionAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Description: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      DescriptionValue: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  DesignOnlyAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignOnlyAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignOnlyAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignOnlyAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DesignOnlyAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsDesignOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  DesignTimeVisibleAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignTimeVisibleAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignTimeVisibleAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignTimeVisibleAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DesignTimeVisibleAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Visible: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  DesignerAttribute: {
    kind: "class",
    members: {
      DesignerAttribute: {
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
      DesignerBaseTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DesignerTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      TypeId: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  DesignerCategoryAttribute: {
    kind: "class",
    members: {
      Component: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignerCategoryAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignerCategoryAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Form: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignerCategoryAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Generic: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignerCategoryAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DesignerCategoryAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Category: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      TypeId: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  DesignerSerializationVisibility: {
    kind: "enum",
    members: {
      Hidden: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignerSerializationVisibility;
        },
      },
      Visible: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignerSerializationVisibility;
        },
      },
      Content: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignerSerializationVisibility;
        },
      },
    },
  },
  DesignerSerializationVisibilityAttribute: {
    kind: "class",
    members: {
      Content: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignerSerializationVisibilityAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignerSerializationVisibilityAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Hidden: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignerSerializationVisibilityAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Visible: {
        kind: "field",
        type: () => {
          return ComponentModel.DesignerSerializationVisibilityAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DesignerSerializationVisibilityAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Visibility: {
        kind: "property",
        type: () => {
          return ComponentModel.DesignerSerializationVisibility;
        },
      },
    },
    isSealed: true,
  },
  DisplayNameAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.DisplayNameAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DisplayNameAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DisplayName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      DisplayNameValue: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  DoWorkEventArgs: {
    kind: "class",
    members: {
      DoWorkEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Argument: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      Result: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  DoWorkEventHandler: {
    kind: "generic",
    members: {
      DoWorkEventHandler: {
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
  DoubleConverter: {
    kind: "class",
    members: {
      DoubleConverter: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  EditorAttribute: {
    kind: "class",
    members: {
      EditorAttribute: {
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
      EditorBaseTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      EditorTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      TypeId: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  EditorBrowsableAttribute: {
    kind: "class",
    members: {
      EditorBrowsableAttribute: {
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
      State: {
        kind: "property",
        type: () => {
          return ComponentModel.EditorBrowsableState;
        },
      },
    },
    isSealed: true,
  },
  EditorBrowsableState: {
    kind: "enum",
    members: {
      Always: {
        kind: "field",
        type: () => {
          return ComponentModel.EditorBrowsableState;
        },
      },
      Never: {
        kind: "field",
        type: () => {
          return ComponentModel.EditorBrowsableState;
        },
      },
      Advanced: {
        kind: "field",
        type: () => {
          return ComponentModel.EditorBrowsableState;
        },
      },
    },
  },
  EnumConverter: {
    kind: "class",
    members: {
      EnumConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValues: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValuesExclusive: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValuesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Comparer: {
        kind: "property",
        type: () => {
          return Collections.IComparer;
        },
        isVirtual: true,
      },
      EnumType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      Values: {
        kind: "property",
        type: () => {
          return ComponentModel.TypeConverter.StandardValuesCollection;
        },
      },
    },
  },
  EventDescriptor: {
    kind: "class",
    members: {
      EventDescriptor: {
        kind: "method",
        methodKind: "constructor",
      },
      AddEventHandler: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      RemoveEventHandler: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ComponentType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isAbstract: true,
      },
      EventType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isAbstract: true,
      },
      IsMulticast: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  EventDescriptorCollection: {
    kind: "class",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return ComponentModel.EventDescriptorCollection;
        },
        isStatic: true,
        isReadOnly: true,
      },
      EventDescriptorCollection: {
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
      Find: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      InternalSort: {
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
      Sort: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
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
          return ComponentModel.EventDescriptor;
        },
        isVirtual: true,
      },
    },
  },
  EventHandlerList: {
    kind: "class",
    members: {
      EventHandlerList: {
        kind: "method",
        methodKind: "constructor",
      },
      AddHandler: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddHandlers: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveHandler: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return System.Delegate;
        },
      },
    },
    isSealed: true,
  },
  ExpandableObjectConverter: {
    kind: "class",
    members: {
      ExpandableObjectConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetPropertiesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  ExtenderProvidedPropertyAttribute: {
    kind: "class",
    members: {
      ExtenderProvidedPropertyAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ExtenderProperty: {
        kind: "property",
        type: () => {
          return ComponentModel.PropertyDescriptor;
        },
        isNullable: true,
      },
      Provider: {
        kind: "property",
        type: () => {
          return ComponentModel.IExtenderProvider;
        },
      },
      ReceiverType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  GuidConverter: {
    kind: "class",
    members: {
      GuidConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  HalfConverter: {
    kind: "class",
    members: {
      HalfConverter: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  HandledEventArgs: {
    kind: "class",
    members: {
      HandledEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Handled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  HandledEventHandler: {
    kind: "generic",
    members: {
      HandledEventHandler: {
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
  IBindingList: {
    kind: "interface",
    members: {
      AddIndex: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddNew: {
        kind: "method",
        methodKind: "ordinary",
      },
      ApplySort: {
        kind: "method",
        methodKind: "ordinary",
      },
      Find: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveIndex: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveSort: {
        kind: "method",
        methodKind: "ordinary",
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
      AllowRemove: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSorted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SortDirection: {
        kind: "property",
        type: () => {
          return ComponentModel.ListSortDirection;
        },
      },
      SortProperty: {
        kind: "property",
        type: () => {
          return ComponentModel.PropertyDescriptor;
        },
        isNullable: true,
      },
      SupportsChangeNotification: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SupportsSearching: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SupportsSorting: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  IBindingListView: {
    kind: "interface",
    members: {
      ApplySort: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveFilter: {
        kind: "method",
        methodKind: "ordinary",
      },
      Filter: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SortDescriptions: {
        kind: "property",
        type: () => {
          return ComponentModel.ListSortDescriptionCollection;
        },
      },
      SupportsAdvancedSorting: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SupportsFiltering: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ICancelAddNew: {
    kind: "interface",
    members: {
      CancelNew: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndNew: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IChangeTracking: {
    kind: "interface",
    members: {
      AcceptChanges: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsChanged: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  IComNativeDescriptorHandler: {
    kind: "interface",
    members: {
      GetAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetClassName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetConverter: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDefaultEvent: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDefaultProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEditor: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEvents: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPropertyValue: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IComponent: {
    kind: "interface",
    members: {
      Site: {
        kind: "property",
        type: () => {
          return ComponentModel.ISite;
        },
      },
    },
  },
  IContainer: {
    kind: "interface",
    members: {
      Add: {
        kind: "method",
        methodKind: "ordinary",
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      Components: {
        kind: "property",
        type: () => {
          return ComponentModel.ComponentCollection;
        },
      },
    },
  },
  ICustomTypeDescriptor: {
    kind: "interface",
    members: {
      GetAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetClassName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetComponentName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetConverter: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetConverterFromRegisteredType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDefaultEvent: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDefaultProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEditor: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEvents: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEventsFromRegisteredType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPropertiesFromRegisteredType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPropertyOwner: {
        kind: "method",
        methodKind: "ordinary",
      },
      RequireRegisteredTypes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
      },
    },
  },
  IDataErrorInfo: {
    kind: "interface",
    members: {
      Error: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  IEditableObject: {
    kind: "interface",
    members: {
      BeginEdit: {
        kind: "method",
        methodKind: "ordinary",
      },
      CancelEdit: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndEdit: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IExtenderProvider: {
    kind: "interface",
    members: {
      CanExtend: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IIntellisenseBuilder: {
    kind: "interface",
    members: {
      Show: {
        kind: "method",
        methodKind: "ordinary",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  IListSource: {
    kind: "interface",
    members: {
      GetList: {
        kind: "method",
        methodKind: "ordinary",
      },
      ContainsListCollection: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  INestedContainer: {
    kind: "interface",
    members: {
      Owner: {
        kind: "property",
        type: () => {
          return ComponentModel.IComponent;
        },
      },
    },
  },
  INestedSite: {
    kind: "interface",
    members: {
      FullName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  INotifyDataErrorInfo: {
    kind: "interface",
    members: {
      GetErrors: {
        kind: "method",
        methodKind: "ordinary",
      },
      HasErrors: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  INotifyPropertyChanged: {
    kind: "interface",
    members: {},
  },
  INotifyPropertyChanging: {
    kind: "interface",
    members: {},
  },
  IRaiseItemChangedEvents: {
    kind: "interface",
    members: {
      RaisesItemChangedEvents: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  IRevertibleChangeTracking: {
    kind: "interface",
    members: {
      RejectChanges: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISite: {
    kind: "interface",
    members: {
      Component: {
        kind: "property",
        type: () => {
          return ComponentModel.IComponent;
        },
      },
      Container: {
        kind: "property",
        type: () => {
          return ComponentModel.IContainer;
        },
      },
      DesignMode: {
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
        isNullable: true,
      },
    },
  },
  ISupportInitialize: {
    kind: "interface",
    members: {
      BeginInit: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndInit: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISupportInitializeNotification: {
    kind: "interface",
    members: {
      IsInitialized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ISynchronizeInvoke: {
    kind: "interface",
    members: {
      BeginInvoke: {
        kind: "method",
        methodKind: "ordinary",
      },
      EndInvoke: {
        kind: "method",
        methodKind: "ordinary",
      },
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
      },
      InvokeRequired: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ITypeDescriptorContext: {
    kind: "interface",
    members: {
      OnComponentChanged: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnComponentChanging: {
        kind: "method",
        methodKind: "ordinary",
      },
      Container: {
        kind: "property",
        type: () => {
          return ComponentModel.IContainer;
        },
      },
      Instance: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      PropertyDescriptor: {
        kind: "property",
        type: () => {
          return ComponentModel.PropertyDescriptor;
        },
      },
    },
  },
  ITypedList: {
    kind: "interface",
    members: {
      GetItemProperties: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetListName: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ImmutableObjectAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.ImmutableObjectAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.ImmutableObjectAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.ImmutableObjectAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ImmutableObjectAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Immutable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  InheritanceAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.InheritanceAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Inherited: {
        kind: "field",
        type: () => {
          return ComponentModel.InheritanceAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      InheritedReadOnly: {
        kind: "field",
        type: () => {
          return ComponentModel.InheritanceAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      NotInherited: {
        kind: "field",
        type: () => {
          return ComponentModel.InheritanceAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      InheritanceAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InheritanceLevel: {
        kind: "property",
        type: () => {
          return ComponentModel.InheritanceLevel;
        },
      },
    },
    isSealed: true,
  },
  InheritanceLevel: {
    kind: "enum",
    members: {
      Inherited: {
        kind: "field",
        type: () => {
          return ComponentModel.InheritanceLevel;
        },
      },
      InheritedReadOnly: {
        kind: "field",
        type: () => {
          return ComponentModel.InheritanceLevel;
        },
      },
      NotInherited: {
        kind: "field",
        type: () => {
          return ComponentModel.InheritanceLevel;
        },
      },
    },
  },
  InitializationEventAttribute: {
    kind: "class",
    members: {
      InitializationEventAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      EventName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  InstallerTypeAttribute: {
    kind: "class",
    members: {
      InstallerTypeAttribute: {
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
      InstallerType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
  },
  InstanceCreationEditor: {
    kind: "class",
    members: {
      InstanceCreationEditor: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Text: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  Int128Converter: {
    kind: "class",
    members: {
      Int128Converter: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Int16Converter: {
    kind: "class",
    members: {
      Int16Converter: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Int32Converter: {
    kind: "class",
    members: {
      Int32Converter: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  Int64Converter: {
    kind: "class",
    members: {
      Int64Converter: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  InvalidAsynchronousStateException: {
    kind: "class",
    members: {
      InvalidAsynchronousStateException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  InvalidEnumArgumentException: {
    kind: "class",
    members: {
      InvalidEnumArgumentException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  LicFileLicenseProvider: {
    kind: "class",
    members: {
      LicFileLicenseProvider: {
        kind: "method",
        methodKind: "constructor",
      },
      GetKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetLicense: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsKeyValid: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  License: {
    kind: "class",
    members: {
      License: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      LicenseKey: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  LicenseContext: {
    kind: "class",
    members: {
      LicenseContext: {
        kind: "method",
        methodKind: "constructor",
      },
      GetSavedLicenseKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetService: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetSavedLicenseKey: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      UsageMode: {
        kind: "property",
        type: () => {
          return ComponentModel.LicenseUsageMode;
        },
        isVirtual: true,
      },
    },
  },
  LicenseException: {
    kind: "class",
    members: {
      LicenseException: {
        kind: "method",
        methodKind: "constructor",
      },
      LicensedType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
    },
  },
  LicenseManager: {
    kind: "class",
    members: {
      CreateWithContext: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsLicensed: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      LockContext: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      UnlockContext: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Validate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CurrentContext: {
        kind: "property",
        type: () => {
          return ComponentModel.LicenseContext;
        },
        isStatic: true,
      },
      UsageMode: {
        kind: "property",
        type: () => {
          return ComponentModel.LicenseUsageMode;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  LicenseProvider: {
    kind: "class",
    members: {
      LicenseProvider: {
        kind: "method",
        methodKind: "constructor",
      },
      GetLicense: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  LicenseProviderAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.LicenseProviderAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      LicenseProviderAttribute: {
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
      LicenseProvider: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      TypeId: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  LicenseUsageMode: {
    kind: "enum",
    members: {
      Runtime: {
        kind: "field",
        type: () => {
          return ComponentModel.LicenseUsageMode;
        },
      },
      Designtime: {
        kind: "field",
        type: () => {
          return ComponentModel.LicenseUsageMode;
        },
      },
    },
  },
  ListBindableAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.ListBindableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.ListBindableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.ListBindableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ListBindableAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ListBindable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  ListChangedEventArgs: {
    kind: "class",
    members: {
      ListChangedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      ListChangedType: {
        kind: "property",
        type: () => {
          return ComponentModel.ListChangedType;
        },
      },
      NewIndex: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      OldIndex: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PropertyDescriptor: {
        kind: "property",
        type: () => {
          return ComponentModel.PropertyDescriptor;
        },
      },
    },
  },
  ListChangedEventHandler: {
    kind: "generic",
    members: {
      ListChangedEventHandler: {
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
  ListChangedType: {
    kind: "enum",
    members: {
      Reset: {
        kind: "field",
        type: () => {
          return ComponentModel.ListChangedType;
        },
      },
      ItemAdded: {
        kind: "field",
        type: () => {
          return ComponentModel.ListChangedType;
        },
      },
      ItemDeleted: {
        kind: "field",
        type: () => {
          return ComponentModel.ListChangedType;
        },
      },
      ItemMoved: {
        kind: "field",
        type: () => {
          return ComponentModel.ListChangedType;
        },
      },
      ItemChanged: {
        kind: "field",
        type: () => {
          return ComponentModel.ListChangedType;
        },
      },
      PropertyDescriptorAdded: {
        kind: "field",
        type: () => {
          return ComponentModel.ListChangedType;
        },
      },
      PropertyDescriptorDeleted: {
        kind: "field",
        type: () => {
          return ComponentModel.ListChangedType;
        },
      },
      PropertyDescriptorChanged: {
        kind: "field",
        type: () => {
          return ComponentModel.ListChangedType;
        },
      },
    },
  },
  ListSortDescription: {
    kind: "class",
    members: {
      ListSortDescription: {
        kind: "method",
        methodKind: "constructor",
      },
      PropertyDescriptor: {
        kind: "property",
        type: () => {
          return ComponentModel.PropertyDescriptor;
        },
      },
      SortDirection: {
        kind: "property",
        type: () => {
          return ComponentModel.ListSortDirection;
        },
      },
    },
  },
  ListSortDescriptionCollection: {
    kind: "class",
    members: {
      ListSortDescriptionCollection: {
        kind: "method",
        methodKind: "constructor",
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
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return ComponentModel.ListSortDescription;
        },
      },
    },
  },
  ListSortDirection: {
    kind: "enum",
    members: {
      Ascending: {
        kind: "field",
        type: () => {
          return ComponentModel.ListSortDirection;
        },
      },
      Descending: {
        kind: "field",
        type: () => {
          return ComponentModel.ListSortDirection;
        },
      },
    },
  },
  LocalizableAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.LocalizableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.LocalizableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.LocalizableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      LocalizableAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLocalizable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  LookupBindingPropertiesAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.LookupBindingPropertiesAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      LookupBindingPropertiesAttribute: {
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
      DataSource: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      DisplayMember: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      LookupMember: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ValueMember: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  MarshalByValueComponent: {
    kind: "class",
    members: {
      MarshalByValueComponent: {
        kind: "method",
        methodKind: "constructor",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Finalize: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetService: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Container: {
        kind: "property",
        type: () => {
          return ComponentModel.IContainer;
        },
        isVirtual: true,
      },
      DesignMode: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Events: {
        kind: "property",
        type: () => {
          return ComponentModel.EventHandlerList;
        },
      },
      Site: {
        kind: "property",
        type: () => {
          return ComponentModel.ISite;
        },
        isVirtual: true,
      },
    },
  },
  MaskedTextProvider: {
    kind: "class",
    members: {
      MaskedTextProvider: {
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
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      FindAssignedEditPositionFrom: {
        kind: "method",
        methodKind: "ordinary",
      },
      FindAssignedEditPositionInRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      FindEditPositionFrom: {
        kind: "method",
        methodKind: "ordinary",
      },
      FindEditPositionInRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      FindNonEditPositionFrom: {
        kind: "method",
        methodKind: "ordinary",
      },
      FindNonEditPositionInRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      FindUnassignedEditPositionFrom: {
        kind: "method",
        methodKind: "ordinary",
      },
      FindUnassignedEditPositionInRange: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOperationResultFromHint: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      InsertAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsAvailablePosition: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEditPosition: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsValidInputChar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsValidMaskChar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsValidPasswordChar: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveAt: {
        kind: "method",
        methodKind: "ordinary",
      },
      Replace: {
        kind: "method",
        methodKind: "ordinary",
      },
      Set: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToDisplayString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      VerifyChar: {
        kind: "method",
        methodKind: "ordinary",
      },
      VerifyEscapeChar: {
        kind: "method",
        methodKind: "ordinary",
      },
      VerifyString: {
        kind: "method",
        methodKind: "ordinary",
      },
      AllowPromptAsInput: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AsciiOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AssignedEditPositionCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      AvailableEditPositionCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Culture: {
        kind: "property",
        type: () => {
          return Globalization.CultureInfo;
        },
      },
      DefaultPasswordChar: {
        kind: "property",
        type: () => {
          return System.Char;
        },
        isStatic: true,
      },
      EditPositionCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      EditPositions: {
        kind: "property",
        type: () => {
          return Collections.IEnumerator;
        },
      },
      IncludeLiterals: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IncludePrompt: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      InvalidIndex: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
      },
      IsPassword: {
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
      LastAssignedPosition: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Mask: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MaskCompleted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MaskFull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      PasswordChar: {
        kind: "property",
        type: () => {
          return System.Char;
        },
      },
      PromptChar: {
        kind: "property",
        type: () => {
          return System.Char;
        },
      },
      ResetOnPrompt: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ResetOnSpace: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SkipLiterals: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  MaskedTextResultHint: {
    kind: "enum",
    members: {
      PositionOutOfRange: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
      NonEditPosition: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
      UnavailableEditPosition: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
      PromptCharNotAllowed: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
      InvalidInput: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
      SignedDigitExpected: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
      LetterExpected: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
      DigitExpected: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
      AlphanumericCharacterExpected: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
      AsciiCharacterExpected: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
      Unknown: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
      CharacterEscaped: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
      NoEffect: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
      SideEffect: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
      Success: {
        kind: "field",
        type: () => {
          return ComponentModel.MaskedTextResultHint;
        },
      },
    },
  },
  MemberDescriptor: {
    kind: "class",
    members: {
      MemberDescriptor: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateAttributeCollection: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FillAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      FindMethod: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetInvocationTarget: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetInvokee: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetSite: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AttributeArray: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
        isVirtual: true,
      },
      Attributes: {
        kind: "property",
        type: () => {
          return ComponentModel.AttributeCollection;
        },
        isVirtual: true,
      },
      Category: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      Description: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      DesignTimeOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      DisplayName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      IsBrowsable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      NameHashCode: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  MergablePropertyAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.MergablePropertyAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.MergablePropertyAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.MergablePropertyAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MergablePropertyAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AllowMerge: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  MultilineStringConverter: {
    kind: "class",
    members: {
      MultilineStringConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetPropertiesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  NestedContainer: {
    kind: "class",
    members: {
      NestedContainer: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateSite: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetService: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Owner: {
        kind: "property",
        type: () => {
          return ComponentModel.IComponent;
        },
      },
      OwnerName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
  },
  NotifyParentPropertyAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.NotifyParentPropertyAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.NotifyParentPropertyAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.NotifyParentPropertyAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      NotifyParentPropertyAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      NotifyParent: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  NullableConverter: {
    kind: "class",
    members: {
      NullableConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCreateInstanceSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetPropertiesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValues: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValuesExclusive: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValuesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      NullableType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      UnderlyingType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      UnderlyingTypeConverter: {
        kind: "property",
        type: () => {
          return ComponentModel.TypeConverter;
        },
      },
    },
  },
  ParenthesizePropertyNameAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.ParenthesizePropertyNameAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ParenthesizePropertyNameAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      NeedParenthesis: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  PasswordPropertyTextAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.PasswordPropertyTextAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.PasswordPropertyTextAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.PasswordPropertyTextAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      PasswordPropertyTextAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Password: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  ProgressChangedEventArgs: {
    kind: "class",
    members: {
      ProgressChangedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      ProgressPercentage: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      UserState: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  ProgressChangedEventHandler: {
    kind: "generic",
    members: {
      ProgressChangedEventHandler: {
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
  PropertyChangedEventArgs: {
    kind: "class",
    members: {
      PropertyChangedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      PropertyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
  },
  PropertyChangedEventHandler: {
    kind: "generic",
    members: {
      PropertyChangedEventHandler: {
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
  PropertyChangingEventArgs: {
    kind: "class",
    members: {
      PropertyChangingEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      PropertyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
  },
  PropertyChangingEventHandler: {
    kind: "generic",
    members: {
      PropertyChangingEventHandler: {
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
  PropertyDescriptor: {
    kind: "class",
    members: {
      PropertyDescriptor: {
        kind: "method",
        methodKind: "constructor",
      },
      AddValueChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CanResetValue: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FillAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetChildProperties: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEditor: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetInvocationTarget: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetTypeFromName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetValueChangedHandler: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnValueChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveValueChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ResetValue: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SetValue: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ShouldSerializeValue: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ComponentType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isAbstract: true,
      },
      Converter: {
        kind: "property",
        type: () => {
          return ComponentModel.TypeConverter;
        },
        isVirtual: true,
      },
      ConverterFromRegisteredType: {
        kind: "property",
        type: () => {
          return ComponentModel.TypeConverter;
        },
        isVirtual: true,
      },
      IsLocalizable: {
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
        isAbstract: true,
      },
      PropertyType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isAbstract: true,
      },
      SerializationVisibility: {
        kind: "property",
        type: () => {
          return ComponentModel.DesignerSerializationVisibility;
        },
      },
      SupportsChangeEvents: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  PropertyDescriptorCollection: {
    kind: "class",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return ComponentModel.PropertyDescriptorCollection;
        },
        isStatic: true,
        isReadOnly: true,
      },
      PropertyDescriptorCollection: {
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
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      Find: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      InternalSort: {
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
      Sort: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
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
          return ComponentModel.PropertyDescriptor;
        },
        isVirtual: true,
      },
    },
  },
  PropertyTabAttribute: {
    kind: "class",
    members: {
      PropertyTabAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      InitializeArrays: {
        kind: "method",
        methodKind: "ordinary",
      },
      TabClasses: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      TabClassNames: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      TabScopes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  PropertyTabScope: {
    kind: "enum",
    members: {
      Static: {
        kind: "field",
        type: () => {
          return ComponentModel.PropertyTabScope;
        },
      },
      Global: {
        kind: "field",
        type: () => {
          return ComponentModel.PropertyTabScope;
        },
      },
      Document: {
        kind: "field",
        type: () => {
          return ComponentModel.PropertyTabScope;
        },
      },
      Component: {
        kind: "field",
        type: () => {
          return ComponentModel.PropertyTabScope;
        },
      },
    },
  },
  ProvidePropertyAttribute: {
    kind: "class",
    members: {
      ProvidePropertyAttribute: {
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
      PropertyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ReceiverTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      TypeId: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  ReadOnlyAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.ReadOnlyAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.ReadOnlyAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.ReadOnlyAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ReadOnlyAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  RecommendedAsConfigurableAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.RecommendedAsConfigurableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.RecommendedAsConfigurableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.RecommendedAsConfigurableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      RecommendedAsConfigurableAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      RecommendedAsConfigurable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ReferenceConverter: {
    kind: "class",
    members: {
      ReferenceConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValues: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValuesExclusive: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValuesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValueAllowed: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  RefreshEventArgs: {
    kind: "class",
    members: {
      RefreshEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      ComponentChanged: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      TypeChanged: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
    },
  },
  RefreshEventHandler: {
    kind: "generic",
    members: {
      RefreshEventHandler: {
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
  RefreshProperties: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return ComponentModel.RefreshProperties;
        },
      },
      All: {
        kind: "field",
        type: () => {
          return ComponentModel.RefreshProperties;
        },
      },
      Repaint: {
        kind: "field",
        type: () => {
          return ComponentModel.RefreshProperties;
        },
      },
    },
  },
  RefreshPropertiesAttribute: {
    kind: "class",
    members: {
      All: {
        kind: "field",
        type: () => {
          return ComponentModel.RefreshPropertiesAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.RefreshPropertiesAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Repaint: {
        kind: "field",
        type: () => {
          return ComponentModel.RefreshPropertiesAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      RefreshPropertiesAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      RefreshProperties: {
        kind: "property",
        type: () => {
          return ComponentModel.RefreshProperties;
        },
      },
    },
    isSealed: true,
  },
  RunInstallerAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.RunInstallerAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.RunInstallerAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.RunInstallerAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      RunInstallerAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      RunInstaller: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  RunWorkerCompletedEventArgs: {
    kind: "class",
    members: {
      RunWorkerCompletedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Result: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  RunWorkerCompletedEventHandler: {
    kind: "generic",
    members: {
      RunWorkerCompletedEventHandler: {
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
  SByteConverter: {
    kind: "class",
    members: {
      SByteConverter: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  SettingsBindableAttribute: {
    kind: "class",
    members: {
      No: {
        kind: "field",
        type: () => {
          return ComponentModel.SettingsBindableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Yes: {
        kind: "field",
        type: () => {
          return ComponentModel.SettingsBindableAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SettingsBindableAttribute: {
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
      Bindable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  SingleConverter: {
    kind: "class",
    members: {
      SingleConverter: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  StringConverter: {
    kind: "class",
    members: {
      StringConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  SyntaxCheck: {
    kind: "class",
    members: {
      CheckMachineName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CheckPath: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CheckRootedPath: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  TimeOnlyConverter: {
    kind: "class",
    members: {
      TimeOnlyConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  TimeSpanConverter: {
    kind: "class",
    members: {
      TimeSpanConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  ToolboxItemAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.ToolboxItemAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      None: {
        kind: "field",
        type: () => {
          return ComponentModel.ToolboxItemAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ToolboxItemAttribute: {
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
      IsDefaultAttribute: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToolboxItemType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      ToolboxItemTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  ToolboxItemFilterAttribute: {
    kind: "class",
    members: {
      ToolboxItemFilterAttribute: {
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
      Match: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FilterString: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      FilterType: {
        kind: "property",
        type: () => {
          return ComponentModel.ToolboxItemFilterType;
        },
      },
      TypeId: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  ToolboxItemFilterType: {
    kind: "enum",
    members: {
      Allow: {
        kind: "field",
        type: () => {
          return ComponentModel.ToolboxItemFilterType;
        },
      },
      Custom: {
        kind: "field",
        type: () => {
          return ComponentModel.ToolboxItemFilterType;
        },
      },
      Prevent: {
        kind: "field",
        type: () => {
          return ComponentModel.ToolboxItemFilterType;
        },
      },
      Require: {
        kind: "field",
        type: () => {
          return ComponentModel.ToolboxItemFilterType;
        },
      },
    },
  },
  TypeConverter: {
    kind: "class",
    members: {
      SimplePropertyDescriptor: {
        kind: "class",
        members: {
          SimplePropertyDescriptor: {
            kind: "method",
            methodKind: "constructor",
          },
          CanResetValue: {
            kind: "method",
            methodKind: "ordinary",
            isOverride: true,
          },
          ResetValue: {
            kind: "method",
            methodKind: "ordinary",
            isOverride: true,
          },
          ShouldSerializeValue: {
            kind: "method",
            methodKind: "ordinary",
            isOverride: true,
          },
          ComponentType: {
            kind: "property",
            type: () => {
              return System.Type;
            },
            isOverride: true,
          },
          IsReadOnly: {
            kind: "property",
            type: () => {
              return System.Boolean;
            },
            isOverride: true,
          },
          PropertyType: {
            kind: "property",
            type: () => {
              return System.Type;
            },
            isOverride: true,
          },
        },
        isAbstract: true,
      },
      StandardValuesCollection: {
        kind: "class",
        members: {
          StandardValuesCollection: {
            kind: "method",
            methodKind: "constructor",
          },
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
          },
          Item: {
            kind: "property",
            type: () => {
              return System.Object;
            },
          },
        },
      },
    },
  },
  TypeConverterAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return ComponentModel.TypeConverterAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      TypeConverterAttribute: {
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
      ConverterTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  TypeDescriptionProvider: {
    kind: "class",
    members: {
      TypeDescriptionProvider: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetCache: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetExtendedTypeDescriptor: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetExtendedTypeDescriptorFromRegisteredType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetExtenderProviders: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetFullComponentName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetReflectionType: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetRuntimeType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetTypeDescriptor: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetTypeDescriptorFromRegisteredType: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsRegisteredType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsSupportedType: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RequireRegisteredTypes: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  TypeDescriptionProviderAttribute: {
    kind: "class",
    members: {
      TypeDescriptionProviderAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      TypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  TypeDescriptor: {
    kind: "class",
    members: {
      AddAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AddEditorTable: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AddProvider: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      AddProviderTransparent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateAssociation: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateDesigner: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateEvent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateProperty: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetAssociation: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetAttributes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetClassName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetComponentName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetConverter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetConverterFromRegisteredType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDefaultEvent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDefaultProperty: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetEditor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetEvents: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetEventsFromRegisteredType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFullComponentName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetPropertiesFromRegisteredType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetProvider: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetReflectionType: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Refresh: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RemoveAssociation: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RemoveAssociations: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RemoveProvider: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      RemoveProviderTransparent: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SortDescriptorArray: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ComNativeDescriptorHandler: {
        kind: "property",
        type: () => {
          return ComponentModel.IComNativeDescriptorHandler;
        },
        isStatic: true,
      },
      ComObjectType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isStatic: true,
      },
      InterfaceType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isStatic: true,
      },
    },
    isSealed: true,
  },
  TypeListConverter: {
    kind: "class",
    members: {
      TypeListConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValues: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValuesExclusive: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValuesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  UInt128Converter: {
    kind: "class",
    members: {
      UInt128Converter: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  UInt16Converter: {
    kind: "class",
    members: {
      UInt16Converter: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  UInt32Converter: {
    kind: "class",
    members: {
      UInt32Converter: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  UInt64Converter: {
    kind: "class",
    members: {
      UInt64Converter: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  VersionConverter: {
    kind: "class",
    members: {
      VersionConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  WarningException: {
    kind: "class",
    members: {
      WarningException: {
        kind: "method",
        methodKind: "constructor",
      },
      HelpTopic: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      HelpUrl: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
  },
  Win32Exception: {
    kind: "class",
    members: {
      Win32Exception: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      NativeErrorCode: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
});
export default ComponentModel
