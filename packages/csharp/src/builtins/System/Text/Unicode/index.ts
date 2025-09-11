import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type UnicodeLibrary = LibrarySymbolReference & {
  UnicodeRange: LibrarySymbolReference & {
    UnicodeRange: LibrarySymbolReference;
    Create: LibrarySymbolReference;
    FirstCodePoint: LibrarySymbolReference;
    Length: LibrarySymbolReference
  };
  UnicodeRanges: LibrarySymbolReference & {
    All: LibrarySymbolReference;
    AlphabeticPresentationForms: LibrarySymbolReference;
    Arabic: LibrarySymbolReference;
    ArabicExtendedA: LibrarySymbolReference;
    ArabicExtendedB: LibrarySymbolReference;
    ArabicPresentationFormsA: LibrarySymbolReference;
    ArabicPresentationFormsB: LibrarySymbolReference;
    ArabicSupplement: LibrarySymbolReference;
    Armenian: LibrarySymbolReference;
    Arrows: LibrarySymbolReference;
    Balinese: LibrarySymbolReference;
    Bamum: LibrarySymbolReference;
    BasicLatin: LibrarySymbolReference;
    Batak: LibrarySymbolReference;
    Bengali: LibrarySymbolReference;
    BlockElements: LibrarySymbolReference;
    Bopomofo: LibrarySymbolReference;
    BopomofoExtended: LibrarySymbolReference;
    BoxDrawing: LibrarySymbolReference;
    BraillePatterns: LibrarySymbolReference;
    Buginese: LibrarySymbolReference;
    Buhid: LibrarySymbolReference;
    Cham: LibrarySymbolReference;
    Cherokee: LibrarySymbolReference;
    CherokeeSupplement: LibrarySymbolReference;
    CjkCompatibility: LibrarySymbolReference;
    CjkCompatibilityForms: LibrarySymbolReference;
    CjkCompatibilityIdeographs: LibrarySymbolReference;
    CjkRadicalsSupplement: LibrarySymbolReference;
    CjkStrokes: LibrarySymbolReference;
    CjkSymbolsandPunctuation: LibrarySymbolReference;
    CjkUnifiedIdeographs: LibrarySymbolReference;
    CjkUnifiedIdeographsExtensionA: LibrarySymbolReference;
    CombiningDiacriticalMarks: LibrarySymbolReference;
    CombiningDiacriticalMarksExtended: LibrarySymbolReference;
    CombiningDiacriticalMarksforSymbols: LibrarySymbolReference;
    CombiningDiacriticalMarksSupplement: LibrarySymbolReference;
    CombiningHalfMarks: LibrarySymbolReference;
    CommonIndicNumberForms: LibrarySymbolReference;
    ControlPictures: LibrarySymbolReference;
    Coptic: LibrarySymbolReference;
    CurrencySymbols: LibrarySymbolReference;
    Cyrillic: LibrarySymbolReference;
    CyrillicExtendedA: LibrarySymbolReference;
    CyrillicExtendedB: LibrarySymbolReference;
    CyrillicExtendedC: LibrarySymbolReference;
    CyrillicSupplement: LibrarySymbolReference;
    Devanagari: LibrarySymbolReference;
    DevanagariExtended: LibrarySymbolReference;
    Dingbats: LibrarySymbolReference;
    EnclosedAlphanumerics: LibrarySymbolReference;
    EnclosedCjkLettersandMonths: LibrarySymbolReference;
    Ethiopic: LibrarySymbolReference;
    EthiopicExtended: LibrarySymbolReference;
    EthiopicExtendedA: LibrarySymbolReference;
    EthiopicSupplement: LibrarySymbolReference;
    GeneralPunctuation: LibrarySymbolReference;
    GeometricShapes: LibrarySymbolReference;
    Georgian: LibrarySymbolReference;
    GeorgianExtended: LibrarySymbolReference;
    GeorgianSupplement: LibrarySymbolReference;
    Glagolitic: LibrarySymbolReference;
    GreekandCoptic: LibrarySymbolReference;
    GreekExtended: LibrarySymbolReference;
    Gujarati: LibrarySymbolReference;
    Gurmukhi: LibrarySymbolReference;
    HalfwidthandFullwidthForms: LibrarySymbolReference;
    HangulCompatibilityJamo: LibrarySymbolReference;
    HangulJamo: LibrarySymbolReference;
    HangulJamoExtendedA: LibrarySymbolReference;
    HangulJamoExtendedB: LibrarySymbolReference;
    HangulSyllables: LibrarySymbolReference;
    Hanunoo: LibrarySymbolReference;
    Hebrew: LibrarySymbolReference;
    Hiragana: LibrarySymbolReference;
    IdeographicDescriptionCharacters: LibrarySymbolReference;
    IpaExtensions: LibrarySymbolReference;
    Javanese: LibrarySymbolReference;
    Kanbun: LibrarySymbolReference;
    KangxiRadicals: LibrarySymbolReference;
    Kannada: LibrarySymbolReference;
    Katakana: LibrarySymbolReference;
    KatakanaPhoneticExtensions: LibrarySymbolReference;
    KayahLi: LibrarySymbolReference;
    Khmer: LibrarySymbolReference;
    KhmerSymbols: LibrarySymbolReference;
    Lao: LibrarySymbolReference;
    Latin1Supplement: LibrarySymbolReference;
    LatinExtendedA: LibrarySymbolReference;
    LatinExtendedAdditional: LibrarySymbolReference;
    LatinExtendedB: LibrarySymbolReference;
    LatinExtendedC: LibrarySymbolReference;
    LatinExtendedD: LibrarySymbolReference;
    LatinExtendedE: LibrarySymbolReference;
    Lepcha: LibrarySymbolReference;
    LetterlikeSymbols: LibrarySymbolReference;
    Limbu: LibrarySymbolReference;
    Lisu: LibrarySymbolReference;
    Malayalam: LibrarySymbolReference;
    Mandaic: LibrarySymbolReference;
    MathematicalOperators: LibrarySymbolReference;
    MeeteiMayek: LibrarySymbolReference;
    MeeteiMayekExtensions: LibrarySymbolReference;
    MiscellaneousMathematicalSymbolsA: LibrarySymbolReference;
    MiscellaneousMathematicalSymbolsB: LibrarySymbolReference;
    MiscellaneousSymbols: LibrarySymbolReference;
    MiscellaneousSymbolsandArrows: LibrarySymbolReference;
    MiscellaneousTechnical: LibrarySymbolReference;
    ModifierToneLetters: LibrarySymbolReference;
    Mongolian: LibrarySymbolReference;
    Myanmar: LibrarySymbolReference;
    MyanmarExtendedA: LibrarySymbolReference;
    MyanmarExtendedB: LibrarySymbolReference;
    NewTaiLue: LibrarySymbolReference;
    NKo: LibrarySymbolReference;
    None: LibrarySymbolReference;
    NumberForms: LibrarySymbolReference;
    Ogham: LibrarySymbolReference;
    OlChiki: LibrarySymbolReference;
    OpticalCharacterRecognition: LibrarySymbolReference;
    Oriya: LibrarySymbolReference;
    Phagspa: LibrarySymbolReference;
    PhoneticExtensions: LibrarySymbolReference;
    PhoneticExtensionsSupplement: LibrarySymbolReference;
    Rejang: LibrarySymbolReference;
    Runic: LibrarySymbolReference;
    Samaritan: LibrarySymbolReference;
    Saurashtra: LibrarySymbolReference;
    Sinhala: LibrarySymbolReference;
    SmallFormVariants: LibrarySymbolReference;
    SpacingModifierLetters: LibrarySymbolReference;
    Specials: LibrarySymbolReference;
    Sundanese: LibrarySymbolReference;
    SundaneseSupplement: LibrarySymbolReference;
    SuperscriptsandSubscripts: LibrarySymbolReference;
    SupplementalArrowsA: LibrarySymbolReference;
    SupplementalArrowsB: LibrarySymbolReference;
    SupplementalMathematicalOperators: LibrarySymbolReference;
    SupplementalPunctuation: LibrarySymbolReference;
    SylotiNagri: LibrarySymbolReference;
    Syriac: LibrarySymbolReference;
    SyriacSupplement: LibrarySymbolReference;
    Tagalog: LibrarySymbolReference;
    Tagbanwa: LibrarySymbolReference;
    TaiLe: LibrarySymbolReference;
    TaiTham: LibrarySymbolReference;
    TaiViet: LibrarySymbolReference;
    Tamil: LibrarySymbolReference;
    Telugu: LibrarySymbolReference;
    Thaana: LibrarySymbolReference;
    Thai: LibrarySymbolReference;
    Tibetan: LibrarySymbolReference;
    Tifinagh: LibrarySymbolReference;
    UnifiedCanadianAboriginalSyllabics: LibrarySymbolReference;
    UnifiedCanadianAboriginalSyllabicsExtended: LibrarySymbolReference;
    Vai: LibrarySymbolReference;
    VariationSelectors: LibrarySymbolReference;
    VedicExtensions: LibrarySymbolReference;
    VerticalForms: LibrarySymbolReference;
    YijingHexagramSymbols: LibrarySymbolReference;
    YiRadicals: LibrarySymbolReference;
    YiSyllables: LibrarySymbolReference
  };
  Utf8: LibrarySymbolReference & {
    FromUtf16: LibrarySymbolReference;
    IsValid: LibrarySymbolReference;
    ToUtf16: LibrarySymbolReference;
    TryWrite: LibrarySymbolReference
  }
};
const Unicode: UnicodeLibrary = createLibrary("System.Text.Unicode", {
  UnicodeRange: {
    kind: "class",
    members: {
      UnicodeRange: {
        kind: "method",
        methodKind: "constructor",
      },
      Create: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FirstCodePoint: {
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
    isSealed: true,
  },
  UnicodeRanges: {
    kind: "class",
    members: {
      All: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      AlphabeticPresentationForms: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Arabic: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      ArabicExtendedA: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      ArabicExtendedB: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      ArabicPresentationFormsA: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      ArabicPresentationFormsB: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      ArabicSupplement: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Armenian: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Arrows: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Balinese: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Bamum: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      BasicLatin: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Batak: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Bengali: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      BlockElements: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Bopomofo: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      BopomofoExtended: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      BoxDrawing: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      BraillePatterns: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Buginese: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Buhid: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Cham: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Cherokee: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CherokeeSupplement: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CjkCompatibility: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CjkCompatibilityForms: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CjkCompatibilityIdeographs: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CjkRadicalsSupplement: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CjkStrokes: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CjkSymbolsandPunctuation: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CjkUnifiedIdeographs: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CjkUnifiedIdeographsExtensionA: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CombiningDiacriticalMarks: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CombiningDiacriticalMarksExtended: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CombiningDiacriticalMarksforSymbols: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CombiningDiacriticalMarksSupplement: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CombiningHalfMarks: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CommonIndicNumberForms: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      ControlPictures: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Coptic: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CurrencySymbols: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Cyrillic: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CyrillicExtendedA: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CyrillicExtendedB: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CyrillicExtendedC: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      CyrillicSupplement: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Devanagari: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      DevanagariExtended: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Dingbats: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      EnclosedAlphanumerics: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      EnclosedCjkLettersandMonths: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Ethiopic: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      EthiopicExtended: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      EthiopicExtendedA: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      EthiopicSupplement: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      GeneralPunctuation: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      GeometricShapes: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Georgian: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      GeorgianExtended: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      GeorgianSupplement: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Glagolitic: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      GreekandCoptic: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      GreekExtended: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Gujarati: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Gurmukhi: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      HalfwidthandFullwidthForms: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      HangulCompatibilityJamo: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      HangulJamo: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      HangulJamoExtendedA: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      HangulJamoExtendedB: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      HangulSyllables: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Hanunoo: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Hebrew: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Hiragana: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      IdeographicDescriptionCharacters: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      IpaExtensions: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Javanese: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Kanbun: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      KangxiRadicals: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Kannada: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Katakana: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      KatakanaPhoneticExtensions: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      KayahLi: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Khmer: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      KhmerSymbols: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Lao: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Latin1Supplement: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      LatinExtendedA: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      LatinExtendedAdditional: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      LatinExtendedB: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      LatinExtendedC: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      LatinExtendedD: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      LatinExtendedE: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Lepcha: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      LetterlikeSymbols: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Limbu: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Lisu: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Malayalam: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Mandaic: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      MathematicalOperators: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      MeeteiMayek: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      MeeteiMayekExtensions: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      MiscellaneousMathematicalSymbolsA: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      MiscellaneousMathematicalSymbolsB: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      MiscellaneousSymbols: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      MiscellaneousSymbolsandArrows: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      MiscellaneousTechnical: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      ModifierToneLetters: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Mongolian: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Myanmar: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      MyanmarExtendedA: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      MyanmarExtendedB: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      NewTaiLue: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      NKo: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      None: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      NumberForms: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Ogham: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      OlChiki: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      OpticalCharacterRecognition: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Oriya: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Phagspa: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      PhoneticExtensions: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      PhoneticExtensionsSupplement: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Rejang: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Runic: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Samaritan: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Saurashtra: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Sinhala: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      SmallFormVariants: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      SpacingModifierLetters: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Specials: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Sundanese: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      SundaneseSupplement: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      SuperscriptsandSubscripts: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      SupplementalArrowsA: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      SupplementalArrowsB: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      SupplementalMathematicalOperators: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      SupplementalPunctuation: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      SylotiNagri: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Syriac: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      SyriacSupplement: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Tagalog: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Tagbanwa: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      TaiLe: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      TaiTham: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      TaiViet: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Tamil: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Telugu: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Thaana: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Thai: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Tibetan: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Tifinagh: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      UnifiedCanadianAboriginalSyllabics: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      UnifiedCanadianAboriginalSyllabicsExtended: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      Vai: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      VariationSelectors: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      VedicExtensions: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      VerticalForms: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      YijingHexagramSymbols: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      YiRadicals: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
      YiSyllables: {
        kind: "property",
        type: () => {
          return Unicode.UnicodeRange;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
  Utf8: {
    kind: "class",
    members: {
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
      ToUtf16: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TryWrite: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Unicode
