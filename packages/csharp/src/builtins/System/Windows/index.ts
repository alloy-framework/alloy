import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Input } from "./Input/index.js";
export { default as Markup } from "./Markup/index.js";

type WindowsLibrary = LibrarySymbolReference & {

};
const Windows: WindowsLibrary = createLibrary("System.Windows", {});
export default Windows
