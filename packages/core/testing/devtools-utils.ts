import WebSocket from "ws";

export interface DevtoolsMessage {
  type: string;
  [key: string]: unknown;
}

const ALL_CHANNELS = [
  "render",
  "effects",
  "refs",
  "edges",
  "symbols",
  "scopes",
  "files",
  "directories",
  "scheduler",
  "diagnostics",
  "errors",
  "lifecycle",
];

/** Subscribe to all channels on the given socket. */
export function subscribeAll(socket: WebSocket): void {
  socket.send(JSON.stringify({ type: "subscribe", channels: ALL_CHANNELS }));
}

/**
 * Creates a message collector that accumulates messages and provides utilities
 * for waiting on conditions. Useful for tests with reactive updates.
 *
 * Returns a Promise because it waits for the subscription to be processed by
 * the server before the caller starts rendering.
 *
 * @param channels - Optional list of channels to subscribe to. Defaults to all channels.
 */
export async function createMessageCollector(
  socket: WebSocket,
  channels?: string[],
) {
  socket.send(
    JSON.stringify({ type: "subscribe", channels: channels ?? ALL_CHANNELS }),
  );
  await new Promise((resolve) => setTimeout(resolve, 50));
  let renderBuffer: DevtoolsMessage[] = [];
  let flushBuffer: DevtoolsMessage[] = [];
  const completedRenderBatches: DevtoolsMessage[][] = [];
  const completedFlushBatches: DevtoolsMessage[][] = [];
  const renderWaiters: Array<{
    resolve: (messages: DevtoolsMessage[]) => void;
    reject: (error: Error) => void;
    timeout: NodeJS.Timeout;
  }> = [];
  const flushWaiters: Array<{
    resolve: (messages: DevtoolsMessage[]) => void;
    reject: (error: Error) => void;
    timeout: NodeJS.Timeout;
  }> = [];

  const resolveBatch = (
    batch: DevtoolsMessage[],
    waiters: typeof renderWaiters,
    completed: DevtoolsMessage[][],
  ) => {
    if (waiters.length > 0) {
      for (const waiter of waiters.splice(0, waiters.length)) {
        clearTimeout(waiter.timeout);
        waiter.resolve(batch);
      }
    } else {
      completed.push(batch);
    }
  };

  const purgeMessages = (
    targetBuffer: DevtoolsMessage[],
    targetCompleted: DevtoolsMessage[][],
    batch: DevtoolsMessage[],
  ) => {
    if (batch.length === 0) {
      return {
        buffer: targetBuffer,
        completed: targetCompleted,
      };
    }

    const toRemove = new Set(batch);
    const buffer = targetBuffer.filter((msg) => !toRemove.has(msg));
    const completed = targetCompleted
      .map((messages) => messages.filter((msg) => !toRemove.has(msg)))
      .filter((messages) => messages.length > 0);

    return { buffer, completed };
  };

  const onMessage = (data: WebSocket.RawData) => {
    try {
      const message = JSON.parse(String(data)) as DevtoolsMessage;
      renderBuffer.push(message);
      flushBuffer.push(message);

      if (
        message.type === "render:complete" ||
        message.type === "render:error"
      ) {
        const batch = renderBuffer;
        renderBuffer = [];
        resolveBatch(batch, renderWaiters, completedRenderBatches);
      }

      if (message.type === "flushJobs:complete") {
        const batch = flushBuffer;
        flushBuffer = [];
        resolveBatch(batch, flushWaiters, completedFlushBatches);
      }
    } catch {
      // ignore invalid messages
    }
  };

  socket.on("message", onMessage);

  return {
    waitForRender(): Promise<DevtoolsMessage[]> {
      if (completedRenderBatches.length > 0) {
        const batch = completedRenderBatches.shift()!;
        const purged = purgeMessages(flushBuffer, completedFlushBatches, batch);
        flushBuffer = purged.buffer;
        completedFlushBatches.length = 0;
        return Promise.resolve(batch);
      }

      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          const types = renderBuffer.map((m) => m.type).join(", ");
          reject(
            new Error(
              `Timed out waiting for render completion. Received ${renderBuffer.length} messages${types ? `: ${types}` : "."}`,
            ),
          );
        }, 2000);

        renderWaiters.push({
          resolve: (messages) => {
            const purged = purgeMessages(
              flushBuffer,
              completedFlushBatches,
              messages,
            );
            flushBuffer = purged.buffer;
            completedFlushBatches.length = 0;
            resolve(messages);
          },
          reject,
          timeout,
        });
      });
    },
    waitForFlush(): Promise<DevtoolsMessage[]> {
      if (completedFlushBatches.length > 0) {
        const batch = completedFlushBatches.shift()!;
        const purged = purgeMessages(
          renderBuffer,
          completedRenderBatches,
          batch,
        );
        renderBuffer = purged.buffer;
        completedRenderBatches.length = 0;
        completedRenderBatches.push(...purged.completed);
        return Promise.resolve(batch);
      }

      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          const types = flushBuffer.map((m) => m.type).join(", ");
          reject(
            new Error(
              `Timed out waiting for flushJobs:complete. Received ${flushBuffer.length} messages${types ? `: ${types}` : "."}`,
            ),
          );
        }, 2000);

        flushWaiters.push({
          resolve: (messages) => {
            const purged = purgeMessages(
              renderBuffer,
              completedRenderBatches,
              messages,
            );
            renderBuffer = purged.buffer;
            completedRenderBatches.length = 0;
            completedRenderBatches.push(...purged.completed);
            resolve(messages);
          },
          reject,
          timeout,
        });
      });
    },
    /**
     * Stop collecting messages
     */
    stop() {
      socket.off("message", onMessage);
      for (const waiter of renderWaiters.splice(0, renderWaiters.length)) {
        clearTimeout(waiter.timeout);
        waiter.reject(new Error("Collector stopped before render completion."));
      }
      for (const waiter of flushWaiters.splice(0, flushWaiters.length)) {
        clearTimeout(waiter.timeout);
        waiter.reject(
          new Error("Collector stopped before flushJobs:complete."),
        );
      }
    },
  };
}

/**
 * Filter messages to only include render tree messages (those starting with "render:")
 * Excludes trace messages (those with triggerIds).
 */
export function filterRenderTreeMessages(
  messages: DevtoolsMessage[],
): DevtoolsMessage[] {
  return messages.filter(
    (m) => m.type.startsWith("render") && !("triggerIds" in m),
  );
}

/**
 * Filter messages to only include effect/ref/edge debug messages.
 * Excludes trace messages (those with triggerIds).
 */
export function filterEffectsMessages(
  messages: DevtoolsMessage[],
): DevtoolsMessage[] {
  return messages.filter(
    (m) =>
      (m.type.startsWith("effect:") ||
        m.type.startsWith("ref:") ||
        m.type.startsWith("edge:")) &&
      !("triggerIds" in m),
  );
}
