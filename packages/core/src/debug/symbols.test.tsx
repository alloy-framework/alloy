import { afterEach, beforeEach, expect, it } from "vitest";
import WebSocket from "ws";
import { createMessageCollector } from "../../testing/devtools-utils.js";
import { createOutputBinder, createScope, createSymbol } from "../binder.js";
import {
  enableDevtools,
  resetDevtoolsServerForTests,
} from "../devtools/devtools-server.js";
import { effect } from "../reactivity.js";
import { flushJobsAsync } from "../scheduler.js";
import { BasicScope } from "../symbols/basic-scope.js";
import { BasicSymbol } from "../symbols/basic-symbol.js";
import { debug } from "./index.js";

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

it("emits tracking info", async () => {
  const collector = await createMessageCollector(socket!);
  const binder = createOutputBinder();

  const scope = createScope(BasicScope, "root", undefined, { binder });
  const symbol = createSymbol(BasicSymbol, "Foo", scope.symbols, { binder });
  effect(() => {
    void symbol.name;
  });
  symbol.name = "hi";
  await flushJobsAsync();
  const items = (await collector.waitForFlush()).filter(
    (m) => m.type.startsWith("edge:track") && !("triggerIds" in m),
  );
  expect(items.length).toBeGreaterThan(0);
});

it("emits symbol and scope add/update/remove messages", async () => {
  const collector = await createMessageCollector(socket!);
  const binder = createOutputBinder();

  const scope = createScope(BasicScope, "root", undefined, { binder });
  const symbol = createSymbol(BasicSymbol, "Foo", scope.symbols, { binder });

  effect(() => {
    void scope.name;
  });
  scope.name = "root-updated";
  symbol.name = "FooUpdated";

  debug.symbols.unregisterSymbol(symbol);
  debug.symbols.unregisterScope(scope);

  await flushJobsAsync();

  const messages = await collector.waitForFlush();
  const symbolsMessages = messages.filter((m) => {
    return (
      (m.type.startsWith("scope:") || m.type.startsWith("symbol:")) &&
      !("triggerIds" in m)
    );
  });
  collector.stop();

  expect(symbolsMessages[0]).toMatchObject({
    type: "scope:added",
    name: "root",
  });

  expect(symbolsMessages[1]).toMatchObject({
    type: "symbol:added",
    name: "Foo",
  });
  expect(symbolsMessages[2]).toMatchObject({
    type: "scope:updated",
    name: "root-updated",
  });
  expect(symbolsMessages[3]).toMatchObject({
    type: "symbol:updated",
    name: "FooUpdated",
  });
  expect(symbolsMessages[4]).toMatchObject({
    type: "symbol:removed",
    id: expect.any(Number),
  });
  expect(symbolsMessages[5]).toMatchObject({
    type: "scope:removed",
    id: expect.any(Number),
  });
});
