import System from "../../index.js";
import IO from "../index.js";

import { createLibrary } from "#createLibrary";


const Enumeration = createLibrary("System.IO.Enumeration", {
  FileSystemEntry: {
    kind: "struct",
    members: {
      ToFileSystemInfo: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToFullPath: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToSpecifiedFullPath: {
        kind: "method",
        methodKind: "ordinary",
      },
      Attributes: {
        kind: "property",
        type: () => {
          return IO.FileAttributes;
        },
      },
      CreationTimeUtc: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
      },
      Directory: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
        isReadOnly: true,
      },
      FileName: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
      },
      IsDirectory: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      IsHidden: {
        kind: "property",
        type: () => {
          return System.Boolean;
        },
      },
      LastAccessTimeUtc: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
      },
      LastWriteTimeUtc: {
        kind: "property",
        type: () => {
          return System.DateTimeOffset;
        },
      },
      Length: {
        kind: "property",
        type: () => {
          return System.Int64;
        },
      },
      OriginalRootDirectory: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
        isReadOnly: true,
      },
      RootDirectory: {
        kind: "property",
        type: () => {
          return System.ReadOnlySpan;
        },
        isReadOnly: true,
      },
    },
  },
  FileSystemEnumerable: {
    kind: "class",
    members: {
      FindPredicate: {
        kind: "generic",
        members: {
          FindPredicate: {
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
      FindTransform: {
        kind: "generic",
        members: {
          FindTransform: {
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
    },
  },
  FileSystemEnumerator: {
    kind: "class",
    members: {
      FileSystemEnumerator: {
        kind: "method",
        methodKind: "constructor",
      },
      ContinueOnError: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      MoveNext: {
        kind: "method",
        methodKind: "ordinary",
      },
      OnDirectoryFinished: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      ShouldIncludeEntry: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      ShouldRecurseIntoEntry: {
        kind: "method",
        methodKind: "ordinary",
        isVirtual: true,
      },
      TransformEntry: {
        kind: "method",
        methodKind: "ordinary",
        isAbstract: true,
      },
      Current: {
        kind: "property",
        type: undefined,
      },
    },
    isAbstract: true,
  },
  FileSystemName: {
    kind: "class",
    members: {
      MatchesSimpleExpression: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      MatchesWin32Expression: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      TranslateWin32Expression: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
});
export default Enumeration
