import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as CSharp } from "./CSharp/index.js";
export { default as VisualBasic } from "./VisualBasic/index.js";
export { default as Win32 } from "./Win32/index.js";

type MicrosoftLibrary = LibrarySymbolReference & {

};
const Microsoft: MicrosoftLibrary = createLibrary("Microsoft", {});
export default Microsoft
