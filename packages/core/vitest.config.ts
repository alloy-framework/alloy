import { defineConfig } from "vitest/config";
import { babel } from "@rollup/plugin-babel";
import { resolve } from "path";

export default defineConfig({
  esbuild: {
    jsx: "preserve",
    sourcemap: "both",
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
