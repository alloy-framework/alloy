import { ref, stop, effect as vueEffect } from "@vue/reactivity";
import { describe, expect, it } from "vitest";
import { effect } from "../src/reactivity.js";
import { flushJobs, scheduler } from "../src/scheduler.js";

describe("scheduler", () => {
  it("does not run stopped effects from the queue", () => {
    const source = ref(0);
    let runCount = 0;

    // Create an effect that tracks source via alloy's scheduler.
    const runner = vueEffect(
      () => {
        runCount++;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        source.value;
      },
      { scheduler: scheduler() },
    );
    expect(runCount).toBe(1);

    // Trigger the effect — it gets queued in the scheduler.
    source.value = 1;
    // Stop the effect before flushing.
    stop(runner);
    flushJobs();

    // The stopped effect must not have run.
    expect(runCount).toBe(1);
  });

  it("runs active effects normally", () => {
    const source = ref(0);
    let runCount = 0;

    effect(() => {
      runCount++;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      source.value;
    });

    expect(runCount).toBe(1);
    source.value = 1;
    flushJobs();
    expect(runCount).toBe(2);
    source.value = 2;
    flushJobs();
    expect(runCount).toBe(3);
  });
});
