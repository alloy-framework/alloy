import Generic from "../../Collections/Generic/index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Schema } from "./Schema/index.js";

type DataAnnotationsLibrary = LibrarySymbolReference & {
  AllowedValuesAttribute: LibrarySymbolReference & {
    AllowedValuesAttribute: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  AssociatedMetadataTypeTypeDescriptionProvider: LibrarySymbolReference & {
    AssociatedMetadataTypeTypeDescriptionProvider: LibrarySymbolReference;
    GetTypeDescriptor: LibrarySymbolReference
  };
  AssociationAttribute: LibrarySymbolReference & {
    AssociationAttribute: LibrarySymbolReference;
    IsForeignKey: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    OtherKey: LibrarySymbolReference;
    OtherKeyMembers: LibrarySymbolReference;
    ThisKey: LibrarySymbolReference;
    ThisKeyMembers: LibrarySymbolReference
  };
  Base64StringAttribute: LibrarySymbolReference & {
    Base64StringAttribute: LibrarySymbolReference;
    IsValid: LibrarySymbolReference
  };
  CompareAttribute: LibrarySymbolReference & {
    CompareAttribute: LibrarySymbolReference;
    FormatErrorMessage: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    OtherProperty: LibrarySymbolReference;
    OtherPropertyDisplayName: LibrarySymbolReference;
    RequiresValidationContext: LibrarySymbolReference
  };
  ConcurrencyCheckAttribute: LibrarySymbolReference & {
    ConcurrencyCheckAttribute: LibrarySymbolReference
  };
  CreditCardAttribute: LibrarySymbolReference & {
    CreditCardAttribute: LibrarySymbolReference;
    IsValid: LibrarySymbolReference
  };
  CustomValidationAttribute: LibrarySymbolReference & {
    CustomValidationAttribute: LibrarySymbolReference;
    FormatErrorMessage: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    Method: LibrarySymbolReference;
    ValidatorType: LibrarySymbolReference
  };
  DataType: LibrarySymbolReference & {
    Custom: LibrarySymbolReference;
    DateTime: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    Time: LibrarySymbolReference;
    Duration: LibrarySymbolReference;
    PhoneNumber: LibrarySymbolReference;
    Currency: LibrarySymbolReference;
    Text: LibrarySymbolReference;
    Html: LibrarySymbolReference;
    MultilineText: LibrarySymbolReference;
    EmailAddress: LibrarySymbolReference;
    Password: LibrarySymbolReference;
    Url: LibrarySymbolReference;
    ImageUrl: LibrarySymbolReference;
    CreditCard: LibrarySymbolReference;
    PostalCode: LibrarySymbolReference;
    Upload: LibrarySymbolReference
  };
  DataTypeAttribute: LibrarySymbolReference & {
    DataTypeAttribute: LibrarySymbolReference;
    GetDataTypeName: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    CustomDataType: LibrarySymbolReference;
    DataType: LibrarySymbolReference;
    DisplayFormat: LibrarySymbolReference
  };
  DeniedValuesAttribute: LibrarySymbolReference & {
    DeniedValuesAttribute: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  DisplayAttribute: LibrarySymbolReference & {
    DisplayAttribute: LibrarySymbolReference;
    GetAutoGenerateField: LibrarySymbolReference;
    GetAutoGenerateFilter: LibrarySymbolReference;
    GetDescription: LibrarySymbolReference;
    GetGroupName: LibrarySymbolReference;
    GetName: LibrarySymbolReference;
    GetOrder: LibrarySymbolReference;
    GetPrompt: LibrarySymbolReference;
    GetShortName: LibrarySymbolReference;
    AutoGenerateField: LibrarySymbolReference;
    AutoGenerateFilter: LibrarySymbolReference;
    Description: LibrarySymbolReference;
    GroupName: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Order: LibrarySymbolReference;
    Prompt: LibrarySymbolReference;
    ResourceType: LibrarySymbolReference;
    ShortName: LibrarySymbolReference
  };
  DisplayColumnAttribute: LibrarySymbolReference & {
    DisplayColumnAttribute: LibrarySymbolReference;
    DisplayColumn: LibrarySymbolReference;
    SortColumn: LibrarySymbolReference;
    SortDescending: LibrarySymbolReference
  };
  DisplayFormatAttribute: LibrarySymbolReference & {
    DisplayFormatAttribute: LibrarySymbolReference;
    GetNullDisplayText: LibrarySymbolReference;
    ApplyFormatInEditMode: LibrarySymbolReference;
    ConvertEmptyStringToNull: LibrarySymbolReference;
    DataFormatString: LibrarySymbolReference;
    HtmlEncode: LibrarySymbolReference;
    NullDisplayText: LibrarySymbolReference;
    NullDisplayTextResourceType: LibrarySymbolReference
  };
  EditableAttribute: LibrarySymbolReference & {
    EditableAttribute: LibrarySymbolReference;
    AllowEdit: LibrarySymbolReference;
    AllowInitialValue: LibrarySymbolReference
  };
  EmailAddressAttribute: LibrarySymbolReference & {
    EmailAddressAttribute: LibrarySymbolReference;
    IsValid: LibrarySymbolReference
  };
  EnumDataTypeAttribute: LibrarySymbolReference & {
    EnumDataTypeAttribute: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    EnumType: LibrarySymbolReference
  };
  FileExtensionsAttribute: LibrarySymbolReference & {
    FileExtensionsAttribute: LibrarySymbolReference;
    FormatErrorMessage: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    Extensions: LibrarySymbolReference
  };
  FilterUIHintAttribute: LibrarySymbolReference & {
    FilterUIHintAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ControlParameters: LibrarySymbolReference;
    FilterUIHint: LibrarySymbolReference;
    PresentationLayer: LibrarySymbolReference
  };
  IValidatableObject: LibrarySymbolReference & {
    Validate: LibrarySymbolReference
  };
  KeyAttribute: LibrarySymbolReference & {
    KeyAttribute: LibrarySymbolReference
  };
  LengthAttribute: LibrarySymbolReference & {
    LengthAttribute: LibrarySymbolReference;
    FormatErrorMessage: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    MaximumLength: LibrarySymbolReference;
    MinimumLength: LibrarySymbolReference
  };
  MaxLengthAttribute: LibrarySymbolReference & {
    MaxLengthAttribute: LibrarySymbolReference;
    FormatErrorMessage: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    Length: LibrarySymbolReference
  };
  MetadataTypeAttribute: LibrarySymbolReference & {
    MetadataTypeAttribute: LibrarySymbolReference;
    MetadataClassType: LibrarySymbolReference
  };
  MinLengthAttribute: LibrarySymbolReference & {
    MinLengthAttribute: LibrarySymbolReference;
    FormatErrorMessage: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    Length: LibrarySymbolReference
  };
  PhoneAttribute: LibrarySymbolReference & {
    PhoneAttribute: LibrarySymbolReference;
    IsValid: LibrarySymbolReference
  };
  RangeAttribute: LibrarySymbolReference & {
    RangeAttribute: LibrarySymbolReference;
    FormatErrorMessage: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    ConvertValueInInvariantCulture: LibrarySymbolReference;
    Maximum: LibrarySymbolReference;
    MaximumIsExclusive: LibrarySymbolReference;
    Minimum: LibrarySymbolReference;
    MinimumIsExclusive: LibrarySymbolReference;
    OperandType: LibrarySymbolReference;
    ParseLimitsInInvariantCulture: LibrarySymbolReference
  };
  RegularExpressionAttribute: LibrarySymbolReference & {
    RegularExpressionAttribute: LibrarySymbolReference;
    FormatErrorMessage: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    MatchTimeout: LibrarySymbolReference;
    MatchTimeoutInMilliseconds: LibrarySymbolReference;
    Pattern: LibrarySymbolReference
  };
  RequiredAttribute: LibrarySymbolReference & {
    RequiredAttribute: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    AllowEmptyStrings: LibrarySymbolReference
  };
  ScaffoldColumnAttribute: LibrarySymbolReference & {
    ScaffoldColumnAttribute: LibrarySymbolReference;
    Scaffold: LibrarySymbolReference
  };
  StringLengthAttribute: LibrarySymbolReference & {
    StringLengthAttribute: LibrarySymbolReference;
    FormatErrorMessage: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    MaximumLength: LibrarySymbolReference;
    MinimumLength: LibrarySymbolReference
  };
  TimestampAttribute: LibrarySymbolReference & {
    TimestampAttribute: LibrarySymbolReference
  };
  UIHintAttribute: LibrarySymbolReference & {
    UIHintAttribute: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ControlParameters: LibrarySymbolReference;
    PresentationLayer: LibrarySymbolReference;
    UIHint: LibrarySymbolReference
  };
  UrlAttribute: LibrarySymbolReference & {
    UrlAttribute: LibrarySymbolReference;
    IsValid: LibrarySymbolReference
  };
  ValidationAttribute: LibrarySymbolReference & {
    ValidationAttribute: LibrarySymbolReference;
    FormatErrorMessage: LibrarySymbolReference;
    GetValidationResult: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    Validate: LibrarySymbolReference;
    ErrorMessage: LibrarySymbolReference;
    ErrorMessageResourceName: LibrarySymbolReference;
    ErrorMessageResourceType: LibrarySymbolReference;
    ErrorMessageString: LibrarySymbolReference;
    RequiresValidationContext: LibrarySymbolReference
  };
  ValidationContext: LibrarySymbolReference & {
    ValidationContext: LibrarySymbolReference;
    GetService: LibrarySymbolReference;
    InitializeServiceProvider: LibrarySymbolReference;
    DisplayName: LibrarySymbolReference;
    Items: LibrarySymbolReference;
    MemberName: LibrarySymbolReference;
    ObjectInstance: LibrarySymbolReference;
    ObjectType: LibrarySymbolReference
  };
  ValidationException: LibrarySymbolReference & {
    ValidationException: LibrarySymbolReference;
    ValidationAttribute: LibrarySymbolReference;
    ValidationResult: LibrarySymbolReference;
    Value: LibrarySymbolReference
  };
  ValidationResult: LibrarySymbolReference & {
    Success: LibrarySymbolReference;
    ValidationResult: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ErrorMessage: LibrarySymbolReference;
    MemberNames: LibrarySymbolReference
  };
  Validator: LibrarySymbolReference & {
    TryValidateObject: LibrarySymbolReference;
    TryValidateProperty: LibrarySymbolReference;
    TryValidateValue: LibrarySymbolReference;
    ValidateObject: LibrarySymbolReference;
    ValidateProperty: LibrarySymbolReference;
    ValidateValue: LibrarySymbolReference
  }
};
const DataAnnotations: DataAnnotationsLibrary = createLibrary("System.ComponentModel.DataAnnotations", {
  AllowedValuesAttribute: {
    kind: "class",
    members: {
      AllowedValuesAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Values: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  AssociatedMetadataTypeTypeDescriptionProvider: {
    kind: "class",
    members: {
      AssociatedMetadataTypeTypeDescriptionProvider: {
        kind: "method",
        methodKind: "constructor",
      },
      GetTypeDescriptor: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  AssociationAttribute: {
    kind: "class",
    members: {
      AssociationAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsForeignKey: {
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
      OtherKey: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      OtherKeyMembers: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
      },
      ThisKey: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ThisKeyMembers: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
      },
    },
    isSealed: true,
  },
  Base64StringAttribute: {
    kind: "class",
    members: {
      Base64StringAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  CompareAttribute: {
    kind: "class",
    members: {
      CompareAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      FormatErrorMessage: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      OtherProperty: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      OtherPropertyDisplayName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      RequiresValidationContext: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isOverride: true,
      },
    },
  },
  ConcurrencyCheckAttribute: {
    kind: "class",
    members: {
      ConcurrencyCheckAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  CreditCardAttribute: {
    kind: "class",
    members: {
      CreditCardAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  CustomValidationAttribute: {
    kind: "class",
    members: {
      CustomValidationAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      FormatErrorMessage: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Method: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ValidatorType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  DataType: {
    kind: "enum",
    members: {
      Custom: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      DateTime: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      Date: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      Time: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      Duration: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      PhoneNumber: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      Currency: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      Text: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      Html: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      MultilineText: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      EmailAddress: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      Password: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      Url: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      ImageUrl: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      CreditCard: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      PostalCode: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      Upload: {
        kind: "field",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
    },
  },
  DataTypeAttribute: {
    kind: "class",
    members: {
      DataTypeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      GetDataTypeName: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CustomDataType: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      DataType: {
        kind: "property",
        type: () => {
          return DataAnnotations.DataType;
        },
      },
      DisplayFormat: {
        kind: "property",
        type: () => {
          return DataAnnotations.DisplayFormatAttribute;
        },
      },
    },
  },
  DeniedValuesAttribute: {
    kind: "class",
    members: {
      DeniedValuesAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Values: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
    },
  },
  DisplayAttribute: {
    kind: "class",
    members: {
      DisplayAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      GetAutoGenerateField: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAutoGenerateFilter: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDescription: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetGroupName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetOrder: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetPrompt: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetShortName: {
        kind: "method",
        methodKind: "ordinary",
      },
      AutoGenerateField: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AutoGenerateFilter: {
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
        isNullable: true,
      },
      GroupName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Order: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Prompt: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ResourceType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      ShortName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  DisplayColumnAttribute: {
    kind: "class",
    members: {
      DisplayColumnAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      DisplayColumn: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SortColumn: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      SortDescending: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  DisplayFormatAttribute: {
    kind: "class",
    members: {
      DisplayFormatAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      GetNullDisplayText: {
        kind: "method",
        methodKind: "ordinary",
      },
      ApplyFormatInEditMode: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ConvertEmptyStringToNull: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      DataFormatString: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      HtmlEncode: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      NullDisplayText: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      NullDisplayTextResourceType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
    },
  },
  EditableAttribute: {
    kind: "class",
    members: {
      EditableAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      AllowEdit: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      AllowInitialValue: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  EmailAddressAttribute: {
    kind: "class",
    members: {
      EmailAddressAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  EnumDataTypeAttribute: {
    kind: "class",
    members: {
      EnumDataTypeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      EnumType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  FileExtensionsAttribute: {
    kind: "class",
    members: {
      FileExtensionsAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      FormatErrorMessage: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Extensions: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  FilterUIHintAttribute: {
    kind: "class",
    members: {
      FilterUIHintAttribute: {
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
      ControlParameters: {
        kind: "property",
        type: () => {
          return Generic.IDictionary;
        },
      },
      FilterUIHint: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      PresentationLayer: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  IValidatableObject: {
    kind: "interface",
    members: {
      Validate: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  KeyAttribute: {
    kind: "class",
    members: {
      KeyAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  LengthAttribute: {
    kind: "class",
    members: {
      LengthAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      FormatErrorMessage: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MaximumLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MinimumLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  MaxLengthAttribute: {
    kind: "class",
    members: {
      MaxLengthAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      FormatErrorMessage: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  MetadataTypeAttribute: {
    kind: "class",
    members: {
      MetadataTypeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      MetadataClassType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
    },
    isSealed: true,
  },
  MinLengthAttribute: {
    kind: "class",
    members: {
      MinLengthAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      FormatErrorMessage: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  PhoneAttribute: {
    kind: "class",
    members: {
      PhoneAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  RangeAttribute: {
    kind: "class",
    members: {
      RangeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      FormatErrorMessage: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertValueInInvariantCulture: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Maximum: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      MaximumIsExclusive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Minimum: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      MinimumIsExclusive: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      OperandType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
      },
      ParseLimitsInInvariantCulture: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  RegularExpressionAttribute: {
    kind: "class",
    members: {
      RegularExpressionAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      FormatErrorMessage: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MatchTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      MatchTimeoutInMilliseconds: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Pattern: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  RequiredAttribute: {
    kind: "class",
    members: {
      RequiredAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AllowEmptyStrings: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  ScaffoldColumnAttribute: {
    kind: "class",
    members: {
      ScaffoldColumnAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Scaffold: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  StringLengthAttribute: {
    kind: "class",
    members: {
      StringLengthAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      FormatErrorMessage: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MaximumLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MinimumLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  TimestampAttribute: {
    kind: "class",
    members: {
      TimestampAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
    },
    isSealed: true,
  },
  UIHintAttribute: {
    kind: "class",
    members: {
      UIHintAttribute: {
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
      ControlParameters: {
        kind: "property",
        type: () => {
          return Generic.IDictionary;
        },
      },
      PresentationLayer: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      UIHint: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  UrlAttribute: {
    kind: "class",
    members: {
      UrlAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
    isSealed: true,
  },
  ValidationAttribute: {
    kind: "class",
    members: {
      ValidationAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      FormatErrorMessage: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetValidationResult: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Validate: {
        kind: "method",
        methodKind: "ordinary",
      },
      ErrorMessage: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ErrorMessageResourceName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ErrorMessageResourceType: {
        kind: "property",
        type: () => {
          return System.Type;
        },
        isNullable: true,
      },
      ErrorMessageString: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      RequiresValidationContext: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  ValidationContext: {
    kind: "class",
    members: {
      ValidationContext: {
        kind: "method",
        methodKind: "constructor",
      },
      GetService: {
        kind: "method",
        methodKind: "ordinary",
      },
      InitializeServiceProvider: {
        kind: "method",
        methodKind: "ordinary",
      },
      DisplayName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Items: {
        kind: "property",
        type: () => {
          return Generic.IDictionary;
        },
      },
      MemberName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      ObjectInstance: {
        kind: "property",
        type: () => {
          return System.Object;
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
  ValidationException: {
    kind: "class",
    members: {
      ValidationException: {
        kind: "method",
        methodKind: "constructor",
      },
      ValidationAttribute: {
        kind: "property",
        type: () => {
          return DataAnnotations.ValidationAttribute;
        },
      },
      ValidationResult: {
        kind: "property",
        type: () => {
          return DataAnnotations.ValidationResult;
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
  ValidationResult: {
    kind: "class",
    members: {
      Success: {
        kind: "field",
        type: () => {
          return DataAnnotations.ValidationResult;
        },
        isNullable: true,
        isStatic: true,
        isReadOnly: true,
      },
      ValidationResult: {
        kind: "method",
        methodKind: "constructor",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ErrorMessage: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      MemberNames: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
      },
    },
  },
  Validator: {
    kind: "class",
    members: {
      TryValidateObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryValidateProperty: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryValidateValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ValidateObject: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ValidateProperty: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ValidateValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default DataAnnotations
