import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as SafeHandles } from "./SafeHandles/index.js";

type Win32Library = LibrarySymbolReference & {

};
const Win32: Win32Library = createLibrary("Microsoft.Win32", {});
export default Win32
