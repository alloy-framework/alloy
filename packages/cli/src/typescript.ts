import * as ts from "typescript";

export function getParseCommandLine(): ts.ParsedCommandLine {
  const configPath = findTSConfigFile();
  const opts = ts.getParsedCommandLineOfConfigFile(
    configPath,
    { skipLibCheck: true },
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic: (diagnostic) => {},
    },
  );
  return opts!;
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
