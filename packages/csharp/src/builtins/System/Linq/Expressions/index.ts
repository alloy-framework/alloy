import ObjectModel from "../../Collections/ObjectModel/index.js";
import System from "../../index.js";
import Reflection from "../../Reflection/index.js";
import CompilerServices from "../../Runtime/CompilerServices/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ExpressionsLibrary = LibrarySymbolReference & {
  BinaryExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Reduce: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    CanReduce: LibrarySymbolReference;
    Conversion: LibrarySymbolReference;
    IsLifted: LibrarySymbolReference;
    IsLiftedToNull: LibrarySymbolReference;
    Left: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    Right: LibrarySymbolReference
  };
  BlockExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Expressions: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Result: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    Variables: LibrarySymbolReference
  };
  CatchBlock: LibrarySymbolReference & {
    ToString: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Body: LibrarySymbolReference;
    Filter: LibrarySymbolReference;
    Test: LibrarySymbolReference;
    Variable: LibrarySymbolReference
  };
  ConditionalExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    IfFalse: LibrarySymbolReference;
    IfTrue: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Test: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  ConstantExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  DebugInfoExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Document: LibrarySymbolReference;
    EndColumn: LibrarySymbolReference;
    EndLine: LibrarySymbolReference;
    IsClear: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    StartColumn: LibrarySymbolReference;
    StartLine: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  DefaultExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  DynamicExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Dynamic: LibrarySymbolReference;
    MakeDynamic: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Arguments: LibrarySymbolReference;
    Binder: LibrarySymbolReference;
    DelegateType: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  DynamicExpressionVisitor: LibrarySymbolReference & {
    DynamicExpressionVisitor: LibrarySymbolReference;
    VisitDynamic: LibrarySymbolReference
  };
  ElementInit: LibrarySymbolReference & {
    ToString: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    AddMethod: LibrarySymbolReference;
    Arguments: LibrarySymbolReference
  };
  Expression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Compile: LibrarySymbolReference;
    Update: LibrarySymbolReference
  };
  ExpressionType: LibrarySymbolReference & {
    Add: LibrarySymbolReference;
    AddChecked: LibrarySymbolReference;
    And: LibrarySymbolReference;
    AndAlso: LibrarySymbolReference;
    ArrayLength: LibrarySymbolReference;
    ArrayIndex: LibrarySymbolReference;
    Call: LibrarySymbolReference;
    Coalesce: LibrarySymbolReference;
    Conditional: LibrarySymbolReference;
    Constant: LibrarySymbolReference;
    Convert: LibrarySymbolReference;
    ConvertChecked: LibrarySymbolReference;
    Divide: LibrarySymbolReference;
    Equal: LibrarySymbolReference;
    ExclusiveOr: LibrarySymbolReference;
    GreaterThan: LibrarySymbolReference;
    GreaterThanOrEqual: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    Lambda: LibrarySymbolReference;
    LeftShift: LibrarySymbolReference;
    LessThan: LibrarySymbolReference;
    LessThanOrEqual: LibrarySymbolReference;
    ListInit: LibrarySymbolReference;
    MemberAccess: LibrarySymbolReference;
    MemberInit: LibrarySymbolReference;
    Modulo: LibrarySymbolReference;
    Multiply: LibrarySymbolReference;
    MultiplyChecked: LibrarySymbolReference;
    Negate: LibrarySymbolReference;
    UnaryPlus: LibrarySymbolReference;
    NegateChecked: LibrarySymbolReference;
    New: LibrarySymbolReference;
    NewArrayInit: LibrarySymbolReference;
    NewArrayBounds: LibrarySymbolReference;
    Not: LibrarySymbolReference;
    NotEqual: LibrarySymbolReference;
    Or: LibrarySymbolReference;
    OrElse: LibrarySymbolReference;
    Parameter: LibrarySymbolReference;
    Power: LibrarySymbolReference;
    Quote: LibrarySymbolReference;
    RightShift: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    SubtractChecked: LibrarySymbolReference;
    TypeAs: LibrarySymbolReference;
    TypeIs: LibrarySymbolReference;
    Assign: LibrarySymbolReference;
    Block: LibrarySymbolReference;
    DebugInfo: LibrarySymbolReference;
    Decrement: LibrarySymbolReference;
    Dynamic: LibrarySymbolReference;
    Default: LibrarySymbolReference;
    Extension: LibrarySymbolReference;
    Goto: LibrarySymbolReference;
    Increment: LibrarySymbolReference;
    Index: LibrarySymbolReference;
    Label: LibrarySymbolReference;
    RuntimeVariables: LibrarySymbolReference;
    Loop: LibrarySymbolReference;
    Switch: LibrarySymbolReference;
    Throw: LibrarySymbolReference;
    Try: LibrarySymbolReference;
    Unbox: LibrarySymbolReference;
    AddAssign: LibrarySymbolReference;
    AndAssign: LibrarySymbolReference;
    DivideAssign: LibrarySymbolReference;
    ExclusiveOrAssign: LibrarySymbolReference;
    LeftShiftAssign: LibrarySymbolReference;
    ModuloAssign: LibrarySymbolReference;
    MultiplyAssign: LibrarySymbolReference;
    OrAssign: LibrarySymbolReference;
    PowerAssign: LibrarySymbolReference;
    RightShiftAssign: LibrarySymbolReference;
    SubtractAssign: LibrarySymbolReference;
    AddAssignChecked: LibrarySymbolReference;
    MultiplyAssignChecked: LibrarySymbolReference;
    SubtractAssignChecked: LibrarySymbolReference;
    PreIncrementAssign: LibrarySymbolReference;
    PreDecrementAssign: LibrarySymbolReference;
    PostIncrementAssign: LibrarySymbolReference;
    PostDecrementAssign: LibrarySymbolReference;
    TypeEqual: LibrarySymbolReference;
    OnesComplement: LibrarySymbolReference;
    IsTrue: LibrarySymbolReference;
    IsFalse: LibrarySymbolReference
  };
  ExpressionVisitor: LibrarySymbolReference & {
    ExpressionVisitor: LibrarySymbolReference;
    Visit: LibrarySymbolReference;
    VisitBinary: LibrarySymbolReference;
    VisitBlock: LibrarySymbolReference;
    VisitCatchBlock: LibrarySymbolReference;
    VisitConditional: LibrarySymbolReference;
    VisitConstant: LibrarySymbolReference;
    VisitDebugInfo: LibrarySymbolReference;
    VisitDefault: LibrarySymbolReference;
    VisitDynamic: LibrarySymbolReference;
    VisitElementInit: LibrarySymbolReference;
    VisitExtension: LibrarySymbolReference;
    VisitGoto: LibrarySymbolReference;
    VisitIndex: LibrarySymbolReference;
    VisitInvocation: LibrarySymbolReference;
    VisitLabel: LibrarySymbolReference;
    VisitLabelTarget: LibrarySymbolReference;
    VisitListInit: LibrarySymbolReference;
    VisitLoop: LibrarySymbolReference;
    VisitMember: LibrarySymbolReference;
    VisitMemberAssignment: LibrarySymbolReference;
    VisitMemberBinding: LibrarySymbolReference;
    VisitMemberInit: LibrarySymbolReference;
    VisitMemberListBinding: LibrarySymbolReference;
    VisitMemberMemberBinding: LibrarySymbolReference;
    VisitMethodCall: LibrarySymbolReference;
    VisitNew: LibrarySymbolReference;
    VisitNewArray: LibrarySymbolReference;
    VisitParameter: LibrarySymbolReference;
    VisitRuntimeVariables: LibrarySymbolReference;
    VisitSwitch: LibrarySymbolReference;
    VisitSwitchCase: LibrarySymbolReference;
    VisitTry: LibrarySymbolReference;
    VisitTypeBinary: LibrarySymbolReference;
    VisitUnary: LibrarySymbolReference
  };
  GotoExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Kind: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Target: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  GotoExpressionKind: LibrarySymbolReference & {
    Goto: LibrarySymbolReference;
    Return: LibrarySymbolReference;
    Break: LibrarySymbolReference;
    Continue: LibrarySymbolReference
  };
  IArgumentProvider: LibrarySymbolReference & {
    GetArgument: LibrarySymbolReference;
    ArgumentCount: LibrarySymbolReference
  };
  IDynamicExpression: LibrarySymbolReference & {
    CreateCallSite: LibrarySymbolReference;
    Rewrite: LibrarySymbolReference;
    DelegateType: LibrarySymbolReference
  };
  IndexExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Arguments: LibrarySymbolReference;
    Indexer: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Object: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  InvocationExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Arguments: LibrarySymbolReference;
    Expression: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  LabelExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    DefaultValue: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Target: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  LabelTarget: LibrarySymbolReference & {
    ToString: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  LambdaExpression: LibrarySymbolReference & {
    Compile: LibrarySymbolReference;
    Body: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Parameters: LibrarySymbolReference;
    ReturnType: LibrarySymbolReference;
    TailCall: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  ListInitExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Reduce: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    CanReduce: LibrarySymbolReference;
    Initializers: LibrarySymbolReference;
    NewExpression: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  LoopExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Body: LibrarySymbolReference;
    BreakLabel: LibrarySymbolReference;
    ContinueLabel: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  MemberAssignment: LibrarySymbolReference & {
    Update: LibrarySymbolReference;
    Expression: LibrarySymbolReference
  };
  MemberBinding: LibrarySymbolReference & {
    MemberBinding: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    BindingType: LibrarySymbolReference;
    Member: LibrarySymbolReference
  };
  MemberBindingType: LibrarySymbolReference & {
    Assignment: LibrarySymbolReference;
    MemberBinding: LibrarySymbolReference;
    ListBinding: LibrarySymbolReference
  };
  MemberExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Expression: LibrarySymbolReference;
    Member: LibrarySymbolReference;
    NodeType: LibrarySymbolReference
  };
  MemberInitExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Reduce: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Bindings: LibrarySymbolReference;
    CanReduce: LibrarySymbolReference;
    NewExpression: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  MemberListBinding: LibrarySymbolReference & {
    Update: LibrarySymbolReference;
    Initializers: LibrarySymbolReference
  };
  MemberMemberBinding: LibrarySymbolReference & {
    Update: LibrarySymbolReference;
    Bindings: LibrarySymbolReference
  };
  MethodCallExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Arguments: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Object: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  NewArrayExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Expressions: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  NewExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Arguments: LibrarySymbolReference;
    Constructor: LibrarySymbolReference;
    Members: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  ParameterExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    IsByRef: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  RuntimeVariablesExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    Variables: LibrarySymbolReference
  };
  SwitchCase: LibrarySymbolReference & {
    ToString: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Body: LibrarySymbolReference;
    TestValues: LibrarySymbolReference
  };
  SwitchExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Cases: LibrarySymbolReference;
    Comparison: LibrarySymbolReference;
    DefaultBody: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    SwitchValue: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  SymbolDocumentInfo: LibrarySymbolReference & {
    DocumentType: LibrarySymbolReference;
    FileName: LibrarySymbolReference;
    Language: LibrarySymbolReference;
    LanguageVendor: LibrarySymbolReference
  };
  TryExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Body: LibrarySymbolReference;
    Fault: LibrarySymbolReference;
    Finally: LibrarySymbolReference;
    Handlers: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Type: LibrarySymbolReference
  };
  TypeBinaryExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    Expression: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Type: LibrarySymbolReference;
    TypeOperand: LibrarySymbolReference
  };
  UnaryExpression: LibrarySymbolReference & {
    Accept: LibrarySymbolReference;
    Reduce: LibrarySymbolReference;
    Update: LibrarySymbolReference;
    CanReduce: LibrarySymbolReference;
    IsLifted: LibrarySymbolReference;
    IsLiftedToNull: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    NodeType: LibrarySymbolReference;
    Operand: LibrarySymbolReference;
    Type: LibrarySymbolReference
  }
};
const Expressions: ExpressionsLibrary = createLibrary("System.Linq.Expressions", {
  BinaryExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Reduce: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      CanReduce: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      Conversion: {
        kind: "property",
        type: () => {
          return Expressions.LambdaExpression;
        },
        isNullable: true,
      },
      IsLifted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsLiftedToNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Left: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      Method: {
        kind: "property",
        type: () => {
          return Reflection.MethodInfo;
        },
      },
      Right: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
    },
  },
  BlockExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Expressions: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Result: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
      Variables: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
    },
  },
  CatchBlock: {
    kind: "class",
    members: {
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Body: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      Filter: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
        isNullable: true,
      },
      Test: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      Variable: {
        kind: "property",
        type: () => {
          return Expressions.ParameterExpression;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  ConditionalExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      IfFalse: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      IfTrue: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Test: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
    },
  },
  ConstantExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
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
  },
  DebugInfoExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Document: {
        kind: "property",
        type: () => {
          return Expressions.SymbolDocumentInfo;
        },
      },
      EndColumn: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      EndLine: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsClear: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      StartColumn: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      StartLine: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
  },
  DefaultExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isSealed: true,
  },
  DynamicExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Dynamic: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MakeDynamic: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Arguments: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      Binder: {
        kind: "property",
        type: () => {
          return CompilerServices.CallSiteBinder;
        },
      },
      DelegateType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
    },
  },
  DynamicExpressionVisitor: {
    kind: "class",
    members: {
      DynamicExpressionVisitor: {
        kind: "method",
        methodKind: "constructor",
      },
      VisitDynamic: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  ElementInit: {
    kind: "class",
    members: {
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      AddMethod: {
        kind: "property",
        type: () => {
          return Reflection.MethodInfo;
        },
      },
      Arguments: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
    },
    isSealed: true,
  },
  Expression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Compile: {
        kind: "method",
        methodKind: "ordinary",
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
    isSealed: true,
  },
  ExpressionType: {
    kind: "enum",
    members: {
      Add: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      AddChecked: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      And: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      AndAlso: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      ArrayLength: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      ArrayIndex: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Call: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Coalesce: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Conditional: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Constant: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Convert: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      ConvertChecked: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Divide: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Equal: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      ExclusiveOr: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      GreaterThan: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      GreaterThanOrEqual: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Invoke: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Lambda: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      LeftShift: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      LessThan: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      LessThanOrEqual: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      ListInit: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      MemberAccess: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      MemberInit: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Modulo: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Multiply: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      MultiplyChecked: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Negate: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      UnaryPlus: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      NegateChecked: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      New: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      NewArrayInit: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      NewArrayBounds: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Not: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      NotEqual: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Or: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      OrElse: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Parameter: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Power: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Quote: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      RightShift: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Subtract: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      SubtractChecked: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      TypeAs: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      TypeIs: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Assign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Block: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      DebugInfo: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Decrement: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Dynamic: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Default: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Extension: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Goto: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Increment: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Index: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Label: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      RuntimeVariables: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Loop: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Switch: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Throw: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Try: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      Unbox: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      AddAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      AndAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      DivideAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      ExclusiveOrAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      LeftShiftAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      ModuloAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      MultiplyAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      OrAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      PowerAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      RightShiftAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      SubtractAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      AddAssignChecked: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      MultiplyAssignChecked: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      SubtractAssignChecked: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      PreIncrementAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      PreDecrementAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      PostIncrementAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      PostDecrementAssign: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      TypeEqual: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      OnesComplement: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      IsTrue: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
      IsFalse: {
        kind: "field",
        type: () => {
          return Expressions.ExpressionType;
        },
      },
    },
  },
  ExpressionVisitor: {
    kind: "class",
    members: {
      ExpressionVisitor: {
        kind: "method",
        methodKind: "constructor",
      },
      Visit: {
        kind: "method",
        methodKind: "ordinary",
      },
      VisitBinary: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitBlock: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitCatchBlock: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitConditional: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitConstant: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitDebugInfo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitDefault: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitDynamic: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitElementInit: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitExtension: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitGoto: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitIndex: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitInvocation: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitLabel: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitLabelTarget: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitListInit: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitLoop: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitMember: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitMemberAssignment: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitMemberBinding: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitMemberInit: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitMemberListBinding: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitMemberMemberBinding: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitMethodCall: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitNew: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitNewArray: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitParameter: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitRuntimeVariables: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitSwitch: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitSwitchCase: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitTry: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitTypeBinary: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      VisitUnary: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  GotoExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Kind: {
        kind: "property",
        type: () => {
          return Expressions.GotoExpressionKind;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Target: {
        kind: "property",
        type: () => {
          return Expressions.LabelTarget;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
      Value: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  GotoExpressionKind: {
    kind: "enum",
    members: {
      Goto: {
        kind: "field",
        type: () => {
          return Expressions.GotoExpressionKind;
        },
      },
      Return: {
        kind: "field",
        type: () => {
          return Expressions.GotoExpressionKind;
        },
      },
      Break: {
        kind: "field",
        type: () => {
          return Expressions.GotoExpressionKind;
        },
      },
      Continue: {
        kind: "field",
        type: () => {
          return Expressions.GotoExpressionKind;
        },
      },
    },
  },
  IArgumentProvider: {
    kind: "interface",
    members: {
      GetArgument: {
        kind: "method",
        methodKind: "ordinary",
      },
      ArgumentCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  IDynamicExpression: {
    kind: "interface",
    members: {
      CreateCallSite: {
        kind: "method",
        methodKind: "ordinary",
      },
      Rewrite: {
        kind: "method",
        methodKind: "ordinary",
      },
      DelegateType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
  },
  IndexExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Arguments: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      Indexer: {
        kind: "property",
        type: () => {
          return Reflection.PropertyInfo;
        },
        isNullable: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Object: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
        isNullable: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isSealed: true,
  },
  InvocationExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Arguments: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      Expression: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isSealed: true,
  },
  LabelExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      DefaultValue: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
        isNullable: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Target: {
        kind: "property",
        type: () => {
          return Expressions.LabelTarget;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isSealed: true,
  },
  LabelTarget: {
    kind: "class",
    members: {
      ToString: {
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
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  LambdaExpression: {
    kind: "class",
    members: {
      Compile: {
        kind: "method",
        methodKind: "ordinary",
      },
      Body: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Parameters: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      ReturnType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      TailCall: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Type: {
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
  ListInitExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Reduce: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      CanReduce: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      Initializers: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      NewExpression: {
        kind: "property",
        type: () => {
          return Expressions.NewExpression;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isSealed: true,
  },
  LoopExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Body: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      BreakLabel: {
        kind: "property",
        type: () => {
          return Expressions.LabelTarget;
        },
        isNullable: true,
      },
      ContinueLabel: {
        kind: "property",
        type: () => {
          return Expressions.LabelTarget;
        },
        isNullable: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isSealed: true,
  },
  MemberAssignment: {
    kind: "class",
    members: {
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Expression: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
    },
    isSealed: true,
  },
  MemberBinding: {
    kind: "class",
    members: {
      MemberBinding: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      BindingType: {
        kind: "property",
        type: () => {
          return Expressions.MemberBindingType;
        },
      },
      Member: {
        kind: "property",
        type: () => {
          return Reflection.MemberInfo;
        },
      },
    },
    isAbstract: true,
  },
  MemberBindingType: {
    kind: "enum",
    members: {
      Assignment: {
        kind: "field",
        type: () => {
          return Expressions.MemberBindingType;
        },
      },
      MemberBinding: {
        kind: "field",
        type: () => {
          return Expressions.MemberBindingType;
        },
      },
      ListBinding: {
        kind: "field",
        type: () => {
          return Expressions.MemberBindingType;
        },
      },
    },
  },
  MemberExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Expression: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      Member: {
        kind: "property",
        type: () => {
          return Reflection.MemberInfo;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
    },
  },
  MemberInitExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Reduce: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Bindings: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      CanReduce: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      NewExpression: {
        kind: "property",
        type: () => {
          return Expressions.NewExpression;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isSealed: true,
  },
  MemberListBinding: {
    kind: "class",
    members: {
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Initializers: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
    },
    isSealed: true,
  },
  MemberMemberBinding: {
    kind: "class",
    members: {
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Bindings: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
    },
    isSealed: true,
  },
  MethodCallExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Arguments: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      Method: {
        kind: "property",
        type: () => {
          return Reflection.MethodInfo;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Object: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
        isNullable: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
  },
  NewArrayExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Expressions: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
  },
  NewExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Arguments: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      Constructor: {
        kind: "property",
        type: () => {
          return Reflection.ConstructorInfo;
        },
      },
      Members: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
        isNullable: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
    },
  },
  ParameterExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsByRef: {
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
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
      },
    },
  },
  RuntimeVariablesExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
      Variables: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
    },
    isSealed: true,
  },
  SwitchCase: {
    kind: "class",
    members: {
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Body: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      TestValues: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
    },
    isSealed: true,
  },
  SwitchExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Cases: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      Comparison: {
        kind: "property",
        type: () => {
          return Reflection.MethodInfo;
        },
        isNullable: true,
      },
      DefaultBody: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
        isNullable: true,
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      SwitchValue: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isSealed: true,
  },
  SymbolDocumentInfo: {
    kind: "class",
    members: {
      DocumentType: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
        isVirtual: true,
      },
      FileName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Language: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
        isVirtual: true,
      },
      LanguageVendor: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
        isVirtual: true,
      },
    },
  },
  TryExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Body: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      Fault: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
        isNullable: true,
      },
      Finally: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
        isNullable: true,
      },
      Handlers: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isSealed: true,
  },
  TypeBinaryExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      Expression: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
      TypeOperand: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  UnaryExpression: {
    kind: "class",
    members: {
      Accept: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Reduce: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Update: {
        kind: "method",
        methodKind: "ordinary",
      },
      CanReduce: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
      IsLifted: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsLiftedToNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Method: {
        kind: "property",
        type: () => {
          return Reflection.MethodInfo;
        },
      },
      NodeType: {
        kind: "property",
        type: () => {
          return Expressions.ExpressionType;
        },
        isOverride: true,
        isSealed: true,
      },
      Operand: {
        kind: "property",
        type: () => {
          return Expressions.Expression;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isOverride: true,
        isSealed: true,
      },
    },
    isSealed: true,
  },
});
export default Expressions
