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

  // Create an effect that reads r1.
  let observed = 0;
  effect(() => {
    observed = r1.value;
  });

  // Mutate r1 to trigger the effect.
  r1.value = 42;

  await renderAsync(<Output>{"ok"}</Output>);

  const messages = await collector.waitForRender();
  const effectsMessages = filterEffectsMessages(messages);
  collector.stop();

  // Check that core message types are present
  const byType = (type: string) => effectsMessages.filter((m: any) => m.type === type);
  expect(byType("effect:refAdded").length).toBeGreaterThanOrEqual(1);
  expect(byType("effect:effectAdded").length).toBeGreaterThanOrEqual(1);
  expect(byType("effect:track").length).toBeGreaterThanOrEqual(1);
  expect(byType("effect:trigger").length).toBeGreaterThanOrEqual(1);
  expect(byType("effect:effectUpdated").length).toBeGreaterThanOrEqual(1);

  // Verify message shapes
  expect(byType("effect:refAdded")[0]).toMatchObject({
    ref: expect.objectContaining({ id: expect.any(Number), kind: "ref" }),
  });
  expect(byType("effect:effectAdded")[0]).toMatchObject({
    effect: expect.objectContaining({ id: expect.any(Number) }),
  });
  expect(byType("effect:track")[0]).toMatchObject({
    edge: expect.objectContaining({
      type: "track",
      effectId: expect.any(Number),
      refId: expect.any(Number),
    }),
  });
  expect(byType("effect:trigger")[0]).toMatchObject({
    edge: expect.objectContaining({
      effectId: expect.any(Number),
      refId: expect.any(Number),
    }),
  });

  expect(observed).toBe(42);
});
