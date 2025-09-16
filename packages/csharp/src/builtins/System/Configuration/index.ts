import { createLibrary } from "#createLibrary";
import { LibrarySymbolReference } from "@alloy-js/core";export { default as Assemblies } from "./Assemblies/index.js";

type ConfigurationLibrary = LibrarySymbolReference & {

};
const Configuration: ConfigurationLibrary = createLibrary("System.Configuration", {});
export default Configuration
