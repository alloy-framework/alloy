import System from "../../index.js";
import IO from "../../IO/index.js";
import Text from "../../Text/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type CompilerLibrary = LibrarySymbolReference & {
  GeneratedCodeAttribute: LibrarySymbolReference & {
    GeneratedCodeAttribute: LibrarySymbolReference;
    Tool: LibrarySymbolReference;
    Version: LibrarySymbolReference
  };
  IndentedTextWriter: LibrarySymbolReference & {
    DefaultTabString: LibrarySymbolReference;
    IndentedTextWriter: LibrarySymbolReference;
    Close: LibrarySymbolReference;
    DisposeAsync: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FlushAsync: LibrarySymbolReference;
    OutputTabs: LibrarySymbolReference;
    OutputTabsAsync: LibrarySymbolReference;
    Write: LibrarySymbolReference;
    WriteAsync: LibrarySymbolReference;
    WriteLine: LibrarySymbolReference;
    WriteLineAsync: LibrarySymbolReference;
    WriteLineNoTabs: LibrarySymbolReference;
    WriteLineNoTabsAsync: LibrarySymbolReference;
    Encoding: LibrarySymbolReference;
    Indent: LibrarySymbolReference;
    InnerWriter: LibrarySymbolReference;
    NewLine: LibrarySymbolReference
  }
};
const Compiler: CompilerLibrary = createLibrary("System.CodeDom.Compiler", {
  GeneratedCodeAttribute: {
    kind: "class",
    members: {
      GeneratedCodeAttribute: {
        kind: "method",
        methodKind: "constructor",
      },
      Tool: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
      Version: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isNullable: true,
      },
    },
    isSealed: true,
  },
  IndentedTextWriter: {
    kind: "class",
    members: {
      DefaultTabString: {
        kind: "field",
        type: () => {
          return System.String;
        },
      },
      IndentedTextWriter: {
        kind: "method",
        methodKind: "constructor",
      },
      Close: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      DisposeAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      FlushAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      OutputTabs: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      OutputTabsAsync: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Write: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteLine: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteLineAsync: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      WriteLineNoTabs: {
        kind: "method",
        methodKind: "ordinary",
      },
      WriteLineNoTabsAsync: {
        kind: "method",
        methodKind: "ordinary",
      },
      Encoding: {
        kind: "property",
        type: () => {
          return Text.Encoding;
        },
        isOverride: true,
      },
      Indent: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      InnerWriter: {
        kind: "property",
        type: () => {
          return IO.TextWriter;
        },
      },
      NewLine: {
        kind: "property",
        type: () => {
          return System.String;
        },
        isOverride: true,
      },
    },
  },
});
export default Compiler
