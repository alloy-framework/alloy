import { ReactiveEffect } from "@vue/reactivity";
import { debug } from "./debug/index.js";

export interface QueueJob {
  run(): void;
}
const immediateQueue = new Set<QueueJob>();
const queue = new Set<QueueJob>();
function isJobActive(job: QueueJob): boolean {
  // ReactiveEffect uses bit 0 (flags & 1) as the ACTIVE flag.
  // Skip effects that were stopped after being queued.
  const flags = (job as any).flags;
  return flags === undefined || (flags & 1) !== 0;
}
const pendingPromises = new Set<Promise<any>>();
let waitForSignalPromise: Promise<void> | null = null;
let resolveWaitForSignal: (() => void) | null = null;
let jobSignalPromise: Promise<void> | null = null;
let resolveJobSignal: (() => void) | null = null;

// Maps effect debug IDs to the ref that most recently triggered them
const lastTriggerRef = new Map<number, number>();

/**
 * Record which ref triggered an effect re-run.
 * Called from the onTrigger debug hook before the effect is scheduled.
 */
export function setLastTriggerRef(effectDebugId: number, refId: number): void {
  lastTriggerRef.set(effectDebugId, refId);
}

export function scheduler(immediate = false) {
  if (!immediate) return defaultScheduler;
  return function (this: ReactiveEffect) {
    queueJob(this, true);
  };
}

const defaultScheduler = function (this: ReactiveEffect) {
  queueJob(this, false);
};
export function queueJob(job: QueueJob | (() => void), immediate = false) {
  // if we have an immediate job, we don't need to queue the normal job.
  // the set is serving an important purpose here in deduping the effects we run
  // (which in effect coalesces multiple update effects together).
  if (typeof job === "function") {
    job = { run: job };
  }
  if (immediate) {
    immediateQueue.add(job);
  } else {
    queue.add(job);
  }

  if (resolveJobSignal) {
    resolveJobSignal();
    resolveJobSignal = null;
    jobSignalPromise = null;
  }
}

/**
 * Register a promise that the scheduler should wait for during flushJobs.
 * This is used by async resources to ensure the scheduler waits for their completion.
 */
export function trackPromise(promise: Promise<any>) {
  pendingPromises.add(promise);
  void promise.finally(() => {
    pendingPromises.delete(promise);
  });
}

export function flushJobs() {
  // First, run all synchronous jobs
  let job;
  while ((job = takeJob()) !== null) {
    if (!isJobActive(job)) continue;
    job.run();
  }

  // If there are no pending promises, we're done
  if (pendingPromises.size > 0) {
    throw new Error(
      "Asynchronous jobs were found but render was called synchronously. Use `renderAsync` instead.",
    );
  }

  debug.render.flushJobsComplete();
}

export function waitForSignal(): Promise<void> {
  if (!waitForSignalPromise) {
    waitForSignalPromise = new Promise<void>((resolve) => {
      resolveWaitForSignal = resolve;
    });
    pendingPromises.add(waitForSignalPromise);
  }
  return waitForSignalPromise;
}

export function signalSchedulerWait() {
  if (resolveWaitForSignal) {
    resolveWaitForSignal();
    resolveWaitForSignal = null;
  }
  if (waitForSignalPromise) {
    pendingPromises.delete(waitForSignalPromise);
  }
  waitForSignalPromise = null;
}

export function isWaitingForSignal() {
  return waitForSignalPromise !== null;
}

export async function flushJobsAsync() {
  // Keep running jobs until both the queues are empty and all promises are resolved
  while (true) {
    // First, run all synchronous jobs
    let job;
    while ((job = takeJob()) !== null) {
      if (!isJobActive(job)) continue;
      job.run();
    }

    // If there are no pending promises, we're done
    if (pendingPromises.size === 0) {
      break;
    }

    if (!jobSignalPromise) {
      jobSignalPromise = new Promise<void>((resolve) => {
        resolveJobSignal = resolve;
      });
    }

    // Wait for either pending promises to complete or new jobs to arrive
    await Promise.race([
      Promise.allSettled(Array.from(pendingPromises)),
      jobSignalPromise,
    ]);

    // Clear the job signal after each iteration so we create a new one next time
    jobSignalPromise = null;
    resolveJobSignal = null;
  }

  debug.render.flushJobsComplete();
}

function takeJob() {
  if (immediateQueue.size > 0) {
    // return first item in immediateQueue
    const job = immediateQueue.values().next().value!;
    immediateQueue.delete(job);
    return job;
  }
  if (queue.size > 0) {
    // return first item in queue
    const job = queue.values().next().value!;
    queue.delete(job);
    return job;
  }
  return null;
}
