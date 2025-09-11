import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type ComTypesLibrary = LibrarySymbolReference & {
  IDataObject: LibrarySymbolReference & {
    DAdvise: LibrarySymbolReference;
    DUnadvise: LibrarySymbolReference;
    EnumDAdvise: LibrarySymbolReference;
    EnumFormatEtc: LibrarySymbolReference;
    GetCanonicalFormatEtc: LibrarySymbolReference;
    GetData: LibrarySymbolReference;
    GetDataHere: LibrarySymbolReference;
    QueryGetData: LibrarySymbolReference;
    SetData: LibrarySymbolReference
  };
  IEnumSTATDATA: LibrarySymbolReference & {
    Clone: LibrarySymbolReference;
    Next: LibrarySymbolReference;
    Reset: LibrarySymbolReference;
    Skip: LibrarySymbolReference
  }
};
const ComTypes: ComTypesLibrary = createLibrary("System.Runtime.InteropServices.ComTypes", {
  IDataObject: {
    kind: "interface",
    members: {
      DAdvise: {
        kind: "method",
        methodKind: "ordinary",
      },
      DUnadvise: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnumDAdvise: {
        kind: "method",
        methodKind: "ordinary",
      },
      EnumFormatEtc: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetCanonicalFormatEtc: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetData: {
        kind: "method",
        methodKind: "ordinary",
      },
      GetDataHere: {
        kind: "method",
        methodKind: "ordinary",
      },
      QueryGetData: {
        kind: "method",
        methodKind: "ordinary",
      },
      SetData: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
  IEnumSTATDATA: {
    kind: "interface",
    members: {
      Clone: {
        kind: "method",
        methodKind: "ordinary",
      },
      Next: {
        kind: "method",
        methodKind: "ordinary",
      },
      Reset: {
        kind: "method",
        methodKind: "ordinary",
      },
      Skip: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
});
export default ComTypes
