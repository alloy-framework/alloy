import Collections from "../../Collections/index.js";
import ComponentModel from "../index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Serialization } from "./Serialization/index.js";

type DesignLibrary = LibrarySymbolReference & {
  ActiveDesignerEventArgs: LibrarySymbolReference & {
    ActiveDesignerEventArgs: LibrarySymbolReference;
    NewDesigner: LibrarySymbolReference;
    OldDesigner: LibrarySymbolReference
  };
  ActiveDesignerEventHandler: LibrarySymbolReference & {
    ActiveDesignerEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  CheckoutException: LibrarySymbolReference & {
    Canceled: LibrarySymbolReference;
    CheckoutException: LibrarySymbolReference
  };
  CommandID: LibrarySymbolReference & {
    CommandID: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Guid: LibrarySymbolReference;
    ID: LibrarySymbolReference
  };
  ComponentChangedEventArgs: LibrarySymbolReference & {
    ComponentChangedEventArgs: LibrarySymbolReference;
    Component: LibrarySymbolReference;
    Member: LibrarySymbolReference;
    NewValue: LibrarySymbolReference;
    OldValue: LibrarySymbolReference
  };
  ComponentChangedEventHandler: LibrarySymbolReference & {
    ComponentChangedEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  ComponentChangingEventArgs: LibrarySymbolReference & {
    ComponentChangingEventArgs: LibrarySymbolReference;
    Component: LibrarySymbolReference;
    Member: LibrarySymbolReference
  };
  ComponentChangingEventHandler: LibrarySymbolReference & {
    ComponentChangingEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  ComponentEventArgs: LibrarySymbolReference & {
    ComponentEventArgs: LibrarySymbolReference;
    Component: LibrarySymbolReference
  };
  ComponentEventHandler: LibrarySymbolReference & {
    ComponentEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  ComponentRenameEventArgs: LibrarySymbolReference & {
    ComponentRenameEventArgs: LibrarySymbolReference;
    Component: LibrarySymbolReference;
    NewName: LibrarySymbolReference;
    OldName: LibrarySymbolReference
  };
  ComponentRenameEventHandler: LibrarySymbolReference & {
    ComponentRenameEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  DesignerCollection: LibrarySymbolReference & {
    DesignerCollection: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  DesignerEventArgs: LibrarySymbolReference & {
    DesignerEventArgs: LibrarySymbolReference;
    Designer: LibrarySymbolReference
  };
  DesignerEventHandler: LibrarySymbolReference & {
    DesignerEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  DesignerOptionService: LibrarySymbolReference & {
    DesignerOptionCollection: LibrarySymbolReference & {
      CopyTo: LibrarySymbolReference;
      GetEnumerator: LibrarySymbolReference;
      IndexOf: LibrarySymbolReference;
      ShowDialog: LibrarySymbolReference;
      Count: LibrarySymbolReference;
      Item: LibrarySymbolReference;
      Name: LibrarySymbolReference;
      Parent: LibrarySymbolReference;
      Properties: LibrarySymbolReference
    }
  };
  DesignerTransaction: LibrarySymbolReference & {
    DesignerTransaction: LibrarySymbolReference;
    Cancel: LibrarySymbolReference;
    Commit: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Finalize: LibrarySymbolReference;
    OnCancel: LibrarySymbolReference;
    OnCommit: LibrarySymbolReference;
    Canceled: LibrarySymbolReference;
    Committed: LibrarySymbolReference;
    Description: LibrarySymbolReference
  };
  DesignerTransactionCloseEventArgs: LibrarySymbolReference & {
    DesignerTransactionCloseEventArgs: LibrarySymbolReference;
    LastTransaction: LibrarySymbolReference;
    TransactionCommitted: LibrarySymbolReference
  };
  DesignerTransactionCloseEventHandler: LibrarySymbolReference & {
    DesignerTransactionCloseEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  DesignerVerb: LibrarySymbolReference & {
    DesignerVerb: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Description: LibrarySymbolReference;
    Text: LibrarySymbolReference
  };
  DesignerVerbCollection: LibrarySymbolReference & {
    DesignerVerbCollection: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    AddRange: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    Insert: LibrarySymbolReference;
    OnValidate: LibrarySymbolReference;
    Remove: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  DesigntimeLicenseContext: LibrarySymbolReference & {
    DesigntimeLicenseContext: LibrarySymbolReference;
    GetSavedLicenseKey: LibrarySymbolReference;
    SetSavedLicenseKey: LibrarySymbolReference;
    UsageMode: LibrarySymbolReference
  };
  DesigntimeLicenseContextSerializer: LibrarySymbolReference & {
    Serialize: LibrarySymbolReference
  };
  HelpContextType: LibrarySymbolReference & {
    Ambient: LibrarySymbolReference;
    Window: LibrarySymbolReference;
    Selection: LibrarySymbolReference;
    ToolWindowSelection: LibrarySymbolReference
  };
  HelpKeywordAttribute: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    HelpKeywordAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsDefaultAttribute: LibrarySymbolReference;
    HelpKeyword: LibrarySymbolReference
  };
  HelpKeywordType: LibrarySymbolReference & {
    F1Keyword: LibrarySymbolReference;
    GeneralKeyword: LibrarySymbolReference;
    FilterKeyword: LibrarySymbolReference
  };
  IComponentChangeService: LibrarySymbolReference & {
    OnComponentChanged: LibrarySymbolReference;
    OnComponentChanging: LibrarySymbolReference
  };
  IComponentDiscoveryService: LibrarySymbolReference & {
    GetComponentTypes: LibrarySymbolReference
  };
  IComponentInitializer: LibrarySymbolReference & {
    InitializeExistingComponent: LibrarySymbolReference;
    InitializeNewComponent: LibrarySymbolReference
  };
  IDesigner: LibrarySymbolReference & {
    DoDefaultAction: LibrarySymbolReference;
    Initialize: LibrarySymbolReference;
    Component: LibrarySymbolReference;
    Verbs: LibrarySymbolReference
  };
  IDesignerEventService: LibrarySymbolReference & {
    ActiveDesigner: LibrarySymbolReference;
    Designers: LibrarySymbolReference
  };
  IDesignerFilter: LibrarySymbolReference & {
    PostFilterAttributes: LibrarySymbolReference;
    PostFilterEvents: LibrarySymbolReference;
    PostFilterProperties: LibrarySymbolReference;
    PreFilterAttributes: LibrarySymbolReference;
    PreFilterEvents: LibrarySymbolReference;
    PreFilterProperties: LibrarySymbolReference
  };
  IDesignerHost: LibrarySymbolReference & {
    Activate: LibrarySymbolReference;
    CreateComponent: LibrarySymbolReference;
    CreateTransaction: LibrarySymbolReference;
    DestroyComponent: LibrarySymbolReference;
    GetDesigner: LibrarySymbolReference;
    GetType: LibrarySymbolReference;
    Container: LibrarySymbolReference;
    InTransaction: LibrarySymbolReference;
    Loading: LibrarySymbolReference;
    RootComponent: LibrarySymbolReference;
    RootComponentClassName: LibrarySymbolReference;
    TransactionDescription: LibrarySymbolReference
  };
  IDesignerHostTransactionState: LibrarySymbolReference & {
    IsClosingTransaction: LibrarySymbolReference
  };
  IDesignerOptionService: LibrarySymbolReference & {
    GetOptionValue: LibrarySymbolReference;
    SetOptionValue: LibrarySymbolReference
  };
  IDictionaryService: LibrarySymbolReference & {
    GetKey: LibrarySymbolReference;
    GetValue: LibrarySymbolReference;
    SetValue: LibrarySymbolReference
  };
  IEventBindingService: LibrarySymbolReference & {
    CreateUniqueMethodName: LibrarySymbolReference;
    GetCompatibleMethods: LibrarySymbolReference;
    GetEvent: LibrarySymbolReference;
    GetEventProperties: LibrarySymbolReference;
    GetEventProperty: LibrarySymbolReference;
    ShowCode: LibrarySymbolReference
  };
  IExtenderListService: LibrarySymbolReference & {
    GetExtenderProviders: LibrarySymbolReference
  };
  IExtenderProviderService: LibrarySymbolReference & {
    AddExtenderProvider: LibrarySymbolReference;
    RemoveExtenderProvider: LibrarySymbolReference
  };
  IHelpService: LibrarySymbolReference & {
    AddContextAttribute: LibrarySymbolReference;
    ClearContextAttributes: LibrarySymbolReference;
    CreateLocalContext: LibrarySymbolReference;
    RemoveContextAttribute: LibrarySymbolReference;
    RemoveLocalContext: LibrarySymbolReference;
    ShowHelpFromKeyword: LibrarySymbolReference;
    ShowHelpFromUrl: LibrarySymbolReference
  };
  IInheritanceService: LibrarySymbolReference & {
    AddInheritedComponents: LibrarySymbolReference;
    GetInheritanceAttribute: LibrarySymbolReference
  };
  IMenuCommandService: LibrarySymbolReference & {
    AddCommand: LibrarySymbolReference;
    AddVerb: LibrarySymbolReference;
    FindCommand: LibrarySymbolReference;
    GlobalInvoke: LibrarySymbolReference;
    RemoveCommand: LibrarySymbolReference;
    RemoveVerb: LibrarySymbolReference;
    ShowContextMenu: LibrarySymbolReference;
    Verbs: LibrarySymbolReference
  };
  IReferenceService: LibrarySymbolReference & {
    GetComponent: LibrarySymbolReference;
    GetName: LibrarySymbolReference;
    GetReference: LibrarySymbolReference;
    GetReferences: LibrarySymbolReference
  };
  IResourceService: LibrarySymbolReference & {
    GetResourceReader: LibrarySymbolReference;
    GetResourceWriter: LibrarySymbolReference
  };
  IRootDesigner: LibrarySymbolReference & {
    GetView: LibrarySymbolReference;
    SupportedTechnologies: LibrarySymbolReference
  };
  ISelectionService: LibrarySymbolReference & {
    GetComponentSelected: LibrarySymbolReference;
    GetSelectedComponents: LibrarySymbolReference;
    SetSelectedComponents: LibrarySymbolReference;
    PrimarySelection: LibrarySymbolReference;
    SelectionCount: LibrarySymbolReference
  };
  IServiceContainer: LibrarySymbolReference & {
    AddService: LibrarySymbolReference;
    RemoveService: LibrarySymbolReference
  };
  ITreeDesigner: LibrarySymbolReference & {
    Children: LibrarySymbolReference;
    Parent: LibrarySymbolReference
  };
  ITypeDescriptorFilterService: LibrarySymbolReference & {
    FilterAttributes: LibrarySymbolReference;
    FilterEvents: LibrarySymbolReference;
    FilterProperties: LibrarySymbolReference
  };
  ITypeDiscoveryService: LibrarySymbolReference & {
    GetTypes: LibrarySymbolReference
  };
  ITypeResolutionService: LibrarySymbolReference & {
    GetAssembly: LibrarySymbolReference;
    GetPathOfAssembly: LibrarySymbolReference;
    GetType: LibrarySymbolReference;
    ReferenceAssembly: LibrarySymbolReference
  };
  MenuCommand: LibrarySymbolReference & {
    MenuCommand: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    OnCommandChanged: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Checked: LibrarySymbolReference;
    CommandID: LibrarySymbolReference;
    Enabled: LibrarySymbolReference;
    OleStatus: LibrarySymbolReference;
    Properties: LibrarySymbolReference;
    Supported: LibrarySymbolReference;
    Visible: LibrarySymbolReference
  };
  SelectionTypes: LibrarySymbolReference & {
    Auto: LibrarySymbolReference;
    Normal: LibrarySymbolReference;
    Replace: LibrarySymbolReference;
    MouseDown: LibrarySymbolReference;
    MouseUp: LibrarySymbolReference;
    Click: LibrarySymbolReference;
    Primary: LibrarySymbolReference;
    Valid: LibrarySymbolReference;
    Toggle: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Remove: LibrarySymbolReference
  };
  ServiceContainer: LibrarySymbolReference & {
    ServiceContainer: LibrarySymbolReference;
    AddService: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    GetService: LibrarySymbolReference;
    RemoveService: LibrarySymbolReference;
    DefaultServices: LibrarySymbolReference
  };
  ServiceCreatorCallback: LibrarySymbolReference & {
    ServiceCreatorCallback: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  StandardCommands: LibrarySymbolReference & {
    AlignBottom: LibrarySymbolReference;
    AlignHorizontalCenters: LibrarySymbolReference;
    AlignLeft: LibrarySymbolReference;
    AlignRight: LibrarySymbolReference;
    AlignToGrid: LibrarySymbolReference;
    AlignTop: LibrarySymbolReference;
    AlignVerticalCenters: LibrarySymbolReference;
    ArrangeBottom: LibrarySymbolReference;
    ArrangeIcons: LibrarySymbolReference;
    ArrangeRight: LibrarySymbolReference;
    BringForward: LibrarySymbolReference;
    BringToFront: LibrarySymbolReference;
    CenterHorizontally: LibrarySymbolReference;
    CenterVertically: LibrarySymbolReference;
    Copy: LibrarySymbolReference;
    Cut: LibrarySymbolReference;
    Delete: LibrarySymbolReference;
    DocumentOutline: LibrarySymbolReference;
    F1Help: LibrarySymbolReference;
    Group: LibrarySymbolReference;
    HorizSpaceConcatenate: LibrarySymbolReference;
    HorizSpaceDecrease: LibrarySymbolReference;
    HorizSpaceIncrease: LibrarySymbolReference;
    HorizSpaceMakeEqual: LibrarySymbolReference;
    LineupIcons: LibrarySymbolReference;
    LockControls: LibrarySymbolReference;
    MultiLevelRedo: LibrarySymbolReference;
    MultiLevelUndo: LibrarySymbolReference;
    Paste: LibrarySymbolReference;
    Properties: LibrarySymbolReference;
    PropertiesWindow: LibrarySymbolReference;
    Redo: LibrarySymbolReference;
    Replace: LibrarySymbolReference;
    SelectAll: LibrarySymbolReference;
    SendBackward: LibrarySymbolReference;
    SendToBack: LibrarySymbolReference;
    ShowGrid: LibrarySymbolReference;
    ShowLargeIcons: LibrarySymbolReference;
    SizeToControl: LibrarySymbolReference;
    SizeToControlHeight: LibrarySymbolReference;
    SizeToControlWidth: LibrarySymbolReference;
    SizeToFit: LibrarySymbolReference;
    SizeToGrid: LibrarySymbolReference;
    SnapToGrid: LibrarySymbolReference;
    TabOrder: LibrarySymbolReference;
    Undo: LibrarySymbolReference;
    Ungroup: LibrarySymbolReference;
    VerbFirst: LibrarySymbolReference;
    VerbLast: LibrarySymbolReference;
    VertSpaceConcatenate: LibrarySymbolReference;
    VertSpaceDecrease: LibrarySymbolReference;
    VertSpaceIncrease: LibrarySymbolReference;
    VertSpaceMakeEqual: LibrarySymbolReference;
    ViewCode: LibrarySymbolReference;
    ViewGrid: LibrarySymbolReference;
    StandardCommands: LibrarySymbolReference
  };
  StandardToolWindows: LibrarySymbolReference & {
    ObjectBrowser: LibrarySymbolReference;
    OutputWindow: LibrarySymbolReference;
    ProjectExplorer: LibrarySymbolReference;
    PropertyBrowser: LibrarySymbolReference;
    RelatedLinks: LibrarySymbolReference;
    ServerExplorer: LibrarySymbolReference;
    TaskList: LibrarySymbolReference;
    Toolbox: LibrarySymbolReference;
    StandardToolWindows: LibrarySymbolReference
  };
  TypeDescriptionProviderService: LibrarySymbolReference & {
    TypeDescriptionProviderService: LibrarySymbolReference;
    GetProvider: LibrarySymbolReference
  };
  ViewTechnology: LibrarySymbolReference & {
    Passthrough: LibrarySymbolReference;
    WindowsForms: LibrarySymbolReference;
    Default: LibrarySymbolReference
  }
};
const Design: DesignLibrary = createLibrary("System.ComponentModel.Design", {
  ActiveDesignerEventArgs: {
    kind: "class",
    members: {
      ActiveDesignerEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      NewDesigner: {
        kind: "property",
        type: () => {
          return Design.IDesignerHost;
        },
        isNullable: true,
      },
      OldDesigner: {
        kind: "property",
        type: () => {
          return Design.IDesignerHost;
        },
        isNullable: true,
      },
    },
  },
  ActiveDesignerEventHandler: {
    kind: "generic",
    members: {
      ActiveDesignerEventHandler: {
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
  CheckoutException: {
    kind: "class",
    members: {
      Canceled: {
        kind: "field",
        type: () => {
          return Design.CheckoutException;
        },
        isStatic: true,
        isReadOnly: true,
      },
      CheckoutException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  CommandID: {
    kind: "class",
    members: {
      CommandID: {
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
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Guid: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
        isVirtual: true,
      },
      ID: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
    },
  },
  ComponentChangedEventArgs: {
    kind: "class",
    members: {
      ComponentChangedEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Component: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      Member: {
        kind: "property",
        type: () => {
          return ComponentModel.MemberDescriptor;
        },
      },
      NewValue: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      OldValue: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  ComponentChangedEventHandler: {
    kind: "generic",
    members: {
      ComponentChangedEventHandler: {
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
  ComponentChangingEventArgs: {
    kind: "class",
    members: {
      ComponentChangingEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Component: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      Member: {
        kind: "property",
        type: () => {
          return ComponentModel.MemberDescriptor;
        },
      },
    },
    isSealed: true,
  },
  ComponentChangingEventHandler: {
    kind: "generic",
    members: {
      ComponentChangingEventHandler: {
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
  ComponentEventArgs: {
    kind: "class",
    members: {
      ComponentEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Component: {
        kind: "property",
        type: () => {
          return ComponentModel.IComponent;
        },
        isVirtual: true,
      },
    },
  },
  ComponentEventHandler: {
    kind: "generic",
    members: {
      ComponentEventHandler: {
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
  ComponentRenameEventArgs: {
    kind: "class",
    members: {
      ComponentRenameEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Component: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      NewName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      OldName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
  },
  ComponentRenameEventHandler: {
    kind: "generic",
    members: {
      ComponentRenameEventHandler: {
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
  DesignerCollection: {
    kind: "class",
    members: {
      DesignerCollection: {
        kind: "method",
        methodKind: "constructor",
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
          return Design.IDesignerHost;
        },
        isVirtual: true,
      },
    },
  },
  DesignerEventArgs: {
    kind: "class",
    members: {
      DesignerEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Designer: {
        kind: "property",
        type: () => {
          return Design.IDesignerHost;
        },
      },
    },
  },
  DesignerEventHandler: {
    kind: "generic",
    members: {
      DesignerEventHandler: {
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
  DesignerOptionService: {
    kind: "class",
    members: {
      DesignerOptionCollection: {
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
          IndexOf: {
            kind: "method",
            methodKind: "ordinary",
          },
          ShowDialog: {
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
              return Design.DesignerOptionService.DesignerOptionCollection;
            },
          },
          Name: {
            kind: "property",
            type: () => {
              return System.String;
            },
          },
          Parent: {
            kind: "property",
            type: () => {
              return Design.DesignerOptionService.DesignerOptionCollection;
            },
            isNullable: true,
          },
          Properties: {
            kind: "property",
            type: () => {
              return ComponentModel.PropertyDescriptorCollection;
            },
          },
        },
        isSealed: true,
      },
    },
  },
  DesignerTransaction: {
    kind: "class",
    members: {
      DesignerTransaction: {
        kind: "method",
        methodKind: "constructor",
      },
      Cancel: {
        kind: "method",
        methodKind: "ordinary",
      },
      Commit: {
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
      OnCancel: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      OnCommit: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Canceled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Committed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Description: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isAbstract: true,
  },
  DesignerTransactionCloseEventArgs: {
    kind: "class",
    members: {
      DesignerTransactionCloseEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      LastTransaction: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      TransactionCommitted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  DesignerTransactionCloseEventHandler: {
    kind: "generic",
    members: {
      DesignerTransactionCloseEventHandler: {
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
  DesignerVerb: {
    kind: "class",
    members: {
      DesignerVerb: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Description: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Text: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  DesignerVerbCollection: {
    kind: "class",
    members: {
      DesignerVerbCollection: {
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
      Insert: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnValidate: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Remove: {
        kind: "method",
        methodKind: "ordinary",
      },
      Item: {
        kind: "property",
        type: () => {
          return Design.DesignerVerb;
        },
      },
    },
  },
  DesigntimeLicenseContext: {
    kind: "class",
    members: {
      DesigntimeLicenseContext: {
        kind: "method",
        methodKind: "constructor",
      },
      GetSavedLicenseKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      SetSavedLicenseKey: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      UsageMode: {
        kind: "property",
        type: () => {
          return ComponentModel.LicenseUsageMode;
        },
        isOverride: true,
      },
    },
  },
  DesigntimeLicenseContextSerializer: {
    kind: "class",
    members: {
      Serialize: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
  },
  HelpContextType: {
    kind: "enum",
    members: {
      Ambient: {
        kind: "field",
        type: () => {
          return Design.HelpContextType;
        },
      },
      Window: {
        kind: "field",
        type: () => {
          return Design.HelpContextType;
        },
      },
      Selection: {
        kind: "field",
        type: () => {
          return Design.HelpContextType;
        },
      },
      ToolWindowSelection: {
        kind: "field",
        type: () => {
          return Design.HelpContextType;
        },
      },
    },
  },
  HelpKeywordAttribute: {
    kind: "class",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Design.HelpKeywordAttribute;
        },
        isStatic: true,
        isReadOnly: true,
      },
      HelpKeywordAttribute: {
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
      HelpKeyword: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  HelpKeywordType: {
    kind: "enum",
    members: {
      F1Keyword: {
        kind: "field",
        type: () => {
          return Design.HelpKeywordType;
        },
      },
      GeneralKeyword: {
        kind: "field",
        type: () => {
          return Design.HelpKeywordType;
        },
      },
      FilterKeyword: {
        kind: "field",
        type: () => {
          return Design.HelpKeywordType;
        },
      },
    },
  },
  IComponentChangeService: {
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
    },
  },
  IComponentDiscoveryService: {
    kind: "interface",
    members: {
      GetComponentTypes: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IComponentInitializer: {
    kind: "interface",
    members: {
      InitializeExistingComponent: {
        kind: "method",
        methodKind: "ordinary",
      },
      InitializeNewComponent: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IDesigner: {
    kind: "interface",
    members: {
      DoDefaultAction: {
        kind: "method",
        methodKind: "ordinary",
      },
      Initialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      Component: {
        kind: "property",
        type: () => {
          return ComponentModel.IComponent;
        },
      },
      Verbs: {
        kind: "property",
        type: () => {
          return Design.DesignerVerbCollection;
        },
        isNullable: true,
      },
    },
  },
  IDesignerEventService: {
    kind: "interface",
    members: {
      ActiveDesigner: {
        kind: "property",
        type: () => {
          return Design.IDesignerHost;
        },
        isNullable: true,
      },
      Designers: {
        kind: "property",
        type: () => {
          return Design.DesignerCollection;
        },
      },
    },
  },
  IDesignerFilter: {
    kind: "interface",
    members: {
      PostFilterAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      PostFilterEvents: {
        kind: "method",
        methodKind: "ordinary",
      },
      PostFilterProperties: {
        kind: "method",
        methodKind: "ordinary",
      },
      PreFilterAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      PreFilterEvents: {
        kind: "method",
        methodKind: "ordinary",
      },
      PreFilterProperties: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IDesignerHost: {
    kind: "interface",
    members: {
      Activate: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateComponent: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateTransaction: {
        kind: "method",
        methodKind: "ordinary",
      },
      DestroyComponent: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDesigner: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetType: {
        kind: "method",
        methodKind: "ordinary",
      },
      Container: {
        kind: "property",
        type: () => {
          return ComponentModel.IContainer;
        },
      },
      InTransaction: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Loading: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      RootComponent: {
        kind: "property",
        type: () => {
          return ComponentModel.IComponent;
        },
      },
      RootComponentClassName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      TransactionDescription: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  IDesignerHostTransactionState: {
    kind: "interface",
    members: {
      IsClosingTransaction: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  IDesignerOptionService: {
    kind: "interface",
    members: {
      GetOptionValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetOptionValue: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IDictionaryService: {
    kind: "interface",
    members: {
      GetKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IEventBindingService: {
    kind: "interface",
    members: {
      CreateUniqueMethodName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCompatibleMethods: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEvent: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEventProperties: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEventProperty: {
        kind: "method",
        methodKind: "ordinary",
      },
      ShowCode: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IExtenderListService: {
    kind: "interface",
    members: {
      GetExtenderProviders: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IExtenderProviderService: {
    kind: "interface",
    members: {
      AddExtenderProvider: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveExtenderProvider: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IHelpService: {
    kind: "interface",
    members: {
      AddContextAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      ClearContextAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateLocalContext: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveContextAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveLocalContext: {
        kind: "method",
        methodKind: "ordinary",
      },
      ShowHelpFromKeyword: {
        kind: "method",
        methodKind: "ordinary",
      },
      ShowHelpFromUrl: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IInheritanceService: {
    kind: "interface",
    members: {
      AddInheritedComponents: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInheritanceAttribute: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IMenuCommandService: {
    kind: "interface",
    members: {
      AddCommand: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddVerb: {
        kind: "method",
        methodKind: "ordinary",
      },
      FindCommand: {
        kind: "method",
        methodKind: "ordinary",
      },
      GlobalInvoke: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveCommand: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveVerb: {
        kind: "method",
        methodKind: "ordinary",
      },
      ShowContextMenu: {
        kind: "method",
        methodKind: "ordinary",
      },
      Verbs: {
        kind: "property",
        type: () => {
          return Design.DesignerVerbCollection;
        },
      },
    },
  },
  IReferenceService: {
    kind: "interface",
    members: {
      GetComponent: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetReference: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetReferences: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IResourceService: {
    kind: "interface",
    members: {
      GetResourceReader: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetResourceWriter: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IRootDesigner: {
    kind: "interface",
    members: {
      GetView: {
        kind: "method",
        methodKind: "ordinary",
      },
      SupportedTechnologies: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  ISelectionService: {
    kind: "interface",
    members: {
      GetComponentSelected: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSelectedComponents: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetSelectedComponents: {
        kind: "method",
        methodKind: "ordinary",
      },
      PrimarySelection: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      SelectionCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  IServiceContainer: {
    kind: "interface",
    members: {
      AddService: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveService: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ITreeDesigner: {
    kind: "interface",
    members: {
      Children: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
      },
      Parent: {
        kind: "property",
        type: () => {
          return Design.IDesigner;
        },
        isNullable: true,
      },
    },
  },
  ITypeDescriptorFilterService: {
    kind: "interface",
    members: {
      FilterAttributes: {
        kind: "method",
        methodKind: "ordinary",
      },
      FilterEvents: {
        kind: "method",
        methodKind: "ordinary",
      },
      FilterProperties: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ITypeDiscoveryService: {
    kind: "interface",
    members: {
      GetTypes: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ITypeResolutionService: {
    kind: "interface",
    members: {
      GetAssembly: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPathOfAssembly: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetType: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReferenceAssembly: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  MenuCommand: {
    kind: "class",
    members: {
      MenuCommand: {
        kind: "method",
        methodKind: "constructor",
      },
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OnCommandChanged: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Checked: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      CommandID: {
        kind: "property",
        type: () => {
          return Design.CommandID;
        },
        isVirtual: true,
      },
      Enabled: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      OleStatus: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      Properties: {
        kind: "property",
        type: () => {
          return Collections.IDictionary;
        },
        isVirtual: true,
      },
      Supported: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Visible: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
    },
  },
  SelectionTypes: {
    kind: "enum",
    members: {
      Auto: {
        kind: "field",
        type: () => {
          return Design.SelectionTypes;
        },
      },
      Normal: {
        kind: "field",
        type: () => {
          return Design.SelectionTypes;
        },
      },
      Replace: {
        kind: "field",
        type: () => {
          return Design.SelectionTypes;
        },
      },
      MouseDown: {
        kind: "field",
        type: () => {
          return Design.SelectionTypes;
        },
      },
      MouseUp: {
        kind: "field",
        type: () => {
          return Design.SelectionTypes;
        },
      },
      Click: {
        kind: "field",
        type: () => {
          return Design.SelectionTypes;
        },
      },
      Primary: {
        kind: "field",
        type: () => {
          return Design.SelectionTypes;
        },
      },
      Valid: {
        kind: "field",
        type: () => {
          return Design.SelectionTypes;
        },
      },
      Toggle: {
        kind: "field",
        type: () => {
          return Design.SelectionTypes;
        },
      },
      Add: {
        kind: "field",
        type: () => {
          return Design.SelectionTypes;
        },
      },
      Remove: {
        kind: "field",
        type: () => {
          return Design.SelectionTypes;
        },
      },
    },
  },
  ServiceContainer: {
    kind: "class",
    members: {
      ServiceContainer: {
        kind: "method",
        methodKind: "constructor",
      },
      AddService: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetService: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      RemoveService: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefaultServices: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
    },
  },
  ServiceCreatorCallback: {
    kind: "generic",
    members: {
      ServiceCreatorCallback: {
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
  StandardCommands: {
    kind: "class",
    members: {
      AlignBottom: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      AlignHorizontalCenters: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      AlignLeft: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      AlignRight: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      AlignToGrid: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      AlignTop: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      AlignVerticalCenters: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ArrangeBottom: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ArrangeIcons: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ArrangeRight: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      BringForward: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      BringToFront: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      CenterHorizontally: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      CenterVertically: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Copy: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Cut: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Delete: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DocumentOutline: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      F1Help: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Group: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      HorizSpaceConcatenate: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      HorizSpaceDecrease: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      HorizSpaceIncrease: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      HorizSpaceMakeEqual: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      LineupIcons: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      LockControls: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MultiLevelRedo: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MultiLevelUndo: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Paste: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Properties: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      PropertiesWindow: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Redo: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Replace: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SelectAll: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SendBackward: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SendToBack: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ShowGrid: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ShowLargeIcons: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SizeToControl: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SizeToControlHeight: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SizeToControlWidth: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SizeToFit: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SizeToGrid: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SnapToGrid: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      TabOrder: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Undo: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Ungroup: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      VerbFirst: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      VerbLast: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      VertSpaceConcatenate: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      VertSpaceDecrease: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      VertSpaceIncrease: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      VertSpaceMakeEqual: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ViewCode: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ViewGrid: {
        kind: "field",
        type: () => {
          return Design.CommandID;
        },
        isStatic: true,
        isReadOnly: true,
      },
      StandardCommands: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  StandardToolWindows: {
    kind: "class",
    members: {
      ObjectBrowser: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      OutputWindow: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ProjectExplorer: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      PropertyBrowser: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      RelatedLinks: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ServerExplorer: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      TaskList: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Toolbox: {
        kind: "field",
        type: () => {
          return System.Guid;
        },
        isStatic: true,
        isReadOnly: true,
      },
      StandardToolWindows: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  TypeDescriptionProviderService: {
    kind: "class",
    members: {
      TypeDescriptionProviderService: {
        kind: "method",
        methodKind: "constructor",
      },
      GetProvider: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  ViewTechnology: {
    kind: "enum",
    members: {
      Passthrough: {
        kind: "field",
        type: () => {
          return Design.ViewTechnology;
        },
      },
      WindowsForms: {
        kind: "field",
        type: () => {
          return Design.ViewTechnology;
        },
      },
      Default: {
        kind: "field",
        type: () => {
          return Design.ViewTechnology;
        },
      },
    },
  },
});
export default Design
