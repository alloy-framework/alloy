import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";

import { dirname, join, resolve } from "pathe";

const require = createRequire(import.meta.url);

export interface Config {
  /** Absolute path to the resolved `tsconfig.json`. */
  configPath: string;
  /** Absolute root directory used to compute output paths. */
  rootDir: string;
  /** Absolute output directory. */
  outDir: string;
  /** Absolute paths of the source files included by the config. */
  fileNames: string[];
  /** Whether source maps are enabled. */
  sourceMap: boolean;
}

/**
 * Resolve the path to the `tsc` binary shipped with the project's TypeScript
 * installation. TypeScript 7+ only exposes the compiler through its binary, so
 * we shell out to it instead of using the (removed) programmatic API.
 */
export function resolveTscBin(): string {
  const pkgJsonPath = require.resolve("typescript/package.json");
  return join(dirname(pkgJsonPath), "bin", "tsc");
}

export function getParseCommandLine(): Config {
  const configPath = findTSConfigFile();
  const configDir = dirname(configPath);

  const output = execFileSync(
    process.execPath,
    [resolveTscBin(), "-p", configPath, "--showConfig"],
    { encoding: "utf8" },
  );
  const config = JSON.parse(output);
  const options = config.compilerOptions ?? {};

  const fileNames: string[] = (config.files ?? []).map((file: string) =>
    resolve(configDir, file),
  );
  const rootDir = options.rootDir
    ? resolve(configDir, options.rootDir)
    : configDir;
  const outDir = options.outDir
    ? resolve(configDir, options.outDir)
    : join(configDir, "dist");

  return {
    configPath,
    rootDir,
    outDir,
    fileNames,
    sourceMap: options.sourceMap ?? false,
  };
}

function findTSConfigFile(): string {
  let dir = process.cwd();
  for (;;) {
    const candidate = join(dir, "tsconfig.json");
    if (existsSync(candidate)) {
      return candidate;
    }
    const parent = dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  throw new Error("Could not find a valid 'tsconfig.json'.");
}
