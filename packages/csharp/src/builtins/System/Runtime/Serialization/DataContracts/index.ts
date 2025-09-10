import Generic from "../../../Collections/Generic/index.js";
import Collections from "../../../Collections/index.js";
import ObjectModel from "../../../Collections/ObjectModel/index.js";
import System from "../../../index.js";
import Xml from "../../../Xml/index.js";
import Schema from "../../../Xml/Schema/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type DataContractsLibrary = LibrarySymbolReference & {
  DataContract: LibrarySymbolReference & {
    GetBuiltInDataContract: LibrarySymbolReference;
    GetXmlName: LibrarySymbolReference;
    GetArrayTypeName: LibrarySymbolReference;
    IsDictionaryLike: LibrarySymbolReference;
    BaseContract: LibrarySymbolReference;
    ContractType: LibrarySymbolReference;
    IsBuiltInDataContract: LibrarySymbolReference;
    IsISerializable: LibrarySymbolReference;
    IsReference: LibrarySymbolReference;
    IsValueType: LibrarySymbolReference;
    KnownDataContracts: LibrarySymbolReference;
    DataMembers: LibrarySymbolReference;
    OriginalUnderlyingType: LibrarySymbolReference;
    XmlName: LibrarySymbolReference;
    UnderlyingType: LibrarySymbolReference;
    TopLevelElementName: LibrarySymbolReference;
    TopLevelElementNamespace: LibrarySymbolReference
  };
  DataContractSet: LibrarySymbolReference & {
    DataContractSet: LibrarySymbolReference;
    GetDataContract: LibrarySymbolReference;
    GetReferencedType: LibrarySymbolReference;
    ImportSchemaSet: LibrarySymbolReference;
    Contracts: LibrarySymbolReference;
    KnownTypesForObject: LibrarySymbolReference;
    ProcessedContracts: LibrarySymbolReference;
    SurrogateData: LibrarySymbolReference
  };
  DataMember: LibrarySymbolReference & {
    EmitDefaultValue: LibrarySymbolReference;
    IsNullable: LibrarySymbolReference;
    IsRequired: LibrarySymbolReference;
    MemberTypeContract: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Order: LibrarySymbolReference
  };
  XmlDataContract: LibrarySymbolReference & {
    HasRoot: LibrarySymbolReference;
    IsAnonymous: LibrarySymbolReference;
    IsTopLevelElementNullable: LibrarySymbolReference;
    IsTypeDefinedOnImport: LibrarySymbolReference;
    IsValueType: LibrarySymbolReference;
    XsdType: LibrarySymbolReference
  }
};
const DataContracts: DataContractsLibrary = createLibrary("System.Runtime.Serialization.DataContracts", {
  DataContract: {
    kind: "class",
    members: {
      GetBuiltInDataContract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetXmlName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetArrayTypeName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsDictionaryLike: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      BaseContract: {
        kind: "property",
        type: () => {
          return DataContracts.DataContract;
        },
        isNullable: true,
        isVirtual: true,
      },
      ContractType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      IsBuiltInDataContract: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsISerializable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsReference: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsValueType: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      KnownDataContracts: {
        kind: "property",
        type: () => {
          return Generic.Dictionary;
        },
        isNullable: true,
        isVirtual: true,
      },
      DataMembers: {
        kind: "property",
        type: () => {
          return ObjectModel.ReadOnlyCollection;
        },
        isVirtual: true,
      },
      OriginalUnderlyingType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isVirtual: true,
      },
      XmlName: {
        kind: "property",
        type: () => {
          return Xml.XmlQualifiedName;
        },
        isVirtual: true,
      },
      UnderlyingType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isVirtual: true,
      },
      TopLevelElementName: {
        kind: "property",
        type: () => {
          return Xml.XmlDictionaryString;
        },
        isNullable: true,
        isVirtual: true,
      },
      TopLevelElementNamespace: {
        kind: "property",
        type: () => {
          return Xml.XmlDictionaryString;
        },
        isNullable: true,
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  DataContractSet: {
    kind: "class",
    members: {
      DataContractSet: {
        kind: "method",
        methodKind: "constructor",
      },
      GetDataContract: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetReferencedType: {
        kind: "method",
        methodKind: "ordinary",
      },
      ImportSchemaSet: {
        kind: "method",
        methodKind: "ordinary",
      },
      Contracts: {
        kind: "property",
        type: () => {
          return Generic.Dictionary;
        },
      },
      KnownTypesForObject: {
        kind: "property",
        type: () => {
          return Generic.Dictionary;
        },
        isNullable: true,
      },
      ProcessedContracts: {
        kind: "property",
        type: () => {
          return Generic.Dictionary;
        },
      },
      SurrogateData: {
        kind: "property",
        type: () => {
          return Collections.Hashtable;
        },
      },
    },
    isSealed: true,
  },
  DataMember: {
    kind: "class",
    members: {
      EmitDefaultValue: {
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
      IsRequired: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MemberTypeContract: {
        kind: "property",
        type: () => {
          return DataContracts.DataContract;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Order: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
    isSealed: true,
  },
  XmlDataContract: {
    kind: "class",
    members: {
      HasRoot: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsAnonymous: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsTopLevelElementNullable: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsTypeDefinedOnImport: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsValueType: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      XsdType: {
        kind: "property",
        type: () => {
          return Schema.XmlSchemaType;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
});
export default DataContracts
