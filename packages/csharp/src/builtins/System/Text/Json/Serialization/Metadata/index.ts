import Generic from "../../../../Collections/Generic/index.js";
import System from "../../../../index.js";
import Reflection from "../../../../Reflection/index.js";
import Json from "../../index.js";
import Serialization from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type MetadataLibrary = LibrarySymbolReference & {
  DefaultJsonTypeInfoResolver: LibrarySymbolReference & {
    DefaultJsonTypeInfoResolver: LibrarySymbolReference;
    GetTypeInfo: LibrarySymbolReference;
    Modifiers: LibrarySymbolReference
  };
  IJsonTypeInfoResolver: LibrarySymbolReference & {
    GetTypeInfo: LibrarySymbolReference
  };
  JsonDerivedType: LibrarySymbolReference & {
    JsonDerivedType: LibrarySymbolReference;
    DerivedType: LibrarySymbolReference;
    TypeDiscriminator: LibrarySymbolReference
  };
  JsonParameterInfo: LibrarySymbolReference & {
    DeclaringType: LibrarySymbolReference;
    AttributeProvider: LibrarySymbolReference;
    DefaultValue: LibrarySymbolReference;
    HasDefaultValue: LibrarySymbolReference;
    IsNullable: LibrarySymbolReference;
    IsMemberInitializer: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    ParameterType: LibrarySymbolReference;
    Position: LibrarySymbolReference
  };
  JsonPolymorphismOptions: LibrarySymbolReference & {
    JsonPolymorphismOptions: LibrarySymbolReference;
    DerivedTypes: LibrarySymbolReference;
    IgnoreUnrecognizedTypeDiscriminators: LibrarySymbolReference;
    TypeDiscriminatorPropertyName: LibrarySymbolReference;
    UnknownDerivedTypeHandling: LibrarySymbolReference
  };
  JsonPropertyInfo: LibrarySymbolReference & {
    AssociatedParameter: LibrarySymbolReference;
    AttributeProvider: LibrarySymbolReference;
    CustomConverter: LibrarySymbolReference;
    DeclaringType: LibrarySymbolReference;
    Get: LibrarySymbolReference;
    IsExtensionData: LibrarySymbolReference;
    IsGetNullable: LibrarySymbolReference;
    IsRequired: LibrarySymbolReference;
    IsSetNullable: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NumberHandling: LibrarySymbolReference;
    ObjectCreationHandling: LibrarySymbolReference;
    Options: LibrarySymbolReference;
    Order: LibrarySymbolReference;
    PropertyType: LibrarySymbolReference;
    Set: LibrarySymbolReference;
    ShouldSerialize: LibrarySymbolReference
  };
  JsonTypeInfo: LibrarySymbolReference & {
    CreateObject: LibrarySymbolReference
  };
  JsonTypeInfoKind: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Object: LibrarySymbolReference;
    Enumerable: LibrarySymbolReference;
    Dictionary: LibrarySymbolReference
  };
  JsonTypeInfoResolver: LibrarySymbolReference & {
    Combine: LibrarySymbolReference;
    WithAddedModifier: LibrarySymbolReference
  }
};
const Metadata: MetadataLibrary = createLibrary("System.Text.Json.Serialization.Metadata", {
  DefaultJsonTypeInfoResolver: {
    kind: "class",
    members: {
      DefaultJsonTypeInfoResolver: {
        kind: "method",
        methodKind: "constructor",
      },
      GetTypeInfo: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Modifiers: {
        kind: "property",
        type: () => {
          return Generic.IList;
        },
      },
    },
  },
  IJsonTypeInfoResolver: {
    kind: "interface",
    members: {
      GetTypeInfo: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  JsonDerivedType: {
    kind: "struct",
    members: {
      JsonDerivedType: {
        kind: "method",
        methodKind: "constructor",
      },
      DerivedType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      TypeDiscriminator: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
    },
  },
  JsonParameterInfo: {
    kind: "class",
    members: {
      DeclaringType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      AttributeProvider: {
        kind: "property",
        type: () => {
          return Reflection.ICustomAttributeProvider;
        },
      },
      DefaultValue: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      HasDefaultValue: {
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
      IsMemberInitializer: {
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
      ParameterType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      Position: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isAbstract: true,
  },
  JsonPolymorphismOptions: {
    kind: "class",
    members: {
      JsonPolymorphismOptions: {
        kind: "method",
        methodKind: "constructor",
      },
      DerivedTypes: {
        kind: "property",
        type: () => {
          return Generic.IList;
        },
      },
      IgnoreUnrecognizedTypeDiscriminators: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      TypeDiscriminatorPropertyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      UnknownDerivedTypeHandling: {
        kind: "property",
        type: () => {
          return Serialization.JsonUnknownDerivedTypeHandling;
        },
      },
    },
  },
  JsonPropertyInfo: {
    kind: "class",
    members: {
      AssociatedParameter: {
        kind: "property",
        type: () => {
          return Metadata.JsonParameterInfo;
        },
        isNullable: true,
      },
      AttributeProvider: {
        kind: "property",
        type: () => {
          return Reflection.ICustomAttributeProvider;
        },
      },
      CustomConverter: {
        kind: "property",
        type: () => {
          return Serialization.JsonConverter;
        },
        isNullable: true,
      },
      DeclaringType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      Get: {
        kind: "property",
        type: () => {
          return System.Func;
        },
        isNullable: true,
      },
      IsExtensionData: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsGetNullable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsRequired: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSetNullable: {
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
      NumberHandling: {
        kind: "property",
        type: () => {
          return Serialization.JsonNumberHandling;
        },
        isNullable: true,
      },
      ObjectCreationHandling: {
        kind: "property",
        type: () => {
          return Serialization.JsonObjectCreationHandling;
        },
        isNullable: true,
      },
      Options: {
        kind: "property",
        type: () => {
          return Json.JsonSerializerOptions;
        },
      },
      Order: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PropertyType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      Set: {
        kind: "property",
        type: () => {
          return System.Action;
        },
        isNullable: true,
      },
      ShouldSerialize: {
        kind: "property",
        type: () => {
          return System.Func;
        },
        isNullable: true,
      },
    },
    isAbstract: true,
  },
  JsonTypeInfo: {
    kind: "class",
    members: {
      CreateObject: {
        kind: "property",
        type: () => {
          return System.Func;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  JsonTypeInfoKind: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Metadata.JsonTypeInfoKind;
        },
      },
      Object: {
        kind: "field",
        type: () => {
          return Metadata.JsonTypeInfoKind;
        },
      },
      Enumerable: {
        kind: "field",
        type: () => {
          return Metadata.JsonTypeInfoKind;
        },
      },
      Dictionary: {
        kind: "field",
        type: () => {
          return Metadata.JsonTypeInfoKind;
        },
      },
    },
  },
  JsonTypeInfoResolver: {
    kind: "class",
    members: {
      Combine: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      WithAddedModifier: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Metadata
