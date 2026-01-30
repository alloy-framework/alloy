import { afterEach, beforeEach, expect, it } from "vitest";
import WebSocket from "ws";
import {
  createMessageCollector,
  filterRenderTreeMessages,
  type DevtoolsMessage,
} from "../../testing/devtools-utils.js";
import { Output } from "../components/Output.jsx";
import { Show } from "../components/Show.jsx";
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
  const collector = createMessageCollector(socket!);

  await renderAsync(<Output />);

  const messages = await collector.waitForRender();

  expect(messages.at(-1)).toMatchObject({ type: "render:complete" });
  collector.stop();
});

it("emits render:error on render failure", async () => {
  function Boom() {
    throw new Error("Boom");
  }

  const collector = createMessageCollector(socket!);

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
    componentStack: expect.any(Array),
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

  const collector = createMessageCollector(socket!);

  await renderAsync(
    <Output>
      <Foo />
    </Output>,
  );

  const messages = await collector.waitForRender();
  const renderMessages = filterRenderTreeMessages(messages);
  collector.stop();

  expect(renderMessages[0]).toMatchObject({ type: "render:reset" });
  expect(renderMessages[1]).toMatchObject({
    type: "render:nodeAdded",
    parentId: null,
    node: {},
  });
  expect(renderMessages[2]).toMatchObject({
    type: "render:nodeAdded",
    node: {
      name: "Output",
    },
  });
  expect(renderMessages[3]).toMatchObject({
    type: "render:nodeAdded",
    node: {
      name: "Context Binder",
    },
  });
  expect(renderMessages[4]).toMatchObject({
    type: "render:nodeAdded",
    node: {},
  });
  expect(renderMessages[5]).toMatchObject({
    type: "render:nodeAdded",
    node: {
      name: "Context FormatOptions.*",
    },
  });
  expect(renderMessages[6]).toMatchObject({
    type: "render:nodeAdded",
    node: {},
  });
  expect(renderMessages[7]).toMatchObject({
    type: "render:nodeAdded",
    node: {
      name: "SourceDirectory",
    },
  });
  expect(renderMessages[8]).toMatchObject({
    type: "render:nodeAdded",
    node: {
      name: "Context SourceDirectory",
    },
  });
  expect(renderMessages[9]).toMatchObject({
    type: "render:nodeAdded",
    node: {},
  });
  expect(renderMessages[10]).toMatchObject({
    type: "render:nodeAdded",
    node: {
      name: "Foo",
    },
  });
  expect(renderMessages[11]).toMatchObject({
    type: "render:nodeAdded",
    node: { value: "Hello" },
  });
  expect(renderMessages[12]).toMatchObject({
    type: "render:nodeAdded",
    node: { name: "br" },
  });
  expect(renderMessages[13]).toMatchObject({
    type: "render:nodeAdded",
    node: {},
  });
  expect(renderMessages[14]).toMatchObject({
    type: "render:nodeAdded",
    node: { value: "World" },
  });
});

it("emits nodeUpdated when component props change", async () => {
  const count = ref(1);
  const collector = createMessageCollector(socket!);

  function Counter(props: { value: number }) {
    return `Count: ${props.value}`;
  }

  await renderAsync(
    <Output>
      <Counter value={count.value} />
    </Output>,
  );

  await collector.waitForRender();

  count.value += 1;
  await flushJobsAsync();

  const updateMessages = await collector.waitForFlush();
  const updateRenderMessages = filterRenderTreeMessages(updateMessages);

  const nodeUpdated = updateRenderMessages.filter(
    (m: DevtoolsMessage) => m.type === "render:nodeUpdated",
  );

  expect(nodeUpdated[0]).toMatchObject({
    type: "render:nodeUpdated",
    id: expect.any(Number),
  });
  collector.stop();
});

it("emits nodeRemoved when conditional content disappears", async () => {
  const show = ref(true);
  const collector = createMessageCollector(socket!);

  function Maybe() {
    return <Show when={show.value}>hi</Show>;
  }

  await renderAsync(
    <Output>
      <Maybe />
    </Output>,
  );

  await collector.waitForRender();

  show.value = false;
  await flushJobsAsync();

  const updateMessages = await collector.waitForFlush();
  const updateRenderMessages = filterRenderTreeMessages(updateMessages);

  const removed = updateRenderMessages.filter(
    (m: DevtoolsMessage) => m.type === "render:nodeRemoved",
  );

  expect(removed[0]).toMatchObject({
    type: "render:nodeRemoved",
    parentId: expect.any(Number),
    id: expect.any(Number),
  });
  collector.stop();
});
