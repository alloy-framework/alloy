import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type Asn1Library = LibrarySymbolReference & {
  Asn1Tag: LibrarySymbolReference & {
    Boolean: LibrarySymbolReference;
    ConstructedBitString: LibrarySymbolReference;
    ConstructedOctetString: LibrarySymbolReference;
    Enumerated: LibrarySymbolReference;
    GeneralizedTime: LibrarySymbolReference;
    Integer: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    ObjectIdentifier: LibrarySymbolReference;
    PrimitiveBitString: LibrarySymbolReference;
    PrimitiveOctetString: LibrarySymbolReference;
    Sequence: LibrarySymbolReference;
    SetOf: LibrarySymbolReference;
    UtcTime: LibrarySymbolReference;
    Asn1Tag: LibrarySymbolReference;
    AsConstructed: LibrarySymbolReference;
    AsPrimitive: LibrarySymbolReference;
    CalculateEncodedSize: LibrarySymbolReference;
    Decode: LibrarySymbolReference;
    Encode: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    HasSameClassAndValue: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    TryDecode: LibrarySymbolReference;
    TryEncode: LibrarySymbolReference;
    IsConstructed: LibrarySymbolReference;
    TagClass: LibrarySymbolReference;
    TagValue: LibrarySymbolReference
  };
  AsnContentException: LibrarySymbolReference & {
    AsnContentException: LibrarySymbolReference
  };
  AsnDecoder: LibrarySymbolReference & {
    DecodeLength: LibrarySymbolReference;
    ReadBitString: LibrarySymbolReference;
    ReadBoolean: LibrarySymbolReference;
    ReadCharacterString: LibrarySymbolReference;
    ReadEncodedValue: LibrarySymbolReference;
    ReadEnumeratedBytes: LibrarySymbolReference;
    ReadEnumeratedValue: LibrarySymbolReference;
    ReadGeneralizedTime: LibrarySymbolReference;
    ReadInteger: LibrarySymbolReference;
    ReadIntegerBytes: LibrarySymbolReference;
    ReadNamedBitList: LibrarySymbolReference;
    ReadNamedBitListValue: LibrarySymbolReference;
    ReadNull: LibrarySymbolReference;
    ReadObjectIdentifier: LibrarySymbolReference;
    ReadOctetString: LibrarySymbolReference;
    ReadSequence: LibrarySymbolReference;
    ReadSetOf: LibrarySymbolReference;
    ReadUtcTime: LibrarySymbolReference;
    TryDecodeLength: LibrarySymbolReference;
    TryReadBitString: LibrarySymbolReference;
    TryReadCharacterString: LibrarySymbolReference;
    TryReadCharacterStringBytes: LibrarySymbolReference;
    TryReadEncodedValue: LibrarySymbolReference;
    TryReadInt32: LibrarySymbolReference;
    TryReadInt64: LibrarySymbolReference;
    TryReadOctetString: LibrarySymbolReference;
    TryReadPrimitiveBitString: LibrarySymbolReference;
    TryReadPrimitiveCharacterStringBytes: LibrarySymbolReference;
    TryReadPrimitiveOctetString: LibrarySymbolReference;
    TryReadUInt32: LibrarySymbolReference;
    TryReadUInt64: LibrarySymbolReference
  };
  AsnEncodingRules: LibrarySymbolReference & {
    BER: LibrarySymbolReference;
    CER: LibrarySymbolReference;
    DER: LibrarySymbolReference
  };
  AsnReader: LibrarySymbolReference & {
    AsnReader: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    PeekContentBytes: LibrarySymbolReference;
    PeekEncodedValue: LibrarySymbolReference;
    PeekTag: LibrarySymbolReference;
    ReadBitString: LibrarySymbolReference;
    ReadBoolean: LibrarySymbolReference;
    ReadCharacterString: LibrarySymbolReference;
    ReadEncodedValue: LibrarySymbolReference;
    ReadEnumeratedBytes: LibrarySymbolReference;
    ReadEnumeratedValue: LibrarySymbolReference;
    ReadGeneralizedTime: LibrarySymbolReference;
    ReadInteger: LibrarySymbolReference;
    ReadIntegerBytes: LibrarySymbolReference;
    ReadNamedBitList: LibrarySymbolReference;
    ReadNamedBitListValue: LibrarySymbolReference;
    ReadNull: LibrarySymbolReference;
    ReadObjectIdentifier: LibrarySymbolReference;
    ReadOctetString: LibrarySymbolReference;
    ReadSequence: LibrarySymbolReference;
    ReadSetOf: LibrarySymbolReference;
    ReadUtcTime: LibrarySymbolReference;
    ThrowIfNotEmpty: LibrarySymbolReference;
    TryReadBitString: LibrarySymbolReference;
    TryReadCharacterString: LibrarySymbolReference;
    TryReadCharacterStringBytes: LibrarySymbolReference;
    TryReadInt32: LibrarySymbolReference;
    TryReadInt64: LibrarySymbolReference;
    TryReadOctetString: LibrarySymbolReference;
    TryReadPrimitiveBitString: LibrarySymbolReference;
    TryReadPrimitiveCharacterStringBytes: LibrarySymbolReference;
    TryReadPrimitiveOctetString: LibrarySymbolReference;
    TryReadUInt32: LibrarySymbolReference;
    TryReadUInt64: LibrarySymbolReference;
    HasData: LibrarySymbolReference;
    RuleSet: LibrarySymbolReference
  };
  AsnReaderOptions: LibrarySymbolReference & {
    SkipSetSortOrderVerification: LibrarySymbolReference;
    UtcTimeTwoDigitYearMax: LibrarySymbolReference
  };
  AsnWriter: LibrarySymbolReference & {
    Scope: LibrarySymbolReference & {
      Dispose: LibrarySymbolReference
    }
  };
  TagClass: LibrarySymbolReference & {
    Universal: LibrarySymbolReference;
    Application: LibrarySymbolReference;
    ContextSpecific: LibrarySymbolReference;
    Private: LibrarySymbolReference
  };
  UniversalTagNumber: LibrarySymbolReference & {
    EndOfContents: LibrarySymbolReference;
    Boolean: LibrarySymbolReference;
    Integer: LibrarySymbolReference;
    BitString: LibrarySymbolReference;
    OctetString: LibrarySymbolReference;
    Null: LibrarySymbolReference;
    ObjectIdentifier: LibrarySymbolReference;
    ObjectDescriptor: LibrarySymbolReference;
    External: LibrarySymbolReference;
    InstanceOf: LibrarySymbolReference;
    Real: LibrarySymbolReference;
    Enumerated: LibrarySymbolReference;
    Embedded: LibrarySymbolReference;
    UTF8String: LibrarySymbolReference;
    RelativeObjectIdentifier: LibrarySymbolReference;
    Time: LibrarySymbolReference;
    Sequence: LibrarySymbolReference;
    SequenceOf: LibrarySymbolReference;
    Set: LibrarySymbolReference;
    SetOf: LibrarySymbolReference;
    NumericString: LibrarySymbolReference;
    PrintableString: LibrarySymbolReference;
    T61String: LibrarySymbolReference;
    TeletexString: LibrarySymbolReference;
    VideotexString: LibrarySymbolReference;
    IA5String: LibrarySymbolReference;
    UtcTime: LibrarySymbolReference;
    GeneralizedTime: LibrarySymbolReference;
    GraphicString: LibrarySymbolReference;
    ISO646String: LibrarySymbolReference;
    VisibleString: LibrarySymbolReference;
    GeneralString: LibrarySymbolReference;
    UniversalString: LibrarySymbolReference;
    UnrestrictedCharacterString: LibrarySymbolReference;
    BMPString: LibrarySymbolReference;
    Date: LibrarySymbolReference;
    TimeOfDay: LibrarySymbolReference;
    DateTime: LibrarySymbolReference;
    Duration: LibrarySymbolReference;
    ObjectIdentifierIRI: LibrarySymbolReference;
    RelativeObjectIdentifierIRI: LibrarySymbolReference
  }
};
const Asn1: Asn1Library = createLibrary("System.Formats.Asn1", {
  Asn1Tag: {
    kind: "struct",
    members: {
      Boolean: {
        kind: "field",
        type: () => {
          return Asn1.Asn1Tag;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ConstructedBitString: {
        kind: "field",
        type: () => {
          return Asn1.Asn1Tag;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ConstructedOctetString: {
        kind: "field",
        type: () => {
          return Asn1.Asn1Tag;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Enumerated: {
        kind: "field",
        type: () => {
          return Asn1.Asn1Tag;
        },
        isStatic: true,
        isReadOnly: true,
      },
      GeneralizedTime: {
        kind: "field",
        type: () => {
          return Asn1.Asn1Tag;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Integer: {
        kind: "field",
        type: () => {
          return Asn1.Asn1Tag;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Null: {
        kind: "field",
        type: () => {
          return Asn1.Asn1Tag;
        },
        isStatic: true,
        isReadOnly: true,
      },
      ObjectIdentifier: {
        kind: "field",
        type: () => {
          return Asn1.Asn1Tag;
        },
        isStatic: true,
        isReadOnly: true,
      },
      PrimitiveBitString: {
        kind: "field",
        type: () => {
          return Asn1.Asn1Tag;
        },
        isStatic: true,
        isReadOnly: true,
      },
      PrimitiveOctetString: {
        kind: "field",
        type: () => {
          return Asn1.Asn1Tag;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Sequence: {
        kind: "field",
        type: () => {
          return Asn1.Asn1Tag;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SetOf: {
        kind: "field",
        type: () => {
          return Asn1.Asn1Tag;
        },
        isStatic: true,
        isReadOnly: true,
      },
      UtcTime: {
        kind: "field",
        type: () => {
          return Asn1.Asn1Tag;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Asn1Tag: {
        kind: "method",
        methodKind: "constructor",
      },
      AsConstructed: {
        kind: "method",
        methodKind: "ordinary",
      },
      AsPrimitive: {
        kind: "method",
        methodKind: "ordinary",
      },
      CalculateEncodedSize: {
        kind: "method",
        methodKind: "ordinary",
      },
      Decode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Encode: {
        kind: "method",
        methodKind: "ordinary",
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
      HasSameClassAndValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      TryDecode: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryEncode: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsConstructed: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      TagClass: {
        kind: "property",
        type: () => {
          return Asn1.TagClass;
        },
      },
      TagValue: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  AsnContentException: {
    kind: "class",
    members: {
      AsnContentException: {
        kind: "method",
        methodKind: "constructor",
      },
    },
  },
  AsnDecoder: {
    kind: "class",
    members: {
      DecodeLength: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadBitString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadBoolean: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadCharacterString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadEncodedValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadEnumeratedBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadEnumeratedValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadGeneralizedTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadInteger: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadIntegerBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadNamedBitList: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadNamedBitListValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadNull: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadObjectIdentifier: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadOctetString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadSequence: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadSetOf: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadUtcTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryDecodeLength: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadBitString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadCharacterString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadCharacterStringBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadEncodedValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadInt32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadInt64: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadOctetString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadPrimitiveBitString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadPrimitiveCharacterStringBytes: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadPrimitiveOctetString: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadUInt32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryReadUInt64: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  AsnEncodingRules: {
    kind: "enum",
    members: {
      BER: {
        kind: "field",
        type: () => {
          return Asn1.AsnEncodingRules;
        },
      },
      CER: {
        kind: "field",
        type: () => {
          return Asn1.AsnEncodingRules;
        },
      },
      DER: {
        kind: "field",
        type: () => {
          return Asn1.AsnEncodingRules;
        },
      },
    },
  },
  AsnReader: {
    kind: "class",
    members: {
      AsnReader: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      PeekContentBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      PeekEncodedValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      PeekTag: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadBitString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadBoolean: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadCharacterString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadEncodedValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadEnumeratedBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadEnumeratedValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadGeneralizedTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadInteger: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadIntegerBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadNamedBitList: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadNamedBitListValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadNull: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadObjectIdentifier: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadOctetString: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadSequence: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadSetOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadUtcTime: {
        kind: "method",
        methodKind: "ordinary",
      },
      ThrowIfNotEmpty: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadBitString: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadCharacterString: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadCharacterStringBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadOctetString: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadPrimitiveBitString: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadPrimitiveCharacterStringBytes: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadPrimitiveOctetString: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadUInt32: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryReadUInt64: {
        kind: "method",
        methodKind: "ordinary",
      },
      HasData: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      RuleSet: {
        kind: "property",
        type: () => {
          return Asn1.AsnEncodingRules;
        },
      },
    },
  },
  AsnReaderOptions: {
    kind: "struct",
    members: {
      SkipSetSortOrderVerification: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      UtcTimeTwoDigitYearMax: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  AsnWriter: {
    kind: "class",
    members: {
      Scope: {
        kind: "struct",
        members: {
          Dispose: {
            kind: "method",
            methodKind: "ordinary",
          },
        },
      },
    },
  },
  TagClass: {
    kind: "enum",
    members: {
      Universal: {
        kind: "field",
        type: () => {
          return Asn1.TagClass;
        },
      },
      Application: {
        kind: "field",
        type: () => {
          return Asn1.TagClass;
        },
      },
      ContextSpecific: {
        kind: "field",
        type: () => {
          return Asn1.TagClass;
        },
      },
      Private: {
        kind: "field",
        type: () => {
          return Asn1.TagClass;
        },
      },
    },
  },
  UniversalTagNumber: {
    kind: "enum",
    members: {
      EndOfContents: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      Boolean: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      Integer: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      BitString: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      OctetString: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      Null: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      ObjectIdentifier: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      ObjectDescriptor: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      External: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      InstanceOf: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      Real: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      Enumerated: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      Embedded: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      UTF8String: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      RelativeObjectIdentifier: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      Time: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      Sequence: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      SequenceOf: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      Set: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      SetOf: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      NumericString: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      PrintableString: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      T61String: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      TeletexString: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      VideotexString: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      IA5String: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      UtcTime: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      GeneralizedTime: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      GraphicString: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      ISO646String: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      VisibleString: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      GeneralString: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      UniversalString: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      UnrestrictedCharacterString: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      BMPString: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      Date: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      TimeOfDay: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      DateTime: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      Duration: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      ObjectIdentifierIRI: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
      RelativeObjectIdentifierIRI: {
        kind: "field",
        type: () => {
          return Asn1.UniversalTagNumber;
        },
      },
    },
  },
});
export default Asn1
