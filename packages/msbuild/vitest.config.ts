import alloyPlugin from "@alloy-js/rollup-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: {
    jsx: "preserve",
    sourcemap: "both",
  },
  test: {
    setupFiles: ["./test/vitest.setup.ts"],
  },
  plugins: [alloyPlugin()],
});
