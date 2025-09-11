import SafeHandles from "./SafeHandles/index.js";
import System from "../../System/index.js";

import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as SafeHandles } from "./SafeHandles/index.js";

type Win32Library = LibrarySymbolReference & {
  Registry: LibrarySymbolReference & {
    ClassesRoot: LibrarySymbolReference;
    CurrentConfig: LibrarySymbolReference;
    CurrentUser: LibrarySymbolReference;
    LocalMachine: LibrarySymbolReference;
    PerformanceData: LibrarySymbolReference;
    Users: LibrarySymbolReference;
    GetValue: LibrarySymbolReference;
    SetValue: LibrarySymbolReference
  };
  RegistryHive: LibrarySymbolReference & {
    ClassesRoot: LibrarySymbolReference;
    CurrentUser: LibrarySymbolReference;
    LocalMachine: LibrarySymbolReference;
    Users: LibrarySymbolReference;
    PerformanceData: LibrarySymbolReference;
    CurrentConfig: LibrarySymbolReference
  };
  RegistryKey: LibrarySymbolReference & {
    Close: LibrarySymbolReference;
    CreateSubKey: LibrarySymbolReference;
    DeleteSubKey: LibrarySymbolReference;
    DeleteSubKeyTree: LibrarySymbolReference;
    DeleteValue: LibrarySymbolReference;
    Dispose: LibrarySymbolReference;
    Flush: LibrarySymbolReference;
    FromHandle: LibrarySymbolReference;
    GetAccessControl: LibrarySymbolReference;
    GetSubKeyNames: LibrarySymbolReference;
    GetValue: LibrarySymbolReference;
    GetValueKind: LibrarySymbolReference;
    GetValueNames: LibrarySymbolReference;
    OpenBaseKey: LibrarySymbolReference;
    OpenRemoteBaseKey: LibrarySymbolReference;
    OpenSubKey: LibrarySymbolReference;
    SetAccessControl: LibrarySymbolReference;
    SetValue: LibrarySymbolReference;
    ToString: LibrarySymbolReference;
    Handle: LibrarySymbolReference;
    Name: LibrarySymbolReference;
    SubKeyCount: LibrarySymbolReference;
    ValueCount: LibrarySymbolReference;
    View: LibrarySymbolReference
  };
  RegistryKeyPermissionCheck: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    ReadSubTree: LibrarySymbolReference;
    ReadWriteSubTree: LibrarySymbolReference
  };
  RegistryOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Volatile: LibrarySymbolReference
  };
  RegistryValueKind: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    Unknown: LibrarySymbolReference;
    String: LibrarySymbolReference;
    ExpandString: LibrarySymbolReference;
    Binary: LibrarySymbolReference;
    DWord: LibrarySymbolReference;
    MultiString: LibrarySymbolReference;
    QWord: LibrarySymbolReference
  };
  RegistryValueOptions: LibrarySymbolReference & {
    None: LibrarySymbolReference;
    DoNotExpandEnvironmentNames: LibrarySymbolReference
  };
  RegistryView: LibrarySymbolReference & {
    Default: LibrarySymbolReference;
    Registry64: LibrarySymbolReference;
    Registry32: LibrarySymbolReference
  }
};
const Win32: Win32Library = createLibrary("Microsoft.Win32", {
  Registry: {
    kind: "class",
    members: {
      ClassesRoot: {
        kind: "field",
        type: () => {
          return Win32.RegistryKey;
        },
        isStatic: true,
        isReadOnly: true,
      },
      CurrentConfig: {
        kind: "field",
        type: () => {
          return Win32.RegistryKey;
        },
        isStatic: true,
        isReadOnly: true,
      },
      CurrentUser: {
        kind: "field",
        type: () => {
          return Win32.RegistryKey;
        },
        isStatic: true,
        isReadOnly: true,
      },
      LocalMachine: {
        kind: "field",
        type: () => {
          return Win32.RegistryKey;
        },
        isStatic: true,
        isReadOnly: true,
      },
      PerformanceData: {
        kind: "field",
        type: () => {
          return Win32.RegistryKey;
        },
        isStatic: true,
        isReadOnly: true,
      },
      Users: {
        kind: "field",
        type: () => {
          return Win32.RegistryKey;
        },
        isStatic: true,
        isReadOnly: true,
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      SetValue: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
    },
    isStatic: true,
  },
  RegistryHive: {
    kind: "enum",
    members: {
      ClassesRoot: {
        kind: "field",
        type: () => {
          return Win32.RegistryHive;
        },
      },
      CurrentUser: {
        kind: "field",
        type: () => {
          return Win32.RegistryHive;
        },
      },
      LocalMachine: {
        kind: "field",
        type: () => {
          return Win32.RegistryHive;
        },
      },
      Users: {
        kind: "field",
        type: () => {
          return Win32.RegistryHive;
        },
      },
      PerformanceData: {
        kind: "field",
        type: () => {
          return Win32.RegistryHive;
        },
      },
      CurrentConfig: {
        kind: "field",
        type: () => {
          return Win32.RegistryHive;
        },
      },
    },
  },
  RegistryKey: {
    kind: "class",
    members: {
      Close: {
        kind: "method",
        methodKind: "ordinary",
      },
      CreateSubKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      DeleteSubKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      DeleteSubKeyTree: {
        kind: "method",
        methodKind: "ordinary",
      },
      DeleteValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      Dispose: {
        kind: "method",
        methodKind: "ordinary",
      },
      Flush: {
        kind: "method",
        methodKind: "ordinary",
      },
      FromHandle: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      GetAccessControl: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetSubKeyNames: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetValueKind: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetValueNames: {
        kind: "method",
        methodKind: "ordinary",
      },
      OpenBaseKey: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OpenRemoteBaseKey: {
        kind: "method",
        methodKind: "ordinary",
        isStatic: true,
      },
      OpenSubKey: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetAccessControl: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetValue: {
        kind: "method",
        methodKind: "ordinary",
      },
      ToString: {
        kind: "method",
        methodKind: "ordinary",
        isOverride: true,
      },
      Handle: {
        kind: "property",
        type: () => {
          return SafeHandles.SafeRegistryHandle;
        },
      },
      Name: {
        kind: "property",
        type: () => {
          return System.String;
        },
      },
      SubKeyCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      ValueCount: {
        kind: "property",
        type: () => {
          return System.Int32;
        },
      },
      View: {
        kind: "property",
        type: () => {
          return Win32.RegistryView;
        },
      },
    },
    isSealed: true,
  },
  RegistryKeyPermissionCheck: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Win32.RegistryKeyPermissionCheck;
        },
      },
      ReadSubTree: {
        kind: "field",
        type: () => {
          return Win32.RegistryKeyPermissionCheck;
        },
      },
      ReadWriteSubTree: {
        kind: "field",
        type: () => {
          return Win32.RegistryKeyPermissionCheck;
        },
      },
    },
  },
  RegistryOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Win32.RegistryOptions;
        },
      },
      Volatile: {
        kind: "field",
        type: () => {
          return Win32.RegistryOptions;
        },
      },
    },
  },
  RegistryValueKind: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Win32.RegistryValueKind;
        },
      },
      Unknown: {
        kind: "field",
        type: () => {
          return Win32.RegistryValueKind;
        },
      },
      String: {
        kind: "field",
        type: () => {
          return Win32.RegistryValueKind;
        },
      },
      ExpandString: {
        kind: "field",
        type: () => {
          return Win32.RegistryValueKind;
        },
      },
      Binary: {
        kind: "field",
        type: () => {
          return Win32.RegistryValueKind;
        },
      },
      DWord: {
        kind: "field",
        type: () => {
          return Win32.RegistryValueKind;
        },
      },
      MultiString: {
        kind: "field",
        type: () => {
          return Win32.RegistryValueKind;
        },
      },
      QWord: {
        kind: "field",
        type: () => {
          return Win32.RegistryValueKind;
        },
      },
    },
  },
  RegistryValueOptions: {
    kind: "enum",
    members: {
      None: {
        kind: "field",
        type: () => {
          return Win32.RegistryValueOptions;
        },
      },
      DoNotExpandEnvironmentNames: {
        kind: "field",
        type: () => {
          return Win32.RegistryValueOptions;
        },
      },
    },
  },
  RegistryView: {
    kind: "enum",
    members: {
      Default: {
        kind: "field",
        type: () => {
          return Win32.RegistryView;
        },
      },
      Registry64: {
        kind: "field",
        type: () => {
          return Win32.RegistryView;
        },
      },
      Registry32: {
        kind: "field",
        type: () => {
          return Win32.RegistryView;
        },
      },
    },
  },
});
export default Win32
