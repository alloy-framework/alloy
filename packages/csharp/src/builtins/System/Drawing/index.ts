import System from "../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type DrawingLibrary = LibrarySymbolReference & {
  Color: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    FromArgb: LibrarySymbolReference;
    FromKnownColor: LibrarySymbolReference;
    FromName: LibrarySymbolReference;
    GetBrightness: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    GetHue: LibrarySymbolReference;
    GetSaturation: LibrarySymbolReference;
    ToArgb: LibrarySymbolReference;
    ToKnownColor: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    A: LibrarySymbolReference;
    AliceBlue: LibrarySymbolReference;
    AntiqueWhite: LibrarySymbolReference;
    Aqua: LibrarySymbolReference;
    Aquamarine: LibrarySymbolReference;
    Azure: LibrarySymbolReference;
    B: LibrarySymbolReference;
    Beige: LibrarySymbolReference;
    Bisque: LibrarySymbolReference;
    Black: LibrarySymbolReference;
    BlanchedAlmond: LibrarySymbolReference;
    Blue: LibrarySymbolReference;
    BlueViolet: LibrarySymbolReference;
    Brown: LibrarySymbolReference;
    BurlyWood: LibrarySymbolReference;
    CadetBlue: LibrarySymbolReference;
    Chartreuse: LibrarySymbolReference;
    Chocolate: LibrarySymbolReference;
    Coral: LibrarySymbolReference;
    CornflowerBlue: LibrarySymbolReference;
    Cornsilk: LibrarySymbolReference;
    Crimson: LibrarySymbolReference;
    Cyan: LibrarySymbolReference;
    DarkBlue: LibrarySymbolReference;
    DarkCyan: LibrarySymbolReference;
    DarkGoldenrod: LibrarySymbolReference;
    DarkGray: LibrarySymbolReference;
    DarkGreen: LibrarySymbolReference;
    DarkKhaki: LibrarySymbolReference;
    DarkMagenta: LibrarySymbolReference;
    DarkOliveGreen: LibrarySymbolReference;
    DarkOrange: LibrarySymbolReference;
    DarkOrchid: LibrarySymbolReference;
    DarkRed: LibrarySymbolReference;
    DarkSalmon: LibrarySymbolReference;
    DarkSeaGreen: LibrarySymbolReference;
    DarkSlateBlue: LibrarySymbolReference;
    DarkSlateGray: LibrarySymbolReference;
    DarkTurquoise: LibrarySymbolReference;
    DarkViolet: LibrarySymbolReference;
    DeepPink: LibrarySymbolReference;
    DeepSkyBlue: LibrarySymbolReference;
    DimGray: LibrarySymbolReference;
    DodgerBlue: LibrarySymbolReference;
    Firebrick: LibrarySymbolReference;
    FloralWhite: LibrarySymbolReference;
    ForestGreen: LibrarySymbolReference;
    Fuchsia: LibrarySymbolReference;
    G: LibrarySymbolReference;
    Gainsboro: LibrarySymbolReference;
    GhostWhite: LibrarySymbolReference;
    Gold: LibrarySymbolReference;
    Goldenrod: LibrarySymbolReference;
    Gray: LibrarySymbolReference;
    Green: LibrarySymbolReference;
    GreenYellow: LibrarySymbolReference;
    Honeydew: LibrarySymbolReference;
    HotPink: LibrarySymbolReference;
    IndianRed: LibrarySymbolReference;
    Indigo: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference;
    IsKnownColor: LibrarySymbolReference;
    IsNamedColor: LibrarySymbolReference;
    IsSystemColor: LibrarySymbolReference;
    Ivory: LibrarySymbolReference;
    Khaki: LibrarySymbolReference;
    Lavender: LibrarySymbolReference;
    LavenderBlush: LibrarySymbolReference;
    LawnGreen: LibrarySymbolReference;
    LemonChiffon: LibrarySymbolReference;
    LightBlue: LibrarySymbolReference;
    LightCoral: LibrarySymbolReference;
    LightCyan: LibrarySymbolReference;
    LightGoldenrodYellow: LibrarySymbolReference;
    LightGray: LibrarySymbolReference;
    LightGreen: LibrarySymbolReference;
    LightPink: LibrarySymbolReference;
    LightSalmon: LibrarySymbolReference;
    LightSeaGreen: LibrarySymbolReference;
    LightSkyBlue: LibrarySymbolReference;
    LightSlateGray: LibrarySymbolReference;
    LightSteelBlue: LibrarySymbolReference;
    LightYellow: LibrarySymbolReference;
    Lime: LibrarySymbolReference;
    LimeGreen: LibrarySymbolReference;
    Linen: LibrarySymbolReference;
    Magenta: LibrarySymbolReference;
    Maroon: LibrarySymbolReference;
    MediumAquamarine: LibrarySymbolReference;
    MediumBlue: LibrarySymbolReference;
    MediumOrchid: LibrarySymbolReference;
    MediumPurple: LibrarySymbolReference;
    MediumSeaGreen: LibrarySymbolReference;
    MediumSlateBlue: LibrarySymbolReference;
    MediumSpringGreen: LibrarySymbolReference;
    MediumTurquoise: LibrarySymbolReference;
    MediumVioletRed: LibrarySymbolReference;
    MidnightBlue: LibrarySymbolReference;
    MintCream: LibrarySymbolReference;
    MistyRose: LibrarySymbolReference;
    Moccasin: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    NavajoWhite: LibrarySymbolReference;
    Navy: LibrarySymbolReference;
    OldLace: LibrarySymbolReference;
    Olive: LibrarySymbolReference;
    OliveDrab: LibrarySymbolReference;
    Orange: LibrarySymbolReference;
    OrangeRed: LibrarySymbolReference;
    Orchid: LibrarySymbolReference;
    PaleGoldenrod: LibrarySymbolReference;
    PaleGreen: LibrarySymbolReference;
    PaleTurquoise: LibrarySymbolReference;
    PaleVioletRed: LibrarySymbolReference;
    PapayaWhip: LibrarySymbolReference;
    PeachPuff: LibrarySymbolReference;
    Peru: LibrarySymbolReference;
    Pink: LibrarySymbolReference;
    Plum: LibrarySymbolReference;
    PowderBlue: LibrarySymbolReference;
    Purple: LibrarySymbolReference;
    R: LibrarySymbolReference;
    RebeccaPurple: LibrarySymbolReference;
    Red: LibrarySymbolReference;
    RosyBrown: LibrarySymbolReference;
    RoyalBlue: LibrarySymbolReference;
    SaddleBrown: LibrarySymbolReference;
    Salmon: LibrarySymbolReference;
    SandyBrown: LibrarySymbolReference;
    SeaGreen: LibrarySymbolReference;
    SeaShell: LibrarySymbolReference;
    Sienna: LibrarySymbolReference;
    Silver: LibrarySymbolReference;
    SkyBlue: LibrarySymbolReference;
    SlateBlue: LibrarySymbolReference;
    SlateGray: LibrarySymbolReference;
    Snow: LibrarySymbolReference;
    SpringGreen: LibrarySymbolReference;
    SteelBlue: LibrarySymbolReference;
    Tan: LibrarySymbolReference;
    Teal: LibrarySymbolReference;
    Thistle: LibrarySymbolReference;
    Tomato: LibrarySymbolReference;
    Transparent: LibrarySymbolReference;
    Turquoise: LibrarySymbolReference;
    Violet: LibrarySymbolReference;
    Wheat: LibrarySymbolReference;
    White: LibrarySymbolReference;
    WhiteSmoke: LibrarySymbolReference;
    Yellow: LibrarySymbolReference;
    YellowGreen: LibrarySymbolReference
  };
  ColorConverter: LibrarySymbolReference & {
    ColorConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference;
    GetStandardValues: LibrarySymbolReference;
    GetStandardValuesSupported: LibrarySymbolReference
  };
  ColorTranslator: LibrarySymbolReference & {
    FromHtml: LibrarySymbolReference;
    FromOle: LibrarySymbolReference;
    FromWin32: LibrarySymbolReference;
    ToHtml: LibrarySymbolReference;
    ToOle: LibrarySymbolReference;
    ToWin32: LibrarySymbolReference
  };
  KnownColor: LibrarySymbolReference & {
    ActiveBorder: LibrarySymbolReference;
    ActiveCaption: LibrarySymbolReference;
    ActiveCaptionText: LibrarySymbolReference;
    AppWorkspace: LibrarySymbolReference;
    Control: LibrarySymbolReference;
    ControlDark: LibrarySymbolReference;
    ControlDarkDark: LibrarySymbolReference;
    ControlLight: LibrarySymbolReference;
    ControlLightLight: LibrarySymbolReference;
    ControlText: LibrarySymbolReference;
    Desktop: LibrarySymbolReference;
    GrayText: LibrarySymbolReference;
    Highlight: LibrarySymbolReference;
    HighlightText: LibrarySymbolReference;
    HotTrack: LibrarySymbolReference;
    InactiveBorder: LibrarySymbolReference;
    InactiveCaption: LibrarySymbolReference;
    InactiveCaptionText: LibrarySymbolReference;
    Info: LibrarySymbolReference;
    InfoText: LibrarySymbolReference;
    Menu: LibrarySymbolReference;
    MenuText: LibrarySymbolReference;
    ScrollBar: LibrarySymbolReference;
    Window: LibrarySymbolReference;
    WindowFrame: LibrarySymbolReference;
    WindowText: LibrarySymbolReference;
    Transparent: LibrarySymbolReference;
    AliceBlue: LibrarySymbolReference;
    AntiqueWhite: LibrarySymbolReference;
    Aqua: LibrarySymbolReference;
    Aquamarine: LibrarySymbolReference;
    Azure: LibrarySymbolReference;
    Beige: LibrarySymbolReference;
    Bisque: LibrarySymbolReference;
    Black: LibrarySymbolReference;
    BlanchedAlmond: LibrarySymbolReference;
    Blue: LibrarySymbolReference;
    BlueViolet: LibrarySymbolReference;
    Brown: LibrarySymbolReference;
    BurlyWood: LibrarySymbolReference;
    CadetBlue: LibrarySymbolReference;
    Chartreuse: LibrarySymbolReference;
    Chocolate: LibrarySymbolReference;
    Coral: LibrarySymbolReference;
    CornflowerBlue: LibrarySymbolReference;
    Cornsilk: LibrarySymbolReference;
    Crimson: LibrarySymbolReference;
    Cyan: LibrarySymbolReference;
    DarkBlue: LibrarySymbolReference;
    DarkCyan: LibrarySymbolReference;
    DarkGoldenrod: LibrarySymbolReference;
    DarkGray: LibrarySymbolReference;
    DarkGreen: LibrarySymbolReference;
    DarkKhaki: LibrarySymbolReference;
    DarkMagenta: LibrarySymbolReference;
    DarkOliveGreen: LibrarySymbolReference;
    DarkOrange: LibrarySymbolReference;
    DarkOrchid: LibrarySymbolReference;
    DarkRed: LibrarySymbolReference;
    DarkSalmon: LibrarySymbolReference;
    DarkSeaGreen: LibrarySymbolReference;
    DarkSlateBlue: LibrarySymbolReference;
    DarkSlateGray: LibrarySymbolReference;
    DarkTurquoise: LibrarySymbolReference;
    DarkViolet: LibrarySymbolReference;
    DeepPink: LibrarySymbolReference;
    DeepSkyBlue: LibrarySymbolReference;
    DimGray: LibrarySymbolReference;
    DodgerBlue: LibrarySymbolReference;
    Firebrick: LibrarySymbolReference;
    FloralWhite: LibrarySymbolReference;
    ForestGreen: LibrarySymbolReference;
    Fuchsia: LibrarySymbolReference;
    Gainsboro: LibrarySymbolReference;
    GhostWhite: LibrarySymbolReference;
    Gold: LibrarySymbolReference;
    Goldenrod: LibrarySymbolReference;
    Gray: LibrarySymbolReference;
    Green: LibrarySymbolReference;
    GreenYellow: LibrarySymbolReference;
    Honeydew: LibrarySymbolReference;
    HotPink: LibrarySymbolReference;
    IndianRed: LibrarySymbolReference;
    Indigo: LibrarySymbolReference;
    Ivory: LibrarySymbolReference;
    Khaki: LibrarySymbolReference;
    Lavender: LibrarySymbolReference;
    LavenderBlush: LibrarySymbolReference;
    LawnGreen: LibrarySymbolReference;
    LemonChiffon: LibrarySymbolReference;
    LightBlue: LibrarySymbolReference;
    LightCoral: LibrarySymbolReference;
    LightCyan: LibrarySymbolReference;
    LightGoldenrodYellow: LibrarySymbolReference;
    LightGray: LibrarySymbolReference;
    LightGreen: LibrarySymbolReference;
    LightPink: LibrarySymbolReference;
    LightSalmon: LibrarySymbolReference;
    LightSeaGreen: LibrarySymbolReference;
    LightSkyBlue: LibrarySymbolReference;
    LightSlateGray: LibrarySymbolReference;
    LightSteelBlue: LibrarySymbolReference;
    LightYellow: LibrarySymbolReference;
    Lime: LibrarySymbolReference;
    LimeGreen: LibrarySymbolReference;
    Linen: LibrarySymbolReference;
    Magenta: LibrarySymbolReference;
    Maroon: LibrarySymbolReference;
    MediumAquamarine: LibrarySymbolReference;
    MediumBlue: LibrarySymbolReference;
    MediumOrchid: LibrarySymbolReference;
    MediumPurple: LibrarySymbolReference;
    MediumSeaGreen: LibrarySymbolReference;
    MediumSlateBlue: LibrarySymbolReference;
    MediumSpringGreen: LibrarySymbolReference;
    MediumTurquoise: LibrarySymbolReference;
    MediumVioletRed: LibrarySymbolReference;
    MidnightBlue: LibrarySymbolReference;
    MintCream: LibrarySymbolReference;
    MistyRose: LibrarySymbolReference;
    Moccasin: LibrarySymbolReference;
    NavajoWhite: LibrarySymbolReference;
    Navy: LibrarySymbolReference;
    OldLace: LibrarySymbolReference;
    Olive: LibrarySymbolReference;
    OliveDrab: LibrarySymbolReference;
    Orange: LibrarySymbolReference;
    OrangeRed: LibrarySymbolReference;
    Orchid: LibrarySymbolReference;
    PaleGoldenrod: LibrarySymbolReference;
    PaleGreen: LibrarySymbolReference;
    PaleTurquoise: LibrarySymbolReference;
    PaleVioletRed: LibrarySymbolReference;
    PapayaWhip: LibrarySymbolReference;
    PeachPuff: LibrarySymbolReference;
    Peru: LibrarySymbolReference;
    Pink: LibrarySymbolReference;
    Plum: LibrarySymbolReference;
    PowderBlue: LibrarySymbolReference;
    Purple: LibrarySymbolReference;
    Red: LibrarySymbolReference;
    RosyBrown: LibrarySymbolReference;
    RoyalBlue: LibrarySymbolReference;
    SaddleBrown: LibrarySymbolReference;
    Salmon: LibrarySymbolReference;
    SandyBrown: LibrarySymbolReference;
    SeaGreen: LibrarySymbolReference;
    SeaShell: LibrarySymbolReference;
    Sienna: LibrarySymbolReference;
    Silver: LibrarySymbolReference;
    SkyBlue: LibrarySymbolReference;
    SlateBlue: LibrarySymbolReference;
    SlateGray: LibrarySymbolReference;
    Snow: LibrarySymbolReference;
    SpringGreen: LibrarySymbolReference;
    SteelBlue: LibrarySymbolReference;
    Tan: LibrarySymbolReference;
    Teal: LibrarySymbolReference;
    Thistle: LibrarySymbolReference;
    Tomato: LibrarySymbolReference;
    Turquoise: LibrarySymbolReference;
    Violet: LibrarySymbolReference;
    Wheat: LibrarySymbolReference;
    White: LibrarySymbolReference;
    WhiteSmoke: LibrarySymbolReference;
    Yellow: LibrarySymbolReference;
    YellowGreen: LibrarySymbolReference;
    ButtonFace: LibrarySymbolReference;
    ButtonHighlight: LibrarySymbolReference;
    ButtonShadow: LibrarySymbolReference;
    GradientActiveCaption: LibrarySymbolReference;
    GradientInactiveCaption: LibrarySymbolReference;
    MenuBar: LibrarySymbolReference;
    MenuHighlight: LibrarySymbolReference;
    RebeccaPurple: LibrarySymbolReference
  };
  Point: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    Point: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Ceiling: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Offset: LibrarySymbolReference;
    Round: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Truncate: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference;
    X: LibrarySymbolReference;
    Y: LibrarySymbolReference
  };
  PointConverter: LibrarySymbolReference & {
    PointConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference;
    CreateInstance: LibrarySymbolReference;
    GetCreateInstanceSupported: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetPropertiesSupported: LibrarySymbolReference
  };
  PointF: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    PointF: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ToVector2: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference;
    X: LibrarySymbolReference;
    Y: LibrarySymbolReference
  };
  Rectangle: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    Rectangle: LibrarySymbolReference;
    Ceiling: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    FromLTRB: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Inflate: LibrarySymbolReference;
    Intersect: LibrarySymbolReference;
    IntersectsWith: LibrarySymbolReference;
    Offset: LibrarySymbolReference;
    Round: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Truncate: LibrarySymbolReference;
    Union: LibrarySymbolReference;
    Bottom: LibrarySymbolReference;
    Height: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference;
    Left: LibrarySymbolReference;
    Location: LibrarySymbolReference;
    Right: LibrarySymbolReference;
    Size: LibrarySymbolReference;
    Top: LibrarySymbolReference;
    Width: LibrarySymbolReference;
    X: LibrarySymbolReference;
    Y: LibrarySymbolReference
  };
  RectangleConverter: LibrarySymbolReference & {
    RectangleConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference;
    CreateInstance: LibrarySymbolReference;
    GetCreateInstanceSupported: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetPropertiesSupported: LibrarySymbolReference
  };
  RectangleF: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    RectangleF: LibrarySymbolReference;
    Contains: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    FromLTRB: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Inflate: LibrarySymbolReference;
    Intersect: LibrarySymbolReference;
    IntersectsWith: LibrarySymbolReference;
    Offset: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ToVector4: LibrarySymbolReference;
    Union: LibrarySymbolReference;
    Bottom: LibrarySymbolReference;
    Height: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference;
    Left: LibrarySymbolReference;
    Location: LibrarySymbolReference;
    Right: LibrarySymbolReference;
    Size: LibrarySymbolReference;
    Top: LibrarySymbolReference;
    Width: LibrarySymbolReference;
    X: LibrarySymbolReference;
    Y: LibrarySymbolReference
  };
  Size: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    Size: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Ceiling: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Round: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Truncate: LibrarySymbolReference;
    Height: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference;
    Width: LibrarySymbolReference
  };
  SizeConverter: LibrarySymbolReference & {
    SizeConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference;
    CreateInstance: LibrarySymbolReference;
    GetCreateInstanceSupported: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetPropertiesSupported: LibrarySymbolReference
  };
  SizeF: LibrarySymbolReference & {
    Empty: LibrarySymbolReference;
    SizeF: LibrarySymbolReference;
    Add: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    Subtract: LibrarySymbolReference;
    ToPointF: LibrarySymbolReference;
    ToSize: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    ToVector2: LibrarySymbolReference;
    Height: LibrarySymbolReference;
    IsEmpty: LibrarySymbolReference;
    Width: LibrarySymbolReference
  };
  SizeFConverter: LibrarySymbolReference & {
    SizeFConverter: LibrarySymbolReference;
    CanConvertFrom: LibrarySymbolReference;
    CanConvertTo: LibrarySymbolReference;
    ConvertFrom: LibrarySymbolReference;
    ConvertTo: LibrarySymbolReference;
    CreateInstance: LibrarySymbolReference;
    GetCreateInstanceSupported: LibrarySymbolReference;
    GetProperties: LibrarySymbolReference;
    GetPropertiesSupported: LibrarySymbolReference
  };
  SystemColors: LibrarySymbolReference & {
    ActiveBorder: LibrarySymbolReference;
    ActiveCaption: LibrarySymbolReference;
    ActiveCaptionText: LibrarySymbolReference;
    AppWorkspace: LibrarySymbolReference;
    ButtonFace: LibrarySymbolReference;
    ButtonHighlight: LibrarySymbolReference;
    ButtonShadow: LibrarySymbolReference;
    Control: LibrarySymbolReference;
    ControlDark: LibrarySymbolReference;
    ControlDarkDark: LibrarySymbolReference;
    ControlLight: LibrarySymbolReference;
    ControlLightLight: LibrarySymbolReference;
    ControlText: LibrarySymbolReference;
    Desktop: LibrarySymbolReference;
    GradientActiveCaption: LibrarySymbolReference;
    GradientInactiveCaption: LibrarySymbolReference;
    GrayText: LibrarySymbolReference;
    Highlight: LibrarySymbolReference;
    HighlightText: LibrarySymbolReference;
    HotTrack: LibrarySymbolReference;
    InactiveBorder: LibrarySymbolReference;
    InactiveCaption: LibrarySymbolReference;
    InactiveCaptionText: LibrarySymbolReference;
    Info: LibrarySymbolReference;
    InfoText: LibrarySymbolReference;
    Menu: LibrarySymbolReference;
    MenuBar: LibrarySymbolReference;
    MenuHighlight: LibrarySymbolReference;
    MenuText: LibrarySymbolReference;
    ScrollBar: LibrarySymbolReference;
    Window: LibrarySymbolReference;
    WindowFrame: LibrarySymbolReference;
    WindowText: LibrarySymbolReference;
    UseAlternativeColorSet: LibrarySymbolReference
  }
};
const Drawing: DrawingLibrary = createLibrary("System.Drawing", {
  Color: {
    kind: "struct",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromArgb: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromKnownColor: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromName: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetBrightness: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetHue: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSaturation: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToArgb: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToKnownColor: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      A: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      AliceBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      AntiqueWhite: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Aqua: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Aquamarine: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Azure: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      B: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      Beige: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Bisque: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Black: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      BlanchedAlmond: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Blue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      BlueViolet: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Brown: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      BurlyWood: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      CadetBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Chartreuse: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Chocolate: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Coral: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      CornflowerBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Cornsilk: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Crimson: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Cyan: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkCyan: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkGoldenrod: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkGray: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkGreen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkKhaki: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkMagenta: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkOliveGreen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkOrange: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkOrchid: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkRed: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkSalmon: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkSeaGreen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkSlateBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkSlateGray: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkTurquoise: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DarkViolet: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DeepPink: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DeepSkyBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DimGray: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      DodgerBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Firebrick: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      FloralWhite: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      ForestGreen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Fuchsia: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      G: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      Gainsboro: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      GhostWhite: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Gold: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Goldenrod: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Gray: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Green: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      GreenYellow: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Honeydew: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      HotPink: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      IndianRed: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Indigo: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsKnownColor: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsNamedColor: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsSystemColor: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      Ivory: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Khaki: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Lavender: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LavenderBlush: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LawnGreen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LemonChiffon: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LightBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LightCoral: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LightCyan: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LightGoldenrodYellow: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LightGray: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LightGreen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LightPink: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LightSalmon: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LightSeaGreen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LightSkyBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LightSlateGray: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LightSteelBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LightYellow: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Lime: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      LimeGreen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Linen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Magenta: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Maroon: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MediumAquamarine: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MediumBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MediumOrchid: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MediumPurple: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MediumSeaGreen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MediumSlateBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MediumSpringGreen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MediumTurquoise: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MediumVioletRed: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MidnightBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MintCream: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MistyRose: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Moccasin: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      NavajoWhite: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Navy: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      OldLace: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Olive: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      OliveDrab: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Orange: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      OrangeRed: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Orchid: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      PaleGoldenrod: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      PaleGreen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      PaleTurquoise: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      PaleVioletRed: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      PapayaWhip: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      PeachPuff: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Peru: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Pink: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Plum: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      PowderBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Purple: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      R: {
        kind: "property",
        type: () => {
          return System.Byte;
        },
      },
      RebeccaPurple: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Red: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      RosyBrown: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      RoyalBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      SaddleBrown: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Salmon: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      SandyBrown: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      SeaGreen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      SeaShell: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Sienna: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Silver: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      SkyBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      SlateBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      SlateGray: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Snow: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      SpringGreen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      SteelBlue: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Tan: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Teal: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Thistle: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Tomato: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Transparent: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Turquoise: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Violet: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Wheat: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      White: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      WhiteSmoke: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Yellow: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      YellowGreen: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
    },
  },
  ColorConverter: {
    kind: "class",
    members: {
      ColorConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValues: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetStandardValuesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  ColorTranslator: {
    kind: "class",
    members: {
      FromHtml: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromOle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      FromWin32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToHtml: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToOle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToWin32: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  KnownColor: {
    kind: "enum",
    members: {
      ActiveBorder: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      ActiveCaption: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      ActiveCaptionText: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      AppWorkspace: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Control: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      ControlDark: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      ControlDarkDark: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      ControlLight: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      ControlLightLight: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      ControlText: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Desktop: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      GrayText: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Highlight: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      HighlightText: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      HotTrack: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      InactiveBorder: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      InactiveCaption: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      InactiveCaptionText: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Info: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      InfoText: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Menu: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MenuText: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      ScrollBar: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Window: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      WindowFrame: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      WindowText: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Transparent: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      AliceBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      AntiqueWhite: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Aqua: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Aquamarine: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Azure: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Beige: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Bisque: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Black: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      BlanchedAlmond: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Blue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      BlueViolet: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Brown: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      BurlyWood: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      CadetBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Chartreuse: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Chocolate: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Coral: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      CornflowerBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Cornsilk: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Crimson: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Cyan: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkCyan: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkGoldenrod: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkGray: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkGreen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkKhaki: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkMagenta: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkOliveGreen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkOrange: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkOrchid: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkRed: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkSalmon: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkSeaGreen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkSlateBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkSlateGray: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkTurquoise: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DarkViolet: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DeepPink: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DeepSkyBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DimGray: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      DodgerBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Firebrick: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      FloralWhite: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      ForestGreen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Fuchsia: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Gainsboro: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      GhostWhite: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Gold: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Goldenrod: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Gray: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Green: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      GreenYellow: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Honeydew: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      HotPink: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      IndianRed: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Indigo: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Ivory: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Khaki: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Lavender: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LavenderBlush: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LawnGreen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LemonChiffon: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LightBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LightCoral: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LightCyan: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LightGoldenrodYellow: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LightGray: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LightGreen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LightPink: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LightSalmon: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LightSeaGreen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LightSkyBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LightSlateGray: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LightSteelBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LightYellow: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Lime: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      LimeGreen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Linen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Magenta: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Maroon: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MediumAquamarine: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MediumBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MediumOrchid: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MediumPurple: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MediumSeaGreen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MediumSlateBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MediumSpringGreen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MediumTurquoise: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MediumVioletRed: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MidnightBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MintCream: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MistyRose: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Moccasin: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      NavajoWhite: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Navy: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      OldLace: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Olive: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      OliveDrab: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Orange: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      OrangeRed: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Orchid: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      PaleGoldenrod: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      PaleGreen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      PaleTurquoise: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      PaleVioletRed: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      PapayaWhip: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      PeachPuff: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Peru: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Pink: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Plum: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      PowderBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Purple: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Red: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      RosyBrown: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      RoyalBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      SaddleBrown: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Salmon: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      SandyBrown: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      SeaGreen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      SeaShell: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Sienna: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Silver: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      SkyBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      SlateBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      SlateGray: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Snow: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      SpringGreen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      SteelBlue: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Tan: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Teal: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Thistle: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Tomato: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Turquoise: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Violet: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Wheat: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      White: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      WhiteSmoke: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      Yellow: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      YellowGreen: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      ButtonFace: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      ButtonHighlight: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      ButtonShadow: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      GradientActiveCaption: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      GradientInactiveCaption: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MenuBar: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      MenuHighlight: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
      RebeccaPurple: {
        kind: "field",
        type: () => {
          return Drawing.KnownColor;
        },
      },
    },
  },
  Point: {
    kind: "struct",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return Drawing.Point;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Point: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ceiling: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Offset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      X: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
      Y: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
    },
  },
  PointConverter: {
    kind: "class",
    members: {
      PointConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCreateInstanceSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetPropertiesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  PointF: {
    kind: "struct",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return Drawing.PointF;
        },
        isStatic: true,
        isReadOnly: true,
      },
      PointF: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      ToVector2: {
        kind: "method",
        methodKind: "ordinary",
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      X: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      Y: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
    },
  },
  Rectangle: {
    kind: "struct",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return Drawing.Rectangle;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Rectangle: {
        kind: "method",
        methodKind: "constructor",
      },
      Ceiling: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      FromLTRB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Inflate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Intersect: {
        kind: "method",
        methodKind: "ordinary",
      },
      IntersectsWith: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Offset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Union: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Bottom: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
      Height: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      Left: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
      Location: {
        kind: "property",
        type: () => {
          return Drawing.Point;
        },
        isReadOnly: true,
      },
      Right: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
      Size: {
        kind: "property",
        type: () => {
          return Drawing.Size;
        },
        isReadOnly: true,
      },
      Top: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
      Width: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
      X: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
      Y: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
    },
  },
  RectangleConverter: {
    kind: "class",
    members: {
      RectangleConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCreateInstanceSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetPropertiesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  RectangleF: {
    kind: "struct",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return Drawing.RectangleF;
        },
        isStatic: true,
        isReadOnly: true,
      },
      RectangleF: {
        kind: "method",
        methodKind: "constructor",
      },
      Contains: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      FromLTRB: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Inflate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Intersect: {
        kind: "method",
        methodKind: "ordinary",
      },
      IntersectsWith: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      Offset: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      ToVector4: {
        kind: "method",
        methodKind: "ordinary",
      },
      Union: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Bottom: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      Height: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      Left: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      Location: {
        kind: "property",
        type: () => {
          return Drawing.PointF;
        },
        isReadOnly: true,
      },
      Right: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      Size: {
        kind: "property",
        type: () => {
          return Drawing.SizeF;
        },
        isReadOnly: true,
      },
      Top: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      Width: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      X: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      Y: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
    },
  },
  Size: {
    kind: "struct",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return Drawing.Size;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Size: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Ceiling: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Round: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Truncate: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Height: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      Width: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
        isReadOnly: true,
      },
    },
  },
  SizeConverter: {
    kind: "class",
    members: {
      SizeConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCreateInstanceSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetPropertiesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  SizeF: {
    kind: "struct",
    members: {
      Empty: {
        kind: "field",
        type: () => {
          return Drawing.SizeF;
        },
        isStatic: true,
        isReadOnly: true,
      },
      SizeF: {
        kind: "method",
        methodKind: "constructor",
      },
      Add: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      Equals: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      GetHashCode: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      Subtract: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      ToPointF: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      ToSize: {
        kind: "method",
        methodKind: "ordinary",
        isReadOnly: true,
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
        isReadOnly: true,
      },
      ToVector2: {
        kind: "method",
        methodKind: "ordinary",
      },
      Height: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
      IsEmpty: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isReadOnly: true,
      },
      Width: {
        kind: "property",
        type: () => {
          return System.Single;
        },
        isReadOnly: true,
      },
    },
  },
  SizeFConverter: {
    kind: "class",
    members: {
      SizeFConverter: {
        kind: "method",
        methodKind: "constructor",
      },
      CanConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CanConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertFrom: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      ConvertTo: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      CreateInstance: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetCreateInstanceSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetProperties: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      GetPropertiesSupported: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
    },
  },
  SystemColors: {
    kind: "class",
    members: {
      ActiveBorder: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      ActiveCaption: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      ActiveCaptionText: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      AppWorkspace: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      ButtonFace: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      ButtonHighlight: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      ButtonShadow: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Control: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      ControlDark: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      ControlDarkDark: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      ControlLight: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      ControlLightLight: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      ControlText: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Desktop: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      GradientActiveCaption: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      GradientInactiveCaption: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      GrayText: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Highlight: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      HighlightText: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      HotTrack: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      InactiveBorder: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      InactiveCaption: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      InactiveCaptionText: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Info: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      InfoText: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Menu: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MenuBar: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MenuHighlight: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      MenuText: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      ScrollBar: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      Window: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      WindowFrame: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      WindowText: {
        kind: "property",
        type: () => {
          return Drawing.Color;
        },
        isStatic: true,
      },
      UseAlternativeColorSet: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Drawing
