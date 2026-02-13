import { afterEach, beforeEach, expect, it } from "vitest";
import WebSocket from "ws";
import {
  createMessageCollector,
  type DevtoolsMessage,
} from "../../testing/devtools-utils.js";
import { Output } from "../components/Output.jsx";
import { SourceDirectory } from "../components/SourceDirectory.jsx";
import { SourceFile } from "../components/SourceFile.jsx";
import {
  enableDevtools,
  resetDevtoolsServerForTests,
} from "../devtools/devtools-server.js";
import { renderAsync } from "../render.js";

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
  const collector = await createMessageCollector(socket!);

  await renderAsync(
    <Output>
      <SourceDirectory path="src">
        <SourceFile path="index.ts" filetype="ts">
          {"export const value = 1;"}
        </SourceFile>
      </SourceDirectory>
    </Output>,
  );

  const initialMessages = await collector.waitForRender();
  const initialFiles = initialMessages.filter(
    (m: DevtoolsMessage) =>
      (m.type.startsWith("file:") || m.type.startsWith("directory:")) &&
      !("triggerIds" in m),
  );
  expect(initialFiles[0]).toMatchObject({
    type: "directory:added",
    path: "./",
  });
  expect(initialFiles[1]).toMatchObject({
    type: "directory:added",
    path: "src",
  });
  expect(initialFiles[2]).toMatchObject({
    type: "file:added",
    path: "src/index.ts",
    filetype: "ts",
  });
  expect(initialFiles[3]).toMatchObject({
    type: "file:updated",
    path: "src/index.ts",
    content: expect.any(String),
  });

  collector.stop();
});
