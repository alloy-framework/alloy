import { afterEach, beforeEach, expect, it } from "vitest";
import WebSocket from "ws";
import {
  createMessageCollector,
  type DevtoolsMessage,
} from "../../testing/devtools-utils.js";
import { Output } from "../components/Output.jsx";
import {
  enableDevtools,
  resetDevtoolsServerForTests,
} from "../devtools/devtools-server.js";
import { DiagnosticsCollector } from "../diagnostics.js";
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

it("emits diagnostics:report messages", async () => {
  const collector = await createMessageCollector(socket!);
  const diagnostics = new DiagnosticsCollector();

  diagnostics.emit({ message: "Test diagnostic", severity: "warning" });

  await renderAsync(<Output>{"ok"}</Output>);

  const messages = await collector.waitForRender();
  const diagnosticsMessages = messages.filter(
    (m: DevtoolsMessage) => m.type === "diagnostics:report",
  );

  collector.stop();

  expect(diagnosticsMessages[0]).toMatchObject({
    type: "diagnostics:report",
    message: "Test diagnostic",
    severity: "warning",
  });
});
