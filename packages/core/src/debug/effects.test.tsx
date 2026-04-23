import { shallowReactive } from "@vue/reactivity";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
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
import { effect, memo, ref } from "../reactivity.js";
import { renderAsync } from "../render.js";
import { flushJobsAsync } from "../scheduler.js";
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

it("emits effect, ref, and track messages", async () => {
  const collector = await createMessageCollector(socket!);
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
    type: "ref:added",
    id: expect.any(Number),
    kind: "ref",
  });
  expect(effectsMessages[1]).toMatchObject({
    type: "ref:added",
    id: expect.any(Number),
    kind: "ref",
  });
  expect(effectsMessages[2]).toMatchObject({
    type: "effect:added",
    id: expect.any(Number),
  });
  expect(effectsMessages[3]).toMatchObject({
    type: "edge:track",
    effect_id: expect.any(Number),
    ref_id: expect.any(Number),
  });
});

describe("unified trigger edges", () => {
  it("ref trigger records consumer and producer (caused_by)", async () => {
    const collector = await createMessageCollector(socket!);
    const r = ref(0);

    // Producer effect writes to the ref
    const producerName = "test-producer";
    effect(
      () => {
        r.value = 42;
      },
      undefined,
      { debug: { name: producerName } },
    );

    // Consumer effect reads the ref
    const consumerName = "test-consumer";
    effect(
      () => {
        void r.value;
      },
      undefined,
      { debug: { name: consumerName } },
    );

    await renderAsync(<Output>{"ok"}</Output>);
    const renderMessages = await collector.waitForRender();

    // Trigger the consumer by changing the ref
    r.value = 99;
    await flushJobsAsync();
    const flushMessages = await collector.waitForFlush();
    collector.stop();

    // Find the trigger edge on the consumer
    const triggerEdges = flushMessages.filter(
      (m: any) => m.type === "edge:trigger" && m.ref_id !== undefined,
    );
    expect(triggerEdges.length).toBeGreaterThan(0);

    // The trigger edge should be on the consumer effect
    const effectsMessages = filterEffectsMessages(renderMessages);
    const consumerEffect = effectsMessages.find(
      (m: any) => m.type === "effect:added" && m.name === consumerName,
    );
    expect(consumerEffect).toBeDefined();

    const consumerTrigger = triggerEdges.find(
      (m: any) => m.effect_id === consumerEffect!.id,
    );
    expect(consumerTrigger).toBeDefined();
    // caused_by is null since the mutation happens outside any effect (top-level r.value = 99)
    expect(consumerTrigger!.caused_by).toBeNull();
  });

  it("reactive object trigger records consumer and producer", async () => {
    const collector = await createMessageCollector(socket!);
    const map = shallowReactive(new Map<string, number>());

    // Consumer: memo reads the map
    const sum = memo(() => {
      let total = 0;
      for (const v of map.values()) total += v;
      return total;
    });

    // Producer: effect mutates the map
    effect(
      () => {
        const _s = sum();
        map.set("key", 42);
      },
      undefined,
      { debug: { name: "producer-effect" } },
    );

    await renderAsync(<Output>{"ok"}</Output>);

    const messages = await collector.waitForRender();
    const effectsMessages = filterEffectsMessages(messages);
    collector.stop();

    // Find trigger edges for the reactive map
    const triggerEdges = effectsMessages.filter(
      (m: any) => m.type === "edge:trigger" && m.target_id !== undefined,
    );
    expect(triggerEdges.length).toBeGreaterThan(0);

    // The trigger should have caused_by (the producer effect)
    const producerEffect = effectsMessages.find(
      (m: any) => m.type === "effect:added" && m.name === "producer-effect",
    );
    expect(producerEffect).toBeDefined();

    const withCause = triggerEdges.filter(
      (m: any) => m.caused_by === producerEffect!.id,
    );
    expect(withCause.length).toBeGreaterThan(0);
    expect(withCause[0]).toMatchObject({
      type: "edge:trigger",
      effect_id: expect.any(Number),
      caused_by: producerEffect!.id,
      target_id: expect.any(Number),
    });
  });

  it("trigger outside any effect has no caused_by", async () => {
    const collector = await createMessageCollector(socket!);
    const r = ref(0);

    // Consumer effect
    effect(() => {
      void r.value;
    });

    await renderAsync(<Output>{"ok"}</Output>);
    await collector.waitForRender();

    // Trigger from top-level (outside any effect)
    r.value = 1;
    await flushJobsAsync();
    const flushMessages = await collector.waitForFlush();
    collector.stop();

    const triggerEdges = flushMessages.filter(
      (m: any) => m.type === "edge:trigger",
    );
    expect(triggerEdges.length).toBeGreaterThan(0);
    // caused_by should be null (no producer effect)
    expect(triggerEdges[0].caused_by).toBeNull();
  });

  it("multiple consumers of same ref get separate trigger edges", async () => {
    const collector = await createMessageCollector(socket!);
    const r = ref(0);

    // Two consumer effects
    effect(
      () => {
        void r.value;
      },
      undefined,
      { debug: { name: "consumer-a" } },
    );
    effect(
      () => {
        void r.value;
      },
      undefined,
      { debug: { name: "consumer-b" } },
    );

    await renderAsync(<Output>{"ok"}</Output>);
    const renderMessages = await collector.waitForRender();

    // Find the effect IDs
    const effectsMessages = filterEffectsMessages(renderMessages);
    const consumerA = effectsMessages.find(
      (m: any) => m.type === "effect:added" && m.name === "consumer-a",
    );
    const consumerB = effectsMessages.find(
      (m: any) => m.type === "effect:added" && m.name === "consumer-b",
    );
    expect(consumerA).toBeDefined();
    expect(consumerB).toBeDefined();

    // Trigger both by changing the ref
    r.value = 1;
    await flushJobsAsync();
    const flushMessages = await collector.waitForFlush();
    collector.stop();

    const triggerEdges = flushMessages.filter(
      (m: any) => m.type === "edge:trigger",
    );

    // Each consumer gets its own trigger edge
    const aTrigger = triggerEdges.find(
      (m: any) => m.effect_id === consumerA!.id,
    );
    const bTrigger = triggerEdges.find(
      (m: any) => m.effect_id === consumerB!.id,
    );
    expect(aTrigger).toBeDefined();
    expect(bTrigger).toBeDefined();
    // Both reference the same ref
    expect(aTrigger!.ref_id).toBe(bTrigger!.ref_id);
  });

  it("no triggered-by or duplicate trigger edge types exist", async () => {
    const collector = await createMessageCollector(socket!);
    const r = ref(0);
    const map = shallowReactive(new Map<string, number>());

    effect(() => {
      void r.value;
      for (const _v of map.values()) {
        /* track */
      }
    });

    effect(() => {
      r.value = 1;
      map.set("x", 1);
    });

    await renderAsync(<Output>{"ok"}</Output>);
    const messages = await collector.waitForRender();
    collector.stop();

    // No edge:triggered-by messages should exist
    const triggeredBy = messages.filter(
      (m: any) => m.type === "edge:triggered-by",
    );
    expect(triggeredBy.length).toBe(0);

    // All edge types should be edge:track or edge:trigger only
    const edges = messages.filter(
      (m: any) => typeof m.type === "string" && m.type.startsWith("edge:"),
    );
    for (const edge of edges) {
      expect(["edge:track", "edge:trigger"]).toContain(edge.type);
    }
  });
});
