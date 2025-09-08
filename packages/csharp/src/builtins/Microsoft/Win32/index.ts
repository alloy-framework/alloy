import { createLibrary } from "#createLibrary";
export { default as SafeHandles } from "./SafeHandles/index.js";

const Win32 = createLibrary("Microsoft.Win32", {});
export default Win32
