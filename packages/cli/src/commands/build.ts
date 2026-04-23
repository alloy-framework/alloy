import { parseArgs } from "node:util";
import { join } from "pathe";
import pc from "picocolors";
import ts from "typescript";
import { buildAllFiles } from "../babel.js";
import { getParseCommandLine } from "../typescript.js";

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

interface BuildValues {
  watch?: boolean;
  dev?: boolean;
  prod?: boolean;
  "source-info"?: boolean;
  "with-dev"?: boolean;
}

export async function buildCommand(argv: string[]) {
  const args = parseArgs({
    args: argv,
    allowPositionals: true,
    strict: false,
    options: {
      watch: { type: "boolean" },
      dev: { type: "boolean" },
      prod: { type: "boolean" },
      "source-info": { type: "boolean" },
      "with-dev": { type: "boolean" },
    },
  });

  const values = args.values as BuildValues;
  if (values.watch) {
    watchMain(values);
  } else {
    await build(values);
  }
}

async function build(values: BuildValues) {
  const { addSourceInfo } = resolveBuildSettings(values);
  const opts = getParseCommandLine();
  const program = ts.createIncrementalProgram({
    rootNames: opts.fileNames,
    options: opts.options,
    projectReferences: opts.projectReferences,
  });
  const emitResult = program.emit();
  const start = new Date().getTime();

  if (values["with-dev"]) {
    await buildAllFiles(opts.fileNames, opts.rootDir, opts.outDir, {
      sourceMaps: opts.options.sourceMap,
      addSourceInfo: false,
    });
    const devOutDir = join(opts.outDir, "dev");
    await buildAllFiles(opts.fileNames, opts.rootDir, devOutDir, {
      sourceMaps: opts.options.sourceMap,
      addSourceInfo: true,
    });
  } else {
    await buildAllFiles(opts.fileNames, opts.rootDir, opts.outDir, {
      sourceMaps: opts.options.sourceMap,
      addSourceInfo,
    });
  }

  const allDiagnostics = ts
    .getPreEmitDiagnostics(program as any)
    .concat(emitResult.diagnostics);

  reportDiagnostics(allDiagnostics);

  if (allDiagnostics.length > 0) {
    // eslint-disable-next-line no-console
    console.log(`Build completed with ${allDiagnostics.length} errors.`);
    process.exit(1);
  } else {
    const end = new Date().getTime();
    // eslint-disable-next-line no-console
    console.log(
      `${pc.green("✔")} Build completed successfully in ${pc.magenta(`${end - start}ms`)}`,
    );
  }
}

function watchMain(values: BuildValues) {
  const opts = getParseCommandLine();

  const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

  const host = ts.createWatchCompilerHost(
    opts.configPath,
    {},
    ts.sys,
    createProgram,
    reportDiagnostic,
    reportWatchStatusChanged,
  );

  const origPostProgramCreate = host.afterProgramCreate;
  host.afterProgramCreate = async (program) => {
    ts.sys.clearScreen?.();
    try {
      await buildAllFiles(
        program
          .getSourceFiles()
          .filter((x) => !x.isDeclarationFile)
          .map((x) => x.fileName),
        opts.rootDir,
        opts.outDir,
        {
          sourceMaps: opts.options.sourceMap,
          addSourceInfo: true,
        },
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(pc.red("Error building files"));
      // eslint-disable-next-line no-console
      console.log(e);
    }
    origPostProgramCreate!(program);
  };
  ts.createWatchProgram(host);
}

function resolveBuildSettings(values: BuildValues) {
  const envMode = process.env.BABEL_ENV ?? process.env.NODE_ENV;
  const mode =
    (values.dev ? "development" : undefined) ??
    (values.prod ? "production" : undefined) ??
    envMode ??
    (values["watch"] ? "development" : "production");
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = mode;
  }
  if (!process.env.BABEL_ENV) {
    process.env.BABEL_ENV = mode;
  }

  const addSourceInfo = values["source-info"] ?? mode !== "production";

  return { mode, addSourceInfo };
}

function reportDiagnostic(diagnostic: ts.Diagnostic) {
  reportDiagnostics([diagnostic]);
}
function reportDiagnostics(diagnostics: readonly ts.Diagnostic[]) {
  // eslint-disable-next-line no-console
  console.log(ts.formatDiagnosticsWithColorAndContext(diagnostics, formatHost));
}

function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
  const time = new Date();
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  // eslint-disable-next-line no-console
  console.log(`[${pc.green(formattedTime)}] ${diagnostic.messageText}`);
}
