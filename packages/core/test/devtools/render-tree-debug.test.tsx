import { Output, renderAsync } from "@alloy-js/core";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import WebSocket from "ws";
import {
  ensureDevtoolsServer,
  resetDevtoolsServerForTests,
} from "../../src/devtools/devtools-server.js";

function waitForMessage(
  messages: any[],
  predicate: () => boolean,
  timeoutMs = 1000,
) {
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(
        new Error(
          `Timed out waiting for messages. Received ${messages.length}.`,
        ),
      );
    }, timeoutMs);

    const check = () => {
      if (predicate()) {
        clearTimeout(timeout);
        resolve();
      }
    };

    const interval = setInterval(() => {
      check();
      if (predicate()) clearInterval(interval);
    }, 5);
  });
}

describe("devtools websocket protocol", () => {
  let originalEnv: string | undefined;
  let socket: WebSocket | undefined;
  let messages: any[] = [];

  beforeEach(async () => {
    originalEnv = process.env.ALLOY_DEBUG;
    process.env.ALLOY_DEBUG = "1";
    process.env.ALLOY_DEBUG_PORT = "0";

    const server = await ensureDevtoolsServer();
    if (!server) return;
    socket = new WebSocket(`ws://127.0.0.1:${server.port}`);
    messages = [];

    socket.on("message", (data) => {
      messages.push(JSON.parse(data.toString()));
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

  it("sends render tree messages during render", async () => {
    function Foo() {
      return (
        <>
          {"Hello"}
          <br />
          {() => "World"}
        </>
      );
    }

    await renderAsync(
      <Output>
        <Foo />
      </Output>,
    );

    await waitForMessage(messages, () =>
      messages.some((msg) => msg?.node?.value === "World"),
    );

    expect(messages.length).toBeGreaterThan(0);
    expect(messages[0]).toMatchObject({ type: "renderTree:reset" });
    expect(messages[1]).toMatchObject({
      type: "renderTree:nodeAdded",
      parentId: null,
      node: { kind: "root" },
    });

    for (const message of messages) {
      if (message.type === "renderTree:nodeAdded") {
        expect(message.node?.id).toEqual(expect.any(Number));
        expect(message.node?.kind).toEqual(expect.any(String));
      } else if (message.type === "renderTree:nodeRemoved") {
        expect(message.id).toEqual(expect.any(Number));
      } else if (message.type !== "renderTree:reset") {
        throw new Error(`Unexpected message type: ${message.type}`);
      }
    }

    expect(
      messages.some(
        (msg) =>
          msg.type === "renderTree:nodeAdded" &&
          msg.node?.kind === "component" &&
          msg.node?.name === "Foo",
      ),
    ).toBe(true);
    expect(
      messages.some(
        (msg) =>
          msg.type === "renderTree:nodeAdded" &&
          msg.node?.kind === "text" &&
          msg.node?.value === "Hello",
      ),
    ).toBe(true);
    expect(
      messages.some(
        (msg) =>
          msg.type === "renderTree:nodeAdded" &&
          msg.node?.kind === "printHook" &&
          msg.node?.name === "br",
      ),
    ).toBe(true);
    expect(
      messages.some(
        (msg) =>
          msg.type === "renderTree:nodeAdded" && msg.node?.kind === "memo",
      ),
    ).toBe(true);
    expect(
      messages.some(
        (msg) =>
          msg.type === "renderTree:nodeAdded" &&
          msg.node?.kind === "text" &&
          msg.node?.value === "World",
      ),
    ).toBe(true);
  });
});
