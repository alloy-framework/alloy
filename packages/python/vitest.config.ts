import alloyPlugin from "@alloy-js/rollup-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    conditions: ["source"],
  },
  ssr: {
    resolve: {
      conditions: ["source"],
    },
  },
  esbuild: {
    jsx: "preserve",
    sourcemap: "both",
  },
  test: {
    exclude: ["**/dist/**", "**/node_modules/**"],
    setupFiles: ["./test/vitest.setup.ts"],
  },
  plugins: [alloyPlugin()],
});
