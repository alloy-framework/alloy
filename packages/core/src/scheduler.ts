import { ReactiveEffectRunner } from "@vue/reactivity";

export interface QueueJob {
  (): any;
}
const queue = new Set<QueueJob>();

export function scheduler(jobGetter: () => ReactiveEffectRunner) {
  return () => {
    queueJob(jobGetter());
  };
}
export function queueJob(job: QueueJob) {
  // the set is serving an important purpose here in deduping the effects we run
  // (which in effect coalesces multiple update effects together).
  queue.add(job);
}

export function flushJobs() {
  for (const job of queue) {
    queue.delete(job);
    job();
  }
}
