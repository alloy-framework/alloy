import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Compiler } from "./Compiler/index.js";

type CodeDomLibrary = LibrarySymbolReference & {

};
const CodeDom: CodeDomLibrary = createLibrary("System.CodeDom", {});
export default CodeDom
