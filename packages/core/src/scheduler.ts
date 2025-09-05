import { ReactiveEffectRunner } from "@vue/reactivity";

export interface QueueJob {
  (): any;
}
const immediateQueue = new Set<QueueJob>();
const queue = new Set<QueueJob>();
const pendingPromises = new Set<Promise<any>>();

export function scheduler(
  jobGetter: () => ReactiveEffectRunner,
  immediate = false,
) {
  return () => {
    queueJob(jobGetter(), immediate);
  };
}
export function queueJob(job: QueueJob, immediate = false) {
  // if we have an immediate job, we don't need to queue the normal job.
  // the set is serving an important purpose here in deduping the effects we run
  // (which in effect coalesces multiple update effects together).
  if (immediate) {
    immediateQueue.add(job);
  } else {
    queue.add(job);
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
    job();
  }

  // If there are no pending promises, we're done
  if (pendingPromises.size > 0) {
    throw new Error(
      "Asynchronous jobs were found but render was called synchronously. Use `renderAsync` instead.",
    );
  }
}

export async function flushJobsAsync() {
  // Keep running jobs until both the queues are empty and all promises are resolved
  while (true) {
    // First, run all synchronous jobs
    let job;
    while ((job = takeJob()) !== null) {
      job();
    }

    // If there are no pending promises, we're done
    if (pendingPromises.size === 0) {
      break;
    }

    // Wait for all current promises to complete
    await Promise.allSettled(Array.from(pendingPromises));
  }
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
