import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as RuntimeBinder } from "./RuntimeBinder/index.js";

type CSharpLibrary = LibrarySymbolReference & {

};
const CSharp: CSharpLibrary = createLibrary("Microsoft.CSharp", {});
export default CSharp
