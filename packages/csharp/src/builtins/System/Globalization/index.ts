import System from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type GlobalizationLibrary = LibrarySymbolReference & {
  Calendar: LibrarySymbolReference & {
    CurrentEra: LibrarySymbolReference;
    Calendar: LibrarySymbolReference;
    AddDays: LibrarySymbolReference;
    AddHours: LibrarySymbolReference;
    AddMilliseconds: LibrarySymbolReference;
    AddMinutes: LibrarySymbolReference;
    AddMonths: LibrarySymbolReference;
    AddSeconds: LibrarySymbolReference;
    AddWeeks: LibrarySymbolReference;
    AddYears: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    GetDayOfMonth: LibrarySymbolReference;
    GetDayOfWeek: LibrarySymbolReference;
    GetDayOfYear: LibrarySymbolReference;
    GetDaysInMonth: LibrarySymbolReference;
    GetDaysInYear: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    GetHour: LibrarySymbolReference;
    GetLeapMonth: LibrarySymbolReference;
    GetMilliseconds: LibrarySymbolReference;
    GetMinute: LibrarySymbolReference;
    GetMonth: LibrarySymbolReference;
    GetMonthsInYear: LibrarySymbolReference;
    GetSecond: LibrarySymbolReference;
    GetWeekOfYear: LibrarySymbolReference;
    GetYear: LibrarySymbolReference;
    IsLeapDay: LibrarySymbolReference;
    IsLeapMonth: LibrarySymbolReference;
    IsLeapYear: LibrarySymbolReference;
    ReadOnly: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToFourDigitYear: LibrarySymbolReference;
    AlgorithmType: LibrarySymbolReference;
    DaysInYearBeforeMinSupportedYear: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference;
    TwoDigitYearMax: LibrarySymbolReference
  };
  CalendarAlgorithmType: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    SolarCalendar: LibrarySymbolReference;
    LunarCalendar: LibrarySymbolReference;
    LunisolarCalendar: LibrarySymbolReference
  };
  CalendarWeekRule: LibrarySymbolReference & {
    FirstDay: LibrarySymbolReference;
    FirstFullWeek: LibrarySymbolReference;
    FirstFourDayWeek: LibrarySymbolReference
  };
  CharUnicodeInfo: LibrarySymbolReference & {
    GetDecimalDigitValue: LibrarySymbolReference;
    GetDigitValue: LibrarySymbolReference;
    GetNumericValue: LibrarySymbolReference;
    GetUnicodeCategory: LibrarySymbolReference
  };
  ChineseLunisolarCalendar: LibrarySymbolReference & {
    ChineseEra: LibrarySymbolReference;
    ChineseLunisolarCalendar: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    DaysInYearBeforeMinSupportedYear: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference
  };
  CompareInfo: LibrarySymbolReference & {
    Compare: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetCompareInfo: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetSortKey: LibrarySymbolReference;
    GetSortKeyLength: LibrarySymbolReference;
    IndexOf: LibrarySymbolReference;
    IsPrefix: LibrarySymbolReference;
    IsSortable: LibrarySymbolReference;
    IsSuffix: LibrarySymbolReference;
    LastIndexOf: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    LCID: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  CompareOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    IgnoreCase: LibrarySymbolReference;
    IgnoreNonSpace: LibrarySymbolReference;
    IgnoreSymbols: LibrarySymbolReference;
    IgnoreKanaType: LibrarySymbolReference;
    IgnoreWidth: LibrarySymbolReference;
    OrdinalIgnoreCase: LibrarySymbolReference;
    StringSort: LibrarySymbolReference;
    Ordinal: LibrarySymbolReference
  };
  CultureInfo: LibrarySymbolReference & {
    CultureInfo: LibrarySymbolReference;
    ClearCachedData: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    CreateSpecificCulture: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetConsoleFallbackUICulture: LibrarySymbolReference;
    GetCultureInfo: LibrarySymbolReference;
    GetCultureInfoByIetfLanguageTag: LibrarySymbolReference;
    GetCultures: LibrarySymbolReference;
    GetFormat: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ReadOnly: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Calendar: LibrarySymbolReference;
    CompareInfo: LibrarySymbolReference;
    CultureTypes: LibrarySymbolReference;
    CurrentCulture: LibrarySymbolReference;
    CurrentUICulture: LibrarySymbolReference;
    DateTimeFormat: LibrarySymbolReference;
    DefaultThreadCurrentCulture: LibrarySymbolReference;
    DefaultThreadCurrentUICulture: LibrarySymbolReference;
    DisplayName: LibrarySymbolReference;
    EnglishName: LibrarySymbolReference;
    IetfLanguageTag: LibrarySymbolReference;
    InstalledUICulture: LibrarySymbolReference;
    InvariantCulture: LibrarySymbolReference;
    IsNeutralCulture: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    KeyboardLayoutId: LibrarySymbolReference;
    LCID: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NativeName: LibrarySymbolReference;
    NumberFormat: LibrarySymbolReference;
    OptionalCalendars: LibrarySymbolReference;
    Parent: LibrarySymbolReference;
    TextInfo: LibrarySymbolReference;
    ThreeLetterISOLanguageName: LibrarySymbolReference;
    ThreeLetterWindowsLanguageName: LibrarySymbolReference;
    TwoLetterISOLanguageName: LibrarySymbolReference;
    UseUserOverride: LibrarySymbolReference
  };
  CultureNotFoundException: LibrarySymbolReference & {
    CultureNotFoundException: LibrarySymbolReference;
    InvalidCultureId: LibrarySymbolReference;
    InvalidCultureName: LibrarySymbolReference;
    Message: LibrarySymbolReference
  };
  CultureTypes: LibrarySymbolReference & {
    NeutralCultures: LibrarySymbolReference;
    SpecificCultures: LibrarySymbolReference;
    InstalledWin32Cultures: LibrarySymbolReference;
    AllCultures: LibrarySymbolReference;
    UserCustomCulture: LibrarySymbolReference;
    ReplacementCultures: LibrarySymbolReference;
    WindowsOnlyCultures: LibrarySymbolReference;
    FrameworkCultures: LibrarySymbolReference
  };
  DateTimeFormatInfo: LibrarySymbolReference & {
    DateTimeFormatInfo: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    GetAbbreviatedDayName: LibrarySymbolReference;
    GetAbbreviatedEraName: LibrarySymbolReference;
    GetAbbreviatedMonthName: LibrarySymbolReference;
    GetAllDateTimePatterns: LibrarySymbolReference;
    GetDayName: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    GetEraName: LibrarySymbolReference;
    GetFormat: LibrarySymbolReference;
    GetInstance: LibrarySymbolReference;
    GetMonthName: LibrarySymbolReference;
    GetShortestDayName: LibrarySymbolReference;
    ReadOnly: LibrarySymbolReference;
    SetAllDateTimePatterns: LibrarySymbolReference;
    AbbreviatedDayNames: LibrarySymbolReference;
    AbbreviatedMonthGenitiveNames: LibrarySymbolReference;
    AbbreviatedMonthNames: LibrarySymbolReference;
    AMDesignator: LibrarySymbolReference;
    Calendar: LibrarySymbolReference;
    CalendarWeekRule: LibrarySymbolReference;
    CurrentInfo: LibrarySymbolReference;
    DateSeparator: LibrarySymbolReference;
    DayNames: LibrarySymbolReference;
    FirstDayOfWeek: LibrarySymbolReference;
    FullDateTimePattern: LibrarySymbolReference;
    InvariantInfo: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    LongDatePattern: LibrarySymbolReference;
    LongTimePattern: LibrarySymbolReference;
    MonthDayPattern: LibrarySymbolReference;
    MonthGenitiveNames: LibrarySymbolReference;
    MonthNames: LibrarySymbolReference;
    NativeCalendarName: LibrarySymbolReference;
    PMDesignator: LibrarySymbolReference;
    RFC1123Pattern: LibrarySymbolReference;
    ShortDatePattern: LibrarySymbolReference;
    ShortestDayNames: LibrarySymbolReference;
    ShortTimePattern: LibrarySymbolReference;
    SortableDateTimePattern: LibrarySymbolReference;
    TimeSeparator: LibrarySymbolReference;
    UniversalSortableDateTimePattern: LibrarySymbolReference;
    YearMonthPattern: LibrarySymbolReference
  };
  DateTimeStyles: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    AllowLeadingWhite: LibrarySymbolReference;
    AllowTrailingWhite: LibrarySymbolReference;
    AllowInnerWhite: LibrarySymbolReference;
    AllowWhiteSpaces: LibrarySymbolReference;
    NoCurrentDateDefault: LibrarySymbolReference;
    AdjustToUniversal: LibrarySymbolReference;
    AssumeLocal: LibrarySymbolReference;
    AssumeUniversal: LibrarySymbolReference;
    RoundtripKind: LibrarySymbolReference
  };
  DaylightTime: LibrarySymbolReference & {
    DaylightTime: LibrarySymbolReference;
    Delta: LibrarySymbolReference;
    End: LibrarySymbolReference;
    Start: LibrarySymbolReference
  };
  DigitShapes: LibrarySymbolReference & {
    Context: LibrarySymbolReference;
    None: LibrarySymbolReference;
    NativeNational: LibrarySymbolReference
  };
  EastAsianLunisolarCalendar: LibrarySymbolReference & {
    AddMonths: LibrarySymbolReference;
    AddYears: LibrarySymbolReference;
    GetCelestialStem: LibrarySymbolReference;
    GetDayOfMonth: LibrarySymbolReference;
    GetDayOfWeek: LibrarySymbolReference;
    GetDayOfYear: LibrarySymbolReference;
    GetDaysInMonth: LibrarySymbolReference;
    GetDaysInYear: LibrarySymbolReference;
    GetLeapMonth: LibrarySymbolReference;
    GetMonth: LibrarySymbolReference;
    GetMonthsInYear: LibrarySymbolReference;
    GetSexagenaryYear: LibrarySymbolReference;
    GetTerrestrialBranch: LibrarySymbolReference;
    GetYear: LibrarySymbolReference;
    IsLeapDay: LibrarySymbolReference;
    IsLeapMonth: LibrarySymbolReference;
    IsLeapYear: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToFourDigitYear: LibrarySymbolReference;
    AlgorithmType: LibrarySymbolReference;
    TwoDigitYearMax: LibrarySymbolReference
  };
  GlobalizationExtensions: LibrarySymbolReference & {
    GetStringComparer: LibrarySymbolReference
  };
  GregorianCalendar: LibrarySymbolReference & {
    ADEra: LibrarySymbolReference;
    GregorianCalendar: LibrarySymbolReference;
    AddMonths: LibrarySymbolReference;
    AddYears: LibrarySymbolReference;
    GetDayOfMonth: LibrarySymbolReference;
    GetDayOfWeek: LibrarySymbolReference;
    GetDayOfYear: LibrarySymbolReference;
    GetDaysInMonth: LibrarySymbolReference;
    GetDaysInYear: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    GetLeapMonth: LibrarySymbolReference;
    GetMonth: LibrarySymbolReference;
    GetMonthsInYear: LibrarySymbolReference;
    GetYear: LibrarySymbolReference;
    IsLeapDay: LibrarySymbolReference;
    IsLeapMonth: LibrarySymbolReference;
    IsLeapYear: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToFourDigitYear: LibrarySymbolReference;
    AlgorithmType: LibrarySymbolReference;
    CalendarType: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference;
    TwoDigitYearMax: LibrarySymbolReference
  };
  GregorianCalendarTypes: LibrarySymbolReference & {
    Localized: LibrarySymbolReference;
    USEnglish: LibrarySymbolReference;
    MiddleEastFrench: LibrarySymbolReference;
    Arabic: LibrarySymbolReference;
    TransliteratedEnglish: LibrarySymbolReference;
    TransliteratedFrench: LibrarySymbolReference
  };
  HebrewCalendar: LibrarySymbolReference & {
    HebrewEra: LibrarySymbolReference;
    HebrewCalendar: LibrarySymbolReference;
    AddMonths: LibrarySymbolReference;
    AddYears: LibrarySymbolReference;
    GetDayOfMonth: LibrarySymbolReference;
    GetDayOfWeek: LibrarySymbolReference;
    GetDayOfYear: LibrarySymbolReference;
    GetDaysInMonth: LibrarySymbolReference;
    GetDaysInYear: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    GetLeapMonth: LibrarySymbolReference;
    GetMonth: LibrarySymbolReference;
    GetMonthsInYear: LibrarySymbolReference;
    GetYear: LibrarySymbolReference;
    IsLeapDay: LibrarySymbolReference;
    IsLeapMonth: LibrarySymbolReference;
    IsLeapYear: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToFourDigitYear: LibrarySymbolReference;
    AlgorithmType: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference;
    TwoDigitYearMax: LibrarySymbolReference
  };
  HijriCalendar: LibrarySymbolReference & {
    HijriEra: LibrarySymbolReference;
    HijriCalendar: LibrarySymbolReference;
    AddMonths: LibrarySymbolReference;
    AddYears: LibrarySymbolReference;
    GetDayOfMonth: LibrarySymbolReference;
    GetDayOfWeek: LibrarySymbolReference;
    GetDayOfYear: LibrarySymbolReference;
    GetDaysInMonth: LibrarySymbolReference;
    GetDaysInYear: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    GetLeapMonth: LibrarySymbolReference;
    GetMonth: LibrarySymbolReference;
    GetMonthsInYear: LibrarySymbolReference;
    GetYear: LibrarySymbolReference;
    IsLeapDay: LibrarySymbolReference;
    IsLeapMonth: LibrarySymbolReference;
    IsLeapYear: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToFourDigitYear: LibrarySymbolReference;
    AlgorithmType: LibrarySymbolReference;
    DaysInYearBeforeMinSupportedYear: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    HijriAdjustment: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference;
    TwoDigitYearMax: LibrarySymbolReference
  };
  ISOWeek: LibrarySymbolReference & {
    GetWeekOfYear: LibrarySymbolReference;
    GetWeeksInYear: LibrarySymbolReference;
    GetYear: LibrarySymbolReference;
    GetYearEnd: LibrarySymbolReference;
    GetYearStart: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference
  };
  IdnMapping: LibrarySymbolReference & {
    IdnMapping: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetAscii: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetUnicode: LibrarySymbolReference;
    AllowUnassigned: LibrarySymbolReference;
    UseStd3AsciiRules: LibrarySymbolReference
  };
  JapaneseCalendar: LibrarySymbolReference & {
    JapaneseCalendar: LibrarySymbolReference;
    AddMonths: LibrarySymbolReference;
    AddYears: LibrarySymbolReference;
    GetDayOfMonth: LibrarySymbolReference;
    GetDayOfWeek: LibrarySymbolReference;
    GetDayOfYear: LibrarySymbolReference;
    GetDaysInMonth: LibrarySymbolReference;
    GetDaysInYear: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    GetLeapMonth: LibrarySymbolReference;
    GetMonth: LibrarySymbolReference;
    GetMonthsInYear: LibrarySymbolReference;
    GetWeekOfYear: LibrarySymbolReference;
    GetYear: LibrarySymbolReference;
    IsLeapDay: LibrarySymbolReference;
    IsLeapMonth: LibrarySymbolReference;
    IsLeapYear: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToFourDigitYear: LibrarySymbolReference;
    AlgorithmType: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference;
    TwoDigitYearMax: LibrarySymbolReference
  };
  JapaneseLunisolarCalendar: LibrarySymbolReference & {
    JapaneseEra: LibrarySymbolReference;
    JapaneseLunisolarCalendar: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    DaysInYearBeforeMinSupportedYear: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference
  };
  JulianCalendar: LibrarySymbolReference & {
    JulianEra: LibrarySymbolReference;
    JulianCalendar: LibrarySymbolReference;
    AddMonths: LibrarySymbolReference;
    AddYears: LibrarySymbolReference;
    GetDayOfMonth: LibrarySymbolReference;
    GetDayOfWeek: LibrarySymbolReference;
    GetDayOfYear: LibrarySymbolReference;
    GetDaysInMonth: LibrarySymbolReference;
    GetDaysInYear: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    GetLeapMonth: LibrarySymbolReference;
    GetMonth: LibrarySymbolReference;
    GetMonthsInYear: LibrarySymbolReference;
    GetYear: LibrarySymbolReference;
    IsLeapDay: LibrarySymbolReference;
    IsLeapMonth: LibrarySymbolReference;
    IsLeapYear: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToFourDigitYear: LibrarySymbolReference;
    AlgorithmType: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference;
    TwoDigitYearMax: LibrarySymbolReference
  };
  KoreanCalendar: LibrarySymbolReference & {
    KoreanEra: LibrarySymbolReference;
    KoreanCalendar: LibrarySymbolReference;
    AddMonths: LibrarySymbolReference;
    AddYears: LibrarySymbolReference;
    GetDayOfMonth: LibrarySymbolReference;
    GetDayOfWeek: LibrarySymbolReference;
    GetDayOfYear: LibrarySymbolReference;
    GetDaysInMonth: LibrarySymbolReference;
    GetDaysInYear: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    GetLeapMonth: LibrarySymbolReference;
    GetMonth: LibrarySymbolReference;
    GetMonthsInYear: LibrarySymbolReference;
    GetWeekOfYear: LibrarySymbolReference;
    GetYear: LibrarySymbolReference;
    IsLeapDay: LibrarySymbolReference;
    IsLeapMonth: LibrarySymbolReference;
    IsLeapYear: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToFourDigitYear: LibrarySymbolReference;
    AlgorithmType: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference;
    TwoDigitYearMax: LibrarySymbolReference
  };
  KoreanLunisolarCalendar: LibrarySymbolReference & {
    GregorianEra: LibrarySymbolReference;
    KoreanLunisolarCalendar: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    DaysInYearBeforeMinSupportedYear: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference
  };
  NumberFormatInfo: LibrarySymbolReference & {
    NumberFormatInfo: LibrarySymbolReference;
    Clone: LibrarySymbolReference;
    GetFormat: LibrarySymbolReference;
    GetInstance: LibrarySymbolReference;
    ReadOnly: LibrarySymbolReference;
    CurrencyDecimalDigits: LibrarySymbolReference;
    CurrencyDecimalSeparator: LibrarySymbolReference;
    CurrencyGroupSeparator: LibrarySymbolReference;
    CurrencyGroupSizes: LibrarySymbolReference;
    CurrencyNegativePattern: LibrarySymbolReference;
    CurrencyPositivePattern: LibrarySymbolReference;
    CurrencySymbol: LibrarySymbolReference;
    CurrentInfo: LibrarySymbolReference;
    DigitSubstitution: LibrarySymbolReference;
    InvariantInfo: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    NaNSymbol: LibrarySymbolReference;
    NativeDigits: LibrarySymbolReference;
    NegativeInfinitySymbol: LibrarySymbolReference;
    NegativeSign: LibrarySymbolReference;
    NumberDecimalDigits: LibrarySymbolReference;
    NumberDecimalSeparator: LibrarySymbolReference;
    NumberGroupSeparator: LibrarySymbolReference;
    NumberGroupSizes: LibrarySymbolReference;
    NumberNegativePattern: LibrarySymbolReference;
    PercentDecimalDigits: LibrarySymbolReference;
    PercentDecimalSeparator: LibrarySymbolReference;
    PercentGroupSeparator: LibrarySymbolReference;
    PercentGroupSizes: LibrarySymbolReference;
    PercentNegativePattern: LibrarySymbolReference;
    PercentPositivePattern: LibrarySymbolReference;
    PercentSymbol: LibrarySymbolReference;
    PerMilleSymbol: LibrarySymbolReference;
    PositiveInfinitySymbol: LibrarySymbolReference;
    PositiveSign: LibrarySymbolReference
  };
  NumberStyles: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    AllowLeadingWhite: LibrarySymbolReference;
    AllowTrailingWhite: LibrarySymbolReference;
    AllowLeadingSign: LibrarySymbolReference;
    Integer: LibrarySymbolReference;
    AllowTrailingSign: LibrarySymbolReference;
    AllowParentheses: LibrarySymbolReference;
    AllowDecimalPoint: LibrarySymbolReference;
    AllowThousands: LibrarySymbolReference;
    Number: LibrarySymbolReference;
    AllowExponent: LibrarySymbolReference;
    Float: LibrarySymbolReference;
    AllowCurrencySymbol: LibrarySymbolReference;
    Currency: LibrarySymbolReference;
    Any: LibrarySymbolReference;
    AllowHexSpecifier: LibrarySymbolReference;
    HexNumber: LibrarySymbolReference;
    AllowBinarySpecifier: LibrarySymbolReference;
    BinaryNumber: LibrarySymbolReference
  };
  PersianCalendar: LibrarySymbolReference & {
    PersianEra: LibrarySymbolReference;
    PersianCalendar: LibrarySymbolReference;
    AddMonths: LibrarySymbolReference;
    AddYears: LibrarySymbolReference;
    GetDayOfMonth: LibrarySymbolReference;
    GetDayOfWeek: LibrarySymbolReference;
    GetDayOfYear: LibrarySymbolReference;
    GetDaysInMonth: LibrarySymbolReference;
    GetDaysInYear: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    GetLeapMonth: LibrarySymbolReference;
    GetMonth: LibrarySymbolReference;
    GetMonthsInYear: LibrarySymbolReference;
    GetYear: LibrarySymbolReference;
    IsLeapDay: LibrarySymbolReference;
    IsLeapMonth: LibrarySymbolReference;
    IsLeapYear: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToFourDigitYear: LibrarySymbolReference;
    AlgorithmType: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference;
    TwoDigitYearMax: LibrarySymbolReference
  };
  RegionInfo: LibrarySymbolReference & {
    RegionInfo: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    CurrencyEnglishName: LibrarySymbolReference;
    CurrencyNativeName: LibrarySymbolReference;
    CurrencySymbol: LibrarySymbolReference;
    CurrentRegion: LibrarySymbolReference;
    DisplayName: LibrarySymbolReference;
    EnglishName: LibrarySymbolReference;
    GeoId: LibrarySymbolReference;
    IsMetric: LibrarySymbolReference;
    ISOCurrencySymbol: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NativeName: LibrarySymbolReference;
    ThreeLetterISORegionName: LibrarySymbolReference;
    ThreeLetterWindowsRegionName: LibrarySymbolReference;
    TwoLetterISORegionName: LibrarySymbolReference
  };
  SortKey: LibrarySymbolReference & {
    Compare: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    KeyData: LibrarySymbolReference;
    OriginalString: LibrarySymbolReference
  };
  SortVersion: LibrarySymbolReference & {
    SortVersion: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    FullVersion: LibrarySymbolReference;
    SortId: LibrarySymbolReference
  };
  StringInfo: LibrarySymbolReference & {
    StringInfo: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetNextTextElement: LibrarySymbolReference;
    GetNextTextElementLength: LibrarySymbolReference;
    GetTextElementEnumerator: LibrarySymbolReference;
    ParseCombiningCharacters: LibrarySymbolReference;
    SubstringByTextElements: LibrarySymbolReference;
    LengthInTextElements: LibrarySymbolReference;
    String: LibrarySymbolReference
  };
  TaiwanCalendar: LibrarySymbolReference & {
    TaiwanCalendar: LibrarySymbolReference;
    AddMonths: LibrarySymbolReference;
    AddYears: LibrarySymbolReference;
    GetDayOfMonth: LibrarySymbolReference;
    GetDayOfWeek: LibrarySymbolReference;
    GetDayOfYear: LibrarySymbolReference;
    GetDaysInMonth: LibrarySymbolReference;
    GetDaysInYear: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    GetLeapMonth: LibrarySymbolReference;
    GetMonth: LibrarySymbolReference;
    GetMonthsInYear: LibrarySymbolReference;
    GetWeekOfYear: LibrarySymbolReference;
    GetYear: LibrarySymbolReference;
    IsLeapDay: LibrarySymbolReference;
    IsLeapMonth: LibrarySymbolReference;
    IsLeapYear: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToFourDigitYear: LibrarySymbolReference;
    AlgorithmType: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference;
    TwoDigitYearMax: LibrarySymbolReference
  };
  TaiwanLunisolarCalendar: LibrarySymbolReference & {
    TaiwanLunisolarCalendar: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    DaysInYearBeforeMinSupportedYear: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference
  };
  TextElementEnumerator: LibrarySymbolReference & {
    GetTextElement: LibrarySymbolReference;
    MoveNext: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Current: LibrarySymbolReference;
    ElementIndex: LibrarySymbolReference
  };
  TextInfo: LibrarySymbolReference & {
    Clone: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ReadOnly: LibrarySymbolReference;
    ToLower: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ToTitleCase: LibrarySymbolReference;
    ToUpper: LibrarySymbolReference;
    ANSICodePage: LibrarySymbolReference;
    CultureName: LibrarySymbolReference;
    EBCDICCodePage: LibrarySymbolReference;
    IsReadOnly: LibrarySymbolReference;
    IsRightToLeft: LibrarySymbolReference;
    LCID: LibrarySymbolReference;
    ListSeparator: LibrarySymbolReference;
    MacCodePage: LibrarySymbolReference;
    OEMCodePage: LibrarySymbolReference
  };
  ThaiBuddhistCalendar: LibrarySymbolReference & {
    ThaiBuddhistEra: LibrarySymbolReference;
    ThaiBuddhistCalendar: LibrarySymbolReference;
    AddMonths: LibrarySymbolReference;
    AddYears: LibrarySymbolReference;
    GetDayOfMonth: LibrarySymbolReference;
    GetDayOfWeek: LibrarySymbolReference;
    GetDayOfYear: LibrarySymbolReference;
    GetDaysInMonth: LibrarySymbolReference;
    GetDaysInYear: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    GetLeapMonth: LibrarySymbolReference;
    GetMonth: LibrarySymbolReference;
    GetMonthsInYear: LibrarySymbolReference;
    GetWeekOfYear: LibrarySymbolReference;
    GetYear: LibrarySymbolReference;
    IsLeapDay: LibrarySymbolReference;
    IsLeapMonth: LibrarySymbolReference;
    IsLeapYear: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToFourDigitYear: LibrarySymbolReference;
    AlgorithmType: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference;
    TwoDigitYearMax: LibrarySymbolReference
  };
  TimeSpanStyles: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    AssumeNegative: LibrarySymbolReference
  };
  UmAlQuraCalendar: LibrarySymbolReference & {
    UmAlQuraEra: LibrarySymbolReference;
    UmAlQuraCalendar: LibrarySymbolReference;
    AddMonths: LibrarySymbolReference;
    AddYears: LibrarySymbolReference;
    GetDayOfMonth: LibrarySymbolReference;
    GetDayOfWeek: LibrarySymbolReference;
    GetDayOfYear: LibrarySymbolReference;
    GetDaysInMonth: LibrarySymbolReference;
    GetDaysInYear: LibrarySymbolReference;
    GetEra: LibrarySymbolReference;
    GetLeapMonth: LibrarySymbolReference;
    GetMonth: LibrarySymbolReference;
    GetMonthsInYear: LibrarySymbolReference;
    GetYear: LibrarySymbolReference;
    IsLeapDay: LibrarySymbolReference;
    IsLeapMonth: LibrarySymbolReference;
    IsLeapYear: LibrarySymbolReference;
    ToDateTime: LibrarySymbolReference;
    ToFourDigitYear: LibrarySymbolReference;
    AlgorithmType: LibrarySymbolReference;
    DaysInYearBeforeMinSupportedYear: LibrarySymbolReference;
    Eras: LibrarySymbolReference;
    MaxSupportedDateTime: LibrarySymbolReference;
    MinSupportedDateTime: LibrarySymbolReference;
    TwoDigitYearMax: LibrarySymbolReference
  };
  UnicodeCategory: LibrarySymbolReference & {
    UppercaseLetter: LibrarySymbolReference;
    LowercaseLetter: LibrarySymbolReference;
    TitlecaseLetter: LibrarySymbolReference;
    ModifierLetter: LibrarySymbolReference;
    OtherLetter: LibrarySymbolReference;
    NonSpacingMark: LibrarySymbolReference;
    SpacingCombiningMark: LibrarySymbolReference;
    EnclosingMark: LibrarySymbolReference;
    DecimalDigitNumber: LibrarySymbolReference;
    LetterNumber: LibrarySymbolReference;
    OtherNumber: LibrarySymbolReference;
    SpaceSeparator: LibrarySymbolReference;
    LineSeparator: LibrarySymbolReference;
    ParagraphSeparator: LibrarySymbolReference;
    Control: LibrarySymbolReference;
    Format: LibrarySymbolReference;
    Surrogate: LibrarySymbolReference;
    PrivateUse: LibrarySymbolReference;
    ConnectorPunctuation: LibrarySymbolReference;
    DashPunctuation: LibrarySymbolReference;
    OpenPunctuation: LibrarySymbolReference;
    ClosePunctuation: LibrarySymbolReference;
    InitialQuotePunctuation: LibrarySymbolReference;
    FinalQuotePunctuation: LibrarySymbolReference;
    OtherPunctuation: LibrarySymbolReference;
    MathSymbol: LibrarySymbolReference;
    CurrencySymbol: LibrarySymbolReference;
    ModifierSymbol: LibrarySymbolReference;
    OtherSymbol: LibrarySymbolReference;
    OtherNotAssigned: LibrarySymbolReference
  }
};
const Globalization: GlobalizationLibrary = createLibrary("System.Globalization", {
  Calendar: {
    kind: "class",
    members: {
      CurrentEra: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      Calendar: {
        kind: "method",
        methodKind: "constructor",
      },
      AddDays: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddHours: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddMilliseconds: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddMinutes: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      AddSeconds: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddWeeks: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetDayOfMonth: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetDayOfWeek: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetDayOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetDaysInMonth: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetDaysInYear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetHour: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetMilliseconds: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetMinute: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetMonth: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      GetMonthsInYear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetSecond: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetWeekOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetYear: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      IsLeapDay: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      IsLeapYear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ReadOnly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ToFourDigitYear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      AlgorithmType: {
        kind: "property",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
        isVirtual: true,
      },
      DaysInYearBeforeMinSupportedYear: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isAbstract: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isVirtual: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isVirtual: true,
      },
      TwoDigitYearMax: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
    },
    isAbstract: true,
  },
  CalendarAlgorithmType: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
      },
      SolarCalendar: {
        kind: "field",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
      },
      LunarCalendar: {
        kind: "field",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
      },
      LunisolarCalendar: {
        kind: "field",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
      },
    },
  },
  CalendarWeekRule: {
    kind: "enum",
    members: {
      FirstDay: {
        kind: "field",
        type: () => {
          return Globalization.CalendarWeekRule;
        },
      },
      FirstFullWeek: {
        kind: "field",
        type: () => {
          return Globalization.CalendarWeekRule;
        },
      },
      FirstFourDayWeek: {
        kind: "field",
        type: () => {
          return Globalization.CalendarWeekRule;
        },
      },
    },
  },
  CharUnicodeInfo: {
    kind: "class",
    members: {
      GetDecimalDigitValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetDigitValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetNumericValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetUnicodeCategory: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  ChineseLunisolarCalendar: {
    kind: "class",
    members: {
      ChineseEra: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      ChineseLunisolarCalendar: {
        kind: "method",
        methodKind: "constructor",
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DaysInYearBeforeMinSupportedYear: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
    },
  },
  CompareInfo: {
    kind: "class",
    members: {
      Compare: {
        kind: "method",
        methodKind: "ordinary",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCompareInfo: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetSortKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSortKeyLength: {
        kind: "method",
        methodKind: "ordinary",
      },
      IndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsPrefix: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsSortable: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsSuffix: {
        kind: "method",
        methodKind: "ordinary",
      },
      LastIndexOf: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      LCID: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Version: {
        kind: "property",
        type: () => {
          return Globalization.SortVersion;
        },
      },
    },
    isSealed: true,
  },
  CompareOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Globalization.CompareOptions;
        },
      },
      IgnoreCase: {
        kind: "field",
        type: () => {
          return Globalization.CompareOptions;
        },
      },
      IgnoreNonSpace: {
        kind: "field",
        type: () => {
          return Globalization.CompareOptions;
        },
      },
      IgnoreSymbols: {
        kind: "field",
        type: () => {
          return Globalization.CompareOptions;
        },
      },
      IgnoreKanaType: {
        kind: "field",
        type: () => {
          return Globalization.CompareOptions;
        },
      },
      IgnoreWidth: {
        kind: "field",
        type: () => {
          return Globalization.CompareOptions;
        },
      },
      OrdinalIgnoreCase: {
        kind: "field",
        type: () => {
          return Globalization.CompareOptions;
        },
      },
      StringSort: {
        kind: "field",
        type: () => {
          return Globalization.CompareOptions;
        },
      },
      Ordinal: {
        kind: "field",
        type: () => {
          return Globalization.CompareOptions;
        },
      },
    },
  },
  CultureInfo: {
    kind: "class",
    members: {
      CultureInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      ClearCachedData: {
        kind: "method",
        methodKind: "ordinary",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      CreateSpecificCulture: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetConsoleFallbackUICulture: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCultureInfo: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCultureInfoByIetfLanguageTag: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetCultures: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetFormat: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ReadOnly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Calendar: {
        kind: "property",
        type: () => {
          return Globalization.Calendar;
        },
        isVirtual: true,
      },
      CompareInfo: {
        kind: "property",
        type: () => {
          return Globalization.CompareInfo;
        },
        isVirtual: true,
      },
      CultureTypes: {
        kind: "property",
        type: () => {
          return Globalization.CultureTypes;
        },
      },
      CurrentCulture: {
        kind: "property",
        type: () => {
          return Globalization.CultureInfo;
        },
        isStatic: true,
      },
      CurrentUICulture: {
        kind: "property",
        type: () => {
          return Globalization.CultureInfo;
        },
        isStatic: true,
      },
      DateTimeFormat: {
        kind: "property",
        type: () => {
          return Globalization.DateTimeFormatInfo;
        },
        isVirtual: true,
      },
      DefaultThreadCurrentCulture: {
        kind: "property",
        type: () => {
          return Globalization.CultureInfo;
        },
        isNullable: true,
        isStatic: true,
      },
      DefaultThreadCurrentUICulture: {
        kind: "property",
        type: () => {
          return Globalization.CultureInfo;
        },
        isNullable: true,
        isStatic: true,
      },
      DisplayName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      EnglishName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      IetfLanguageTag: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      InstalledUICulture: {
        kind: "property",
        type: () => {
          return Globalization.CultureInfo;
        },
        isStatic: true,
      },
      InvariantCulture: {
        kind: "property",
        type: () => {
          return Globalization.CultureInfo;
        },
        isStatic: true,
      },
      IsNeutralCulture: {
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
      KeyboardLayoutId: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      LCID: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      NativeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      NumberFormat: {
        kind: "property",
        type: () => {
          return Globalization.NumberFormatInfo;
        },
        isVirtual: true,
      },
      OptionalCalendars: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isVirtual: true,
      },
      Parent: {
        kind: "property",
        type: () => {
          return Globalization.CultureInfo;
        },
        isVirtual: true,
      },
      TextInfo: {
        kind: "property",
        type: () => {
          return Globalization.TextInfo;
        },
        isVirtual: true,
      },
      ThreeLetterISOLanguageName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      ThreeLetterWindowsLanguageName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      TwoLetterISOLanguageName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      UseUserOverride: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
  },
  CultureNotFoundException: {
    kind: "class",
    members: {
      CultureNotFoundException: {
        kind: "method",
        methodKind: "constructor",
      },
      InvalidCultureId: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isNullable: true,
        isVirtual: true,
      },
      InvalidCultureName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
        isVirtual: true,
      },
      Message: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
  },
  CultureTypes: {
    kind: "enum",
    members: {
      NeutralCultures: {
        kind: "field",
        type: () => {
          return Globalization.CultureTypes;
        },
      },
      SpecificCultures: {
        kind: "field",
        type: () => {
          return Globalization.CultureTypes;
        },
      },
      InstalledWin32Cultures: {
        kind: "field",
        type: () => {
          return Globalization.CultureTypes;
        },
      },
      AllCultures: {
        kind: "field",
        type: () => {
          return Globalization.CultureTypes;
        },
      },
      UserCustomCulture: {
        kind: "field",
        type: () => {
          return Globalization.CultureTypes;
        },
      },
      ReplacementCultures: {
        kind: "field",
        type: () => {
          return Globalization.CultureTypes;
        },
      },
      WindowsOnlyCultures: {
        kind: "field",
        type: () => {
          return Globalization.CultureTypes;
        },
      },
      FrameworkCultures: {
        kind: "field",
        type: () => {
          return Globalization.CultureTypes;
        },
      },
    },
  },
  DateTimeFormatInfo: {
    kind: "class",
    members: {
      DateTimeFormatInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAbbreviatedDayName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAbbreviatedEraName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAbbreviatedMonthName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetAllDateTimePatterns: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDayName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetEraName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInstance: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetMonthName: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetShortestDayName: {
        kind: "method",
        methodKind: "ordinary",
      },
      ReadOnly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetAllDateTimePatterns: {
        kind: "method",
        methodKind: "ordinary",
      },
      AbbreviatedDayNames: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      AbbreviatedMonthGenitiveNames: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      AbbreviatedMonthNames: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      AMDesignator: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      Calendar: {
        kind: "property",
        type: () => {
          return Globalization.Calendar;
        },
      },
      CalendarWeekRule: {
        kind: "property",
        type: () => {
          return Globalization.CalendarWeekRule;
        },
      },
      CurrentInfo: {
        kind: "property",
        type: () => {
          return Globalization.DateTimeFormatInfo;
        },
        isStatic: true,
      },
      DateSeparator: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      DayNames: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      FirstDayOfWeek: {
        kind: "property",
        type: () => {
          return System.DayOfWeek;
        },
      },
      FullDateTimePattern: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      InvariantInfo: {
        kind: "property",
        type: () => {
          return Globalization.DateTimeFormatInfo;
        },
        isStatic: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LongDatePattern: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      LongTimePattern: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MonthDayPattern: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MonthGenitiveNames: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      MonthNames: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      NativeCalendarName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      PMDesignator: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      RFC1123Pattern: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ShortDatePattern: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      ShortestDayNames: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      ShortTimePattern: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SortableDateTimePattern: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      TimeSeparator: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      UniversalSortableDateTimePattern: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      YearMonthPattern: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  DateTimeStyles: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Globalization.DateTimeStyles;
        },
      },
      AllowLeadingWhite: {
        kind: "field",
        type: () => {
          return Globalization.DateTimeStyles;
        },
      },
      AllowTrailingWhite: {
        kind: "field",
        type: () => {
          return Globalization.DateTimeStyles;
        },
      },
      AllowInnerWhite: {
        kind: "field",
        type: () => {
          return Globalization.DateTimeStyles;
        },
      },
      AllowWhiteSpaces: {
        kind: "field",
        type: () => {
          return Globalization.DateTimeStyles;
        },
      },
      NoCurrentDateDefault: {
        kind: "field",
        type: () => {
          return Globalization.DateTimeStyles;
        },
      },
      AdjustToUniversal: {
        kind: "field",
        type: () => {
          return Globalization.DateTimeStyles;
        },
      },
      AssumeLocal: {
        kind: "field",
        type: () => {
          return Globalization.DateTimeStyles;
        },
      },
      AssumeUniversal: {
        kind: "field",
        type: () => {
          return Globalization.DateTimeStyles;
        },
      },
      RoundtripKind: {
        kind: "field",
        type: () => {
          return Globalization.DateTimeStyles;
        },
      },
    },
  },
  DaylightTime: {
    kind: "class",
    members: {
      DaylightTime: {
        kind: "method",
        methodKind: "constructor",
      },
      Delta: {
        kind: "property",
        type: () => {
          return System.TimeSpan;
        },
      },
      End: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      Start: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
    },
  },
  DigitShapes: {
    kind: "enum",
    members: {
      Context: {
        kind: "field",
        type: () => {
          return Globalization.DigitShapes;
        },
      },
      None: {
        kind: "field",
        type: () => {
          return Globalization.DigitShapes;
        },
      },
      NativeNational: {
        kind: "field",
        type: () => {
          return Globalization.DigitShapes;
        },
      },
    },
  },
  EastAsianLunisolarCalendar: {
    kind: "class",
    members: {
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCelestialStem: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDayOfMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfWeek: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonthsInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetSexagenaryYear: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      GetTerrestrialBranch: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapDay: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToFourDigitYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AlgorithmType: {
        kind: "property",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
        isOverride: true,
      },
      TwoDigitYearMax: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
    isAbstract: true,
  },
  GlobalizationExtensions: {
    kind: "class",
    members: {
      GetStringComparer: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  GregorianCalendar: {
    kind: "class",
    members: {
      ADEra: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      GregorianCalendar: {
        kind: "method",
        methodKind: "constructor",
      },
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfWeek: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonthsInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapDay: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToFourDigitYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AlgorithmType: {
        kind: "property",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
        isOverride: true,
      },
      CalendarType: {
        kind: "property",
        type: () => {
          return Globalization.GregorianCalendarTypes;
        },
        isVirtual: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      TwoDigitYearMax: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
  },
  GregorianCalendarTypes: {
    kind: "enum",
    members: {
      Localized: {
        kind: "field",
        type: () => {
          return Globalization.GregorianCalendarTypes;
        },
      },
      USEnglish: {
        kind: "field",
        type: () => {
          return Globalization.GregorianCalendarTypes;
        },
      },
      MiddleEastFrench: {
        kind: "field",
        type: () => {
          return Globalization.GregorianCalendarTypes;
        },
      },
      Arabic: {
        kind: "field",
        type: () => {
          return Globalization.GregorianCalendarTypes;
        },
      },
      TransliteratedEnglish: {
        kind: "field",
        type: () => {
          return Globalization.GregorianCalendarTypes;
        },
      },
      TransliteratedFrench: {
        kind: "field",
        type: () => {
          return Globalization.GregorianCalendarTypes;
        },
      },
    },
  },
  HebrewCalendar: {
    kind: "class",
    members: {
      HebrewEra: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      HebrewCalendar: {
        kind: "method",
        methodKind: "constructor",
      },
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfWeek: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonthsInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapDay: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToFourDigitYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AlgorithmType: {
        kind: "property",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
        isOverride: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      TwoDigitYearMax: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
  },
  HijriCalendar: {
    kind: "class",
    members: {
      HijriEra: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      HijriCalendar: {
        kind: "method",
        methodKind: "constructor",
      },
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfWeek: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonthsInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapDay: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToFourDigitYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AlgorithmType: {
        kind: "property",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
        isOverride: true,
      },
      DaysInYearBeforeMinSupportedYear: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      HijriAdjustment: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      TwoDigitYearMax: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
  },
  ISOWeek: {
    kind: "class",
    members: {
      GetWeekOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetWeeksInYear: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetYear: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetYearEnd: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetYearStart: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  IdnMapping: {
    kind: "class",
    members: {
      IdnMapping: {
        kind: "method",
        methodKind: "constructor",
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetAscii: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetUnicode: {
        kind: "method",
        methodKind: "ordinary",
      },
      AllowUnassigned: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      UseStd3AsciiRules: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
    },
    isSealed: true,
  },
  JapaneseCalendar: {
    kind: "class",
    members: {
      JapaneseCalendar: {
        kind: "method",
        methodKind: "constructor",
      },
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfWeek: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonthsInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetWeekOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapDay: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToFourDigitYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AlgorithmType: {
        kind: "property",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
        isOverride: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      TwoDigitYearMax: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
  },
  JapaneseLunisolarCalendar: {
    kind: "class",
    members: {
      JapaneseEra: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      JapaneseLunisolarCalendar: {
        kind: "method",
        methodKind: "constructor",
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DaysInYearBeforeMinSupportedYear: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
    },
  },
  JulianCalendar: {
    kind: "class",
    members: {
      JulianEra: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      JulianCalendar: {
        kind: "method",
        methodKind: "constructor",
      },
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfWeek: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonthsInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapDay: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToFourDigitYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AlgorithmType: {
        kind: "property",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
        isOverride: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      TwoDigitYearMax: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
  },
  KoreanCalendar: {
    kind: "class",
    members: {
      KoreanEra: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      KoreanCalendar: {
        kind: "method",
        methodKind: "constructor",
      },
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfWeek: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonthsInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetWeekOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapDay: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToFourDigitYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AlgorithmType: {
        kind: "property",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
        isOverride: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      TwoDigitYearMax: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
  },
  KoreanLunisolarCalendar: {
    kind: "class",
    members: {
      GregorianEra: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      KoreanLunisolarCalendar: {
        kind: "method",
        methodKind: "constructor",
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DaysInYearBeforeMinSupportedYear: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
    },
  },
  NumberFormatInfo: {
    kind: "class",
    members: {
      NumberFormatInfo: {
        kind: "method",
        methodKind: "constructor",
      },
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetFormat: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetInstance: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ReadOnly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      CurrencyDecimalDigits: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      CurrencyDecimalSeparator: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      CurrencyGroupSeparator: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      CurrencyGroupSizes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      CurrencyNegativePattern: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      CurrencyPositivePattern: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      CurrencySymbol: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      CurrentInfo: {
        kind: "property",
        type: () => {
          return Globalization.NumberFormatInfo;
        },
        isStatic: true,
      },
      DigitSubstitution: {
        kind: "property",
        type: () => {
          return Globalization.DigitShapes;
        },
      },
      InvariantInfo: {
        kind: "property",
        type: () => {
          return Globalization.NumberFormatInfo;
        },
        isStatic: true,
      },
      IsReadOnly: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      NaNSymbol: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      NativeDigits: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      NegativeInfinitySymbol: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      NegativeSign: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      NumberDecimalDigits: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      NumberDecimalSeparator: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      NumberGroupSeparator: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      NumberGroupSizes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      NumberNegativePattern: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PercentDecimalDigits: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PercentDecimalSeparator: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      PercentGroupSeparator: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      PercentGroupSizes: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      PercentNegativePattern: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PercentPositivePattern: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      PercentSymbol: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      PerMilleSymbol: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      PositiveInfinitySymbol: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      PositiveSign: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  NumberStyles: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      AllowLeadingWhite: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      AllowTrailingWhite: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      AllowLeadingSign: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      Integer: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      AllowTrailingSign: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      AllowParentheses: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      AllowDecimalPoint: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      AllowThousands: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      Number: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      AllowExponent: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      Float: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      AllowCurrencySymbol: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      Currency: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      Any: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      AllowHexSpecifier: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      HexNumber: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      AllowBinarySpecifier: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
      BinaryNumber: {
        kind: "field",
        type: () => {
          return Globalization.NumberStyles;
        },
      },
    },
  },
  PersianCalendar: {
    kind: "class",
    members: {
      PersianEra: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
        isStatic: true,
        isReadOnly: true,
      },
      PersianCalendar: {
        kind: "method",
        methodKind: "constructor",
      },
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfWeek: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonthsInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapDay: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToFourDigitYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AlgorithmType: {
        kind: "property",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
        isOverride: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      TwoDigitYearMax: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
  },
  RegionInfo: {
    kind: "class",
    members: {
      RegionInfo: {
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
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CurrencyEnglishName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      CurrencyNativeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      CurrencySymbol: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      CurrentRegion: {
        kind: "property",
        type: () => {
          return Globalization.RegionInfo;
        },
        isStatic: true,
      },
      DisplayName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      EnglishName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      GeoId: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isVirtual: true,
      },
      IsMetric: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isVirtual: true,
      },
      ISOCurrencySymbol: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      NativeName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      ThreeLetterISORegionName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      ThreeLetterWindowsRegionName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
      TwoLetterISORegionName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isVirtual: true,
      },
    },
  },
  SortKey: {
    kind: "class",
    members: {
      Compare: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
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
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      KeyData: {
        kind: "property",
        type: () => {
          return System.Array;
        },
      },
      OriginalString: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
    isSealed: true,
  },
  SortVersion: {
    kind: "class",
    members: {
      SortVersion: {
        kind: "method",
        methodKind: "constructor",
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
      FullVersion: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      SortId: {
        kind: "property",
        type: () => {
          return System.Guid;
        },
      },
    },
    isSealed: true,
  },
  StringInfo: {
    kind: "class",
    members: {
      StringInfo: {
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
      GetNextTextElement: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetNextTextElementLength: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetTextElementEnumerator: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ParseCombiningCharacters: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SubstringByTextElements: {
        kind: "method",
        methodKind: "ordinary",
      },
      LengthInTextElements: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      String: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
    },
  },
  TaiwanCalendar: {
    kind: "class",
    members: {
      TaiwanCalendar: {
        kind: "method",
        methodKind: "constructor",
      },
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfWeek: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonthsInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetWeekOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapDay: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToFourDigitYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AlgorithmType: {
        kind: "property",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
        isOverride: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      TwoDigitYearMax: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
  },
  TaiwanLunisolarCalendar: {
    kind: "class",
    members: {
      TaiwanLunisolarCalendar: {
        kind: "method",
        methodKind: "constructor",
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DaysInYearBeforeMinSupportedYear: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
    },
  },
  TextElementEnumerator: {
    kind: "class",
    members: {
      GetTextElement: {
        kind: "method",
        methodKind: "ordinary",
      },
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
          return System.Object;
        },
      },
      ElementIndex: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
  },
  TextInfo: {
    kind: "class",
    members: {
      Clone: {
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
      ReadOnly: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToLower: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToTitleCase: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToUpper: {
        kind: "method",
        methodKind: "ordinary",
      },
      ANSICodePage: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      CultureName: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      EBCDICCodePage: {
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
      IsRightToLeft: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LCID: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ListSeparator: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      MacCodePage: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      OEMCodePage: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
    },
    isSealed: true,
  },
  ThaiBuddhistCalendar: {
    kind: "class",
    members: {
      ThaiBuddhistEra: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      ThaiBuddhistCalendar: {
        kind: "method",
        methodKind: "constructor",
      },
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfWeek: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonthsInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetWeekOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapDay: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToFourDigitYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AlgorithmType: {
        kind: "property",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
        isOverride: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      TwoDigitYearMax: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
  },
  TimeSpanStyles: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Globalization.TimeSpanStyles;
        },
      },
      AssumeNegative: {
        kind: "field",
        type: () => {
          return Globalization.TimeSpanStyles;
        },
      },
    },
  },
  UmAlQuraCalendar: {
    kind: "class",
    members: {
      UmAlQuraEra: {
        kind: "field",
        type: () => {
          return System.Int32;
        },
      },
      UmAlQuraCalendar: {
        kind: "method",
        methodKind: "constructor",
      },
      AddMonths: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AddYears: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfWeek: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDayOfYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetDaysInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetEra: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetMonthsInYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapDay: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapMonth: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      IsLeapYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToDateTime: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ToFourDigitYear: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      AlgorithmType: {
        kind: "property",
        type: () => {
          return Globalization.CalendarAlgorithmType;
        },
        isOverride: true,
      },
      DaysInYearBeforeMinSupportedYear: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
      Eras: {
        kind: "property",
        type: () => {
          return System.Array;
        },
        isOverride: true,
      },
      MaxSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      MinSupportedDateTime: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
        isOverride: true,
      },
      TwoDigitYearMax: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isOverride: true,
      },
    },
  },
  UnicodeCategory: {
    kind: "enum",
    members: {
      UppercaseLetter: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      LowercaseLetter: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      TitlecaseLetter: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      ModifierLetter: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      OtherLetter: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      NonSpacingMark: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      SpacingCombiningMark: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      EnclosingMark: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      DecimalDigitNumber: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      LetterNumber: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      OtherNumber: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      SpaceSeparator: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      LineSeparator: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      ParagraphSeparator: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      Control: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      Format: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      Surrogate: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      PrivateUse: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      ConnectorPunctuation: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      DashPunctuation: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      OpenPunctuation: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      ClosePunctuation: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      InitialQuotePunctuation: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      FinalQuotePunctuation: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      OtherPunctuation: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      MathSymbol: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      CurrencySymbol: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      ModifierSymbol: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      OtherSymbol: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
      OtherNotAssigned: {
        kind: "field",
        type: () => {
          return Globalization.UnicodeCategory;
        },
      },
    },
  },
});
export default Globalization
