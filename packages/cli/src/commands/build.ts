import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { rm, watch } from "node:fs/promises";
import { parseArgs } from "node:util";

import { dirname, join, relative } from "pathe";
import pc from "picocolors";

import { buildAllFiles, buildFileToOutput } from "../babel.js";
import {
  getParseCommandLine,
  resolveTscBin,
  type Config,
} from "../typescript.js";

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
    await watchMain(values);
  } else {
    await build(values);
  }
}

async function build(values: BuildValues) {
  const { addSourceInfo } = resolveBuildSettings(values);
  const opts = getParseCommandLine();
  const start = new Date().getTime();

  await emitJs(opts, values, addSourceInfo);

  const errorCount = await typeCheck(opts);

  if (errorCount > 0) {
    // eslint-disable-next-line no-console
    console.log(
      `Build completed with ${errorCount} error${errorCount === 1 ? "" : "s"}.`,
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

async function watchMain(values: BuildValues) {
  const { addSourceInfo } = resolveBuildSettings(values);
  const opts = getParseCommandLine();

  // Initial transpile so JS output exists right away.
  await emitJs(opts, values, addSourceInfo);

  // Native tsc handles type-checking and declaration emit in watch mode.
  spawn(
    process.execPath,
    [
      resolveTscBin(),
      "-p",
      opts.configPath,
      "--watch",
      "--preserveWatchOutput",
    ],
    { stdio: "inherit" },
  );

  // Babel handles the JS emit; re-run it whenever a source file changes.
  // `fs.watch({ recursive: true })` is stable on all platforms since Node 20.
  await Promise.all(
    sourceRoots(opts).map((root) =>
      watchSourceRoot(root, opts, values, addSourceInfo),
    ),
  );
}

async function watchSourceRoot(
  root: string,
  opts: Config,
  values: BuildValues,
  addSourceInfo: boolean,
) {
  // `fs.watch` emits several events for a single change, so debounce per file.
  const pending = new Map<string, ReturnType<typeof setTimeout>>();
  for await (const event of watch(root, { recursive: true })) {
    if (!event.filename || !/\.tsx?$/.test(event.filename)) {
      continue;
    }
    const file = join(root, event.filename);
    clearTimeout(pending.get(file));
    pending.set(
      file,
      setTimeout(() => {
        pending.delete(file);
        void onSourceChange(file, opts, values, addSourceInfo);
      }, 50),
    );
  }
}

async function onSourceChange(
  file: string,
  opts: Config,
  values: BuildValues,
  addSourceInfo: boolean,
) {
  try {
    if (existsSync(file)) {
      await emitJsFile(opts, values, addSourceInfo, file);
      // eslint-disable-next-line no-console
      console.log(
        `[${formatTime(new Date())}] Rebuilt ${relative(opts.rootDir, file)}`,
      );
    } else {
      await removeJsFile(opts, values, file);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(pc.red(`Error building ${relative(opts.rootDir, file)}`));
    // eslint-disable-next-line no-console
    console.log(e);
  }
}

/** Transpile all source files to JS with babel. */
async function emitJs(
  opts: Config,
  values: BuildValues,
  addSourceInfo: boolean,
) {
  if (values["with-dev"]) {
    await buildAllFiles(opts.fileNames, opts.rootDir, opts.outDir, {
      sourceMaps: opts.sourceMap,
      addSourceInfo: false,
    });
    const devOutDir = join(opts.outDir, "dev");
    await buildAllFiles(opts.fileNames, opts.rootDir, devOutDir, {
      sourceMaps: opts.sourceMap,
      addSourceInfo: true,
    });
  } else {
    await buildAllFiles(opts.fileNames, opts.rootDir, opts.outDir, {
      sourceMaps: opts.sourceMap,
      addSourceInfo,
    });
  }
}

/** Transpile a single source file to JS with babel (used in watch mode). */
async function emitJsFile(
  opts: Config,
  values: BuildValues,
  addSourceInfo: boolean,
  file: string,
) {
  if (values["with-dev"]) {
    await buildFileToOutput(file, opts.rootDir, opts.outDir, {
      sourceMaps: opts.sourceMap,
      addSourceInfo: false,
    });
    await buildFileToOutput(file, opts.rootDir, join(opts.outDir, "dev"), {
      sourceMaps: opts.sourceMap,
      addSourceInfo: true,
    });
  } else {
    await buildFileToOutput(file, opts.rootDir, opts.outDir, {
      sourceMaps: opts.sourceMap,
      addSourceInfo,
    });
  }
}

/** Remove the JS output associated with a deleted source file. */
async function removeJsFile(opts: Config, values: BuildValues, file: string) {
  const relativePath = relative(opts.rootDir, file).replace(/\.tsx?$/, ".js");
  const outDirs = values["with-dev"]
    ? [opts.outDir, join(opts.outDir, "dev")]
    : [opts.outDir];
  await Promise.all(
    outDirs.flatMap((outDir) => {
      const outPath = join(outDir, relativePath);
      return [
        rm(outPath, { force: true }),
        rm(`${outPath}.map`, { force: true }),
      ];
    }),
  );
}

/**
 * Type-check and emit declarations via the native `tsc` binary. Returns the
 * number of reported errors.
 */
function typeCheck(opts: Config): Promise<number> {
  return new Promise((resolvePromise, reject) => {
    const chunks: Buffer[] = [];
    const child = spawn(
      process.execPath,
      [resolveTscBin(), "-p", opts.configPath, "--pretty"],
      { stdio: ["ignore", "pipe", "pipe"] },
    );
    child.stdout?.on("data", (chunk) => chunks.push(chunk));
    child.stderr?.on("data", (chunk) => chunks.push(chunk));
    child.on("error", reject);
    child.on("close", () => {
      const output = Buffer.concat(chunks).toString("utf8");
      if (output.length > 0) {
        // eslint-disable-next-line no-console
        process.stdout.write(output.endsWith("\n") ? output : `${output}\n`);
      }
      resolvePromise(countErrors(output));
    });
  });
}

function countErrors(output: string): number {
  const stripped = stripAnsi(output);
  const summary = stripped.match(/Found (\d+) errors?/);
  if (summary) {
    return Number(summary[1]);
  }
  return (stripped.match(/error TS\d+/g) ?? []).length;
}

// eslint-disable-next-line no-control-regex
const ansiPattern = /\u001b\[[0-9;]*m/g;
function stripAnsi(value: string): string {
  return value.replace(ansiPattern, "");
}

/**
 * Minimal set of directories that contain the source files, so watching them
 * recursively picks up new files without touching `node_modules`/`dist`.
 */
function sourceRoots(opts: Config): string[] {
  const dirs = [...new Set(opts.fileNames.map((file) => dirname(file)))].sort();
  const roots: string[] = [];
  for (const dir of dirs) {
    if (!roots.some((root) => dir === root || dir.startsWith(`${root}/`))) {
      roots.push(dir);
    }
  }
  return roots;
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

function formatTime(time: Date): string {
  return time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}
