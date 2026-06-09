import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["**/dist/**", "**/node_modules/**"],
    pool: "forks",
    poolOptions: {
      forks: {
        execArgv: [
          "--experimental-sqlite",
          "--no-warnings=ExperimentalWarning",
        ],
      },
    },
  },
});
