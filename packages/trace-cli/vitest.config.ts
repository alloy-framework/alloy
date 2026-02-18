import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
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
