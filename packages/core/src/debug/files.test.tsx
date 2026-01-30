import { afterEach, beforeEach, expect, it } from "vitest";
import WebSocket from "ws";
import {
  createMessageCollector,
  type DevtoolsMessage,
} from "../../testing/devtools-utils.js";
import { Output } from "../components/Output.jsx";
import { Show } from "../components/Show.jsx";
import { SourceDirectory } from "../components/SourceDirectory.jsx";
import { SourceFile } from "../components/SourceFile.jsx";
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

it("emits file and directory add/update/remove messages", async () => {
  const show = ref(true);
  const collector = createMessageCollector(socket!);

  await renderAsync(
    <Output>
      <Show when={show.value}>
        <SourceDirectory path="src">
          <SourceFile path="index.ts" filetype="ts">
            {"export const value = 1;"}
          </SourceFile>
        </SourceDirectory>
      </Show>
    </Output>,
  );

  const initialMessages = await collector.waitForRender();
  const initialFiles = initialMessages.filter((m: DevtoolsMessage) =>
    m.type.startsWith("files:"),
  );
  expect(initialFiles[0]).toMatchObject({
    path: "./",
  });
  expect(initialFiles[1]).toMatchObject({
    type: "files:directoryAdded",
    path: "src",
  });
  expect(initialFiles[2]).toMatchObject({
    type: "files:fileAdded",
    path: "src/index.ts",
    filetype: "ts",
  });
  expect(initialFiles[3]).toMatchObject({
    type: "files:fileUpdated",
    path: "src/index.ts",
    filetype: "ts",
    contents: expect.any(String),
  });

  show.value = false;
  await flushJobsAsync();

  const updateMessages = await collector.waitForFlush();
  const updateFiles = updateMessages.filter((m: DevtoolsMessage) =>
    m.type.startsWith("files:"),
  );
  collector.stop();

  expect(updateFiles[0]).toMatchObject({
    type: "files:fileRemoved",
    path: "src/index.ts",
  });
  expect(updateFiles[1]).toMatchObject({
    type: "files:directoryRemoved",
    path: "src",
  });
});
