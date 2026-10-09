import alloyPlugin from "@alloy-js/rollup-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["**/dist/**", "**/node_modules/**"],
    setupFiles: ["./test/vitest.setup.ts"],
  },
  plugins: [alloyPlugin()],
});
