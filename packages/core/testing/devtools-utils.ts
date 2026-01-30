import WebSocket from "ws";

export interface DevtoolsMessage {
  type: string;
  [key: string]: unknown;
}

/**
 * Creates a message collector that accumulates messages and provides utilities
 * for waiting on conditions. Useful for tests with reactive updates.
 */
export function createMessageCollector(socket: WebSocket) {
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
 */
export function filterRenderTreeMessages(
  messages: DevtoolsMessage[],
): DevtoolsMessage[] {
  return messages.filter(
    (m) =>
      m.type === "render:reset" ||
      m.type === "render:nodeAdded" ||
      m.type === "render:nodeUpdated" ||
      m.type === "render:nodeRemoved",
  );
}

/**
 * Filter messages to only include effect debug messages (those starting with "effect:")
 */
export function filterEffectsMessages(
  messages: DevtoolsMessage[],
): DevtoolsMessage[] {
  return messages.filter((m) => m.type.startsWith("effect:"));
}
