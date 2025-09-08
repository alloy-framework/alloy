import { createLibrary } from "#createLibrary";
export { default as Compiler } from "./Compiler/index.js";

const CodeDom = createLibrary("System.CodeDom", {});
export default CodeDom
