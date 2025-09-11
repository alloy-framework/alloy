import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";

type InputLibrary = LibrarySymbolReference & {
  ICommand: LibrarySymbolReference & {
    CanExecute: LibrarySymbolReference;
    Execute: LibrarySymbolReference
  }
};
const Input: InputLibrary = createLibrary("System.Windows.Input", {
  ICommand: {
    kind: "interface",
    members: {
      CanExecute: {
        kind: "method",
        methodKind: "ordinary",
      },
      Execute: {
        kind: "method",
        methodKind: "ordinary",
      },
    },
  },
});
export default Input
