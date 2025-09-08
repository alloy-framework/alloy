import System from "../index.js";

import { createLibrary } from "#createLibrary";
export { default as Unicode } from "./Unicode/index.js";

const Text = createLibrary("System.Text", {
  Ascii: {
    kind: "class",
    members: {
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EqualsIgnoreCase: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromUtf16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToLower: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToLowerInPlace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUpper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUpperInPlace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUtf16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Trim: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TrimEnd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TrimStart: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  CompositeFormat: {
    kind: "class",
    members: {
      Parse: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Format: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MinimumArgumentCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  Decoder: {
    kind: "class",
    members: {
      Decoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Convert: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetCharCount: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetChars: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Fallback: {
        kind: "property",
        type: () => {
          return Text.DecoderFallback;
        },
      },
      FallbackBuffer: {
        kind: "property",
        type: () => {
          return Text.DecoderFallbackBuffer;
        },
      },
    },
    isAbstract: true,
  },
  DecoderExceptionFallback: {
    kind: "class",
    members: {
      DecoderExceptionFallback: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateFallbackBuffer: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
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
      MaxCharCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  DecoderExceptionFallbackBuffer: {
    kind: "class",
    members: {
      DecoderExceptionFallbackBuffer: {
        kind: "method",
        methodKind: "constructor",
      },
      Fallback: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetNextChar: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MovePrevious: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Remaining: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  DecoderFallback: {
    kind: "class",
    members: {
      DecoderFallback: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateFallbackBuffer: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ExceptionFallback: {
        kind: "property",
        type: () => {
          return Text.DecoderFallback;
        },
        isStatic: true,
      },
      MaxCharCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      ReplacementFallback: {
        kind: "property",
        type: () => {
          return Text.DecoderFallback;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  DecoderFallbackBuffer: {
    kind: "class",
    members: {
      DecoderFallbackBuffer: {
        kind: "method",
        methodKind: "constructor",
      },
      Fallback: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetNextChar: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MovePrevious: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Remaining: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  DecoderFallbackException: {
    kind: "class",
    members: {
      DecoderFallbackException: {
        kind: "method",
        methodKind: "constructor",
      },
      BytesUnknown: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isNullable: true,
      },
      Index: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  DecoderReplacementFallback: {
    kind: "class",
    members: {
      DecoderReplacementFallback: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateFallbackBuffer: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
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
      DefaultString: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MaxCharCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  DecoderReplacementFallbackBuffer: {
    kind: "class",
    members: {
      DecoderReplacementFallbackBuffer: {
        kind: "method",
        methodKind: "constructor",
      },
      Fallback: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetNextChar: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MovePrevious: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Remaining: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  Encoder: {
    kind: "class",
    members: {
      Encoder: {
        kind: "method",
        methodKind: "constructor",
      },
      Convert: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetByteCount: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetBytes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Fallback: {
        kind: "property",
        type: () => {
          return Text.EncoderFallback;
        },
      },
      FallbackBuffer: {
        kind: "property",
        type: () => {
          return Text.EncoderFallbackBuffer;
        },
      },
    },
    isAbstract: true,
  },
  EncoderExceptionFallback: {
    kind: "class",
    members: {
      EncoderExceptionFallback: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateFallbackBuffer: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
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
      MaxCharCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  EncoderExceptionFallbackBuffer: {
    kind: "class",
    members: {
      EncoderExceptionFallbackBuffer: {
        kind: "method",
        methodKind: "constructor",
      },
      Fallback: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetNextChar: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MovePrevious: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Remaining: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  EncoderFallback: {
    kind: "class",
    members: {
      EncoderFallback: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateFallbackBuffer: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      ExceptionFallback: {
        kind: "property",
        type: () => {
          return Text.EncoderFallback;
        },
        isStatic: true,
      },
      MaxCharCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
      ReplacementFallback: {
        kind: "property",
        type: () => {
          return Text.EncoderFallback;
        },
        isStatic: true,
      },
    },
    isAbstract: true,
  },
  EncoderFallbackBuffer: {
    kind: "class",
    members: {
      EncoderFallbackBuffer: {
        kind: "method",
        methodKind: "constructor",
      },
      Fallback: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetNextChar: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      MovePrevious: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Remaining: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isAbstract: true,
      },
    },
    isAbstract: true,
  },
  EncoderFallbackException: {
    kind: "class",
    members: {
      EncoderFallbackException: {
        kind: "method",
        methodKind: "constructor",
      },
      IsUnknownSurrogate: {
        kind: "method",
        methodKind: "ordinary",
      },
      CharUnknown: {
        kind: "property",
        type: () => {
          return System.Char;
        },
      },
      CharUnknownHigh: {
        kind: "property",
        type: () => {
          return System.Char;
        },
      },
      CharUnknownLow: {
        kind: "property",
        type: () => {
          return System.Char;
        },
      },
      Index: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  EncoderReplacementFallback: {
    kind: "class",
    members: {
      EncoderReplacementFallback: {
        kind: "method",
        methodKind: "constructor",
      },
      CreateFallbackBuffer: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
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
      DefaultString: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MaxCharCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  EncoderReplacementFallbackBuffer: {
    kind: "class",
    members: {
      EncoderReplacementFallbackBuffer: {
        kind: "method",
        methodKind: "constructor",
      },
      Fallback: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetNextChar: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      MovePrevious: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Remaining: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
    isSealed: true,
  },
  Encoding: {
    kind: "class",
    members: {
      Encoding: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Convert: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CreateTranscodingStream: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetByteCount: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetBytes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetCharCount: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetChars: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetDecoder: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEncoder: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEncoding: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetEncodings: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMaxByteCount: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetMaxCharCount: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetPreamble: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetString: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsAlwaysNormalized: {
        kind: "method",
        methodKind: "ordinary",
      },
      RegisterProvider: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryGetBytes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TryGetChars: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ASCII: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isStatic: true,
      },
      BigEndianUnicode: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isStatic: true,
      },
      BodyName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      CodePage: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      DecoderFallback: {
        kind: "property",
        type: () => {
          return Text.DecoderFallback;
        },
      },
      Default: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isStatic: true,
      },
      EncoderFallback: {
        kind: "property",
        type: () => {
          return Text.EncoderFallback;
        },
      },
      EncodingName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      HeaderName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      IsBrowserDisplay: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsBrowserSave: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsMailNewsDisplay: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsMailNewsSave: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSingleByte: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      Latin1: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isStatic: true,
      },
      Preamble: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
        isVirtual: true,
      },
      Unicode: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isStatic: true,
      },
      UTF32: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isStatic: true,
      },
      UTF7: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isStatic: true,
      },
      UTF8: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isStatic: true,
      },
      WebName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      WindowsCodePage: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  EncodingInfo: {
    kind: "class",
    members: {
      EncodingInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEncoding: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CodePage: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      DisplayName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  EncodingProvider: {
    kind: "class",
    members: {
      EncodingProvider: {
        kind: "method",
        methodKind: "constructor",
      },
      GetEncoding: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetEncodings: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  NormalizationForm: {
    kind: "enum",
    members: {
      FormC: {
        kind: "field",
        type: () => {
          return Text.NormalizationForm;
        },
      },
      FormD: {
        kind: "field",
        type: () => {
          return Text.NormalizationForm;
        },
      },
      FormKC: {
        kind: "field",
        type: () => {
          return Text.NormalizationForm;
        },
      },
      FormKD: {
        kind: "field",
        type: () => {
          return Text.NormalizationForm;
        },
      },
    },
  },
  Rune: {
    kind: "struct",
    members: {
      Rune: {
        kind: "method",
        methodKind: "constructor",
      },
      CompareTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      DecodeFromUtf16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DecodeFromUtf8: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DecodeLastFromUtf16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      DecodeLastFromUtf8: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      EncodeToUtf16: {
        kind: "method",
        methodKind: "ordinary",
      },
      EncodeToUtf8: {
        kind: "method",
        methodKind: "ordinary",
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
      GetNumericValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetRuneAt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetUnicodeCategory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsControl: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsDigit: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsLetter: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsLetterOrDigit: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsLower: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsNumber: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsPunctuation: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSeparator: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSymbol: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsUpper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsValid: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsWhiteSpace: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToLower: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToLowerInvariant: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToUpper: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToUpperInvariant: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryCreate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryEncodeToUtf16: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryEncodeToUtf8: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetRuneAt: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsAscii: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsBmp: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Plane: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ReplacementChar: {
        kind: "property",
        type: () => {
          return Text.Rune;
        },
        isStatic: true,
      },
      Utf16SequenceLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Utf8SequenceLength: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  StringBuilder: {
    kind: "class",
    members: {
      ChunkEnumerator: {
        kind: "struct",
        members: {
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return System.ReadOnlyMemory;
            },
          },
        },
      },
    },
  },
  StringRuneEnumerator: {
    kind: "struct",
    members: {
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      MoveNext: {
        kind: "method",
        methodKind: "ordinary",
      },
      Current: {
        kind: "property",
        type: () => {
          return Text.Rune;
        },
      },
    },
  },
});
export default Text
