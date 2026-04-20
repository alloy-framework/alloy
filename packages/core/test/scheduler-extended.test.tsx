import { ref, stop, effect as vueEffect } from "@vue/reactivity";
import { describe, expect, it } from "vitest";
import {
  flushJobs,
  flushJobsAsync,
  queueJob,
  scheduler,
} from "../src/scheduler.js";

describe("scheduler: isJobActive additional coverage", () => {
  it("does not run stopped effects in async flush", async () => {
    const source = ref(0);
    let runCount = 0;

    const runner = vueEffect(
      () => {
        runCount++;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        source.value;
      },
      { scheduler: scheduler() },
    );
    expect(runCount).toBe(1);

    source.value = 1;
    stop(runner);
    await flushJobsAsync();

    expect(runCount).toBe(1);
  });

  it("does not run stopped immediate effects", () => {
    const source = ref(0);
    let runCount = 0;

    const runner = vueEffect(
      () => {
        runCount++;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        source.value;
      },
      { scheduler: scheduler(true) },
    );
    expect(runCount).toBe(1);

    source.value = 1;
    stop(runner);
    flushJobs();

    expect(runCount).toBe(1);
  });

  it("runs effect in first flush but not after stop", () => {
    const source = ref(0);
    let runCount = 0;

    const runner = vueEffect(
      () => {
        runCount++;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        source.value;
      },
      { scheduler: scheduler() },
    );
    expect(runCount).toBe(1);

    // First flush: effect is active, should run.
    source.value = 1;
    flushJobs();
    expect(runCount).toBe(2);

    // Stop, then trigger again — should not run.
    stop(runner);
    source.value = 2;
    flushJobs();
    expect(runCount).toBe(2);
  });

  it("skips multiple stopped effects in the same flush", () => {
    const source = ref(0);
    let runCountA = 0;
    let runCountB = 0;

    const runnerA = vueEffect(
      () => {
        runCountA++;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        source.value;
      },
      { scheduler: scheduler() },
    );

    const runnerB = vueEffect(
      () => {
        runCountB++;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        source.value;
      },
      { scheduler: scheduler() },
    );

    expect(runCountA).toBe(1);
    expect(runCountB).toBe(1);

    source.value = 1;
    stop(runnerA);
    stop(runnerB);
    flushJobs();

    expect(runCountA).toBe(1);
    expect(runCountB).toBe(1);
  });

  it("handles plain function jobs that lack flags", () => {
    let ran = false;
    queueJob(() => {
      ran = true;
    });
    flushJobs();
    expect(ran).toBe(true);
  });
});
