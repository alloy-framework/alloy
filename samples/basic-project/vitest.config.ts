import alloyPlugin from "@alloy-js/rollup-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.ts", "test/**/*.tsx"],
    exclude: ["test/**/*.util.ts", "test/**/*.d.ts"],
  },
  esbuild: {
    jsx: "preserve",
    sourcemap: "both",
  },
  plugins: [
    alloyPlugin(),
  ],
});
