import { defineConfig } from "vitest/config";
import { babel } from "@rollup/plugin-babel";
import { resolve } from "path";

console.log("Config", resolve(__dirname, "./src/index.ts"));
export default defineConfig({
  test: {
    include: ["test/**/*.ts", "test/**/*.tsx"],
    exclude: ["test/**/*.util.ts", "test/**/*.d.ts"],
  },
  esbuild: {
    jsx: "preserve",
    sourcemap: "both",
  },
  resolve: {
    mainFields: ["module"],
    alias: {
      "#core": resolve(__dirname, "./src/index.ts"),
      "@alloy-js/core/jsx-runtime": resolve(__dirname, "./src/jsx-runtime.ts"),
      "@alloy-js/core/stc": resolve(__dirname, "./src/components/stc/index.ts"),
      "@alloy-js/core": resolve(__dirname, "./src/index.ts"),
    },
  },
  plugins: [
    babel({
      inputSourceMap: true as any,
      sourceMaps: "both",
      babelHelpers: "bundled",
      extensions: [".ts", ".tsx"],
      presets: [
        "@babel/preset-typescript",
        ["babel-preset-alloy", { alloyModuleName: "#core" }],
      ],
    }),
  ],
});
