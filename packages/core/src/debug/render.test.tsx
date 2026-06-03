import * as devalue from "devalue";
import { afterEach, beforeEach, expect, it } from "vitest";
import WebSocket from "ws";
import {
  createMessageCollector,
  filterRenderTreeMessages,
  type DevtoolsMessage,
} from "../../testing/devtools-utils.js";
import { For } from "../components/For.jsx";
import { Output } from "../components/Output.jsx";
import { Show } from "../components/Show.jsx";
import {
  enableDevtools,
  resetDevtoolsServerForTests,
} from "../devtools/devtools-server.js";
import { ref } from "../reactivity.js";
import { renderAsync } from "../render-output.js";
import { flushJobsAsync } from "../scheduler.js";

let socket: WebSocket | undefined;

function componentMessages(messages: DevtoolsMessage[]) {
  return messages.filter((m) => m.type.startsWith("component:"));
}

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
  expect(nodeAdded.map((m) => m.kind)).not.toContain("component");
  expect(nodeAdded.map((m) => m.kind)).not.toContain("memo");

  // Component invocations are canonical component messages, not
  // render-node rows. Exact ordering is not contractual.
  const components = componentMessages(messages);
  const componentNames = components
    .filter((m) => m.type === "component:added")
    .map((m) => m.name);
  expect(componentNames).toContain("Output");
  expect(componentNames).toContain("Context Binder");
  expect(
    componentNames.some(
      (n) => typeof n === "string" && n.startsWith("Context FormatOptions"),
    ),
  ).toBe(true);
  expect(componentNames).toContain("SourceDirectory");
  expect(componentNames).toContain("Context SourceDirectory");
  expect(componentNames).toContain("Foo");
  expect(nodeAdded.map((m) => m.name)).toContain("br");

  const foo = components.find(
    (m) => m.type === "component:added" && m.name === "Foo",
  );
  expect(foo).toBeDefined();
  const fooRoots = components.filter(
    (m) => m.type === "component:root_added" && m.component_id === foo!.id,
  );
  expect(fooRoots.length).toBeGreaterThan(1);

  // Text content from Foo's body is also exposed as text nodes.
  const values = nodeAdded.map((m) => m.value);
  expect(values).toContain("Hello");
  expect(values).toContain("World");
});

it("rerenders when devtools requests rerender", async () => {
  let value = "before";
  const collector = await createMessageCollector(socket!);

  function Rerendered() {
    return value;
  }

  await renderAsync(
    <Output>
      <Rerendered />
    </Output>,
  );

  const initialMessages = await collector.waitForRender();
  const component = componentMessages(initialMessages).find(
    (m) => m.type === "component:added" && m.name === "Rerendered",
  );
  expect(component).toBeDefined();
  const root = componentMessages(initialMessages).find(
    (m) =>
      m.type === "component:root_added" && m.component_id === component!.id,
  );
  expect(root).toBeDefined();

  value = "after";
  socket!.send(
    JSON.stringify({
      type: "render:rerender",
      id: root!.render_node_id,
    }),
  );

  const updateMessages = await collector.waitForFlush();
  const renderMessages = filterRenderTreeMessages(updateMessages);
  expect(renderMessages).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "render:node_removed",
        id: root!.render_node_id,
      }),
      expect.objectContaining({
        type: "render:node_added",
        value: "after",
      }),
    ]),
  );
  expect(renderMessages).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "render:node_added",
        value: "before",
      }),
    ]),
  );
  expect(componentMessages(updateMessages)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "component:root_removed",
        component_id: component!.id,
        render_node_id: root!.render_node_id,
      }),
      expect.objectContaining({
        type: "component:removed",
        id: component!.id,
      }),
      expect.objectContaining({
        type: "component:added",
        name: "Rerendered",
      }),
      expect.objectContaining({
        type: "component:root_added",
      }),
    ]),
  );
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
  expect(componentMessages(messages)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "component:added",
        name: "For",
      }),
    ]),
  );
  expect(renderMessages).toEqual(
    expect.arrayContaining([
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

it("emits component metadata separately from render nodes", async () => {
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
  const components = componentMessages(messages);

  expect(
    renderMessages.some(
      (m: DevtoolsMessage) =>
        m.type === "render:node_added" &&
        (m.kind === "component" || m.kind === "memo"),
    ),
  ).toBe(false);
  expect(components).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "component:added",
        name: "Counter",
      }),
      expect.objectContaining({
        type: "component:root_added",
      }),
    ]),
  );
  collector.stop();
});

it("removes component metadata when its render roots are removed", async () => {
  const show = ref(true);
  const collector = await createMessageCollector(socket!);

  function Child() {
    return "visible";
  }

  await renderAsync(<Output>{() => (show.value ? <Child /> : null)}</Output>);

  const initialMessages = await collector.waitForRender();
  const child = componentMessages(initialMessages).find(
    (m) => m.type === "component:added" && m.name === "Child",
  );
  expect(child).toBeDefined();
  expect(componentMessages(initialMessages)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "component:root_added",
        component_id: child!.id,
      }),
    ]),
  );

  show.value = false;
  await flushJobsAsync();

  const updateMessages = await collector.waitForFlush();
  expect(componentMessages(updateMessages)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "component:root_removed",
        component_id: child!.id,
      }),
      expect.objectContaining({
        type: "component:removed",
        id: child!.id,
      }),
    ]),
  );
  collector.stop();
});

it("emits component prop updates while reactive children update", async () => {
  const visible = ref(true);
  const collector = await createMessageCollector(socket!);

  await renderAsync(
    <Output>
      <Show when={visible.value}>visible</Show>
    </Output>,
  );

  const initialMessages = await collector.waitForRender();
  const show = componentMessages(initialMessages).find(
    (m) => m.type === "component:added" && m.name === "Show",
  );
  expect(show).toBeDefined();

  visible.value = false;
  await flushJobsAsync();

  const updateMessages = await collector.waitForFlush();
  const showUpdate = componentMessages(updateMessages).find(
    (m) => m.type === "component:updated" && m.id === show!.id,
  );
  expect(showUpdate).toBeDefined();
  expect(devalue.parse(showUpdate!.props as string)).toMatchObject({
    when: false,
  });
  expect(componentMessages(updateMessages)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "component:root_removed",
        component_id: show!.id,
      }),
    ]),
  );
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
