import Generic from "../../Collections/Generic/index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type RegularExpressionsLibrary = LibrarySymbolReference & {
  Capture: LibrarySymbolReference & {
    ToString: LibrarySymbolReference;
    Index: LibrarySymbolReference;
    Length: LibrarySymbolReference;
    Value: LibrarySymbolReference;
    ValueSpan: LibrarySymbolReference
  };
  CaptureCollection: LibrarySymbolReference & {
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  GeneratedRegexAttribute: LibrarySymbolReference & {
    GeneratedRegexAttribute: LibrarySymbolReference;
    CultureName: LibrarySymbolReference;
    Pattern: LibrarySymbolReference;
    Options: LibrarySymbolReference;
    MatchTimeoutMilliseconds: LibrarySymbolReference
  };
  Group: LibrarySymbolReference & {
    Synchronized: LibrarySymbolReference;
    Captures: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Success: LibrarySymbolReference
  };
  GroupCollection: LibrarySymbolReference & {
    ContainsKey: LibrarySymbolReference;
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    TryGetValue: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    Keys: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference;
    Values: LibrarySymbolReference
  };
  Match: LibrarySymbolReference & {
    NextMatch: LibrarySymbolReference;
    Result: LibrarySymbolReference;
    Synchronized: LibrarySymbolReference;
    Empty: LibrarySymbolReference;
    Groups: LibrarySymbolReference
  };
  MatchCollection: LibrarySymbolReference & {
    CopyTo: LibrarySymbolReference;
    GetEnumerator: LibrarySymbolReference;
    Count: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsSynchronized: LibrarySymbolReference;
    Item: LibrarySymbolReference;
    SyncRoot: LibrarySymbolReference
  };
  MatchEvaluator: LibrarySymbolReference & {
    MatchEvaluator: LibrarySymbolReference;
    Invoke: LibrarySymbolReference;
    BeginInvoke: LibrarySymbolReference;
    EndInvoke: LibrarySymbolReference
  };
  Regex: LibrarySymbolReference & {
    ValueMatchEnumerator: LibrarySymbolReference & {
      GetEnumerator: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    };
    ValueSplitEnumerator: LibrarySymbolReference & {
      GetEnumerator: LibrarySymbolReference;
      MoveNext: LibrarySymbolReference;
      Current: LibrarySymbolReference
    }
  };
  RegexCompilationInfo: LibrarySymbolReference & {
    RegexCompilationInfo: LibrarySymbolReference;
    IsPublic: LibrarySymbolReference;
    MatchTimeout: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Namespace: LibrarySymbolReference;
    Options: LibrarySymbolReference;
    Pattern: LibrarySymbolReference
  };
  RegexMatchTimeoutException: LibrarySymbolReference & {
    RegexMatchTimeoutException: LibrarySymbolReference;
    Input: LibrarySymbolReference;
    MatchTimeout: LibrarySymbolReference;
    Pattern: LibrarySymbolReference
  };
  RegexOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    IgnoreCase: LibrarySymbolReference;
    Multiline: LibrarySymbolReference;
    ExplicitCapture: LibrarySymbolReference;
    Compiled: LibrarySymbolReference;
    Singleline: LibrarySymbolReference;
    IgnorePatternWhitespace: LibrarySymbolReference;
    RightToLeft: LibrarySymbolReference;
    ECMAScript: LibrarySymbolReference;
    CultureInvariant: LibrarySymbolReference;
    NonBacktracking: LibrarySymbolReference
  };
  RegexParseError: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    AlternationHasTooManyConditions: LibrarySymbolReference;
    AlternationHasMalformedCondition: LibrarySymbolReference;
    InvalidUnicodePropertyEscape: LibrarySymbolReference;
    MalformedUnicodePropertyEscape: LibrarySymbolReference;
    UnrecognizedEscape: LibrarySymbolReference;
    UnrecognizedControlCharacter: LibrarySymbolReference;
    MissingControlCharacter: LibrarySymbolReference;
    InsufficientOrInvalidHexDigits: LibrarySymbolReference;
    QuantifierOrCaptureGroupOutOfRange: LibrarySymbolReference;
    UndefinedNamedReference: LibrarySymbolReference;
    UndefinedNumberedReference: LibrarySymbolReference;
    MalformedNamedReference: LibrarySymbolReference;
    UnescapedEndingBackslash: LibrarySymbolReference;
    UnterminatedComment: LibrarySymbolReference;
    InvalidGroupingConstruct: LibrarySymbolReference;
    AlternationHasNamedCapture: LibrarySymbolReference;
    AlternationHasComment: LibrarySymbolReference;
    AlternationHasMalformedReference: LibrarySymbolReference;
    AlternationHasUndefinedReference: LibrarySymbolReference;
    CaptureGroupNameInvalid: LibrarySymbolReference;
    CaptureGroupOfZero: LibrarySymbolReference;
    UnterminatedBracket: LibrarySymbolReference;
    ExclusionGroupNotLast: LibrarySymbolReference;
    ReversedCharacterRange: LibrarySymbolReference;
    ShorthandClassInCharacterRange: LibrarySymbolReference;
    InsufficientClosingParentheses: LibrarySymbolReference;
    ReversedQuantifierRange: LibrarySymbolReference;
    NestedQuantifiersNotParenthesized: LibrarySymbolReference;
    QuantifierAfterNothing: LibrarySymbolReference;
    InsufficientOpeningParentheses: LibrarySymbolReference;
    UnrecognizedUnicodeProperty: LibrarySymbolReference
  };
  RegexParseException: LibrarySymbolReference & {
    Error: LibrarySymbolReference;
    Offset: LibrarySymbolReference
  };
  ValueMatch: LibrarySymbolReference & {
    Index: LibrarySymbolReference;
    Length: LibrarySymbolReference
  }
};
const RegularExpressions: RegularExpressionsLibrary = createLibrary("System.Text.RegularExpressions", {
  Capture: {
    kind: "class",
    members: {
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Index: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Value: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ValueSpan: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
      },
    },
  },
  CaptureCollection: {
    kind: "class",
    members: {
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSynchronized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return RegularExpressions.Capture;
        },
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
  },
  GeneratedRegexAttribute: {
    kind: "class",
    members: {
      GeneratedRegexAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      CultureName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Pattern: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Options: {
        kind: "property",
        type: () => {
          return RegularExpressions.RegexOptions;
        },
      },
      MatchTimeoutMilliseconds: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  Group: {
    kind: "class",
    members: {
      Synchronized: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Captures: {
        kind: "property",
        type: () => {
          return RegularExpressions.CaptureCollection;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Success: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  GroupCollection: {
    kind: "class",
    members: {
      ContainsKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      TryGetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSynchronized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return RegularExpressions.Group;
        },
      },
      Keys: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
      Values: {
        kind: "property",
        type: () => {
          return Generic.IEnumerable;
        },
      },
    },
  },
  Match: {
    kind: "class",
    members: {
      NextMatch: {
        kind: "method",
        methodKind: "ordinary",
      },
      Result: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Synchronized: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Empty: {
        kind: "property",
        type: () => {
          return RegularExpressions.Match;
        },
        isStatic: true,
      },
      Groups: {
        kind: "property",
        type: () => {
          return RegularExpressions.GroupCollection;
        },
        isVirtual: true,
      },
    },
  },
  MatchCollection: {
    kind: "class",
    members: {
      CopyTo: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEnumerator: {
        kind: "method",
        methodKind: "ordinary",
      },
      Count: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSynchronized: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Item: {
        kind: "property",
        type: () => {
          return RegularExpressions.Match;
        },
        isVirtual: true,
      },
      SyncRoot: {
        kind: "property",
        type: () => {
          return System.Object;
        },
      },
    },
  },
  MatchEvaluator: {
    kind: "generic",
    members: {
      MatchEvaluator: {
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
  Regex: {
    kind: "class",
    members: {
      ValueMatchEnumerator: {
        kind: "struct",
        members: {
          GetEnumerator: {
            kind: "method",
            methodKind: "ordinary",
            isReadOnly: true,
          },
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return RegularExpressions.ValueMatch;
            },
            isReadOnly: true,
          },
        },
      },
      ValueSplitEnumerator: {
        kind: "struct",
        members: {
          GetEnumerator: {
            kind: "method",
            methodKind: "ordinary",
            isReadOnly: true,
          },
          MoveNext: {
            kind: "method",
            methodKind: "ordinary",
          },
          Current: {
            kind: "property",
            type: () => {
              return System.Range;
            },
            isReadOnly: true,
          },
        },
      },
    },
  },
  RegexCompilationInfo: {
    kind: "class",
    members: {
      RegexCompilationInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      IsPublic: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MatchTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Namespace: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Options: {
        kind: "property",
        type: () => {
          return RegularExpressions.RegexOptions;
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
  RegexMatchTimeoutException: {
    kind: "class",
    members: {
      RegexMatchTimeoutException: {
        kind: "method",
        methodKind: "constructor",
      },
      Input: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MatchTimeout: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
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
  RegexOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexOptions;
        },
      },
      IgnoreCase: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexOptions;
        },
      },
      Multiline: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexOptions;
        },
      },
      ExplicitCapture: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexOptions;
        },
      },
      Compiled: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexOptions;
        },
      },
      Singleline: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexOptions;
        },
      },
      IgnorePatternWhitespace: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexOptions;
        },
      },
      RightToLeft: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexOptions;
        },
      },
      ECMAScript: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexOptions;
        },
      },
      CultureInvariant: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexOptions;
        },
      },
      NonBacktracking: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexOptions;
        },
      },
    },
  },
  RegexParseError: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      AlternationHasTooManyConditions: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      AlternationHasMalformedCondition: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      InvalidUnicodePropertyEscape: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      MalformedUnicodePropertyEscape: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      UnrecognizedEscape: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      UnrecognizedControlCharacter: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      MissingControlCharacter: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      InsufficientOrInvalidHexDigits: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      QuantifierOrCaptureGroupOutOfRange: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      UndefinedNamedReference: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      UndefinedNumberedReference: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      MalformedNamedReference: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      UnescapedEndingBackslash: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      UnterminatedComment: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      InvalidGroupingConstruct: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      AlternationHasNamedCapture: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      AlternationHasComment: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      AlternationHasMalformedReference: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      AlternationHasUndefinedReference: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      CaptureGroupNameInvalid: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      CaptureGroupOfZero: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      UnterminatedBracket: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      ExclusionGroupNotLast: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      ReversedCharacterRange: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      ShorthandClassInCharacterRange: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      InsufficientClosingParentheses: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      ReversedQuantifierRange: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      NestedQuantifiersNotParenthesized: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      QuantifierAfterNothing: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      InsufficientOpeningParentheses: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      UnrecognizedUnicodeProperty: {
        kind: "field",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
    },
  },
  RegexParseException: {
    kind: "class",
    members: {
      Error: {
        kind: "property",
        type: () => {
          return RegularExpressions.RegexParseError;
        },
      },
      Offset: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  ValueMatch: {
    kind: "struct",
    members: {
      Index: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
});
export default RegularExpressions
