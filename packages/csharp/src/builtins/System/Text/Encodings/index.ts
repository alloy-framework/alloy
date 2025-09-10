import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Web } from "./Web/index.js";

type EncodingsLibrary = LibrarySymbolReference & {

};
const Encodings: EncodingsLibrary = createLibrary("System.Text.Encodings", {});
export default Encodings
