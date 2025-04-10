import { parseArgs } from "node:util";
import * as ts from "typescript";
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

function main() {
  if (args.values["watch"]) {
    watchMain();
  } else {
    build();
  }
}

main();

function build() {
  const opts = getParseCommandLine();
  const program = ts.createIncrementalProgram({
    rootNames: opts.fileNames,
    options: opts.options,
    projectReferences: opts.projectReferences,
  });
  const emitResult = program.emit();
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
    // eslint-disable-next-line no-console
    console.log("Build completed successfully.");
  }
}

function watchMain() {
  const opts = getParseCommandLine();

  const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

  const host = ts.createWatchCompilerHost(
    opts.fileNames,
    opts.options,
    ts.sys,
    createProgram,
    reportDiagnostic,
    reportWatchStatusChanged,
    opts.projectReferences,
  );
  const origCreateProgram = host.createProgram;
  host.createProgram = (
    rootNames: ReadonlyArray<string> | undefined,
    options,
    host,
    oldProgram,
    diags,
    references,
  ) => {
    console.log("Creating program...", references, references === opts.projectReferences);
    return origCreateProgram(
      rootNames,
      options,
      host,
      oldProgram,
      diags,
      opts.projectReferences,
    );
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
  // eslint-disable-next-line no-console
  console.log(diagnostic.messageText);
}
