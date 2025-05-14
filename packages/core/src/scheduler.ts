import { ReactiveEffectRunner } from "@vue/reactivity";

export interface QueueJob {
  (): any;
}
const immediateQueue = new Set<QueueJob>();
const queue = new Set<QueueJob>();

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

export function flushJobs() {
  let job;
  while ((job = takeJob()) !== null) {
    job();
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
