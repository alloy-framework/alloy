import { parseArgs } from "node:util";
import pc from "picocolors";
import ts from "typescript";
import { buildAllFiles } from "./babel.js";
import { getParseCommandLine } from "./typescript.js";

const args = parseArgs({
  args: process.argv.slice(2),
  allowPositionals: true,
  options: {
    watch: {
      type: "boolean",
    },
  },
});

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: (path) => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine,
};

async function main() {
  if (args.values["watch"]) {
    watchMain();
  } else {
    await build();
  }
}

await main();

async function build() {
  const opts = getParseCommandLine();
  const program = ts.createIncrementalProgram({
    rootNames: opts.fileNames,
    options: opts.options,
    projectReferences: opts.projectReferences,
  });
  const emitResult = program.emit();
  const start = new Date().getTime();
  await buildAllFiles(opts.fileNames, opts.rootDir, opts.outDir);
  const allDiagnostics = ts
    .getPreEmitDiagnostics(program as any)
    .concat(emitResult.diagnostics);

  reportDiagnostics(allDiagnostics);

  if (allDiagnostics.length > 0) {
    reportDiagnostics(emitResult.diagnostics);
    // eslint-disable-next-line no-console
    console.log(
      `Build completed with ${emitResult.diagnostics.length} errors.`,
    );
    process.exit(1);
  } else {
    const end = new Date().getTime();
    // eslint-disable-next-line no-console
    console.log(
      `${pc.green("✔")} Build completed successfully in ${pc.magenta(`${end - start}ms`)}`,
    );
  }
}

function watchMain() {
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

function reportDiagnostic(diagnostic: ts.Diagnostic) {
  reportDiagnostics([diagnostic]);
}
function reportDiagnostics(diagnostics: readonly ts.Diagnostic[]) {
  // eslint-disable-next-line no-console
  console.log(ts.formatDiagnosticsWithColorAndContext(diagnostics, formatHost));
}

/**
 * Prints a diagnostic every time the watch status changes.
 * This is mainly for messages like "Starting compilation" or "Compilation completed".
 */
function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
  const time = new Date();
  const hours = time.getHours();
  const amPm = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  const formattedTime = `${hours12}:${time.getMinutes()}:${time.getSeconds()} ${amPm}`;
  // eslint-disable-next-line no-console
  console.log(`[${pc.green(formattedTime)}] ${diagnostic.messageText}`);
}
