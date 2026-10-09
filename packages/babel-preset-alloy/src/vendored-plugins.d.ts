// `@alloy-js/babel-plugin-jsx-dom-expressions` ships as plain JS without type
// declarations, so provide a minimal ambient declaration for it here.
declare module "@alloy-js/babel-plugin-jsx-dom-expressions" {
  import type { PluginObj } from "@babel/core";
  const plugin: (...args: unknown[]) => PluginObj;
  export default plugin;
}
