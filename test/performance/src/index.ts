// Performance harness.
//
// Two modes:
//
//   1. Single mode (default): runs each scenario N times, reports
//      mean ± sd. Optionally compares against a stored baseline.json
//      (single-distribution Welch test if the baseline has raw samples,
//      else just a delta).
//
//   2. Paired A/B mode (--compare-with <other-scenarios-dir>): runs the
//      *same* scenario from two scenarios trees, alternating samples
//      A,B,A,B,... so per-sample host-load drift cancels out. Reports
//      paired t-test with 95% CI on the difference. This is the mode the
//      ralph loop should use to gate accept/reject decisions.
//
// Each sample = a fresh `node` child running run-scenario.ts, which
// imports the scenario module, calls runTest(), and emits a JSON line
// containing per-sample CPU (inner runTest), heap delta, module-load CPU,
// and child wall-clock time. The harness consumes stdout and aggregates.

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

import { mean, paired, stddev, welch, type WelchResult } from "./stats.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── CLI args ────────────────────────────────────────────────────────────────
const parsed = parseArgs({
  options: {
    "write-baseline": { type: "string" },
    baseline: { type: "string" },
    scenario: { type: "string" },
    profile: { type: "boolean" },
    samples: { type: "string" },
    "compare-with": { type: "string" },
    metric: { type: "string" }, // "inner" (default) | "wall" | "child-cpu"
  },
  allowPositionals: true,
});

const baselinePath: string | undefined = parsed.values["write-baseline"];
const baselineOptionPath: string | undefined = parsed.values.baseline;
const compareWith: string | undefined = parsed.values["compare-with"];
const metric: "inner" | "wall" | "child-cpu" =
  (parsed.values.metric as any) ?? "inner";

const scenariosDir = path.resolve(__dirname, "..", "scenarios");

const entries = await readdir(scenariosDir, { withFileTypes: true });
const scenarioDirs = entries.filter((e) => e.isDirectory());

// In paired mode the "compare-with" arg points at an alternate alloy
// checkout (e.g. a worktree at the slice base sha). We resolve it to its
// built-scenarios dir using a few common shapes:
//   - already pointing at <...>/test/performance/dist/scenarios → use as-is
//   - pointing at a worktree root → append test/performance/dist/scenarios
//   - pointing at <...>/test/performance → append dist/scenarios
async function resolveAltScenarios(p: string): Promise<string> {
  const abs = path.resolve(p);
  const candidates = [
    abs,
    path.join(abs, "dist/scenarios"),
    path.join(abs, "test/performance/dist/scenarios"),
  ];
  const wantedNames = new Set(scenarioDirs.map((d) => d.name));
  for (const c of candidates) {
    try {
      const stat = await readdir(c, { withFileTypes: true });
      if (stat.some((d) => d.isDirectory() && wantedNames.has(d.name)))
        return c;
    } catch {
      /* try next */
    }
  }
  throw new Error(
    `--compare-with: could not resolve scenarios dir from ${p}. ` +
      `Tried: ${candidates.join(", ")}`,
  );
}
const scenariosDirAlt =
  compareWith ? await resolveAltScenarios(compareWith) : undefined;

const scenarioFilter = parsed.values.scenario as string | undefined;
const selectedScenarioDirs =
  scenarioFilter ?
    scenarioDirs.filter((d) => d.name === scenarioFilter)
  : scenarioDirs;
if (scenarioFilter && selectedScenarioDirs.length === 0) {
  // eslint-disable-next-line no-console
  console.error(
    `Scenario '${scenarioFilter}' not found. Available: ${scenarioDirs
      .map((d) => d.name)
      .sort()
      .join(", ")}`,
  );
  process.exit(1);
}

let RUNS = compareWith ? 30 : 5;
const samplesOpt = parsed.values.samples as string | undefined;
if (samplesOpt) {
  const n = parseInt(samplesOpt, 10);
  if (!Number.isNaN(n) && n > 0) RUNS = n;
  else {
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
  RUNS = 1;
  // eslint-disable-next-line no-console
  console.log("[perf] Profiling enabled --inspect-brk, connect with dev tools");
}
if (process.env.ALLOY_PERF_HEAPSNAPSHOT) childNodeArgs.push("--expose-gc");
if (process.env.ALLOY_PERF_CPUPROF_DIR) {
  childNodeArgs.push("--cpu-prof");
  childNodeArgs.push("--cpu-prof-dir", process.env.ALLOY_PERF_CPUPROF_DIR);
}

// ── Sampling ────────────────────────────────────────────────────────────────

interface SampleRaw {
  innerCpuMicros: number; // CPU spent inside runTest()
  moduleLoadCpuMicros: number; // CPU spent loading the scenario module
  heapBytesDelta: number;
  childWallMicros: number; // wall-clock duration of the child node process
  childCpuMicros: number; // total CPU billed to child (user+system) approx
}

const runnerPath = path.join(__dirname, "run-scenario.js");

async function runOneSample(
  scenarioPath: string,
  scenarioName: string,
): Promise<{ ok: true; s: SampleRaw } | { ok: false; err: string }> {
  const child = spawn(
    process.execPath,
    [...childNodeArgs, runnerPath, scenarioPath, scenarioName],
    { stdio: ["ignore", "pipe", "pipe"], env: process.env },
  );
  let stdout = "";
  let stderr = "";
  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (d) => {
    stdout += d;
    process.stdout.write(d);
  });
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (d) => {
    stderr += d;
    process.stderr.write(d);
  });
  const wallStart = process.hrtime.bigint();
  const exitCode: number = await new Promise((resolve) =>
    child.on("close", (code) => resolve(code ?? -1)),
  );
  const wallMicros = Number((process.hrtime.bigint() - wallStart) / 1000n);
  if (exitCode !== 0) {
    return { ok: false, err: stderr.trim() || `Child exited with ${exitCode}` };
  }
  try {
    const line = stdout.trim().split(/\n/).pop() || "";
    const parsed = JSON.parse(line);
    if (parsed.error) return { ok: false, err: parsed.error };
    const inner = (parsed.totalCpuMicros as number) ?? 0;
    const load = (parsed.moduleLoadCpuMicros as number) ?? 0;
    const heap = (parsed.heapUsedBytesDelta as number) ?? 0;
    return {
      ok: true,
      s: {
        innerCpuMicros: inner,
        moduleLoadCpuMicros: load,
        heapBytesDelta: heap,
        childWallMicros: wallMicros,
        // Approximate child CPU: inner runTest CPU + module-load CPU.
        // (process.cpuUsage of a *child* from outside isn't free in node;
        // this sum captures the same window without extra overhead and is
        // dominated by the same components.)
        childCpuMicros: inner + load,
      },
    };
  } catch (e: any) {
    return { ok: false, err: `Failed to parse output: ${e?.message || e}` };
  }
}

// ── Scenario discovery ─────────────────────────────────────────────────────

interface ScenarioMeta {
  name: string;
  pathA: string;
  pathB?: string; // set in paired mode
  title: string;
  description: string;
}

const scenarios: ScenarioMeta[] = [];
for (const dir of selectedScenarioDirs) {
  const name = dir.name;
  const pathA = path.join(scenariosDir, name, "index.js");
  const pathB =
    scenariosDirAlt ? path.join(scenariosDirAlt, name, "index.js") : undefined;
  let title = name;
  let description = "";
  try {
    const metaMod: any = await import(pathToFileURL(pathA).href);
    if (typeof metaMod.title === "string" && metaMod.title.trim())
      title = metaMod.title.trim();
    if (typeof metaMod.description === "string")
      description = metaMod.description.trim();
  } catch {
    /* ignore */
  }
  scenarios.push({ name, pathA, pathB, title, description });
}

// ── Result types ───────────────────────────────────────────────────────────

interface ScenarioResult {
  name: string;
  title: string;
  description: string;
  // Single-mode aggregates (the "B" side in paired mode)
  cpuMean: number;
  cpuSd: number;
  memMean: number;
  memSd: number;
  wallMean: number;
  wallSd: number;
  loadMean: number;
  loadSd: number;
  runs: number;
  samplesA?: SampleRaw[]; // populated only in paired mode (alt tree)
  samplesB: SampleRaw[];
  paired?: { cpu: WelchResult; mem: WelchResult; wall: WelchResult };
  error?: string;
}

function pickMetric(s: SampleRaw): number {
  switch (metric) {
    case "wall":
      return s.childWallMicros;
    case "child-cpu":
      return s.childCpuMicros;
    case "inner":
    default:
      return s.innerCpuMicros;
  }
}

// ── Main loop ──────────────────────────────────────────────────────────────

const results: ScenarioResult[] = [];

const tasks = new Listr(
  scenarios.map((s) => ({
    title: s.title !== s.name ? `${s.title} (${s.name})` : s.title,
    task: async (_: unknown, task: any) => {
      const samplesA: SampleRaw[] = [];
      const samplesB: SampleRaw[] = [];
      let error: string | undefined;
      for (let i = 0; i < RUNS; i++) {
        if (compareWith && s.pathB) {
          // For each pair, randomize which side runs first to avoid any
          // systematic order bias (e.g. CPU governor ramp affecting whichever
          // side is always second). Use a deterministic per-iteration coin
          // flip seeded by iteration index so runs are reproducible.
          const aFirst = ((i * 2654435761) >>> 0) % 2 === 0;
          if (aFirst) {
            task.output = `paired ${i + 1}/${RUNS} (A→B)`;
            const a = await runOneSample(s.pathB, s.name);
            if (!a.ok) {
              error = `A: ${a.err}`;
              break;
            }
            samplesA.push(a.s);
            const b = await runOneSample(s.pathA, s.name);
            if (!b.ok) {
              error = `B: ${b.err}`;
              break;
            }
            samplesB.push(b.s);
          } else {
            task.output = `paired ${i + 1}/${RUNS} (B→A)`;
            const b = await runOneSample(s.pathA, s.name);
            if (!b.ok) {
              error = `B: ${b.err}`;
              break;
            }
            samplesB.push(b.s);
            const a = await runOneSample(s.pathB, s.name);
            if (!a.ok) {
              error = `A: ${a.err}`;
              break;
            }
            samplesA.push(a.s);
          }
        } else {
          task.output = `run ${i + 1}/${RUNS}`;
          const r = await runOneSample(s.pathA, s.name);
          if (!r.ok) {
            error = r.err;
            break;
          }
          samplesB.push(r.s);
        }
      }

      // Discard host-warmup samples in single mode only. In paired mode the
      // alternation cancels host drift across the pair, so keep all samples.
      let measuredA = samplesA;
      let measuredB = samplesB;
      if (!compareWith) {
        const WARMUP = Math.min(3, Math.floor(samplesB.length / 3));
        measuredB = samplesB.slice(WARMUP);
      }

      const cpuB = measuredB.map(pickMetric);
      const memB = measuredB.map((s) => s.heapBytesDelta);
      const wallB = measuredB.map((s) => s.childWallMicros);
      const loadB = measuredB.map((s) => s.moduleLoadCpuMicros);

      const aggregated: ScenarioResult = {
        name: s.name,
        title: s.title,
        description: s.description,
        runs: measuredB.length || RUNS,
        cpuMean: cpuB.length ? mean(cpuB) : 0,
        cpuSd: cpuB.length > 1 ? stddev(cpuB) : 0,
        memMean: memB.length ? mean(memB) : 0,
        memSd: memB.length > 1 ? stddev(memB) : 0,
        wallMean: wallB.length ? mean(wallB) : 0,
        wallSd: wallB.length > 1 ? stddev(wallB) : 0,
        loadMean: loadB.length ? mean(loadB) : 0,
        loadSd: loadB.length > 1 ? stddev(loadB) : 0,
        samplesB: measuredB,
        samplesA: compareWith ? measuredA : undefined,
        error,
      };
      if (
        compareWith &&
        measuredA.length === measuredB.length &&
        measuredB.length >= 2
      ) {
        const cpuA = measuredA.map(pickMetric);
        const memA = measuredA.map((s) => s.heapBytesDelta);
        const wallA = measuredA.map((s) => s.childWallMicros);
        aggregated.paired = {
          cpu: paired(cpuA, cpuB),
          mem: paired(memA, memB),
          wall: paired(wallA, wallB),
        };
      }
      results.push(aggregated);
      if (error) {
        task.output = `ERROR: ${error}`;
      } else if (aggregated.paired) {
        const c = aggregated.paired.cpu;
        const sig =
          c.significant ?
            c.diff > 0 ?
              pc.red("REGRESS")
            : pc.green("WIN")
          : pc.dim("ns");
        const pct = (c.diffPct * 100).toFixed(1);
        const ciLo = (c.ci95Pct[0] * 100).toFixed(1);
        const ciHi = (c.ci95Pct[1] * 100).toFixed(1);
        task.output = `runs=${aggregated.runs} Δcpu=${pct}% [${ciLo}, ${ciHi}]% p=${c.pValue.toExponential(1)} ${sig}`;
      } else {
        task.output = `runs=${aggregated.runs} cpu=${fmtCpu(aggregated.cpuMean)} ± ${fmtCpu(aggregated.cpuSd)} memΔ=${fmtMem(aggregated.memMean)} ± ${fmtMem(aggregated.memSd)} wall=${fmtCpu(aggregated.wallMean)}`;
      }
    },
    options: { persistentOutput: true },
  })),
  { concurrent: false },
);

await tasks.run();

// ── Reporting ──────────────────────────────────────────────────────────────

/* eslint-disable no-console */

function fmtMem(bytes: number): string {
  const sign = bytes < 0 ? "-" : "";
  let n = Math.abs(bytes) / 1024;
  const units = ["KB", "MB", "GB"];
  let u = 0;
  while (u < units.length - 1 && n >= 1024) {
    n /= 1024;
    u++;
  }
  return sign + n.toFixed(2) + " " + units[u];
}
function fmtCpu(micros: number): string {
  return (micros / 1000).toFixed(2) + " ms";
}

if (compareWith) {
  // Paired mode rendering — show A vs B with CI + verdict.
  const t = new Table({
    head: ["Title", "A (alt)", "B (current)", "ΔCPU%", "CI95%", "p", "Verdict"],
    style: { head: [], border: [] },
    wordWrap: true,
  });
  for (const r of results) {
    if (r.error) {
      t.push([
        pc.yellow(r.title),
        pc.bold(pc.red(r.error)),
        "-",
        "-",
        "-",
        "-",
        "-",
      ]);
      continue;
    }
    const aMean = r.paired ? r.paired.cpu.meanA : 0;
    const bMean = r.paired ? r.paired.cpu.meanB : r.cpuMean;
    const c = r.paired?.cpu;
    const verdict =
      c ?
        c.significant ?
          c.diff > 0 ?
            pc.bold(pc.red("REGRESS"))
          : pc.bold(pc.green("WIN"))
        : pc.dim("not sig.")
      : pc.dim("(n<2)");
    t.push([
      pc.cyan(r.title),
      pc.white(fmtCpu(aMean)),
      pc.white(fmtCpu(bMean)),
      c ? `${(c.diffPct * 100).toFixed(2)}%` : "-",
      c ?
        `[${(c.ci95Pct[0] * 100).toFixed(2)}, ${(c.ci95Pct[1] * 100).toFixed(2)}]%`
      : "-",
      c ? c.pValue.toExponential(2) : "-",
      verdict,
    ]);
  }
  console.log(
    pc.dim(
      `\nPaired A vs B (alt: ${compareWith}, metric: ${metric}, samples: ${RUNS})`,
    ),
  );
  console.log(t.toString());
} else {
  // Single mode — keep prior shape (so existing callers / docs aren't broken).
  // Optionally compare against a stored baseline.json.
  let baselineCompare: Map<string, any> | undefined;
  let baselineComparePath: string | undefined;
  try {
    const defaultBaseline = path.join(process.cwd(), "baseline.json");
    let usePath: string | undefined;
    try {
      await access(defaultBaseline, FS_CONSTANTS.R_OK);
      usePath = defaultBaseline;
    } catch {
      if (baselineOptionPath) usePath = baselineOptionPath;
    }
    if (usePath) {
      const raw = await readFile(usePath, "utf8");
      const parsed: any = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.scenarios)) {
        baselineCompare = new Map(
          parsed.scenarios.map((s: any) => [s.name, s]),
        );
        baselineComparePath = usePath;
      }
    }
  } catch {
    /* ignore */
  }

  const t = new Table({
    head:
      baselineCompare ?
        ["Title", "CPU (avg ± sd)", "CPU Δ%", "CI95%", "p", "Mem Δ"]
      : ["Title", "CPU (avg ± sd)", "Mem Δ (avg ± sd)", "Wall (avg)"],
    style: { head: [], border: [] },
    wordWrap: true,
  });
  for (const r of results) {
    if (r.error) {
      t.push([
        pc.yellow(r.title),
        pc.bold(pc.red(`ERROR: ${r.error}`)),
        ...(baselineCompare ? ["-", "-", "-"] : ["-", "-"]),
      ]);
      continue;
    }
    const cpuStr = `${fmtCpu(r.cpuMean)} ± ${fmtCpu(r.cpuSd)}`;
    const memStr = `${fmtMem(r.memMean)} ± ${fmtMem(r.memSd)}`;
    if (baselineCompare && baselineCompare.has(r.name)) {
      const b = baselineCompare.get(r.name)!;
      const bSamples: number[] | undefined = b.cpuSamplesMicros;
      let cpuDeltaPct = "-";
      let ci = "-";
      let p = "-";
      if (bSamples && bSamples.length >= 2 && r.samplesB.length >= 2) {
        const w = welch(bSamples, r.samplesB.map(pickMetric));
        cpuDeltaPct = `${(w.diffPct * 100).toFixed(2)}%`;
        ci = `[${(w.ci95Pct[0] * 100).toFixed(2)}, ${(w.ci95Pct[1] * 100).toFixed(2)}]%`;
        p = w.pValue.toExponential(2);
      } else if (b.cpu?.avgMicros) {
        const ratio = (r.cpuMean - b.cpu.avgMicros) / b.cpu.avgMicros;
        cpuDeltaPct = `${(ratio * 100).toFixed(2)}%`;
        ci = pc.dim("(no raw samples)");
      }
      const memDelta =
        b.memory?.avgBytesDelta != null ?
          `${(((r.memMean - b.memory.avgBytesDelta) / Math.max(b.memory.avgBytesDelta, 1)) * 100).toFixed(1)}%`
        : "-";
      t.push([
        pc.cyan(r.title),
        pc.white(cpuStr),
        cpuDeltaPct,
        ci,
        p,
        memDelta,
      ]);
    } else {
      t.push([
        pc.cyan(r.title),
        pc.white(cpuStr),
        pc.white(memStr),
        pc.white(fmtCpu(r.wallMean)),
      ]);
    }
  }
  if (baselineComparePath)
    console.log(pc.dim(`\nCompared against baseline: ${baselineComparePath}`));
  console.log(t.toString());
}

// ── Baseline write ─────────────────────────────────────────────────────────

if (baselinePath) {
  const baseline = {
    generatedAt: new Date().toISOString(),
    runsPerScenario: RUNS,
    metric,
    pairedAgainst: compareWith ?? null,
    scenarios: results.map((r) => ({
      name: r.name,
      title: r.title,
      description: r.description,
      runs: r.runs,
      cpu: {
        avgMicros: r.cpuMean,
        avgMs: Number((r.cpuMean / 1000).toFixed(3)),
        stddevMicros: r.cpuSd,
        stddevMs: Number((r.cpuSd / 1000).toFixed(3)),
      },
      memory: {
        avgBytesDelta: r.memMean,
        stddevBytes: r.memSd,
      },
      wall: { avgMicros: r.wallMean, stddevMicros: r.wallSd },
      moduleLoad: { avgMicros: r.loadMean, stddevMicros: r.loadSd },
      // Raw per-sample numbers — these unlock Welch's t-test / paired
      // comparisons against this baseline by future runs.
      cpuSamplesMicros: r.samplesB.map(pickMetric),
      memSamplesBytes: r.samplesB.map((s) => s.heapBytesDelta),
      wallSamplesMicros: r.samplesB.map((s) => s.childWallMicros),
      loadSamplesMicros: r.samplesB.map((s) => s.moduleLoadCpuMicros),
      paired:
        r.paired ?
          {
            samplesAcpu: r.samplesA?.map(pickMetric) ?? [],
            cpuDiffPct: r.paired.cpu.diffPct,
            cpuCi95Pct: r.paired.cpu.ci95Pct,
            cpuPValue: r.paired.cpu.pValue,
            cpuSignificant: r.paired.cpu.significant,
          }
        : null,
      error: r.error || null,
    })),
  };
  try {
    await writeFile(baselinePath, JSON.stringify(baseline, null, 2) + "\n");
    console.log(`Baseline written to ${baselinePath}`);
  } catch (e: any) {
    console.error(`Failed to write baseline file: ${e?.message || e}`);
  }
}
/* eslint-enable no-console */
