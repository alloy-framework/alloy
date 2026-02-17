import { afterEach, beforeEach, expect, it } from "vitest";
import WebSocket from "ws";
import {
  createMessageCollector,
  filterRenderTreeMessages,
  type DevtoolsMessage,
} from "../../testing/devtools-utils.js";
import { For } from "../components/For.jsx";
import { Output } from "../components/Output.jsx";
import {
  enableDevtools,
  resetDevtoolsServerForTests,
} from "../devtools/devtools-server.js";
import { ref } from "../reactivity.js";
import { renderAsync } from "../render.js";
import { flushJobsAsync } from "../scheduler.js";

let socket: WebSocket | undefined;

beforeEach(async () => {
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
});

it("emits render:complete on successful render", async () => {
  const collector = await createMessageCollector(socket!);

  await renderAsync(<Output />);

  const messages = await collector.waitForRender();

  expect(messages.at(-1)).toMatchObject({ type: "render:complete" });
  collector.stop();
});

it("emits render:error on render failure", async () => {
  function Boom() {
    throw new Error("Boom");
  }

  const collector = await createMessageCollector(socket!);

  await expect(
    renderAsync(
      <Output>
        <Boom />
      </Output>,
    ),
  ).rejects.toThrow("Boom");

  const messages = await collector.waitForRender();
  const renderMessages = messages.filter((m: DevtoolsMessage) =>
    m.type.startsWith("render:"),
  );
  expect(renderMessages.at(-1)).toMatchObject({
    type: "render:error",
    name: expect.any(String),
    message: expect.any(String),
  });
  collector.stop();
});

it("sends render tree messages during render", async () => {
  function Foo() {
    return (
      <>
        Hello
        <br />
        {() => "World"}
      </>
    );
  }

  const collector = await createMessageCollector(socket!);

  await renderAsync(
    <Output>
      <Foo />
    </Output>,
  );

  const messages = await collector.waitForRender();
  const renderMessages = filterRenderTreeMessages(messages);
  collector.stop();

  expect(renderMessages[0]).toMatchObject({ type: "render:reset" });

  const nodeAdded = renderMessages.filter(
    (m) => m.type === "render:node_added",
  );
  expect(nodeAdded[0]).toMatchObject({
    type: "render:node_added",
    parent_id: null,
  });
  expect(nodeAdded[1]).toMatchObject({
    type: "render:node_added",
    name: "Output",
  });
  expect(nodeAdded[2]).toMatchObject({
    type: "render:node_added",
    name: "Context Binder",
  });
  expect(nodeAdded[3]).toMatchObject({
    type: "render:node_added",
  });
  expect(nodeAdded[4]).toMatchObject({
    type: "render:node_added",
    name: expect.stringMatching(/^Context FormatOptions/),
  });
  expect(nodeAdded[5]).toMatchObject({
    type: "render:node_added",
  });
  expect(nodeAdded[6]).toMatchObject({
    type: "render:node_added",
    name: "SourceDirectory",
  });
  expect(nodeAdded[7]).toMatchObject({
    type: "render:node_added",
    name: "Context SourceDirectory",
  });
  expect(nodeAdded[8]).toMatchObject({
    type: "render:node_added",
  });
  expect(nodeAdded[9]).toMatchObject({
    type: "render:node_added",
    name: "Foo",
  });
  expect(nodeAdded[10]).toMatchObject({
    type: "render:node_added",
    value: "Hello",
  });
  expect(nodeAdded[11]).toMatchObject({
    type: "render:node_added",
    name: "br",
  });
  expect(nodeAdded[12]).toMatchObject({
    type: "render:node_added",
  });
  expect(nodeAdded[13]).toMatchObject({
    type: "render:node_added",
    value: "World",
  });
});

it("rerenders when devtools requests rerender", async () => {
  let renderCount = 0;

  function Display() {
    renderCount += 1;
    return "Hi";
  }

  const collector = await createMessageCollector(socket!);

  await renderAsync(
    <Output>
      <Display />
    </Output>,
  );

  const messages = await collector.waitForRender();
  const renderMessages = filterRenderTreeMessages(messages);
  const displayNode = renderMessages.find(
    (message: DevtoolsMessage) =>
      message.type === "render:node_added" && message.name === "Display",
  );

  expect(renderCount).toBe(1);
  expect(displayNode?.id).toEqual(expect.any(Number));

  socket!.send(
    JSON.stringify({ type: "render:rerender", id: displayNode!.id }),
  );

  await collector.waitForFlush();

  expect(renderCount).toBe(2);
  collector.stop();
});

it("sends render tree messages during render with For component", async () => {
  const collector = await createMessageCollector(socket!);
  function Display(props: any) {
    return <>item {props.item}</>;
  }
  await renderAsync(
    <Output>
      <For each={["a", "b"]}>{(item) => <Display item={item} />}</For>
    </Output>,
  );

  const messages = await collector.waitForRender();
  const renderMessages = filterRenderTreeMessages(messages);
  collector.stop();

  expect(renderMessages[0]).toMatchObject({ type: "render:reset" });
  expect(renderMessages).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "render:node_added",
        name: "For",
      }),
      expect.objectContaining({
        type: "render:node_added",
        value: "a",
      }),
      expect.objectContaining({
        type: "render:node_added",
        value: "b",
      }),
    ]),
  );
});

it("emits nodeUpdated during render for context updates", async () => {
  const collector = await createMessageCollector(socket!);

  function Counter(props: { value: number }) {
    return `Count: ${props.value}`;
  }

  await renderAsync(
    <Output>
      <Counter value={1} />
    </Output>,
  );

  const messages = await collector.waitForRender();
  const renderMessages = filterRenderTreeMessages(messages);

  // Context updates during the initial render produce render:node_updated messages
  const nodeUpdated = renderMessages.filter(
    (m: DevtoolsMessage) => m.type === "render:node_updated",
  );

  expect(nodeUpdated.length).toBeGreaterThan(0);
  expect(nodeUpdated[0]).toMatchObject({
    type: "render:node_updated",
    id: expect.any(Number),
  });
  collector.stop();
});

it("tracks render tree nodes during initial render", async () => {
  const items = ref(["a", "b", "c"]);
  const collector = await createMessageCollector(socket!);

  await renderAsync(
    <Output>
      <For each={items}>{(item) => <>{item}</>}</For>
    </Output>,
  );

  const messages = await collector.waitForRender();
  const renderMessages = filterRenderTreeMessages(messages);

  // The initial render should include node_added messages for all items
  const nodeAdded = renderMessages.filter(
    (m: DevtoolsMessage) => m.type === "render:node_added",
  );
  expect(nodeAdded.length).toBeGreaterThan(0);

  // Verify specific items appear in the tree
  const itemValues = nodeAdded
    .filter(
      (m: DevtoolsMessage) =>
        m.value === "a" || m.value === "b" || m.value === "c",
    )
    .map((m: DevtoolsMessage) => m.value);
  expect(itemValues).toContain("a");
  expect(itemValues).toContain("b");
  expect(itemValues).toContain("c");
  collector.stop();
});

it("emits proper events when items are added/removed in For component", async () => {
  const items = ref(["a", "b"]);
  const collector = await createMessageCollector(socket!);

  function Display(props: any) {
    return <>item {props.item}</>;
  }
  await renderAsync(
    <Output>
      <For each={items}>{(item) => <Display item={item} />}</For>
    </Output>,
  );

  const originalMessages = await collector.waitForRender();

  // Track all nodes that are currently in the tree
  const activeNodes = new Map<
    number,
    { parentId: number | null; kind: string; name?: string }
  >();

  function processMessages(messages: any[]) {
    for (const msg of messages) {
      if (msg.type === "render:node_added") {
        const nodeId = msg.id;
        const parentId = msg.parent_id;

        // Root node has null parent, otherwise parent must exist
        if (parentId !== null && !activeNodes.has(parentId)) {
          throw new Error(
            `Node ${nodeId} (${msg.kind}${msg.name ? `: ${msg.name}` : ""}) ` +
              `added with parent ${parentId} but parent is not in active nodes. ` +
              `Active nodes: ${[...activeNodes.keys()].join(", ")}`,
          );
        }

        activeNodes.set(nodeId, {
          parentId,
          kind: msg.kind,
          name: msg.name,
        });
      } else if (msg.type === "render:node_removed") {
        const nodeId = msg.id;
        if (!activeNodes.has(nodeId)) {
          throw new Error(
            `Node ${nodeId} removed but was not in active nodes. ` +
              `Active nodes: ${[...activeNodes.keys()].join(", ")}`,
          );
        }
        activeNodes.delete(nodeId);
      }
    }
  }

  // Process initial render
  processMessages(filterRenderTreeMessages(originalMessages));

  // Mutate the list
  items.value.push("c");
  items.value.unshift("0");
  await flushJobsAsync();

  const updateMessages = await collector.waitForFlush();
  const updateRenderMessages = filterRenderTreeMessages(updateMessages);

  // Process update - this will throw if parent invariant is violated
  processMessages(updateRenderMessages);
});
