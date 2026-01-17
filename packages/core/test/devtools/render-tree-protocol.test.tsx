import { Output, ref, renderAsync } from "@alloy-js/core";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import WebSocket from "ws";
import {
  ensureDevtoolsServer,
  resetDevtoolsServerForTests,
} from "../../src/devtools/devtools-server.js";
import { flushJobsAsync } from "../../src/scheduler.js";

interface DevtoolsMessage {
  type: string;
  [key: string]: unknown;
}

function waitForMessages(messages: DevtoolsMessage[], min: number) {
  return new Promise<void>((resolve, reject) => {
    const start = Date.now();
    const timer = setInterval(() => {
      if (messages.length >= min) {
        clearInterval(timer);
        resolve();
        return;
      }
      if (Date.now() - start > 2000) {
        clearInterval(timer);
        reject(new Error("Timed out waiting for devtools messages"));
      }
    }, 5);
  });
}

describe("devtools render tree protocol", () => {
  let originalEnv: string | undefined;
  let socket: WebSocket | undefined;
  const messages: DevtoolsMessage[] = [];

  beforeEach(async () => {
    messages.length = 0;
    originalEnv = process.env.ALLOY_DEBUG;
    process.env.ALLOY_DEBUG = "1";
    process.env.ALLOY_DEBUG_PORT = "0";

    const server = await ensureDevtoolsServer();
    if (!server) return;
    socket = new WebSocket(`ws://127.0.0.1:${server.port}`);
    socket.on("message", (data) => {
      try {
        messages.push(JSON.parse(String(data)) as DevtoolsMessage);
      } catch {
        // ignore invalid messages
      }
    });

    await new Promise<void>((resolve, reject) => {
      socket?.once("open", resolve);
      socket?.once("error", reject);
    });
  });

  afterEach(async () => {
    if (originalEnv === undefined) {
      delete process.env.ALLOY_DEBUG;
    } else {
      process.env.ALLOY_DEBUG = originalEnv;
    }
    delete process.env.ALLOY_DEBUG_PORT;

    if (socket) {
      socket.close();
      socket = undefined;
    }

    await resetDevtoolsServerForTests();
  });

  it("emits node additions for initial render", async () => {
    function Hello() {
      return "Hello";
    }

    await renderAsync(
      <Output>
        <Hello />
      </Output>,
    );

    await waitForMessages(messages, 2);

    expect(messages[0]?.type).toBe("renderTree:reset");

    const added = messages.filter((msg) => msg.type === "renderTree:nodeAdded");
    const hasHelloComponent = added.some(
      (msg) =>
        (msg as any).node?.kind === "component" &&
        (msg as any).node?.name === "Hello",
    );
    const hasTextNode = added.some(
      (msg) =>
        (msg as any).node?.kind === "text" &&
        (msg as any).node?.value === "Hello",
    );

    expect(hasHelloComponent).toBe(true);
    expect(hasTextNode).toBe(true);
  });

  it("emits node removal and addition for reactive updates", async () => {
    const count = ref(1);

    await renderAsync(<Output>Count: {count}</Output>);

    await waitForMessages(messages, 2);

    const removedBefore = messages.filter(
      (msg) => msg.type === "renderTree:nodeRemoved",
    ).length;

    count.value += 1;
    await flushJobsAsync();

    await waitForMessages(messages, removedBefore + 1);

    const removedAfter = messages.filter(
      (msg) => msg.type === "renderTree:nodeRemoved",
    ).length;

    const memoAdded = messages.some(
      (msg) =>
        msg.type === "renderTree:nodeAdded" &&
        (msg as any).node?.kind === "memo",
    );

    expect(removedAfter).toBeGreaterThan(removedBefore);
    expect(memoAdded).toBe(true);
  });
});
