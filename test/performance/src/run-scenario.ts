// Child process runner: loads a scenario module, executes runTest, and prints JSON metrics
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import v8 from "node:v8";

interface ScenarioResult {
  name: string;
  // CPU time spent inside `await runTest()` only — narrow attribution
  // window. Excludes module load and V8 init.
  totalCpuMicros: number;
  heapUsedBytesDelta: number;
  // CPU time spent loading the scenario module + transitive imports
  // (i.e. the alloy framework). A real user pays this on every fresh
  // invocation, so it is reported separately from the inner runTest
  // window so the harness can sum them for "real-world" cost reporting.
  moduleLoadCpuMicros: number;
  error?: string;
}

async function main() {
  const [, , scenarioPath, scenarioName] = process.argv;
  if (!scenarioPath || !scenarioName) {
    // eslint-disable-next-line no-console
    console.error("Usage: run-scenario <scenarioPath> <scenarioName>");
    process.exit(2);
  }

  const result: ScenarioResult = {
    name: scenarioName,
    totalCpuMicros: 0,
    heapUsedBytesDelta: 0,
    moduleLoadCpuMicros: 0,
  };

  let _holdResult: unknown; // keep retained so heap snapshot reflects the peak graph
  try {
    const modUrl = pathToFileURL(path.resolve(scenarioPath)).href;
    const loadStart = process.cpuUsage();
    const mod = await import(modUrl);
    const loadUsage = process.cpuUsage(loadStart);
    result.moduleLoadCpuMicros = loadUsage.user + loadUsage.system;
    if (typeof mod.runTest !== "function")
      throw new Error("runTest() export missing");

    const startUsage = process.cpuUsage();
    const startMem = process.memoryUsage();
    _holdResult = await mod.runTest();
    const usage = process.cpuUsage(startUsage);
    const mem = process.memoryUsage();
    result.totalCpuMicros = usage.user + usage.system;
    result.heapUsedBytesDelta = mem.heapUsed - startMem.heapUsed;
  } catch (e: any) {
    result.error = e?.message || String(e);
  }

  // Optionally write a heap snapshot after runTest completes. Gated on an env
  // var so normal benchmarking stays fast. The snapshot captures retained
  // objects from the scenario (via _holdResult) so memlab can surface what is
  // hanging around.
  const snapPath = process.env.ALLOY_PERF_HEAPSNAPSHOT;
  if (snapPath) {
    try {
      // Run GC if available so the snapshot reflects truly-retained memory,
      // not ephemeral allocations. Caller should pass --expose-gc.
      (globalThis as any).gc?.();
      v8.writeHeapSnapshot(snapPath);
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error("[perf] writeHeapSnapshot failed:", e?.message ?? e);
    }
  }
  // Reference so TS/ESLint don't drop the binding before the snapshot.
  void _holdResult;

  // Emit single JSON line for parent to parse
  process.stdout.write(JSON.stringify(result) + "\n");
}

void main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Unexpected error in scenario runner:", err);
  process.exit(1);
});
