import { getLastErrorContext } from "./reactivity.js";

export interface QueueJob {
  (): any;
}
const queue = new Set<QueueJob>();

export interface SchedulerJobOptions {
  flush?: "sync" | "post";
}
export function scheduler(
  jobGetter: () => QueueJob,
  options: SchedulerJobOptions = {},
) {
  return () => {
    queueJob(jobGetter(), options);
  };
}
export function queueJob(job: QueueJob, options: SchedulerJobOptions = {}) {
  if (options?.flush === "sync") {
    job();
  } else {
    queue.add(job);
  }
}

export function flushJobs() {
  let job: QueueJob | null;
  while ((job = takeJob()) !== null) {
    try {
      job();
    } catch (e: any) {
      debug.sendError(e, getLastErrorContext());
      throw e;
    }
  }
}

function takeJob() {
  if (queue.size > 0) {
    // return first item in queue
    const job = queue.values().next().value!;
    queue.delete(job);
    return job;
  }
  return null;
}
