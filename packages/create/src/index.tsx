#!/usr/bin/env node

import {
  code,
  Output,
  render,
  Show,
  SourceDirectory,
  writeOutput,
} from "@alloy-js/core";
import { PackageJsonFile, SourceFile } from "@alloy-js/typescript";
import fs from "fs";
import { parseArgs } from "node:util";
import path from "path";
import prompts from "prompts";

const displayHelp = () => {
  console.log(`
Alloy Project Generator

Usage: 
  npm init @alloy-js [options]

Options:
  -h, --help            Show this help message
  -y                    Use default values without prompting
  --name <name>         Package name 
  --version <version>   Package version
  --description <desc>  Package description
  --repository <url>    Git repository URL
  --keywords <list>     Comma-separated list of keywords
  --author <name>       Author name
  --license <license>   License type
  --library             Create a library project
  --stc                 Create a project using string template components
  --project             Create a general project (default)
`);
};

function parseCommandLineArgs(): Partial<PackageInfo> & {
  help: boolean;
  useDefaults: boolean;
} {
  const { values } = parseArgs({
    options: {
      h: { type: "boolean", short: "h" },
      help: { type: "boolean" },
      y: { type: "boolean" },
      name: { type: "string" },
      version: { type: "string" },
      description: { type: "string" },
      main: { type: "string" },
      repository: { type: "string" },
      keywords: { type: "string" },
      author: { type: "string" },
      license: { type: "string" },
      library: { type: "boolean" },
      project: { type: "boolean" },
      stc: { type: "boolean" },
    },
  });

  return {
    help: values.h || values.help || false,
    useDefaults: values.y || false,
    name: values.name,
    version: values.version,
    description: values.description,
    repository: values.repository,
    keywords:
      values.keywords ?
        values.keywords
          .split(",")
          .map((k: string) => k.trim())
          .filter(Boolean)
      : undefined,
    author: values.author,
    license: values.license,
    type:
      values.library ? "library"
      : values.stc ? "stc-project"
      : values.project ? "project"
      : "project",
  };
}

const calculatePackageName = () => {
  const cwd = process.cwd();
  const dirName = path.basename(cwd);

  // Clean up directory name to be a valid package name
  return dirName
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/^[._-]+|[._-]+$/g, "");
};

interface PackageInfo {
  name: string;
  version: string;
  description: string;
  repository: string;
  keywords: string[];
  author: string;
  license: string;
  type: "project" | "stc-project" | "library";
}

// Function to prompt for package information
const promptForPackageInfo = async (
  useDefaults: boolean,
  cmdArgs: Partial<PackageInfo> = {},
): Promise<PackageInfo> => {
  const defaultName = calculatePackageName();

  if (useDefaults) {
    return {
      name: cmdArgs.name || defaultName,
      version: cmdArgs.version || "1.0.0",
      description: cmdArgs.description || "",
      repository: cmdArgs.repository || "",
      keywords: cmdArgs.keywords || [],
      author: cmdArgs.author || "",
      license: cmdArgs.license || "ISC",
      type: cmdArgs.type || "project",
    };
  }

  const questions: prompts.PromptObject[] = [];

  if (!cmdArgs.name) {
    questions.push({
      type: "text",
      name: "name",
      message: "package name:",
      initial: defaultName,
    });
  }

  if (!cmdArgs.version) {
    questions.push({
      type: "text",
      name: "version",
      message: "version:",
      initial: "1.0.0",
    });
  }

  if (!cmdArgs.description) {
    questions.push({
      type: "text",
      name: "description",
      message: "description:",
    });
  }

  if (!cmdArgs.repository) {
    questions.push({
      type: "text",
      name: "repository",
      message: "git repository:",
    });
  }

  if (!cmdArgs.keywords) {
    questions.push({
      type: "list",
      name: "keywords",
      message: "keywords (comma separated):",
    });
  }

  if (!cmdArgs.author) {
    questions.push({
      type: "text",
      name: "author",
      message: "author:",
    });
  }

  if (!cmdArgs.license) {
    questions.push({
      type: "text",
      name: "license",
      message: "license:",
      initial: "ISC",
    });
  }

  if (!cmdArgs.type) {
    questions.push({
      type: "select",
      name: "type",
      message: "project type:",
      choices: [
        {
          title: "project using jsx templates",
          value: "project",
          description:
            "Use alloy and jsx templates to generate code. Requires a babel transform.",
        },
        {
          title: "project using string template components",
          value: "stc-project",
          description:
            "Use alloy and string templates to generate code. Does not require babel transform.",
        },
        {
          title: "library",
          value: "library",
          description:
            "Create a library of alloy JSX components. Requires a babel transform.",
        },
      ],
    });
  }

  const answers =
    questions.length > 0 ?
      await prompts(questions, {
        onCancel: (p) => {
          console.log("Operation canceled. No files were generated.");
          process.exit(0);
        },
      })
    : {};

  return {
    name: cmdArgs.name || answers.name || defaultName,
    version: cmdArgs.version || answers.version || "1.0.0",
    description: cmdArgs.description || answers.description || "",
    repository: cmdArgs.repository || answers.repository || "",
    keywords: cmdArgs.keywords || answers.keywords || [],
    author: cmdArgs.author || answers.author || "",
    license: cmdArgs.license || answers.license || "ISC",
    type: cmdArgs.type || answers.type || "project",
  };
};

// Load dependencies and versions from JSON files
const depsFilePath = path.resolve(
  path.dirname(import.meta.url.replace("file:", "")),
  "../../deps.json",
);
const depsVersionsFilePath = path.resolve(
  path.dirname(import.meta.url.replace("file:", "")),
  "../../deps-versions.json",
);

const depsInfo = JSON.parse(fs.readFileSync(depsFilePath, "utf-8"));
const depsVersions = JSON.parse(fs.readFileSync(depsVersionsFilePath, "utf-8"));

const exports = {
  ".": {
    import: "./dist/src/index.js",
    types: "./dist/src/index.d.ts",
  },
  "./stc": {
    import: "./dist/src/stc.js",
    types: "./dist/src/stc.d.ts",
  },
};

const main = async () => {
  const cmdArgs = parseCommandLineArgs();

  if (cmdArgs.help) {
    displayHelp();
    return;
  }

  const packageInfo = await promptForPackageInfo(cmdArgs.useDefaults, cmdArgs);

  let scripts: Record<string, string>;

  if (packageInfo.type === "stc-project") {
    scripts = {
      "build-tsc": "tsc -p .",
      build: "npm run build-tsc",
      clean: "rimraf dist/ .temp/",
      test: "vitest run",
      "test:watch": "vitest -w",
      "watch-tsc": "tsc -p . --watch",
      watch: "npm run watch-tsc",
    };
  } else {
    scripts = {
      "build-src": "babel src -d dist/src --extensions .ts,.tsx",
      "build-tsc": "tsc -p .",
      build: "npm run build-tsc && npm run build-src",
      clean: "rimraf dist/ .temp/",
      test: "vitest run",
      "test:watch": "vitest -w",
      "watch-src": "babel src -d dist/src --extensions '.ts,.tsx' --watch",
      "watch-tsc": "tsc -p . --watch",
      watch:
        'concurrently --kill-others "npm run watch-tsc" "npm run watch-src"',
    };
  }

  // Map dependencies to their versions with filtering based on project type
  const deps = Object.fromEntries(
    depsInfo.dependencies
      .filter((dep: any) =>
        packageInfo.type === "stc-project" ? dep.stc : dep.jsx,
      )
      .map((dep: any) => [dep.package, depsVersions[dep.package]]),
  );

  const devDeps = Object.fromEntries(
    depsInfo.devDependencies
      .filter((dep: any) =>
        packageInfo.type === "stc-project" ? dep.stc : dep.jsx,
      )
      .map((dep: any) => [dep.package, depsVersions[dep.package]]),
  );

  const files = (
    <Output>
      <PackageJsonFile
        type="module"
        name={packageInfo.name}
        version={packageInfo.version}
        description={packageInfo.description}
        exports={exports}
        dependencies={deps}
        devDependencies={devDeps}
        license={packageInfo.license}
        scripts={scripts}
        author={packageInfo.author}
        repository={
          packageInfo.repository ?
            { type: "git", url: packageInfo.repository }
          : undefined
        }
        keywords={packageInfo.keywords}
      />
      <SourceDirectory path="src">
        <SourceDirectory path="components">
          <Show when={packageInfo.type === "library"}>
            <SourceDirectory path="stc">
              <SourceFile path="index.ts">
                import * as jsx from "../index.js";
              </SourceFile>
            </SourceDirectory>
          </Show>
          <SourceFile path="index.ts">// barrel file for components</SourceFile>
          <SourceFile
            path={
              packageInfo.type === "stc-project" ?
                "ExampleComponent.ts"
              : "ExampleComponent.tsx"
            }
          >
            {code`
              export interface ExampleComponentProps {}

              export function ExampleComponent(props: ExampleComponentProps) {
              
              }
            `}
          </SourceFile>
        </SourceDirectory>
        <SourceFile path="index.ts">
          export * from "./components/index.js";
        </SourceFile>
      </SourceDirectory>
      <Show when={packageInfo.type !== "stc-project"}>
        <SourceFile path="babel.config.cjs">
          {code`
            module.exports = {
              sourceMaps: true,
              presets: [
                "@babel/preset-typescript",
                ["@alloy-js/babel-preset"],
              ],
            };
          `}
        </SourceFile>
      </Show>
      <SourceFile path="tsconfig.json">
        {code`
        {
          "compilerOptions": {
            "lib": ["es2023", "DOM"],
            "module": "NodeNext",
            "moduleResolution": "NodeNext",
            "target": "es2022",
            "strict": true,
            "skipLibCheck": true,
            "isolatedModules": true,
            "declaration": true,
            "sourceMap": true,
            "declarationMap": true,
            "composite": true,
            "incremental": true,
            "outDir": "dist"${
              packageInfo.type === "stc-project" ?
                ""
              : code`
                ,
                "jsx": "preserve",
                "jsxImportSource": "@alloy-js/core",
                "emitDeclarationOnly": true
              `
            }
          },
          "include": [
            "src/**/*.ts",
            "test/**/*.ts"${
              packageInfo.type === "stc-project" ?
                ""
              : code`
                ,
                "src/**/*.tsx",
                "test/**/*.tsx",
              `
            }

          ],
          "exclude": ["node_modules", "dist"]
        }
      `}
      </SourceFile>

      <Show when={packageInfo.type !== "stc-project"}>
        <SourceFile path="vitest.config.ts">
          {code`
            import alloyPlugin from "@alloy-js/rollup-plugin";
            import { defineConfig } from "vitest/config";

            export default defineConfig({
              esbuild: {
                jsx: "preserve",
                sourcemap: "both",
              },
              plugins: [
                babel({
                  inputSourceMap: true as any,
                  sourceMaps: "both",
                  babelHelpers: "bundled",
                  extensions: [".ts", ".tsx"],
                  presets: ["@babel/preset-typescript", ["@alloy-js/babel-preset"]],
                }),
              ],
            });
          `}
        </SourceFile>
      </Show>
    </Output>
  );
  writeOutput(render(files));
};

// Execute main function
main().catch(console.error);
