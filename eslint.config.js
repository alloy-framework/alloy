// @ts-check
import eslint from "@eslint/js";
import vitest from "eslint-plugin-vitest";
import { dirname } from "path";
import tsEslint from "typescript-eslint";
import { fileURLToPath } from "url";

export default tsEslint.config(
  {
    ignores: ["**/dist/**/*", "**/.temp/**/*", "eslint.config.js"],
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            "eng/prepare-release-branch.js",
            "packages/*/cmd/cli.mjs",
          ],
          defaultProject: "./tsconfig.json",
        },
        tsconfigRootDir: dirname(fileURLToPath(import.meta.url)),
      },
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: ".*",
          caughtErrorsIgnorePattern: ".*",
          ignoreRestSiblings: true,
        },
      ],
      "prefer-const": "warn",
      "@typescript-eslint/no-floating-promises": "warn",
      eqeqeq: ["warn", "always", { null: "ignore" }],
    },
  },
  {
    /**
     * Test files specific rules
     */
    files: ["**/*.test.ts"],
    plugins: { vitest },
    rules: {
      "vitest/no-focused-tests": "warn",
      "vitest/no-identical-title": "error",
      "vitest/no-commented-out-tests": "warn",
      "vitest/no-import-node-test": "warn",
      "vitest/require-local-test-context-for-concurrent-snapshots": "warn",
      "vitest/valid-describe-callback": "warn",
      "vitest/valid-expect": "warn",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    },
  },
);
