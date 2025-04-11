import { dirname, join } from "pathe";
import * as ts from "typescript";

export interface Config extends ts.ParsedCommandLine {
  configPath: string;
  rootDir: string;
  outDir: string;
}
export function getParseCommandLine(): Config {
  const configPath = findTSConfigFile();
  const opts = ts.getParsedCommandLineOfConfigFile(
    configPath,
    { skipLibCheck: true },
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic: (diagnostic) => {},
    },
  );
  if (!opts) {
    throw new Error("Could not parse 'tsconfig.json'.");
  }
  const rootDir = opts.options.rootDir ?? dirname(configPath);
  const outDir = opts.options.outDir ?? join(dirname(configPath), "dist");
  return {
    ...opts,
    configPath,
    rootDir,
    outDir,
  };
}

function findTSConfigFile() {
  const configPath = ts.findConfigFile(
    process.cwd(),
    ts.sys.fileExists,
    "tsconfig.json",
  );
  if (!configPath) {
    throw new Error("Could not find a valid 'tsconfig.json'.");
  }

  return configPath;
}
