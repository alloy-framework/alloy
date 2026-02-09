import { afterEach, beforeEach, expect, it } from "vitest";
import WebSocket from "ws";
import {
  createMessageCollector,
  filterEffectsMessages,
} from "../../testing/devtools-utils.js";
import { Output } from "../components/Output.jsx";
import {
  enableDevtools,
  resetDevtoolsServerForTests,
} from "../devtools/devtools-server.js";
import { effect, ref } from "../reactivity.js";
import { renderAsync } from "../render.js";
import { debug } from "./index.js";

let socket: WebSocket | undefined;

beforeEach(async () => {
  debug.effect.reset();

  const server = await enableDevtools({ port: 0 });
  socket = new WebSocket(`ws://127.0.0.1:${server.port}`);
  await new Promise<void>((resolve, reject) => {
    socket?.once("open", resolve);
    socket?.once("error", reject);
  });
});

afterEach(async () => {
  if (socket) {
    socket.close();
    socket = undefined;
  }

  await resetDevtoolsServerForTests();
  debug.effect.reset();
});

it("emits effect, ref, edge, and update messages", async () => {
  const collector = createMessageCollector(socket!);
  const r1 = ref(0);
  const r2 = ref(1);

  effect(() => {
    r1.value = r2.value + 1;
  });

  await renderAsync(<Output>{"ok"}</Output>);

  const messages = await collector.waitForRender();
  const effectsMessages = filterEffectsMessages(messages);
  collector.stop();

  expect(effectsMessages[0]).toMatchObject({
    type: "effect:refAdded",
    ref: expect.objectContaining({
      id: expect.any(Number),
      kind: "ref",
    }),
  });
  expect(effectsMessages[1]).toMatchObject({
    type: "effect:refAdded",
    ref: expect.objectContaining({
      id: expect.any(Number),
      kind: "ref",
    }),
  });
  expect(effectsMessages[2]).toMatchObject({
    type: "effect:effectAdded",
    effect: expect.objectContaining({
      id: expect.any(Number),
    }),
  });
  expect(effectsMessages[3]).toMatchObject({
    type: "effect:track",
    edge: expect.objectContaining({
      type: "track",
      effectId: expect.any(Number),
      refId: expect.any(Number),
    }),
  });
  expect(effectsMessages[4]).toMatchObject({
    type: "effect:trigger",
    edge: expect.objectContaining({
      type: "trigger",
      effectId: expect.any(Number),
      refId: expect.any(Number),
    }),
  });
  expect(effectsMessages[5]).toMatchObject({
    type: "effect:effectUpdated",
    effect: expect.objectContaining({
      id: expect.any(Number),
    }),
  });
});
