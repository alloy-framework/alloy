// Minimal performance harness
// Discovers scenario directories under ../scenarios/*/index.ts
// Each scenario exports async function runTest(): Promise<void>

import Table from "cli-table3";
import { Listr } from "listr2";
import { spawn } from "node:child_process";
import { constants as FS_CONSTANTS } from "node:fs";
import { access, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import pc from "picocolors";

interface ScenarioResult {
  name: string;
  title: string;
  description: string;
  totalCpuMicros: number; // aggregated (avg) user + system
  heapUsedBytesDelta: number; // aggregated (avg)
  runs: number;
  cpuStdDevMicros?: number;
  memStdDevBytes?: number;
  error?: string;
}

function fmtMem(bytes: number): string {
  const sign = bytes < 0 ? "-" : "";
  let n = Math.abs(bytes);
  const units = ["KB", "MB", "GB"];
  n = n / 1024; // start at KB per requirement
  let u = 0;
  while (u < units.length - 1 && n >= 1024) {
    n /= 1024;
    u++;
  }
  return sign + n.toFixed(2) + " " + units[u];
}

function fmtCpu(totalMicros: number): string {
  const ms = totalMicros / 1000;
  return ms.toFixed(2) + " ms"; // always ms
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Argument parsing using Node's built-in parseArgs
// Supports:
//   --write-baseline <path>
//   --baseline <path>
const parsed = parseArgs({
  options: {
    "write-baseline": { type: "string" },
    baseline: { type: "string" },
    scenario: { type: "string" },
    profile: { type: "boolean" },
    samples: { type: "string" },
  },
  allowPositionals: true,
});
const baselinePath: string | undefined = parsed.values["write-baseline"];
const baselineOptionPath: string | undefined = parsed.values.baseline;
const scenariosDir = path.resolve(__dirname, "..", "scenarios");
const entries = await readdir(scenariosDir, { withFileTypes: true });
const scenarioDirs = entries.filter((e) => e.isDirectory());
// Optional single-scenario filter
const scenarioFilter = parsed.values.scenario as string | undefined;
const selectedScenarioDirs =
  scenarioFilter ?
    scenarioDirs.filter((d) => d.name === scenarioFilter)
  : scenarioDirs;
if (scenarioFilter && selectedScenarioDirs.length === 0) {
  // eslint-disable-next-line no-console
  console.error(
    `Scenario '${scenarioFilter}' not found. Available scenarios: ${scenarioDirs
      .map((d) => d.name)
      .sort()
      .join(", ")}`,
  );
  process.exit(1);
}
const results: ScenarioResult[] = [];
let RUNS = 5;

// samples option (before profile override)
const samplesOpt = parsed.values.samples as string | undefined;
if (samplesOpt) {
  const n = parseInt(samplesOpt, 10);
  if (!Number.isNaN(n) && n > 0) {
    RUNS = n;
  } else {
    // eslint-disable-next-line no-console
    console.error(`[perf] Ignoring invalid --samples value: ${samplesOpt}`);
  }
}

const childNodeArgs: string[] = [];
if (parsed.values.profile) {
  if (RUNS !== 1) {
    // eslint-disable-next-line no-console
    console.log(`[perf] --profile overrides --samples (${RUNS}) -> 1`);
  }
  childNodeArgs.push("--inspect-brk");
  RUNS = 1; // single run when profiling for easier debugging
  // eslint-disable-next-line no-console
  console.log("[perf] Profiling enabled --inspect-brk, connect with dev tools");
}

function mean(nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function stddev(nums: number[]): number {
  if (nums.length < 2) return 0;
  const m = mean(nums);
  const variance =
    nums.reduce((acc, n) => acc + (n - m) ** 2, 0) / (nums.length - 1);
  return Math.sqrt(variance);
}

// Preload scenario metadata
interface ScenarioMeta {
  name: string;
  path: string;
  title: string;
  description: string;
}
const scenarios: ScenarioMeta[] = [];
for (const dir of selectedScenarioDirs) {
  const name = dir.name;
  const scenarioPath = path.join(scenariosDir, name, "index.js");
  let title = name;
  let description = "";
  try {
    const metaMod: any = await import(pathToFileURL(scenarioPath).href);
    if (typeof metaMod.title === "string" && metaMod.title.trim())
      title = metaMod.title.trim();
    if (typeof metaMod.description === "string")
      description = metaMod.description.trim();
  } catch {
    /* ignore */
  }
  scenarios.push({ name, path: scenarioPath, title, description });
}

type Ctx = {};

const runnerPath = path.join(__dirname, "run-scenario.js");

const tasks = new Listr<Ctx>(
  scenarios.map((s) => ({
    title: s.title !== s.name ? `${s.title} (${s.name})` : s.title,
    task: async (_, task) => {
      const cpuRuns: number[] = [];
      const memRuns: number[] = [];
      let error: string | undefined;
      for (let i = 0; i < RUNS; i++) {
        task.output = `run ${i + 1}/${RUNS}`;
        const child = spawn(
          process.execPath,
          [...childNodeArgs, runnerPath, s.path, s.name],
          {
            stdio: ["ignore", "pipe", "pipe"],
            env: process.env,
          },
        );
        let stdout = "";
        let stderr = "";
        child.stdout.setEncoding("utf8");
        child.stdout.on("data", (d) => {
          stdout += d;
          // Echo child stdout so user can see scenario output
          // Avoid interfering with Listr task titles; write raw
          process.stdout.write(d);
        });
        child.stderr.setEncoding("utf8");
        child.stderr.on("data", (d) => {
          stderr += d;
          process.stderr.write(d);
        });
        const exitCode: number = await new Promise((resolve) =>
          child.on("close", (code) => resolve(code ?? -1)),
        );
        if (exitCode === 0) {
          try {
            const line = stdout.trim().split(/\n/).pop() || "";
            const parsed = JSON.parse(line) as ScenarioResult;
            if (parsed.error) {
              error = parsed.error;
              break;
            }
            cpuRuns.push(parsed.totalCpuMicros);
            memRuns.push(parsed.heapUsedBytesDelta);
          } catch (e: any) {
            error = `Failed to parse output: ${e?.message || e}`;
            break;
          }
        } else {
          error = stderr.trim() || `Child exited with code ${exitCode}`;
          break;
        }
      }
      const aggregated: ScenarioResult = {
        name: s.name,
        title: s.title,
        description: s.description,
        runs: cpuRuns.length || RUNS,
        totalCpuMicros: cpuRuns.length ? mean(cpuRuns) : 0,
        heapUsedBytesDelta: memRuns.length ? mean(memRuns) : 0,
        cpuStdDevMicros: cpuRuns.length > 1 ? stddev(cpuRuns) : 0,
        memStdDevBytes: memRuns.length > 1 ? stddev(memRuns) : 0,
        error,
      };
      results.push(aggregated);
      if (error) {
        task.output = `ERROR: ${error}`;
      } else {
        const cpu = fmtCpu(aggregated.totalCpuMicros);
        const cpuSd =
          aggregated.cpuStdDevMicros ?
            fmtCpu(aggregated.cpuStdDevMicros)
          : undefined;
        const mem = fmtMem(aggregated.heapUsedBytesDelta);
        const memSd =
          aggregated.memStdDevBytes ?
            fmtMem(aggregated.memStdDevBytes)
          : undefined;
        task.output = `runs=${aggregated.runs} cpu=${cpu}${cpuSd ? ` (± ${cpuSd})` : ""} memΔ=${mem}${memSd ? ` (± ${memSd})` : ""}`;
      }
    },
    options: { persistentOutput: true },
  })),
  {
    concurrent: false,
  },
);

await tasks.run();

/* eslint-disable no-console */
// Attempt to load baseline for comparison.
interface BaselineScenarioEntry {
  name: string;
  title?: string;
  runs?: number;
  cpu?: { avgMicros: number; stddevMicros?: number };
  memory?: { avgBytesDelta: number; stddevBytes?: number };
}
interface BaselineFile {
  scenarios?: BaselineScenarioEntry[];
}
let baselineCompare: Map<string, BaselineScenarioEntry> | undefined;
let baselineComparePath: string | undefined;
try {
  const defaultBaseline = path.join(process.cwd(), "baseline.json");
  let usePath: string | undefined;
  // Precedence: baseline.json if exists else --baseline path
  try {
    await access(defaultBaseline, FS_CONSTANTS.R_OK);
    usePath = defaultBaseline;
  } catch {
    if (baselineOptionPath) usePath = baselineOptionPath;
  }
  if (usePath) {
    const raw = await readFile(usePath, "utf8");
    const parsed: BaselineFile = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.scenarios)) {
      baselineCompare = new Map(parsed.scenarios.map((s) => [s.name, s]));
      baselineComparePath = usePath;
    }
  }
} catch {
  // ignore baseline load errors
}

const table = new Table({
  head: (baselineCompare ?
    ["Title", "CPU (avg ± sd)", "CPU Δ%", "Mem Δ (avg ± sd)", "Mem Δ%"]
  : ["Title", "CPU (avg ± sd)", "Mem Δ (avg ± sd)"]) as string[],
  style: { head: [], border: [] },
  wordWrap: true,
});
for (const r of results) {
  const titleOnly = r.title;
  if (r.error) {
    const errTxt = pc.bold(pc.red(`ERROR: ${r.error}`));
    table.push(
      baselineCompare ?
        [pc.yellow(titleOnly), errTxt, pc.dim("-"), pc.dim("-"), pc.dim("-")]
      : [pc.yellow(titleOnly), errTxt, pc.dim("-")],
    );
    continue;
  }
  const cpuAvgMsNum = r.totalCpuMicros / 1000;
  const cpuAvgMs = cpuAvgMsNum.toFixed(2);
  const cpuSdMs =
    r.cpuStdDevMicros ? (r.cpuStdDevMicros / 1000).toFixed(2) : "0.00";
  const memAvgNum = r.heapUsedBytesDelta;
  const memAvg = fmtMem(memAvgNum);
  const memSd = r.memStdDevBytes ? fmtMem(r.memStdDevBytes) : "0 KB";
  if (baselineCompare && baselineCompare.has(r.name)) {
    const b = baselineCompare.get(r.name)!;
    const bCpuMs = b.cpu ? b.cpu.avgMicros / 1000 : undefined;
    const bCpuStdDevMs =
      b.cpu?.stddevMicros ? b.cpu.stddevMicros / 1000 : undefined;
    const bMemBytes = b.memory ? b.memory.avgBytesDelta : undefined;
    const bMemStdDevBytes = b.memory?.stddevBytes;
    const cpuDeltaRatio =
      bCpuMs && bCpuMs !== 0 ? (cpuAvgMsNum - bCpuMs) / bCpuMs : undefined;
    const memDeltaRatio =
      bMemBytes && bMemBytes !== 0 ?
        (memAvgNum - bMemBytes) / bMemBytes
      : undefined;
    const cpuDeltaPct =
      cpuDeltaRatio !== undefined ?
        `${cpuDeltaRatio > 0 ? "+" : ""}${(cpuDeltaRatio * 100).toFixed(1)}%`
      : "-";
    const memDeltaPct =
      memDeltaRatio !== undefined ?
        `${memDeltaRatio > 0 ? "+" : ""}${(memDeltaRatio * 100).toFixed(1)}%`
      : "-";
    // Determine if increase exceeds baseline error bars; only then color red
    const cpuIncrease = cpuDeltaRatio !== undefined && cpuDeltaRatio > 0;
    const memIncrease = memDeltaRatio !== undefined && memDeltaRatio > 0;
    const cpuBeyondError =
      cpuIncrease && bCpuStdDevMs !== undefined ?
        cpuAvgMsNum - (bCpuMs ?? 0) > bCpuStdDevMs
      : cpuIncrease;
    const memBeyondError =
      memIncrease && bMemStdDevBytes !== undefined ?
        memAvgNum - (bMemBytes ?? 0) > bMemStdDevBytes
      : memIncrease;
    const cpuColor =
      cpuBeyondError ?
        (s: string) => pc.bold(pc.red(s))
      : (s: string) => (cpuIncrease ? pc.yellow(s) : pc.green(s));
    const memColor =
      memBeyondError ?
        (s: string) => pc.bold(pc.red(s))
      : (s: string) => (memIncrease ? pc.yellow(s) : pc.green(s));
    table.push([
      pc.cyan(titleOnly),
      pc.white(`${cpuAvgMs} ms ± ${cpuSdMs} ms`),
      cpuColor(cpuDeltaPct),
      pc.white(`${memAvg} ± ${memSd}`),
      memColor(memDeltaPct),
    ]);
  } else {
    table.push([
      pc.cyan(titleOnly),
      pc.white(`${cpuAvgMs} ms ± ${cpuSdMs} ms`),
      ...(baselineCompare ?
        [pc.dim("-"), pc.white(`${memAvg} ± ${memSd}`), pc.dim("-")]
      : [pc.white(`${memAvg} ± ${memSd}`)]),
    ]);
  }
}
if (baselineComparePath) {
  console.log(pc.dim(`\nCompared against baseline: ${baselineComparePath}`));
}
console.log(table.toString());
// Write baseline file if requested
if (baselinePath) {
  const baseline = {
    generatedAt: new Date().toISOString(),
    runsPerScenario: RUNS,
    scenarios: results.map((r) => ({
      name: r.name,
      title: r.title,
      description: r.description,
      runs: r.runs,
      cpu: {
        avgMicros: r.totalCpuMicros,
        avgMs: Number((r.totalCpuMicros / 1000).toFixed(3)),
        stddevMicros: r.cpuStdDevMicros ?? 0,
        stddevMs:
          r.cpuStdDevMicros ? Number((r.cpuStdDevMicros / 1000).toFixed(3)) : 0,
      },
      memory: {
        avgBytesDelta: r.heapUsedBytesDelta,
        stddevBytes: r.memStdDevBytes ?? 0,
      },
      error: r.error || null,
    })),
  };
  try {
    await writeFile(baselinePath!, JSON.stringify(baseline, null, 2) + "\n");
    console.log(`Baseline written to ${baselinePath}`); // console output intentional
  } catch (e: any) {
    console.error(`Failed to write baseline file: ${e?.message || e}`); // console output intentional
  }
}
/* eslint-enable no-console */
