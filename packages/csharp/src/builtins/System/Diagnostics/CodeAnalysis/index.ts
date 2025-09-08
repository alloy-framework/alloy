import System from "../../index.js";

import { createLibrary } from "#createLibrary";


const CodeAnalysis = createLibrary("System.Diagnostics.CodeAnalysis", {
  AllowNullAttribute: {
    kind: "class",
    members: {
      AllowNullAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  ConstantExpectedAttribute: {
    kind: "class",
    members: {
      ConstantExpectedAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Max: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      Min: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  DisallowNullAttribute: {
    kind: "class",
    members: {
      DisallowNullAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DoesNotReturnAttribute: {
    kind: "class",
    members: {
      DoesNotReturnAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  DoesNotReturnIfAttribute: {
    kind: "class",
    members: {
      DoesNotReturnIfAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ParameterValue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  DynamicDependencyAttribute: {
    kind: "class",
    members: {
      DynamicDependencyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AssemblyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Condition: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      MemberSignature: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      MemberTypes: {
        kind: "property",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      Type: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      TypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  DynamicallyAccessedMemberTypes: {
    kind: "enum",
    members: {
      All: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      None: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      PublicParameterlessConstructor: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      PublicConstructors: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      NonPublicConstructors: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      PublicMethods: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      NonPublicMethods: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      PublicFields: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      NonPublicFields: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      PublicNestedTypes: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      NonPublicNestedTypes: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      PublicProperties: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      NonPublicProperties: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      PublicEvents: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      NonPublicEvents: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
      Interfaces: {
        kind: "field",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
    },
  },
  DynamicallyAccessedMembersAttribute: {
    kind: "class",
    members: {
      DynamicallyAccessedMembersAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      MemberTypes: {
        kind: "property",
        type: () => {
          return CodeAnalysis.DynamicallyAccessedMemberTypes;
        },
      },
    },
    isSealed: true,
  },
  ExcludeFromCodeCoverageAttribute: {
    kind: "class",
    members: {
      ExcludeFromCodeCoverageAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Justification: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  ExperimentalAttribute: {
    kind: "class",
    members: {
      ExperimentalAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      DiagnosticId: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      UrlFormat: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  FeatureGuardAttribute: {
    kind: "class",
    members: {
      FeatureGuardAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      FeatureType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  FeatureSwitchDefinitionAttribute: {
    kind: "class",
    members: {
      FeatureSwitchDefinitionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      SwitchName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  MaybeNullAttribute: {
    kind: "class",
    members: {
      MaybeNullAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  MaybeNullWhenAttribute: {
    kind: "class",
    members: {
      MaybeNullWhenAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ReturnValue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  MemberNotNullAttribute: {
    kind: "class",
    members: {
      MemberNotNullAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Members: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
    isSealed: true,
  },
  MemberNotNullWhenAttribute: {
    kind: "class",
    members: {
      MemberNotNullWhenAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Members: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      ReturnValue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  NotNullAttribute: {
    kind: "class",
    members: {
      NotNullAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  NotNullIfNotNullAttribute: {
    kind: "class",
    members: {
      NotNullIfNotNullAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ParameterName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  NotNullWhenAttribute: {
    kind: "class",
    members: {
      NotNullWhenAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      ReturnValue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  RequiresAssemblyFilesAttribute: {
    kind: "class",
    members: {
      RequiresAssemblyFilesAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Url: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  RequiresDynamicCodeAttribute: {
    kind: "class",
    members: {
      RequiresDynamicCodeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Url: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  RequiresUnreferencedCodeAttribute: {
    kind: "class",
    members: {
      RequiresUnreferencedCodeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Url: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  SetsRequiredMembersAttribute: {
    kind: "class",
    members: {
      SetsRequiredMembersAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  StringSyntaxAttribute: {
    kind: "class",
    members: {
      CompositeFormat: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DateOnlyFormat: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      DateTimeFormat: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      EnumFormat: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      GuidFormat: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Json: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      NumericFormat: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Regex: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      TimeOnlyFormat: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      TimeSpanFormat: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Uri: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Xml: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      StringSyntaxAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Arguments: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      Syntax: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  SuppressMessageAttribute: {
    kind: "class",
    members: {
      SuppressMessageAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Category: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      CheckId: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Justification: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      MessageId: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Scope: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Target: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  UnconditionalSuppressMessageAttribute: {
    kind: "class",
    members: {
      UnconditionalSuppressMessageAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Category: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      CheckId: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Justification: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      MessageId: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Scope: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Target: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  UnscopedRefAttribute: {
    kind: "class",
    members: {
      UnscopedRefAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
});
export default CodeAnalysis
