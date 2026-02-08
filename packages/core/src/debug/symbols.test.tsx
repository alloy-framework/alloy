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
  const collector = createMessageCollector(socket!);
  const binder = createOutputBinder();

  const scope = createScope(BasicScope, "root", undefined, { binder });
  const symbol = createSymbol(BasicSymbol, "Foo", scope.symbols, { binder });
  effect(() => {
    void symbol.name;
  });
  symbol.name = "hi";
  await flushJobsAsync();
  const items = (await collector.waitForFlush()).filter((m) =>
    m.type.startsWith("effect:track"),
  );
  expect(items.length).toBeGreaterThan(0);
});

it("emits symbol and scope add/update/remove messages", async () => {
  const collector = createMessageCollector(socket!);
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
    return m.type.startsWith("scope:") || m.type.startsWith("symbol:");
  });
  collector.stop();

  expect(symbolsMessages[0]).toMatchObject({
    type: "scope:create",
    scope: expect.objectContaining({ name: "root" }),
  });

  expect(symbolsMessages[1]).toMatchObject({
    type: "symbol:addToScope",
  });

  expect(symbolsMessages[2]).toMatchObject({
    type: "symbol:create",
    symbol: expect.objectContaining({ name: "Foo" }),
  });
  expect(symbolsMessages[3]).toMatchObject({
    type: "scope:update",
    scope: expect.objectContaining({ name: "root-updated" }),
  });
  expect(symbolsMessages[4]).toMatchObject({
    type: "symbol:update",
    symbol: expect.objectContaining({ name: "FooUpdated" }),
  });
  expect(symbolsMessages[5]).toMatchObject({
    type: "symbol:delete",
    id: expect.any(Number),
  });
  expect(symbolsMessages[6]).toMatchObject({
    type: "scope:delete",
    id: expect.any(Number),
  });
});
