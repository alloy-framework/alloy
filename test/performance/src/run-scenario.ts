// Child process runner: loads a scenario module, executes runTest, and prints JSON metrics
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

interface ScenarioResult {
  name: string;
  totalCpuMicros: number;
  heapUsedBytesDelta: number;
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
  };

  try {
    const modUrl = pathToFileURL(path.resolve(scenarioPath)).href;
    const mod = await import(modUrl);
    if (typeof mod.runTest !== "function")
      throw new Error("runTest() export missing");

    const startUsage = process.cpuUsage();
    const startMem = process.memoryUsage();
    const _holdThis = await mod.runTest();
    const usage = process.cpuUsage(startUsage);
    const mem = process.memoryUsage();
    result.totalCpuMicros = usage.user + usage.system;
    result.heapUsedBytesDelta = mem.heapUsed - startMem.heapUsed;
  } catch (e: any) {
    result.error = e?.message || String(e);
  }

  // Emit single JSON line for parent to parse
  process.stdout.write(JSON.stringify(result) + "\n");
}

void main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Unexpected error in scenario runner:", err);
  process.exit(1);
});
