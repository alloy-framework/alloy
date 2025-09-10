import Collections from "../../../Collections/index.js";
import ComponentModel from "../../index.js";
import System from "../../../index.js";
import Reflection from "../../../Reflection/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type SerializationLibrary = LibrarySymbolReference & {
  ComponentSerializationService: LibrarySymbolReference & {
    ComponentSerializationService: LibrarySymbolReference;
    CreateStore: LibrarySymbolReference;
    Deserialize: LibrarySymbolReference;
    DeserializeTo: LibrarySymbolReference;
    LoadStore: LibrarySymbolReference;
    Serialize: LibrarySymbolReference;
    SerializeAbsolute: LibrarySymbolReference;
    SerializeMember: LibrarySymbolReference;
    SerializeMemberAbsolute: LibrarySymbolReference
  };
  ContextStack: LibrarySymbolReference & {
    ContextStack: LibrarySymbolReference;
    Append: LibrarySymbolReference;
    Pop: LibrarySymbolReference;
    Push: LibrarySymbolReference;
    Current: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  DefaultSerializationProviderAttribute: LibrarySymbolReference & {
    DefaultSerializationProviderAttribute: LibrarySymbolReference;
    ProviderTypeName: LibrarySymbolReference
  };
  DesignerLoader: LibrarySymbolReference & {
    DesignerLoader: LibrarySymbolReference;
    BeginLoad: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    Loading: LibrarySymbolReference
  };
  DesignerSerializerAttribute: LibrarySymbolReference & {
    DesignerSerializerAttribute: LibrarySymbolReference;
    SerializerBaseTypeName: LibrarySymbolReference;
    SerializerTypeName: LibrarySymbolReference;
    TypeId: LibrarySymbolReference
  };
  IDesignerLoaderHost: LibrarySymbolReference & {
    EndLoad: LibrarySymbolReference;
    Reload: LibrarySymbolReference
  };
  IDesignerLoaderHost2: LibrarySymbolReference & {
    CanReloadWithErrors: LibrarySymbolReference;
    IgnoreErrorsDuringReload: LibrarySymbolReference
  };
  IDesignerLoaderService: LibrarySymbolReference & {
    AddLoadDependency: LibrarySymbolReference;
    DependentLoadComplete: LibrarySymbolReference;
    Reload: LibrarySymbolReference
  };
  IDesignerSerializationManager: LibrarySymbolReference & {
    AddSerializationProvider: LibrarySymbolReference;
    CreateInstance: LibrarySymbolReference;
    GetInstance: LibrarySymbolReference;
    GetName: LibrarySymbolReference;
    GetSerializer: LibrarySymbolReference;
    GetType: LibrarySymbolReference;
    RemoveSerializationProvider: LibrarySymbolReference;
    ReportError: LibrarySymbolReference;
    SetName: LibrarySymbolReference;
    Context: LibrarySymbolReference;
    Properties: LibrarySymbolReference
  };
  IDesignerSerializationProvider: LibrarySymbolReference & {
    GetSerializer: LibrarySymbolReference
  };
  IDesignerSerializationService: LibrarySymbolReference & {
    Deserialize: LibrarySymbolReference;
    Serialize: LibrarySymbolReference
  };
  INameCreationService: LibrarySymbolReference & {
    CreateName: LibrarySymbolReference;
    IsValidName: LibrarySymbolReference;
    ValidateName: LibrarySymbolReference
  };
  InstanceDescriptor: LibrarySymbolReference & {
    InstanceDescriptor: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    Arguments: LibrarySymbolReference;
    IsComplete: LibrarySymbolReference;
    MemberInfo: LibrarySymbolReference
  };
  MemberRelationship: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    MemberRelationship: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference;
    Member: LibrarySymbolReference;
    Owner: LibrarySymbolReference
  };
  MemberRelationshipService: LibrarySymbolReference & {
    MemberRelationshipService: LibrarySymbolReference;
    GetRelationship: LibrarySymbolReference;
    SetRelationship: LibrarySymbolReference;
    SupportsRelationship: LibrarySymbolReference;
    Item: LibrarySymbolReference
  };
  ResolveNameEventArgs: LibrarySymbolReference & {
    ResolveNameEventArgs: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  ResolveNameEventHandler: LibrarySymbolReference & {
    ResolveNameEventHandler: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  RootDesignerSerializerAttribute: LibrarySymbolReference & {
    RootDesignerSerializerAttribute: LibrarySymbolReference;
    Reloadable: LibrarySymbolReference;
    SerializerBaseTypeName: LibrarySymbolReference;
    SerializerTypeName: LibrarySymbolReference;
    TypeId: LibrarySymbolReference
  };
  SerializationStore: LibrarySymbolReference & {
    SerializationStore: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Save: LibrarySymbolReference;
    Errors: LibrarySymbolReference
  }
};
const Serialization: SerializationLibrary = createLibrary("System.ComponentModel.Design.Serialization", {
  ComponentSerializationService: {
    kind: "class",
    members: {
      ComponentSerializationService: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateStore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Deserialize: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      DeserializeTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      LoadStore: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Serialize: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SerializeAbsolute: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SerializeMember: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      SerializeMemberAbsolute: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  ContextStack: {
    kind: "class",
    members: {
      ContextStack: {
        kind: "method",
        methodKind: "constructor",
      },
      Append: {
        kind: "method",
        methodKind: "ordinary",
      },
      Pop: {
        kind: "method",
        methodKind: "ordinary",
      },
      Push: {
        kind: "method",
        methodKind: "ordinary",
      },
      Current: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
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
  DefaultSerializationProviderAttribute: {
    kind: "class",
    members: {
      DefaultSerializationProviderAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ProviderTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  DesignerLoader: {
    kind: "class",
    members: {
      DesignerLoader: {
        kind: "method",
        methodKind: "constructor",
      },
      BeginLoad: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Loading: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  DesignerSerializerAttribute: {
    kind: "class",
    members: {
      DesignerSerializerAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      SerializerBaseTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SerializerTypeName: {
        kind: "property",
        type: () => {
          return System.String;
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
  IDesignerLoaderHost: {
    kind: "interface",
    members: {
      EndLoad: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reload: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IDesignerLoaderHost2: {
    kind: "interface",
    members: {
      CanReloadWithErrors: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IgnoreErrorsDuringReload: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  IDesignerLoaderService: {
    kind: "interface",
    members: {
      AddLoadDependency: {
        kind: "method",
        methodKind: "ordinary",
      },
      DependentLoadComplete: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reload: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IDesignerSerializationManager: {
    kind: "interface",
    members: {
      AddSerializationProvider: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInstance: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSerializer: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetType: {
        kind: "method",
        methodKind: "ordinary",
      },
      RemoveSerializationProvider: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReportError: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetName: {
        kind: "method",
        methodKind: "ordinary",
      },
      Context: {
        kind: "property",
        type: () => {
          return Serialization.ContextStack;
        },
      },
      Properties: {
        kind: "property",
        type: () => {
          return ComponentModel.PropertyDescriptorCollection;
        },
      },
    },
  },
  IDesignerSerializationProvider: {
    kind: "interface",
    members: {
      GetSerializer: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IDesignerSerializationService: {
    kind: "interface",
    members: {
      Deserialize: {
        kind: "method",
        methodKind: "ordinary",
      },
      Serialize: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  INameCreationService: {
    kind: "interface",
    members: {
      CreateName: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsValidName: {
        kind: "method",
        methodKind: "ordinary",
      },
      ValidateName: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  InstanceDescriptor: {
    kind: "class",
    members: {
      InstanceDescriptor: {
        kind: "method",
        methodKind: "constructor",
      },
      Invoke: {
        kind: "method",
        methodKind: "ordinary",
      },
      Arguments: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
      },
      IsComplete: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MemberInfo: {
        kind: "property",
        type: () => {
          return Reflection.MemberInfo;
        },
      },
    },
    isSealed: true,
  },
  MemberRelationship: {
    kind: "struct",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return Serialization.MemberRelationship;
        },
        isStatic: true,
        isReadOnly: true,
      },
      MemberRelationship: {
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
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Member: {
        kind: "property",
        type: () => {
          return ComponentModel.MemberDescriptor;
        },
      },
      Owner: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  MemberRelationshipService: {
    kind: "class",
    members: {
      MemberRelationshipService: {
        kind: "method",
        methodKind: "constructor",
      },
      GetRelationship: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SetRelationship: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      SupportsRelationship: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Item: {
        kind: "property",
        type: () => {
          return Serialization.MemberRelationship;
        },
      },
    },
    isAbstract: true,
  },
  ResolveNameEventArgs: {
    kind: "class",
    members: {
      ResolveNameEventArgs: {
        kind: "method",
        methodKind: "constructor",
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
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
  ResolveNameEventHandler: {
    kind: "generic",
    members: {
      ResolveNameEventHandler: {
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
  RootDesignerSerializerAttribute: {
    kind: "class",
    members: {
      RootDesignerSerializerAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Reloadable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      SerializerBaseTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SerializerTypeName: {
        kind: "property",
        type: () => {
          return System.String;
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
  SerializationStore: {
    kind: "class",
    members: {
      SerializationStore: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Save: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Errors: {
        kind: "property",
        type: () => {
          return Collections.ICollection;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
});
export default Serialization
