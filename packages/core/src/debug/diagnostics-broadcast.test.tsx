import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, expect, it } from "vitest";
import { DiagnosticsCollector } from "../diagnostics.js";
import { closeTrace, initTrace, setChangeListener } from "./trace-writer.js";

let tmpDir: string;

beforeEach(async () => {
  tmpDir = mkdtempSync(join(tmpdir(), "alloy-diag-test-"));
});

afterEach(async () => {
  setChangeListener(null);
  closeTrace();
  rmSync(tmpDir, { recursive: true, force: true });
});

it("does not call insertDiagnostic when tracing is disabled", () => {
  let events = 0;
  setChangeListener(() => {
    events++;
  });

  const collector = new DiagnosticsCollector();
  for (let i = 0; i < 100; i++) {
    collector.emit({ message: `diag ${i}`, severity: "warning" });
  }

  // No trace DB => no change events should fire.
  expect(events).toBe(0);
  expect(collector.getDiagnostics()).toHaveLength(100);
});

it("emits one added event per diagnostic (linear, not quadratic)", async () => {
  await initTrace(join(tmpDir, "trace.db"));
  const events: Array<{ channel: string; action: string }> = [];
  setChangeListener((event) => {
    events.push({ channel: event.channel, action: event.action });
  });

  const collector = new DiagnosticsCollector();
  const N = 50;
  for (let i = 0; i < N; i++) {
    collector.emit({ message: `diag ${i}`, severity: "warning" });
  }

  const added = events.filter(
    (e) => e.channel === "diagnostics" && e.action === "added",
  );
  expect(added).toHaveLength(N); // was previously N*(N+1)/2 due to re-broadcast
});

it("emits one removed event per dismissal", async () => {
  await initTrace(join(tmpDir, "trace.db"));
  const events: Array<{ channel: string; action: string }> = [];
  setChangeListener((event) => {
    events.push({ channel: event.channel, action: event.action });
  });

  const collector = new DiagnosticsCollector();
  const handles = [];
  for (let i = 0; i < 10; i++) {
    handles.push(collector.emit({ message: `diag ${i}`, severity: "warning" }));
  }

  for (const h of handles) h.dismiss();

  const added = events.filter(
    (e) => e.channel === "diagnostics" && e.action === "added",
  );
  const removed = events.filter(
    (e) => e.channel === "diagnostics" && e.action === "removed",
  );
  expect(added).toHaveLength(10);
  expect(removed).toHaveLength(10);
  expect(collector.getDiagnostics()).toHaveLength(0);
});

it("dismiss is idempotent and only fires one removal", async () => {
  await initTrace(join(tmpDir, "trace.db"));
  const events: Array<{ channel: string; action: string }> = [];
  setChangeListener((event) => {
    events.push({ channel: event.channel, action: event.action });
  });

  const collector = new DiagnosticsCollector();
  const h = collector.emit({ message: "once", severity: "warning" });
  h.dismiss();
  h.dismiss();
  h.dismiss();

  const removed = events.filter(
    (e) => e.channel === "diagnostics" && e.action === "removed",
  );
  expect(removed).toHaveLength(1);
});
