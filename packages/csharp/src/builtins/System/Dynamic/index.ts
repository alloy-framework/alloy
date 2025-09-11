import ObjectModel from "../Collections/ObjectModel/index.js";
import System from "../index.js";
import Expressions from "../Linq/Expressions/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type DynamicLibrary = LibrarySymbolReference & {
  BinaryOperationBinder: LibrarySymbolReference & {
    BinaryOperationBinder: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    FallbackBinaryOperation: LibrarySymbolReference;
    Operation: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  };
  BindingRestrictions: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    Combine: LibrarySymbolReference;
    GetExpressionRestriction: LibrarySymbolReference;
    GetInstanceRestriction: LibrarySymbolReference;
    GetTypeRestriction: LibrarySymbolReference;
    Merge: LibrarySymbolReference;
    ToExpression: LibrarySymbolReference
  };
  CallInfo: LibrarySymbolReference & {
    CallInfo: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ArgumentCount: LibrarySymbolReference;
    ArgumentNames: LibrarySymbolReference
  };
  ConvertBinder: LibrarySymbolReference & {
    ConvertBinder: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    FallbackConvert: LibrarySymbolReference;
    Explicit: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  CreateInstanceBinder: LibrarySymbolReference & {
    CreateInstanceBinder: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    FallbackCreateInstance: LibrarySymbolReference;
    CallInfo: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  };
  DeleteIndexBinder: LibrarySymbolReference & {
    DeleteIndexBinder: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    FallbackDeleteIndex: LibrarySymbolReference;
    CallInfo: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  };
  DeleteMemberBinder: LibrarySymbolReference & {
    DeleteMemberBinder: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    FallbackDeleteMember: LibrarySymbolReference;
    IgnoreCase: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  };
  DynamicMetaObject: LibrarySymbolReference & {
    EmptyMetaObjects: LibrarySymbolReference;
    DynamicMetaObject: LibrarySymbolReference;
    BindBinaryOperation: LibrarySymbolReference;
    BindConvert: LibrarySymbolReference;
    BindCreateInstance: LibrarySymbolReference;
    BindDeleteIndex: LibrarySymbolReference;
    BindDeleteMember: LibrarySymbolReference;
    BindGetIndex: LibrarySymbolReference;
    BindGetMember: LibrarySymbolReference;
    BindInvoke: LibrarySymbolReference;
    BindInvokeMember: LibrarySymbolReference;
    BindSetIndex: LibrarySymbolReference;
    BindSetMember: LibrarySymbolReference;
    BindUnaryOperation: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    GetDynamicMemberNames: LibrarySymbolReference;
    Expression: LibrarySymbolReference;
    HasValue: LibrarySymbolReference;
    LimitType: LibrarySymbolReference;
    Restrictions: LibrarySymbolReference;
    RuntimeType: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  DynamicMetaObjectBinder: LibrarySymbolReference & {
    DynamicMetaObjectBinder: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    Defer: LibrarySymbolReference;
    GetUpdateExpression: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  };
  DynamicObject: LibrarySymbolReference & {
    DynamicObject: LibrarySymbolReference;
    GetDynamicMemberNames: LibrarySymbolReference;
    GetMetaObject: LibrarySymbolReference;
    TryBinaryOperation: LibrarySymbolReference;
    TryConvert: LibrarySymbolReference;
    TryCreateInstance: LibrarySymbolReference;
    TryDeleteIndex: LibrarySymbolReference;
    TryDeleteMember: LibrarySymbolReference;
    TryGetIndex: LibrarySymbolReference;
    TryGetMember: LibrarySymbolReference;
    TryInvoke: LibrarySymbolReference;
    TryInvokeMember: LibrarySymbolReference;
    TrySetIndex: LibrarySymbolReference;
    TrySetMember: LibrarySymbolReference;
    TryUnaryOperation: LibrarySymbolReference
  };
  ExpandoObject: LibrarySymbolReference & {
    ExpandoObject: LibrarySymbolReference
  };
  GetIndexBinder: LibrarySymbolReference & {
    GetIndexBinder: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    FallbackGetIndex: LibrarySymbolReference;
    CallInfo: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  };
  GetMemberBinder: LibrarySymbolReference & {
    GetMemberBinder: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    FallbackGetMember: LibrarySymbolReference;
    IgnoreCase: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  };
  IDynamicMetaObjectProvider: LibrarySymbolReference & {
    GetMetaObject: LibrarySymbolReference
  };
  IInvokeOnGetBinder: LibrarySymbolReference & {
    InvokeOnGet: LibrarySymbolReference
  };
  InvokeBinder: LibrarySymbolReference & {
    InvokeBinder: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    FallbackInvoke: LibrarySymbolReference;
    CallInfo: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  };
  InvokeMemberBinder: LibrarySymbolReference & {
    InvokeMemberBinder: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    FallbackInvoke: LibrarySymbolReference;
    FallbackInvokeMember: LibrarySymbolReference;
    CallInfo: LibrarySymbolReference;
    IgnoreCase: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  };
  SetIndexBinder: LibrarySymbolReference & {
    SetIndexBinder: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    FallbackSetIndex: LibrarySymbolReference;
    CallInfo: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  };
  SetMemberBinder: LibrarySymbolReference & {
    SetMemberBinder: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    FallbackSetMember: LibrarySymbolReference;
    IgnoreCase: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  };
  UnaryOperationBinder: LibrarySymbolReference & {
    UnaryOperationBinder: LibrarySymbolReference;
    Bind: LibrarySymbolReference;
    FallbackUnaryOperation: LibrarySymbolReference;
    Operation: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference
  }
};
const Dynamic: DynamicLibrary = createLibrary("System.Dynamic", {
  BinaryOperationBinder: {
    kind: "class",
    members: {
      BinaryOperationBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      FallbackBinaryOperation: {
        kind: "method",
        methodKind: "ordinary",
      },
      Operation: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  BindingRestrictions: {
    kind: "class",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return Dynamic.BindingRestrictions;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Combine: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetExpressionRestriction: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetInstanceRestriction: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTypeRestriction: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Merge: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToExpression: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isAbstract: true,
  },
  CallInfo: {
    kind: "class",
    members: {
      CallInfo: {
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
      ArgumentCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ArgumentNames: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
    },
    isSealed: true,
  },
  ConvertBinder: {
    kind: "class",
    members: {
      ConvertBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      FallbackConvert: {
        kind: "method",
        methodKind: "ordinary",
      },
      Explicit: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isAbstract: true,
  },
  CreateInstanceBinder: {
    kind: "class",
    members: {
      CreateInstanceBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      FallbackCreateInstance: {
        kind: "method",
        methodKind: "ordinary",
      },
      CallInfo: {
        kind: "property",
        type: () => {
          return Dynamic.CallInfo;
        },
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  DeleteIndexBinder: {
    kind: "class",
    members: {
      DeleteIndexBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      FallbackDeleteIndex: {
        kind: "method",
        methodKind: "ordinary",
      },
      CallInfo: {
        kind: "property",
        type: () => {
          return Dynamic.CallInfo;
        },
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  DeleteMemberBinder: {
    kind: "class",
    members: {
      DeleteMemberBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      FallbackDeleteMember: {
        kind: "method",
        methodKind: "ordinary",
      },
      IgnoreCase: {
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
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  DynamicMetaObject: {
    kind: "class",
    members: {
      EmptyMetaObjects: {
        kind: "field",
        type: () => {
          return System.Array;
        },
        isStatic: true,
        isReadOnly: true,
      },
      DynamicMetaObject: {
        kind: "method",
        methodKind: "constructor",
      },
      BindBinaryOperation: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BindConvert: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BindCreateInstance: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BindDeleteIndex: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BindDeleteMember: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BindGetIndex: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BindGetMember: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BindInvoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BindInvokeMember: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BindSetIndex: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BindSetMember: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BindUnaryOperation: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDynamicMemberNames: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Expression: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      HasValue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LimitType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      Restrictions: {
        kind: "property",
        type: () => {
          return Dynamic.BindingRestrictions;
        },
      },
      RuntimeType: {
        kind: "property",
        type: () => {
          return System.Type;
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
  DynamicMetaObjectBinder: {
    kind: "class",
    members: {
      DynamicMetaObjectBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Defer: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUpdateExpression: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  DynamicObject: {
    kind: "class",
    members: {
      DynamicObject: {
        kind: "method",
        methodKind: "constructor",
      },
      GetDynamicMemberNames: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetMetaObject: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryBinaryOperation: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryConvert: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryCreateInstance: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryDeleteIndex: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryDeleteMember: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryGetIndex: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryGetMember: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryInvoke: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryInvokeMember: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TrySetIndex: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TrySetMember: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryUnaryOperation: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
  },
  ExpandoObject: {
    kind: "class",
    members: {
      ExpandoObject: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  GetIndexBinder: {
    kind: "class",
    members: {
      GetIndexBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      FallbackGetIndex: {
        kind: "method",
        methodKind: "ordinary",
      },
      CallInfo: {
        kind: "property",
        type: () => {
          return Dynamic.CallInfo;
        },
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  GetMemberBinder: {
    kind: "class",
    members: {
      GetMemberBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      FallbackGetMember: {
        kind: "method",
        methodKind: "ordinary",
      },
      IgnoreCase: {
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
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  IDynamicMetaObjectProvider: {
    kind: "interface",
    members: {
      GetMetaObject: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IInvokeOnGetBinder: {
    kind: "interface",
    members: {
      InvokeOnGet: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  InvokeBinder: {
    kind: "class",
    members: {
      InvokeBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      FallbackInvoke: {
        kind: "method",
        methodKind: "ordinary",
      },
      CallInfo: {
        kind: "property",
        type: () => {
          return Dynamic.CallInfo;
        },
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  InvokeMemberBinder: {
    kind: "class",
    members: {
      InvokeMemberBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      FallbackInvoke: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      FallbackInvokeMember: {
        kind: "method",
        methodKind: "ordinary",
      },
      CallInfo: {
        kind: "property",
        type: () => {
          return Dynamic.CallInfo;
        },
      },
      IgnoreCase: {
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
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  SetIndexBinder: {
    kind: "class",
    members: {
      SetIndexBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      FallbackSetIndex: {
        kind: "method",
        methodKind: "ordinary",
      },
      CallInfo: {
        kind: "property",
        type: () => {
          return Dynamic.CallInfo;
        },
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  SetMemberBinder: {
    kind: "class",
    members: {
      SetMemberBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      FallbackSetMember: {
        kind: "method",
        methodKind: "ordinary",
      },
      IgnoreCase: {
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
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
  UnaryOperationBinder: {
    kind: "class",
    members: {
      UnaryOperationBinder: {
        kind: "method",
        methodKind: "constructor",
      },
      Bind: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isSealed: true,
      },
      FallbackUnaryOperation: {
        kind: "method",
        methodKind: "ordinary",
      },
      Operation: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isAbstract: true,
  },
});
export default Dynamic
