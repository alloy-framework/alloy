import { getLastErrorContext } from "./reactivity.js";
import { trace, TracePhase } from "./tracer.js";

export interface QueueJob {
  (): any;
}
const queue = new Set<QueueJob>();
let flushing = false;
export function jobQueueSize() {
  return queue.size;
}

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
    trace(TracePhase.scheduler.queue, () => `Scheduling sync job`);
    job();
  } else {
    trace(TracePhase.scheduler.queue, () => `Scheduling post job`);
    queue.add(job);
  }
}

export function flushJobs() {
  if (flushing) {
    return;
  }
  trace(
    TracePhase.scheduler.flush,
    () => `flushing jobs, queue size: ${queue.size}`,
  );
  flushing = true;
  let job: QueueJob | null;
  while ((job = takeJob()) !== null) {
    try {
      job();
    } catch (e: any) {
      debug.sendError(e, getLastErrorContext());
      flushing = false;
      throw e;
    }
  }

  flushing = false;
}

function takeJob() {
  if (queue.size > 0) {
    trace(TracePhase.scheduler.take, () => "taking job");
    // return first item in queue
    const job = queue.values().next().value!;
    queue.delete(job);
    return job;
  }
  return null;
}
