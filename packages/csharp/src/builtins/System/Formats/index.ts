import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Asn1 } from "./Asn1/index.js";
export { default as Tar } from "./Tar/index.js";

type FormatsLibrary = LibrarySymbolReference & {

};
const Formats: FormatsLibrary = createLibrary("System.Formats", {});
export default Formats
