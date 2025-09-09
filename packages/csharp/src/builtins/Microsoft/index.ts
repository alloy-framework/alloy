import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Win32 } from "./Win32/index.js";

type MicrosoftLibrary = LibrarySymbolReference & {

};
const Microsoft: MicrosoftLibrary = createLibrary("Microsoft", {});
export default Microsoft
