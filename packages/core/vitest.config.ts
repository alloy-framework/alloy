import { defineConfig } from "vitest/config";
import { babel } from "@rollup/plugin-babel";
import { resolve } from "path";

export default defineConfig({
  esbuild: {
    jsx: "preserve",
    sourcemap: "both",
  },
  resolve: {
    mainFields: ["module"],
    alias: {
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
      presets: ["@babel/preset-typescript", ["babel-preset-alloy", {}]],
    }),
  ],
});
