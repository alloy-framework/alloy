import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: ["packages/*", "!packages/babel-plugin-jsx-dom-expressions/"],
  },
});
