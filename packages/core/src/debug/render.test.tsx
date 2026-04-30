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
import { renderAsync } from "../render-output.js";
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
  // Verify the major component scopes are present somewhere in the
  // tree. Exact ordering is not contractual on the AlloyNode renderer.
  const names = nodeAdded.map((m) => m.name);
  expect(names).toContain("Output");
  expect(names).toContain("Context Binder");
  expect(
    names.some(
      (n) => typeof n === "string" && n.startsWith("Context FormatOptions"),
    ),
  ).toBe(true);
  expect(names).toContain("SourceDirectory");
  expect(names).toContain("Context SourceDirectory");
  expect(names).toContain("Foo");
  expect(names).toContain("br");
  // Text content from Foo's body is also exposed as text nodes.
  const values = nodeAdded.map((m) => m.value);
  expect(values).toContain("Hello");
  expect(values).toContain("World");
});

it.skip("rerenders when devtools requests rerender", async () => {
  // Per-component rerender is not supported on the AlloyNode-based
  // renderer (components run as plain functions, not effects). The
  // devtools `render:rerender` message remains a no-op until a
  // re-render mechanism is reintroduced.
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
