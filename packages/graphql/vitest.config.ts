import alloyPlugin from "@alloy-js/rollup-plugin";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@alloy-js\/graphql$/,
        replacement: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      },
    ],
  },
  esbuild: {
    jsx: "preserve",
    sourcemap: "both",
  },
  test: {
    setupFiles: ["./test/vitest.setup.ts"],
    deps: {
      inline: ["@alloy-js/graphql"],
    },
  },
  plugins: [alloyPlugin()],
});
