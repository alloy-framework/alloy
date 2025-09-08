import System from "../../index.js";

import { createLibrary } from "#createLibrary";


const Serialization = createLibrary("System.Runtime.Serialization", {
  IDeserializationCallback: {
    kind: "interface",
    members: {
      OnDeserialization: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IFormatterConverter: {
    kind: "interface",
    members: {
      Convert: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToChar: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToDecimal: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToDouble: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToInt16: {
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
      ToSByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IObjectReference: {
    kind: "interface",
    members: {
      GetRealObject: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISafeSerializationData: {
    kind: "interface",
    members: {
      CompleteDeserialization: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  ISerializable: {
    kind: "interface",
    members: {
      GetObjectData: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  OnDeserializedAttribute: {
    kind: "class",
    members: {
      OnDeserializedAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  OnDeserializingAttribute: {
    kind: "class",
    members: {
      OnDeserializingAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  OnSerializedAttribute: {
    kind: "class",
    members: {
      OnSerializedAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  OnSerializingAttribute: {
    kind: "class",
    members: {
      OnSerializingAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  OptionalFieldAttribute: {
    kind: "class",
    members: {
      OptionalFieldAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      VersionAdded: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  SafeSerializationEventArgs: {
    kind: "class",
    members: {
      AddSerializedState: {
        kind: "method",
        methodKind: "ordinary",
      },
      StreamingContext: {
        kind: "property",
        type: () => {
          return Serialization.StreamingContext;
        },
      },
    },
    isSealed: true,
  },
  SerializationEntry: {
    kind: "struct",
    members: {
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ObjectType: {
        kind: "property",
        type: () => {
          return System.Type;
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
  SerializationException: {
    kind: "class",
    members: {
      SerializationException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  SerializationInfo: {
    kind: "class",
    members: {
      SerializationInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      AddValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetChar: {
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
      GetEnumerator: {
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
      GetSByte: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSingle: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetString: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUInt16: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetUInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetType: {
        kind: "method",
        methodKind: "ordinary",
      },
      AssemblyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      FullTypeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      IsAssemblyNameSetExplicit: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsFullTypeNameSetExplicit: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MemberCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ObjectType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  SerializationInfoEnumerator: {
    kind: "class",
    members: {
      MoveNext: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Current: {
        kind: "property",
        type: () => {
          return Serialization.SerializationEntry;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ObjectType: {
        kind: "property",
        type: () => {
          return System.Type;
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
    isSealed: true,
  },
  StreamingContext: {
    kind: "struct",
    members: {
      StreamingContext: {
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
      Context: {
        kind: "property",
        type: () => {
          return System.Object;
        },
        isNullable: true,
      },
      State: {
        kind: "property",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
    },
  },
  StreamingContextStates: {
    kind: "enum",
    members: {
      CrossProcess: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      CrossMachine: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      File: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      Persistence: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      Remoting: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      Other: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      Clone: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      CrossAppDomain: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
      All: {
        kind: "field",
        type: () => {
          return Serialization.StreamingContextStates;
        },
      },
    },
  },
});
export default Serialization
