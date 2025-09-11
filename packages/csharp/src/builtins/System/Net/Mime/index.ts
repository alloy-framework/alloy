import Specialized from "../../Collections/Specialized/index.js";
import System from "../../index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type MimeLibrary = LibrarySymbolReference & {
  ContentDisposition: LibrarySymbolReference & {
    ContentDisposition: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    CreationDate: LibrarySymbolReference;
    DispositionType: LibrarySymbolReference;
    FileName: LibrarySymbolReference;
    Inline: LibrarySymbolReference;
    ModificationDate: LibrarySymbolReference;
    Parameters: LibrarySymbolReference;
    ReadDate: LibrarySymbolReference;
    Size: LibrarySymbolReference
  };
  ContentType: LibrarySymbolReference & {
    ContentType: LibrarySymbolReference;
    Equals: LibrarySymbolReference;
    GetHashCode: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Boundary: LibrarySymbolReference;
    CharSet: LibrarySymbolReference;
    MediaType: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    Parameters: LibrarySymbolReference
  };
  DispositionTypeNames: LibrarySymbolReference & {
    Attachment: LibrarySymbolReference;
    Inline: LibrarySymbolReference
  };
  MediaTypeNames: LibrarySymbolReference & {
    Application: LibrarySymbolReference & {
      FormUrlEncoded: LibrarySymbolReference;
      GZip: LibrarySymbolReference;
      Json: LibrarySymbolReference;
      JsonPatch: LibrarySymbolReference;
      JsonSequence: LibrarySymbolReference;
      Manifest: LibrarySymbolReference;
      Octet: LibrarySymbolReference;
      Pdf: LibrarySymbolReference;
      ProblemJson: LibrarySymbolReference;
      ProblemXml: LibrarySymbolReference;
      Rtf: LibrarySymbolReference;
      Soap: LibrarySymbolReference;
      Wasm: LibrarySymbolReference;
      Xml: LibrarySymbolReference;
      XmlDtd: LibrarySymbolReference;
      XmlPatch: LibrarySymbolReference;
      Zip: LibrarySymbolReference
    };
    Font: LibrarySymbolReference & {
      Collection: LibrarySymbolReference;
      Otf: LibrarySymbolReference;
      Sfnt: LibrarySymbolReference;
      Ttf: LibrarySymbolReference;
      Woff: LibrarySymbolReference;
      Woff2: LibrarySymbolReference
    };
    Image: LibrarySymbolReference & {
      Avif: LibrarySymbolReference;
      Bmp: LibrarySymbolReference;
      Gif: LibrarySymbolReference;
      Icon: LibrarySymbolReference;
      Jpeg: LibrarySymbolReference;
      Png: LibrarySymbolReference;
      Svg: LibrarySymbolReference;
      Tiff: LibrarySymbolReference;
      Webp: LibrarySymbolReference
    };
    Multipart: LibrarySymbolReference & {
      ByteRanges: LibrarySymbolReference;
      FormData: LibrarySymbolReference;
      Mixed: LibrarySymbolReference;
      Related: LibrarySymbolReference
    };
    Text: LibrarySymbolReference & {
      Css: LibrarySymbolReference;
      Csv: LibrarySymbolReference;
      EventStream: LibrarySymbolReference;
      Html: LibrarySymbolReference;
      JavaScript: LibrarySymbolReference;
      Markdown: LibrarySymbolReference;
      Plain: LibrarySymbolReference;
      RichText: LibrarySymbolReference;
      Rtf: LibrarySymbolReference;
      Xml: LibrarySymbolReference
    }
  };
  TransferEncoding: LibrarySymbolReference & {
    Unknown: LibrarySymbolReference;
    QuotedPrintable: LibrarySymbolReference;
    Base64: LibrarySymbolReference;
    SevenBit: LibrarySymbolReference;
    EightBit: LibrarySymbolReference
  }
};
const Mime: MimeLibrary = createLibrary("System.Net.Mime", {
  ContentDisposition: {
    kind: "class",
    members: {
      ContentDisposition: {
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
      CreationDate: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      DispositionType: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      FileName: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Inline: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      ModificationDate: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      Parameters: {
        kind: "property",
        type: () => {
          return Specialized.StringDictionary;
        },
      },
      ReadDate: {
        kind: "property",
        type: () => {
          return System.DateTime;
        },
      },
      Size: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
    },
  },
  ContentType: {
    kind: "class",
    members: {
      ContentType: {
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
      Boundary: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      CharSet: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      MediaType: {
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
      Parameters: {
        kind: "property",
        type: () => {
          return Specialized.StringDictionary;
        },
      },
    },
  },
  DispositionTypeNames: {
    kind: "class",
    members: {
      Attachment: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      Inline: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
    },
    isStatic: true,
  },
  MediaTypeNames: {
    kind: "class",
    members: {
      Application: {
        kind: "class",
        members: {
          FormUrlEncoded: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          GZip: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Json: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          JsonPatch: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          JsonSequence: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Manifest: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Octet: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Pdf: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          ProblemJson: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          ProblemXml: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Rtf: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Soap: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Wasm: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Xml: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          XmlDtd: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          XmlPatch: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Zip: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
        },
        isStatic: true,
      },
      Font: {
        kind: "class",
        members: {
          Collection: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Otf: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Sfnt: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Ttf: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Woff: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Woff2: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
        },
        isStatic: true,
      },
      Image: {
        kind: "class",
        members: {
          Avif: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Bmp: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Gif: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Icon: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Jpeg: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Png: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Svg: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Tiff: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Webp: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
        },
        isStatic: true,
      },
      Multipart: {
        kind: "class",
        members: {
          ByteRanges: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          FormData: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Mixed: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Related: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
        },
        isStatic: true,
      },
      Text: {
        kind: "class",
        members: {
          Css: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Csv: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          EventStream: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Html: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          JavaScript: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Markdown: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Plain: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          RichText: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Rtf: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
          Xml: {
            kind: "field",
            type: () => {
              return System.String;
            },
          },
        },
        isStatic: true,
      },
    },
  },
  TransferEncoding: {
    kind: "enum",
    members: {
      Unknown: {
        kind: "field",
        type: () => {
          return Mime.TransferEncoding;
        },
      },
      QuotedPrintable: {
        kind: "field",
        type: () => {
          return Mime.TransferEncoding;
        },
      },
      Base64: {
        kind: "field",
        type: () => {
          return Mime.TransferEncoding;
        },
      },
      SevenBit: {
        kind: "field",
        type: () => {
          return Mime.TransferEncoding;
        },
      },
      EightBit: {
        kind: "field",
        type: () => {
          return Mime.TransferEncoding;
        },
      },
    },
  },
});
export default Mime
