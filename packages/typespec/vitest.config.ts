import alloyPlugin from "@alloy-js/rollup-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [alloyPlugin()],
  test: {
    exclude: ["**/dist/**", "**/node_modules/**"],
    setupFiles: ["test/vitest.setup.ts"],
  },
});
