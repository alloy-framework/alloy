import { createLibrary } from "#createLibrary";
export { default as Win32 } from "./Win32/index.js";

const Microsoft = createLibrary("Microsoft", {});
export default Microsoft
