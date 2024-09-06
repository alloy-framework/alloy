import { babel } from "@rollup/plugin-babel";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.ts", "test/**/*.tsx"],
    exclude: ["test/**/*.util.ts", "test/**/utils.tsx", "test/**/*.d.ts"],
  },
  esbuild: {
    jsx: "preserve",
    sourcemap: "both",
  },
  plugins: [
    babel({
      inputSourceMap: true,
      sourceMaps: "both",
      babelHelpers: "bundled",
      extensions: [".ts", ".tsx"],
      presets: ["@babel/preset-typescript", "babel-preset-alloy"],
    }),
  ],
});
